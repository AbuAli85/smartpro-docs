/**
 * Vercel Serverless Function - Test database connection
 * GET /api/consultation/test-db
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Prisma client
let prisma: any;
let prismaError: string | null = null;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
  
  // Test connection on module load
  prisma.$connect()
    .then(() => {
      console.log('✅ Prisma connected to database successfully');
    })
    .catch((err: any) => {
      const errorMsg = err?.message || 'Unknown error';
      console.error('❌ Prisma failed to connect to database', {
        message: errorMsg,
        code: err?.code,
        DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      });
      prismaError = errorMsg;
    });
} catch (error: any) {
  const errorMsg = error?.message || 'Unknown error';
  console.error('❌ Failed to initialize Prisma client', {
    message: errorMsg,
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
  });
  prismaError = errorMsg;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!prisma) {
      return res.status(503).json({ 
        error: 'Database not available',
        prismaError: prismaError || 'Prisma not initialized',
        DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      });
    }

    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check if tables exist
    const tableCount = await prisma.consultationSubmission.count();
    
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

