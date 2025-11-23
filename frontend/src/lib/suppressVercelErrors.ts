// Suppress Vercel feedback widget errors
// This runs on the client side to clean up console errors
// Must run as early as possible before Vercel widget loads

if (typeof window !== 'undefined') {
  // Suppress console errors from Vercel feedback widget
  const originalError = console.error;
  console.error = function(...args: any[]) {
    const message = args[0]?.toString() || '';
    const fullMessage = args.map(a => String(a)).join(' ');
    
    // Check for Vercel widget related errors
    if (
      message.includes('vercel') ||
      message.includes('.well-known/vercel') ||
      message.includes('feedback.js') ||
      message.includes('Fetch failed loading') ||
      fullMessage.includes('vercel') ||
      fullMessage.includes('.well-known/vercel') ||
      fullMessage.includes('feedback.js')
    ) {
      return; // Suppress Vercel widget errors silently
    }
    originalError.apply(console, args);
  };

  // Intercept fetch to suppress Vercel widget requests BEFORE they happen
  const originalFetch = window.fetch;
  window.fetch = function(...args: any[]) {
    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request)?.url || '';
    const method = (args[1] as RequestInit)?.method || 'GET';
    
    // Suppress all Vercel widget related requests
    if (
      url.includes('.well-known/vercel') ||
      url.includes('feedback.js') ||
      url.includes('instrument.') ||
      (url.includes('smartpro-docs.vercel.app') && 
       (url.includes('.well-known') || method === 'HEAD'))
    ) {
      // Return a rejected promise that won't log errors
      return Promise.reject(new Error('Suppressed'));
    }
    return originalFetch.apply(this, args).catch((error) => {
      // Suppress fetch errors for Vercel widget
      const errorMessage = error?.message || '';
      if (
        errorMessage.includes('vercel') ||
        errorMessage.includes('.well-known') ||
        errorMessage.includes('feedback')
      ) {
        // Return a silent rejection
        return Promise.reject(new Error('Suppressed'));
      }
      throw error;
    });
  };

  // Also intercept XMLHttpRequest if used
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...rest: any[]) {
    const urlString = typeof url === 'string' ? url : url.toString();
    if (
      urlString.includes('.well-known/vercel') ||
      urlString.includes('feedback.js') ||
      urlString.includes('instrument.')
    ) {
      // Prevent the request
      return;
    }
    return originalXHROpen.apply(this, [method, url, ...rest]);
  };
}

