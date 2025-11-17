# Make.com Scenario Fix - Step-by-Step Guide

**Date:** 2025-01-17  
**Priority:** Critical  
**Time Required:** 10-15 minutes

---

## 🎯 What We're Fixing

**Problem:** Modules 20, 21, 22, 23 are broken and redundant
- They use incorrect `rowNumber` (email instead of number)
- They duplicate work already done by Modules 7, 12, 15, 18
- They will cause errors in execution

**Solution:** Delete these 4 modules

---

## 📋 Pre-Fix Checklist

Before starting, verify:
- [ ] You have access to Make.com scenario editor
- [ ] Scenario is saved/backed up (Make.com auto-saves, but good to verify)
- [ ] You can identify Modules 20, 21, 22, 23 in the visual editor

---

## 🔧 Step-by-Step Fix Instructions

### Step 1: Open Make.com Scenario Editor

1. Go to `eu2.make.com`
2. Navigate to your scenario: **"smartpro-website-leads"**
3. Click **"Edit"** to open the scenario editor

---

### Step 2: Locate Module 20 (Accounting Route)

**Where to find it:**
- Follow the **Accounting** route from Router (Module 8)
- Flow: Router → Module 3 (OpenAI) → Module 5 (Resend) → Module 7 (Update Row) → **Module 20** ← DELETE THIS

**How to identify Module 20:**
- It's a **Google Sheets - Update Row** module
- It comes **after** Module 7
- It's trying to update Response Status and Follow-up Count

**Action:**
1. Click on **Module 20**
2. Click the **trash/delete icon** (or right-click → Delete)
3. Confirm deletion

---

### Step 3: Locate Module 21 (PRO Services Route)

**Where to find it:**
- Follow the **PRO Services** route from Router (Module 8)
- Flow: Router → Module 10 (OpenAI) → Module 11 (Resend) → Module 12 (Update Row) → **Module 21** ← DELETE THIS

**How to identify Module 21:**
- It's a **Google Sheets - Update Row** module
- It comes **after** Module 12
- It's trying to update Response Status and Follow-up Count

**Action:**
1. Click on **Module 21**
2. Click the **trash/delete icon** (or right-click → Delete)
3. Confirm deletion

---

### Step 4: Locate Module 22 (Company Formation Route)

**Where to find it:**
- Follow the **Company Formation** route from Router (Module 8)
- Flow: Router → Module 13 (OpenAI) → Module 14 (Resend) → Module 15 (Update Row) → **Module 22** ← DELETE THIS

**How to identify Module 22:**
- It's a **Google Sheets - Update Row** module
- It comes **after** Module 15
- It's trying to update Response Status and Follow-up Count

**Action:**
1. Click on **Module 22**
2. Click the **trash/delete icon** (or right-click → Delete)
3. Confirm deletion

---

### Step 5: Locate Module 23 (Default Route)

**Where to find it:**
- Follow the **Default/Other** route from Router (Module 8)
- Flow: Router → Module 16 (OpenAI) → Module 17 (Resend) → Module 18 (Update Row) → **Module 23** ← DELETE THIS

**How to identify Module 23:**
- It's a **Google Sheets - Update Row** module
- It comes **after** Module 18
- It's trying to update Response Status and Follow-up Count

**Action:**
1. Click on **Module 23**
2. Click the **trash/delete icon** (or right-click → Delete)
3. Confirm deletion

---

### Step 6: Save Scenario

1. Click **"Save"** button (top right)
2. Wait for confirmation that scenario is saved
3. Verify no error messages appear

---

## ✅ Verification Steps

### Test 1: Visual Verification

After deletion, your scenario should look like:

```
Module 1: Webhook
  ↓
Module 2: Google Sheets - Add Row
  ↓
Module 8: Router
  ├─→ Route 1: Accounting
  │     ├─ Module 3: OpenAI
  │     ├─ Module 5: Resend
  │     └─ Module 7: Update Row ✅ (NO Module 20)
  │
  ├─→ Route 2: PRO Services
  │     ├─ Module 10: OpenAI
  │     ├─ Module 11: Resend
  │     └─ Module 12: Update Row ✅ (NO Module 21)
  │
  ├─→ Route 3: Company Formation
  │     ├─ Module 13: OpenAI
  │     ├─ Module 14: Resend
  │     └─ Module 15: Update Row ✅ (NO Module 22)
  │
  └─→ Route 4: Default/Other
        ├─ Module 16: OpenAI
        ├─ Module 17: Resend
        └─ Module 18: Update Row ✅ (NO Module 23)
```

