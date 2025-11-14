/*
 * Centralized pricing definitions shared across marketing and documentation
 * pages. Each plan exposes both monthly and annual pricing so components can
 * toggle billing frequency without duplicating values.
 */

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  users: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface PricingComparisonRow {
  category: string;
  starter: string;
  professional: string;
  enterprise: string;
}

export const pricingPlans: PricingPlan[] = [
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
      "Basic Analytics",
    ],
    cta: "Start Free Trial",
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
      "API Access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
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
      "SLA Guarantee",
    ],
    cta: "Contact Sales",
  },
];

export const pricingComparison: PricingComparisonRow[] = [
  { category: "Users", starter: "Up to 10", professional: "Up to 100", enterprise: "Unlimited" },
  { category: "Storage", starter: "5 GB", professional: "50 GB", enterprise: "Unlimited" },
  {
    category: "Support",
    starter: "Email",
    professional: "Priority Email",
    enterprise: "24/7 Phone + Dedicated Manager",
  },
  { category: "Modules", starter: "3", professional: "5", enterprise: "All + Custom" },
  { category: "Integrations", starter: "10", professional: "50+", enterprise: "Custom" },
  { category: "API Access", starter: "No", professional: "Yes", enterprise: "Yes" },
  { category: "Custom Workflows", starter: "No", professional: "Yes", enterprise: "Yes" },
  { category: "SSO/SAML", starter: "No", professional: "No", enterprise: "Yes" },
];

