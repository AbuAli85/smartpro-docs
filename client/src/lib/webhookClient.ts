/**
 * Professional webhook client for Make.com integration
 * Handles all communication with the Make.com webhook endpoint
 */

import { MAKE_WEBHOOK_URL } from '@/config/webhook';
import { 
  MakeWebhookPayload, 
  MakeWebhookResponse,
  validateWebhookPayload,
  formatServicesForMake,
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
    // Validate payload before sending
    const validation = validateWebhookPayload(payload);
    if (!validation.valid) {
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.options.timeout);

    try {
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

