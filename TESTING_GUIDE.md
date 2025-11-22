# Make.com Integration Testing Guide

**Date:** 2024  
**Purpose:** Comprehensive testing guide for Make.com integration fixes  
**Status:** Ready for Testing

---

## 🎯 Testing Overview

This guide provides step-by-step instructions to test the Make.com integration after applying the fixes.

### Test Environment Setup

1. **Staging Environment**
   - Deploy latest code with fixes
   - Verify webhook URL points to staging Make.com scenario (if different)
   - Ensure Google Sheets test sheet is accessible

2. **Make.com Scenario**
   - Verify scenario is **Active** (not paused)
   - Check execution history is accessible
   - Confirm Google Sheets connection is active

3. **Google Sheets**
   - Open test sheet: "Smartpro Leads" / "leads"
   - Clear test data (optional, for clean testing)
   - Verify column headers match expected structure

---

## 📋 Test Cases

### Test Case 1: Full Form Submission (All Fields)

**Purpose:** Verify all fields are correctly sent and received

**Steps:**
1. Navigate to consultation form
2. Fill in ALL fields:
   - Name: `Test User Full`
   - Email: `test.full@example.com`
   - Phone: `+968 1234 5678`
   - Company: `Test Company LLC`
   - Business Type: `Limited Liability Company (LLC)`
   - Services: Select `Accounting` and `VAT`
   - Budget: `$5,000 - $10,000`
   - Timeline: `3–6 Months`
   - Preferred Contact: `Email`
   - Preferred Time: `Afternoon (12 PM - 5 PM)`
   - Location: `Muscat, Oman`
   - Message: `This is a test message for full form submission.`
   - Language: `English`

3. Submit form
4. Wait 10-15 seconds for Make.com to process

**Verification Checklist:**

**Make.com Execution History:**
- [ ] Execution appears in history
- [ ] Status is "Success" (green)
- [ ] Execution time < 30 seconds
- [ ] Click on execution to view details

**Make.com Webhook Data (Module 1):**
- [ ] `client_name` = "Test User Full"
- [ ] `email` = "test.full@example.com"
- [ ] `phone` = "+968 1234 5678"
- [ ] `business_name` = "Test Company LLC" ✅ (was `company`, now fixed)
- [ ] `business_type` = "Limited Liability Company (LLC)"
- [ ] `services` = ["Accounting", "VAT"] (array format)
- [ ] `service_interested` = "Accounting" (first service)
- [ ] `budget` = "$5,000 - $10,000"
- [ ] `timeline` = "3–6 Months"
- [ ] `preferred_contact` = "Email"
- [ ] `preferred_time` = "Afternoon (12 PM - 5 PM)"
- [ ] `location` = "Muscat, Oman"
- [ ] `primary_message` = "This is a test message..."
- [ ] `notes` contains structured data ✅ (was missing, now added)
- [ ] `language` = "en"
- [ ] `source` = "smartpro-consultation-form" ✅ (was missing, now added)

**Google Sheets Verification:**
- [ ] New row added
- [ ] Column A (Timestamp): Current date/time
- [ ] Column B (Client Name): "Test User Full"
- [ ] Column C (Email): "test.full@example.com"
- [ ] Column D (Phone): "+968 1234 5678"
- [ ] Column E (Business Name): "Test Company LLC" ✅ (was empty, now fixed)
- [ ] Column F (Business Type): "Limited Liability Company (LLC)"
- [ ] Column G (Service Interested): "Accounting"
- [ ] Column H (Services Full List): "Accounting, VAT"
- [ ] Column I (Budget): "$5,000 - $10,000"
- [ ] Column J (Timeline): "3–6 Months"
- [ ] Column K (Preferred Contact): "Email"
- [ ] Column L (Preferred Time): "Afternoon (12 PM - 5 PM)"
- [ ] Column M (Location): "Muscat, Oman"
- [ ] Column N (Primary Message): "This is a test message..."
- [ ] Column O (Notes): Contains structured notes ✅ (was empty, now fixed)
- [ ] Column P (Language): "en"
- [ ] Column Q (Source): "smartpro-consultation-form" ✅ (was empty, now fixed)
- [ ] Column R (Email Status): "Pending" initially, then "Sent"

**Email Verification:**
- [ ] Check email inbox: `test.full@example.com`
- [ ] Email received within 30 seconds
- [ ] Email subject: "Consultation request received – Smartpro Business Hub & Services"
- [ ] Email contains client name
- [ ] Email contains service information
- [ ] Email contains AI-generated content

---

### Test Case 2: Minimal Form Submission (Required Fields Only)

**Purpose:** Verify system handles minimal data correctly

