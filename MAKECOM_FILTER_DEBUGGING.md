# Make.com Filter Debugging Guide

## Problem
Both email modules (7 and 8) are still being filtered out even after updating filters.

## Debugging Steps

### Step 1: Check What Language Value is Actually Being Received

1. **Run a test execution**
2. **Click on Module 3** (Webhook) in the execution log
3. **Check the `language` field** - Note the EXACT value:
   - Is it `"ar"` or `"en"`?
   - Is it `"Arabic"` or `"English"`?
   - Is it `null` or empty?
   - Does it have extra spaces: `" ar "` or `" en "`?
   - Is it uppercase: `"AR"` or `"EN"`?

### Step 2: Test with Simplest Filter First

Before using complex normalization, test with the simplest possible filter:

**Module 7 Filter (Test):**
- **Field A**: `{{3.language}}`
- **Operator**: `equals`
- **Value**: `ar` (exactly as it appears in webhook)

**Module 8 Filter (Test):**
- **Field A**: `{{3.language}}`
- **Operator**: `equals`
- **Value**: `en` (exactly as it appears in webhook)

**Save and test** - If this works, then the issue is with the normalization expression.

### Step 3: If Simple Filter Doesn't Work

The language value might be different than expected. Try these variations:

**Option A: Case Insensitive**
- Module 7: `{{lower(3.language)}}` equals `ar`
- Module 8: `{{lower(3.language)}}` equals `en`

**Option B: Trim Whitespace**
- Module 7: `{{trim(3.language)}}` equals `ar`
- Module 8: `{{trim(3.language)}}` equals `en`

**Option C: Both**
- Module 7: `{{lower(trim(3.language))}}` equals `ar`
- Module 8: `{{lower(trim(3.language))}}` equals `en`

### Step 4: Check Filter Syntax

Make sure the filter expression is correct. In Make.com UI:

1. **Open the filter**
2. **Click on Field A** to edit
3. **Type or paste** the expression
4. **Make sure there are no extra quotes or characters**

Common mistakes:
- ❌ `"{{3.language}}"` (extra quotes)
- ✅ `{{3.language}}` (correct)

### Step 5: Verify Router Configuration

Check if the router is configured correctly:

1. **Open Router Module 4**
2. **Check route configuration**
3. **Make sure routes are set up correctly**

## Alternative: Use Text Parser to Debug

Add a **Text Parser** module after Module 3 to see the actual language value:

1. **Add Text Parser module** after Module 3
2. **Parse**: `{{3.language}}`
3. **Check output** - This will show you exactly what value is being received

## Most Likely Issues

### Issue 1: Language Value is Not "ar" or "en"

**Solution**: Use full normalization expression:
```
{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}
```

### Issue 2: Language Value is Null or Empty

**Solution**: Add default handling in filter:
```
{{ifempty(3.language; "en"; replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en"))}}
```

### Issue 3: Router Can't Access Module 3 Data

**Solution**: Try using Google Sheets data instead:
- Module 7: `{{2.values[16]}}` equals `ar` (column Q - language)
- Module 8: `{{2.values[16]}}` equals `en`

## Recommended Test Sequence

1. **Test 1**: Simple filter `{{3.language}}` equals `ar` / `en`
   - If works → Language is exactly "ar" or "en"
   - If fails → Continue to Test 2

2. **Test 2**: Lowercase `{{lower(3.language)}}` equals `ar` / `en`
   - If works → Language has case issues
   - If fails → Continue to Test 3

3. **Test 3**: Trim `{{trim(3.language)}}` equals `ar` / `en`
   - If works → Language has whitespace
   - If fails → Continue to Test 4

4. **Test 4**: Full normalization `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}` equals `ar` / `en`
   - If works → Language needs full normalization
   - If fails → Check if router can access Module 3 data

5. **Test 5**: Use Google Sheets data `{{2.values[16]}}` equals `ar` / `en`
   - If works → Router can't access Module 3, use Module 2 instead

## Quick Fix: Try Google Sheets Language

If Module 3 data isn't accessible in router routes, use the language from Google Sheets:

**Module 7 Filter:**
- **Field A**: `{{2.values[16]}}` (column Q - language)
- **Operator**: `equals`
- **Value**: `ar`

**Module 8 Filter:**
- **Field A**: `{{2.values[16]}}` (column Q - language)
- **Operator**: `equals`
- **Value**: `en`

**OR** with normalization:
- Module 7: `{{lower(trim(2.values[16]))}}` equals `ar`
- Module 8: `{{lower(trim(2.values[16]))}}` equals `en`

## Expected Values

After checking Module 3 output, the language should be one of:
- `"ar"` or `"en"` (most likely)
- `"Arabic"` or `"English"` (needs normalization)
- `"AR"` or `"EN"` (needs lowercase)
- `" ar "` or `" en "` (needs trim)
- `null` or empty (needs default)

## Next Steps

1. **Check Module 3 output** - See actual language value
2. **Try simplest filter first** - `{{3.language}}` equals `ar` / `en`
3. **If that doesn't work**, try `{{lower(trim(3.language))}}`
4. **If still doesn't work**, try using Google Sheets: `{{2.values[16]}}`
5. **Report back** what value you see in Module 3 output

This will help us identify the exact issue and provide the correct fix.

