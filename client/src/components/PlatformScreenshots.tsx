import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Screenshot {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  placeholder: string;
  category: "dashboard" | "features" | "mobile" | "integrations";
}

const screenshots: Screenshot[] = [
  {
    id: "dashboard",
    title: "Enterprise Dashboard",
    description: "Comprehensive overview of your business operations, metrics, and performance indicators",
    placeholder: "📊",
    category: "dashboard"
  },
  {
    id: "service-providers",
    title: "Service Provider Network",
    description: "Browse and connect with 10,000+ verified professionals across Oman",
    placeholder: "👥",
    category: "features"
  },
  {
    id: "contract-management",
    title: "Contract Management",
    description: "Streamline contract creation, tracking, and management with automated workflows",
    placeholder: "📄",
    category: "features"
  },
  {
    id: "booking-system",
    title: "Smart Booking System",
    description: "Intelligent scheduling and appointment management for seamless service delivery",
    placeholder: "📅",
    category: "features"
  },
  {
    id: "mobile-app",
    title: "Mobile Application",
    description: "Access your platform on-the-go with our native mobile apps for iOS and Android",
    placeholder: "📱",
    category: "mobile"
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description: "Real-time insights and reporting to make data-driven business decisions",
    placeholder: "📈",
    category: "dashboard"
  }
];

export default function PlatformScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "dashboard", label: "Dashboard" },
    { id: "features", label: "Features" },
    { id: "mobile", label: "Mobile" }
  ];

  const filteredScreenshots = selectedCategory === "all" 
    ? screenshots 
    : screenshots.filter(s => s.category === selectedCategory);

  const currentScreenshot = filteredScreenshots[currentIndex];

  const nextScreenshot = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredScreenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredScreenshots.length) % filteredScreenshots.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See TheSmartPro.io in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our platform through interactive screenshots and discover how we help businesses streamline operations
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Screenshot Display */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            {/* Placeholder for screenshot - Replace with actual images */}
            <div className="text-center p-12">
              <div className="text-8xl mb-4">{currentScreenshot.placeholder}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentScreenshot.title}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {currentScreenshot.description}
              </p>
            </div>

            {/* Navigation Arrows */}
            {filteredScreenshots.length > 1 && (
              <>
                <button
                  onClick={prevScreenshot}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextScreenshot}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}

            {/* Screenshot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredScreenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Screenshot Info */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {currentScreenshot.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {currentScreenshot.description}
                </p>
              </div>
              <a
                href="https://thesmartpro.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Try It Live
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* All Screenshots Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredScreenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <span className="text-4xl">{screenshot.placeholder}</span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Want to see more? Experience the full platform with a free trial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://thesmartpro.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Visit Main Platform
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <Button variant="outline" size="lg" asChild>
              <a href="/pricing">View Pricing Plans</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

