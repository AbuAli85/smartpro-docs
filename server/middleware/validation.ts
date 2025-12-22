/**
 * Request Validation Middleware
 * Uses Zod for schema validation
 */

import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodSchema } from 'zod';

export interface ValidationSchema {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Validation middleware factory
 */
export function validate(schema: ValidationSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Invalid request data',
          details: error.issues.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}

// Common validation schemas
export const commonSchemas = {
  // Pagination
  pagination: z.object({
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 50)),
    offset: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 0)),
  }),

  // ID parameter
  idParam: z.object({
    id: z.string().min(1, 'ID is required'),
  }),

  // Email
  email: z.string().email('Invalid email format'),

  // Password
  password: z.string().min(8, 'Password must be at least 8 characters'),

  // Phone number (flexible format)
  phone: z.string().optional(),
};
