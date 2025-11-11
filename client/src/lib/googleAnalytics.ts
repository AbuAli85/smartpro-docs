/**
 * Google Analytics 4 Integration
 * 
 * Complete GA4 setup with:
 * - Automatic page view tracking
 * - Enhanced ecommerce events
 * - Custom event tracking
 * - User properties
 * - Conversion tracking
 */

// Extend Window interface for gtag
interface GtagFunction {
  (...args: any[]): void;
}

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: any[];
  }
}

/**
 * Initialize Google Analytics 4
 */
export function initGoogleAnalytics(measurementId: string): void {
  if (typeof window === 'undefined') return;
  if (!measurementId) {
    console.warn('GA4: No measurement ID provided');
    return;
  }

  // Check if already initialized
  if (typeof window.gtag !== 'undefined') {
    console.log('GA4: Already initialized');
    return;
  }

  // Create dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  // Initialize with timestamp
  window.gtag('js', new Date());
  
  // Configure GA4
  window.gtag('config', measurementId, {
    send_page_view: false, // We'll handle page views manually
    cookie_flags: 'SameSite=None;Secure',
  });

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  if (import.meta.env.DEV) {
    console.log('GA4: Initialized with ID:', measurementId);
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title,
    page_location: window.location.origin + url
  });

  if (import.meta.env.DEV) {
    console.log('GA4: Page view tracked', { url, title, location: window.location.origin + url });
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, parameters);

  if (import.meta.env.DEV) {
    console.log('GA4: Event tracked', { eventName, parameters });
  }
}

/**
 * Enhanced Ecommerce - View Item
 */
export function trackViewItem(item: {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  currency?: string;
}): void {
  trackEvent('view_item', {
    currency: item.currency || 'USD',
    value: item.price || 0,
    items: [item],
  });
}

/**
 * Enhanced Ecommerce - Add to Cart
 */
export function trackAddToCart(item: {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  currency?: string;
}): void {
  trackEvent('add_to_cart', {
    currency: item.currency || 'USD',
    value: item.price * (item.quantity || 1),
    items: [{ ...item, quantity: item.quantity || 1 }],
  });
}

/**
 * Enhanced Ecommerce - Begin Checkout
 */
export function trackBeginCheckout(items: any[], value: number): void {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value,
    items,
  });
}

/**
 * Enhanced Ecommerce - Purchase
 */
export function trackPurchase(
  transactionId: string,
  value: number,
  items: any[],
  currency: string = 'USD'
): void {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value,
    currency,
    items,
  });
}

/**
 * Lead Generation - Submit Form
 */
export function trackFormSubmit(formName: string, formData?: Record<string, any>): void {
  trackEvent('generate_lead', {
    form_name: formName,
    ...formData,
  });
}

/**
 * User Engagement - Sign Up
 */
export function trackSignUp(method: string): void {
  trackEvent('sign_up', {
    method,
  });
}

/**
 * User Engagement - Login
 */
export function trackLogin(method: string): void {
  trackEvent('login', {
    method,
  });
}

/**
 * Content Interaction - Search
 */
export function trackSearch(searchTerm: string, resultsCount?: number): void {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/**
 * Content Interaction - Share
 */
export function trackShare(method: string, contentType: string, contentId: string): void {
  trackEvent('share', {
    method,
    content_type: contentType,
    content_id: contentId,
  });
}

/**
 * Video Interaction
 */
export function trackVideoPlay(videoTitle: string, videoUrl: string): void {
  trackEvent('video_start', {
    video_title: videoTitle,
    video_url: videoUrl,
  });
}

export function trackVideoProgress(
  videoTitle: string,
  progress: number
): void {
  trackEvent('video_progress', {
    video_title: videoTitle,
    video_percent: progress,
  });
}

export function trackVideoComplete(videoTitle: string): void {
  trackEvent('video_complete', {
    video_title: videoTitle,
  });
}

/**
 * File Download
 */
export function trackFileDownload(fileName: string, fileType: string): void {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Outbound Link Click
 */
export function trackOutboundClick(url: string, linkText?: string): void {
  trackEvent('click', {
    link_url: url,
    link_text: linkText,
    outbound: true,
  });
}

/**
 * CTA Button Click
 */
export function trackCTAClick(
  ctaText: string,
  ctaLocation: string,
  ctaType: 'primary' | 'secondary' = 'primary'
): void {
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_type: ctaType,
  });
}

/**
 * Pricing Plan View
 */
export function trackPricingView(planName: string, planPrice: number): void {
  trackEvent('view_promotion', {
    promotion_name: planName,
    value: planPrice,
  });
}

/**
 * Set User Properties
 */
export function setUserProperties(properties: Record<string, any>): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('set', 'user_properties', properties);

  if (import.meta.env.DEV) {
    console.log('GA4: User properties set', properties);
  }
}

/**
 * Set User ID
 */
export function setUserId(userId: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', import.meta.env.VITE_GA4_MEASUREMENT_ID, {
    user_id: userId,
  });

  if (import.meta.env.DEV) {
    console.log('GA4: User ID set', userId);
  }
}

/**
 * Custom Dimension/Metric
 */
export function setCustomDimension(name: string, value: any): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('set', name, value);

  if (import.meta.env.DEV) {
    console.log('GA4: Custom dimension set', { name, value });
  }
}

/**
 * Exception/Error Tracking
 */
export function trackException(
  description: string,
  fatal: boolean = false
): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exception', {
    description,
    fatal,
  });

  if (import.meta.env.DEV) {
    console.log('GA4: Exception tracked', { description, fatal });
  }
}

/**
 * Timing Events
 */
export function trackTiming(
  category: string,
  variable: string,
  value: number,
  label?: string
): void {
  trackEvent('timing_complete', {
    event_category: category,
    name: variable,
    value,
    event_label: label,
  });
}

/**
 * Scroll Depth Tracking
 */
export function trackScrollDepth(depth: number): void {
  trackEvent('scroll', {
    percent_scrolled: depth,
  });
}

/**
 * Engagement Time Tracking
 */
export function trackEngagementTime(seconds: number): void {
  trackEvent('user_engagement', {
    engagement_time_msec: seconds * 1000,
  });
}

/**
 * Conversion Events
 */
export function trackConversion(conversionName: string, value?: number): void {
  trackEvent(conversionName, {
    value,
    currency: 'USD',
  });
}

/**
 * A/B Test Tracking
 */
export function trackExperiment(
  experimentId: string,
  variantId: string
): void {
  setCustomDimension('experiment_id', experimentId);
  setCustomDimension('variant_id', variantId);
  
  trackEvent('experiment_impression', {
    experiment_id: experimentId,
    variant_id: variantId,
  });
}

/**
 * Consent Mode (GDPR Compliance)
 */
export function updateConsent(
  analyticsConsent: 'granted' | 'denied',
  advertisingConsent: 'granted' | 'denied'
): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', {
    analytics_storage: analyticsConsent,
    ad_storage: advertisingConsent,
  });

  if (import.meta.env.DEV) {
    console.log('GA4: Consent updated', { analyticsConsent, advertisingConsent });
  }
}

/**
 * Disable Analytics
 */
export function disableAnalytics(): void {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (measurementId) {
    (window as any)[`ga-disable-${measurementId}`] = true;
    if (import.meta.env.DEV) {
      console.log('GA4: Analytics disabled');
    }
  }
}

/**
 * Enable Analytics
 */
export function enableAnalytics(): void {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (measurementId) {
    (window as any)[`ga-disable-${measurementId}`] = false;
    if (import.meta.env.DEV) {
      console.log('GA4: Analytics enabled');
    }
  }
}

