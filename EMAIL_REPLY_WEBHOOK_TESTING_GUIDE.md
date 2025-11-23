# Email Reply Webhook - Complete Testing Guide

## 🧪 **Testing Methods**

There are **3 ways** to test your email reply webhook:

1. **Direct Webhook Test** - Send test data directly to webhook
2. **Make.com Test Run** - Use Make.com's built-in testing
3. **Real Email Reply Test** - Test with actual email reply

---

## 🔧 **Method 1: Direct Webhook Test (Easiest)**

### **Step 1: Get Your Webhook URL**

1. **Open Make.com**
2. **Open your scenario:** "Email Reply Processing"
3. **Click Module 1** (Custom Webhook)
4. **Copy the webhook URL**
   - Format: `https://hook.eu2.make.com/[your-hook-id]`
   - Or check Hook ID: 3622716

### **Step 2: Test with PowerShell**

**Open PowerShell** and run:

```powershell
# Test data
$body = @{
    email = "test@example.com"
    from = "test@example.com"
    message = "This is a test reply message"
    body = "This is a test reply message"
    subject = "Re: Consultation Request"
    timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json

# Send to webhook
$response = Invoke-WebRequest -Uri "https://hook.eu2.make.com/[YOUR_WEBHOOK_URL]" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

# Check response
Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
Write-Host "Response: $($response.Content)" -ForegroundColor Cyan
```

**Replace `[YOUR_WEBHOOK_URL]`** with your actual webhook URL.

### **Step 3: Test with cURL (Alternative)**

**Open Command Prompt** or **Terminal** and run:

```bash
curl -X POST https://hook.eu2.make.com/[YOUR_WEBHOOK_URL] \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "from": "test@example.com",
    "message": "This is a test reply message",
    "body": "This is a test reply message",
    "subject": "Re: Consultation Request"
  }'
```

### **Step 4: Verify Results**

1. **Check Make.com:**
   - Open scenario execution history
   - Should see new execution
   - Check if all modules completed successfully

2. **Check Google Sheets:**
   - Open "Smartpro Leads" → "leads" sheet
   - Find row with email: `test@example.com`
   - Verify:
     - Column AD (29): `TRUE` ✅
     - Column AE (30): Has timestamp ✅
     - Column AF (31): Contains "Reply: This is a test reply message" ✅

---

## 🎯 **Method 2: Make.com Test Run**

### **Step 1: Prepare Test Data**

1. **First, ensure you have a submission in Google Sheets:**
   - Submit a form with email: `test@example.com`
   - Or manually add a row with email in Column C

### **Step 2: Run Module 1 Test**

1. **Open Make.com scenario**
2. **Click Module 1** (Custom Webhook)
3. **Click "Run once"** or test button
4. **Enter test data:**
   ```json
   {
     "email": "test@example.com",
     "from": "test@example.com",
     "message": "This is a test reply",
     "body": "This is a test reply",
     "subject": "Re: Consultation Request"
   }
   ```
5. **Click "OK" or "Run"**

### **Step 3: Check Each Module**

**Module 1 (Webhook):**
- ✅ Should show received data
- ✅ Check: `{{1.email}}` has value

**Module 2 (Google Sheets Search):**
- ✅ Should find the row
- ✅ Check: `{{2.__ROW_NUMBER__}}` has value
- ✅ Check: `{{2.values[2]}}` contains email

**Module 3 (Google Sheets Update):**
- ✅ Should update successfully
- ✅ Check: No errors

### **Step 4: Verify Google Sheets**

1. **Open Google Sheets:** "Smartpro Leads" → "leads"
2. **Find the row** with email: `test@example.com`
3. **Check updates:**
   - Column AD (29): `TRUE`
   - Column AE (30): Current timestamp
   - Column AF (31): Reply message

---

## 📧 **Method 3: Real Email Reply Test**

### **Step 1: Create Test Submission**

