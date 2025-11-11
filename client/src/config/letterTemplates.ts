/**
 * LETTER TEMPLATES CONFIGURATION
 * ==============================
 * 
 * This file defines all available letter templates.
 * To add a new letter type, simply add a new entry to the appropriate category.
 * 
 * Template Structure:
 * - id: Unique identifier
 * - name: Display name
 * - category: Government entity/organization
 * - icon: Emoji icon for UI
 * - fields: Required form fields
 * - template: Letter content with {placeholders}
 */

export interface LetterField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'email' | 'phone';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  helpText?: string;
}

export interface LetterTemplate {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  icon: string;
  description: string;
  descriptionAr: string;
  fields: LetterField[];
  templateEn: string;
  templateAr: string;
  tags?: string[];
}

// ============================================================
// TEMPLATE CONFIGURATION
// ============================================================

export const LETTER_TEMPLATES: LetterTemplate[] = [
  // ============================================================
  // MOCI - Ministry of Commerce, Industry & Investment Promotion
  // ============================================================
  {
    id: 'moci_noc',
    name: 'No-Objection Certificate (NOC)',
    nameAr: 'خطاب عدم ممانعة',
    category: 'MOCI',
    icon: '📄',
    description: 'Certificate stating no objection for employee to perform specific activity',
    descriptionAr: 'شهادة تفيد بعدم الممانعة على قيام الموظف بنشاط معين',
    tags: ['employment', 'clearance', 'permit'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true, placeholder: 'Full name' },
      { id: 'civil_id', label: 'Civil ID', type: 'text', required: true, placeholder: '12345678' },
      { id: 'noc_purpose', label: 'Purpose of NOC', type: 'textarea', required: true, placeholder: 'Describe the purpose...' },
      { id: 'department', label: 'Department', type: 'text', placeholder: 'Department name' },
      { id: 'employment_start_date', label: 'Employment Start Date', type: 'date' },
    ],
    templateEn: `{company_name}
{company_address}
Tel: {company_phone} | Email: {company_email}

Date: {date}
Ref: {reference_number}

To: {recipient_role}, {recipient_org}

Subject: No-Objection Certificate

Dear Sir/Madam,

We, {company_name} (CR: {company_cr}), hereby certify that we have no objection for {employee_name} (Civil ID: {civil_id}) to {noc_purpose}.

This certificate is issued upon the employee's request and without any liability on the company.

{closing}

{signer_name}
{signer_title}

{company_footer}`,
    templateAr: `{company_name}
{company_address_ar}
هاتف: {company_phone} | البريد الإلكتروني: {company_email}

التاريخ: {date}
الرقم المرجعي: {reference_number}

إلى: {recipient_role}، {recipient_org}

الموضوع: خطاب عدم ممانعة

تحية طيبة وبعد،

نحن، شركة {company_name} (رقم السجل التجاري: {company_cr})، نود إفادتكم بأنه لا مانع لدينا من {noc_purpose} للموظف {employee_name} (رقم البطاقة المدنية: {civil_id}).

يصدر هذا الخطاب بناءً على طلب الموظف ودون أدنى مسؤولية على الشركة.

{closing_ar}

{signer_name}
{signer_title}

{company_footer_ar}`,
  },

  {
    id: 'moci_inquiry',
    name: 'Regulatory Inquiry',
    nameAr: 'استفسار تنظيمي',
    category: 'MOCI',
    icon: '❓',
    description: 'Formal inquiry to MOCI regarding regulations or procedures',
    descriptionAr: 'استفسار رسمي إلى الوزارة بخصوص اللوائح أو الإجراءات',
    tags: ['inquiry', 'question', 'clarification'],
    fields: [
      { id: 'inquiry_subject', label: 'Subject of Inquiry', type: 'text', required: true },
      { id: 'request_details', label: 'Inquiry Details', type: 'textarea', required: true, placeholder: 'Describe your inquiry...' },
      { id: 'urgency', label: 'Urgency', type: 'select', options: [
        { value: 'normal', label: 'Normal' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'very_urgent', label: 'Very Urgent' },
      ]},
    ],
    templateEn: `{company_name}
Date: {date}
Ref: {reference_number}

To: {recipient_role}, {recipient_org}

Subject: {inquiry_subject}

Dear Sir/Madam,

We request guidance regarding {request_details}.

Company: {company_name} (CR: {company_cr})

We would appreciate your prompt response on this matter.

{closing}

{signer_name}
{signer_title}`,
    templateAr: `{company_name}
التاريخ: {date}
الرقم المرجعي: {reference_number}

إلى: {recipient_role}، {recipient_org}

الموضوع: {inquiry_subject}

السيد/السيدة المحترم/ة،

نرجو إفادتنا بشأن {request_details}.

الشركة: {company_name} (السجل التجاري: {company_cr})

نأمل الرد السريع على هذا الموضوع.

{closing_ar}

{signer_name}
{signer_title}`,
  },

  {
    id: 'moci_license_application',
    name: 'License Application',
    nameAr: 'طلب ترخيص',
    category: 'MOCI',
    icon: '📋',
    description: 'Application for business license or permit',
    descriptionAr: 'طلب للحصول على ترخيص أو تصريح تجاري',
    tags: ['license', 'permit', 'registration'],
    fields: [
      { id: 'license_type', label: 'License Type', type: 'text', required: true },
      { id: 'business_activity', label: 'Business Activity', type: 'textarea', required: true },
      { id: 'location', label: 'Business Location', type: 'text' },
      { id: 'contact_person', label: 'Contact Person', type: 'text' },
      { id: 'contact_phone', label: 'Contact Phone', type: 'phone' },
    ],
    templateEn: `Application for {license_type}

Company: {company_name}
CR: {company_cr}
Date: {date}

Business Activity: {business_activity}
Location: {location}
Contact: {contact_person} - {contact_phone}

We hereby apply for the above-mentioned license.

{signer_name}
{signer_title}`,
    templateAr: `طلب الحصول على {license_type}

الشركة: {company_name}
السجل التجاري: {company_cr}
التاريخ: {date}

النشاط التجاري: {business_activity}
الموقع: {location}
جهة الاتصال: {contact_person} - {contact_phone}

نتقدم بطلب الحصول على الترخيص المذكور أعلاه.

{signer_name}
{signer_title}`,
  },

  // ============================================================
  // ROP - Royal Oman Police
  // ============================================================
  {
    id: 'rop_verification',
    name: 'Employment Verification',
    nameAr: 'خطاب تحقق من العمل',
    category: 'ROP',
    icon: '✓',
    description: 'Verification of employee employment status',
    descriptionAr: 'التحقق من حالة توظيف الموظف',
    tags: ['verification', 'employment', 'confirmation'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { id: 'civil_id', label: 'Civil ID', type: 'text', required: true },
      { id: 'position', label: 'Position', type: 'text', required: true },
      { id: 'employment_start_date', label: 'Employment Start Date', type: 'date', required: true },
      { id: 'salary', label: 'Monthly Salary (Optional)', type: 'text' },
    ],
    templateEn: `Employment Verification

This is to certify that {employee_name} (Civil ID: {civil_id}) is employed with {company_name} as {position} since {employment_start_date}.

Details enclosed for verification purposes.

{signer_name}
{signer_title}
{company_name}`,
    templateAr: `خطاب تحقق من العمل

نفيد بأن السيد/السيدة {employee_name} (رقم البطاقة المدنية: {civil_id}) يعمل لدى {company_name} بوظيفة {position} منذ {employment_start_date}.

التفاصيل المرفقة لغرض التحقق.

{signer_name}
{signer_title}
{company_name}`,
  },

  {
    id: 'rop_clearance',
    name: 'Security Clearance Request',
    nameAr: 'طلب إفادة أمنية',
    category: 'ROP',
    icon: '🛡️',
    description: 'Request for security clearance or police clearance',
    descriptionAr: 'طلب للحصول على إفادة أمنية أو شهادة حسن سيرة',
    tags: ['clearance', 'security', 'police'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { id: 'civil_id', label: 'Civil ID', type: 'text', required: true },
      { id: 'clearance_purpose', label: 'Purpose', type: 'textarea', required: true },
      { id: 'nationality', label: 'Nationality', type: 'text' },
    ],
    templateEn: `Request for Security Clearance

Employee: {employee_name}
Civil ID: {civil_id}
Nationality: {nationality}

We kindly request the issuance of a security clearance for the above-mentioned employee for the purpose of {clearance_purpose}.

{signer_name}
{signer_title}`,
    templateAr: `طلب إفادة أمنية

الموظف: {employee_name}
رقم البطاقة المدنية: {civil_id}
الجنسية: {nationality}

نلتمس تفضلكم بإصدار إفادة أمنية للموظف المذكور أعلاه لغرض {clearance_purpose}.

{signer_name}
{signer_title}`,
  },

  // ============================================================
  // MOL - Ministry of Labour
  // ============================================================
  {
    id: 'mol_labour_clearance',
    name: 'Labour Clearance Request',
    nameAr: 'طلب موافقة عمل',
    category: 'MOL',
    icon: '👔',
    description: 'Request for labour permit approval',
    descriptionAr: 'طلب للحصول على موافقة تصريح عمل',
    tags: ['labour', 'permit', 'work'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { id: 'civil_id', label: 'Civil ID', type: 'text', required: true },
      { id: 'position', label: 'Position', type: 'text', required: true },
      { id: 'nationality', label: 'Nationality', type: 'text' },
      { id: 'qualifications', label: 'Qualifications', type: 'textarea' },
    ],
    templateEn: `Labour Clearance Request

We kindly request approval to proceed with a labour permit for:

Name: {employee_name}
Civil ID: {civil_id}
Position: {position}
Nationality: {nationality}

Company: {company_name} (CR: {company_cr})

{signer_name}
{signer_title}`,
    templateAr: `طلب موافقة عمل

نلتمس تفضلكم بالموافقة على إجراءات تصريح العمل للموظف:

الاسم: {employee_name}
رقم البطاقة المدنية: {civil_id}
الوظيفة: {position}
الجنسية: {nationality}

الشركة: {company_name} (السجل التجاري: {company_cr})

{signer_name}
{signer_title}`,
  },

  {
    id: 'mol_employment_confirmation',
    name: 'Employment Confirmation',
    nameAr: 'تأكيد توظيف',
    category: 'MOL',
    icon: '✓',
    description: 'Confirmation of current employment status',
    descriptionAr: 'تأكيد حالة التوظيف الحالية',
    tags: ['confirmation', 'employment', 'certificate'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { id: 'position', label: 'Position', type: 'text', required: true },
      { id: 'employment_start_date', label: 'Start Date', type: 'date', required: true },
      { id: 'department', label: 'Department', type: 'text' },
      { id: 'salary', label: 'Monthly Salary', type: 'text' },
    ],
    templateEn: `Employment Confirmation

This is to confirm that {employee_name} has been employed with {company_name} since {employment_start_date} in the {department} department as {position}.

{signer_name}
{signer_title}`,
    templateAr: `تأكيد توظيف

نفيد بأن السيد/السيدة {employee_name} يعمل لدينا منذ {employment_start_date} في قسم {department} بوظيفة {position}.

{signer_name}
{signer_title}`,
  },

  {
    id: 'mol_resignation_acceptance',
    name: 'Resignation Acceptance',
    nameAr: 'قبول استقالة',
    category: 'MOL',
    icon: '👋',
    description: 'Formal acceptance of employee resignation',
    descriptionAr: 'قبول رسمي لاستقالة الموظف',
    tags: ['resignation', 'termination', 'separation'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { id: 'position', label: 'Position', type: 'text', required: true },
      { id: 'resignation_date', label: 'Resignation Date', type: 'date', required: true },
      { id: 'last_working_day', label: 'Last Working Day', type: 'date', required: true },
      { id: 'notice_period', label: 'Notice Period (days)', type: 'text' },
    ],
    templateEn: `Resignation Acceptance

Employee: {employee_name}
Position: {position}
Resignation Date: {resignation_date}
Last Working Day: {last_working_day}

We hereby acknowledge and accept the resignation submitted by {employee_name}. The employee will complete the notice period of {notice_period} days.

All dues will be settled as per company policy.

{signer_name}
{signer_title}`,
    templateAr: `قبول استقالة

الموظف: {employee_name}
الوظيفة: {position}
تاريخ الاستقالة: {resignation_date}
آخر يوم عمل: {last_working_day}

نقر ونقبل بموجب هذا الاستقالة المقدمة من {employee_name}. سيكمل الموظف فترة إشعار {notice_period} يوماً.

سيتم تسوية جميع المستحقات وفقاً لسياسة الشركة.

{signer_name}
{signer_title}`,
  },

  // ============================================================
  // GENERAL BUSINESS LETTERS
  // ============================================================
  {
    id: 'general_salary_certificate',
    name: 'Salary Certificate',
    nameAr: 'شهادة راتب',
    category: 'GENERAL',
    icon: '💰',
    description: 'Certificate stating employee salary details',
    descriptionAr: 'شهادة تبين تفاصيل راتب الموظف',
    tags: ['salary', 'income', 'certificate'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { id: 'position', label: 'Position', type: 'text', required: true },
      { id: 'monthly_salary', label: 'Monthly Salary', type: 'text', required: true },
      { id: 'employment_start_date', label: 'Employment Start Date', type: 'date' },
      { id: 'allowances', label: 'Allowances (Optional)', type: 'text' },
    ],
    templateEn: `Salary Certificate

This is to certify that {employee_name} is employed with {company_name} as {position} since {employment_start_date}.

Current monthly salary: OMR {monthly_salary}
Allowances: {allowances}

This certificate is issued for official purposes.

{signer_name}
{signer_title}`,
    templateAr: `شهادة راتب

نفيد بأن السيد/السيدة {employee_name} يعمل لدى {company_name} بوظيفة {position} منذ {employment_start_date}.

الراتب الشهري الحالي: {monthly_salary} ريال عماني
البدلات: {allowances}

تصدر هذه الشهادة للأغراض الرسمية.

{signer_name}
{signer_title}`,
  },

  {
    id: 'general_experience_certificate',
    name: 'Experience Certificate',
    nameAr: 'شهادة خبرة',
    category: 'GENERAL',
    icon: '🎓',
    description: 'Certificate of work experience and achievements',
    descriptionAr: 'شهادة الخبرة العملية والإنجازات',
    tags: ['experience', 'certificate', 'reference'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { id: 'position', label: 'Position', type: 'text', required: true },
      { id: 'employment_start_date', label: 'Start Date', type: 'date', required: true },
      { id: 'employment_end_date', label: 'End Date', type: 'date', required: true },
      { id: 'responsibilities', label: 'Key Responsibilities', type: 'textarea' },
      { id: 'achievements', label: 'Achievements', type: 'textarea' },
    ],
    templateEn: `Experience Certificate

This is to certify that {employee_name} worked with {company_name} as {position} from {employment_start_date} to {employment_end_date}.

Key Responsibilities:
{responsibilities}

Achievements:
{achievements}

We wish {employee_name} success in future endeavors.

{signer_name}
{signer_title}`,
    templateAr: `شهادة خبرة

نفيد بأن السيد/السيدة {employee_name} عمل لدى {company_name} بوظيفة {position} من {employment_start_date} إلى {employment_end_date}.

المسؤوليات الرئيسية:
{responsibilities}

الإنجازات:
{achievements}

نتمنى للسيد/السيدة {employee_name} التوفيق في المساعي المستقبلية.

{signer_name}
{signer_title}`,
  },

  {
    id: 'general_promotion_letter',
    name: 'Promotion Letter',
    nameAr: 'خطاب ترقية',
    category: 'GENERAL',
    icon: '📈',
    description: 'Official letter announcing employee promotion',
    descriptionAr: 'خطاب رسمي يعلن عن ترقية الموظف',
    tags: ['promotion', 'career', 'advancement'],
    fields: [
      { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { id: 'current_position', label: 'Current Position', type: 'text', required: true },
      { id: 'new_position', label: 'New Position', type: 'text', required: true },
      { id: 'effective_date', label: 'Effective Date', type: 'date', required: true },
      { id: 'new_salary', label: 'New Salary', type: 'text' },
      { id: 'reason', label: 'Reason for Promotion', type: 'textarea' },
    ],
    templateEn: `Promotion Letter

Dear {employee_name},

We are pleased to inform you of your promotion from {current_position} to {new_position}, effective {effective_date}.

This promotion is in recognition of {reason}.

Your new salary will be OMR {new_salary} per month.

Congratulations on this well-deserved promotion!

{signer_name}
{signer_title}`,
    templateAr: `خطاب ترقية

السيد/السيدة {employee_name} المحترم/ة،

يسرنا إبلاغكم بترقيتكم من {current_position} إلى {new_position}، اعتباراً من {effective_date}.

تأتي هذه الترقية تقديراً لـ {reason}.

راتبكم الجديد سيكون {new_salary} ريال عماني شهرياً.

تهانينا على هذه الترقية المستحقة!

{signer_name}
{signer_title}`,
  },

  // ============================================================
  // BANK & FINANCIAL LETTERS
  // ============================================================
  {
    id: 'bank_account_opening',
    name: 'Bank Account Opening Request',
    nameAr: 'طلب فتح حساب بنكي',
    category: 'BANK',
    icon: '🏦',
    description: 'Letter for company bank account opening',
    descriptionAr: 'خطاب لفتح حساب بنكي للشركة',
    tags: ['bank', 'account', 'financial'],
    fields: [
      { id: 'account_type', label: 'Account Type', type: 'select', required: true, options: [
        { value: 'current', label: 'Current Account' },
        { value: 'savings', label: 'Savings Account' },
        { value: 'corporate', label: 'Corporate Account' },
      ]},
      { id: 'authorized_signatories', label: 'Authorized Signatories', type: 'textarea', required: true },
      { id: 'initial_deposit', label: 'Initial Deposit Amount', type: 'text' },
    ],
    templateEn: `Bank Account Opening Request

Company: {company_name}
CR: {company_cr}
Account Type: {account_type}

Authorized Signatories:
{authorized_signatories}

Initial Deposit: OMR {initial_deposit}

We request to open a {account_type} with your esteemed bank.

{signer_name}
{signer_title}`,
    templateAr: `طلب فتح حساب بنكي

الشركة: {company_name}
السجل التجاري: {company_cr}
نوع الحساب: {account_type}

المفوضون بالتوقيع:
{authorized_signatories}

الإيداع الأولي: {initial_deposit} ريال عماني

نطلب فتح {account_type} لدى مصرفكم الموقر.

{signer_name}
{signer_title}`,
  },

  {
    id: 'bank_loan_application',
    name: 'Loan Application Letter',
    nameAr: 'طلب قرض',
    category: 'BANK',
    icon: '💵',
    description: 'Application for business or personal loan',
    descriptionAr: 'طلب للحصول على قرض تجاري أو شخصي',
    tags: ['loan', 'financing', 'credit'],
    fields: [
      { id: 'loan_amount', label: 'Loan Amount', type: 'text', required: true },
      { id: 'loan_purpose', label: 'Purpose of Loan', type: 'textarea', required: true },
      { id: 'repayment_period', label: 'Repayment Period (months)', type: 'text' },
      { id: 'collateral', label: 'Collateral Offered', type: 'textarea' },
    ],
    templateEn: `Loan Application

Company: {company_name}
Loan Amount: OMR {loan_amount}
Purpose: {loan_purpose}
Repayment Period: {repayment_period} months

Collateral: {collateral}

We request consideration of this loan application.

{signer_name}
{signer_title}`,
    templateAr: `طلب قرض

الشركة: {company_name}
مبلغ القرض: {loan_amount} ريال عماني
الغرض: {loan_purpose}
فترة السداد: {repayment_period} شهراً

الضمانات: {collateral}

نرجو النظر في هذا الطلب.

{signer_name}
{signer_title}`,
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  const categories = [...new Set(LETTER_TEMPLATES.map(t => t.category))];
  return categories.sort();
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): LetterTemplate[] {
  return LETTER_TEMPLATES.filter(t => t.category === category);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): LetterTemplate | undefined {
  return LETTER_TEMPLATES.find(t => t.id === id);
}

/**
 * Search templates
 */
export function searchTemplates(query: string): LetterTemplate[] {
  const lowerQuery = query.toLowerCase();
  return LETTER_TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(lowerQuery) ||
    t.nameAr.includes(query) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags?.some(tag => tag.includes(lowerQuery))
  );
}

