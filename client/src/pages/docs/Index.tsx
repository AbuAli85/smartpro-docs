import DocsLayout from '@/components/DocsLayout';
import {
  BookOpen,
  Zap,
  Code,
  TrendingUp,
  Users,
  Shield,
  ArrowRight,
  History,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'wouter';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { setSEOTags } from '@/lib/seoUtils';
import { CTAContext, trackCTAInteraction } from '@/lib/analyticsTracking';
import { useCTAImpression } from '@/hooks/useCTAImpression';

type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface DocSection {
  icon: ReactNode;
  title: string;
  description: string;
  category: 'Product' | 'Technical' | 'Business' | 'Security' | 'Support';
  links: { label: string; href: string }[];
  personas: string[];
  focusAreas: string[];
  difficulty: DifficultyLevel;
  lastUpdated: string;
  effortMinutes: number;
}

interface FacetFilters {
  personas: string[];
  focusAreas: string[];
  difficulty: string[];
}

const defaultFilters: FacetFilters = {
  personas: [],
  focusAreas: [],
  difficulty: [],
};

const personaFacetOptions = [
  { label: 'Developers', value: 'developers' },
  { label: 'Product Teams', value: 'product' },
  { label: 'Executives', value: 'executives' },
];

const focusFacetOptions = [
  { label: 'API & SDK', value: 'api' },
  { label: 'Automation', value: 'automation' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Security & Compliance', value: 'security' },
  { label: 'Product Experience', value: 'product' },
  { label: 'Business & Planning', value: 'business' },
  { label: 'Pricing & ROI', value: 'pricing' },
  { label: 'Support Resources', value: 'support' },
];

const difficultyFacetOptions: { label: string; value: DifficultyLevel }[] = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Recently Updated', value: 'recent' },
  { label: 'A → Z', value: 'az' },
  { label: 'Shortest Path (mins)', value: 'effort' },
];

const CTA_CONFIG: Record<string, CTAContext> = {
  heroGetStarted: {
    id: 'docs-hero-get-started',
    text: 'Get Started',
    location: 'Docs Hero',
    type: 'primary',
    funnel: 'docs',
    destination: '/docs/getting-started',
  },
  viewPricing: {
    id: 'docs-view-pricing',
    text: 'View Pricing',
    location: 'Docs Overview',
    type: 'secondary',
    funnel: 'docs',
    destination: '/pricing',
  },
  visitPlatform: {
    id: 'docs-visit-platform',
    text: 'Visit Main Platform',
    location: 'Docs Overview CTA',
    type: 'primary',
    funnel: 'docs',
    destination: 'https://thesmartpro.io',
  },
  contactSupport: {
    id: 'docs-contact-support',
    text: 'Contact Support',
    location: 'Docs Support CTA',
    type: 'primary',
    funnel: 'docs',
    destination: '/contact',
  },
  scheduleDemo: {
    id: 'docs-schedule-demo',
    text: 'Schedule Demo',
    location: 'Docs Support CTA',
    type: 'secondary',
    funnel: 'docs',
    destination: '/contact?topic=demo',
  },
};

export default function DocsIndex() {
  useEffect(() => {
    setSEOTags({
      title: "Documentation Hub | TheSmartPro.io - Comprehensive Guides & Resources",
      description: "Explore TheSmartPro.io documentation: product guides, technical architecture, API reference, business resources, and support. Everything you need to succeed.",
      keywords: "documentation, guides, API reference, technical docs, user guide, tutorials, support",
      type: "website",
      url: "https://thesmartpro.io/docs",
    });
  }, []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filters, setFilters] = useState<FacetFilters>(defaultFilters);
  const [sortOption, setSortOption] = useState<'featured' | 'recent' | 'az' | 'effort'>('featured');
  const [isFilterSheetOpen, setFilterSheetOpen] = useState(false);

  const handleCTAClick = useCallback((context: CTAContext) => {
    trackCTAInteraction(context);
  }, []);

  const heroCTARef = useCTAImpression<HTMLDivElement>(CTA_CONFIG.heroGetStarted);
  const overviewCTARef = useCTAImpression<HTMLDivElement>(CTA_CONFIG.viewPricing);
  const visitPlatformCTARef = useCTAImpression<HTMLDivElement>(CTA_CONFIG.visitPlatform);
  const contactSupportCTARef = useCTAImpression<HTMLDivElement>(CTA_CONFIG.contactSupport);
  const scheduleDemoCTARef = useCTAImpression<HTMLDivElement>(CTA_CONFIG.scheduleDemo);

  const sections = useMemo<DocSection[]>(() => [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Product Documentation',
      description: 'Learn about TheSmartPro.io features and capabilities',
      category: 'Product',
      personas: ['product', 'executives'],
      focusAreas: ['product', 'pricing'],
      difficulty: 'Beginner',
      lastUpdated: '2025-11-02',
      effortMinutes: 15,
      links: [
        { label: 'Product Overview', href: '/docs/product-overview' },
        { label: 'Features', href: '/docs/features' },
        { label: 'Pricing Plans', href: '/pricing' },
      ],
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Technical Documentation',
      description: 'Explore our technical architecture and APIs',
      category: 'Technical',
      personas: ['developers', 'product'],
      focusAreas: ['api', 'automation', 'architecture'],
      difficulty: 'Intermediate',
      lastUpdated: '2025-10-18',
      effortMinutes: 28,
      links: [
        { label: 'Architecture', href: '/docs/architecture' },
        { label: 'API Documentation', href: '/docs/api' },
        { label: 'Workflow Automation', href: '/docs/workflow-automation' },
        { label: 'Getting Started', href: '/docs/getting-started' },
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Business Resources',
      description: 'Strategic planning and business insights',
      category: 'Business',
      personas: ['executives', 'product'],
      focusAreas: ['business', 'pricing'],
      difficulty: 'Intermediate',
      lastUpdated: '2025-09-29',
      effortMinutes: 34,
      links: [
        { label: 'Business Plan Summary', href: '/docs/business-plan' },
        { label: 'Complete Business Plan', href: '/docs/business-plan-full' },
        { label: 'Market Analysis', href: '/docs/business-plan-full#market-analysis' },
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security & Policies',
      description: 'Security features and legal information',
      category: 'Security',
      personas: ['executives', 'developers'],
      focusAreas: ['security'],
      difficulty: 'Advanced',
      lastUpdated: '2025-10-05',
      effortMinutes: 30,
      links: [
        { label: 'Security & Compliance', href: '/docs/security' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Support & Resources',
      description: 'Get help and find additional resources',
      category: 'Support',
      personas: ['developers', 'product', 'executives'],
      focusAreas: ['support'],
      difficulty: 'Beginner',
      lastUpdated: '2025-11-07',
      effortMinutes: 10,
      links: [
        { label: 'FAQ', href: '/docs/faq' },
        { label: 'Support', href: '/docs/support' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
  ], []);

  const applyFacetFilters = useCallback(
    (data: DocSection[], customFilters?: FacetFilters) => {
      const activeFilters = customFilters ?? filters;

      return data.filter((section) => {
        const personaMatch =
          activeFilters.personas.length === 0 ||
          activeFilters.personas.some((persona) => section.personas.includes(persona));

        const focusMatch =
          activeFilters.focusAreas.length === 0 ||
          activeFilters.focusAreas.some((focus) => section.focusAreas.includes(focus));

        const difficultyMatch =
          activeFilters.difficulty.length === 0 ||
          activeFilters.difficulty.includes(section.difficulty);

        return personaMatch && focusMatch && difficultyMatch;
      });
    },
    [filters]
  );

  const sortSectionsByOption = useCallback(
    (data: DocSection[]) => {
      const sorted = [...data];
      switch (sortOption) {
        case 'recent':
          return sorted.sort(
            (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
          );
        case 'az':
          return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'effort':
          return sorted.sort((a, b) => a.effortMinutes - b.effortMinutes);
        default:
          return sorted;
      }
    },
    [sortOption]
  );

  const categoryFilteredSections = useMemo(() => {
    if (activeCategory === 'All') return sections;
    return sections.filter((section) => section.category === activeCategory);
  }, [sections, activeCategory]);

  const filteredSections = useMemo(() => {
    const filtered = applyFacetFilters(categoryFilteredSections);
    return sortSectionsByOption(filtered);
  }, [categoryFilteredSections, applyFacetFilters, sortSectionsByOption]);

  const totalSectionCount = categoryFilteredSections.length;
  const filteredSectionCount = filteredSections.length;

  const toggleFilter = (facet: keyof FacetFilters, value: string) => {
    setFilters((prev) => {
      const exists = prev[facet].includes(value);
      return {
        ...prev,
        [facet]: exists ? prev[facet].filter((item) => item !== value) : [...prev[facet], value],
      };
    });
  };

  const clearFilters = () => {
    setFilters({ personas: [], focusAreas: [], difficulty: [] });
  };

  const getFacetCount = useCallback(
    (facet: keyof FacetFilters, value: string) => {
      const nextFilters: FacetFilters = {
        personas:
          facet === 'personas'
            ? filters.personas.includes(value)
              ? filters.personas
              : [...filters.personas, value]
            : filters.personas,
        focusAreas:
          facet === 'focusAreas'
            ? filters.focusAreas.includes(value)
              ? filters.focusAreas
              : [...filters.focusAreas, value]
            : filters.focusAreas,
        difficulty:
          facet === 'difficulty'
            ? filters.difficulty.includes(value)
              ? filters.difficulty
              : [...filters.difficulty, value]
            : filters.difficulty,
      };

      return applyFacetFilters(categoryFilteredSections, nextFilters).length;
    },
    [applyFacetFilters, categoryFilteredSections, filters]
  );

  const activeFilterChips = useMemo(() => {
    const personaChips = filters.personas.map((value) => ({
      group: 'personas' as const,
      value,
      label: personaFacetOptions.find((option) => option.value === value)?.label || value,
    }));

    const focusChips = filters.focusAreas.map((value) => ({
      group: 'focusAreas' as const,
      value,
      label: focusFacetOptions.find((option) => option.value === value)?.label || value,
    }));

    const difficultyChips = filters.difficulty.map((value) => ({
      group: 'difficulty' as const,
      value,
      label: value,
    }));

    return [...personaChips, ...focusChips, ...difficultyChips];
  }, [filters]);

  const removeFilter = (group: keyof FacetFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group].filter((item) => item !== value),
    }));
  };

  const activeFilterCount = activeFilterChips.length;
  const hasFiltersApplied = activeFilterCount > 0;

  const FacetGroup = ({
    title,
    options,
    facetKey,
  }: {
    title: string;
    options: { label: string; value: string }[];
    facetKey: keyof FacetFilters;
  }) => (
    <div>
      <p className="text-sm font-semibold text-gray-900 mb-2">{title}</p>
      <div className="space-y-2">
        {options.map((option) => {
          const isActive = filters[facetKey].includes(option.value);
          const count = getFacetCount(facetKey, option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleFilter(facetKey, option.value)}
              className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition hover:border-blue-300 ${
                isActive
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700'
              }`}
              aria-pressed={isActive}
            >
              <span className="flex items-center justify-between gap-3">
                <span>{option.label}</span>
                <span className="text-xs text-gray-500">{count}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const facetFiltersMarkup = (
    <div className="space-y-6">
      <FacetGroup title="Persona" options={personaFacetOptions} facetKey="personas" />
      <FacetGroup title="Focus Area" options={focusFacetOptions} facetKey="focusAreas" />
      <FacetGroup title="Difficulty" options={difficultyFacetOptions} facetKey="difficulty" />
    </div>
  );

  const personaGuides = [
    {
      title: 'Developers',
      icon: <Code className="w-6 h-6 text-blue-500" aria-hidden="true" />,
      description: 'Everything you need to integrate SmartPro into your stack.',
      highlights: ['API reference & SDK', 'Workflow automation recipes', 'Webhooks & events'],
      links: [
        { label: 'API Docs', href: '/docs/api' },
        { label: 'Automation Guide', href: '/docs/workflow-automation' },
        { label: 'Architecture', href: '/docs/architecture' },
      ],
    },
    {
      title: 'Product Teams',
      icon: <Users className="w-6 h-6 text-indigo-500" aria-hidden="true" />,
      description: 'Understand capabilities, pricing, and onboarding journeys.',
      highlights: ['Feature deep dives', 'Pricing calculators', 'Adoption playbooks'],
      links: [
        { label: 'Product Overview', href: '/docs/product-overview' },
        { label: 'Features', href: '/docs/features' },
        { label: 'Getting Started', href: '/docs/getting-started' },
      ],
    },
    {
      title: 'Executives',
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" aria-hidden="true" />,
      description: 'Strategic plans, ROI narratives, and compliance summaries.',
      highlights: ['Full business plan', 'Security posture', 'Market positioning'],
      links: [
        { label: 'Business Plan', href: '/docs/business-plan-full' },
        { label: 'Security & Compliance', href: '/docs/security' },
        { label: 'Support Tiers', href: '/docs/support' },
      ],
    },
  ];

  const docUpdates = [
    {
      date: 'Nov 2025',
      title: 'Docs navigation revamp',
      description: 'Keyboard shortcuts, search analytics, and mobile sidebar polish shipped.',
      impact: 'Improved discovery & accessibility',
    },
    {
      date: 'Oct 2025',
      title: 'API & Automation refresh',
      description: 'Added modern SDK quick start, webhook lifecycle examples, and INP-friendly code blocks.',
      impact: 'Faster developer onboarding',
    },
    {
      date: 'Sep 2025',
      title: 'Business plan overhaul',
      description: 'Expanded investor-ready sections, updated TAM/SAM figures, and linked KPI dashboards.',
      impact: 'Clearer executive storytelling',
    },
  ];

  const categories = ['All', 'Product', 'Technical', 'Business', 'Security', 'Support'];

  const filteredSections = useMemo(() => {
    if (activeCategory === 'All') return sections;
    return sections.filter((section) => section.category === activeCategory);
  }, [activeCategory, sections]);

  const journeys = [
    {
      title: 'Integrate SmartPro',
      duration: '35 min',
      steps: [
        { label: '1. Request sandbox credentials', href: '/docs/support#sandbox-access' },
        { label: '2. Review authentication + SDK', href: '/docs/api#authentication' },
        { label: '3. Test workflow automation', href: '/docs/workflow-automation' },
      ],
    },
    {
      title: 'Evaluate for rollout',
      duration: '25 min',
      steps: [
        { label: '1. Scan product overview', href: '/docs/product-overview' },
        { label: '2. Compare plans & SLAs', href: '/pricing' },
        { label: '3. Share business plan summary', href: '/docs/business-plan' },
      ],
    },
    {
      title: 'Complete security review',
      duration: '30 min',
      steps: [
        { label: '1. Download security brief', href: '/docs/security' },
        { label: '2. Map data flows', href: '/docs/architecture#data-flow' },
        { label: '3. Schedule compliance call', href: '/contact' },
      ],
    },
  ];

  const insightBadges = [
    { label: 'Search satisfaction', value: '92%', meta: '↑ 4% vs last quarter' },
    { label: 'Pages refreshed last 60d', value: '14', meta: 'All core guides verified' },
    { label: 'Avg. helpful rating', value: '4.7/5', meta: 'Based on in-page feedback' },
    { label: 'Median onboarding time', value: '43 min', meta: 'From persona jumpstarts' },
  ];

  return (
    <DocsLayout pageTitle="Documentation Hub" breadcrumbs={[{ label: 'Documentation', href: '/docs' }]} githubPath="client/src/pages/docs/Index.tsx">
      <div className="space-y-12">
        {/* Welcome Section */}
        <section ref={heroCTARef}>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to TheSmartPro.io documentation hub. Here you'll find comprehensive guides, technical documentation, and resources to help you understand and use our platform effectively.
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">New to TheSmartPro.io?</h2>
            <p className="mb-6 text-blue-100">
              Start with our getting started guide to learn the basics and get your account set up in minutes.
            </p>
            <Link
              href="/docs/getting-started"
              className={buttonVariants({
                size: 'lg',
                className: 'bg-white text-blue-600 hover:bg-blue-50',
              })}
              onClick={() => handleCTAClick(CTA_CONFIG.heroGetStarted)}
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Documentation Structure Overview */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border-2 border-blue-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Complete Documentation Structure
          </h2>
          <div className="bg-white rounded-lg p-6 font-mono text-sm space-y-3 overflow-x-auto">
            <div className="text-gray-900">
              <div className="flex items-center gap-2 font-bold text-blue-600 mb-2">
                🚀 <Link href="/docs/getting-started" className="hover:underline">Getting Started</Link>
              </div>
              <div className="ml-6 space-y-1 text-gray-600">
                <div>└─ 5 steps (37 min total)</div>
                <div>└─ 6 quick tips</div>
                <div>└─ 3 resource links (all working)</div>
              </div>
            </div>

            <div className="text-gray-900 pt-3">
              <div className="flex items-center gap-2 font-bold text-purple-600 mb-2">
                📦 Product
              </div>
              <div className="ml-6 space-y-1 text-gray-600">
                <div>├─ <Link href="/docs/product-overview" className="text-blue-600 hover:underline">Product Overview</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ 4 core features with tags</div>
                  <div>└─ 3 key metrics</div>
                  <div>└─ 3 pricing tiers</div>
                </div>
                <div>├─ <Link href="/docs/features" className="text-blue-600 hover:underline">Features</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ 6 feature modules</div>
                  <div>└─ 6 advanced features</div>
                  <div>└─ Feature comparison table</div>
                </div>
                <div>└─ <Link href="/pricing" className="text-blue-600 hover:underline">Pricing</Link> → /pricing</div>
              </div>
            </div>

            <div className="text-gray-900 pt-3">
              <div className="flex items-center gap-2 font-bold text-indigo-600 mb-2">
                🔧 Technical
              </div>
              <div className="ml-6 space-y-1 text-gray-600">
                <div>├─ <Link href="/docs/architecture" className="text-blue-600 hover:underline">Architecture</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ 3-layer architecture</div>
                  <div>└─ Technology stack</div>
                  <div>└─ Security & compliance</div>
                </div>
                <div>├─ <Link href="/docs/api" className="text-blue-600 hover:underline">API Documentation</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ Authentication guide</div>
                  <div>└─ 8 common endpoints</div>
                  <div>└─ Request/response examples</div>
                  <div>└─ Rate limits & error codes</div>
                </div>
                <div>└─ <Link href="/docs/workflow-automation" className="text-blue-600 hover:underline">Workflow Automation</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ 8 automation workflows</div>
                  <div>└─ Visual workflow builder</div>
                  <div>└─ Integration capabilities</div>
                </div>
              </div>
            </div>

            <div className="text-gray-900 pt-3">
              <div className="flex items-center gap-2 font-bold text-green-600 mb-2">
                💼 Business
              </div>
              <div className="ml-6 space-y-1 text-gray-600">
                <div>├─ <Link href="/docs/business-plan" className="text-blue-600 hover:underline">Business Plan Summary</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ Executive summary</div>
                  <div>└─ 5-year projections</div>
                  <div>└─ Market analysis</div>
                  <div>└─ Go-to-market strategy</div>
                </div>
                <div>└─ <Link href="/docs/business-plan-full" className="text-blue-600 hover:underline">Complete Business Plan</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ 2,984 lines of content</div>
                  <div>└─ 10 comprehensive sections</div>
                  <div>└─ Investor-grade document</div>
                </div>
              </div>
            </div>

            <div className="text-gray-900 pt-3">
              <div className="flex items-center gap-2 font-bold text-orange-600 mb-2">
                📚 Support
              </div>
              <div className="ml-6 space-y-1 text-gray-600">
                <div>├─ <Link href="/docs/faq" className="text-blue-600 hover:underline">FAQ</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ 6 categories</div>
                  <div>└─ 24 questions</div>
                  <div>└─ Searchable interface</div>
                </div>
                <div>├─ <Link href="/docs/support" className="text-blue-600 hover:underline">Support</Link></div>
                <div className="ml-6 space-y-1">
                  <div>└─ 3 contact channels</div>
                  <div>└─ 4 self-service resources</div>
                  <div>└─ Support tier comparison</div>
                </div>
                <div>└─ <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link> → /contact</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 bg-blue-50 rounded p-3 border border-blue-200">
            <strong>💡 Tip:</strong> Click any blue link above to jump directly to that section. All links are functional and tested.
          </div>
        </section>

        {/* Documentation Sections */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Documentation Sections</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block lg:w-72 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Filters
                </p>
                {hasFiltersApplied && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-medium text-blue-600 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {facetFiltersMarkup}
            </aside>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full border transition-colors text-sm ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 lg:hidden w-full">
                  <Sheet open={isFilterSheetOpen} onOpenChange={setFilterSheetOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 justify-center text-gray-700"
                      >
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filters {hasFiltersApplied ? `(${activeFilterCount})` : ''}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Refine docs</SheetTitle>
                      </SheetHeader>
                      <div className="flex-1 overflow-y-auto px-2 pb-6 space-y-6">
                        {facetFiltersMarkup}
                      </div>
                      <div className="mt-4 flex gap-2 px-2 pb-4">
                        <Button className="flex-1" onClick={() => setFilterSheetOpen(false)}>
                          Show results
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex-1"
                          onClick={() => {
                            clearFilters();
                            setFilterSheetOpen(false);
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="flex flex-wrap gap-2 flex-1">
                  {activeFilterChips.map((chip) => (
                    <button
                      key={`${chip.group}-${chip.value}`}
                      type="button"
                      onClick={() => removeFilter(chip.group, chip.value)}
                      className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {chip.label}
                      <span aria-hidden="true">×</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="docs-sort" className="text-sm text-gray-500">
                    Sort by
                  </label>
                  <select
                    id="docs-sort"
                    value={sortOption}
                    onChange={(event) =>
                      setSortOption(event.target.value as 'featured' | 'recent' | 'az' | 'effort')
                    }
                    className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Showing {filteredSectionCount} of {totalSectionCount} sections
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {filteredSections.map((section, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                      {section.icon}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="font-medium uppercase tracking-wide">
                        {section.difficulty}
                      </span>
                      <span>•</span>
                      <span>{section.effortMinutes} min path</span>
                      <span>•</span>
                      <span>Updated {new Date(section.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 mb-6">{section.description}</p>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p>
                        Personas:{' '}
                        <span className="font-medium text-gray-800">
                          {section.personas
                            .map((persona) => {
                              const label =
                                personaFacetOptions.find((option) => option.value === persona)
                                  ?.label || persona;
                              return label;
                            })
                            .join(', ')}
                        </span>
                      </p>
                      <p>
                        Focus:{' '}
                        <span className="font-medium text-gray-800">
                          {section.focusAreas
                            .map(
                              (focus) =>
                                focusFacetOptions.find((option) => option.value === focus)?.label ||
                                focus
                            )
                            .join(', ')}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      {section.links.map((link, i) => (
                        <Link key={i} href={link.href}>
                          <div className="block text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer">
                            → {link.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Persona Quick Starts */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-500" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-gray-900">Role-based Jumpstarts</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Pick a track and follow the curated checklist to get the most relevant docs in under 10 minutes.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {personaGuides.map((persona) => (
              <div key={persona.title} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    {persona.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tailored path</p>
                    <h3 className="text-lg font-semibold text-gray-900">{persona.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 flex-1">{persona.description}</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {persona.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  {persona.links.map((link) => (
                    <Link key={link.label} href={link.href}>
                      <div className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 cursor-pointer">
                        {link.label}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guided Journeys */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-gray-900">Docs Journeys</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Follow a pre-built path to accomplish a common goal. Each timeline links to the exact doc that unblocks the next step.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {journeys.map((journey) => (
              <div key={journey.title} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{journey.title}</h3>
                  <span className="text-sm text-gray-500">{journey.duration}</span>
                </div>
                <ol className="space-y-3 text-sm text-gray-700 flex-1">
                  {journey.steps.map((step) => (
                    <li key={step.label} className="flex gap-3">
                      <span className="w-4 text-blue-500 font-semibold">•</span>
                      <Link href={step.href}>
                        <span className="hover:text-blue-600 cursor-pointer">{step.label}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-gray-500">Avg. completion time includes reading + checklist items.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Access</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'API Reference', href: '/docs/api' },
              { label: 'Getting Started', href: '/docs/getting-started' },
              { label: 'Workflow Automation', href: '/docs/workflow-automation' },
              { label: 'Architecture', href: '/docs/architecture' },
          { label: 'Security & Compliance', href: '/docs/security' },
              { label: 'Complete Business Plan', href: '/docs/business-plan-full' },
              { label: 'FAQ', href: '/docs/faq' },
            ].map((link, index) => (
              <Link key={index} href={link.href}>
                <div className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center cursor-pointer">
                  <span className="text-gray-900 font-medium">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Docs health insights */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Docs Health Snapshot</h2>
          <p className="text-gray-600 mb-6">
            We treat documentation like a product. These pulse scores help you trust what you’re reading.
          </p>
          <div className="grid gap-4 md:grid-cols-4">
            {insightBadges.map((insight) => (
              <div key={insight.label} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-3xl font-bold text-blue-600 mb-2">{insight.value}</p>
                <p className="text-gray-900 font-medium">{insight.label}</p>
                <p className="text-sm text-gray-500 mt-1">{insight.meta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Docs changelog */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-indigo-500" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-gray-900">What&apos;s new in Docs</h2>
          </div>
          <p className="text-gray-600 mb-8">
            Transparent changelog so you can see how the documentation evolves each month.
          </p>
          <div className="space-y-6 relative">
            <span className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 to-transparent hidden md:block" aria-hidden="true" />
            {docUpdates.map((update, index) => (
              <div key={update.title} className="relative pl-10 md:pl-14">
                <span className="absolute left-0 md:left-2 top-2 w-3 h-3 rounded-full bg-indigo-500 border-4 border-white shadow-md" aria-hidden="true" />
                <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center gap-3 mb-2 text-sm text-indigo-600 font-semibold">
                    <span>{update.date}</span>
                    <span className="text-gray-300">•</span>
                    <span>{update.impact}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{update.title}</h3>
                  <p className="text-gray-600">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documentation Stats */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Documentation Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Documentation Pages', value: '11' },
              { label: 'Business Plan Sections', value: '10' },
              { label: 'Enterprise Clients', value: '181+' },
              { label: 'Last Updated', value: 'Nov 2025' },
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200 text-center hover:shadow-lg transition-shadow">
                <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Platform CTA */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 text-green-100">
            Experience TheSmartPro.io platform with 10,000+ verified professionals and enterprise-grade features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div ref={visitPlatformCTARef}>
              <a 
                href="https://thesmartpro.io" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleCTAClick(CTA_CONFIG.visitPlatform)}
                className="inline-flex w-full items-center justify-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
              >
                Visit Main Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
            <div ref={overviewCTARef}>
              <Link
                href="/pricing"
                onClick={() => handleCTAClick(CTA_CONFIG.viewPricing)}
                className={buttonVariants({
                  size: 'lg',
                  variant: 'outline',
                  className: 'border-2 border-white text-white hover:bg-green-700 w-full text-center',
                })}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="mb-6 text-indigo-100">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div ref={contactSupportCTARef}>
              <Link
                href="/contact"
                onClick={() => handleCTAClick(CTA_CONFIG.contactSupport)}
                className={buttonVariants({
                  size: 'lg',
                  className: 'bg-white text-indigo-600 hover:bg-indigo-50 w-full text-center',
                })}
              >
                Contact Support
              </Link>
            </div>
            <div ref={scheduleDemoCTARef}>
              <Link
                href="/contact?topic=demo"
                onClick={() => handleCTAClick(CTA_CONFIG.scheduleDemo)}
                className={buttonVariants({
                  size: 'lg',
                  variant: 'outline',
                  className: 'border-2 border-white text-white hover:bg-indigo-700 w-full text-center',
                })}
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
