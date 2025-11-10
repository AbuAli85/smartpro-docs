import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RelatedPage {
  title: string;
  description: string;
  href: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  title?: string;
}

export default function RelatedPages({ pages, title = "Related Pages" }: RelatedPagesProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page, index) => (
            <Link key={index} href={page.href}>
              <div className="p-6 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{page.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{page.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
