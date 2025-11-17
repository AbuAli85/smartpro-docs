# Email & WhatsApp Templates

Professional post-submission templates for the Smartpro consultation form.

## 📧 Templates Included

1. **Client Confirmation Email** (`email-client-confirmation.md`)
   - Sent to the lead after form submission
   - Professional, reassuring tone
   - Includes summary of their request and next steps
   - **✅ Includes both English and Arabic versions**

2. **Internal Notification Email** (`email-internal-notification.md`)
   - Sent to your team when a new lead comes in
   - All key information in one place
   - Easy to scan and act on

3. **WhatsApp Message** (`whatsapp-message.md`)
   - Template for manual or automated WhatsApp follow-up
   - Concise and friendly
   - Can be integrated with Make.com WhatsApp API
   - **✅ Includes both English and Arabic versions**

## 🚀 How to Use

### For Make.com / Resend

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

## ✨ Customization Tips

1. **Branding**: Add your logo, colors, and brand voice
2. **Personalization**: Use client name and specific service they selected
3. **Conditional Content**: Only show optional fields if they have values
4. **Call-to-Action**: Make it clear what happens next
5. **Mobile-Friendly**: Keep WhatsApp messages under 160 characters when possible

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

