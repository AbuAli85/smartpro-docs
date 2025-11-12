import { useState, useEffect } from 'react';
import { generateTOC, TOCSection } from '@/lib/generateTOC';

/**
 * React hook to auto-generate Table of Contents from page headings
 * 
 * @param containerId - Optional ID of container element to scan
 * @param headingLevels - Array of heading levels to include (default: [2, 3])
 * @returns Array of TOC sections with id, title, and level
 * 
 * @example
 * ```tsx
 * const sections = useTOC();
 * 
 * return (
 *   <TableOfContents 
 *     sections={sections.map(s => ({ id: s.id, title: s.title }))} 
 *   />
 * );
 * ```
 */
export function useTOC(
  containerId?: string,
  headingLevels: number[] = [2, 3]
): TOCSection[] {
  const [sections, setSections] = useState<TOCSection[]>([]);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const toc = generateTOC(containerId, headingLevels);
      setSections(toc);
    }, 100);

    return () => clearTimeout(timer);
  }, [containerId, headingLevels.join(',')]);

  return sections;
}

export type { TOCSection } from '@/lib/generateTOC';

