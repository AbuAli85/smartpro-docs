import { Shield, Award, CheckCircle, Lock, Globe, Zap } from 'lucide-react';

interface Certification {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Award {
  title: string;
  organization: string;
  year: number;
}

const certifications: Certification[] = [
  {
    name: 'SOC 2 Type II',
    description: 'Security, Availability & Integrity Certified',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'ISO 27001',
    description: 'Information Security Management',
    icon: <Lock className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'GDPR Compliant',
    description: 'EU Data Protection Regulation',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'HIPAA Ready',
    description: 'Healthcare Data Protection',
    icon: <CheckCircle className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'PCI DSS',
    description: 'Payment Card Industry Standard',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
  },
  {
    name: 'CCPA Compliant',
    description: 'California Privacy Law',
    icon: <Award className="w-8 h-8" />,
    color: 'from-indigo-500 to-indigo-600',
  },
];

const awards: Award[] = [
  {
    title: 'Best Enterprise Solution',
    organization: 'TechAwards 2024',
    year: 2024,
  },
  {
    title: 'Innovation Leader',
    organization: 'Business Excellence Awards',
    year: 2024,
  },
  {
    title: 'Customer Choice Award',
    organization: 'G2 Reviews',
    year: 2023,
  },
  {
    title: 'Fastest Growing Platform',
    organization: 'SaaS Growth Report',
    year: 2023,
  },
];

const stats = [
  { label: '99.9%', description: 'Uptime SLA' },
  { label: '24/7', description: 'Expert Support' },
  { label: '181+', description: 'Enterprise Clients' },
  { label: '50M+', description: 'Transactions/Month' },
];

export default function TrustAndCredibility() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            <span>Trust & Security</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enterprise-Grade Trust & Security
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by enterprises worldwide. We maintain the highest standards of security, compliance, and reliability.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Industry Certifications & Compliance
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white mb-6`}
                >
                  {cert.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Industry Recognition & Awards
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {awards.map((award) => (
              <div
                key={award.title}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{award.title}</h4>
                  <p className="text-gray-600">{award.organization} • {award.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-12">Security & Compliance Features</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-blue-300 mb-4">Data Protection</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>End-to-end encryption for all data</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>AES-256 encryption at rest</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>TLS 1.3 for data in transit</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Regular penetration testing</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-blue-300 mb-4">Access & Audit</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Role-based access control (RBAC)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Two-factor authentication (2FA)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Complete audit logging</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Compliance reporting tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