**Steps:**
1. Navigate to consultation form
2. Fill in ONLY required fields:
   - Name: `Minimal Test`
   - Email: `test.minimal@example.com`
   - Services: Select `Business Consulting` only
   - Language: `English`

3. Submit form
4. Wait 10-15 seconds

**Verification Checklist:**

**Make.com:**
- [ ] Execution successful
- [ ] `client_name` = "Minimal Test"
- [ ] `email` = "test.minimal@example.com"
- [ ] `services` = ["Business Consulting"]
- [ ] `service_interested` = "Business Consulting"
- [ ] `notes` = "Language: en" (minimal notes) ✅
- [ ] `source` = "smartpro-consultation-form" ✅
- [ ] Optional fields are `undefined` or empty

**Google Sheets:**
- [ ] Row added successfully
- [ ] Required fields populated
- [ ] Optional fields (D, E, F, I, J, K, L, M, N) are empty
- [ ] Column O (Notes) contains at least "Language: en" ✅
- [ ] Column Q (Source) = "smartpro-consultation-form" ✅

---

### Test Case 3: Service Routing - Accounting

**Purpose:** Verify Accounting route works correctly

**Steps:**
1. Submit form with:
   - Name: `Accounting Test`
   - Email: `test.accounting@example.com`
   - Services: Select `Accounting` (first service)
   - Language: `English`

2. Submit and wait

**Verification Checklist:**

**Make.com Router (Module 8):**
- [ ] Route taken: "Accounting" route
- [ ] Module 3 (GPT) executed with Accounting prompt
- [ ] Module 5 (Resend Email) executed
- [ ] Module 7 (Sheets UpdateRow) executed

**Email:**
- [ ] Email received
- [ ] Email contains Accounting-specific content
- [ ] AI-generated content is Accounting-focused

**Google Sheets:**
- [ ] Column R (Email Status) = "Sent"
- [ ] Column S (Last Email Preview) contains AI content
- [ ] Column U (Response Status) = "No Response"
- [ ] Column W (Follow-up Count) = "0"

---

### Test Case 4: Service Routing - PRO Services

**Purpose:** Verify PRO Services route works correctly

**Steps:**
1. Submit form with:
   - Name: `PRO Test`
   - Email: `test.pro@example.com`
   - Services: Select `PRO Services` (first service)
   - Language: `English`

2. Submit and wait

**Verification Checklist:**

**Make.com Router:**
- [ ] Route taken: "PRO Services" route
- [ ] Module 10 (GPT) executed
- [ ] Module 11 (Resend Email) executed
- [ ] Module 12 (Sheets UpdateRow) executed

**Email:**
- [ ] Email contains PRO Services-specific content

---

### Test Case 5: Service Routing - Company Formation

**Purpose:** Verify Company Formation route works correctly

**Steps:**
1. Submit form with:
   - Name: `Company Formation Test`
   - Email: `test.company@example.com`
   - Services: Select `Company Formation` (first service)
   - Language: `English`

2. Submit and wait

**Verification Checklist:**

**Make.com Router:**
- [ ] Route taken: "Company Formation" route
- [ ] Module 13 (GPT) executed
- [ ] Module 14 (Resend Email) executed
- [ ] Module 15 (Sheets UpdateRow) executed

**Email:**
- [ ] Email contains Company Formation-specific content

---

### Test Case 6: Service Routing - Default Route

**Purpose:** Verify Default route works for other services

**Steps:**
1. Submit form with:
   - Name: `Default Test`
   - Email: `test.default@example.com`
   - Services: Select `VAT` (not Accounting, PRO, or Company Formation)
   - Language: `English`

2. Submit and wait

**Verification Checklist:**

**Make.com Router:**
- [ ] Route taken: "Default" route
- [ ] Module 16 (GPT) executed with generic prompt
- [ ] Module 17 (Resend Email) executed
- [ ] Module 18 (Sheets UpdateRow) executed

**Email:**
- [ ] Email contains generic content
- [ ] Service name appears in email

---

### Test Case 7: Arabic Language Submission

**Purpose:** Verify Arabic language handling

**Steps:**
1. Switch form to Arabic
2. Submit form with:
   - Name: `اختبار عربي`
   - Email: `test.arabic@example.com`
   - Services: Select any service
   - Language: `Arabic`

2. Submit and wait

**Verification Checklist:**

**Make.com:**
- [ ] `language` = "ar"
- [ ] `client_name` = "اختبار عربي" (preserves Arabic text)

**Google Sheets:**
- [ ] Column P (Language) = "ar"
- [ ] Column B (Client Name) shows Arabic text correctly

**Email:**
- [ ] Email subject in Arabic (if configured)
- [ ] Email template in Arabic (if configured)

---

