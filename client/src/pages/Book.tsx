import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, Phone, Mail, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setSEOTags } from "@/lib/seoUtils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Book() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  useEffect(() => {
    setSEOTags({
      title: isRTL 
        ? "جدولة مكالمة | مركز سمارت برو للأعمال والخدمات"
        : "Schedule a Call | Smartpro Business Hub & Services",
      description: isRTL
        ? "جدولة مكالمة استشارية مع فريق سمارت برو. اختر الوقت المناسب لك ونحن سنجهز كل شيء."
        : "Schedule a consultation call with Smartpro team. Choose a time that works for you and we'll take care of the rest.",
      keywords: isRTL
        ? "جدولة مكالمة, استشارة, سمارت برو, خدمات الأعمال"
        : "schedule call, consultation, booking, smartpro, business services",
      type: "website",
      url: "https://thesmartpro.io/book",
    });
  }, [isRTL]);

  const breadcrumbItems = [
    { label: isRTL ? "الرئيسية" : "Home", href: "/" },
    { label: isRTL ? "جدولة مكالمة" : "Schedule a Call" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Available time slots (in 30-minute intervals)
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  ];

  const services = [
    { value: "accounting", label: isRTL ? "المحاسبة والضرائب" : "Accounting & Tax" },
    { value: "pro-services", label: isRTL ? "خدمات PRO" : "PRO Services" },
    { value: "company-formation", label: isRTL ? "تأسيس الشركات" : "Company Formation" },
    { value: "consultation", label: isRTL ? "استشارات الأعمال" : "Business Consultation" },
    { value: "other", label: isRTL ? "أخرى" : "Other" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate || !formData.preferredTime) {
        setError(isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError(isRTL ? "يرجى إدخال عنوان بريد إلكتروني صحيح" : "Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Validate date (must be in the future)
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        setError(isRTL ? "يرجى اختيار تاريخ في المستقبل" : "Please select a future date");
        setLoading(false);
        return;
      }

      // Simulate API call (in production, this would send to your booking API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, you would send this to your booking endpoint:
      // const response = await fetch('/api/book-call', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        preferredDate: "",
        preferredTime: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || (isRTL ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "An error occurred. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir={isRTL ? "rtl" : "ltr"}>
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
              <Phone className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRTL ? "جدولة مكالمة استشارية" : "Schedule a Consultation Call"}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {isRTL
                ? "اختر الوقت المناسب لك وسنتواصل معك في أقرب وقت ممكن"
                : "Choose a time that works for you and we'll get back to you as soon as possible"}
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-10 shadow-xl">
              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {isRTL
                      ? "تم إرسال طلبك بنجاح! سنتواصل معك قريباً لتأكيد الموعد."
                      : "Your booking request has been sent successfully! We'll contact you soon to confirm the appointment."}
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {isRTL ? "معلومات التواصل" : "Contact Information"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "الاسم الكامل *" : "Full Name *"}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "البريد الإلكتروني *" : "Email Address *"}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={isRTL ? "example@email.com" : "example@email.com"}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "رقم الهاتف *" : "Phone Number *"}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={isRTL ? "+971 50 123 4567" : "+971 50 123 4567"}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "اسم الشركة" : "Company Name"}
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={isRTL ? "اسم الشركة (اختياري)" : "Company name (optional)"}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? "الخدمة المطلوبة" : "Service of Interest"}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">
                      {isRTL ? "اختر الخدمة" : "Select a service"}
                    </option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Selection */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {isRTL ? "اختر التاريخ والوقت" : "Select Date & Time"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-2" />
                        {isRTL ? "التاريخ المفضل *" : "Preferred Date *"}
                      </label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-2" />
                        {isRTL ? "الوقت المفضل *" : "Preferred Time *"}
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        required
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">
                          {isRTL ? "اختر الوقت" : "Select a time"}
                        </option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    {isRTL
                      ? "المنطقة الزمنية: " + formData.timezone
                      : "Timezone: " + formData.timezone}
                  </p>
                </div>

                {/* Additional Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {isRTL ? "رسالة إضافية (اختياري)" : "Additional Message (Optional)"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      isRTL
                        ? "أخبرنا عن احتياجاتك أو أي معلومات إضافية..."
                        : "Tell us about your needs or any additional information..."
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {isRTL ? "جاري الإرسال..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      {isRTL ? "إرسال طلب الحجز" : "Submit Booking Request"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Additional Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isRTL ? "مكالمة سريعة" : "Quick Response"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isRTL
                    ? "سنرد عليك خلال 24 ساعة"
                    : "We'll respond within 24 hours"}
                </p>
              </Card>

              <Card className="p-6 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isRTL ? "مرونة في المواعيد" : "Flexible Scheduling"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isRTL
                    ? "اختر الوقت الذي يناسبك"
                    : "Choose a time that works for you"}
                </p>
              </Card>

              <Card className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isRTL ? "تأكيد فوري" : "Instant Confirmation"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isRTL
                    ? "ستتلقى تأكيداً عبر البريد الإلكتروني"
                    : "You'll receive email confirmation"}
                </p>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

