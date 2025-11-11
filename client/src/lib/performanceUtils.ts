/**
 * Performance monitoring and optimization utilities
 */

/**
 * Measure page load performance
 */
export function measurePageLoad(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    // Get performance data
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;
    const renderTime = perfData.domComplete - perfData.domLoading;

    console.log('Performance Metrics:', {
      pageLoadTime: `${pageLoadTime}ms`,
      connectTime: `${connectTime}ms`,
      renderTime: `${renderTime}ms`
    });

    // Report to analytics if available
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'page_load',
        value: pageLoadTime,
        event_category: 'Performance'
      });
    }
  });
}

/**
 * Measure Core Web Vitals
 */
export function measureWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;
    
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        metric_name: 'LCP',
        value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
        event_category: 'Performance'
      });
    }
  });

  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP observation not supported');
  }

  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      const fid = entry.processingStart - entry.startTime;
      console.log('FID:', fid);
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          metric_name: 'FID',
          value: Math.round(fid),
          event_category: 'Performance'
        });
      }
    });
  });

  try {
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID observation not supported');
  }

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as any[]) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    
    console.log('CLS:', clsValue);
    
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        metric_name: 'CLS',
        value: Math.round(clsValue * 1000),
        event_category: 'Performance'
      });
    }
  });

  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('CLS observation not supported');
  }
}

/**
 * Lazy load images
 */
export function lazyLoadImages(): void {
  if (typeof window === 'undefined') return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  const images = document.querySelectorAll('img[data-src]');
  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(resources: string[]): void {
  if (typeof window === 'undefined') return;

  resources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    // Determine resource type
    if (resource.endsWith('.woff2') || resource.endsWith('.woff')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (resource.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      link.as = 'image';
    }
    
    link.href = resource;
    document.head.appendChild(link);
  });
}

/**
 * Prefetch next pages for faster navigation
 */
export function prefetchPages(urls: string[]): void {
  if (typeof window === 'undefined') return;

  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Monitor long tasks
 */
export function monitorLongTasks(): void {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('Long task detected:', {
          duration: entry.duration,
          startTime: entry.startTime
        });

        if (window.gtag && entry.duration > 50) {
          window.gtag('event', 'long_task', {
            duration: Math.round(entry.duration),
            event_category: 'Performance'
          });
        }
      }
    });

    observer.observe({ type: 'longtask', buffered: true });
  } catch (e) {
    console.warn('Long task observation not supported');
  }
}

/**
 * Get memory usage (if available)
 */
export function getMemoryUsage(): any {
  if (typeof window === 'undefined') return null;

  const performance = window.performance as any;
  if (performance.memory) {
    return {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      usagePercentage: Math.round(
        (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
      )
    };
  }
  
  return null;
}

/**
 * Optimize images with responsive loading
 */
export function setupResponsiveImages(): void {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img[data-srcset]');
  
  images.forEach((img) => {
    const element = img as HTMLImageElement;
    const srcset = element.dataset.srcset;
    
    if (srcset) {
      element.srcset = srcset;
      element.removeAttribute('data-srcset');
    }
  });
}

/**
 * Measure component render time
 */
export function measureRenderTime(componentName: string, callback: () => void): void {
  const startTime = performance.now();
  
  callback();
  
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  
  console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
  
  if (renderTime > 16) { // 60fps = 16.67ms per frame
    console.warn(`${componentName} took longer than 16ms to render`);
  }
}

/**
 * Initialize all performance monitoring
 */
export function initPerformanceMonitoring(): void {
  if (import.meta.env.DEV) {
    console.log('Performance monitoring enabled');
  }
  
  measurePageLoad();
  measureWebVitals();
  monitorLongTasks();
  lazyLoadImages();
}

// TypeScript declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

