import React, { useState, useEffect } from 'react';
import { Building2, Users, FileText, Zap, TrendingUp, CheckCircle } from 'lucide-react';

interface Client {
  id: string;
  company_name: string;
  industry: string;
  employees_count: number;
  contracts_generated: number;
  services_using: string[];
  platform_uptime: number;
  monthly_active_users: number;
  automation_workflows: number;
  compliance_score: number;
  joined_date: string;
  logo_url?: string;
}

const FALLBACK_CLIENTS: Client[] = [
  {
    id: '1',
    company_name: 'Digital Solutions Inc',
    industry: 'Technology',
    employees_count: 45,
    contracts_generated: 127,
    services_using: ['CRM', 'Employee Management', 'Contract Management', 'Automation'],
    platform_uptime: 99.8,
    monthly_active_users: 42,
    automation_workflows: 8,
    compliance_score: 98,
    joined_date: '2024-01-15'
  },
  {
    id: '2',
    company_name: 'Global Consulting Group',
    industry: 'Consulting',
    employees_count: 78,
    contracts_generated: 234,
    services_using: ['CRM', 'Project Management', 'E-Learning', 'Automation'],
    platform_uptime: 99.9,
    monthly_active_users: 72,
    automation_workflows: 12,
    compliance_score: 99,
    joined_date: '2023-11-20'
  },
  {
    id: '3',
    company_name: 'Enterprise Services Ltd',
    industry: 'Business Services',
    employees_count: 156,
    contracts_generated: 456,
    services_using: ['CRM', 'Employee Management', 'Contract Management', 'Project Management', 'E-Learning', 'Automation'],
    platform_uptime: 99.95,
    monthly_active_users: 148,
    automation_workflows: 18,
    compliance_score: 100,
    joined_date: '2023-06-10'
  },
  {
    id: '4',
    company_name: 'Professional Staffing Co',
    industry: 'HR & Staffing',
    employees_count: 92,
    contracts_generated: 312,
    services_using: ['CRM', 'Employee Management', 'Contract Management', 'Automation'],
    platform_uptime: 99.7,
    monthly_active_users: 85,
    automation_workflows: 10,
    compliance_score: 97,
    joined_date: '2024-02-28'
  },
  {
    id: '5',
    company_name: 'Innovation Partners',
    industry: 'Technology',
    employees_count: 63,
    contracts_generated: 189,
    services_using: ['Project Management', 'E-Learning', 'Automation'],
    platform_uptime: 99.85,
    monthly_active_users: 58,
    automation_workflows: 9,
    compliance_score: 96,
    joined_date: '2024-03-05'
  },
  {
    id: '6',
    company_name: 'Corporate Training Hub',
    industry: 'Education',
    employees_count: 34,
    contracts_generated: 98,
    services_using: ['E-Learning', 'Employee Management', 'Automation'],
    platform_uptime: 99.6,
    monthly_active_users: 31,
    automation_workflows: 5,
    compliance_score: 95,
    joined_date: '2024-04-12'
  },
  {
    id: '7',
    company_name: 'Financial Advisory Group',
    industry: 'Finance',
    employees_count: 127,
    contracts_generated: 378,
    services_using: ['CRM', 'Contract Management', 'Automation'],
    platform_uptime: 99.92,
    monthly_active_users: 119,
    automation_workflows: 14,
    compliance_score: 100,
    joined_date: '2023-09-18'
  },
  {
    id: '8',
    company_name: 'Healthcare Management Systems',
    industry: 'Healthcare',
    employees_count: 201,
    contracts_generated: 567,
    services_using: ['CRM', 'Employee Management', 'Contract Management', 'Project Management', 'Automation'],
    platform_uptime: 99.98,
    monthly_active_users: 195,
    automation_workflows: 20,
    compliance_score: 100,
    joined_date: '2023-05-22'
  }
];

