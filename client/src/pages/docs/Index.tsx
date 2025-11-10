import DocsLayout from '@/components/DocsLayout';
import { BookOpen, Zap, Code, TrendingUp, Users, Shield } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { setSEOTags } from '@/lib/seoUtils';

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
  const sections = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Product Documentation',
      description: 'Learn about TheSmartPro.io features and capabilities',
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
      links: [
        { label: 'Architecture', href: '/docs/architecture' },
        { label: 'API Documentation', href: '/docs/api' },
        { label: 'Getting Started', href: '/docs/getting-started' },
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Business Resources',
      description: 'Strategic planning and business insights',
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
      links: [
        { label: 'Security Overview', href: '/docs/architecture#security-architecture' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Support & Resources',
      description: 'Get help and find additional resources',
      links: [
        { label: 'FAQ', href: '/docs/faq' },
        { label: 'Support', href: '/docs/support' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  return (
    <DocsLayout pageTitle="Documentation Hub" breadcrumbs={[{ label: 'Documentation', href: '/docs' }]}>
      <div className="space-y-12">
        {/* Welcome Section */}
        <section>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to TheSmartPro.io documentation hub. Here you'll find comprehensive guides, technical documentation, and resources to help you understand and use our platform effectively.
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">New to TheSmartPro.io?</h2>
            <p className="mb-6 text-blue-100">
              Start with our getting started guide to learn the basics and get your account set up in minutes.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/docs/getting-started">Get Started</Link>
            </Button>
          </div>
        </section>

        {/* Documentation Sections */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Documentation Sections</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-gray-600 mb-6">{section.description}</p>
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
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Access</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'API Reference', href: '/docs/api' },
              { label: 'Getting Started', href: '/docs/getting-started' },
              { label: 'Architecture', href: '/docs/architecture' },
              { label: 'Complete Business Plan', href: '/docs/business-plan-full' },
              { label: 'FAQ', href: '/docs/faq' },
              { label: 'Contact Support', href: '/contact' },
            ].map((link, index) => (
              <Link key={index} href={link.href}>
                <div className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center cursor-pointer">
                  <span className="text-gray-900 font-medium">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Documentation Stats */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Documentation Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Documentation Pages', value: '10' },
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

        {/* Support CTA */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="mb-6 text-indigo-100">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-indigo-700" asChild>
              <Link href="/contact">Schedule Demo</Link>
            </Button>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
