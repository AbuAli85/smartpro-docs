import { useEffect, useState } from 'react';
import { Users, FileText, Zap, TrendingUp, RefreshCw } from 'lucide-react';
import { getDashboardStats, DashboardStats } from '@/lib/api';

// Fallback data when API is unavailable
const FALLBACK_STATS: DashboardStats = {
  total_promoters: 181,
  total_contracts: 847,
  active_workflows: 12,
  compliance_rate: 66,
  platform_uptime: 99.8,
  monthly_active_users: 156,
};

export default function PlatformStatsWidget() {
  const [stats, setStats] = useState<DashboardStats>(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);
  const [isLiveData, setIsLiveData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats(FALLBACK_STATS);
        setStats(data);
        setIsLiveData(true);
        setError(null);
      } catch (err) {
        console.warn('Failed to fetch live stats, using fallback:', err);
        setStats(FALLBACK_STATS);
        setIsLiveData(false);
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats(FALLBACK_STATS);
      setStats(data);
      setIsLiveData(true);
    } catch (err) {
      console.warn('Refresh failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      label: 'Active Users',
      value: stats.total_promoters,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Contracts Managed',
      value: stats.total_contracts,
      icon: FileText,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Active Workflows',
      value: stats.active_workflows,
      icon: Zap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Compliance Rate',
      value: `${stats.compliance_rate}%`,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="w-full">
      {/* Header with Live Data Badge */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Real-Time Platform Metrics</h3>
        <div className="flex items-center gap-2">
          {isLiveData && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live Data
            </div>
          )}
          {!isLiveData && !loading && (
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              Sample Data
            </div>
          )}
          {loading && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-spin" />
              Loading...
            </div>
          )}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
                  <p className="text-3xl font-bold">
                    {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                  </p>
                </div>
                <div className={`${item.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {error && !isLiveData && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <p className="font-medium">Using sample data</p>
          <p className="text-xs mt-1">Live data will be available once API is configured. {error}</p>
        </div>
      )}

      {/* Info Message */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <p className="font-medium">📊 Live Data Integration</p>
        <p className="text-xs mt-1">
          {isLiveData
            ? 'Metrics are updating in real-time from your portal. Data refreshes every 5 minutes.'
            : 'Metrics are displayed from sample data. Configure your portal API key to see live data.'}
        </p>
      </div>
    </div>
  );
}
