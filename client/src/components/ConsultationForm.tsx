import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle, AlertCircle, User, Building2, Briefcase, MessageSquare, XCircle } from "lucide-react";
import { webhookClient, WebhookError } from "@/lib/webhookClient";
import { 
  MakeWebhookPayload, 
  getPrimaryServiceForRouting,
  formatAllServicesForMake,
  SERVICE_TO_MAKE_MAP,
  MakeServiceType,
} from "@/types/webhook";
import { trackFormSubmit } from "@/lib/googleAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  validateEmail, 
  validateName, 
  validatePhone, 
  validateCompany,
  validateLocation,
  validateMessage,
  validateServices,
  ValidationError,
} from "@/lib/validation";
import { FormProgressIndicator } from "@/components/FormProgressIndicator";
import { verifyWebhookEndpoint } from "@/lib/webhookVerification";
import { cn } from "@/lib/utils";

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  services: string[];
  budget: string;
  timeline: string;
  preferredContact: string;
  preferredTime: string;
  location: string;
  message: string;
}

interface ConsultationFormProps {
  className?: string;
}

const SERVICE_OPTIONS = [
  'companyFormation',
  'proServices',
  'accounting',
  'vat',
  'businessConsulting',
  'employeeManagement',
  'crm',
  'projectManagement',
  'elearning',
  'contractManagement',
  'workflowAutomation',
  'analytics',
  'api',
  'support',
  'other',
] as const;

const BUSINESS_TYPES = [
  'soleProprietorship',
  'llc',
  'partnership',
  'corporation',
  'freelancer',
  'other',
] as const;

const BUDGET_OPTIONS = [
  'under5k',
  '5k-10k',
  '10k-25k',
  '25k-50k',
  '50k-100k',
  'over100k',
  'notSure',
] as const;

const TIMELINE_OPTIONS = [
  'immediate',
  '1-3months',
  '3-6months',
  '6-12months',
  'planning',
] as const;

const CONTACT_METHODS = ['email', 'phone', 'both'] as const;
const CONTACT_TIMES = ['morning', 'afternoon', 'evening', 'flexible'] as const;