/**
 * Render template with values
 */
export function renderTemplate(
  template: LetterTemplate,
  values: Record<string, string>,
  lang: 'en' | 'ar'
): string {
  const templateText = lang === 'ar' ? template.templateAr : template.templateEn;
  
  let rendered = templateText;
  
  // Replace all placeholders with values
  Object.entries(values).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    rendered = rendered.replace(new RegExp(placeholder, 'g'), value || `[${key}]`);
  });
  
  return rendered;
}

/**
 * Get default closing text
 */
export function getDefaultClosing(lang: 'en' | 'ar'): string {
  return lang === 'ar' 
    ? 'وتفضلوا بقبول فائق الاحترام والتقدير'
    : 'Yours sincerely';
}

/**
 * Category labels
 */
export const CATEGORY_LABELS: Record<string, { en: string; ar: string; icon: string }> = {
  'MOCI': { en: 'Ministry of Commerce', ar: 'وزارة التجارة', icon: '🏢' },
  'ROP': { en: 'Royal Oman Police', ar: 'شرطة عمان السلطانية', icon: '🚔' },
  'MOL': { en: 'Ministry of Labour', ar: 'وزارة العمل', icon: '👔' },
  'GENERAL': { en: 'General Business', ar: 'أعمال عامة', icon: '📄' },
  'BANK': { en: 'Banking & Finance', ar: 'البنوك والمالية', icon: '🏦' },
};

