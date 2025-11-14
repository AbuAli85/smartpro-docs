import { Zap, TrendingUp, CheckCircle, Shield } from "lucide-react";

/*
 * Centralized definitions for the Product Overview page. Moving these objects
 * out of the TSX component makes it easy to update core information about the
 * platform without editing React components.
 */

export interface CoreFeature {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
}

export interface ServicePlan {
  name: string;
  price: string;
  users: string;
  features: string[];
  highlighted?: boolean;
}

/**
 * List of core features and their associated capabilities. Icons are provided
 * via lucide-react components so that consumers can render consistent visuals.
 */
export const coreFeatures: CoreFeature[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Employee Management",
    description:
      "Comprehensive workforce management from recruitment through separation. Includes payroll integration, leave management, performance tracking, and organizational hierarchy management.",
    features: [
      "Recruitment & Onboarding",
      "Payroll Integration",
      "Leave Management",
      "Performance Reviews",
    ],
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "CRM & Client Management",
    description:
      "Complete customer relationship management with contact management, sales pipeline tracking, email integration, and activity management.",
    features: [
      "Contact Management",
      "Sales Pipeline",
      "Email Integration",
      "Deal Forecasting",
    ],
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Project Management",
    description:
      "Comprehensive project planning and execution with support for Waterfall, Agile, and hybrid methodologies. Includes task management, resource allocation, and collaboration tools.",
    features: [
      "Task Management",
      "Gantt Charts",
      "Kanban Boards",
      "Time Tracking",
    ],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Contract Management",
    description:
      "Complete contract lifecycle management with centralized repository, automated renewal management, obligation tracking, and e-signature integration.",
    features: [
      "Contract Repository",
      "Renewal Alerts",
      "E-Signatures",
      "Compliance Tracking",
    ],
  },
];

/**
 * Service offerings for SmartPro. Plans include pricing, user limits, included
 * features, and an optional highlighted flag used by the UI to emphasize
 * recommended plans.
 */
export const serviceOfferings: ServicePlan[] = [
  {
    name: "Starter Plan",
    price: "$99",
    users: "Up to 10 users",
    features: ["Core modules", "Basic analytics", "Community support"],
  },
  {
    name: "Professional Plan",
    price: "$299",
    users: "Up to 100 users",
    features: [
      "All core modules",
      "Standard analytics",
      "Email support",
      "Pre-built integrations",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise Plan",
    price: "$999",
    users: "Unlimited users",
    features: [
      "All features",
      "Advanced analytics",
      "24/7 support",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];

