import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

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
    // Navigation
    'nav.home': 'Home',
    'nav.forProviders': 'For Providers',
    'nav.forClients': 'For Clients',
    'nav.company': 'Company',
    'nav.resources': 'Resources',
    'nav.getStarted': 'Get Started',
    'nav.howItWorks': 'How It Works',
    'nav.earnMore': 'Earn More',
    'nav.findProfessionals': 'Find Professionals',
    'nav.pricing': 'Pricing',
    'nav.roiCalculator': 'ROI Calculator',
    'nav.aboutUs': 'About Us',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.comparison': 'Comparison',
    'nav.caseStudies': 'Case Studies',
    'nav.visitMainPlatform': 'Visit Main Platform',
    'nav.startFreeTrial': 'Start Free Trial',
    'nav.loading': 'Loading...',
    
    // Footer
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.features': 'Features',
    'footer.security': 'Security',
    'footer.integrations': 'Integrations',
    'footer.careers': 'Careers',
    'footer.documentation': 'Documentation',
    'footer.apiReference': 'API Reference',
    'footer.helpCenter': 'Help Center',
    'footer.community': 'Community',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.cookiePolicy': 'Cookie Policy',
    'footer.compliance': 'Compliance',
    'footer.unifiedBusinessPlatform': 'Unified business platform for mid-market companies.',
    'footer.allRightsReserved': 'All rights reserved.',
    'footer.subscribeNewsletter': 'Subscribe to Our Newsletter',
    'footer.newsletterDescription': 'Get the latest updates and insights delivered to your inbox.',
    'footer.enterEmail': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.soc2Certified': 'SOC 2 Type II Certified',
    'footer.gdprCompliant': 'GDPR Compliant',
    'footer.iso27001Certified': 'ISO 27001 Certified',
    'footer.uptimeSLA': '99.9% Uptime SLA',
    
    // Home Page
    'home.enterpriseMarketplace': 'Enterprise-Grade Marketplace',
    'home.heroTitle': 'The Professional Services Marketplace Built for Enterprise',
    'home.heroSubtitle': 'Connect with verified professionals, manage contracts, and scale your business with enterprise-grade tools.',
    'home.getStarted': 'Get Started Free',
    'home.scheduleDemo': 'Schedule a Demo',
    'home.trustedBy': 'Trusted by leading organizations',
    'home.professionals': '10,000+',
    'home.professionalsLabel': 'Verified Professionals',
    'home.processed': '$50M+',
    'home.processedLabel': 'Transactions Processed',
    'home.companies': '500+',
    'home.companiesLabel': 'Enterprise Clients',
    'home.uptime': '99.9%',
    'home.uptimeLabel': 'Uptime SLA',
    'home.heroSubtitleFull': 'Connect with verified professionals, manage contracts, and scale your business with enterprise-grade features that serious service providers and organizations demand.',
    'home.forServiceProviders': 'For Service Providers',
    'home.forOrganizations': 'For Organizations',
    'home.verifiedProfessionals': 'Verified Professionals',
    'home.transactionsProcessed': 'Transactions Processed',
    'home.satisfactionRate': 'Satisfaction Rate',
    'home.contractManagement': 'Contract Management',
    'home.contractManagementDesc': 'Automated workflows & approvals',
    'home.bookingSystem': 'Booking System',
    'home.bookingSystemDesc': 'Integrated scheduling & reminders',
    'home.securePayments': 'Secure Payments',
    'home.securePaymentsDesc': 'Stripe integration with escrow',
    'home.enterpriseSecurity': 'Enterprise Security',
    'home.enterpriseSecurityDesc': 'MFA, RLS, audit logging',
    
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
    
    // Common
    'common.close': 'Close',
    'common.open': 'Open',
    'common.menu': 'Menu',
    'common.search': 'Search',
    'common.language': 'Language',
    'common.english': 'English',
    'common.arabic': 'العربية',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.forProviders': 'للمزودين',
    'nav.forClients': 'للعملاء',
    'nav.company': 'الشركة',
    'nav.resources': 'الموارد',
    'nav.getStarted': 'ابدأ الآن',
    'nav.howItWorks': 'كيف يعمل',
    'nav.earnMore': 'اكسب المزيد',
    'nav.findProfessionals': 'ابحث عن المحترفين',
    'nav.pricing': 'الأسعار',
    'nav.roiCalculator': 'حاسبة العائد على الاستثمار',
    'nav.aboutUs': 'من نحن',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.comparison': 'المقارنة',
    'nav.caseStudies': 'دراسات الحالة',
    'nav.visitMainPlatform': 'زيارة المنصة الرئيسية',
    'nav.startFreeTrial': 'ابدأ التجربة المجانية',
    'nav.loading': 'جاري التحميل...',
    
    // Footer
    'footer.product': 'المنتج',
    'footer.company': 'الشركة',
    'footer.resources': 'الموارد',
    'footer.legal': 'قانوني',
    'footer.features': 'المميزات',
    'footer.security': 'الأمان',
    'footer.integrations': 'التكاملات',
    'footer.careers': 'الوظائف',
    'footer.documentation': 'التوثيق',
    'footer.apiReference': 'مرجع API',
    'footer.helpCenter': 'مركز المساعدة',
    'footer.community': 'المجتمع',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'footer.cookiePolicy': 'سياسة ملفات تعريف الارتباط',
    'footer.compliance': 'الامتثال',
    'footer.unifiedBusinessPlatform': 'منصة أعمال موحدة للشركات متوسطة الحجم.',
    'footer.allRightsReserved': 'جميع الحقوق محفوظة.',
    'footer.subscribeNewsletter': 'اشترك في نشرتنا الإخبارية',
    'footer.newsletterDescription': 'احصل على آخر التحديثات والرؤى مباشرة إلى بريدك الوارد.',
    'footer.enterEmail': 'أدخل بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.soc2Certified': 'معتمد SOC 2 Type II',
    'footer.gdprCompliant': 'متوافق مع GDPR',
    'footer.iso27001Certified': 'معتمد ISO 27001',
    'footer.uptimeSLA': '99.9% ضمان وقت التشغيل',
    
    // Home Page
    'home.enterpriseMarketplace': 'سوق على مستوى المؤسسات',
    'home.heroTitle': 'سوق الخدمات المهنية المبنية للمؤسسات',
    'home.heroSubtitle': 'تواصل مع محترفين موثقين، وأدر العقود، وقم بتوسيع عملك باستخدام أدوات على مستوى المؤسسات.',
    'home.getStarted': 'ابدأ مجاناً',
    'home.scheduleDemo': 'جدولة عرض توضيحي',
    'home.trustedBy': 'موثوق به من قبل المنظمات الرائدة',
    'home.professionals': '10,000+',
    'home.professionalsLabel': 'محترف موثق',
    'home.processed': '50 مليون دولار+',
    'home.processedLabel': 'معاملة معالجة',
    'home.companies': '500+',
    'home.companiesLabel': 'عميل مؤسسي',
    'home.uptime': '99.9%',
    'home.uptimeLabel': 'ضمان وقت التشغيل',
    'home.heroSubtitleFull': 'تواصل مع محترفين موثقين، وأدر العقود، وقم بتوسيع عملك باستخدام ميزات على مستوى المؤسسات التي يطالب بها مزودو الخدمات والمنظمات الجادة.',
    'home.forServiceProviders': 'لمزودي الخدمات',
    'home.forOrganizations': 'للمنظمات',
    'home.verifiedProfessionals': 'محترف موثق',
    'home.transactionsProcessed': 'معاملة معالجة',
    'home.satisfactionRate': 'معدل الرضا',
    'home.contractManagement': 'إدارة العقود',
    'home.contractManagementDesc': 'سير عمل تلقائي وموافقات',
    'home.bookingSystem': 'نظام الحجز',
    'home.bookingSystemDesc': 'جدولة متكاملة وتذكيرات',
    'home.securePayments': 'مدفوعات آمنة',
    'home.securePaymentsDesc': 'تكامل Stripe مع الضمان',
    'home.enterpriseSecurity': 'أمان المؤسسات',
    'home.enterpriseSecurityDesc': 'MFA، RLS، تسجيل التدقيق',
    
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
    
    // Common
    'common.close': 'إغلاق',
    'common.open': 'فتح',
    'common.menu': 'القائمة',
    'common.search': 'بحث',
    'common.language': 'اللغة',
    'common.english': 'English',
    'common.arabic': 'العربية',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get from localStorage or default to English
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('smartpro_language') as Language;
      return saved && (saved === 'en' || saved === 'ar') ? saved : 'en';
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('smartpro_language', language);
      // Set HTML dir attribute for RTL support
      const htmlElement = document.documentElement;
      htmlElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
      htmlElement.setAttribute('lang', language);
      
      // Also set on body for better compatibility
      const bodyElement = document.body;
      if (bodyElement) {
        bodyElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
      }
      
      // Force a reflow to ensure styles apply
      htmlElement.offsetHeight;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Memoize the translation function to prevent recreation on every render
  const t = useMemo(() => {
    return (key: string): string => {
      const translation = translations[language]?.[key];
      if (!translation) {
        // Fallback to English if translation is missing
        const fallback = translations['en']?.[key];
        if (fallback) {
          console.warn(`Translation missing for key "${key}" in language "${language}", using English fallback`);
          return fallback;
        }
        console.warn(`Translation missing for key "${key}" in all languages`);
        return key;
      }
      return translation;
    };
  }, [language]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
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

