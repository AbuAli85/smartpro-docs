import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { setSEOTags } from "@/lib/seoUtils";
import { trackEvent } from "@/lib/googleAnalytics";
import { CheckCircle2, Mail, Phone, Clock, FileText, Users, ArrowRight, Home, MessageSquare, Sparkles, Shield, Zap, UserPlus, Loader2, Calendar, Upload, Download, Send, Building2, MapPin, Briefcase, DollarSign, Calendar as CalendarIcon, UserCheck, MessageCircle, ExternalLink, Copy, Check } from "lucide-react";
import { Link } from "wouter";
import { TrackingStatus } from "@/components/TrackingStatus";
import { LeadProgress } from "@/components/LeadProgress";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { handlePlatformRegistration } from "@/lib/platformUtils";

export default function ConsultationThankYou() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const [location] = useLocation();
  const [consultationData, setConsultationData] = useState<any>(null);
  const [loadingConsultation, setLoadingConsultation] = useState(false);
  const [consultationError, setConsultationError] = useState<string | null>(null);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [showConsultationDetails, setShowConsultationDetails] = useState(false);

  // Extract tracking IDs and email from URL params
  const { submissionId, executionId, email } = useMemo(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    
    // Handle email decoding - may be double-encoded
    const getDecodedEmail = (): string | undefined => {
      const emailParam = params.get("email");
      if (!emailParam) return undefined;
      
      try {
        // Try decoding once
        let decoded = decodeURIComponent(emailParam);
        // If still contains encoded characters, decode again (handles double-encoding)
        if (decoded.includes('%')) {
          decoded = decodeURIComponent(decoded);
        }
        return decoded;
      } catch (e) {
        // If decode fails, return original
        console.warn('Failed to decode email parameter:', e);
        return emailParam;
      }
    };
    
    return {
      submissionId: params.get("id") || undefined,
      executionId: params.get("execution") || undefined,
      email: getDecodedEmail(),
    };
  }, [location]);

  // Fetch consultation data from database
  useEffect(() => {
    if (!submissionId) return;

    const fetchConsultation = async () => {
      setLoadingConsultation(true);
      setConsultationError(null);
      
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${apiUrl}/consultation/${submissionId}`);
        
        if (response.ok) {
          const data = await response.json();
          setConsultationData(data);
          console.log('✅ Consultation data fetched from database:', data);
        } else if (response.status === 404) {
          setConsultationError('Consultation not found in database');
          console.warn('⚠️ Consultation not found:', submissionId);
        } else {
          setConsultationError('Failed to fetch consultation data');
          console.error('❌ Failed to fetch consultation:', response.statusText);
        }
      } catch (error) {
        console.error('❌ Error fetching consultation:', error);
        setConsultationError('Error connecting to database');
      } finally {
        setLoadingConsultation(false);
      }
    };

    fetchConsultation();
  }, [submissionId]);

  useEffect(() => {
    setSEOTags({
      title: `${t("consultation.thanks.title")} | Smartpro Business Hub & Services`,
      description: t("consultation.thanks.subtitle"),
      keywords:
        "smartpro consultation, business services UAE, company setup, PRO services, accounting, VAT",
      type: "website",
      url: "https://smartpro-docs.vercel.app/consultation/thanks",
    });

    // Track thank you page view with tracking info
    trackEvent("consultation_thank_you_view", {
      language,
      timestamp: new Date().toISOString(),
      submission_id: submissionId,
      execution_id: executionId,
    });
  }, [t, language, submissionId, executionId]);

  const nextStepsClient = [
    {
      icon: Mail,
      title: t("nextSteps.client.email.title") || "Check Your Email",
      description: t("nextSteps.client.email.description") || "We've sent a confirmation email with your submission details.",
    },
    {
      icon: Clock,
      title: t("nextSteps.client.wait.title") || "Wait for Our Response",
      description: t("nextSteps.client.wait.description") || "Our team will review your request and contact you within 24 hours.",
    },
    {
      icon: Phone,
      title: t("nextSteps.client.contact.title") || "Be Available",
      description: t("nextSteps.client.contact.description") || "Keep your phone and email accessible for our team to reach you.",
    },
    {
      icon: FileText,
      title: t("nextSteps.client.prepare.title") || "Prepare Your Documents",
      description: t("nextSteps.client.prepare.description") || "Have your business documents ready for the consultation.",
    },
  ];

  const nextStepsProvider = [
    {
      icon: Users,
      title: t("nextSteps.provider.review.title") || "Review Request",
      description: t("nextSteps.provider.review.description") || "The request has been received and is in the system.",
    },
    {
      icon: Mail,
      title: t("nextSteps.provider.notify.title") || "Client Notification",
      description: t("nextSteps.provider.notify.description") || "Client has been notified via email confirmation.",
    },
    {
      icon: Clock,
      title: t("nextSteps.provider.process.title") || "Process Request",
      description: t("nextSteps.provider.process.description") || "Assign to appropriate team member and prepare response.",
    },
    {
      icon: CheckCircle2,
      title: t("nextSteps.provider.followup.title") || "Follow Up",
      description: t("nextSteps.provider.followup.description") || "Contact client within 24 hours as per SLA.",
    },
  ];

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <section 
          className="max-w-6xl mx-auto px-4 py-16 md:py-24"
          aria-labelledby="thank-you-title"
        >
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-6 md:p-10 text-center mb-8">
            <div 
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 animate-in zoom-in duration-500"
              role="img"
              aria-label={t("consultation.thanks.title")}
            >
              <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
            </div>
            <h1 
              id="thank-you-title"
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            >
              {t("consultation.thanks.title")}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              {t("consultation.thanks.subtitle")}
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              {t("consultation.thanks.body")}
            </p>
          </div>

          {/* Database Connection Status - Debug Info */}
          {submissionId && (
            <Card className="mb-4 p-4 bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3">
                {loadingConsultation ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <p className="text-sm text-gray-600">
                      {t("consultation.thanks.loadingData") || "Verifying data in database..."}
                    </p>
                  </>
                ) : consultationError ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-900">
                        {t("consultation.thanks.dataWarning") || "Data Status"}
                      </p>
                      <p className="text-xs text-yellow-700">{consultationError}</p>
                    </div>
                  </>
                ) : consultationData ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">
                        {t("consultation.thanks.dataSaved") || "✅ Data saved to database"}
                      </p>
                      <p className="text-xs text-green-700">
                        {t("consultation.thanks.dataDetails") || `Name: ${consultationData.name || 'N/A'}, Email: ${consultationData.email || 'N/A'}`}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            </Card>
          )}

          {/* Consultation Details Section - Enhanced Display */}
          {consultationData && (
            <Card className="mb-8 bg-white border-2 border-blue-200 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {t("consultation.details.title") || "Your Consultation Details"}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {t("consultation.details.subtitle") || "Review your submission information"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowConsultationDetails(!showConsultationDetails)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                  >
                    {showConsultationDetails ? "Hide Details" : "Show Details"}
                    <ArrowRight className={cn("h-4 w-4 transition-transform", showConsultationDetails && "rotate-90")} />
                  </button>
                </div>

                {showConsultationDetails && (
                  <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 animate-in fade-in slide-in-from-top-2">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        {t("consultation.details.contact") || "Contact Information"}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 font-medium">{t("consultation.details.name") || "Name"}:</span>
                          <span className="text-gray-900">{consultationData.name || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 font-medium">{t("consultation.details.email") || "Email"}:</span>
                          <span className="text-gray-900">{consultationData.email || "N/A"}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(consultationData.email);
                              setCopiedContact('email');
                              setTimeout(() => setCopiedContact(null), 2000);
                            }}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Copy email"
                          >
                            {copiedContact === 'email' ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        {consultationData.phone && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 font-medium">{t("consultation.details.phone") || "Phone"}:</span>
                            <span className="text-gray-900">{consultationData.phone}</span>
                            <a
                              href={`tel:${consultationData.phone}`}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Call"
                            >
                              <Phone className="h-4 w-4 text-blue-600" />
                            </a>
                          </div>
                        )}
                        {consultationData.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{consultationData.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Business Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        {t("consultation.details.business") || "Business Information"}
                      </h3>
                      <div className="space-y-2 text-sm">
                        {consultationData.company && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 font-medium">{t("consultation.details.company") || "Company"}:</span>
                            <span className="text-gray-900">{consultationData.company}</span>
                          </div>
                        )}
                        {consultationData.businessType && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 font-medium">{t("consultation.details.businessType") || "Business Type"}:</span>
                            <span className="text-gray-900">{consultationData.businessType}</span>
                          </div>
                        )}
                        {consultationData.services && Array.isArray(consultationData.services) && consultationData.services.length > 0 && (
                          <div>
                            <span className="text-gray-600 font-medium">{t("consultation.details.services") || "Services"}:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {consultationData.services.map((service: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        {t("consultation.details.project") || "Project Details"}
                      </h3>
                      <div className="space-y-2 text-sm">
                        {consultationData.budget && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 font-medium">{t("consultation.details.budget") || "Budget"}:</span>
                            <span className="text-gray-900">{consultationData.budget}</span>
                          </div>
                        )}
                        {consultationData.timeline && (
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 font-medium">{t("consultation.details.timeline") || "Timeline"}:</span>
                            <span className="text-gray-900">{consultationData.timeline}</span>
                          </div>
                        )}
                        {consultationData.preferredContact && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 font-medium">{t("consultation.details.preferredContact") || "Preferred Contact"}:</span>
                            <span className="text-gray-900">{consultationData.preferredContact}</span>
                          </div>
                        )}
                        {consultationData.preferredTime && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 font-medium">{t("consultation.details.preferredTime") || "Preferred Time"}:</span>
                            <span className="text-gray-900">{consultationData.preferredTime}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    {consultationData.message && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 text-blue-600" />
                          {t("consultation.details.message") || "Your Message"}
                        </h3>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{consultationData.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Direct Communication Section - Bridge Between Client and Provider */}
          <Card className="mb-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-2 border-indigo-200 shadow-xl">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {t("consultation.communication.title") || "Connect with Our Team"}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {t("consultation.communication.subtitle") || "Get in touch directly - we're here to help"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Email Contact */}
                <button
                  onClick={() => {
                    const recipientEmail = consultationData?.email || email || 'info@smartpro.io';
                    const subject = encodeURIComponent(`Consultation Follow-up: ${submissionId || ''}`);
                    const body = encodeURIComponent(`Hello,\n\nI would like to follow up on my consultation request.\n\nSubmission ID: ${submissionId || 'N/A'}\n\nThank you!`);
                    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
                    trackEvent("consultation_contact_email", { submission_id: submissionId });
                  }}
                  className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all group"
                >
                  <div className="p-3 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {t("consultation.communication.email") || "Send Email"}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {t("consultation.communication.emailDesc") || "Quick response guaranteed"}
                    </p>
                  </div>
                </button>

                {/* Phone Contact */}
                {consultationData?.phone && (
                  <a
                    href={`tel:${consultationData.phone}`}
                    onClick={() => trackEvent("consultation_contact_phone", { submission_id: submissionId })}
                    className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all group"
                  >
                    <div className="p-3 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                      <Phone className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t("consultation.communication.phone") || "Call Us"}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {t("consultation.communication.phoneDesc") || "Speak directly"}
                      </p>
                    </div>
                  </a>
                )}

                {/* Schedule Appointment */}
                {submissionId ? (
                  <button
                    onClick={() => {
                      trackEvent("consultation_schedule_appointment", { submission_id: submissionId });
                      // Open calendar booking link or platform
                      const calendarUrl = `https://marketing.thedigitalmorph.com/book?consultation=${submissionId}&email=${encodeURIComponent(email || '')}`;
                      window.open(calendarUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all group"
                  >
                    <div className="p-3 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                      <Calendar className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t("consultation.communication.schedule") || "Schedule Call"}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {t("consultation.communication.scheduleDesc") || "Book a consultation"}
                      </p>
                    </div>
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex flex-col items-center gap-3 p-4 bg-gray-100 rounded-lg border-2 border-gray-200 cursor-not-allowed opacity-60"
                    title={t("consultation.communication.scheduleDisabled") || "Submission ID required"}
                  >
                    <div className="p-3 bg-gray-200 rounded-full">
                      <Calendar className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-500 mb-1">
                        {t("consultation.communication.schedule") || "Schedule Call"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {t("consultation.communication.scheduleDisabled") || "Not available"}
                      </p>
                    </div>
                  </button>
                )}
              </div>

              {/* Provider Dashboard Link (for providers viewing this) */}
              {submissionId && (
                <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserCheck className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {t("consultation.communication.providerAccess") || "Provider Access"}
                        </p>
                        <p className="text-xs text-gray-600">
                          {t("consultation.communication.providerAccessDesc") || "View this consultation in your dashboard"}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://marketing.thedigitalmorph.com/dashboard/provider/consultations?submission=${submissionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("consultation_provider_dashboard", { submission_id: submissionId })}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      {t("consultation.communication.viewDashboard") || "View Dashboard"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Document Sharing Section */}
          <Card className="mb-8 bg-white border-2 border-green-200 shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t("consultation.documents.title") || "Share Documents"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {t("consultation.documents.subtitle") || "Upload files to help us better understand your needs"}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t("consultation.documents.clientUpload") || "For Clients"}
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    {t("consultation.documents.clientUploadDesc") || "Upload business documents, requirements, or any relevant files"}
                  </p>
                  <button
                    onClick={() => {
                      trackEvent("consultation_upload_documents", { submission_id: submissionId });
                      // Open document upload interface or platform
                      const uploadUrl = `https://marketing.thedigitalmorph.com/documents/upload?consultation=${submissionId}`;
                      window.open(uploadUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Upload className="h-4 w-4" />
                    {t("consultation.documents.upload") || "Upload Documents"}
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t("consultation.documents.providerShare") || "For Providers"}
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    {t("consultation.documents.providerShareDesc") || "Share resources, proposals, or documents with the client"}
                  </p>
                  <button
                    onClick={() => {
                      trackEvent("consultation_provider_share", { submission_id: submissionId });
                      const shareUrl = `https://marketing.thedigitalmorph.com/dashboard/provider/consultations/${submissionId}/share`;
                      window.open(shareUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Send className="h-4 w-4" />
                    {t("consultation.documents.share") || "Share Resources"}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Tracking Status - Always show if submissionId exists */}
          {submissionId && (
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TrackingStatus submissionId={submissionId} executionId={executionId} />
            </div>
          )}

          {/* Lead Progress Tracking - Shows journey from consultation to registration */}
          {submissionId && (
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <LeadProgress submissionId={submissionId} email={email} />
            </div>
          )}

          {/* Platform Registration CTA - Conversion Opportunity */}
          <Card className="mb-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                  <span className="text-sm font-semibold text-yellow-300 uppercase tracking-wide">
                    {t("registration.cta.badge") || "Unlock Full Platform Access"}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {t("registration.cta.title") || "Take Your Business to the Next Level"}
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl">
                  {t("registration.cta.description") || "Register on our platform to follow up on your request, access more features, and connect with verified providers for your business needs."}
                </p>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Shield className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{t("registration.benefit.tracking.title") || "Track Your Request"}</h3>
                      <p className="text-sm text-blue-100">{t("registration.benefit.tracking.description") || "Follow up and manage your consultation in real-time"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Zap className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{t("registration.benefit.features.title") || "More Features"}</h3>
                      <p className="text-sm text-blue-100">{t("registration.benefit.features.description") || "Access advanced tools and business solutions"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Users className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{t("registration.benefit.providers.title") || "Verified Providers"}</h3>
                      <p className="text-sm text-blue-100">{t("registration.benefit.providers.description") || "Connect with trusted professionals instantly"}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons - Direct to Platform Registration */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-blue-600 px-6 py-3 text-sm md:text-base font-semibold hover:bg-blue-50 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg"
                    onClick={async (e) => {
                      e.preventDefault();
                      
                      // Track analytics
                      trackEvent("consultation_thank_you_register_provider", {
                        language,
                        submission_id: submissionId,
                        source: "thank_you_page",
                        platform_url: "https://marketing.thedigitalmorph.com/auth/sign-up",
                      });

                      // Track lead progression and open platform
                      await handlePlatformRegistration('provider', submissionId, email);
                    }}
                  >
                    <UserPlus className="h-5 w-5" />
                    {t("registration.cta.registerProvider") || "Register as Provider"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white text-white px-6 py-3 text-sm md:text-base font-semibold hover:bg-white/10 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    onClick={async (e) => {
                      e.preventDefault();
                      
                      // Track analytics
                      trackEvent("consultation_thank_you_register_client", {
                        language,
                        submission_id: submissionId,
                        source: "thank_you_page",
                        platform_url: "https://marketing.thedigitalmorph.com/auth/sign-up",
                      });

                      // Track lead progression and open platform
                      await handlePlatformRegistration('client', submissionId, email);
                    }}
                  >
                    <Users className="h-5 w-5" />
                    {t("registration.cta.registerClient") || "Register as Client"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm text-blue-200 mt-4 text-center">
                  {t("registration.cta.free") || "Free to register • No credit card required"}
                </p>
                {submissionId && (
                  <p className="text-xs text-blue-300 mt-2 text-center">
                    {t("registration.cta.tracking") || "Your consultation request will be automatically linked to your account"}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Connection Bridge Visual */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-green-200"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="bg-white px-4 py-2 rounded-full border-2 border-indigo-300 shadow-lg">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    {t("consultation.connection.bridge") || "Client ↔ Provider Connection"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Grid - Enhanced with Connection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Client Next Steps */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t("nextSteps.client.title") || "Next Steps for You (Client)"}
                  </h2>
                </div>
                <div className="space-y-4">
                  {nextStepsClient.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={index}
                        className="flex gap-4 p-4 rounded-lg bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group"
                      >
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Provider Next Steps */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-2 border-green-200 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full -ml-16 -mt-16 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t("nextSteps.provider.title") || "Next Steps for Our Team"}
                  </h2>
                </div>
                <div className="space-y-4">
                  {nextStepsProvider.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={index}
                        className="flex gap-4 p-4 rounded-lg bg-white border border-green-100 hover:border-green-300 hover:shadow-md transition-all group"
                      >
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                            <Icon className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-green-400 flex-shrink-0 mt-1 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Consultation Status Timeline */}
          {consultationData && (
            <Card className="mb-8 bg-white border-2 border-purple-200 shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {t("consultation.timeline.title") || "Consultation Timeline"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {t("consultation.timeline.subtitle") || "Track the progress of your request"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Timeline Items */}
                  <div className="relative pl-8 border-l-2 border-purple-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-gray-900">
                          {t("consultation.timeline.submitted") || "Request Submitted"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        {consultationData.createdAt 
                          ? new Date(consultationData.createdAt).toLocaleString(language === "ar" ? "ar-SA" : "en-US", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : t("consultation.timeline.justNow") || "Just now"}
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 border-l-2 border-purple-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-gray-900">
                          {t("consultation.timeline.received") || "Request Received"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        {t("consultation.timeline.receivedDesc") || "Your request has been received and is being processed"}
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 border-l-2 border-purple-300">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow animate-pulse"></div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-blue-600 animate-pulse" />
                        <span className="font-semibold text-gray-900">
                          {t("consultation.timeline.reviewing") || "Under Review"}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                          {t("consultation.timeline.current") || "Current"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        {t("consultation.timeline.reviewingDesc") || "Our team is reviewing your request"}
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 border-l-2 border-gray-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold text-gray-500">
                          {t("consultation.timeline.contact") || "We'll Contact You"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 ml-6">
                        {t("consultation.timeline.contactDesc") || "We'll reach out within 24 hours"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* How to Connect and Respond - Complete Guide */}
          <Card className="mb-8 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200 shadow-xl">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {t("consultation.connect.title") || "How to Connect & Respond"}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {t("consultation.connect.subtitle") || "Complete guide for clients and providers"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* For Clients */}
                <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {t("consultation.connect.clientTitle") || "For Clients"}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t("consultation.connect.clientStep1") || "Check Your Email"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t("consultation.connect.clientStep1Desc") || "You'll receive a confirmation email with your submission details. Check your inbox (and spam folder) for our response."}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t("consultation.connect.clientStep2") || "Wait for Our Response"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t("consultation.connect.clientStep2Desc") || "Our team will review your request and contact you within 24 hours via email or phone."}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t("consultation.connect.clientStep3") || "Reply to Our Email"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {t("consultation.connect.clientStep3Desc") || "When you receive our email, simply reply directly to continue the conversation. Your reply will be automatically tracked."}
                        </p>
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-900">
                            <strong>💡 Tip:</strong> {t("consultation.connect.clientTip") || "Reply to the same email thread to keep all communication in one place."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t("consultation.connect.clientStep4") || "Check Status Anytime"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {t("consultation.connect.clientStep4Desc") || "Bookmark this page or use the link below to check your consultation status anytime."}
                        </p>
                        {submissionId && (
                          <Link
                            href={`/consultation/status/${submissionId}`}
                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                            onClick={() => trackEvent("consultation_check_status", { submission_id: submissionId })}
                          >
                            {t("consultation.connect.viewStatus") || "View Status Page"}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* For Providers */}
                <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <UserCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {t("consultation.connect.providerTitle") || "For Providers"}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t("consultation.connect.providerStep1") || "Access Provider Dashboard"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {t("consultation.connect.providerStep1Desc") || "Log in to your provider dashboard to view all consultation requests assigned to you."}
                        </p>
                        <a
                          href="https://marketing.thedigitalmorph.com/dashboard/provider/consultations"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                          onClick={() => trackEvent("consultation_provider_dashboard_guide", { submission_id: submissionId })}
                        >
                          {t("consultation.connect.openDashboard") || "Open Dashboard"}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t("consultation.connect.providerStep2") || "Review Consultation Details"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t("consultation.connect.providerStep2Desc") || "Click on the consultation to view full details: client info, services needed, budget, timeline, and message."}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t("consultation.connect.providerStep3") || "Respond to Client"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {t("consultation.connect.providerStep3Desc") || "Send an email directly to the client from the dashboard. Your response will be automatically tracked."}
                        </p>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <p className="text-xs text-green-900">
                            <strong>💡 Tip:</strong> {t("consultation.connect.providerTip") || "Respond within 24 hours as per SLA. Use the 'Reply' button in the dashboard for quick response."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-600">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t("consultation.connect.providerStep4") || "Track Communication"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t("consultation.connect.providerStep4Desc") || "All email exchanges are automatically tracked. View the conversation history in the dashboard."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Actions */}
              <div className="mt-6 pt-6 border-t border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  {t("consultation.connect.quickActions") || "Quick Response Actions"}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      const recipientEmail = consultationData?.email || email || 'info@smartpro.io';
                      const subject = encodeURIComponent(`Re: Consultation Request - ${submissionId || ''}`);
                      const body = encodeURIComponent(`Hello,\n\nThank you for your consultation request.\n\nWe have received your submission and will review it shortly.\n\nBest regards,\nSmartPro Team`);
                      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
                      trackEvent("consultation_quick_email", { submission_id: submissionId, type: "provider_response" });
                    }}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border-2 border-amber-200 hover:border-amber-400 hover:shadow-md transition-all"
                  >
                    <Mail className="h-5 w-5 text-amber-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      {t("consultation.connect.sendEmail") || "Send Email Response"}
                    </span>
                  </button>

                  {submissionId && (
                    <Link
                      href={`/consultation/status/${submissionId}`}
                      className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border-2 border-amber-200 hover:border-amber-400 hover:shadow-md transition-all"
                      onClick={() => trackEvent("consultation_check_status_quick", { submission_id: submissionId })}
                    >
                      <Clock className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-semibold text-gray-900">
                        {t("consultation.connect.checkStatus") || "Check Status"}
                      </span>
                    </Link>
                  )}

                  <a
                    href="https://marketing.thedigitalmorph.com/dashboard/provider/consultations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border-2 border-amber-200 hover:border-amber-400 hover:shadow-md transition-all"
                    onClick={() => trackEvent("consultation_provider_dashboard_quick", { submission_id: submissionId })}
                  >
                    <ExternalLink className="h-5 w-5 text-amber-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      {t("consultation.connect.providerPortal") || "Provider Portal"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons - Less Prominent, More Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            {submissionId && (
              <Link
                href={`/consultation/status/${submissionId}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs md:text-sm font-medium text-white hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  trackEvent("consultation_thank_you_view_status", {
                    language,
                    submission_id: submissionId,
                  });
                }}
              >
                <Clock className="h-4 w-4" />
                {t("consultation.thanks.viewStatus") || "View Status & Responses"}
              </Link>
            )}
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs md:text-sm font-medium text-white hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                trackEvent("consultation_thank_you_submit_another", {
                  language,
                  submission_id: submissionId,
                });
              }}
            >
              <MessageSquare className="h-4 w-4" />
              {t("consultation.thanks.submitAnother") || "Submit Another Request"}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => {
                trackEvent("consultation_thank_you_back_to_home", {
                  language,
                  submission_id: submissionId,
                });
              }}
            >
              <Home className="h-4 w-4" />
              {t("consultation.thanks.backToHome") || "Back to Homepage"}
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

