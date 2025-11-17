# Make.com Follow-Up Automation - Implementation Guide

**Date:** 2025-01-17  
**Purpose:** Automate follow-up emails and response tracking  
**Status:** Ready for Implementation

---

## 🎯 Overview

This guide will help you implement automated follow-up emails and response tracking in your Make.com scenario. This will reduce manual work and ensure no leads fall through the cracks.

---

## 📋 Prerequisites

- Make.com account with active scenario
- Google Sheets connection configured
- Resend email connection configured
- Current scenario working (webhook → sheets → email)

---

## 🔄 Complete Automation Flow

```
1. Initial Email Sent (Existing)
   ↓
2. Wait 3 Days
   ↓
3. Check: Did client reply or schedule call?
   ├─ YES → Stop follow-ups, update status
   └─ NO → Send Follow-up 1
       ↓
4. Wait 4 More Days (Total: 7 days)
   ↓
5. Check: Did client reply or schedule call?
   ├─ YES → Stop follow-ups, update status
   └─ NO → Send Follow-up 2
       ↓
6. Wait 7 More Days (Total: 14 days)
   ↓
7. Check: Did client reply or schedule call?
   ├─ YES → Stop follow-ups, update status
   └─ NO → Send Follow-up 3, mark as "Cold Lead"
```

---

## 📊 Google Sheets Setup

### Step 1: Add New Columns

Add these columns to your Google Sheets (after Column H):

| Column | Name | Type | Purpose |
|--------|------|------|---------|
| I | Response Status | Dropdown | "No Response", "Replied", "Call Scheduled", "Converted" |
| J | Response Date | Date | When client replied |
| K | Follow-up Count | Number | Number of follow-ups sent (0, 1, 2, 3) |
| L | Last Follow-up Date | Date | Date of last follow-up sent |
| M | Call Scheduled Date | Date | When call is booked |
| N | Lead Score | Number | Calculated score (optional) |

### Step 2: Set Default Values

- **Column I (Response Status):** Default = "No Response"
- **Column K (Follow-up Count):** Default = 0
- **Column L (Last Follow-up Date):** Leave empty initially

---

## 🔧 Make.com Implementation

### Part 1: Update Existing Email Modules

#### Update Module 5, 11, 14, 17 (Resend Email Modules)

**Current:** Just sends email

**Add After Email Sent:**
1. **Google Sheets - Update Row** (New Module)
   - **Spreadsheet:** Your leads spreadsheet
   - **Sheet:** Your sheet name
   - **Row:** Use filter to find row by email `{{1.email}}`
   - **Values to Update:**
     ```
     {
       "I": "No Response",  // Response Status
       "K": 0,              // Follow-up Count
       "L": ""              // Last Follow-up Date (empty)
     }
     ```

---

### Part 2: Create Follow-Up Automation

#### Module  Follow-up 1 (3 Days)

**Type:** Schedule

**Configuration:**
- **Schedule Type:** After a specific date/time
- **Date/Time:** `{{addDays(1.timestamp; 3)}}` (3 days after form submission)
- **Time Zone:** Your timezone

**Note:** This will trigger 3 days after the initial email was sent.

---

#### Module 20: Check Response Status (Before Follow-up 1)

**Type:** Google Sheets - Search Rows

**Configuration:**
- **Spreadsheet:** Your leads spreadsheet
- **Sheet:** Your sheet name
- **Search Criteria:**
  - **Email:** `{{1.email}}` (from original webhook)
  - **Response Status:** "Replied" OR "Call Scheduled" OR "Converted"

**Filter:**
```
IF Response Status ≠ "No Response"
THEN Stop execution (client already responded)
```

---

#### Module 21: Send Follow-up 1

**Type:** Resend - Send Email

**Trigger:** Only if Module 20 found NO response (client still "No Response")

