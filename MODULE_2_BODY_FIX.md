# Module 2 Body - Direct Fix

## 🚨 **Current Problem**

The JSON body contains unescaped `\r\n` and quotes in the `message` field, causing JSON parsing errors.

---

## ✅ **Solution: Use Snippet (Recommended)**

Replace the entire body in Module 2 with this:

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

**Why snippet?**
- Already cleaned and formatted
- Shorter text (less likely to break)
- Contains the main message content
- Perfect for reply tracking

---

## 🔧 **Steps to Fix**

1. **Open Make.com**
2. **Open "Email Watch - Client Replies" scenario**
3. **Click Module 2** (HTTP Request)
4. **Find "Request content" or "Body" field**
5. **Delete the current body content**
6. **Paste the JSON above**
7. **Save the module**
8. **Test again**

---

## ✅ **Alternative: If You Need Full Body**

If you absolutely need the full email body, use this (with proper escaping):

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

This replaces all newlines with spaces, avoiding JSON escaping issues.

---

## 🎯 **Recommended Action**

**Use the snippet version** (first option) - it's simpler and sufficient for tracking email replies.

---

**Copy the snippet version above and paste it into Module 2's body field!** 🔧

