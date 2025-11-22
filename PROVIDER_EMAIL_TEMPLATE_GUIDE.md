# Provider Email Template Guide

**Template:** `templates/email-provider-notification-html.html`  
**Purpose:** Internal notification email sent to Smartpro team when a new consultation request is submitted  
**Used in:** Make.com scenario (Module for sending provider notifications)

---

## 📧 Template Overview

This HTML email template is sent to the Smartpro team (providers) when a client submits a consultation form. It includes:

- ✅ Client information (name, email, phone, business)
- ✅ Service details (primary service, all services, budget, timeline)
- ✅ Client message (if provided)
- ✅ Contact preferences
- ✅ Submission metadata
- ✅ Action buttons (Reply to Client, View in Sheets)

---

## 🔧 Make.com Variable Mapping

The template uses Make.com-specific syntax with module references and functions:

| Variable | Make.com Syntax | Description | Module Reference |
|----------|----------------|-------------|------------------|
| `{{1.client_name}}` | Module 1 field | Client's full name | Module 1 (Webhook) |
| `{{1.email}}` | Module 1 field | Client's email address | Module 1 (Webhook) |
| `{{1.phone}}` | Module 1 field | Client's phone number | Module 1 (Webhook) |
| `{{1.business_name}}` | Module 1 field | Company/business name | Module 1 (Webhook) |
| `{{1.business_type}}` | Module 1 field | Type of business entity | Module 1 (Webhook) |
| `{{1.service_interested}}` | Module 1 field | Primary service (for routing) | Module 1 (Webhook) |
| `{{join(1.services; ", ")}}` | Make.com function | All services (comma-separated) | Module 1 (Webhook) |
| `{{1.budget}}` | Module 1 field | Budget range | Module 1 (Webhook) |
| `{{1.timeline}}` | Module 1 field | Project timeline | Module 1 (Webhook) |
| `{{1.primary_message}}` | Module 1 field | Client's message/notes | Module 1 (Webhook) |
| `{{1.preferred_contact}}` | Module 1 field | Preferred contact method | Module 1 (Webhook) |
| `{{1.preferred_time}}` | Module 1 field | Preferred contact time | Module 1 (Webhook) |
| `{{if(1.language = "ar"; "Arabic (العربية)"; "English")}}` | Make.com conditional | Display language | Module 1 (Webhook) |
| `{{1.location}}` | Module 1 field | Client location | Module 1 (Webhook) |
| `{{1.source}}` | Module 1 field | Form source | Module 1 (Webhook) |
| `{{now}}` | Make.com function | Current timestamp | System function |
| `{{2.rowNumber}}` | Module 2 field | Google Sheets row number | Module 2 (Google Sheets) |

**Note:** 
- `{{1.xxx}}` references data from Module 1 (Webhook trigger)
- `{{2.xxx}}` references data from Module 2 (Google Sheets)
- `{{join()}}` is a Make.com function to join arrays
- `{{if()}}` is a Make.com conditional function
- `{{now}}` is a Make.com system function for current date/time

---

## 🎨 Template Features

### Design
- **Professional gradient header** (Smartpro brand colors)
- **Color-coded sections** for easy scanning:
  - Blue: Client Information
  - Light Blue: Service Request
  - Orange: Client Message
  - Gray: Contact Preferences & Metadata
- **Responsive design** (works on mobile and desktop)
- **Action buttons** for quick responses

### Sections

1. **Header**
   - Title: "🔔 New Consultation Request"
   - Subtitle: "Smartpro Business Hub & Services"

2. **Client Information** (Blue border)
   - Name, Email (clickable), Phone (clickable)
   - Business name and type

3. **Service Request** (Light blue border)
   - Primary service (used for routing)
   - All selected services
   - Budget and timeline

4. **Client Message** (Orange border)
   - Always shown (empty if no message)
   - Pre-formatted text

5. **Contact Preferences** (Gray background)
   - Preferred contact method
   - Preferred time

6. **Submission Details** (Gray border)
   - Language, Location, Source
   - Timestamp, Sheet row number

7. **Action Buttons**
   - **Reply to Client**: Opens email client with pre-filled subject/body
   - **View in Sheets**: Links to Google Sheets

8. **Footer**
   - Automated notification notice
   - 24-hour response reminder

---

## 📋 Make.com Setup Instructions

### Step 1: Add Email Module

