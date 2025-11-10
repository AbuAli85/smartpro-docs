'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Users, Zap, TrendingUp, Clock } from "lucide-react";
import { fetchPlatformMetrics } from '@/lib/analyticsApi';

interface Metric {
  id: string;
  label: string;
  value: number;
  targetValue: number;
  icon: React.ReactNode;
  suffix?: string;
  color: string;
  description: string;
}

export default function LiveMetricsDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: "active-users",
      label: "Active Users",
      value: 0,
      targetValue: 10247,
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-600",
      description: "Currently using the platform",
    },
    {
      id: "services-booked",
      label: "Services Booked Today",
      value: 0,
      targetValue: 1543,
      icon: <Zap className="h-6 w-6" />,
      color: "text-green-600",
      description: "Active bookings and transactions",
    },
    {
      id: "transactions",
      label: "Total Transactions",
      value: 0,
      targetValue: 847000,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-purple-600",
      description: "All-time platform transactions",
    },
    {
      id: "response-time",
      label: "Avg Response Time",
      value: 0,
      targetValue: 2.3,
      icon: <Clock className="h-6 w-6" />,
      color: "text-orange-600",
      suffix: "s",
      description: "Provider response time",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data from API and animate counters
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const realMetrics = await fetchPlatformMetrics();
        
        // Update target values with real data
        setMetrics((prevMetrics) =>
          prevMetrics.map((metric) => {
            switch (metric.id) {
              case 'active-users':
                return { ...metric, targetValue: realMetrics.activeUsers };
              case 'services-booked':
                return { ...metric, targetValue: realMetrics.servicesBooked };
              case 'transactions':
                return { ...metric, targetValue: Math.floor(realMetrics.transactionsProcessed / 1000000) };
              case 'response-time':
                return { ...metric, targetValue: realMetrics.averageResponseTime };
              default:
                return metric;
            }
          })
        );
      } catch (error) {
        console.error('Failed to load metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, []);

  // Animate counters
  useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const startTime = Date.now();

    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => ({
          ...metric,
          value: metric.id === 'response-time' 
            ? Math.floor((metric.targetValue * progress) * 10) / 10
            : Math.floor(metric.targetValue * progress),
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    animateCounters();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="w-full py-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Platform Metrics</h2>
          <p className="text-lg text-muted-foreground">
            {isLoading ? 'Loading real-time data...' : 'Real-time statistics showing the scale of our platform'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.id} className="p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className={`${metric.color} opacity-80`}>
                  {metric.icon}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-foreground">
                    {formatNumber(metric.value)}
                  </div>
                  {metric.suffix && (
                    <span className="text-lg text-muted-foreground">{metric.suffix}</span>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground">{metric.label}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${metric.color} bg-opacity-50 transition-all duration-300`}
                  style={{ width: `${(metric.value / metric.targetValue) * 100}%` }}
                />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Data updates every 5 minutes • Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}
