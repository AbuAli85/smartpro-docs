import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConsultationForm } from "@/components/ConsultationForm";
import { setSEOTags } from "@/lib/seoUtils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Consultation() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  useEffect(() => {
    setSEOTags({
      title: `${t("consultation.form.title")} | Smartpro Business Hub & Services`,
      description: t("consultation.subtitle"),
      keywords:
        "business consulting, company setup, PRO services, accounting, VAT, business formation, UAE business services, Smartpro Business Hub",
      type: "website",
      url: "https://smartpro-docs.vercel.app/consultation",
    });
  }, [t]);

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs md:text-sm font-medium uppercase tracking-wide">
              {t("consultation.heroBadge")}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {t("consultation.title")}
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t("consultation.subtitle")}
            </p>
            <p className="text-base md:text-lg text-blue-200 max-w-3xl mx-auto">
              {t("consultation.description")}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#consultation-form"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm md:text-base font-semibold text-blue-700 shadow-lg shadow-blue-900/20 hover:bg-blue-50 transition"
              >
                {t("consultation.primaryCta")}
              </a>
              <p className="text-xs md:text-sm text-blue-100">
                {t("consultation.heroNote")}
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section
          id="consultation-form"
          className="max-w-4xl mx-auto px-4 py-12 md:py-16 -mt-8 md:-mt-12 relative z-10"
        >
          <div className="bg-white shadow-xl shadow-slate-900/5 rounded-2xl border border-slate-100 p-6 md:p-8">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t("consultation.form.title")}
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                {t("consultation.form.subtitle")}
              </p>
            </div>
            <ConsultationForm />
          </div>
        </section>

        {/* Who This Is For / What You Get */}
        <section className="max-w-5xl mx-auto px-4 pb-8 md:pb-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Who This Is For */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 md:p-7 shadow-sm">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                {t("consultation.whoTitle")}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t("consultation.whoIntro")}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• {t("consultation.whoItem1")}</li>
                <li>• {t("consultation.whoItem2")}</li>
                <li>• {t("consultation.whoItem3")}</li>
                <li>• {t("consultation.whoItem4")}</li>
              </ul>
            </div>

            {/* What You'll Get */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-100 p-6 md:p-7 shadow-sm">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                {t("consultation.outcomesTitle")}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t("consultation.outcomesIntro")}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• {t("consultation.outcome1")}</li>
                <li>• {t("consultation.outcome2")}</li>
                <li>• {t("consultation.outcome3")}</li>
                <li>• {t("consultation.outcome4")}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-5xl mx-auto px-4 pb-10 md:pb-14">
          <div className="bg-slate-900 rounded-2xl text-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-1">
                  {t("consultation.stepsTitle")}
                </h3>
                <p className="text-sm md:text-base text-slate-200">
                  {t("consultation.stepsSubtitle")}
                </p>
              </div>
              <a
                href="#consultation-form"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-xs md:text-sm font-medium text-slate-50 border border-white/20 hover:bg-white/20 transition"
              >
                {t("consultation.stepsCta")}
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
                <p className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                  1 · {t("consultation.step1Label")}
                </p>
                <p className="text-sm text-slate-100">
                  {t("consultation.step1Text")}
                </p>
              </div>
              <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
                <p className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                  2 · {t("consultation.step2Label")}
                </p>
                <p className="text-sm text-slate-100">
                  {t("consultation.step2Text")}
                </p>
              </div>
              <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
                <p className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                  3 · {t("consultation.step3Label")}
                </p>
                <p className="text-sm text-slate-100">
                  {t("consultation.step3Text")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-4 pb-16 md:pb-20">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              {t("consultation.faqTitle")}
            </h3>
            <div className="space-y-4 text-sm md:text-base text-gray-700">
              <div>
                <p className="font-semibold mb-1">
                  {t("consultation.faq1Question")}
                </p>
                <p className="text-gray-600">{t("consultation.faq1Answer")}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">
                  {t("consultation.faq2Question")}
                </p>
                <p className="text-gray-600">{t("consultation.faq2Answer")}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">
                  {t("consultation.faq3Question")}
                </p>
                <p className="text-gray-600">{t("consultation.faq3Answer")}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">
                  {t("consultation.faq4Question")}
                </p>
                <p className="text-gray-600">{t("consultation.faq4Answer")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

