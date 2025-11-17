# Client Confirmation Email Template

**For use in Make.com / Resend email step**

## Subject Line Options

Choose one:
- `Consultation request received – Smartpro Business Hub & Services`
- `We've received your Smartpro consultation request`

## Email Body (HTML/Text-friendly)

Use placeholders in the style Make.com/Resend uses: `{{client_name}}`, `{{business_name}}`, etc.

---

Hi {{client_name}},

Thank you for reaching out to Smartpro Business Hub & Services.

We've received your consultation request and our team is now reviewing your details.

Here's a quick summary of what you shared:

- **Business name:** {{business_name}}
- **Services you're interested in:** {{service_interested}}
- **Location** (if provided): {{location}}
- **Project timeline** (if provided): {{timeline}}
- **Estimated budget** (if provided): {{budget}}

During your consultation, we will:

1. Clarify your current situation and priorities,
2. Recommend 2–3 practical options tailored to your business,
3. Outline clear next steps, and if relevant, how Smartpro can support you.

⏰ **What happens next?**

Within 24 business hours, we'll contact you via {{preferred_contact}} to:

- Confirm the date and time of your session, and
- Share the meeting link or call details.

**To get the most value from the session, you can prepare:**

- Any licenses or company documents you have,
- Access to your current accounts (accounting, VAT, PRO, etc.),
- A short list of questions or decisions you want to clarify.

If anything changes or you need to update your request, just reply to this email.

Best regards,  
Smartpro Business Hub & Services

---

## Field Mapping (Make.com → Email)

Map these fields from your webhook payload / Google Sheets:

- `{{client_name}}` → "Client Name" column B
- `{{business_name}}` → "Business Name" column E
- `{{service_interested}}` → "Service Interested" column G
- `{{location}}` → "Location" column (if exists)
- `{{timeline}}` → "Project Timeline" column (if exists)
- `{{budget}}` → "Estimated Budget" column (if exists)
- `{{preferred_contact}}` → "Preferred Contact Method" column (if exists)

**Note:** For optional fields (location, timeline, budget), use conditional logic in Make.com to only include them if they have values.

