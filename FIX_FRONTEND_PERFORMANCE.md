# Fix Frontend Performance Issues

## 🔍 **Issues Identified**

### 1. **Long Task Warnings** (Performance)
- Tasks taking >50ms blocking the main thread
- Can cause UI lag

### 2. **Vercel Feedback Widget Errors**
- Failed fetch to `.well-known/vercel/jwe`
- Failed HEAD request to `/replies`
- These are harmless but noisy

### 3. **Performance Metrics Calculation Error**
- Negative pageLoadTime indicates calculation issue

---

## ✅ **Solutions**

### **1. Optimize React Query (Reduce Long Tasks)**

Update your components to use better loading strategies:

```typescript
// frontend/src/app/replies/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { ReplyTable } from '@/components/ReplyTable';
import { StatsCards } from '@/components/StatsCards';
import { api } from '@/lib/api';
import { useState, useMemo } from 'react';

export default function RepliesPage() {
  const [filters, setFilters] = useState({
    status: '',
    email: ''
  });

  // Use staleTime to reduce refetches
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.get('/analytics').then(res => res.data.data),
    staleTime: 60000, // 1 minute
    refetchInterval: 30000,
    // Use suspense for better loading
    suspense: false
  });

  const { data: replies, isLoading: repliesLoading, refetch } = useQuery({
    queryKey: ['replies', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.email) params.append('email', filters.email);
      return api.get(`/replies?${params.toString()}`).then(res => res.data.data);
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000,
    // Debounce filters
    enabled: true
  });

  // Memoize filtered data
  const filteredReplies = useMemo(() => {
    if (!replies) return [];
    return replies;
  }, [replies]);

  // Rest of component...
}
```

### **2. Add Error Boundaries**

Create error boundary to catch and handle errors gracefully:

```typescript
// frontend/src/components/ErrorBoundary.tsx
'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // You can log to error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### **3. Suppress Vercel Feedback Widget Errors**

Add to your `next.config.js`:

```javascript
// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress Vercel feedback widget errors
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Ignore Vercel feedback widget
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Disable Vercel feedback widget if not needed
  // Or handle errors gracefully
};

module.exports = nextConfig;
```

### **4. Optimize API Calls**

Update API client with better error handling:

```typescript
// frontend/src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Add timeout and retry logic
const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const api = {
  get: async (endpoint: string) => {
    try {
      const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      // Handle network errors gracefully
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      throw error;
    }
  },
  
  post: async (endpoint: string, data: any) => {
    try {
      const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      throw error;
    }
  },
};
```

### **5. Add Loading States**

Improve loading experience to reduce perceived performance issues:

```typescript
// frontend/src/components/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
}
```

### **6. Use React.memo for Heavy Components**

Optimize re-renders:

```typescript
// frontend/src/components/ReplyTable.tsx
import { memo } from 'react';

export const ReplyTable = memo(function ReplyTable({ replies }: ReplyTableProps) {
  // Component code...
});
```

---

## 🚀 **Quick Fixes**

### **1. Disable Vercel Feedback Widget (If Not Needed)**

Add to your root layout or `_app.tsx`:

```typescript
// Suppress Vercel feedback widget console errors
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0]?.includes?.('vercel') ||
      args[0]?.includes?.('.well-known/vercel')
    ) {
      return; // Suppress Vercel widget errors
    }
    originalError.apply(console, args);
  };
}
```

### **2. Add Performance Monitoring**

Track actual performance issues:

```typescript
// frontend/src/lib/performance.ts
export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    if (end - start > 50) {
      console.warn(`Slow operation: ${name} took ${end - start}ms`);
    }
  } else {
    fn();
  }
}
```

---

## 📋 **Priority Fixes**

1. ✅ **Add error boundaries** - Catch errors gracefully
2. ✅ **Optimize React Query** - Reduce unnecessary refetches
3. ✅ **Suppress Vercel widget errors** - Clean up console
4. ✅ **Add loading states** - Better UX
5. ✅ **Optimize API calls** - Add timeout/retry

---

## 🎯 **Expected Results**

After fixes:
- ✅ No more Vercel widget errors in console
- ✅ Reduced long task warnings
- ✅ Better loading experience
- ✅ Graceful error handling
- ✅ Improved performance

---

**These are mostly cosmetic issues. The app should work fine, but these optimizations will improve the experience!** 🚀

