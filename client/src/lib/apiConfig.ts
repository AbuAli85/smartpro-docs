/**
 * API Configuration
 * Centralized API URL configuration for production and development
 */

/**
 * Get the API base URL
 * - Uses VITE_API_URL if set
 * - In production: falls back to relative path '/api' (works if backend on same domain)
 * - In development: falls back to 'http://localhost:3001/api'
 */
export function getApiBaseUrl(): string {
  // If explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // In production, use relative path (works if backend is on same domain)
  // This allows the frontend to work even if VITE_API_URL is not set
  if (import.meta.env.PROD) {
    return '/api';
  }

  // In development, use localhost
  return 'http://localhost:3001/api';
}

/**
 * Get the full API URL for an endpoint
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  // Remove leading slash from endpoint if baseUrl already ends with /api
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

/**
 * Check if we're in production
 */
export const isProduction = import.meta.env.PROD;

/**
 * Check if we're in development
 */
export const isDevelopment = import.meta.env.DEV;

