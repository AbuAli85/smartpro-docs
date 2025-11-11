# 📚 Letter Builder Template System

## 🎯 Overview

The **Smartpro Letter Builder** uses a **configuration-based template system** that makes adding new letter types as easy as editing a text file. **No coding required!**

---

## ✨ Key Features

### 🚀 **Easy to Extend**
- ✅ Add unlimited letter types
- ✅ Just edit one configuration file
- ✅ No programming knowledge needed
- ✅ Changes take effect immediately

### 🌍 **Bilingual by Default**
- ✅ Arabic (RTL) and English (LTR)
- ✅ Automatic language switching
- ✅ Professional formatting for both languages

### 🎨 **Fully Customizable**
- ✅ Custom fields for each template
- ✅ Your own letter formats
- ✅ Any government entity or organization
- ✅ Dynamic placeholders

### 📦 **12 Built-in Templates**
Ready to use out of the box:
- Government letters (MOCI, ROP, MOL)
- Business letters (Salary, Experience, Promotion)
- Banking letters (Loans, Accounts)
- And more!

---

## 📂 File Structure

```
client/
├── src/
│   ├── config/
│   │   └── letterTemplates.ts          ← 🎯 ADD TEMPLATES HERE
│   ├── components/
│   │   └── TemplateBrowser.tsx         ← Template selection UI
│   └── pages/
│       └── demo/
│           └── ProfessionalLetterBuilder.tsx
└── LETTER_TEMPLATES_GUIDE.md           ← 📖 Complete guide
```

---

## 🚀 Quick Start: Add Your First Template

### Step 1: Open Configuration File
```
client/src/config/letterTemplates.ts
```

### Step 2: Copy & Paste Template

Find the `LETTER_TEMPLATES` array and add this:

```typescript
{
  id: 'my_custom_letter',
  name: 'My Custom Letter',
  nameAr: 'خطابي المخصص',
  category: 'GENERAL',
  icon: '✉️',
  description: 'Description of what this letter does',
  descriptionAr: 'وصف الخطاب',
  tags: ['custom', 'example'],
  
  fields: [
    { 
      id: 'recipient_name', 
      label: 'Recipient Name', 
      type: 'text', 
      required: true 
    },
    { 
      id: 'message', 
      label: 'Message', 
      type: 'textarea', 
      required: true 
    },
  ],
  
  templateEn: `Dear {recipient_name},

{message}

Best regards,
{signer_name}`,
  
  templateAr: `السيد/السيدة {recipient_name} المحترم/ة،

{message}

مع خالص التقدير،
{signer_name}`,
},
```

### Step 3: Save & Test!
That's it! Your new template will appear in the Letter Builder automatically.

---

## 📖 Full Documentation

For complete documentation on adding templates, see:
**[LETTER_TEMPLATES_GUIDE.md](./LETTER_TEMPLATES_GUIDE.md)**

This guide covers:
- ✅ Complete template structure
- ✅ All available field types
- ✅ Using placeholders
- ✅ Bilingual templates
- ✅ Advanced features
- ✅ Real-world examples
- ✅ Troubleshooting

---

## 🎓 Examples

### Example 1: Simple Thank You Letter

```typescript
{
  id: 'thank_you_letter',
  name: 'Thank You Letter',
  nameAr: 'خطاب شكر',
  category: 'GENERAL',
  icon: '🙏',
  description: 'Express gratitude and appreciation',
  descriptionAr: 'التعبير عن الامتنان والتقدير',
  tags: ['thanks', 'appreciation', 'gratitude'],
  
  fields: [
    { id: 'recipient_name', label: 'Recipient Name', type: 'text', required: true },
    { id: 'reason', label: 'Reason for Thanks', type: 'textarea', required: true },
  ],
  
  templateEn: `Dear {recipient_name},

We would like to express our sincere gratitude for {reason}.

Your support has been invaluable to us.

Thank you once again.

Warm regards,
{signer_name}
{company_name}`,
  
  templateAr: `السيد/السيدة {recipient_name} المحترم/ة،

نود أن نعرب عن خالص شكرنا وامتناننا لـ {reason}.

دعمكم كان ذا قيمة لا تقدر بثمن بالنسبة لنا.

شكراً لكم مرة أخرى.

مع أطيب التحيات،
{signer_name}
{company_name}`,
}
```

### Example 2: Meeting Invitation

