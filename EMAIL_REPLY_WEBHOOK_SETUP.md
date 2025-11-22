# Email Reply Webhook Setup Guide

## 🎯 Purpose

Set up a webhook to handle email replies from clients, automatically:
- Update Google Sheets (mark as replied)
- Notify provider
- Stop follow-up sequence
- Log reply message

---

## 📋 Step-by-Step Setup

### Step 1: Create Reply Webhook in Make.com

1. **Open Make.com**
2. **Create New Scenario:**
   - Name: "Email Reply Handler"
   - Description: "Handles client replies to consultation emails"

3. **Add Webhook Trigger:**
   - Click **+** to add module
   - Search: **"Webhooks"**
   - Select: **"Custom webhook"**
   - Click **"Add"**

4. **Configure Webhook:**
   - **Method:** POST
   - **Data structure:** JSON
   - **Copy the webhook URL** (you'll need this)

5. **Save Scenario**

**Your Reply Webhook URL will look like:**
```
https://hook.eu2.make.com/[unique-id]
```

---

### Step 2: Configure Email Reply Forwarding

You need to forward email replies to the webhook. Choose one method:

#### Option A: Make.com Email Module (Easiest)

1. **Add Email Module:**
   - Type: **Email > Watch emails**
   - Configure:
     - Email account: Your consultation email
     - Folder: Inbox
     - Filter: Subject contains "Re:" OR "رد:"

2. **Add Router:**
   - Filter for replies to consultation emails
   - Check subject or sender

3. **Add HTTP Request:**
   - Method: POST
   - URL: Your reply webhook URL
   - Body: Format reply data as JSON

#### Option B: Gmail API

1. **Connect Gmail:**
   - Add Gmail module
   - Authorize access
   - Monitor inbox

2. **Filter Replies:**
   - Subject contains "Re:"
   - From: matches consultation email addresses
   - In-Reply-To: matches consultation email IDs

3. **Forward to Webhook:**
   - Format reply data
   - Send to webhook URL

#### Option C: Email Service Integration

1. **Use Email Service:**
   - Gmail API
   - Outlook API
   - IMAP connection

2. **Parse Replies:**
   - Extract reply message
   - Get original email address
   - Format payload

3. **Send to Webhook:**
   - POST to webhook URL
   - Include reply data

---

### Step 3: Set Up Make.com Reply Scenario

#### Module 1: Webhook Trigger

**Settings:**
- **Type:** Webhooks > Custom webhook
- **Method:** POST

**Expected Payload:**
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

#### Module 2: Google Sheets - Search Row

**Purpose:** Find the original submission

**Settings:**
- **Spreadsheet:** Smartpro Consultation Submissions
- **Sheet:** Sheet1

**Filter:**
- **Column:** email (Column D)
- **Condition:** equals
- **Value:** `{{1.reply_from}}`

**Output:** Returns the matching row

#### Module 3: Google Sheets - Update Row

**Purpose:** Mark as replied and log message

**Settings:**
- **Spreadsheet:** Smartpro Consultation Submissions
- **Sheet:** Sheet1

**Filter:**
- **Column:** email (Column D)
- **Condition:** equals
- **Value:** `{{1.reply_from}}`

**Updates:**
```
AC (client_replied): TRUE
AD (client_replied_at): {{1.reply_timestamp}}
AH (notes): {{2.notes}} + "\n\n--- Reply ---\n" + {{1.message}}
```

#### Module 4: Router (Optional - by Language)

**Routes:**
- Route 1: `{{1.language}}` equals `ar`
- Route 2: `{{1.language}}` equals `en`

#### Module 5: Provider Notification

**Settings:**
- **Type:** Email > Send an email
- **To:** Provider email address
- **Subject:** 
  - Arabic: `رد من العميل - {{1.reply_from}}`
  - English: `Client Reply - {{1.reply_from}}`

**Body Template:**
```
A client has replied to their consultation request.

Client: {{2.client_name}}
Email: {{1.reply_from}}
Original Service: {{2.service_interested_translated}}

Reply Message:
{{1.message}}

---
Original Submission:
Business: {{2.business_name}}
Service: {{2.service_interested_translated}}
Submitted: {{2.submitted_at}}
```

---

### Step 4: Update Follow-Up Automation

**Critical:** Stop follow-ups when client replies!

#### Update Follow-Up Scenario

**Add Filter to Google Sheets - Search Rows:**

**Current Filters:**
1. `submitted_at` < NOW() - 24 hours
2. `welcome_sent` = TRUE
3. `follow_up_1_sent` = FALSE

**ADD THIS FILTER:**
4. `client_replied` = FALSE ← **CRITICAL**

**Result:** Follow-ups only send to clients who haven't replied.

---

## 📊 Complete Reply Flow

```
Client Replies to Email
    ↓
Email Service (Gmail/Make.com/etc.)
    ↓
Reply Webhook (Make.com)
    ↓
Make.com Reply Scenario
    ├─→ Google Sheets: Search Row (by email)
    ├─→ Google Sheets: Update Row (mark as replied)
    ├─→ Provider Notification
    └─→ (Optional) Auto-Reply to Client
```

---

## 🔧 Email Reply Payload Format

### Recommended Format

```json
{
  "form_type": "reply",
  "reply_from": "john@example.com",
  "original_email": "john@example.com",
  "message": "Thank you! I would like to schedule a call...",
  "reply_timestamp": "2025-01-22T14:30:00.000Z",
  "subject": "Re: Thank You for Your Consultation Request",
  "language": "en",
  "thread_id": "thread_abc123"
}
```

### Minimal Format (Required Fields)

```json
{
  "form_type": "reply",
  "reply_from": "john@example.com",
  "message": "Thank you!",
  "reply_timestamp": "2025-01-22T14:30:00.000Z"
}
```

---

## 🧪 Testing

### Test 1: Reply Webhook

**Using cURL:**
```bash
curl -X POST [YOUR_REPLY_WEBHOOK_URL] \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "reply",
    "reply_from": "test@example.com",
    "message": "Test reply message",
    "reply_timestamp": "2025-01-22T14:30:00.000Z"
  }'
```

**Expected Result:**
- Webhook receives data
- Google Sheets row found (if email exists)
- Row updated (client_replied = TRUE)
- Provider notified

### Test 2: Complete Flow

1. **Submit form** (creates row in Google Sheets)
2. **Reply to email** (triggers reply webhook)
3. **Check Google Sheets:**
   - ✅ `client_replied` = TRUE
   - ✅ `client_replied_at` = timestamp
   - ✅ `notes` includes reply message
4. **Verify follow-up stopped:**
   - ✅ No follow-up sent (client_replied = TRUE)

---

## ✅ Implementation Checklist

### Reply Webhook Setup
- [ ] Create Make.com scenario for replies
- [ ] Get reply webhook URL
- [ ] Configure email reply forwarding
- [ ] Set up Google Sheets search module
- [ ] Set up Google Sheets update module
- [ ] Configure provider notification
- [ ] Test with sample reply

### Follow-Up Automation Update
- [ ] Add `client_replied = FALSE` filter
- [ ] Test follow-up sequence
- [ ] Verify it stops when client replies

### Integration
- [ ] Connect email service to webhook
- [ ] Test complete flow
- [ ] Monitor for errors
- [ ] Verify Google Sheets updates

---

## 🚨 Important Notes

### Email Reply Detection

**Methods to identify replies:**
1. **Subject Line:** Contains "Re:" or "رد:"
2. **In-Reply-To Header:** Matches original email ID
3. **Thread ID:** Matches email thread
4. **Email Address:** Matches original submission email

### Stop Follow-Up Sequence

**Critical:** Always check `client_replied` before sending follow-ups:
```
Filter: client_replied = FALSE
```

This prevents annoying clients who already replied.

### Reply Message Formatting

**In Google Sheets Notes:**
```
[Original notes]

--- Reply ---
[Reply message]
[Reply timestamp]
```

---

## 📚 Next Steps

1. **Create Reply Webhook** - Get the webhook URL
2. **Set Up Email Forwarding** - Choose method (Make.com Email, Gmail API, etc.)
3. **Configure Make.com Scenario** - Set up all modules
4. **Update Follow-Up Automation** - Add reply check
5. **Test Complete Flow** - Submit form, reply, verify updates

---

**Please share your Reply Webhook URL once created, and I'll help you complete the integration!** 📧

