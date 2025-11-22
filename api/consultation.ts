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

// Service mapping (must match client/src/types/webhook.ts)
const SERVICE_TO_MAKE_MAP: Record<string, string> = {
  companyFormation: 'Company Formation',
  proServices: 'PRO Services',
  accounting: 'Accounting',
  vat: 'VAT',
  businessConsulting: 'Business Consulting',
  employeeManagement: 'Employee Management',
  crm: 'CRM & Client Management',
  projectManagement: 'Project Management',
  elearning: 'E-Learning Platform',
  contractManagement: 'Contract Management',
  workflowAutomation: 'Workflow Automation',
  analytics: 'Advanced Analytics',
  api: 'API & Integrations',
  support: '24/7 Support',
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
const webhookCallCache = new Map<string, number>(); // Track webhook calls to prevent duplicates
const rateLimitCache = new Map<string, number[]>(); // Track request timestamps for rate limiting
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_REQUESTS = 2; // Max 2 requests per second (Make.com/Resend limit)
const RATE_LIMIT_WINDOW_MS = 1000; // 1 second window

function getSubmissionKey(email: string, name: string): string {
  return `${email}:${name}`.toLowerCase().trim();
}

function getIdempotencyKey(email: string, name: string, services: string[]): string {
  // Create a unique key based on email, name, and services (exact, not rounded)
  // This ensures each unique submission gets a unique key
  const servicesKey = services.sort().join(',');
  return `${email}:${name}:${servicesKey}`.toLowerCase().trim();
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

function hasWebhookBeenCalled(idempotencyKey: string): boolean {
  const lastCall = webhookCallCache.get(idempotencyKey);
  if (!lastCall) {
    return false;
  }
  // Prevent duplicate webhook calls within 10 minutes (longer window)
  const timeSinceLastCall = Date.now() - lastCall;
  return timeSinceLastCall < 10 * 60 * 1000; // 10 minutes
}

function checkRateLimit(): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  
  // Get all requests in the current window
  const recentRequests: number[] = [];
  for (const [key, timestamps] of rateLimitCache.entries()) {
    const validTimestamps = timestamps.filter(ts => ts > windowStart);
    if (validTimestamps.length > 0) {
      rateLimitCache.set(key, validTimestamps);
      recentRequests.push(...validTimestamps);
    } else {
      rateLimitCache.delete(key);
    }
  }
  
  // Count requests in the last second
  const requestsInWindow = recentRequests.filter(ts => ts > windowStart).length;
  
  if (requestsInWindow >= RATE_LIMIT_REQUESTS) {
    // Find the oldest request in the window to calculate retry time
    const oldestRequest = Math.min(...recentRequests.filter(ts => ts > windowStart));
    const retryAfter = Math.ceil((oldestRequest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  return { allowed: true };
}

function recordRateLimit(): void {
  const now = Date.now();
  const key = 'global'; // Use global key for rate limiting
  
  if (!rateLimitCache.has(key)) {
    rateLimitCache.set(key, []);
  }
  
  const timestamps = rateLimitCache.get(key)!;
  timestamps.push(now);
  
  // Keep only last 100 timestamps
  if (timestamps.length > 100) {
    timestamps.splice(0, timestamps.length - 100);
  }
}

function recordSubmission(email: string, name: string, idempotencyKey: string): void {
  const key = getSubmissionKey(email, name);
  submissionCache.set(key, Date.now());
  webhookCallCache.set(idempotencyKey, Date.now());
  
  // Clean up old entries (keep cache size manageable)
  if (submissionCache.size > 1000) {
    const now = Date.now();
    for (const [k, timestamp] of submissionCache.entries()) {
      if (now - timestamp > DUPLICATE_WINDOW_MS) {
        submissionCache.delete(k);
      }
    }
  }
  
  // Clean up webhook call cache
  if (webhookCallCache.size > 1000) {
    const now = Date.now();
    for (const [k, timestamp] of webhookCallCache.entries()) {
      if (now - timestamp > 10 * 60 * 1000) { // 10 minutes
        webhookCallCache.delete(k);
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
        details: validationResult.error.issues,
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

    // Create idempotency key to prevent duplicate webhook calls
    // Use exact email + name + services (not timestamp) to catch true duplicates
    const idempotencyKey = getIdempotencyKey(
      formData.email,
      formData.name,
      formData.services
    );

    // CRITICAL: Check and record BEFORE sending webhook to prevent race conditions
    if (hasWebhookBeenCalled(idempotencyKey)) {
      console.warn('Duplicate webhook call prevented (before send)', {
        email: formData.email,
        name: formData.name,
        idempotencyKey,
        timestamp: new Date().toISOString(),
      });
      // Still record the submission attempt to prevent form resubmission
      recordSubmission(formData.email, formData.name, idempotencyKey);
      return res.status(200).json({
        success: true,
        message: 'Submission already processed. Please wait before submitting again.',
        duplicate: true,
      });
    }

    // Check rate limit before sending webhook
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      console.warn('Rate limit exceeded, delaying webhook call', {
        email: formData.email,
        retryAfter: rateLimitCheck.retryAfter,
        timestamp: new Date().toISOString(),
      });
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: `Too many requests. Please wait ${rateLimitCheck.retryAfter} second(s) before trying again.`,
        retryAfter: rateLimitCheck.retryAfter,
      });
    }

    // Record rate limit
    recordRateLimit();

    // Record webhook call IMMEDIATELY to prevent concurrent calls
    webhookCallCache.set(idempotencyKey, Date.now());
    console.log('Webhook call recorded (before send)', {
      email: formData.email,
      language: formData.language,
      idempotencyKey,
      timestamp: new Date().toISOString(),
    });

    // Build webhook payload
    const timestamp = new Date().toISOString();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
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
      language: formData.language, // CRITICAL: Must be 'en' or 'ar' - Make.com uses this for template selection
      source: 'smartpro-consultation-form',
      timestamp: timestamp,
      idempotency_key: idempotencyKey, // Prevents duplicate processing in Make.com
      request_id: requestId, // Unique request ID for tracking
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
    // Webhook call was already recorded before sending, just update submission cache
    if (webhookResponse.ok) {
      const submissionKey = getSubmissionKey(formData.email, formData.name);
      submissionCache.set(submissionKey, Date.now());
      console.log('Webhook call successful', {
        email: formData.email,
        language: formData.language,
        service_interested: primaryService,
        idempotencyKey,
        requestId,
        timestamp,
      });
    } else {
      // If webhook failed, remove from cache so it can be retried
      webhookCallCache.delete(idempotencyKey);
      console.error('Webhook call failed, removed from cache for retry', {
        email: formData.email,
        idempotencyKey,
        status: webhookResponse.status,
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Consultation request submitted successfully',
      submissionId: webhookData.id || `sub_${Date.now()}`,
      language: formData.language, // Return language for debugging
    });

  } catch (error) {
    console.error('Consultation API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
