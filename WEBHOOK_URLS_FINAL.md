# Final Webhook URLs Configuration

## ✅ Confirmed Webhook URLs

### Webhook 1: Form Submission (Smartpro Consultation Form)

**URL:**
```
https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
```

**Purpose:**
- Receives consultation form submissions
- Saves to Google Sheets
- Sends confirmation email
- Sends welcome email (ChatGPT)
- Notifies provider

**Backend Configuration:**
- ✅ `server/lib/webhookClient.ts` - Updated
- ✅ `api/consultation.ts` - Updated

**Status:** ✅ Active and Configured

---

### Webhook 2: Email Reply

**URL:**
```
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```

**Purpose:**
- Receives email replies from clients
- Updates Google Sheets (mark as replied)
- Notifies provider of reply
- Stops follow-up sequence

**Status:** ⚠️ Needs Setup (see EMAIL_REPLY_WEBHOOK_SETUP.md)

---

## 🔧 Backend Configuration

### Environment Variables

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
4. Add both webhook URLs
5. Deploy

---

## 📋 Make.com Scenarios

### Scenario 1: Form Submission

**Webhook URL:** `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`

**Flow:**
```
1. Webhook Trigger (Submission)
   ↓
2. Google Sheets: Add Row
   ↓
3. Router (by language)
   ├─→ Confirmation Email
   ├─→ ChatGPT (Welcome)
   ├─→ Welcome Email
   └─→ Provider Notification
```

---

### Scenario 2: Email Reply

**Webhook URL:** `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`

**Flow:**
```
1. Webhook Trigger (Reply)
   ↓
2. Google Sheets: Search Row (by email)
   ↓
3. Google Sheets: Update Row (mark as replied)
   ↓
4. Provider Notification (Reply Received)
   ↓
5. Stop Follow-Up Sequence
```

---

## ✅ Verification

### Submission Webhook Test

**Using cURL:**
```bash
curl -X POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8 \
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
- ✅ Webhook accepts request (returns "Accepted")
- ✅ Make.com scenario triggers
- ✅ Google Sheets row added
- ✅ Emails sent

---

### Reply Webhook Test

**Using cURL:**
```bash
curl -X POST https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9 \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "reply",
    "reply_from": "test@example.com",
    "message": "Test reply message",
    "reply_timestamp": "2025-01-22T14:30:00.000Z"
  }'
```

**Expected Result:**
- ✅ Webhook accepts request
- ✅ Make.com scenario triggers
- ✅ Google Sheets updated (if email exists)
- ✅ Provider notified

---

## 📊 Complete Integration Flow

### Submission Flow
```
Frontend Form
    ↓
Backend API (/api/consultation)
    ↓
Submission Webhook
https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
    ↓
Make.com Scenario 1
    ├─→ Google Sheets: Add Row
    ├─→ Confirmation Email
    ├─→ Welcome Email
    └─→ Provider Notification
```

### Reply Flow
```
Client Replies to Email
    ↓
Email Service (Gmail/Make.com/etc.)
    ↓
Reply Webhook
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
    ↓
Make.com Scenario 2
    ├─→ Google Sheets: Search Row
    ├─→ Google Sheets: Update (Replied)
    ├─→ Provider Notification
    └─→ Stop Follow-Up Sequence
```

---

## ✅ Configuration Checklist

### Submission Webhook
- [x] Webhook URL confirmed: `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`
- [x] Backend code updated
- [x] Make.com scenario configured
- [x] Google Sheets integration
- [x] Email automation active

### Reply Webhook
- [x] Webhook URL confirmed: `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
- [ ] Make.com scenario created
- [ ] Email reply forwarding configured
- [ ] Google Sheets update module set up
- [ ] Provider notification configured
- [ ] Follow-up automation updated

---

## 🚀 Next Steps

1. **Deploy Backend** - Code updated with correct submission webhook URL
2. **Test Submission Webhook** - Submit test form, verify flow
3. **Set Up Reply Webhook** - Follow `EMAIL_REPLY_WEBHOOK_SETUP.md`
4. **Configure Email Reply Forwarding** - Set up email monitoring
5. **Test Complete Flow** - Test both submission and reply

---

## 📝 Quick Reference

### Submission Webhook
```
URL: https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
Purpose: Form submissions
Status: ✅ Active
```

### Reply Webhook
```
URL: https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
Purpose: Email replies
Status: ⚠️ Needs setup
```

---

**Both webhook URLs are now confirmed! Submission webhook is active, reply webhook needs Make.com scenario setup.** ✅

