# Arabic Services in Email - Fix Applied

## Issue
Emails were showing services in English even when the form was submitted in Arabic language.

## Root Cause
The `services` and `services_summary` fields were always sent in English (for Make.com routing), but Make.com email templates use these fields directly, so they displayed English services even for Arabic submissions.

## Solution
Updated the webhook payload to send services in the user's language in the main `services` and `services_summary` fields, while keeping English versions available for routing.

## Changes Made

### Before
```typescript
services: allServicesFormatted, // Always English
services_summary: allServicesFormatted.join(', '), // Always English
```

### After
```typescript
// Use translated services when language is Arabic
const servicesForDisplay = language === 'ar' ? translatedServices : allServicesFormatted;
const servicesSummary = servicesForDisplay.length > 0 
  ? servicesForDisplay.join(', ') 
  : (language === 'ar' ? 'أخرى' : 'Other');

// In payload:
services: servicesForDisplay, // User's language (Arabic if 'ar', English otherwise)
services_english: allServicesFormatted, // English for routing/reference
services_summary: servicesSummary, // User's language
services_summary_english: allServicesFormatted.join(', '), // English for reference
service_interested: primaryService, // Always English (for routing)
```

## Updated Payload Structure

### English Submission
```json
{
  "services": ["Company Formation", "Accounting"],
  "services_english": ["Company Formation", "Accounting"],
  "services_summary": "Company Formation, Accounting",
  "services_summary_english": "Company Formation, Accounting",
  "service_interested": "Company Formation"
}
```

### Arabic Submission
```json
{
  "services": ["تأسيس الشركات", "المحاسبة والمسك الدفتري"],
  "services_english": ["Company Formation", "Accounting"],
  "services_summary": "تأسيس الشركات، المحاسبة والمسك الدفتري",
  "services_summary_english": "Company Formation, Accounting",
  "service_interested": "Company Formation"
}
```

## Make.com Email Template Usage

### For Email Display (Use These)
- `{{1.services}}` - Services array in user's language
- `{{1.services_summary}}` - Services summary in user's language
- These will show Arabic when language is 'ar', English otherwise

### For Routing/Logic (Use These)
- `{{1.service_interested}}` - Primary service (always English, for routing)
- `{{1.services_english}}` - English services array (for reference)
- `{{1.services_summary_english}}` - English summary (for reference)

## Files Updated

1. ✅ `server/routes/consultationRoutes.ts` - Express backend
2. ✅ `api/consultation.ts` - Vercel serverless function
3. ✅ `server/lib/webhookClient.ts` - Webhook interface updated

## Result

✅ **Emails now show services in Arabic when form is submitted in Arabic**
✅ **Make.com routing still works (uses `service_interested` in English)**
✅ **Both Arabic and English versions available for flexibility**

## Testing

- [ ] Submit form in English → Email shows services in English
- [ ] Submit form in Arabic → Email shows services in Arabic
- [ ] Verify Make.com routing still works (uses `service_interested`)
- [ ] Check Google Sheets → Verify both language versions if needed

