# Make.com v2 Scenario Connection Guide

**Your existing `smartpro-website-consultation-v2` scenario is production-ready!** This guide helps you connect your frontend to it.

---

## ✅ What You Already Have Right

Your v2 scenario is well-structured:

- ✅ **Webhook → Sheets → Router → AI Email → Resend → Sheets Update**
- ✅ Clean column mapping (A-R, with room for S-Z)
- ✅ Smart routing: Accounting, PRO Services, Company Formation, Default
- ✅ Post-email status updates (Email Status, Last Email Preview, Response Status, Follow-up Count)
- ✅ Professional HTML email templates

**No need to create a new scenario - just connect to this one!**

---

## 🔧 Frontend Alignment Fixes

### 1. Field Name: `message` (not `primary_message`)

**Issue:** Make.com maps column N from `{{1.message}}`, but frontend was sending `primary_message`.

**Fix Applied:** ✅ Frontend now sends `message` to match Make.com.

**Make.com Mapping:**
- Column N: "Primary Message (N)" → `{{1.message}}`

---

### 2. Services Format: String (not Array)

**Issue:** Make.com expects `services` as a comma-separated string for column H.

**Fix Applied:** ✅ Frontend now sends `services` as string: `"Accounting & Bookkeeping, VAT Registration & Filing"`

**Make.com Mapping:**
- Column H: "Services (Full List)" → `{{1.services}}`

---

## 📋 Current Make.com v2 Field Mapping

Your scenario maps these fields (confirmed working):

| Column | Field Name | Make.com Variable | Frontend Field |
|--------|------------|-------------------|----------------|
| A | Timestamp | `{{now}}` | Auto-generated |
| B | Client Name | `{{1.client_name}}` | `client_name` |
| C | Email | `{{1.email}}` | `email` |
| D | Phone | `{{1.phone}}` | `phone` |
| E | Business Name | `{{1.business_name}}` | `business_name` |
| F | Business Type | `{{1.business_type}}` | `business_type` |
| G | Service Interested | `{{1.service_interested}}` | `service_interested` |
| H | Services (Full List) | `{{1.services}}` | `services` (string) |
| I | Budget | `{{1.budget}}` | `budget` |
| J | Timeline | `{{1.timeline}}` | `timeline` |
| K | Preferred Contact | `{{1.preferred_contact}}` | `preferred_contact` |
| L | Preferred Time | `{{1.preferred_time}}` | `preferred_time` |
| M | Location | `{{1.location}}` | `location` |
| N | Primary Message | `{{1.message}}` | `message` |
| O | Notes | `{{1.notes}}` | `notes` |
| P | Language | `{{1.language}}` | `language` |
| Q | Source | `{{1.source}}` | `source` |
| R | Email Status | `"Pending"` | Default value |
| S | Last Email Preview | `""` | Updated after email |
| T | Service Type Normalised | (not set yet) | See improvements below |
| U | Response Status | `"No Response"` | Updated after email |
| W | Follow-up Count | `"0"` | Updated after email |

---

## 🎯 Step-by-Step Connection Process

### Step 1: Webhook URL (Already Configured)

**Your webhook URL is already set in the codebase:**
- **URL:** `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`
- **Scenario:** `smartpro-website-consultation-v2`
- **Module:** Webhook (`smartpro-website-leads`)

**Note:** The default URL is already configured in `client/src/config/webhook.ts`. You can override it with an environment variable if needed.

### Step 2: Environment Configuration (Optional)

**The webhook URL is already configured as the default in the codebase.**

**If you want to override it with an environment variable:**

**File:** `.env` or `.env.local` (in project root)

```env
VITE_MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
```

**Note:** The code will use the environment variable if set, otherwise it uses the default URL from `client/src/config/webhook.ts`.

### Step 3: Deploy Frontend

1. Commit the frontend changes (field name fixes)
2. Deploy to production
3. Verify environment variable is set correctly

### Step 4: Test Each Route

Test one submission per service type:

#### Test 1: Accounting Route
- **Service:** Select "Accounting & Bookkeeping"
- **Expected:** Routes to Accounting GPT → Accounting email template
- **Check:** Email Status = "Sent", Last Email Preview populated

#### Test 2: PRO Services Route
- **Service:** Select "PRO Services"
- **Expected:** Routes to PRO Services GPT → PRO email template
- **Check:** Email Status = "Sent", Last Email Preview populated

#### Test 3: Company Formation Route
- **Service:** Select "Company Formation"
- **Expected:** Routes to Company Formation GPT → Company Formation email template
- **Check:** Email Status = "Sent", Last Email Preview populated

#### Test 4: Default Route
- **Service:** Select "VAT" or "Business Consulting" or "Other"
- **Expected:** Routes to Default GPT → General email template
- **Check:** Email Status = "Sent", Last Email Preview populated

### Step 5: Verify Data Flow

For each test submission, verify:

- [ ] Row added to `Smartpro Leads / leads` sheet
- [ ] All columns (A-Q) populated correctly
- [ ] Email Status = "Pending" initially
- [ ] Email received in inbox
- [ ] Email Status updated to "Sent"
- [ ] Last Email Preview (S) contains AI-generated text
- [ ] Response Status (U) = "No Response"
- [ ] Follow-up Count (W) = "0"

