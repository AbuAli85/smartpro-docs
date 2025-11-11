'use client';

import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { fetchCaseStudies, CaseStudy } from '@/lib/analyticsApi';
import { setSEOTags, generateStructuredData, generateArticleSchema } from '@/lib/seoUtils';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set SEO tags
    setSEOTags({
      title: 'Case Studies | TheSmartPro.io - Real Results from Real Customers',
      description: 'See how enterprises and professional services firms are transforming their operations with TheSmartPro.io. Real case studies with measurable ROI and success metrics.',
      keywords: 'case studies, customer success, ROI, professional services, enterprise solutions',
      type: 'website',
      url: 'https://thesmartpro.io/case-studies',
    });

    // Load case studies
    const loadCaseStudies = async () => {
      try {
        const studies = await fetchCaseStudies();
        setCaseStudies(studies);
      } catch (error) {
        console.error('Failed to load case studies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCaseStudies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb items={[{ label: "Case Studies" }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20 -z-10" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Customer Success Stories
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              See how enterprises and professional services firms are transforming their operations with TheSmartPro.io. Real results from real customers.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white [content-visibility:auto]">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading case studies...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Link key={study.id} href={`/case-studies/${study.id}`}>
                  <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-500 overflow-hidden">
                      {study.imageUrl && (
                        <img
                          src={study.imageUrl}
                          alt={study.company}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {study.industry}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">{study.company}</p>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {study.challenge}
                      </p>

                      {/* Results Preview */}
                      <div className="space-y-2 pt-4 border-t">
                        {study.results.slice(0, 2).map((result, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{result.metric}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-blue-600">{result.value}</span>
                              <span className="text-xs text-green-600 font-semibold">{result.improvement}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button className="w-full mt-4 group/btn" asChild>
                        <a href={`/case-studies/${study.id}`}>
                          Read Full Case Study
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white [content-visibility:auto]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of enterprises and professional services firms already using TheSmartPro.io to streamline operations and scale growth.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/get-started-providers">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
