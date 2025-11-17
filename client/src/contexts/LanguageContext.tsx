import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Consultation page
    'consultation.title': 'Smartpro Business Hub & Services',
    'consultation.subtitle': 'Company setup, PRO services, accounting, VAT & business consulting.',
    'consultation.description': "Tell us what you need and we'll get back to you with a tailored plan.",
    'consultation.form.title': 'Get Your Free Consultation',
    'consultation.form.subtitle': 'Fill out the form below and our team will contact you within 24 hours.',
    
    // Form fields
    'form.name': 'Full Name',
    'form.email': 'Email Address',
    'form.phone': 'Phone Number',
    'form.company': 'Company Name',
    'form.businessType': 'Business Type',
    'form.service': 'Service Interested In',
    'form.services': 'Select Services',
    'form.budget': 'Estimated Budget',
    'form.timeline': 'Project Timeline',
    'form.message': 'Additional Details',
    'form.preferredContact': 'Preferred Contact Method',
    'form.preferredTime': 'Preferred Contact Time',
    'form.location': 'Location',
    'form.required': 'Required',
    'form.optional': 'Optional',
    
    // Service options
    'service.companyFormation': 'Company Formation',
    'service.proServices': 'PRO Services',
    'service.accounting': 'Accounting & Bookkeeping',
    'service.vat': 'VAT Registration & Filing',
    'service.businessConsulting': 'Business Consulting',
    'service.employeeManagement': 'Employee Management',
    'service.crm': 'CRM & Client Management',
    'service.projectManagement': 'Project Management',
    'service.elearning': 'E-Learning Platform',
    'service.contractManagement': 'Contract Management',
    'service.workflowAutomation': 'Workflow Automation',
    'service.analytics': 'Advanced Analytics',
    'service.api': 'API & Integrations',
    'service.support': '24/7 Support',
    'service.other': 'Other',
    
    // Business types
    'businessType.soleProprietorship': 'Sole Proprietorship',
    'businessType.llc': 'Limited Liability Company (LLC)',
    'businessType.partnership': 'Partnership',
    'businessType.corporation': 'Corporation',
    'businessType.freelancer': 'Freelancer',
    'businessType.other': 'Other',
    
    // Budget options
    'budget.under5k': 'Under $5,000',
    'budget.5k-10k': '$5,000 - $10,000',
    'budget.10k-25k': '$10,000 - $25,000',
    'budget.25k-50k': '$25,000 - $50,000',
    'budget.50k-100k': '$50,000 - $100,000',
    'budget.over100k': 'Over $100,000',
    'budget.notSure': 'Not Sure',
    
    // Timeline options
    'timeline.immediate': 'Immediate (Within 1 month)',
    'timeline.1-3months': '1-3 Months',
    'timeline.3-6months': '3-6 Months',
    'timeline.6-12months': '6-12 Months',
    'timeline.planning': 'Just Planning',
    
    // Contact methods
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.both': 'Both',
    
    // Contact times
    'time.morning': 'Morning (9 AM - 12 PM)',
    'time.afternoon': 'Afternoon (12 PM - 5 PM)',
    'time.evening': 'Evening (5 PM - 8 PM)',
    'time.flexible': 'Flexible',
    
    // Buttons
    'button.submit': 'Get My Free Consultation',
    'button.submitting': 'Submitting...',
    'button.select': 'Select',
    'button.changeLanguage': 'Change Language',
    
    // Messages
    'message.success': 'Thank you! We\'ve received your consultation request and will contact you within 24 hours.',
    'message.error': 'Something went wrong. Please try again or contact us directly.',
    'message.error.network': 'Network error. Please check your internet connection and try again.',
    'message.error.required': 'Please fill in all required fields',
    'message.error.email': 'Please enter a valid email address',
    'message.error.rateLimit': 'Please wait a moment before submitting again.',
    
    // Placeholders
    'placeholder.name': 'Your full name',
    'placeholder.email': 'your.email@example.com',
    'placeholder.phone': '+1 (234) 567-890',
    'placeholder.company': 'Your company name',
    'placeholder.message': 'Tell us more about your business needs, goals, and any specific requirements...',
    'placeholder.location': 'City, Country',
    
    // Sections
    'section.contactInfo': 'Contact Information',
    'section.businessInfo': 'Business Information',
    'section.serviceDetails': 'Service Details',
    'section.additionalInfo': 'Additional Information',
  },
  ar: {
    // Consultation page
    'consultation.title': 'مركز سمارت برو للأعمال والخدمات',
    'consultation.subtitle': 'تأسيس الشركات، خدمات الـ PRO، المحاسبة، ضريبة القيمة المضافة والاستشارات التجارية.',
    'consultation.description': 'أخبرنا بما تحتاجه وسنعود إليك بخطة مخصصة.',
    'consultation.form.title': 'احصل على استشارتك المجانية',
    'consultation.form.subtitle': 'املأ النموذج أدناه وسيتصل بك فريقنا خلال 24 ساعة.',
    
    // Form fields
    'form.name': 'الاسم الكامل',
    'form.email': 'عنوان البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.company': 'اسم الشركة',
    'form.businessType': 'نوع النشاط التجاري',
    'form.service': 'الخدمة المهتم بها',
    'form.services': 'اختر الخدمات',
    'form.budget': 'الميزانية المقدرة',
    'form.timeline': 'الجدول الزمني للمشروع',
    'form.message': 'تفاصيل إضافية',
    'form.preferredContact': 'طريقة الاتصال المفضلة',
    'form.preferredTime': 'وقت الاتصال المفضل',
    'form.location': 'الموقع',
    'form.required': 'مطلوب',
    'form.optional': 'اختياري',
    
    // Service options
    'service.companyFormation': 'تأسيس الشركات',
    'service.proServices': 'خدمات الـ PRO',
    'service.accounting': 'المحاسبة والمسك الدفتري',
    'service.vat': 'تسجيل ضريبة القيمة المضافة والإيداع',
    'service.businessConsulting': 'الاستشارات التجارية',
    'service.employeeManagement': 'إدارة الموظفين',
    'service.crm': 'إدارة علاقات العملاء',
    'service.projectManagement': 'إدارة المشاريع',
    'service.elearning': 'منصة التعلم الإلكتروني',
    'service.contractManagement': 'إدارة العقود',
    'service.workflowAutomation': 'أتمتة سير العمل',
    'service.analytics': 'التحليلات المتقدمة',
    'service.api': 'واجهات برمجة التطبيقات والتكامل',
    'service.support': 'الدعم على مدار الساعة',
    'service.other': 'أخرى',
    
    // Business types
    'businessType.soleProprietorship': 'مؤسسة فردية',
    'businessType.llc': 'شركة ذات مسؤولية محدودة',
    'businessType.partnership': 'شراكة',
    'businessType.corporation': 'شركة',
    'businessType.freelancer': 'مستقل',
    'businessType.other': 'أخرى',
    
    // Budget options
    'budget.under5k': 'أقل من 5,000 دولار',
    'budget.5k-10k': '5,000 - 10,000 دولار',
    'budget.10k-25k': '10,000 - 25,000 دولار',
    'budget.25k-50k': '25,000 - 50,000 دولار',
    'budget.50k-100k': '50,000 - 100,000 دولار',
    'budget.over100k': 'أكثر من 100,000 دولار',
    'budget.notSure': 'غير متأكد',
    
    // Timeline options
    'timeline.immediate': 'فوري (خلال شهر)',
    'timeline.1-3months': '1-3 أشهر',
    'timeline.3-6months': '3-6 أشهر',
    'timeline.6-12months': '6-12 شهر',
    'timeline.planning': 'التخطيط فقط',
    
    // Contact methods
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.both': 'كلاهما',
    
    // Contact times
    'time.morning': 'الصباح (9 صباحاً - 12 ظهراً)',
    'time.afternoon': 'بعد الظهر (12 ظهراً - 5 مساءً)',
    'time.evening': 'المساء (5 مساءً - 8 مساءً)',
    'time.flexible': 'مرن',
    
    // Buttons
    'button.submit': 'احصل على استشارتي المجانية',
    'button.submitting': 'جاري الإرسال...',
    'button.select': 'اختر',
    'button.changeLanguage': 'تغيير اللغة',
    
    // Messages
    'message.success': 'شكراً لك! لقد استلمنا طلب الاستشارة الخاص بك وسنتصل بك خلال 24 ساعة.',
    'message.error': 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
    'message.error.network': 'خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
    'message.error.required': 'يرجى ملء جميع الحقول المطلوبة',
    'message.error.email': 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    'message.error.rateLimit': 'يرجى الانتظار قليلاً قبل الإرسال مرة أخرى.',
    
    // Placeholders
    'placeholder.name': 'اسمك الكامل',
    'placeholder.email': 'your.email@example.com',
    'placeholder.phone': '+968 1234 5678',
    'placeholder.company': 'اسم شركتك',
    'placeholder.message': 'أخبرنا المزيد عن احتياجات عملك وأهدافك وأي متطلبات محددة...',
    'placeholder.location': 'المدينة، الدولة',
    
    // Sections
    'section.contactInfo': 'معلومات الاتصال',
    'section.businessInfo': 'معلومات العمل',
    'section.serviceDetails': 'تفاصيل الخدمة',
    'section.additionalInfo': 'معلومات إضافية',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get from localStorage or default to English
    const saved = localStorage.getItem('smartpro_language') as Language;
    return saved && (saved === 'en' || saved === 'ar') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('smartpro_language', language);
    // Set HTML dir attribute for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

