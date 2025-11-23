# Test Reply Flow for Specific Submission

## 📋 **Current Submission Details**

- **Timestamp:** 2025-11-23T17:19:48.253Z
- **Client Name:** Test User
- **Email:** luxsess2001@gmail.com
- **Phone:** 96812345678
- **Business:** Test Business (Corporation)
- **Service:** Company Formation
- **Status:** 
  - Email Status: `Sent` ✅
  - Response Status: `No Response` ⏳
  - client_replied: Empty (waiting for reply)
  - client_replied_at: Empty
  - notes: Empty

---

## 🧪 **Test: Send Reply for This Submission**

### **Quick Test Command (PowerShell)**

```powershell
# Test reply for this specific submission
$body = @{
    email = "luxsess2001@gmail.com"
    message = "Thank you! I would like to register in Oman. My main business activity will be IT consulting services. I'm planning to set this up as a sole proprietorship initially."
    subject = "Re: Consultation Request"
    from = "luxsess2001@gmail.com"
    body = "Thank you! I would like to register in Oman. My main business activity will be IT consulting services. I'm planning to set this up as a sole proprietorship initially."
    timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### **Expected Result After Test:**

The Google Sheets row should update to:
- **Column AD (29) - client_replied:** `TRUE` ✅
- **Column AE (30) - client_replied_at:** `[current timestamp]` ✅
- **Column AF (31) - notes:** `Reply: Thank you! I would like to register in Oman...` ✅
- **Column U (20) - Response Status:** Should update to `Responded` (if your flow updates this)

---

## 📊 **Before vs After Comparison**

### **Before Reply:**
```
Email Status: Sent
Response Status: No Response
client_replied: [empty]
client_replied_at: [empty]
notes: [empty]
```

### **After Reply (Expected):**
```
Email Status: Sent
Response Status: Responded (or updated)
client_replied: TRUE
client_replied_at: 2025-11-23T[timestamp]
notes: Reply: [reply message]
```

---

## 🔍 **Verification Steps**

### **Step 1: Send Test Reply**
Run the PowerShell command above.

### **Step 2: Check Make.com**
1. Go to Make.com → "Email Reply Processing" scenario
2. Check execution history
3. Verify all 3 modules executed successfully:
   - ✅ Module 1: Webhook received data
   - ✅ Module 2: Found row with email `luxsess2001@gmail.com`
   - ✅ Module 3: Updated row successfully

### **Step 3: Check Google Sheets**
1. Open "Smartpro Leads" spreadsheet
2. Go to "leads" sheet
3. Find the row with timestamp `2025-11-23T17:19:48.253Z`
4. Verify updates:
   - Column AD (29) = `TRUE`
   - Column AE (30) = timestamp
   - Column AF (31) = contains reply message

---

## 📝 **Test Reply Messages**

### **Test 1: Simple Reply**
```
"Thank you for the information. I'm interested in proceeding."
```

### **Test 2: Detailed Reply (Answers Questions)**
```
"Thank you! I would like to register in Oman. My main business activity will be IT consulting services. I'm planning to set this up as a sole proprietorship initially."
```

### **Test 3: Request for Call**
```
"I would like to schedule a call to discuss the details further. Please let me know your availability."
```

---

## 🎯 **What to Look For**

### **✅ Success Indicators:**
- Make.com scenario executes without errors
- Google Sheets row is found (Module 2 succeeds)
- All three columns update correctly
- Timestamp is in correct format
- Reply message is appended to notes

### **⚠️ Potential Issues:**
- Row not found → Check email matching
- Update fails → Check Google Sheets permissions
- Wrong row updated → Check row number reference
- Formatting issues → Check formula in Module 3

---

## 🔄 **Multiple Replies Test**

You can test multiple replies to the same submission:

### **Reply 1:**
```powershell
$body = @{
    email = "luxsess2001@gmail.com"
    message = "First reply: I'm interested in Oman registration."
} | ConvertTo-Json
```

### **Reply 2 (After Reply 1):**
```powershell
$body = @{
    email = "luxsess2001@gmail.com"
    message = "Second reply: I have additional questions about the process."
} | ConvertTo-Json
```

**Expected:** Notes should contain both replies:
```
Reply: First reply: I'm interested in Oman registration.

Reply: Second reply: I have additional questions about the process.
```

---

## 📋 **Quick Test Checklist**

- [ ] Update webhook URL in test command (if needed)
- [ ] Run PowerShell test command
- [ ] Check Make.com execution history
- [ ] Verify Google Sheets updates:
  - [ ] Column AD = TRUE
  - [ ] Column AE = timestamp
  - [ ] Column AF = reply message
- [ ] Verify no errors in Make.com logs
- [ ] Test multiple replies (optional)

---

## 🚀 **Next Steps After Testing**

1. **If Test Succeeds:**
   - ✅ Flow is working correctly
   - ⚠️ Set up email service forwarding
   - ⚠️ Test with real email reply

2. **If Test Fails:**
   - Check Make.com execution logs
   - Verify webhook URL is correct
   - Check Google Sheets permissions
   - Review troubleshooting guide

---

## 📊 **Data Flow for This Submission**

```
Submission Created: 2025-11-23T17:19:48.253Z
    ↓
Email Sent: "Thank you for contacting us..."
    ↓
[WAITING FOR REPLY]
    ↓
Reply Received → Webhook → Make.com → Google Sheets Update
    ↓
Row Updated:
  - client_replied: TRUE
  - client_replied_at: [timestamp]
  - notes: Reply: [message]
```

---

**Ready to test?** Run the PowerShell command above and check the results! 🧪

