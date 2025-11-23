# Fix JSON Error in HTTP Request Body

## 🚨 **Error: Bad control character in string literal in JSON**

**Good News:**
- ✅ Gmail module working
- ✅ Filter passed (email detected as reply)
- ✅ HTTP request attempted

**Problem:**
- ❌ JSON body has invalid characters
- Email body contains special characters (newlines, quotes, etc.)
- Need to escape JSON properly

---

## 🔧 **Solution: Fix JSON Escaping**

The email body (`{{5.fullTextBody}}`) contains special characters that break JSON. We need to escape them properly.

### **Option 1: Use Make.com's JSON Builder (Recommended)**

Instead of raw JSON string, use Make.com's JSON builder:

1. **Open Module 2** (HTTP Request)
2. **Change Body Type:**
   - From: "Raw"
   - To: "JSON" (if available) or use mapper

3. **Use Data Mapper:**
   - Instead of raw JSON string
   - Map each field individually
   - Make.com will handle escaping

### **Option 2: Escape JSON in Body**

Update the body to properly escape special characters:

**Current (Problematic):**
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

**Fixed (Using replace function):**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{replace(replace(replace(5.fullTextBody; "\n"; "\\n"); "\r"; "\\r"); "\""; "\\\"")}}",
  "subject": "{{replace(5.subject; "\""; "\\\"")}}",
  "body": "{{replace(replace(replace(5.fullTextBody; "\n"; "\\n"); "\r"; "\\r"); "\""; "\\\"")}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

**Or Simpler (Using Make.com functions):**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{replace(5.fullTextBody; "\n"; " ")}}",
  "subject": "{{5.subject}}",
  "body": "{{replace(5.fullTextBody; "\n"; " ")}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

---

## ✅ **Best Solution: Use Make.com Data Mapper**

Instead of raw JSON, use Make.com's visual mapper:

### **Step-by-Step:**

1. **Open Module 2** (HTTP Request)

2. **Change Body Type:**
   - Find "Body type" or "Request content"
   - Change from "Raw" to use mapper

3. **Map Fields:**
   - Use Make.com's data mapper interface
   - Map each field:
     - `email` = `{{5.fromEmail}}`
     - `from` = `{{5.fromEmail}}`
     - `message` = `{{5.fullTextBody}}`
     - `subject` = `{{5.subject}}`
     - `body` = `{{5.fullTextBody}}`
     - `timestamp` = `{{formatDate(5.internalDate; "YYYY-MM-DDTHH:mm:ss.SSSZ")}}`

4. **Make.com will automatically:**
   - Escape special characters
   - Format JSON correctly
   - Handle newlines/quotes

---

## 🔧 **Quick Fix: Replace Newlines**

If you want to keep raw JSON, replace newlines:

**Updated Body:**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{replace(replace(5.fullTextBody; "\n"; " "); "\r"; "")}}",
  "subject": "{{5.subject}}",
  "body": "{{replace(replace(5.fullTextBody; "\n"; " "); "\r"; "")}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

**This will:**
- Replace newlines (`\n`) with spaces
- Remove carriage returns (`\r`)
- Keep JSON valid

---

## 🧪 **Testing**

After fixing:

1. **Save Module 2**
2. **Send test reply email:**
   - Subject: "Re: Consultation Request"
   - Body: "This is a test reply with special characters: newline\n and quotes\""
3. **Check execution:**
   - HTTP request should succeed
   - No JSON error
   - Webhook should receive data

---

## 📋 **Recommended Approach**

**Use Make.com Data Mapper** (if available):
- More reliable
- Automatic escaping
- Easier to maintain

**Or use replace function:**
- Replace newlines with spaces
- Remove problematic characters
- Keep JSON valid

---

## ✅ **Quick Fix Checklist**

- [ ] Open Module 2 (HTTP Request)
- [ ] Find "Request content" or "Body" field
- [ ] Update body to escape special characters
- [ ] Or use Make.com data mapper
- [ ] Save module
- [ ] Test with reply email

---

## 🎯 **Summary**

**Problem:** JSON body contains unescaped special characters

**Solution:** 
1. Use Make.com data mapper (best)
2. Or replace newlines/quotes in body

**Action:** Update Module 2 body to properly escape JSON

---

**Fix the JSON escaping in Module 2 body and test again!** 🔧

