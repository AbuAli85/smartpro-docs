import { useState } from "react";

interface CustomerLogo {
  name: string;
  logo: string;
  industry: string;
  size: "small" | "medium" | "large";
}

const customerLogos: CustomerLogo[] = [
  { name: "TechCorp", logo: "🏢", industry: "Technology", size: "large" },
  { name: "Global Services", logo: "🌐", industry: "Consulting", size: "large" },
  { name: "Enterprise Solutions", logo: "💼", industry: "Professional Services", size: "large" },
  { name: "Digital Agency", logo: "🎨", industry: "Marketing", size: "medium" },
  { name: "HealthCare Plus", logo: "🏥", industry: "Healthcare", size: "medium" },
  { name: "EduTech", logo: "📚", industry: "Education", size: "medium" },
  { name: "Legal Partners", logo: "⚖️", industry: "Legal", size: "medium" },
  { name: "Finance Group", logo: "💰", industry: "Finance", size: "small" },
  { name: "Retail Solutions", logo: "🛒", industry: "Retail", size: "small" },
  { name: "Manufacturing Co", logo: "🏭", industry: "Manufacturing", size: "small" },
  { name: "Real Estate Pro", logo: "🏘️", industry: "Real Estate", size: "small" },
  { name: "Media House", logo: "📺", industry: "Media", size: "small" },
];

export default function CustomerLogos() {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Trusted by Industry Leaders
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join 10,000+ Organizations Using TheSmartPro.io
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From startups to Fortune 500 companies, businesses across industries trust us to power their operations
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {customerLogos.map((customer, index) => (
            <div
              key={index}
              className={`flex items-center justify-center transition-all duration-300 ${
                hoveredLogo === customer.name
                  ? "scale-110 opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
              onMouseEnter={() => setHoveredLogo(customer.name)}
              onMouseLeave={() => setHoveredLogo(null)}
            >
              <div
                className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all ${
                  customer.size === "large"
                    ? "w-32 h-32"
                    : customer.size === "medium"
                    ? "w-24 h-24"
                    : "w-20 h-20"
                }`}
              >
                <div className="text-4xl mb-2">{customer.logo}</div>
                <p
                  className={`font-semibold text-gray-700 text-center ${
                    customer.size === "large"
                      ? "text-sm"
                      : customer.size === "medium"
                      ? "text-xs"
                      : "text-xs"
                  }`}
                >
                  {customer.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{customer.industry}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">10,000+</p>
              <p className="text-gray-600 font-medium">Service Providers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">50,000+</p>
              <p className="text-gray-600 font-medium">Organizations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">$50M+</p>
              <p className="text-gray-600 font-medium">Processed Annually</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">99.9%</p>
              <p className="text-gray-600 font-medium">Uptime SLA</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Want to see your company logo here?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}

