# Provider Reply Processing Flow - Make.com Scenario Configuration

## 📋 Overview

This document describes the **Provider Reply Processing** scenario in Make.com that handles **PROVIDER email replies** to client requests and updates Google Sheets accordingly.

**Scenario Name:** Provider Reply Processing  
**Zone:** eu2.make.com  
**Webhook URL:** `https://hook.eu2.make.com/42ip7sz3mon9lhdoetjhegohkbggsm72`

**Important:** This flow processes replies **FROM PROVIDERS** who respond to client consultation requests.

---

## 🔄 Flow Architecture

```
Provider Reply Received
    ↓
Module 1: Custom Webhook (Receive Data)
    ↓
Module 2: Google Sheets - Filter Rows (Find Matching Email)
    ↓
Module 3: Google Sheets - Update Row (Mark Provider as Replied)
```

---

## 📦 Module 1: Custom Webhook

**Module Type:** `gateway:CustomWebHook`  
**Webhook URL:** `https://hook.eu2.make.com/42ip7sz3mon9lhdoetjhegohkbggsm72`

### Configuration

- **Webhook Hook:** [Get from Make.com when creating module]
- **Maximum Results:** 1

### Purpose

Receives provider reply data from the email service/webhook trigger.

### Expected Input Data

The webhook expects data with the following structure:
```json
{
  "email": "client@example.com",
  "from": "provider@example.com",
  "message": "This is the provider's reply message",
  "subject": "Re: Consultation Request",
  "body": "This is the provider's reply message",
  "timestamp": "2025-11-23T..."
}
```

### Output Data

- `{{1.email}}` - Client email address (to find the row)
- `{{1.from}}` - Provider email address (who sent the reply)
- `{{1.message}}` - Provider's reply message content
- `{{1.body}}` - Message body
- `{{1.subject}}` - Email subject
- `{{1.timestamp}}` - Timestamp of reply

---

## 📊 Module 2: Google Sheets - Filter Rows

**Module Type:** `google-sheets:filterRows`  
**Version:** 2  
**Connection:** Google (luxsess2001@gmail.com)

### Configuration

- **Search Method:** Drive
- **Spreadsheet ID:** `1NVjl-yG95DLLjyF3HQ6qMBBCBQUQQe3HO_E6-MnVGeU`
- **Spreadsheet Name:** Smartpro Leads
- **Sheet Name:** `leads`
- **Column Range:** `A1:CZ1`
- **Includes Headers:** Yes
- **Limit:** 1
- **Sort Order:** Ascending
- **Value Render Option:** FORMATTED_VALUE
- **Date Time Render Option:** FORMATTED_STRING

### Filter Configuration

