/**
 * Analytics tracking utilities for user behavior and conversions
 * 
 * This module provides high-level tracking functions that delegate to
 * the Google Analytics module (googleAnalytics.ts) as the single source of truth.
 */

import { 
  trackEvent as gaTrackEvent, 
  trackPageView as gaTrackPageView,
  trackSearch as gaTrackSearch,
  trackVideoPlay as gaTrackVideoPlay,
  trackFileDownload as gaTrackFileDownload,
  trackCTAClick as gaTrackCTAClick,
  trackCTAView as gaTrackCTAView,
  trackCTAConversion as gaTrackCTAConversion,
  trackFormSubmit as gaTrackFormSubmit,
  trackSignUp as gaTrackSignUp,
  trackLogin as gaTrackLogin,
  trackShare as gaTrackShare,
  trackScrollDepth as gaTrackScrollDepth,
  trackEngagementTime as gaTrackEngagementTime,
  trackException as gaTrackException
} from '@/lib/googleAnalytics';

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface PageView {
  path: string;
  title: string;
  referrer?: string;
}

/**
 * Track custom event
 */
export function trackEvent(event: AnalyticsEvent): void {
  gaTrackEvent(event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value
  });
}

/**
 * Track page view
 */
export function trackPageView(page: PageView): void {
  gaTrackPageView(page.path, page.title);
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, location: string): void {
  trackEvent({
    category: 'Button',
    action: 'click',
    label: `${buttonName} - ${location}`
  });
}

const CTA_ATTRIBUTION_KEY = 'smartpro_docs_cta_attribution';
const CTA_ATTRIBUTION_TTL = 1000 * 60 * 30; // 30 minutes

export interface CTAContext {
  id: string;
  text: string;
  location: string;
  type?: 'primary' | 'secondary';
  funnel?: string;
  destination?: string;
}

interface StoredCTAInteraction extends CTAContext {
  timestamp: number;
  stage: 'view' | 'click';
}

function setStoredCTAInteraction(interaction: StoredCTAInteraction): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CTA_ATTRIBUTION_KEY, JSON.stringify(interaction));
  } catch {
    // noop
  }
}

