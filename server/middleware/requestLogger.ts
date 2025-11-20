/**
 * Request Logging Middleware
 * Logs all API requests to database (optional)
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger';

let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  // Prisma not available - logging only to console
}

/**
 * Request logging middleware
 * Optionally logs requests to database
 */
export function requestLogger() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    const ipAddress = req.ip || req.socket.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
    const userAgent = req.get('user-agent');

    // Log to console
    logger.debug(`${req.method} ${req.path}`, {
      ip: ipAddress,
      userAgent,
      userId: (req as any).userId,
    });

    // Optionally log to database
    if (prisma && process.env.LOG_REQUESTS_TO_DB === 'true') {
      // Don't await - log asynchronously to not slow down requests
      prisma.apiRequestLog
        .create({
          data: {
            method: req.method,
            path: req.path,
            ipAddress: typeof ipAddress === 'string' ? ipAddress : JSON.stringify(ipAddress),
            userAgent,
            userId: (req as any).userId,
            statusCode: res.statusCode,
            responseTime: Date.now() - startTime,
          },
        })
        .catch((err: any) => {
          // Silent fail - don't break requests if logging fails
          logger.warn('Failed to log request to database', err);
        });
    }

    next();
  };
}
