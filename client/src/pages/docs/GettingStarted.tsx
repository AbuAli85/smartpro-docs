import DocsLayout from '@/components/DocsLayout';
import { CheckCircle, ArrowRight, Play, Download, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { setSEOTags } from '@/lib/seoUtils';

export default function GettingStarted() {
  useEffect(() => {
    setSEOTags({
      title: "Getting Started | TheSmartPro.io - Quick Start Guide",
      description: "Get started with TheSmartPro.io in minutes. Step-by-step guide to set up your account, configure your workspace, and start managing your business operations.",
      keywords: "getting started, quick start, setup guide, onboarding, tutorial, first steps",
      type: "article",
      url: "https://thesmartpro.io/docs/getting-started",
    });
  }, []);

  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Getting Started', href: '/docs/getting-started' },
  ];

  return (
    <DocsLayout pageTitle="Getting Started" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to TheSmartPro.io! This guide will help you get up and running in minutes. Follow these simple steps to set up your account and start managing your business operations.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-600" />
              Quick Start Video
            </h3>
            <p className="text-gray-600 mb-4">Watch our 5-minute getting started video for a quick overview.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Watch Video Tutorial
            </Button>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Step-by-Step Setup</h2>
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Create Your Account',
                description: 'Sign up for a free 14-day trial. No credit card required.',
                details: [
                  'Visit thesmartpro.io and click "Start Free Trial"',
                  'Enter your email and create a password',
                  'Verify your email address',
                  'Complete your profile information',
                ],
                time: '2 minutes',
              },
              {
                step: 2,
                title: 'Set Up Your Organization',
                description: 'Configure your company profile and workspace settings.',
                details: [
                  'Enter your company name and details',
                  'Upload your company logo',
                  'Set your timezone and regional preferences',
                  'Invite team members (optional)',
                ],
                time: '5 minutes',
              },
              {
                step: 3,
                title: 'Choose Your Modules',
                description: 'Select the business functions you want to activate.',
                details: [
                  'Review available modules (CRM, Projects, HR, etc.)',
                  'Enable the modules you need',
                  'Configure module-specific settings',
                  'Import existing data (optional)',
                ],
                time: '10 minutes',
              },
              {
                step: 4,
                title: 'Customize Your Workspace',
                description: 'Personalize your dashboard and workflows.',
                details: [
                  'Arrange your dashboard widgets',
                  'Set up custom fields and tags',
                  'Configure notification preferences',
                  'Create workflow automations',
                ],
                time: '15 minutes',
              },
              {
                step: 5,
                title: 'Start Using TheSmartPro',
                description: 'Begin managing your business operations.',
                details: [
                  'Create your first project or client',
                  'Add team members and assign roles',
                  'Explore features and capabilities',
                  'Access help resources as needed',
                ],
                time: '5 minutes',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Tips for Success</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Start Small',
                description: 'Begin with one or two modules and expand as you get comfortable with the platform.',
              },
              {
                title: 'Use Templates',
                description: 'Take advantage of pre-built templates for projects, workflows, and reports.',
              },
              {
                title: 'Invite Your Team',
                description: 'Collaboration is key. Invite team members early to maximize productivity.',
              },
              {
                title: 'Explore Integrations',
                description: 'Connect your existing tools to streamline data flow and reduce manual work.',
              },
              {
                title: 'Set Up Automations',
                description: 'Automate repetitive tasks to save time and reduce errors.',
              },
              {
                title: 'Access Training',
                description: 'Take advantage of our video tutorials, webinars, and documentation.',
              },
            ].map((tip, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Helpful Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/docs/features">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Code className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Feature Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">Explore all features and capabilities in detail.</p>
                <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/docs/api">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Play className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">API Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">Integrate with our REST API for custom solutions.</p>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  View API Docs <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/contact">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Download className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Get Support</h3>
                <p className="text-sm text-gray-600 mb-4">Need help? Our support team is here for you.</p>
                <span className="text-purple-600 text-sm font-medium flex items-center gap-1">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 text-blue-100">
            Start your free 14-day trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/get-started-providers">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-blue-700" asChild>
              <Link href="/contact">Schedule Demo</Link>
            </Button>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}

