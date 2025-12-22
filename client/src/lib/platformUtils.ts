/**
 * Platform Utilities
 * Helper functions for platform integration and URL generation
 */

/**
 * Get platform sign-up URL with tracking parameters
 */
export function getPlatformSignUpUrl(options: {
  type: 'provider' | 'client';
  submissionId?: string;
  email?: string;
  ref?: string;
}): string {
  const baseUrl = 'https://marketing.thedigitalmorph.com/auth/sign-up';
  const params = new URLSearchParams();

  params.set('type', options.type);
  params.set('ref', options.ref || 'consultation');

  if (options.submissionId) {
    params.set('submissionId', options.submissionId);
  }

  if (options.email) {
    params.set('email', encodeURIComponent(options.email));
  }

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Track registration start and redirect to platform
 */
export async function handlePlatformRegistration(
  type: 'provider' | 'client',
  submissionId?: string,
  email?: string
): Promise<void> {
  // Track registration started
  if (submissionId && email) {
    try {
      const { trackLead, LeadStage } = await import('./leadTrackingApi');
      await trackLead({
        submissionId,
        email,
        stage: LeadStage.REGISTRATION_STARTED,
        metadata: {
          source: 'thank_you_page',
          type,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error tracking registration start:', error);
    }
  }

  // Open platform sign-up page
  const url = getPlatformSignUpUrl({
    type,
    submissionId,
    email,
    ref: 'consultation',
  });

  window.open(url, '_blank', 'noopener,noreferrer');
}

