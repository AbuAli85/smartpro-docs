/**
 * Consultation Form API Routes
 * Handles consultation form submissions with backend storage and Make.com webhook forwarding
 */

import express, { Request, Response } from 'express';
import { validate } from '../middleware/validation.js';
import { z } from 'zod';
import { webhookClient } from '../lib/webhookClient.js';
import { logger } from '../services/logger.js';
import { supabase } from '../lib/supabaseClient.js';

const router = express.Router();

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
      // This prevents duplicate emails from being sent
      let submissionId: string | null = null;
      let isDuplicate = false;
      
      try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        
        const { data: recentSubmissions, error: duplicateError } = await supabase
          .from('consultation_submissions')
          .select('id, submission_id, created_at, webhook_sent')
          .eq('email', formData.email)
          .gte('created_at', fiveMinutesAgo)
          .order('created_at', { ascending: false })
          .limit(1);

        if (duplicateError) {
          logger.warn('Error checking for duplicate submission', duplicateError);
        } else if (recentSubmissions && recentSubmissions.length > 0) {
          const recentSubmission = recentSubmissions[0];
          const timeSinceSubmission = Date.now() - new Date(recentSubmission.created_at).getTime();
          
          logger.warn('Duplicate submission detected - preventing duplicate email', {
            email: formData.email,
            existingSubmissionId: recentSubmission.submission_id,
            timeSinceSubmission: `${Math.round(timeSinceSubmission / 1000)} seconds`,
            webhookAlreadySent: recentSubmission.webhook_sent,
          });

          // If webhook was already sent, don't send again
          if (recentSubmission.webhook_sent) {
            isDuplicate = true;
            submissionId = recentSubmission.submission_id;
            
            // Return success but indicate it's a duplicate (no email sent)
            return res.status(200).json({
              success: true,
              message: 'Submission already received. We will contact you soon.',
              submissionId: recentSubmission.submission_id,
              duplicate: true,
              emailSent: false,
            });
          }
          // If webhook wasn't sent, continue to send it (retry scenario)
        }
      } catch (duplicateCheckError: any) {
        logger.warn('Error checking for duplicate submission', duplicateCheckError);
        // Continue with submission even if duplicate check fails
      }

      // Save to database using Supabase
      try {
        // Generate unique submission ID
        const uniqueSubmissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        
        logger.info('💾 Attempting to save consultation to database', {
          email: formData.email,
          submissionId: uniqueSubmissionId,
        });
        
        const { data: submission, error: insertError } = await supabase
          .from('consultation_submissions')
          .insert({
            submission_id: uniqueSubmissionId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            location: formData.location || null,
            company: formData.company || null,
            business_type: formData.businessType || null,
            services: formData.services,
            primary_service: formData.services[0] || 'other',
            budget: formData.budget || null,
            timeline: formData.timeline || null,
            preferred_contact: formData.preferredContact || null,
            preferred_time: formData.preferredTime || null,
            message: formData.message || null,
            language: formData.language || 'en',
            source: 'consultation-form',
            ip_address: typeof ipAddress === 'string' ? ipAddress : JSON.stringify(ipAddress),
            user_agent: userAgent || null,
            referrer: referrer || null,
            status: 'pending',
            webhook_sent: false,
          })
          .select()
          .single();
        
        if (insertError) {
          throw insertError;
        }
        
        submissionId = submission?.submission_id || uniqueSubmissionId;
        
        // Create lead entry automatically (only for new submissions)
        if (!isDuplicate && submissionId) {
          try {
            const { error: leadError } = await supabase
              .from('leads')
              .insert({
                submission_id: submissionId,
                email: formData.email,
                current_stage: 'consultation_submitted',
                stages: ['consultation_submitted'],
                metadata: {
                  name: formData.name,
                  services: formData.services,
                  language: formData.language,
                  submittedAt: new Date().toISOString(),
                },
                source: 'consultation_form',
              });
            
            if (leadError && !leadError.message?.includes('duplicate') && !leadError.message?.includes('unique')) {
              logger.warn('Failed to create lead entry', leadError);
            } else {
              logger.info('Lead entry created automatically', { submissionId });
            }
          } catch (leadError: any) {
            logger.warn('Failed to create lead entry', leadError);
          }
        }
        
        logger.info('✅ Consultation submission saved to database successfully', { 
          submissionId,
          email: formData.email,
        });
      } catch (dbError: any) {
        logger.error('❌ Failed to save consultation to database', dbError, {
          email: formData.email,
          errorMessage: dbError.message,
          errorCode: dbError.code,
          errorDetails: dbError.details,
          stack: dbError.stack,
        });
        // Continue with webhook even if database save fails
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

        // Use submissionId from database (already set above)
        const uniqueSubmissionId = submissionId || `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Ensure is_duplicate is always a boolean (not undefined) for Make.com filter
        const isDuplicateFlag = isDuplicate === true;
        
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
          submission_id: uniqueSubmissionId, // Unique ID to prevent duplicate processing in Make.com
          is_duplicate: isDuplicateFlag, // Always boolean: true for duplicates, false for new submissions (required for Make.com filter)
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

        logger.info('Sending webhook payload to Make.com', {
          email: formData.email,
          submission_id: webhookPayload.submission_id,
          is_duplicate: webhookPayload.is_duplicate,
          service_interested: webhookPayload.service_interested,
          language: webhookPayload.language,
        });
        
        console.log('Webhook payload details:', {
          submission_id: webhookPayload.submission_id,
          is_duplicate: webhookPayload.is_duplicate,
          is_duplicate_type: typeof webhookPayload.is_duplicate,
        });

        // Don't send webhook if this is a duplicate that already had webhook sent
        if (isDuplicate) {
          logger.info('Skipping webhook for duplicate submission', {
            submissionId: uniqueSubmissionId,
            email: formData.email,
          });
          
          return res.status(200).json({
            success: true,
            message: 'Submission already received. We will contact you soon.',
            submissionId: uniqueSubmissionId,
            duplicate: true,
            emailSent: false,
          });
        }

        const webhookResponse = await webhookClient.send(webhookPayload);

        // Log webhook response for debugging
        logger.info('Webhook response received', {
          success: webhookResponse.success,
          executionId: webhookResponse.data?.execution_id,
          error: webhookResponse.error,
          submissionId: uniqueSubmissionId,
        });

        // Update database record with webhook status
        if (uniqueSubmissionId) {
          try {
            const { error: updateError } = await supabase
              .from('consultation_submissions')
              .update({
                webhook_sent: webhookResponse.success,
                webhook_sent_at: webhookResponse.success ? new Date().toISOString() : null,
                status: webhookResponse.success ? 'contacted' : 'pending',
              })
              .eq('submission_id', uniqueSubmissionId);
            
            if (updateError) {
              throw updateError;
            }
            
            logger.info('Webhook status updated in database', {
              submissionId: uniqueSubmissionId,
              webhookSent: webhookResponse.success,
            });
          } catch (updateError: any) {
            logger.error('Failed to update webhook status in database', updateError, {
              submissionId: uniqueSubmissionId,
            });
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
 * GET /api/consultation/test-db
 * Test database connection
 */
router.get('/test-db', async (req: Request, res: Response) => {
  try {
    // Test connection by querying consultation_submissions table
    // First, try a simple count query
    const { count, error } = await supabase
      .from('consultation_submissions')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      logger.error('Supabase query error', error);
      throw error;
    }
    
    // Also verify we can actually query a record
    const { data: sampleData, error: sampleError } = await supabase
      .from('consultation_submissions')
      .select('id')
      .limit(1);
    
    if (sampleError && sampleError.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which is fine for an empty table
      logger.warn('Sample query warning', sampleError);
    }
    
    return res.json({
      success: true,
      message: 'Database connection successful',
      tableExists: true,
      recordCount: count || 0,
      canQuery: !sampleError || sampleError.code === 'PGRST116',
      SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    logger.error('Database connection test failed', error, {
      errorMessage: error?.message,
      errorCode: error?.code,
      errorDetails: error?.details,
      errorHint: error?.hint,
    });
    
    return res.status(500).json({
      success: false,
      error: error?.message || 'Unknown error',
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
      SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * GET /api/consultation/stats (admin only)
 * Get consultation submission statistics
 */
router.get('/stats', async (req: any, res: Response) => {
  try {
    // In development, allow access without authentication for testing
    // In production, require admin authentication
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    
    if (!isDevelopment) {
      // Check admin access in production
      if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
    } else {
      // Log that we're bypassing auth in development
      logger.info('⚠️ Stats endpoint accessed without authentication (development mode)');
    }

    // Get total count
    const { count: total } = await supabase
      .from('consultation_submissions')
      .select('*', { count: 'exact', head: true });

    // Get recent count (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: recent } = await supabase
      .from('consultation_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneDayAgo);

    // Get stats by status
    const { data: allSubmissions } = await supabase
      .from('consultation_submissions')
      .select('status');

    const byStatus: Record<string, number> = {};
    if (allSubmissions) {
      allSubmissions.forEach((submission) => {
        const status = submission.status || 'pending';
        byStatus[status] = (byStatus[status] || 0) + 1;
      });
    }

    res.json({
      total: total || 0,
      recent: recent || 0,
      byStatus,
    });
  } catch (error: any) {
    logger.error('Error fetching consultation stats', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/consultation/:submissionId
 * Get consultation details by submission ID
 */
router.get('/:submissionId', async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;

    // Find consultation by submission ID
    const { data: consultation, error } = await supabase
      .from('consultation_submissions')
      .select(`
        id,
        submission_id,
        name,
        email,
        phone,
        location,
        company,
        business_type,
        services,
        budget,
        timeline,
        preferred_contact,
        preferred_time,
        message,
        language,
        created_at,
        updated_at
      `)
      .eq('submission_id', submissionId)
      .single();

    if (error || !consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    // Map database column names to API response format
    res.json({
      id: consultation.id,
      submissionId: consultation.submission_id,
      name: consultation.name,
      email: consultation.email,
      phone: consultation.phone,
      location: consultation.location,
      company: consultation.company,
      businessType: consultation.business_type,
      services: consultation.services,
      budget: consultation.budget,
      timeline: consultation.timeline,
      preferredContact: consultation.preferred_contact,
      preferredTime: consultation.preferred_time,
      message: consultation.message,
      language: consultation.language,
      createdAt: consultation.created_at,
      updatedAt: consultation.updated_at,
    });
  } catch (error: any) {
    logger.error('Error fetching consultation', error, { submissionId: req.params.submissionId });
    res.status(500).json({ error: error.message || 'Failed to fetch consultation' });
  }
});

export default router;
