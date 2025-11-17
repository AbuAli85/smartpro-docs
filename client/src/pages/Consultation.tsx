import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConsultationForm } from "@/components/ConsultationForm";
import { setSEOTags } from "@/lib/seoUtils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Consultation() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  useEffect(() => {
    setSEOTags({
      title: `${t('consultation.form.title')} | Smartpro Business Hub & Services`,
      description: t('consultation.subtitle'),
      keywords: "business consulting, company setup, PRO services, accounting, VAT, business formation, UAE business services",
      type: "website",
      url: "https://smartpro.com/consultation",
    });
  }, [t]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('consultation.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              {t('consultation.subtitle')}
            </p>
            <p className="text-lg md:text-xl text-blue-200">
              {t('consultation.description')}
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 -mt-8 md:-mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('consultation.form.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('consultation.form.subtitle')}
            </p>
          </div>
          <ConsultationForm />
        </section>
      </div>
      <Footer />
    </>
  );
}

