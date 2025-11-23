# Email Reply Webhook Setup - Complete Configuration

## 🔗 **All Webhooks Overview**

You have **THREE webhooks** for different purposes:

### **1. Form Submission Webhook**
- **URL:** `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`
- **Purpose:** Receives form submissions from consultation form
- **Used By:** V2 Scenario ("smartpro-website-consultation-v2")
- **Status:** ✅ Correctly configured

### **2. Email Reply Processing Webhook**
- **URL:** `https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1`
- **Purpose:** Receives email reply data from email service
- **Used By:** Reply Processing Scenario
- **Status:** ⚠️ Needs configuration

### **3. Reply Webhook (Alternative/Backup)**
- **URL:** `https://hook.eu2.make.com/rfga1pfnupvuxid3jifrzrpb2n25zch9`
- **Purpose:** Alternative reply webhook
- **Status:** ✅ Active (returns "Accepted")

---

## 🔄 **Complete Email Reply Flow**

```
Client receives confirmation email
    ↓
Client clicks "Reply" and sends message
    ↓
Email Service (Gmail/Outlook/Make.com Email Module)
    ├─→ Detects reply
    ├─→ Extracts reply data (email, message, subject)
    └─→ Forwards to: https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1
    ↓
Reply Processing Scenario triggers
    ├─→ Module 1: Receive reply data
    │   - email: {{1.email}} or {{1.from}}
    │   - message: {{1.message}} or {{1.body}}
    │   - subject: {{1.subject}}
    ├─→ Module 2: Find submission in Google Sheets
    │   - Filter: Column D (email) = {{1.email}}
    │   - Find matching row
    ├─→ Module 3: Update Google Sheets
    │   - client_replied (Column AC) = TRUE
    │   - client_replied_at (Column AD) = {{now}}
    │   - notes (Column AH) = append reply message
    └─→ Module 4: Notify provider (optional)
        - Send notification email/Slack
```

---

## 🔧 **Reply Processing Scenario Configuration**

### **Module 1: Custom Webhook (Receive Email Reply Data)**

**Webhook URL:** `https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1`

**Expected Data Structure:**
```json
{
  "email": "client@example.com",
  "from": "client@example.com",
  "message": "This is my reply message",
  "body": "This is my reply message",
  "subject": "Re: Consultation Request",
  "timestamp": "2025-01-22T10:00:00Z"
}
```

**Data Mapping:**
- Email address: `{{1.email}}` or `{{1.from}}`
- Reply message: `{{1.message}}` or `{{1.body}}`
- Subject: `{{1.subject}}`
- Timestamp: `{{1.timestamp}}` or `{{now}}`

---

### **Module 2: Google Sheets - Search Rows**

**Purpose:** Find the original submission by email address

**Configuration:**
- **Spreadsheet:** Smartpro Consultation Submissions
- **Sheet:** Sheet1 (or "leads")
- **Filter:**
  - Column: D (email column)
  - Condition: `{{lower(trim(1.email))}}` equals `{{lower(trim(D))}}`
  - Or: `{{1.email}}` equals `{{D}}`

**Output:**
- Row number: `{{2.rowNumber}}`
- Row data: `{{2.values}}`

---

### **Module 3: Google Sheets - Update Row**

**Purpose:** Update the found row with reply information

**Configuration:**
- **Spreadsheet:** Same as Module 2
- **Sheet:** Same as Module 2
- **Row:** `{{2.rowNumber}}` (from Module 2)
- **Updates:**
  - **Column AC (client_replied):** `TRUE`
  - **Column AD (client_replied_at):** `{{now}}` or `{{formatDate(now; "YYYY-MM-DD HH:mm:ss")}}`
  - **Column AH (notes):** `{{ifempty(2.notes; ""; 2.notes + "\n")}}Reply: {{1.message}}`

**Column Mapping:**
- AC = Column 28 (client_replied)
- AD = Column 29 (client_replied_at)
- AH = Column 33 (notes)

---

### **Module 4: Email/Slack Notification (Optional)**

**Purpose:** Notify provider that client replied

**Configuration:**
- **To:** Provider email address
- **Subject:** `Client replied: {{1.email}}`
- **Body:** 
  ```
  Client: {{2.client_name}} ({{1.email}})
  Original Service: {{2.service_interested}}
  Reply Message: {{1.message}}
  ```

---

## 📋 **Step-by-Step Configuration**

### **Step 1: Create/Open Reply Processing Scenario**

1. **Open Make.com**
2. **Create new scenario** or **open existing scenario**
3. **Name it:** "Email Reply Processing" or "Client Reply Handler"

### **Step 2: Add Module 1 - Custom Webhook**

1. **Add module:** "Webhooks" → "Custom webhook"
2. **Configure:**
   - **Webhook URL:** `https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1`
   - **Or select existing webhook** with this URL
3. **Save and note the webhook Hook ID**

### **Step 3: Add Module 2 - Google Sheets Search**

1. **Add module:** "Google Sheets" → "Search rows"
2. **Configure:**
   - **Spreadsheet:** Smartpro Consultation Submissions
   - **Sheet:** Sheet1 (or "leads")
   - **Filter:**
     - Column: D (email)
     - Condition: `{{lower(trim(1.email))}}` equals `{{lower(trim(D))}}`
3. **Test:** Should find the row with matching email

### **Step 4: Add Module 3 - Google Sheets Update**

