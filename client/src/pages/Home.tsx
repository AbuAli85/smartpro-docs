import { ArrowRight, CheckCircle2, Users, TrendingUp, Lock, Zap, BarChart3, Shield, FileText, Calendar, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlatformScreenshots from "@/components/PlatformScreenshots";
import CustomerLogos from "@/components/CustomerLogos";
import NetworkStats from "@/components/NetworkStats";
import TestimonialVideos from "@/components/TestimonialVideos";
import { useEffect } from "react";
import { setSEOTags } from "@/lib/seoUtils";
import { generateOrganizationSchema, generateSoftwareSchema, insertMultipleSchemas } from "@/lib/schemaUtils";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animationUtils";

export default function HomeNew() {
  useEffect(() => {
    setSEOTags({
      title: "TheSmartPro.io - Enterprise Professional Services Marketplace",
      description: "Connect with verified professionals, manage contracts, and scale your business. Enterprise-grade marketplace for service providers and organizations. 10K+ professionals, $50M+ processed.",
      keywords: "professional services, marketplace, enterprise software, service providers, contract management, verified professionals, business platform",
      type: "website",
      url: "https://thesmartpro.io",
    });

    // Add structured data for SEO
    const organizationSchema = generateOrganizationSchema({
      name: "TheSmartPro.io",
      description: "Enterprise-grade professional services marketplace connecting verified service providers with organizations",
      url: "https://thesmartpro.io",
      logo: "https://thesmartpro.io/logo.png",
      contactPoint: {
        telephone: "+1-555-0100",
        contactType: "customer support",
        email: "support@thesmartpro.io"
      },
      sameAs: [
        "https://twitter.com/thesmartpro",
        "https://linkedin.com/company/thesmartpro",
        "https://facebook.com/thesmartpro"
      ]
    });

    const softwareSchema = generateSoftwareSchema({
      name: "TheSmartPro.io Platform",
      description: "Professional services marketplace with contract management, booking, and payment processing",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      offers: {
        price: "0",
        priceCurrency: "USD"
      }
    });

    insertMultipleSchemas([organizationSchema, softwareSchema]);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section - Main Value Prop */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20 -z-10" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div 
                variants={staggerItem}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium border border-blue-400/30"
              >
                <Shield className="w-4 h-4" />
                <span>Enterprise-Grade Marketplace</span>
              </motion.div>
              
              <motion.h1 
                variants={staggerItem}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                The Professional Services Marketplace Built for Enterprise
              </motion.h1>
              
              <motion.p 
                variants={staggerItem}
                className="text-xl md:text-2xl text-slate-300 leading-relaxed"
              >
                Connect with verified professionals, manage contracts, and scale your business with enterprise-grade features that serious service providers and organizations demand.
              </motion.p>
              
              <motion.div 
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 px-8" asChild>
                  <Link href="/get-started-providers">
                    For Service Providers
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg h-12 px-8" asChild>
                  <Link href="/clients">
                    For Organizations
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div 
                variants={staggerItem}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
              >
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-slate-400">Verified Professionals</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">$50M+</div>
                  <div className="text-sm text-slate-400">Transactions Processed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-slate-400">Satisfaction Rate</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-400" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Contract Management</div>
                      <div className="text-xs text-slate-400">Automated workflows & approvals</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-400" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Booking System</div>
                      <div className="text-xs text-slate-400">Integrated scheduling & reminders</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-yellow-400" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Secure Payments</div>
                      <div className="text-xs text-slate-400">Stripe integration with escrow</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
                    <Shield className="w-6 h-6 text-purple-400" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Enterprise Security</div>
                      <div className="text-xs text-slate-400">MFA, RLS, audit logging</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dual Value Props */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Both Sides of the Marketplace
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a service provider growing your business or an organization seeking verified professionals, TheSmartPro.io has the tools you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Service Providers */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                <Users className="w-4 h-4" />
                For Service Providers
              </div>
              
              <h3 className="text-3xl font-bold">
                Grow Your Professional Services Business
              </h3>
              
              <p className="text-lg text-muted-foreground">
                Access serious clients, manage projects professionally, and scale your business with enterprise-grade tools designed for consultants, agencies, and freelance professionals.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Reach verified clients seeking quality professionals",
                  "Professional profiles with portfolio and ratings",
                  "Integrated contract management and invoicing",
                  "Secure payment processing with escrow protection",
                  "Advanced scheduling and availability management",
                  "Business analytics and performance tracking"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 px-8 w-full" asChild>
                <Link href="/get-started-providers">
                  Start as a Service Provider
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Organizations */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
                <BarChart3 className="w-4 h-4" />
                For Organizations
              </div>
              
              <h3 className="text-3xl font-bold">
                Access Verified Professionals with Enterprise Features
              </h3>
              
              <p className="text-lg text-muted-foreground">
                Find the right professionals for your projects, manage engagements professionally, and maintain compliance with enterprise-grade contract management and audit logging.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Search and filter verified professionals by expertise",
                  "Enterprise contract management with approval workflows",
                  "Role-based access control for team management",
                  "Integrated booking and scheduling system",
                  "Complete audit logging for compliance",
                  "Centralized invoice and payment management"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg h-12 px-8 w-full" asChild>
                <Link href="/clients">
                  Start as an Organization
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={staggerItem}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Enterprise-Grade Features
            </motion.h2>
            <motion.p 
              variants={staggerItem}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Everything you need to manage professional services engagements with confidence and compliance.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: FileText,
                title: "Contract Management",
                description: "Multi-step approval workflows, document generation, version control, and complete audit logging for compliance."
              },
              {
                icon: Calendar,
                title: "Booking & Scheduling",
                description: "Integrated appointment scheduling with calendar synchronization, reminders, and availability management."
              },
              {
                icon: DollarSign,
                title: "Payment Processing",
                description: "Secure Stripe integration with escrow protection, invoice generation, and multi-currency support."
              },
              {
                icon: Shield,
                title: "Security & Compliance",
                description: "MFA authentication, Row Level Security, audit logging, and enterprise-grade security controls."
              },
              {
                icon: Users,
                title: "Team Management",
                description: "Role-based access control, granular permissions, and multi-user organization management."
              },
              {
                icon: BarChart3,
                title: "Analytics & Reporting",
                description: "Performance dashboards, transaction analytics, and business intelligence for data-driven decisions."
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={i} 
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How TheSmartPro.io Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and professional from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Providers */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">For Service Providers</h3>
              {[
                { step: 1, title: "Create Your Profile", desc: "Set up your professional profile with credentials, experience, and services" },
                { step: 2, title: "Get Discovered", desc: "Organizations search and find you based on expertise and ratings" },
                { step: 3, title: "Manage Engagements", desc: "Handle contracts, scheduling, and communication in one place" },
                { step: 4, title: "Get Paid Securely", desc: "Receive payments via secure Stripe integration with escrow protection" }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* For Clients */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">For Organizations</h3>
              {[
                { step: 1, title: "Search Professionals", desc: "Find verified professionals by expertise, experience, and ratings" },
                { step: 2, title: "Review & Connect", desc: "Review portfolios, ratings, and testimonials before engaging" },
                { step: 3, title: "Manage Contracts", desc: "Create contracts, manage approvals, and track engagement status" },
                { step: 4, title: "Pay & Archive", desc: "Process payments securely and maintain complete audit trails" }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Screenshots */}
      <PlatformScreenshots />

      {/* Customer Logos */}
      <CustomerLogos />

      {/* Video Testimonials */}
      <TestimonialVideos />

      {/* Network Stats */}
      <NetworkStats />

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what service providers and organizations say about TheSmartPro.io
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "TheSmartPro.io transformed how I manage my consulting business. The contract management and invoicing features save me hours every week.",
                author: "Sarah Chen",
                title: "Independent Consultant",
                rating: 5
              },
              {
                quote: "Finally, a marketplace that takes contracts and compliance seriously. We can confidently hire professionals knowing everything is properly documented.",
                author: "Michael Rodriguez",
                title: "VP of Operations, Tech Startup",
                rating: 5
              },
              {
                quote: "The booking system and payment processing are seamless. My clients love the professional experience, and I love the reliable payments.",
                author: "James Wilson",
                title: "Design Agency Owner",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Professional Services?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of service providers and organizations using TheSmartPro.io to connect, collaborate, and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg h-12 px-8" asChild>
              <Link href="/get-started-providers">
                For Service Providers
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="text-lg h-12 px-8" asChild>
              <Link href="/clients">
                For Organizations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
