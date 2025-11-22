# Quick Test Commands

## 🧪 Copy & Paste Test Commands

### Test 1: English Submission (Minimal)

```bash
curl -X POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8 \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "consultation",
    "request_id": "test_en_001",
    "timestamp": "2025-01-22T10:00:00.000Z",
    "client_name": "John Doe",
    "email": "test@example.com",
    "phone": "+96812345678",
    "business_name": "Test Business",
    "business_type": "Corporation",
    "service_interested": "Company Formation",
    "service_interested_translated": "Company Formation",
    "services_summary": "Company Formation",
    "budget": "$5,000 - $10,000",
    "timeline": "3-6 months",
    "preferred_contact": "Email",
    "preferred_time": "Morning",
    "location": "Muscat",
    "primary_message": "Test message",
    "language": "en",
    "source": "smartpro-consultation-form",
    "notes": "Test submission"
  }'
```

---

### Test 2: Arabic Submission (Minimal)

```bash
curl -X POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8 \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "consultation",
    "request_id": "test_ar_001",
    "timestamp": "2025-01-22T10:00:00.000Z",
    "client_name": "أحمد محمد",
    "email": "test@example.com",
    "phone": "+96898765432",
    "business_name": "شركة تجريبية",
    "business_type": "شركة",
    "service_interested": "Company Formation",
    "service_interested_translated": "تأسيس الشركات",
    "services_summary": "تأسيس الشركات",
    "budget": "5,000 - 10,000 دولار",
    "timeline": "3-6 أشهر",
    "preferred_contact": "البريد الإلكتروني",
    "preferred_time": "الصباح",
    "location": "مسقط",
    "primary_message": "رسالة تجريبية",
    "language": "ar",
    "source": "smartpro-consultation-form",
    "notes": "Test Arabic"
  }'
```

---

## 🎯 How to Test

### Option 1: Using Terminal/Command Prompt

1. **Open terminal** (PowerShell, CMD, or Git Bash)
2. **Copy one of the commands above**
3. **Paste and press Enter**
4. **Check results:**
   - Should return "Accepted" or similar
   - Check Make.com for execution
   - Check Google Sheets for new row
   - Check email inbox

---

### Option 2: Using Make.com

1. **Open Make.com scenario**
2. **Click Webhook module (Module 3)**
3. **Click "Run once"**
4. **Paste JSON payload** (from commands above)
5. **Click "Run"**
6. **Watch execution**

---

### Option 3: Using Website Form

1. **Go to your website**
2. **Fill out form with test data**
3. **Submit**
4. **Check Make.com automatically triggers**

---

## ✅ What to Check

### Immediately After Test:
1. **Make.com:** Scenario executed? ✅
2. **Google Sheets:** New row added? ✅
3. **Email:** Received? ✅

### Detailed Check:
1. **Google Sheets:** All fields populated? ✅
2. **Email:** All fields display correctly? ✅
3. **Email:** Language correct? ✅
4. **Email:** No placeholder text? ✅

---

## 🚨 Common Issues

### "Connection refused" or "Timeout"
- Check webhook URL is correct
- Verify Make.com scenario is active
- Check internet connection

### "Invalid JSON"
- Check JSON format
- Verify all quotes are correct
- Remove any extra commas

### "Module error"
- Check Make.com execution logs
- Verify module connections
- Check field mappings

---

**Copy the test command above and run it now!** 🚀

