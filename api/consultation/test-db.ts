/**
 * Vercel Serverless Function - Test database connection
 * GET /api/consultation/test-db
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Lazy-load Prisma client (cached per function instance)
let prisma: any = null;
let prismaError: string | null = null;

async function getPrisma() {
  if (prisma) {
    return prisma;
  }

  if (prismaError) {
    return null;
  }

  try {
    // Dynamic import for ES modules in Vercel serverless functions
    // Prisma generates the client at build time, so we need to handle the import carefully
    const prismaModule: any = await import('@prisma/client');
    
    // Try multiple ways to access PrismaClient (handles different export patterns)
    let PrismaClient = prismaModule.PrismaClient;
    if (!PrismaClient && prismaModule.default) {
      PrismaClient = prismaModule.default.PrismaClient || prismaModule.default;
    }
    
    if (!PrismaClient || typeof PrismaClient !== 'function') {
      throw new Error('PrismaClient not found or invalid in @prisma/client module');
    }
    
    prisma = new PrismaClient();
    return prisma;
  } catch (error: any) {
    const errorMsg = error?.message || 'Unknown error';
    console.error('❌ Failed to initialize Prisma client', {
      message: errorMsg,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    });
    prismaError = errorMsg;
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Lazy-load Prisma client
    const prismaClient = await getPrisma();
    
    if (!prismaClient) {
      return res.status(503).json({ 
        error: 'Database not available',
        prismaError: prismaError || 'Prisma not initialized',
        DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      });
    }

    // Test connection
    await prismaClient.$queryRaw`SELECT 1`;
    
    // Check if tables exist
    const tableCount = await prismaClient.consultationSubmission.count();
    
    return res.json({
      success: true,
      message: 'Database connection successful',
      tableExists: true,
      recordCount: tableCount,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    });
  } catch (error: any) {
    console.error('Database connection test failed', error);
    
    // Extract connection details for debugging (without exposing password)
    const dbUrl = process.env.DATABASE_URL || '';
    // Match both postgres:// and postgresql://
    const urlMatch = dbUrl.match(/postgres(ql)?:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    const connectionInfo = urlMatch ? {
      host: urlMatch[4],
      port: urlMatch[5],
      database: urlMatch[6],
      usingPooling: urlMatch[5] === '6543',
      isPoolerHostname: urlMatch[4]?.includes('pooler') || urlMatch[4]?.includes('pool'),
    } : null;
    
    return res.status(500).json({
      success: false,
      error: error?.message || 'Unknown error',
      code: error?.code,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      connectionInfo: connectionInfo,
      recommendation: connectionInfo?.port === '5432' 
        ? 'Both direct connection (5432) and pooling (6543) are failing - this indicates a fundamental issue. Most likely: 1) Wrong password - reset it in Supabase Dashboard → Settings → Database → Reset database password (use simple password like "Test123" for testing), 2) Project is paused - check Supabase Dashboard and resume if needed, 3) Test locally - try connecting from your computer to verify password works, 4) IP restrictions - disable them in Supabase settings.'
        : connectionInfo?.port === '6543' && !connectionInfo?.isPoolerHostname
        ? 'You are using port 6543 but with the direct connection hostname. Connection pooling requires a DIFFERENT hostname (usually contains "pooler" or "pool"). Get the correct connection pooling URL from Supabase Dashboard → Settings → Database → Connection pooling tab.'
        : connectionInfo?.port === '6543' && connectionInfo?.isPoolerHostname
        ? 'Connection string format is correct (pooler hostname, port 6543) but connection is failing. Since direct connection also fails, this is likely: 1) Wrong password - reset to simple password and test, 2) Project paused - check and resume in Supabase Dashboard, 3) Test locally first - verify password works from your computer, 4) IP restrictions - disable them.'
        : 'Check your DATABASE_URL in Vercel environment variables. Ensure the hostname, password (URL-encoded if it has special characters), and port are correct.',
    });
  }
}

