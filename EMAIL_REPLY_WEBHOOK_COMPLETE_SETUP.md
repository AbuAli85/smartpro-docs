# Email Reply Webhook - Complete Setup Guide

## 🎯 **Overview**

This guide will help you create a **complete email reply webhook scenario** from scratch in Make.com. This scenario will:
1. Receive email reply data
2. Find the original submission in Google Sheets
3. Update Google Sheets to mark client as replied
4. Notify the provider

---

## 📋 **Prerequisites**

- ✅ Make.com account
- ✅ Google Sheets access (Smartpro Consultation Submissions)
- ✅ Email service configured (Gmail/Outlook)
- ✅ Basic understanding of Make.com scenarios

---

## 🔧 **Step 1: Create New Scenario**

### **1.1 Create Scenario**

1. **Open Make.com**
2. **Click "Create a new scenario"**
3. **Name it:** "Email Reply Processing" or "Client Reply Handler"
4. **Click "Create"**

### **1.2 Scenario Settings**

1. **Click scenario settings** (gear icon)
2. **Set:**
   - **Execution limit:** 1000 (or as needed)
   - **Error handling:** Stop scenario execution
   - **Save:** Click "Save"

---

## 🔗 **Step 2: Add Module 1 - Custom Webhook (Trigger)**

### **2.1 Add Webhook Module**

1. **Click "+" to add module**
2. **Search:** "Webhooks"
3. **Select:** "Custom webhook"
4. **Click "Add"**

### **2.2 Configure Webhook**

1. **Click "Add"** next to "Webhook" field
2. **Webhook settings:**
   - **Name:** "Email Reply Webhook" or "Client Reply Webhook"
   - **Click "Save"**
