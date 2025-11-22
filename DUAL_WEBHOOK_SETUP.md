# Dual Webhook Setup Guide

## 🎯 Overview

You have **TWO webhooks** for different purposes:

1. **Submission Webhook** - Receives form submissions
2. **Reply Webhook** - Receives email replies from clients

---

## 📋 Webhook 1: Form Submission

### Purpose
Receives consultation form submissions from your website.

### Webhook URL
```
https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9
```

### Trigger
- When user submits consultation form
- Sent from: `api/consultation.ts` or `server/routes/consultationRoutes.ts`

### Payload Structure
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

### Make.com Scenario Flow
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

### Google Sheets
- **Spreadsheet:** Smartpro Consultation Submissions
- **Action:** Add new row with submission data

---

## 📧 Webhook 2: Email Reply

### Purpose
Receives email replies from clients who respond to consultation emails.

### Webhook URL
```
[Your Reply Webhook URL - Please provide]
```

### Trigger
- When client replies to consultation email
- Sent from: Make.com Email Reply module or email service

### Payload Structure (Expected)
```json
{
  "form_type": "reply",
  "original_submission_id": "req_1234567890",
  "original_email": "john@example.com",
  "reply_from": "john@example.com",
  "reply_to": "info@thesmartpro.io",
  "subject": "Re: Thank You for Your Consultation Request",
  "message": "Thank you! I would like to schedule a call...",
  "reply_timestamp": "2025-01-22T14:30:00.000Z",
  "language": "en",
  "thread_id": "thread_abc123"
}
```

### Make.com Scenario Flow (Reply)
```
1. Webhook Trigger (Reply)
   ↓
2. Google Sheets: Search Row (by email)
   ↓
3. Google Sheets: Update Row
   - Set client_replied = TRUE
   - Set client_replied_at = timestamp
   - Add reply message to notes
   ↓
4. Router (by language)
   ├─→ Provider Notification (Reply Received)
   ├─→ Auto-Reply (Optional)
   └─→ Stop Follow-Up Sequence
```

### Google Sheets Updates
- **Action:** Update existing row
- **Filter:** By `email` field
- **Updates:**
  - `client_replied` → `TRUE`
  - `client_replied_at` → `{{reply_timestamp}}`
  - `notes` → Append reply message

---

## 🔧 Setup Instructions

### Submission Webhook (Already Configured) ✅

**Backend Configuration:**
- ✅ `server/lib/webhookClient.ts` - Updated
- ✅ `api/consultation.ts` - Updated
- ✅ Webhook URL: `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`

**Make.com Scenario:**
- ✅ Webhook trigger configured
- ✅ Google Sheets integration
- ✅ Email automation

---

### Reply Webhook (Needs Setup) ⚠️

#### Step 1: Create Reply Webhook in Make.com

1. **Create New Scenario:**
   - Name: "Email Reply Handler"
   - Trigger: Webhooks > Custom webhook

2. **Get Webhook URL:**
   - Copy the webhook URL
   - Format: `https://hook.eu2.make.com/[unique-id]`

3. **Configure Email Service:**
   - Set up email reply forwarding
   - Forward replies to webhook URL

#### Step 2: Configure Email Reply Forwarding

**Option A: Make.com Email Module (Recommended)**
- Use Make.com's email module to monitor replies
- Forward replies to webhook

**Option B: Email Service Integration**
- Use Gmail/Outlook API
- Forward replies to webhook

**Option C: Email Parser Service**
- Use services like Zapier Email Parser
- Forward parsed replies to webhook

#### Step 3: Update Google Sheets

**Module: Search Rows**
- **Filter:** `email` equals `{{1.reply_from}}`
- **Purpose:** Find original submission

**Module: Update Row**
- **Filter:** `email` equals `{{1.reply_from}}`
- **Updates:**
  ```
  AC (client_replied): TRUE
  AD (client_replied_at): {{1.reply_timestamp}}
  AH (notes): {{1.original_notes}} + "\n\nReply: " + {{1.message}}
  ```

#### Step 4: Stop Follow-Up Sequence

