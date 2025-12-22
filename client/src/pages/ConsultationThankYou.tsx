import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { setSEOTags } from "@/lib/seoUtils";
import { trackEvent } from "@/lib/googleAnalytics";
import { CheckCircle2, Mail, Phone, Clock, FileText, Users, ArrowRight, Home, MessageSquare, Sparkles, Shield, Zap, UserPlus, Loader2 } from "lucide-react";
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

  // Extract tracking IDs and email from URL params
  const { submissionId, executionId, email } = useMemo(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    return {
      submissionId: params.get("id") || undefined,
      executionId: params.get("execution") || undefined,
      email: params.get("email") ? decodeURIComponent(params.get("email") || "") : undefined, // Decode email
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

          {/* Next Steps Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Client Next Steps */}
            <Card className="p-6 bg-white">
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
                      className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-white rounded-lg">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Provider Next Steps */}
            <Card className="p-6 bg-white">
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
                      className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-white rounded-lg">
                          <Icon className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Action Buttons - Less Prominent, More Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
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

