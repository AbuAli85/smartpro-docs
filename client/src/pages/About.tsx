import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Users, Target, Zap } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  const breadcrumbItems = [{ label: "About Us" }];
  const values = [
    {
      icon: Target,
      title: "Customer-Centric",
      description: "We obsess over solving real customer problems, not building features nobody wants."
    },
    {
      icon: Zap,
      title: "Speed & Simplicity",
      description: "We believe great software should be fast to implement and easy to use."
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "We build tools that bring teams together, not tools that create silos."
    }
  ];

  const team = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      bio: "15+ years in enterprise software. Previously VP Product at leading SaaS company.",
      image: "👨‍💼"
    },
    {
      name: "Sarah Johnson",
      role: "VP Product",
      bio: "Product leader with 12 years experience. Built products used by 500K+ users.",
      image: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "VP Engineering",
      bio: "Full-stack engineer with 10 years experience. Built scalable systems at scale.",
      image: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "VP Sales",
      bio: "Sales leader with 8 years experience. Built sales teams from 0 to 50+ people.",
      image: "👩‍💼"
    }
  ];

  const milestones = [
    { year: "2023", event: "Founded TheSmartPro.io with vision to solve tool fragmentation" },
    { year: "2024 Q1", event: "Launched MVP and acquired first 50 customers" },
    { year: "2024 Q2", event: "Reached 181+ customers with $2.4M ARR" },
    { year: "2024 Q3", event: "Achieved 115% NRR and 0% churn" },
    { year: "2024 Q4", event: "Series A funding and expansion to new verticals" }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Breadcrumb items={breadcrumbItems} />
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            About TheSmartPro.io
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            We're on a mission to eliminate tool fragmentation and help mid-market companies focus on what matters most: growing their business.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-lg text-slate-600 mb-4">
                TheSmartPro.io was born from frustration. Our founder, John Smith, spent years watching mid-market companies struggle with the same problem: managing 5-7 disconnected software tools.
              </p>
              <p className="text-lg text-slate-600 mb-4">
                Teams were losing data between systems, wasting hours on manual integrations, and paying thousands in unnecessary software subscriptions. There had to be a better way.
              </p>
              <p className="text-lg text-slate-600">
                In 2023, we set out to build it. TheSmartPro.io is the result: a unified business platform that consolidates all the tools mid-market companies need into one integrated system.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Founded 2023</h3>
                    <p className="text-slate-600">With a vision to transform how mid-market companies operate</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">181+ Customers</h3>
                    <p className="text-slate-600">Across professional services, tech, manufacturing, and retail</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">$2.4M ARR</h3>
                    <p className="text-slate-600">With 115% NRR and 0% churn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-l-4 border-l-blue-600">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-lg text-slate-600">
                To eliminate tool fragmentation and empower mid-market companies to operate more efficiently, collaboratively, and profitably by providing a unified business platform that replaces 5+ disconnected systems.
              </p>
            </Card>
            <Card className="p-8 border-l-4 border-l-emerald-600">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-lg text-slate-600">
                To become the preferred business platform for mid-market companies worldwide, trusted by 10,000+ organizations to run their core business operations with simplicity, efficiency, and confidence.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <value.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-8">
                <div className="text-5xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-slate-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-sm font-semibold text-blue-600 mb-1">{milestone.year}</p>
                  <p className="text-lg text-slate-900">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-slate-600 mb-8">
            We're hiring talented people who are passionate about solving real customer problems. If you're interested in joining our team, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View Open Positions
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}
