# Email Reply Watcher - Complete Setup Guide

## ⚠️ **Current Status**

Your "Email Reply Watcher" scenario is **incomplete**. It has:
- ✅ Module 1: Gmail Watch Emails
- ❌ Missing: Filter for replies only
- ❌ Missing: HTTP module to forward to webhook

---

## 🔧 **Step 1: Add Filter to Module 1**

### **Current Configuration:**
- **Criteria:** "All messages" ❌ (This will watch ALL emails!)
- **Subject:** Empty ❌
- **Include Words:** Empty ❌

### **Fix: Add Reply Filters**

**Option 1: Filter by Subject (Recommended)**

1. **Open Module 1** in Make.com
2. **Set "Subject" field:**
   ```
   Re: Consultation
   ```
   Or:
   ```
   Re: Thank You
   ```
   Or use "Has the words":
   ```
   Re: Consultation OR Re: Thank You
   ```

**Option 2: Filter by "Has the words" (More Flexible)**

1. **Set "Has the words" field:**
   ```
   Re: Consultation
   ```
   Or:
   ```
   In-Reply-To
   ```
   (Replies have "In-Reply-To" header)

**Option 3: Use Gmail Search (Most Flexible)**

1. **Change "Filter type"** from "Simple filter" to "Gmail search"
2. **Set Gmail search:**
   ```
   subject:"Re: Consultation" OR subject:"Re: Thank You"
   ```
   Or:
   ```
   inreplyto:*
   ```
   (All emails that are replies)

### **Recommended Configuration:**

```
Filter Type: Simple filter
Subject: Re: Consultation
OR
Has the words: Re: Consultation
Criteria: All messages (or is:unread)
```

---

## 🔗 **Step 2: Add Module 2 - HTTP Request to Webhook**

### **Add HTTP Module:**

1. **Click "+" after Module 1**
2. **Search:** "HTTP"
3. **Select:** "Make a request"
4. **Click "Add"**

### **Configure HTTP Module:**

1. **Method:** POST

2. **URL:**
   ```
   https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8
   ```

3. **Headers:**
   - Click "Add header"
   - **Name:** `Content-Type`
   - **Value:** `application/json`

4. **Request Content:**
   - **Content Type:** JSON
   - **Body:**
     ```json
     {
       "email": "{{1.fromEmail}}",
       "from": "{{1.fromEmail}}",
       "message": "{{1.fullTextBody}}",
       "body": "{{1.fullTextBody}}",
       "subject": "{{1.subject}}",
       "timestamp": "{{1.internalDate}}"
     }
     ```

   **Alternative (if fullTextBody is empty):**
   ```json
   {
     "email": "{{1.fromEmail}}",
     "from": "{{1.fromEmail}}",
     "message": "{{ifempty(1.fullTextBody; 1.snippet; 1.fullTextBody)}}",
     "body": "{{ifempty(1.fullTextBody; 1.snippet; 1.fullTextBody)}}",
     "subject": "{{1.subject}}",
     "timestamp": "{{1.internalDate}}"
   }
   ```

### **Module 2 Configuration Summary:**

```
Module: HTTP - Make a request
Method: POST
URL: https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8
Headers:
  Content-Type: application/json
Body (JSON):
{
  "email": "{{1.fromEmail}}",
  "from": "{{1.fromEmail}}",
  "message": "{{1.fullTextBody}}",
  "body": "{{1.fullTextBody}}",
  "subject": "{{1.subject}}",
  "timestamp": "{{1.internalDate}}"
}
```

---

## ✅ **Complete Scenario Flow**

```
Module 1: Gmail - Watch emails
    Filter: Subject contains "Re: Consultation"
    OR: Has the words "Re: Consultation"
    ↓
Module 2: HTTP - Make a request
    Method: POST
    URL: https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8
    Body: Email reply data
    ↓
Email Reply Processing Scenario (automatically triggered)
    ↓
Google Sheets updated
```

---

## 🔧 **Step 3: Update Module 1 Configuration**

### **Recommended Settings:**

1. **Filter Type:** Simple filter (or Gmail search for more control)