### Test Case 8: Multiple Services Selection

**Purpose:** Verify multiple services are handled correctly

**Steps:**
1. Submit form with:
   - Name: `Multi Service Test`
   - Email: `test.multi@example.com`
   - Services: Select `Accounting`, `VAT`, and `Business Consulting`
   - Language: `English`

2. Submit and wait

**Verification Checklist:**

**Make.com:**
- [ ] `services` = ["Accounting", "VAT", "Business Consulting"] (array)
- [ ] `service_interested` = "Accounting" (first service for routing)
- [ ] Module 25 joins services: `services_full` = "Accounting, VAT, Business Consulting"

**Google Sheets:**
- [ ] Column G (Service Interested) = "Accounting" (first service)
- [ ] Column H (Services Full List) = "Accounting, VAT, Business Consulting"

**Email:**
- [ ] Routes to Accounting email template (based on first service)
- [ ] Email may mention all selected services

---

### Test Case 9: Notes Field Structure

**Purpose:** Verify notes field contains all structured data

**Steps:**
1. Submit form with various optional fields
2. Check notes field content

**Verification Checklist:**

**Google Sheets Column O (Notes) should contain:**
- [ ] Primary Message (if provided)
- [ ] Phone (if provided)
- [ ] Location (if provided)
- [ ] Business Type (if provided)
- [ ] Budget (if provided)
- [ ] Timeline (if provided)
- [ ] Preferred Contact (if provided)
- [ ] Preferred Time (if provided)
- [ ] Language (always present)

**Format Example:**
```
Primary Message: Test message
Phone: +968 1234 5678
Location: Muscat, Oman
Business Type: Limited Liability Company (LLC)
Budget: $5,000 - $10,000
Timeline: 3–6 Months
Preferred Contact: Email
Preferred Time: Afternoon (12 PM - 5 PM)
Language: en
```

---

### Test Case 10: Error Handling

**Purpose:** Verify error handling works correctly

**Steps:**
1. Temporarily break Make.com connection (pause scenario)
2. Submit form
3. Check error handling

**Verification Checklist:**

**Backend:**
- [ ] Error logged properly
- [ ] User still receives success message (graceful degradation)
- [ ] Submission saved to database (if available)

**Make.com:**
- [ ] Execution shows error
- [ ] Error handler module executes (if configured)

---

## 🔍 Debugging Tips

### If Data Not Appearing in Google Sheets

1. **Check Make.com Execution:**
   - Open scenario execution history
   - Find the execution for your test
   - Check if Module 2 (Add Row) executed successfully
   - Look for error messages

2. **Check Google Sheets Connection:**
   - Verify Make.com Google Sheets connection is active
   - Check sheet name is exactly "leads" (case-sensitive)
   - Verify spreadsheet name is "Smartpro Leads"

3. **Check Column Mapping:**
   - Verify column indices match (A=0, B=1, etc.)
   - Check Module 2 values mapping

### If Email Not Sending

1. **Check Make.com Execution:**
   - Verify GPT module completed successfully
   - Check Resend module executed
   - Look for error messages

2. **Check Email Service:**
   - Verify Resend connection is active
   - Check email address is valid
   - Check spam folder

3. **Check Routing:**
   - Verify correct route was taken
   - Check `service_interested` value matches route filter

### If Wrong Route Triggered

1. **Check `service_interested` Value:**
   - In Make.com execution, check Module 1 output
   - Verify `service_interested` contains expected text
   - Check router filter conditions

2. **Check Service Mapping:**
   - Verify `SERVICE_TO_MAKE_MAP` matches Make.com expectations
   - Check `getPrimaryServiceForRouting()` function

---

## 📊 Test Results Template

Use this template to record test results:

```markdown
## Test Results - [Date]

### Test Case 1: Full Form Submission
- Status: ✅ Pass / ❌ Fail
- Make.com Execution: [Link/ID]
- Google Sheets Row: [Row Number]
- Email Received: ✅ / ❌
- Notes: [Any issues found]

### Test Case 2: Minimal Form Submission
- Status: ✅ Pass / ❌ Fail
- Notes: [Any issues found]

[... continue for all test cases ...]
```

---

## ✅ Pre-Production Checklist

Before deploying to production:

- [ ] All test cases pass
- [ ] Notes field appears in Google Sheets column O
- [ ] Business name appears in Google Sheets column E
- [ ] Source field appears in Google Sheets column Q
- [ ] All service routes tested and working
- [ ] Email delivery confirmed for all routes
- [ ] Error handling tested
- [ ] Performance acceptable (< 30 seconds execution time)
- [ ] No console errors in browser
- [ ] No Make.com execution errors

---

**Status:** Ready for Testing  
**Last Updated:** 2024

