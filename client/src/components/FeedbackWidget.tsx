import { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { trackFeedback } from '@/lib/feedbackAnalytics';

interface FeedbackWidgetProps {
  pagePath?: string;
  onFeedback?: (helpful: boolean, pagePath?: string, comment?: string) => void;
  enableAnalytics?: boolean;
}

export default function FeedbackWidget({ pagePath, onFeedback, enableAnalytics = true }: FeedbackWidgetProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const handleFeedback = (helpful: boolean) => {
    if (helpful) {
      // For helpful feedback, submit immediately
      setFeedback('helpful');
      setSubmitted(true);
      
      // Track analytics
      if (enableAnalytics && pagePath) {
        trackFeedback({ helpful: true, pagePath });
      }
      
      if (onFeedback) {
        onFeedback(true, pagePath);
      }
    } else {
      // For not helpful, show comment field
      setFeedback('not-helpful');
      setShowComment(true);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    
    // Track analytics
    if (enableAnalytics && pagePath) {
      trackFeedback({ helpful: false, pagePath, comment });
    }
    
    if (onFeedback) {
      onFeedback(false, pagePath, comment);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-green-800 dark:text-green-200 font-medium">Thank you for your feedback!</p>
        </div>
      </div>
    );
  }

  if (showComment) {
    return (
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            What can we improve?
          </h3>
          <button
            onClick={() => {
              setShowComment(false);
              setFeedback(null);
              setComment('');
            }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close feedback form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Your feedback helps us improve our documentation. Please share what was missing or unclear.
        </p>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us what we can improve..."
          className="mb-4 min-h-[100px] dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
        />
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!comment.trim()}
          >
            Submit Feedback
          </Button>
          <Button
            onClick={() => {
              setShowComment(false);
              setFeedback(null);
              setComment('');
            }}
            variant="outline"
            className="dark:border-slate-700 dark:text-gray-300"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Was this page helpful?</h3>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => handleFeedback(true)}
          variant="outline"
          className="flex items-center gap-2 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-300 dark:hover:border-green-700 dark:border-slate-700 dark:text-gray-300"
          aria-label="Yes, this page was helpful"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Yes</span>
        </Button>
        <Button
          onClick={() => handleFeedback(false)}
          variant="outline"
          className="flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 dark:border-slate-700 dark:text-gray-300"
          aria-label="No, this page was not helpful"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>No</span>
        </Button>
      </div>
    </div>
  );
}

