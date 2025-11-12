import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Shield, BarChart3, Users, Lock, TrendingUp, Clock, Zap } from "lucide-react";
import { Link } from "wouter";
import Breadcrumb from "@/components/Breadcrumb";
import { setSEOTags } from "@/lib/seoUtils";

export default function ClientsPage() {
  useEffect(() => {
    setSEOTags({
      title: "For Clients | TheSmartPro.io - Hire Verified Professionals",
      description: "Access verified professionals with enterprise-grade security. Find, hire, and manage professional services with confidence.",
      keywords: "hire professionals, find talent, enterprise services, professional marketplace",
      type: "website",
      url: "https://thesmartpro.io/clients",
    });
  }, []);

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "For Clients" }, { label: "Find Professionals" }]} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Access Verified Professionals with Enterprise Security
                </h1>
                <p className="text-xl text-gray-600">
                  Find, hire, and manage professional services with confidence. Enterprise-grade contract management, compliance tracking, and secure payments.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Find Professionals
                </Button>
                <Button size="lg" variant="outline">
                  View ROI Calculator
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-gray-900">10,000+</div>
                  <p className="text-sm text-gray-600">Verified Professionals</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">$50M+</div>
                  <p className="text-sm text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">40%</div>
                  <p className="text-sm text-gray-600">Average Cost Savings</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Verified Professionals</h3>
                      <p className="text-gray-600">All providers are admin-verified and vetted.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        <Lock className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Enterprise Contracts</h3>
                      <p className="text-gray-600">Professional agreements with compliance tracking.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                        <Shield className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Secure Payments</h3>
                      <p className="text-gray-600">Stripe-powered escrow protects your investments.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TheSmartPro */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Organizations Choose TheSmartPro</h2>
            <p className="text-xl text-gray-600">Enterprise features at a fraction of traditional staffing costs</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "40% Cost Reduction",
                description: "Access top talent without the overhead of full-time employees or expensive agencies."
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Fast Onboarding",
                description: "Find and hire verified professionals in days, not weeks or months."
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Complete Visibility",
                description: "Real-time project tracking, milestone management, and performance analytics."
              },
              {
                icon: <Lock className="h-8 w-8" />,
                title: "Compliance Ready",
                description: "Complete audit logging and compliance tracking for regulatory requirements."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Team Management",
                description: "Role-based access control for your entire team to manage projects."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Risk Protection",
                description: "Escrow-protected payments and professional contracts for every engagement."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-purple-600 mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find & Hire in 4 Steps</h2>
            <p className="text-xl text-gray-600">Simple process to access verified professionals</p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Post Requirements",
                description: "Describe your project needs and budget requirements."
              },
              {
                step: "2",
                title: "Review Proposals",
                description: "Get proposals from verified professionals matching your criteria."
              },
              {
                step: "3",
                title: "Create Contract",
                description: "Agree on terms and create a professional booking agreement."
              },
              {
                step: "4",
                title: "Manage & Pay",
                description: "Track progress, communicate, and pay securely upon delivery."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 text-white text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Features</h2>
            <p className="text-xl text-gray-600">Everything you need for professional services management</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {[
              {
                title: "Professional Contract Management",
                features: [
                  "Automated booking agreements",
                  "Milestone-based deliverables",
                  "Revision tracking and approval workflows",
                  "Complete audit logging for compliance"
                ]
              },
              {
                title: "Financial & Compliance",
                features: [
                  "Automatic invoice generation",
                  "Secure Stripe-powered payments",
                  "Escrow protection on all projects",
                  "VAT and tax calculation"
                ]
              },
              {
                title: "Team Collaboration",
                features: [
                  "Role-based access control",
                  "Multi-user project management",
                  "Real-time notifications",
                  "Built-in messaging system"
                ]
              },
              {
                title: "Analytics & Reporting",
                features: [
                  "Project performance tracking",
                  "Budget vs. actual analysis",
                  "Professional quality metrics",
                  "Compliance audit reports"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Every Organization</h2>
            <p className="text-xl text-gray-600">From startups to enterprises</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Growing Startups",
                description: "Access specialized talent without hiring full-time employees. Scale your team as you grow.",
                icon: "🚀"
              },
              {
                title: "Mid-Market Companies",
                description: "Augment your team with verified professionals for specific projects and expertise gaps.",
                icon: "📈"
              },
              {
                title: "Enterprises",
                description: "Enterprise-grade security, compliance, and contract management for complex engagements.",
                icon: "🏢"
              }
            ].map((useCase, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <CardTitle>{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Leading Organizations</h2>
            <p className="text-xl text-gray-600">See how companies are transforming their hiring</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                company: "TechCorp",
                role: "CTO",
                quote: "TheSmartPro helped us reduce our hiring costs by 40% while maintaining quality. The contract management features are enterprise-grade.",
                savings: "40% Cost Reduction"
              },
              {
                company: "Digital Agency",
                role: "Operations Manager",
                quote: "We now hire specialized professionals for specific projects instead of keeping full-time staff. Much more efficient.",
                savings: "60% Faster Hiring"
              },
              {
                company: "Enterprise Corp",
                role: "Compliance Officer",
                quote: "The audit logging and compliance features meet all our regulatory requirements. Perfect for our enterprise needs.",
                savings: "100% Compliant"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.company}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-purple-600 mb-4">{testimonial.savings}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Access Verified Professionals?</h2>
          <p className="text-xl text-purple-100 mb-8">Join hundreds of organizations already saving 40% on professional services</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Find Professionals
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-purple-700">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
