# Make.com Language Filter Debugging Guide

## Problem
Both email modules (7 and 8) are still being filtered out even though:
- ✅ Set Variable module 9 completes successfully
- ✅ Filters are configured to use `{{9.language_normalized}}`

This means `{{9.language_normalized}}` is not exactly `"ar"` or `"en"`.

## Debugging Steps

### Step 1: Check the Actual Value in Set Variable Module 9

1. **Run a test execution** with a form submission
2. **Click on Module 9** (Set Variable) in the execution log
3. **Check the output** - Look for `language_normalized` field
4. **Note the exact value** - It might be:
   - Empty/null
   - Has extra spaces: `" ar "` or `" en "`
   - Has unexpected characters
   - Not accessible in router routes

### Step 2: Check the Webhook Input (Module 3)

1. **Click on Module 3** (Webhook) in the execution log
2. **Check the `language` field** value
3. **Note the exact value** - Common issues:
   - `null` or `undefined`
   - Empty string `""`
   - Extra spaces: `" ar "` or `" en "`
   - Different case: `"AR"`, `"En"`, etc.
   - Different format: `"Arabic"`, `"English"`, etc.

### Step 3: Verify Set Variable Expression

The expression in Module 9 should be:
```
{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}
```

**Common issues:**
- Missing quotes around "arabic" or "ar"
- Wrong module reference (should be `3.language`, not `1.language`)
- Syntax errors in the expression

### Step 4: Test the Expression Directly

Add a temporary **Text Parser** or **Set Variable** module to test:

1. **Create a test module** after Module 9
2. **Use this expression** to see the raw value:
   ```
   {{3.language}}
   ```
3. **And this to see the normalized value**:
   ```
   {{9.language_normalized}}
   ```

## Common Issues & Fixes

### Issue 1: Variable Not Accessible in Router Routes

**Problem**: Set Variable with `scope: "roundtrip"` might not be accessible in router routes.

**Fix**: Change the scope or use a different approach:

**Option A: Use direct filter expression**
Update filters to normalize directly:

**Module 7 Filter:**
```
{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}} equals ar
```

**Module 8 Filter:**
```
{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}} equals en
```

**Option B: Change Set Variable scope**
1. Open Module 9 (Set Variable)
2. Change **Variable lifetime** from "One cycle" to "Execution"
3. Save and test

### Issue 2: Language Value is Null or Empty

**Problem**: `{{3.language}}` might be `null`, `undefined`, or empty string.

**Fix**: Add a default value in the Set Variable expression:

```
{{if(3.language = ""; "en"; replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en"))}}
```

Or simpler:
```
{{ifempty(3.language; "en"; replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en"))}}
```

### Issue 3: Language Value Has Unexpected Format

**Problem**: The language value might be something like `"Arabic"`, `"AR"`, `"english"`, etc.

**Fix**: The current expression should handle this, but verify:
- `lower()` converts to lowercase
- `trim()` removes spaces
- `replace()` converts "arabic" → "ar" and "english" → "en"

**Test with these values:**
- `"ar"` → should become `"ar"` ✅
- `"en"` → should become `"en"` ✅
- `"Arabic"` → should become `"ar"` ✅
- `"English"` → should become `"en"` ✅
- `" AR "` → should become `"ar"` ✅
- `"EN"` → should become `"en"` ✅

### Issue 4: Router Routes Can't Access Roundtrip Variables

**Problem**: Router routes might execute in a different context where roundtrip variables aren't available.

**Solution**: Use direct filter expressions instead of Set Variable.

## Recommended Fix: Use Direct Filter Expressions

Instead of using Set Variable, normalize directly in the filter conditions:

### Module 7 (Arabic Email) - Updated Filter

1. Open **Module 7** → Click **Filter** icon
2. Change the condition to:
   - **Field A**: `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}`
   - **Operator**: `equals`
   - **Value**: `ar`

### Module 8 (English Email) - Updated Filter

1. Open **Module 8** → Click **Filter** icon
2. Change the condition to:
   - **Field A**: `{{replace(replace(lower(trim(3.language)); "arabic"; "ar"); "english"; "en")}}`
   - **Operator**: `equals`
   - **Value**: `en`

### Alternative: Simpler Expression (If Language is Always "ar" or "en")

If your webhook always sends exactly `"ar"` or `"en"`, use a simpler filter:

**Module 7 Filter:**
```
{{lower(trim(3.language))}} equals ar
```

**Module 8 Filter:**
```
{{lower(trim(3.language))}} equals en
```

## Quick Test

1. **Add a Text Parser module** after Module 9
2. **Parse this text**: `{{9.language_normalized}}`
3. **Check the output** - This will show you exactly what value is stored

Or use **Tools → Set Variable** to create a debug variable:
- Variable name: `debug_language`
- Variable value: `{{9.language_normalized}}`
- Then check this variable in the execution log

## Expected Values

After normalization, `language_normalized` should be:
- Exactly `"ar"` (no quotes, no spaces) for Arabic
- Exactly `"en"` (no quotes, no spaces) for English

If you see:
- `" ar "` → Add `trim()` (already in expression)
- `"AR"` → Add `lower()` (already in expression)
- `null` or empty → Add default value handling
- Variable not found → Change scope or use direct expression

## Next Steps

1. **Check Module 9 output** in execution log
2. **Note the exact value** of `language_normalized`
3. **Update filters** based on what you find:
   - If value is correct but filters don't work → Use direct filter expressions
   - If value is wrong → Fix the Set Variable expression
   - If value is null/empty → Add default value handling

