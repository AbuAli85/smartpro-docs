/**
 * Lead Tracking API Client
 * Handles lead progression tracking from consultation → registration
 */

// Use environment variable or fallback to relative path for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');

export enum LeadStage {
  CONSULTATION_SUBMITTED = 'consultation_submitted',
  CONSULTATION_VIEWED = 'consultation_viewed',
  REGISTRATION_STARTED = 'registration_started',
  REGISTRATION_COMPLETED = 'registration_completed',
  PROFILE_COMPLETED = 'profile_completed',
  FIRST_SERVICE_BOOKED = 'first_service_booked',
}

export interface LeadStatus {
  submissionId: string;
  email: string;
  currentStage: string;
  stages: string[];
  progress: number;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrackLeadRequest {
  submissionId: string;
  email: string;
  stage: LeadStage;
  metadata?: Record<string, any>;
}

export interface TrackLeadResponse {
  success: boolean;
  lead?: {
    submissionId: string;
    email: string;
    currentStage: string;
    stages: string[];
    progress: number;
  };
  error?: string;
}

/**
 * Track a lead progression event
 */
export async function trackLead(request: TrackLeadRequest): Promise<TrackLeadResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/leads/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      return {
        success: false,
        error: error.error || 'Failed to track lead',
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error tracking lead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Get lead status by submission ID
 */
export async function getLeadStatus(submissionId: string): Promise<LeadStatus | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/leads/${submissionId}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.success && data.lead) {
      return data.lead;
    }

    return null;
  } catch (error) {
    console.error('Error fetching lead status:', error);
    return null;
  }
}

