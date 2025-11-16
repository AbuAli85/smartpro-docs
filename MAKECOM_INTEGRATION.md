# Make.com Integration Documentation

This document describes how the Smartpro consultation form integrates with the Make.com automation workflow.

## 🔄 Automation Flow Overview

Your Make.com scenario processes leads through 4 steps:

1. **Webhook** → Receives form submission from frontend
2. **Google Sheets** → Saves lead data to spreadsheet
3. **OpenAI GPT** → Generates personalized welcome email
4. **Resend** → Sends email to the lead

## 📤 Frontend → Make.com Data Flow

### Webhook Endpoint
```
POST https://hook.eu2.make.com/kd1lhgadjt2ip9vi0i8q1t7g59ke86ke
```

### JSON Payload Structure

The frontend sends the following JSON structure:

```json
{
  "client_name": "John Doe",
  "email": "john@example.com",
  "business_name": "Acme Corp",
  "service_interested": "Company Formation",
  "notes": "Looking to set up a business in UAE",
  "source": "smartpro-website"
}
```

### Field Mapping

| Frontend Field | Make.com Variable | Google Sheets Column | Description |
|---------------|-------------------|---------------------|-------------|
| `name` | `client_name` | Column B | Client's full name (required) |
| `email` | `email` | Column C | Client's email address (required) |
| `businessName` | `business_name` | Column D | Business name (optional) |
| `serviceInterested` | `service_interested` | Column E | Service type (required) |
| `extraDetails` | `notes` | Column F | Additional details (optional) |
| - | `source` | - | Always "smartpro-website" |

## 📊 Google Sheets Structure

Your automation saves leads to a Google Sheet with the following columns:

| Column | Field | Data Source |
|--------|-------|-------------|
| A | Timestamp | `{{now}}` - Auto-generated |
| B | Client Name | `{{1.client_name}}` |
| C | Email | `{{1.email}}` |
| D | Business Name | `{{1.business_name}}` |
| E | Service Interested | `{{1.service_interested}}` |
| F | Notes / Extra Info | `{{1.notes}}` |
| G | Email Status | "Pending" (default) |
| H | Last Email Preview | (Populated later) |
| I-Z | (Reserved for future use) | - |

## 🤖 AI Email Generation

The OpenAI module generates personalized emails using GPT-5.1 model:

**System Prompt:**
```
- Acts as email assistant for Smartpro Business Hub & Services
- Writes short, clear, professional emails (120-200 words)
- Friendly, polite, professional tone
- No prices, timelines, or legal guarantees
- Always includes clear next step
```

**User Prompt:**
```
- Client name: {{1.client_name}}
- Email: {{1.email}}
- Business: {{1.business_name}}
- Service interested: {{1.service_interested}}
- Extra details: {{1.notes}}
```

**Model Configuration:**
- Model: `gpt-5.1` (Upgraded GPT-5 with steadier reasoning and improved context handling)
- Temperature: `1` (balanced creativity)
- Max Tokens: `2048`
- Response Format: `text`

**Output:**
- Main body of email content
- Thank you message
- Service explanation
- 1-3 clarifying questions
- Call to action (reply or book call)

**Note:** The AI-generated content is inserted into the email template using:
```
{{replace(3.choices[1].message.content; "\n"; "<br>")}}
```
This converts newlines to HTML line breaks for proper email formatting.

## 📧 Email Template

The Resend module sends emails with:

**From:** `Smartpro Business Hub <noreply@portal.thesmartpro.io>`

**Subject:** `Welcome to Smartpro – {{1.service_interested}}`

**Content:**
- Professional HTML template with responsive design
- AI-generated personalized body (inserted dynamically)
- "Schedule a Call" button linking to `https://thesmartpro.io/book`
- Footer with website and support email

### Email Template Structure

The email uses a professional HTML template with:

