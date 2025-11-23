'use client';

import { useQuery } from '@tanstack/react-query';
import { ReplyTable } from '@/components/ReplyTable';
import { StatsCards } from '@/components/StatsCards';
import { RecentReplies } from '@/components/RecentReplies';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.get('/analytics').then(res => res.data.data)
  });

  const { data: recentReplies, isLoading: repliesLoading } = useQuery({
    queryKey: ['replies', 'recent'],
    queryFn: () => api.get('/replies?limit=10').then(res => res.data.data)
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Email Reply Dashboard</h1>
        <p className="text-gray-600 mt-2">Track and manage client email replies</p>
      </div>

      <StatsCards data={analytics} loading={analyticsLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentReplies replies={recentReplies} loading={repliesLoading} />
        </div>
        <div className="lg:col-span-1">
          {/* Quick actions or filters */}
        </div>
      </div>
    </div>
  );
}

