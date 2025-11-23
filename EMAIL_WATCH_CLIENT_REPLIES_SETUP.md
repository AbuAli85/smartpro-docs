# Email Watch - Client Replies - Complete Setup Guide

## 📋 **Current Status**

You have the **"Email Watch - Client Replies"** scenario started with:
- ✅ Module 1: Email Trigger (watching for new emails)
- ❌ **Missing:** HTTP module to forward to webhook

---

## 🔧 **What's Missing**

The scenario currently only **watches** for emails but doesn't **forward** them to your webhook. You need to add an HTTP module.

---

## ✅ **Complete Flow Configuration**

### **Current Module 1: Email Trigger**
- **Type:** `email:TriggerNewEmail`
- **Connection:** Microsoft SMTP/IMAP (chairman@falconeyegroup.net)
- **Folder:** INBOX
- **Criteria:** ALL emails
- **Max Results:** 1

**This watches for new emails in the inbox.**

---

### **Add Module 2: HTTP - Make a Request** ⚠️ MISSING

You need to add this module to forward email data to your webhook.

#### **Module Configuration:**

**Module Type:** `http:MakeARequest`

**Settings:**
- **URL:** `https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8`
- **Method:** POST
- **Headers:**
  - `Content-Type`: `application/json`

**Body (JSON):**
```json
{
  "email": "{{3.from}}",
  "from": "{{3.from}}",
  "message": "{{3.textPlain}}",
  "subject": "{{3.subject}}",
  "body": "{{3.textPlain}}",
  "timestamp": "{{formatDate(3.date; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

**Alternative Body (if textPlain doesn't work):**
```json
{
  "email": "{{3.from}}",
  "from": "{{3.from}}",
  "message": "{{ifempty(3.textPlain; 3.textHtml; 3.textPlain)}}",
  "subject": "{{3.subject}}",
  "body": "{{ifempty(3.textPlain; 3.textHtml; 3.textPlain)}}",
  "timestamp": "{{formatDate(3.date; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

---

## 📝 **Step-by-Step Setup**

### **Step 1: Add HTTP Module**

1. In Make.com, open scenario: **"Email Watch - Client Replies"**
2. Click **"+"** to add a new module
3. Search for: **"HTTP"** → **"Make a request"**
4. Add the module after Module 1

### **Step 2: Configure HTTP Module**

1. **URL:**
   ```
   https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8
   ```

2. **Method:** POST

3. **Headers:**
   - Click "Add header"
   - Name: `Content-Type`
   - Value: `application/json`

4. **Body Type:** Raw

5. **Request Content:** JSON
   ```json
   {
     "email": "{{3.from}}",
     "from": "{{3.from}}",
     "message": "{{3.textPlain}}",
     "subject": "{{3.subject}}",
     "body": "{{3.textPlain}}",
     "timestamp": "{{formatDate(3.date; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
   }
   ```

### **Step 3: Filter for Replies Only (Optional but Recommended)**

To only process replies (not all emails), update Module 1:

**Add Filter in Module 1:**
- **Subject:** Contains "Re:" OR starts with "Re:"
- **OR**
- **Text:** Contains reply indicators

**Or add a Router/Filter module between Module 1 and Module 2:**
- Filter condition: `{{3.subject}}` contains "Re:"
- Only forward if it's a reply

---

## 🔍 **Module 1 Data Mapping Reference**

From the email trigger module, you can access:

- `{{3.from}}` - Sender email address
- `{{3.to}}` - Recipient email address
- `{{3.subject}}` - Email subject
- `{{3.textPlain}}` - Plain text body
- `{{3.textHtml}}` - HTML body
- `{{3.date}}` - Email date/timestamp
- `{{3.messageId}}` - Email message ID

---

## 🎯 **Complete Flow Architecture**

```
Module 1: Email Trigger
  - Watches INBOX for new emails
  - Triggers on new email
    ↓
Module 2: HTTP Request (ADD THIS)
  - Forwards email data to webhook
  - URL: Client Reply Processing webhook
  - Body: Email data formatted as JSON
    ↓
Client Reply Processing Flow
  - Receives webhook data
  - Finds row in Google Sheets
  - Updates client_replied columns
```

---

## ⚠️ **Important Considerations**

### **1. Filter for Replies Only**

Currently, Module 1 watches for **ALL emails**. You should filter to only process replies:

**Option A: Update Module 1 Filter**
- Add filter: Subject contains "Re:"
- Or: From address matches client emails

**Option B: Add Router Module**
- Add router between Module 1 and Module 2
- Route only replies to HTTP module

### **2. Prevent Duplicate Processing**

- Consider marking emails as read (`markSeen: true`)
- Or track processed message IDs
- Or use email filtering to avoid duplicates

### **3. Error Handling**

Add error handling:
- If HTTP request fails, log error
- Send notification
- Retry logic (optional)

---

## 🧪 **Testing**

### **Test the Complete Flow:**

1. **Send a test reply email** to the inbox
2. **Check Make.com execution:**
   - Module 1 should trigger
   - Module 2 should send to webhook
3. **Check Client Reply Processing flow:**
   - Should receive webhook data
   - Should update Google Sheets
4. **Verify Google Sheets:**
   - Row should be updated
   - client_replied = TRUE
   - client_replied_at = timestamp
   - notes = reply message

---

## 📋 **Complete Configuration Checklist**

- [ ] Module 1: Email Trigger configured
- [ ] Module 2: HTTP Request added
- [ ] HTTP URL: Client Reply webhook
- [ ] HTTP Method: POST
- [ ] HTTP Headers: Content-Type = application/json
- [ ] HTTP Body: JSON with email data mapping
- [ ] Filter for replies only (optional but recommended)
- [ ] Error handling added (optional)
- [ ] Scenario is ON/Active
- [ ] Test with real email reply

---

## 🔧 **Troubleshooting**

### **Issue 1: Module 2 Not Receiving Data**

**Check:**
- Module 1 output data structure
- Data mapping in Module 2
- Variable names ({{3.from}}, etc.)

**Solution:**
- Use Make.com's data mapper to see available fields
- Test Module 1 output first
- Adjust mapping based on actual data structure

### **Issue 2: Wrong Email Format**

**Check:**
- Email body format (textPlain vs textHtml)
- Timestamp format
- Special characters

**Solution:**
- Use `ifempty()` function for body
- Format timestamp correctly
- Escape special characters if needed

### **Issue 3: Processing All Emails (Not Just Replies)**

**Solution:**
- Add filter in Module 1
- Or add router/filter module
- Filter by subject containing "Re:"

---

## 📝 **Complete JSON Configuration**

Here's what the complete scenario should look like (Module 2 added):

```json
{
  "name": "Email Watch - Client Replies",
  "flow": [
    {
      "id": 3,
      "module": "email:TriggerNewEmail",
      // ... existing Module 1 config ...
    },
    {
      "id": 4,
      "module": "http:MakeARequest",
      "parameters": {
        "url": "https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8",
        "method": "POST",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": "{\"email\":\"{{3.from}}\",\"from\":\"{{3.from}}\",\"message\":\"{{3.textPlain}}\",\"subject\":\"{{3.subject}}\",\"body\":\"{{3.textPlain}}\",\"timestamp\":\"{{formatDate(3.date; \\\"YYYY-MM-DDTHH:mm:ss.SSSZ\\\")}}\"}"
      }
    }
  ]
}
```

---

## 🚀 **Next Steps**

1. **Add Module 2 (HTTP Request)** to your scenario
2. **Configure the webhook URL** and body mapping
3. **Add filter for replies only** (recommended)
4. **Test with a real email reply**
5. **Verify end-to-end flow works**

---

**Add the HTTP module to complete the email forwarding setup!** 🚀

