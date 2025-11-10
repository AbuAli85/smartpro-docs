import { ArrowRight, Zap, Shield, Zap as Lightning } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EnterpriseHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        
        {/* Animated Blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full bg-white border border-gray-200 shadow-sm">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">A</div>
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">B</div>
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">C</div>
              </div>
              <span className="text-sm font-medium text-gray-700">Trusted by 181+ Enterprise Clients</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">The Enterprise</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Business Services Hub
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Consolidate 5+ business tools into one unified platform. Manage employees, clients, projects, contracts, and workflows—all in one place. Save 30-40% on costs while boosting productivity by 10-20 hours per week.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6 py-8">
              <div>
                <div className="text-4xl font-bold text-blue-600">181+</div>
                <div className="text-sm text-gray-600 mt-1">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-600">847</div>
                <div className="text-sm text-gray-600 mt-1">Contracts Managed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600">40%</div>
                <div className="text-sm text-gray-600 mt-1">Cost Savings</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg h-14 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Free 14-Day Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg h-14 px-8 rounded-lg"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightning className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative hidden lg:block">
            {/* Floating Card 1 */}
            <div className="absolute top-0 right-0 w-80 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-float">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Automation</div>
                  <div className="text-sm text-gray-500">12+ Workflows</div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute bottom-20 left-0 w-80 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-float animation-delay-2000">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Security</div>
                  <div className="text-sm text-gray-500">Enterprise Grade</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-500 mt-1">Uptime Guarantee</div>
            </div>

            {/* Central Illustration */}
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="text-center z-10">
                <div className="text-6xl mb-4">📊</div>
                <div className="text-2xl font-bold text-gray-900">Complete Business Hub</div>
                <div className="text-gray-600 mt-2">All-in-one solution for modern enterprises</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
