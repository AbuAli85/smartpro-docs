import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Zap,
  Heart,
  TrendingUp,
  Code,
  Briefcase,
  ArrowRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { setSEOTags } from "@/lib/seoUtils";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
}

export default function Careers() {
  useEffect(() => {
    setSEOTags({
      title: "Careers | TheSmartPro.io - Join Our Team",
      description: "Join TheSmartPro.io and help build the future of professional services. Explore open positions and grow your career with us.",
      keywords: "thesmartpro careers, jobs, employment, job openings, work at thesmartpro",
      type: "website",
      url: "https://thesmartpro.io/careers",
    });
  }, []);

  const breadcrumbItems = [
    { label: "Company", href: "/company" },
    { label: "Careers" }
  ];

  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Competitive Salary",
      description: "Market-leading compensation with equity options"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision coverage"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Schedule",
      description: "Work from anywhere with flexible hours"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Opportunities",
      description: "Professional development and learning budget"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Great Culture",
      description: "Collaborative, inclusive, and supportive team"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Latest Technology",
      description: "Work with cutting-edge tools and technologies"
    }
  ];

  const jobPostings: JobPosting[] = [
    {
      id: "senior-fullstack-engineer",
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$140k - $180k",
      description: "Build scalable features for our enterprise platform using React, Node.js, and PostgreSQL."
    },
    {
      id: "product-designer",
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $150k",
      description: "Design beautiful and intuitive experiences for our users across web and mobile platforms."
    },
    {
      id: "product-manager",
      title: "Senior Product Manager",
      department: "Product",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$150k - $190k",
      description: "Lead product strategy and execution for our core marketplace platform."
    },
    {
      id: "sales-executive",
      title: "Enterprise Sales Executive",
      department: "Sales",
      location: "New York, NY / Remote",
      type: "Full-time",
      salary: "$100k - $140k + Commission",
      description: "Drive revenue growth by building relationships with enterprise customers."
    },
    {
      id: "customer-success",
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $110k",
      description: "Ensure our customers achieve their goals and maximize value from our platform."
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Build and maintain our cloud infrastructure, CI/CD pipelines, and monitoring systems."
    }
  ];

  const departments = ["All", ...Array.from(new Set(jobPostings.map(job => job.department)))];

  const filteredJobs = selectedDepartment === "All" 
    ? jobPostings 
    : jobPostings.filter(job => job.department === selectedDepartment);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Join Our Mission</h1>
            <p className="text-xl text-blue-100 mb-8">
              Help us build the future of professional services and make a real impact
            </p>
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold">50+</div>
                <p className="text-blue-100">Team Members</p>
              </div>
              <div>
                <div className="text-3xl font-bold">15+</div>
                <p className="text-blue-100">Countries</p>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <p className="text-blue-100">Remote Friendly</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Why Work With Us</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              We're committed to creating an environment where everyone can do their best work
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
            
            {/* Department Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedDepartment === dept
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <Badge className="bg-blue-100 text-blue-700">{job.department}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <Button className="md:self-start">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No positions in this department at the moment.</p>
                  <Button variant="outline" onClick={() => setSelectedDepartment("All")}>
                    View All Positions
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <Code className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              We're building a company where talented people want to work, grow, and thrive. 
              We value transparency, collaboration, and continuous improvement.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-lg mb-2">🚀 Move Fast</h3>
                <p className="text-gray-600 text-sm">We iterate quickly and learn from our mistakes</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">🤝 Work Together</h3>
                <p className="text-gray-600 text-sm">We collaborate openly and support each other</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 Think Big</h3>
                <p className="text-gray-600 text-sm">We tackle ambitious challenges and dream big</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Don't See a Perfect Fit?</h2>
            <p className="text-xl text-blue-100 mb-8">
              We're always looking for talented people. Send us your resume and tell us about yourself.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Send General Application
            </Button>
            <p className="mt-4 text-sm text-blue-100">
              We review all applications and keep them on file for future opportunities
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

