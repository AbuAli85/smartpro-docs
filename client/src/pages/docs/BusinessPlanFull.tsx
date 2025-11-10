import DocsLayout from '@/components/DocsLayout';
import { TrendingUp, Target, Users, DollarSign, Calendar, CheckCircle, ArrowRight, Globe, Zap, Shield, Award, BarChart3, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { setSEOTags } from '@/lib/seoUtils';

export default function BusinessPlanFull() {
  useEffect(() => {
    setSEOTags({
      title: "Complete Business Plan | TheSmartPro.io - Strategic Vision & Financial Projections",
      description: "Comprehensive SmartPRO business plan: market analysis, financial projections, operational strategy, and 5-year growth roadmap for Oman and GCC markets.",
      keywords: "business plan, market analysis, financial projections, strategic planning, startup plan, investment opportunity",
      type: "article",
      url: "https://thesmartpro.io/docs/business-plan-full",
    });
  }, []);

  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Business', href: '/docs/business-plan' },
    { label: 'Complete Business Plan', href: '/docs/business-plan-full' },
  ];

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', icon: <Target className="w-5 h-5" /> },
    { id: 'company-description', title: 'Company Description', icon: <Users className="w-5 h-5" /> },
    { id: 'market-analysis', title: 'Market Analysis', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'products-services', title: 'Products & Services', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'marketing-sales', title: 'Marketing & Sales', icon: <Users className="w-5 h-5" /> },
    { id: 'operations', title: 'Operational Plan', icon: <Calendar className="w-5 h-5" /> },
    { id: 'organization', title: 'Organization & Management', icon: <Users className="w-5 h-5" /> },
    { id: 'financials', title: 'Financial Plan', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'implementation', title: 'Implementation Plan', icon: <Calendar className="w-5 h-5" /> },
    { id: 'appendices', title: 'Appendices', icon: <CheckCircle className="w-5 h-5" /> },
  ];

  return (
    <DocsLayout pageTitle="SmartPRO Complete Business Plan" breadcrumbs={breadcrumbs}>
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Strategic Business Plan</h2>
            </div>
            <p className="text-blue-100 mb-4">
              A comprehensive roadmap for establishing SmartPRO as the leading digital platform for business and administrative services in Oman and the GCC region.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">$2.5M</div>
                <div className="text-sm text-blue-100">Year 5 Revenue Target</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">5 Years</div>
                <div className="text-sm text-blue-100">Strategic Timeline</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">6 Countries</div>
                <div className="text-sm text-blue-100">GCC Expansion Plan</div>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-6">
            This comprehensive business plan outlines SmartPRO's vision, strategy, and execution plan for transforming administrative and business services in the Middle East. Prepared April 2025.
          </p>
        </section>

        {/* Quick Navigation */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#${section.id}`}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-blue-600">{section.icon}</div>
                <div>
                  <div className="font-semibold text-gray-900">{index + 1}. {section.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
            ))}
          </div>
        </section>

        {/* Key Metrics Dashboard */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Business Metrics</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div className="text-sm font-semibold text-blue-900">Initial Investment</div>
              </div>
              <div className="text-3xl font-bold text-blue-600">$455K</div>
              <div className="text-xs text-blue-700 mt-1">Platform & Launch</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div className="text-sm font-semibold text-green-900">5-Year ROI</div>
              </div>
              <div className="text-3xl font-bold text-green-600">230%</div>
              <div className="text-xs text-green-700 mt-1">Projected Returns</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <div className="text-sm font-semibold text-purple-900">Target Users</div>
              </div>
              <div className="text-3xl font-bold text-purple-600">20K</div>
              <div className="text-xs text-purple-700 mt-1">By Year 5</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-orange-600" />
                <div className="text-sm font-semibold text-orange-900">Market Coverage</div>
              </div>
              <div className="text-3xl font-bold text-orange-600">6 GCC</div>
              <div className="text-xs text-orange-700 mt-1">Countries</div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section id="executive-summary">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Executive Summary</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Company Overview</h3>
              <p className="text-gray-700 leading-relaxed">
                SmartPRO is a smart bilingual (Arabic/English) platform designed to connect companies, service providers, and Omani individuals with fully integrated digital business and administrative services. The platform serves as a professional connection point between companies and institutions on one side, and service providers and technicians on the other, through a direct booking system, instant messaging, automated reports, and an AI-powered assistant.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mission Statement</h3>
              <p className="text-gray-700">
                SmartPRO's mission is to simplify and unify service access by connecting companies, freelancers, and individuals through a bilingual platform supported by artificial intelligence and customized for regional needs. The platform aims to accelerate processes, simplify transactions, and stimulate the local economy in Oman and eventually across the Gulf Cooperation Council (GCC) region.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vision Statement</h3>
              <p className="text-gray-700">
                To become the leading digital gateway for administrative, commercial, and government services in Oman and the Gulf region, while empowering users and providers with smart and seamless access to operations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Objectives</h3>
              <ul className="space-y-3">
                {[
                  'Establish SmartPRO as the premier digital platform for business and administrative services in Oman',
                  'Achieve significant market penetration in the Omani market within the first year of operation',
                  'Expand services to other GCC countries including Saudi Arabia, Qatar, and UAE in a phased approach',
                  'Integrate with government entities to support permits, licenses, and official services',
                  'Build a sustainable revenue model through diversified income streams',
                  'Create a user-friendly, efficient platform that significantly reduces administrative burden for businesses and individuals',
                ].map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Keys to Success</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Localization', desc: 'Platform tailored for Oman and GCC markets with bilingual interface' },
                  { title: 'AI Integration', desc: 'Leveraging artificial intelligence for automation and analytics' },
                  { title: 'Government Partnerships', desc: 'Strategic integration with government services' },
                  { title: 'User Experience', desc: 'Clean, intuitive interface in both Arabic and English' },
                  { title: 'Service Provider Network', desc: 'Building a robust network of qualified providers' },
                  { title: 'Technical Foundation', desc: 'Strong architecture built on modern frameworks' },
                  { title: 'Core Values', desc: 'Operating with integrity, transparency, and innovation' },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Financial Highlights */}
        <section id="financials">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Financial Plan Highlights</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Startup Investment</h3>
              <div className="text-4xl font-bold text-green-600 mb-2">$455,000</div>
              <p className="text-gray-700">Initial investment required for platform development and launch</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">5-Year Revenue Projections</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="text-left px-4 py-3 font-bold text-gray-900">Year</th>
                      <th className="text-right px-4 py-3 font-bold text-gray-900">Revenue</th>
                      <th className="text-right px-4 py-3 font-bold text-gray-900">Expenses</th>
                      <th className="text-right px-4 py-3 font-bold text-gray-900">Net Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { year: 1, revenue: '$200,000', expenses: '$520,000', net: '-$320,000' },
                      { year: 2, revenue: '$550,000', expenses: '$700,000', net: '-$150,000' },
                      { year: 3, revenue: '$1,100,000', expenses: '$1,000,000', net: '$100,000' },
                      { year: 4, revenue: '$1,800,000', expenses: '$1,330,000', net: '$470,000' },
                      { year: 5, revenue: '$2,500,000', expenses: '$1,700,000', net: '$800,000' },
                    ].map((row) => (
                      <tr key={row.year} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-900">Year {row.year}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{row.revenue}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{row.expenses}</td>
                        <td className={`px-4 py-3 text-right font-semibold ${row.net.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                          {row.net}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Break-even Point</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">Q4 Year 2</div>
                <div className="text-sm text-gray-600">~1,000 active paying users</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">5-Year ROI</div>
                <div className="text-2xl font-bold text-green-600 mb-1">230%</div>
                <div className="text-sm text-gray-600">Based on projected cash flows</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Gross Margin</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">70%</div>
                <div className="text-sm text-gray-600">Target margin after COGS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section id="market-analysis">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Market Analysis</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-8 border border-indigo-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Opportunity</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold text-indigo-600 mb-2">$600B+</div>
                  <div className="text-sm text-gray-700">Global Administrative Services Market</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">25K+</div>
                  <div className="text-sm text-gray-700">SMEs in Oman Alone</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-600 mb-2">90%+</div>
                  <div className="text-sm text-gray-700">Internet Penetration in GCC</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Target Market Segments</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: <Users className="w-6 h-6" />, title: 'SMEs', desc: '25,000+ businesses in Oman needing administrative support', color: 'blue' },
                  { icon: <Award className="w-6 h-6" />, title: 'Service Providers', desc: 'Growing freelance and professional service sector', color: 'green' },
                  { icon: <Shield className="w-6 h-6" />, title: 'Large Enterprises', desc: '200+ major corporations seeking optimization', color: 'purple' },
                  { icon: <Globe className="w-6 h-6" />, title: 'Government Entities', desc: 'Multiple ministries undergoing digital transformation', color: 'orange' },
                ].map((segment, index) => (
                  <div key={index} className={`bg-white rounded-lg border-2 border-${segment.color}-200 p-6 hover:shadow-lg transition-shadow`}>
                    <div className={`text-${segment.color}-600 mb-3`}>{segment.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{segment.title}</h4>
                    <p className="text-sm text-gray-600">{segment.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Advantages</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: <Globe className="w-5 h-5" />, title: 'Localization', desc: 'Bilingual Arabic/English platform tailored for GCC' },
                  { icon: <Zap className="w-5 h-5" />, title: 'AI-Powered', desc: 'Advanced automation and intelligent features' },
                  { icon: <Shield className="w-5 h-5" />, title: 'Government Integration', desc: 'Strategic partnerships with public sector' },
                ].map((advantage, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                    <div className="text-blue-600 mb-3">{advantage.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{advantage.title}</h4>
                    <p className="text-sm text-gray-600">{advantage.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Revenue Streams */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Revenue Model & Streams</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Subscriptions',
                desc: 'Tiered plans (Free, Pro, Enterprise) for providers and businesses',
                year5: '$750,000',
                percentage: '30%',
                icon: <Users className="w-6 h-6" />,
              },
              {
                title: 'Booking Commissions',
                desc: '10-20% commission on each transaction',
                year5: '$900,000',
                percentage: '36%',
                icon: <DollarSign className="w-6 h-6" />,
              },
              {
                title: 'AI Features',
                desc: 'Usage fees for advanced automation and analytics',
                year5: '$350,000',
                percentage: '14%',
                icon: <Zap className="w-6 h-6" />,
              },
              {
                title: 'Featured Listings',
                desc: 'Premium visibility for service providers',
                year5: '$200,000',
                percentage: '8%',
                icon: <Award className="w-6 h-6" />,
              },
              {
                title: 'Custom Integrations',
                desc: 'Tailored solutions for enterprise and government',
                year5: '$300,000',
                percentage: '12%',
                icon: <Shield className="w-6 h-6" />,
              },
            ].map((stream, index) => (
              <div key={index} className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow hover:border-blue-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-blue-600">{stream.icon}</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stream.percentage}</div>
                    <div className="text-xs text-gray-500">of revenue</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{stream.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{stream.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Year 5 Target:</span>
                  <span className="text-lg font-bold text-blue-600">{stream.year5}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Timeline */}
        <section id="implementation">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Implementation Timeline</h2>
          <div className="space-y-4">
            {[
              {
                phase: 'Phase 1',
                title: 'Platform Development',
                timeline: 'Months 1-6',
                milestones: ['Requirements gathering', 'Architecture design', 'Core development', 'Internal testing'],
              },
              {
                phase: 'Phase 2',
                title: 'MVP Launch',
                timeline: 'Months 7-12',
                milestones: ['Beta testing', 'Official launch in Oman', 'Initial marketing', 'Provider onboarding'],
              },
              {
                phase: 'Phase 3',
                title: 'Feature Enhancement',
                timeline: 'Months 13-18',
                milestones: ['Advanced AI features', 'Service expansion', 'Mobile apps', 'Performance optimization'],
              },
              {
                phase: 'Phase 4',
                title: 'Regional Expansion Prep',
                timeline: 'Months 19-24',
                milestones: ['UAE/Qatar research', 'Localization', 'Regulatory compliance', 'Team expansion'],
              },
              {
                phase: 'Phase 5',
                title: 'GCC Expansion',
                timeline: 'Months 25-36',
                milestones: ['UAE/Qatar launch', 'Saudi Arabia entry', 'Regional offices', 'Network expansion'],
              },
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-lg border-l-4 border-blue-600 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-bold text-blue-600 mb-1">{phase.phase}</div>
                    <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {phase.timeline}
                  </div>
                </div>
                <ul className="grid md:grid-cols-2 gap-2">
                  {phase.milestones.map((milestone, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Management */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Risk Analysis & Mitigation</h2>
          <div className="space-y-4">
            {[
              {
                risk: 'Market Adoption',
                mitigation: 'Freemium model, targeted marketing, and strategic partnerships to drive user acquisition',
                severity: 'Medium',
                color: 'yellow',
              },
              {
                risk: 'Technical Scalability',
                mitigation: 'Cloud infrastructure, load testing, and modular architecture for growth',
                severity: 'Low',
                color: 'green',
              },
              {
                risk: 'Competitive Pressure',
                mitigation: 'Rapid feature development, strong localization, and government partnerships',
                severity: 'Medium',
                color: 'yellow',
              },
              {
                risk: 'Regulatory Compliance',
                mitigation: 'Legal counsel, government relations, and proactive compliance monitoring',
                severity: 'Low',
                color: 'green',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{item.risk}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${item.color}-100 text-${item.color}-800`}>
                    {item.severity} Risk
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.mitigation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Success Metrics */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Success Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                User Growth
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Year 1:</span>
                  <span className="font-semibold text-gray-900">500 users</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Year 2:</span>
                  <span className="font-semibold text-gray-900">1,000 users</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Year 3:</span>
                  <span className="font-semibold text-gray-900">5,000 users</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Year 5:</span>
                  <span className="font-semibold text-blue-600">20,000 users</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Financial Targets
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Gross Margin:</span>
                  <span className="font-semibold text-gray-900">70%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">CAC:</span>
                  <span className="font-semibold text-gray-900">$50/user</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">LTV:</span>
                  <span className="font-semibold text-gray-900">$500/user</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">LTV:CAC:</span>
                  <span className="font-semibold text-green-600">10:1</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                Operational KPIs
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Platform Uptime:</span>
                  <span className="font-semibold text-gray-900">99.9%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Support Satisfaction:</span>
                  <span className="font-semibold text-gray-900">&gt;90%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Service Completion:</span>
                  <span className="font-semibold text-gray-900">&gt;95%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Market Share (Oman):</span>
                  <span className="font-semibold text-purple-600">30%</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Download & Contact */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Download the complete business plan PDF or contact us to discuss investment opportunities and partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Download className="w-5 h-5 mr-2" />
                Download Full PDF
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-blue-700" asChild>
                <Link href="/contact">
                  <FileText className="w-5 h-5 mr-2" />
                  Request Pitch Deck
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-blue-700" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-blue-100 mb-4">For investment inquiries:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a href="mailto:invest@thesmartpro.io" className="text-white hover:text-blue-200 transition-colors">
                  invest@thesmartpro.io
                </a>
                <span className="hidden sm:inline text-blue-300">|</span>
                <span className="text-blue-100">Sultanate of Oman</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}

