import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, Calendar, Settings } from "lucide-react";

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const demoTabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Real-time analytics and performance metrics",
      preview: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white">
              <p className="text-sm opacity-80">Revenue</p>
              <p className="text-2xl font-bold">$24,580</p>
              <p className="text-xs opacity-60">+12% this month</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white">
              <p className="text-sm opacity-80">Bookings</p>
              <p className="text-2xl font-bold">1,243</p>
              <p className="text-xs opacity-60">+8% this week</p>
            </div>
          </div>
          <div className="bg-slate-100 h-40 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">Revenue Chart</p>
          </div>
        </div>
      ),
    },
    {
      id: "booking",
      label: "Booking Flow",
      icon: <Calendar className="h-4 w-4" />,
      description: "Seamless service booking experience",
      preview: (
        <div className="space-y-4">
          <div className="bg-slate-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 mb-3">Select Service</p>
            <div className="space-y-2">
              <div className="p-3 bg-white border-2 border-blue-500 rounded-lg cursor-pointer">
                <p className="font-medium">Web Development</p>
                <p className="text-sm text-gray-600">$500 - $2000</p>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400">
                <p className="font-medium">UI/UX Design</p>
                <p className="text-sm text-gray-600">$300 - $1000</p>
              </div>
            </div>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Continue Booking
          </Button>
        </div>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <LineChart className="h-4 w-4" />,
      description: "Deep insights into your business performance",
      preview: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-100 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Completion Rate</p>
              <p className="text-xl font-bold text-gray-900">94.2%</p>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Avg Response</p>
              <p className="text-xl font-bold text-gray-900">2.3s</p>
            </div>
          </div>
          <div className="bg-slate-100 h-32 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">Performance Trends</p>
          </div>
        </div>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      description: "Customize your platform experience",
      preview: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
              <span className="font-medium text-gray-900">Email Notifications</span>
              <div className="w-10 h-6 bg-blue-500 rounded-full flex items-center justify-end pr-1">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
              <span className="font-medium text-gray-900">SMS Alerts</span>
              <div className="w-10 h-6 bg-gray-300 rounded-full flex items-center justify-start pl-1">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
              <span className="font-medium text-gray-900">Auto-Booking</span>
              <div className="w-10 h-6 bg-blue-500 rounded-full flex items-center justify-end pr-1">
                <div className="w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const activeTabData = demoTabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Platform Demo
          </h2>
          <p className="text-xl text-gray-600">
            Explore the key features that make SmartPRO powerful
          </p>
        </div>

        <Card className="overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-none border-b bg-white p-0">
              {demoTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50"
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="p-8">
              {demoTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="m-0">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Description */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {tab.label}
                      </h3>
                      <p className="text-gray-600 mb-6">{tab.description}</p>

                      <div className="space-y-3 mb-8">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-1">
                            ✓
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              Real-time Updates
                            </p>
                            <p className="text-sm text-gray-600">
                              Get instant notifications and live data
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-1">
                            ✓
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              Easy Integration
                            </p>
                            <p className="text-sm text-gray-600">
                              Connect with your existing tools seamlessly
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-1">
                            ✓
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              Advanced Analytics
                            </p>
                            <p className="text-sm text-gray-600">
                              Make data-driven decisions with insights
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                        Try Demo
                      </Button>
                    </div>

                    {/* Preview */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                      {tab.preview}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to experience the full power of SmartPRO?
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
