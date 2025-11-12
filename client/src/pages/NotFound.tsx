import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Home, 
  Search, 
  ArrowRight,
  FileText,
  Users,
  Briefcase,
  HelpCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setSEOTags } from "@/lib/seoUtils";

export default function NotFound() {
  useEffect(() => {
    setSEOTags({
      title: "Page Not Found (404) | TheSmartPro.io",
      description: "The page you're looking for doesn't exist. Explore our platform or return to the homepage.",
      keywords: "404, page not found",
      type: "website",
    });
  }, []);

  const popularPages = [
    {
      icon: <Home className="h-5 w-5" />,
      title: "Home",
      description: "Return to our homepage",
      href: "/"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "For Providers",
      description: "Learn how to earn on our platform",
      href: "/get-started-providers"
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "For Clients",
      description: "Hire professional talent",
      href: "/get-started-clients"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Documentation",
      description: "View our complete guides",
      href: "/docs"
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      title: "Support",
      description: "Get help and answers",
      href: "/docs/support"
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Blog",
      description: "Read our latest articles",
      href: "/blog"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* 404 Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Large 404 */}
            <div className="mb-8">
              <h1 className="text-[150px] md:text-[200px] font-bold text-blue-600 opacity-20 leading-none">
                404
              </h1>
              <div className="-mt-16 md:-mt-24">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Page Not Found
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Oops! The page you're looking for doesn't exist. 
                  It might have been moved or deleted.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 justify-center flex-wrap mb-16">
              <Link href="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Support
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Popular Pages */}
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold mb-8 text-gray-900">
                Popular Pages
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                {popularPages.map((page, index) => (
                  <Link key={index} href={page.href}>
                    <Card className="p-6 hover:shadow-lg transition-shadow group cursor-pointer h-full">
                      <div className="flex items-start gap-3">
                        <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                          {page.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {page.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {page.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-6">
              If you believe this is an error or you need assistance, 
              our support team is here to help.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
