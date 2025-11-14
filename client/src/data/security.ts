import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Lock,
  Eye,
  AlertCircle,
  CheckCircle2,
  Server,
} from "lucide-react";

export interface Certification {
  icon: string;
  name: string;
  description: string;
}

export interface SecurityFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SecurityPractice {
  title: string;
  items: string[];
}

export const certifications: Certification[] = [
  {
    name: "SOC 2 Type II",
    description: "Certified for security, availability, and confidentiality",
    icon: "🔐",
  },
  {
    name: "ISO 27001",
    description: "Information security management system certified",
    icon: "📋",
  },
  {
    name: "GDPR Compliant",
    description: "Full compliance with EU data protection regulations",
    icon: "🌍",
  },
  {
    name: "CCPA Compliant",
    description: "Compliant with California Consumer Privacy Act",
    icon: "📜",
  },
  {
    name: "HIPAA Ready",
    description: "Healthcare data protection standards",
    icon: "🏥",
  },
  {
    name: "PCI DSS Level 1",
    description: "Payment Card Industry Data Security Standard",
    icon: "💳",
  },
];

export const securityFeatures: SecurityFeature[] = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All data is encrypted in transit and at rest using AES-256 encryption.",
  },
  {
    icon: Shield,
    title: "Advanced Access Controls",
    description:
      "Role-based access control (RBAC) and multi-factor authentication (MFA).",
  },
  {
    icon: Server,
    title: "99.9% Uptime SLA",
    description:
      "Enterprise-grade infrastructure with automatic failover and redundancy.",
  },
  {
    icon: Eye,
    title: "Continuous Monitoring",
    description: "24/7 security monitoring and threat detection.",
  },
  {
    icon: AlertCircle,
    title: "Incident Response",
    description: "Rapid response team for security incidents.",
  },
  {
    icon: CheckCircle2,
    title: "Regular Audits",
    description: "Third-party security audits and penetration testing.",
  },
];

export const securityPractices: SecurityPractice[] = [
  {
    title: "Data Protection",
    items: [
      "AES-256 encryption for data at rest",
      "TLS 1.2+ encryption for data in transit",
      "Encrypted backups stored in multiple geographic locations",
      "Automatic data deletion after account termination",
    ],
  },
  {
    title: "Access Control",
    items: [
      "Role-based access control (RBAC)",
      "Multi-factor authentication (MFA)",
      "Single sign-on (SSO) support",
      "IP whitelisting for enterprise customers",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Hosted on AWS with enterprise-grade security",
      "Automatic failover and disaster recovery",
      "DDoS protection and rate limiting",
      "Regular security patches and updates",
    ],
  },
  {
    title: "Compliance",
    items: [
      "GDPR, CCPA, and HIPAA compliant",
      "SOC 2 Type II certified",
      "ISO 27001 certified",
      "Regular compliance audits",
    ],
  },
];

