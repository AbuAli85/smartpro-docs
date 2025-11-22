# PowerShell Test Commands

## 🚀 Quick Test for Windows PowerShell

PowerShell doesn't handle multi-line cURL commands the same way. Use these PowerShell commands instead.

---

## Method 1: Run PowerShell Script (Easiest) ⭐

### Step 1: Edit the Script
1. Open `TEST_POWERSHELL.ps1`
2. Replace `YOUR_EMAIL@example.com` with your real email
3. Save

### Step 2: Run the Script
```powershell
.\TEST_POWERSHELL.ps1
```

**For Arabic test:**
```powershell
.\TEST_POWERSHELL_ARABIC.ps1
```

---

## Method 2: Single PowerShell Command (Copy & Paste)

### English Test:
```powershell
$body = '{"form_type":"consultation","request_id":"test_001","timestamp":"2025-01-22T10:00:00.000Z","client_name":"Test User","email":"YOUR_EMAIL@example.com","phone":"+96812345678","business_name":"Test Business","business_type":"Corporation","service_interested":"Company Formation","service_interested_translated":"Company Formation","services_summary":"Company Formation","budget":"$5,000 - $10,000","timeline":"3-6 months","preferred_contact":"Email","preferred_time":"Morning","location":"Muscat","primary_message":"Test message","language":"en","source":"smartpro-consultation-form","notes":"Test"}'; Invoke-WebRequest -Uri "https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8" -Method POST -ContentType "application/json" -Body $body
```

**Replace `YOUR_EMAIL@example.com` with your email before running!**

---

### Arabic Test:
```powershell
$body = '{"form_type":"consultation","request_id":"test_002","timestamp":"2025-01-22T10:00:00.000Z","client_name":"أحمد محمد","email":"YOUR_EMAIL@example.com","phone":"+96898765432","business_name":"شركة تجريبية","business_type":"شركة","service_interested":"Company Formation","service_interested_translated":"تأسيس الشركات","services_summary":"تأسيس الشركات","budget":"5,000 - 10,000 دولار","timeline":"3-6 أشهر","preferred_contact":"البريد الإلكتروني","preferred_time":"الصباح","location":"مسقط","primary_message":"رسالة تجريبية","language":"ar","source":"smartpro-consultation-form","notes":"Test Arabic"}'; Invoke-WebRequest -Uri "https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8" -Method POST -ContentType "application/json; charset=utf-8" -Body $body
```

**Replace `YOUR_EMAIL@example.com` with your email before running!**

---

## Method 3: Multi-Line PowerShell (Readable)

### English Test:
```powershell
$payload = @{
    form_type = "consultation"
    request_id = "test_001"
    timestamp = "2025-01-22T10:00:00.000Z"
    client_name = "Test User"
    email = "YOUR_EMAIL@example.com"
    phone = "+96812345678"
    business_name = "Test Business"
    business_type = "Corporation"
    service_interested = "Company Formation"
    service_interested_translated = "Company Formation"
    services_summary = "Company Formation"
    budget = "$5,000 - $10,000"
    timeline = "3-6 months"
    preferred_contact = "Email"
    preferred_time = "Morning"
    location = "Muscat"
    primary_message = "Test message"
    language = "en"
    source = "smartpro-consultation-form"
    notes = "Test"
}

$json = $payload | ConvertTo-Json
Invoke-WebRequest -Uri "https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8" -Method POST -ContentType "application/json" -Body $json
```

**Replace `YOUR_EMAIL@example.com` with your email!**

---

## Method 4: Using Git Bash (If Installed)

If you have Git Bash installed, you can use the original cURL command:

1. **Open Git Bash** (not PowerShell)
2. **Run the cURL command** from `QUICK_TEST_COMMANDS.md`

---

## ✅ What to Check After Running

1. **PowerShell Output:**
   - Should show "Status: 200" or "Accepted"
   - No error messages

2. **Make.com:**
   - Open your scenario
   - Check execution history
   - Should show successful execution

3. **Google Sheets:**
   - Open "Smartpro Consultation Submissions"
   - New row should be added

4. **Email:**
   - Check your inbox
   - Should receive confirmation email

---

## 🚨 Troubleshooting

### Error: "Cannot bind parameter 'Body'"
- Make sure the JSON is properly formatted
- Use Method 3 (multi-line) for easier debugging

### Error: "The remote server returned an error"
- Check webhook URL is correct
- Verify Make.com scenario is active
- Check internet connection

### Error: "Invoke-WebRequest is not recognized"
- You're in PowerShell Core, use `Invoke-RestMethod` instead
- Or use the script files provided

---

## 🎯 Recommended: Use Method 1 (Script)

**Easiest and most reliable:**
1. Edit `TEST_POWERSHELL.ps1`
2. Replace email address
3. Run: `.\TEST_POWERSHELL.ps1`
4. Done! ✅

---

**Start with Method 1 - it's the easiest!** 🚀

