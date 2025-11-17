# Make.com Resend Email Fix: `to` Field Error

## 🚨 Error

```
[422] The `to` field must be a `string`.
```

**Error Payload:**
```json
{
  "to": [null],  // ❌ Array with null - should be a string
  "from": "Smartpro Business Hub <noreply@portal.thesmartpro.io>",
  ...
}
```

## 🔍 Root Causes

### Issue 1: Wrong Module Reference
The Resend email modules (5, 11, 14, 17) are configured with:
- **To:** `{{2.email}}`

**Problem:** Module 2 (Google Sheets AddRow) does **NOT** output an `email` field. It only outputs `2.rowNumber`.

### Issue 2: Null Email Value
Even after fixing to `{{1.email}}`, if the email field is `null` or `undefined`, Resend will receive `[null]` which causes the 422 error.

### Issue 3: Array Format
The Resend module might be configured to accept multiple recipients (array format), but when the email is null, it becomes `[null]` instead of a string.

## ✅ Solution

### Step 1: Fix the Module Reference

Update all Resend email modules to use the email from the webhook payload:

**Change:**
- ❌ `{{2.email}}` (incorrect - Module 2 doesn't have email)

**To:**
- ✅ `{{1.email}}` (correct - from webhook Module 1)

**Alternative (also valid):**
- ✅ `{{25.email}}` (from Set Variables Module 25, which passes through `{{1.email}}`)

### Step 2: Ensure String Format (Not Array)

In the Resend module configuration:

1. **To Field Format:**
   - Make sure the **To** field is set to **"Single email address"** (not "Multiple recipients")
   - Enter: `{{1.email}}` (as a string, not an array)

2. **If using Multiple Recipients format:**
   - Remove any array brackets `[]`
   - Use only: `{{1.email}}`

### Step 3: Add Error Handling (Recommended)

Add a **Set Variables** module before the Resend module to ensure email is always valid:

**Module:** Set Variables (before Resend)
- **Variable:** `email_validated`
- **Value:** `{{if(1.email; 1.email; "support@portal.thesmartpro.io")}}`
  - This uses the email if it exists, otherwise falls back to support email

Then use `{{email_validated}}` in the Resend **To** field.

**Alternative (using default function):**
- **Value:** `{{default(1.email; "support@portal.thesmartpro.io")}}`

## 📋 Modules to Fix

Update the **To** field in these Resend modules:

1. **Module 5** (Accounting route)
   - Current: `{{2.email}}`
   - Fix: `{{1.email}}`

2. **Module 11** (PRO Services route)
   - Current: `{{2.email}}`
   - Fix: `{{1.email}}`

3. **Module 14** (Company Formation route)
   - Current: `{{2.email}}`
   - Fix: `{{1.email}}`

4. **Module 17** (Default route)
   - Current: `{{2.email}}`
   - Fix: `{{1.email}}`

## 🔧 Step-by-Step Fix in Make.com

### Quick Fix (Recommended)

1. Open your Make.com scenario: `smartpro-website-consultation-v2`
2. Click on **Module 5** (Resend Email - Accounting route)
3. In the **To** field:
   - **Remove** any array format `[]` or multiple recipient settings
   - **Set to:** Single email address
   - **Enter:** `{{1.email}}`
4. **Verify** the field type is "Single email address" (not "Multiple recipients")
5. Click **OK** to save
6. Repeat for **Modules 11, 14, and 17**

### Detailed Fix with Validation (Best Practice)

1. **Add Set Variables module** (optional, but recommended):
   - After Module 3/10/13/16 (GPT modules)
   - Before Module 5/11/14/17 (Resend modules)
   - **Variable:** `email_to`
   - **Value:** `{{if(1.email; 1.email; "support@portal.thesmartpro.io")}}`

2. **Update Resend modules:**
   - **To field:** `{{email_to}}` (or `{{1.email}}` if skipping validation)
   - **Format:** Single email address (not array)

3. **Test with sample data:**
   - Ensure email is always a valid string
   - Test with missing email to verify fallback works

## ✅ Verification

### Test 1: Normal Submission

Test the scenario with a valid email:

```json
{
  "client_name": "Test User",
  "email": "test@example.com",
  "service_interested": "Accounting",
  "notes": "Test submission"
}
```

**Expected:** Email sends successfully ✅

### Test 2: Missing Email (if using validation)

Test with missing email field:

```json
{
  "client_name": "Test User",
  "service_interested": "Accounting",
  "notes": "Test submission"
}
```

**Expected:** 
- If using validation: Falls back to `support@portal.thesmartpro.io` ✅
- If not using validation: Should fail gracefully (not send email) ⚠️

### Test 3: Check Resend Module Configuration

In the Resend module, verify:
- ✅ **To field** is a **string** (not an array)
- ✅ **To field** contains: `{{1.email}}` or `{{email_to}}`
- ✅ **Format** is set to "Single email address"

### Common Issues After Fix

**If still getting 422 error:**
1. Check that `{{1.email}}` is not null in the webhook payload
2. Verify the Resend module is set to "Single email address" format
3. Check for any filters or conditions that might be modifying the email field
4. Review the scenario execution log to see what value `{{1.email}}` actually contains

## 📝 Additional Notes

### Why This Happens

1. **Module 2 doesn't output email:** Google Sheets AddRow only outputs `rowNumber`, not the input data
2. **Null values:** If the webhook doesn't receive an email, `{{1.email}}` will be `null`
3. **Array format:** Resend modules configured for multiple recipients will create an array, and `[null]` causes the 422 error

### Related Issue: Empty Template Variables

If you're also seeing empty values in the email template (e.g., "Dear ," or "Welcome to Smartpro – "), see **`MAKECOM_EMAIL_TROUBLESHOOTING.md`** for a complete fix guide that addresses:
- Empty client name
- Empty service name in subject
- Missing AI-generated content

### Best Practices

1. **Always validate email in frontend** (already done ✅)
2. **Use `{{1.email}}` directly** from webhook (most reliable)
3. **Add error handling** with Set Variables if email might be missing
4. **Set Resend to "Single email address"** format (not array)
5. **Test with missing email** to ensure graceful failure

### Alternative Solutions

**Option A: Use Module 25 variable**
- `{{25.email}}` (pass-through from `{{1.email}}`)
- Same reliability as `{{1.email}}`

**Option B: Add validation module**
- Set Variables before Resend
- Fallback to support email if missing

**Option C: Add filter to skip email if missing**
- Add filter: `{{1.email}}` is not empty
- Only execute Resend if email exists

---

**Status:** ✅ Fix Ready  
**Last Updated:** 2024  
**Priority:** 🔴 Critical - Blocks email delivery

