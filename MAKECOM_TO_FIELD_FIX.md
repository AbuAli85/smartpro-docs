# Make.com Resend Module: Fix "Missing value of required parameter 'to'"

## 🚨 Error

```
Validation failed for 1 parameter(s).
Missing value of required parameter 'to'.
Origin: Make
```

This means the Resend module's **To** field is empty or not configured correctly.

---

## ✅ Step-by-Step Fix

### Step 1: Open the Resend Module

1. Go to your Make.com scenario: `smartpro-website-consultation-v2`
2. Find the Resend module that's failing (Module 5, 11, 14, or 17)
3. Click on it to open the configuration

### Step 2: Locate the "To" Field

1. Scroll down to find the **"To"** field
2. Look at what's currently in that field

**Common wrong values:**
- `{{25.email}}` ❌
- `{{2.email}}` ❌
- `25.email` ❌
- Empty/blank ❌

### Step 3: Fix the "To" Field

1. **Clear** whatever is in the "To" field
2. **Type exactly:** `{{1.email}}`
3. Make sure you use:
   - Double curly braces: `{{` and `}}`
   - Module number: `1`
   - Dot separator: `.`
   - Field name: `email`

**Correct value:**
```
{{1.email}}
```

### Step 4: Verify Field Type

1. Look for a dropdown or setting near the "To" field
2. Make sure it's set to **"Single email address"** or **"Email address"**
3. **NOT** "Multiple recipients" or "Array"

### Step 5: Save and Test

1. Click **OK** or **Save** to save the module
2. Run a test execution
3. Check if the error is gone

---

## 🔍 Verify the Fix

### Check 1: Module Configuration

After saving, open the Resend module again and verify:
- ✅ **To field** shows: `{{1.email}}`
- ✅ **Field type** is "Single email address"
- ✅ No error messages in the field

### Check 2: Test Execution

1. Send a test submission from your frontend
2. Go to Make.com → **Execution history**
3. Find the latest execution
4. Click on it to see the details
5. Check the Resend module:
   - ✅ Should show a valid email address in the "To" field
   - ✅ Should not show any errors

### Check 3: Verify Webhook Data

If the error persists, check if the webhook is receiving the email:

1. Open **Module 1** (Webhook) in the execution
2. Check the output data
3. Look for the `email` field
4. Verify it has a value (not null or empty)

**If `email` is missing or null:**
- Check your frontend form is sending the `email` field
- Verify the field name is exactly `email` (lowercase)
- Check the webhook payload structure

---

## 🎯 Quick Reference

| Field | Wrong ❌ | Correct ✅ |
|-------|---------|-----------|
| **To** | `{{25.email}}` | `{{1.email}}` |
| **To** | `{{2.email}}` | `{{1.email}}` |
| **To** | `25.email` | `{{1.email}}` |
| **To** | Empty | `{{1.email}}` |
| **Format** | Multiple recipients | Single email address |

---

## 🐛 Troubleshooting

### Problem: Still getting error after fix

**Possible causes:**

1. **Webhook not receiving email:**
   - Check Module 1 output
   - Verify frontend is sending `email` field
   - Check field name is exactly `email`

2. **Variable syntax wrong:**
   - Must be: `{{1.email}}`
   - Not: `{1.email}` or `1.email` or `{{ 1.email }}`

3. **Field type wrong:**
   - Must be "Single email address"
   - Not "Multiple recipients" or array format

4. **Module execution order:**
   - Make sure Module 1 (Webhook) executes before Resend module
   - Check the scenario flow

### Problem: `{{1.email}}` is also empty

If `{{1.email}}` is empty in the execution log:

1. **Check frontend payload:**
   ```json
   {
     "email": "test@example.com",  // Must be present
     "client_name": "Test User",
     ...
   }
   ```

2. **Check webhook Module 1:**
   - Open execution history
   - Click on Module 1
   - Verify `email` field exists and has a value

3. **Add validation:**
   - Add a filter before Resend module
   - Condition: `{{1.email}}` is not empty
   - Only send email if email exists

---

## 📝 All Modules to Fix

Update **all 4 Resend modules** with the same fix:

1. **Module 5** (Accounting route)
   - To: `{{1.email}}`

2. **Module 11** (PRO Services route)
   - To: `{{1.email}}`

3. **Module 14** (Company Formation route)
   - To: `{{1.email}}`

4. **Module 17** (Default route)
   - To: `{{1.email}}`

---

## ✅ Success Criteria

After the fix, you should see:

- ✅ No "Missing value of required parameter 'to'" error
- ✅ Resend module executes successfully
- ✅ Email is sent to the client
- ✅ Execution log shows valid email address in "To" field

---

**Status:** 🔴 Critical Fix  
**Time Required:** 2-5 minutes  
**Priority:** Blocks all email delivery

