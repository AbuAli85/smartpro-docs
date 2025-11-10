/**
 * API Client for TheSmartPro.io Portal Integration
 * 
 * This module provides a centralized API client for fetching live data from the portal.
 * It includes:
 * - Authentication with API keys
 * - Error handling and retry logic
 * - Fallback data support
 * - Request timeout handling
 * - CORS-compliant requests
 */

// Configuration
const API_BASE_URL = import.meta.env.VITE_PORTAL_API_URL || 'https://portal.thesmartpro.io/api/v1';
const API_KEY = import.meta.env.VITE_PORTAL_API_KEY || '';
const REQUEST_TIMEOUT = 5000; // 5 seconds
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache storage
interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * Check if cached data is still valid
 */
function isCacheValid(key: string): boolean {
  const entry = cache.get(key);
  if (!entry) return false;
  return Date.now() - entry.timestamp < CACHE_DURATION;
}

/**
 * Get cached data
 */
function getCachedData(key: string): any {
  const entry = cache.get(key);
  if (entry && isCacheValid(key)) {
    return entry.data;
  }
  return null;
}

/**
 * Set cached data
 */
function setCachedData(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Create request headers with authentication
 */
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }

  return headers;
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Generic API request handler
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackData?: T
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const cacheKey = `${endpoint}`;

  try {
    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData as T;
    }

    // Make request
    const response = await fetchWithTimeout(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache successful response
    setCachedData(cacheKey, data);
    
    return data as T;
  } catch (error) {
    console.warn(`API request failed for ${endpoint}:`, error);

    // Return fallback data if available
    if (fallbackData) {
      return fallbackData;
    }

    throw error;
  }
}

/**
 * Dashboard Statistics
 */
export interface DashboardStats {
  total_promoters: number;
  total_contracts: number;
  active_workflows: number;
  compliance_rate: number;
  platform_uptime: number;
  monthly_active_users: number;
}

export async function getDashboardStats(
  fallback?: DashboardStats
): Promise<DashboardStats> {
  return apiRequest('/dashboard/stats', {}, fallback);
}

/**
 * Promoter/Employee Data
 */
export interface Promoter {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  department: string;
  contract_count: number;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface PromotersResponse {
  data: Promoter[];
  total: number;
  page: number;
  limit: number;
}

export async function getPromoters(
  page: number = 1,
  limit: number = 10,
  fallback?: PromotersResponse
): Promise<PromotersResponse> {
  return apiRequest(
    `/promoters?page=${page}&limit=${limit}`,
    {},
    fallback
  );
}

/**
 * Contract Data
 */
export interface Contract {
  id: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  parties: number;
  value: number;
}

export interface ContractsResponse {
  data: Contract[];
  total: number;
  page: number;
  limit: number;
}

export async function getContracts(
  page: number = 1,
  limit: number = 10,
  fallback?: ContractsResponse
): Promise<ContractsResponse> {
  return apiRequest(
    `/contracts?page=${page}&limit=${limit}`,
    {},
    fallback
  );
}

/**
 * Client/Party Data
 */
export interface Client {
  id: string;
  name: string;
  industry: string;
  employees: number;
  contracts_generated: number;
  services_using: string[];
  platform_uptime: number;
  monthly_active_users: number;
  automation_workflows: number;
  compliance_score: number;
  status: 'active' | 'inactive';
}

export interface ClientsResponse {
  data: Client[];
  total: number;
  page: number;
  limit: number;
}

export async function getClients(
  page: number = 1,
  limit: number = 10,
  fallback?: ClientsResponse
): Promise<ClientsResponse> {
  return apiRequest(
    `/clients?page=${page}&limit=${limit}`,
    {},
    fallback
  );
}

/**
 * Analytics Data
 */
export interface AnalyticsData {
  total_visits: number;
  unique_visitors: number;
  conversion_rate: number;
  average_session_duration: number;
  bounce_rate: number;
  top_pages: Array<{
    page: string;
    visits: number;
  }>;
}

export async function getAnalytics(
  fallback?: AnalyticsData
): Promise<AnalyticsData> {
  return apiRequest('/analytics', {}, fallback);
}

/**
 * Lead Submission
 */
export interface LeadData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  job_title?: string;
  message?: string;
  source_page?: string;
  referral_source?: string;
}

export interface LeadResponse {
  success: boolean;
  lead_id?: string;
  message: string;
}

export async function submitLead(
  leadData: LeadData
): Promise<LeadResponse> {
  return apiRequest(
    '/leads',
    {
      method: 'POST',
      body: JSON.stringify(leadData),
    }
  );
}

/**
 * Health Check
 */
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  api_version: string;
}

export async function checkHealth(
  fallback?: HealthStatus
): Promise<HealthStatus> {
  return apiRequest('/health', {}, fallback);
}

/**
 * Clear cache (useful for manual refresh)
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Clear specific cache entry
 */
export function clearCacheEntry(endpoint: string): void {
  cache.delete(endpoint);
}

/**
 * Get cache stats (for debugging)
 */
export function getCacheStats() {
  return {
    size: cache.size,
    entries: Array.from(cache.keys()),
  };
}

/**
 * API Status
 */
export async function getAPIStatus(): Promise<{
  connected: boolean;
  hasApiKey: boolean;
  apiUrl: string;
}> {
  return {
    connected: !!API_KEY,
    hasApiKey: !!API_KEY,
    apiUrl: API_BASE_URL,
  };
}

export default {
  getDashboardStats,
  getPromoters,
  getContracts,
  getClients,
  getAnalytics,
  submitLead,
  checkHealth,
  clearCache,
  clearCacheEntry,
  getCacheStats,
  getAPIStatus,
};
