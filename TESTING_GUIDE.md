# Testing Guide - How to Test Your Automation

## 🧪 Complete Testing Guide

This guide shows you how to test your Make.com scenario and verify everything works correctly.

---

## 🎯 Testing Methods

### Method 1: Test via Webhook (Easiest) ⭐

**Using cURL command:**

```bash
curl -X POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8 \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "consultation",
    "request_id": "test_1234567890",
    "timestamp": "2025-01-22T10:00:00.000Z",
    "client_name": "Test User",
    "email": "test@example.com",
    "phone": "+96812345678",
    "business_name": "Test Business",
    "business_type": "Corporation",
    "service_interested": "Company Formation",
    "service_interested_translated": "تأسيس الشركات",
    "services": ["Company Formation", "Accounting"],
    "services_english": ["Company Formation", "Accounting"],
    "services_summary": "Company Formation, Accounting",
    "services_summary_english": "Company Formation, Accounting",
    "budget": "$5,000 - $10,000",
    "timeline": "3-6 months",
    "preferred_contact": "Email",
    "preferred_time": "Morning",
    "location": "Muscat",
    "primary_message": "This is a test message",
    "language": "en",
    "source": "smartpro-consultation-form",
    "notes": "Test submission for automation verification"
  }'
```

**For Arabic test, change:**
```json
"language": "ar",
"service_interested_translated": "تأسيس الشركات",
"services_summary": "تأسيس الشركات، المحاسبة",
"business_type": "شركة",
"budget": "5,000 - 10,000 دولار",
"timeline": "3-6 أشهر",
"preferred_contact": "البريد الإلكتروني",
"preferred_time": "الصباح"
```

---

### Method 2: Test via Make.com (Quick)

**In Make.com:**

1. **Open your scenario**
2. **Click on Webhook module (Module 3)**
3. **Click "Run once"**
4. **Enter test data:**
   - Copy the JSON payload from Method 1
   - Paste into webhook test
5. **Click "Run"**
6. **Watch execution**

---

### Method 3: Test via Website Form (Realistic)

1. **Go to your website**
2. **Fill out consultation form:**
   - Use test data
   - Submit form
3. **Check Make.com:**
   - Scenario should trigger automatically
   - Watch execution logs

---

## ✅ What to Check After Test

### 1. Make.com Execution (5 min)

**Check Scenario Execution:**
- ✅ Scenario executed successfully
- ✅ No error messages
- ✅ All modules completed (green checkmarks)
- ✅ Execution time reasonable (< 30 seconds)

**Check Module Status:**
- ✅ Module 3 (Webhook): Received data
- ✅ Module 2 (Google Sheets): Row added
- ✅ Module 4 (Router): Routed correctly
- ✅ Email modules: Emails sent

**If Errors:**
- Check error messages
- Review `MAKECOM_QUICK_FIX_GUIDE.md`
- Verify module connections
- Check field mappings

---

### 2. Google Sheets Verification (5 min)

**Open Google Sheets:**
- Spreadsheet: "Smartpro Consultation Submissions"
- Sheet: Sheet1

**Check New Row:**
- ✅ New row added at bottom
- ✅ All 34 fields populated
- ✅ Field 0 (submission_id): Has value
- ✅ Field 1 (submitted_at): Has timestamp
- ✅ Field 2 (client_name): "Test User"
- ✅ Field 3 (email): "test@example.com"
- ✅ Field 19 (confirmation_sent): TRUE
- ✅ Field 20 (welcome_sent): FALSE
- ✅ Fields 21, 23, 25, 27, 29, 31: Empty (as expected)
- ✅ Field 32 (provider_notified): TRUE

**If Issues:**
- Check field mappings in Make.com
- Verify all fields are mapped
- Check for typos in field values

---

### 3. Email Verification (5 min)

**Check Your Email Inbox:**
- ✅ Confirmation email received
- ✅ Email subject correct
- ✅ Email in correct language (Arabic or English)
- ✅ All fields display correctly:
  - Client name appears
  - Business name appears
  - Services display correctly
  - Budget and timeline show
  - Contact preferences show

**Check Email Content:**
- ✅ No placeholder text (like `{{3.client_name}}`)
- ✅ All dynamic fields replaced with actual values
- ✅ Formatting looks good
- ✅ Links work (if any)

**If Issues:**
- Check email module configuration
- Verify template copied correctly
- Check placeholder format (`{{3.*}}`)

---

## 🧪 Test Cases

### Test Case 1: English Submission

**Payload:**
```json
{
  "form_type": "consultation",
  "request_id": "test_en_001",
  "timestamp": "2025-01-22T10:00:00.000Z",
  "client_name": "John Doe",
  "email": "john@example.com",
  "phone": "+96812345678",
  "business_name": "Test Business LLC",
  "business_type": "Corporation",
  "service_interested": "Company Formation",
  "service_interested_translated": "Company Formation",
  "services_summary": "Company Formation, Accounting",
  "budget": "$5,000 - $10,000",
  "timeline": "3-6 months",
  "preferred_contact": "Email",
  "preferred_time": "Morning",
  "location": "Muscat",
  "primary_message": "I need help with company formation",
  "language": "en",
  "source": "smartpro-consultation-form",
  "notes": "Test English submission"
}
```

