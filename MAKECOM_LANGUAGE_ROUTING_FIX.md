# Make.com Language Routing Fix

## 🔍 Problem

The system is sending **both English and Arabic emails** instead of just one based on the `language` field.

## 🎯 Root Cause

The Make.com scenario currently routes emails by **service type** (Accounting, PRO Services, etc.) but **NOT by language**. This means:

1. The scenario has ONE email module per service route (Modules 5, 11, 14, 17)
2. Each email module should use the `language` field to select the correct template
3. If the email template or Make.com configuration doesn't properly filter by language, it might send both

## ✅ Solution

### Option 1: Add Language Router in Make.com (Recommended)

Add a **Router module** after the service router to route by language:

```
[1] Webhook → [25] Set Variables → [2] Sheets AddRow → [8] Service Router
    ├─ Accounting: [3] GPT → [Language Router]
    │   ├─ English: [5] Resend (English template) → [7] Sheets UpdateRow
    │   └─ Arabic: [5-ar] Resend (Arabic template) → [7] Sheets UpdateRow
    ├─ PRO Services: [10] GPT → [Language Router]
    │   ├─ English: [11] Resend (English template) → [12] Sheets UpdateRow
    │   └─ Arabic: [11-ar] Resend (Arabic template) → [12] Sheets UpdateRow
    └─ ... (same for other routes)
```

**Router Filter:**
- Route 1: `{{1.language}}` equals `"en"` → English email
- Route 2: `{{1.language}}` equals `"ar"` → Arabic email

### Option 2: Use Conditional Logic in Email Template (Simpler)

In each Resend Email module (5, 11, 14, 17), use Make.com's conditional logic:

**HTML Template Selection:**
```
{{if(1.language = "ar"; "Arabic Template HTML"; "English Template HTML")}}
```

**Subject Line:**
```
{{if(1.language = "ar"; "تم استلام طلب الاستشارة"; "Consultation Request Received")}}
```

## 🔧 Make.com Configuration Steps

### Step 1: Verify Language Field

Ensure the webhook payload includes:
```json
{
  "language": "en"  // or "ar"
}
```

✅ **Already implemented** in `api/consultation.ts`

### Step 2: Add Language Router (Option 1)

1. In Make.com scenario, after each GPT module (3, 10, 13, 16), add a **Router** module
2. Configure router with 2 routes:
   - **Route 1:** Filter: `{{1.language}}` equals `"en"`
   - **Route 2:** Filter: `{{1.language}}` equals `"ar"`
3. Connect English route to English email template
4. Connect Arabic route to Arabic email template

### Step 3: Use Conditional Templates (Option 2)

In each Resend Email module:

1. **HTML Body:** Use Make.com formula:
   ```
   {{if(1.language = "ar"; [Arabic Template]; [English Template])}}
   ```

2. **Subject:** Use Make.com formula:
   ```
   {{if(1.language = "ar"; "تم استلام طلب الاستشارة"; "Consultation Request Received")}}
   ```

3. **From Name:** Can also be conditional:
   ```
   {{if(1.language = "ar"; "مركز سمارت برو"; "Smartpro Business Hub")}}
   ```

## 📋 Email Template Files

### English Template
- **File:** `templates/email-client-confirmation-html-english-makecom.html`
- **Variables:** Uses `{{1.xxx}}` syntax
- **Guide:** `CLIENT_EMAIL_TEMPLATE_GUIDE.md`

### Arabic Template
- **File:** `templates/email-client-confirmation-html-arabic-makecom.html`
- **Variables:** Uses `{{1.xxx}}` syntax
- **Guide:** `ARABIC_CLIENT_EMAIL_TEMPLATE_GUIDE.md`

## ⚠️ Important Notes

1. **Language Field Values:**
   - Must be exactly `"en"` or `"ar"` (lowercase)
   - ✅ Backend sends correct values

2. **Template Selection:**
   - Make.com must use the `language` field to select template
   - If both templates are used, both emails will be sent

3. **Testing:**
   - Test with `language: "en"` → Should receive only English email
   - Test with `language: "ar"` → Should receive only Arabic email

## 🐛 Debugging

If still receiving both emails:

1. **Check Make.com Execution Log:**
   - Look for multiple email modules executing
   - Check if language router is working

2. **Check Email Module Configuration:**
   - Verify only ONE email module executes per submission
   - Check if language filter is applied correctly

3. **Check Webhook Payload:**
   - Verify `language` field is present and correct
   - Check Make.com execution data to see received payload

4. **Check Duplicate Prevention:**
   - Verify idempotency key is working
   - Check if webhook is being called multiple times

## ✅ Backend Improvements Applied

1. **Idempotency Key:** Added to prevent duplicate webhook calls
2. **Webhook Call Tracking:** Tracks webhook calls to prevent duplicates
3. **Language Field:** Ensured `language` is always included in payload
4. **Logging:** Added logging to track language and service routing

## 📝 Next Steps

1. **Update Make.com Scenario:**
   - Add language router OR use conditional templates
   - Test with both `en` and `ar` submissions

2. **Verify Email Templates:**
   - Ensure templates are correctly configured in Make.com
   - Test template selection based on language

3. **Monitor Executions:**
   - Check Make.com execution history
   - Verify only one email is sent per submission

---

**Last Updated:** 2025-01-22  
**Status:** Backend fixed, Make.com configuration needed