```typescript
{
  id: 'meeting_invitation',
  name: 'Meeting Invitation',
  nameAr: 'دعوة لاجتماع',
  category: 'GENERAL',
  icon: '📅',
  description: 'Formal invitation to a business meeting',
  descriptionAr: 'دعوة رسمية لاجتماع عمل',
  tags: ['meeting', 'invitation', 'appointment'],
  
  fields: [
    { id: 'attendee_name', label: 'Attendee Name', type: 'text', required: true },
    { id: 'meeting_topic', label: 'Meeting Topic', type: 'text', required: true },
    { id: 'meeting_date', label: 'Date', type: 'date', required: true },
    { id: 'meeting_time', label: 'Time', type: 'text', required: true },
    { id: 'meeting_location', label: 'Location', type: 'text', required: true },
    { id: 'agenda', label: 'Agenda Items', type: 'textarea' },
  ],
  
  templateEn: `Meeting Invitation

Dear {attendee_name},

You are cordially invited to attend a meeting regarding {meeting_topic}.

Date: {meeting_date}
Time: {meeting_time}
Location: {meeting_location}

Agenda:
{agenda}

Please confirm your attendance.

{signer_name}
{company_name}`,
  
  templateAr: `دعوة لاجتماع

السيد/السيدة {attendee_name} المحترم/ة،

يسرنا دعوتكم لحضور اجتماع بخصوص {meeting_topic}.

التاريخ: {meeting_date}
الوقت: {meeting_time}
الموقع: {meeting_location}

جدول الأعمال:
{agenda}

يرجى تأكيد حضوركم.

{signer_name}
{company_name}`,
}
```

---

## 🔤 Available Field Types

| Type | Description | Example |
|------|-------------|---------|
| `text` | Single-line text | Name, Position |
| `textarea` | Multi-line text | Description, Details |
| `date` | Date picker | 2025-11-11 |
| `select` | Dropdown menu | Urgency level |
| `email` | Email input | email@example.com |
| `phone` | Phone number | +968 1234 5678 |

---

## 🏷️ Categories

| Category | Use For | Icon |
|----------|---------|------|
| `MOCI` | Ministry of Commerce letters | 🏢 |
| `ROP` | Royal Oman Police letters | 🚔 |
| `MOL` | Ministry of Labour letters | 👔 |
| `GENERAL` | General business letters | 📄 |
| `BANK` | Banking & financial letters | 🏦 |

**Want more categories?** Just add them! See the guide for instructions.

---

## 💡 Common Placeholders

Every field you create becomes a placeholder:

| Placeholder | Description |
|-------------|-------------|
| `{company_name}` | Your company name |
| `{company_cr}` | Company registration number |
| `{date}` | Letter date |
| `{reference_number}` | Auto-generated reference |
| `{employee_name}` | Employee name |
| `{civil_id}` | Civil ID number |
| `{signer_name}` | Person signing the letter |
| `{signer_title}` | Signer's job title |
| `{recipient_role}` | Recipient's position |
| `{recipient_org}` | Recipient organization |

**Plus any custom fields you define!**

---

## 📊 Built-in Templates (12)

### Government (MOCI) - 3 templates
1. ✅ No-Objection Certificate (NOC)
2. ✅ Regulatory Inquiry
3. ✅ License Application

### Police (ROP) - 2 templates
4. ✅ Employment Verification
5. ✅ Security Clearance

### Labour (MOL) - 3 templates
6. ✅ Labour Clearance
7. ✅ Employment Confirmation
8. ✅ Resignation Acceptance

### General Business - 3 templates
9. ✅ Salary Certificate
10. ✅ Experience Certificate
11. ✅ Promotion Letter

### Banking - 2 templates
12. ✅ Bank Account Opening
13. ✅ Loan Application

---

## 🎯 Template Structure at a Glance

```typescript
{
  // Identity
  id: 'unique_id',                    // Must be unique
  name: 'English Name',               // Display name
  nameAr: 'الاسم العربي',              // Arabic name
  category: 'CATEGORY',               // MOCI, ROP, MOL, GENERAL, BANK
  icon: '📄',                         // Emoji icon
  
  // Description
  description: 'What it does',       // English description
  descriptionAr: 'الوصف',             // Arabic description
  tags: ['tag1', 'tag2'],            // Searchable keywords
  
  // Form fields
  fields: [
    {
      id: 'field_name',               // Field identifier
      label: 'Field Label',            // Display label
      type: 'text',                    // Field type
      required: true,                  // Is required?
      placeholder: 'Example...',       // Helper text
    },
  ],
  
  // Letter templates
  templateEn: `English letter with {placeholders}`,
  templateAr: `خطاب عربي مع {placeholders}`,
}
```

