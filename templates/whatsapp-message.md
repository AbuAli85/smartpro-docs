# WhatsApp Message Template

**For manual use or Make.com WhatsApp API integration**

## Message Template

```
Hi {{client_name}}, this is Smartpro Business Hub & Services 👋

Thank you for submitting your consultation request about:

{{service_interested}}

We've received your details and our team is reviewing them now.

Within 24 business hours, we will:

- Confirm the consultation time, and
- Share the meeting link or call details.

If you prefer a specific day/time or channel (WhatsApp / call / online meeting), you can reply here and we'll do our best to match it.

Looking forward to speaking with you.
```

## Field Mapping

- `{{client_name}}` → "Client Name" column B
- `{{service_interested}}` → "Service Interested" column G (primary service)

## Usage Instructions

### Manual (Current)
1. Copy the template above
2. Replace placeholders with actual values from Google Sheets
3. Send via WhatsApp Business

### Automated (Future - Make.com)
1. Add a WhatsApp API module after Google Sheets / email steps
2. Use the template above with Make.com placeholders
3. Configure to send automatically after form submission

## Notes

- Keep messages concise (WhatsApp best practice)
- Use emojis sparingly (one or two max)
- Personalize with client name
- Include clear next steps
- Make it easy for them to reply

