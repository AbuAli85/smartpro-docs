# Make.com Webhook Configuration

## 🎯 Dual Webhook System

You have **TWO webhooks** for different purposes:

1. **Submission Webhook** - Receives form submissions ✅
2. **Reply Webhook** - Receives email replies from clients ⚠️ (Needs setup)

---

## ✅ Webhook 1: Form Submission (Configured)

### Webhook URL
```
https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
```

**Label:** Smartpro Consultation Form

### Purpose
Receives consultation form submissions from your website.

### Google Sheets
- **Spreadsheet:** Smartpro Consultation Submissions
- **Sheet:** Sheet1
- **Action:** Add new row with submission data

---

## ⚠️ Webhook 2: Email Reply (Needs Setup)

### Webhook URL
```
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```

### Purpose
Receives email replies from clients who respond to consultation emails.

### Expected Payload
```json
{
  "form_type": "reply",
  "reply_from": "john@example.com",
  "original_email": "john@example.com",
  "message": "Thank you! I would like to schedule...",
  "reply_timestamp": "2025-01-22T14:30:00.000Z",
  "subject": "Re: Thank You for Your Consultation Request",
  "language": "en"
}
```

### Google Sheets Action
- **Action:** Update existing row
- **Filter:** By `email` field
- **Updates:**
  - `client_replied` → `TRUE`
  - `client_replied_at` → timestamp
  - `notes` → Append reply message

**See `EMAIL_REPLY_WEBHOOK_SETUP.md` for complete setup instructions.**

---

## 🔧 Backend Configuration

### Environment Variable (Recommended)

**Set in `.env` file:**
```env
# Submission webhook (form submissions)
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8

# Reply webhook (email replies) - Optional, for future use
MAKE_REPLY_WEBHOOK_URL=https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```

**Or set in Vercel:**
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add: `MAKE_WEBHOOK_URL` = `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
5. Deploy

### Default URL (Fallback)

The backend code has been updated with the new webhook URL as default:
- ✅ `server/lib/webhookClient.ts` - Updated
- ✅ `api/consultation.ts` - Updated

**If `MAKE_WEBHOOK_URL` is not set, it will use the new URL automatically.**

---

## 📋 Make.com Scenario Setup

### Module 1: Webhook Trigger

**Webhook URL:** `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`

**Settings:**
- **Type:** Webhooks > Custom webhook
- **Method:** POST
- **Data structure:** JSON

**Expected Payload:**
```json
{
  "form_type": "consultation",
  "request_id": "req_1234567890",
  "timestamp": "2025-01-22T10:00:00.000Z",
  "client_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "business_name": "Example Business",
  "business_type": "Corporation",
  "service_interested": "Company Formation",
  "service_interested_translated": "تأسيس الشركات",
  "services": ["Company Formation", "Accounting"],
  "services_english": ["Company Formation", "Accounting"],
  "services_summary": "Company Formation, Accounting",
  "services_summary_english": "Company Formation, Accounting",
  "budget": "$5,000 - $10,000",
  "timeline": "3-6 months",
  "preferred_contact": "Email",
  "preferred_time": "Morning",
  "location": "Muscat",
  "primary_message": "I need help with company formation",
  "language": "en",
  "source": "smartpro-consultation-form",
  "notes": "Additional notes here"
}
```

---

## 🧪 Testing

### Test 1: Webhook Connection

**Using cURL:**
```bash
curl -X POST https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9 \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "consultation",
    "request_id": "test_123",
    "timestamp": "2025-01-22T10:00:00.000Z",
    "client_name": "Test User",
    "email": "test@example.com",
    "language": "en",
    "service_interested": "Company Formation",
    "service_interested_translated": "Company Formation"
  }'
```

**Expected Result:**
- Make.com scenario triggers
- Google Sheets row added
- Confirmation email sent

### Test 2: From Backend

1. Submit form through your website
2. Check backend logs for webhook call
3. Verify Make.com scenario executed
4. Check Google Sheets for new row
5. Verify emails sent

---

## 📊 Integration Flow

```
Frontend Form
    ↓
Backend API (/api/consultation)
    ↓
Make.com Webhook
    ↓
┌─────────────────────────────────────┐
│ Make.com Scenario                    │
│ 1. Webhook Trigger                   │
│ 2. Google Sheets: Add Row           │
│ 3. Router (by language)             │
│ 4. Confirmation Email                │
│ 5. ChatGPT (Welcome)                 │
│ 6. Welcome Email                     │
│ 7. Google Sheets: Update            │
│ 8. Provider Notification             │
└─────────────────────────────────────┘
```

---

## ✅ Verification Checklist

### Backend
- [ ] Webhook URL updated in code
- [ ] Environment variable set (optional)
- [ ] Backend deployed
- [ ] Test submission works

### Make.com
- [ ] Webhook module configured
- [ ] Google Sheets module connected
- [ ] All field mappings correct
- [ ] Email modules configured
- [ ] Scenario activated

### Google Sheets
- [ ] Spreadsheet created: "Smartpro Consultation Submissions"
- [ ] Headers set up correctly
- [ ] Make.com has access
- [ ] Test row added successfully

---

## 🚨 Troubleshooting

### Issue 1: Webhook Not Receiving Data

**Check:**
1. Webhook URL is correct
2. Make.com scenario is active
3. Backend is sending POST requests
4. Check backend logs for errors

**Fix:**
- Verify webhook URL in Make.com
- Check scenario is not paused
- Review backend error logs

### Issue 2: Google Sheets Not Updating

**Check:**
1. Google Sheets module is configured
2. Spreadsheet name matches exactly
3. Make.com has edit permissions
4. Field mappings are correct

**Fix:**
- Re-authorize Google connection
- Verify spreadsheet sharing
- Check column mappings

### Issue 3: Emails Not Sending

**Check:**
1. Email modules are configured
2. Email addresses are valid
3. Make.com email limits not exceeded
4. Templates are correct

**Fix:**
- Verify email module settings
- Check Make.com email quota
- Review email templates

---

## 📝 Quick Reference

### Submission Webhook URL
```
https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
```

### Reply Webhook URL
```
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```

### Environment Variables
```env
# Submission webhook (form submissions)
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8

# Reply webhook (email replies)
MAKE_REPLY_WEBHOOK_URL=https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```

### Google Sheets
- **Name:** Smartpro Consultation Submissions
- **Sheet:** Sheet1

### Backend Files Updated
- ✅ `server/lib/webhookClient.ts`
- ✅ `api/consultation.ts`

---

## 🚀 Next Steps

1. **Deploy Backend** (if code updated)
2. **Test Webhook** (submit test form)
3. **Verify Google Sheets** (check for new row)
4. **Check Emails** (confirmation + welcome)
5. **Monitor** (watch for any errors)

---

**Your webhook is configured and ready!** ✅

