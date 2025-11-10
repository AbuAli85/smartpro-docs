import { Code, Zap, Link2, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Integration {
  name: string;
  category: string;
  icon: string;
  description: string;
  status: 'available' | 'coming-soon';
}

const integrations: Integration[] = [
  // CRM & Sales
  { name: 'Salesforce', category: 'CRM', icon: '☁️', description: 'Sync contacts and deals', status: 'available' },
  { name: 'HubSpot', category: 'CRM', icon: '🎯', description: 'Unified sales platform', status: 'available' },
  { name: 'Pipedrive', category: 'CRM', icon: '📊', description: 'Sales pipeline management', status: 'available' },
  
  // Communication
  { name: 'Slack', category: 'Communication', icon: '💬', description: 'Team messaging', status: 'available' },
  { name: 'Microsoft Teams', category: 'Communication', icon: '👥', description: 'Enterprise collaboration', status: 'available' },
  { name: 'Discord', category: 'Communication', icon: '🎮', description: 'Community platform', status: 'available' },
  
  // Email & Marketing
  { name: 'Gmail', category: 'Email', icon: '📧', description: 'Email integration', status: 'available' },
  { name: 'Outlook', category: 'Email', icon: '📬', description: 'Microsoft email', status: 'available' },
  { name: 'Mailchimp', category: 'Marketing', icon: '📨', description: 'Email campaigns', status: 'available' },
  
  // Payment Processing
  { name: 'Stripe', category: 'Payments', icon: '💳', description: 'Payment processing', status: 'available' },
  { name: 'PayPal', category: 'Payments', icon: '🏦', description: 'Online payments', status: 'available' },
  { name: 'Square', category: 'Payments', icon: '📱', description: 'POS & payments', status: 'available' },
  
  // Cloud Storage
  { name: 'Google Drive', category: 'Storage', icon: '☁️', description: 'Cloud storage', status: 'available' },
  { name: 'Dropbox', category: 'Storage', icon: '📦', description: 'File storage', status: 'available' },
  { name: 'OneDrive', category: 'Storage', icon: '📁', description: 'Microsoft storage', status: 'available' },
  
  // Automation
  { name: 'Zapier', category: 'Automation', icon: '⚡', description: 'Workflow automation', status: 'available' },
  { name: 'Make', category: 'Automation', icon: '🔄', description: 'Process automation', status: 'available' },
  { name: 'IFTTT', category: 'Automation', icon: '🎯', description: 'Smart automations', status: 'coming-soon' },
];

const categories = ['All', 'CRM', 'Communication', 'Email', 'Marketing', 'Payments', 'Storage', 'Automation'];

export default function IntegrationHub() {
  return (
    <section id="integrations" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Link2 className="w-4 h-4" />
            <span>Integrations & API</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connect Everything You Use
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate with 50+ popular tools and services. Build custom integrations with our powerful REST API and webhooks.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                category === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="text-4xl mb-4">{integration.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{integration.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{integration.category}</p>
              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    integration.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {integration.status === 'available' ? '✓ Available' : 'Coming Soon'}
                </span>
                {integration.status === 'available' && (
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* API Documentation */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* API Features */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Powerful REST API</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Complete API</h4>
                  <p className="text-gray-600">Full REST API for all platform features with comprehensive documentation</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Webhooks</h4>
                  <p className="text-gray-600">Real-time event notifications for instant data synchronization</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">SDK & Libraries</h4>
                  <p className="text-gray-600">Official SDKs for Node.js, Python, PHP, Ruby, and more</p>
                </div>
              </div>
            </div>
            <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">
              View API Documentation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Code Example */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Quick Start</h3>
            <div className="bg-gray-900 rounded-xl p-6 text-gray-100 font-mono text-sm overflow-x-auto">
              <pre>{`// Initialize the client
const smartpro = require('@smartpro/sdk');

const client = new smartpro.Client({
  apiKey: 'your_api_key'
});

// Get all contracts
const contracts = await client.contracts.list({
  limit: 10,
  status: 'active'
});

// Create a new contact
const contact = await client.contacts.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com'
});

// Listen to webhooks
client.webhooks.on('contract.signed', (event) => {
  console.log('Contract signed:', event.data);
});`}</pre>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Build Custom Integrations</h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Use our powerful API and webhooks to build custom integrations tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg h-14 px-8"
            >
              Get API Key
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-700 text-lg h-14 px-8"
            >
              View Docs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
