import { useEffect } from "react";
import { Shield, HeadphonesIcon, MessageSquare, Mail, Clock, BookOpen, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setSEOTags } from "@/lib/seoUtils";

const supportChannels = [
  {
    icon: HeadphonesIcon,
    title: "Priority Support",
    description: "Live chat and dedicated account managers for enterprise plans.",
    action: "Chat with us",
  },
  {
    icon: MessageSquare,
    title: "Knowledge Base",
    description: "Step-by-step guides, release notes, and troubleshooting docs.",
    action: "Browse articles",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "24-hour response time for all customers. VIP queue for partners.",
    action: "Email support",
  },
];

const quickLinks = [
  { label: "Platform Status", href: "https://status.thesmartpro.io" },
  { label: "Security & Compliance", href: "/security" },
  { label: "Product Roadmap", href: "/docs/product-overview" },
  { label: "API Reference", href: "/docs/api" },
];

export default function HelpCenter() {
  useEffect(() => {
    setSEOTags({
      title: "Help Center | TheSmartPro.io Support & Resources",
      description: "Get help with onboarding, billing, security, and integrations. Explore FAQs, guides, and contact options for TheSmartPro.io.",
      keywords: "help center, support, thesmartpro support, customer success, documentation, troubleshooting",
      type: "website",
      url: "https://thesmartpro.io/help",
    });
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <Breadcrumb items={[{ label: "Help Center" }]} />
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-blue-100">
                <Shield className="h-4 w-4" /> Customer Success
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
                We’re here to help you ship reliable service experiences
              </h1>
              <p className="mt-4 text-lg text-blue-100">
                Access self-service resources or talk with a specialist. Our support team covers onboarding, compliance, integrations, and everything in between.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
                  <a href="mailto:support@thesmartpro.io">Contact Support</a>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                  <a href="/docs">Explore Documentation</a>
                </Button>
              </div>
            </div>
            <Card className="bg-white/10 text-white backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-blue-100">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="font-semibold text-white">Global coverage</p>
                    <p>Sunday–Thursday, 8 AM – 10 PM GST</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HeadphonesIcon className="h-5 w-5" />
                  <div>
                    <p className="font-semibold text-white">Enterprise hotline</p>
                    <p>Priority queue for tier-1 incidents</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5" />
                  <div>
                    <p className="font-semibold text-white">Guided onboarding</p>
                    <p>Playbooks for admins & service teams</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
          <div className="grid gap-8 md:grid-cols-3">
            {supportChannels.map((channel) => (
              <Card key={channel.title} className="h-full">
                <CardHeader>
                  <channel.icon className="h-10 w-10 text-blue-600" />
                  <CardTitle>{channel.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">{channel.description}</p>
                  <Button variant="link" className="px-0 text-blue-600">
                    {channel.action} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Guides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Administrator onboarding checklist", href: "/docs/getting-started" },
                  { label: "Integrate SmartPro with your ERP", href: "/docs/architecture" },
                  { label: "Security, compliance, and access controls", href: "/security" },
                  { label: "Provider verification workflow", href: "/providers" },
                ].map((link) => (
                  <a key={link.label} href={link.href} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 hover:border-blue-500 hover:bg-blue-50">
                    <span className="font-medium text-slate-800">{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </a>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-slate-900 text-white">
              <CardHeader>
                <CardTitle>Need faster support?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-200">
                <p>Enterprise plans include direct Slack channels, incident response SLAs, and joint runbooks.</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
                  <a href="/contact">Talk to sales</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 hover:border-blue-500 hover:bg-blue-50">
                  <span className="font-medium text-slate-800">{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </a>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}

