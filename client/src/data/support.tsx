import type { ReactNode } from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  Book,
  Video,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

export interface SupportChannel {
  icon: ReactNode;
  title: string;
  description: string;
  availability: string;
  responseTime: string;
  plans: string;
  action: string;
  color: string;
}

export interface SupportResource {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
}

export interface SupportTier {
  plan: string;
  features: string[];
}

export interface SupportPractice {
  title: string;
  description: string;
}

export const supportChannels: SupportChannel[] = [
  {
    icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
    title: "Live Chat",
    description: "Get instant help from our support team via live chat.",
    availability: "Available 24/7",
    responseTime: "Instant",
    plans: "All Plans",
    action: "Start Chat",
    color: "bg-blue-50 border-blue-200",
  },
  {
    icon: <Mail className="w-8 h-8 text-green-600" />,
    title: "Email Support",
    description: "Send us an email and we'll respond within 24 hours.",
    availability: "support@thesmartpro.io",
    responseTime: "< 24 hours",
    plans: "All Plans",
    action: "Send Email",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: <Phone className="w-8 h-8 text-purple-600" />,
    title: "Phone Support",
    description: "Speak directly with our support team for urgent issues.",
    availability: "Mon-Fri, 9am-6pm EST",
    responseTime: "Immediate",
    plans: "Professional & Enterprise",
    action: "Call Now",
    color: "bg-purple-50 border-purple-200",
  },
];

export const selfServiceResources: SupportResource[] = [
  {
    icon: <Book className="w-8 h-8 text-blue-600" />,
    title: "Documentation",
    description: "Comprehensive guides and reference materials.",
    link: "/docs",
  },
  {
    icon: <Video className="w-8 h-8 text-red-600" />,
    title: "API Documentation",
    description: "REST API reference and integration guides.",
    link: "/docs/api",
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "Business Plan",
    description: "Strategic planning and business insights.",
    link: "/docs/business-plan-full",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
    title: "FAQ",
    description: "Answers to frequently asked questions.",
    link: "/docs/faq",
  },
];

export const supportTiers: SupportTier[] = [
  {
    plan: "Starter",
    features: [
      "Email support",
      "Live chat support",
      "Knowledge base access",
      "Community forum access",
      "< 24 hour response time",
    ],
  },
  {
    plan: "Professional",
    features: [
      "All Starter features",
      "Phone support",
      "Priority email support",
      "Video tutorials",
      "< 12 hour response time",
      "Dedicated account manager",
    ],
  },
  {
    plan: "Enterprise",
    features: [
      "All Professional features",
      "24/7 priority support",
      "Custom onboarding",
      "Dedicated success manager",
      "< 4 hour response time",
      "Custom training sessions",
      "Direct engineering escalation",
    ],
  },
];

export const supportBestPractices: SupportPractice[] = [
  {
    title: "Be Specific",
    description:
      "Provide detailed information about your issue, including steps to reproduce, error messages, and screenshots.",
  },
  {
    title: "Check Documentation First",
    description:
      "Many common questions are answered in our documentation and FAQ. This can save you time.",
  },
  {
    title: "Include Your Account Details",
    description:
      "Provide your account email or organization name to help us locate your account quickly.",
  },
  {
    title: "Use the Right Channel",
    description:
      "For urgent issues, use live chat or phone. For non-urgent questions, email works great.",
  },
  {
    title: "Follow Up",
    description:
      "If you don't hear back within the expected timeframe, don't hesitate to follow up.",
  },
];

