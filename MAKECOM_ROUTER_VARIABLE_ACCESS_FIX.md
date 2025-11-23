# Make.com Router Variable Access Fix

## Problem
- Module 7 filter: Still not matching (bundle filtered out)
- Module 8 email: `{{10.client_email}}` is empty (validation error)

## Root Cause
**Router routes in Make.com cannot access roundtrip variables from Set Variable modules.**

Even though Modules 9 and 10 complete successfully, their variables are not accessible inside router route flows.

## Solution: Use Google Sheets Data or Direct Module 3 Reference

Since Google Sheets (Module 2) completes before the router, we can reference data from there.

### Option 1: Use Google Sheets Data (Recommended)

The email is already stored in Google Sheets at column D (index 3).

**Fix Module 7 (Arabic Email):**
1. Open **Module 7** → Click **Edit**
2. Find the **To** field
3. Change from: `{{10.client_email}}`
4. Change to: `{{2.values[3]}}`
5. **Save**

**Fix Module 8 (English Email):**
1. Open **Module 8** → Click **Edit**
2. Find the **To** field
3. Change from: `{{10.client_email}}`
4. Change to: `{{2.values[3]}}`
5. **Save**

### Option 2: Use Direct Module 3 Reference

Some router configurations allow direct access to webhook data.

**Try in Module 7 & 8:**
- **To field**: `{{3.email}}`

If this doesn't work, use Option 1 (Google Sheets).

### Option 3: Fix Language Filter (Also Needed)

The language filter is also not working. Update filters to use direct normalization:

**Module 7 Filter:**
1. Open **Module 7** → Click **Filter** icon
2. Change condition from: `{{9.language_normalized}}` equals `ar`
3. Change to: `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}` equals `ar`
4. **Save**

**Module 8 Filter:**
1. Open **Module 8** → Click **Filter** icon
2. Change condition from: `{{9.language_normalized}}` equals `en`
3. Change to: `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}` equals `en`
4. **Save**

**OR** simpler if language is always "ar" or "en":
- Module 7: `{{lower(trim(3.language))}}` equals `ar`
- Module 8: `{{lower(trim(3.language))}}` equals `en`

## Complete Fix Steps

### Step 1: Fix Email Field (Both Modules)

**Module 7:**
- **To**: Change to `{{2.values[3]}}` (Google Sheets column D)

**Module 8:**
- **To**: Change to `{{2.values[3]}}` (Google Sheets column D)

### Step 2: Fix Language Filters (Both Modules)

**Module 7 Filter:**
- Use: `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}` equals `ar`

**Module 8 Filter:**
- Use: `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}` equals `en`

### Step 3: Test

1. **Save** the scenario
2. **Run** a test execution
3. **Check** execution log:
   - Module 7 or 8 should execute (depending on language)
   - Email should be sent successfully

## Why This Happens

Router routes in Make.com execute in a **separate execution context**. They cannot access:
- Roundtrip variables from Set Variable modules
- Data from modules that executed before the router

However, they CAN access:
- Data from the **trigger module** (Module 3 - Webhook)
- Data from modules that are **part of the router route flow**

## Alternative: Use Aggregator Module

If the above doesn't work, use an Aggregator to collect webhook data:

1. **Add Aggregator module** after Module 2
2. **Module ID**: 11
3. **Configuration**:
   - **Aggregation type**: "Array of bundles"
   - **Source module**: Module 3 (Webhook)
   - **Limit**: 1
4. **Output**: Creates `{{11.email}}`, `{{11.language}}`, etc.

Then use:
- **Email To**: `{{11.email}}`
- **Language Filter**: `{{replace(replace(lower(trim(11.language)); "arabic"; "ar"); "english"; "en")}}`

## Quick Fix Summary

**For Email To Field:**
- ❌ `{{10.client_email}}` (not accessible)
- ✅ `{{2.values[3]}}` (Google Sheets column D)
- ✅ `{{3.email}}` (try this first - direct webhook reference)

**For Language Filter:**
- ❌ `{{9.language_normalized}}` (not accessible)
- ✅ `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}` (direct normalization)
- ✅ `{{lower(trim(3.language))}}` (if language is always "ar" or "en")

## Expected Result After Fix

```
Webhook (3) ✅
  ↓
Google Sheets (2) ✅
  ↓
Set Variable (9) ✅ (can keep for other uses)
  ↓
Set Variable (10) ✅ (can keep for other uses)
  ↓
Router (4) ✅
  ├─ Route 1: {{lower(trim(3.language))}} = "ar"
  │   ↓
  │   Email 7: To = {{2.values[3]}} ✅
  │
  └─ Route 2: {{lower(trim(3.language))}} = "en"
      ↓
      Email 8: To = {{2.values[3]}} ✅
```

## Note About Set Variable Modules

You can **keep Modules 9 and 10** - they're not causing problems, they're just not accessible in router routes. They might be useful for other parts of your scenario or future modules.

The key is to use **direct references** (`{{3.email}}` or `{{2.values[3]}}`) in the router routes instead of the Set Variable outputs.