**Module: Google Sheets - Update Row**
- **Filter:** `email` equals `{{1.reply_from}}`
- **Update:**
  ```
  W (follow_up_1_sent): (don't send if replied)
  Y (follow_up_2_sent): (don't send if replied)
  AA (follow_up_3_sent): (don't send if replied)
  ```

---

## 📊 Complete Integration Flow

### Submission Flow
```
Form Submission
    ↓
Backend API
    ↓
Submission Webhook
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
Email Service (Gmail/Outlook/Make.com)
    ↓
Reply Webhook
    ↓
Make.com Scenario 2
    ├─→ Google Sheets: Search Row
    ├─→ Google Sheets: Update (Replied)
    ├─→ Provider Notification (Reply)
    └─→ Stop Follow-Up Sequence
```

---

## 🔄 Follow-Up Automation Update

### Update Follow-Up Scenario

**Add Filter:**
```
Before sending follow-up:
- Check if client_replied = FALSE
- Only send if client hasn't replied
```

**Module: Google Sheets - Search Rows**
```
Filter 1: submitted_at < NOW() - 24 hours
Filter 2: welcome_sent = TRUE
Filter 3: follow_up_1_sent = FALSE
Filter 4: client_replied = FALSE  ← ADD THIS
```

---

## 📋 Google Sheets Column Updates

### Add Reply Tracking Columns (If Needed)

**Current Columns:**
- `AC`: `client_replied` (Boolean)
- `AD`: `client_replied_at` (DateTime)
- `AH`: `notes` (Text - can append replies)

**Optional Additional Columns:**
- `AI`: `reply_count` (Number)
- `AJ`: `last_reply_at` (DateTime)
- `AK`: `reply_message` (Text)

---

## 🧪 Testing

### Test 1: Submission Webhook
1. Submit form
2. Verify webhook receives data
3. Check Google Sheets row added
4. Verify emails sent

### Test 2: Reply Webhook
1. Reply to consultation email
2. Verify reply webhook receives data
3. Check Google Sheets updated:
   - `client_replied` = TRUE
   - `client_replied_at` = timestamp
4. Verify follow-up sequence stopped
5. Verify provider notified

---

## 🔧 Make.com Scenario Configuration

### Scenario 1: Form Submission (Already Set Up) ✅

**Modules:**
1. Webhook Trigger (Submission)
2. Google Sheets: Add Row
3. Router (by language)
4. Confirmation Email
5. ChatGPT
6. Welcome Email
7. Google Sheets: Update (Welcome Sent)
8. Provider Notification

---

### Scenario 2: Email Reply (To Be Created) ⚠️

**Modules:**
1. Webhook Trigger (Reply)
2. Google Sheets: Search Row (by email)
3. Google Sheets: Update Row (Mark as Replied)
4. Router (by language)
5. Provider Notification (Reply Received)
6. Optional: Auto-Reply to Client

**Module 1: Webhook Trigger**
```
Type: Webhooks > Custom webhook
Method: POST
Expected Payload:
{
  "form_type": "reply",
  "original_email": "...",
  "reply_from": "...",
  "message": "...",
  "reply_timestamp": "...",
  "language": "..."
}
```

**Module 2: Google Sheets - Search Row**
```
Spreadsheet: Smartpro Consultation Submissions
Filter: email (Column D) equals {{1.reply_from}}
Purpose: Find original submission
```

**Module 3: Google Sheets - Update Row**
```
Spreadsheet: Smartpro Consultation Submissions
Filter: email (Column D) equals {{1.reply_from}}
Updates:
- AC (client_replied): TRUE
- AD (client_replied_at): {{1.reply_timestamp}}
- AH (notes): Append reply message
```

**Module 4: Provider Notification**
```
Type: Email
To: Provider email
Subject: Client Replied - {{1.original_email}}
Body: Include reply message and original submission details
```

---

## 📝 Email Reply Payload Structure

### Recommended Payload Format

```json
{
  "form_type": "reply",
  "original_submission_id": "req_1234567890",
  "original_email": "john@example.com",
  "reply_from": "john@example.com",
  "reply_to": "info@thesmartpro.io",
  "subject": "Re: Thank You for Your Consultation Request",
  "message": "Thank you! I would like to schedule a call...",
  "reply_timestamp": "2025-01-22T14:30:00.000Z",
  "language": "en",
  "thread_id": "thread_abc123",
  "in_reply_to": "message_id_123"
}
```