---

### Test 2: Test Each Route

**Test Route 1: Accounting**

1. Submit test form with service = "Accounting"
2. Check Make.com execution history
3. Verify:
   - ✅ Module 2 adds row successfully
   - ✅ Module 3 generates email content
   - ✅ Module 5 sends email
   - ✅ Module 7 updates row successfully
   - ✅ No errors
   - ✅ Google Sheets shows:
     - Email Status (R) = "Sent"
     - Response Status (U) = "No Response"
     - Follow-up Count (W) = "0"

**Test Route 2: PRO Services**

1. Submit test form with service = "PRO Services"
2. Check execution history
3. Verify same as Route 1 (but with Modules 10, 11, 12)

**Test Route 3: Company Formation**

1. Submit test form with service = "Company Formation"
2. Check execution history
3. Verify same as Route 1 (but with Modules 13, 14, 15)

**Test Route 4: Default/Other**

1. Submit test form with service = "Business Consulting" (or any other)
2. Check execution history
3. Verify same as Route 1 (but with Modules 16, 17, 18)

---

### Test 3: Check Google Sheets

After each test, verify in Google Sheets:

1. **New row added** with all form data
2. **Column R (Email Status)** = "Sent"
3. **Column S (Last Email Preview)** = Contains email content
4. **Column U (Response Status)** = "No Response"
5. **Column W (Follow-up Count)** = "0"

---

## 🚨 Troubleshooting

### Issue: Can't find Module 20/21/22/23

**Solution:**
- Look for modules that come **after** Modules 7, 12, 15, 18
- They should be **Google Sheets - Update Row** modules
- They should be trying to update columns 20 and 22

---

### Issue: Error after deletion

**Solution:**
- Check if any other modules are connected to deleted modules
- If yes, remove those connections
- Save and test again

---

### Issue: Module numbers changed

**Solution:**
- Make.com may renumber modules after deletion
- That's okay - just verify the flow is correct
- The important thing is that each route ends with ONE Update Row module

---

### Issue: Still getting errors

**Solution:**
1. Check Make.com execution history
2. Look for specific error messages
3. Verify Module 7, 12, 15, 18 are using `{{2.rowNumber}}` (not `{{1.email}}`)
4. If they're using `{{1.email}}`, fix them to use `{{2.rowNumber}}`

---

## 📊 Expected Results After Fix

### Scenario Structure

- **Total Modules:** 18 (down from 22)
- **Routes:** 4 (unchanged)
- **Update Modules:** 4 (Modules 7, 12, 15, 18)
- **No broken modules:** ✅

### Execution Flow

Each route should now:
1. ✅ Receive webhook
2. ✅ Add row to Google Sheets
3. ✅ Route to correct service path
4. ✅ Generate AI email
5. ✅ Send email
6. ✅ Update Google Sheets (once, correctly)
7. ✅ Complete without errors

---

## ✅ Final Checklist

After completing all steps:

- [ ] Module 20 deleted
- [ ] Module 21 deleted
- [ ] Module 22 deleted
- [ ] Module 23 deleted
- [ ] Scenario saved
- [ ] Tested Route 1 (Accounting) - ✅ Works
- [ ] Tested Route 2 (PRO Services) - ✅ Works
- [ ] Tested Route 3 (Company Formation) - ✅ Works
- [ ] Tested Route 4 (Default) - ✅ Works
- [ ] Google Sheets updates correctly
- [ ] No errors in execution history
- [ ] Response Status tracking works
- [ ] Follow-up Count tracking works

---

## 🎯 Next Steps (After Fix)

Once verified working:

1. **Monitor for 24 hours** - Watch execution history
2. **Check Google Sheets** - Verify all updates are correct
3. **Implement follow-up automation** - Use `MAKECOM_FOLLOWUP_AUTOMATION.md`
4. **Add email reply tracking** - When ready

---

## 📝 Notes

- **Backup:** Make.com auto-saves, but you can export scenario JSON as backup
- **Testing:** Use test email addresses to avoid spamming real clients
- **Monitoring:** Check execution history daily for first week
- **Documentation:** Keep this guide for future reference

---

**Estimated Time:** 10-15 minutes  
**Difficulty:** Easy  
**Risk:** Low (only deleting broken modules)

---

**Last Updated:** 2025-01-17  
**Status:** Ready to Implement

