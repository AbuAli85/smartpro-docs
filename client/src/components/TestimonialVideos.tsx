import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  role: "provider" | "client";
  videoUrl: string;
  thumbnail: string;
  quote: string;
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
    quote: "TheSmartPro.io transformed how we manage contracts and payments. We've cut administrative time by 60%.",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    title: "Operations Manager",
    company: "Enterprise Services Group",
    role: "client",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "📹",
    quote: "Finding verified professionals has never been easier. The platform is intuitive and reliable.",
  },
  {
    id: "3",
    name: "Emily Thompson",
    title: "Service Provider",
    company: "Thompson Consulting",
    role: "provider",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "🎬",
    quote: "I've grown my business 3x since joining. The tools and support are exceptional.",
  },
];

export default function TestimonialVideos() {
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hear from Our Users</h2>
          <p className="text-xl text-gray-600">
            Watch real testimonials from service providers and organizations transforming their business
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedVideo(testimonial)}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                <span className="text-6xl">{testimonial.thumbnail}</span>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Play className="h-12 w-12 text-white fill-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
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
                <p className="text-gray-700 font-medium mb-4 line-clamp-3">"{testimonial.quote}"</p>

                {/* Author */}
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedVideo.name}</h3>
                  <p className="text-gray-600">{selectedVideo.title} at {selectedVideo.company}</p>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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

              {/* Quote */}
              <div className="p-6 bg-gray-50 border-t">
                <p className="text-lg text-gray-800 italic mb-4">"{selectedVideo.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{selectedVideo.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedVideo.title} • {selectedVideo.company}
                    </p>
                  </div>
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
              </div>

              {/* CTA */}
              <div className="p-6 border-t bg-blue-50">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  {selectedVideo.role === "provider"
                    ? "Start Earning as a Provider"
                    : "Find Verified Professionals"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 pt-12 border-t">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">10,000+</p>
            <p className="text-gray-600">Active Service Providers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">50,000+</p>
            <p className="text-gray-600">Organizations Using TheSmartPro.io</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">4.9/5</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
