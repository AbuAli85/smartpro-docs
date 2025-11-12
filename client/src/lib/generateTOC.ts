/**
 * Auto-generate Table of Contents from page headings
 * 
 * This utility scans a page's DOM for headings (h2, h3) and generates
 * a sections array that can be used with the TableOfContents component.
 * 
 * Usage:
 * ```tsx
 * const sections = useMemo(() => generateTOC(), []);
 * ```
 */

export interface TOCSection {
  id: string;
  title: string;
  level: number;
}

/**
 * Generate a URL-friendly ID from a heading text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Auto-generate table of contents from headings in the DOM
 * 
 * @param containerId - Optional ID of container element to scan (defaults to document)
 * @param headingLevels - Array of heading levels to include (default: [2, 3])
 * @returns Array of TOC sections with id, title, and level
 */
export function generateTOC(
  containerId?: string,
  headingLevels: number[] = [2, 3]
): TOCSection[] {
  const container = containerId 
    ? document.getElementById(containerId)
    : document;

  if (!container) {
    return [];
  }

  const selector = headingLevels.map(level => `h${level}`).join(', ');
  const headings = container.querySelectorAll<HTMLElement>(selector);

  const sections: TOCSection[] = [];

  headings.forEach((heading) => {
    const text = heading.textContent?.trim() || '';
    if (!text) return;

    const id = heading.id || slugify(text);
    const level = parseInt(heading.tagName.charAt(1));

    // Ensure the heading has an ID for anchor linking
    if (!heading.id) {
      heading.id = id;
    }

    sections.push({
      id,
      title: text,
      level,
    });
  });

  return sections;
}

// Note: This file is framework-agnostic
// For React usage, import useTOC hook from '@/hooks/useTOC'

