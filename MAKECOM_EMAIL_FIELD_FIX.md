# Make.com Email Field Fix - "Missing value of required parameter 'to'"

## Problem
Email modules are failing with:
```
Validation failed for 1 parameter(s).
Missing value of required parameter 'to'.
```

This happens because `{{3.email}}` is not accessible in router routes.

## Root Cause
Router routes in Make.com execute in a different context and cannot directly access data from earlier modules (like the webhook module 3).

## Solution: Pass Email Through Set Variable

Since you already have Set Variable module 9, add the email address there so it's accessible in router routes.

### Step 1: Update Set Variable Module 9

You need to set **multiple variables** in module 9, not just `language_normalized`.

1. **Open Module 9** (Set Variable)
2. **Add a second variable**:
   - **Variable name**: `client_email`
   - **Variable value**: `{{3.email}}`
   - **Variable lifetime**: `roundtrip` (same as language_normalized)

**OR** if Make.com only allows one variable per Set Variable module, create a **second Set Variable module**:

### Alternative: Add Module 10 (Set Variable for Email)

1. **Add a new Set Variable module** after Module 9
2. **Module ID**: 10
3. **Configuration**:
   - **Variable name**: `client_email`
   - **Variable value**: `{{3.email}}`
   - **Variable lifetime**: `roundtrip`

### Step 2: Update Email Modules to Use the Variable

**Module 7 (Arabic Email):**
1. Open **Module 7** → Click **Edit**
2. Find the **To** field
3. Change from: `{{3.email}}`
4. Change to: `{{9.client_email}}` (or `{{10.client_email}}` if you created module 10)

**Module 8 (English Email):**
1. Open **Module 8** → Click **Edit**
2. Find the **To** field
3. Change from: `{{3.email}}`
4. Change to: `{{9.client_email}}` (or `{{10.client_email}}` if you created module 10)

## Better Solution: Use Data Store or Aggregator

If Set Variable doesn't work, use an **Aggregator** module to collect all needed data:

### Option A: Use Aggregator Module

1. **Add Aggregator module** after Module 2 (Google Sheets)
2. **Module ID**: 10
3. **Configuration**:
   - **Aggregation type**: "Array of bundles"
   - **Source module**: Module 3 (Webhook)
   - **Limit**: 1
4. **Output**: Creates `{{10.email}}`, `{{10.client_name}}`, etc.

Then use `{{10.email}}` in email modules.

### Option B: Use Direct Reference (If Router Supports It)

Some Make.com router configurations allow direct module references. Try:

**Module 7 & 8 - To field:**
```
{{3.email}}
```

If this doesn't work, you must use one of the solutions above.

## Quick Fix: Check Router Configuration

The router might need to be configured to pass data through. Check:

1. **Open Router Module 4**
2. **Check if there's a "Pass data" or "Include data" option**
3. **Enable it** to pass webhook data to routes

## Recommended Solution: Multiple Set Variables

The cleanest approach is to set all needed fields in Set Variable modules:

### Module 9: Language Normalization
- Variable: `language_normalized`
- Value: `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}`

### Module 10: Client Data (NEW)
- Variable: `client_email`
- Value: `{{3.email}}`
- Variable: `client_name` (optional, for email personalization)
- Value: `{{3.client_name}}`

Then in email modules:
- **To**: `{{10.client_email}}`
- **Subject/Content**: Use `{{10.client_name}}` for personalization

## Verification

After applying the fix:

1. **Run a test execution**
2. **Check Module 9 (or 10)** output:
   - Should show `client_email` with the email address
3. **Check Email modules**:
   - **To** field should be populated
   - No "Missing value" errors

## Expected Flow

```
Webhook (3) ✅
  ↓
  { email: "user@example.com", language: "ar", ... }
  ↓
Google Sheets (2) ✅
  ↓
Set Variable (9) ✅
  ↓
  language_normalized = "ar"
  ↓
Set Variable (10) ✅ [NEW - if needed]
  ↓
  client_email = "user@example.com"
  ↓
Router (4) ✅
  ├─ Route 1: language = "ar"
  │   ↓
  │   Email 7: To = {{10.client_email}} ✅
  │
  └─ Route 2: language = "en"
      ↓
      Email 8: To = {{10.client_email}} ✅
```

## Alternative: Use Google Sheets Data

If Set Variable doesn't work, you can reference the email from Google Sheets:

**Module 7 & 8 - To field:**
```
{{2.values[3]}}
```

Where `values[3]` is the email column (column D, index 3) from the Google Sheets module.

**Note**: This requires the Google Sheets module to complete first, which it already does.

## Testing

1. **Submit a test form** with a valid email
2. **Check execution log**:
   - Module 3 should show email in webhook data
   - Module 9/10 should show email in variable output
   - Email modules should have email in "To" field
3. **Verify email is sent** to the correct address

