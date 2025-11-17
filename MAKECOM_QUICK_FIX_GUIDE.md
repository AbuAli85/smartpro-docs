# Make.com Email Quick Fix Guide

## 🚨 Current Error

```
Validation failed for 1 parameter(s).
Missing value of required parameter 'to'.
To: 25.email (empty)
```

**Also seeing:**
- Subject: `Welcome to Smartpro – 1. service_interested` (variable not parsed)

---

## ✅ Immediate Fix (2 Steps)

### Step 1: Fix the `To` Field ⚠️ CRITICAL

**Current (Wrong):**
```
To: 25.email
To: {{25.email}}
To: {{2.email}}
To: (empty)
```

**Fix (Correct):**
```
To: {{1.email}}
```

**Detailed Steps:**
1. Open Make.com scenario: `smartpro-website-consultation-v2`
2. Click on the Resend module that's failing (Module 5, 11, 14, or 17)
3. Scroll to find the **"To"** field
4. **Clear everything** in the "To" field
5. **Type exactly:** `{{1.email}}`
   - Use double curly braces: `{{` and `}}`
   - Module number: `1`
   - Dot: `.`
   - Field: `email`
6. **Verify field type:** Set to **"Single email address"** (NOT "Multiple recipients")
7. Click **OK** or **Save**
8. **Repeat for all 4 Resend modules** (5, 11, 14, 17)

**Why:** 
- `{{25.email}}` can be empty due to variable scoping issues
- `{{2.email}}` doesn't exist (Module 2 only outputs `rowNumber`)
- `{{1.email}}` comes directly from the webhook and is the most reliable source

**⚠️ Important:** Make sure to use **double curly braces** `{{}}` - single braces won't work!

---

### Step 2: Fix the Subject Line

**Current (Wrong):**
```
Subject: Welcome to Smartpro – 1. service_interested
```

**Fix (Correct):**
```
Subject: Welcome to Smartpro – {{1.service_interested}}
```

**How to fix:**
1. Open the Resend module
2. Find the **"Subject"** field
3. Replace `1. service_interested` with `{{1.service_interested}}`
4. Make sure to use **double curly braces** `{{}}`
5. Save

**Why:** Make.com requires double curly braces `{{}}` to parse variables. Without them, it treats it as literal text.

---

## 📋 Complete Configuration Checklist

For each Resend module (5, 11, 14, 17), verify:

- [ ] **To:** `{{1.email}}` (NOT `{{25.email}}` or `{{2.email}}`)
- [ ] **To format:** "Single email address" (not array)
- [ ] **Subject:** Uses `{{1.service_interested}}` with double curly braces
- [ ] **HTML Greeting:** Uses `{{1.client_name}}` or `{{25.client_name}}`
- [ ] **HTML AI Content:** Uses correct GPT module variable:
  - Module 5: `{{3.choices[1].message.content}}`
  - Module 11: `{{10.choices[1].message.content}}`
  - Module 14: `{{13.choices[1].message.content}}`
  - Module 17: `{{16.choices[1].message.content}}`

---

## 🔍 Why `{{25.email}}` is Empty

Module 25 (Set Variables) uses `roundtrip` scope, which means variables persist across the scenario. However, sometimes the variable reference `{{25.email}}` can be empty if:

1. The variable wasn't set correctly in Module 25
2. There's a scoping issue with roundtrip variables
3. The module execution order causes timing issues

**Solution:** Always use `{{1.email}}` directly from the webhook - it's the most reliable source.

---

## ✅ Expected Result After Fix

**Before:**
- ❌ Error: "Missing value of required parameter 'to'"
- ❌ Subject: "Welcome to Smartpro – 1. service_interested"

**After:**
- ✅ Email sends successfully
- ✅ Subject: "Welcome to Smartpro – Accounting" (or actual service name)
- ✅ To field: Valid email address

---

## 🧪 Test After Fix

1. Send a test submission from the frontend
2. Check Make.com execution log
3. Verify:
   - ✅ No errors in Resend module
   - ✅ Email is sent successfully
   - ✅ Subject line shows actual service name
   - ✅ Greeting shows actual client name

---

**Status:** 🔴 Critical Fix  
**Time to Fix:** 2 minutes  
**Priority:** Blocks all email delivery

