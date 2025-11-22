/**
 * Vercel Serverless Function - Consultation endpoint
 * Standalone handler that doesn't depend on Express app structure
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Validation schema
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

// Service mapping (from client/src/types/webhook.ts)
const SERVICE_TO_MAKE_MAP: Record<string, string> = {
  accounting: 'Accounting',
  vat: 'VAT',
  proServices: 'PRO Services',
  companyFormation: 'Company Formation',
  businessConsulting: 'Business Consulting',
  other: 'Other',
};

function getPrimaryServiceForRouting(services: string[]): string {
  if (!services || services.length === 0) return 'Other';
  const firstService = services[0];
  return SERVICE_TO_MAKE_MAP[firstService] || 'Other';
}

// Webhook URL
const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 
  'https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8';

// In-memory cache for duplicate prevention (in serverless, this is per-instance)
// For production, consider using Redis or a database
const submissionCache = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function getSubmissionKey(email: string, name: string): string {
  return `${email}:${name}`.toLowerCase().trim();
}

function isDuplicateSubmission(email: string, name: string): boolean {
  const key = getSubmissionKey(email, name);
  const lastSubmission = submissionCache.get(key);
  if (!lastSubmission) {
    return false;
  }
  const timeSinceLastSubmission = Date.now() - lastSubmission;
  return timeSinceLastSubmission < DUPLICATE_WINDOW_MS;
}

function recordSubmission(email: string, name: string): void {
  const key = getSubmissionKey(email, name);
  submissionCache.set(key, Date.now());
  
  // Clean up old entries (keep cache size manageable)
  if (submissionCache.size > 1000) {
    const now = Date.now();
    for (const [k, timestamp] of submissionCache.entries()) {
      if (now - timestamp > DUPLICATE_WINDOW_MS) {
        submissionCache.delete(k);
      }
    }
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    const validationResult = consultationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.errors,
      });
    }

    const formData = validationResult.data;

    // Check for duplicate submission (same email + name within 5 minutes)
    if (isDuplicateSubmission(formData.email, formData.name)) {
      console.warn('Duplicate submission detected', {
        email: formData.email,
        name: formData.name,
      });
      return res.status(200).json({
        success: true,
        message: 'Submission already received. Please wait before submitting again.',
        duplicate: true,
      });
    }

    // Build notes field
    const notesParts: string[] = [];
    if (formData.message) {
      notesParts.push(`Primary Message: ${formData.message.trim()}`);
    }
    if (formData.phone) {
      notesParts.push(`Phone: ${formData.phone.trim()}`);
    }
    if (formData.location) {
      notesParts.push(`Location: ${formData.location.trim()}`);
    }
    if (formData.budget) {
      notesParts.push(`Budget: ${formData.budget}`);
    }
    if (formData.timeline) {
      notesParts.push(`Timeline: ${formData.timeline}`);
    }
    if (formData.preferredContact) {
      notesParts.push(`Preferred Contact: ${formData.preferredContact}`);
    }
    if (formData.preferredTime) {
      notesParts.push(`Preferred Time: ${formData.preferredTime}`);
    }
    notesParts.push(`Language: ${formData.language}`);
    const notes = notesParts.length > 0 ? notesParts.join('\n') : 'No additional information provided';

    // Get primary service
    const primaryService = getPrimaryServiceForRouting(formData.services);
    const allServicesFormatted = formData.services.map((service: string) => 
      SERVICE_TO_MAKE_MAP[service] || service
    );

    // Build webhook payload
    const webhookPayload = {
      form_type: 'consultation',
      client_name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || undefined,
      business_name: formData.company?.trim() || undefined,
      business_type: formData.businessType || undefined,
      services: allServicesFormatted.length > 0 ? allServicesFormatted : undefined,
      service_interested: primaryService || 'Other',
      budget: formData.budget || undefined,
      timeline: formData.timeline || undefined,
      preferred_contact: formData.preferredContact || undefined,
      preferred_time: formData.preferredTime || undefined,
      location: formData.location?.trim() || undefined,
      primary_message: formData.message?.trim() || undefined,
      notes: notes,
      language: formData.language,
      source: 'smartpro-consultation-form',
      timestamp: new Date().toISOString(),
    };

    // Send to Make.com webhook
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Webhook error:', errorText);
      throw new Error(`Webhook failed: ${webhookResponse.status} ${errorText}`);
    }

    const webhookData = await webhookResponse.json().catch(() => ({}));

    // Record successful submission to prevent duplicates
    recordSubmission(formData.email, formData.name);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Consultation request submitted successfully',
      submissionId: webhookData.id || `sub_${Date.now()}`,
    });

  } catch (error) {
    console.error('Consultation API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
