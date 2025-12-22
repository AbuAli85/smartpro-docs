import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
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
    'consultation.form.successTitle': 'Thank you, {name}!',
    'consultation.form.successMessage': 'Your consultation request has been received. We\'ll contact you within 24 hours.',
    'consultation.form.dearCustomer': 'Dear Customer',
    'consultation.form.redirecting': 'Redirecting to confirmation page...',
    
    // Consultation extras
    'consultation.heroBadge': 'Business & Corporate Services – Oman',
    'consultation.primaryCta': 'Request Your Consultation',
    'consultation.heroNote': 'No obligation • 30–45 minutes • Online or phone',
    'consultation.whoTitle': 'Is This Consultation Right for You?',
    'consultation.whoIntro': 'We work with entrepreneurs and organizations who want clarity, structure, and a professional partner in Oman.',
    'consultation.whoItem1': 'Small business owners setting up or restructuring in Oman',
    'consultation.whoItem2': 'Founders who need support with company formation and PRO services',
    'consultation.whoItem3': 'Finance and operations teams looking for reliable accounting and VAT support',
    'consultation.whoItem4': 'Decision-makers who want a long-term, professional business partner',
    'consultation.outcomesTitle': "What You'll Walk Away With",
    'consultation.outcomesIntro': 'The goal of this session is to give you clarity and a concrete next step, not just a sales call.',
    'consultation.outcome1': 'A clearer picture of your current situation and priorities',
    'consultation.outcome2': '2–3 practical recommendations tailored to your business',
    'consultation.outcome3': 'Guidance on which Smartpro services fit your needs (if any)',
    'consultation.outcome4': 'Follow-up summary via email so you can share it with your team',
    'consultation.stepsTitle': 'How the Consultation Works',
    'consultation.stepsSubtitle': 'A simple, structured process to respect your time and get to the point.',
    'consultation.stepsCta': 'Start by filling the form',
    'consultation.step1Label': 'Share your details',
    'consultation.step1Text': 'Fill in the consultation form with your business details, services of interest, and any questions.',
    'consultation.step2Label': 'We review & contact you',
    'consultation.step2Text': 'Our team reviews your request and contacts you within 24 hours to confirm the time and channel.',
    'consultation.step3Label': '1:1 strategy call',
    'consultation.step3Text': 'We walk through your situation, discuss options, and outline clear next steps for your business.',
    'consultation.faqTitle': 'Frequently Asked Questions',
    'consultation.faq1Question': 'Is the consultation really free?',
    'consultation.faq1Answer': 'Yes. The consultation is free and without obligation. If we both agree there is a good fit, we can discuss a paid engagement afterwards.',
    'consultation.faq2Question': 'How long does the session take?',
    'consultation.faq2Answer': 'Most sessions are 30–45 minutes. For more complex cases, we may schedule a follow-up call.',
    'consultation.faq3Question': 'How soon will you contact me after I submit the form?',
    'consultation.faq3Answer': 'We usually respond within 24 business hours to confirm the details and share the meeting link or call time.',
    'consultation.faq4Question': 'What should I prepare before the call?',
    'consultation.faq4Answer': 'Any licenses, company information, or questions you have. If you have existing documents, you can share them during or after the session.',
    'consultation.successTitle': 'Your request has been sent',
    'consultation.successBody': 'Thank you, {name}. Our team will review your details and contact you within 24 business hours to confirm the consultation time and share next steps.',
    'consultation.successPrivacy': 'We respect your time and privacy. Your information is used only to respond to your request and is not shared with third parties.',
    'consultation.thanks.title': 'Thank you for your request',
    'consultation.thanks.subtitle': "We've received your consultation request at Smartpro Business Hub & Services.",
    'consultation.thanks.body': 'Our team will review your details and contact you within 24 business hours to confirm the consultation time and share next steps.',
    'consultation.thanks.point1': 'Check your email (and spam folder) for a confirmation message.',
    'consultation.thanks.point2': 'If you provided a WhatsApp number, we may also contact you there.',
    'consultation.thanks.point3': "You can prepare any documents or questions you'd like to discuss during the session.",
    'consultation.thanks.backToHome': 'Back to homepage',
    
    // Tracking
    'tracking.title': 'Track Your Request',
    'tracking.submissionId': 'Submission ID',
    'tracking.executionId': 'Execution ID',
    'tracking.note': "We typically respond within 24 hours. You'll receive an email confirmation shortly.",
    'tracking.step.submitted': 'Request Submitted',
    'tracking.step.received': 'Request Received',
    'tracking.step.processing': 'Processing Your Request',
    'tracking.step.reviewing': 'Team Reviewing',
    'tracking.step.contacting': "We'll Contact You Soon",
    
    // Next Steps - Client
    'nextSteps.client.title': 'Next Steps for You (Client)',
    'nextSteps.client.email.title': 'Check Your Email',
    'nextSteps.client.email.description': "We've sent a confirmation email with your submission details.",
    'nextSteps.client.wait.title': 'Wait for Our Response',
    'nextSteps.client.wait.description': 'Our team will review your request and contact you within 24 hours.',
    'nextSteps.client.contact.title': 'Be Available',
    'nextSteps.client.contact.description': 'Keep your phone and email accessible for our team to reach you.',
    'nextSteps.client.prepare.title': 'Prepare Your Documents',
    'nextSteps.client.prepare.description': 'Have your business documents ready for the consultation.',
    
    // Next Steps - Provider
    'nextSteps.provider.title': 'Next Steps for Our Team',
    'nextSteps.provider.review.title': 'Review Request',
    'nextSteps.provider.review.description': 'The request has been received and is in the system.',
    'nextSteps.provider.notify.title': 'Client Notification',
    'nextSteps.provider.notify.description': 'Client has been notified via email confirmation.',
    'nextSteps.provider.process.title': 'Process Request',
    'nextSteps.provider.process.description': 'Assign to appropriate team member and prepare response.',
    'nextSteps.provider.followup.title': 'Follow Up',
    'nextSteps.provider.followup.description': 'Contact client within 24 hours as per SLA.',
    
    // Accessibility
    'accessibility.skipToForm': 'Skip to consultation form',
    'accessibility.formNavigation': 'Form section navigation',
    'accessibility.goToSection': 'Go to',
    'accessibility.completed': 'Completed',
    'accessibility.formProgress': 'Form progress',
    'accessibility.of': 'of',
    'accessibility.sectionsCompleted': 'sections completed',
    
    // Consultation form navigation
    'consultation.form.navigation': 'Quick Navigation',
    
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
    'button.retry': 'Retry',
    
    // Messages
    'message.success': 'Thank you! We\'ve received your consultation request and will contact you within 24 hours.',
    'message.error': 'Something went wrong. Please try again or contact us directly.',
    'message.error.network': 'Network error. Please check your internet connection and try again.',
    'message.error.required': 'Please fill in all required fields',
    'message.error.email': 'Please enter a valid email address',
    'message.error.rateLimit': 'Please wait a moment before submitting again.',
    'message.error.name': 'Name must be between 2 and 100 characters',
    'message.error.phone': 'Please enter a valid phone number',
    'message.error.company': 'Company name must be between 2 and 200 characters',
    'message.error.location': 'Location must be between 2 and 200 characters',
    'message.error.message': 'Message must not exceed 5000 characters',
    'message.error.services': 'Please select at least one service',
    'message.error.retry': 'Please check your connection and try again.',
    'message.progress': 'Form Progress',
    'message.sectionsComplete': 'sections complete',
    'message.saving': 'Saving draft...',
    'message.saved': 'Draft saved',
    'message.charactersRemaining': 'characters remaining',
    'message.charactersOver': 'characters over limit',
    'message.formCompletionEstimate': 'Estimated completion time: 3-5 minutes',
    
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
    'consultation.form.successTitle': 'شكراً لك، {name}!',
    'consultation.form.successMessage': 'تم استلام طلب الاستشارة الخاص بك. سنتواصل معك خلال 24 ساعة.',
    'consultation.form.dearCustomer': 'عزيزي العميل',
    'consultation.form.redirecting': 'جاري التوجيه إلى صفحة التأكيد...',
    
    // Consultation extras
    'consultation.heroBadge': 'خدمات الأعمال والشركات – عمان',
    'consultation.primaryCta': 'اطلب استشارتك',
    'consultation.heroNote': 'بدون التزام • 30–45 دقيقة • عبر الإنترنت أو الهاتف',
    'consultation.whoTitle': 'هل هذه الاستشارة مناسبة لك؟',
    'consultation.whoIntro': 'نعمل مع رواد الأعمال والمنظمات الذين يريدون الوضوح والهيكلة وشريكاً مهنياً في عمان.',
    'consultation.whoItem1': 'أصحاب الأعمال الصغيرة الذين يؤسسون أو يعيدون هيكلة أعمالهم في عمان',
    'consultation.whoItem2': 'المؤسسون الذين يحتاجون الدعم في تأسيس الشركات وخدمات الـ PRO',
    'consultation.whoItem3': 'فرق المالية والعمليات التي تبحث عن دعم موثوق في المحاسبة وضريبة القيمة المضافة',
    'consultation.whoItem4': 'صانعو القرار الذين يريدون شريكاً تجارياً مهنياً طويل الأمد',
    'consultation.outcomesTitle': 'ما الذي ستحصل عليه',
    'consultation.outcomesIntro': 'الهدف من هذه الجلسة هو إعطاؤك الوضوح وخطوة ملموسة تالية، وليس مجرد مكالمة مبيعات.',
    'consultation.outcome1': 'صورة أوضح عن وضعك الحالي وأولوياتك',
    'consultation.outcome2': '2–3 توصيات عملية مخصصة لعملك',
    'consultation.outcome3': 'إرشادات حول خدمات سمارت برو التي تناسب احتياجاتك (إن وجدت)',
    'consultation.outcome4': 'ملخص متابعة عبر البريد الإلكتروني حتى تتمكن من مشاركته مع فريقك',
    'consultation.stepsTitle': 'كيف تعمل الاستشارة',
    'consultation.stepsSubtitle': 'عملية بسيطة ومنظمة تحترم وقتك وتصل إلى النقطة.',
    'consultation.stepsCta': 'ابدأ بملء النموذج',
    'consultation.step1Label': 'شارك تفاصيلك',
    'consultation.step1Text': 'املأ نموذج الاستشارة بتفاصيل عملك والخدمات التي تهمك وأي أسئلة.',
    'consultation.step2Label': 'نراجع ونتصل بك',
    'consultation.step2Text': 'يراجع فريقنا طلبك ويتصل بك خلال 24 ساعة لتأكيد الوقت والقناة.',
    'consultation.step3Label': 'مكالمة استراتيجية فردية',
    'consultation.step3Text': 'نتناقش في وضعك، ونناقش الخيارات، ونحدد الخطوات التالية الواضحة لعملك.',
    'consultation.faqTitle': 'الأسئلة الشائعة',
    'consultation.faq1Question': 'هل الاستشارة مجانية حقاً؟',
    'consultation.faq1Answer': 'نعم. الاستشارة مجانية وبدون التزام. إذا اتفقنا على أن هناك توافقاً جيداً، يمكننا مناقشة تعاون مدفوع بعد ذلك.',
    'consultation.faq2Question': 'كم تستغرق الجلسة؟',
    'consultation.faq2Answer': 'معظم الجلسات تستغرق 30–45 دقيقة. للحالات الأكثر تعقيداً، قد نحدد موعداً لمكالمة متابعة.',
    'consultation.faq3Question': 'متى ستتصلون بي بعد إرسال النموذج؟',
    'consultation.faq3Answer': 'عادةً ما نرد خلال 24 ساعة عمل لتأكيد التفاصيل ومشاركة رابط الاجتماع أو وقت المكالمة.',
    'consultation.faq4Question': 'ماذا يجب أن أعد قبل المكالمة؟',
    'consultation.faq4Answer': 'أي تراخيص أو معلومات عن الشركة أو أسئلة لديك. إذا كان لديك مستندات موجودة، يمكنك مشاركتها أثناء الجلسة أو بعدها.',
    'consultation.successTitle': 'تم إرسال طلبك',
    'consultation.successBody': 'شكراً لك، {name}. سيراجع فريقنا تفاصيلك وسيتصل بك خلال 24 ساعة عمل لتأكيد وقت الاستشارة ومشاركة الخطوات التالية.',
    'consultation.successPrivacy': 'نحترم وقتك وخصوصيتك. تُستخدم معلوماتك فقط للرد على طلبك ولا يتم مشاركتها مع أطراف ثالثة.',
    'consultation.thanks.title': 'شكراً لطلبك',
    'consultation.thanks.subtitle': 'تم استلام طلب الاستشارة الخاص بك في مركز سمارت برو للأعمال والخدمات.',
    'consultation.thanks.body': 'سيقوم فريقنا بمراجعة البيانات التي أرسلتها والتواصل معك خلال مدة أقصاها 24 ساعة عمل لتأكيد موعد الجلسة ومشاركة الخطوات التالية.',
    'consultation.thanks.point1': 'يرجى التحقق من بريدك الإلكتروني (وصندوق الرسائل غير المرغوب فيها) للتأكد من استلام رسالة التأكيد.',
    'consultation.thanks.point2': 'إذا قمت بإدخال رقم واتساب، قد نقوم بالتواصل معك من خلاله أيضاً.',
    'consultation.thanks.point3': 'يمكنك تجهيز أي مستندات أو أسئلة ترغب في مناقشتها خلال جلسة الاستشارة.',
    'consultation.thanks.backToHome': 'العودة إلى الصفحة الرئيسية',
    
    // Tracking
    'tracking.title': 'تتبع طلبك',
    'tracking.submissionId': 'رقم الطلب',
    'tracking.executionId': 'رقم التنفيذ',
    'tracking.note': 'نقوم عادة بالرد خلال 24 ساعة. ستصلك رسالة تأكيد عبر البريد الإلكتروني قريباً.',
    'tracking.step.submitted': 'تم إرسال الطلب',
    'tracking.step.received': 'تم استلام الطلب',
    'tracking.step.processing': 'جاري معالجة طلبك',
    'tracking.step.reviewing': 'جاري مراجعة الفريق',
    'tracking.step.contacting': 'سنتواصل معك قريباً',
    
    // Next Steps - Client
    'nextSteps.client.title': 'الخطوات التالية لك (العميل)',
    'nextSteps.client.email.title': 'تحقق من بريدك الإلكتروني',
    'nextSteps.client.email.description': 'لقد أرسلنا رسالة تأكيد عبر البريد الإلكتروني مع تفاصيل طلبك.',
    'nextSteps.client.wait.title': 'انتظر ردنا',
    'nextSteps.client.wait.description': 'سيقوم فريقنا بمراجعة طلبك والتواصل معك خلال 24 ساعة.',
    'nextSteps.client.contact.title': 'كن متاحاً',
    'nextSteps.client.contact.description': 'احتفظ بهاتفك وبريدك الإلكتروني متاحين حتى يتمكن فريقنا من الوصول إليك.',
    'nextSteps.client.prepare.title': 'جهز مستنداتك',
    'nextSteps.client.prepare.description': 'احتفظ بمستندات عملك جاهزة للاستشارة.',
    
    // Next Steps - Provider
    'nextSteps.provider.title': 'الخطوات التالية لفريقنا',
    'nextSteps.provider.review.title': 'مراجعة الطلب',
    'nextSteps.provider.review.description': 'تم استلام الطلب وهو الآن في النظام.',
    'nextSteps.provider.notify.title': 'إشعار العميل',
    'nextSteps.provider.notify.description': 'تم إشعار العميل عبر رسالة تأكيد بريد إلكتروني.',
    'nextSteps.provider.process.title': 'معالجة الطلب',
    'nextSteps.provider.process.description': 'تعيين إلى عضو الفريق المناسب وإعداد الرد.',
    'nextSteps.provider.followup.title': 'المتابعة',
    'nextSteps.provider.followup.description': 'التواصل مع العميل خلال 24 ساعة وفقاً لاتفاقية مستوى الخدمة.',
    
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
    'button.retry': 'إعادة المحاولة',
    
    // Messages
    'message.success': 'شكراً لك! لقد استلمنا طلب الاستشارة الخاص بك وسنتصل بك خلال 24 ساعة.',
    'message.error': 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
    'message.error.network': 'خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
    'message.error.required': 'يرجى ملء جميع الحقول المطلوبة',
    'message.error.email': 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    'message.error.rateLimit': 'يرجى الانتظار قليلاً قبل الإرسال مرة أخرى.',
    'message.error.name': 'يجب أن يكون الاسم بين 2 و 100 حرف',
    'message.error.phone': 'يرجى إدخال رقم هاتف صحيح',
    'message.error.company': 'يجب أن يكون اسم الشركة بين 2 و 200 حرف',
    'message.error.location': 'يجب أن يكون الموقع بين 2 و 200 حرف',
    'message.error.message': 'يجب ألا تتجاوز الرسالة 5000 حرف',
    'message.error.services': 'يرجى اختيار خدمة واحدة على الأقل',
    'message.error.retry': 'يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
    'message.progress': 'تقدم النموذج',
    'message.sectionsComplete': 'أقسام مكتملة',
    'message.saving': 'جاري حفظ المسودة...',
    'message.saved': 'تم حفظ المسودة',
    'message.charactersRemaining': 'حرف متبقي',
    'message.charactersOver': 'حرف فوق الحد المسموح',
    'message.formCompletionEstimate': 'الوقت المقدر للإكمال: 3-5 دقائق',
    
    // Accessibility
    'accessibility.skipToForm': 'انتقل إلى نموذج الاستشارة',
    'accessibility.formNavigation': 'تنقل أقسام النموذج',
    'accessibility.goToSection': 'انتقل إلى',
    'accessibility.completed': 'مكتمل',
    'accessibility.formProgress': 'تقدم النموذج',
    'accessibility.of': 'من',
    'accessibility.sectionsCompleted': 'أقسام مكتملة',
    
    // Consultation form navigation
    'consultation.form.navigation': 'تنقل سريع',
    
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
    // Get from URL (pathname or query param), localStorage, or default to English
    if (typeof window !== 'undefined') {
      let detectedLang: Language | null = null;
      
      // Priority 1: Check pathname (e.g., /ar or /en)
      const pathname = window.location.pathname;
      if (pathname === '/ar' || pathname.startsWith('/ar/')) {
        detectedLang = 'ar';
      } else if (pathname === '/en' || pathname.startsWith('/en/')) {
        detectedLang = 'en';
      }
      
      // Priority 2: Check URL query parameter (e.g., ?lang=ar)
      if (!detectedLang) {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang') as Language;
        if (urlLang && (urlLang === 'en' || urlLang === 'ar')) {
          detectedLang = urlLang;
        }
      }
      
      // Priority 3: Check localStorage
      if (!detectedLang) {
        const saved = localStorage.getItem('smartpro_language') as Language;
        if (saved && (saved === 'en' || saved === 'ar')) {
          detectedLang = saved;
        }
      }
      
      // Default to English
      const lang = detectedLang || 'en';
      
      // Persist to localStorage if we detected it from URL
      if (detectedLang && (pathname.includes('/ar') || pathname.includes('/en') || window.location.search.includes('lang='))) {
        localStorage.setItem('smartpro_language', lang);
      }
      
      // Set HTML attributes immediately on initialization
      const htmlElement = document.documentElement;
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      htmlElement.setAttribute('dir', dir);
      htmlElement.setAttribute('lang', lang);
      
      // Set body attribute when available
      if (document.body) {
        document.body.setAttribute('dir', dir);
      } else {
        // If body doesn't exist yet, wait for it
        const observer = new MutationObserver(() => {
          if (document.body) {
            document.body.setAttribute('dir', dir);
            observer.disconnect();
          }
        });
        observer.observe(document.documentElement, { childList: true });
      }
      
      return lang;
    }
    return 'en';
  });
  
  // Use ref to track current language for setLanguage callback
  const languageRef = useRef(language);
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set HTML dir attribute for RTL support
      const htmlElement = document.documentElement;
      const dir = language === 'ar' ? 'rtl' : 'ltr';
      
      htmlElement.setAttribute('dir', dir);
      htmlElement.setAttribute('lang', language);
      
      // Also set on body for better compatibility
      const bodyElement = document.body;
      if (bodyElement) {
        bodyElement.setAttribute('dir', dir);
      }
      
      // Save to localStorage
      localStorage.setItem('smartpro_language', language);
      
      // Force a reflow to ensure styles apply
      void htmlElement.offsetHeight;
      
      // Only log in development
      if (import.meta.env.DEV) {
        console.log('🌐 Language effect: Set to', language, 'dir:', dir);
      }
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    const isDev = import.meta.env.DEV;
    
    // Prevent unnecessary updates using ref to avoid stale closure
    if (languageRef.current === lang) {
      if (isDev) {
        console.log('🔄 Language already set to', lang);
      }
      return;
    }
    
    if (isDev) {
      console.log('🔄 Setting language to:', lang);
      console.log('🔄 Current language before change:', languageRef.current);
    }
    
    // Update state - this will trigger useEffect and re-renders
    setLanguageState(lang);
    
    // Force immediate DOM update (don't wait for useEffect)
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement;
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      
      // Update HTML attributes immediately
      htmlElement.setAttribute('dir', dir);
      htmlElement.setAttribute('lang', lang);
      
      // Update body if available
      const bodyElement = document.body;
      if (bodyElement) {
        bodyElement.setAttribute('dir', dir);
      }
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('smartpro_language', lang);
      } catch (error) {
        if (isDev) {
          console.warn('Failed to save language to localStorage:', error);
        }
      }
      
      // Force a reflow to ensure styles apply
      void htmlElement.offsetHeight;
      
      // Dispatch custom event for components that might be listening
      try {
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
      } catch (error) {
        if (isDev) {
          console.warn('Failed to dispatch languagechange event:', error);
        }
      }
      
      // Verify the update was applied
      const verifyUpdate = () => {
        const currentLang = htmlElement.getAttribute('lang');
        const currentDir = htmlElement.getAttribute('dir');
        
        if (currentLang !== lang || currentDir !== dir) {
          // Force update if verification fails
          htmlElement.setAttribute('dir', dir);
          htmlElement.setAttribute('lang', lang);
          if (bodyElement) {
            bodyElement.setAttribute('dir', dir);
          }
          if (isDev) {
            console.warn('🔄 Language attributes mismatch detected, forced update');
          }
        }
      };
      
      // Verify after a short delay
      setTimeout(verifyUpdate, 10);
      
      if (isDev) {
        console.log('🔄 Language set to:', lang);
        console.log('🔄 HTML dir attribute:', htmlElement.getAttribute('dir'));
        console.log('🔄 HTML lang attribute:', htmlElement.getAttribute('lang'));
      }
    }
  }, []);

  // Memoize the translation function to prevent recreation on every render
  const t = useMemo(() => {
    return (key: string, params?: Record<string, string>): string => {
      const translation = translations[language]?.[key];
      if (!translation) {
        // Fallback to English if translation is missing
        const fallback = translations['en']?.[key];
        if (fallback) {
          console.warn(`Translation missing for key "${key}" in language "${language}", using English fallback`);
          // Apply params to fallback if provided
          if (params) {
            return Object.entries(params).reduce(
              (str, [paramKey, paramValue]) => str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue),
              fallback
            );
          }
          return fallback;
        }
        console.warn(`Translation missing for key "${key}" in all languages`);
        return key;
      }
      // Apply parameter replacements if provided
      if (params) {
        return Object.entries(params).reduce(
          (str, [paramKey, paramValue]) => str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue),
          translation
        );
      }
      return translation;
    };
  }, [language]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    if (import.meta.env.DEV) {
      console.log('🔄 LanguageContext: Creating new context value, language:', language);
    }
    return {
      language,
      setLanguage,
      t,
    };
  }, [language, t, setLanguage]);

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

