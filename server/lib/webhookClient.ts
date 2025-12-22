/**
 * Server-side Webhook Client for Make.com
 * Forwards consultation form submissions to Make.com webhook
 */

// Webhook URL from environment or default
// Submission webhook for consultation form submissions
const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 
  'https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8';

export interface WebhookPayload {
  form_type: string;
  client_name: string;
  email: string;
  phone?: string;
  business_name?: string; // Fixed: was 'company', now 'business_name'
  business_type?: string;
  services?: string[]; // Array of service names in user's language (Arabic if language is 'ar', English otherwise)
  services_english?: string[]; // English services array (for routing/reference)
  services_summary?: string; // Comma-separated string in user's language (for email display)
  services_summary_english?: string; // English summary (for reference)
  service_interested: string; // Primary service for email routing (always English)
  service_interested_translated?: string; // Primary service in user's language (for email display)
  budget?: string;
  timeline?: string;
  preferred_contact?: string;
  preferred_time?: string;
  location?: string;
  primary_message?: string;
  notes?: string; // Added: required by Make.com Module 25, includes services list
  language?: string;
  source?: string; // Added: required by Make.com
  timestamp?: string;
  submission_id?: string;
  [key: string]: any;
}

export interface WebhookResponse {
  success: boolean;
  message?: string;
  data?: {
    execution_id?: string;
  };
  error?: {
    code?: string;
    message: string;
    details?: unknown;
  };
}

export class WebhookClient {
  private url: string;

  constructor(url: string = WEBHOOK_URL) {
    this.url = url;
  }

  async send(payload: WebhookPayload): Promise<WebhookResponse> {
    if (!this.url || this.url.trim() === '') {
      console.error('❌ Make.com webhook URL not configured');
      console.error('   Please set MAKE_WEBHOOK_URL environment variable');
      return {
        success: false,
        error: {
          message: 'Webhook URL not configured',
        },
      };
    }

    console.log('📤 Sending webhook to Make.com:', {
      url: this.url,
      payloadKeys: Object.keys(payload),
      submissionId: payload.submission_id,
      email: payload.email,
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

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

      console.log('📥 Webhook response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('❌ Webhook request failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        return {
          success: false,
          error: {
            message: `Webhook request failed: ${errorText}`,
            code: response.status.toString(),
          },
        };
      }

      try {
        const data = await response.json();
        console.log('✅ Webhook success:', {
          message: data.message,
          executionId: data.data?.execution_id,
        });
        return {
          success: true,
          message: data.message || 'Request successful',
          data: data.data,
        };
      } catch {
        // Make.com might return empty response (this is normal)
        console.log('✅ Webhook success (empty response - this is normal for Make.com)');
        return {
          success: true,
          message: 'Request successful',
        };
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('❌ Webhook timeout after 30 seconds');
        return {
          success: false,
          error: {
            message: 'Request timeout',
            code: 'TIMEOUT',
          },
        };
      }

      console.error('❌ Webhook network error:', {
        message: error.message,
        stack: error.stack,
      });
      return {
        success: false,
        error: {
          message: error.message || 'Network error occurred',
          code: 'NETWORK_ERROR',
        },
      };
    }
  }
}

export const webhookClient = new WebhookClient();