**Configuration:**
- **From:** `Smartpro Business Hub <noreply@portal.thesmartpro.io>`
- **Reply-To:** `info@thesmartpro.io`
- **To:** `{{1.email}}`
- **Subject:** `Re: Welcome to Smartpro – {{1.service_interested}}`

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0d3c61; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #ffffff; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0d3c61; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { background-color: #f0f2f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Smartpro Business Hub & Services</h1>
    </div>
    <div class="content">
      <p>Dear {{1.client_name}},</p>
      
      <p>I wanted to follow up on my previous email about {{1.service_interested}} for {{1.business_name}}.</p>
      
      <p>I understand you might be busy, but I wanted to make sure you received my message and answer any questions you might have.</p>
      
      <p>Would you like to:</p>
      <ul>
        <li>Schedule a quick 15-minute call to discuss your needs?</li>
        <li>Reply with any questions you have?</li>
        <li>Let me know if now isn't the right time?</li>
      </ul>
      
      <p>Looking forward to hearing from you!</p>
      
      <a href="https://thesmartpro.io/book" class="button">Schedule a Call</a>
      
      <p>Best regards,<br>Smartpro Business Hub & Services</p>
    </div>
    <div class="footer">
      <p>www.thesmartpro.io | support@portal.thesmartpro.io</p>
    </div>
  </div>
</body>
</html>
```

---

#### Module 22: Update Google Sheets After Follow-up 1

**Type:** Google Sheets - Update Row

**Configuration:**
- **Spreadsheet:** Your leads spreadsheet
- **Sheet:** Your sheet name
- **Row:** Find by email `{{1.email}}`
- **Values to Update:**
  ```
  {
    "K": 1,                    // Follow-up Count = 1
    "L": "{{now}}",           // Last Follow-up Date = today
    "H": "[Follow-up 1 email preview]"  // Update preview
  }
  ```

---

#### Module 23: Schedule Follow-up 2 (7 Days Total)

**Type:** Schedule

**Configuration:**
- **Date/Time:** `{{addDays(1.timestamp; 7)}}` (7 days after form submission)

---

#### Module 24: Check Response Status (Before Follow-up 2)

**Type:** Google Sheets - Search Rows

**Same as Module 20** - Check if client responded

---

#### Module 25: Send Follow-up 2

**Type:** Resend - Send Email

**Subject:** `Still interested in {{1.service_interested}}?`

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0d3c61; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #ffffff; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0d3c61; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { background-color: #f0f2f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Smartpro Business Hub & Services</h1>
    </div>
    <div class="content">
      <p>Dear {{1.client_name}},</p>
      
      <p>I wanted to check in one more time about {{1.service_interested}} for {{1.business_name}}.</p>
      
      <p>I know you're busy, but I wanted to make sure we don't miss the opportunity to help you.</p>
      
      <p>We've helped many businesses like yours with {{1.service_interested}}, and I'd love to show you how we can help {{1.business_name}} too.</p>
      
      <p>Would you be available for a quick call this week? I can work around your schedule.</p>
      
      <a href="https://thesmartpro.io/book" class="button">Schedule a Call</a>
      
      <p>Best regards,<br>Smartpro Business Hub & Services</p>
    </div>
    <div class="footer">
      <p>www.thesmartpro.io | support@portal.thesmartpro.io</p>
    </div>
  </div>
</body>
</html>
```

---

#### Module 26: Update Google Sheets After Follow-up 2

**Type:** Google Sheets - Update Row

**Values:**
```
{
  "K": 2,                    // Follow-up Count = 2
  "L": "{{now}}",           // Last Follow-up Date = today
  "H": "[Follow-up 2 email preview]"
}
```

---

#### Module 27: Schedule Follow-up 3 (14 Days Total)

**Type:** Schedule

**Configuration:**
- **Date/Time:** `{{addDays(1.timestamp; 14)}}` (14 days after form submission)

---

#### Module 28: Check Response Status (Before Follow-up 3)

**Type:** Google Sheets - Search Rows

**Same as Module 20** - Check if client responded

---

#### Module 29: Send Follow-up 3 (Final)

**Type:** Resend - Send Email

