import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, BarChart3, Users, Zap, Shield, Smartphone } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { setSEOTags } from "@/lib/seoUtils";

export default function Features() {
  useEffect(() => {
    setSEOTags({
      title: "Features | TheSmartPro.io - Enterprise Professional Services Platform",
      description: "Discover TheSmartPro.io's powerful features: Project Management, CRM, E-Learning, Automation, Analytics. Enterprise-grade security with 99.9% uptime SLA.",
      keywords: "features, project management, CRM, automation, analytics, enterprise software, professional services",
      type: "website",
      url: "https://thesmartpro.io/features",
    });
  }, []);
  const modules = [
    {
      icon: BarChart3,
      title: "Project Management",
      description: "Comprehensive project tracking, resource planning, and timeline management",
      features: [
        "Task and project tracking",
        "Gantt charts and timelines",
        "Resource allocation",
        "Time tracking and reporting",
        "Custom workflows"
      ]
    },
    {
      icon: Users,
      title: "CRM & Client Management",
      description: "Lead tracking, customer relationships, and sales pipeline management",
      features: [
        "Lead and opportunity tracking",
        "Customer relationship management",
        "Sales pipeline visualization",
        "Customer history and notes",
        "Automated follow-ups"
      ]
    },
    {
      icon: Zap,
      title: "E-Learning & Training",
      description: "Course management, employee development, and compliance training",
      features: [
        "Course creation and management",
        "Learning paths and certifications",
        "Progress tracking",
        "Compliance training modules",
        "Automated reminders"
      ]
    },
    {
      icon: Smartphone,
      title: "Automation & Workflows",
      description: "Process automation, approval workflows, and business logic",
      features: [
        "Workflow automation",
        "Approval processes",
        "Conditional logic",
        "Integration triggers",
        "Custom actions"
      ]
    },
    {
      icon: Users,
      title: "Communication & Collaboration",
      description: "Team messaging, file sharing, and real-time updates",
      features: [
        "Team messaging",
        "File sharing and storage",
        "Real-time notifications",
        "Discussion threads",
        "Integration with external tools"
      ]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards, reports, and data visualization",
      features: [
        "Custom dashboards",
        "Real-time reporting",
        "Data visualization",
        "Predictive analytics",
        "Export capabilities"
      ]
    }
  ];

  const capabilities = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "SOC 2 Type II certified, end-to-end encryption, GDPR compliant"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Fully responsive design works seamlessly on desktop, tablet, and mobile"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Performance",
      description: "Optimized for speed with sub-second load times and instant updates"
    },
    {
      icon: Users,
      title: "Seamless Integrations",
      description: "50+ pre-built integrations with popular business tools"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time dashboards and comprehensive reporting"
    },
    {
      icon: CheckCircle2,
      title: "99.9% Uptime SLA",
      description: "Enterprise-grade infrastructure with automatic failover"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Breadcrumb items={[{ label: "Features" }]} />
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Powerful Features, Simple Interface
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Everything you need to run your business in one unified platform. No more switching between tools.
          </p>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Core Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <module.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{module.title}</h3>
                <p className="text-slate-600 mb-6">{module.description}</p>
                <ul className="space-y-2">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="p-8">
                <capability.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{capability.title}</h3>
                <p className="text-slate-600">{capability.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Integration Ecosystem</h2>
          <p className="text-xl text-slate-600 mb-8">
            TheSmartPro.io integrates with 50+ popular business tools, allowing you to connect your entire tech stack.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Salesforce", "HubSpot", "Stripe", "Slack", "Google Workspace", "Microsoft 365", "Zapier", "Twilio"].map((tool, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center">
                  <p className="font-semibold text-slate-900">{tool}</p>
                </div>
              ))}
            </div>
          </div>
          <Button size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700">
            View All Integrations
          </Button>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How We Compare</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">TheSmartPro.io</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-600">Salesforce</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-600">HubSpot</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-600">Notion</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Unified Platform", smartpro: true, salesforce: false, hubspot: false, notion: false },
                  { feature: "Project Management", smartpro: true, salesforce: false, hubspot: false, notion: true },
                  { feature: "CRM", smartpro: true, salesforce: true, hubspot: true, notion: false },
                  { feature: "E-Learning", smartpro: true, salesforce: false, hubspot: false, notion: false },
                  { feature: "Automation", smartpro: true, salesforce: false, hubspot: true, notion: false },
                  { feature: "Cost per User", smartpro: true, salesforce: false, hubspot: false, notion: false },
                  { feature: "2-Week Implementation", smartpro: true, salesforce: false, hubspot: false, notion: true },
                  { feature: "95% User Adoption", smartpro: true, salesforce: false, hubspot: false, notion: false }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-slate-200">
                    <td className="py-4 px-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {row.smartpro ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.salesforce ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.hubspot ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.notion ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Start your free 14-day trial today. No credit card required.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Free Trial
          </Button>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}
