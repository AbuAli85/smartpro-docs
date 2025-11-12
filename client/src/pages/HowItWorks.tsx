import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Clock, DollarSign, FileText, MessageSquare, BarChart3, Shield } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { setSEOTags } from "@/lib/seoUtils";

export default function HowItWorks() {
  useEffect(() => {
    setSEOTags({
      title: "How It Works | TheSmartPro.io - Platform Guide",
      description: "Learn how TheSmartPro.io works for both service providers and clients. Simple workflows for secure, professional collaborations.",
      keywords: "how it works, platform guide, service provider workflow, client workflow",
      type: "website",
      url: "https://thesmartpro.io/how-it-works",
    });
  }, []);

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "How It Works" }]} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">How TheSmartPro Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A seamless, secure, and professional platform for connecting service providers with organizations. 
              Simple workflows for both sides of the marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs for Provider/Client */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-center gap-4 mb-12">
            <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
              <button className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold">
                For Service Providers
              </button>
              <button className="px-6 py-2 rounded-md text-gray-700 font-semibold hover:bg-gray-100">
                For Organizations
              </button>
            </div>
          </div>

          {/* Provider Workflow */}
          <div className="space-y-12">
            {/* Step 1: Create Profile */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Create Your Profile</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Set up your professional profile with your credentials, expertise, and service offerings. 
                    This is your storefront on TheSmartPro.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Add your professional bio and credentials</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Upload portfolio and work samples</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Set your availability and timezone</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Link your payment information</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👤</div>
                    <p className="text-gray-700 font-semibold">Professional Profile Setup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Get Verified */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 h-80 flex items-center justify-center order-2 md:order-1">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✓</div>
                    <p className="text-gray-700 font-semibold">Admin Verification</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-purple-100">
                      <span className="text-2xl font-bold text-purple-600">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Get Verified</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Our admin team reviews your profile to ensure quality and trustworthiness. 
                    This verification protects both you and our clients.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Credential verification (typically 24-48 hours)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Background check and portfolio review</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Get your "Verified Professional" badge</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Start receiving client inquiries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Create Services */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-green-100">
                      <span className="text-2xl font-bold text-green-600">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Create Service Packages</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Define your service offerings with tiered pricing. Clients can choose the package that fits their needs.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Create Basic, Professional, and Enterprise tiers</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Set pricing and deliverables for each tier</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Define timeline and milestones</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Add service descriptions and requirements</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-gray-700 font-semibold">Service Packages</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Receive & Accept Bookings */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-8 h-80 flex items-center justify-center order-2 md:order-1">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📅</div>
                    <p className="text-gray-700 font-semibold">Booking Management</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-yellow-100">
                      <span className="text-2xl font-bold text-yellow-600">4</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Receive & Accept Bookings</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Clients browse your profile and book your services. You review and accept projects that interest you.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Real-time booking notifications</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Review client requirements and budget</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Accept or negotiate terms</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Automatic contract generation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Deliver & Get Paid */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100">
                      <span className="text-2xl font-bold text-red-600">5</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Deliver & Get Paid</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Complete your work, submit deliverables, and get paid securely. Payments are held in escrow until client approval.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Track project progress in real-time</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Submit deliverables and get client feedback</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Automatic payment upon client approval</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Keep 80% of project fees (TheSmartPro takes 20%)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💰</div>
                    <p className="text-gray-700 font-semibold">Secure Payments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6: Build Reputation */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-8 h-80 flex items-center justify-center order-2 md:order-1">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⭐</div>
                    <p className="text-gray-700 font-semibold">Reputation Building</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-100">
                      <span className="text-2xl font-bold text-indigo-600">6</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Build Your Reputation</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Earn client reviews and ratings that build your professional reputation and attract more business.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Clients leave ratings and reviews</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Build a portfolio of completed projects</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Higher ratings attract premium clients</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Scale your business with recurring clients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Comparison */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Timeline Comparison</h2>
            <p className="text-xl text-gray-600">How long does it take to get started?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Provider Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">For Service Providers</h3>
              {[
                { time: "5 minutes", task: "Sign up and create profile" },
                { time: "24-48 hours", task: "Admin verification" },
                { time: "10 minutes", task: "Create service packages" },
                { time: "Immediate", task: "Start receiving bookings" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    {index < 3 && <div className="w-1 h-12 bg-blue-300 mt-2"></div>}
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-gray-900">{item.time}</p>
                    <p className="text-gray-600">{item.task}</p>
                  </div>
                </div>
              ))}
              <div className="bg-blue-50 rounded-lg p-4 mt-8">
                <p className="text-sm text-gray-700">
                  <strong>Total time to first booking:</strong> ~2 days
                </p>
              </div>
            </div>

            {/* Client Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">For Organizations</h3>
              {[
                { time: "5 minutes", task: "Sign up and create account" },
                { time: "10 minutes", task: "Post project requirements" },
                { time: "24 hours", task: "Receive proposals from providers" },
                { time: "1 hour", task: "Review and select provider" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    {index < 3 && <div className="w-1 h-12 bg-purple-300 mt-2"></div>}
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-gray-900">{item.time}</p>
                    <p className="text-gray-600">{item.task}</p>
                  </div>
                </div>
              ))}
              <div className="bg-purple-50 rounded-lg p-4 mt-8">
                <p className="text-sm text-gray-700">
                  <strong>Total time to hire:</strong> ~1 day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Highlight */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes TheSmartPro Different</h2>
            <p className="text-xl text-gray-600">Enterprise-grade features at every step</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="h-8 w-8" />,
                title: "Professional Contracts",
                description: "Automated booking agreements with milestone tracking"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure Payments",
                description: "Stripe-powered escrow protects both parties"
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "Built-in Communication",
                description: "Messaging system with file sharing and notifications"
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Complete Analytics",
                description: "Track performance, earnings, and project metrics"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">Join thousands of professionals and organizations already using TheSmartPro</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                I'm a Service Provider
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                I'm Looking for Professionals
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
