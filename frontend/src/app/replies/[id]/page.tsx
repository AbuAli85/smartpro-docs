'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ReplyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [replyMessage, setReplyMessage] = useState('');

  const { data: conversation, isLoading } = useQuery({
    queryKey: ['conversation', params.id],
    queryFn: () => 
      api.get(`/replies/conversation/${params.id}`).then(res => res.data.data),
    refetchInterval: 10000 // Refresh every 10 seconds
  });

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !conversation) return;

    try {
      await api.post('/webhooks/provider-reply', {
        email: conversation.submission.client_email,
        from: 'provider@smartpro.io',
        message: replyMessage,
        timestamp: new Date().toISOString()
      });
      
      setReplyMessage('');
      // Refetch conversation
      window.location.reload();
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Conversation not found</p>
          <button
            onClick={() => router.push('/replies')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Replies
          </button>
        </div>
      </div>
    );
  }

  const { submission, client_replies, provider_replies } = conversation;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/replies')}
            className="text-indigo-600 hover:text-indigo-800 mb-4"
          >
            ← Back to Replies
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Conversation</h1>
          <div className="mt-2 text-sm text-gray-600">
            <p><strong>Client:</strong> {submission.client_name || 'Unknown'}</p>
            <p><strong>Email:</strong> {submission.client_email}</p>
            <p><strong>Service:</strong> {submission.service_type}</p>
          </div>
        </div>

        {/* Initial Message */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">Initial Submission</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(submission.timestamp), 'MMM d, yyyy HH:mm')}
              </p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
              Initial
            </span>
          </div>
          <p className="text-gray-700 mt-2 whitespace-pre-wrap">
            {submission.initial_message || submission.message || 'No message'}
          </p>
        </div>

        {/* Replies */}
        <div className="space-y-4">
          {/* Client Replies */}
          {client_replies.map((reply: any) => (
            <div key={reply.id} className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Client Reply</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(reply.timestamp), 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Client
                </span>
              </div>
              <p className="text-gray-700 mt-2 whitespace-pre-wrap">{reply.message}</p>
            </div>
          ))}

          {/* Provider Replies */}
          {provider_replies.map((reply: any) => (
            <div key={reply.id} className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Provider Reply</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(reply.timestamp), 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Provider
                </span>
              </div>
              <p className="text-gray-700 mt-2 whitespace-pre-wrap">{reply.message}</p>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Send Provider Reply</h3>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Type your reply here..."
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSendReply}
              disabled={!replyMessage.trim()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

