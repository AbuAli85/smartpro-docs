# 📝 Letter Templates Configuration Guide

## 🎯 Overview

The **Letter Builder** uses a simple, configuration-based system that allows you to add unlimited letter types **without writing code**. Simply edit a configuration file!

---

## 📂 Where to Add New Templates

**File**: `client/src/config/letterTemplates.ts`

This single file contains ALL letter templates. Adding a new template is as simple as copying an existing one and modifying the fields.

---

## 🚀 Quick Start: Add a New Letter Type

### Step 1: Open the Configuration File

```
client/src/config/letterTemplates.ts
```

### Step 2: Copy an Existing Template

Find a similar letter template and copy it. For example, to add a new MOCI letter, copy the `moci_noc` template.

### Step 3: Modify the Template

Update these fields:
- **id**: Unique identifier (e.g., `moci_new_letter`)
- **name**: English name
- **nameAr**: Arabic name  
- **category**: MOCI, ROP, MOL, GENERAL, or BANK
- **icon**: Emoji icon
- **description**: English description
- **descriptionAr**: Arabic description
- **fields**: Form fields needed
- **templateEn**: English letter template
- **templateAr**: Arabic letter template

### Step 4: Save & Done! 🎉

That's it! Your new letter type will automatically appear in the Letter Builder.

---

## 📋 Template Structure Explained

```typescript
{
  id: 'unique_identifier',           // Must be unique
  name: 'Display Name in English',   
  nameAr: 'الاسم بالعربية',           
  category: 'MOCI',                  // MOCI, ROP, MOL, GENERAL, BANK
  icon: '📄',                         // Emoji icon for UI
  description: 'What this letter does',
  descriptionAr: 'وصف الخطاب',
  tags: ['keyword1', 'keyword2'],    // For search
  
  // Form fields that appear in the builder
  fields: [
    {
      id: 'field_name',              // Unique field ID
      label: 'Field Label',           // Display label
      type: 'text',                   // Field type
      required: true,                 // Is it required?
      placeholder: 'Example...',      // Placeholder text
    },
    // ... more fields
  ],
  
  // English letter template with {placeholders}
  templateEn: `
    Company: {company_name}
    Subject: {subject}
    
    Dear Sir/Madam,
    
    {letter_content}
    
    Sincerely,
    {signer_name}
  `,
  
  // Arabic letter template with {placeholders}
  templateAr: `
    الشركة: {company_name}
    الموضوع: {subject}
    
    السيد/السيدة المحترم/ة،
    
    {letter_content}
    
    {signer_name}
  `,
}
```

---

## 🔤 Available Field Types

When defining `fields`, you can use these types:

| Type | Description | Example |
|------|-------------|---------|
| `text` | Single-line text input | Name, Position |
| `textarea` | Multi-line text area | Description, Details |
| `date` | Date picker | Employment Date |
| `select` | Dropdown menu | Urgency Level |
| `email` | Email input | contact@company.com |
| `phone` | Phone number | +968 1234 5678 |

### Example Field Definitions:

```typescript
fields: [
  // Simple text field
  {
    id: 'employee_name',
    label: 'Employee Name',
    type: 'text',
    required: true,
    placeholder: 'Full name'
  },
  
  // Textarea for long text
  {
    id: 'request_details',
    label: 'Request Details',
    type: 'textarea',
    required: true,
    placeholder: 'Describe your request...'
  },
  
  // Date picker
  {
    id: 'employment_start_date',
    label: 'Employment Start Date',
    type: 'date',
    required: true
  },
  
  // Dropdown select
  {
    id: 'urgency',
    label: 'Urgency Level',
    type: 'select',
    options: [
      { value: 'normal', label: 'Normal' },
      { value: 'urgent', label: 'Urgent' },
      { value: 'very_urgent', label: 'Very Urgent' },
    ]
  },
  
  // Email field
  {
    id: 'contact_email',
    label: 'Contact Email',
    type: 'email',
    placeholder: 'email@example.com'
  },
  
  // Phone field
  {
    id: 'contact_phone',
    label: 'Phone Number',
    type: 'phone',
    placeholder: '+968 1234 5678'
  },
]
```

---

## 🏷️ Categories

Choose from these predefined categories:

| Category | English Label | Arabic Label | Icon | Use For |
|----------|--------------|--------------|------|---------|
| `MOCI` | Ministry of Commerce | وزارة التجارة | 🏢 | Business licenses, NOCs |
| `ROP` | Royal Oman Police | شرطة عمان السلطانية | 🚔 | Clearances, verifications |
| `MOL` | Ministry of Labour | وزارة العمل | 👔 | Work permits, employment |
| `GENERAL` | General Business | أعمال عامة | 📄 | Salary certs, experience letters |
| `BANK` | Banking & Finance | البنوك والمالية | 🏦 | Loan applications, account opening |

