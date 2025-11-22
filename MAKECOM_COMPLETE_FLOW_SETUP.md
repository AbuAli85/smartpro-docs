# Make.com Complete Flow Setup Guide

## 🎯 Complete Automation Flow

This guide shows the complete flow from webhook to Google Sheets to emails.

---

## 📋 Module Order & Configuration

### Module 1: Webhook Trigger ⭐ (ADD THIS FIRST)

**Type:** Webhooks > Custom webhook

**Settings:**
- **Method:** POST
- **Data structure:** JSON
- **Webhook URL:** Copy this URL (you'll use it in your backend)

**Expected Payload:**
```json
{
  "request_id": "req_1234567890",
  "timestamp": "2025-01-22T10:00:00.000Z",
  "client_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "business_name": "Example Business",
  "business_type": "Corporation",
  "service_interested": "Company Formation",
  "service_interested_translated": "تأسيس الشركات",
  "services_summary": "Company Formation, Accounting",
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

**Output:** All fields available as `{{1.*}}`

---

### Module 2: Google Sheets - Add a Row

**Type:** Google Sheets > Add a row

**Settings:**
- **Spreadsheet:** Smartpro Consultation Submissions
- **Sheet:** Sheet1
- **Table contains headers:** Yes

**Values Mapping:**
```
0 (A - submission_id): {{1.request_id}}
1 (B - submitted_at): {{1.timestamp}}
2 (C - client_name): {{1.client_name}}
3 (D - email): {{1.email}}
4 (E - phone): {{1.phone}}
5 (F - business_name): {{1.business_name}}
6 (G - business_type): {{1.business_type}}
7 (H - service_interested): {{1.service_interested}}
8 (I - service_interested_translated): {{1.service_interested_translated}}
9 (J - services_summary): {{1.services_summary}}
10 (K - budget): {{1.budget}}
11 (L - timeline): {{1.timeline}}
12 (M - preferred_contact): {{1.preferred_contact}}
13 (N - preferred_time): {{1.preferred_time}}
14 (O - location): {{1.location}}
15 (P - primary_message): {{1.primary_message}}
16 (Q - language): {{1.language}}
17 (R - source): {{1.source}}
18 (S - timestamp): {{1.timestamp}}
19 (T - confirmation_sent): TRUE
20 (U - welcome_sent): FALSE
21 (V - welcome_sent_at): (empty)
22 (W - follow_up_1_sent): FALSE
23 (X - follow_up_1_sent_at): (empty)
24 (Y - follow_up_2_sent): FALSE
25 (Z - follow_up_2_sent_at): (empty)
26 (AA - follow_up_3_sent): FALSE
27 (AB - follow_up_3_sent_at): (empty)
28 (AC - client_replied): FALSE
29 (AD - client_replied_at): (empty)
30 (AE - consultation_scheduled): FALSE
31 (AF - consultation_scheduled_at): (empty)
32 (AG - provider_notified): TRUE
33 (AH - notes): {{1.notes}}
```

---

### Module 3: Router (by Language)

**Type:** Flow control > Router

**Routes:**
- **Route 1:** `{{1.language}}` equals `ar` (Arabic)
- **Route 2:** `{{1.language}}` equals `en` (English)
- **Route 3:** Default (fallback to English)

---

### Module 4: Confirmation Email

**Type:** Email > Send an email

**Arabic Route:**
- **To:** `{{1.email}}`
- **Subject:** `شكراً لتواصلك معنا - طلب الاستشارة`
- **HTML:** Use Arabic confirmation template
- **Send:** Immediately

**English Route:**
- **To:** `{{1.email}}`
- **Subject:** `Thank You for Your Consultation Request`
- **HTML:** Use English confirmation template
- **Send:** Immediately

---

### Module 5: Sleep (Delay)

**Type:** Tools > Sleep

**Settings:**
- **Duration:** 5 seconds

**Purpose:** Wait before sending welcome email

---

### Module 6: OpenAI (ChatGPT)

**Type:** OpenAI > Create a chat completion

**Settings:**
- **Model:** gpt-3.5-turbo
- **Temperature:** 0.7
- **Max Tokens:** 500

**System Message:**
```
You are an email assistant for Smartpro Business Hub & Services.

CRITICAL: Check {{1.language}} first.
- If "ar": Write 100% in Arabic
- If "en": Write 100% in English

Write a personalized welcome email body (120-200 words):
1. Thank them for their interest in {{1.service_interested_translated}}
2. Explain 2-3 specific ways we can help
3. Ask 1-2 relevant questions about their needs
4. Invite them to reply or schedule a call

Tone: Professional, friendly, helpful
NO greeting, NO signature (template handles it)
```

**User Message:**
```
Client Name: {{1.client_name}}
Service: {{1.service_interested_translated}}
Business: {{1.business_name}}
Language: {{1.language}}
Notes: {{1.notes}}

Generate welcome email body in {{1.language}} language:
```

**Output:** `{{6.choices[0].message.content}}`

---

### Module 7: Welcome Email

**Type:** Email > Send an email

**Arabic Route:**
- **To:** `{{1.email}}`
- **Subject:** `مرحباً بك في سمارت برو - {{1.service_interested_translated}}`
- **HTML:** Welcome email template (Arabic)
- **Body:** `{{6.choices[0].message.content}}`

**English Route:**
- **To:** `{{1.email}}`
- **Subject:** `Welcome to Smartpro - {{1.service_interested}}`
- **HTML:** Welcome email template (English)
- **Body:** `{{6.choices[0].message.content}}`

---

### Module 8: Google Sheets - Update Row (Welcome Sent)

**Type:** Google Sheets > Update a row

**Settings:**
- **Spreadsheet:** Smartpro Consultation Submissions
- **Sheet:** Sheet1

**Filter:**
- **Column:** email (Column D)
- **Condition:** equals
- **Value:** `{{1.email}}`

**Update:**
```
U (welcome_sent): TRUE
V (welcome_sent_at): {{now}}
```

---

### Module 9: Provider Notification

**Type:** Email > Send an email

**Settings:**
- **To:** Provider email address
- **Subject:** `New Consultation Request - {{1.service_interested}}`
- **HTML:** Provider notification template
- **Send:** In parallel (non-blocking)

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│ Make.com Complete Automation Flow                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 1. Webhook Trigger                                      │
│    ↓                                                     │
│ 2. Google Sheets: Add Row (Save Submission)            │
│    ↓                                                     │
│ 3. Router (by language)                                 │
│    ├─→ Route 1: Arabic                                  │
│    │   ├─→ 4. Confirmation Email (Arabic) ← INSTANT     │
│    │   ├─→ 5. Sleep (5 seconds)                         │
│    │   ├─→ 6. ChatGPT (Arabic Welcome)                  │
│    │   ├─→ 7. Welcome Email (Arabic)                     │
│    │   ├─→ 8. Google Sheets: Update (Welcome Sent)      │
│    │   └─→ 9. Provider Notification                      │
│    │                                                      │
│    └─→ Route 2: English                                  │
│        ├─→ 4. Confirmation Email (English) ← INSTANT     │
│        ├─→ 5. Sleep (5 seconds)                           │
│        ├─→ 6. ChatGPT (English Welcome)                  │
│        ├─→ 7. Welcome Email (English)                    │
│        ├─→ 8. Google Sheets: Update (Welcome Sent)      │
│        └─→ 9. Provider Notification                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Procedure

### Test 1: Complete Flow (Arabic)

1. Submit form with `language: "ar"`
2. Check:
   - ✅ Webhook receives data
   - ✅ Google Sheets row added
   - ✅ Confirmation email (Arabic, instant)
   - ✅ Welcome email (Arabic, 5-10 seconds)
   - ✅ Google Sheets updated (welcome_sent = TRUE)
   - ✅ Provider notified

### Test 2: Complete Flow (English)

1. Submit form with `language: "en"`
2. Check:
   - ✅ Webhook receives data
   - ✅ Google Sheets row added
   - ✅ Confirmation email (English, instant)
   - ✅ Welcome email (English, 5-10 seconds)
   - ✅ Google Sheets updated (welcome_sent = TRUE)
   - ✅ Provider notified

### Test 3: Google Sheets Verification

1. Open Google Sheets
2. Check new row added
3. Verify all fields populated correctly
4. Verify status fields (confirmation_sent, welcome_sent, etc.)

---

## ✅ Setup Checklist

### Phase 1: Basic Setup
- [ ] Add Webhook Trigger module
- [ ] Add Google Sheets - Add Row module
- [ ] Configure all field mappings
- [ ] Test webhook → Google Sheets

### Phase 2: Email Automation
- [ ] Add Router module (by language)
- [ ] Add Confirmation Email modules
- [ ] Add Sleep module
- [ ] Add ChatGPT module
- [ ] Add Welcome Email modules
- [ ] Test email flow

### Phase 3: Status Tracking
- [ ] Add Google Sheets - Update Row module
- [ ] Configure update after welcome email
- [ ] Test status updates

### Phase 4: Provider Notification
- [ ] Add Provider Notification module
- [ ] Configure email template
- [ ] Test notification

---

## 🚨 Common Errors & Fixes

### Error 1: "Module references non-existing module '1'"
**Fix:** Add Webhook Trigger module before Google Sheets

### Error 2: "Field not found"
**Fix:** 
1. Run webhook module first
2. Then configure other modules
3. Fields will appear in dropdown

### Error 3: "Google Sheets connection failed"
**Fix:**
1. Re-authorize Google connection
2. Check spreadsheet sharing settings
3. Verify spreadsheet ID

### Error 4: "ChatGPT error"
**Fix:**
1. Check OpenAI API key
2. Verify model name
3. Check token limits
4. Add error handler

---

## 📊 Module Reference Numbers

When referencing modules in Make.com, use these numbers:

- `{{1.*}}` - Webhook data
- `{{2.*}}` - Google Sheets output (if needed)
- `{{6.*}}` - ChatGPT output
- `{{now}}` - Current timestamp

---

## 🚀 Quick Start

1. **Add Webhook Module** (Module 1)
2. **Add Google Sheets Module** (Module 2)
3. **Map all fields** (use table in MAKECOM_GOOGLE_SHEETS_FIX.md)
4. **Test with one submission**
5. **Add remaining modules** (Router, Emails, ChatGPT)
6. **Test complete flow**

---

**Your complete automation flow is ready! Follow the module order above.** 🚀

