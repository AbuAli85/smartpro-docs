# Email & WhatsApp Templates

Professional post-submission templates for the Smartpro consultation form.

## 📧 Templates Included

1. **Client Confirmation Email** (`email-client-confirmation.md`)
   - Sent to the lead after form submission
   - Professional, reassuring tone
   - Includes summary of their request and next steps
   - **✅ Includes both English and Arabic versions**

2. **Client Confirmation Email (HTML)** (`email-client-confirmation-html.html` / `email-client-confirmation-html-makecom.html`)
   - **Professional HTML email template** matching the admin notification design
   - Beautiful, responsive design with branded colors
   - Includes all request details in an organized, scannable format
   - **Ready for Make.com** (use `-makecom.html` version)
   - Same styling as internal notification email for brand consistency
   - **Features "Schedule a Call" button** - Replace `{{booking_url}}` with your Calendly/booking page URL
   - **✅ Includes Arabic versions** (`email-client-confirmation-html-arabic.html` / `email-client-confirmation-html-arabic-makecom.html`)
     - Full RTL (right-to-left) support
     - Arabic fonts (Tahoma, Arial Unicode MS)
     - All content translated to Arabic

3. **Internal Notification Email** (`email-internal-notification.md`)
   - Sent to your team when a new lead comes in
   - All key information in one place
   - Easy to scan and act on

4. **WhatsApp Message** (`whatsapp-message.md`)
   - Template for manual or automated WhatsApp follow-up
   - Concise and friendly
   - Can be integrated with Make.com WhatsApp API
   - **✅ Includes both English and Arabic versions**

## 🚀 How to Use

### For Make.com / Resend

#### Using HTML Templates (Recommended)

1. **Choose the correct template based on language:**
   - English: `email-client-confirmation-html-makecom.html`
   - Arabic: `email-client-confirmation-html-arabic-makecom.html`
2. **Copy the HTML template** from the chosen file
3. **Paste into your Make.com email module** (Resend, SendGrid, etc.) as HTML
4. **Make.com variables are already included** in the format `{{1.field_name}}`
5. **Adjust variable numbers** if needed (e.g., `{{2.field_name}}` if data comes from module 2)
6. **For optional fields**, use Make.com's "Set variable" module with conditionals to exclude empty fields, or use a router to send a simplified version when fields are empty
7. **For language detection**, use Make.com's "If" module to route to English or Arabic template based on `{{1.language}}` field

#### Using Markdown Templates

1. **Copy the template content** from the markdown file
2. **Paste into your Make.com email module** (Resend, SendGrid, etc.)
3. **Replace placeholders** with Make.com variables:
   - `{{client_name}}` → `{{1.client_name}}` (or your Make.com variable syntax)
   - `{{email}}` → `{{1.email}}`
   - etc.

4. **Add conditional logic** for optional fields:
   - Only show location/timeline/budget if they have values
   - Use Make.com's "If" module or conditional text

### For Manual Use

1. **Copy the template** from the markdown file
2. **Replace placeholders** with actual values from Google Sheets
3. **Send via your email client or WhatsApp**

## 📋 Field Reference

All templates use placeholders that map to your existing webhook payload structure:

- `client_name` - Client's full name
- `email` - Client's email address
- `phone` - Client's phone number (optional)
- `business_name` - Company/business name
- `service_interested` - Primary service (first selected)
- `services` - All selected services (comma-separated)
- `location` - Client location (optional)
- `budget` - Estimated budget (optional)
- `timeline` - Project timeline (optional)
- `preferred_contact` - Preferred contact method (optional)
- `preferred_time` - Preferred contact time (optional)
- `message` - Client's message/notes
- `notes` - Comprehensive notes field (auto-generated)
- `language` - Form language (en/ar)
- `timestamp` - Submission timestamp
- `booking_url` - Scheduling link (Calendly, booking page URL, etc.) - **Required for HTML templates with "Schedule a Call" button**

## ✨ Customization Tips

1. **Branding**: Add your logo, colors, and brand voice
2. **Personalization**: Use client name and specific service they selected
3. **Conditional Content**: Only show optional fields if they have values
4. **Call-to-Action**: Make it clear what happens next
5. **Mobile-Friendly**: Keep WhatsApp messages under 160 characters when possible

## 🌐 Arabic Email Template - Simple Setup

**Good News**: The Arabic email template is **very simple** - no translation needed!

### How It Works:

1. **Arabic template displays English values directly** from the form
2. **Only labels and headers are in Arabic** (like "ملخص الطلب", "الخدمة الأساسية")
3. **Service names stay in English** (like "PRO Services", "Company Formation")
4. **No Make.com translation setup required** - just use the template!

### Simple Setup:

```
Webhook → Router (split by {{1.language}})
  ├─ Route AR: Send Arabic template (email-client-confirmation-html-arabic-makecom.html)
  └─ Route EN: Send English template (email-client-confirmation-html-makecom.html)
```

**That's it!** The Arabic template will:
- Show Arabic labels and headers
- Display English service names from the form (no translation needed)
- Show ALL selected services automatically (users can select 1-15 services)

### Example Output:

```
📋 ملخص الطلب
اسم النشاط: My Company
نوع النشاط: LLC
الخدمة الأساسية: PRO Services
جميع الخدمات: PRO Services, Company Formation, Business Consulting
الميزانية: $5,000 - $10,000
الإطار الزمني: 6-12 Months
```

**Note**: Service names appear in English, but all labels are in Arabic. This is the simplest approach - no translation setup needed!

### Other Fields That May Need Translation:

- `business_type`: Translate business type values
- `budget`: Translate budget range labels if needed
- `timeline`: Translate timeline values if needed
- `preferred_contact`: Translate contact method names if needed

## 🔗 Integration with Make.com

These templates are designed to work seamlessly with your existing Make.com flow:

1. **Webhook** receives form data
2. **Google Sheets** stores the data
3. **Resend/SendGrid** sends client confirmation email (English or Arabic based on `{{language}}` field)
4. **Resend/SendGrid** sends internal notification email
5. **WhatsApp API** (optional) sends WhatsApp message (English or Arabic based on `{{language}}` field)

All templates align with your current field structure, so no mapping changes needed!

### Language Detection

Both email and WhatsApp templates include language detection instructions. Use the `{{language}}` field from your webhook payload:

- If `{{language}} === "ar"` → Send Arabic version
- If `{{language}} === "en"` or empty → Send English version

Use Make.com's "If" module to route to the appropriate template.

