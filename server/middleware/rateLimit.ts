/**
 * Rate Limiting Middleware
 * Prevents abuse by limiting requests per IP/user
 */

import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum requests per window
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use Redis in production)
const store: RateLimitStore = {};

/**
 * Rate limiting middleware
 */
export function rateLimit(options: RateLimitOptions) {
  const {
    windowMs,
    max,
    message = 'Too many requests, please try again later',
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    // Get identifier (IP address or user ID)
    const identifier = (req as any).userId || req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${identifier}:${req.path}`;
    const now = Date.now();

    // Clean up expired entries periodically
    if (Math.random() < 0.01) {
      // 1% chance to cleanup
      Object.keys(store).forEach((k) => {
        if (store[k].resetTime < now) {
          delete store[k];
        }
      });
    }

    // Get or create rate limit entry
    let entry = store[key];
    if (!entry || entry.resetTime < now) {
      entry = {
        count: 0,
        resetTime: now + windowMs,
      };
      store[key] = entry;
    }

    // Check limit
    if (entry.count >= max) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      res.set({
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': max.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
      });

      return res.status(429).json({
        error: 'Too many requests',
        message,
        retryAfter,
      });
    }

    // Increment counter
    entry.count++;

    // Set rate limit headers
    res.set({
      'X-RateLimit-Limit': max.toString(),
      'X-RateLimit-Remaining': Math.max(0, max - entry.count).toString(),
      'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
    });

    // Track response to optionally skip
    const originalSend = res.send;
    res.send = function (body) {
      const statusCode = res.statusCode;
      const isSuccess = statusCode >= 200 && statusCode < 400;
      const isError = statusCode >= 400;

      if (skipSuccessfulRequests && isSuccess) {
        entry.count = Math.max(0, entry.count - 1);
      }
      if (skipFailedRequests && isError) {
        entry.count = Math.max(0, entry.count - 1);
      }

      return originalSend.call(this, body);
    };

    next();
  };
}

// Pre-configured rate limiters
export const rateLimiters = {
  // General API rate limit
  general: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
  }),

  // Strict rate limit for auth endpoints
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per 15 minutes
    message: 'Too many authentication attempts, please try again later',
  }),

  // Rate limit for form submissions
  forms: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 submissions per hour
    message: 'Too many form submissions, please try again later',
  }),

  // Rate limit for notification creation
  notifications: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // 30 requests per minute
  }),
};
