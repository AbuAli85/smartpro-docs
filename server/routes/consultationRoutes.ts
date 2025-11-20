/**
 * Consultation Form API Routes
 * Handles consultation form submissions with backend storage and Make.com webhook forwarding
 */

import express, { Request, Response } from 'express';
import { validate } from '../middleware/validation';
import { z } from 'zod';
import { webhookClient } from '../lib/webhookClient';
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

// Validation schema for consultation form
const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  location: z.string().optional(),
  company: z.string().optional(),
  businessType: z.string().optional(),
  services: z.array(z.string()).min(1, 'At least one service must be selected'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  preferredContact: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().max(5000, 'Message must not exceed 5000 characters').optional(),
  language: z.enum(['en', 'ar']).default('en'),
});

interface ConsultationRequest extends Request {
  body: z.infer<typeof consultationSchema>;
}

/**
 * POST /api/consultation
 * Submit consultation form
 */
router.post(
  '/',
  validate({ body: consultationSchema }),
  async (req: ConsultationRequest, res: Response) => {
    try {
      const formData = req.body;
      const ipAddress = req.ip || req.socket.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
      const userAgent = req.get('user-agent');
      const referrer = req.get('referer');

      logger.info('Consultation form submission received', {
        email: formData.email,
        services: formData.services,
        language: formData.language,
      });

      // Save to database (if Prisma available)
      let submissionId: string | null = null;
      if (prisma) {
        try {
          const submission = await prisma.consultationSubmission.create({
            data: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              location: formData.location,
              company: formData.company,
              businessType: formData.businessType,
              services: formData.services,
              primaryService: formData.services[0] || 'other',
              budget: formData.budget,
              timeline: formData.timeline,
              preferredContact: formData.preferredContact,
              preferredTime: formData.preferredTime,
              message: formData.message,
              language: formData.language,
              source: 'consultation-form',
              ipAddress: typeof ipAddress === 'string' ? ipAddress : JSON.stringify(ipAddress),
              userAgent,
              referrer,
            },
          });
          submissionId = submission.id;
          logger.info('Consultation submission saved to database', { submissionId });
        } catch (dbError: any) {
          logger.error('Failed to save consultation to database', dbError, {
            email: formData.email,
          });
          // Continue with webhook even if database save fails
        }
      }

      // Forward to Make.com webhook
      try {
        const { getPrimaryServiceForRouting, SERVICE_TO_MAKE_MAP, MakeServiceType } = require('../types/webhook');
        
        const primaryService = getPrimaryServiceForRouting(formData.services);
        const allServicesFormatted = formData.services.map((service: string) => 
          SERVICE_TO_MAKE_MAP[service] || service
        );

        const webhookPayload = {
          form_type: 'consultation',
          client_name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || undefined,
          company: formData.company?.trim() || undefined,
          business_type: formData.businessType || undefined,
          services: allServicesFormatted.length > 0 ? allServicesFormatted : undefined,
          service_interested: primaryService || 'Other',
          budget: formData.budget || undefined,
          timeline: formData.timeline || undefined,
          preferred_contact: formData.preferredContact || undefined,
          preferred_time: formData.preferredTime || undefined,
          location: formData.location?.trim() || undefined,
          primary_message: formData.message?.trim() || undefined,
          language: formData.language,
          timestamp: new Date().toISOString(),
          submission_id: submissionId, // Include database ID if available
        };

        const webhookResponse = await webhookClient.send(webhookPayload);

        // Update database record with webhook status
        if (prisma && submissionId) {
          try {
            await prisma.consultationSubmission.update({
              where: { id: submissionId },
              data: {
                webhookSent: webhookResponse.success,
                webhookSentAt: new Date(),
                status: webhookResponse.success ? 'contacted' : 'pending',
              },
            });
          } catch (updateError: any) {
            logger.warn('Failed to update webhook status in database', updateError);
          }
        }

        if (webhookResponse.success) {
          logger.info('Consultation form forwarded to Make.com successfully', {
            submissionId,
            executionId: webhookResponse.data?.execution_id,
          });

          return res.status(201).json({
            success: true,
            message: 'Consultation request submitted successfully',
            submissionId,
            executionId: webhookResponse.data?.execution_id,
          });
        } else {
          logger.error('Make.com webhook failed', new Error(webhookResponse.error?.message || 'Unknown error'), {
            submissionId,
          });

          // Still return success to user, but log the error
          return res.status(201).json({
            success: true,
            message: 'Consultation request received. We will contact you soon.',
            submissionId,
            warning: 'Webhook delivery may be delayed',
          });
        }
      } catch (webhookError: any) {
        logger.error('Error forwarding to Make.com webhook', webhookError, {
          submissionId,
          email: formData.email,
        });

        // Return success to user even if webhook fails
        // The submission is saved in database and can be processed later
        return res.status(201).json({
          success: true,
          message: 'Consultation request received. We will contact you soon.',
          submissionId,
          warning: 'Webhook delivery may be delayed',
        });
      }
    } catch (error: any) {
      logger.error('Error processing consultation form', error, {
        path: req.path,
        method: req.method,
      });

      return res.status(500).json({
        error: 'Failed to process consultation request',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
      });
    }
  }
);

/**
 * GET /api/consultation/stats (admin only)
 * Get consultation submission statistics
 */
router.get('/stats', async (req: any, res: Response) => {
  try {
    if (!prisma) {
      return res.status(503).json({ error: 'Database not available' });
    }

    // Check admin access
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const stats = await prisma.consultationSubmission.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    const total = await prisma.consultationSubmission.count();
    const recent = await prisma.consultationSubmission.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
    });

    res.json({
      total,
      recent,
      byStatus: stats.reduce((acc: any, stat: any) => {
        acc[stat.status] = stat._count.id;
        return acc;
      }, {}),
    });
  } catch (error: any) {
    logger.error('Error fetching consultation stats', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
