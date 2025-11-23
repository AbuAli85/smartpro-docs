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
        {/* Suppress Vercel feedback widget errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Suppress console errors from Vercel feedback widget
                const originalError = console.error;
                console.error = function(...args) {
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
                window.fetch = function(...args) {
                  const url = args[0]?.toString() || '';
                  if (
                    url.includes('.well-known/vercel') ||
                    url.includes('feedback.js') ||
                    (url.includes('smartpro-docs.vercel.app') && 
                     (url.includes('.well-known') || args[1]?.method === 'HEAD'))
                  ) {
                    // Return a rejected promise silently
                    return Promise.reject(new Error('Suppressed Vercel widget request'));
                  }
                  return originalFetch.apply(this, args);
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

