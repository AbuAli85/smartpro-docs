# Make.com Simple Fix - No Complex Functions

## ❌ Problem

The complex `replace` function chain doesn't work in Make.com. Error:
```
Function 'replace' finished with error!
Function 'ifEmpty' not found!
```

## ✅ Simple Solution

### Option 1: Use Simple Mapping (Recommended)

**In Make.com Module 2, change Column 6 mapping from:**
```
{{1.service_interested}}
```

**To:**
```
{{1.service_interested}}
```

**BUT** - The form code I just fixed should now ALWAYS send `service_interested`, so this should work.

### Option 2: Use Make.com's Router (If Option 1 Doesn't Work)

If `service_interested` is still missing, use Make.com's router to format it:

1. **Add a new module** between Module 1 (Webhook) and Module 2 (addRow)
2. **Use "Set variable" module** to format the service
3. **Map the formatted value** to Column 6

But this is complex. Better to fix at source.

### Option 3: Use Make.com's Text Functions (Simpler)

**Change Column 6 to:**
```
{{1.service_interested}}
```

**If that's empty, try:**
```
{{1.services}}
```

But Make.com doesn't have `ifEmpty` function. You need to use a different approach.

## 🎯 Best Solution: Fix at Source

I just fixed the `webhookClient.ts` to **ALWAYS** add `service_interested` even if the form doesn't send it. This means:

1. **Form sends:** `services: "businessConsulting"` (raw key)
2. **webhookClient adds:** `service_interested: "Business Consulting"` (formatted)
3. **Make.com receives:** Both fields, with `service_interested` always present
4. **Module 2 maps:** `{{1.service_interested}}` → Column 6 gets "Business Consulting"

## ✅ What You Need to Do

### Step 1: Rebuild the App

The fix is in the code, but you need to deploy it:

```bash
cd client
pnpm build
```

Then deploy to Vercel (or your hosting).

### Step 2: Keep Make.com Module 2 Simple

**Just use:**
```
{{1.service_interested}}
```

**Don't use complex functions** - the webhookClient now ensures this field is always present.

### Step 3: Test

1. Submit a form
2. Check Make.com execution → Module 1 → Should see `service_interested: "Business Consulting"`
3. Check Google Sheets → Column 6 should be populated

## 🔧 If Make.com Still Shows Empty

If Column 6 is still empty after the fix:

1. **Check Make.com Module 1 output:**
   - Does it show `service_interested` field?
   - What is its value?

2. **Check the mapping:**
   - Module 2 → Column 6 → Should be exactly: `{{1.service_interested}}`
   - No functions, no complex syntax

3. **Verify field name:**
   - Make.com might be case-sensitive
   - Try: `{{1.service_interested}}` (with underscore, lowercase)

## 📋 Make.com Module 2 - Correct Mapping

**Use this EXACT mapping (no functions):**

```json
{
  "0": "{{now}}",
  "1": "{{1.client_name}}",
  "2": "{{1.email}}",
  "3": "{{1.phone}}",
  "4": "{{1.business_name}}",
  "5": "{{1.business_type}}",
  "6": "{{1.service_interested}}",
  "7": "{{1.services}}",
  "8": "{{1.budget}}",
  "9": "{{1.timeline}}",
  "10": "{{1.preferred_contact}}",
  "11": "{{1.preferred_time}}",
  "12": "{{1.location}}",
  "13": "{{1.message}}",
  "14": "{{1.notes}}",
  "15": "{{1.language}}",
  "16": "{{1.source}}",
  "17": "Pending",
  "18": ""
}
```

**No `ifEmpty`, no `replace`, no complex functions** - just simple variable mapping.

## ⚠️ Important

The fix I made to `webhookClient.ts` ensures `service_interested` is **ALWAYS** included in the payload sent to Make.com. So Make.com Module 2 just needs to map `{{1.service_interested}}` - no fallback needed!

After you rebuild and deploy, test again. Column 6 should now populate correctly.

