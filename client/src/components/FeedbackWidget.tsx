import { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeedbackWidgetProps {
  pagePath?: string;
  onFeedback?: (helpful: boolean, pagePath?: string) => void;
}

export default function FeedbackWidget({ pagePath, onFeedback }: FeedbackWidgetProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (helpful: boolean) => {
    setFeedback(helpful ? 'helpful' : 'not-helpful');
    setSubmitted(true);

    // Call optional callback for analytics
    if (onFeedback) {
      onFeedback(helpful, pagePath);
    }

    // Optional: Send to analytics service
    // Example: trackEvent('docs_feedback', { helpful, page: pagePath });
  };

  if (submitted) {
    return (
      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Thank you for your feedback!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Was this page helpful?</h3>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => handleFeedback(true)}
          variant="outline"
          className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300"
          aria-label="Yes, this page was helpful"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Yes</span>
        </Button>
        <Button
          onClick={() => handleFeedback(false)}
          variant="outline"
          className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300"
          aria-label="No, this page was not helpful"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>No</span>
        </Button>
      </div>
    </div>
  );
}