### Minimal Payload Format

```json
{
  "form_type": "reply",
  "reply_from": "john@example.com",
  "message": "Thank you! I would like to schedule a call...",
  "reply_timestamp": "2025-01-22T14:30:00.000Z"
}
```

---

## 🔗 Email Reply Integration Options

### Option 1: Make.com Email Module

**Setup:**
1. Add Email module to Make.com
2. Configure to monitor inbox
3. Filter for replies to consultation emails
4. Forward to reply webhook

**Pros:**
- Built into Make.com
- Easy to set up
- Automatic parsing

**Cons:**
- Requires email account access
- May have rate limits

### Option 2: Gmail API

**Setup:**
1. Connect Gmail to Make.com
2. Monitor for replies
3. Parse email content
4. Forward to webhook

**Pros:**
- Reliable
- Good parsing
- Real-time

**Cons:**
- Requires Gmail API setup
- More complex

### Option 3: Email Parser Service

**Setup:**
1. Use service like Zapier Email Parser
2. Forward replies to webhook
3. Parse in Make.com

**Pros:**
- Specialized for parsing
- Good for complex emails

**Cons:**
- Additional service
- May have costs

---

## ✅ Implementation Checklist

### Submission Webhook
- [x] Webhook URL configured
- [x] Backend updated
- [x] Make.com scenario set up
- [x] Google Sheets integration
- [x] Email automation

### Reply Webhook
- [ ] Reply webhook URL obtained
- [ ] Make.com scenario created
- [ ] Email reply forwarding configured
- [ ] Google Sheets update module set up
- [ ] Provider notification configured
- [ ] Follow-up sequence updated (stop if replied)
- [ ] Tested with sample reply

---

## 🚀 Quick Start for Reply Webhook

### Step 1: Get Reply Webhook URL (5 min)
1. Create new Make.com scenario
2. Add Webhook Trigger
3. Copy webhook URL
4. Save scenario

### Step 2: Configure Email Reply Forwarding (10 min)
1. Choose integration method (Make.com Email, Gmail API, etc.)
2. Set up email monitoring
3. Forward replies to webhook URL
4. Test with sample reply

### Step 3: Set Up Make.com Scenario (15 min)
1. Add Google Sheets: Search Row module
2. Add Google Sheets: Update Row module
3. Add Provider Notification module
4. Configure all mappings
5. Test scenario

### Step 4: Update Follow-Up Automation (5 min)
1. Add `client_replied = FALSE` filter
2. Test follow-up sequence
3. Verify it stops when client replies

---

## 📊 Expected Behavior

### When Client Submits Form
1. ✅ Submission webhook triggered
2. ✅ Row added to Google Sheets
3. ✅ Confirmation email sent
4. ✅ Welcome email sent
5. ✅ Provider notified

### When Client Replies
1. ✅ Reply webhook triggered
2. ✅ Google Sheets updated (replied = TRUE)
3. ✅ Provider notified of reply
4. ✅ Follow-up sequence stopped
5. ✅ Reply message logged

---

## 🚨 Important Notes

### Email Reply Detection

**Methods:**
1. **Subject Line:** Check for "Re:" prefix
2. **In-Reply-To Header:** Check email headers
3. **Thread ID:** Use email thread tracking
4. **Email Address:** Match reply_from to original email

### Stop Follow-Up Sequence

**Critical:** Update follow-up automation to check `client_replied` before sending:
```
Filter: client_replied = FALSE
```

This prevents sending follow-ups to clients who already replied.

---

## 📚 Next Steps

1. **Provide Reply Webhook URL** - Share the webhook URL for email replies
2. **Set Up Email Reply Forwarding** - Configure how replies are forwarded
3. **Create Reply Scenario** - Set up Make.com scenario for replies
4. **Update Follow-Up Automation** - Add reply check to follow-ups
5. **Test Complete Flow** - Test both submission and reply

---

**Please provide the Reply Webhook URL so I can complete the configuration!** 📧