export function getStoredCTAInteraction(): StoredCTAInteraction | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(CTA_ATTRIBUTION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredCTAInteraction;
    if (Date.now() - parsed.timestamp > CTA_ATTRIBUTION_TTL) {
      sessionStorage.removeItem(CTA_ATTRIBUTION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearStoredCTAInteraction(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(CTA_ATTRIBUTION_KEY);
}

/**
 * Track CTA view/impression
 */
export function trackCTAImpression(context: CTAContext): void {
  gaTrackCTAView(context.id, context.text, context.location, context.type ?? 'primary');
}

/**
 * Track CTA clicks (and remember for attribution)
 */
export function trackCTAInteraction(context: CTAContext): void {
  gaTrackCTAClick(context.text, context.location, context.type ?? 'primary');
  setStoredCTAInteraction({ ...context, timestamp: Date.now(), stage: 'click' });
}

/**
 * Backwards compatible CTA click tracker
 */
export function trackCTAClick(ctaName: string, ctaLocation: string, ctaType: 'primary' | 'secondary' = 'primary'): void {
  gaTrackCTAClick(ctaName, ctaLocation, ctaType);
}

/**
 * Track CTA conversion/submission
 */
export function trackCTAConversion(
  conversionStage: 'submission' | 'view_to_submission' | 'click_to_submission' = 'submission',
  context?: CTAContext,
  metadata?: Record<string, any>
): void {
  const payload = context ?? getStoredCTAInteraction();
  if (!payload) return;

  gaTrackCTAConversion(payload.id, payload.text, conversionStage, {
    cta_location: payload.location,
    cta_type: payload.type ?? 'primary',
    cta_funnel: payload.funnel,
    cta_destination: payload.destination,
    ...metadata,
  });

  if (conversionStage === 'submission') {
    clearStoredCTAInteraction();
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  if (success) {
    gaTrackFormSubmit(formName);
  } else {
    gaTrackException(`Form submission failed: ${formName}`, false);
  }
}

/**
 * Track link click
 */
export function trackLinkClick(linkText: string, destination: string): void {
  trackEvent({
    category: 'Link',
    action: 'click',
    label: `${linkText} -> ${destination}`
  });
}

/**
 * Track search
 */
export function trackSearch(query: string, resultCount?: number): void {
  gaTrackSearch(query, resultCount);
}

/**
 * Track video play
 */
export function trackVideoPlay(videoTitle: string, videoUrl: string = ''): void {
  gaTrackVideoPlay(videoTitle, videoUrl);
}

/**
 * Track download
 */
export function trackDownload(fileName: string, fileType: string): void {
  gaTrackFileDownload(fileName, fileType);
}

/**
 * Track outbound link
 */
export function trackOutboundLink(url: string): void {
  trackEvent({
    category: 'Outbound',
    action: 'click',
    label: url
  });
}

/**
 * Track social share
 */
export function trackSocialShare(platform: string, contentTitle: string): void {
  gaTrackShare(platform, 'page', contentTitle);
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(source: string): void {
  gaTrackSignUp('newsletter_' + source);
}

/**
 * Track trial signup
 */
export function trackTrialSignup(plan: string): void {
  trackEvent({
    category: 'Conversion',
    action: 'trial_signup',
    label: plan,
    value: 100
  });
}

/**
 * Track pricing view
 */
export function trackPricingView(plan: string): void {
  trackEvent({
    category: 'Pricing',
    action: 'plan_view',
    label: plan
  });
}

/**
 * Track feature interaction
 */
export function trackFeatureInteraction(featureName: string, action: string): void {
  trackEvent({
    category: 'Feature',
    action: action,
    label: featureName
  });
}

/**
 * Track error
 */
export function trackError(errorType: string, errorMessage: string): void {
  gaTrackException(`${errorType}: ${errorMessage}`, false);
}

/**
 * Track time on page
 */
export function trackTimeOnPage(pageName: string, timeInSeconds: number): void {
  gaTrackEngagementTime(timeInSeconds);
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: 25 | 50 | 75 | 100): void {
  gaTrackScrollDepth(depth);
}

/**
 * Initialize scroll depth tracking
 */
export function initScrollDepthTracking(): void {
  if (typeof window === 'undefined') return;

  const depths = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const checkScrollDepth = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollPercentage = (scrolled / scrollHeight) * 100;

    depths.forEach((depth) => {
      if (scrollPercentage >= depth && !tracked.has(depth)) {
        trackScrollDepth(depth as 25 | 50 | 75 | 100);
        tracked.add(depth);
      }
    });
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(checkScrollDepth);
  }, { passive: true });
}

/**
 * Track user engagement session
 */
export function initEngagementTracking(): void {
  if (typeof window === 'undefined') return;

  let startTime = Date.now();
  let isActive = true;
  let totalTime = 0;

  // Track visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      totalTime += Date.now() - startTime;
      isActive = false;
    } else {
      startTime = Date.now();
      isActive = true;
    }
  });

  // Track before unload
  window.addEventListener('beforeunload', () => {
    if (isActive) {
      totalTime += Date.now() - startTime;
    }
    
    const totalSeconds = Math.floor(totalTime / 1000);
    if (totalSeconds > 5) { // Only track if user spent more than 5 seconds
      trackTimeOnPage(document.title, totalSeconds);
    }
  });
}

/**
 * Initialize all analytics tracking
 */
export function initAnalytics(): void {
  if (import.meta.env.DEV) {
    console.log('Analytics tracking initialized');
  }

  initScrollDepthTracking();
  initEngagementTracking();
}

// Note: gtag is declared in googleAnalytics.ts

