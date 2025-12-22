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
        ? 'Using direct connection (port 5432). This works but connection pooling (port 6543) is recommended for Vercel. If this works, you can switch to pooling later. If this fails, check: 1) Password is correct and URL-encoded, 2) Project is active, 3) Database is accessible.'
        : connectionInfo?.port === '6543' && !connectionInfo?.isPoolerHostname
        ? 'You are using port 6543 but with the direct connection hostname. Connection pooling requires a DIFFERENT hostname (usually contains "pooler" or "pool"). Get the correct connection pooling URL from Supabase Dashboard → Settings → Database → Connection pooling tab.'
        : connectionInfo?.port === '6543' && connectionInfo?.isPoolerHostname
        ? 'Connection string format is correct (pooler hostname, port 6543) but connection is failing. Try: 1) Use direct connection (port 5432) as temporary workaround - get it from Supabase Dashboard → Settings → Database → URI tab, 2) Check IP restrictions - disable them in Supabase → Settings → Database → Connection pooling, 3) Verify connection pooling is enabled for your project, 4) Password encoding - URL encode special characters.'
        : 'Check your DATABASE_URL in Vercel environment variables. Ensure the hostname, password (URL-encoded if it has special characters), and port are correct.',
    });
  }
}

