/**
 * Server-side Webhook Types and Service Mapping
 * Shared types for Make.com webhook integration
 * 
 * This file ensures consistency between frontend and backend service mapping
 */

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
 * 
 * This mapping converts frontend service keys (e.g., 'companyFormation')
 * to Make.com readable service names (e.g., 'Company Formation')
 * 
 * IMPORTANT: This must match the mapping in:
 * - client/src/types/webhook.ts
 * - api/consultation.ts
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
 * Gets the PRIMARY service for email routing
 * Uses the first selected service to ensure correct email routing in Make.com
 * Make.com routes emails based on a single service name, not comma-separated lists
 * 
 * @param services - Array of service keys from frontend
 * @returns Formatted service name for Make.com routing
 */
export function getPrimaryServiceForRouting(services: string[]): string {
  if (!services || services.length === 0) {
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
 * 
 * @param services - Array of service keys from frontend
 * @returns Array of formatted service names
 */
export function formatAllServicesForMake(services: string[]): string[] {
  if (!services || services.length === 0) {
    return [MakeServiceType.OTHER];
  }

  return services.map((service) => 
    SERVICE_TO_MAKE_MAP[service] || service
  );
}

