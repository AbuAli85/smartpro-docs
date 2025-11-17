# Make.com Column 6 Fix - Remove All Functions

## ❌ Current Error

```
Failed to map 'values.6': Function 'ifEmpty' not found!
```

## ✅ Solution: Use Simple Variable Only

### Step 1: Open Make.com Module 2

1. Go to Make.com scenario
2. Click **Module 2** (Google Sheets: addRow)
3. Click **Values** section
4. Find **Column 6** mapping

### Step 2: Remove ALL Functions

**Current (WRONG - has function):**
```
{{ifEmpty(1.service_interested; 1.services)}}
```
or
```
{{ifEmpty(1.service_interested; replace(...))}}
```

**Change to (CORRECT - simple variable):**
```
{{1.service_interested}}
```

**That's it!** No functions, no `ifEmpty`, no `replace` - just the variable.

### Step 3: Save

Click **Save** in Make.com.

## ✅ Why This Works

The `webhookClient.ts` fix I made ensures:
- ✅ `service_interested` is **ALWAYS** included in the payload
- ✅ If form doesn't send it, webhookClient adds it automatically
- ✅ Raw keys like "businessConsulting" are converted to "Business Consulting"
- ✅ Make.com will **ALWAYS** receive `service_interested` field

So Make.com Module 2 just needs to map it - no fallback needed!

## 📋 Complete Module 2 Values (Reference)

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

**Note:** Column 6 is just `{{1.service_interested}}` - no functions!

## 🔧 After Fix

1. **Remove the function** from Column 6
2. **Use simple variable:** `{{1.service_interested}}`
3. **Save** Make.com scenario
4. **Rebuild app** (if not already done):
   ```bash
   cd client
   pnpm build
   ```
5. **Deploy** to Vercel
6. **Test** with a form submission

## ✅ Expected Result

After fix:
- ✅ Make.com Module 2 maps Column 6 correctly
- ✅ No errors about missing functions
- ✅ Column 6 gets populated with "Business Consulting" (or whatever service)
- ✅ Email content includes service name

## ⚠️ Important Notes

- **Don't use any functions** in Make.com Module 2
- **Just use variables** like `{{1.service_interested}}`
- **The webhookClient handles all formatting** - Make.com just maps it
- **Simple is better** - complex functions cause errors

## 🎯 Quick Checklist

- [ ] Open Make.com Module 2
- [ ] Find Column 6 mapping
- [ ] Remove ALL functions (`ifEmpty`, `replace`, etc.)
- [ ] Set to: `{{1.service_interested}}`
- [ ] Save
- [ ] Test with form submission

That's all you need to do!

