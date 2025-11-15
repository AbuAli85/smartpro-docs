import { useEffect } from "react";
import { Users, Award, MessageSquare, Workflow, Sparkles, ArrowRight, Github, Linkedin, Twitter, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setSEOTags } from "@/lib/seoUtils";

const programs = [
  {
    icon: MessageSquare,
    title: "Office Hours",
    description: "Live AMAs with product, design, and engineering leaders every Thursday.",
  },
  {
    icon: Workflow,
    title: "Blueprint Sessions",
    description: "Share workflows, automation tips, and templates with peers across industries.",
  },
  {
    icon: Award,
    title: "Champions Circle",
    description: "Early access, roadmap previews, and co-marketing for ecosystem advocates.",
  },
];

const communityLinks = [
  { icon: Github, label: "GitHub Discussions", href: "https://github.com/AbuAli85/smartpro-docs/discussions" },
  { icon: Linkedin, label: "LinkedIn Group", href: "https://www.linkedin.com/company/thesmartpro" },
  { icon: Twitter, label: "Twitter Community", href: "https://twitter.com/thesmartpro" },
];

export default function Community() {
  useEffect(() => {
    setSEOTags({
      title: "Community | TheSmartPro.io Builders & Advocates",
      description: "Join the SmartPro community to swap best practices, attend office hours, and shape the roadmap with fellow operators.",
      keywords: "community, thesmartpro community, user group, ambassadors, office hours",
      type: "website",
      url: "https://thesmartpro.io/community",
    });
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <Breadcrumb items={[{ label: "Community" }]} />

        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1 text-sm font-semibold text-blue-200">
                <Sparkles className="h-4 w-4" /> SmartPro Community
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
                Build with operators shaping the future of professional services
              </h1>
              <p className="mt-4 text-lg text-slate-200">
                Join thousands of providers, operations leaders, and admins who openly share playbooks, tools, and experiments. Earn recognition and help influence the roadmap.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
                  <a href="https://community.thesmartpro.io">Apply to join</a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href="/docs/features">See what’s new</a>
                </Button>
              </div>
            </div>
            <Card className="bg-white/10 text-white backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Community metrics</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                {[
                  { label: "Active members", value: "2,800+" },
                  { label: "Playbooks shared", value: "350+" },
                  { label: "Weekly sessions", value: "5" },
                  { label: "NPS", value: "+72" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-3xl font-bold text-white">{item.value}</p>
                    <p className="text-sm text-slate-200">{item.label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
          <div className="grid gap-8 md:grid-cols-3">
            {programs.map((program) => (
              <Card key={program.title} className="h-full">
                <CardHeader>
                  <program.icon className="h-10 w-10 text-blue-600" />
                  <CardTitle>{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle>Ways to contribute</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Share a workflow",
                  desc: "Publish a template or automations that saved your team time.",
                },
                {
                  title: "Host a field session",
                  desc: "Walk through your stack, discovery process, or vendor strategy.",
                },
                {
                  title: "Mentor providers",
                  desc: "Pair with new partners to review proposals, pricing, and delivery.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="bg-slate-900 text-white">
              <CardHeader>
                <CardTitle>Rewards & recognition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-200">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  <p>Showcase your team in community spotlights and events.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5" />
                  <p>Earn points toward certifications, swag, and beta access.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5" />
                  <p>Unlock the SmartPro Champion badge for your profile.</p>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
                  <a href="/contact">Partner with us</a>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Join the conversation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {communityLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5 text-slate-600" />
                      <span className="font-medium text-slate-800">{link.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

