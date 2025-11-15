import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'wouter';
import { generateTOC, TOCSection } from '@/lib/generateTOC';

/**
 * Icon mapping type for TOC sections
 */
export interface TOCIconMap {
  [key: string]: React.ReactNode;
}

/**
 * React hook to auto-generate Table of Contents from page headings
 * 
 * @param containerId - Optional ID of container element to scan
 * @param headingLevels - Array of heading levels to include (default: [2, 3])
 * @param iconMap - Optional map of section IDs to icons
 * @returns Array of TOC sections with id, title, level, and optional icon
 * 
 * @example
 * ```tsx
 * const sections = useTOC();
 * 
 * return (
 *   <TableOfContents 
 *     sections={sections.map(s => ({ id: s.id, title: s.title, icon: s.icon }))} 
 *   />
 * );
 * ```
 * 
 * @example With icons
 * ```tsx
 * import { Target, Users } from 'lucide-react';
 * 
 * const iconMap = {
 *   'executive-summary': <Target className="w-5 h-5" />,
 *   'company-description': <Users className="w-5 h-5" />,
 * };
 * 
 * const sections = useTOC(undefined, [2, 3], iconMap);
 * ```
 */
export interface UseTOCOptions {
  containerId?: string;
  headingLevels?: number[];
  iconMap?: TOCIconMap;
  delay?: number;
  prefetchOnRouteChange?: boolean;
}

export function useTOC({
  containerId,
  headingLevels = [2, 3],
  iconMap,
  delay = 100,
  prefetchOnRouteChange = true,
}: UseTOCOptions = {}): Array<TOCSection & { icon?: React.ReactNode }> {
  const [sections, setSections] = useState<TOCSection[]>([]);
  const [location] = useLocation();
  const headingSignature = useMemo(() => headingLevels.join(','), [headingLevels]);

  const refreshTOC = useCallback(() => {
    const toc = generateTOC(containerId, headingLevels);
    setSections(toc);
  }, [containerId, headingSignature, headingLevels]);

  useEffect(() => {
    // Delay ensures the DOM updates settle before scanning
    let frame: number | null = null;
    let timer: number | null = null;

    frame = window.requestAnimationFrame(() => {
      timer = window.setTimeout(refreshTOC, delay);
    });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (timer) clearTimeout(timer);
    };
  }, [refreshTOC, delay]);

  useEffect(() => {
    if (!prefetchOnRouteChange) return;
    let frame: number | null = null;
    frame = window.requestAnimationFrame(() => refreshTOC());
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location, prefetchOnRouteChange, refreshTOC]);

  // Add icons to sections if iconMap provided
  const sectionsWithIcons = useMemo(() => {
    if (!iconMap) return sections;
    return sections.map(section => ({
      ...section,
      icon: iconMap[section.id],
    }));
  }, [sections, iconMap]);

  return sectionsWithIcons;
}

export type { TOCSection } from '@/lib/generateTOC';

