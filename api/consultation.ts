/**
 * Vercel Serverless Function - Consultation endpoint
 * Specific handler for /api/consultation route
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server/index';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Set the path to match Express route
    req.url = '/api/consultation';
    
    // Forward to Express app
    return app(req, res);
  } catch (error) {
    console.error('Consultation API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