---

## 🔍 Search & Browse

The Letter Builder includes a powerful template browser:

- 🔍 **Search** by name, description, or tags
- 🏷️ **Filter** by category
- ⭐ **Popular** templates highlighted
- 📊 **Stats** showing total templates
- 🎨 **Visual cards** with icons and descriptions

---

## ⚡ Advanced Features

### 1. Optional Fields
```typescript
{ id: 'optional_field', label: 'Optional', type: 'text', required: false }
```

### 2. Default Values
```typescript
{ id: 'company_name', label: 'Company', type: 'text', defaultValue: 'Smartpro' }
```

### 3. Dropdown Menus
```typescript
{ 
  id: 'urgency', 
  label: 'Urgency', 
  type: 'select', 
  options: [
    { value: 'normal', label: 'Normal' },
    { value: 'urgent', label: 'Urgent' },
  ]
}
```

### 4. Help Text
```typescript
{ id: 'civil_id', label: 'Civil ID', type: 'text', helpText: '8-digit number' }
```

---

## 📱 How It Works

### User Flow:

1. **Browse Templates** - User sees all available templates
2. **Select Template** - Choose the one they need
3. **Fill Form** - Smart form appears with required fields
4. **Live Preview** - See letter update in real-time
5. **Export** - Copy, print, or download

### Under the Hood:

1. Templates defined in `letterTemplates.ts`
2. Template Browser displays them
3. Professional Letter Builder loads selected template
4. Form dynamically generated from `fields` array
5. Placeholders replaced with form values
6. Beautiful letter rendered

---

## 🎨 Customization Tips

### Tip 1: Professional Formatting
Use proper spacing and structure:
```
Company Name
Address
Contact Info

Date: {date}
Ref: {reference_number}

To: {recipient}

Subject: {subject}

[Body paragraphs]

Closing,
Signature
```

### Tip 2: Bilingual Consistency
Ensure both English and Arabic templates have the same structure and placeholders.

### Tip 3: Clear Field Labels
- ✅ "Employee Name" (clear)
- ❌ "Name1" (confusing)

### Tip 4: Use Tags
Add searchable tags to help users find templates:
```typescript
tags: ['employment', 'verification', 'HR']
```

---

## 🆘 Common Questions

### Q: How many templates can I add?
**A:** Unlimited! The system is fully scalable.

### Q: Do I need to know programming?
**A:** No! Just copy-paste and edit text.

### Q: Can I use my own categories?
**A:** Yes! Add them to `CATEGORY_LABELS`.

### Q: What if I make a mistake?
**A:** The system will show errors. Just fix the syntax and save.

### Q: Can I delete built-in templates?
**A:** Yes, but we recommend keeping them as examples.

### Q: How do I add a logo?
**A:** Use the `{company_logo}` placeholder (requires backend integration).

---

## 📞 Support

- **Documentation**: `LETTER_TEMPLATES_GUIDE.md`
- **Configuration**: `client/src/config/letterTemplates.ts`
- **UI Component**: `client/src/components/TemplateBrowser.tsx`
- **Letter Builder**: `client/src/pages/demo/ProfessionalLetterBuilder.tsx`

---

## 🎉 Summary

### What You Can Do:
✅ Add unlimited letter types  
✅ No coding required  
✅ Bilingual support (AR/EN)  
✅ Professional formatting  
✅ Dynamic form fields  
✅ Real-time preview  
✅ Print, copy, export  

### What It Takes:
1. Edit one configuration file
2. Copy an existing template
3. Modify the content
4. Save

**That's it! 🚀**

---

## 🔗 Quick Links

- [📖 Complete Template Guide](./LETTER_TEMPLATES_GUIDE.md)
- [⚙️ Configuration File](./client/src/config/letterTemplates.ts)
- [🎨 Template Browser](./client/src/components/TemplateBrowser.tsx)
- [💼 Letter Builder](./client/src/pages/demo/ProfessionalLetterBuilder.tsx)

---

**Built with ❤️ by Smartpro - Making business letters simple and professional**

