# Make.com Google Sheets Values Access

## Problem
Google Sheets "Add a Row" output shows metadata but `{{2.values[3]}}` is empty for email.

## Understanding Google Sheets Output

The "Add a Row" module returns:
- `rowNumber`: The row that was added
- `updatedRange`: The range that was updated
- But NOT the actual `values` array in some cases

However, since `{{2.values[16]}}` works for the language filter, the values ARE accessible - just need the right syntax.

## Solution: Check How Values Are Accessed

### Step 1: Verify Values Array Exists

In Make.com, when you click on Module 2 output, do you see:
- A `values` field/array?
- Individual fields like `values[0]`, `values[1]`, etc.?

### Step 2: Try Different Access Methods

Since `{{2.values[16]}}` works for language, try these for email:

**Option 1: Same syntax (should work)**
- `{{2.values[3]}}` - Should work if language works

**Option 2: Check if email is at different index**
- The email might not be at index 3
- Check all values: `{{2.values[0]}}`, `{{2.values[1]}}`, etc.
- Find which index contains the email

**Option 3: Use rowNumber to get data**
- If Make.com supports it: `{{2.rowNumber}}` gives you the row
- Then query that row to get email (requires additional module)

## Most Likely Issue: Email Value is Empty

Since the filter works, the most likely issue is that **the email value is actually empty** in the webhook payload.

### Check This:

1. **Open Module 3** (Webhook) output
2. **Check the `email` field**:
   - Is it populated?
   - Is it empty/null?
   - What is the exact value?

If email is empty in Module 3, it will be empty in Module 2 too.

## Solution: Use Webhook Data Directly

Since router routes can access webhook data (we know this because filters can use expressions), try accessing it differently:

### Option 1: Direct Webhook Access in Email Field

In Make.com email modules, the "To" field might need to be set up differently:

1. **Open Module 8** → Click **Edit**
2. **Find the To field**
3. **Click the mapping icon** (if available)
4. **Select from Module 3** (Webhook) data
5. **Choose `email` field directly**

This uses Make.com's data mapper instead of typing the expression manually.

### Option 2: Use Aggregator Correctly

If you need to use Aggregator:

1. **Add Aggregator** after Module 2
2. **Source Module**: Module 3 (Webhook) - NOT Module 2
3. **Aggregation Type**: "Array of bundles"
4. **Limit**: 1
5. **Output**: Creates `{{11.email}}`, `{{11.language}}`, etc.

Then use:
- **Email To**: `{{11.email}}`
- **Language Filter**: `{{lower(trim(11.language))}}`

## Quick Fix: Use Data Mapper

Instead of typing `{{2.values[3]}}` manually:

1. **Open Module 8** → Click **Edit**
2. **Click on the To field**
3. **Click the mapping/data icon** (usually a small icon next to the field)
4. **Browse available data**:
   - Look for Module 3 (Webhook) → `email`
   - Or Module 2 (Google Sheets) → find email field
5. **Select the email field** from the mapper

This ensures you're using the correct field reference.

## Alternative: Check Backend

If email is consistently empty, check your backend code:

1. **Verify email is being sent** in webhook payload
2. **Check validation** - is email being filtered out?
3. **Check trimming** - is email being trimmed to empty string?

## Summary

**Next Steps:**
1. ✅ Check Module 3 output - Is email populated?
2. ✅ Use Make.com's data mapper to select email field (don't type manually)
3. ✅ If email is empty, fix backend to ensure email is sent
4. ✅ If needed, use Aggregator to make webhook data accessible

The filter is working, so data IS accessible - we just need to find the correct way to access the email field!