export function ConsultationForm({ className }: ConsultationFormProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    services: [],
    budget: "",
    timeline: "",
    preferredContact: "",
    preferredTime: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [webhookStatus, setWebhookStatus] = useState<"checking" | "ok" | "error" | null>(null);
  const [submittedName, setSubmittedName] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setTouchedFields((prev) => new Set(prev).add(name));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Real-time validation will happen on blur
    
    if (error) setError("");
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => new Set(prev).add(name));
    validateField(name, value);
  };
  
  const validateField = (name: string, value: string | string[]) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!validateName(value as string)) {
          error = t('message.error.required');
        }
        break;
      case "email":
        if (!value || (value as string).trim().length === 0) {
          error = t('message.error.required');
        } else if (!validateEmail(value as string)) {
          error = t('message.error.email');
        }
        break;
      case "phone":
        if (value && !validatePhone(value as string)) {
          error = "Invalid phone number format";
        }
        break;
      case "company":
        if (value && !validateCompany(value as string)) {
          error = "Company name must be between 2 and 200 characters";
        }
        break;
      case "location":
        if (value && !validateLocation(value as string)) {
          error = "Location must be between 2 and 200 characters";
        }
        break;
      case "message":
        if (value && !validateMessage(value as string)) {
          error = "Message must not exceed 5000 characters";
        }
        break;
      case "services":
        if (!validateServices(value as string[])) {
          error = t('message.error.required');
        }
        break;
    }
    
    if (error) {
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => new Set(prev).add(name));
    
    // Clear field error
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (error) setError("");
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
    setTouchedFields((prev) => new Set(prev).add("services"));
    
    // Validate services
    setTimeout(() => {
      setFormData((current) => {
        validateField("services", current.services);
        return current;
      });
    }, 0);
    
    if (error) setError("");
  };

  // Validate all fields and set field errors
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Validate all required fields
    if (!validateName(formData.name)) {
      errors.name = t('message.error.required');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('message.error.required');
    } else if (!validateEmail(formData.email)) {
      errors.email = t('message.error.email');
    }
    
    if (!validateServices(formData.services)) {
      errors.services = t('message.error.required');
    }
    
    // Validate optional fields if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = "Invalid phone number format";
    }
    
    if (formData.company && !validateCompany(formData.company)) {
      errors.company = "Company name must be between 2 and 200 characters";
    }
    
    if (formData.location && !validateLocation(formData.location)) {
      errors.location = "Location must be between 2 and 200 characters";
    }
    
    if (formData.message && !validateMessage(formData.message)) {
      errors.message = "Message must not exceed 5000 characters";
    }
    
    setFieldErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      // Set general error to first field error
      const firstError = Object.values(errors)[0];
      setError(firstError);
      return false;
    }
    
    return true;
  };
  
  // Calculate form progress
  const formProgress = useMemo(() => {
    const sections = [
      {
        id: "contact",
        label: t('section.contactInfo'),
        completed: !!(
          validateName(formData.name) &&
          validateEmail(formData.email)
        ),
      },
      {
        id: "business",
        label: t('section.businessInfo'),
        completed: !!(formData.company || formData.businessType),
      },
      {
        id: "services",
        label: t('section.serviceDetails'),
        completed: validateServices(formData.services),
      },
      {
        id: "additional",
        label: t('section.additionalInfo'),
        completed: !!(formData.message || formData.budget || formData.timeline),
      },
    ];
    
    return sections;
  }, [formData, t]);
  
  // Verify webhook on mount
  useEffect(() => {
    const checkWebhook = async () => {
      setWebhookStatus("checking");
      try {
        const result = await verifyWebhookEndpoint();
        setWebhookStatus(result.success ? "ok" : "error");
      } catch {
        setWebhookStatus("error");
      }
    };
    
    // Only check in development or if explicitly enabled
    if (import.meta.env.DEV) {
      checkWebhook();
    }
  }, []);

  /**
   * Builds comprehensive notes field with all additional information
   * This ensures all data is captured in Google Sheets even if Make.com flow
   * doesn't use all fields directly
   */
  const buildNotesField = (): string => {
    const notesParts: string[] = [];
    
    // Primary message
    if (formData.message) {
      notesParts.push(formData.message);
    }
    
    // Contact information
    if (formData.phone) {
      notesParts.push(`Phone: ${formData.phone}`);
    }
    if (formData.location) {
      notesParts.push(`Location: ${formData.location}`);
    }
    
    // Business details
    if (formData.businessType) {
      notesParts.push(`Business Type: ${t(`businessType.${formData.businessType}`)}`);
    }
    
    // Project details
    if (formData.budget) {
      notesParts.push(`Budget: ${t(`budget.${formData.budget}`)}`);
    }
    if (formData.timeline) {
      notesParts.push(`Timeline: ${t(`timeline.${formData.timeline}`)}`);
    }
    
    // Preferences
    if (formData.preferredContact) {
      notesParts.push(`Preferred Contact: ${t(`contact.${formData.preferredContact}`)}`);
    }
    if (formData.preferredTime) {
      notesParts.push(`Preferred Time: ${t(`time.${formData.preferredTime}`)}`);
    }
    
    // Metadata
    if (language) {
      notesParts.push(`Language: ${language === 'ar' ? 'Arabic' : 'English'}`);
    }
    
    return notesParts.join("\n");
  };

  /**
   * Builds the webhook payload according to Make.com flow requirements
   * CRITICAL: service_interested must be a SINGLE service name for proper email routing
   * Make.com routes emails based on service_interested matching specific service names
   */
  const buildWebhookPayload = (): MakeWebhookPayload => {
    // Get PRIMARY service (first selected) for email routing
    // This ensures Make.com routes to the correct email template
    const primaryService = getPrimaryServiceForRouting(formData.services);
    
    // Format ALL services for reference (kept in notes and services field)
    const allServicesFormatted = formatAllServicesForMake(formData.services);
    
    // Build notes with all additional information
    const notes = buildNotesField();
    
    // Build the payload - ensuring all required fields are present
    const payload: MakeWebhookPayload = {
      // REQUIRED: These fields are essential for Make.com flow routing
      client_name: formData.name.trim(),
      email: formData.email.trim(),
      business_name: formData.company?.trim() || "",
      // CRITICAL: Use PRIMARY service (first selected) for email routing
      // Make.com routes emails based on this single service name matching
      // If multiple services selected, first one determines email template
      service_interested: primaryService,
      notes: notes || "", // Ensure it's never undefined
      
      // Additional structured fields
      phone: formData.phone?.trim() || undefined,
      business_type: formData.businessType || undefined,
      // Keep ALL services for reference (comma-separated)
      services: formData.services.length > 0 ? allServicesFormatted : undefined,
      budget: formData.budget || undefined,
      timeline: formData.timeline || undefined,
      preferred_contact: formData.preferredContact || undefined,
      preferred_time: formData.preferredTime || undefined,
      location: formData.location?.trim() || undefined,
      message: formData.message?.trim() || undefined,
      source: "smartpro-consultation-form",
      language: language,
    };
    
    // Validation: Ensure service_interested is never empty
    if (!payload.service_interested || payload.service_interested.trim().length === 0) {
      console.warn('Warning: service_interested is empty, using default');
      payload.service_interested = MakeServiceType.OTHER;
    }
    
    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log('📧 Email Routing Info:', {
        primaryService: payload.service_interested,
        allServices: payload.services,
        selectedCount: formData.services.length,
        note: 'Email will be routed based on primaryService (first selected service)',
      });
    }
    
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Rate limiting
    if (submitAttempts >= 3) {
      const lastSubmitTime = localStorage.getItem("lastFormSubmitTime");
      if (lastSubmitTime) {
        const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime);
        if (timeSinceLastSubmit < 60000) {
          setError(t('message.error.rateLimit'));
          return;
        } else {
          setSubmitAttempts(0);
          localStorage.removeItem("lastFormSubmitTime");
        }
      }
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Build payload
      const payload = buildWebhookPayload();
      
      // Debug: Log payload to verify service_interested is included
      if (import.meta.env.DEV) {
        console.log('📤 Webhook Payload:', JSON.stringify(payload, null, 2));
        console.log('🔑 service_interested:', payload.service_interested);
        console.log('📋 services array:', formData.services);
      }
      
      // Validate critical field before sending
      if (!payload.service_interested || payload.service_interested.trim().length === 0) {
        console.error('❌ CRITICAL: service_interested is missing or empty!');
        setError('Please select at least one service.');
        setLoading(false);
        return;
      }
      
      // Send to Make.com webhook
      const response = await webhookClient.send(payload);

      if (response.success) {
        // Track successful submission
        trackFormSubmit("consultation_form", {
          services_count: formData.services.length,
          has_budget: !!formData.budget,
          has_timeline: !!formData.timeline,
          language: language,
          execution_id: response.data?.execution_id,
        });

        // Store submitted name for personalized success message
        setSubmittedName(formData.name.trim());

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          businessType: "",
          services: [],
          budget: "",
          timeline: "",
          preferredContact: "",
          preferredTime: "",
          location: "",
          message: "",
        });
        
        setSuccess(true);
        setSubmitAttempts(0);
        localStorage.removeItem("lastFormSubmitTime");
      } else {
        // Handle webhook error response
        const errorMessage = response.error?.message || t('message.error');
        setError(errorMessage);
        setSubmitAttempts((prev) => prev + 1);
        localStorage.setItem("lastFormSubmitTime", Date.now().toString());
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      
      // Track error
      trackFormSubmit("consultation_form_error", {
        error_type: err instanceof Error ? err.message : "unknown",
        error_code: err instanceof WebhookError ? err.statusCode : undefined,
      });
      
      // Handle different error types
      if (err instanceof WebhookError) {
        if (err.statusCode === 408) {
          setError(t('message.error.network'));
        } else if (err.statusCode >= 400 && err.statusCode < 500) {
          setError(t('message.error'));
        } else {
          setError(t('message.error.network'));
        }
      } else if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(t('message.error.network'));
      } else {
        setError(t('message.error'));
      }
      
      setSubmitAttempts((prev) => prev + 1);
      localStorage.setItem("lastFormSubmitTime", Date.now().toString());
    } finally {
      setLoading(false);
    }
  };

  const isRTL = language === 'ar';

  return (
    <Card className={`p-6 md:p-8 ${className || ""}`}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Webhook Status Indicator (Development Only) */}
        {import.meta.env.DEV && webhookStatus && (
          <Alert 
            className={cn(
              webhookStatus === "ok" && "bg-green-50 border-green-200",
              webhookStatus === "error" && "bg-yellow-50 border-yellow-200",
              webhookStatus === "checking" && "bg-blue-50 border-blue-200"
            )}
          >
            <AlertDescription className="text-sm">
              {webhookStatus === "checking" && "Checking webhook endpoint..."}
              {webhookStatus === "ok" && "✓ Webhook endpoint is operational"}
              {webhookStatus === "error" && "⚠ Webhook endpoint check failed - verify configuration"}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Progress Indicator */}
        <FormProgressIndicator sections={formProgress} />
        
        {/* Success Alert */}
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 space-y-2">
              <p className="font-semibold text-base">
                {t('consultation.successTitle')}
              </p>
              <p className="text-sm text-emerald-700">
                {t('consultation.successBody', { name: submittedName || 'there' })}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                {t('consultation.successPrivacy')}
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" role="alert" aria-live="assertive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Contact Information Section */}
        <div className="space-y-6">
          <div className={`flex items-center gap-3 pb-2 border-b ${isRTL ? 'flex-row-reverse' : ''}`}>
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('section.contactInfo')}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('form.name')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t('placeholder.name')}
                disabled={loading}
                required
                dir={isRTL ? 'rtl' : 'ltr'}
                className={cn(
                  fieldErrors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {fieldErrors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                {t('form.email')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t('placeholder.email')}
                disabled={loading}
                required
                dir="ltr"
                className={cn(
                  fieldErrors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                {t('form.phone')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t('placeholder.phone')}
                disabled={loading}
                dir="ltr"
                className={cn(
                  fieldErrors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {fieldErrors.phone && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">
                {t('form.location')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t('placeholder.location')}
                disabled={loading}
                dir={isRTL ? 'rtl' : 'ltr'}
                className={cn(
                  fieldErrors.location && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {fieldErrors.location && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Business Information Section */}
        <div className="space-y-6">
          <div className={`flex items-center gap-3 pb-2 border-b ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Building2 className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('section.businessInfo')}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company">
                {t('form.company')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t('placeholder.company')}
                disabled={loading}
                dir={isRTL ? 'rtl' : 'ltr'}
                className={cn(
                  fieldErrors.company && "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {fieldErrors.company && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.company}
                </p>
              )}
            </div>

            {/* Business Type */}
            <div className="space-y-2">
              <Label htmlFor="businessType">
                {t('form.businessType')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
              </Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleSelectChange('businessType', value)}
                disabled={loading}
              >
                <SelectTrigger id="businessType" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
                  <SelectValue placeholder={t('button.select')} />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t(`businessType.${type}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Service Details Section */}
        <div className="space-y-6">
          <div className={`flex items-center gap-3 pb-2 border-b ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Briefcase className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('section.serviceDetails')}
            </h3>
          </div>

          {/* Services Selection */}
          <div className="space-y-2">
            <Label>
              {t('form.services')} <span className="text-red-500">*</span>
            </Label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {SERVICE_OPTIONS.map((service) => (
                <div key={service} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                    disabled={loading}
                  />
                  <Label
                    htmlFor={service}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t(`service.${service}`)}
                  </Label>
                </div>
              ))}
            </div>
            {fieldErrors.services && (
              <p className="text-sm text-red-500 flex items-center gap-1 mt-2">
                <XCircle className="h-3 w-3" />
                {fieldErrors.services}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">
                {t('form.budget')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleSelectChange('budget', value)}
                disabled={loading}
              >
                <SelectTrigger id="budget" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
                  <SelectValue placeholder={t('button.select')} />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_OPTIONS.map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {t(`budget.${budget}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <Label htmlFor="timeline">
                {t('form.timeline')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
              </Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => handleSelectChange('timeline', value)}
                disabled={loading}
              >
                <SelectTrigger id="timeline" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
                  <SelectValue placeholder={t('button.select')} />
                </SelectTrigger>
                <SelectContent>
                  {TIMELINE_OPTIONS.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {t(`timeline.${timeline}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-2">
              <Label htmlFor="preferredContact">
                {t('form.preferredContact')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
              </Label>
              <Select
                value={formData.preferredContact}
                onValueChange={(value) => handleSelectChange('preferredContact', value)}
                disabled={loading}
              >
                <SelectTrigger id="preferredContact" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
                  <SelectValue placeholder={t('button.select')} />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {t(`contact.${method}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preferred Time */}
            <div className="space-y-2">
              <Label htmlFor="preferredTime">
                {t('form.preferredTime')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
              </Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => handleSelectChange('preferredTime', value)}
                disabled={loading}
              >
                <SelectTrigger id="preferredTime" className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
                  <SelectValue placeholder={t('button.select')} />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_TIMES.map((time) => (
                    <SelectItem key={time} value={time}>
                      {t(`time.${time}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="space-y-6">
          <div className={`flex items-center gap-3 pb-2 border-b ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t('section.additionalInfo')}
            </h3>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              {t('form.message')} <span className="text-gray-500 text-sm">({t('form.optional')})</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t('placeholder.message')}
              rows={5}
              disabled={loading}
              dir={isRTL ? 'rtl' : 'ltr'}
              className={cn(
                fieldErrors.message && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
            />
            {fieldErrors.message && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {fieldErrors.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t('button.submitting')}
            </>
          ) : (
            t('button.submit')
          )}
        </Button>
      </form>
    </Card>
  );
}