### Want to Add a New Category?

1. Add your template with a new category name
2. Update `CATEGORY_LABELS` at the bottom of the file:

```typescript
export const CATEGORY_LABELS: Record<string, { en: string; ar: string; icon: string }> = {
  // ... existing categories ...
  'CUSTOM': { 
    en: 'Custom Category', 
    ar: 'فئة مخصصة', 
    icon: '⚙️' 
  },
};
```

---

## 💡 Using Placeholders

Placeholders are wrapped in curly braces `{like_this}` and get replaced with actual values from the form.

### Common Placeholders:

| Placeholder | Description | Example Value |
|-------------|-------------|---------------|
| `{company_name}` | Company name | Smartpro Business Hub |
| `{company_cr}` | CR number | CR-1234567 |
| `{date}` | Letter date | 11/11/2025 |
| `{reference_number}` | Reference number | REF/MOCI/2025/1234 |
| `{recipient_role}` | Recipient role | General Manager |
| `{recipient_org}` | Recipient organization | MOCI |
| `{employee_name}` | Employee name | Mohammed Al-Harthi |
| `{civil_id}` | Civil ID | 12345678 |
| `{signer_name}` | Signer name | Abu Ali |
| `{signer_title}` | Signer title | Managing Director |
| `{closing}` | Closing phrase (auto) | Yours sincerely |
| `{closing_ar}` | Arabic closing (auto) | وتفضلوا بقبول فائق الاحترام |

### Any Field = Placeholder

**Every field you define becomes a placeholder!**

If you create a field with `id: 'project_name'`, you can use `{project_name}` in your template.

---

## 📝 Complete Example: Add a "Transfer Letter"

Let's add a new letter type for employee transfers:

```typescript
{
  id: 'general_transfer_letter',
  name: 'Employee Transfer Letter',
  nameAr: 'خطاب نقل موظف',
  category: 'GENERAL',
  icon: '🔄',
  description: 'Official letter for employee transfer between departments or locations',
  descriptionAr: 'خطاب رسمي لنقل موظف بين الأقسام أو المواقع',
  tags: ['transfer', 'relocation', 'department'],
  
  fields: [
    { 
      id: 'employee_name', 
      label: 'Employee Name', 
      type: 'text', 
      required: true,
      placeholder: 'Full name' 
    },
    { 
      id: 'current_department', 
      label: 'Current Department', 
      type: 'text', 
      required: true 
    },
    { 
      id: 'new_department', 
      label: 'New Department', 
      type: 'text', 
      required: true 
    },
    { 
      id: 'transfer_date', 
      label: 'Transfer Date', 
      type: 'date', 
      required: true 
    },
    { 
      id: 'reason', 
      label: 'Reason for Transfer', 
      type: 'textarea',
      placeholder: 'Explain the reason...' 
    },
    {
      id: 'new_location',
      label: 'New Location (if applicable)',
      type: 'text',
      placeholder: 'City or branch'
    },
  ],
  
  templateEn: `{company_name}
Date: {date}
Ref: {reference_number}

EMPLOYEE TRANSFER LETTER

Employee: {employee_name}
From: {current_department}
To: {new_department}
Effective Date: {transfer_date}
New Location: {new_location}

This is to inform you that you are being transferred from {current_department} to {new_department}, effective {transfer_date}.

Reason for Transfer:
{reason}

All terms and conditions of your employment remain unchanged.

Please report to your new department on the effective date.

{closing}

{signer_name}
{signer_title}

{company_footer}`,
  
  templateAr: `{company_name}
التاريخ: {date}
الرقم المرجعي: {reference_number}

خطاب نقل موظف

الموظف: {employee_name}
من: {current_department}
إلى: {new_department}
تاريخ السريان: {transfer_date}
الموقع الجديد: {new_location}

نفيدكم بأنه سيتم نقلكم من {current_department} إلى {new_department}، اعتباراً من {transfer_date}.

سبب النقل:
{reason}

تظل جميع شروط وأحكام عملكم دون تغيير.

يرجى التوجه إلى قسمكم الجديد في تاريخ السريان.

{closing_ar}

{signer_name}
{signer_title}

{company_footer_ar}`,
},
```

### Add to File:

1. Open `client/src/config/letterTemplates.ts`
2. Find the `GENERAL BUSINESS LETTERS` section
3. Paste the above code before the closing `];`
4. Save the file
5. **Done!** The new template appears automatically

