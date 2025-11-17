/**
 * Webhook endpoint verification utility
 * Tests the Make.com webhook endpoint to ensure it's functioning correctly
 */

import { MAKE_WEBHOOK_URL } from '@/config/webhook';
import { MakeWebhookPayload } from '@/types/webhook';

export interface WebhookVerificationResult {
  success: boolean;
  statusCode?: number;
  message: string;
  responseTime?: number;
  error?: string;
  details?: {
    endpoint: string;
    timestamp: string;
    payloadReceived?: boolean;
  };
}

/**
 * Verifies the webhook endpoint is accessible and responding
 * Sends a test payload to check connectivity
 */
export async function verifyWebhookEndpoint(): Promise<WebhookVerificationResult> {
  const startTime = Date.now();
  const endpoint = MAKE_WEBHOOK_URL;

  // Create a minimal test payload
  const testPayload: MakeWebhookPayload = {
    client_name: 'Webhook Test',
    email: 'test@verification.smartpro.io',
    business_name: 'Verification Test',
    service_interested: 'Other',
    notes: 'This is an automated webhook verification test. Please ignore this submission.',
    source: 'webhook-verification',
    timestamp: new Date().toISOString(),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    // Check if response is OK (200-299)
    if (response.ok) {
      // Try to parse response
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        // Make.com might return empty response, which is fine
        responseData = null;
      }

      return {
        success: true,
        statusCode: response.status,
        message: 'Webhook endpoint is responding correctly',
        responseTime,
        details: {
          endpoint,
          timestamp: new Date().toISOString(),
          payloadReceived: true,
        },
      };
    } else {
      // Non-OK status code
      const errorText = await response.text().catch(() => 'Unknown error');
      return {
        success: false,
        statusCode: response.status,
        message: `Webhook endpoint returned error status: ${response.status}`,
        responseTime,
        error: errorText,
        details: {
          endpoint,
          timestamp: new Date().toISOString(),
        },
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          message: 'Webhook verification timed out',
          responseTime,
          error: 'Request timeout after 10 seconds',
          details: {
            endpoint,
            timestamp: new Date().toISOString(),
          },
        };
      }

      // Network error
      if (error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Failed to connect to webhook endpoint',
          responseTime,
          error: error.message,
          details: {
            endpoint,
            timestamp: new Date().toISOString(),
          },
        };
      }

      return {
        success: false,
        message: 'Webhook verification failed',
        responseTime,
        error: error.message,
        details: {
          endpoint,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return {
      success: false,
      message: 'Unknown error during webhook verification',
      responseTime,
      error: 'Unknown error',
      details: {
        endpoint,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

/**
 * Quick health check - just checks if endpoint is reachable
 * Doesn't send a full payload
 */
export async function quickHealthCheck(): Promise<boolean> {
  try {
    // Just check if we can reach the endpoint (HEAD request if supported, or minimal OPTIONS)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Try OPTIONS first (CORS preflight)
    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'OPTIONS',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response.status < 500; // Any non-server error means endpoint exists
    } catch {
      // OPTIONS might not be supported, try a minimal POST
      clearTimeout(timeoutId);
      const controller2 = new AbortController();
      const timeoutId2 = setTimeout(() => controller2.abort(), 5000);

      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true }),
        signal: controller2.signal,
      });

      clearTimeout(timeoutId2);
      return response.status < 500;
    }
  } catch {
    return false;
  }
}

