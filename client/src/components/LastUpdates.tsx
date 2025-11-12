import { useState } from "react";
import { Calendar, Sparkles, Zap, Shield, Users, Code, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface Update {
  id: string;
  date: string;
  category: "feature" | "improvement" | "security" | "integration" | "announcement";
  title: string;
  description: string;
  highlights: string[];
  link?: string;
  badge?: string;
}

const updates: Update[] = [
  {
    id: "1",
    date: "November 12, 2025",
    category: "feature",
    title: "Enhanced Network Visualization & Video Testimonials",
    description: "Major updates to platform showcase including interactive Oman map, enhanced video testimonials, and comprehensive network statistics.",
    highlights: [
      "Interactive Oman map with 7 regions and real-time statistics",
      "Enhanced video testimonials with filtering and detailed results",
      "Network growth metrics and regional coverage visualization",
      "Customer logos showcase and integration hub improvements"
    ],
    link: "/features",
    badge: "New"
  },
  {
    id: "2",
    date: "November 10, 2025",
    category: "improvement",
    title: "FAQ Section Expansion & Search Enhancement",
    description: "Expanded FAQ content with 10+ new questions and improved search functionality for better user self-service.",
    highlights: [
      "Added 10+ new FAQ questions across all categories",
      "Enhanced search with category filtering",
      "Improved contact information and support details",
      "Better mobile responsiveness"
    ],
    link: "/docs/faq"
  },
  {
    id: "3",
    date: "November 8, 2025",
    category: "integration",
    title: "New Integrations: Zapier, Make, and Microsoft Teams",
    description: "Added three powerful integrations to streamline workflows and improve team collaboration.",
    highlights: [
      "Zapier integration for workflow automation",
      "Make (formerly Integromat) support",
      "Microsoft Teams integration for enterprise collaboration",
      "Enhanced API documentation"
    ],
    link: "/features#integrations"
  },
  {
    id: "4",
    date: "November 5, 2025",
    category: "security",
    title: "Enhanced Security Features & Compliance Updates",
    description: "Strengthened platform security with new features and compliance certifications.",
    highlights: [
      "SOC 2 Type II certification achieved",
      "Enhanced data encryption protocols",
      "GDPR compliance improvements",
      "New security audit logging features"
    ],
    link: "/security"
  },
  {
    id: "5",
    date: "November 1, 2025",
    category: "announcement",
    title: "10,000+ Service Providers Milestone Reached",
    description: "TheSmartPro.io celebrates reaching 10,000 verified service providers across Oman.",
    highlights: [
      "10,000+ verified service providers",
      "50,000+ active organizations",
      "Coverage across all 7 major regions",
      "25% growth in last 6 months"
    ],
    badge: "Milestone"
  },
  {
    id: "6",
    date: "October 28, 2025",
    category: "feature",
    title: "Advanced Analytics Dashboard Released",
    description: "New analytics dashboard with real-time metrics, custom reports, and data visualization.",
    highlights: [
      "Real-time business metrics",
      "Custom report builder",
      "Data export capabilities",
      "Interactive charts and graphs"
    ],
    link: "/features"
  },
  {
    id: "7",
    date: "October 25, 2025",
    category: "improvement",
    title: "Mobile App Updates: iOS & Android",
    description: "Major mobile app updates with new features and improved performance.",
    highlights: [
      "Offline mode support",
      "Push notifications",
      "Improved UI/UX",
      "Faster load times"
    ]
  },
  {
    id: "8",
    date: "October 20, 2025",
    category: "integration",
    title: "Payment Gateway Enhancements",
    description: "Added support for multiple payment methods and improved transaction processing.",
    highlights: [
      "Stripe integration enhanced",
      "PayPal support added",
      "Local payment methods (Oman)",
      "Faster payment processing"
    ],
    link: "/features#integrations"
  },
];

const categoryConfig = {
  feature: { icon: Sparkles, color: "blue", bg: "bg-blue-100", text: "text-blue-700" },
  improvement: { icon: Zap, color: "green", bg: "bg-green-100", text: "text-green-700" },
  security: { icon: Shield, color: "red", bg: "bg-red-100", text: "text-red-700" },
  integration: { icon: Code, color: "purple", bg: "bg-purple-100", text: "text-purple-700" },
  announcement: { icon: Users, color: "orange", bg: "bg-orange-100", text: "text-orange-700" },
};

export default function LastUpdates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["all", ...Object.keys(categoryConfig)];

  const filteredUpdates = selectedCategory === "all"
    ? updates
    : updates.filter(update => update.category === selectedCategory);

  const visibleUpdates = filteredUpdates.slice(0, visibleCount);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium mb-4 border border-blue-400/30">
            <Calendar className="w-4 h-4" />
            <span>Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What's New at TheSmartPro.io
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Stay up to date with the latest features, improvements, and announcements from our platform
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const config = category === "all" 
              ? { icon: Calendar, bg: "bg-white/10", text: "text-white" }
              : categoryConfig[category as keyof typeof categoryConfig];
            const Icon = config.icon;

            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(6);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? `${config.bg} ${config.text} shadow-lg scale-105`
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{category === "all" ? "All Updates" : category}</span>
              </button>
            );
          })}
        </div>

        {/* Updates Grid */}
        <div className="space-y-6 mb-8">
          <AnimatePresence mode="wait">
            {visibleUpdates.map((update, index) => {
              const config = categoryConfig[update.category];
              const Icon = config.icon;

              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${config.text}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{update.title}</h3>
                            {update.badge && (
                              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                                {update.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{update.date}</span>
                            </div>
                            <span className="capitalize">{update.category}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-300 mb-4 leading-relaxed">{update.description}</p>

                      {/* Highlights */}
                      <div className="space-y-2 mb-4">
                        {update.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Link */}
                      {update.link && (
                        <Link href={update.link}>
                          <div className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                            Learn more
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {visibleCount < filteredUpdates.length && (
          <div className="text-center">
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 3, filteredUpdates.length))}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Load More Updates
            </button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates, feature announcements, and platform news directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

