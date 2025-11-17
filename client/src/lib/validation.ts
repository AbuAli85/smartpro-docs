/**
 * Server-side validation utilities
 * These validation functions can be used both client-side and server-side
 * to ensure consistent validation rules across the application
 */

import { ConsultationFormData } from '@/components/ConsultationForm';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  if (!email || email.trim().length === 0) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format (international format)
 * Accepts: +1234567890, 123-456-7890, (123) 456-7890, etc.
 */
export function validatePhone(phone: string): boolean {
  if (!phone || phone.trim().length === 0) {
    return true; // Phone is optional
  }
  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // Check if it's all digits and has reasonable length (7-15 digits)
  return /^\d{7,15}$/.test(cleaned);
}

/**
 * Validates name (non-empty, reasonable length)
 */
export function validateName(name: string): boolean {
  if (!name || name.trim().length === 0) {
    return false;
  }
  // Name should be between 2 and 100 characters
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

/**
 * Validates company name (optional but if provided, should be valid)
 */
export function validateCompany(company: string): boolean {
  if (!company || company.trim().length === 0) {
    return true; // Company is optional
  }
  const trimmed = company.trim();
  return trimmed.length >= 2 && trimmed.length <= 200;
}

/**
 * Validates location (optional but if provided, should be valid)
 */
export function validateLocation(location: string): boolean {
  if (!location || location.trim().length === 0) {
    return true; // Location is optional
  }
  const trimmed = location.trim();
  return trimmed.length >= 2 && trimmed.length <= 200;
}

/**
 * Validates message/notes (optional but if provided, should be valid)
 */
export function validateMessage(message: string): boolean {
  if (!message || message.trim().length === 0) {
    return true; // Message is optional
  }
  const trimmed = message.trim();
  // Max 5000 characters
  return trimmed.length <= 5000;
}

/**
 * Validates services array (must have at least one)
 */
export function validateServices(services: string[]): boolean {
  return Array.isArray(services) && services.length > 0;
}

/**
 * Validates business type (optional but if provided, should be from allowed list)
 */
export function validateBusinessType(businessType: string, allowedTypes: readonly string[]): boolean {
  if (!businessType || businessType.trim().length === 0) {
    return true; // Business type is optional
  }
  return allowedTypes.includes(businessType);
}

/**
 * Validates budget option (optional but if provided, should be from allowed list)
 */
export function validateBudget(budget: string, allowedBudgets: readonly string[]): boolean {
  if (!budget || budget.trim().length === 0) {
    return true; // Budget is optional
  }
  return allowedBudgets.includes(budget);
}

/**
 * Validates timeline option (optional but if provided, should be from allowed list)
 */
export function validateTimeline(timeline: string, allowedTimelines: readonly string[]): boolean {
  if (!timeline || timeline.trim().length === 0) {
    return true; // Timeline is optional
  }
  return allowedTimelines.includes(timeline);
}

/**
 * Validates contact method (optional but if provided, should be from allowed list)
 */
export function validateContactMethod(contactMethod: string, allowedMethods: readonly string[]): boolean {
  if (!contactMethod || contactMethod.trim().length === 0) {
    return true; // Contact method is optional
  }
  return allowedMethods.includes(contactMethod);
}

/**
 * Validates contact time (optional but if provided, should be from allowed list)
 */
export function validateContactTime(contactTime: string, allowedTimes: readonly string[]): boolean {
  if (!contactTime || contactTime.trim().length === 0) {
    return true; // Contact time is optional
  }
  return allowedTimes.includes(contactTime);
}

/**
 * Comprehensive validation for consultation form data
 * This matches the client-side validation and can be used server-side
 */
export function validateConsultationForm(
  formData: ConsultationFormData,
  options: {
    businessTypes?: readonly string[];
    budgets?: readonly string[];
    timelines?: readonly string[];
    contactMethods?: readonly string[];
    contactTimes?: readonly string[];
  } = {}
): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields
  if (!validateName(formData.name)) {
    errors.push({
      field: 'name',
      message: 'Name is required and must be between 2 and 100 characters',
    });
  }

  if (!validateEmail(formData.email)) {
    errors.push({
      field: 'email',
      message: 'A valid email address is required',
    });
  }

  if (!validateServices(formData.services)) {
    errors.push({
      field: 'services',
      message: 'At least one service must be selected',
    });
  }

  // Optional fields validation
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.push({
      field: 'phone',
      message: 'Phone number format is invalid',
    });
  }

  if (formData.company && !validateCompany(formData.company)) {
    errors.push({
      field: 'company',
      message: 'Company name must be between 2 and 200 characters',
    });
  }

  if (formData.location && !validateLocation(formData.location)) {
    errors.push({
      field: 'location',
      message: 'Location must be between 2 and 200 characters',
    });
  }

  if (formData.message && !validateMessage(formData.message)) {
    errors.push({
      field: 'message',
      message: 'Message must not exceed 5000 characters',
    });
  }

  // Validate dropdown selections if provided
  if (options.businessTypes && formData.businessType) {
    if (!validateBusinessType(formData.businessType, options.businessTypes)) {
      errors.push({
        field: 'businessType',
        message: 'Invalid business type selected',
      });
    }
  }

  if (options.budgets && formData.budget) {
    if (!validateBudget(formData.budget, options.budgets)) {
      errors.push({
        field: 'budget',
        message: 'Invalid budget option selected',
      });
    }
  }

  if (options.timelines && formData.timeline) {
    if (!validateTimeline(formData.timeline, options.timelines)) {
      errors.push({
        field: 'timeline',
        message: 'Invalid timeline option selected',
      });
    }
  }

  if (options.contactMethods && formData.preferredContact) {
    if (!validateContactMethod(formData.preferredContact, options.contactMethods)) {
      errors.push({
        field: 'preferredContact',
        message: 'Invalid contact method selected',
      });
    }
  }

  if (options.contactTimes && formData.preferredTime) {
    if (!validateContactTime(formData.preferredTime, options.contactTimes)) {
      errors.push({
        field: 'preferredTime',
        message: 'Invalid contact time selected',
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitizes string input to prevent XSS attacks
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  // Remove potentially dangerous characters
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 10000); // Max length
}

/**
 * Sanitizes form data
 */
export function sanitizeFormData(formData: ConsultationFormData): ConsultationFormData {
  return {
    name: sanitizeString(formData.name),
    email: sanitizeString(formData.email).toLowerCase(),
    phone: sanitizeString(formData.phone),
    company: sanitizeString(formData.company),
    businessType: sanitizeString(formData.businessType),
    services: formData.services.map(s => sanitizeString(s)),
    budget: sanitizeString(formData.budget),
    timeline: sanitizeString(formData.timeline),
    preferredContact: sanitizeString(formData.preferredContact),
    preferredTime: sanitizeString(formData.preferredTime),
    location: sanitizeString(formData.location),
    message: sanitizeString(formData.message),
  };
}

