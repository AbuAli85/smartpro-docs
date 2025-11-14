import DocsLayout from "@/components/DocsLayout";
import { useEffect } from "react";
import { setSEOTags } from "@/lib/seoUtils";
import { CheckCircle2 } from "lucide-react";
import {
  certifications,
  securityFeatures,
  securityPractices,
} from "@/data/security";

export default function SecurityDocs() {
  useEffect(() => {
    setSEOTags({
      title: "Security & Compliance Overview | TheSmartPro.io Documentation",
      description:
        "Learn how TheSmartPro.io protects your data through enterprise-grade security, encryption, and compliance certifications.",
      keywords:
        "security, compliance, encryption, certifications, GDPR, SOC2, ISO 27001",
      type: "article",
      url: "https://thesmartpro.io/docs/security",
    });
  }, []);

  const breadcrumbs = [
    { label: "Documentation", href: "/docs" },
    { label: "Security & Compliance", href: "/docs/security" },
  ];

  return (
    <DocsLayout
      pageTitle="Security & Compliance"
      breadcrumbs={breadcrumbs}
      githubPath="client/src/pages/docs/Security.tsx"
    >
      <div className="space-y-12">
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Security & Compliance
          </h1>
          <p className="text-lg text-gray-600">
            Protecting your data is our top priority. SmartPro follows
            industry-leading security practices and maintains numerous
            compliance certifications to ensure your information is safe and
            secure.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Certifications & Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((certification) => (
              <div
                key={certification.name}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center"
              >
                <div className="text-5xl mb-4">{certification.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {certification.name}
                </h3>
                <p className="text-gray-600">{certification.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Security Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Security Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityPractices.map((practice) => (
              <div
                key={practice.title}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {practice.title}
                </h3>
                <ul className="space-y-3">
                  {practice.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Have Security Concerns?
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            If you have any security concerns or need to report a
            vulnerability, please reach out to our security team.
          </p>
          <a
            href="mailto:security@thesmartpro.io"
            className="text-blue-600 font-semibold hover:underline"
          >
            security@thesmartpro.io
          </a>
        </section>
      </div>
    </DocsLayout>
  );
}

