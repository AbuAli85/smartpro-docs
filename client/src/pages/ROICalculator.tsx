import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Clock, Users } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { setSEOTags } from "@/lib/seoUtils";

export default function ROICalculator() {
  useEffect(() => {
    setSEOTags({
      title: "ROI Calculator | TheSmartPro.io - Calculate Your Savings",
      description: "Calculate your organization's ROI with TheSmartPro's professional services platform. Discover potential savings and efficiency gains.",
      keywords: "roi calculator, cost savings, professional services roi, efficiency calculator",
      type: "website",
      url: "https://thesmartpro.io/roi-calculator",
    });
  }, []);
  const [employees, setEmployees] = useState(10);
  const [avgSalary, setAvgSalary] = useState(75000);
  const [utilizationRate, setUtilizationRate] = useState(70);

  // Calculate metrics
  const annualPayroll = employees * avgSalary;
  const utilizationCost = annualPayroll * (utilizationRate / 100);
  const savingsPercentage = 40;
  const annualSavings = utilizationCost * (savingsPercentage / 100);
  const monthlySavings = annualSavings / 12;
  const timePerWeek = (utilizationCost / annualPayroll) * 40 * (savingsPercentage / 100);

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "ROI Calculator" }]} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Calculate Your ROI</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how much your organization can save with TheSmartPro's enterprise professional services platform.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Your Organization Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Employees */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      <Users className="inline h-4 w-4 mr-2" />
                      Number of Employees
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-600">1</span>
                      <span className="text-2xl font-bold text-blue-600">{employees}</span>
                      <span className="text-sm text-gray-600">500</span>
                    </div>
                  </div>

                  {/* Average Salary */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      <DollarSign className="inline h-4 w-4 mr-2" />
                      Average Annual Salary
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">$</span>
                      <input
                        type="range"
                        min="30000"
                        max="200000"
                        step="5000"
                        value={avgSalary}
                        onChange={(e) => setAvgSalary(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-2xl font-bold text-blue-600 w-32 text-right">
                        {(avgSalary / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>

                  {/* Utilization Rate */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      <TrendingUp className="inline h-4 w-4 mr-2" />
                      Current Utilization Rate
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={utilizationRate}
                      onChange={(e) => setUtilizationRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-600">0%</span>
                      <span className="text-2xl font-bold text-blue-600">{utilizationRate}%</span>
                      <span className="text-sm text-gray-600">100%</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">
                      Based on industry benchmarks, TheSmartPro helps organizations achieve <span className="font-bold text-blue-600">40% cost reduction</span> in professional services spending.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Annual Savings Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Annual Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-green-700 mb-1">Total Annual Payroll</p>
                      <p className="text-4xl font-bold text-green-900">
                        ${(annualPayroll / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div className="pt-4 border-t border-green-200">
                      <p className="text-sm text-green-700 mb-1">Potential Annual Savings (40%)</p>
                      <p className="text-5xl font-bold text-green-600">
                        ${(annualSavings / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="pt-4 border-t border-green-200">
                      <p className="text-sm text-green-700 mb-1">Monthly Savings</p>
                      <p className="text-3xl font-bold text-green-700">
                        ${(monthlySavings / 1000).toFixed(1)}K/month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time Savings Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Time Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-blue-700 mb-1">Hours Saved Per Week</p>
                      <p className="text-4xl font-bold text-blue-900">
                        {(timePerWeek * 40).toFixed(0)} hrs
                      </p>
                      <p className="text-sm text-blue-600 mt-2">Per employee per week</p>
                    </div>
                    <div className="pt-4 border-t border-blue-200">
                      <p className="text-sm text-blue-700 mb-1">Total Team Hours Saved</p>
                      <p className="text-3xl font-bold text-blue-700">
                        {(timePerWeek * 40 * employees * 52 / 1000).toFixed(0)}K hrs/year
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ROI Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600 mb-2">Payback Period</p>
                    <p className="text-3xl font-bold text-gray-900">2-3 months</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600 mb-2">Year 1 ROI</p>
                    <p className="text-3xl font-bold text-gray-900">400%+</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How TheSmartPro Delivers Savings</h2>
            <p className="text-xl text-gray-600">Multiple ways to reduce costs and improve efficiency</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Reduce Overhead",
                description: "Access verified professionals on-demand without hiring costs, benefits, or long-term commitments.",
                savings: "25-30%"
              },
              {
                title: "Improve Efficiency",
                description: "Automated workflows, contract management, and project tracking reduce administrative overhead.",
                savings: "10-15%"
              },
              {
                title: "Optimize Utilization",
                description: "Pay only for work completed. No idle time or bench costs. Perfect resource allocation.",
                savings: "5-10%"
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mt-2">{item.savings}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Saving?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Based on your inputs, you could save <span className="font-bold">${(annualSavings / 1000).toFixed(0)}K annually</span> with TheSmartPro
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule a Demo
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
