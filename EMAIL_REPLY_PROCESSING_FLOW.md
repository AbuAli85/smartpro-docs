# Email Reply Processing Flow - Make.com Scenario Configuration

## 📋 Overview

This document describes the **Email Reply Processing** scenario in Make.com that handles **CLIENT email replies** (not provider replies) and updates Google Sheets accordingly.

**Important:** This flow processes replies **FROM CLIENTS** who respond to confirmation emails, not replies from providers.

**Scenario Name:** Email Reply Processing  
**Zone:** eu2.make.com  
**Status:** Active (Instant scenario)

---

## 🔄 Flow Architecture

```
Email Reply Received
    ↓
Module 1: Custom Webhook (Receive Data)
    ↓
Module 2: Google Sheets - Filter Rows (Find Matching Email)
    ↓
Module 3: Google Sheets - Update Row (Mark as Replied)
```

---

## 📦 Module 1: Custom Webhook

**Module Type:** `gateway:CustomWebHook`  
**Version:** 1  
**Hook ID:** `3622716`

### Configuration

- **Webhook Hook:** 3622716
- **Maximum Results:** 1

### Purpose

Receives email reply data from the email service/webhook trigger.

### Expected Input Data

The webhook expects data with the following structure:
```json
{
  "email": "client@example.com",
  "message": "This is the reply message",
  "subject": "Re: Consultation Request",
  "from": "client@example.com",
  "body": "This is the reply message"
}
```

### Output Data

- `{{1.email}}` - Email address of the replier
- `{{1.message}}` - Reply message content
- `{{1.from}}` - Sender email address
- `{{1.body}}` - Message body
- `{{1.subject}}` - Email subject

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
- **Column:** C (Email column)
- **Operator:** `text:equal`
- **Value:** `{{lower(trim(1.email))}}`

This searches for a row where the email in column C matches the email from the webhook (case-insensitive, trimmed).

### Output Data

- `{{2.__ROW_NUMBER__}}` - Row number of the matching record
- `{{2.values[0]}}` through `{{2.values[103]}}` - All column values
- `{{2.values[2]}}` - Email (Column C)
- `{{2.values[31]}}` - Notes (Column AF)

### Column Mapping Reference

| Column Index | Column Letter | Field Name |
|-------------|---------------|------------|
| 0 | A | Timestamp |
| 1 | B | Client Name |
| 2 | C | Email |
| 3 | D | Phone |
| ... | ... | ... |
| 29 | AD | client_replied |
| 30 | AE | client_replied_at |
| 31 | AF | notes |

---

## ✏️ Module 3: Google Sheets - Update Row

**Module Type:** `google-sheets:updateRow`  
**Version:** 2  
**Connection:** Google (luxsess2001@gmail.com)

### Configuration

- **Search Method:** Drive
- **Mode:** Select
- **Spreadsheet ID:** `1NVjl-yG95DLLjyF3HQ6qMBBCBQUQQe3HO_E6-MnVGeU`
- **Spreadsheet Path:** `/1OAws5Z_vqlJIi0_4BtkzqLjzFre3e23h/1NVjl-yG95DLLjyF3HQ6qMBBCBQUQQe3HO_E6-MnVGeU`
- **Sheet Name:** `leads`
- **Row Number:** `{{2.__ROW_NUMBER__}}` (from Module 2)
- **Includes Headers:** Yes
- **Value Input Option:** USER_ENTERED

### Update Values

The module updates three columns:

#### Column 29 (AD) - client_replied
```
TRUE
```
Sets the `client_replied` flag to `TRUE` when a reply is received.

#### Column 30 (AE) - client_replied_at
```
{{now}}
```
Sets the timestamp of when the reply was received.

#### Column 31 (AF) - notes
```
{{ifempty(2.values[31]; ""; 2.values[31] + "\n\n")}}Reply: {{1.message}}
```
Appends the reply message to the notes field:
- If notes field is empty: Just adds "Reply: [message]"
- If notes field has content: Adds "\n\nReply: [message]" to preserve existing notes

### Update Logic

The formula `{{ifempty(2.values[31]; ""; 2.values[31] + "\n\n")}}` ensures:
- If column 31 (notes) is empty, it starts with an empty string
- If column 31 has existing content, it preserves it and adds a double newline before the reply

---

## 🔍 Flow Execution Details

### Scenario Settings

- **Type:** Instant
- **Version:** 1
- **Zone:** eu2.make.com
- **Roundtrips:** 1
- **Max Errors:** 3
- **Auto Commit:** true
- **Auto Commit Trigger Last:** true
- **Sequential:** false

### Execution Flow

1. **Trigger:** Webhook receives POST request with email reply data
2. **Module 1:** Webhook module captures the data
3. **Module 2:** Searches Google Sheets for matching email (case-insensitive)
4. **Module 3:** Updates the found row with:
   - `client_replied` = TRUE
   - `client_replied_at` = current timestamp
   - `notes` = appended reply message

---

## 🧪 Testing

### Test 1: Manual Webhook Test

