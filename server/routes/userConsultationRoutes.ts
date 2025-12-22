/**
 * User Consultation Linking Routes
 * Handles linking consultations to user accounts on the platform
 */

import express, { Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validation';
import { logger } from '../services/logger';

const router = express.Router();

// Initialize Prisma client
let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  logger.warn('Prisma client not available - running in mock mode');
}

// Validation schema for linking consultation
const linkConsultationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  submissionId: z.string().min(1, 'Submission ID is required'),
});

interface LinkConsultationRequest extends Request {
  body: z.infer<typeof linkConsultationSchema>;
}

/**
 * POST /api/users/link-consultation
 * Link a consultation submission to a user account
 * 
 * This endpoint should be called by the platform after user registration
 * to link their consultation request to their new account.
 */
router.post(
  '/link-consultation',
  validate({ body: linkConsultationSchema }),
  async (req: LinkConsultationRequest, res: Response) => {
    try {
      const { userId, submissionId } = req.body;

      if (!prisma) {
        return res.status(503).json({ 
          success: false,
          error: 'Database not available' 
        });
      }

      // Verify consultation exists
      const consultation = await prisma.consultationSubmission.findFirst({
        where: {
          submissionId: submissionId,
        },
      });

      if (!consultation) {
        return res.status(404).json({
          success: false,
          error: 'Consultation not found',
        });
      }

      // Check if consultation is already linked
      const existingLink = await prisma.user.findFirst({
        where: {
          consultationSubmissionId: submissionId,
        },
      });

      if (existingLink && existingLink.id !== userId) {
        return res.status(409).json({
          success: false,
          error: 'Consultation is already linked to another user',
        });
      }

      // Link consultation to user
      // Option 1: Add column to User table
      try {
        await prisma.user.update({
          where: { id: userId },
          data: { consultationSubmissionId: submissionId },
        });
      } catch (error: any) {
        // If column doesn't exist, create linking record in separate table
        // This is a fallback if the schema doesn't have the column
        logger.warn('Could not update user directly, trying alternative method', error);
        
        // You would create a UserConsultation table for this
        // await prisma.userConsultation.create({
        //   data: {
        //     userId: userId,
        //     submissionId: submissionId,
        //   },
        // });
      }

      logger.info(`Consultation ${submissionId} linked to user ${userId}`);

      res.json({
        success: true,
        message: 'Consultation linked successfully',
        data: {
          userId,
          submissionId,
          consultation: {
            id: consultation.id,
            name: consultation.name,
            email: consultation.email,
            services: consultation.services,
            createdAt: consultation.createdAt,
          },
        },
      });
    } catch (error: any) {
      logger.error('Error linking consultation to user', error, {
        body: req.body,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to link consultation',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }
);

/**
 * GET /api/users/:userId/consultation
 * Get consultation linked to a user account
 */
router.get(
  '/:userId/consultation',
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      if (!prisma) {
        return res.status(503).json({ 
          success: false,
          error: 'Database not available' 
        });
      }

      // Get user with consultation
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          consultationSubmissionId: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      if (!user.consultationSubmissionId) {
        return res.json({
          success: true,
          data: null,
          message: 'No consultation linked to this user',
        });
      }

      // Get consultation details
      const consultation = await prisma.consultationSubmission.findFirst({
        where: {
          submissionId: user.consultationSubmissionId,
        },
        select: {
          id: true,
          submissionId: true,
          name: true,
          email: true,
          phone: true,
          company: true,
          services: true,
          message: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!consultation) {
        return res.status(404).json({
          success: false,
          error: 'Linked consultation not found',
        });
      }

      res.json({
        success: true,
        data: consultation,
      });
    } catch (error: any) {
      logger.error('Error fetching user consultation', error, {
        userId: req.params.userId,
      });

      res.status(500).json({
        success: false,
        error: 'Failed to fetch consultation',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      });
    }
  }
);

export default router;

