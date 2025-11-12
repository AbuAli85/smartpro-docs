import { useState, useEffect, useMemo } from 'react';
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
export function useTOC(
  containerId?: string,
  headingLevels: number[] = [2, 3],
  iconMap?: TOCIconMap
): Array<TOCSection & { icon?: React.ReactNode }> {
  const [sections, setSections] = useState<TOCSection[]>([]);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const toc = generateTOC(containerId, headingLevels);
      setSections(toc);
    }, 100);

    return () => clearTimeout(timer);
  }, [containerId, headingLevels.join(',')]);

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

