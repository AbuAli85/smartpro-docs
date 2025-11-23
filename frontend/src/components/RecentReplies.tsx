'use client';

import { format } from 'date-fns';
import Link from 'next/link';

interface Reply {
  id: string;
  client_name: string;
  client_email: string;
  service_type: string;
  client_replied: boolean;
  provider_replied: boolean;
  timestamp: string;
  client_replied_at?: string;
  provider_replied_at?: string;
  status: string;
}

interface RecentRepliesProps {
  replies?: Reply[];
  loading: boolean;
}

export function RecentReplies({ replies, loading }: RecentRepliesProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  if (!replies || replies.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Replies</h2>
        <p className="text-gray-500 text-center py-8">No recent replies</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Recent Replies</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {replies.slice(0, 5).map((reply) => (
          <Link
            key={reply.id}
            href={`/replies/${reply.id}`}
            className="block p-6 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {reply.client_name || 'Unknown Client'}
                  </h3>
                  <span className="text-xs text-gray-500">{reply.client_email}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{reply.service_type}</p>
                <div className="flex gap-2 mt-2">
                  {reply.client_replied && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Client Replied
                    </span>
                  )}
                  {reply.provider_replied && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Provider Replied
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {format(new Date(reply.timestamp), 'MMM d, yyyy')}
                </p>
                {reply.client_replied_at && (
                  <p className="text-xs text-gray-400 mt-1">
                    Replied: {format(new Date(reply.client_replied_at), 'MMM d')}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 text-center">
        <Link
          href="/replies"
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          View All Replies →
        </Link>
      </div>
    </div>
  );
}

