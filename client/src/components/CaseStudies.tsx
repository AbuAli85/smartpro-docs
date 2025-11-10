import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  industry: string;
  image: string;
  challenge: string;
  solution: string;
  results: Array<{
    metric: string;
    value: string;
  }>;
  testimonial: string;
  author: string;
  role: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'Reducing Operational Costs by 40%',
    company: 'TechStart Inc.',
    industry: 'Technology',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    challenge:
      'Managing 50+ employees across multiple departments with fragmented tools and processes.',
    solution:
      'Implemented TheSmartPro.io to consolidate all operations into one unified platform.',
    results: [
      { metric: 'Cost Reduction', value: '40%' },
      { metric: 'Time Saved', value: '20h/week' },
      { metric: 'Productivity Increase', value: '+35%' },
    ],
    testimonial:
      'TheSmartPro.io helped us streamline our operations and save significant costs. The ROI was immediate.',
    author: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
  },
  {
    id: 2,
    title: 'Scaling Team Management Effortlessly',
    company: 'Global Solutions Ltd.',
    industry: 'Consulting',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    challenge:
      'Rapid growth from 20 to 150 employees without proper management infrastructure.',
    solution:
      'Deployed TheSmartPro.io to manage team growth and maintain operational efficiency.',
    results: [
      { metric: 'Onboarding Time', value: '-60%' },
      { metric: 'Employee Satisfaction', value: '+45%' },
      { metric: 'Project Completion', value: '+28%' },
    ],
    testimonial:
      'The platform scaled perfectly with our growth. We went from chaos to organization in weeks.',
    author: 'Michael Chen',
    role: 'Operations Manager, Global Solutions',
  },
  {
    id: 3,
    title: 'Automating Workflow Processes',
    company: 'Enterprise Corp',
    industry: 'Enterprise',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    challenge:
      'Manual workflows causing delays and errors in contract management and approvals.',
    solution:
      'Implemented workflow automation and contract management through TheSmartPro.io.',
    results: [
      { metric: 'Process Automation', value: '95%' },
      { metric: 'Error Reduction', value: '-90%' },
      { metric: 'Approval Time', value: '-75%' },
    ],
    testimonial:
      'Automation has been transformative. We have eliminated manual errors and accelerated our processes.',
    author: 'Emily Rodriguez',
    role: 'HR Director, Enterprise Corp',
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>📊 Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Results from Real Companies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how leading companies use TheSmartPro.io to drive growth and efficiency
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={study.image}
                  alt={study.company}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {study.industry}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {study.company}
                </p>

                {/* Challenge & Solution */}
                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      Challenge
                    </div>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      Solution
                    </div>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-muted/50 rounded-lg">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-bold text-primary">
                        {result.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.metric}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="border-t border-border pt-4 mb-4">
                  <p className="text-sm italic text-muted-foreground mb-2">
                    "{study.testimonial}"
                  </p>
                  <div>
                    <div className="text-sm font-semibold">{study.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {study.role}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full group/btn"
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Ready to write your success story?
          </p>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12 px-8">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
