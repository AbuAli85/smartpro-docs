/**
 * Type definitions for Make.com webhook integration
 * These types ensure type safety between frontend and backend
 */

/**
 * Canonical webhook payload structure for Make.com integration
 * 
 * This is the single source of truth for the webhook payload contract.
 * All components (frontend, Make.com, Google Sheets) must align with this structure.
 * 
 * @see INTEGRATION_CANONICAL.md for complete integration documentation
 */
export interface MakeWebhookPayload {
  // Required fields for Make.com flow routing
  client_name: string;
  email: string;
  service_interested: string; // Primary service (first selected) - used for email routing
  notes: string; // Comprehensive structured notes (auto-generated)
  
  // Contact information
  phone?: string;
  location?: string;
  preferred_contact?: string;
  preferred_time?: string;
  
  // Business information
  business_name?: string;
  business_type?: string; // Human-readable business type
  
  // Service details
  services?: string[]; // All selected services (array - Make.com Module 25 joins them to string)
  budget?: string;
  timeline?: string;
  
  // Client message
  primary_message?: string; // Client's typed message/notes (maps to Sheets column N via Module 25)
  
  // Metadata
  language?: 'en' | 'ar'; // Form language (default: "en")
  source?: string; // Source identifier (default: "smartpro-consultation-form")
  
  // Optional metadata (not sent by default, but can be included)
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
 * Gets the PRIMARY service for email routing
 * Uses the first selected service to ensure correct email routing in Make.com
 * Make.com routes emails based on a single service name, not comma-separated lists
 */
export function getPrimaryServiceForRouting(services: string[]): string {
  if (services.length === 0) {
    return MakeServiceType.OTHER;
  }

  // Use the FIRST service as primary for routing
  // This ensures Make.com routes to the correct email template
  const firstService = services[0];
  return SERVICE_TO_MAKE_MAP[firstService] || MakeServiceType.OTHER;
}

/**
 * Formats ALL services for reference/notes
 * This keeps all selected services in a readable format
 */
export function formatAllServicesForMake(services: string[]): string {
  if (services.length === 0) {
    return MakeServiceType.OTHER;
  }

  return services
    .map((service) => SERVICE_TO_MAKE_MAP[service] || service)
    .join(', ');
}

/**
 * @deprecated Use getPrimaryServiceForRouting() instead
 * Formats service array to Make.com expected format
 * NOTE: This was causing routing issues - use getPrimaryServiceForRouting() for email routing
 */
export function formatServicesForMake(services: string[]): string {
  // For backward compatibility, return primary service
  return getPrimaryServiceForRouting(services);
}

