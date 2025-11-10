import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedPages from "@/components/RelatedPages";

export default function Pricing() {
  const relatedPages = [
    {
      title: "Features",
      description: "Explore all the powerful features included in our platform",
      href: "/features"
    },
    {
      title: "ROI Calculator",
      description: "Calculate your potential savings and ROI with our platform",
      href: "/roi-calculator"
    },
    {
      title: "Security",
      description: "Learn about our enterprise-grade security measures",
      href: "/security"
    }
  ];
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 99,
      annualPrice: 950,
      description: "Perfect for small teams getting started",
      users: "Up to 10 users",
      features: [
        "Project Management",
        "Basic CRM",
        "Team Collaboration",
        "Email Support",
        "5 GB Storage",
        "Basic Analytics"
      ],
      cta: "Start Free Trial",
      highlighted: false
    },
    {
      name: "Professional",
      monthlyPrice: 299,
      annualPrice: 2870,
      description: "Most popular for growing teams",
      users: "Up to 100 users",
      features: [
        "All Starter features",
        "Advanced CRM",
        "E-Learning Module",
        "Workflow Automation",
        "Priority Support",
        "50 GB Storage",
        "Advanced Analytics",
        "50+ Integrations",
        "Custom Workflows",
        "API Access"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      monthlyPrice: 999,
      annualPrice: 9590,
      description: "For large organizations with advanced needs",
      users: "Unlimited users",
      features: [
        "All Professional features",
        "Unlimited Storage",
        "24/7 Phone Support",
        "Dedicated Account Manager",
        "Custom Integrations",
        "Advanced Security",
        "SSO & SAML",
        "Compliance Certifications",
        "Custom Development",
        "SLA Guarantee"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  const comparison = [
    { category: "Users", starter: "Up to 10", professional: "Up to 100", enterprise: "Unlimited" },
    { category: "Storage", starter: "5 GB", professional: "50 GB", enterprise: "Unlimited" },
    { category: "Support", starter: "Email", professional: "Priority Email", enterprise: "24/7 Phone + Dedicated Manager" },
    { category: "Modules", starter: "3", professional: "5", enterprise: "All + Custom" },
    { category: "Integrations", starter: "10", professional: "50+", enterprise: "Custom" },
    { category: "API Access", starter: "No", professional: "Yes", enterprise: "Yes" },
    { category: "Custom Workflows", starter: "No", professional: "Yes", enterprise: "Yes" },
    { category: "SSO/SAML", starter: "No", professional: "No", enterprise: "Yes" }
  ];

  const getPrice = (monthlyPrice: number, annualPrice: number) => {
    return isAnnual ? annualPrice : monthlyPrice;
  };

  const getSavings = (monthlyPrice: number, annualPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - annualPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
      {/* Breadcrumb */}
      <div className="container pt-4">
        <Breadcrumb items={[{ label: "Pricing" }]} />
      </div>
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Choose the plan that fits your team. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-600'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold ${isAnnual ? 'text-slate-900' : 'text-slate-600'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="ml-2 inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 flex flex-col transition-all ${
                  plan.highlighted
                    ? 'ring-2 ring-blue-600 shadow-xl scale-105'
                    : 'hover:shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">
                      ${getPrice(plan.monthlyPrice, plan.annualPrice)}
                    </span>
                    <span className="text-slate-600">
                      {isAnnual ? '/year' : '/month'}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-emerald-600 font-semibold mt-2">
                      Save {getSavings(plan.monthlyPrice, plan.annualPrice)}% vs. monthly billing
                    </p>
                  )}
                </div>

                <p className="text-sm text-slate-600 mb-6">{plan.users}</p>

                <Button
                  size="lg"
                  className={`mb-8 w-full ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Detailed Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Starter</th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">Professional</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index} className="border-b border-slate-200">
                    <td className="py-4 px-4 font-semibold text-slate-900">{row.category}</td>
                    <td className="text-center py-4 px-4 text-slate-600">{row.starter}</td>
                    <td className="text-center py-4 px-4 text-slate-900 font-semibold">{row.professional}</td>
                    <td className="text-center py-4 px-4 text-slate-600">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, American Express) and bank transfers for annual plans."
              },
              {
                q: "Is there a setup fee?",
                a: "No, there are no setup fees. You can start using TheSmartPro.io immediately after signing up."
              },
              {
                q: "Do you offer discounts for annual billing?",
                a: "Yes, annual plans include a 20% discount compared to monthly billing."
              },
              {
                q: "What happens when my trial ends?",
                a: "Your account will be paused. You can upgrade to a paid plan at any time to continue using TheSmartPro.io."
              },
              {
                q: "Can I get a custom quote?",
                a: "Yes, for Enterprise plans or custom requirements, please contact our sales team at sales@thesmartpro.io"
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages pages={relatedPages} title="Explore More" />
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 181+ companies saving time and money with TheSmartPro.io
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
