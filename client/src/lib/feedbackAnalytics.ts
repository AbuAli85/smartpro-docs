/**
 * Feedback Analytics Utility
 * 
 * Provides a centralized way to track documentation feedback for analytics
 * and issue tracking integration.
 * 
 * Usage:
 * ```tsx
 * import { trackFeedback } from '@/lib/feedbackAnalytics';
 * 
 * <FeedbackWidget 
 *   onFeedback={(helpful, pagePath, comment) => {
 *     trackFeedback({ helpful, pagePath, comment });
 *   }}
 * />
 * ```
 */

export interface FeedbackData {
  helpful: boolean;
  pagePath: string;
  comment?: string;
  timestamp?: string;
  userAgent?: string;
  referrer?: string;
}

/**
 * Track feedback event
 * 
 * This function can be extended to send data to:
 * - Google Analytics
 * - Custom analytics endpoint
 * - Issue tracker (GitHub Issues, Jira, etc.)
 * - Database for aggregation
 * 
 * @param data - Feedback data to track
 */
export function trackFeedback(data: FeedbackData): void {
  const feedbackData: FeedbackData = {
    ...data,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
  };

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('[Feedback Analytics]', feedbackData);
  }

  // Example: Send to Google Analytics
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', 'docs_feedback', {
  //     helpful: data.helpful,
  //     page_path: data.pagePath,
  //     has_comment: !!data.comment,
  //   });
  // }

  // Example: Send to custom analytics endpoint
  // fetch('/api/analytics/feedback', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(feedbackData),
  // }).catch(console.error);

  // Example: Create GitHub issue for negative feedback
  // if (!data.helpful && data.comment) {
  //   createGitHubIssue({
  //     title: `Docs Feedback: ${data.pagePath}`,
  //     body: `**Page:** ${data.pagePath}\n\n**Comment:**\n${data.comment}`,
  //     labels: ['documentation', 'feedback'],
  //   });
  // }
}

/**
 * Get feedback statistics (for admin dashboard)
 * 
 * This would typically fetch from your analytics backend
 */
export async function getFeedbackStats(pagePath?: string): Promise<{
  total: number;
  helpful: number;
  notHelpful: number;
  helpfulRate: number;
  comments: Array<{ pagePath: string; comment: string; timestamp: string }>;
}> {
  // Example implementation - replace with actual API call
  // const response = await fetch(`/api/analytics/feedback${pagePath ? `?page=${pagePath}` : ''}`);
  // return response.json();

  return {
    total: 0,
    helpful: 0,
    notHelpful: 0,
    helpfulRate: 0,
    comments: [],
  };
}

/**
 * Create GitHub issue from feedback (optional)
 * 
 * Requires GitHub token and repository configuration
 */
export async function createGitHubIssue(data: {
  title: string;
  body: string;
  labels?: string[];
}): Promise<void> {
  // Example implementation
  // const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  // const REPO = 'AbuAli85/smartpro-docs';
  // 
  // await fetch(`https://api.github.com/repos/${REPO}/issues`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `token ${GITHUB_TOKEN}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     title: data.title,
  //     body: data.body,
  //     labels: data.labels || ['documentation', 'feedback'],
  //   }),
  // });
}