export default function LiveClientsWidget() {
  const [clients, setClients] = useState<Client[]>(FALLBACK_CLIENTS);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isLiveData, setIsLiveData] = useState(false);

  useEffect(() => {
    // Initialize with fallback data immediately
    setClients(FALLBACK_CLIENTS);
    setLoading(false);
    
    // Try to fetch live data in background
    fetchClientsInBackground();
    const interval = setInterval(fetchClientsInBackground, 60000); // Try every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchClientsInBackground = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        'https://portal.thesmartpro.io/api/v1/dashboard/clients',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'marketing-website'
          },
          signal: controller.signal,
          mode: 'cors'
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.clients && Array.isArray(data.clients)) {
          setClients(data.clients);
          setIsLiveData(true);
        }
      }
    } catch (error) {
      // Silently fail - keep using fallback data
      console.debug('Background fetch failed, using fallback data');
      setIsLiveData(false);
    }
  };

  const getServiceColor = (service: string): string => {
    const colors: { [key: string]: string } = {
      'CRM': 'bg-blue-100 text-blue-800',
      'Employee Management': 'bg-purple-100 text-purple-800',
      'Contract Management': 'bg-green-100 text-green-800',
      'Project Management': 'bg-orange-100 text-orange-800',
      'E-Learning': 'bg-pink-100 text-pink-800',
      'Automation': 'bg-red-100 text-red-800'
    };
    return colors[service] || 'bg-gray-100 text-gray-800';
  };

  const filteredClients = filter === 'all' 
    ? clients 
    : clients.filter(client => client.services_using.includes(filter));

  const allServices = Array.from(new Set(clients.flatMap(c => c.services_using)));

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Active Clients</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">{clients.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Employees</p>
              <p className="text-3xl font-bold text-purple-900 mt-1">
                {clients.reduce((sum, c) => sum + c.employees_count, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Contracts Generated</p>
              <p className="text-3xl font-bold text-green-900 mt-1">
                {clients.reduce((sum, c) => sum + c.contracts_generated, 0)}
              </p>
            </div>
            <FileText className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Avg Uptime</p>
              <p className="text-3xl font-bold text-orange-900 mt-1">
                {(clients.reduce((sum, c) => sum + c.platform_uptime, 0) / clients.length).toFixed(2)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center">
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          isLiveData 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {isLiveData ? '🟢 Live Data' : '📊 Sample Data'}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Clients
        </button>
        {allServices && allServices.map(service => (
          <button
            key={service}
            onClick={() => setFilter(service)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === service
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Clients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary"
          >
            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">{client.company_name}</h3>
                <p className="text-sm text-muted-foreground">{client.industry}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-blue-600 font-medium">Employees</p>
                <p className="text-xl font-bold text-blue-900">{client.employees_count}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-xs text-green-600 font-medium">Contracts</p>
                <p className="text-xl font-bold text-green-900">{client.contracts_generated}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-xs text-purple-600 font-medium">Active Users</p>
                <p className="text-xl font-bold text-purple-900">{client.monthly_active_users}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="text-xs text-orange-600 font-medium">Uptime</p>
                <p className="text-xl font-bold text-orange-900">{client.platform_uptime}%</p>
              </div>
            </div>

            {/* Services Used */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Services Using</p>
              <div className="flex flex-wrap gap-2">
                {client.services_using.map(service => (
                  <span
                    key={service}
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getServiceColor(service)}`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Compliance Score */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-600 font-medium">Compliance Score</p>
                <p className="text-lg font-bold text-foreground">{client.compliance_score}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">{client.compliance_score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedClient.company_name}</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-foreground">Company Overview</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Industry</p>
                    <p className="text-lg font-bold text-foreground mt-1">{selectedClient.industry}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Joined Date</p>
                    <p className="text-lg font-bold text-foreground mt-1">
                      {new Date(selectedClient.joined_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Metrics */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-foreground">Usage Metrics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total Employees</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">{selectedClient.employees_count}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Contracts Generated</p>
                    <p className="text-3xl font-bold text-green-900 mt-2">{selectedClient.contracts_generated}</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Monthly Active Users</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">{selectedClient.monthly_active_users}</p>
                  </div>
                </div>
              </div>

              {/* Platform Performance */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-foreground">Platform Performance</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <p className="text-sm text-orange-600 font-medium">Platform Uptime</p>
                    <p className="text-3xl font-bold text-orange-900 mt-2">{selectedClient.platform_uptime}%</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Automation Workflows</p>
                    <p className="text-3xl font-bold text-red-900 mt-2">{selectedClient.automation_workflows}</p>
                  </div>
                </div>
              </div>

              {/* Services Using */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-foreground">Services Subscribed</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedClient.services_using.map(service => (
                    <span
                      key={service}
                      className={`px-4 py-2 rounded-full font-medium ${getServiceColor(service)}`}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compliance */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-foreground">Compliance & Security</h3>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Overall Compliance Score</p>
                      <p className="text-2xl font-bold text-foreground mt-2">{selectedClient.compliance_score}%</p>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">{selectedClient.compliance_score}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
