'use client';

interface StatsCardsProps {
  data?: {
    total_submissions: number;
    total_client_replies: number;
    total_provider_replies: number;
    response_rate: string;
    avg_response_time_hours: string;
  };
  loading: boolean;
}

export function StatsCards({ data, loading }: StatsCardsProps) {
  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-4 gap-4">Loading...</div>;
  }

  const stats = [
    {
      title: 'Total Submissions',
      value: data?.total_submissions || 0,
      icon: '📊',
      color: 'bg-blue-500'
    },
    {
      title: 'Client Replies',
      value: data?.total_client_replies || 0,
      icon: '📧',
      color: 'bg-green-500'
    },
    {
      title: 'Response Rate',
      value: `${data?.response_rate || 0}%`,
      icon: '📈',
      color: 'bg-purple-500'
    },
    {
      title: 'Avg Response Time',
      value: `${data?.avg_response_time_hours || 0}h`,
      icon: '⏱️',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 border-l-4"
          style={{ borderLeftColor: stat.color.replace('bg-', '') }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

