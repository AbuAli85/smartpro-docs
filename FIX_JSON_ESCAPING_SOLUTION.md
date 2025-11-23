# Fix JSON Escaping - Complete Solution

## 🚨 **Problem: Special Characters in Email Body**

The email body contains:
- Newlines (`\r\n`)
- Quotes (`"`)
- Special characters
- URLs
- Arabic text

These break JSON formatting when used directly.

---

## ✅ **Solution: Use Make.com's JSON Escaping**

### **Option 1: Use Data Mapper (Best Solution)**

Instead of raw JSON string, use Make.com's visual data mapper:

1. **Open Module 2** (HTTP Request)
2. **Change Body Type:**
   - Find "Body type" or "Request content type"
   - Change from "Raw" to use mapper/structured data

3. **Map Fields:**
   - Use Make.com's mapper interface
   - Map each field:
     ```
     email → {{5.fromEmail}}
     from → {{5.fromEmail}}
     message → {{5.fullTextBody}}
     subject → {{5.subject}}
     body → {{5.fullTextBody}}
     timestamp → {{formatDate(5.internalDate; "YYYY-MM-DDTHH:mm:ss.SSSZ")}}
     ```

4. **Make.com automatically:**
   - Escapes special characters
   - Formats JSON correctly
   - Handles newlines/quotes

---

### **Option 2: Clean Body Text (Quick Fix)**

If you must use raw JSON, clean the body text:

**Updated Body:**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{replace(replace(replace(replace(5.fullTextBody; "\r\n"; " "); "\n"; " "); "\r"; " "); "\""; "'")}}",
  "subject": "{{replace(5.subject; "\""; "'")}}",
  "body": "{{replace(replace(replace(replace(5.fullTextBody; "\r\n"; " "); "\n"; " "); "\r"; " "); "\""; "'")}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

**This replaces:**
- `\r\n` (Windows newlines) → space
- `\n` (Unix newlines) → space
- `\r` (carriage returns) → space
- `"` (quotes) → `'` (single quotes)

---

### **Option 3: Use Snippet Instead of Full Body**

Use the email snippet (shorter, cleaner):

**Updated Body:**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{5.snippet}}",
  "subject": "{{5.subject}}",
  "body": "{{5.snippet}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

**Advantages:**
- Snippet is already cleaned
- Shorter text
- Less likely to have special characters
- May be sufficient for your use case

---

### **Option 4: Use Base64 Encoding**

Encode the body to avoid special characters:

**Updated Body:**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{base64(5.fullTextBody)}}",
  "subject": "{{5.subject}}",
  "body": "{{base64(5.fullTextBody)}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}",
  "encoded": true
}
```

**Note:** You'll need to decode in Client Reply Processing flow.

---

## 🎯 **Recommended Solution**

### **Best: Use Data Mapper**

1. **Open Module 2**
2. **Change to use mapper** (not raw JSON)
3. **Map fields visually**
4. **Make.com handles escaping automatically**

### **Quick Fix: Use Snippet**

If you need a quick fix:
- Use `{{5.snippet}}` instead of `{{5.fullTextBody}}`
- Snippet is cleaner and shorter
- May be sufficient for tracking replies

---

## 🔧 **Step-by-Step: Use Data Mapper**

1. **Open Module 2** (HTTP Request)

2. **Find Body Configuration:**
   - Look for "Body type" or "Request content"
   - Change from "Raw" to structured/mapped

3. **Add Fields:**
   - Click "Add field" or use mapper
   - Add each field:
     - `email` = `{{5.fromEmail}}`
     - `from` = `{{5.fromEmail}}`
     - `message` = `{{5.fullTextBody}}`
     - `subject` = `{{5.subject}}`
     - `body` = `{{5.fullTextBody}}`
     - `timestamp` = `{{formatDate(5.internalDate; "YYYY-MM-DDTHH:mm:ss.SSSZ")}}`

4. **Save:**
   - Make.com will automatically format as JSON
   - Special characters will be escaped

---

## 📋 **Quick Fix Checklist**

- [ ] Open Module 2 (HTTP Request)
- [ ] Change body type to use mapper (if available)
- [ ] Or update raw JSON with replace functions
- [ ] Or use snippet instead of fullTextBody
- [ ] Save module
- [ ] Test with reply email

---

## 🧪 **Testing**

After fixing:

1. **Save Module 2**
2. **Send test reply email:**
   - Subject: "Re: Consultation Request"
   - Body: "This is a test reply"
3. **Check execution:**
   - HTTP request should succeed
   - No JSON error
   - Webhook should receive data

---

## ✅ **Summary**

**Problem:** Email body contains special characters breaking JSON

**Solutions:**
1. **Use data mapper** (best - automatic escaping)
2. **Replace special characters** (quick fix)
3. **Use snippet** (simpler, shorter)
4. **Base64 encode** (if needed)

**Recommended:** Use Make.com data mapper for automatic JSON escaping

---

**Fix the JSON escaping using one of these methods and test again!** 🔧

