/**
 * Type definitions for Make.com webhook integration
 * These types ensure type safety between frontend and backend
 */

/**
 * Base payload structure expected by Make.com webhook
 * This matches the Make.com flow configuration
 */
export interface MakeWebhookPayload {
  // Required fields for Make.com flow routing
  client_name: string;
  email: string;
  business_name: string;
  service_interested: string;
  notes: string;
  
  // Additional fields for enhanced processing
  phone?: string;
  business_type?: string;
  services?: string;
  budget?: string;
  timeline?: string;
  preferred_contact?: string;
  preferred_time?: string;
  location?: string;
  message?: string;
  source?: string;
  language?: 'en' | 'ar';
  
  // Metadata
  timestamp?: string;
  user_agent?: string;
  referrer?: string;
}

/**
 * Make.com webhook response structure
 */
export interface MakeWebhookResponse {
  success: boolean;
  message?: string;
  data?: {
    execution_id?: string;
    row_number?: number;
  };
  error?: {
    code?: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Service names that trigger specific email templates in Make.com
 */
export enum MakeServiceType {
  ACCOUNTING = 'Accounting',
  PRO_SERVICES = 'PRO Services',
  COMPANY_FORMATION = 'Company Formation',
  VAT = 'VAT',
  BUSINESS_CONSULTING = 'Business Consulting',
  OTHER = 'Other',
}

/**
 * Service key to Make.com service name mapping
 */
export const SERVICE_TO_MAKE_MAP: Record<string, MakeServiceType | string> = {
  'companyFormation': MakeServiceType.COMPANY_FORMATION,
  'proServices': MakeServiceType.PRO_SERVICES,
  'accounting': MakeServiceType.ACCOUNTING,
  'vat': MakeServiceType.VAT,
  'businessConsulting': MakeServiceType.BUSINESS_CONSULTING,
  'employeeManagement': 'Employee Management',
  'crm': 'CRM & Client Management',
  'projectManagement': 'Project Management',
  'elearning': 'E-Learning Platform',
  'contractManagement': 'Contract Management',
  'workflowAutomation': 'Workflow Automation',
  'analytics': 'Advanced Analytics',
  'api': 'API & Integrations',
  'support': '24/7 Support',
  'other': MakeServiceType.OTHER,
};

/**
 * Validates webhook payload before sending
 */
export function validateWebhookPayload(payload: MakeWebhookPayload): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!payload.client_name || payload.client_name.trim().length === 0) {
    errors.push('client_name is required');
  }

  if (!payload.email || payload.email.trim().length === 0) {
    errors.push('email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      errors.push('email must be a valid email address');
    }
  }

  if (!payload.service_interested || payload.service_interested.trim().length === 0) {
    errors.push('service_interested is required');
  }

  // business_name and notes are optional but recommended
  if (payload.business_name && payload.business_name.trim().length === 0) {
    errors.push('business_name cannot be empty if provided');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Formats service array to Make.com expected format
 */
export function formatServicesForMake(services: string[]): string {
  if (services.length === 0) {
    return MakeServiceType.OTHER;
  }

  return services
    .map((service) => SERVICE_TO_MAKE_MAP[service] || service)
    .join(', ');
}

