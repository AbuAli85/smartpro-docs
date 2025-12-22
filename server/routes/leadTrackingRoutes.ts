/**
 * Lead Tracking API Routes
 * Tracks lead progression from consultation → registration
 */

import express, { Request, Response } from 'express';
import { logger } from '../services/logger.js';

const router = express.Router();

// Initialize Prisma client
let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  logger.warn('Prisma client not available - running in mock mode');
}

/**
 * Lead progression stages
 */
export enum LeadStage {
  CONSULTATION_SUBMITTED = 'consultation_submitted',
  CONSULTATION_VIEWED = 'consultation_viewed',
  REGISTRATION_STARTED = 'registration_started',
  REGISTRATION_COMPLETED = 'registration_completed',
  PROFILE_COMPLETED = 'profile_completed',
  FIRST_SERVICE_BOOKED = 'first_service_booked',
}

/**
 * POST /api/leads/track
 * Track a lead progression event
 */
router.post('/track', async (req: Request, res: Response) => {
  try {
    const { submissionId, email, stage, metadata } = req.body;

    if (!submissionId || !email || !stage) {
      return res.status(400).json({
        success: false,
        error: 'submissionId, email, and stage are required',
      });
    }

    // Validate stage
    const validStages = Object.values(LeadStage);
    if (!validStages.includes(stage)) {
      return res.status(400).json({
        success: false,
        error: `Invalid stage. Must be one of: ${validStages.join(', ')}`,
      });
    }

    if (prisma) {
      try {
        // Check if lead exists
        let lead = await prisma.lead.findUnique({
          where: { submissionId },
        });

        if (!lead) {
          // Create new lead
          lead = await prisma.lead.create({
            data: {
              submissionId,
              email,
              currentStage: stage,
              stages: [stage],
              metadata: metadata || {},
              source: 'consultation_form',
            },
          });
        } else {
          // Update existing lead
          const stages = lead.stages || [];
          if (!stages.includes(stage)) {
            stages.push(stage);
          }

          lead = await prisma.lead.update({
            where: { submissionId },
            data: {
              currentStage: stage,
              stages,
              metadata: {
                ...(lead.metadata || {}),
                ...(metadata || {}),
                [stage]: {
                  timestamp: new Date().toISOString(),
                  ...(metadata || {}),
                },
              },
              updatedAt: new Date(),
            },
          });
        }

        logger.info('Lead progression tracked', {
          submissionId,
          email,
          stage,
          currentStage: lead.currentStage,
        });

        return res.status(200).json({
          success: true,
          lead: {
            submissionId: lead.submissionId,
            email: lead.email,
            currentStage: lead.currentStage,
            stages: lead.stages,
            progress: calculateProgress(lead.stages),
          },
        });
      } catch (dbError: any) {
        logger.error('Database error tracking lead', dbError);
        // Continue with mock response
      }
    }

    // Mock response if Prisma not available
    return res.status(200).json({
      success: true,
      lead: {
        submissionId,
        email,
        currentStage: stage,
        stages: [stage],
        progress: calculateProgress([stage]),
      },
    });
  } catch (error: any) {
    logger.error('Error tracking lead', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to track lead progression',
    });
  }
});

/**
 * GET /api/leads/:submissionId
 * Get lead status and progress
 */
router.get('/:submissionId', async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;

    if (prisma) {
      try {
        const lead = await prisma.lead.findUnique({
          where: { submissionId },
        });

        if (!lead) {
          return res.status(404).json({
            success: false,
            error: 'Lead not found',
          });
        }

        return res.status(200).json({
          success: true,
          lead: {
            submissionId: lead.submissionId,
            email: lead.email,
            currentStage: lead.currentStage,
            stages: lead.stages || [],
            progress: calculateProgress(lead.stages || []),
            metadata: lead.metadata,
            createdAt: lead.createdAt,
            updatedAt: lead.updatedAt,
          },
        });
      } catch (dbError: any) {
        logger.error('Database error fetching lead', dbError);
      }
    }

    // Mock response
    return res.status(200).json({
      success: true,
      lead: {
        submissionId,
        currentStage: LeadStage.CONSULTATION_SUBMITTED,
        stages: [LeadStage.CONSULTATION_SUBMITTED],
        progress: 20,
      },
    });
  } catch (error: any) {
    logger.error('Error fetching lead', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch lead status',
    });
  }
});

/**
 * Calculate progress percentage based on completed stages
 */
function calculateProgress(stages: string[]): number {
  const allStages: string[] = [
    LeadStage.CONSULTATION_SUBMITTED,
    LeadStage.CONSULTATION_VIEWED,
    LeadStage.REGISTRATION_STARTED,
    LeadStage.REGISTRATION_COMPLETED,
    LeadStage.PROFILE_COMPLETED,
    LeadStage.FIRST_SERVICE_BOOKED,
  ];

  const completedStages = stages.filter((s) => allStages.includes(s));
  return Math.round((completedStages.length / allStages.length) * 100);
}

export default router;

