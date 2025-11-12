import { TrendingUp, Users, DollarSign, MapPin, Clock, CheckCircle2 } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  change?: string;
  trend?: "up" | "down";
}

const stats: Stat[] = [
  {
    icon: <Users className="w-6 h-6" />,
    value: "10,000+",
    label: "Verified Service Providers",
    change: "+25%",
    trend: "up",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "50,000+",
    label: "Active Organizations",
    change: "+18%",
    trend: "up",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    value: "$50M+",
    label: "Processed Annually",
    change: "+32%",
    trend: "up",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    value: "7",
    label: "Regions Covered",
    change: "100%",
    trend: "up",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    value: "99.9%",
    label: "Uptime SLA",
    change: "Guaranteed",
    trend: "up",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    value: "4.9/5",
    label: "Average Rating",
    change: "98% Satisfaction",
    trend: "up",
  },
];

export default function NetworkStats() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium mb-4 border border-blue-400/30">
            <TrendingUp className="w-4 h-4" />
            <span>Network Growth</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            TheSmartPro.io by the Numbers
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time statistics showing the growth and impact of our platform across Oman and beyond
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-300">
                  {stat.icon}
                </div>
                {stat.change && (
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      stat.trend === "up"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                    {stat.change}
                  </div>
                )}
              </div>
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-slate-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Growth Chart Visualization */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-center">Network Growth Over Time</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { period: "Q1 2024", providers: "6,500", orgs: "35,000" },
              { period: "Q2 2024", providers: "7,200", orgs: "38,000" },
              { period: "Q3 2024", providers: "8,100", orgs: "42,000" },
              { period: "Q4 2024", providers: "10,000+", orgs: "50,000+" },
            ].map((quarter, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <p className="text-sm text-slate-400 mb-3">{quarter.period}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-bold">{quarter.providers}</p>
                    <p className="text-xs text-slate-400">Providers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{quarter.orgs}</p>
                    <p className="text-xs text-slate-400">Organizations</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl text-slate-300 mb-6">
            Join thousands of service providers and organizations already on the platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-started-providers"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Become a Service Provider
            </a>
            <a
              href="/clients"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-semibold text-lg border border-white/20"
            >
              Find Service Providers
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

