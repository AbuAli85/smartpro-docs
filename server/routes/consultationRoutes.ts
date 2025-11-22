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

      // Check for duplicate submission (same email within 5 minutes)
      let submissionId: string | null = null;
      if (prisma) {
        try {
          const recentSubmission = await prisma.consultationSubmission.findFirst({
            where: {
              email: formData.email,
              createdAt: {
                gte: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          });

          if (recentSubmission) {
            logger.warn('Duplicate submission detected', {
              email: formData.email,
              existingSubmissionId: recentSubmission.id,
              timeSinceSubmission: Date.now() - recentSubmission.createdAt.getTime(),
            });

            // Return existing submission ID (don't create duplicate)
            return res.status(200).json({
              success: true,
              message: 'Submission already received',
              submissionId: recentSubmission.id,
              duplicate: true,
            });
          }
        } catch (duplicateCheckError: any) {
          logger.warn('Error checking for duplicate submission', duplicateCheckError);
          // Continue with submission even if duplicate check fails
        }
      }

      // Save to database (if Prisma available)
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
        const { getPrimaryServiceForRouting, formatAllServicesForMake } = require('../types/webhook');
        const { 
          translateBusinessType, 
          translateBudget, 
          translateTimeline, 
          translateContactMethod, 
          translateContactTime,
          translateServices 
        } = require('../lib/translations');
        
        const primaryService = getPrimaryServiceForRouting(formData.services);
        const allServicesFormatted = formatAllServicesForMake(formData.services);
        
        // Translate form fields based on language for display in notes
        const language: 'en' | 'ar' = formData.language || 'en';
        const translatedBusinessType = translateBusinessType(formData.businessType, language);
        const translatedBudget = translateBudget(formData.budget, language);
        const translatedTimeline = translateTimeline(formData.timeline, language);
        const translatedContact = translateContactMethod(formData.preferredContact, language);
        const translatedTime = translateContactTime(formData.preferredTime, language);
        const translatedServices = translateServices(formData.services, language);

        // Build services summary - use translated values when language is Arabic
        // This ensures Make.com email templates show services in the correct language
        const servicesForDisplay = language === 'ar' ? translatedServices : allServicesFormatted;
        const servicesSummary = servicesForDisplay.length > 0 
          ? servicesForDisplay.join(', ') 
          : (language === 'ar' ? 'أخرى' : 'Other');

        // Build comprehensive notes field (required by Make.com) - include services
        // Use translated values for better readability in Make.com
        const notesParts: string[] = [];
        if (translatedServices.length > 0) {
          const servicesLabel = language === 'ar' ? 'الخدمات المختارة' : 'Services Selected';
          notesParts.push(`${servicesLabel}: ${translatedServices.join(', ')}`);
        }
        if (formData.message) {
          const messageLabel = language === 'ar' ? 'الرسالة الأساسية' : 'Primary Message';
          notesParts.push(`${messageLabel}: ${formData.message.trim()}`);
        }
        if (formData.phone) {
          const phoneLabel = language === 'ar' ? 'الهاتف' : 'Phone';
          notesParts.push(`${phoneLabel}: ${formData.phone.trim()}`);
        }
        if (formData.location) {
          const locationLabel = language === 'ar' ? 'الموقع' : 'Location';
          notesParts.push(`${locationLabel}: ${formData.location.trim()}`);
        }
        if (translatedBusinessType) {
          const businessTypeLabel = language === 'ar' ? 'نوع النشاط التجاري' : 'Business Type';
          notesParts.push(`${businessTypeLabel}: ${translatedBusinessType}`);
        }
        if (translatedBudget) {
          const budgetLabel = language === 'ar' ? 'الميزانية' : 'Budget';
          notesParts.push(`${budgetLabel}: ${translatedBudget}`);
        }
        if (translatedTimeline) {
          const timelineLabel = language === 'ar' ? 'الجدول الزمني' : 'Timeline';
          notesParts.push(`${timelineLabel}: ${translatedTimeline}`);
        }
        if (translatedContact) {
          const contactLabel = language === 'ar' ? 'طريقة الاتصال المفضلة' : 'Preferred Contact';
          notesParts.push(`${contactLabel}: ${translatedContact}`);
        }
        if (translatedTime) {
          const timeLabel = language === 'ar' ? 'وقت الاتصال المفضل' : 'Preferred Time';
          notesParts.push(`${timeLabel}: ${translatedTime}`);
        }
        const languageLabel = language === 'ar' ? 'اللغة' : 'Language';
        notesParts.push(`${languageLabel}: ${formData.language}`);
        const notes = notesParts.length > 0 ? notesParts.join('\n') : (language === 'ar' ? 'لم يتم تقديم معلومات إضافية' : 'No additional information provided');

        // Calculate service_interested_translated - ensure it's always a string
        const serviceInterestedTranslated = (() => {
          if (language === 'ar') {
            return translatedServices.length > 0 ? translatedServices[0] : 'أخرى';
          } else {
            return primaryService || 'Other';
          }
        })();

        // Debug logging
        console.log('Webhook payload construction:', {
          language,
          primaryService,
          translatedServices,
          serviceInterestedTranslated,
          servicesForDisplay,
        });

        const webhookPayload = {
          form_type: 'consultation',
          client_name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || undefined,
          business_name: formData.company?.trim() || undefined, // Fixed: was 'company', should be 'business_name'
          business_type: translatedBusinessType || undefined, // Translated value
          business_type_key: formData.businessType || undefined, // Original key for reference
          services: servicesForDisplay, // Translated services array (Arabic if language is 'ar', English otherwise) - for email display
          services_english: allServicesFormatted, // English services array (for routing/reference)
          services_summary: servicesSummary, // Comma-separated string in user's language (for email display)
          services_summary_english: allServicesFormatted.length > 0 ? allServicesFormatted.join(', ') : 'Other', // English summary (for reference)
          service_interested: primaryService || 'Other', // Always English for Make.com routing
          service_interested_translated: serviceInterestedTranslated, // Translated primary service for email display - ALWAYS PRESENT
          budget: translatedBudget || undefined, // Translated value
          budget_key: formData.budget || undefined, // Original key for reference
          timeline: translatedTimeline || undefined, // Translated value
          timeline_key: formData.timeline || undefined, // Original key for reference
          preferred_contact: translatedContact || undefined, // Translated value
          preferred_contact_key: formData.preferredContact || undefined, // Original key for reference
          preferred_time: translatedTime || undefined, // Translated value
          preferred_time_key: formData.preferredTime || undefined, // Original key for reference
          location: formData.location?.trim() || undefined,
          primary_message: formData.message?.trim() || undefined,
          notes: notes, // Added: required by Make.com Module 25
          language: formData.language,
          source: 'smartpro-consultation-form', // Added: required by Make.com
          timestamp: new Date().toISOString(),
        };

        // Verify service_interested_translated is present
        if (!webhookPayload.service_interested_translated) {
          console.error('ERROR: service_interested_translated is missing from payload!', {
            language,
            primaryService,
            translatedServices,
            payload: webhookPayload,
          });
          // Force set it as fallback
          webhookPayload.service_interested_translated = primaryService || 'Other';
        }

        console.log('Sending webhook payload with service_interested_translated:', {
          service_interested_translated: webhookPayload.service_interested_translated,
          service_interested: webhookPayload.service_interested,
          language: webhookPayload.language,
        });

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
        success: false,
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
