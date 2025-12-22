# Critical Fixes Needed

## 🚨 Issue 1: Permission Error (Still Happening)

**Error:** `[403] permission denied for table consultation_submissions`

**Solution:** You MUST use `service_role` key, not `anon` key.

### Quick Fix:
1. **Supabase Dashboard** → **Settings** → **API**
2. Copy **`service_role`** key (the SECRET one)
3. **Make.com** → Supabase module → Connection → **Edit**
4. **Replace** the key with `service_role` key
5. **Save**

---

## 🚨 Issue 2: submissionId Formula Not Working

**Current (BROKEN):**
```
sub_202511Mo002019_{substring(md5(1.`2`); 0; 8)}}
```

**Problem:** 
- `formatDate` is not working correctly (showing `Mo` instead of proper date)
- `md5` function is showing as literal text instead of being evaluated

**This means Make.com is not evaluating the formula correctly.**

---

## ✅ Fix submissionId Formula

Make.com's `formatDate` function might not work as expected. Let's use a simpler approach:

### Option 1: Simple Timestamp-Based ID (Recommended)

**Replace submissionId with:**
```
sub_{{1.__ROW_NUMBER__}}_{{formatDate(now(); "yyyyMMddHHmmss")}}_{substring(md5(1.2); 0; 8)}}
```

**Or even simpler:**
```
sub_{{1.__ROW_NUMBER__}}_{{formatDate(now(); "yyyyMMddHHmmss")}}
```

### Option 2: Use Email + Timestamp

**Replace submissionId with:**
```
sub_{{replace(replace(replace(1.2; "@"; ""); "."; ""); "+"; "")}}_{{formatDate(now(); "yyyyMMddHHmmss")}}
```

This creates: `sub_chairmanfalconeyegroupnet_202511162002019`

### Option 3: Use Set Variables Module (Most Reliable)

Add a **"Set variables"** module between Google Sheets and Supabase:

1. **Add module** → **"Set variables"**
2. **Variable name:** `submissionId`
3. **Value:** 
   ```
   sub_{{formatDate(now(); "yyyyMMddHHmmss")}}_{substring(md5(1.2); 0; 8)}}
   ```
4. In Supabase module, use: `{{2.submissionId}}` (where 2 is the Set variables module number)

---

## 🔧 Recommended Fix: Use Set Variables

This is the most reliable approach:

### Step 1: Add Set Variables Module
1. In Make.com scenario, click **"Add a module"** between Google Sheets and Supabase
2. Search: **"Set variables"**
3. **Variable name:** `submissionId`
4. **Value:** 
   ```
   sub_{{formatDate(now(); "yyyyMMddHHmmss")}}_{substring(md5(1.2); 0; 8)}}
   ```
5. **Save**

### Step 2: Update Supabase Module
1. Open Supabase module
2. Find `submissionId` field
3. **Change to:** `{{2.submissionId}}` (where 2 is your Set variables module number)
4. **Save**

---

## ✅ Complete Fixed Configuration

### Module 1: Google Sheets (Watch rows)
- ✅ Already correct

### Module 2: Set Variables (NEW - Add this!)
- **Variable:** `submissionId`
- **Value:** `sub_{{formatDate(now(); "yyyyMMddHHmmss")}}_{substring(md5(1.2); 0; 8)}}`

### Module 3: Supabase (Create row)
- **submissionId:** `{{2.submissionId}}` (from Set Variables)
- All other fields: Same as before

---

## 🎯 Quick Action Items

1. **Fix API Key:**
   - [ ] Get `service_role` key from Supabase
   - [ ] Update Make.com connection
   - [ ] Save

2. **Fix submissionId:**
   - [ ] Add "Set variables" module
   - [ ] Set variable: `submissionId` with formula
   - [ ] Update Supabase module to use `{{2.submissionId}}`
   - [ ] Save

3. **Test:**
   - [ ] Run once
   - [ ] Check Operations (should be green)
   - [ ] Verify in Supabase

---

## 📋 Alternative: Simpler submissionId (If Set Variables Doesn't Work)

If Set Variables doesn't work, use this simpler formula directly in Supabase:

```
sub_{{1.__ROW_NUMBER__}}_{{formatDate(now(); "yyyyMMddHHmmss")}}
```

This creates: `sub_123_202511162002019`

**Or even simpler:**
```
sub_{{1.__ROW_NUMBER__}}_{{1.2}}
```

This creates: `sub_123_chairman@falconeyegroup.net`

---

## ⚠️ Most Important: Fix API Key First!

**The permission error MUST be fixed first!**

1. Use `service_role` key (not `anon` key)
2. Then fix the submissionId formula

---

## 🧪 Test After Fixes

1. **Save** scenario
2. **Run once**
3. **Check Operations:**
   - ✅ Should be green
   - ✅ No permission errors
   - ✅ submissionId should be properly formatted

4. **Check Supabase:**
   - ✅ Row created
   - ✅ submissionId is unique and formatted correctly
   - ✅ All fields populated

---

**Fix the API key first, then fix the submissionId formula!** 🎯

