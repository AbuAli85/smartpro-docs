import DocsLayout from '@/components/DocsLayout';
import { Users, BarChart3, Briefcase, BookOpen, FileText, Zap } from 'lucide-react';
import { useEffect } from 'react';
import { setSEOTags } from '@/lib/seoUtils';

export default function Features() {
  useEffect(() => {
    setSEOTags({
      title: "Features Documentation | TheSmartPro.io - Complete Feature List",
      description: "Comprehensive features: Employee Management, CRM, Project Management, E-Learning, Contract Management, Workflow Automation. Enterprise-grade with 99.9% uptime.",
      keywords: "features, employee management, CRM, project management, e-learning, contract management, workflow automation",
      type: "article",
      url: "https://thesmartpro.io/docs/features",
    });
  }, []);
  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Features', href: '/docs/features' },
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Employee Management',
      description: 'Complete workforce management system',
      capabilities: [
        'Employee lifecycle management',
        'Payroll integration',
        'Leave management',
        'Performance tracking',
        'Organizational hierarchy',
        'Compensation management',
      ],
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'CRM & Client Management',
      description: 'Comprehensive customer relationship management',
      capabilities: [
        'Contact management',
        'Sales pipeline tracking',
        'Email integration',
        'Activity tracking',
        'Deal forecasting',
        'Customer analytics',
      ],
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Project Management',
      description: 'Advanced project planning and execution',
      capabilities: [
        'Multiple methodologies (Waterfall, Agile)',
        'Task management',
        'Resource allocation',
        'Time tracking',
        'Gantt charts & Kanban boards',
        'Collaboration tools',
      ],
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'E-Learning Platform',
      description: 'Comprehensive training and development',
      capabilities: [
        'Course authoring',
        'Progress tracking',
        'Assessments & quizzes',
        'Certification management',
        'Competency mapping',
        'Learning analytics',
      ],
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Contract Management',
      description: 'Complete contract lifecycle management',
      capabilities: [
        'Centralized repository',
        'Automated renewal management',
        'Obligation tracking',
        'E-signature integration',
        'Version control',
        'Compliance tracking',
      ],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Workflow Automation',
      description: 'No-code automation for business processes',
      capabilities: [
        'Visual workflow builder',
        'Conditional logic',
        'Integration capabilities',
        'Approval workflows',
        'Notifications & alerts',
        'Process templates',
      ],
    },
  ];

  return (
    <DocsLayout pageTitle="Features" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-gray-600 mb-8">
            TheSmartPro.io provides comprehensive features across six core business functions, enabling organizations to manage their entire business from a single unified platform.
          </p>
        </section>

        {/* Features Grid */}
        <section>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900">Key Capabilities:</p>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Features */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Advanced Features</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Real-Time Notifications',
                description: 'Stay informed with real-time notifications across all business functions. WebSocket-based delivery ensures instant updates.',
              },
              {
                title: 'Advanced Analytics',
                description: 'Comprehensive dashboards and reports provide insights into business performance. Custom reports enable data-driven decision making.',
              },
              {
                title: 'Multi-Tenant Architecture',
                description: 'Enterprise-grade multi-tenant architecture enables secure data isolation while maintaining operational efficiency.',
              },
              {
                title: 'API & Integrations',
                description: 'Comprehensive REST API enables custom integrations. Pre-built integrations with 50+ popular business applications.',
              },
              {
                title: 'Security & Compliance',
                description: 'Enterprise-grade security with SOC 2, ISO 27001, GDPR, HIPAA, and PCI DSS compliance certifications.',
              },
              {
                title: 'Mobile Applications',
                description: 'Native mobile applications for iOS and Android enable access from anywhere, supporting modern distributed work.',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Feature Comparison by Plan</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left px-6 py-4 font-bold text-gray-900">Feature</th>
                  <th className="text-center px-6 py-4 font-bold text-gray-900">Starter</th>
                  <th className="text-center px-6 py-4 font-bold text-gray-900">Professional</th>
                  <th className="text-center px-6 py-4 font-bold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Employee Management', starter: true, pro: true, enterprise: true },
                  { feature: 'CRM & Client Management', starter: true, pro: true, enterprise: true },
                  { feature: 'Project Management', starter: false, pro: true, enterprise: true },
                  { feature: 'E-Learning Platform', starter: false, pro: true, enterprise: true },
                  { feature: 'Contract Management', starter: false, pro: true, enterprise: true },
                  { feature: 'Workflow Automation', starter: false, pro: true, enterprise: true },
                  { feature: 'Advanced Analytics', starter: false, pro: true, enterprise: true },
                  { feature: 'API Access', starter: false, pro: true, enterprise: true },
                  { feature: 'Custom Integrations', starter: false, pro: false, enterprise: true },
                  { feature: 'Dedicated Support', starter: false, pro: false, enterprise: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.starter ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.pro ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.enterprise ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
