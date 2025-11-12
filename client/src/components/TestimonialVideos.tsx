import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, X, Star, Clock, Calendar, ExternalLink, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  role: "provider" | "client";
  videoUrl: string;
  thumbnail: string;
  quote: string;
  rating: number;
  duration: string;
  date: string;
  industry: string;
  results?: string[];
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Founder & CEO",
    company: "Digital Solutions Inc",
    role: "provider",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "🎥",
    quote: "TheSmartPro.io transformed how we manage contracts and payments. We've cut administrative time by 60% and increased our client base by 3x in just 6 months.",
    rating: 5,
    duration: "2:45",
    date: "November 2025",
    industry: "Technology",
    results: ["60% time saved", "3x client growth", "98% client satisfaction"],
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    title: "Operations Manager",
    company: "Enterprise Services Group",
    role: "client",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "📹",
    quote: "Finding verified professionals has never been easier. The platform is intuitive, reliable, and has helped us reduce hiring costs by 40% while improving quality.",
    rating: 5,
    duration: "3:12",
    date: "October 2025",
    industry: "Professional Services",
    results: ["40% cost reduction", "50% faster hiring", "100% verified professionals"],
  },
  {
    id: "3",
    name: "Emily Thompson",
    title: "Service Provider",
    company: "Thompson Consulting",
    role: "provider",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "🎬",
    quote: "I've grown my business 3x since joining. The tools and support are exceptional. The contract management alone has saved me 15 hours per week.",
    rating: 5,
    duration: "2:30",
    date: "September 2025",
    industry: "Consulting",
    results: ["3x business growth", "15 hrs/week saved", "95% client retention"],
  },
  {
    id: "4",
    name: "Ahmed Al-Mansouri",
    title: "Director of Operations",
    company: "Oman Business Solutions",
    role: "client",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "🎯",
    quote: "As a business in Muscat, we needed a platform that understands the local market. TheSmartPro.io delivers with verified professionals across all of Oman.",
    rating: 5,
    duration: "2:55",
    date: "November 2025",
    industry: "Business Services",
    results: ["100% Oman coverage", "24/7 support", "Local expertise"],
  },
  {
    id: "5",
    name: "Fatima Al-Zahra",
    title: "Independent Consultant",
    company: "Al-Zahra Consulting",
    role: "provider",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "💼",
    quote: "The payment processing is seamless and secure. I get paid faster, and my clients love the professional experience. Highly recommend!",
    rating: 5,
    duration: "2:15",
    date: "October 2025",
    industry: "Consulting",
    results: ["Faster payments", "100% secure", "5-star reviews"],
  },
  {
    id: "6",
    name: "James Wilson",
    title: "VP of Operations",
    company: "TechStart Middle East",
    role: "client",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "🚀",
    quote: "We've streamlined our entire service procurement process. The platform's analytics help us make data-driven decisions and optimize our vendor relationships.",
    rating: 5,
    duration: "3:30",
    date: "September 2025",
    industry: "Technology",
    results: ["Streamlined procurement", "Data-driven decisions", "Optimized vendors"],
  },
];

export default function TestimonialVideos() {
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);
  const [filter, setFilter] = useState<"all" | "provider" | "client">("all");

  const filteredTestimonials = filter === "all"
    ? testimonials
    : testimonials.filter(t => t.role === filter);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4 border border-blue-200">
            <Play className="w-4 h-4" />
            <span>Video Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hear from Our Users
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Watch real testimonials from service providers and organizations transforming their business with TheSmartPro.io
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3">
            {[
              { id: "all", label: "All Testimonials" },
              { id: "provider", label: "Service Providers" },
              { id: "client", label: "Organizations" },
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id as typeof filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === filterOption.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
                aria-label={`Filter testimonials by ${filterOption.label}`}
                aria-pressed={filter === filterOption.id}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer group h-full flex flex-col"
                onClick={() => setSelectedVideo(testimonial)}
                role="button"
                tabIndex={0}
                aria-label={`Watch testimonial from ${testimonial.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedVideo(testimonial);
                  }
                }}
              >
                {/* Enhanced Thumbnail */}
                <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-7xl opacity-50">{testimonial.thumbnail}</span>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                      <p className="text-white text-sm font-medium">{testimonial.duration}</p>
                    </div>
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-900">{testimonial.rating}</span>
                  </div>
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700">{testimonial.date}</span>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Badge */}
                  <div className="inline-block mb-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        testimonial.role === "provider"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {testimonial.role === "provider" ? "Service Provider" : "Organization"}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 mb-4">
                    <Quote className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-gray-700 font-medium line-clamp-3 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Results */}
                  {testimonial.results && (
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {testimonial.results.slice(0, 2).map((result, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Author */}
                  <div className="mt-auto">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                    <p className="text-xs text-gray-400 mt-1">{testimonial.industry}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Enhanced Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedVideo.name}</h3>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          selectedVideo.role === "provider"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {selectedVideo.role === "provider" ? "Service Provider" : "Organization"}
                      </span>
                    </div>
                    <p className="text-gray-600">{selectedVideo.title} at {selectedVideo.company}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedVideo.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedVideo.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{selectedVideo.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors ml-4"
                    aria-label="Close video modal"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                {/* Video */}
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedVideo.videoUrl}
                    title={selectedVideo.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Enhanced Quote Section */}
                <div className="p-6 bg-gray-50 border-t">
                  <Quote className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-xl text-gray-800 italic mb-4 leading-relaxed">"{selectedVideo.quote}"</p>
                  
                  {/* Results */}
                  {selectedVideo.results && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Key Results:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedVideo.results.map((result, idx) => (
                          <span key={idx} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="font-bold text-gray-900">{selectedVideo.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedVideo.title} • {selectedVideo.company}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{selectedVideo.industry}</p>
                    </div>
                    <div className="flex gap-2">
                      {[...Array(selectedVideo.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA */}
                <div className="p-6 border-t bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Button
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 text-lg h-12 font-semibold"
                    asChild
                  >
                    <Link href={selectedVideo.role === "provider" ? "/get-started-providers" : "/clients"}>
                      {selectedVideo.role === "provider"
                        ? "Start Earning as a Provider"
                        : "Find Verified Professionals"}
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-200"
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">10,000+</p>
            <p className="text-gray-600 font-medium">Active Service Providers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">50,000+</p>
            <p className="text-gray-600 font-medium">Organizations</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">4.9/5</p>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">98%</p>
            <p className="text-gray-600 font-medium">Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
