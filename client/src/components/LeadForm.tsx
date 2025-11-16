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
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { MAKE_WEBHOOK_URL } from "@/config/webhook";

export interface LeadFormData {
  name: string;
  email: string;
  businessName: string;
  serviceInterested: string;
  extraDetails: string;
}

interface LeadFormProps {
  className?: string;
}

export function LeadForm({ className }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    businessName: "",
    serviceInterested: "",
    extraDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const serviceOptions = [
    "Company Formation",
    "PRO Services",
    "Accounting",
    "VAT",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceInterested: value }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    // Check required fields
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!formData.serviceInterested.trim()) {
      setError("Service Interested In is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

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
          business_name: formData.businessName || "",
          service_interested: formData.serviceInterested,
          notes: formData.extraDetails || "",
          source: "smartpro-website",
        }),
      });

      if (response.ok) {
        // Success - clear form and show success message
        setFormData({
          name: "",
          email: "",
          businessName: "",
          serviceInterested: "",
          extraDetails: "",
        });
        setSuccess(true);
      } else {
        // Error response
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`p-6 md:p-8 ${className || ""}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Alert */}
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Thank you! We'll contact you soon.
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

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            disabled={loading}
            required
            aria-required="true"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            disabled={loading}
            required
            aria-required="true"
          />
        </div>

        {/* Business Name Field */}
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Your business name (optional)"
            disabled={loading}
          />
        </div>

        {/* Service Interested In Field */}
        <div className="space-y-2">
          <Label htmlFor="serviceInterested">
            Service Interested In <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.serviceInterested}
            onValueChange={handleSelectChange}
            disabled={loading}
            required
          >
            <SelectTrigger id="serviceInterested" className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Extra Details Field */}
        <div className="space-y-2">
          <Label htmlFor="extraDetails">Extra Details</Label>
          <Textarea
            id="extraDetails"
            name="extraDetails"
            value={formData.extraDetails}
            onChange={handleChange}
            placeholder="Tell us more about your needs..."
            rows={4}
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Get My Free Consultation"
          )}
        </Button>
      </form>
    </Card>
  );
}

