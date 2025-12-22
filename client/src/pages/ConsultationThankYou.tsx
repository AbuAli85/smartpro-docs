import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { setSEOTags } from "@/lib/seoUtils";
import { trackEvent } from "@/lib/googleAnalytics";
import { CheckCircle2 } from "lucide-react";

export default function ConsultationThankYou() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  useEffect(() => {
    setSEOTags({
      title: `${t("consultation.thanks.title")} | Smartpro Business Hub & Services`,
      description: t("consultation.thanks.subtitle"),
      keywords:
        "smartpro consultation, business services UAE, company setup, PRO services, accounting, VAT",
      type: "website",
      url: "https://smartpro-docs.vercel.app/consultation/thanks",
    });

    // Track thank you page view
    trackEvent("consultation_thank_you_view", {
      language,
      timestamp: new Date().toISOString(),
    });
  }, [t, language]);

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <section 
          className="max-w-3xl mx-auto px-4 py-16 md:py-24"
          aria-labelledby="thank-you-title"
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-6 md:p-10 text-center">
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
            <div className="space-y-2 text-xs md:text-sm text-gray-500 mb-6">
              <p>{t("consultation.thanks.point1")}</p>
              <p>{t("consultation.thanks.point2")}</p>
              <p>{t("consultation.thanks.point3")}</p>
            </div>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-xs md:text-sm font-medium text-white hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              onClick={() => {
                trackEvent("consultation_thank_you_back_to_home", {
                  language,
                });
              }}
            >
              {t("consultation.thanks.backToHome")}
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

