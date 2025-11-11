import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Shield, Users, BarChart3, Clock, DollarSign, Lock } from "lucide-react";
import { Link } from "wouter";
import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { setSEOTags } from "@/lib/seoUtils";
import { trackCTAClick } from "@/lib/googleAnalytics";

export default function ProvidersPage() {
  useEffect(() => {
    setSEOTags({
      title: "For Service Providers | TheSmartPro.io - Grow Your Professional Services Business",
      description: "Join 10,000+ service providers earning on TheSmartPro.io. Keep 80% of fees, work with verified clients, secure Stripe payments. Start earning today.",
      keywords: "service providers, consultants, freelance professionals, earn money, professional services marketplace, verified clients",
      type: "website",
      url: "https://thesmartpro.io/providers",
    });
  }, []);
  
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "For Providers" }, { label: "Earn More" }]} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Grow Your Professional Services Business
                </h1>
                <p className="text-xl text-gray-600">
                  Connect with verified clients, manage projects professionally, and scale your consulting business with enterprise-grade tools.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => trackCTAClick('Start Earning Today', 'Providers Hero', 'primary')}
                >
                  <Link href="/get-started-providers">Start Earning Today</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">Watch Demo</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-gray-900">10,000+</div>
                  <p className="text-sm text-gray-600">Active Providers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">$50M+</div>
                  <p className="text-sm text-gray-600">Payments Processed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <p className="text-sm text-gray-600">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        <DollarSign className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Transparent Earnings</h3>
                      <p className="text-gray-600">Keep 80% of project fees. No hidden charges.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Verified Clients</h3>
                      <p className="text-gray-600">Work with pre-vetted organizations only.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                        <Shield className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Secure Payments</h3>
                      <p className="text-gray-600">Stripe-powered escrow protection for every project.</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TheSmartPro?</h2>
            <p className="text-xl text-gray-600">Everything you need to build a thriving consulting business</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Grow Your Revenue",
                description: "Access a steady stream of verified clients and scale your business without marketing overhead."
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Save Time",
                description: "Automated scheduling, invoicing, and payment processing save you hours every week."
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Track Performance",
                description: "Real-time analytics show your earnings, client satisfaction, and project completion rates."
              },
              {
                icon: <Lock className="h-8 w-8" />,
                title: "Professional Contracts",
                description: "Enterprise-grade contract management with automatic invoicing and compliance tracking."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Build Your Reputation",
                description: "Client reviews and ratings build your professional reputation and attract more business."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Payment Security",
                description: "Secure Stripe-powered payments with escrow protection on every project."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started in 4 Steps</h2>
            <p className="text-xl text-gray-600">Start earning within days, not months</p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Create Profile",
                description: "Set up your professional profile with your credentials and expertise."
              },
              {
                step: "2",
                title: "Get Verified",
                description: "Complete our verification process to get approved by our admin team."
              },
              {
                step: "3",
                title: "Create Services",
                description: "List your services with tiered pricing (Basic/Pro/Enterprise packages)."
              },
              {
                step: "4",
                title: "Start Earning",
                description: "Receive bookings from verified clients and manage projects professionally."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
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

      {/* Features */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Tools for Growing Businesses</h2>
            <p className="text-xl text-gray-600">Enterprise-grade features at a fraction of the cost</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {[
              {
                title: "Advanced Booking Management",
                features: [
                  "Automated scheduling and calendar integration",
                  "Client requirements and project briefs",
                  "Milestone tracking and progress updates",
                  "Automatic invoice generation"
                ]
              },
              {
                title: "Financial Tools",
                features: [
                  "Real-time revenue tracking",
                  "Automatic VAT calculation",
                  "Secure Stripe payments with escrow",
                  "Monthly earnings reports"
                ]
              },
              {
                title: "Client Communication",
                features: [
                  "Built-in messaging system",
                  "File sharing and attachments",
                  "Project-linked conversations",
                  "Real-time notifications"
                ]
              },
              {
                title: "Analytics & Growth",
                features: [
                  "Client satisfaction ratings",
                  "Project completion tracking",
                  "Revenue growth analytics",
                  "Performance benchmarking"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Professional Service Providers</h2>
            <p className="text-xl text-gray-600">See how providers are growing their businesses</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Digital Marketing Consultant",
                quote: "TheSmartPro helped me grow my consulting business from $50K to $200K annually. The tools are professional and the clients are serious.",
                rating: 5
              },
              {
                name: "Ahmed Al-Mansouri",
                role: "Business Strategy Advisor",
                quote: "I love the contract management features and automatic invoicing. It saves me hours every week and looks professional to clients.",
                rating: 5
              },
              {
                name: "Maria Rodriguez",
                role: "UX/UI Design Specialist",
                quote: "The booking system and client communication tools are exactly what I needed. My client satisfaction went up significantly.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
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
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Grow Your Professional Services Business?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of service providers already earning on TheSmartPro</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Earning Today
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