1. **Submit a form** with a real email address you control
   - Email: `your-test-email@example.com`
   - Wait for confirmation email

### **Step 2: Reply to Confirmation Email**

1. **Open your email** (Gmail/Outlook)
2. **Find the confirmation email**
3. **Click "Reply"**
4. **Type a test message:** "This is a test reply"
5. **Send the reply**

### **Step 3: Configure Email Service**

**If using Make.com Email Module:**

1. **Create scenario** to watch for email replies
2. **Add module:** "Gmail" → "Watch emails" or "Outlook" → "Watch emails"
3. **Configure:**
   - Watch for: Replies
   - Filter: Subject contains "Re: Consultation" or "Re: Thank You"
4. **Add HTTP module:**
   - Method: POST
   - URL: Your webhook URL
   - Body:
     ```json
     {
       "email": "{{1.from}}",
       "from": "{{1.from}}",
       "message": "{{1.body}}",
       "body": "{{1.body}}",
       "subject": "{{1.subject}}"
     }
     ```

### **Step 4: Verify**

1. **Check Make.com execution history**
2. **Check Google Sheets updates**
3. **Verify reply was processed**

---

## ✅ **Testing Checklist**

### **Before Testing:**

- [ ] Scenario is ON/active
- [ ] Webhook URL is copied
- [ ] Test email exists in Google Sheets (or submit a form first)
- [ ] Google Sheets is accessible

### **During Testing:**

- [ ] Webhook receives data (Module 1)
- [ ] Search finds the row (Module 2)
- [ ] Update succeeds (Module 3)
- [ ] No errors in execution

### **After Testing:**

- [ ] Google Sheets Column AD (29) = `TRUE`
- [ ] Google Sheets Column AE (30) = timestamp
- [ ] Google Sheets Column AF (31) = reply message
- [ ] Execution history shows success

---

## 🐛 **Troubleshooting**

### **Issue 1: Webhook Not Receiving Data**

**Symptoms:**
- No execution in Make.com
- Webhook returns error

**Fix:**
1. **Check webhook URL** is correct
2. **Verify scenario is ON**
3. **Check webhook is active** (should return "Accepted")
4. **Test with PowerShell/cURL** to verify webhook works

### **Issue 2: Search Doesn't Find Row**

**Symptoms:**
- Module 2 returns empty result
- `{{2.__ROW_NUMBER__}}` is empty

**Fix:**
1. **Check email format** matches exactly (case, spaces)
2. **Verify email exists** in Google Sheets Column C
3. **Check filter:** Column C = `{{lower(trim(1.email))}}`
4. **Test with known email** that exists in sheet

### **Issue 3: Update Fails**

**Symptoms:**
- Module 3 shows error
- Google Sheets not updated

**Fix:**
1. **Check row number:** `{{2.__ROW_NUMBER__}}` has value
2. **Verify column indices:** 29, 30, 31 are correct
3. **Check Google Sheets permissions**
4. **Verify spreadsheet ID** is correct

### **Issue 4: Wrong Column Updated**

**Symptoms:**
- Updates wrong column
- Data in wrong place

**Fix:**
1. **Check column mapping:**
   - Column 29 = AD (client_replied)
   - Column 30 = AE (client_replied_at)
   - Column 31 = AF (notes)
2. **Verify in Google Sheets** which columns these are
3. **Update column indices** if needed

---

## 📝 **Quick Test Scripts**

### **PowerShell Test Script**

Save as `test-email-reply.ps1`:

```powershell
# Email Reply Webhook Test Script
$webhookUrl = "https://hook.eu2.make.com/[YOUR_WEBHOOK_URL]"
$testEmail = "test@example.com"

Write-Host "Testing Email Reply Webhook..." -ForegroundColor Yellow
Write-Host "Webhook: $webhookUrl" -ForegroundColor Gray
Write-Host "Test Email: $testEmail" -ForegroundColor Gray
Write-Host ""

# Test data
$body = @{
    email = $testEmail
    from = $testEmail
    message = "Test reply message - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    body = "Test reply message - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    subject = "Re: Consultation Request"
    timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json

try {
    Write-Host "Sending test data..." -ForegroundColor Cyan
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $body `
        -ErrorAction Stop

    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Check Make.com execution history" -ForegroundColor White
    Write-Host "2. Verify Google Sheets updates" -ForegroundColor White
    Write-Host "3. Check Column AD (29) = TRUE" -ForegroundColor White
    Write-Host "4. Check Column AE (30) = timestamp" -ForegroundColor White
    Write-Host "5. Check Column AF (31) = reply message" -ForegroundColor White
}
catch {
    Write-Host "❌ Error!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
```

**Usage:**
1. Replace `[YOUR_WEBHOOK_URL]` with your webhook URL
2. Replace `test@example.com` with test email
3. Run: `.\test-email-reply.ps1`

### **cURL Test Script**

Save as `test-email-reply.sh`:

```bash
#!/bin/bash

WEBHOOK_URL="https://hook.eu2.make.com/[YOUR_WEBHOOK_URL]"
TEST_EMAIL="test@example.com"

echo "Testing Email Reply Webhook..."
echo "Webhook: $WEBHOOK_URL"
echo "Test Email: $TEST_EMAIL"
echo ""

curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"from\": \"$TEST_EMAIL\",
    \"message\": \"Test reply message - $(date)\",
    \"body\": \"Test reply message - $(date)\",
    \"subject\": \"Re: Consultation Request\"
  }"

echo ""
echo "✅ Test sent!"
echo "Check Make.com execution history and Google Sheets"
```

**Usage:**
1. Replace `[YOUR_WEBHOOK_URL]` with your webhook URL
2. Make executable: `chmod +x test-email-reply.sh`
3. Run: `./test-email-reply.sh`

---

## 🎯 **Step-by-Step Testing Process**

### **Complete Test Flow:**

1. **Prepare:**
   - [ ] Ensure test email exists in Google Sheets
   - [ ] Copy webhook URL
   - [ ] Open Google Sheets to monitor

2. **Send Test:**
   - [ ] Use PowerShell or cURL to send test data
   - [ ] Or use Make.com "Run once"

3. **Verify Make.com:**
   - [ ] Check execution history
   - [ ] Verify all modules completed
   - [ ] Check for errors

4. **Verify Google Sheets:**
   - [ ] Find the row with test email
   - [ ] Check Column AD (29) = `TRUE`
   - [ ] Check Column AE (30) = timestamp
   - [ ] Check Column AF (31) = reply message

5. **Test Multiple Times:**
   - [ ] Send second reply with same email
   - [ ] Verify notes column appends (not replaces)
   - [ ] Check both replies are in notes

---

## 📊 **Expected Results**

### **After Successful Test:**

**Google Sheets Row:**
```
Column C (2): test@example.com
Column AD (29): TRUE
Column AE (30): 2025-01-22 10:30:45
Column AF (31): Reply: This is a test reply message
```

**Make.com Execution:**
```
Module 1: ✅ Completed
Module 2: ✅ Completed (found row)
Module 3: ✅ Completed (updated row)
```

---

## 🎉 **Success Criteria**

Your test is successful if:

- ✅ Webhook receives data
- ✅ Search finds the row
- ✅ Update completes without errors
- ✅ Google Sheets shows:
  - `client_replied` = `TRUE`
  - `client_replied_at` = timestamp
  - `notes` = reply message
- ✅ Multiple replies append to notes (not replace)

---

## 🚀 **Ready to Test!**

Choose your preferred method:
1. **Quick Test:** Use PowerShell/cURL (Method 1)
2. **Detailed Test:** Use Make.com test run (Method 2)
3. **Real Test:** Reply to actual email (Method 3)

**Start with Method 1 for quickest results!**