**Expected Results:**
- ✅ Router routes to English path
- ✅ Email sent in English
- ✅ Subject: "Thank You for Your Consultation Request"
- ✅ All fields in English

---

### Test Case 2: Arabic Submission

**Payload:**
```json
{
  "form_type": "consultation",
  "request_id": "test_ar_001",
  "timestamp": "2025-01-22T10:00:00.000Z",
  "client_name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "+96898765432",
  "business_name": "شركة تجريبية",
  "business_type": "شركة",
  "service_interested": "Company Formation",
  "service_interested_translated": "تأسيس الشركات",
  "services_summary": "تأسيس الشركات، المحاسبة",
  "budget": "5,000 - 10,000 دولار",
  "timeline": "3-6 أشهر",
  "preferred_contact": "البريد الإلكتروني",
  "preferred_time": "الصباح",
  "location": "مسقط",
  "primary_message": "أحتاج مساعدة في تأسيس الشركة",
  "language": "ar",
  "source": "smartpro-consultation-form",
  "notes": "Test Arabic submission"
}
```

**Expected Results:**
- ✅ Router routes to Arabic path
- ✅ Email sent in Arabic
- ✅ Subject: "شكراً لتواصلك معنا - طلب الاستشارة"
- ✅ All fields in Arabic
- ✅ RTL (right-to-left) formatting correct

---

## 🔍 Troubleshooting

### Issue 1: Scenario Not Executing

**Check:**
1. Webhook URL correct?
2. Scenario activated (not paused)?
3. Payload format correct (JSON)?
4. Content-Type header set?

**Fix:**
- Verify webhook URL
- Check scenario status
- Review payload format
- Test with cURL command

---

### Issue 2: Google Sheets Not Updating

**Check:**
1. Google Sheets module configured?
2. Spreadsheet name matches exactly?
3. All fields mapped?
4. Make.com has edit permissions?

**Fix:**
- Re-authorize Google connection
- Verify spreadsheet sharing
- Check all field mappings
- Test module individually

---

### Issue 3: Email Not Sending

**Check:**
1. Email module configured?
2. Email address valid?
3. Template copied correctly?
4. Make.com email quota not exceeded?

**Fix:**
- Verify email module settings
- Check email address format
- Re-copy template
- Check Make.com limits

---

### Issue 4: Wrong Language Email

**Check:**
1. Router conditions set correctly?
2. `language` field in payload correct?
3. Correct template used?

**Fix:**
- Verify router conditions
- Check payload `language` value
- Verify template selection

---

### Issue 5: Placeholders Not Replaced

**Check:**
1. Placeholder format correct (`{{3.*}}`)?
2. Module references correct?
3. Field names match webhook payload?

**Fix:**
- Use `{{3.*}}` format (not `{{1.*}}`)
- Verify webhook is Module 3
- Check field names match exactly

---

## 📊 Testing Checklist

### Pre-Test
- [ ] Make.com scenario activated
- [ ] Google Sheets accessible
- [ ] Email templates ready
- [ ] Test email address available

### During Test
- [ ] Submit test payload
- [ ] Watch Make.com execution
- [ ] Check for errors
- [ ] Verify module completion

### Post-Test
- [ ] Google Sheets row added
- [ ] All fields populated correctly
- [ ] Email received
- [ ] Email content correct
- [ ] Language correct
- [ ] No placeholder text visible

---

## 🚀 Quick Test Commands

### Test English Submission
```bash
curl -X POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8 \
  -H "Content-Type: application/json" \
  -d '{"form_type":"consultation","request_id":"test_001","timestamp":"2025-01-22T10:00:00.000Z","client_name":"Test User","email":"test@example.com","language":"en","service_interested":"Company Formation","service_interested_translated":"Company Formation"}'
```

### Test Arabic Submission
```bash
curl -X POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8 \
  -H "Content-Type: application/json" \
  -d '{"form_type":"consultation","request_id":"test_002","timestamp":"2025-01-22T10:00:00.000Z","client_name":"اختبار","email":"test@example.com","language":"ar","service_interested":"Company Formation","service_interested_translated":"تأسيس الشركات"}'
```

---

## 📝 Test Results Template

**Copy this to track your tests:**

```
Test Date: ___________
Test Type: [ ] English [ ] Arabic

Results:
- [ ] Make.com executed successfully
- [ ] Google Sheets row added
- [ ] Email received
- [ ] All fields correct
- [ ] Language correct

Issues Found:
1. ________________
2. ________________

Fixed:
- [ ] Issue 1 fixed
- [ ] Issue 2 fixed
```

---

## ✅ Success Criteria

**Your test is successful if:**
- ✅ Make.com scenario executes without errors
- ✅ Google Sheets row added with all fields
- ✅ Confirmation email received
- ✅ Email displays all data correctly
- ✅ Language matches submission language
- ✅ No placeholder text visible

---

**Start testing now! Use Method 1 (cURL) for the quickest test.** 🧪
