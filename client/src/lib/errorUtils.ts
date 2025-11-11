/**
 * Error handling utilities
 */

export interface ErrorDetails {
  message: string;
  code?: string;
  statusCode?: number;
  timestamp: string;
  userMessage: string;
}

/**
 * Format error for user display
 */
export function formatErrorForUser(error: unknown): ErrorDetails {
  const timestamp = new Date().toISOString();
  
  if (error instanceof Error) {
    // Check if it's a network error
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return {
        message: error.message,
        timestamp,
        userMessage: 'Unable to connect to the server. Please check your internet connection and try again.'
      };
    }

    // Check if it's a validation error
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return {
        message: error.message,
        timestamp,
        userMessage: 'The information provided is invalid. Please check your input and try again.'
      };
    }

    // Check if it's an authentication error
    if (error.message.includes('auth') || error.message.includes('unauthorized')) {
      return {
        message: error.message,
        timestamp,
        statusCode: 401,
        userMessage: 'You need to be logged in to perform this action.'
      };
    }

    // Generic error
    return {
      message: error.message,
      timestamp,
      userMessage: 'An unexpected error occurred. Our team has been notified and is working on it.'
    };
  }

  // Unknown error type
  return {
    message: String(error),
    timestamp,
    userMessage: 'Something went wrong. Please try again later.'
  };
}

/**
 * Log error to console (and potentially to error tracking service)
 */
export function logError(error: unknown, context?: Record<string, any>): void {
  const errorDetails = formatErrorForUser(error);
  
  console.error('Error occurred:', {
    ...errorDetails,
    context,
    stack: error instanceof Error ? error.stack : undefined
  });

  // In production, you could send this to an error tracking service like Sentry
  if (import.meta.env.PROD) {
    // Example: Send to error tracking service
    // sendToErrorTracking(errorDetails, context);
  }
}

/**
 * Handle async errors with proper error messages
 */
export async function handleAsyncError<T>(
  asyncFn: () => Promise<T>,
  errorMessage?: string
): Promise<[T | null, ErrorDetails | null]> {
  try {
    const result = await asyncFn();
    return [result, null];
  } catch (error) {
    const errorDetails = formatErrorForUser(error);
    if (errorMessage) {
      errorDetails.userMessage = errorMessage;
    }
    logError(error);
    return [null, errorDetails];
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Check if error is a specific type
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('fetch') || 
           error.message.includes('network') ||
           error.message.includes('Failed to fetch');
  }
  return false;
}

export function isAuthError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('auth') || 
           error.message.includes('unauthorized') ||
           error.message.includes('401');
  }
  return false;
}

export function isValidationError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('validation') || 
           error.message.includes('invalid') ||
           error.message.includes('required');
  }
  return false;
}

