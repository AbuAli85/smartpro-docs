import { useEffect, useRef } from "react";
import { CTAContext, trackCTAImpression } from "@/lib/analyticsTracking";

export function useCTAImpression<T extends HTMLElement = HTMLElement>(context: CTAContext | null) {
  const elementRef = useRef<T | null>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!context) return;
    if (hasTrackedRef.current) return;

    const element = elementRef.current;
    if (!element || typeof window === "undefined") return;

    if (typeof IntersectionObserver === "undefined") {
      trackCTAImpression(context);
      hasTrackedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedRef.current) {
            trackCTAImpression(context);
            hasTrackedRef.current = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [context]);

  return elementRef;
}

