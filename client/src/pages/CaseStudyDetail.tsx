'use client';

import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { fetchCaseStudyById, CaseStudy } from '@/lib/analyticsApi';
import { setSEOTags, generateStructuredData, generateArticleSchema } from '@/lib/seoUtils';

export default function CaseStudyDetail() {
  const [match, params] = useRoute('/case-studies/:id');
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!match || !params?.id) return;

    const loadCaseStudy = async () => {
      try {
        const study = await fetchCaseStudyById(params.id);
        if (study) {
          setCaseStudy(study);

          // Set SEO tags
          setSEOTags({
            title: `${study.title} | TheSmartPro.io Case Study`,
            description: study.challenge,
            keywords: `case study, ${study.industry}, ${study.company}, ROI, success`,
            image: study.imageUrl,
            type: 'article',
            url: `https://thesmartpro.io/case-studies/${study.id}`,
            author: study.author,
            publishedDate: new Date().toISOString(),
          });

          // Generate structured data
          generateStructuredData('Article', generateArticleSchema({
            headline: study.title,
            description: study.challenge,
            image: study.imageUrl,
            datePublished: new Date().toISOString(),
            author: study.author,
          }));
        }
      } catch (error) {
        console.error('Failed to load case study:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCaseStudy();
  }, [match, params?.id]);

  if (isLoading) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb items={[{ label: "Case Studies", href: "/case-studies" }, { label: caseStudy?.title || "Case Study" }]} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Loading case study...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-4">Case study not found</p>
            <Button asChild>
              <a href="/case-studies">Back to Case Studies</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20 -z-10" />
        
        <div className="container relative z-10">
          <Button variant="ghost" className="text-white hover:bg-white/10 mb-6" asChild>
            <a href="/case-studies">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Case Studies
            </a>
          </Button>

          <div className="max-w-3xl">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {caseStudy.industry}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-slate-300">
              {caseStudy.company}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Challenge */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                Challenge
              </h3>
              <p className="text-muted-foreground">{caseStudy.challenge}</p>
            </Card>

            {/* Solution */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                Solution
              </h3>
              <p className="text-muted-foreground">{caseStudy.solution}</p>
            </Card>

            {/* Results */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                Results
              </h3>
              <p className="text-muted-foreground">
                Significant improvements across key metrics
              </p>
            </Card>
          </div>

          {/* Results Metrics */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Key Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudy.results.map((result, idx) => (
                <Card key={idx} className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {result.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {result.metric}
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {result.improvement}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="mb-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
            </div>
            <blockquote className="text-2xl font-bold mb-6 text-foreground">
              "{caseStudy.testimonial}"
            </blockquote>
            <div>
              <p className="font-bold text-lg">{caseStudy.author}</p>
              <p className="text-muted-foreground">{caseStudy.authorRole} at {caseStudy.company}</p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Achieve Similar Results?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join {caseStudy.company} and hundreds of other enterprises transforming their business with TheSmartPro.io.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/get-started-providers">
              Start Your Free Trial
              <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
