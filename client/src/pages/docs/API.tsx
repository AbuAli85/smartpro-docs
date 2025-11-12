import DocsLayout from '@/components/DocsLayout';
import { Code, Lock, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { setSEOTags } from '@/lib/seoUtils';
import CopyCodeButton from '@/components/CopyCodeButton';

export default function API() {
  useEffect(() => {
    setSEOTags({
      title: "API Documentation | TheSmartPro.io - REST API Reference",
      description: "Complete REST API documentation for TheSmartPro.io. Authentication, endpoints, request/response examples, rate limits, and best practices.",
      keywords: "API documentation, REST API, API reference, endpoints, authentication, webhooks, integration",
      type: "article",
      url: "https://thesmartpro.io/docs/api",
    });
  }, []);

  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Documentation', href: '/docs/api' },
  ];

  return (
    <DocsLayout pageTitle="API Documentation" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-gray-600 mb-8">
            The SmartPro.io REST API enables you to programmatically interact with all platform features. Build custom integrations, automate workflows, and extend functionality to meet your specific needs.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <Code className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">RESTful API</h3>
              <p className="text-sm text-gray-600">Standard HTTP methods and JSON responses</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <Lock className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Secure</h3>
              <p className="text-sm text-gray-600">OAuth 2.0 and API key authentication</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <Zap className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-sm text-gray-600">99.9% uptime with low latency</p>
            </div>
          </div>
        </section>

        {/* Base URL */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Base URL</h2>
          <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm relative">
            <CopyCodeButton text="https://api.thesmartpro.io/v1" />
            <code>https://api.thesmartpro.io/v1</code>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            All API requests should be made to this base URL with the appropriate endpoint path.
          </p>
        </section>

        {/* Authentication */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Authentication</h2>
          <p className="text-gray-600 mb-6">
            The SmartPro.io API uses API keys for authentication. Include your API key in the Authorization header of every request.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Your API Key</h3>
              <ol className="space-y-2 list-decimal list-inside text-gray-700">
                <li>Log in to your TheSmartPro.io account</li>
                <li>Navigate to Settings → API Keys</li>
                <li>Click "Generate New API Key"</li>
                <li>Copy and securely store your API key</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Using Your API Key</h3>
              <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm relative">
                <CopyCodeButton text={`curl https://api.thesmartpro.io/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`} />
                <pre className="overflow-x-auto">
{`curl https://api.thesmartpro.io/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Common Endpoints */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Endpoints</h2>
          <div className="space-y-6">
            {[
              {
                method: 'GET',
                endpoint: '/projects',
                description: 'List all projects',
                color: 'bg-green-100 text-green-800',
              },
              {
                method: 'POST',
                endpoint: '/projects',
                description: 'Create a new project',
                color: 'bg-blue-100 text-blue-800',
              },
              {
                method: 'GET',
                endpoint: '/projects/:id',
                description: 'Get a specific project',
                color: 'bg-green-100 text-green-800',
              },
              {
                method: 'PUT',
                endpoint: '/projects/:id',
                description: 'Update a project',
                color: 'bg-yellow-100 text-yellow-800',
              },
              {
                method: 'DELETE',
                endpoint: '/projects/:id',
                description: 'Delete a project',
                color: 'bg-red-100 text-red-800',
              },
              {
                method: 'GET',
                endpoint: '/clients',
                description: 'List all clients',
                color: 'bg-green-100 text-green-800',
              },
              {
                method: 'POST',
                endpoint: '/clients',
                description: 'Create a new client',
                color: 'bg-blue-100 text-blue-800',
              },
              {
                method: 'GET',
                endpoint: '/employees',
                description: 'List all employees',
                color: 'bg-green-100 text-green-800',
              },
            ].map((endpoint, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold ${endpoint.color}`}>
                    {endpoint.method}
                  </span>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-gray-900">{endpoint.endpoint}</code>
                    <p className="text-sm text-gray-600 mt-2">{endpoint.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Request Example */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Request Example</h2>
          <p className="text-gray-600 mb-6">Example of creating a new project:</p>
          <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm relative">
            <CopyCodeButton text={`curl -X POST https://api.thesmartpro.io/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Website Redesign",
    "description": "Complete website redesign project",
    "status": "active",
    "start_date": "2025-01-01",
    "end_date": "2025-03-31"
  }'`} />
            <pre className="overflow-x-auto">
{`curl -X POST https://api.thesmartpro.io/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Website Redesign",
    "description": "Complete website redesign project",
    "status": "active",
    "start_date": "2025-01-01",
    "end_date": "2025-03-31"
  }'`}
            </pre>
          </div>
        </section>

        {/* Response Example */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Response Example</h2>
          <p className="text-gray-600 mb-6">Successful response (201 Created):</p>
          <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm relative">
            <CopyCodeButton text={`{
  "id": "proj_1234567890",
  "name": "Website Redesign",
  "description": "Complete website redesign project",
  "status": "active",
  "start_date": "2025-01-01",
  "end_date": "2025-03-31",
  "created_at": "2025-11-10T10:00:00Z",
  "updated_at": "2025-11-10T10:00:00Z"
}`} />
            <pre className="overflow-x-auto">
{`{
  "id": "proj_1234567890",
  "name": "Website Redesign",
  "description": "Complete website redesign project",
  "status": "active",
  "start_date": "2025-01-01",
  "end_date": "2025-03-31",
  "created_at": "2025-11-10T10:00:00Z",
  "updated_at": "2025-11-10T10:00:00Z"
}`}
            </pre>
          </div>
        </section>

        {/* Rate Limits */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Rate Limits</h2>
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <p className="text-gray-700 mb-4">
              API requests are rate-limited to ensure fair usage and platform stability:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700"><strong>Standard Plan:</strong> 1,000 requests per hour</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700"><strong>Professional Plan:</strong> 5,000 requests per hour</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700"><strong>Enterprise Plan:</strong> Custom limits available</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Error Codes */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Error Codes</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left px-6 py-4 font-bold text-gray-900">Code</th>
                  <th className="text-left px-6 py-4 font-bold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: '200', desc: 'OK - Request succeeded' },
                  { code: '201', desc: 'Created - Resource created successfully' },
                  { code: '400', desc: 'Bad Request - Invalid request parameters' },
                  { code: '401', desc: 'Unauthorized - Invalid or missing API key' },
                  { code: '403', desc: 'Forbidden - Insufficient permissions' },
                  { code: '404', desc: 'Not Found - Resource not found' },
                  { code: '429', desc: 'Too Many Requests - Rate limit exceeded' },
                  { code: '500', desc: 'Internal Server Error - Server error occurred' },
                ].map((error, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm text-gray-900 font-bold">{error.code}</td>
                    <td className="px-6 py-4 text-gray-700">{error.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Use HTTPS',
                description: 'Always use HTTPS for API requests to ensure data security.',
              },
              {
                title: 'Handle Errors Gracefully',
                description: 'Implement proper error handling and retry logic for failed requests.',
              },
              {
                title: 'Cache Responses',
                description: 'Cache API responses when appropriate to reduce unnecessary requests.',
              },
              {
                title: 'Use Webhooks',
                description: 'Subscribe to webhooks for real-time updates instead of polling.',
              },
              {
                title: 'Paginate Results',
                description: 'Use pagination for large result sets to improve performance.',
              },
              {
                title: 'Keep API Keys Secure',
                description: 'Never expose API keys in client-side code or public repositories.',
              },
            ].map((practice, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{practice.title}</h3>
                <p className="text-gray-600 text-sm">{practice.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help with the API?</h2>
          <p className="mb-6 text-blue-100">
            Our developer support team is here to help you integrate with TheSmartPro.io API.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Contact Developer Support
          </Button>
        </section>
      </div>
    </DocsLayout>
  );
}

