# Email Reply Webhook - Quick Test Guide

## 🔗 **Your Webhook URL**

```
https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8
```

**Status:** ✅ Active (returns "Accepted")

---

## ⚡ **Quick Test (PowerShell)**

### **Step 1: Update Test Email**

**Important:** The test email must exist in your Google Sheets first!

1. **Open the test script:** `TEST_EMAIL_REPLY_WEBHOOK.ps1`
2. **Change this line:**
   ```powershell
   $testEmail = "test@example.com"  # Change this!
   ```
3. **Replace with an email that exists in Google Sheets:**
   ```powershell
   $testEmail = "your-email@example.com"  # Use real email from your sheet
   ```

### **Step 2: Run Test**

1. **Open PowerShell**
2. **Navigate to script location:**
   ```powershell
   cd "C:\Users\HP\OneDrive\Documents\GitHub\smartpro-docs"
   ```
3. **Run script:**
   ```powershell
   .\TEST_EMAIL_REPLY_WEBHOOK.ps1
   ```

### **Step 3: Verify Results**

1. **Check Make.com:**
   - Open "Email Reply Processing" scenario
   - Check "Execution history"
   - Should see new execution ✅

2. **Check Google Sheets:**
   - Open "Smartpro Leads" → "leads"
   - Find row with test email
   - Verify:
     - Column AD (29): `TRUE` ✅
     - Column AE (30): Timestamp ✅
     - Column AF (31): Reply message ✅

---

## 🧪 **Manual Test (PowerShell One-Liner)**

If you prefer to test manually:

```powershell
$body = @{
    email = "test@example.com"
    from = "test@example.com"
    message = "Test reply - $(Get-Date)"
    body = "Test reply - $(Get-Date)"
    subject = "Re: Consultation Request"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Replace `test@example.com`** with an email that exists in your Google Sheets!

---

## 🧪 **Manual Test (cURL)**

If you prefer cURL:

```bash
curl -X POST https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "from": "test@example.com",
    "message": "Test reply message",
    "body": "Test reply message",
    "subject": "Re: Consultation Request"
  }'
```

**Replace `test@example.com`** with an email that exists in your Google Sheets!

---

## ⚠️ **Important: Test Email Must Exist First**

Before testing, ensure the email exists in Google Sheets:

### **Option 1: Submit Form**
1. Go to your consultation form
2. Submit with email: `test@example.com`
3. Wait for it to be saved to Google Sheets
4. Then run the test

### **Option 2: Manual Entry**
1. Open "Smartpro Leads" → "leads" sheet
2. Add a new row
3. Put email in Column C
4. Then run the test

---

## ✅ **What to Check After Test**

### **Make.com:**
- [ ] Execution history shows new run
- [ ] Module 1 (Webhook) completed
- [ ] Module 2 (Search) found row
- [ ] Module 3 (Update) completed
- [ ] No errors

### **Google Sheets:**
- [ ] Row found with test email
- [ ] Column AD (29): `TRUE` (not "TURE")
- [ ] Column AE (30): Has timestamp
- [ ] Column AF (31): Contains reply message

---

## 🐛 **Troubleshooting**

### **Issue: "No execution in Make.com"**

**Check:**
1. Scenario is ON/active
2. Webhook URL is correct
3. Internet connection works

**Fix:**
- Verify scenario toggle is ON
- Test webhook URL directly in browser (should return "Accepted")

### **Issue: "Search doesn't find row"**

**Check:**
1. Email exists in Google Sheets Column C
2. Email format matches exactly (case, spaces)
3. Filter is using Column C

**Fix:**
- Use exact email from Google Sheets
- Check email has no extra spaces
- Verify filter: Column C = `{{lower(trim(1.email))}}`

### **Issue: "Update fails"**

**Check:**
1. Row number is correct
2. Column indices are correct (29, 30, 31)
3. Google Sheets permissions

**Fix:**
- Verify `{{2.__ROW_NUMBER__}}` has value
- Check columns AD=29, AE=30, AF=31
- Ensure Google account has edit permissions

---

## 📋 **Test Data Structure**

Your webhook expects this data format:

```json
{
  "email": "client@example.com",
  "from": "client@example.com",
  "message": "Reply message text",
  "body": "Reply message text",
  "subject": "Re: Consultation Request",
  "timestamp": "2025-01-22T10:00:00Z"
}
```

**Required fields:**
- `email` or `from` - Client's email address
- `message` or `body` - Reply message content

**Optional fields:**
- `subject` - Email subject
- `timestamp` - Reply timestamp

---

## 🎯 **Quick Reference**

**Webhook URL:**
```
https://hook.eu2.make.com/7e5ad8omhcmu8gcn1794m60d476fqqy8
```

**Spreadsheet:**
- Name: "Smartpro Leads"
- Sheet: "leads"
- Email Column: C (index 2)
- client_replied: AD (index 29)
- client_replied_at: AE (index 30)
- notes: AF (index 31)

---

## 🚀 **Ready to Test!**

1. **Ensure test email exists in Google Sheets**
2. **Run the test script** or use manual command
3. **Check Make.com execution history**
4. **Verify Google Sheets updates**

**Your webhook is active and ready!** ✅

