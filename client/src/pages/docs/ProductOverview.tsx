import DocsLayout from '@/components/DocsLayout';
import { CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';

export default function ProductOverview() {
  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Product Overview', href: '/docs/product-overview' },
  ];

  return (
    <DocsLayout pageTitle="Product Overview" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">TheSmartPro.io Platform</h2>
          <p className="text-lg text-gray-600 mb-6">
            TheSmartPro.io represents a paradigm shift in enterprise business management software. By consolidating five critical business functions into a single unified platform, we eliminate the complexity and cost associated with managing multiple disconnected systems.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-2">181+ Enterprise Clients</h3>
              <p className="text-gray-600">Trusted by leading organizations worldwide</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-2">847+ Contracts Managed</h3>
              <p className="text-gray-600">Millions of transactions processed monthly</p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Core Features & Capabilities</h2>
          <div className="space-y-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Employee Management',
                description: 'Comprehensive workforce management from recruitment through separation. Includes payroll integration, leave management, performance tracking, and organizational hierarchy management.',
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'CRM & Client Management',
                description: 'Complete customer relationship management with contact management, sales pipeline tracking, email integration, and activity management.',
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: 'Project Management',
                description: 'Comprehensive project planning and execution with support for Waterfall, Agile, and hybrid methodologies. Includes task management, resource allocation, and collaboration tools.',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Contract Management',
                description: 'Complete contract lifecycle management with centralized repository, automated renewal management, obligation tracking, and e-signature integration.',
              },
            ].map((feature, index) => (
              <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Business Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">40%</div>
              <p className="text-gray-700 font-medium">Cost Reduction</p>
              <p className="text-sm text-gray-600 mt-2">Through operational efficiency and tool consolidation</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">20h/week</div>
              <p className="text-gray-700 font-medium">Time Saved</p>
              <p className="text-sm text-gray-600 mt-2">Through workflow automation and streamlined processes</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <p className="text-gray-700 font-medium">Uptime SLA</p>
              <p className="text-sm text-gray-600 mt-2">Enterprise-grade reliability and availability</p>
            </div>
          </div>
        </section>

        {/* Service Offerings */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Offerings</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Starter Plan',
                price: '$99',
                users: 'Up to 10 users',
                features: ['Core modules', 'Basic analytics', 'Community support'],
              },
              {
                name: 'Professional Plan',
                price: '$299',
                users: 'Up to 100 users',
                features: ['All core modules', 'Standard analytics', 'Email support', 'Pre-built integrations'],
                highlighted: true,
              },
              {
                name: 'Enterprise Plan',
                price: '$999',
                users: 'Unlimited users',
                features: ['All features', 'Advanced analytics', '24/7 support', 'Custom integrations', 'Dedicated account manager'],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 transition-all ${
                  plan.highlighted
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.users}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                    <p className="text-sm text-gray-600">/month</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 text-blue-100">
            Explore our comprehensive documentation or start your free 14-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
              Schedule Demo
            </button>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
