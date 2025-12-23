import { useEffect, useState, useMemo } from "react";
import { useLocation, useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { setSEOTags } from "@/lib/seoUtils";
import { trackEvent } from "@/lib/googleAnalytics";
import { getLeadStatus } from "@/lib/leadTrackingApi";
import { LeadProgress } from "@/components/LeadProgress";
import { TrackingStatus } from "@/components/TrackingStatus";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  Mail, 
  Phone, 
  Building2, 
  FileText,
  ArrowLeft,
  RefreshCw,
  XCircle
} from "lucide-react";
import { Link } from "wouter";

export default function ConsultationStatus() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute("/consultation/status/:submissionId");
  const [consultationData, setConsultationData] = useState<any>(null);
  const [leadStatus, setLeadStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const submissionId = params?.submissionId;

  useEffect(() => {
    if (!submissionId) {
      setError(t('consultationStatus.error.noId') || 'No submission ID provided');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch consultation details
        // Use environment variable or fallback to relative path for production
        const apiUrl = import.meta.env.VITE_API_URL || 
          (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');
        const consultationResponse = await fetch(`${apiUrl}/consultation/${submissionId}`);
        if (consultationResponse.ok) {
          const data = await consultationResponse.json();
          setConsultationData(data);
        } else if (consultationResponse.status === 404) {
          setError(t('consultationStatus.error.notFound') || 'Consultation not found');
        }

        // Fetch lead status
        const lead = await getLeadStatus(submissionId);
        if (lead) {
          setLeadStatus(lead);
        }

        trackEvent('consultation_status_view', {
          submission_id: submissionId,
        });
      } catch (err) {
        console.error('Error fetching consultation status:', err);
        setError(t('consultationStatus.error.fetch') || 'Failed to load consultation details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId, t]);

  useEffect(() => {
    setSEOTags({
      title: `${t("consultationStatus.title") || "Consultation Status"} | Smartpro Business Hub & Services`,
      description: t("consultationStatus.description") || "Track your consultation request status and progress",
      keywords: "consultation status, track request, business services",
      type: "website",
      url: `https://smartpro-docs.vercel.app/consultation/status/${submissionId}`,
    });
  }, [t, submissionId]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir={isRTL ? "rtl" : "ltr"}>
          <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <Card className="p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </Card>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !submissionId) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir={isRTL ? "rtl" : "ltr"}>
          <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <Card className="p-8 text-center">
              <div className="mb-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {t('consultationStatus.error.title') || 'Consultation Not Found'}
              </h1>
              <p className="text-gray-600 mb-6">
                {error || t('consultationStatus.error.message') || 'We couldn\'t find your consultation request. Please check the URL or contact support.'}
              </p>
              <Link href="/consultation">
                <Button>
                  {t('consultationStatus.error.backToForm') || 'Back to Consultation Form'}
                </Button>
              </Link>
            </Card>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir={isRTL ? "rtl" : "ltr"}>
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('consultationStatus.back') || 'Back to Home'}
              </Button>
            </Link>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('consultationStatus.title') || 'Consultation Request Status'}
            </h1>
            <p className="text-gray-600">
              {t('consultationStatus.subtitle') || 'Track your consultation request and see what happens next'}
            </p>
          </div>

          {/* Lead Progress */}
          {submissionId && (
            <div className="mb-8">
              <LeadProgress submissionId={submissionId} email={consultationData?.email} />
            </div>
          )}

          {/* Tracking Status */}
          {submissionId && (
            <div className="mb-8">
              <TrackingStatus submissionId={submissionId} />
            </div>
          )}

          {/* Consultation Details */}
          {consultationData && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {t('consultationStatus.details.title') || 'Request Details'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t('consultationStatus.details.name') || 'Name'}
                      </p>
                      <p className="text-base text-gray-900">{consultationData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t('consultationStatus.details.email') || 'Email'}
                      </p>
                      <p className="text-base text-gray-900">{consultationData.email}</p>
                    </div>
                  </div>
                  {consultationData.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {t('consultationStatus.details.phone') || 'Phone'}
                        </p>
                        <p className="text-base text-gray-900">{consultationData.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {consultationData.company && (
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {t('consultationStatus.details.company') || 'Company'}
                        </p>
                        <p className="text-base text-gray-900">{consultationData.company}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t('consultationStatus.details.submitted') || 'Submitted'}
                      </p>
                      <p className="text-base text-gray-900">
                        {new Date(consultationData.createdAt).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t('consultationStatus.details.status') || 'Status'}
                      </p>
                      <p className="text-base text-green-700 font-semibold">
                        {t('consultationStatus.details.active') || 'Active - Under Review'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t('consultationStatus.nextSteps.title') || 'What Happens Next?'}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t('consultationStatus.nextSteps.review.title') || 'Team Review'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('consultationStatus.nextSteps.review.description') || 'Our team is reviewing your request and will contact you within 24 hours.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t('consultationStatus.nextSteps.contact.title') || 'We\'ll Contact You'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('consultationStatus.nextSteps.contact.description') || 'We\'ll reach out via email or phone to discuss your needs and provide a tailored solution.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t('consultationStatus.nextSteps.solution.title') || 'Get Your Solution'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('consultationStatus.nextSteps.solution.description') || 'After our discussion, we\'ll provide you with a customized plan and next steps.'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
      <Footer />
    </>
  );
}

