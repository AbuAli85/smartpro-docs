import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { CardImage } from "@/components/OptimizedImage";
import { BLOG_IMAGES } from "@/constants/images";
import { setSEOTags } from "@/lib/seoUtils";

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
  featured: boolean;
}

const blogArticles: BlogArticle[] = [
  {
    id: "contract-management-best-practices",
    title: "Contract Management Best Practices for Service Providers",
    excerpt: "Learn how to streamline your contract processes and reduce administrative overhead with modern contract management tools.",
    author: "Sarah Johnson",
    date: "2025-11-05",
    category: "Contract Management",
    readTime: 8,
    image: "digitalTransformation",
    featured: true,
  },
  {
    id: "payment-security-guide",
    title: "Secure Payment Processing: A Complete Guide",
    excerpt: "Understand the latest security standards and best practices for protecting your payment information in the digital marketplace.",
    author: "Michael Chen",
    date: "2025-11-03",
    category: "Payment Security",
    readTime: 10,
    image: "digitalTransformation",
    featured: true,
  },
  {
    id: "growing-service-business",
    title: "5 Strategies to Grow Your Professional Services Business",
    excerpt: "Discover proven strategies that top service providers use to scale their businesses and increase revenue.",
    author: "Emily Rodriguez",
    date: "2025-11-01",
    category: "Business Growth",
    readTime: 7,
    image: "productivityTips",
    featured: false,
  },
  {
    id: "client-communication-tips",
    title: "Effective Client Communication in Professional Services",
    excerpt: "Master the art of client communication to build stronger relationships and increase customer satisfaction.",
    author: "David Park",
    date: "2025-10-28",
    category: "Client Relations",
    readTime: 6,
    image: "teamBuilding",
    featured: false,
  },
  {
    id: "pricing-strategies",
    title: "Pricing Strategies That Maximize Your Profitability",
    excerpt: "Learn how to set competitive prices while maintaining healthy profit margins in the professional services market.",
    author: "Jessica Martinez",
    date: "2025-10-25",
    category: "Business Strategy",
    readTime: 9,
    image: "digitalTransformation",
    featured: false,
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation for Service Providers",
    excerpt: "Explore how digital tools and platforms can transform your service delivery and improve client outcomes.",
    author: "Robert Thompson",
    date: "2025-10-22",
    category: "Technology",
    readTime: 11,
    image: "digitalTransformation",
    featured: false,
  },
];

const categories = ["All", "Contract Management", "Payment Security", "Business Growth", "Client Relations", "Business Strategy", "Technology"];

export default function Blog() {
  useEffect(() => {
    setSEOTags({
      title: "Blog | TheSmartPro.io - Professional Services Insights & Tips",
      description: "Read expert insights on contract management, payment security, business growth, and client relations in the professional services industry.",
      keywords: "professional services blog, contract management, business growth, client relations, service provider tips",
      type: "website",
      url: "https://thesmartpro.io/blog",
    });
  }, []);
  
  const breadcrumbItems = [{ label: "Blog" }];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticles = filteredArticles.filter((a) => a.featured).slice(0, 2);
  const regularArticles = filteredArticles.filter((a) => !a.featured);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <Breadcrumb items={breadcrumbItems} />
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-xl text-blue-100">
            Insights, tips, and best practices for professional services providers
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2 text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <a className="group block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <CardImage
                    src={BLOG_IMAGES[article.image as keyof typeof BLOG_IMAGES].src}
                    alt={BLOG_IMAGES[article.image as keyof typeof BLOG_IMAGES].alt}
                    aspectRatio="16/9"
                    className="h-48"
                  />
                  <div className="p-6">
                    <Badge className="mb-3 bg-blue-600">{article.category}</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          {selectedCategory === "All" ? "All Articles" : selectedCategory}
        </h2>

        {regularArticles.length > 0 ? (
          <div className="space-y-6">
            {regularArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <a className="group block bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300">
                  <div className="flex gap-6">
                    {/* Article Image */}
                    <div className="hidden md:flex flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden">
                      <CardImage
                        src={BLOG_IMAGES[article.image as keyof typeof BLOG_IMAGES].src}
                        alt={BLOG_IMAGES[article.image as keyof typeof BLOG_IMAGES].alt}
                        aspectRatio="1/1"
                        className="w-32 h-32"
                      />
                    </div>

                    {/* Article Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
                          {article.title}
                        </h3>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                      </div>

                      <Badge className="mb-3 bg-gray-100 text-gray-700">{article.category}</Badge>

                      <p className="text-gray-600 mb-4">{article.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.date).toLocaleDateString()}
                          </span>
                        </div>
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No articles found matching your search.</p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4 mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6">
            Get the latest articles and resources delivered to your inbox
          </p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-gray-900 flex-1"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50 whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}