In your Make.com scenario, add an **Email** module (Resend, SendGrid, etc.) after the Google Sheets module.

### Step 2: Configure Email

1. **To:** Your team email (e.g., `team@smartpro.io`)
2. **Subject:** `New Consultation Request: {{service_interested}} - {{client_name}}`
3. **From:** `noreply@smartpro.io` (or your sending address)
4. **HTML Content:** Copy the template from `templates/email-provider-notification-html.html`

### Step 3: Variable Mapping

The template already uses Make.com syntax, so variables are automatically mapped:

**Module 1 (Webhook) Variables:**
- `{{1.client_name}}` - Automatically pulls from Module 1
- `{{1.email}}` - Automatically pulls from Module 1
- `{{1.phone}}` - Automatically pulls from Module 1
- `{{1.business_name}}` - Automatically pulls from Module 1
- `{{1.business_type}}` - Automatically pulls from Module 1
- `{{1.service_interested}}` - Automatically pulls from Module 1
- `{{1.budget}}` - Automatically pulls from Module 1
- `{{1.timeline}}` - Automatically pulls from Module 1
- `{{1.primary_message}}` - Automatically pulls from Module 1
- `{{1.preferred_contact}}` - Automatically pulls from Module 1
- `{{1.preferred_time}}` - Automatically pulls from Module 1
- `{{1.location}}` - Automatically pulls from Module 1
- `{{1.source}}` - Automatically pulls from Module 1

**Module 2 (Google Sheets) Variables:**
- `{{2.rowNumber}}` - Row number from Google Sheets module

**Make.com Functions:**
- `{{join(1.services; ", ")}}` - Joins services array with comma separator
- `{{if(1.language = "ar"; "Arabic (العربية)"; "English")}}` - Conditional language display
- `{{now}}` - Current timestamp

**No manual mapping needed!** The template syntax matches Make.com's variable system.

---

## 🔗 Google Sheets Link

The template includes a link to Google Sheets:

```
https://docs.google.com/spreadsheets/d/1NVjl-yG95DLLjyF3HQ6qMBBCBQUQQe3HO_E6-MnVGeU/edit#gid=0
```

**Sheet ID:** `1NVjl-yG95DLLjyF3HQ6qMBBCBQUQQe3HO_E6-MnVGeU`

This link is already configured in the template. Make.com can also dynamically generate this link if needed.

---

## ✅ Testing Checklist

- [ ] Email sends successfully from Make.com
- [ ] All variables are replaced correctly
- [ ] Email renders correctly in:
  - [ ] Gmail (web)
  - [ ] Outlook (web)
  - [ ] Apple Mail
  - [ ] Mobile email clients
- [ ] Links work correctly:
  - [ ] Reply to Client button
  - [ ] View in Sheets button
- [ ] Empty fields display gracefully (no "undefined" or empty sections)
- [ ] Language display shows "English" or "Arabic" correctly

---

## 🐛 Troubleshooting

### Variables Not Replacing

**Issue:** Variables show as `{{1.variable}}` in email

**Fix:**
- Verify Module 1 (Webhook) is properly configured
- Check that field names match exactly (case-sensitive)
- Ensure Module 1 has executed successfully before email module
- For `{{2.rowNumber}}`, verify Google Sheets module (Module 2) is configured
- Check Make.com execution logs for variable availability

### Empty Fields Showing

**Issue:** Empty fields show as blank or "undefined"

**Fix:**
- Use Make.com's "If empty" handling
- Or add conditional logic: `{{#if variable}}{{variable}}{{else}}Not provided{{/if}}`

### Email Not Sending

**Issue:** Email module fails

**Fix:**
- Check email service credentials (Resend API key, etc.)
- Verify "To" email address is valid
- Check Make.com execution logs

### Google Sheets Link Not Working

**Issue:** Link doesn't open correct sheet

**Fix:**
- Verify sheet ID is correct: `1NVjl-yG95DLLjyF3HQ6qMBBCBQUQQe3HO_E6-MnVGeU`
- Check sheet permissions (must be accessible)
- Test link manually in browser

---

## 📝 Notes

- **Template is HTML-only** (no CSS files needed)
- **Inline styles** for maximum email client compatibility
- **Responsive design** works on mobile devices
- **Professional branding** matches Smartpro colors
- **Action-oriented** with clear CTAs

---

**Status:** ✅ Template ready for use in Make.com

