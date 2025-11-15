import DocsLayout from '@/components/DocsLayout';
import { TrendingUp, Target, Users, DollarSign, Calendar, CheckCircle, ArrowRight, Globe, Zap, Shield, Award, BarChart3, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useEffect, useMemo } from 'react';
import { setSEOTags } from '@/lib/seoUtils';
import TableOfContents from '@/components/TableOfContents';
import { useTOC, TOCIconMap } from '@/hooks/useTOC';

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

  const iconMap: TOCIconMap = useMemo(() => ({
    'executive-summary': <Target className="w-5 h-5" />,
    'company-description': <Users className="w-5 h-5" />,
    'market-analysis': <TrendingUp className="w-5 h-5" />,
    'products-services': <CheckCircle className="w-5 h-5" />,
    'marketing-sales': <Users className="w-5 h-5" />,
    'operations': <Calendar className="w-5 h-5" />,
    'organization': <Users className="w-5 h-5" />,
    'financials': <DollarSign className="w-5 h-5" />,
    'implementation': <Calendar className="w-5 h-5" />,
    'appendices': <CheckCircle className="w-5 h-5" />,
  }), []);

  const sections = useTOC({
    containerId: 'business-plan-content',
    headingLevels: [2, 3],
    iconMap,
  });

  return (
    <DocsLayout pageTitle="SmartPRO Complete Business Plan" breadcrumbs={breadcrumbs} githubPath="client/src/pages/docs/BusinessPlanFull.tsx">
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

        {/* Table of Contents */}
        <TableOfContents sections={sections} title="Table of Contents" />

        <div id="business-plan-content" className="space-y-12">
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

        {/* Market Analysis - COMPREHENSIVE */}
        <section id="market-analysis">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Market Analysis</h2>
          
          <div className="space-y-8">
            {/* Market Sizing: TAM/SAM/SOM */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Sizing: TAM / SAM / SOM</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-8 h-8 text-blue-600" />
                    <h4 className="font-bold text-gray-900 text-lg">TAM</h4>
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">$15B</div>
                  <p className="text-sm text-gray-700 mb-4">Total Addressable Market</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>GCC administrative services market</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>All businesses & service providers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>6 GCC countries, 150K+ SMEs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                    <h4 className="font-bold text-gray-900 text-lg">SAM</h4>
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-2">$3B</div>
                  <p className="text-sm text-gray-700 mb-4">Serviceable Available Market</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Oman, UAE, Qatar initial markets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Digital-ready businesses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>~50K SMEs in target regions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-purple-600" />
                    <h4 className="font-bold text-gray-900 text-lg">SOM</h4>
                  </div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">$150M</div>
                  <p className="text-sm text-gray-700 mb-4">Serviceable Obtainable Market</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>5% market share target (Year 5)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Oman market leadership</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>~2,500 active business clients</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Market Opportunity Details */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Opportunity & Trends</h3>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">$600B+</div>
                    <div className="text-sm text-gray-700">Global Admin Services Market</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">25K+</div>
                    <div className="text-sm text-gray-700">SMEs in Oman</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-600 mb-2">90%+</div>
                    <div className="text-sm text-gray-700">GCC Internet Penetration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">15%</div>
                    <div className="text-sm text-gray-700">Annual Market Growth</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Market Drivers</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {[
                        'Oman Vision 2040 digital transformation initiative',
                        'Growing SME sector and entrepreneurship',
                        'Government push for e-services and digital economy',
                        'Rising labor costs driving automation demand',
                        'COVID-19 accelerated digital adoption',
                      ].map((driver, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{driver}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Market Trends</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {[
                        'Shift from traditional to digital service delivery',
                        'Platform economy growth in GCC region',
                        'Increasing demand for bilingual solutions',
                        'AI and automation adoption in business processes',
                        'Mobile-first approach for business services',
                      ].map((trend, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{trend}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Market Segments - Detailed */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Market Segments</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: <Users className="w-8 h-8" />, 
                    title: 'Small & Medium Enterprises (SMEs)', 
                    size: '25,000+ in Oman',
                    revenue: '$50-100/month ARPU',
                    desc: 'Primary target: businesses lacking dedicated admin departments',
                    needs: ['Administrative support', 'Document processing', 'Government services', 'Compliance management'],
                    color: 'blue' 
                  },
                  { 
                    icon: <Award className="w-8 h-8" />, 
                    title: 'Service Providers & Freelancers', 
                    size: '10,000+ professionals',
                    revenue: '$30-60/month ARPU',
                    desc: 'Supply side: professionals offering administrative services',
                    needs: ['Client acquisition', 'Booking management', 'Payment processing', 'Professional visibility'],
                    color: 'green' 
                  },
                  { 
                    icon: <Shield className="w-8 h-8" />, 
                    title: 'Large Enterprises', 
                    size: '200+ corporations',
                    revenue: '$500-2000/month ARPU',
                    desc: 'Secondary target: corporations seeking process optimization',
                    needs: ['Vendor management', 'Process automation', 'Compliance tracking', 'Cost optimization'],
                    color: 'purple' 
                  },
                  { 
                    icon: <Globe className="w-8 h-8" />, 
                    title: 'Government Entities', 
                    size: '50+ ministries/agencies',
                    revenue: 'Custom enterprise pricing',
                    desc: 'Strategic partnerships for digital transformation',
                    needs: ['Service digitization', 'Citizen services', 'Process efficiency', 'Data management'],
                    color: 'orange' 
                  },
                ].map((segment, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${segment.color}-50 to-${segment.color}-100 rounded-lg border-2 border-${segment.color}-200 p-6`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`text-${segment.color}-600`}>{segment.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{segment.title}</h4>
                        <div className="text-sm text-gray-600 mb-1">{segment.size}</div>
                        <div className="text-xs font-semibold text-gray-700 mb-2">{segment.revenue}</div>
                        <p className="text-sm text-gray-700 mb-3">{segment.desc}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Needs:</h5>
                      <ul className="space-y-1">
                        {segment.needs.map((need, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                            <CheckCircle className={`w-3 h-3 text-${segment.color}-600 flex-shrink-0 mt-0.5`} />
                            <span>{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Landscape */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Competitive Landscape</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                      <th className="text-left px-4 py-3 font-bold">Competitor</th>
                      <th className="text-left px-4 py-3 font-bold">Type</th>
                      <th className="text-left px-4 py-3 font-bold">Strengths</th>
                      <th className="text-left px-4 py-3 font-bold">Weaknesses</th>
                      <th className="text-center px-4 py-3 font-bold">Threat Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: 'Traditional PRO Services',
                        type: 'Offline',
                        strengths: 'Established relationships, local knowledge',
                        weaknesses: 'No digital platform, manual processes, limited scalability',
                        threat: 'Low',
                        color: 'green'
                      },
                      {
                        name: 'General Freelance Platforms',
                        type: 'Global Digital',
                        strengths: 'Large user base, established brand',
                        weaknesses: 'Not localized, no Arabic support, no government integration',
                        threat: 'Medium',
                        color: 'yellow'
                      },
                      {
                        name: 'Regional Service Marketplaces',
                        type: 'Regional Digital',
                        strengths: 'Regional presence, some localization',
                        weaknesses: 'Limited to specific services, no AI features, weak government ties',
                        threat: 'Medium',
                        color: 'yellow'
                      },
                      {
                        name: 'Enterprise Software Vendors',
                        type: 'B2B Software',
                        strengths: 'Comprehensive features, enterprise focus',
                        weaknesses: 'Expensive, complex, not marketplace model, no SME focus',
                        threat: 'Low',
                        color: 'green'
                      },
                    ].map((competitor, index) => (
                      <tr key={index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-4 py-3 font-semibold text-gray-900">{competitor.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{competitor.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{competitor.strengths}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{competitor.weaknesses}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${competitor.color}-100 text-${competitor.color}-800`}>
                            {competitor.threat}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SWOT Analysis */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">SWOT Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 p-6">
                  <h4 className="font-bold text-green-900 mb-4 text-lg flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'First-mover advantage in Omani market',
                      'Bilingual platform (Arabic/English) tailored for GCC',
                      'AI-powered automation and intelligent features',
                      'Government integration and strategic partnerships',
                      'Strong technical foundation and scalable architecture',
                      'Experienced leadership team with regional expertise',
                      'Comprehensive service ecosystem (clients + providers)',
                    ].map((strength, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200 p-6">
                  <h4 className="font-bold text-red-900 mb-4 text-lg flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Weaknesses
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'New brand requiring market awareness building',
                      'Limited initial resources compared to global players',
                      'Dependency on service provider network growth',
                      'Initial geographic limitation (Oman focus)',
                      'Need to establish trust in digital platform',
                      'Requires continuous technology investment',
                      'Regulatory compliance across multiple markets',
                    ].map((weakness, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opportunities */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Opportunities
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Oman Vision 2040 digital transformation initiative',
                      'Growing SME sector and entrepreneurship ecosystem',
                      'Expansion to other GCC countries (UAE, Qatar, Saudi)',
                      'Government partnerships for official services',
                      'Integration with emerging fintech and e-commerce',
                      'White-label SaaS offering for other markets',
                      'AI and automation creating new service categories',
                    ].map((opportunity, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Threats */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 p-6">
                  <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Threats
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Entry of global platforms with significant resources',
                      'Economic fluctuations affecting business spending',
                      'Regulatory changes or policy shifts',
                      'Cybersecurity risks and data privacy concerns',
                      'Resistance to digital transformation from traditional sector',
                      'Competition from well-funded regional startups',
                      'Technology disruption requiring continuous adaptation',
                    ].map((threat, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-purple-600 font-bold">▲</span>
                        <span>{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Competitive Advantages */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">SmartPRO Competitive Advantages</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    icon: <Globe className="w-8 h-8" />, 
                    title: 'Localization Excellence', 
                    desc: 'Bilingual Arabic/English platform specifically designed for GCC business culture and practices',
                    details: ['Native Arabic support', 'Regional payment methods', 'Local compliance built-in', 'Cultural adaptation'],
                    color: 'blue'
                  },
                  { 
                    icon: <Zap className="w-8 h-8" />, 
                    title: 'AI-Powered Innovation', 
                    desc: 'Advanced automation and intelligent features that competitors lack',
                    details: ['Smart matching algorithms', 'Automated workflows', 'Predictive analytics', 'AI chatbot support'],
                    color: 'purple'
                  },
                  { 
                    icon: <Shield className="w-8 h-8" />, 
                    title: 'Government Integration', 
                    desc: 'Strategic partnerships with public sector for seamless official services',
                    details: ['Direct API integration', 'Official service access', 'Compliance automation', 'Verified credentials'],
                    color: 'green'
                  },
                ].map((advantage, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${advantage.color}-50 to-${advantage.color}-100 rounded-lg border-2 border-${advantage.color}-200 p-6 hover:shadow-lg transition-shadow`}>
                    <div className={`text-${advantage.color}-600 mb-4`}>{advantage.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{advantage.title}</h4>
                    <p className="text-sm text-gray-700 mb-4">{advantage.desc}</p>
                    <ul className="space-y-1">
                      {advantage.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                          <CheckCircle className={`w-3 h-3 text-${advantage.color}-600 flex-shrink-0 mt-0.5`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
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

        {/* Organization & Management - COMPREHENSIVE */}
        <section id="organization">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Organization & Management</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Leadership Team</h3>
              <p className="text-gray-700 mb-6">
                SmartPRO is led by an experienced team of professionals with deep expertise in technology, business operations, and regional markets.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    role: 'Chief Executive Officer (CEO)',
                    name: 'Leadership Position',
                    background: '15+ years in technology and business development',
                    expertise: ['Strategic planning & vision', 'Business development', 'Stakeholder management', 'Regional market expertise', 'Government relations'],
                    icon: <Users className="w-8 h-8" />,
                    color: 'blue'
                  },
                  {
                    role: 'Chief Technology Officer (CTO)',
                    name: 'Technology Leadership',
                    background: '12+ years in software engineering and architecture',
                    expertise: ['Platform architecture', 'AI/ML implementation', 'Cloud infrastructure', 'Security & compliance', 'Technical team leadership'],
                    icon: <Zap className="w-8 h-8" />,
                    color: 'purple'
                  },
                  {
                    role: 'Chief Operating Officer (COO)',
                    name: 'Operations Leadership',
                    background: '10+ years in operations and process optimization',
                    expertise: ['Operational excellence', 'Process automation', 'Quality assurance', 'Vendor management', 'Scalability planning'],
                    icon: <CheckCircle className="w-8 h-8" />,
                    color: 'green'
                  },
                  {
                    role: 'Chief Financial Officer (CFO)',
                    name: 'Financial Leadership',
                    background: '12+ years in finance and accounting',
                    expertise: ['Financial planning', 'Investor relations', 'Budget management', 'Compliance & reporting', 'Risk management'],
                    icon: <DollarSign className="w-8 h-8" />,
                    color: 'orange'
                  },
                  {
                    role: 'Chief Marketing Officer (CMO)',
                    name: 'Marketing Leadership',
                    background: '10+ years in digital marketing and brand building',
                    expertise: ['Brand strategy', 'Digital marketing', 'Customer acquisition', 'Content strategy', 'Market research'],
                    icon: <TrendingUp className="w-8 h-8" />,
                    color: 'red'
                  },
                ].map((exec, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${exec.color}-50 to-${exec.color}-100 rounded-lg border-2 border-${exec.color}-200 p-6`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`text-${exec.color}-600`}>{exec.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{exec.role}</h4>
                        <p className="text-sm text-gray-600 mb-2">{exec.background}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Expertise:</h5>
                      <ul className="space-y-1">
                        {exec.expertise.map((skill, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                            <CheckCircle className={`w-3 h-3 text-${exec.color}-600 flex-shrink-0 mt-0.5`} />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advisory Board</h3>
              <p className="text-gray-700 mb-6">
                SmartPRO benefits from guidance by experienced advisors with expertise across technology, business, government, and regional markets.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Technology Advisor',
                    expertise: 'AI & Platform Architecture',
                    background: 'Former CTO at regional tech unicorn',
                    value: ['Technical strategy guidance', 'AI/ML implementation', 'Scalability planning', 'Technology partnerships'],
                    icon: <Zap className="w-6 h-6" />,
                    color: 'blue'
                  },
                  {
                    title: 'Business Strategy Advisor',
                    expertise: 'Market Expansion & Growth',
                    background: '20+ years in GCC business development',
                    value: ['Market entry strategy', 'Partnership development', 'Growth planning', 'Competitive positioning'],
                    icon: <TrendingUp className="w-6 h-6" />,
                    color: 'green'
                  },
                  {
                    title: 'Government Relations Advisor',
                    expertise: 'Public Sector & Compliance',
                    background: 'Former government official',
                    value: ['Regulatory navigation', 'Government partnerships', 'Policy compliance', 'Public sector sales'],
                    icon: <Shield className="w-6 h-6" />,
                    color: 'purple'
                  },
                  {
                    title: 'Financial Advisor',
                    expertise: 'Investment & Fundraising',
                    background: 'Venture capital partner',
                    value: ['Fundraising strategy', 'Investor relations', 'Financial modeling', 'Exit planning'],
                    icon: <DollarSign className="w-6 h-6" />,
                    color: 'orange'
                  },
                  {
                    title: 'Regional Market Advisor',
                    expertise: 'GCC Market Dynamics',
                    background: 'Serial entrepreneur in MENA',
                    value: ['Market insights', 'Cultural adaptation', 'Local partnerships', 'Regional expansion'],
                    icon: <Globe className="w-6 h-6" />,
                    color: 'red'
                  },
                ].map((advisor, index) => (
                  <div key={index} className={`bg-white rounded-lg border-2 border-${advisor.color}-200 p-6 hover:shadow-lg transition-shadow`}>
                    <div className={`text-${advisor.color}-600 mb-3`}>{advisor.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{advisor.title}</h4>
                    <p className="text-sm font-semibold text-gray-700 mb-2">{advisor.expertise}</p>
                    <p className="text-xs text-gray-600 mb-4">{advisor.background}</p>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 text-xs">Advisory Value:</h5>
                      <ul className="space-y-1">
                        {advisor.value.map((item, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                            <span className={`text-${advisor.color}-600`}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Organizational Structure & Departments</h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 p-6">
                <div className="grid md:grid-cols-5 gap-4 mb-6">
                  {[
                    { dept: 'Product Development', team: '15-20', focus: 'Platform & features', color: 'blue' },
                    { dept: 'Operations', team: '12-15', focus: 'Service delivery', color: 'green' },
                    { dept: 'Marketing & Sales', team: '10-12', focus: 'Growth & revenue', color: 'purple' },
                    { dept: 'Customer Support', team: '10-12', focus: 'User satisfaction', color: 'orange' },
                    { dept: 'Finance & Admin', team: '5-8', focus: 'Financial & legal', color: 'red' },
                  ].map((dept, index) => (
                    <div key={index} className={`bg-gradient-to-br from-${dept.color}-50 to-${dept.color}-100 rounded-lg border-2 border-${dept.color}-200 p-4 text-center`}>
                      <h4 className="font-bold text-gray-900 text-sm mb-2">{dept.dept}</h4>
                      <div className={`text-3xl font-bold text-${dept.color}-600 mb-1`}>{dept.team}</div>
                      <p className="text-xs text-gray-600">{dept.focus}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Staffing Growth Plan</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { phase: 'Year 1-2 (Launch)', team: '15-20 members', focus: 'Core platform development and initial operations' },
                      { phase: 'Year 3-4 (Growth)', team: '30-40 members', focus: 'Expansion to new markets and feature development' },
                      { phase: 'Year 5+ (Scale)', team: '50-70 members', focus: 'Full GCC coverage and regional dominance' },
                    ].map((phase, index) => (
                      <div key={index} className="text-center">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">{phase.phase}</h5>
                        <div className="text-2xl font-bold text-blue-600 mb-2">{phase.team}</div>
                        <p className="text-xs text-gray-600">{phase.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Human Resources Plan</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Recruitment Strategy</h4>
                  <ul className="space-y-3">
                    {[
                      { title: 'Local Talent Priority', desc: 'Focus on hiring Omani nationals to support local economy and ensure cultural fit' },
                      { title: 'Technical Expertise', desc: 'Recruit experienced developers, designers, and data scientists from regional tech hubs' },
                      { title: 'Industry Experience', desc: 'Prioritize candidates with background in SaaS, marketplaces, or administrative services' },
                      { title: 'Cultural Fit', desc: 'Assess alignment with company values: integrity, innovation, user-centricity' },
                      { title: 'Growth Potential', desc: 'Hire for potential and provide career development opportunities' },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-900">{item.title}:</span>
                          <span className="text-sm text-gray-700"> {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Training & Development</h4>
                  <ul className="space-y-3">
                    {[
                      { title: 'Comprehensive Onboarding', desc: '2-week program covering platform, processes, and company culture' },
                      { title: 'Technical Training', desc: 'Ongoing education on latest technologies, tools, and best practices' },
                      { title: 'Leadership Development', desc: 'Management training for high-potential employees' },
                      { title: 'Cross-functional Exposure', desc: 'Rotation programs to build understanding across departments' },
                      { title: 'Continuous Learning', desc: 'Budget for courses, conferences, and certifications' },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-900">{item.title}:</span>
                          <span className="text-sm text-gray-700"> {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Compensation & Benefits</h4>
                  <ul className="space-y-3">
                    {[
                      { title: 'Competitive Salaries', desc: 'Market-rate compensation benchmarked against regional tech companies' },
                      { title: 'Performance Bonuses', desc: 'Quarterly and annual bonuses tied to individual and company performance' },
                      { title: 'Equity Options', desc: 'Stock options for key employees to align incentives with company success' },
                      { title: 'Health Insurance', desc: 'Comprehensive medical coverage for employees and dependents' },
                      { title: 'Flexible Work', desc: 'Hybrid work model with remote options and flexible hours' },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-900">{item.title}:</span>
                          <span className="text-sm text-gray-700"> {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Performance Management</h4>
                  <ul className="space-y-3">
                    {[
                      { title: 'Clear Objectives', desc: 'OKRs (Objectives and Key Results) set quarterly for alignment' },
                      { title: 'Regular Check-ins', desc: 'Weekly 1-on-1s and monthly team reviews' },
                      { title: 'Annual Reviews', desc: 'Comprehensive performance evaluations with career planning' },
                      { title: 'Feedback Culture', desc: '360-degree feedback and continuous improvement mindset' },
                      { title: 'Recognition Programs', desc: 'Employee of the month, spot bonuses, and public acknowledgment' },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-900">{item.title}:</span>
                          <span className="text-sm text-gray-700"> {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Support Services</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { service: 'Legal Counsel', provider: 'Regional law firm', focus: ['Corporate law', 'Contracts', 'IP protection', 'Compliance'], icon: <Shield className="w-6 h-6" /> },
                  { service: 'Accounting', provider: 'Big 4 accounting firm', focus: ['Financial audits', 'Tax planning', 'Reporting', 'Compliance'], icon: <DollarSign className="w-6 h-6" /> },
                  { service: 'IT Security', provider: 'Cybersecurity consultants', focus: ['Security audits', 'Penetration testing', 'Compliance', 'Training'], icon: <Shield className="w-6 h-6" /> },
                  { service: 'HR Consulting', provider: 'HR advisory firm', focus: ['Recruitment', 'Policies', 'Compliance', 'Training'], icon: <Users className="w-6 h-6" /> },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="text-blue-600 mb-3">{item.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">{item.service}</h4>
                    <p className="text-xs text-gray-600 mb-3">{item.provider}</p>
                    <ul className="space-y-1">
                      {item.focus.map((f, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                          <span className="text-blue-600">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Company Culture & Communication</h3>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200 p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Core Values in Action</h4>
                    <ul className="space-y-2">
                      {[
                        'Integrity: Transparent communication and ethical decision-making',
                        'Innovation: Encouraging experimentation and creative problem-solving',
                        'User-Centricity: Every decision evaluated through user impact lens',
                        'Collaboration: Cross-functional teamwork and knowledge sharing',
                        'Excellence: High standards and continuous improvement mindset',
                        'Regional Pride: Building solutions that serve and empower the region',
                      ].map((value, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Communication Protocols</h4>
                    <ul className="space-y-2">
                      {[
                        'Weekly all-hands meetings for company updates and alignment',
                        'Monthly town halls with Q&A sessions for transparency',
                        'Quarterly planning sessions with cross-functional collaboration',
                        'Daily standups within teams for coordination',
                        'Slack/Teams for real-time communication and collaboration',
                        'Open-door policy encouraging direct access to leadership',
                      ].map((protocol, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span>{protocol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Plan - COMPREHENSIVE SECTION 8 */}
        <section id="financials">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Financial Plan</h2>
          
          <div className="space-y-8">
            {/* Revenue Model & Streams */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Revenue Model & Streams</h3>
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
            </div>

            {/* 5-Year Financial Projections */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">5-Year Financial Projections</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <th className="text-left px-4 py-3 font-bold">Year</th>
                      <th className="text-right px-4 py-3 font-bold">Revenue</th>
                      <th className="text-right px-4 py-3 font-bold">COGS</th>
                      <th className="text-right px-4 py-3 font-bold">Gross Profit</th>
                      <th className="text-right px-4 py-3 font-bold">Operating Expenses</th>
                      <th className="text-right px-4 py-3 font-bold">Net Income</th>
                      <th className="text-right px-4 py-3 font-bold">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { year: 1, revenue: 200000, cogs: 60000, opex: 460000, net: -320000, margin: '-160%' },
                      { year: 2, revenue: 550000, cogs: 165000, opex: 535000, net: -150000, margin: '-27%' },
                      { year: 3, revenue: 1100000, cogs: 330000, opex: 670000, net: 100000, margin: '9%' },
                      { year: 4, revenue: 1800000, cogs: 540000, opex: 790000, net: 470000, margin: '26%' },
                      { year: 5, revenue: 2500000, cogs: 750000, opex: 950000, net: 800000, margin: '32%' },
                    ].map((row, index) => (
                      <tr key={row.year} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-4 py-3 font-bold text-gray-900">Year {row.year}</td>
                        <td className="px-4 py-3 text-right text-gray-700">${(row.revenue / 1000).toFixed(0)}K</td>
                        <td className="px-4 py-3 text-right text-gray-700">${(row.cogs / 1000).toFixed(0)}K</td>
                        <td className="px-4 py-3 text-right font-semibold text-blue-600">${((row.revenue - row.cogs) / 1000).toFixed(0)}K</td>
                        <td className="px-4 py-3 text-right text-gray-700">${(row.opex / 1000).toFixed(0)}K</td>
                        <td className={`px-4 py-3 text-right font-bold ${row.net < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ${Math.abs(row.net / 1000).toFixed(0)}K
                        </td>
                        <td className={`px-4 py-3 text-right font-semibold ${row.net < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {row.margin}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Financial Metrics */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Financial Metrics</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Startup Investment', value: '$455,000', desc: 'Initial capital required', icon: <DollarSign className="w-8 h-8" />, color: 'blue' },
                  { label: 'Break-even Point', value: 'Q4 Year 2', desc: '~1,000 paying users', icon: <TrendingUp className="w-8 h-8" />, color: 'green' },
                  { label: '5-Year ROI', value: '230%', desc: 'Return on investment', icon: <BarChart3 className="w-8 h-8" />, color: 'purple' },
                  { label: 'Gross Margin', value: '70%', desc: 'Target after COGS', icon: <Award className="w-8 h-8" />, color: 'orange' },
                ].map((metric, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 rounded-lg border-2 border-${metric.color}-200 p-6 text-center hover:shadow-lg transition-shadow`}>
                    <div className={`text-${metric.color}-600 mb-3 flex justify-center`}>{metric.icon}</div>
                    <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                    <div className={`text-3xl font-bold text-${metric.color}-600 mb-2`}>{metric.value}</div>
                    <div className="text-xs text-gray-600">{metric.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Requirements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Funding Requirements & Use of Funds</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Initial Investment Breakdown</h4>
                  <div className="space-y-3">
                    {[
                      { category: 'Platform Development', amount: '$180,000', percentage: '40%', desc: 'Full-stack development, UI/UX, testing' },
                      { category: 'Marketing & Launch', amount: '$90,000', percentage: '20%', desc: 'Brand building, campaigns, PR' },
                      { category: 'Operations Setup', amount: '$70,000', percentage: '15%', desc: 'Office, equipment, infrastructure' },
                      { category: 'Team Salaries (6 months)', amount: '$90,000', percentage: '20%', desc: 'Core team compensation' },
                      { category: 'Legal & Compliance', amount: '$25,000', percentage: '5%', desc: 'Registration, licenses, contracts' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start justify-between pb-3 border-b border-green-200 last:border-0">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{item.category}</div>
                          <div className="text-xs text-gray-600">{item.desc}</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-bold text-green-600">{item.amount}</div>
                          <div className="text-xs text-gray-600">{item.percentage}</div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t-2 border-green-300 flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total Required:</span>
                      <span className="text-2xl font-bold text-green-600">$455,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Funding Strategy</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg border border-blue-200 p-4">
                      <h5 className="font-bold text-blue-900 mb-2">Seed Round ($455K)</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Angel investors and regional VCs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>12-18 month runway to MVP and initial traction</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Equity: 15-20% for seed investors</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg border border-blue-200 p-4">
                      <h5 className="font-bold text-blue-900 mb-2">Series A ($2-3M) - Year 2</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Scale operations and expand to UAE/Qatar</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Enhance platform features and AI capabilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Build regional team and infrastructure</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg border border-blue-200 p-4">
                      <h5 className="font-bold text-blue-900 mb-2">Series B ($5-8M) - Year 4</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Full GCC expansion (Saudi, Kuwait, Bahrain)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Market leadership and potential acquisition</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Flow & Runway */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cash Flow Analysis</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b-2 border-gray-300">
                        <th className="text-left px-4 py-3 font-bold text-gray-900">Quarter</th>
                        <th className="text-right px-4 py-3 font-bold text-gray-900">Cash In</th>
                        <th className="text-right px-4 py-3 font-bold text-gray-900">Cash Out</th>
                        <th className="text-right px-4 py-3 font-bold text-gray-900">Net Cash Flow</th>
                        <th className="text-right px-4 py-3 font-bold text-gray-900">Cash Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { q: 'Q1 Y1', cashIn: 455000, cashOut: 130000, balance: 325000 },
                        { q: 'Q2 Y1', cashIn: 30000, cashOut: 130000, balance: 225000 },
                        { q: 'Q3 Y1', cashIn: 50000, cashOut: 130000, balance: 145000 },
                        { q: 'Q4 Y1', cashIn: 70000, cashOut: 130000, balance: 85000 },
                        { q: 'Q1 Y2', cashIn: 100000, cashOut: 150000, balance: 35000 },
                        { q: 'Q2 Y2', cashIn: 150000, cashOut: 175000, balance: 10000 },
                      ].map((row, index) => {
                        const netCashFlow = row.cashIn - row.cashOut;
                        return (
                          <tr key={row.q} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <td className="px-4 py-3 font-semibold text-gray-900">{row.q}</td>
                            <td className="px-4 py-3 text-right text-green-600">${(row.cashIn / 1000).toFixed(0)}K</td>
                            <td className="px-4 py-3 text-right text-red-600">${(row.cashOut / 1000).toFixed(0)}K</td>
                            <td className={`px-4 py-3 text-right font-semibold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ${Math.abs(netCashFlow / 1000).toFixed(0)}K
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-blue-600">${(row.balance / 1000).toFixed(0)}K</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Cash flow analysis shows the need for Series A funding by Q2 Year 2 to maintain operations and support growth. The company is projected to reach positive cash flow by Q4 Year 2.
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Assumptions */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Financial Assumptions</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Revenue Assumptions',
                    items: [
                      'Average subscription: $49/month',
                      'Commission rate: 15% average',
                      'User growth: 50% YoY',
                      'Conversion rate: 5% free to paid',
                      'Churn rate: 3% monthly',
                    ],
                    color: 'blue'
                  },
                  {
                    title: 'Cost Assumptions',
                    items: [
                      'COGS: 30% of revenue',
                      'Cloud hosting: $5K-20K/month',
                      'Team growth: 10-15 new hires/year',
                      'Marketing: 25% of revenue',
                      'R&D: 20% of revenue',
                    ],
                    color: 'orange'
                  },
                  {
                    title: 'Growth Assumptions',
                    items: [
                      'Market penetration: 2% by Year 5',
                      'Provider network: 2,000+ by Year 5',
                      'Active users: 10,000+ by Year 5',
                      'GCC expansion: 3 markets by Year 4',
                      'Enterprise contracts: 50+ by Year 5',
                    ],
                    color: 'green'
                  },
                ].map((section, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${section.color}-50 to-${section.color}-100 rounded-lg border-2 border-${section.color}-200 p-6`}>
                    <h4 className="font-bold text-gray-900 mb-4">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className={`w-4 h-4 text-${section.color}-600 flex-shrink-0 mt-0.5`} />
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

        {/* Implementation Timeline - COMPREHENSIVE */}
        <section id="implementation">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Implementation Plan & Timeline</h2>
          
          <div className="space-y-8">
            {/* Implementation Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">36-Month Implementation Roadmap</h3>
              <p className="text-gray-700 mb-6">
                SmartPRO's implementation follows a phased approach over 36 months, from initial development to full GCC market coverage. Each phase includes specific milestones, resource allocation, and budget requirements.
              </p>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { phase: 'Phase 1', duration: '6 months', focus: 'Development', budget: '$180K', team: '8-10' },
                  { phase: 'Phase 2', duration: '6 months', focus: 'MVP Launch', budget: '$140K', team: '12-15' },
                  { phase: 'Phase 3', duration: '6 months', focus: 'Enhancement', budget: '$160K', team: '18-20' },
                  { phase: 'Phase 4', duration: '6 months', focus: 'Expansion Prep', budget: '$180K', team: '25-30' },
                  { phase: 'Phase 5', duration: '12 months', focus: 'GCC Expansion', budget: '$400K', team: '40-50' },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg border border-blue-200 p-4 text-center">
                    <div className="font-bold text-blue-900 mb-2">{item.phase}</div>
                    <div className="text-xs text-gray-600 mb-1">{item.duration}</div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">{item.focus}</div>
                    <div className="text-xs text-gray-600 mb-1">Budget: {item.budget}</div>
                    <div className="text-xs text-gray-600">Team: {item.team}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Phase Breakdown */}
            {[
              {
                phase: 'Phase 1',
                title: 'Platform Development & Foundation',
                timeline: 'Months 1-6',
                budget: '$180,000',
                team: '8-10 members',
                objectives: ['Build MVP platform', 'Establish technical foundation', 'Create core features', 'Prepare for beta launch'],
                milestones: [
                  { month: 'Month 1', task: 'Requirements gathering & planning', owner: 'Product Team', status: 'Planning' },
                  { month: 'Month 2', task: 'Architecture design & tech stack finalization', owner: 'CTO', status: 'Planning' },
                  { month: 'Month 3-4', task: 'Core platform development (frontend/backend)', owner: 'Dev Team', status: 'Development' },
                  { month: 'Month 5', task: 'Internal testing & QA', owner: 'QA Team', status: 'Testing' },
                  { month: 'Month 6', task: 'Security audit & performance optimization', owner: 'Security Team', status: 'Review' },
                ],
                resources: [
                  { role: 'Full-stack Developers', count: '4', cost: '$80K' },
                  { role: 'UI/UX Designer', count: '1', cost: '$15K' },
                  { role: 'Product Manager', count: '1', cost: '$18K' },
                  { role: 'QA Engineer', count: '1', cost: '$12K' },
                  { role: 'DevOps Engineer', count: '1', cost: '$15K' },
                  { role: 'Infrastructure & Tools', count: '-', cost: '$40K' },
                ],
                color: 'blue'
              },
              {
                phase: 'Phase 2',
                title: 'MVP Launch & Market Entry',
                timeline: 'Months 7-12',
                budget: '$140,000',
                team: '12-15 members',
                objectives: ['Launch beta in Oman', 'Onboard initial providers', 'Acquire first 500 users', 'Validate product-market fit'],
                milestones: [
                  { month: 'Month 7', task: 'Beta launch with 50 early adopters', owner: 'Product Team', status: 'Launch' },
                  { month: 'Month 8', task: 'Provider onboarding (target: 100 providers)', owner: 'Operations', status: 'Execution' },
                  { month: 'Month 9', task: 'Marketing campaign launch', owner: 'Marketing', status: 'Execution' },
                  { month: 'Month 10', task: 'Official public launch in Oman', owner: 'CEO', status: 'Launch' },
                  { month: 'Month 11', task: 'Feature iteration based on feedback', owner: 'Product Team', status: 'Development' },
                  { month: 'Month 12', task: 'Achieve 500 active users milestone', owner: 'Growth Team', status: 'Target' },
                ],
                resources: [
                  { role: 'Development Team', count: '5', cost: '$50K' },
                  { role: 'Marketing Team', count: '3', cost: '$30K' },
                  { role: 'Operations Team', count: '2', cost: '$18K' },
                  { role: 'Customer Support', count: '2', cost: '$12K' },
                  { role: 'Marketing Budget', count: '-', cost: '$30K' },
                ],
                color: 'green'
              },
              {
                phase: 'Phase 3',
                title: 'Feature Enhancement & Growth',
                timeline: 'Months 13-18',
                budget: '$160,000',
                team: '18-20 members',
                objectives: ['Develop advanced features', 'Launch mobile apps', 'Scale to 2,000 users', 'Achieve break-even'],
                milestones: [
                  { month: 'Month 13-14', task: 'AI features development (chatbot, matching)', owner: 'AI Team', status: 'Development' },
                  { month: 'Month 15', task: 'Mobile apps launch (iOS/Android)', owner: 'Mobile Team', status: 'Launch' },
                  { month: 'Month 16', task: 'Service category expansion', owner: 'Operations', status: 'Expansion' },
                  { month: 'Month 17', task: 'Performance optimization & scaling', owner: 'DevOps', status: 'Optimization' },
                  { month: 'Month 18', task: 'Reach 2,000 active users', owner: 'Growth Team', status: 'Target' },
                ],
                resources: [
                  { role: 'Development Team', count: '8', cost: '$80K' },
                  { role: 'AI/ML Engineers', count: '2', cost: '$25K' },
                  { role: 'Mobile Developers', count: '2', cost: '$20K' },
                  { role: 'Marketing & Sales', count: '4', cost: '$25K' },
                  { role: 'Infrastructure & Tools', count: '-', cost: '$10K' },
                ],
                color: 'purple'
              },
              {
                phase: 'Phase 4',
                title: 'Regional Expansion Preparation',
                timeline: 'Months 19-24',
                budget: '$180,000',
                team: '25-30 members',
                objectives: ['Prepare for UAE/Qatar entry', 'Establish partnerships', 'Achieve profitability', 'Raise Series A'],
                milestones: [
                  { month: 'Month 19', task: 'Market research for UAE/Qatar', owner: 'Strategy Team', status: 'Research' },
                  { month: 'Month 20', task: 'Regulatory compliance & licensing', owner: 'Legal Team', status: 'Compliance' },
                  { month: 'Month 21', task: 'Platform localization for new markets', owner: 'Product Team', status: 'Development' },
                  { month: 'Month 22', task: 'Team expansion & hiring', owner: 'HR', status: 'Hiring' },
                  { month: 'Month 23', task: 'Series A fundraising ($2-3M)', owner: 'CEO/CFO', status: 'Fundraising' },
                  { month: 'Month 24', task: 'Achieve profitability milestone', owner: 'CFO', status: 'Target' },
                ],
                resources: [
                  { role: 'Development Team', count: '10', cost: '$100K' },
                  { role: 'Regional Managers', count: '3', cost: '$30K' },
                  { role: 'Legal & Compliance', count: '2', cost: '$15K' },
                  { role: 'Sales Team', count: '4', cost: '$25K' },
                  { role: 'Expansion Budget', count: '-', cost: '$10K' },
                ],
                color: 'orange'
              },
              {
                phase: 'Phase 5',
                title: 'GCC Market Expansion',
                timeline: 'Months 25-36',
                budget: '$400,000',
                team: '40-50 members',
                objectives: ['Launch in UAE & Qatar', 'Enter Saudi Arabia', 'Achieve regional leadership', 'Prepare for Series B'],
                milestones: [
                  { month: 'Month 25-26', task: 'UAE market launch', owner: 'UAE Team', status: 'Launch' },
                  { month: 'Month 27-28', task: 'Qatar market launch', owner: 'Qatar Team', status: 'Launch' },
                  { month: 'Month 29-30', task: 'Saudi Arabia market entry', owner: 'Saudi Team', status: 'Launch' },
                  { month: 'Month 31-32', task: 'Regional office establishment', owner: 'Operations', status: 'Expansion' },
                  { month: 'Month 33-34', task: 'Provider network expansion (2,000+)', owner: 'Operations', status: 'Growth' },
                  { month: 'Month 35-36', task: 'Series B preparation & regional leadership', owner: 'CEO/CFO', status: 'Strategy' },
                ],
                resources: [
                  { role: 'Development Team', count: '15', cost: '$150K' },
                  { role: 'Regional Teams (3 markets)', count: '12', cost: '$120K' },
                  { role: 'Marketing & Sales', count: '10', cost: '$80K' },
                  { role: 'Operations & Support', count: '8', cost: '$40K' },
                  { role: 'Infrastructure & Expansion', count: '-', cost: '$10K' },
                ],
                color: 'red'
              },
            ].map((phase, index) => (
              <div key={index} className={`bg-gradient-to-br from-${phase.color}-50 to-${phase.color}-100 rounded-lg border-2 border-${phase.color}-200 p-6`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`text-sm font-bold text-${phase.color}-600 mb-1`}>{phase.phase}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {phase.timeline}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Budget: {phase.budget}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Team: {phase.team}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Phase Objectives</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {phase.objectives.map((objective, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <Target className={`w-4 h-4 text-${phase.color}-600 flex-shrink-0 mt-0.5`} />
                        <span>{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Milestones */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Detailed Milestones</h4>
                  <div className="space-y-2">
                    {phase.milestones.map((milestone, idx) => (
                      <div key={idx} className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-bold text-${phase.color}-600 bg-${phase.color}-100 px-2 py-1 rounded`}>
                              {milestone.month}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">{milestone.task}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-600">{milestone.owner}</span>
                          <span className={`text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded`}>
                            {milestone.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resource Allocation */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Resource Allocation</h4>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      {phase.resources.map((resource, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{resource.role} {resource.count !== '-' && `(${resource.count})`}</span>
                          <span className="font-semibold text-gray-900">{resource.cost}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                      <span className="font-bold text-gray-900">Phase Total:</span>
                      <span className={`text-xl font-bold text-${phase.color}-600`}>{phase.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Critical Success Factors */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Critical Success Factors</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Technical Excellence', factors: ['Robust architecture', 'Scalable infrastructure', 'Security & compliance', 'Performance optimization'], icon: <Zap className="w-6 h-6" />, color: 'blue' },
                  { title: 'Market Execution', factors: ['Provider network growth', 'User acquisition & retention', 'Brand awareness', 'Strategic partnerships'], icon: <TrendingUp className="w-6 h-6" />, color: 'green' },
                  { title: 'Financial Management', factors: ['Budget discipline', 'Fundraising success', 'Cash flow management', 'Path to profitability'], icon: <DollarSign className="w-6 h-6" />, color: 'purple' },
                ].map((factor, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${factor.color}-50 to-${factor.color}-100 rounded-lg border-2 border-${factor.color}-200 p-6`}>
                    <div className={`text-${factor.color}-600 mb-3`}>{factor.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-3">{factor.title}</h4>
                    <ul className="space-y-2">
                      {factor.factors.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className={`w-4 h-4 text-${factor.color}-600 flex-shrink-0 mt-0.5`} />
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

        {/* Appendices - COMPREHENSIVE */}
        <section id="appendices">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Appendices & Supporting Documents</h2>
          
          <div className="space-y-8">
            {/* Market Research Data */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">A. Market Research & Data</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Oman Digital Transformation Overview
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Internet penetration: 90%+ of population</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Smartphone adoption: 85%+ of population</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Government digital investment: $2B+ (2020-2025)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>E-commerce growth: 25% CAGR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Digital payment adoption: 60%+ of transactions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg border-2 border-green-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    GCC Market Statistics
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Total SMEs in GCC: 150,000+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Digital services market: $15B+ (2024)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Market growth rate: 15% annually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Freelance workforce: 500,000+ professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Government digital initiatives: Active in all 6 countries</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Documentation */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">B. Technical Specifications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Platform Architecture
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <strong>Frontend Stack:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• Next.js 14+ (React 18+, TypeScript)</li>
                        <li>• Tailwind CSS for styling</li>
                        <li>• Progressive Web App (PWA) support</li>
                        <li>• Mobile-responsive design</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Backend Stack:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• Node.js with Express.js</li>
                        <li>• MongoDB (NoSQL database)</li>
                        <li>• RESTful APIs + GraphQL</li>
                        <li>• WebSocket for real-time features</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Infrastructure:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• AWS/Azure cloud hosting</li>
                        <li>• Auto-scaling & load balancing</li>
                        <li>• CDN (CloudFront/Azure CDN)</li>
                        <li>• 99.9% uptime SLA</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-2 border-red-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Security & Compliance
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <strong>Data Protection:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• AES-256 encryption at rest</li>
                        <li>• TLS 1.3 for data in transit</li>
                        <li>• GDPR compliance</li>
                        <li>• Regular data backups</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Access Control:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• Multi-factor authentication (MFA)</li>
                        <li>• Role-based access control (RBAC)</li>
                        <li>• JWT token authentication</li>
                        <li>• OAuth 2.0 integration</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Monitoring:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• 24/7 security monitoring</li>
                        <li>• Intrusion detection system</li>
                        <li>• Regular penetration testing</li>
                        <li>• Incident response plan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal & Regulatory */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">C. Legal & Regulatory Framework</h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Corporate Structure</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>LLC registered in Oman</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Articles of Incorporation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Operating Agreement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Shareholder Agreement</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Licenses & Compliance</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>IT Activities License</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Data Protection Compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Terms of Service</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Privacy Policy</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Intellectual Property</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Trademark Registration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Copyright Protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Software Licensing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Non-Disclosure Agreements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Documents */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">D. Sample Agreements & Templates</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Service Provider Agreement (Sample)</h4>
                  <div className="bg-gray-50 rounded p-4 text-xs text-gray-700 font-mono">
                    <p className="font-bold mb-2">SERVICE PROVIDER AGREEMENT</p>
                    <p className="mb-2">This Agreement is entered into between SmartPRO LLC ("Platform") and the Service Provider ("Provider").</p>
                    <p className="mb-2">1. SERVICES: Provider agrees to offer professional services through the SmartPRO platform.</p>
                    <p className="mb-2">2. COMMISSION: Platform charges 15% commission on completed bookings.</p>
                    <p className="mb-2">3. QUALITY STANDARDS: Provider maintains minimum 4.0/5.0 rating.</p>
                    <p className="mb-2">4. COMPLIANCE: Provider complies with all local regulations and licensing requirements.</p>
                    <p className="text-gray-500">[Full agreement available upon request]</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border-2 border-green-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Client Terms of Service (Sample)</h4>
                  <div className="bg-gray-50 rounded p-4 text-xs text-gray-700 font-mono">
                    <p className="font-bold mb-2">CLIENT TERMS OF SERVICE</p>
                    <p className="mb-2">By using SmartPRO, you agree to the following terms:</p>
                    <p className="mb-2">1. ACCOUNT: You are responsible for maintaining account security.</p>
                    <p className="mb-2">2. BOOKINGS: All bookings are subject to provider availability and acceptance.</p>
                    <p className="mb-2">3. PAYMENTS: Payments are processed securely through our payment partners.</p>
                    <p className="mb-2">4. DISPUTES: Any disputes are resolved through our mediation process.</p>
                    <p className="text-gray-500">[Full terms available on platform]</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Materials */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">E. Supporting Materials & Resources</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { icon: <FileText className="w-8 h-8" />, title: 'UI/UX Mockups', desc: 'Complete platform designs', status: 'Available', color: 'blue' },
                  { icon: <BarChart3 className="w-8 h-8" />, title: 'Market Research', desc: 'Detailed market analysis reports', status: 'Available', color: 'green' },
                  { icon: <Users className="w-8 h-8" />, title: 'Team Bios', desc: 'Leadership profiles & CVs', status: 'Available', color: 'purple' },
                  { icon: <Globe className="w-8 h-8" />, title: 'Partnership Docs', desc: 'Agreement templates & LOIs', status: 'Available', color: 'orange' },
                  { icon: <Shield className="w-8 h-8" />, title: 'Security Audit', desc: 'Third-party security assessment', status: 'Pending', color: 'red' },
                  { icon: <Award className="w-8 h-8" />, title: 'Certifications', desc: 'ISO & compliance certificates', status: 'In Progress', color: 'indigo' },
                  { icon: <TrendingUp className="w-8 h-8" />, title: 'Financial Models', desc: 'Detailed Excel projections', status: 'Available', color: 'pink' },
                  { icon: <FileText className="w-8 h-8" />, title: 'Pitch Deck', desc: 'Investor presentation slides', status: 'Available', color: 'teal' },
                ].map((material, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${material.color}-50 to-${material.color}-100 rounded-lg border-2 border-${material.color}-200 p-4 text-center hover:shadow-lg transition-shadow`}>
                    <div className={`text-${material.color}-600 mb-3 flex justify-center`}>{material.icon}</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{material.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{material.desc}</p>
                    <span className={`text-xs bg-${material.color}-200 text-${material.color}-800 px-2 py-1 rounded-full`}>
                      {material.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* References & Citations */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">F. References & Citations</h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-gray-900">1.</span>
                    <span>Oman Vision 2040 - Digital Transformation Strategy. Ministry of Technology and Communications, Sultanate of Oman.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-gray-900">2.</span>
                    <span>GCC Digital Economy Report 2024. McKinsey & Company.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-gray-900">3.</span>
                    <span>SME Market Analysis - Middle East. World Bank Group, 2023.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-gray-900">4.</span>
                    <span>Digital Services Platform Market Size & Growth. Statista Research Department, 2024.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-gray-900">5.</span>
                    <span>Freelance Economy in GCC Countries. Oxford Business Group, 2023.</span>
                  </li>
                </ul>
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
    </div>
  </DocsLayout>
  );
}

