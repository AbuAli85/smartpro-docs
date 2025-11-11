import DocsLayout from '@/components/DocsLayout';
import { Zap, Clock, Bot, Share2, Database, DollarSign, Package, UserPlus, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { setSEOTags } from '@/lib/seoUtils';

export default function WorkflowAutomation() {
  useEffect(() => {
    setSEOTags({
      title: "Workflow Automation | TheSmartPro.io - Automate Your Business Processes",
      description: "Automate repetitive tasks and streamline business operations with TheSmartPro.io. Smart booking, chatbots, social media, CRM sync, payment reminders, inventory tracking, and more.",
      keywords: "workflow automation, business automation, smart booking, chatbots, CRM integration, payment reminders, inventory tracking, automation tools",
      type: "article",
      url: "https://thesmartpro.io/docs/workflow-automation",
    });
  }, []);

  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Workflow Automation', href: '/docs/workflow-automation' },
  ];

  const automationWorkflows = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Smart Booking Flow',
      description: 'Automated appointment scheduling that eliminates back-and-forth communication and reduces manual scheduling effort.',
      benefits: [
        'Automatic calendar sync and availability checking',
        'Instant booking confirmations via email and SMS',
        'Buffer time management between appointments',
        'Customizable booking rules and restrictions',
        'Integration with Calendly, Google Calendar, and Outlook',
      ],
      integrations: ['Calendly', 'Google Calendar', 'Outlook', 'Zoom'],
      color: 'blue',
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'AI-Powered Chatbots',
      description: 'Intelligent chatbots that handle customer inquiries 24/7, reducing support workload and improving response times.',
      benefits: [
        'Instant responses to common questions',
        'Natural language processing for better understanding',
        'Seamless handoff to human agents when needed',
        'Multi-language support for global customers',
        'Integration with WhatsApp API and messaging platforms',
      ],
      integrations: ['WhatsApp API', 'Messenger', 'Slack', 'Telegram'],
      color: 'purple',
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Social Media Auto-Posting',
      description: 'Schedule and automatically publish content across multiple social media platforms from a single dashboard.',
      benefits: [
        'Multi-platform posting with one click',
        'Content scheduling and calendar management',
        'Automatic hashtag suggestions and optimization',
        'Performance analytics and engagement tracking',
        'Integration with Zapier for advanced workflows',
      ],
      integrations: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'Zapier'],
      color: 'green',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'CRM Synchronization',
      description: 'Automatic synchronization of customer data across systems, ensuring your CRM is always up-to-date.',
      benefits: [
        'Real-time data sync across platforms',
        'Automated contact creation and updates',
        'Activity logging and timeline tracking',
        'Duplicate detection and merging',
        'Bi-directional sync with popular CRM systems',
      ],
      integrations: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive'],
      color: 'indigo',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Payment Reminders',
      description: 'Automated payment reminder system that reduces late payments and improves cash flow.',
      benefits: [
        'Automatic reminder emails before due dates',
        'Escalating reminder sequences for overdue payments',
        'SMS and WhatsApp notification options',
        'Payment link generation for easy collection',
        'Customizable reminder templates and schedules',
      ],
      integrations: ['Stripe', 'PayPal', 'Square', 'QuickBooks'],
      color: 'yellow',
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Inventory Tracking',
      description: 'Automated inventory management that tracks stock levels and triggers reorder notifications.',
      benefits: [
        'Real-time stock level monitoring',
        'Automatic low-stock alerts and notifications',
        'Reorder point calculations based on usage patterns',
        'Multi-location inventory synchronization',
        'Integration with e-commerce and POS systems',
      ],
      integrations: ['Shopify', 'WooCommerce', 'Square POS', 'Amazon'],
      color: 'orange',
    },
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: 'Employee Onboarding',
      description: 'Streamlined onboarding process that automatically guides new hires through paperwork, training, and setup.',
      benefits: [
        'Automated welcome emails and document collection',
        'Task checklists and progress tracking',
        'Training module assignment and scheduling',
        'Equipment and access provisioning workflows',
        'Integration with HR systems and learning platforms',
      ],
      integrations: ['BambooHR', 'Workday', 'Gusto', 'Slack'],
      color: 'teal',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Feedback Collection',
      description: 'Automated feedback and survey systems that gather customer insights at critical touchpoints.',
      benefits: [
        'Trigger-based survey distribution',
        'NPS, CSAT, and custom survey templates',
        'Automatic response collection and analysis',
        'Real-time alerts for negative feedback',
        'Integration with email and SMS platforms',
      ],
      integrations: ['SurveyMonkey', 'Typeform', 'Google Forms', 'Mailchimp'],
      color: 'pink',
    },
  ];

  return (
    <DocsLayout pageTitle="Workflow Automation" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-gray-600 mb-8">
            TheSmartPro.io's workflow automation capabilities transform how businesses operate by eliminating manual, repetitive tasks and reducing human error. Our no-code automation platform enables you to create sophisticated workflows that connect your business processes seamlessly.
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Why Automate?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">70%</p>
                <p className="text-blue-100">Time Saved on Routine Tasks</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">90%</p>
                <p className="text-blue-100">Reduction in Manual Errors</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">24/7</p>
                <p className="text-blue-100">Automated Operations</p>
              </div>
            </div>
            <p className="text-blue-100">
              Automation isn't just about efficiency—it's about freeing your team to focus on strategic work that drives growth while ensuring consistent, error-free execution of routine processes.
            </p>
          </div>
        </section>

        {/* Automation Workflows */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Automation Capabilities</h2>
          <div className="space-y-8">
            {automationWorkflows.map((workflow, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-lg bg-${workflow.color}-100 text-${workflow.color}-600 flex items-center justify-center flex-shrink-0`}>
                    {workflow.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{workflow.title}</h3>
                    <p className="text-gray-600 mb-6">{workflow.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {workflow.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Pre-Built Integrations:</p>
                      <div className="flex flex-wrap gap-2">
                        {workflow.integrations.map((integration, i) => (
                          <span key={i} className="text-xs bg-white px-3 py-1 rounded-full border border-gray-300 text-gray-700 font-medium">
                            {integration}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Automation Builder */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Visual Workflow Builder</h2>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">No-Code Automation</h3>
                <p className="text-gray-600 mb-6">
                  Build powerful automation workflows without writing a single line of code. Our intuitive drag-and-drop interface makes it easy to create complex automations in minutes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Triggers:</strong> Start workflows based on events (new customer, form submission, time-based, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Actions:</strong> Automate tasks (send emails, create records, update data, call APIs)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Conditions:</strong> Add logic to control workflow paths (if/then/else, loops, delays)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Integrations:</strong> Connect with 50+ external services and APIs</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4 text-center">Example Workflow</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                    <div className="flex-1 bg-blue-50 rounded p-3 border border-blue-200">
                      <p className="text-sm font-semibold text-gray-900">Trigger: New Customer Signup</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">2</div>
                    <div className="flex-1 bg-green-50 rounded p-3 border border-green-200">
                      <p className="text-sm font-semibold text-gray-900">Action: Send Welcome Email</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">3</div>
                    <div className="flex-1 bg-purple-50 rounded p-3 border border-purple-200">
                      <p className="text-sm font-semibold text-gray-900">Action: Create CRM Contact</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">4</div>
                    <div className="flex-1 bg-orange-50 rounded p-3 border border-orange-200">
                      <p className="text-sm font-semibold text-gray-900">Action: Assign to Sales Team</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm">5</div>
                    <div className="flex-1 bg-teal-50 rounded p-3 border border-teal-200">
                      <p className="text-sm font-semibold text-gray-900">Action: Notify Team on Slack</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Advanced Automation Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Conditional Logic',
                description: 'Create dynamic workflows with if/then/else conditions, branches, and loops to handle complex business logic.',
              },
              {
                title: 'Multi-Step Workflows',
                description: 'Chain together multiple actions and integrate with various systems to automate end-to-end processes.',
              },
              {
                title: 'Error Handling',
                description: 'Built-in error handling with retry logic, fallback actions, and notification alerts for failed workflows.',
              },
              {
                title: 'Workflow Templates',
                description: 'Start quickly with pre-built templates for common business processes, customizable to your needs.',
              },
              {
                title: 'Real-Time Monitoring',
                description: 'Track workflow execution in real-time with detailed logs, performance metrics, and success rates.',
              },
              {
                title: 'Version Control',
                description: 'Maintain workflow versions, test changes in staging, and roll back to previous versions if needed.',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Real-World Use Cases</h2>
          <div className="space-y-6">
            {[
              {
                industry: 'Healthcare',
                use_case: 'Patient Appointment Management',
                description: 'Automated appointment reminders, rescheduling workflows, and post-visit follow-up surveys reduced no-shows by 45% for a multi-location clinic.',
              },
              {
                industry: 'E-Commerce',
                use_case: 'Order Fulfillment Automation',
                description: 'Automatic order processing, inventory updates, shipping notifications, and customer follow-ups increased order processing speed by 60%.',
              },
              {
                industry: 'Professional Services',
                use_case: 'Client Onboarding',
                description: 'Automated document collection, contract signing, project setup, and team notifications reduced onboarding time from 5 days to 24 hours.',
              },
              {
                industry: 'Real Estate',
                use_case: 'Lead Management',
                description: 'Automatic lead capture, qualification, assignment to agents, and follow-up sequences improved lead conversion by 35%.',
              },
            ].map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {useCase.industry}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.use_case}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Automate Your Workflows?</h2>
          <p className="mb-6 text-blue-100">
            Start building intelligent automation workflows today and transform how your business operates. Our team is here to help you identify the best automation opportunities for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/get-started-providers">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-blue-700" asChild>
              <Link href="/contact">Schedule Automation Consultation</Link>
            </Button>
          </div>
        </section>

        {/* Related Documentation */}
        <section className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Documentation</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/docs/api">
              <div className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <p className="font-semibold text-gray-900 mb-1">API Documentation</p>
                <p className="text-sm text-gray-600">Learn how to build custom integrations</p>
              </div>
            </Link>
            <Link href="/docs/getting-started">
              <div className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <p className="font-semibold text-gray-900 mb-1">Getting Started</p>
                <p className="text-sm text-gray-600">Setup your first automation workflow</p>
              </div>
            </Link>
            <Link href="/docs/features">
              <div className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <p className="font-semibold text-gray-900 mb-1">Platform Features</p>
                <p className="text-sm text-gray-600">Explore all platform capabilities</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}

