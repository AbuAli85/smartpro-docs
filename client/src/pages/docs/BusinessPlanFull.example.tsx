/**
 * Example: Using auto-generated TOC with icons
 * 
 * This demonstrates how to use the useTOC hook with an icon map
 * to replace the manual sections array.
 * 
 * To use this approach, replace the manual sections array in BusinessPlanFull.tsx
 * with this implementation.
 */

import { useMemo } from 'react';
import { Target, Users, TrendingUp, CheckCircle, Calendar, DollarSign } from 'lucide-react';
import { useTOC } from '@/hooks/useTOC';
import TableOfContents from '@/components/TableOfContents';

// Example usage in BusinessPlanFull component:
export function BusinessPlanFullWithAutoTOC() {
  // Define icon map for sections
  const iconMap = useMemo(() => ({
    'executive-summary': <Target className="w-5 h-5" />,
    'company-description': <Users className="w-5 h-5" />,
    'market-analysis': <TrendingUp className="w-5 h-5" />,
    'products-services': <CheckCircle className="w-5 h-5" />,
    'marketing-sales': <Users className="w-5 h-5" />,
    'operations': <Calendar className="w-5 h-5" />,
    'organization': <Users className="w-5 h-5" />,
    'financials': <DollarSign className="w-5 h-5" />,
    'implementation': <Calendar className="w-5 h-5" />,
    'appendices': <CheckCircle className="w-5 h-5" />,
  }), []);

  // Auto-generate TOC from page headings
  const tocSections = useTOC(undefined, [2, 3], iconMap);

  // Convert to TableOfContents format
  const sections = useMemo(() => 
    tocSections.map(s => ({ id: s.id, title: s.title, icon: s.icon })),
    [tocSections]
  );

  return (
    <TableOfContents sections={sections} title="Table of Contents" />
  );
}

/**
 * Benefits of using auto-generated TOC:
 * 
 * 1. Automatic sync with page headings
 * 2. No manual maintenance when headings change
 * 3. Ensures all headings are included
 * 4. Reduces errors from mismatched IDs
 * 5. Still supports icons via iconMap
 * 
 * Note: Make sure all section headings have proper IDs:
 * <section id="executive-summary">
 *   <h2>Executive Summary</h2>
 * </section>
 */