---

## 🔍 Searchable Tags

Add tags to make templates searchable:

```typescript
tags: ['keyword1', 'keyword2', 'keyword3']
```

**Examples:**
- `['employment', 'clearance', 'permit']`
- `['salary', 'income', 'certificate']`
- `['transfer', 'relocation', 'department']`

Users can then search using these keywords!

---

## 🌍 Bilingual Support

### Always Provide Both Languages:

1. **nameAr** - Arabic name
2. **descriptionAr** - Arabic description
3. **templateAr** - Arabic letter template

### Arabic Template Tips:

```typescript
templateAr: `الشركة: {company_name}
التاريخ: {date}

السيد/السيدة {employee_name} المحترم/ة،

{content_in_arabic}

مع خالص التقدير،
{signer_name}
{signer_title}`
```

---

## ⚙️ Advanced Features

### 1. Conditional Fields

Use `required: false` for optional fields:

```typescript
{ 
  id: 'optional_field', 
  label: 'Optional Field', 
  type: 'text',
  required: false  // Won't show validation error if empty
}
```

### 2. Default Values

Provide default values:

```typescript
{ 
  id: 'company_name', 
  label: 'Company Name', 
  type: 'text',
  defaultValue: 'Smartpro Business Hub & Services'
}
```

### 3. Help Text

Add helper text below fields:

```typescript
{ 
  id: 'civil_id', 
  label: 'Civil ID', 
  type: 'text',
  helpText: '8-digit civil ID number'
}
```

---

## 📊 Real-World Examples

### Example 1: Bank Reference Letter

```typescript
{
  id: 'bank_reference_letter',
  name: 'Bank Reference Letter',
  nameAr: 'خطاب مرجعي للبنك',
  category: 'BANK',
  icon: '🏦',
  description: 'Reference letter for employee applying for bank services',
  descriptionAr: 'خطاب مرجعي للموظف الذي يتقدم بطلب للحصول على خدمات بنكية',
  tags: ['bank', 'reference', 'loan'],
  fields: [
    { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
    { id: 'position', label: 'Position', type: 'text', required: true },
    { id: 'monthly_salary', label: 'Monthly Salary', type: 'text', required: true },
    { id: 'employment_years', label: 'Years of Employment', type: 'text' },
  ],
  templateEn: `Bank Reference Letter

To Whom It May Concern,

This is to certify that {employee_name} is employed with {company_name} as {position} with a monthly salary of OMR {monthly_salary}.

Years of Service: {employment_years}

This letter is issued for banking purposes.

{signer_name}
{signer_title}`,
  templateAr: `خطاب مرجعي للبنك

إلى من يهمه الأمر،

نفيد بأن السيد/السيدة {employee_name} يعمل لدى {company_name} بوظيفة {position} براتب شهري قدره {monthly_salary} ريال عماني.

سنوات الخدمة: {employment_years}

يصدر هذا الخطاب للأغراض البنكية.

{signer_name}
{signer_title}`,
}
```

### Example 2: Leave Approval Letter

```typescript
{
  id: 'leave_approval',
  name: 'Leave Approval Letter',
  nameAr: 'خطاب الموافقة على الإجازة',
  category: 'GENERAL',
  icon: '🏖️',
  description: 'Formal approval of employee leave request',
  descriptionAr: 'موافقة رسمية على طلب إجازة الموظف',
  tags: ['leave', 'vacation', 'approval'],
  fields: [
    { id: 'employee_name', label: 'Employee Name', type: 'text', required: true },
    { id: 'leave_type', label: 'Leave Type', type: 'select', required: true, options: [
      { value: 'annual', label: 'Annual Leave' },
      { value: 'sick', label: 'Sick Leave' },
      { value: 'emergency', label: 'Emergency Leave' },
      { value: 'unpaid', label: 'Unpaid Leave' },
    ]},
    { id: 'start_date', label: 'Start Date', type: 'date', required: true },
    { id: 'end_date', label: 'End Date', type: 'date', required: true },
    { id: 'total_days', label: 'Total Days', type: 'text' },
  ],
  templateEn: `Leave Approval

Employee: {employee_name}
Leave Type: {leave_type}
From: {start_date}
To: {end_date}
Total Days: {total_days}

Your leave request has been approved. Please ensure all work is handed over before your departure.

{signer_name}
{signer_title}`,
  templateAr: `الموافقة على الإجازة

الموظف: {employee_name}
نوع الإجازة: {leave_type}
من: {start_date}
إلى: {end_date}
إجمالي الأيام: {total_days}

