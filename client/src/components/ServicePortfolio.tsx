import { Users, Briefcase, FolderKanban, BookOpen, FileText, Zap, BarChart3, Code, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  link: string;
}

const services: Service[] = [
  {
    id: 'employee-management',
    title: 'Employee Management',
    description: 'Complete HR solution for managing your workforce',
    icon: <Users className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    features: ['Payroll Integration', 'Leave Management', 'Performance Tracking', 'Org Charts'],
    link: '#',
  },
  {
    id: 'crm',
    title: 'CRM & Client Management',
    description: 'Build and nurture client relationships',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-indigo-500 to-indigo-600',
    features: ['Contact Management', 'Sales Pipeline', 'Email Integration', 'Reporting'],
    link: '#',
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Organize tasks and track project progress',
    icon: <FolderKanban className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    features: ['Kanban Boards', 'Gantt Charts', 'Time Tracking', 'Collaboration'],
    link: '#',
  },
  {
    id: 'elearning',
    title: 'E-Learning Platform',
    description: 'Train teams and clients with interactive courses',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    features: ['Course Builder', 'Progress Tracking', 'Certificates', 'Quizzes'],
    link: '#',
  },
  {
    id: 'contract-management',
    title: 'Contract Management',
    description: 'Centralize and manage all contracts',
    icon: <FileText className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    features: ['Document Storage', 'E-Signatures', 'Renewal Alerts', 'Compliance'],
    link: '#',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Automate repetitive business processes',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
    features: ['No-Code Builder', 'Triggers & Actions', 'Integrations', 'Analytics'],
    link: '#',
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Get insights into your business performance',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-cyan-500 to-cyan-600',
    features: ['Custom Dashboards', 'Real-time Reports', 'Data Export', 'Predictive'],
    link: '#',
  },
  {
    id: 'api',
    title: 'API & Integrations',
    description: 'Connect with your favorite tools',
    icon: <Code className="w-8 h-8" />,
    color: 'from-pink-500 to-pink-600',
    features: ['REST API', 'Webhooks', 'Pre-built Integrations', 'Custom Connectors'],
    link: '#',
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Expert support whenever you need it',
    icon: <Headphones className="w-8 h-8" />,
    color: 'from-teal-500 to-teal-600',
    features: ['Live Chat', 'Email Support', 'Phone Support', 'Knowledge Base'],
    link: '#',
  },
];

export default function ServicePortfolio() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <span>🎯 Complete Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Service Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to run your business, unified in one powerful platform. From employee management to advanced analytics, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 group-hover:border-blue-600 group-hover:text-blue-600 transition-colors"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your free 14-day trial and experience the power of unified business management.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg h-14 px-8"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
