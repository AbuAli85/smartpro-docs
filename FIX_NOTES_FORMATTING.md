# Fix Notes Formatting Issue

## 🔧 Quick Fix for Backslash in Notes Field

### **Current Issue:**
Notes field shows: `\Reply: Test reply message...`  
Expected: `Reply: Test reply message...`

---

## 📝 **Solution: Update Make.com Formula**

### **Step 1: Open Make.com Scenario**

1. Go to [Make.com](https://www.make.com)
2. Open scenario: **"Email Reply Processing"**
3. Click on **Module 3** (Google Sheets - Update Row)

### **Step 2: Update Notes Formula**

**Current Formula (causing backslash):**
```
{{ifempty(2.values[31]; ""; 2.values[31] + "\n\n")}}Reply: {{1.message}}
```

**Fixed Formula (Option 1 - Recommended):**
```
{{ifempty(2.values[31]; ""; 2.values[31] + "\n\n")}}Reply: {{trim(1.message)}}
```

**Fixed Formula (Option 2 - If Option 1 doesn't work):**
```
{{ifempty(2.values[31]; ""; 2.values[31] + "\n\n")}}Reply: {{replace(1.message; "\\"; "")}}
```

**Fixed Formula (Option 3 - Clean approach):**
```
{{ifempty(2.values[31]; ""; 2.values[31] + "\n\n")}}Reply: {{1.message}}
```

### **Step 3: Test the Fix**

1. **Save** the module
2. **Run a test** using `TEST_EMAIL_REPLY.ps1`
3. **Check Google Sheets** - notes should now show: `Reply: [message]` (no backslash)

---

## 🔍 **Alternative: Fix in Google Sheets**

If you can't update Make.com right now, you can fix existing data in Google Sheets:

### **Option A: Formula Column**

Add a new column (e.g., AG) with formula:
```
=SUBSTITUTE(AF2, "\Reply:", "Reply:")
```

### **Option B: Find & Replace**

1. Select column AF (notes)
2. Press `Ctrl+H` (Find & Replace)
3. Find: `\Reply:`
4. Replace: `Reply:`
5. Click "Replace all"

---

## 🧪 **Test After Fix**

Run this test to verify the fix:

```powershell
# Quick test
$body = @{
    email = "luxsess2001@gmail.com"
    message = "Test fix - no backslash"
    subject = "Re: Test"
    from = "luxsess2001@gmail.com"
    body = "Test fix - no backslash"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hook.eu2.make.com/clvmjhusq0bo9kzikttimdzsannx65q1" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Expected Result:**
- Notes should show: `Reply: Test fix - no backslash`
- No backslash before "Reply:"

---

## 📋 **Checklist**

- [ ] Open Make.com scenario
- [ ] Navigate to Module 3
- [ ] Update notes formula
- [ ] Save module
- [ ] Run test
- [ ] Verify Google Sheets shows correct format
- [ ] Update documentation if needed

---

**Time Required:** 5 minutes  
**Difficulty:** Easy  
**Priority:** Optional (cosmetic fix)

