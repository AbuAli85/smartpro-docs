/**
 * Express Server Entry Point
 * Main server setup for SmartPro API
 */

import express, { Request, Response, NextFunction } from 'express';
import { logger } from './services/logger';
import { rateLimiters } from './middleware/rateLimit';

// Simple CORS middleware
const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const origin = process.env.FRONTEND_URL || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
};

// Import routes
import authRoutes from './routes/authRoutes';
import notificationRoutes from './routes/notificationRoutes';
import preferencesRoutes from './routes/preferencesRoutes';
import consultationRoutes from './routes/consultationRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request timing middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const originalEnd = res.end;

  res.end = function (chunk?: any, encoding?: any) {
    const responseTime = Date.now() - startTime;
    logger.request(req as any, res, responseTime);
    originalEnd.call(this, chunk, encoding);
  };

  next();
});

// General rate limiting
app.use(rateLimiters.general);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use('/api/auth', rateLimiters.auth, authRoutes);
app.use('/api/notifications', rateLimiters.notifications, notificationRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/consultation', rateLimiters.forms, consultationRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error', err, undefined, {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userId: (req as any).userId,
  });
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`, {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
    });
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