3. **Copy the webhook URL** (you'll need this later)
   - Format: `https://hook.eu2.make.com/[unique-id]`
   - Example: `https://hook.eu2.make.com/xxxxxxxxxxxxxxxxxxxxx`
4. **Click "OK"**

### **2.3 Webhook Data Structure**

The webhook will receive data like:
```json
{
  "email": "client@example.com",
  "from": "client@example.com",
  "message": "This is my reply message",
  "body": "This is my reply message",
  "subject": "Re: Consultation Request",
  "timestamp": "2025-01-22T10:00:00Z",
  "original_subject": "Consultation Request"
}
```

**Note:** The exact structure depends on your email service configuration.

### **2.4 Test Webhook**

1. **Click "Run once"** to test
2. **Copy the webhook URL**
3. **Test with PowerShell:**
   ```powershell
   $body = @{
       email = "test@example.com"
       from = "test@example.com"
       message = "Test reply message"
       body = "Test reply message"
       subject = "Re: Consultation Request"
   } | ConvertTo-Json

   Invoke-WebRequest -Uri "YOUR_WEBHOOK_URL" `
       -Method POST `
       -ContentType "application/json" `
       -Body $body
   ```
4. **Check:** Module 1 should show received data

---

## 📊 **Step 3: Add Module 2 - Google Sheets Search Rows**

### **3.1 Add Google Sheets Module**

1. **Click "+" after Module 1**
2. **Search:** "Google Sheets"
3. **Select:** "Search rows"
4. **Click "Add"**

### **3.2 Configure Connection**

1. **Click "Add"** next to "Connection"
2. **Select your Google account**
3. **Authorize if needed**
4. **Click "Save"**

### **3.3 Configure Search**

1. **Spreadsheet:**
   - **Click "Select"**
   - **Choose:** "Smartpro Consultation Submissions"
   - **Or paste spreadsheet ID:** `19tZiQsjVmLiDQW4dTszEK2mKQl01mTPZnAxO6zRhutQ`

2. **Sheet:**
   - **Select:** "Sheet1" or "leads"

3. **Filter:**
   - **Click "Add filter"**
   - **Column:** D (email column)
   - **Condition:** "Equal to"
   - **Value:** `{{lower(trim(1.email))}}` or `{{lower(trim(1.from))}}`
   - **Note:** Use `lower()` and `trim()` to handle case and spaces

4. **Options:**
   - **Limit:** 1 (only need first match)
   - **Sort order:** Ascending

### **3.4 Test Search**

1. **Click "Run once"**
2. **Check:** Should find the row with matching email
3. **Note:** If no match found, check email format

---

## ✏️ **Step 4: Add Module 3 - Google Sheets Update Row**

### **4.1 Add Update Module**

1. **Click "+" after Module 2**
2. **Search:** "Google Sheets"
3. **Select:** "Update a row"
4. **Click "Add"**

### **4.2 Configure Update**

1. **Spreadsheet:**
   - **Same as Module 2** (use data from Module 2)

2. **Sheet:**
   - **Same as Module 2**

3. **Row:**
   - **Click "Map"**
   - **Select:** `{{2.rowNumber}}` (from Module 2)

4. **Updates:**

   **Column AC (client_replied) - Index 28:**
   - **Column:** AC (or index 28)
   - **Value:** `TRUE`

   **Column AD (client_replied_at) - Index 29:**
   - **Column:** AD (or index 29)
   - **Value:** `{{now}}` or `{{formatDate(now; "YYYY-MM-DD HH:mm:ss")}}`

   **Column AH (notes) - Index 33:**
   - **Column:** AH (or index 33)
   - **Value:** 
     ```
     {{ifempty(2.values[33]; ""; 2.values[33] + "\n\n")}}Reply received: {{formatDate(now; "YYYY-MM-DD HH:mm")}}\n{{1.message}}
     ```
     Or simpler:
     ```
     {{ifempty(2.values[33]; ""; 2.values[33] + "\n\n")}}Reply: {{1.message}}
     ```

### **4.3 Column Mapping Reference**

| Column | Index | Field Name | Purpose |
|--------|-------|------------|---------|
| A | 0 | submission_id | - |
| B | 1 | submitted_at | - |
| C | 2 | client_name | - |
| D | 3 | email | Search by this |
| ... | ... | ... | ... |
| AC | 28 | client_replied | Update to TRUE |
| AD | 29 | client_replied_at | Update with timestamp |
| ... | ... | ... | ... |
| AH | 33 | notes | Append reply message |

### **4.4 Test Update**

1. **Click "Run once"**
2. **Check:** Google Sheets should update
3. **Verify:**
   - `client_replied` = TRUE
   - `client_replied_at` = current timestamp
   - `notes` = includes reply message

---

## 📧 **Step 5: Add Module 4 - Provider Notification (Optional)**

### **5.1 Add Email Module**

1. **Click "+" after Module 3**
2. **Search:** "Email" or "Resend"
3. **Select:** "Send an email" or "Resend - Send an email"
4. **Click "Add"**

### **5.2 Configure Email**

1. **Connection:**
   - **Select your email connection** (SMTP/Resend/Gmail)

2. **To:**
   - **Provider email address**
   - Example: `provider@smartpro.io` or `chairman@falconeyegroup.net`

3. **Subject:**
   ```
   Client Replied: {{2.values[2]}} ({{1.email}})
   ```
   Or:
   ```
   Reply from {{1.email}} - {{2.values[6]}}
   ```

4. **Content (HTML or Text):**
   ```html
   <h2>Client Reply Received</h2>
   
   <p><strong>Client:</strong> {{2.values[2]}} ({{1.email}})</p>
   <p><strong>Original Service:</strong> {{2.values[6]}}</p>
   <p><strong>Reply Message:</strong></p>
   <p>{{1.message}}</p>
   
   <hr>
   <p><small>Reply received at: {{formatDate(now; "YYYY-MM-DD HH:mm:ss")}}</small></p>
   ```

### **5.3 Test Notification**

1. **Click "Run once"**
2. **Check:** Provider should receive email
3. **Verify:** Email contains correct information

---

## 🔄 **Step 6: Add Error Handling (Optional but Recommended)**

### **6.1 Add Error Handler**

1. **Click scenario settings** (gear icon)
2. **Error handling:**
   - **Select:** "Continue scenario execution"
   - **Or:** Add error handler module

### **6.2 Add Error Notification**

1. **Add module after Module 3**
2. **Search:** "Error handler" or use "Router"
3. **Configure:** Send error notification if update fails

---

## 🧪 **Step 7: Testing**

### **7.1 Test with Sample Data**

1. **Click "Run once" on Module 1**
2. **Enter test data:**
   ```json
   {
     "email": "test@example.com",
     "from": "test@example.com",
     "message": "This is a test reply",
     "subject": "Re: Consultation Request"
   }
   ```
3. **Run scenario**
4. **Check:**
   - ✅ Module 2 finds the row
   - ✅ Module 3 updates Google Sheets
   - ✅ Module 4 sends notification (if configured)

### **7.2 Test with Real Email**

1. **Submit a form** with email: `test@example.com`
2. **Receive confirmation email**
3. **Reply to the email**
4. **Check:**
   - ✅ Email service forwards to webhook
   - ✅ Scenario executes
   - ✅ Google Sheets updates
   - ✅ Provider notified

---

## 📧 **Step 8: Configure Email Service**

### **8.1 Option 1: Make.com Email Module**

1. **Create new scenario** or add to existing
2. **Add module:** "Gmail" → "Watch emails" or "Outlook" → "Watch emails"
3. **Configure:**
   - **Watch for:** Replies
   - **Filter:** Subject contains "Re: Consultation" or "Re: Thank You"
4. **Add HTTP module:**
   - **Method:** POST
   - **URL:** Your webhook URL from Step 2
   - **Body:**
     ```json
     {
       "email": "{{1.from}}",
       "from": "{{1.from}}",
       "message": "{{1.body}}",
       "body": "{{1.body}}",
       "subject": "{{1.subject}}"
     }
     ```

### **8.2 Option 2: Gmail API**

1. **Use Gmail API** to watch for replies
2. **Extract reply data**
3. **Send to webhook** via HTTP POST

### **8.3 Option 3: Outlook/Microsoft Graph**

1. **Use Microsoft Graph API** to watch for replies
2. **Extract reply data**
3. **Send to webhook** via HTTP POST

---

## ✅ **Complete Configuration Checklist**

### **Scenario Setup:**
- [ ] Scenario created and named
- [ ] Scenario settings configured
- [ ] Error handling set up

### **Module 1 - Webhook:**
- [ ] Webhook module added
- [ ] Webhook created and URL copied
- [ ] Webhook tested with sample data
- [ ] Webhook URL saved for email service

### **Module 2 - Google Sheets Search:**
- [ ] Google Sheets connection configured
- [ ] Spreadsheet selected
- [ ] Sheet selected
- [ ] Filter configured (email column)
- [ ] Search tested and finds rows

### **Module 3 - Google Sheets Update:**
- [ ] Update module added
- [ ] Row mapping configured (from Module 2)
- [ ] Column AC (client_replied) = TRUE
- [ ] Column AD (client_replied_at) = timestamp
- [ ] Column AH (notes) = reply message
- [ ] Update tested and works

### **Module 4 - Provider Notification:**
- [ ] Email module added
- [ ] Provider email configured
- [ ] Subject and body configured
- [ ] Notification tested

### **Email Service:**
- [ ] Email service configured (Gmail/Outlook)
- [ ] Reply forwarding set up
- [ ] Webhook URL configured in email service
- [ ] Test reply sent and received

### **Testing:**
- [ ] Test with sample data
- [ ] Test with real email reply
- [ ] Verify Google Sheets updates
- [ ] Verify provider notification
- [ ] Check for errors

### **Final:**
- [ ] Scenario is ON/active
- [ ] All modules working
- [ ] End-to-end test successful

---

## 📝 **Module Configuration Summary**

### **Module 1: Custom Webhook**
```
Module: Custom webhook
Webhook: [Your new webhook URL]
Data: Receives email reply data
```

### **Module 2: Google Sheets Search**
```
Module: Google Sheets - Search rows
Spreadsheet: Smartpro Consultation Submissions
Sheet: Sheet1
Filter: Column D (email) = {{lower(trim(1.email))}}
Limit: 1
```

### **Module 3: Google Sheets Update**
```
Module: Google Sheets - Update a row
Spreadsheet: [Same as Module 2]
Sheet: [Same as Module 2]
Row: {{2.rowNumber}}
Updates:
  - Column AC (28): TRUE
  - Column AD (29): {{now}}
  - Column AH (33): {{ifempty(2.values[33]; ""; 2.values[33] + "\n\n")}}Reply: {{1.message}}
```

### **Module 4: Provider Notification**
```
Module: Email - Send an email
To: provider@smartpro.io
Subject: Client Replied: {{2.values[2]}} ({{1.email}})
Body: [HTML with client info and reply message]
```

---

## 🎯 **Quick Reference: Webhook URL**

After creating the webhook in Step 2, **save this URL** - you'll need it for email service configuration:

```
https://hook.eu2.make.com/[your-unique-id]
```

**Use this URL in:**
- Email service configuration
- Testing scripts
- Documentation

---

## 🚨 **Troubleshooting**

### **Issue: Webhook Not Receiving Data**

**Check:**
- Webhook URL is correct
- Scenario is ON/active
- Email service is forwarding replies
- Email service has correct webhook URL

**Fix:**
- Test webhook with manual POST request
- Verify webhook URL in email service
- Check scenario execution history

### **Issue: Can't Find Row in Google Sheets**

**Check:**
- Email format matches (case, spaces, special characters)
- Column index is correct (D = email)
- Filter condition is correct

**Fix:**
- Use `lower()` and `trim()` functions
- Test search with known email
- Check column mapping

### **Issue: Update Not Working**

**Check:**
- Row number is correct
- Column indices are correct (AC=28, AD=29, AH=33)
- Google Sheets permissions

**Fix:**
- Verify row number from search result
- Check column mapping
- Test update with manual data

---

## 🎉 **Final Result**

After completing all steps:

- ✅ **Webhook created** and ready to receive email replies
- ✅ **Scenario configured** to process replies
- ✅ **Google Sheets updates** when client replies
- ✅ **Provider notified** when client replies
- ✅ **Complete automation** working end-to-end

**Your email reply webhook is fully configured and ready to use!**

---

## 📞 **Next Steps**

1. **Save the webhook URL** for email service configuration
2. **Configure email service** to forward replies to webhook
3. **Test with real email reply**
4. **Monitor execution history** for any issues
5. **Adjust settings** as needed based on real usage

**Everything is set up and ready to go!** 🚀

