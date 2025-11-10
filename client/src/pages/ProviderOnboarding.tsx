import { useState } from "react";
import { CheckCircle2, DollarSign, TrendingUp, Clock, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";

export default function ProviderOnboarding() {
  const [monthlyRate, setMonthlyRate] = useState(5000);
  const [utilizationRate, setUtilizationRate] = useState(75);
  const [yearsExperience, setYearsExperience] = useState(5);

  const monthlyEarnings = (monthlyRate * utilizationRate) / 100;
  const annualEarnings = monthlyEarnings * 12;
  const platformFee = annualEarnings * 0.2;
  const netEarnings = annualEarnings - platformFee;

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Get Started", href: "/get-started-providers" }, { label: "Provider Onboarding" }]} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Start Earning as a Provider</h1>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals growing their business on TheSmartPro
          </p>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <p className="text-blue-100">Active Providers</p>
            </div>
            <div>
              <div className="text-3xl font-bold">$50M+</div>
              <p className="text-blue-100">Total Earnings</p>
            </div>
            <div>
              <div className="text-3xl font-bold">+180%</div>
              <p className="text-blue-100">Avg Income Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Calculate Your Potential Earnings</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Calculator Input */}
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Monthly Rate: ${monthlyRate.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={monthlyRate}
                  onChange={(e) => setMonthlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$1,000</span>
                  <span>$20,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Utilization Rate: {utilizationRate}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={utilizationRate}
                  onChange={(e) => setUtilizationRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Years of Experience: {yearsExperience}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0 years</span>
                  <span>20+ years</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Your Potential</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-blue-200">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Monthly Earnings</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    ${monthlyEarnings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-blue-200">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Annual Earnings</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    ${annualEarnings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-blue-200">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-orange-600" />
                    <span className="text-gray-700">Platform Fee (20%)</span>
                  </div>
                  <span className="text-lg font-semibold text-orange-600">
                    ${platformFee.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-blue-300 bg-white rounded p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Net Earnings (80%)</span>
                  </div>
                  <span className="text-3xl font-bold text-green-600">
                    ${netEarnings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                Start Earning Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Get Started in 5 Easy Steps</h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: 1,
                title: "Create Account",
                description: "Sign up with your email and basic information",
                icon: Users,
              },
              {
                step: 2,
                title: "Complete Profile",
                description: "Add your skills, experience, and portfolio",
                icon: CheckCircle2,
              },
              {
                step: 3,
                title: "Verification",
                description: "Pass our verification process (2-3 days)",
                icon: Shield,
              },
              {
                step: 4,
                title: "Set Rates",
                description: "Define your pricing and availability",
                icon: DollarSign,
              },
              {
                step: 5,
                title: "Start Earning",
                description: "Receive bookings and grow your business",
                icon: TrendingUp,
              },
            ].map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                    {step}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Requirements */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Verification Requirements</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Identity Verification",
                items: ["Government-issued ID", "Proof of address", "Phone verification"],
              },
              {
                title: "Professional Verification",
                items: ["Portfolio review", "Skills assessment", "Reference checks"],
              },
              {
                title: "Background Check",
                items: ["Criminal record check", "Employment history", "Professional history"],
              },
              {
                title: "Compliance",
                items: ["Tax information", "Payment method", "Terms acceptance"],
              },
            ].map(({ title, items }) => (
              <div key={title} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">{title}</h3>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Providers Love TheSmartPro</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Higher Rates",
                description: "Enterprise clients pay 2-3x more than traditional platforms",
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description: "Payments held in escrow and released upon completion",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                description: "Set your own hours and take on projects that fit your schedule",
              },
              {
                icon: TrendingUp,
                title: "Growth Support",
                description: "Marketing tools and client matching to grow your business",
              },
              {
                icon: Users,
                title: "Professional Network",
                description: "Connect with other professionals and build your reputation",
              },
              {
                icon: CheckCircle2,
                title: "Contract Protection",
                description: "Professional contracts and dispute resolution support",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Icon className="h-8 w-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-blue-100">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Professional Services?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals earning more on TheSmartPro
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Start as a Provider
            </Button>
            <Button variant="outline" className="px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
