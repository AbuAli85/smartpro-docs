import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../../server/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Route to the test-db endpoint
  if (req.method === 'GET' && req.url?.includes('/test-db')) {
    return app(req, res);
  }
  
  return app(req, res);
}

