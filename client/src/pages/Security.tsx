import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, AlertCircle, CheckCircle2, Server } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Security() {
  const breadcrumbItems = [{ label: "Security" }];
  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Certified for security, availability, and confidentiality",
      icon: "🔐"
    },
    {
      name: "ISO 27001",
      description: "Information security management system certified",
      icon: "📋"
    },
    {
      name: "GDPR Compliant",
      description: "Full compliance with EU data protection regulations",
      icon: "🌍"
    },
    {
      name: "CCPA Compliant",
      description: "Compliant with California Consumer Privacy Act",
      icon: "📜"
    },
    {
      name: "HIPAA Ready",
      description: "Healthcare data protection standards",
      icon: "🏥"
    },
    {
      name: "PCI DSS Level 1",
      description: "Payment Card Industry Data Security Standard",
      icon: "💳"
    }
  ];

  const features = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using AES-256 encryption"
    },
    {
      icon: Shield,
      title: "Advanced Access Controls",
      description: "Role-based access control (RBAC) and multi-factor authentication (MFA)"
    },
    {
      icon: Server,
      title: "99.9% Uptime SLA",
      description: "Enterprise-grade infrastructure with automatic failover and redundancy"
    },
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "24/7 security monitoring and threat detection"
    },
    {
      icon: AlertCircle,
      title: "Incident Response",
      description: "Rapid response team for security incidents"
    },
    {
      icon: CheckCircle2,
      title: "Regular Audits",
      description: "Third-party security audits and penetration testing"
    }
  ];

  const practices = [
    {
      title: "Data Protection",
      items: [
        "AES-256 encryption for data at rest",
        "TLS 1.2+ encryption for data in transit",
        "Encrypted backups stored in multiple geographic locations",
        "Automatic data deletion after account termination"
      ]
    },
    {
      title: "Access Control",
      items: [
        "Role-based access control (RBAC)",
        "Multi-factor authentication (MFA)",
        "Single sign-on (SSO) support",
        "IP whitelisting for enterprise customers"
      ]
    },
    {
      title: "Infrastructure",
      items: [
        "Hosted on AWS with enterprise-grade security",
        "Automatic failover and disaster recovery",
        "DDoS protection and rate limiting",
        "Regular security patches and updates"
      ]
    },
    {
      title: "Compliance",
      items: [
        "GDPR, CCPA, and HIPAA compliant",
        "SOC 2 Type II certified",
        "ISO 27001 certified",
        "Regular compliance audits"
      ]
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Breadcrumb items={breadcrumbItems} />
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Security & Compliance
          </h1>
          <p className="text-xl text-slate-600">
            Your data security is our top priority. We maintain enterprise-grade security standards and compliance certifications.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Certifications & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{cert.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{cert.name}</h3>
                <p className="text-slate-600">{cert.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practices.map((practice, index) => (
              <Card key={index} className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">{practice.title}</h3>
                <ul className="space-y-3">
                  {practice.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Centers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Global Data Centers</h2>
          <p className="text-lg text-slate-600 mb-8 text-center">
            Your data is stored in multiple geographic locations for redundancy and compliance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { region: "US East", location: "N. Virginia", uptime: "99.99%" },
              { region: "US West", location: "N. California", uptime: "99.99%" },
              { region: "Europe", location: "Ireland", uptime: "99.99%" }
            ].map((dc, index) => (
              <Card key={index} className="p-8 text-center">
                <Server className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{dc.region}</h3>
                <p className="text-slate-600 mb-3">{dc.location}</p>
                <p className="text-sm font-semibold text-emerald-600">Uptime: {dc.uptime}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Incident Response</h2>
          <p className="text-lg text-slate-600 mb-8 text-center">
            We have a dedicated security team ready to respond to any incidents 24/7.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Detection", desc: "Automated detection and alerting" },
              { step: "2", title: "Response", desc: "Immediate incident response team activation" },
              { step: "3", title: "Investigation", desc: "Thorough investigation and containment" },
              { step: "4", title: "Resolution", desc: "Fix and notification to affected customers" }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Report */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Security & Compliance Report</h2>
          <p className="text-lg text-slate-600 mb-8">
            Download our comprehensive security and compliance report to learn more about our security practices.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Download Report
          </Button>
        </div>
      </section>

      {/* Contact Security Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Security Concerns?</h2>
          <p className="text-lg text-slate-600 mb-8">
            If you have any security concerns or want to report a vulnerability, please contact our security team.
          </p>
          <a href="mailto:security@thesmartpro.io" className="text-blue-600 font-semibold hover:text-blue-700">
            security@thesmartpro.io
          </a>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}
