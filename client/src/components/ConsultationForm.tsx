import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "wouter";
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
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Building2, 
  Briefcase, 
  MessageSquare, 
  XCircle,
  Mail,
  Phone,
  MapPin,
  Save
} from "lucide-react";
import { consultationApi, ConsultationResponse } from "@/lib/backendApi";
import { trackFormSubmit, trackEvent } from "@/lib/googleAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  validateEmail, 
  validateName, 
  validatePhone, 
  validateCompany,
  validateLocation,
  validateMessage,
  validateServices,
} from "@/lib/validation";
import { FormProgressIndicator } from "@/components/FormProgressIndicator";
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
  // Note: These fields are optional when sent to API (see buildApiPayload)
  // but stored as non-empty strings in form state for easier form handling
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

const STORAGE_KEY = 'consultation_form_draft';
const MAX_MESSAGE_LENGTH = 5000;
const AUTO_SAVE_DELAY = 1000; // 1 second

export function ConsultationForm({ className }: ConsultationFormProps) {
  const { t, language } = useLanguage();
  const [, navigate] = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  
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
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [formStartTime] = useState<number>(Date.now());
  const [fieldInteractions, setFieldInteractions] = useState<Record<string, number>>({});

  const isRTL = language === "ar";

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        // Only restore if draft is recent (within 7 days)
        if (draft.timestamp && Date.now() - draft.timestamp < 7 * 24 * 60 * 60 * 1000) {
          setFormData(draft.data);
        }
      }
    } catch (err) {
      console.error("Failed to load draft:", err);
    }
  }, []);

  // Auto-save to localStorage with debounce
  useEffect(() => {
    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Don't auto-save if form is empty or just submitted
    const hasData = formData.name || formData.email || formData.message;
    if (!hasData || success) return;

    setAutoSaveStatus("saving");
    autoSaveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          data: formData,
          timestamp: Date.now(),
        }));
        setAutoSaveStatus("saved");
        setTimeout(() => setAutoSaveStatus("idle"), 2000);
      } catch (err) {
        console.error("Failed to save draft:", err);
        setAutoSaveStatus("idle");
      }
    }, AUTO_SAVE_DELAY);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData, success]);


  // Form sections for progress indicator
  const formSections = useMemo(() => {
    const isContactComplete: boolean = validateName(formData.name) && validateEmail(formData.email);
    const isBusinessComplete: boolean = !!(formData.company || formData.businessType);
    const isServicesComplete: boolean = validateServices(formData.services) === true;
    const isAdditionalComplete: boolean = !!(formData.message || formData.budget || formData.timeline);

    return [
      { 
        id: "contact", 
        label: t("section.contactInfo"), 
        completed: isContactComplete 
      },
      { 
        id: "business", 
        label: t("section.businessInfo"), 
        completed: isBusinessComplete 
      },
      { 
        id: "services", 
        label: t("section.serviceDetails"), 
        completed: isServicesComplete 
      },
      { 
        id: "additional", 
        label: t("section.additionalInfo"), 
        completed: isAdditionalComplete 
      },
    ];
  }, [formData, t]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Track field interactions for analytics
    setFieldInteractions((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
    
    // Limit message length
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) {
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => new Set(prev).add(name));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (error) setError(null);
  };

  const handleBlur = (fieldName: string, value: string | string[]) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName));
    validateField(fieldName, value);
    
    // Track field completion for analytics
    if (value && typeof value === 'string' && value.trim()) {
      trackEvent("consultation_field_completed", {
        field_name: fieldName,
        has_value: true,
      });
    }
  };

  const validateField = (name: string, value: string | string[]): boolean => {
    let error: string | null = null;
    
    switch (name) {
      case "name":
        if (!value || !validateName(value as string)) {
          error = t("message.error.name");
        }
        break;
      case "email":
        if (!value || !validateEmail(value as string)) {
          error = t("message.error.email");
        }
        break;
      case "phone":
        if (value && !validatePhone(value as string)) {
          error = t("message.error.phone");
        }
        break;
      case "company":
        if (value && !validateCompany(value as string)) {
          error = t("message.error.company");
        }
        break;
      case "location":
        if (value && !validateLocation(value as string)) {
          error = t("message.error.location");
        }
        break;
      case "message":
        if (value && !validateMessage(value as string)) {
          error = t("message.error.message");
        }
        break;
      case "services":
        if (!validateServices(value as string[])) {
          error = t("message.error.services");
        }
        break;
    }
    
    if (error) {
      setFieldErrors((prev) => ({ ...prev, [name]: error! }));
      return false;
    } else {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return true;
    }
  };

  const handleSelectChange = (name: keyof ConsultationFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => new Set(prev).add(name));
    
    // Validate immediately
    validateField(name, value);
    
    if (error) setError(null);
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData((prev) => {
      const newServices = checked
        ? [...prev.services, service]
        : prev.services.filter((s) => s !== service);
      
      // Validate services immediately
      setTimeout(() => {
        validateField("services", newServices);
      }, 0);
      
      return { ...prev, services: newServices };
    });
    
    setTouchedFields((prev) => new Set(prev).add("services"));
    
    if (error) setError(null);
  };

  // Scroll to first error field
  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(fieldErrors)[0];
    if (firstErrorField) {
      // Focus the field by ID
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        // Focus if it's an input/textarea
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLButtonElement) {
          setTimeout(() => element.focus(), 100);
        }
        return;
      }
    }
    // Scroll to form top if no specific field found
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Required fields
    if (!validateName(formData.name)) {
      errors.name = t("message.error.name");
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = t("message.error.email");
    }
    
    if (!validateServices(formData.services)) {
      errors.services = t("message.error.services");
    }
    
    // Optional fields validation
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = t("message.error.phone");
    }
    
    if (formData.company && !validateCompany(formData.company)) {
      errors.company = t("message.error.company");
    }
    
    if (formData.location && !validateLocation(formData.location)) {
      errors.location = t("message.error.location");
    }
    
    if (formData.message && !validateMessage(formData.message)) {
      errors.message = t("message.error.message");
    }
    
    setFieldErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      setError(firstError);
      // Scroll to first error after state update
      setTimeout(scrollToFirstError, 100);
      return false;
    }
    
    setError(null);
    return true;
  };

  const buildApiPayload = () => {
    return {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || undefined,
      company: formData.company?.trim() || undefined,
      businessType: formData.businessType || undefined,
      services: formData.services,
      budget: formData.budget || undefined,
      timeline: formData.timeline || undefined,
      preferredContact: formData.preferredContact || undefined,
      preferredTime: formData.preferredTime || undefined,
      location: formData.location?.trim() || undefined,
      message: formData.message?.trim() || undefined,
      language: language as 'en' | 'ar',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double-submission
    if (loading || success) {
      console.warn('Form submission already in progress or completed, ignoring duplicate submit');
      return;
    }
    
    // Additional check: prevent rapid re-submissions
    const lastSubmitTime = localStorage.getItem("lastConsultationSubmitTime");
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime);
      if (timeSinceLastSubmit < 2000) { // 2 second cooldown
        console.warn('Form submitted too quickly, ignoring duplicate submit');
        return;
      }
    }
    
    // Track form submission attempt
    trackEvent("consultation_form_submit_attempt", {
      services_count: formData.services.length,
      has_optional_fields: !!(formData.phone || formData.company || formData.message),
    });
    
    setError(null);
    setSuccess(false);
    
    // Mark submission time to prevent rapid duplicates
    localStorage.setItem("lastConsultationSubmitTime", Date.now().toString());

    // Rate limiting
    const submitAttempts = parseInt(localStorage.getItem("submitAttempts") || "0");
    if (submitAttempts >= 3) {
      const lastSubmitTime = localStorage.getItem("lastFormSubmitTime");
      if (lastSubmitTime) {
        const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime);
        if (timeSinceLastSubmit < 60000) {
          setError(t("message.error.rateLimit"));
          return;
        } else {
          localStorage.removeItem("submitAttempts");
          localStorage.removeItem("lastFormSubmitTime");
        }
      }
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = buildApiPayload();
      
      const response: ConsultationResponse = await consultationApi.submit(payload);

      if (response.success) {
        // Calculate form completion time
        const formCompletionTime = Math.round((Date.now() - formStartTime) / 1000);
        
        trackFormSubmit("consultation_form", {
          services_count: formData.services.length,
          has_budget: !!formData.budget,
          has_timeline: !!formData.timeline,
          language: language,
          submission_id: response.submissionId,
          execution_id: response.executionId,
          form_completion_time_seconds: formCompletionTime,
          total_field_interactions: Object.values(fieldInteractions).reduce((a, b) => a + b, 0),
          fields_completed: Object.keys(formData).filter(
            (key) => formData[key as keyof ConsultationFormData] && 
            (typeof formData[key as keyof ConsultationFormData] !== 'object' || 
             (Array.isArray(formData[key as keyof ConsultationFormData]) && 
              (formData[key as keyof ConsultationFormData] as string[]).length > 0))
          ).length,
        });

        setSubmittedName(formData.name.trim());

        // Clear draft from localStorage
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("submitAttempts");
        localStorage.removeItem("lastFormSubmitTime");
        localStorage.removeItem("lastConsultationSubmitTime");

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

        // Redirect to thank-you page
        setTimeout(() => {
          navigate("/consultation/thanks");
        }, 2000);
      } else {
        const errorMessage = response.message || t("message.error");
        setError(errorMessage);
        localStorage.setItem("submitAttempts", (submitAttempts + 1).toString());
        localStorage.setItem("lastFormSubmitTime", Date.now().toString());
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      
      const errorMessage = err instanceof Error ? err.message : "unknown";
      trackFormSubmit("consultation_form_error", {
        error_type: errorMessage,
        form_completion_time_seconds: Math.round((Date.now() - formStartTime) / 1000),
      });
      
      // Handle different error types with better user feedback
      if (err instanceof Error) {
        if (err.message.includes("timeout") || err.message.includes("network")) {
          setError(t("message.error.network") + " " + (t("message.error.retry") || "Please check your connection and try again."));
        } else if (err.message.includes("rate limit") || err.message.includes("too many")) {
          setError(t("message.error.rateLimit"));
        } else {
          setError(err.message || t("message.error.network"));
        }
      } else {
        setError(t("message.error.network") + " " + (t("message.error.retry") || "Please try again."));
      }
      
      localStorage.setItem("submitAttempts", (submitAttempts + 1).toString());
      localStorage.setItem("lastFormSubmitTime", Date.now().toString());
      
      // Track error for analytics
      trackEvent("consultation_form_error", {
        error_type: errorMessage,
        attempt_number: submitAttempts + 1,
      });
    } finally {
      setLoading(false);
    }
  };

  const messageLength = formData.message.length;
  const messageRemaining = MAX_MESSAGE_LENGTH - messageLength;
  const messageOverLimit = messageLength > MAX_MESSAGE_LENGTH;

  // Character counter component
  const CharacterCounter = ({ 
    current, 
    max, 
    className 
  }: { 
    current: number; 
    max: number; 
    className?: string;
  }) => {
    const remaining = max - current;
    const isOverLimit = current > max;
    
    return (
      <span
        className={cn(
          "text-xs mt-1",
          isOverLimit ? "text-red-500" : "text-gray-500",
          className
        )}
      >
        {isOverLimit ? (
          <>
            {Math.abs(remaining)} {t("message.charactersOver")}
          </>
        ) : (
          <>
            {remaining} {t("message.charactersRemaining")}
          </>
        )}
      </span>
    );
  };

  if (success) {
    return (
      <div className="text-center p-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("consultation.form.successTitle", {
            name: submittedName || t("consultation.form.dearCustomer"),
          })}
        </h2>
        <p className="text-gray-600 mb-4">{t("consultation.form.successMessage")}</p>
        <p className="text-sm text-gray-500">{t("consultation.form.redirecting")}</p>
      </div>
    );
  }

  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-8"
        dir={isRTL ? "rtl" : "ltr"}
        noValidate
        aria-label={t("consultation.form.title")}
      >
        {/* Auto-save indicator */}
        {autoSaveStatus !== "idle" && (
          <div
            className={cn(
              "flex items-center gap-2 text-xs transition-opacity",
              autoSaveStatus === "saving" ? "opacity-70" : "opacity-100"
            )}
          >
            {autoSaveStatus === "saving" ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                <span className="text-gray-600">{t("message.saving")}</span>
              </>
            ) : (
              <>
                <Save className="h-3 w-3 text-green-500" />
                <span className="text-green-600">{t("message.saved")}</span>
              </>
            )}
          </div>
        )}

        {/* Progress Indicator */}
        <FormProgressIndicator sections={formSections} />

        {/* Error Alert */}
        {error && (
          <Alert 
            variant="destructive" 
            role="alert" 
            aria-live="assertive"
            className="animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription id="form-error-message">
              {error}
              {error.includes("network") && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="ml-2 underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                  aria-label={t("button.retry") || "Retry submission"}
                >
                  {t("button.retry") || "Retry"}
                </button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Contact Information Section */}
        <div 
          className="space-y-6"
          onFocus={() => setFocusedSection("contact")}
          onBlur={() => setFocusedSection(null)}
        >
          <div
            className={cn(
              "flex items-center gap-3 pb-2 border-b",
              isRTL && "flex-row-reverse"
            )}
          >
            <User className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t("section.contactInfo")}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className={cn(isRTL && "text-right")}>
                {t("form.name")} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400",
                    isRTL ? "right-3" : "left-3"
                  )}
                />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("name", e.target.value)}
                  placeholder={t("placeholder.name")}
                  disabled={loading}
                  required
                  dir={isRTL ? "rtl" : "ltr"}
                  className={cn(
                    isRTL ? "pr-10" : "pl-10",
                    fieldErrors.name &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                />
              </div>
              {fieldErrors.name && (
                <p
                  id="name-error"
                  className="text-sm text-red-500 flex items-center gap-1"
                  role="alert"
                >
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className={cn(isRTL && "text-right")}>
                {t("form.email")} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400",
                    isRTL ? "right-3" : "left-3"
                  )}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  placeholder={t("placeholder.email")}
                  disabled={loading}
                  required
                  dir="ltr"
                  className={cn(
                    isRTL ? "pr-10" : "pl-10",
                    fieldErrors.email &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
              </div>
              {fieldErrors.email && (
                <p
                  id="email-error"
                  className="text-sm text-red-500 flex items-center gap-1"
                  role="alert"
                >
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className={cn(isRTL && "text-right")}>
                {t("form.phone")}{" "}
                <span className="text-gray-500 text-sm">({t("form.optional")})</span>
              </Label>
              <div className="relative">
                <Phone
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400",
                    isRTL ? "right-3" : "left-3"
                  )}
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("phone", e.target.value)}
                  placeholder={t("placeholder.phone")}
                  disabled={loading}
                  dir="ltr"
                  className={cn(
                    isRTL ? "pr-10" : "pl-10",
                    fieldErrors.phone &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                />
              </div>
              {fieldErrors.phone && (
                <p
                  id="phone-error"
                  className="text-sm text-red-500 flex items-center gap-1"
                  role="alert"
                >
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className={cn(isRTL && "text-right")}>
                {t("form.location")}{" "}
                <span className="text-gray-500 text-sm">({t("form.optional")})</span>
              </Label>
              <div className="relative">
                <MapPin
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400",
                    isRTL ? "right-3" : "left-3"
                  )}
                />
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("location", e.target.value)}
                  placeholder={t("placeholder.location")}
                  disabled={loading}
                  dir={isRTL ? "rtl" : "ltr"}
                  className={cn(
                    isRTL ? "pr-10" : "pl-10",
                    fieldErrors.location &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  aria-invalid={!!fieldErrors.location}
                  aria-describedby={
                    fieldErrors.location ? "location-error" : undefined
                  }
                />
              </div>
              {fieldErrors.location && (
                <p
                  id="location-error"
                  className="text-sm text-red-500 flex items-center gap-1"
                  role="alert"
                >
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Business Information Section */}
        <div 
          className="space-y-6"
          onFocus={() => setFocusedSection("business")}
          onBlur={() => setFocusedSection(null)}
        >
          <div
            className={cn(
              "flex items-center gap-3 pb-2 border-b",
              isRTL && "flex-row-reverse"
            )}
          >
            <Building2 className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t("section.businessInfo")}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company" className={cn(isRTL && "text-right")}>
                {t("form.company")}{" "}
                <span className="text-gray-500 text-sm">({t("form.optional")})</span>
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                onBlur={(e) => handleBlur("company", e.target.value)}
                placeholder={t("placeholder.company")}
                disabled={loading}
                dir={isRTL ? "rtl" : "ltr"}
                className={cn(
                  fieldErrors.company &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
                aria-invalid={!!fieldErrors.company}
                aria-describedby={fieldErrors.company ? "company-error" : undefined}
              />
              {fieldErrors.company && (
                <p
                  id="company-error"
                  className="text-sm text-red-500 flex items-center gap-1"
                  role="alert"
                >
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.company}
                </p>
              )}
            </div>

            {/* Business Type */}
            <div className="space-y-2">
              <Label htmlFor="businessType" className={cn(isRTL && "text-right")}>
                {t("form.businessType")}{" "}
                <span className="text-gray-500 text-sm">({t("form.optional")})</span>
              </Label>
              <Select
                value={formData.businessType}
                onValueChange={handleSelectChange("businessType")}
                disabled={loading}
              >
                <SelectTrigger
                  id="businessType"
                  className="w-full"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <SelectValue placeholder={t("button.select")} />
                </SelectTrigger>
                <SelectContent dir={isRTL ? "rtl" : "ltr"}>
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
        <div 
          className="space-y-6"
          onFocus={() => setFocusedSection("services")}
          onBlur={() => setFocusedSection(null)}
        >
          <div
            className={cn(
              "flex items-center gap-3 pb-2 border-b",
              isRTL && "flex-row-reverse"
            )}
          >
            <Briefcase className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t("section.serviceDetails")}
            </h3>
          </div>

          {/* Services Selection */}
          <div className="space-y-2">
            <Label className={cn(isRTL && "text-right")}>
              {t("form.services")} <span className="text-red-500">*</span>
            </Label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {SERVICE_OPTIONS.map((service) => (
                <div
                  key={service}
                  className={cn(
                    "flex items-center gap-2",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={(checked) =>
                      handleServiceChange(service, checked as boolean)
                    }
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
              <p
                className="text-sm text-red-500 flex items-center gap-1 mt-2"
                role="alert"
              >
                <XCircle className="h-3 w-3" />
                {fieldErrors.services}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget" className={cn(isRTL && "text-right")}>
                {t("form.budget")}{" "}
                <span className="text-gray-500 text-sm">({t("form.optional")})</span>
              </Label>
              <Select
                value={formData.budget}
                onValueChange={handleSelectChange("budget")}
                disabled={loading}
              >
                <SelectTrigger id="budget" className="w-full" dir={isRTL ? "rtl" : "ltr"}>
                  <SelectValue placeholder={t("button.select")} />
                </SelectTrigger>
                <SelectContent dir={isRTL ? "rtl" : "ltr"}>
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
              <Label htmlFor="timeline" className={cn(isRTL && "text-right")}>
                {t("form.timeline")}{" "}
                <span className="text-gray-500 text-sm">({t("form.optional")})</span>
              </Label>
              <Select
                value={formData.timeline}
                onValueChange={handleSelectChange("timeline")}
                disabled={loading}
              >
                <SelectTrigger id="timeline" className="w-full" dir={isRTL ? "rtl" : "ltr"}>
                  <SelectValue placeholder={t("button.select")} />
                </SelectTrigger>
                <SelectContent dir={isRTL ? "rtl" : "ltr"}>
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
              <Label htmlFor="preferredContact" className={cn(isRTL && "text-right")}>
                {t("form.preferredContact")}{" "}
                <span className="text-gray-500 text-sm">({t("form.optional")})</span>
              </Label>
              <Select
                value={formData.preferredContact}
                onValueChange={handleSelectChange("preferredContact")}
                disabled={loading}
              >
                <SelectTrigger
                  id="preferredContact"
                  className="w-full"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <SelectValue placeholder={t("button.select")} />
                </SelectTrigger>
                <SelectContent dir={isRTL ? "rtl" : "ltr"}>
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
              <Label htmlFor="preferredTime" className={cn(isRTL && "text-right")}>
                {t("form.preferredTime")}{" "}
                <span className="text-gray-500 text-sm">({t("form.optional")})</span>
              </Label>
              <Select
                value={formData.preferredTime}
                onValueChange={handleSelectChange("preferredTime")}
                disabled={loading}
              >
                <SelectTrigger
                  id="preferredTime"
                  className="w-full"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <SelectValue placeholder={t("button.select")} />
                </SelectTrigger>
                <SelectContent dir={isRTL ? "rtl" : "ltr"}>
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
        <div 
          className="space-y-6"
          onFocus={() => setFocusedSection("additional")}
          onBlur={() => setFocusedSection(null)}
        >
          <div
            className={cn(
              "flex items-center gap-3 pb-2 border-b",
              isRTL && "flex-row-reverse"
            )}
          >
            <MessageSquare className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-900">
              {t("section.additionalInfo")}
            </h3>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className={cn(isRTL && "text-right")}>
              {t("form.message")}{" "}
              <span className="text-gray-500 text-sm">({t("form.optional")})</span>
            </Label>
            <div className="relative">
              <MessageSquare
                className={cn(
                  "absolute top-3 h-4 w-4 text-gray-400",
                  isRTL ? "right-3" : "left-3"
                )}
              />
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={(e) => handleBlur("message", e.target.value)}
                placeholder={t("placeholder.message")}
                rows={5}
                disabled={loading}
                dir={isRTL ? "rtl" : "ltr"}
                className={cn(
                  isRTL ? "pr-10" : "pl-10",
                  fieldErrors.message &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500",
                  messageOverLimit && "border-red-500"
                )}
                aria-invalid={!!fieldErrors.message || messageOverLimit}
                aria-describedby={
                  fieldErrors.message || messageOverLimit ? "message-error" : undefined
                }
                maxLength={MAX_MESSAGE_LENGTH}
              />
            </div>
            <div className="flex items-center justify-between">
              {fieldErrors.message && (
                <p
                  id="message-error"
                  className="text-sm text-red-500 flex items-center gap-1"
                  role="alert"
                >
                  <XCircle className="h-3 w-3" />
                  {fieldErrors.message}
                </p>
              )}
              <CharacterCounter current={messageLength} max={MAX_MESSAGE_LENGTH} />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={loading}
          aria-live="polite"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span>{t("button.submitting")}</span>
            </>
          ) : (
            <span>{t("button.submit")}</span>
          )}
        </Button>
        
        {/* Form completion estimate */}
        {!success && !loading && (
          <p className="text-xs text-center text-gray-500 mt-2" role="status">
            {t("message.formCompletionEstimate") || "Estimated completion time: 3-5 minutes"}
          </p>
        )}
      </form>
    </Card>
  );
}