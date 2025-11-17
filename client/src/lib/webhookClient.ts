/**
 * Professional webhook client for Make.com integration
 * Handles all communication with the Make.com webhook endpoint
 */

import { MAKE_WEBHOOK_URL } from '@/config/webhook';
import { 
  MakeWebhookPayload, 
  MakeWebhookResponse,
  validateWebhookPayload,
  getPrimaryServiceForRouting,
} from '@/types/webhook';

export interface WebhookClientOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class WebhookClient {
  private url: string;
  private options: Required<WebhookClientOptions>;

  constructor(url: string = MAKE_WEBHOOK_URL, options: WebhookClientOptions = {}) {
    this.url = url;
    this.options = {
      timeout: options.timeout ?? 30000, // 30 seconds
      retries: options.retries ?? 2,
      retryDelay: options.retryDelay ?? 1000, // 1 second
    };
  }

  /**
   * Sends payload to Make.com webhook with retry logic
   */
  async send(payload: MakeWebhookPayload): Promise<MakeWebhookResponse> {
    // CRITICAL: Ensure service_interested is always present FIRST (before validation)
    // If missing, try to derive it from services field
    if (!payload.service_interested || payload.service_interested.trim().length === 0) {
      console.warn('⚠️ service_interested missing, attempting to derive from services field');
      
      // Try to get from services field
      if (payload.services) {
        // If services is a string, try to map it
        if (typeof payload.services === 'string') {
          const serviceKey = payload.services.trim();
          // Service mapping - must match SERVICE_TO_MAKE_MAP
          const serviceMap: Record<string, string> = {
            'projectManagement': 'Project Management',
            'employeeManagement': 'Employee Management',
            'accounting': 'Accounting',
            'proServices': 'PRO Services',
            'companyFormation': 'Company Formation',
            'vat': 'VAT',
            'businessConsulting': 'Business Consulting',
            'crm': 'CRM & Client Management',
            'elearning': 'E-Learning Platform',
            'contractManagement': 'Contract Management',
            'workflowAutomation': 'Workflow Automation',
            'analytics': 'Advanced Analytics',
            'api': 'API & Integrations',
            'support': '24/7 Support',
            'other': 'Other',
          };
          // Check if it's already formatted (contains space or &)
          if (serviceKey.includes(' ') || serviceKey.includes('&')) {
            // Already formatted, use as-is
            payload.service_interested = serviceKey;
            console.log('✅ service_interested already formatted:', payload.service_interested);
          } else {
            // Raw key, need to format it
            payload.service_interested = serviceMap[serviceKey] || serviceKey;
            console.log('✅ Derived service_interested from raw key:', payload.service_interested);
          }
        } else if (Array.isArray(payload.services)) {
          // If services is an array, use PRIMARY service (first one) for routing
          // This ensures correct email routing in Make.com
          const servicesArray = payload.services as string[];
          payload.service_interested = getPrimaryServiceForRouting(servicesArray);
          console.log('✅ Derived service_interested from array (using primary service):', payload.service_interested);
        }
      }
      
      // If still missing, use default
      if (!payload.service_interested || payload.service_interested.trim().length === 0) {
        payload.service_interested = 'Other';
        console.warn('⚠️ Using default service_interested: Other');
      }
    }

    // Final check: Ensure service_interested is set (should never be empty at this point)
    if (!payload.service_interested || payload.service_interested.trim().length === 0) {
      console.error('❌ CRITICAL: service_interested is still empty after fallback! Using default.');
      payload.service_interested = 'Other';
    }

    // Validate payload (after ensuring service_interested is present)
    const validation = validateWebhookPayload(payload);
    if (!validation.valid) {
      console.error('❌ Payload validation failed:', validation.errors);
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Payload validation failed',
          details: validation.errors,
        },
      };
    }

    // Add metadata
    const enrichedPayload: MakeWebhookPayload = {
      ...payload,
      timestamp: new Date().toISOString(),
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    };

    // Log final payload in development
    if (import.meta.env.DEV) {
      console.log('📦 Final payload being sent:', {
        service_interested: enrichedPayload.service_interested,
        services: enrichedPayload.services,
        has_service_interested: !!enrichedPayload.service_interested,
      });
    }

    // Attempt with retries
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= this.options.retries; attempt++) {
      try {
        const response = await this.sendRequest(enrichedPayload);
        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Don't retry on validation errors or client errors (4xx)
        if (error instanceof WebhookError && error.statusCode < 500) {
          throw error;
        }

        // Wait before retry (except on last attempt)
        if (attempt < this.options.retries) {
          await this.delay(this.options.retryDelay * (attempt + 1));
        }
      }
    }

    // All retries failed
    throw new WebhookError(
      `Failed after ${this.options.retries + 1} attempts: ${lastError?.message || 'Unknown error'}`,
      0,
      lastError || undefined
    );
  }

  /**
   * Sends a single request to the webhook
   */
  private async sendRequest(payload: MakeWebhookPayload): Promise<MakeWebhookResponse> {
    // Final validation: Ensure service_interested is present
    if (!payload.service_interested || payload.service_interested.trim().length === 0) {
      console.error('❌ WebhookClient: service_interested is missing in payload!', payload);
      throw new WebhookError(
        'Payload validation failed: service_interested is required',
        400
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.options.timeout);

    try {
      // Log payload in development for debugging
      if (import.meta.env.DEV) {
        console.log('🌐 Sending to webhook:', this.url);
        console.log('📦 Payload includes service_interested:', !!payload.service_interested);
        console.log('📦 service_interested value:', payload.service_interested);
      }

      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle different response statuses
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new WebhookError(
          `Webhook request failed: ${errorText}`,
          response.status
        );
      }

      // Try to parse JSON response, fallback to success if not JSON
      try {
        const data = await response.json();
        return {
          success: true,
          message: data.message || 'Request successful',
          data: data.data,
        };
      } catch {
        // Make.com might return empty response or non-JSON
        return {
          success: true,
          message: 'Request successful',
        };
      }
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof WebhookError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new WebhookError('Request timeout', 408, error);
        }
        throw new WebhookError(`Network error: ${error.message}`, 0, error);
      }

      throw new WebhookError('Unknown error occurred', 0);
    }
  }

  /**
   * Delay helper for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Custom error class for webhook errors
 */
export class WebhookError extends Error {
  constructor(
    message: string,
    public statusCode: number = 0,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'WebhookError';
    Object.setPrototypeOf(this, WebhookError.prototype);
  }
}

/**
 * Default webhook client instance
 */
export const webhookClient = new WebhookClient();

