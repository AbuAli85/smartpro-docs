// Suppress Vercel feedback widget errors
// This runs on the client side to clean up console errors

if (typeof window !== 'undefined') {
  // Suppress console errors from Vercel feedback widget
  const originalError = console.error;
  console.error = function(...args: any[]) {
    const message = args[0]?.toString() || '';
    if (
      message.includes('vercel') ||
      message.includes('.well-known/vercel') ||
      message.includes('feedback.js') ||
      message.includes('Fetch failed loading')
    ) {
      return; // Suppress Vercel widget errors
    }
    originalError.apply(console, args);
  };

  // Intercept fetch to suppress Vercel widget requests
  const originalFetch = window.fetch;
  window.fetch = function(...args: any[]) {
    const url = args[0]?.toString() || '';
    if (
      url.includes('.well-known/vercel') ||
      url.includes('feedback.js') ||
      (url.includes('smartpro-docs.vercel.app') && 
       (url.includes('.well-known') || (args[1] as RequestInit)?.method === 'HEAD'))
    ) {
      // Return a rejected promise silently
      return Promise.reject(new Error('Suppressed Vercel widget request'));
    }
    return originalFetch.apply(this, args);
  };
}

