import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { setSEOTags } from "@/lib/seoUtils";

export default function Consultation() {
  useEffect(() => {
    setSEOTags({
      title: "Get Your Free Consultation | Smartpro Business Hub & Services",
      description: "Company setup, PRO services, accounting, VAT & business consulting. Tell us what you need and we'll get back to you with a tailored plan.",
      keywords: "business consulting, company setup, PRO services, accounting, VAT, business formation, UAE business services",
      type: "website",
      url: "https://smartpro.com/consultation",
    });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Smartpro Business Hub & Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              Company setup, PRO services, accounting, VAT & business consulting.
            </p>
            <p className="text-lg md:text-xl text-blue-200">
              Tell us what you need and we'll get back to you with a tailored plan.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-2xl mx-auto px-4 py-12 md:py-16 -mt-8 md:-mt-12">
          <LeadForm />
        </section>
      </div>
      <Footer />
    </>
  );
}