1. **Header Section:**
   - Dark blue background (#0d3c61)
   - White text
   - "Smartpro Business Hub & Services" branding

2. **Body Section:**
   - Personalized greeting: "Dear {{1.client_name}},"
   - AI-generated content (120-200 words)
   - Service-specific information
   - Clarifying questions (1-3)
   - Call-to-action paragraph

3. **Call-to-Action Button:**
   - "Schedule a Call" button
   - Links to: `https://thesmartpro.io/book`
   - Styled with brand colors (#0d3c61)

4. **Footer Section:**
   - Light gray background (#f0f2f5)
   - Website link: `www.thesmartpro.io`
   - Support email: `support@portal.thesmartpro.io`

### Example Email Output

Here's a real-world example of the generated email (for "PRO Services"):

**Subject:** `Welcome to Smartpro – PRO Services`

**HTML Email Structure:**
- Professional responsive HTML template
- Branded header with Smartpro Business Hub & Services
- Personalized greeting with client name
- AI-generated body content (120-200 words)
- Service-specific information and questions
- "Schedule a Call" CTA button
- Professional footer with contact information

**Sample Content (from actual email):**
```
Dear Fahad alamri,

Thank you for contacting Smartpro Business Hub & Services and for your 
interest in our accounting support for Falcon Eye Group. We are glad to 
explore how we can help you streamline your finance function.

We can assist with setting up or improving your accounting system, managing 
monthly bookkeeping, preparing management reports, and supporting VAT 
compliance and audits. Our goal is to give you clear, timely financial 
information so you can focus on growing Falcon Eye Group while we handle 
the numbers in the background.

To better understand your needs, could you please share:
1) Are you looking for full ongoing accounting support, or help with 
   specific tasks (e.g., monthly closing, reporting, VAT)?
2) Do you currently use any accounting software? If yes, which one?
3) Are there particular challenges or pain points you want to solve first?

You can reply to this email with your answers, or let me know a suitable 
time and we can arrange a short call to discuss the best solution for 
Falcon Eye Group.

[Schedule a Call Button]

Best regards,
Smartpro Business Hub & Services

---
www.thesmartpro.io | support@portal.thesmartpro.io
```

**Key Features:**
- ✅ Personalized with client and business name
- ✅ Service-specific content
- ✅ Clear value proposition
- ✅ Actionable questions (3 questions)
- ✅ Multiple call-to-action options (reply or schedule)
- ✅ Professional tone and formatting

### AI Content Quality

The OpenAI module generates content that:
- ✅ Thanks the client for contacting Smartpro
- ✅ Explains how Smartpro can help with the requested service
- ✅ Asks 1-3 relevant clarifying questions
- ✅ Invites reply or call booking
- ✅ Uses professional, friendly tone
- ✅ Avoids pricing, timelines, or legal guarantees
- ✅ Keeps length between 120-200 words

## ✅ Integration Verification

### Test the Integration

1. **Submit Test Form:**
   ```bash
   # Visit /consultation and submit form with test data
   ```

2. **Check Make.com:**
   - Go to Make.com scenario
   - Check execution history
   - Verify webhook received data

3. **Check Google Sheets:**
   - Open "Smartpro Leads" spreadsheet
   - Verify new row added with correct data
   - Check timestamp is correct

4. **Check Email:**
   - Verify lead received welcome email
   - Check email content is personalized
   - Verify "Schedule a Call" button works

### Expected Behavior

✅ **Success Flow:**
1. User submits form on `/consultation`
2. Frontend sends POST to Make.com webhook
3. Make.com saves to Google Sheets
4. Make.com generates AI email
5. Make.com sends email via Resend
6. Lead receives personalized welcome email

❌ **Error Handling:**
- Network errors: Frontend shows user-friendly message
- Webhook errors: Make.com scenario handles errors
- Email failures: Tracked in Google Sheets (Email Status column)

## 🔍 Service Types

The form supports these service options (mapped to `service_interested`):

1. **Company Formation**
2. **PRO Services**
3. **Accounting**
4. **VAT**
5. **Other**

These values are sent exactly as selected and used in:
- Google Sheets (Column E)
- Email subject line
- AI email generation prompt

## 📝 Data Validation

### Frontend Validation
- ✅ Name: Required, non-empty
- ✅ Email: Required, valid email format
- ✅ Service: Required, must select from dropdown
- ✅ Business Name: Optional
- ✅ Extra Details: Optional

### Make.com Processing
- All fields are passed through as strings
- Empty optional fields sent as empty strings `""`
- Timestamp auto-generated by Make.com
- Email status defaults to "Pending"

## 🚀 Monitoring & Analytics

### Frontend Tracking
- Google Analytics event: `generate_lead`
- Tracks: service type, form completion
- Error tracking for failed submissions

### Make.com Monitoring
- Execution history in Make.com dashboard
- Error logs for failed operations
- Google Sheets serves as lead database

## 🔧 Troubleshooting

### Form Not Reaching Make.com

**Symptoms:** Form submits but no data in Google Sheets

**Solutions:**
1. Check browser console for errors
2. Verify webhook URL is correct: `https://hook.eu2.make.com/kd1lhgadjt2ip9vi0i8q1t7g59ke86ke`
3. Check Make.com scenario is active
4. Verify webhook is receiving data in Make.com execution history

### Email Not Sending

**Symptoms:** Data in Google Sheets but no email received

**Solutions:**
1. Check Make.com execution history for errors
2. Verify Resend connection is active
3. Check spam folder
4. Verify email address is valid
5. Check OpenAI module completed successfully

### Data Not Saving to Google Sheets

**Symptoms:** Webhook receives data but sheet not updated

**Solutions:**
1. Verify Google Sheets connection is active
2. Check spreadsheet ID is correct
3. Verify sheet name "leads" exists
4. Check Google Sheets permissions
5. Review Make.com error logs

## 📋 Configuration Files

### Frontend Configuration
- **File:** `client/src/config/webhook.ts`
- **Variable:** `VITE_MAKE_WEBHOOK_URL`
- **Default:** `https://hook.eu2.make.com/kd1lhgadjt2ip9vi0i8q1t7g59ke86ke`

### Environment Variables
```env
VITE_MAKE_WEBHOOK_URL=https://hook.eu2.make.com/kd1lhgadjt2ip9vi0i8q1t7g59ke86ke
```

## 🎯 Best Practices

1. **Monitor Lead Quality:**
   - Review Google Sheets regularly
   - Track email open rates (if using email tracking)
   - Monitor conversion from email to call booking

2. **Optimize AI Prompts:**
   - Review generated emails for quality
   - Adjust OpenAI system prompt as needed
   - Test different service types

3. **Maintain Data Quality:**
   - Ensure form validation is working
   - Monitor for spam submissions
   - Clean up Google Sheets periodically

4. **Performance:**
   - Monitor Make.com execution times
   - Optimize scenario if slow
   - Consider rate limiting if needed

## 🔐 Security Considerations

1. **Webhook URL:**
   - Keep webhook URL secure
   - Don't expose in client-side code (already handled via env var)
   - Rotate if compromised

2. **Data Privacy:**
   - Ensure GDPR compliance
   - Secure Google Sheets access
   - Protect email addresses

3. **Rate Limiting:**
   - Frontend has client-side rate limiting (3 per minute)
   - Consider server-side rate limiting for production

## 📈 Future Enhancements

Potential improvements to the integration:

1. **Email Tracking:**
   - Add email open tracking
   - Track click-through rates
   - Update Google Sheets with engagement data

2. **Lead Scoring:**
   - Add lead scoring based on service type
   - Prioritize high-value leads
   - Auto-assign to team members

3. **Follow-up Automation:**
   - Schedule follow-up emails
   - Reminder emails for no response
   - Drip campaigns

4. **CRM Integration:**
   - Connect to CRM system
   - Auto-create contacts
   - Sync lead status

---

**Last Updated:** Current Date
**Integration Status:** ✅ Active and Verified
**Webhook URL:** `https://hook.eu2.make.com/kd1lhgadjt2ip9vi0i8q1t7g59ke86ke`

