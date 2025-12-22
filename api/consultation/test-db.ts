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
    const urlMatch = dbUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    const connectionInfo = urlMatch ? {
      host: urlMatch[3],
      port: urlMatch[4],
      database: urlMatch[5],
      usingPooling: urlMatch[4] === '6543',
    } : null;
    
    return res.status(500).json({
      success: false,
      error: error?.message || 'Unknown error',
      code: error?.code,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      connectionInfo: connectionInfo,
      recommendation: connectionInfo?.port === '5432' 
        ? 'For Vercel serverless functions, use connection pooling (port 6543) instead of direct connection (port 5432). Get it from Supabase Dashboard → Settings → Database → Connection pooling.'
        : 'Check your DATABASE_URL in Vercel environment variables. Ensure the hostname, password, and port are correct.',
    });
  }
}