**Subject:** `Last chance - {{1.service_interested}} for {{1.business_name}}`

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0d3c61; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #ffffff; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0d3c61; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { background-color: #f0f2f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Smartpro Business Hub & Services</h1>
    </div>
    <div class="content">
      <p>Dear {{1.client_name}},</p>
      
      <p>This will be my last email about {{1.service_interested}} for {{1.business_name}}.</p>
      
      <p>I understand if the timing isn't right, but I wanted to give you one final opportunity to connect.</p>
      
      <p>If you're still interested, please reply or schedule a call. If not, no worries - I'll remove you from our follow-up list.</p>
      
      <a href="https://thesmartpro.io/book" class="button">Schedule a Call</a>
      
      <p>Thank you for considering Smartpro!</p>
      
      <p>Best regards,<br>Smartpro Business Hub & Services</p>
    </div>
    <div class="footer">
      <p>www.thesmartpro.io | support@portal.thesmartpro.io</p>
    </div>
  </div>
</body>
</html>
```

---

#### Module 30: Update Google Sheets After Follow-up 3

**Type:** Google Sheets - Update Row

**Values:**
```
{
  "K": 3,                    // Follow-up Count = 3
  "L": "{{now}}",           // Last Follow-up Date = today
  "I": "Cold Lead",         // Response Status = Cold Lead
  "H": "[Follow-up 3 email preview]"
}
```

---

## 📧 Email Reply Tracking Setup

### Option 1: Gmail Integration (Recommended)

#### Module 31: Gmail - Watch Emails

**Type:** Gmail - Watch Emails

**Configuration:**
- **Mailbox:** `info@thesmartpro.io`
- **Label:** "Replies" (create label in Gmail)
- **Trigger:** New email received

**Note:** Requires Gmail API setup and OAuth authentication

---

#### Module 32: Filter Replies

**Type:** Filter

**Configuration:**
- **Condition:** Email subject contains "Re:" OR "Fwd:" OR sender email matches Google Sheets

**Purpose:** Only process actual client replies, not spam

---

#### Module 33: Match Email to Lead

**Type:** Google Sheets - Search Rows

**Configuration:**
- **Search:** Find row where Column C (Email) = `{{31.from}}` (sender email)
- **Filter:** Response Status = "No Response"

---

#### Module 34: Update Response Status

**Type:** Google Sheets - Update Row

**Values:**
```
{
  "I": "Replied",           // Response Status
  "J": "{{31.date}}",       // Response Date
  "H": "{{31.body}}"        // Email preview (optional)
}
```

---

#### Module 35: Stop Follow-ups

**Type:** Stop Scenario

**Purpose:** Stop all scheduled follow-ups for this lead

**Note:** Make.com doesn't have a direct "stop scheduled" function, so you'll need to:
- Add a filter in each follow-up module to check Response Status
- If Status ≠ "No Response", skip sending follow-up

---

### Option 2: Manual Update (Simpler)

If Gmail integration is complex, you can:

1. **Create a simple webhook endpoint** for manual updates
2. **Team member clicks button** or sends update
3. **Updates Google Sheets** automatically
4. **Follow-ups check status** before sending

---

## 🔄 Updated Module Flow

### Complete Scenario Structure

```
Module 1: Webhook (Existing)
  ↓
Module 2: Google Sheets - Add Row (Existing)
  ↓
Module 8: Router (Existing)
  ├─→ Module 3/10/13/16: OpenAI (Existing)
  ├─→ Module 5/11/14/17: Resend Email (Existing)
  └─→ Module 7/12/15/18: Google Sheets Update (Existing)
      ↓
Module 19: Schedule Follow-up 1 (3 days)
  ↓
Module 20: Check Response Status
  ├─→ If Replied → Stop
  └─→ If No Response → Continue
      ↓
Module 21: Send Follow-up 1
  ↓
Module 22: Update Google Sheets
  ↓
Module 23: Schedule Follow-up 2 (7 days)
  ↓
Module 24: Check Response Status
  ├─→ If Replied → Stop
  └─→ If No Response → Continue
      ↓
Module 25: Send Follow-up 2
  ↓
Module 26: Update Google Sheets
  ↓
Module 27: Schedule Follow-up 3 (14 days)
  ↓
