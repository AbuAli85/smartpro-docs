import { Users, BarChart3, Briefcase, BookOpen, FileText, Zap } from "lucide-react";

/*
 * Centralized definition of SmartPro feature metadata. Moving the descriptive
 * content into this module allows other components to consume a single source
 * of truth and reduces duplication across pages. Each feature includes an icon
 * component, a title, a short description, and a list of key capabilities.
 * Advanced features are separated into their own array for clarity.
 */

export const featureList = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Employee Management",
    description: "Complete workforce management system",
    capabilities: [
      "Employee lifecycle management",
      "Payroll integration",
      "Leave management",
      "Performance tracking",
      "Organizational hierarchy",
      "Compensation management",
    ],
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "CRM & Client Management",
    description: "Comprehensive customer relationship management",
    capabilities: [
      "Contact management",
      "Sales pipeline tracking",
      "Email integration",
      "Activity tracking",
      "Deal forecasting",
      "Customer analytics",
    ],
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Project Management",
    description: "Advanced project planning and execution",
    capabilities: [
      "Multiple methodologies (Waterfall, Agile)",
      "Task management",
      "Resource allocation",
      "Time tracking",
      "Gantt charts & Kanban boards",
      "Collaboration tools",
    ],
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "E-Learning Platform",
    description: "Comprehensive training and development",
    capabilities: [
      "Course authoring",
      "Progress tracking",
      "Assessments & quizzes",
      "Certification management",
      "Competency mapping",
      "Learning analytics",
    ],
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Contract Management",
    description: "Complete contract lifecycle management",
    capabilities: [
      "Centralized repository",
      "Automated renewal management",
      "Obligation tracking",
      "E-signature integration",
      "Version control",
      "Compliance tracking",
    ],
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Workflow Automation",
    description: "No-code automation for business processes",
    capabilities: [
      "Visual workflow builder",
      "Conditional logic",
      "Integration capabilities",
      "Approval workflows",
      "Notifications & alerts",
      "Process templates",
    ],
  },
];

/**
 * Advanced features reflect cross-cutting capabilities that apply broadly
 * across the SmartPro platform rather than to a single module. Titles and
 * descriptions are stored as plain strings to avoid repetition in the UI.
 */
export const advancedFeatures = [
  {
    title: "Real-Time Notifications",
    description:
      "Stay informed with real-time notifications across all business functions. WebSocket-based delivery ensures instant updates.",
  },
  {
    title: "Advanced Analytics",
    description:
      "Comprehensive dashboards and reports provide insights into business performance. Custom reports enable data-driven decision making.",
  },
  {
    title: "Multi-Tenant Architecture",
    description:
      "Enterprise-grade multi-tenant architecture enables secure data isolation while maintaining operational efficiency.",
  },
  {
    title: "API & Integrations",
    description:
      "Comprehensive REST API enables custom integrations. Pre-built integrations with 50+ popular business applications.",
  },
  {
    title: "Security & Compliance",
    description:
      "Enterprise-grade security with SOC 2, ISO 27001, GDPR, HIPAA, and PCI DSS compliance certifications.",
  },
  {
    title: "Mobile Applications",
    description:
      "Native mobile applications for iOS and Android enable access from anywhere, supporting modern distributed work.",
  },
];

