import { useState } from 'react';
import { Menu, X, ChevronRight, Search } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Input } from '@/components/ui/input';

interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
    icon: '🚀',
  },
  {
    title: 'Product',
    href: '#',
    icon: '📦',
    children: [
      { title: 'Product Overview', href: '/docs/product-overview' },
      { title: 'Features', href: '/docs/features' },
      { title: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Technical',
    href: '#',
    icon: '🔧',
    children: [
      { title: 'Architecture', href: '/docs/architecture' },
      { title: 'API Documentation', href: '/docs/api' },
    ],
  },
  {
    title: 'Business',
    href: '#',
    icon: '💼',
    children: [
      { title: 'Business Plan Summary', href: '/docs/business-plan' },
      { title: 'Complete Business Plan', href: '/docs/business-plan-full' },
    ],
  },
  {
    title: 'Support',
    href: '#',
    icon: '📚',
    children: [
      { title: 'FAQ', href: '/docs/faq' },
      { title: 'Support', href: '/docs/support' },
      { title: 'Contact Us', href: '/contact' },
    ],
  },
];

interface DocsLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  lastUpdated?: string;
}

export default function DocsLayout({ children, pageTitle, breadcrumbs, lastUpdated = 'November 2025' }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location] = useLocation();

  const isActive = (href: string) => location === href;

  // Filter navigation items based on search query
  const filteredItems = searchQuery
    ? navigationItems.map(item => {
        if (item.children) {
          const filteredChildren = item.children.filter(child =>
            child.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return filteredChildren.length > 0 ? { ...item, children: filteredChildren } : null;
        }
        return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ? item : null;
      }).filter(Boolean) as NavItem[]
    : navigationItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                SP
              </div>
              <span className="font-bold text-lg text-gray-900">SmartPro</span>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 z-30 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {filteredItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 font-medium text-gray-900">
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                      <ChevronRight className="w-4 h-4 ml-auto group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-4">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <div
                            className={`block px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                              isActive(child.href)
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            {child.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link href={item.href}>
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                        isActive(item.href)
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                  </Link>
                )}
              </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="container flex items-center gap-2 text-sm">
                <Link href="/">
                  <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Home</span>
                </Link>
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-gray-900 font-medium">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.href}>
                        <span className="text-blue-600 hover:text-blue-700 cursor-pointer">{crumb.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page Title */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-8">
            <div className="container">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
              <p className="text-gray-600">Comprehensive documentation and guides</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-12">
            <div className="container max-w-4xl">
              {children}
              
              {/* Last Updated Footer */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last updated: <strong className="text-gray-700">{lastUpdated}</strong></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href="https://github.com/AbuAli85/smartpro-docs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      View on GitHub
                    </a>
                    <span className="text-gray-300">•</span>
                    <a href="/contact" className="hover:text-blue-600 transition-colors">
                      Report an issue
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
