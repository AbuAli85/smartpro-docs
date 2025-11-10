import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Users, DollarSign } from "lucide-react";

export default function CaseStudiesPage() {
  const providerCaseStudies = [
    {
      name: "Sarah Chen",
      title: "Management Consultant",
      location: "San Francisco, CA",
      image: "👩‍💼",
      challenge: "Struggled to find consistent high-paying clients and spent 30% of time on business development",
      solution: "Joined TheSmartPro and created tiered service packages targeting enterprise clients",
      results: [
        { metric: "Income Growth", value: "+180%", description: "First year earnings" },
        { metric: "Client Acquisition", value: "15+ clients", description: "From platform referrals" },
        { metric: "Time Saved", value: "12 hrs/week", description: "On business development" },
        { metric: "Rating", value: "4.9/5 stars", description: "From 23 completed projects" }
      ],
      quote: "TheSmartPro transformed my consulting business. I went from struggling to find clients to having a waiting list. The platform handles all the administrative work, so I can focus on delivering great work.",
      industry: "Management Consulting"
    },
    {
      name: "Marcus Johnson",
      title: "UX/UI Designer",
      location: "Austin, TX",
      image: "👨‍💻",
      challenge: "Competing on price with freelancers on Fiverr and Upwork, low project margins",
      solution: "Positioned as premium designer on TheSmartPro, targeting enterprise clients",
      results: [
        { metric: "Average Project Value", value: "+250%", description: "Higher-paying clients" },
        { metric: "Monthly Revenue", value: "$8,500", description: "Consistent recurring work" },
        { metric: "Project Completion", value: "98%", description: "On-time delivery rate" },
        { metric: "Client Retention", value: "85%", description: "Repeat business rate" }
      ],
      quote: "The quality of clients on TheSmartPro is incomparable. I'm working with Fortune 500 companies now instead of competing with thousands of designers on other platforms. My rates have tripled.",
      industry: "Design"
    },
    {
      name: "Priya Patel",
      title: "Data Scientist",
      location: "New York, NY",
      image: "👩‍🔬",
      challenge: "Limited to part-time work due to full-time employment, wanted to build consulting business",
      solution: "Used TheSmartPro's flexible scheduling to take on enterprise data science projects",
      results: [
        { metric: "Side Income", value: "$15,000/month", description: "Part-time consulting" },
        { metric: "Projects", value: "8-10 active", description: "Concurrent projects" },
        { metric: "Utilization", value: "95%", description: "Billable hours" },
        { metric: "Transition", value: "Full-time", description: "Now full-time consultant" }
      ],
      quote: "TheSmartPro gave me the confidence to go full-time as a consultant. The platform's contract management and payment security made the transition smooth. I'm now earning 3x my previous salary.",
      industry: "Data Science"
    }
  ];

  const clientCaseStudies = [
    {
      company: "TechStart Inc.",
      size: "50 employees",
      industry: "SaaS",
      image: "🏢",
      challenge: "Needed 5 additional developers for 6-month project but couldn't justify permanent hires",
      solution: "Hired 5 verified developers through TheSmartPro with flexible contracts",
      results: [
        { metric: "Cost Savings", value: "$180,000", description: "vs. hiring permanent staff" },
        { metric: "Time to Hire", value: "3 days", description: "vs. 30 days traditional hiring" },
        { metric: "Project Delivery", value: "On-time", description: "Delivered 2 weeks early" },
        { metric: "Quality", value: "Zero defects", description: "In production code" }
      ],
      quote: "TheSmartPro solved our staffing challenge perfectly. We got experienced developers immediately without the overhead of permanent hires. The contract management and milestone tracking kept everyone aligned.",
      testimonial: "VP of Engineering, TechStart Inc."
    },
    {
      company: "Global Consulting Group",
      size: "200 employees",
      industry: "Management Consulting",
      image: "🌍",
      challenge: "Seasonal demand spikes required flexible staffing but traditional agencies were expensive",
      solution: "Built network of 50+ consultants on TheSmartPro for surge capacity",
      results: [
        { metric: "Staffing Flexibility", value: "±40%", description: "Capacity scaling" },
        { metric: "Cost Reduction", value: "35%", description: "vs. traditional staffing agencies" },
        { metric: "Consultant Quality", value: "9.2/10", description: "Average rating" },
        { metric: "Repeat Rate", value: "92%", description: "Rehire rate for consultants" }
      ],
      quote: "TheSmartPro's enterprise features—contracts, compliance, team management—gave us the confidence to scale our consultant network. We've reduced staffing costs by 35% while improving quality.",
      testimonial: "Chief Operations Officer, Global Consulting Group"
    },
    {
      company: "FinServ Solutions",
      size: "150 employees",
      industry: "Financial Services",
      image: "💰",
      challenge: "Needed compliance-grade contractor management with audit trails for regulated industry",
      solution: "Implemented TheSmartPro for all contractor engagements with full audit logging",
      results: [
        { metric: "Compliance", value: "100%", description: "Audit-ready documentation" },
        { metric: "Admin Time", value: "-60%", description: "Reduced contractor paperwork" },
        { metric: "Contractor Quality", value: "9.7/10", description: "Average rating" },
        { metric: "Audit Pass Rate", value: "100%", description: "No compliance issues" }
      ],
      quote: "As a regulated financial services company, we needed enterprise-grade contractor management. TheSmartPro's compliance features, audit logging, and security certifications gave us confidence. We've reduced admin overhead by 60%.",
      testimonial: "Chief Compliance Officer, FinServ Solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Success Stories</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how professionals and organizations are transforming their businesses with TheSmartPro
            </p>
          </div>
        </div>
      </section>

      {/* Provider Case Studies */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Provider Success Stories</h2>
            <p className="text-xl text-gray-600">How professionals are growing their businesses</p>
          </div>

          <div className="space-y-12">
            {providerCaseStudies.map((study, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Left: Profile & Quote */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-6xl">{study.image}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{study.name}</h3>
                          <p className="text-lg text-blue-600 font-semibold">{study.title}</p>
                          <p className="text-sm text-gray-600">{study.location}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-lg italic text-gray-700 leading-relaxed">"{study.quote}"</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                        {study.industry}
                      </span>
                    </div>
                  </div>

                  {/* Right: Challenge, Solution, Results */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {study.results.map((result, i) => (
                          <div key={i} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                            <p className="text-2xl font-bold text-blue-600 mb-1">{result.value}</p>
                            <p className="text-sm font-semibold text-gray-900">{result.metric}</p>
                            <p className="text-xs text-gray-600">{result.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Case Studies */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600">How organizations are reducing costs and improving efficiency</p>
          </div>

          <div className="space-y-12">
            {clientCaseStudies.map((study, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Left: Company & Quote */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-6xl">{study.image}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{study.company}</h3>
                          <p className="text-sm text-gray-600">{study.size}</p>
                          <p className="text-sm text-gray-600">{study.industry}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-lg italic text-gray-700 leading-relaxed">"{study.quote}"</p>
                        <p className="text-sm text-gray-600 mt-4 font-semibold">{study.testimonial}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Challenge, Solution, Results */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {study.results.map((result, i) => (
                          <div key={i} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                            <p className="text-2xl font-bold text-purple-600 mb-1">{result.value}</p>
                            <p className="text-sm font-semibold text-gray-900">{result.metric}</p>
                            <p className="text-xs text-gray-600">{result.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Active Users", value: "10,000+" },
              { icon: DollarSign, label: "Total Earnings", value: "$50M+" },
              { icon: TrendingUp, label: "Avg Income Growth", value: "+180%" },
              { icon: Star, label: "Avg Rating", value: "4.8/5" }
            ].map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm text-center">
                <CardContent className="pt-8">
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-blue-100 mb-8">Join thousands of professionals and organizations already thriving on TheSmartPro</p>
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
  );
}