---

## 🔧 Optional Improvements (Recommended)

### Improvement 1: Add Service Type Normalised (Column T)

**Why:** Makes filtering/analytics easier in Google Sheets.

**How:** In each `updateRow` module, add:

**Accounting Route (Module 7):**
```json
{
  "17": "Sent",
  "18": "{{3.choices[1].message.content}}",
  "19": "Accounting",  // ← Add this
  "20": "No Response",
  "22": "0"
}
```

**PRO Services Route (Module 12):**
```json
{
  "17": "Sent",
  "18": "{{10.choices[1].message.content}}",
  "19": "PRO Services",  // ← Add this
  "20": "No Response",
  "22": "0"
}
```

**Company Formation Route (Module 15):**
```json
{
  "17": "Sent",
  "18": "{{13.choices[1].message.content}}",
  "19": "Company Formation",  // ← Add this
  "20": "No Response",
  "22": "0"
}
```

**Default Route (Module after GPT 16):**
```json
{
  "17": "Sent",
  "18": "{{16.choices[1].message.content}}",
  "19": "{{1.service_interested}}",  // ← Use actual service or "Other"
  "20": "No Response",
  "22": "0"
}
```

---

### Improvement 2: Add Internal Notification Email

**Why:** Get instant alerts when new leads come in.

**How:** After each Resend module (5, 11, 14, 17), add a new Resend module:

**Configuration:**
- **To:** `consultations@thesmartpro.io` (or your internal email)
- **From:** `Smartpro Automation <noreply@portal.thesmartpro.io>`
- **Subject:** `New consultation lead – {{1.client_name}} ({{1.service_interested}})`
- **Body:** Use template from `templates/email-internal-notification.md`

**Placement:**
- After Module 5 (Accounting Resend) → Module 6: Internal Email
- After Module 11 (PRO Resend) → Module 12: Internal Email
- After Module 14 (Company Formation Resend) → Module 15: Internal Email
- After Module 17 (Default Resend) → Module 18: Internal Email

**Note:** You'll need to adjust subsequent module numbers if you add these.

---

### Improvement 3: Language-Based Branching (Future)

**Current:** All emails are in English.

**Future Enhancement:** Add a router before the service router:

```
[1] Webhook
    ↓
[2] Sheets AddRow
    ↓
[3] Router: Language
    ├─ Arabic → [Arabic Service Router] → [Arabic Templates]
    └─ English → [Current Service Router] → [Current Templates]
```

**When to implement:** After Arabic email templates are finalized and tested.

---

## 🚨 Troubleshooting

### Issue: Data not appearing in Sheets

**Check:**
1. Make.com scenario is **Active** (not paused)
2. Webhook URL is correct in frontend `.env`
3. Make.com execution history shows webhook received data
4. Google Sheets connection is active
5. Sheet name is exactly `"leads"` (case-sensitive)

### Issue: Email not sending

**Check:**
1. Resend connection is active in Make.com
2. Email address is valid
3. Check spam folder
4. Make.com execution history for errors
5. GPT module completed successfully (check execution order)

### Issue: Wrong route triggered

**Check:**
1. `service_interested` field contains expected text:
   - "Accounting" for Accounting route
   - "PRO Services" for PRO route
   - "Company Formation" for Company Formation route
2. Router filters are set correctly
3. Check Make.com execution history to see which route was taken

### Issue: Status not updating

**Check:**
1. `updateRow` module uses correct `rowNumber` from Module 2
2. Column indices match (17 = R, 18 = S, etc.)
3. `updateRow` module executed successfully
4. Google Sheets permissions are correct

---

## 📊 Monitoring Your Integration

### Daily Checks

1. **Make.com Execution History:**
   - Check for failed executions
   - Review execution times (should be < 30 seconds)
   - Look for error patterns

2. **Google Sheets:**
   - Filter by `Email Status = "Pending"` to see unsent emails
   - Filter by `Email Status = "Error:*"` to see failures
   - Check recent submissions (last 24 hours)

3. **Email Delivery:**
   - Check spam folder occasionally
   - Verify reply-to address works
   - Test "Schedule a Call" button

### Weekly Review

- Review lead quality and conversion
- Check AI email quality (read a few samples)
- Monitor response rates
- Clean up any test submissions

---

## ✅ Pre-Launch Checklist

Before going live:

- [ ] Webhook URL added to production `.env`
- [ ] Frontend deployed with field name fixes
- [ ] Tested all 4 routes (Accounting, PRO, Company Formation, Default)
- [ ] Verified data appears in Google Sheets
- [ ] Verified emails are sent and received
- [ ] Verified status updates work
- [ ] (Optional) Added Service Type Normalised
- [ ] (Optional) Added internal notification email
- [ ] Old scenario disabled (but kept as backup)

---

## 📚 Related Documentation

- **Canonical Integration Guide:** `INTEGRATION_CANONICAL.md`
- **Email Templates:** `templates/email-client-confirmation.md`
- **Internal Email:** `templates/email-internal-notification.md`
- **Make.com Integration:** `MAKECOM_INTEGRATION.md`

---

**Status:** ✅ Ready to Connect  
**Last Updated:** 2024  
**Scenario:** `smartpro-website-consultation-v2`

