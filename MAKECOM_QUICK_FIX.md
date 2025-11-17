# 🚨 Make.com Quick Fix - Column 6 Error

## Error Message
```
Failed to map 'values.6': Function 'replace' finished with error! 
Function 'ifEmpty' not found!
```

## ✅ Solution (30 seconds)

### In Make.com Module 2 (Google Sheets: addRow)

1. **Open Module 2**
2. **Click "Values" section**
3. **Find Column 6** (Service Interested)
4. **Remove ALL functions** - delete everything
5. **Type:** `{{1.service_interested}}`
6. **Save**

**That's it!**

## Why This Works

✅ The frontend `webhookClient.ts` **guarantees** `service_interested` is always sent  
✅ It automatically formats raw keys (e.g., "businessConsulting" → "Business Consulting")  
✅ Make.com will **always** receive this field  
✅ No fallback logic needed in Make.com

## Before vs After

**❌ BEFORE (causes error):**
```
{{ifEmpty(1.service_interested; replace(1.services; "businessConsulting"; "Business Consulting"))}}
```

**✅ AFTER (works perfectly):**
```
{{1.service_interested}}
```

## Also Check Module 7

If you have a Module 7 (updateRow), make sure Column 18 uses:
```
{{3.choices[1].message.content}}
```
NOT:
```
{{3.choices[].message.content}}
```
(The `[1]` index is required)

## Test After Fix

1. Save Make.com scenario
2. Submit a test form at https://smartpro-docs.vercel.app/consultation
3. Check Google Sheets - Column 6 should be populated
4. Check email - should include service name

---

**Need help?** The webhookClient already handles everything - Make.com just needs to map the variable!