1. **Add module:** "Google Sheets" → "Update a row"
2. **Configure:**
   - **Spreadsheet:** Same as Module 2
   - **Sheet:** Same as Module 2
   - **Row:** `{{2.rowNumber}}`
   - **Updates:**
     - `client_replied` (Column AC) = `TRUE`
     - `client_replied_at` (Column AD) = `{{now}}`
     - `notes` (Column AH) = `{{ifempty(2.values[33]; ""; 2.values[33] + "\n")}}Reply: {{1.message}}`

### **Step 5: Add Module 4 - Provider Notification (Optional)**

1. **Add module:** "Email" → "Send an email" or "Slack" → "Create a message"
2. **Configure:**
   - **To:** Provider email/Slack channel
   - **Subject:** `Client replied: {{1.email}}`
   - **Body:** Include client name, email, and reply message

### **Step 6: Save and Activate**

1. **Save scenario**
2. **Turn ON** the scenario
3. **Test** with sample data

---

## 🧪 **Testing the Reply Webhook**

### **Test 1: Check Webhook is Active**

**Access webhook URL:**
```
https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1
```

**Expected:** Should return "Accepted" or similar response

### **Test 2: Send Test Reply Data**

**Using PowerShell:**
```powershell
$body = @{
    email = "test@example.com"
    from = "test@example.com"
    message = "This is a test reply message"
    body = "This is a test reply message"
    subject = "Re: Consultation Request"
    timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Check:**
- Scenario executes
- Google Sheets search finds the row
- Google Sheets updates correctly
- Provider notification sent (if configured)

### **Test 3: Real Email Reply**

1. **Submit a form** (creates a submission with email: test@example.com)
2. **Receive confirmation email**
3. **Reply to the email**
4. **Check:**
   - Email service forwards reply to webhook
   - Scenario executes
   - Google Sheets updates
   - `client_replied` = TRUE
   - `client_replied_at` = timestamp

---

## 📧 **Email Service Configuration**

To make email replies work, configure your email service to forward replies to the webhook.

### **Option 1: Make.com Email Module**

1. **Add Gmail/Outlook module** to a scenario
2. **Configure:** Watch for replies
3. **Add HTTP module** to forward to webhook:
   - **URL:** `https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1`
   - **Method:** POST
   - **Body:** 
     ```json
     {
       "email": "{{1.from}}",
       "message": "{{1.body}}",
       "subject": "{{1.subject}}"
     }
     ```

### **Option 2: Gmail API**

1. **Use Gmail API** to watch for replies
2. **Extract reply data**
3. **Send to webhook** via HTTP POST

### **Option 3: Outlook/Microsoft Graph**

1. **Use Microsoft Graph API** to watch for replies
2. **Extract reply data**
3. **Send to webhook** via HTTP POST

---

## 🔍 **Troubleshooting**

### **Issue 1: Webhook Not Receiving Data**

**Check:**
- Webhook URL is correct
- Scenario is ON/active
- Email service is forwarding replies
- Email service has correct webhook URL

**Fix:**
- Verify webhook URL in email service configuration
- Test webhook with manual POST request
- Check scenario execution history

### **Issue 2: Can't Find Row in Google Sheets**

**Check:**
- Email format matches (case, spaces)
- Column index is correct (D = email)
- Filter condition is correct

**Fix:**
- Use `lower()` and `trim()` functions
- Test search with known email
- Check column mapping

### **Issue 3: Update Not Working**

**Check:**
- Row number is correct
- Column indices are correct
- Google Sheets permissions

**Fix:**
- Verify row number from search result
- Check column mapping (AC = 28, AD = 29, AH = 33)
- Test update with manual data

---

## 📊 **Complete Setup Summary**

### **Webhooks:**
1. ✅ **Submission:** `z9t0f5eqipopdg368eypl5i9eo7kpbu8` (V2 Scenario)
2. ✅ **Reply Data:** `clvmjhusq0bo9kzikttimdzsannx65q1` (Reply Processing Scenario)
3. ✅ **Reply (Alt):** `rfga1pfnupvuxid3jifrzrpb2n25zch9` (Backup/Alternative)

### **Scenarios:**
1. ✅ **V2 Scenario:** Handles form submissions
2. ⚠️ **Reply Processing Scenario:** Needs configuration for email replies

### **Flow:**
```
Form → Submission Webhook → V2 Scenario → Google Sheets + Email
Reply → Email Service → Reply Webhook → Reply Scenario → Update Google Sheets
```

---

## ✅ **Configuration Checklist**

- [ ] Reply Processing Scenario created/opened
- [ ] Module 1: Webhook configured (`clvmjhusq0bo9kzikttimdzsannx65q1`)
- [ ] Module 2: Google Sheets search configured
- [ ] Module 3: Google Sheets update configured
- [ ] Module 4: Provider notification configured (optional)
- [ ] Scenario is ON/active
- [ ] Email service configured to forward replies
- [ ] Test with sample data
- [ ] Test with real email reply
- [ ] Verify Google Sheets updates correctly

---

## 🎉 **Final Result**

After configuration:

- ✅ **Form submissions** → V2 Scenario processes
- ✅ **Email replies** → Reply Processing Scenario processes
- ✅ **Google Sheets** updated correctly
- ✅ **Provider notified** when client replies
- ✅ **Complete automation** working end-to-end

**All webhooks configured and working!**
