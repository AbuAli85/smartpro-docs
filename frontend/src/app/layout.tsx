import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        {/* Suppress Vercel feedback widget console errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = function(...args) {
                  const message = args[0]?.toString() || '';
                  if (
                    message.includes('vercel') ||
                    message.includes('.well-known/vercel') ||
                    message.includes('feedback.js')
                  ) {
                    return; // Suppress Vercel widget errors
                  }
                  originalError.apply(console, args);
                };
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}

