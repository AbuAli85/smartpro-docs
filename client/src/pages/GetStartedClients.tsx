import { useEffect } from "react";
import { CheckCircle2, Clock, Shield, Users, Search, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { setSEOTags } from "@/lib/seoUtils";

export default function GetStartedClients() {
  useEffect(() => {
    setSEOTags({
      title: "Get Started - For Clients | TheSmartPro.io",
      description: "Start hiring top professional service providers on TheSmartPro. Find qualified experts, manage contracts, and grow your business efficiently.",
      keywords: "hire professionals, find service providers, contract management, professional services",
      type: "website",
      url: "https://thesmartpro.io/get-started-clients",
    });
  }, []);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "For Clients", href: "/clients" },
    { label: "Get Started" }
  ];

  const steps = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Create Your Account",
      description: "Sign up in minutes with your business email. No credit card required to get started."
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Find Expert Providers",
      description: "Browse our curated marketplace of verified professionals or post your project requirements."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Review and Hire",
      description: "Compare proposals, check ratings and reviews, then hire the perfect match for your needs."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Manage and Collaborate",
      description: "Use our platform tools for contract management, payments, and project collaboration."
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Verified Professionals",
      description: "All providers are vetted and verified with portfolio reviews and background checks"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Save Time",
      description: "Find the right expert faster with AI-powered matching and instant proposals"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-blue-600" />,
      title: "Secure Payments",
      description: "Escrow protection, milestone-based payments, and automated invoicing"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Start Hiring Top Talent Today</h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with verified professionals and scale your business with confidence
            </p>
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold">50,000+</div>
                <p className="text-blue-100">Qualified Providers</p>
              </div>
              <div>
                <div className="text-3xl font-bold">$100M+</div>
                <p className="text-blue-100">Projects Completed</p>
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <p className="text-blue-100">Client Satisfaction</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Hiring
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200" />
                  )}
                  <div className="relative">
                    <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-blue-600">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose TheSmartPro</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 mb-8">Pay only when you find and hire the perfect professional</p>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <div className="text-5xl font-bold text-blue-600 mb-2">Free</div>
              <p className="text-gray-700 mb-6">to post projects and browse providers</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Unlimited project postings</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Access to all verified providers</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Contract management tools</span>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                *Small service fee applies to completed projects
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses finding top talent on TheSmartPro
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Create Free Account
            </Button>
            <p className="mt-4 text-sm text-blue-100">
              No credit card required • Get started in minutes
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

