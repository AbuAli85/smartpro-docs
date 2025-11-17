import { useState } from "react";
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
import { Loader2, CheckCircle, AlertCircle, User, Building2, Briefcase, MessageSquare } from "lucide-react";
import { MAKE_WEBHOOK_URL } from "@/config/webhook";
import { trackFormSubmit } from "@/lib/googleAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError(t('message.error.required'));
      return false;
    }

    if (!formData.email.trim()) {
      setError(t('message.error.required'));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t('message.error.email'));
      return false;
    }

    if (formData.services.length === 0) {
      setError(t('message.error.required'));
      return false;
    }

    return true;
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
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          business_name: formData.company || "",
          business_type: formData.businessType || "",
          services: formData.services.join(", "),
          budget: formData.budget || "",
          timeline: formData.timeline || "",
          preferred_contact: formData.preferredContact || "",
          preferred_time: formData.preferredTime || "",
          location: formData.location || "",
          notes: formData.message || "",
          source: "smartpro-consultation-form",
          language: language,
        }),
      });

      if (response.ok) {
        trackFormSubmit("consultation_form", {
          services_count: formData.services.length,
          has_budget: !!formData.budget,
          has_timeline: !!formData.timeline,
          language: language,
        });

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
        const errorText = await response.text().catch(() => "Unknown error");
        console.error("Webhook error:", response.status, errorText);
        setError(t('message.error'));
        setSubmitAttempts((prev) => prev + 1);
        localStorage.setItem("lastFormSubmitTime", Date.now().toString());
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      
      trackFormSubmit("consultation_form_error", {
        error_type: err instanceof Error ? err.message : "unknown",
      });
      
      if (err instanceof TypeError && err.message.includes("fetch")) {
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
        {/* Success Alert */}
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {t('message.success')}
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
                placeholder={t('placeholder.name')}
                disabled={loading}
                required
                dir={isRTL ? 'rtl' : 'ltr'}
              />
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
                placeholder={t('placeholder.email')}
                disabled={loading}
                required
                dir="ltr"
              />
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
                placeholder={t('placeholder.phone')}
                disabled={loading}
                dir="ltr"
              />
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
                placeholder={t('placeholder.location')}
                disabled={loading}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
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
                placeholder={t('placeholder.company')}
                disabled={loading}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
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
              placeholder={t('placeholder.message')}
              rows={5}
              disabled={loading}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
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

