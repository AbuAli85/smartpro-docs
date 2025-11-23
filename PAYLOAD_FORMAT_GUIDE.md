# Payload Format Guide - Email Reply Webhook

## 📋 **Expected Payload Format**

Make.com webhook expects a **single object**, not an array.

### ✅ **Correct Format (Single Object)**
```json
{
    "from": "luxsess2001@gmail.com",
    "email": "luxsess2001@gmail.com",
    "timestamp": "2025-11-23T21:24:09.241Z",
    "subject": "Re: Consultation Request",
    "message": "Thank you! I would like to register in Oman...",
    "body": "Thank you! I would like to register in Oman..."
}
```

### ❌ **Incorrect Format (Array)**
```json
[
    {
        "from": "luxsess2001@gmail.com",
        "email": "luxsess2001@gmail.com",
        ...
    }
]
```

---

## 🔧 **Why This Matters**

Make.com data mapping uses:
- `{{1.email}}` - expects first bundle to be an object
- If you send an array, it might need `{{1[0].email}}` which won't work with standard mapping

---

## 📝 **PowerShell Script Format**

The test script now ensures a single object:

```powershell
$bodyObject = @{
    email = "luxsess2001@gmail.com"
    message = "Test message"
    # ... other fields
}

# Convert to JSON - single object
$body = $bodyObject | ConvertTo-Json -Depth 10 -Compress
```

---

## 🔍 **Verify Payload Format**

### **Method 1: Check Script Output**
The updated script now shows the payload before sending:
```powershell
.\TEST_THIS_SUBMISSION.ps1
# Look for "Payload being sent:" - should show single object
```

### **Method 2: Check Make.com Execution**
1. Go to Make.com → Execution history
2. Click on the latest execution
3. Click Module 1 (Custom Webhook)
4. Check "Data structure" or "Output"
5. Verify it shows a single object, not an array

---

## 🐛 **If Payload is Array**

If Make.com receives an array, you have two options:

### **Option 1: Fix the Sender (Recommended)**
- Update whatever is sending the webhook
- Ensure it sends a single object, not an array

### **Option 2: Update Make.com Mapping**
- In Module 1, add an "Array aggregator" or "Iterator"
- Or update Module 2 mapping to use `{{1[0].email}}` instead of `{{1.email}}`

**Note:** Option 1 is better - fix the source!

---

## 📊 **Current Payload Structure**

Based on your payload, the structure is:
```json
{
    "from": "string",        // Sender email
    "email": "string",       // Email address (same as from)
    "timestamp": "ISO8601",  // Timestamp
    "subject": "string",     // Email subject
    "message": "string",     // Reply message
    "body": "string"         // Reply body (same as message)
}
```

**All fields are strings** - Make.com will handle the timestamp conversion.

---

## ✅ **Verification Checklist**

- [ ] Payload is a single object (not array)
- [ ] All required fields present: email, message, from
- [ ] Email matches Google Sheets column C exactly
- [ ] JSON is valid (no syntax errors)
- [ ] Make.com receives the data correctly

---

## 🧪 **Test Payload Format**

Run the updated test script:
```powershell
.\TEST_THIS_SUBMISSION.ps1
```

It will now:
1. Show the payload before sending
2. Verify it's a single object
3. Send to webhook
4. Check response

---

**The updated script now ensures correct format!** ✅

