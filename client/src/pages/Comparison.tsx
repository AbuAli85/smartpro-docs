import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function Comparison() {
  const features = [
    {
      category: "Contract Management",
      items: [
        { name: "Professional Booking Agreements", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Milestone-Based Contracts", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Automated Invoice Generation", smartpro: true, upwork: true, fiverr: true, freelancer: true },
        { name: "Revision Tracking & Approval", smartpro: true, upwork: false, fiverr: false, freelancer: false }
      ]
    },
    {
      category: "Security & Compliance",
      items: [
        { name: "Enterprise-Grade Security", smartpro: true, upwork: true, fiverr: true, freelancer: false },
        { name: "Complete Audit Logging", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "GDPR Compliant", smartpro: true, upwork: true, fiverr: true, freelancer: true },
        { name: "SOC 2 Certified", smartpro: true, upwork: true, fiverr: false, freelancer: false },
        { name: "Role-Based Access Control", smartpro: true, upwork: false, fiverr: false, freelancer: false }
      ]
    },
    {
      category: "Team Management",
      items: [
        { name: "Multi-User Project Management", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Team Collaboration Tools", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Admin Verification System", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Custom Permissions", smartpro: true, upwork: false, fiverr: false, freelancer: false }
      ]
    },
    {
      category: "Payments & Escrow",
      items: [
        { name: "Stripe-Powered Escrow", smartpro: true, upwork: true, fiverr: true, freelancer: true },
        { name: "Automatic VAT Calculation", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Transparent Fee Structure", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Provider Earnings: 80%", smartpro: true, upwork: false, fiverr: false, freelancer: false }
      ]
    },
    {
      category: "Analytics & Reporting",
      items: [
        { name: "Real-Time Project Analytics", smartpro: true, upwork: true, fiverr: true, freelancer: true },
        { name: "Compliance Audit Reports", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Budget vs. Actual Tracking", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Custom Dashboards", smartpro: true, upwork: false, fiverr: false, freelancer: false }
      ]
    },
    {
      category: "Communication",
      items: [
        { name: "Built-in Messaging System", smartpro: true, upwork: true, fiverr: true, freelancer: true },
        { name: "File Sharing & Attachments", smartpro: true, upwork: true, fiverr: true, freelancer: true },
        { name: "Real-Time Notifications", smartpro: true, upwork: true, fiverr: true, freelancer: true },
        { name: "Integrated Video Calls", smartpro: true, upwork: true, fiverr: false, freelancer: false }
      ]
    },
    {
      category: "Pricing Model",
      items: [
        { name: "Transparent Pricing", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "No Hidden Fees", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Enterprise Pricing Available", smartpro: true, upwork: false, fiverr: false, freelancer: false },
        { name: "Volume Discounts", smartpro: true, upwork: false, fiverr: false, freelancer: false }
      ]
    }
  ];

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Comparison" }]} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">TheSmartPro vs. The Competition</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade features designed for serious professionals and organizations. 
              See how TheSmartPro compares to industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 w-1/4">Feature</th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">TheSmartPro</div>
                      <div className="text-xs text-gray-600">Enterprise-Grade</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-gray-600 mb-2">Upwork</div>
                      <div className="text-xs text-gray-600">Freelance Platform</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-gray-600 mb-2">Fiverr</div>
                      <div className="text-xs text-gray-600">Gig Platform</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-gray-600 mb-2">Freelancer</div>
                      <div className="text-xs text-gray-600">Auction Platform</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <tr className="bg-gray-100 border-t border-gray-200">
                      <td colSpan={5} className="px-6 py-3">
                        <h3 className="font-bold text-gray-900">{category.category}</h3>
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-center">
                          {item.smartpro ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" />
                          ) : (
                            <X className="h-6 w-6 text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.upwork ? (
                            <CheckCircle2 className="h-6 w-6 text-gray-400 mx-auto" />
                          ) : (
                            <X className="h-6 w-6 text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.fiverr ? (
                            <CheckCircle2 className="h-6 w-6 text-gray-400 mx-auto" />
                          ) : (
                            <X className="h-6 w-6 text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.freelancer ? (
                            <CheckCircle2 className="h-6 w-6 text-gray-400 mx-auto" />
                          ) : (
                            <X className="h-6 w-6 text-gray-300 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why TheSmartPro Wins</h2>
            <p className="text-xl text-gray-600">Enterprise features that serious professionals demand</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Professional Contracts",
                description: "Automated booking agreements with milestone tracking and revision management. Not just invoices—real contracts.",
                icon: "📋"
              },
              {
                title: "Enterprise Security",
                description: "Complete audit logging, role-based access control, and compliance certifications. Built for regulated industries.",
                icon: "🔒"
              },
              {
                title: "Team Collaboration",
                description: "Multi-user project management with custom permissions. Manage your entire team on one platform.",
                icon: "👥"
              },
              {
                title: "Transparent Pricing",
                description: "80% provider earnings, no hidden fees, volume discounts. Know exactly what you're paying.",
                icon: "💰"
              },
              {
                title: "Compliance Ready",
                description: "GDPR compliant, SOC 2 certified, audit logging. Meet your regulatory requirements.",
                icon: "✓"
              },
              {
                title: "Custom Analytics",
                description: "Real-time dashboards, budget tracking, compliance reports. Data-driven decision making.",
                icon: "📊"
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cost Comparison</h2>
            <p className="text-xl text-gray-600">What you actually pay for professional services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "TheSmartPro",
                fee: "20%",
                description: "Provider keeps 80% of earnings",
                highlight: true
              },
              {
                name: "Upwork",
                fee: "5-20%",
                description: "Tiered fees based on earnings",
                highlight: false
              },
              {
                name: "Fiverr",
                fee: "20%",
                description: "Fixed 20% platform fee",
                highlight: false
              },
              {
                name: "Freelancer",
                fee: "10%",
                description: "10% platform fee + payment fees",
                highlight: false
              }
            ].map((platform, index) => (
              <Card key={index} className={`border-2 ${platform.highlight ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                <CardHeader>
                  <CardTitle className={platform.highlight ? 'text-blue-600' : ''}>{platform.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">{platform.fee}</div>
                  <p className="text-gray-600 text-sm">{platform.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience Enterprise-Grade Features?</h2>
            <p className="text-xl text-blue-100 mb-8">Join professionals and organizations already benefiting from TheSmartPro's superior platform</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start as a Provider
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Hire Professionals
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
