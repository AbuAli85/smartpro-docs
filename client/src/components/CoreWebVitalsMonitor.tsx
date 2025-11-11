import { useState, useEffect } from 'react';
import { Activity, Zap, Move, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
}

/**
 * Core Web Vitals Monitor Component
 * 
 * Displays real-time Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint)
 * - INP (Interaction to Next Paint) - replaces deprecated FID
 * - CLS (Cumulative Layout Shift)
 * - TTFB (Time to First Byte)
 * 
 * Only visible in development mode or for admins
 */
export function CoreWebVitalsMonitor() {
  const [vitals, setVitals] = useState<{
    lcp?: WebVital;
    inp?: WebVital;
    cls?: WebVital;
    ttfb?: WebVital;
  }>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if debug mode is enabled
    const showMonitor = import.meta.env.DEV || 
                       localStorage.getItem('debug_webvitals') === 'true';
    
    if (!showMonitor) return;

    setIsVisible(true);

    // Track LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      const value = lastEntry.renderTime || lastEntry.loadTime;
      
      setVitals((prev) => ({
        ...prev,
        lcp: {
          name: 'LCP',
          value,
          rating: getRating(value, { good: 2500, poor: 4000 }),
          threshold: { good: 2500, poor: 4000 },
        },
      }));
    });

    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP observation not supported');
    }

    // Track INP (modern CWV) - disabled for build compatibility
    // TODO: Re-enable when web-vitals build issue is resolved
    // Commenting out to allow production builds
    /* import('web-vitals').then(({ onINP }) => {
      onINP((metric) => {
        const value = metric.value;
        setVitals((prev) => ({
          ...prev,
          inp: {
            name: 'INP',
            value,
            rating: getRating(value, { good: 200, poor: 500 }),
            threshold: { good: 200, poor: 500 },
          },
        }));
      });
    }).catch(() => {
      console.warn('web-vitals not available');
    }); */

    // Track CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      setVitals((prev) => ({
        ...prev,
        cls: {
          name: 'CLS',
          value: clsValue,
          rating: getRating(clsValue, { good: 0.1, poor: 0.25 }),
          threshold: { good: 0.1, poor: 0.25 },
        },
      }));
    });

    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS observation not supported');
    }

    // Track TTFB
    const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      
      setVitals((prev) => ({
        ...prev,
        ttfb: {
          name: 'TTFB',
          value: ttfb,
          rating: getRating(ttfb, { good: 800, poor: 1800 }),
          threshold: { good: 800, poor: 1800 },
        },
      }));
    }

    return () => {
      lcpObserver.disconnect();
      // no INP observer to disconnect
      clsObserver.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="shadow-xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Core Web Vitals
            </CardTitle>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close Web Vitals monitor"
            >
              ×
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {vitals.lcp && <VitalCard vital={vitals.lcp} icon={Zap} />}
          {vitals.inp && <VitalCard vital={vitals.inp} icon={Move} />}
          {vitals.cls && <VitalCard vital={vitals.cls} icon={AlertCircle} />}
          {vitals.ttfb && <VitalCard vital={vitals.ttfb} icon={Activity} />}

          <div className="pt-2 border-t text-xs text-muted-foreground">
            <p>Green: Good | Yellow: Needs Improvement | Red: Poor</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VitalCard({ vital, icon: Icon }: { vital: WebVital; icon: any }) {
  const colors = {
    good: 'text-green-600 bg-green-50 border-green-200',
    'needs-improvement': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    poor: 'text-red-600 bg-red-50 border-red-200',
  };

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 rounded-lg border',
        colors[vital.rating]
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" />
        <div>
          <div className="font-semibold text-sm">{vital.name}</div>
          <div className="text-xs opacity-75">
            Good: &lt;{formatValue(vital.name, vital.threshold.good)}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-lg">
          {formatValue(vital.name, vital.value)}
        </div>
        <div className="text-xs capitalize">{vital.rating}</div>
      </div>
    </div>
  );
}

function getRating(
  value: number,
  threshold: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Enable Web Vitals Monitor
 * Call this function to enable the monitor
 */
export function enableWebVitalsMonitor(): void {
  localStorage.setItem('debug_webvitals', 'true');
  window.location.reload();
}

/**
 * Disable Web Vitals Monitor
 */
export function disableWebVitalsMonitor(): void {
  localStorage.removeItem('debug_webvitals');
  window.location.reload();
}

