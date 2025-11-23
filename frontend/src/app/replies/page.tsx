'use client';

import { useQuery } from '@tanstack/react-query';
import { ReplyTable } from '@/components/ReplyTable';
import { StatsCards } from '@/components/StatsCards';
import { api } from '@/lib/api';
import { useState } from 'react';

export default function RepliesPage() {
  const [filters, setFilters] = useState({
    status: '',
    email: ''
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.get('/analytics').then(res => res.data.data),
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const { data: replies, isLoading: repliesLoading, refetch } = useQuery({
    queryKey: ['replies', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.email) params.append('email', filters.email);
      return api.get(`/replies?${params.toString()}`).then(res => res.data.data);
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Replies</h1>
            <p className="text-gray-600 mt-2">Track and manage client email replies</p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <StatsCards data={analytics} loading={analyticsLoading} />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="client_replied">Client Replied</option>
                <option value="provider_replied">Provider Replied</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                placeholder="Filter by email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ status: '', email: '' })}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Replies Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              All Replies ({replies?.length || 0})
            </h2>
          </div>
          {repliesLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-gray-600">Loading replies...</p>
            </div>
          ) : replies && replies.length > 0 ? (
            <ReplyTable replies={replies} />
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No replies found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