**PowerShell Script:**
```powershell
$body = @{
    email = "test@example.com"
    message = "This is a test reply message"
    subject = "Re: Consultation Request"
    from = "test@example.com"
    body = "This is a test reply message"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hook.eu2.make.com/[WEBHOOK_URL]" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Prerequisites:**
- A row must exist in Google Sheets with email `test@example.com` in column C
- The scenario must be active in Make.com

### Test 2: Verify Google Sheets Update

After sending a test request:

1. **Check Google Sheets:**
   - Column AD (29) should be `TRUE`
   - Column AE (30) should have current timestamp
   - Column AF (31) should contain "Reply: [message]"

2. **Check Make.com:**
   - Scenario execution history
   - Error logs (if any)
   - Execution time

### Test 3: Email Case Sensitivity

Test with different email formats:
- `Test@Example.com`
- `test@example.com`
- `TEST@EXAMPLE.COM`

All should match the same row due to `lower()` function.

---

## ⚠️ Important Notes

### Email Matching

The filter uses `{{lower(trim(1.email))}}` which:
- Converts email to lowercase
- Trims whitespace
- Ensures case-insensitive matching

**Important:** The email in Google Sheets column C should also be normalized (lowercase, trimmed) for best results.

### Notes Field Handling

The notes field (Column 31) uses a conditional formula:
- **Empty notes:** `"Reply: [message]"`
- **Existing notes:** `"[existing notes]\n\nReply: [message]"`

This preserves existing notes and adds new replies with proper formatting.

### Row Number Reference

Module 3 uses `{{2.__ROW_NUMBER__}}` which is the row number from Module 2's search result. This ensures the correct row is updated even if the sheet is sorted or filtered.

---

## 🔧 Troubleshooting

### Issue 1: No Row Found

**Symptoms:**
- Module 2 returns no results
- Module 3 fails or updates wrong row

**Solutions:**
1. Verify email exists in column C of Google Sheets
2. Check email format (case, spaces, special characters)
3. Verify filter condition: `{{lower(trim(1.email))}}`
4. Test with exact email match

### Issue 2: Wrong Row Updated

**Symptoms:**
- Different row gets updated
- Multiple rows match

**Solutions:**
1. Ensure `limit: 1` in Module 2
2. Verify `{{2.__ROW_NUMBER__}}` is correct
3. Check for duplicate emails in column C
4. Add additional filter conditions if needed

### Issue 3: Notes Not Appending

**Symptoms:**
- Notes field overwrites instead of appending
- Formatting issues

**Solutions:**
1. Verify formula: `{{ifempty(2.values[31]; ""; 2.values[31] + "\n\n")}}`
2. Check column index (31 = Column AF)
3. Test with existing notes to verify append works

### Issue 4: Timestamp Format

**Symptoms:**
- Timestamp not in expected format
- Date/time display issues

**Solutions:**
1. `{{now}}` uses Make.com's default format
2. For custom format, use: `{{formatDate(now; "YYYY-MM-DD HH:mm:ss")}}`
3. Verify `valueInputOption: USER_ENTERED` for proper date handling

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Email Reply Received                     │
│  { email, message, subject, from, body }                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Module 1: Custom Webhook                        │
│  Hook ID: 3622716                                           │
│  Output: {{1.email}}, {{1.message}}, etc.                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Module 2: Google Sheets - Filter Rows               │
│  Search: Column C = {{lower(trim(1.email))}}                │
│  Output: {{2.__ROW_NUMBER__}}, {{2.values[]}}               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         Module 3: Google Sheets - Update Row                 │
│  Row: {{2.__ROW_NUMBER__}}                                  │
│  Updates:                                                    │
│    - Column 29 (AD): TRUE                                   │
│    - Column 30 (AE): {{now}}                                │
│    - Column 31 (AF): Append reply message                   │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Configuration Checklist

- [x] Module 1: Custom Webhook configured (Hook ID: 3622716)
- [x] Module 2: Google Sheets filter configured
  - [x] Spreadsheet ID correct
  - [x] Sheet name: "leads"
  - [x] Filter: Column C = email (case-insensitive)
  - [x] Limit: 1
- [x] Module 3: Google Sheets update configured
  - [x] Row number from Module 2
  - [x] Column 29: client_replied = TRUE
  - [x] Column 30: client_replied_at = {{now}}
  - [x] Column 31: notes append formula
- [ ] Scenario is active in Make.com
- [ ] Test with sample data
- [ ] Verify Google Sheets updates correctly
- [ ] Monitor execution logs

---

## 🔗 Related Documentation

- `EMAIL_REPLY_WEBHOOK_SETUP.md` - Complete webhook setup guide
- `REPLY_WEBHOOK_INFO.md` - Reply webhook information
- `TESTING_GUIDE.md` - Testing procedures
- `TEST_RESULTS_CHECKLIST.md` - Test results tracking

---

## 📝 Webhook URL

**Note:** The actual webhook URL is not specified in the JSON configuration. To find it:

1. Go to Make.com
2. Open the scenario
3. Click on Module 1 (Custom Webhook)
4. Copy the webhook URL

The webhook URL format is typically:
```
https://hook.eu2.make.com/[HOOK_IDENTIFIER]
```

---

**Last Updated:** Based on Make.com scenario export  
**Scenario Name:** Email Reply Processing  
**Status:** Ready for testing and deployment

