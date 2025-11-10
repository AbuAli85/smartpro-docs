import DocsLayout from '@/components/DocsLayout';
import { Mail, MessageCircle, Phone, Book, Video, Users, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { setSEOTags } from '@/lib/seoUtils';

export default function Support() {
  useEffect(() => {
    setSEOTags({
      title: "Support | TheSmartPro.io - Get Help When You Need It",
      description: "Access TheSmartPro.io support resources. Email, live chat, phone support, documentation, video tutorials, and community forums. Response within 24 hours.",
      keywords: "support, help, customer service, contact support, technical support, help center",
      type: "article",
      url: "https://thesmartpro.io/docs/support",
    });
  }, []);

  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Support', href: '/docs/support' },
  ];

  const supportChannels = [
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
      title: 'Live Chat',
      description: 'Get instant help from our support team via live chat.',
      availability: 'Available 24/7',
      responseTime: 'Instant',
      plans: 'All Plans',
      action: 'Start Chat',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      icon: <Mail className="w-8 h-8 text-green-600" />,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours.',
      availability: 'support@thesmartpro.io',
      responseTime: '< 24 hours',
      plans: 'All Plans',
      action: 'Send Email',
      color: 'bg-green-50 border-green-200',
    },
    {
      icon: <Phone className="w-8 h-8 text-purple-600" />,
      title: 'Phone Support',
      description: 'Speak directly with our support team for urgent issues.',
      availability: 'Mon-Fri, 9am-6pm EST',
      responseTime: 'Immediate',
      plans: 'Professional & Enterprise',
      action: 'Call Now',
      color: 'bg-purple-50 border-purple-200',
    },
  ];

  const selfServiceResources = [
    {
      icon: <Book className="w-8 h-8 text-blue-600" />,
      title: 'Documentation',
      description: 'Comprehensive guides and reference materials.',
      link: '/docs',
    },
    {
      icon: <Video className="w-8 h-8 text-red-600" />,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks.',
      link: '/docs/tutorials',
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Community Forum',
      description: 'Connect with other users and share knowledge.',
      link: '#',
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
      title: 'FAQ',
      description: 'Answers to frequently asked questions.',
      link: '/docs/faq',
    },
  ];

  const supportTiers = [
    {
      plan: 'Starter',
      features: [
        'Email support',
        'Live chat support',
        'Knowledge base access',
        'Community forum access',
        '< 24 hour response time',
      ],
    },
    {
      plan: 'Professional',
      features: [
        'All Starter features',
        'Phone support',
        'Priority email support',
        'Video tutorials',
        '< 12 hour response time',
        'Dedicated account manager',
      ],
    },
    {
      plan: 'Enterprise',
      features: [
        'All Professional features',
        '24/7 priority support',
        'Custom onboarding',
        'Dedicated success manager',
        '< 4 hour response time',
        'Custom training sessions',
        'Direct engineering escalation',
      ],
    },
  ];

  return (
    <DocsLayout pageTitle="Support" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-gray-600 mb-8">
            We're here to help you succeed with TheSmartPro.io. Whether you need technical assistance, have questions about features, or want to learn best practices, our support team is ready to assist you.
          </p>
        </section>

        {/* Support Channels */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className={`rounded-lg border-2 p-6 ${channel.color} hover:shadow-lg transition-shadow`}
              >
                <div className="mb-4">{channel.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>{channel.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MessageCircle className="w-4 h-4" />
                    <span>Response: {channel.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4" />
                    <span>{channel.plans}</span>
                  </div>
                </div>
                <Button className="w-full">{channel.action}</Button>
              </div>
            ))}
          </div>
        </section>

        {/* Self-Service Resources */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Self-Service Resources</h2>
          <p className="text-gray-600 mb-6">
            Find answers quickly with our comprehensive self-service resources.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {selfServiceResources.map((resource, index) => (
              <Link key={index} href={resource.link}>
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Support Tiers */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Support by Plan</h2>
          <p className="text-gray-600 mb-8">
            All plans include comprehensive support. Higher tiers receive priority assistance and additional resources.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {supportTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg border-2 p-6 ${
                  tier.plan === 'Enterprise'
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200'
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{tier.plan}</h3>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Support Hours */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Support Hours</h2>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Live Chat & Email</h3>
                <p className="text-gray-700 mb-2">Available 24/7</p>
                <p className="text-sm text-gray-600">
                  Our chat and email support teams are available around the clock to assist you.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Phone Support</h3>
                <p className="text-gray-700 mb-2">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                <p className="text-sm text-gray-600">
                  Phone support is available for Professional and Enterprise customers during business hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Support */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Emergency Support</h2>
          <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-600" />
              Critical Issues
            </h3>
            <p className="text-gray-700 mb-4">
              Enterprise customers have access to 24/7 emergency support for critical, production-impacting issues. Contact your dedicated account manager or use the emergency hotline provided in your welcome packet.
            </p>
            <p className="text-sm text-gray-600">
              <strong>What qualifies as a critical issue?</strong> System outages, data loss, security incidents, or any issue preventing business operations.
            </p>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting the Best Support</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Be Specific',
                description: 'Provide detailed information about your issue, including steps to reproduce, error messages, and screenshots.',
              },
              {
                title: 'Check Documentation First',
                description: 'Many common questions are answered in our documentation and FAQ. This can save you time.',
              },
              {
                title: 'Include Your Account Details',
                description: 'Provide your account email or organization name to help us locate your account quickly.',
              },
              {
                title: 'Use the Right Channel',
                description: 'For urgent issues, use live chat or phone. For non-urgent questions, email works great.',
              },
              {
                title: 'Follow Up',
                description: 'If you don\'t hear back within the expected timeframe, don\'t hesitate to follow up.',
              },
            ].map((practice, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{practice.title}</h3>
                <p className="text-gray-600 text-sm">{practice.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help Right Now?</h2>
          <p className="mb-6 text-blue-100">
            Our support team is standing by to assist you. Get in touch and we'll help you resolve your issue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-blue-700" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}