Module 28: Check Response Status
  ├─→ If Replied → Stop
  └─→ If No Response → Continue
      ↓
Module 29: Send Follow-up 3
  ↓
Module 30: Update Google Sheets (Mark as Cold Lead)
```

---

## 🛠️ Implementation Steps

### Step 1: Update Google Sheets (15 minutes)

1. Open your Google Sheets
2. Add columns I, J, K, L, M, N
3. Set column I default to "No Response"
4. Set column K default to 0

---

### Step 2: Update Existing Email Modules (30 minutes)

1. After each Resend module (5, 11, 14, 17), add:
   - Google Sheets - Update Row
   - Set Response Status = "No Response"
   - Set Follow-up Count = 0

---

### Step 3: Create Follow-up 1 (1 hour)

1. Add Schedule module (3 days)
2. Add Google Sheets search (check response)
3. Add Filter (only if No Response)
4. Add Resend email (Follow-up 1)
5. Add Google Sheets update

---

### Step 4: Create Follow-up 2 (1 hour)

1. Add Schedule module (7 days)
2. Add Google Sheets search
3. Add Filter
4. Add Resend email (Follow-up 2)
5. Add Google Sheets update

---

### Step 5: Create Follow-up 3 (1 hour)

1. Add Schedule module (14 days)
2. Add Google Sheets search
3. Add Filter
4. Add Resend email (Follow-up 3)
5. Add Google Sheets update (mark as Cold Lead)

---

### Step 6: Test (30 minutes)

1. Submit test form
2. Wait for initial email
3. Verify Google Sheets updated
4. Test follow-up triggers (you can reduce delay for testing)
5. Verify follow-ups stop if status changes

---

## ⚠️ Important Notes

### 1. Schedule Modules Limitation

Make.com Schedule modules work best when:
- Scenario is active
- You have enough operations
- Time zone is set correctly

**Alternative:** Use webhooks with delays or external scheduler

---

### 2. Response Status Check

**Critical:** Always check Response Status before sending follow-up

**Filter Logic:**
```
IF Response Status = "Replied" OR "Call Scheduled" OR "Converted"
THEN Skip follow-up
ELSE Send follow-up
```

---

### 3. Email Unsubscribe

Consider adding unsubscribe link in follow-up emails:
```html
<p><a href="https://thesmartpro.io/unsubscribe?email={{1.email}}">Unsubscribe from follow-ups</a></p>
```

---

### 4. Rate Limiting

Make.com has operation limits. Follow-ups count as operations:
- Free plan: 1,000 operations/month
- Core plan: 10,000 operations/month
- Pro plan: 40,000 operations/month

**Calculate:** 
- 1 form submission = 1 operation (initial email)
- 3 follow-ups = 3 operations
- Total per lead = 4 operations

---

## 📊 Testing Checklist

- [ ] Initial email sends correctly
- [ ] Google Sheets updates with "No Response"
- [ ] Follow-up 1 sends after 3 days
- [ ] Follow-up 1 updates Google Sheets
- [ ] If client replies, follow-ups stop
- [ ] Follow-up 2 sends after 7 days
- [ ] Follow-up 3 sends after 14 days
- [ ] Follow-up 3 marks as "Cold Lead"
- [ ] Response tracking works
- [ ] No duplicate emails sent

---

## 🚀 Quick Start (Simplified Version)

If full automation is too complex, start with:

### Minimal Setup (2 hours)

1. **Add Response Status column** to Google Sheets
2. **Create 1 follow-up email** (7 days)
3. **Manual trigger:** Team clicks button to send follow-up
4. **Manual update:** Team updates Response Status when client replies

This gives you 80% of the benefit with 20% of the work!

---

## 📞 Support

If you need help implementing:
1. Check Make.com documentation
2. Test each module individually
3. Use Make.com's error logs
4. Start with minimal setup, then expand

---

**Last Updated:** 2025-01-17  
**Estimated Implementation Time:** 4-6 hours  
**Complexity:** Medium  
**Impact:** High - Reduces lost leads significantly

