/**
 * Vercel Serverless Function - Catch-all for API routes
 * Handles all API requests by forwarding to Express app
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server/index';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Vercel provides the path in req.url, but Express expects the full path
    // The catch-all pattern gives us segments, but we need the full path
    // For /api/consultation, req.url will be /api/consultation
    // Express routes are already set up with /api prefix, so this should work
    
    // Forward the request to Express app
    // Express will handle routing based on req.url
    return app(req, res);
  } catch (error) {
    console.error('API handler error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

