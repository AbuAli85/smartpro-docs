import DocsLayout from '@/components/DocsLayout';
import { Database, Cloud, Lock, Zap } from 'lucide-react';

export default function Architecture() {
  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Architecture', href: '/docs/architecture' },
  ];

  return (
    <DocsLayout pageTitle="Technical Architecture" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-gray-600 mb-8">
            TheSmartPro.io is built on a modern, cloud-native architecture designed to support enterprise-grade reliability, scalability, and performance. The system follows microservices principles with clear separation of concerns.
          </p>
        </section>

        {/* System Architecture */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">System Architecture</h2>
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 mb-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Presentation Layer</h3>
                  <p className="text-gray-600">React-based single-page application (SPA) running in user browsers. Communicates with backend through REST API calls.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Application Layer</h3>
                  <p className="text-gray-600">Node.js backend services implementing business logic. Services expose REST APIs and integrate with external systems.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Data Layer</h3>
                  <p className="text-gray-600">PostgreSQL database providing persistent data storage. Redis cache layer improves performance for frequently accessed data.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frontend</h3>
              <div className="space-y-4">
                {[
                  { name: 'React 19', description: 'Modern JavaScript framework for building user interfaces' },
                  { name: 'TypeScript', description: 'Adds static type checking to JavaScript' },
                  { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development' },
                  { name: 'Wouter', description: 'Lightweight client-side routing library' },
                ].map((tech, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-bold text-gray-900">{tech.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Backend & Infrastructure</h3>
              <div className="space-y-4">
                {[
                  { name: 'Node.js', description: 'JavaScript runtime for server-side development' },
                  { name: 'Express.js', description: 'Lightweight web framework for Node.js' },
                  { name: 'PostgreSQL', description: 'Open-source relational database' },
                  { name: 'AWS', description: 'Cloud infrastructure provider' },
                ].map((tech, index) => (
                  <div key={index} className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <h4 className="font-bold text-gray-900">{tech.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security Architecture */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Security Architecture</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Authentication & Authorization',
                items: [
                  'Multi-factor authentication (MFA)',
                  'Single sign-on (SSO) integration',
                  'Role-based access control (RBAC)',
                  'API key and OAuth token authentication',
                ],
              },
              {
                title: 'Data Protection',
                items: [
                  'TLS 1.3 encryption for data in transit',
                  'AES-256 encryption for data at rest',
                  'Field-level encryption for sensitive data',
                  'Secure key management',
                ],
              },
              {
                title: 'Compliance & Audit',
                items: [
                  'Comprehensive audit logging',
                  'SOC 2 Type II certification',
                  'ISO 27001 compliance',
                  'GDPR and HIPAA ready',
                ],
              },
            ].map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Scalability & Performance */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Scalability & Performance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Horizontal Scaling</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">Stateless service design enables load balancing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">Database replication for read scaling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">Redis caching for performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">CDN for static asset delivery</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Targets</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">First Contentful Paint (FCP)</p>
                  <p className="text-2xl font-bold text-purple-600">&lt; 1.5s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Largest Contentful Paint (LCP)</p>
                  <p className="text-2xl font-bold text-purple-600">&lt; 2.5s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time to Interactive (TTI)</p>
                  <p className="text-2xl font-bold text-purple-600">&lt; 3.5s</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disaster Recovery */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Disaster Recovery & Business Continuity</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-2">High Availability</h3>
              <p className="text-gray-600 mb-4">Multi-region deployment with automatic failover ensures business continuity.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Multi-region deployment across AWS regions
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Automated failover with health checks
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Database replication across regions
                </li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-2">Backup & Recovery</h3>
              <p className="text-gray-600 mb-4">Comprehensive backup strategy ensures data protection and rapid recovery.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  Hourly automated backups
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  Point-in-time recovery capability
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  1-hour RTO, 15-minute RPO
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