**Filter Condition:**
- **Column:** C (Email column - client's email)
- **Operator:** `text:equal`
- **Value:** `{{lower(trim(1.email))}}`

This searches for a row where the client's email in column C matches the email from the webhook (case-insensitive, trimmed).

### Output Data

- `{{2.__ROW_NUMBER__}}` - Row number of the matching record
- `{{2.values[0]}}` through `{{2.values[103]}}` - All column values
- `{{2.values[2]}}` - Email (Column C)
- `{{2.values[31]}}` - Notes (Column AF)

---

## ✏️ Module 3: Google Sheets - Update Row

**Module Type:** `google-sheets:updateRow`  
**Version:** 2  
**Connection:** Google (luxsess2001@gmail.com)

### Configuration

- **Search Method:** Drive
- **Mode:** Select
- **Spreadsheet ID:** `1NVjl-yG95DLLjyF3HQ6qMBBCBQUQQe3HO_E6-MnVGeU`
- **Sheet Name:** `leads`
- **Row Number:** `{{2.__ROW_NUMBER__}}` (from Module 2)
- **Includes Headers:** Yes
- **Value Input Option:** USER_ENTERED

### Update Values

The module updates three columns (need to add these columns to Google Sheets first):

#### Column 32 (AG) - provider_replied
```
TRUE
```
Sets the `provider_replied` flag to `TRUE` when a provider reply is received.

#### Column 33 (AH) - provider_replied_at
```
{{now}}
```
Sets the timestamp of when the provider reply was received.

#### Column 34 (AI) - provider_reply_message
```
{{1.message}}
```
Stores the provider's reply message.

---

## 📋 Step-by-Step Setup

### **Step 1: Add Google Sheets Columns**

1. Open **Google Sheets**: "Smartpro Leads"
2. Go to sheet: **"leads"**
3. Add three new columns after column AF (31):
   - **Column AG (32):** `provider_replied`
   - **Column AH (33):** `provider_replied_at`
   - **Column AI (34):** `provider_reply_message`

### **Step 2: Create Make.com Scenario**

1. Go to [Make.com](https://www.make.com)
2. Create new scenario: **"Provider Reply Processing"**
3. Set scenario to **ON/Active**

### **Step 3: Add Module 1 - Custom Webhook**

1. **Add module:** "Webhooks" → "Custom webhook"
2. **Configure:**
   - **Webhook URL:** `https://hook.eu2.make.com/42ip7sz3mon9lhdoetjhegohkbggsm72`
   - **Or select existing webhook** with this URL
3. **Save and note the webhook Hook ID**

### **Step 4: Add Module 2 - Google Sheets Filter**

1. **Add module:** "Google Sheets" → "Search rows"
2. **Configure:**
   - **Spreadsheet:** Smartpro Leads
   - **Sheet:** leads
   - **Filter:**
     - Column: C (email)
     - Condition: `{{lower(trim(1.email))}}` equals `{{lower(trim(C))}}`
   - **Limit:** 1
3. **Test:** Should find the row with matching client email

### **Step 5: Add Module 3 - Google Sheets Update**

1. **Add module:** "Google Sheets" → "Update a row"
2. **Configure:**
   - **Spreadsheet:** Same as Module 2
   - **Sheet:** Same as Module 2
   - **Row:** `{{2.__ROW_NUMBER__}}`
   - **Updates:**
     - `provider_replied` (Column AG/32) = `TRUE`
     - `provider_replied_at` (Column AH/33) = `{{now}}`
     - `provider_reply_message` (Column AI/34) = `{{1.message}}`

### **Step 6: Save and Activate**

1. **Save scenario**
2. **Turn ON** the scenario
3. **Test** with sample data

---

## 🧪 Testing

### **Test Script**

Use the provided test script: `TEST_PROVIDER_REPLY.ps1`

```powershell
.\TEST_PROVIDER_REPLY.ps1
```

### **Manual Test**

Send a test payload to the webhook:
```json
{
  "email": "luxsess2001@gmail.com",
  "from": "provider@smartpro.io",
  "message": "Thank you for your inquiry. We'd be happy to help you with company formation in Oman.",
  "subject": "Re: Consultation Request",
  "body": "Thank you for your inquiry. We'd be happy to help you with company formation in Oman.",
  "timestamp": "2025-11-23T21:30:00.000Z"
}
```

### **Expected Result**

After sending a test request:

1. **Check Make.com:**
   - Scenario execution history
   - All 3 modules executed successfully

2. **Check Google Sheets:**
   - Find row with client email
   - Column AG (32) should be `TRUE`
   - Column AH (33) should have timestamp
   - Column AI (34) should contain provider's message

---

## 🔍 Flow Execution Details

### **Scenario Settings**

- **Type:** Instant
- **Zone:** eu2.make.com
- **Roundtrips:** 1
- **Max Errors:** 3
- **Auto Commit:** true

### **Execution Flow**

1. **Trigger:** Webhook receives POST request with provider reply data
2. **Module 1:** Webhook module captures the data
3. **Module 2:** Searches Google Sheets for matching client email (case-insensitive)
4. **Module 3:** Updates the found row with:
   - `provider_replied` = TRUE
   - `provider_replied_at` = current timestamp
   - `provider_reply_message` = provider's message

---

## ⚠️ Important Notes

### **Email Matching**

The filter uses `{{lower(trim(1.email))}}` which:
- Converts email to lowercase
- Trims whitespace
- Ensures case-insensitive matching

**Important:** The email in Google Sheets column C should match the client's email from the webhook.

### **Provider vs Client Identification**

The flow identifies provider replies by:
- **Sender email:** `{{1.from}}` should be provider's email
- **Recipient email:** `{{1.email}}` should be client's email (used to find row)

### **Column Mapping**

| Column Index | Column Letter | Field Name | Purpose |
|-------------|---------------|------------|---------|
| 29 | AD | client_replied | Client reply status |
| 30 | AE | client_replied_at | Client reply timestamp |
| 31 | AF | notes | Client reply messages |
| 32 | AG | provider_replied | Provider reply status |
| 33 | AH | provider_replied_at | Provider reply timestamp |
| 34 | AI | provider_reply_message | Provider reply message |

---

## 🔧 Troubleshooting

### **Issue 1: Row Not Found**

**Symptoms:**
- Module 2 returns no results
- Module 3 fails or updates wrong row

**Solutions:**
1. Verify client email exists in column C of Google Sheets
2. Check email format (case, spaces, special characters)
3. Verify filter condition: `{{lower(trim(1.email))}}`
4. Test with exact email match

### **Issue 2: Wrong Row Updated**

**Symptoms:**
- Different row gets updated
- Multiple rows match

**Solutions:**
1. Ensure `limit: 1` in Module 2
2. Verify `{{2.__ROW_NUMBER__}}` is correct
3. Check for duplicate emails in column C
4. Add additional filter conditions if needed

### **Issue 3: Columns Don't Exist**

**Symptoms:**
- Update fails
- Column index errors

**Solutions:**
1. Add columns AG, AH, AI to Google Sheets
2. Verify column indices (32, 33, 34)
3. Check column headers match

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              Provider Reply Received                         │
│  { email: client@example.com,                               │
│    from: provider@example.com,                              │
│    message: "Provider's reply..." }                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Module 1: Custom Webhook                        │
│  Webhook URL: 42ip7sz3mon9lhdoetjhegohkbggsm72              │
│  Output: {{1.email}}, {{1.from}}, {{1.message}}, etc.       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Module 2: Google Sheets - Filter Rows                 │
│  Search: Column C = {{lower(trim(1.email))}}               │
│  Output: {{2.__ROW_NUMBER__}}, {{2.values[]}}              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Module 3: Google Sheets - Update Row                  │
│  Row: {{2.__ROW_NUMBER__}}                                  │
│  Updates:                                                    │
│    - Column 32 (AG): provider_replied = TRUE                │
│    - Column 33 (AH): provider_replied_at = {{now}}          │
│    - Column 34 (AI): provider_reply_message = {{1.message}} │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Configuration Checklist

- [ ] Google Sheets columns added (AG, AH, AI)
- [ ] Make.com scenario created: "Provider Reply Processing"
- [ ] Module 1: Custom Webhook configured (URL: 42ip7sz3mon9lhdoetjhegohkbggsm72)
- [ ] Module 2: Google Sheets filter configured
  - [ ] Spreadsheet ID correct
  - [ ] Sheet name: "leads"
  - [ ] Filter: Column C = email (case-insensitive)
  - [ ] Limit: 1
- [ ] Module 3: Google Sheets update configured
  - [ ] Row number from Module 2
  - [ ] Column 32 (AG): provider_replied = TRUE
  - [ ] Column 33 (AH): provider_replied_at = {{now}}
  - [ ] Column 34 (AI): provider_reply_message = {{1.message}}
- [ ] Scenario is active in Make.com
- [ ] Test with sample data
- [ ] Verify Google Sheets updates correctly
- [ ] Monitor execution logs

---

## 🔗 Related Documentation

- `PROVIDER_REPLY_TRACKING.md` - Provider reply tracking overview
- `EMAIL_REPLY_PROCESSING_FLOW.md` - Client reply processing flow
- `TEST_PROVIDER_REPLY.ps1` - Test script for provider replies
- `WEBHOOK_URLS.md` - All webhook URLs reference

---

**Last Updated:** 2025-11-23  
**Status:** Ready for setup  
**Webhook URL:** `https://hook.eu2.make.com/42ip7sz3mon9lhdoetjhegohkbggsm72`

