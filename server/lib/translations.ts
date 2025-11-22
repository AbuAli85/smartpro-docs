/**
 * Translation utilities for form data
 * Translates form field keys to their display values based on language
 */

type Language = 'en' | 'ar';

/**
 * Service translations
 * Note: Services are mapped to English names for Make.com routing,
 * but we can provide Arabic translations for display in notes
 */
const SERVICE_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'companyFormation': 'Company Formation',
    'proServices': 'PRO Services',
    'accounting': 'Accounting & Bookkeeping',
    'vat': 'VAT Registration & Filing',
    'businessConsulting': 'Business Consulting',
    'employeeManagement': 'Employee Management',
    'crm': 'CRM & Client Management',
    'projectManagement': 'Project Management',
    'elearning': 'E-Learning Platform',
    'contractManagement': 'Contract Management',
    'workflowAutomation': 'Workflow Automation',
    'analytics': 'Advanced Analytics',
    'api': 'API & Integrations',
    'support': '24/7 Support',
    'other': 'Other',
  },
  ar: {
    'companyFormation': 'تأسيس الشركات',
    'proServices': 'خدمات الـ PRO',
    'accounting': 'المحاسبة والمسك الدفتري',
    'vat': 'تسجيل ضريبة القيمة المضافة والإيداع',
    'businessConsulting': 'الاستشارات التجارية',
    'employeeManagement': 'إدارة الموظفين',
    'crm': 'إدارة علاقات العملاء',
    'projectManagement': 'إدارة المشاريع',
    'elearning': 'منصة التعلم الإلكتروني',
    'contractManagement': 'إدارة العقود',
    'workflowAutomation': 'أتمتة سير العمل',
    'analytics': 'التحليلات المتقدمة',
    'api': 'واجهات برمجة التطبيقات والتكامل',
    'support': 'الدعم على مدار الساعة',
    'other': 'أخرى',
  },
};

/**
 * Business type translations
 */
const BUSINESS_TYPE_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'soleProprietorship': 'Sole Proprietorship',
    'llc': 'Limited Liability Company (LLC)',
    'partnership': 'Partnership',
    'corporation': 'Corporation',
    'freelancer': 'Freelancer',
    'other': 'Other',
  },
  ar: {
    'soleProprietorship': 'مؤسسة فردية',
    'llc': 'شركة ذات مسؤولية محدودة',
    'partnership': 'شراكة',
    'corporation': 'شركة',
    'freelancer': 'مستقل',
    'other': 'أخرى',
  },
};

/**
 * Budget translations
 */
const BUDGET_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'under5k': 'Under $5,000',
    '5k-10k': '$5,000 - $10,000',
    '10k-25k': '$10,000 - $25,000',
    '25k-50k': '$25,000 - $50,000',
    '50k-100k': '$50,000 - $100,000',
    'over100k': 'Over $100,000',
    'notSure': 'Not Sure',
  },
  ar: {
    'under5k': 'أقل من 5,000 دولار',
    '5k-10k': '5,000 - 10,000 دولار',
    '10k-25k': '10,000 - 25,000 دولار',
    '25k-50k': '25,000 - 50,000 دولار',
    '50k-100k': '50,000 - 100,000 دولار',
    'over100k': 'أكثر من 100,000 دولار',
    'notSure': 'غير متأكد',
  },
};

/**
 * Timeline translations
 */
const TIMELINE_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'immediate': 'Immediate (Within 1 month)',
    '1-3months': '1-3 Months',
    '3-6months': '3-6 Months',
    '6-12months': '6-12 Months',
    'planning': 'Just Planning',
  },
  ar: {
    'immediate': 'فوري (خلال شهر)',
    '1-3months': '1-3 أشهر',
    '3-6months': '3-6 أشهر',
    '6-12months': '6-12 شهر',
    'planning': 'التخطيط فقط',
  },
};

/**
 * Contact method translations
 */
const CONTACT_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'email': 'Email',
    'phone': 'Phone',
    'both': 'Both',
  },
  ar: {
    'email': 'البريد الإلكتروني',
    'phone': 'الهاتف',
    'both': 'كلاهما',
  },
};

/**
 * Contact time translations
 */
const TIME_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'morning': 'Morning (9 AM - 12 PM)',
    'afternoon': 'Afternoon (12 PM - 5 PM)',
    'evening': 'Evening (5 PM - 8 PM)',
    'flexible': 'Flexible',
  },
  ar: {
    'morning': 'الصباح (9 صباحاً - 12 ظهراً)',
    'afternoon': 'بعد الظهر (12 ظهراً - 5 مساءً)',
    'evening': 'المساء (5 مساءً - 8 مساءً)',
    'flexible': 'مرن',
  },
};

/**
 * Translates business type key to display value
 */
export function translateBusinessType(key: string | undefined, language: Language = 'en'): string | undefined {
  if (!key) return undefined;
  return BUSINESS_TYPE_TRANSLATIONS[language][key] || key;
}

/**
 * Translates budget key to display value
 */
export function translateBudget(key: string | undefined, language: Language = 'en'): string | undefined {
  if (!key) return undefined;
  return BUDGET_TRANSLATIONS[language][key] || key;
}

/**
 * Translates timeline key to display value
 */
export function translateTimeline(key: string | undefined, language: Language = 'en'): string | undefined {
  if (!key) return undefined;
  return TIMELINE_TRANSLATIONS[language][key] || key;
}

/**
 * Translates contact method key to display value
 */
export function translateContactMethod(key: string | undefined, language: Language = 'en'): string | undefined {
  if (!key) return undefined;
  return CONTACT_TRANSLATIONS[language][key] || key;
}

/**
 * Translates contact time key to display value
 */
export function translateContactTime(key: string | undefined, language: Language = 'en'): string | undefined {
  if (!key) return undefined;
  return TIME_TRANSLATIONS[language][key] || key;
}

/**
 * Translates service key to display value
 * Note: For Make.com routing, services should remain in English,
 * but this can be used for display in notes when language is Arabic
 */
export function translateService(key: string, language: Language = 'en'): string {
  return SERVICE_TRANSLATIONS[language][key] || key;
}

/**
 * Translates array of service keys to display values
 */
export function translateServices(services: string[], language: Language = 'en'): string[] {
  return services.map(service => translateService(service, language));
}

