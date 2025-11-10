import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    category: 'Getting Started',
    question: 'How do I get started with TheSmartPro.io?',
    answer:
      'Getting started is easy! Simply sign up for a free 14-day trial on our website. No credit card required. Our onboarding team will guide you through the setup process and answer any questions you have.',
  },
  {
    id: 2,
    category: 'Getting Started',
    question: 'Is there a free trial available?',
    answer:
      'Yes! We offer a 14-day free trial with full access to all features. You can explore the platform risk-free and see if it meets your business needs.',
  },
  {
    id: 3,
    category: 'Pricing',
    question: 'Can I change my plan anytime?',
    answer:
      'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    id: 4,
    category: 'Pricing',
    question: 'Do you offer annual billing discounts?',
    answer:
      'Yes! Switch to annual billing and save 20% on your subscription. That is 2.4 months free per year.',
  },
  {
    id: 5,
    category: 'Features',
    question: 'What features are included in each plan?',
    answer:
      'Our Starter plan includes basic CRM and project management. Professional adds e-learning and advanced analytics. Enterprise includes unlimited users and API access. Check our pricing page for a detailed comparison.',
  },
  {
    id: 6,
    category: 'Features',
    question: 'Can I integrate TheSmartPro.io with other tools?',
    answer:
      'Yes! We offer API access on our Professional and Enterprise plans. We also have pre-built integrations with popular tools like Slack, Zapier, and more.',
  },
  {
    id: 7,
    category: 'Support',
    question: 'What support options are available?',
    answer:
      'All plans include email support. Professional and Enterprise plans include 24/7 priority support and access to a dedicated account manager.',
  },
  {
    id: 8,
    category: 'Support',
    question: 'How quickly do you respond to support requests?',
    answer:
      'We typically respond to support requests within 2 hours during business hours. Enterprise customers receive priority support with guaranteed response times.',
  },
];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>❓ FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about TheSmartPro.io
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-card border border-border rounded-lg overflow-hidden transition-all hover:border-primary/50"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="text-lg font-semibold text-left">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    expandedId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedId === faq.id && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Did not find your answer?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Contact our support team
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
