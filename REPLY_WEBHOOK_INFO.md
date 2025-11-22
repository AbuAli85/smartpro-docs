# Reply Webhook Information

## 🔗 Webhook URL

```
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```

**Status:** ✅ Active (Returns "Accepted" when accessed)

---

## 📋 Purpose

This webhook is designed to receive **email replies** from clients who respond to consultation confirmation emails.

### Use Case
When a client replies to their confirmation email, this webhook should:
1. Receive the reply data
2. Update Google Sheets (mark `client_replied = TRUE`)
3. Notify the provider
4. Trigger follow-up actions

---

## 🔄 How It Works

```
Client replies to email
    ↓
Email service (Resend/Gmail) forwards reply
    ↓
Reply Webhook (this URL)
    ↓
Make.com Scenario
    ↓
┌─────────────────────────────────────┐
│ 1. Parse reply data                 │
│ 2. Google Sheets: Update row       │
│    - client_replied → TRUE          │
│    - client_replied_at → timestamp  │
│ 3. Notify provider                   │
│ 4. Trigger follow-up actions        │
└─────────────────────────────────────┘
```

---

## 📨 Expected Payload Format

```json
{
  "form_type": "reply",
  "reply_from": "client@example.com",
  "original_email": "client@example.com",
  "message": "Thank you! I would like to schedule a call...",
  "reply_timestamp": "2025-01-22T14:30:00.000Z",
  "subject": "Re: Thank You for Your Consultation Request",
  "language": "en",
  "submission_id": "req_1234567890"
}
```

---

## 🧪 Testing

### Quick Test (PowerShell)

```powershell
$body = @{
    form_type = "reply"
    reply_from = "test@example.com"
    original_email = "test@example.com"
    message = "This is a test reply"
    reply_timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
    subject = "Re: Test"
    language = "en"
    submission_id = "test_001"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### Expected Response
- Status: 200
- Response: "Accepted"

---

## ⚙️ Setup Status

### Current Status
- ✅ Webhook URL confirmed active
- ⚠️ Make.com scenario needs to be configured
- ⚠️ Email service needs to forward replies

### Required Setup

1. **Email Service Configuration**
   - Set up Resend/Gmail to forward replies
   - Configure reply-to address
   - Set webhook URL for replies

2. **Make.com Scenario**
   - Create new scenario for reply webhook
   - Add webhook trigger module
   - Add Google Sheets update module
   - Add provider notification

3. **Google Sheets Update**
   - Filter by `email` or `submission_id`
   - Update `client_replied` → TRUE
   - Update `client_replied_at` → timestamp
   - Append reply message to `notes`

---

## 📚 Related Documentation

- `EMAIL_REPLY_WEBHOOK_SETUP.md` - Complete setup guide
- `DUAL_WEBHOOK_SETUP.md` - Both webhooks explained
- `WEBHOOK_CONFIGURATION.md` - All webhook URLs

---

## 🔗 Related Webhooks

### Submission Webhook (Active)
```
https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
```
**Purpose:** Receives form submissions

### Reply Webhook (This one)
```
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```
**Purpose:** Receives email replies

---

## ✅ Verification

**Test the webhook:**
1. Run the PowerShell test command above
2. Check Make.com for execution
3. Verify response is "Accepted"

**If you see "Accepted":**
- ✅ Webhook is active and receiving requests
- ⚠️ Make.com scenario may need configuration

---

**This webhook is ready to use once you configure the email reply forwarding!** 🚀

