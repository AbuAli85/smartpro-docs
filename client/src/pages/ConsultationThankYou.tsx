import { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { setSEOTags } from "@/lib/seoUtils";
import { trackEvent } from "@/lib/googleAnalytics";
import { CheckCircle2, Mail, Phone, Clock, FileText, Users, ArrowRight, Home, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { TrackingStatus } from "@/components/TrackingStatus";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ConsultationThankYou() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const [location] = useLocation();

  // Extract tracking IDs from URL params
  const { submissionId, executionId } = useMemo(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    return {
      submissionId: params.get("id") || undefined,
      executionId: params.get("execution") || undefined,
    };
  }, [location]);

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

          {/* Tracking Status - Always show if submissionId exists */}
          {submissionId && (
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TrackingStatus submissionId={submissionId} executionId={executionId} />
            </div>
          )}

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

