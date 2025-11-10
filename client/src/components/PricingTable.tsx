import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  period: string;
  features: Array<{
    name: string;
    included: boolean;
  }>;
  cta: string;
  highlighted?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Perfect for small teams',
    price: 99,
    period: '/month',
    features: [
      { name: 'Up to 10 users', included: true },
      { name: 'Basic CRM', included: true },
      { name: 'Project management', included: true },
      { name: 'E-learning platform', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'API access', included: false },
      { name: '24/7 support', included: false },
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    description: 'For growing businesses',
    price: 299,
    period: '/month',
    features: [
      { name: 'Up to 50 users', included: true },
      { name: 'Advanced CRM', included: true },
      { name: 'Project management', included: true },
      { name: 'E-learning platform', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'API access', included: false },
      { name: '24/7 support', included: true },
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 999,
    period: '/month',
    features: [
      { name: 'Unlimited users', included: true },
      { name: 'Advanced CRM', included: true },
      { name: 'Project management', included: true },
      { name: 'E-learning platform', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'API access', included: true },
      { name: '24/7 support', included: true },
    ],
    cta: 'Contact Sales',
  },
];

export default function PricingTable() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>💰 Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 bg-card border border-border rounded-lg p-1">
            <button className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium transition-all">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors">
              Annual
              <span className="ml-2 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? 'border-primary bg-gradient-to-br from-primary/5 to-secondary/5 shadow-2xl scale-105'
                  : 'border-border bg-card hover:border-primary/50 hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Billed monthly. Cancel anytime.
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 h-12 text-base font-semibold ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                      : 'border border-border hover:bg-muted'
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>

                {/* Features List */}
                <div className="space-y-4 border-t border-border pt-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {[
              {
                question: 'Can I change my plan later?',
                answer:
                  'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
              },
              {
                question: 'Do you offer discounts for annual billing?',
                answer:
                  'Yes! Switch to annual billing and save 20% on your subscription. That\'s 2.4 months free per year.',
              },
              {
                question: 'What payment methods do you accept?',
                answer:
                  'We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and PayPal.',
              },
              {
                question: 'Is there a setup fee?',
                answer:
                  'No setup fees! Start your free 14-day trial immediately. No credit card required.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
