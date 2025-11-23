import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../lib/suppressVercelErrors';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Email Reply Tracking - SmartPro',
  description: 'Track and manage client email replies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Suppress Vercel feedback widget errors - Run immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Suppress console errors from Vercel feedback widget
                const originalError = console.error;
                console.error = function(...args) {
                  const message = args[0]?.toString() || '';
                  const fullMessage = args.map(a => String(a)).join(' ');
                  if (
                    message.includes('vercel') ||
                    message.includes('.well-known/vercel') ||
                    message.includes('feedback.js') ||
                    message.includes('Fetch failed loading') ||
                    fullMessage.includes('vercel') ||
                    fullMessage.includes('.well-known/vercel') ||
                    fullMessage.includes('feedback.js')
                  ) {
                    return; // Suppress silently
                  }
                  originalError.apply(console, args);
                };
                
                // Intercept fetch EARLY to suppress Vercel widget requests
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                  const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
                  const method = args[1]?.method || 'GET';
                  if (
                    url.includes('.well-known/vercel') ||
                    url.includes('feedback.js') ||
                    url.includes('instrument.') ||
                    (url.includes('smartpro-docs.vercel.app') && 
                     (url.includes('.well-known') || method === 'HEAD'))
                  ) {
                    return Promise.reject(new Error('Suppressed'));
                  }
                  return originalFetch.apply(this, args).catch(function(error) {
                    const errorMsg = error?.message || '';
                    if (errorMsg.includes('vercel') || errorMsg.includes('.well-known') || errorMsg.includes('feedback')) {
                      return Promise.reject(new Error('Suppressed'));
                    }
                    throw error;
                  });
                };
                
                // Intercept XMLHttpRequest
                const originalXHROpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function(method, url, ...rest) {
                  const urlStr = typeof url === 'string' ? url : url.toString();
                  if (urlStr.includes('.well-known/vercel') || urlStr.includes('feedback.js') || urlStr.includes('instrument.')) {
                    return;
                  }
                  return originalXHROpen.apply(this, [method, url, ...rest]);
                };
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}

