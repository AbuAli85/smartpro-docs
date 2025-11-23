# Fix Gmail Module Data Mapping

## ✅ **Good News: Gmail Module Added!**

You've successfully switched to the Gmail module! However, there's a **data mapping issue** that needs to be fixed.

---

## 🚨 **Error: Module References Non-Existing Module '3'**

**Problem:**
- Module 1 is now **Gmail module** (ID: 5)
- Module 2 still references `{{3.*}}` (old module ID)
- Need to update to `{{5.*}}` (new module ID)

---

## 🔧 **Fix: Update Module 2 Data Mapping**

### **Step 1: Update Module 2 Filter**

**Current (Wrong):**
```
{{3.subject}} contains "Re:"
```

**Fix to:**
```
{{5.subject}} contains "Re:"
```

### **Step 2: Update Module 2 HTTP Body**

**Current (Wrong):**
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

**Fix to (Gmail Module Fields):**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{5.fullTextBody}}",
  "subject": "{{5.subject}}",
  "body": "{{5.fullTextBody}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

---

## 📊 **Gmail Module Field Mapping**

### **Gmail Module Output Fields:**

| Old Field | New Gmail Field | Description |
|-----------|----------------|-------------|
| `{{3.from}}` | `{{5.fromEmail}}` | Sender email address |
| `{{3.textPlain}}` | `{{5.fullTextBody}}` | Email body (plain text) |
| `{{3.subject}}` | `{{5.subject}}` | Email subject |
| `{{3.date}}` | `{{5.internalDate}}` | Email date/timestamp |

### **Alternative Fields Available:**

- `{{5.fromName}}` - Sender name
- `{{5.htmlBody}}` - HTML body (if needed)
- `{{5.snippet}}` - Email snippet
- `{{5.to}}` - Recipient(s)

---

## 🔧 **Step-by-Step Fix**

### **Step 1: Update Module 2 Filter**

1. Open "Email Watch - Client Replies" scenario
2. Click on Module 2 (HTTP - Make a request)
3. Find the **Filter** section
4. Change: `{{3.subject}}` → `{{5.subject}}`
5. Save

### **Step 2: Update Module 2 HTTP Body**

1. In Module 2, find **Request content** or **Body** field
2. Update the JSON body:

**Replace:**
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

**With:**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{5.fullTextBody}}",
  "subject": "{{5.subject}}",
  "body": "{{5.fullTextBody}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

3. Save module

### **Step 3: Add Gmail Search Query (Optional but Recommended)**

In Module 1 (Gmail), add a search query to only watch for replies:

1. Click on Module 1 (Gmail - Watch emails)
2. Find **Query** field
3. Add: `subject:"Re:"`
4. This will only watch emails with "Re:" in subject
5. Save

---

## 📋 **Complete Updated Configuration**

### **Module 1: Gmail - Watch Emails**

**Settings:**
- **Connection:** Gmail (luxsess2001@gmail.com) ✅
- **Filter Type:** Gmail filter ✅
- **Format:** Full content ✅
- **Query:** `subject:"Re:"` (add this for replies only)
- **Limit:** 1 ✅

### **Module 2: HTTP Request (Updated)**

**Filter (Updated):**
```
{{5.subject}} contains "Re:"
```

**Body (Updated):**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{5.fullTextBody}}",
  "subject": "{{5.subject}}",
  "body": "{{5.fullTextBody}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

---

## 🧪 **Testing**

### **After Fixing:**

1. **Save Scenario:**
   - Save all changes
   - Error message should disappear

2. **Activate Scenario:**
   - Toggle scenario to **ON**

3. **Send Test Email:**
   - Send reply to: `luxsess2001@gmail.com`
   - Subject: "Re: Consultation Request"
   - Check if it processes

4. **Verify:**
   - Check Make.com execution
   - Check Google Sheets updates

---

## ⚠️ **Important Notes**

### **Gmail Module Field Differences:**

1. **Email Address:**
   - Old: `{{3.from}}` (might include name)
   - New: `{{5.fromEmail}}` (just email)

2. **Email Body:**
   - Old: `{{3.textPlain}}`
   - New: `{{5.fullTextBody}}` (full text)
   - Alternative: `{{5.htmlBody}}` (HTML)

3. **Date:**
   - Old: `{{3.date}}`
   - New: `{{5.internalDate}}`

### **Timestamp Format:**

If `formatDate(5.internalDate; ...)` doesn't work, try:
- `{{formatDate(5.internalDate; "YYYY-MM-DDTHH:mm:ss.SSSZ")}}`
- Or: `{{now}}` (current time)

---

## ✅ **Quick Fix Checklist**

- [ ] Update Module 2 filter: `{{3.subject}}` → `{{5.subject}}`
- [ ] Update HTTP body: `{{3.from}}` → `{{5.fromEmail}}`
- [ ] Update HTTP body: `{{3.textPlain}}` → `{{5.fullTextBody}}`
- [ ] Update HTTP body: `{{3.subject}}` → `{{5.subject}}`
- [ ] Update HTTP body: `{{3.date}}` → `{{5.internalDate}}`
- [ ] Add Gmail query: `subject:"Re:"` (optional)
- [ ] Save scenario
- [ ] Test with real email

---

## 🎯 **Summary**

**Problem:** Module 2 references old module ID `3` instead of new Gmail module ID `5`

**Fix:** Update all `{{3.*}}` references to `{{5.*}}` and use Gmail field names

**Fields to Update:**
- `{{3.from}}` → `{{5.fromEmail}}`
- `{{3.textPlain}}` → `{{5.fullTextBody}}`
- `{{3.subject}}` → `{{5.subject}}`
- `{{3.date}}` → `{{5.internalDate}}`

---

**Update the data mapping in Module 2 to fix the error!** 🔧

