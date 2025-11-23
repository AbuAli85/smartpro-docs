# Reply Webhook Explained

## 🔗 Webhook URL

```
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```

**Status:** ✅ Active (Returns "Accepted" when accessed)

---

## 📋 What This Webhook Does

This is the **Reply Webhook** - it's designed to receive **email replies** from clients who respond to consultation confirmation emails.

### Purpose

When a client replies to their consultation confirmation email, this webhook:
1. Receives the reply data
2. Updates Google Sheets (marks `client_replied = TRUE`)
3. Notifies the provider that the client replied
4. Stops the follow-up email sequence (prevents sending follow-ups to clients who already replied)

---

## 🔄 How It Works

```
Client receives consultation email
    ↓
Client clicks "Reply" and sends message
    ↓
Email service (Gmail/Outlook/Make.com) detects reply
    ↓
Email service forwards reply to webhook
    ↓
Reply Webhook receives data
    ↓
Make.com Scenario processes reply:
    ├─→ Google Sheets: Find row by email
    ├─→ Google Sheets: Update row
    │   - client_replied → TRUE
    │   - client_replied_at → timestamp
    │   - notes → Append reply message
    ├─→ Provider Notification (Reply received)
    └─→ Stop Follow-Up Sequence
```

---

## 📨 Expected Payload Format

When an email service forwards a reply, it should send data like this:

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

## ⚙️ Current Setup Status

### ✅ What's Ready
- Webhook URL is active and receiving requests
- Webhook returns "Accepted" when accessed

### ⚠️ What Needs Setup

1. **Make.com Scenario** - Needs to be created/configured to:
   - Receive webhook data
   - Search Google Sheets for original submission
   - Update Google Sheets row
   - Notify provider

2. **Email Reply Forwarding** - Needs to be configured:
   - Set up email service (Gmail/Outlook/Make.com) to detect replies
   - Forward replies to this webhook URL
   - Parse email content and format as JSON payload

3. **Google Sheets Update** - Needs to be configured:
   - Search row by email address
   - Update `client_replied` column (AC) to `TRUE`
   - Update `client_replied_at` column (AD) with timestamp
   - Append reply message to `notes` column (AH)

---

## 🔧 How to Set It Up

### Step 1: Create Make.com Scenario for Replies

1. **Create New Scenario:**
   - Name: "Email Reply Handler"
   - Trigger: Webhooks > Custom webhook

2. **Configure Webhook:**
   - Use URL: `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
   - Method: POST
   - Expected payload: JSON with reply data

### Step 2: Configure Email Reply Forwarding

**Option A: Make.com Email Module (Recommended)**
- Add Gmail/Outlook module to Make.com
- Monitor inbox for replies
- Filter for replies to consultation emails
- Parse email content
- Send to webhook

**Option B: Email Service Integration**
- Use Gmail API or Outlook API
- Set up webhook to receive replies
- Forward to Make.com webhook

**Option C: Email Parser Service**
- Use services like Zapier Email Parser
- Forward parsed replies to webhook

### Step 3: Set Up Google Sheets Update

**Module: Google Sheets - Search Rows**
- Spreadsheet: Smartpro Consultation Submissions
- Filter: `email` (Column D) equals `{{1.reply_from}}`
- Purpose: Find the original submission

**Module: Google Sheets - Update Row**
- Spreadsheet: Smartpro Consultation Submissions
- Filter: `email` (Column D) equals `{{1.reply_from}}`
- Updates:
  - `AC` (client_replied): `TRUE`
  - `AD` (client_replied_at): `{{1.reply_timestamp}}`
  - `AH` (notes): Append `{{1.message}}`

### Step 4: Update Follow-Up Automation

**Important:** Update your follow-up email scenario to check if client replied:

**Add Filter:**
```
Before sending follow-up:
- Check if client_replied = FALSE
- Only send if client hasn't replied
```

This prevents sending follow-up emails to clients who already replied.

---

## 🧪 Testing the Webhook

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

## 🔗 Related Webhooks

### Submission Webhook (Different Purpose)
```
https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
```
**Purpose:** Receives form submissions from consultation form

### Reply Webhook (This One)
```
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```
**Purpose:** Receives email replies from clients

---

## 📊 Complete Flow

### Submission Flow
```
Form Submission
    ↓
Submission Webhook (z9t0f5eqipopdg368eypl5i9eo7kpbu8)
    ↓
Google Sheets: Add Row
    ↓
Send Confirmation Email
```

### Reply Flow
```
Client Replies to Email
    ↓
Email Service Detects Reply
    ↓
Reply Webhook (rfga1pfnupvuxid3jifrzrpb2n25zch9)
    ↓
Google Sheets: Update Row (Mark as Replied)
    ↓
Notify Provider
    ↓
Stop Follow-Up Sequence
```

---

## ✅ Summary

**Webhook URL:** `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`

**Purpose:** Receive email replies from clients

**Status:** ✅ Active (webhook is ready to receive data)

**Next Steps:**
1. Create Make.com scenario for reply handling
2. Configure email reply forwarding
3. Set up Google Sheets update module
4. Update follow-up automation to check `client_replied` status

**This webhook is ready to use once you configure the email reply forwarding and Make.com scenario!** 🚀