2. **Subject:** 
   ```
   Re: Consultation
   ```
   Or leave empty and use "Has the words"

3. **Has the words:**
   ```
   Re: Consultation
   ```
   Or:
   ```
   In-Reply-To
   ```

4. **Criteria:** 
   - `is:unread` (only new replies)
   - Or `all` (all replies, including read)

5. **Limit:** 10 (or as needed)

6. **Mark as read:** 
   - `false` (keep unread for manual review)
   - Or `true` (mark as read after processing)

---

## 🧪 **Step 4: Test the Complete Flow**

### **Test Process:**

1. **Ensure scenario is ON/active**

2. **Send a test reply:**
   - Send an email to `luxsess2001@gmail.com`
   - Subject: "Re: Consultation Request"
   - Body: "This is a test reply"

3. **Check execution:**
   - **Email Reply Watcher:** Should execute and forward to webhook
   - **Email Reply Processing:** Should execute and update Google Sheets

4. **Verify Google Sheets:**
   - Find row with sender's email
   - Check columns AD, AE, AF updated

---

## 📋 **Complete Configuration Checklist**

### **Module 1 (Gmail Watch):**
- [ ] Filter Type: Simple filter or Gmail search
- [ ] Subject: "Re: Consultation" (or use "Has the words")
- [ ] Has the words: "Re: Consultation" (optional)
- [ ] Criteria: is:unread or all
- [ ] Limit: 10
- [ ] Mark as read: false (recommended)

### **Module 2 (HTTP Request):**
- [ ] Method: POST
- [ ] URL: `https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8`
- [ ] Header: Content-Type: application/json
- [ ] Body: JSON with email, from, message, body, subject, timestamp
- [ ] Uses: `{{1.fromEmail}}`, `{{1.fullTextBody}}`, `{{1.subject}}`, `{{1.internalDate}}`

### **Scenario:**
- [ ] Scenario is ON/active
- [ ] Both modules configured
- [ ] Tested with real email reply

---

## 🎯 **Quick Fix: Add Module 2 Now**

**In Make.com:**

1. **Open "Email Reply Watcher" scenario**
2. **Click "+" after Module 1**
3. **Add:** "HTTP" → "Make a request"
4. **Configure:**
   - Method: POST
   - URL: `https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8`
   - Header: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "email": "{{1.fromEmail}}",
       "from": "{{1.fromEmail}}",
       "message": "{{1.fullTextBody}}",
       "body": "{{1.fullTextBody}}",
       "subject": "{{1.subject}}",
       "timestamp": "{{1.internalDate}}"
     }
     ```
5. **Save scenario**

---

## ⚠️ **Important: Add Filters to Module 1**

**Current issue:** Module 1 watches ALL emails, not just replies!

**Fix:**
1. **Open Module 1**
2. **Set "Subject" field:** `Re: Consultation`
3. **OR set "Has the words":** `Re: Consultation`
4. **Save**

**Without this filter, the scenario will process ALL emails, not just replies!**

---

## 📝 **Complete Blueprint Structure**

```json
{
  "name": "Email Reply Watcher",
  "flow": [
    {
      "id": 1,
      "module": "google-email:triggerWatchNewEmails",
      "parameters": {
        "subject": "Re: Consultation",  // ← ADD THIS
        "criteria": "is:unread",  // ← RECOMMENDED
        // ... other settings
      }
    },
    {
      "id": 2,  // ← ADD THIS MODULE
      "module": "http:MakeRequest",
      "parameters": {
        "method": "POST",
        "url": "https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "email": "{{1.fromEmail}}",
          "from": "{{1.fromEmail}}",
          "message": "{{1.fullTextBody}}",
          "body": "{{1.fullTextBody}}",
          "subject": "{{1.subject}}",
          "timestamp": "{{1.internalDate}}"
        }
      }
    }
  ]
}
```

---

## 🎯 **Action Required**

1. **Add filter to Module 1** (Subject: "Re: Consultation")
2. **Add Module 2** (HTTP request to webhook)
3. **Configure Module 2** with webhook URL and data mapping
4. **Test with real email reply**

**After these changes, your email reply automation will be complete!**

