# Fix JSON Escaping - Detailed Solution

## 🚨 **Problem Identified**

The JSON body contains **unescaped special characters**:
- `\r\n` (carriage return + newline) in the email body
- Quotes (`"`) within the message text
- These break JSON parsing

**Current Issue:**
```json
{
  "message": "علّق folorunsho olanrewaju‏ على مشاركتك.\r\n\r\n\"what you're try to say..."
}
```

The `\r\n` and `\"` are being interpreted as literal characters, not escaped sequences.

---

## ✅ **Solution: Escape Special Characters**

### **Option 1: Use Replace Functions (Recommended for Raw JSON)**

Update the HTTP body to properly escape characters:

**Updated Body:**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{replace(replace(replace(replace(5.fullTextBody; "\r"; "\\r"); "\n"; "\\n"); "\""; "\\\""); "\t"; "\\t")}}",
  "subject": "{{replace(5.subject; "\""; "\\\"")}}",
  "body": "{{replace(replace(replace(replace(5.fullTextBody; "\r"; "\\r"); "\n"; "\\n"); "\""; "\\\""); "\t"; "\\t")}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

**This escapes:**
- `\r` → `\\r` (carriage return)
- `\n` → `\\n` (newline)
- `"` → `\"` (quotes)
- `\t` → `\\t` (tabs)

---

### **Option 2: Use Snippet (Simpler)**

Use the email snippet instead of full body:

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
- May be sufficient for tracking replies

---

### **Option 3: Use Make.com Data Mapper (Best Solution)**

If Make.com supports it, use the visual data mapper:

1. **Open Module 2** (HTTP Request)
2. **Change Body Type:**
   - From: "Raw"
   - To: Use mapper/structured data
3. **Map Fields:**
   - `email` → `{{5.fromEmail}}`
   - `from` → `{{5.fromEmail}}`
   - `message` → `{{5.fullTextBody}}`
   - `subject` → `{{5.subject}}`
   - `body` → `{{5.fullTextBody}}`
   - `timestamp` → `{{formatDate(5.internalDate; "YYYY-MM-DDTHH:mm:ss.SSSZ")}}`

Make.com will automatically escape special characters.

---

### **Option 4: Replace Newlines with Spaces (Quick Fix)**

Replace newlines with spaces to avoid escaping:

**Updated Body:**
```json
{
  "email": "{{5.fromEmail}}",
  "from": "{{5.fromEmail}}",
  "message": "{{replace(replace(replace(5.fullTextBody; "\r\n"; " "); "\n"; " "); "\r"; " ")}}",
  "subject": "{{5.subject}}",
  "body": "{{replace(replace(replace(5.fullTextBody; "\r\n"; " "); "\n"; " "); "\r"; " ")}}",
  "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
}
```

**This replaces:**
- `\r\n` → space
- `\n` → space
- `\r` → space

---

## 🎯 **Recommended Solution**

### **Best: Use Snippet (Option 2)**

For email reply tracking, the snippet is usually sufficient:
- Contains the main message
- Already cleaned
- Shorter and simpler
- Less likely to break

### **If You Need Full Body: Use Replace Functions (Option 1)**

If you need the complete email body, use the replace functions to properly escape characters.

---

## 🔧 **Step-by-Step: Update Module 2**

1. **Open Module 2** (HTTP Request) in Make.com

2. **Find "Request content" or "Body" field**

3. **Update the body JSON:**

   **If using snippet (recommended):**
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

   **If using full body with escaping:**
   ```json
   {
     "email": "{{5.fromEmail}}",
     "from": "{{5.fromEmail}}",
     "message": "{{replace(replace(replace(replace(5.fullTextBody; "\r"; "\\r"); "\n"; "\\n"); "\""; "\\\""); "\t"; "\\t")}}",
     "subject": "{{replace(5.subject; "\""; "\\\"")}}",
     "body": "{{replace(replace(replace(replace(5.fullTextBody; "\r"; "\\r"); "\n"; "\\n"); "\""; "\\\""); "\t"; "\\t")}}",
     "timestamp": "{{formatDate(5.internalDate; \"YYYY-MM-DDTHH:mm:ss.SSSZ\")}}"
   }
   ```

4. **Save Module 2**

5. **Test with a reply email**

---

## 📋 **Quick Fix Checklist**

- [ ] Open Module 2 (HTTP Request)
- [ ] Find "Request content" field
- [ ] Update body to use snippet OR escape special characters
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

**Problem:** Unescaped special characters (`\r\n`, quotes) in JSON body

**Solutions:**
1. **Use snippet** (simplest - recommended)
2. **Escape characters** with replace functions
3. **Use data mapper** (if available)
4. **Replace newlines with spaces** (quick fix)

**Recommended:** Use snippet (`{{5.snippet}}`) for message and body fields

---

**Update Module 2 body to use snippet or properly escape characters!** 🔧

