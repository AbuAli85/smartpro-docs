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

        {/* Company Description */}
        <section id="company-description">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Company Description</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Company Background</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SmartPRO was developed to address the critical market problem of scattered services, traditional procedures, manual dependencies, and the lack of a reliable platform connecting companies with local and international providers, especially for administrative and executive tasks.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform provides an integrated digital solution that combines booking, management, communication, and billing in one place. It also integrates with government systems to facilitate licenses, official procedures, and request tracking.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Legal Structure
                </h3>
                <p className="text-gray-700 text-sm">
                  SmartPRO is established as a <strong>Limited Liability Company (LLC)</strong> registered in Oman. The company operates under IT activities licensing and complies with national eCommerce laws and data protection regulations.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-green-600" />
                  Location & Expansion
                </h3>
                <p className="text-gray-700 text-sm">
                  Headquartered in <strong>Oman</strong>, with plans for phased expansion to other GCC countries including Saudi Arabia, Qatar, and the UAE.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Company Values</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5" />, title: 'Integrity & Transparency', desc: 'Building trust through honest communication' },
                  { icon: <Zap className="w-5 h-5" />, title: 'Innovation & Efficiency', desc: 'Cutting-edge technology for streamlined processes' },
                  { icon: <Users className="w-5 h-5" />, title: 'User-Centric Approach', desc: 'Designing with end-user experience first' },
                  { icon: <Globe className="w-5 h-5" />, title: 'Regional Relevance', desc: 'Solutions tailored for Omani and GCC markets' },
                  { icon: <Award className="w-5 h-5" />, title: 'Quality Assurance', desc: 'High standards for providers and functionality' },
                  { icon: <CheckCircle className="w-5 h-5" />, title: 'Collaborative Growth', desc: 'Working with all stakeholders for success' },
                ].map((value, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-blue-600 mb-2">{value.icon}</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{value.title}</h4>
                    <p className="text-xs text-gray-600">{value.desc}</p>
                  </div>
                ))}
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

        {/* Products & Services - COMPREHENSIVE */}
        <section id="products-services">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Products & Services</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Platform Description</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SmartPRO is a smart bilingual (Arabic/English) platform that connects companies, service providers, and individuals with fully integrated digital business and administrative services. The platform serves as a centralized hub for managing administrative tasks, booking services, and facilitating communication between clients and service providers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform is designed with a clean, intuitive interface that works seamlessly in both Arabic and English, making it accessible to the diverse population of Oman and the broader GCC region. SmartPRO operates through web and mobile interfaces, ensuring users can access services from any device.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features & Benefits</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-lg">
                    <Users className="w-6 h-6" />
                    For Clients (Companies & Individuals)
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Centralized Service Booking:</strong> Access to a wide range of administrative and business services through a single platform
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Provider Selection:</strong> Choose service providers based on ratings, availability, and pricing
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Booking Management:</strong> Easy scheduling, rescheduling, and cancellation of service appointments
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Communication Tools:</strong> Direct messaging with service providers for clarifications and updates
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Service Tracking:</strong> Real-time tracking of service progress and completion status
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Review System:</strong> Rate and review service providers after service completion
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Payment Integration:</strong> Secure payment processing for services
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Document Management:</strong> Storage and sharing of relevant documents for service requests
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Government Service Integration:</strong> Access to government-related services and documentation
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>AI-Powered Assistance:</strong> Automated support and recommendations based on user needs
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200 p-6">
                  <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2 text-lg">
                    <Award className="w-6 h-6" />
                    For Service Providers
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Business Profile:</strong> Customizable profile showcasing services, expertise, and availability
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Booking Management:</strong> Tools to manage service requests, schedules, and client information
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Client Communication:</strong> Direct messaging with clients to clarify requirements
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Payment Processing:</strong> Secure and timely payment collection for services rendered
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Performance Analytics:</strong> Insights into service ratings, client satisfaction, and business growth
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Featured Listings:</strong> Opportunity for premium visibility within the platform
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Document Exchange:</strong> Secure sharing of service-related documentation with clients
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Automated Notifications:</strong> Alerts for new booking requests and client messages
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 p-6 mt-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <Zap className="w-6 h-6 text-orange-600" />
                  Platform-Wide Features
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: <Globe className="w-5 h-5" />, title: 'Bilingual Interface', desc: 'Complete functionality in both Arabic and English' },
                    { icon: <Zap className="w-5 h-5" />, title: 'AI-Driven Automation', desc: 'Intelligent features including auto-replies, analytics, and personalization' },
                    { icon: <Users className="w-5 h-5" />, title: 'Mobile Responsiveness', desc: 'Full functionality across desktop and mobile devices' },
                    { icon: <Shield className="w-5 h-5" />, title: 'Data Security', desc: 'Robust protection of user data and transactions' },
                    { icon: <BarChart3 className="w-5 h-5" />, title: 'Reporting Tools', desc: 'Comprehensive reporting on service usage and performance' },
                    { icon: <FileText className="w-5 h-5" />, title: 'Government Integration', desc: 'Connections with relevant government systems for permits and licenses' },
                  ].map((feature, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="text-blue-600 mb-2">{feature.icon}</div>
                      <h5 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h5>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Workflow (10 Steps)</h3>
              <p className="text-gray-700 mb-6">
                The SmartPRO platform follows a streamlined workflow ensuring transparency and ease of communication:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { step: 1, title: 'User Login', desc: 'The client logs into the platform using secure credentials', icon: '🔐' },
                  { step: 2, title: 'Service Selection', desc: 'The client browses and selects the desired service from available categories', icon: '🔍' },
                  { step: 3, title: 'Provider Selection', desc: 'The client reviews available service providers and selects based on ratings, availability, and pricing', icon: '👥' },
                  { step: 4, title: 'Booking', desc: 'The client makes a booking, specifying requirements and preferred timing', icon: '📅' },
                  { step: 5, title: 'Confirmation', desc: 'The service provider confirms the booking and may request additional information', icon: '✅' },
                  { step: 6, title: 'Service Delivery', desc: 'The service is delivered according to the agreed terms', icon: '🚀' },
                  { step: 7, title: 'Follow-up', desc: 'Both parties can communicate regarding service progress', icon: '💬' },
                  { step: 8, title: 'Completion', desc: 'The service is marked as complete once fulfilled', icon: '✔️' },
                  { step: 9, title: 'Review', desc: 'The client provides a rating and review of the service', icon: '⭐' },
                  { step: 10, title: 'Payment Finalization', desc: 'Payment is processed and confirmed', icon: '💳' },
                ].map((item) => (
                  <div key={item.step} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Step {item.step}</span>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unique Selling Proposition</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: <Globe className="w-8 h-8" />, title: 'Localized Solution', desc: 'Specifically designed for the Omani and GCC markets, with full Arabic language support', color: 'blue' },
                  { icon: <Zap className="w-8 h-8" />, title: 'Comprehensive Integration', desc: 'Connecting clients, service providers, and government services in one platform', color: 'purple' },
                  { icon: <Award className="w-8 h-8" />, title: 'AI Enhancement', desc: 'Leveraging artificial intelligence for improved user experience and operational efficiency', color: 'orange' },
                  { icon: <Shield className="w-8 h-8" />, title: 'Government Partnerships', desc: 'Strategic integration with government entities for official services', color: 'green' },
                  { icon: <CheckCircle className="w-8 h-8" />, title: 'Quality Assurance', desc: 'Vetting and monitoring of service providers to ensure high-quality service delivery', color: 'red' },
                  { icon: <Users className="w-8 h-8" />, title: 'Bilingual Support', desc: 'Complete functionality in both Arabic and English, addressing the region\'s linguistic diversity', color: 'indigo' },
                ].map((usp, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${usp.color}-50 to-${usp.color}-100 rounded-lg border-2 border-${usp.color}-200 p-6 text-center hover:shadow-lg transition-shadow`}>
                    <div className={`text-${usp.color}-600 mb-3 flex justify-center`}>{usp.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{usp.title}</h4>
                    <p className="text-sm text-gray-700">{usp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Future Development Plans</h3>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6">
                <p className="text-gray-700 mb-6">
                  SmartPRO has a comprehensive roadmap for continuous improvement and expansion:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: <Globe className="w-6 h-6" />, title: 'Geographic Expansion', desc: 'Phased rollout to other GCC countries including Saudi Arabia, Kuwait, Qatar, and the UAE' },
                    { icon: <Zap className="w-6 h-6" />, title: 'Enhanced AI Capabilities', desc: 'Development of more sophisticated AI tools for business intelligence and automation' },
                    { icon: <BarChart3 className="w-6 h-6" />, title: 'SmartPRO Marketplace', desc: 'Launch of a competitive marketplace where services are categorized and rated' },
                    { icon: <Shield className="w-6 h-6" />, title: 'SaaS Transformation', desc: 'Evolution into a Software as a Service (SaaS) platform that can be licensed to other companies' },
                    { icon: <Users className="w-6 h-6" />, title: 'Mobile App Enhancement', desc: 'Continuous improvement of mobile applications for iOS and Android' },
                    { icon: <FileText className="w-6 h-6" />, title: 'Additional Service Categories', desc: 'Expansion into new service verticals based on market demand' },
                    { icon: <TrendingUp className="w-6 h-6" />, title: 'Advanced Analytics', desc: 'Development of more sophisticated reporting and analytics tools for business insights' },
                  ].map((plan, index) => (
                    <div key={index} className="bg-white rounded-lg border border-indigo-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="text-indigo-600">{plan.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{plan.title}</h4>
                          <p className="text-sm text-gray-600">{plan.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marketing & Sales Strategy - COMPREHENSIVE */}
        <section id="marketing-sales">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Marketing & Sales Strategy</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing Objectives</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Establish brand awareness and recognition in the Omani market',
                  'Attract and onboard a critical mass of service providers',
                  'Drive user adoption among target customer segments',
                  'Position SmartPRO as the leading digital platform',
                  'Support phased expansion to other GCC markets',
                  'Build strategic partnerships with government entities and large enterprises',
                ].map((objective, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Positioning Strategy</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: <Globe className="w-8 h-8" />, title: 'The Local Expert', desc: 'Specifically designed for Oman and GCC markets with deep understanding of regional business culture, language, and regulatory requirements', color: 'blue' },
                  { icon: <Zap className="w-8 h-8" />, title: 'The Digital Innovator', desc: 'Leveraging cutting-edge AI and automation to transform traditional administrative processes into seamless digital experiences', color: 'purple' },
                  { icon: <Shield className="w-8 h-8" />, title: 'The Trusted Connector', desc: 'Building a reliable ecosystem connecting businesses, service providers, and government entities with verified quality assurance', color: 'green' },
                  { icon: <TrendingUp className="w-8 h-8" />, title: 'The Efficiency Enabler', desc: 'Reducing administrative burden by up to 70% through streamlined processes and integrated service delivery', color: 'orange' },
                ].map((position, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${position.color}-50 to-${position.color}-100 rounded-lg border-2 border-${position.color}-200 p-6 hover:shadow-lg transition-shadow`}>
                    <div className={`text-${position.color}-600 mb-3`}>{position.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{position.title}</h4>
                    <p className="text-sm text-gray-700">{position.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pricing Strategy & Tiers</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    tier: 'Free',
                    price: '$0',
                    period: '/month',
                    desc: 'Perfect for getting started',
                    features: ['Up to 5 bookings/month', 'Basic profile', 'Standard support', 'Mobile access', 'Email notifications'],
                    color: 'gray',
                    cta: 'Start Free',
                  },
                  {
                    tier: 'Pro',
                    price: '$49',
                    period: '/month',
                    desc: 'For growing businesses',
                    features: ['Unlimited bookings', 'Enhanced profile', 'Priority support', 'Advanced analytics', 'AI features', 'Featured listings', 'Custom branding'],
                    color: 'blue',
                    cta: 'Go Pro',
                    popular: true,
                  },
                  {
                    tier: 'Enterprise',
                    price: 'Custom',
                    period: '',
                    desc: 'For large organizations',
                    features: ['Everything in Pro', 'Dedicated account manager', 'Custom integrations', 'API access', 'White-label options', 'SLA guarantee', 'Training sessions'],
                    color: 'purple',
                    cta: 'Contact Sales',
                  },
                ].map((plan, index) => (
                  <div key={index} className={`bg-white rounded-lg border-2 ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'} p-6 relative`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{plan.tier}</h4>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{plan.desc}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}>
                      {plan.cta}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Acquisition Economics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    Customer Acquisition Cost (CAC)
                  </h4>
                  <div className="text-4xl font-bold text-green-600 mb-4">$50</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Digital Marketing:</span>
                      <span className="font-semibold">$30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales & Support:</span>
                      <span className="font-semibold">$15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tools & Software:</span>
                      <span className="font-semibold">$5</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    Lifetime Value (LTV)
                  </h4>
                  <div className="text-4xl font-bold text-blue-600 mb-4">$500</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Avg Monthly Revenue:</span>
                      <span className="font-semibold">$49</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Customer Life:</span>
                      <span className="font-semibold">24 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gross Margin:</span>
                      <span className="font-semibold">70%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    LTV:CAC Ratio
                  </h4>
                  <div className="text-4xl font-bold text-purple-600 mb-4">10:1</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Excellent unit economics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Sustainable growth model</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Strong market fit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing Channels</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    icon: <Globe className="w-8 h-8" />, 
                    title: 'Digital Channels', 
                    items: ['Google Ads (Search & Display)', 'LinkedIn Advertising', 'Social Media (Facebook, Instagram, Twitter)', 'Email Marketing Campaigns', 'Content Marketing & SEO', 'Webinars & Online Events'],
                    color: 'blue'
                  },
                  { 
                    icon: <Users className="w-8 h-8" />, 
                    title: 'Traditional Channels', 
                    items: ['Business Expos & Trade Shows', 'Industry Conferences', 'Print Media (Business Magazines)', 'Strategic Partnerships', 'Direct Mail Campaigns', 'Networking Events'],
                    color: 'green'
                  },
                  { 
                    icon: <Award className="w-8 h-8" />, 
                    title: 'Influencer & Referral', 
                    items: ['Business Influencers', 'Industry Thought Leaders', 'Early Adopter Program', 'Customer Case Studies', 'Referral Incentive Program', 'Ambassador Program'],
                    color: 'purple'
                  },
                ].map((channel, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${channel.color}-50 to-${channel.color}-100 rounded-lg border-2 border-${channel.color}-200 p-6`}>
                    <div className={`text-${channel.color}-600 mb-4`}>{channel.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">{channel.title}</h4>
                    <ul className="space-y-2">
                      {channel.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className={`text-${channel.color}-600`}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sales Strategy</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-blue-900 mb-4 text-lg">Direct Sales</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Dedicated Sales Team:</strong> Focused on enterprise and government clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Consultative Selling:</strong> Understanding client needs and tailoring solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Live Demonstrations:</strong> Showcasing platform capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Free Trials:</strong> 30-day trial for Pro features</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200 p-6">
                  <h4 className="font-bold text-green-900 mb-4 text-lg">Indirect Sales</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Referral Program:</strong> 20% commission for successful referrals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Partner Network:</strong> Collaboration with business consultants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Integration Partners:</strong> Co-selling with complementary platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Co-Marketing:</strong> Joint campaigns with strategic partners</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200 p-6">
                  <h4 className="font-bold text-purple-900 mb-4 text-lg">Self-Service</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Freemium Model:</strong> Free tier to drive adoption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span><strong>In-App Upgrades:</strong> Seamless upgrade path to paid tiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Automated Onboarding:</strong> Self-guided setup process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Self-Guided Setup:</strong> Interactive tutorials and documentation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Strategy</h3>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Educational Content', items: ['How-to guides for administrative processes', 'Video tutorials on platform features', 'Webinars on business efficiency', 'Blog posts on industry trends'] },
                    { title: 'Social Proof', items: ['Customer success stories', 'Case studies with ROI metrics', 'Video testimonials', 'Provider spotlight features'] },
                    { title: 'Thought Leadership', items: ['Industry reports and whitepapers', 'Expert interviews', 'Market analysis', 'Best practices guides'] },
                    { title: 'Engagement Content', items: ['Interactive tools (ROI calculator)', 'Infographics', 'Social media campaigns', 'Email newsletters'] },
                  ].map((category, index) => (
                    <div key={index} className="bg-white rounded-lg border border-indigo-200 p-4">
                      <h4 className="font-bold text-gray-900 mb-3">{category.title}</h4>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-indigo-600">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Promotional Pricing & Campaigns</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { title: 'Launch Discount', desc: '50% off Pro for first 3 months', period: 'First 100 customers', color: 'blue' },
                  { title: 'Annual Savings', desc: '2 months free with annual plan', period: 'Ongoing', color: 'green' },
                  { title: 'Referral Bonus', desc: '1 month free for each referral', period: 'Ongoing', color: 'purple' },
                  { title: 'Volume Discount', desc: 'Up to 30% off for 10+ users', period: 'Enterprise only', color: 'orange' },
                ].map((promo, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${promo.color}-50 to-${promo.color}-100 rounded-lg border-2 border-${promo.color}-200 p-4 text-center`}>
                    <h4 className="font-bold text-gray-900 mb-2">{promo.title}</h4>
                    <p className="text-sm text-gray-700 mb-2">{promo.desc}</p>
                    <span className={`text-xs bg-${promo.color}-200 text-${promo.color}-800 px-2 py-1 rounded-full`}>{promo.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Operational Plan - COMPREHENSIVE */}
        <section id="operations">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Operational Plan</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Model & Revenue Streams</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                SmartPRO operates on a platform business model that connects service providers with clients seeking administrative and business services. The system relies on multiple revenue streams to ensure sustainability and growth.
              </p>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { title: 'Subscriptions', desc: 'Free, Pro, Enterprise tiers', percentage: '30%', color: 'blue' },
                  { title: 'Commissions', desc: '10-20% per booking', percentage: '36%', color: 'green' },
                  { title: 'AI Features', desc: 'Usage-based pricing', percentage: '14%', color: 'purple' },
                  { title: 'Featured Listings', desc: 'Premium visibility', percentage: '8%', color: 'orange' },
                  { title: 'Integrations', desc: 'Custom enterprise solutions', percentage: '12%', color: 'red' },
                ].map((stream, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${stream.color}-50 to-${stream.color}-100 rounded-lg border-2 border-${stream.color}-200 p-4 text-center`}>
                    <div className={`text-3xl font-bold text-${stream.color}-600 mb-2`}>{stream.percentage}</div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">{stream.title}</h4>
                    <p className="text-xs text-gray-600">{stream.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Operational Processes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'User Onboarding',
                    steps: ['Registration & identity verification', 'Profile creation & customization', 'Service configuration & preferences', 'Platform training & tutorials', 'First booking assistance'],
                    icon: <Users className="w-6 h-6" />,
                    color: 'blue'
                  },
                  {
                    title: 'Service Delivery',
                    steps: ['Service selection & browsing', 'Provider matching algorithm', 'Booking confirmation & scheduling', 'Service execution & tracking', 'Completion & feedback'],
                    icon: <CheckCircle className="w-6 h-6" />,
                    color: 'green'
                  },
                  {
                    title: 'Quality Assurance',
                    steps: ['Provider background checks', 'Performance monitoring & KPIs', 'Review moderation & verification', 'Dispute resolution process', 'Continuous improvement cycles'],
                    icon: <Shield className="w-6 h-6" />,
                    color: 'purple'
                  },
                  {
                    title: 'Customer Support',
                    steps: ['24/7 multi-channel support', 'AI-powered chatbot assistance', 'Comprehensive knowledge base', 'Ticketing system & escalation', 'Proactive outreach & follow-up'],
                    icon: <Award className="w-6 h-6" />,
                    color: 'orange'
                  },
                ].map((process, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${process.color}-50 to-${process.color}-100 rounded-lg border-2 border-${process.color}-200 p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`text-${process.color}-600`}>{process.icon}</div>
                      <h4 className="font-bold text-gray-900 text-lg">{process.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {process.steps.map((step, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className={`w-4 h-4 text-${process.color}-600 flex-shrink-0 mt-0.5`} />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance & Provider Vetting</h3>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200 p-6">
                <div className="grid md:grid-cols-5 gap-4 mb-6">
                  {[
                    { step: '1', title: 'Application', desc: 'Submit credentials & documents', icon: '📝' },
                    { step: '2', title: 'Verification', desc: 'Background & credential checks', icon: '🔍' },
                    { step: '3', title: 'Interview', desc: 'Skills assessment & interview', icon: '💬' },
                    { step: '4', title: 'Training', desc: 'Platform onboarding & training', icon: '🎓' },
                    { step: '5', title: 'Monitoring', desc: 'Ongoing performance tracking', icon: '📊' },
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg border border-indigo-200 p-4 text-center">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">Step {item.step}</div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg border border-indigo-200 p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Quality Metrics & Standards</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { metric: 'Min Rating', value: '4.0/5.0', desc: 'Required average' },
                      { metric: 'Response Time', value: '< 2 hours', desc: 'To client inquiries' },
                      { metric: 'Completion Rate', value: '> 95%', desc: 'Successful deliveries' },
                      { metric: 'Dispute Rate', value: '< 2%', desc: 'Maximum allowed' },
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">{item.value}</div>
                        <div className="font-semibold text-gray-900 text-sm">{item.metric}</div>
                        <div className="text-xs text-gray-600">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Infrastructure & Security</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Platform Architecture</h4>
                  <div className="space-y-4">
                    {[
                      { layer: 'Frontend', tech: ['Next.js 14+ framework', 'React 18+ with TypeScript', 'Tailwind CSS styling', 'Mobile apps (iOS/Android)', 'Progressive Web App (PWA)'] },
                      { layer: 'Backend', tech: ['Node.js with Express.js', 'MongoDB database', 'RESTful APIs', 'GraphQL endpoints', 'WebSocket for real-time'] },
                      { layer: 'Infrastructure', tech: ['AWS cloud hosting', 'Auto-scaling groups', 'Load balancing', 'CDN (CloudFront)', '99.9% uptime SLA'] },
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                        <h5 className="font-bold text-gray-900 mb-2">{item.layer}</h5>
                        <ul className="space-y-1">
                          {item.tech.map((t, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                    <Shield className="w-6 h-6 text-red-600" />
                    Security Measures
                  </h4>
                  <div className="space-y-4">
                    {[
                      { category: 'Data Protection', measures: ['End-to-end encryption (AES-256)', 'Encrypted data at rest & in transit', 'Regular security audits', 'GDPR & local compliance', 'Data backup & recovery'] },
                      { category: 'Access Control', measures: ['Multi-factor authentication (MFA)', 'Role-based access control (RBAC)', 'Session management', 'API key authentication', 'OAuth 2.0 integration'] },
                      { category: 'Monitoring', measures: ['24/7 security monitoring', 'Intrusion detection system', 'Regular penetration testing', 'Vulnerability scanning', 'Incident response plan'] },
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-lg border border-red-200 p-4">
                        <h5 className="font-bold text-gray-900 mb-2">{item.category}</h5>
                        <ul className="space-y-1">
                          {item.measures.map((m, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Scalability Planning</h3>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { icon: <TrendingUp className="w-8 h-8" />, title: 'Horizontal Scaling', desc: 'Add more servers as demand grows', items: ['Auto-scaling groups', 'Container orchestration', 'Microservices architecture'] },
                    { icon: <Zap className="w-8 h-8" />, title: 'Load Balancing', desc: 'Distribute traffic efficiently', items: ['Application load balancers', 'Geographic distribution', 'Health checks & failover'] },
                    { icon: <BarChart3 className="w-8 h-8" />, title: 'Caching Strategy', desc: 'Optimize performance', items: ['Redis caching layer', 'CDN for static assets', 'Database query caching'] },
                    { icon: <Shield className="w-8 h-8" />, title: 'Database Sharding', desc: 'Handle massive data growth', items: ['Horizontal partitioning', 'Read replicas', 'Data archiving strategy'] },
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg border border-blue-200 p-4">
                      <div className="text-blue-600 mb-3">{item.icon}</div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 mb-3">{item.desc}</p>
                      <ul className="space-y-1">
                        {item.items.map((i, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                            <span className="text-blue-600">→</span>
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Regional Expansion Roadmap (5 Phases)</h3>
              <div className="space-y-4">
                {[
                  {
                    phase: 'Phase 1',
                    region: 'Oman (MVP)',
                    timeline: 'Months 1-12',
                    goals: ['Launch MVP platform', 'Onboard 100+ service providers', 'Acquire 500+ users', 'Establish brand presence'],
                    milestones: ['Platform launch', 'First 1,000 bookings', 'Government integration', 'Break-even operations'],
                    color: 'blue'
                  },
                  {
                    phase: 'Phase 2',
                    region: 'UAE & Qatar',
                    timeline: 'Months 13-24',
                    goals: ['Enter UAE & Qatar markets', 'Localize for each market', 'Build provider network', 'Establish partnerships'],
                    milestones: ['2 new market launches', '500+ providers', '2,000+ users', 'Regional brand recognition'],
                    color: 'green'
                  },
                  {
                    phase: 'Phase 3',
                    region: 'Saudi Arabia',
                    timeline: 'Months 25-36',
                    goals: ['Enter Saudi market', 'Comply with local regulations', 'Scale operations', 'Enterprise focus'],
                    milestones: ['Saudi launch', '1,000+ providers', '5,000+ users', 'Enterprise contracts'],
                    color: 'purple'
                  },
                  {
                    phase: 'Phase 4',
                    region: 'Kuwait & Bahrain',
                    timeline: 'Months 37-48',
                    goals: ['Complete GCC coverage', 'Standardize operations', 'Optimize processes', 'Market leadership'],
                    milestones: ['Full GCC presence', '2,000+ providers', '10,000+ users', 'Market leader status'],
                    color: 'orange'
                  },
                  {
                    phase: 'Phase 5',
                    region: 'MENA Expansion',
                    timeline: 'Months 49-60',
                    goals: ['Expand to Egypt, Jordan', 'Regional dominance', 'Strategic partnerships', 'Potential acquisition'],
                    milestones: ['MENA presence', '5,000+ providers', '20,000+ users', 'Exit opportunity'],
                    color: 'red'
                  },
                ].map((phase, index) => (
                  <div key={index} className={`bg-gradient-to-r from-${phase.color}-50 to-${phase.color}-100 rounded-lg border-2 border-${phase.color}-200 p-6`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className={`bg-${phase.color}-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2`}>
                          {phase.phase}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">{phase.region}</h4>
                        <p className="text-sm text-gray-600">{phase.timeline}</p>
                      </div>
                      <div className={`text-4xl font-bold text-${phase.color}-600`}>{index + 1}</div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2 text-sm">Strategic Goals</h5>
                        <ul className="space-y-1">
                          {phase.goals.map((goal, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <Target className={`w-3 h-3 text-${phase.color}-600 flex-shrink-0 mt-0.5`} />
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2 text-sm">Key Milestones</h5>
                        <ul className="space-y-1">
                          {phase.milestones.map((milestone, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <CheckCircle className={`w-3 h-3 text-${phase.color}-600 flex-shrink-0 mt-0.5`} />
                              <span>{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnerships & API Ecosystem</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Government Integrations',
                    desc: 'Strategic partnerships with public sector',
                    items: ['Ministry of Commerce', 'Tax Authority', 'Labor Ministry', 'Business Registration', 'Permit Systems'],
                    icon: <Shield className="w-6 h-6" />,
                    color: 'blue'
                  },
                  {
                    title: 'Technology Partners',
                    desc: 'Integration with complementary platforms',
                    items: ['Payment gateways', 'Accounting software', 'CRM systems', 'Communication tools', 'Analytics platforms'],
                    icon: <Zap className="w-6 h-6" />,
                    color: 'green'
                  },
                  {
                    title: 'API Ecosystem',
                    desc: 'Developer-friendly integration options',
                    items: ['Public REST APIs', 'Webhook support', 'OAuth authentication', 'Developer portal', 'API documentation'],
                    icon: <FileText className="w-6 h-6" />,
                    color: 'purple'
                  },
                ].map((partner, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${partner.color}-50 to-${partner.color}-100 rounded-lg border-2 border-${partner.color}-200 p-6`}>
                    <div className={`text-${partner.color}-600 mb-3`}>{partner.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{partner.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{partner.desc}</p>
                    <ul className="space-y-2">
                      {partner.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className={`w-4 h-4 text-${partner.color}-600 flex-shrink-0 mt-0.5`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Organization & Management */}
        <section id="organization">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Organization & Management</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Organizational Structure</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid md:grid-cols-5 gap-4 mb-6">
                  {[
                    { title: 'CEO', desc: 'Strategic direction' },
                    { title: 'CTO', desc: 'Technology strategy' },
                    { title: 'COO', desc: 'Operations management' },
                    { title: 'CFO', desc: 'Financial planning' },
                    { title: 'CMO', desc: 'Marketing strategy' },
                  ].map((role, index) => (
                    <div key={index} className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="font-bold text-blue-900 mb-1">{role.title}</div>
                      <div className="text-xs text-gray-600">{role.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Staffing Plan</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { phase: 'Phase 1 (Launch)', team: '15-20 members', focus: 'Core development & operations' },
                  { phase: 'Phase 2 (Growth)', team: '30-40 members', focus: 'Expansion & scaling' },
                  { phase: 'Phase 3 (Regional)', team: '50-70 members', focus: 'GCC market coverage' },
                ].map((phase, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="font-bold text-gray-900 mb-2">{phase.phase}</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{phase.team}</div>
                    <p className="text-sm text-gray-600">{phase.focus}</p>
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

        {/* Appendices */}
        <section id="appendices">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Appendices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Market Research Data</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-3">Oman Digital Transformation Overview</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Growing internet penetration rate (over 90% of the population)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Increasing smartphone adoption (estimated at 85% of the population)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Government investment in digital infrastructure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Rising adoption of digital services across public and private sectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Supportive policies for entrepreneurship and digital platforms</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Platform Architecture
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Frontend: Next.js-based responsive web application</li>
                    <li>• Backend: Node.js with Express.js API framework</li>
                    <li>• Database: MongoDB for flexible data storage</li>
                    <li>• Authentication: JWT-based secure authentication</li>
                    <li>• Cloud Infrastructure: AWS/Azure with auto-scaling</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Security Measures
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• End-to-end encryption for sensitive data</li>
                    <li>• Regular penetration testing and security audits</li>
                    <li>• GDPR and local data protection compliance</li>
                    <li>• Multi-factor authentication options</li>
                    <li>• Regular security patches and updates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Legal & Regulatory</h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Corporate Structure</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• LLC registered in Oman</li>
                      <li>• Articles of Incorporation</li>
                      <li>• Operating Agreement</li>
                      <li>• Shareholder Agreement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Compliance</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• IT Activities License</li>
                      <li>• Data Protection Compliance</li>
                      <li>• Terms of Service</li>
                      <li>• Privacy Policy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Intellectual Property</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Trademark Registration</li>
                      <li>• Copyright Protection</li>
                      <li>• Software Licensing</li>
                      <li>• Non-Disclosure Agreements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Supporting Materials</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { icon: <FileText className="w-6 h-6" />, title: 'UI/UX Mockups', desc: 'Platform designs' },
                  { icon: <BarChart3 className="w-6 h-6" />, title: 'Market Research', desc: 'Detailed analysis' },
                  { icon: <Users className="w-6 h-6" />, title: 'Team Bios', desc: 'Leadership profiles' },
                  { icon: <Globe className="w-6 h-6" />, title: 'Partnership Docs', desc: 'Agreement templates' },
                ].map((material, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
                    <div className="text-blue-600 mb-2 flex justify-center">{material.icon}</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{material.title}</h4>
                    <p className="text-xs text-gray-600">{material.desc}</p>
                  </div>
                ))}
              </div>
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

