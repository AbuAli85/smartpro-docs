import DocsLayout from '@/components/DocsLayout';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { useEffect } from 'react';
import { setSEOTags } from '@/lib/seoUtils';

export default function BusinessPlan() {
  useEffect(() => {
    setSEOTags({
      title: "Business Plan & Strategy | TheSmartPro.io - Market Opportunity & Growth",
      description: "$600B+ market opportunity. 5-year projection: $2.4M to $108M revenue. 75-80% gross margin. Year 1 profitability. Enterprise software market leader.",
      keywords: "business plan, market analysis, financial projections, go-to-market strategy, competitive advantage",
      type: "article",
      url: "https://thesmartpro.io/docs/business-plan",
    });
  }, []);
  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Business Plan', href: '/docs/business-plan' },
  ];

  return (
    <DocsLayout pageTitle="Business Plan & Strategy" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Quick Link to Full Plan */}
        <section>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Complete Business Plan Available</h3>
                <p className="text-blue-100">
                  View the comprehensive 10-section business plan with detailed financial projections, market analysis, and implementation timeline.
                </p>
              </div>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 ml-4" asChild>
                <Link href="/docs/business-plan-full">View Full Plan</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Executive Summary */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Executive Summary</h2>
          <p className="text-lg text-gray-600 mb-8">
            TheSmartPro.io represents a significant opportunity in the enterprise software market. By consolidating five critical business functions into a single unified platform, the company addresses a substantial market need for simplified, integrated business management solutions.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Market Opportunity</h3>
              </div>
              <p className="text-gray-600">$600B+ enterprise software market growing at 12-15% annually</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Target Market</h3>
              </div>
              <p className="text-gray-600">Mid-market and enterprise organizations seeking unified solutions</p>
            </div>
          </div>
        </section>

        {/* Financial Projections */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Financial Projections</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">5-Year Revenue Forecast</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left px-4 py-2 font-bold text-gray-900">Year</th>
                      <th className="text-right px-4 py-2 font-bold text-gray-900">Customers</th>
                      <th className="text-right px-4 py-2 font-bold text-gray-900">Revenue</th>
                      <th className="text-right px-4 py-2 font-bold text-gray-900">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { year: 1, customers: 240, revenue: '$2.4M', growth: '—' },
                      { year: 2, customers: 600, revenue: '$7.6M', growth: '217%' },
                      { year: 3, customers: 1850, revenue: '$25.5M', growth: '236%' },
                      { year: 4, customers: 4200, revenue: '$62.8M', growth: '146%' },
                      { year: 5, customers: 6720, revenue: '$108.2M', growth: '72%' },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-white">
                        <td className="px-4 py-3 font-medium text-gray-900">Year {row.year}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{row.customers.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-bold text-blue-600">{row.revenue}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{row.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Gross Margin</p>
                <p className="text-3xl font-bold text-blue-600">75-80%</p>
                <p className="text-xs text-gray-600 mt-2">SaaS delivery efficiency</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Operating Margin (Y5)</p>
                <p className="text-3xl font-bold text-green-600">56%</p>
                <p className="text-xs text-gray-600 mt-2">Profitability at scale</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Profitability</p>
                <p className="text-3xl font-bold text-purple-600">Year 1</p>
                <p className="text-xs text-gray-600 mt-2">Path to profitability</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Analysis */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Market Analysis</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Target Market Segments
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Enterprise Organizations (1,000+ employees)</p>
                  <p className="text-sm text-gray-600">ACV: $50,000-$100,000 annually</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mid-Market Companies (100-1,000 employees)</p>
                  <p className="text-sm text-gray-600">ACV: $10,000-$30,000 annually</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Professional Services Firms</p>
                  <p className="text-sm text-gray-600">ACV: $5,000-$15,000 annually</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Market Drivers
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Digital transformation initiatives</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Cost reduction through consolidation</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Data consistency and analytics demand</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Remote and hybrid work trends</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Go-to-Market Strategy */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Go-to-Market Strategy</h2>
          <div className="space-y-6">
            {[
              {
                phase: 'Phase 1 (Months 1-6)',
                focus: 'Professional Services & Mid-Market',
                activities: [
                  'Build case studies and testimonials',
                  'Establish system integrator partnerships',
                  'Launch content marketing program',
                ],
              },
              {
                phase: 'Phase 2 (Months 7-12)',
                focus: 'Enterprise Segment',
                activities: [
                  'Build enterprise sales team',
                  'Establish enterprise partnerships',
                  'Expand marketing reach',
                ],
              },
              {
                phase: 'Phase 3 (Year 2+)',
                focus: 'Geographic & Vertical Expansion',
                activities: [
                  'Expand internationally',
                  'Develop vertical-specific solutions',
                  'Build ecosystem partnerships',
                ],
              },
            ].map((phase, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{phase.phase}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{phase.focus}</p>
                <ul className="space-y-2">
                  {phase.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Competitive Advantages */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Competitive Advantages</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Unified Platform',
                description: 'Comprehensive coverage of critical business functions in a single platform',
              },
              {
                title: 'Ease of Implementation',
                description: 'Typical implementation takes 4-8 weeks vs 6-12 months for traditional ERP',
              },
              {
                title: 'Affordability',
                description: '50-70% lower pricing than traditional ERP systems',
              },
              {
                title: 'User Experience',
                description: 'Modern, intuitive interface designed for ease of use',
              },
              {
                title: 'Flexibility',
                description: 'Extensive customization through workflow automation and API',
              },
              {
                title: 'Enterprise-Grade',
                description: '99.9% uptime SLA with comprehensive security and compliance',
              },
            ].map((advantage, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
