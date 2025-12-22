/**
 * Vercel Serverless Function - Consultation API routes
 * Handles all /api/consultation/* routes including test-db
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Import the Express app
let app: any;
try {
  app = require('../../server/index').default;
} catch (error) {
  console.error('Failed to load Express app:', error);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!app) {
    return res.status(500).json({ 
      error: 'Server not initialized',
      message: 'Express app failed to load'
    });
  }

  // Vercel passes the path segments as an array in req.query.path
  const pathSegments = (req.query.path as string[]) || [];
  const path = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '';
  
  // Construct the full path that Express expects
  const fullPath = `/api/consultation${path}`;
  
  // Update the request URL and path for Express routing
  req.url = fullPath;
  (req as any).path = path;
  
  // Call the Express app handler
  return new Promise((resolve) => {
    app(req as any, res, () => {
      resolve(undefined);
    });
  });
}
