/**
 * Analytics tracking utilities for user behavior and conversions
 */

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
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    });
  }

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', event);
  }
}

/**
 * Track page view
 */
export function trackPageView(page: PageView): void {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: page.path,
      page_title: page.title,
      page_referrer: page.referrer || document.referrer
    });
  }

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('Page View:', page);
  }
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

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, ctaType: 'primary' | 'secondary' = 'primary'): void {
  trackEvent({
    category: 'CTA',
    action: 'click',
    label: ctaName,
    value: ctaType === 'primary' ? 10 : 5
  });
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  trackEvent({
    category: 'Form',
    action: success ? 'submit_success' : 'submit_error',
    label: formName
  });
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
  trackEvent({
    category: 'Search',
    action: 'query',
    label: query,
    value: resultCount
  });
}

/**
 * Track video play
 */
export function trackVideoPlay(videoTitle: string): void {
  trackEvent({
    category: 'Video',
    action: 'play',
    label: videoTitle
  });
}

/**
 * Track download
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent({
    category: 'Download',
    action: 'click',
    label: `${fileName} (${fileType})`
  });
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
  trackEvent({
    category: 'Social',
    action: 'share',
    label: `${platform} - ${contentTitle}`
  });
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(source: string): void {
  trackEvent({
    category: 'Newsletter',
    action: 'signup',
    label: source,
    value: 15
  });
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
  trackEvent({
    category: 'Error',
    action: errorType,
    label: errorMessage
  });
}

/**
 * Track time on page
 */
export function trackTimeOnPage(pageName: string, timeInSeconds: number): void {
  trackEvent({
    category: 'Engagement',
    action: 'time_on_page',
    label: pageName,
    value: timeInSeconds
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: 25 | 50 | 75 | 100): void {
  trackEvent({
    category: 'Engagement',
    action: 'scroll_depth',
    label: `${depth}%`,
    value: depth
  });
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

// TypeScript declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

