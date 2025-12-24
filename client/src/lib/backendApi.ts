/**
 * Backend API Client
 * Centralized client for communicating with the SmartPro backend API
 */

// Use environment variable or detect based on current domain
// If frontend is on businesshub.thesmartpro.io, use smartpro-docs.vercel.app API
// Otherwise, use relative path or localhost for development
function getApiBaseUrl(): string {
  // If explicitly set via env var, use that
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In development, use localhost
  if (!import.meta.env.PROD) {
    return 'http://localhost:3001/api';
  }
  
  // In production, check current domain
  const currentHost = window.location.hostname;
  
  // If on businesshub domain, use the Vercel API
  if (currentHost.includes('businesshub.thesmartpro.io')) {
    return 'https://smartpro-docs.vercel.app/api';
  }
  
  // If on smartpro-docs domain, use relative path
  if (currentHost.includes('smartpro-docs.vercel.app')) {
    return '/api';
  }
  
  // Default fallback
  return '/api';
}

const API_BASE_URL = getApiBaseUrl();

export interface ApiError {
  error: string;
  message?: string;
  code?: string;
  details?: unknown;
}

/**
 * API request helper with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: 'Request failed',
        message: response.statusText,
      }));

      throw new Error(errorData.message || errorData.error || 'Request failed');
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return {} as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

/**
 * Authentication API
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    return apiRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  getMe: async (): Promise<AuthResponse['user']> => {
    return apiRequest<AuthResponse['user']>('/auth/me', {
      method: 'GET',
    });
  },

  updateProfile: async (data: { name?: string; email?: string }): Promise<AuthResponse['user']> => {
    return apiRequest<AuthResponse['user']>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>('/auth/logout', {
      method: 'POST',
    });
  },
};

/**
 * Notifications API
 */
export interface Notification {
  id: string;
  userId: string;
  type: string;
  priority: string;
  title: string;
  message: string;
  description?: string;
  icon?: string;
  actionUrl?: string;
  actionLabel?: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
}

export interface NotificationFilters {
  limit?: number;
  offset?: number;
  read?: boolean;
  archived?: boolean;
  type?: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  read: number;
  archived: number;
}

export const notificationsApi = {
  getNotifications: async (filters: NotificationFilters = {}): Promise<{
    notifications: Notification[];
    total: number;
  }> => {
    const params = new URLSearchParams();
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.offset) params.append('offset', filters.offset.toString());
    if (filters.read !== undefined) params.append('read', filters.read.toString());
    if (filters.archived !== undefined) params.append('archived', filters.archived.toString());
    if (filters.type) params.append('type', filters.type);

    const query = params.toString();
    return apiRequest(`/notifications${query ? `?${query}` : ''}`, {
      method: 'GET',
    });
  },

  getNotification: async (id: string): Promise<Notification> => {
    return apiRequest<Notification>(`/notifications/${id}`, {
      method: 'GET',
    });
  },

  markAsRead: async (id: string): Promise<Notification> => {
    return apiRequest<Notification>(`/notifications/${id}/read`, {
      method: 'POST',
    });
  },

  archive: async (id: string): Promise<Notification> => {
    return apiRequest<Notification>(`/notifications/${id}/archive`, {
      method: 'POST',
    });
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>(`/notifications/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async (): Promise<NotificationStats> => {
    return apiRequest<NotificationStats>('/notifications/stats', {
      method: 'GET',
    });
  },
};

/**
 * Preferences API
 */
export interface NotificationPreferences {
  userId: string;
  inAppEnabled: boolean;
  emailEnabled: boolean;
  browserPushEnabled: boolean;
  smsEnabled: boolean;
  newMessageEnabled: boolean;
  bookingRequestEnabled: boolean;
  bookingConfirmedEnabled: boolean;
  paymentReceivedEnabled: boolean;
  platformUpdateEnabled: boolean;
  securityAlertEnabled: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  frequency: string;
  soundEnabled: boolean;
  soundVolume: number;
  desktopNotifications: boolean;
  emailDigestEnabled: boolean;
  emailDigestFrequency: string;
}

export const preferencesApi = {
  get: async (): Promise<NotificationPreferences> => {
    return apiRequest<NotificationPreferences>('/preferences', {
      method: 'GET',
    });
  },

  update: async (preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> => {
    return apiRequest<NotificationPreferences>('/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  },

  reset: async (): Promise<NotificationPreferences> => {
    return apiRequest<NotificationPreferences>('/preferences/reset', {
      method: 'POST',
    });
  },
};

/**
 * Consultation Form API
 */
export interface ConsultationFormData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  company?: string;
  businessType?: string;
  services: string[];
  budget?: string;
  timeline?: string;
  preferredContact?: string;
  preferredTime?: string;
  message?: string;
  language: 'en' | 'ar';
}

export interface ConsultationResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  executionId?: string;
  duplicate?: boolean;
  warning?: string;
}

export const consultationApi = {
  submit: async (formData: ConsultationFormData): Promise<ConsultationResponse> => {
    return apiRequest<ConsultationResponse>('/consultation', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};

/**
 * Health check
 */
export const healthCheck = async (): Promise<{
  status: string;
  timestamp: string;
  uptime: number;
}> => {
  const baseUrl = API_BASE_URL.replace('/api', '');
  return fetch(`${baseUrl}/health`)
    .then(res => res.json())
    .catch(() => ({
      status: 'down',
      timestamp: new Date().toISOString(),
      uptime: 0,
    }));
};