تمت الموافقة على طلب إجازتك. يرجى التأكد من تسليم جميع الأعمال قبل المغادرة.

{signer_name}
{signer_title}`,
}
```

---

## 🎨 Template Best Practices

### 1. Professional Formatting
```typescript
templateEn: `{company_name}
P.O. Box 123, Muscat, Oman
Tel: +968 2460 0000

Date: {date}
Ref: {reference_number}

To: {recipient_role}, {recipient_org}

Subject: {subject}

Dear Sir/Madam,

[Body paragraphs with proper spacing]

Yours sincerely,

{signer_name}
{signer_title}

---
{company_name} | www.company.com | info@company.com`
```

### 2. Use Line Breaks
- Use `\n\n` for paragraph breaks
- Use `\n` for single line breaks

### 3. Consistent Placeholders
- Use snake_case: `{employee_name}` not `{employeeName}`
- Keep names descriptive: `{noc_purpose}` not `{purpose}`

### 4. Include All Standard Fields
Every template should support these common fields:
- `{company_name}`
- `{company_cr}`
- `{date}`
- `{reference_number}`
- `{signer_name}`
- `{signer_title}`

---

## 🚀 Quick Reference: Add Template in 5 Minutes

1. **Copy** an existing similar template
2. **Change** the `id` (must be unique)
3. **Update** names (English & Arabic)
4. **Modify** fields array (what form fields you need)
5. **Edit** templates (English & Arabic letter content)
6. **Save** the file
7. **✅ Done!** New letter type appears automatically

---

## 📦 Current Templates (12 Built-in)

| Category | Templates | Count |
|----------|-----------|-------|
| MOCI | NOC, Inquiry, License Application | 3 |
| ROP | Verification, Clearance | 2 |
| MOL | Labour Clearance, Employment Confirmation, Resignation | 3 |
| GENERAL | Salary Certificate, Experience Certificate, Promotion | 3 |
| BANK | Account Opening, Loan Application | 2 |

**Total: 12 templates ready to use!**

---

## 🎯 Common Use Cases

### For HR Department:
- ✅ Employment Verification
- ✅ Salary Certificate
- ✅ Experience Certificate
- ✅ Promotion Letter
- ✅ Transfer Letter
- ✅ Resignation Acceptance

### For Finance:
- ✅ Bank Reference Letter
- ✅ Loan Application
- ✅ Account Opening Request

### For Government:
- ✅ NOC (No-Objection Certificate)
- ✅ Work Permit Request
- ✅ License Application
- ✅ Clearance Request

---

## 💡 Tips & Tricks

### Tip 1: Test Your Template
After adding a new template:
1. Refresh the Letter Builder
2. Select your new template
3. Fill in test data
4. Check the preview

### Tip 2: Use Descriptive Field Names
**Good**: `employment_start_date`  
**Bad**: `date1`

### Tip 3: Add Helpful Placeholders
```typescript
placeholder: 'e.g., Sales Manager'  // Good!
placeholder: 'Enter...'             // Less helpful
```

### Tip 4: Group Related Fields
Organize fields logically:
```typescript
fields: [
  // Employee Info
  { id: 'employee_name', ... },
  { id: 'civil_id', ... },
  { id: 'position', ... },
  
  // Date Info
  { id: 'start_date', ... },
  { id: 'end_date', ... },
  
  // Financial Info
  { id: 'salary', ... },
  { id: 'allowances', ... },
]
```

---

## 🆘 Troubleshooting

### Problem: New template doesn't appear
- **Solution**: Check for syntax errors (missing commas, brackets)
- Ensure `id` is unique
- Make sure it's added within the `LETTER_TEMPLATES` array

### Problem: Placeholder not working
- **Solution**: Ensure field `id` matches placeholder name
- Example: Field `id: 'employee_name'` → Use `{employee_name}`

### Problem: Arabic text looks weird
- **Solution**: Ensure you're using proper Arabic characters
- Check RTL direction is working

---

## 📞 Need Help?

- **Documentation**: This file
- **Examples**: See existing templates in `letterTemplates.ts`
- **Code Location**: `client/src/config/letterTemplates.ts`

---

## 🎉 You're Ready!

You now have everything you need to add unlimited letter types to your Letter Builder. The system is:

✅ **Simple** - Just edit one file  
✅ **Flexible** - Support any letter type  
✅ **Bilingual** - Arabic & English  
✅ **Extensible** - Add unlimited templates  
✅ **No Coding** - Pure configuration  

**Happy letter building!** 🚀

