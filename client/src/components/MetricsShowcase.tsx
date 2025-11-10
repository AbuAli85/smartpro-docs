import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Zap, DollarSign, Clock, Target } from "lucide-react";

export default function MetricsShowcase() {
  const metrics = [
    {
      icon: <Users className="h-8 w-8" />,
      label: "Active Providers",
      value: "10,247",
      change: "+45% YoY",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      label: "Total Transactions",
      value: "$847M",
      change: "+67% YoY",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      label: "Services Booked",
      value: "847K",
      change: "+52% YoY",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      label: "Avg Response Time",
      value: "2.3s",
      change: "-35% faster",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const benefits = [
    {
      title: "Time Savings",
      stat: "30-40%",
      description: "Reduction in administrative time",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Cost Reduction",
      stat: "25-35%",
      description: "Lower operational costs",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: "Productivity Boost",
      stat: "+180%",
      description: "Increase in team productivity",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Success Rate",
      stat: "94.2%",
      description: "Service completion rate",
      icon: <Target className="h-6 w-6" />,
    },
  ];

  const roi = [
    {
      timeframe: "Month 1",
      investment: "$0",
      savings: "$2,400",
      roi: "∞",
    },
    {
      timeframe: "Month 3",
      investment: "$300",
      savings: "$7,200",
      roi: "2,300%",
    },
    {
      timeframe: "Month 6",
      investment: "$600",
      savings: "$14,400",
      roi: "2,300%",
    },
    {
      timeframe: "Month 12",
      investment: "$1,200",
      savings: "$28,800",
      roi: "2,300%",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Main Metrics */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Impressive Results
            </h2>
            <p className="text-xl text-gray-600">
              See the real impact SmartPRO has on businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${metric.color} p-3 rounded-lg w-fit mb-4 text-white`}>
                  {metric.icon}
                </div>
                <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  {metric.change}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Business Benefits
            </h2>
            <p className="text-xl text-gray-600">
              Measurable improvements across all metrics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-lg w-fit mx-auto mb-4">
                  {benefit.icon}
                </div>
                <p className="text-gray-600 text-sm mb-2">{benefit.title}</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {benefit.stat}
                </p>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* ROI Breakdown */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ROI Over Time
            </h2>
            <p className="text-xl text-gray-600">
              See your investment pay off quickly
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">
                    Timeframe
                  </th>
                  <th className="text-right py-4 px-4 font-bold text-gray-900">
                    Investment
                  </th>
                  <th className="text-right py-4 px-4 font-bold text-gray-900">
                    Savings
                  </th>
                  <th className="text-right py-4 px-4 font-bold text-green-600">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody>
                {roi.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {row.timeframe}
                    </td>
                    <td className="text-right py-4 px-4 text-gray-600">
                      {row.investment}
                    </td>
                    <td className="text-right py-4 px-4 font-semibold text-gray-900">
                      {row.savings}
                    </td>
                    <td className="text-right py-4 px-4 font-bold text-green-600">
                      {row.roi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">$28,800</p>
                <p className="text-blue-100">Annual Savings</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">2,300%</p>
                <p className="text-blue-100">Average ROI</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">3 Months</p>
                <p className="text-blue-100">Payback Period</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
