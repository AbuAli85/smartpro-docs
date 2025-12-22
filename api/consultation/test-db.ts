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
    const { PrismaClient } = await import('@prisma/client');
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
    return res.status(500).json({
      success: false,
      error: error?.message || 'Unknown error',
      code: error?.code,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    });
  }
}

