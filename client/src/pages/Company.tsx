import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Building2, 
  Users, 
  Briefcase, 
  Globe,
  TrendingUp,
  Award,
  Heart,
  Sparkles
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { setSEOTags } from "@/lib/seoUtils";

export default function Company() {
  useEffect(() => {
    setSEOTags({
      title: "Company | TheSmartPro.io - About Our Mission & Team",
      description: "Discover TheSmartPro.io's mission to revolutionize professional services. Learn about our values, leadership team, and career opportunities.",
      keywords: "thesmartpro company, about us, mission, values, careers, team",
      type: "website",
      url: "https://thesmartpro.io/company",
    });
  }, []);

  const breadcrumbItems = [{ label: "Company" }];

  const companyLinks = [
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: "About Us",
      description: "Learn about our mission, vision, and the team building the future of professional services.",
      link: "/about",
      cta: "Meet the Team"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-purple-600" />,
      title: "Careers",
      description: "Join our growing team and help us revolutionize how professionals work together.",
      link: "/careers",
      cta: "View Openings"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: "News & Press",
      description: "Latest announcements, press releases, and company updates.",
      link: "/blog",
      cta: "Read News"
    }
  ];

  const stats = [
    { label: "Founded", value: "2023" },
    { label: "Customers", value: "500+" },
    { label: "Team Members", value: "50+" },
    { label: "Countries", value: "15+" }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Customer Success",
      description: "Our customers' success is our success. We obsess over delivering value."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Innovation",
      description: "We constantly push boundaries to deliver cutting-edge solutions."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork, both internally and with our customers."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Excellence",
      description: "We set high standards and continuously strive to exceed them."
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
            <h1 className="text-5xl font-bold mb-6">Building the Future of Professional Services</h1>
            <p className="text-xl text-blue-100 mb-8">
              We're on a mission to empower professionals and businesses to connect, collaborate, and grow.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Links */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Explore TheSmartPro</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {companyLinks.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow group">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <Link href={item.link}>
                    <Button variant="outline" className="group-hover:bg-blue-600 group-hover:text-white">
                      {item.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Values</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              These core values guide everything we do and shape the culture we're building
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              To create the world's most trusted marketplace for professional services, 
              where businesses find the perfect talent and professionals build thriving careers.
            </p>
            <div className="border-t border-b py-6 my-8">
              <p className="text-gray-600 italic">
                "We believe in a future where professional services are accessible, transparent, 
                and empowering for everyone involved."
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Join Us on Our Journey</h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether you're looking to hire, offer services, or join our team, 
              we'd love to hear from you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/get-started-providers">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Become a Provider
                </Button>
              </Link>
              <Link href="/get-started-clients">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Hire Professionals
                </Button>
              </Link>
              <Link href="/careers">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Career Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

