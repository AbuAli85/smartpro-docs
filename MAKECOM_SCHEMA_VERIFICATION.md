# Make.com Schema Verification & Fix

## 📋 Your Supabase Table Schema

Based on your schema, here are the critical points:

### ✅ Required Fields (NOT NULL)
- `submissionId` - **REQUIRED** (unique)
- `name` - **REQUIRED**
- `email` - **REQUIRED**
- `services` - **REQUIRED** (array: `text[]`)
- `primaryService` - **REQUIRED**

### ⚠️ Important: `services` is an ARRAY

Your schema shows:
```sql
services text[] not null default '{}'::text[]
```

This means `services` **MUST be an array**, not a string!

---

## 🔍 Current Make.com Mapping Issues

### Issue 1: Services Array Format

**Current in Make.com:**
```
"services": "{{split(1.`7`; ",")}}"
```

**Problem:** Make.com might be sending this as a string instead of an array.

**Fix:** Ensure Make.com sends it as an array. The `split()` function should create an array, but verify it's working correctly.

---

## ✅ Correct Make.com Field Mappings

Based on your schema, here's what Make.com should send:

| Supabase Field | Make.com Value | Required | Notes |
|---------------|---------------|----------|-------|
| `submissionId` | `sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}` | ✅ YES | Must be unique |
| `name` | `{{1.1}}` | ✅ YES | Client Name |
| `email` | `{{1.2}}` | ✅ YES | Email |
| `services` | `{{split(1.7; ",")}}` | ✅ YES | **MUST be array** |
| `primaryService` | `{{1.6}}` | ✅ YES | Service Interested |
| `phone` | `{{1.3}}` | Optional | Phone |
| `location` | `{{1.12}}` | Optional | Location |
| `company` | `{{1.4}}` | Optional | Business Name |
| `businessType` | `{{1.5}}` | Optional | Business Type |
| `budget` | `{{1.8}}` | Optional | Budget |
| `timeline` | `{{1.9}}` | Optional | Timeline |
| `preferredContact` | `{{1.10}}` | Optional | Preferred Contact |
| `preferredTime` | `{{1.11}}` | Optional | Preferred Time |
| `message` | `{{1.13}}` | Optional | Primary Message |
| `notes` | `{{1.14}}` | Optional | Notes / Extra Info |
| `language` | `{{1.15}}` or `"en"` | Optional | Defaults to "en" |
| `source` | `{{1.16}}` or `"google_sheets"` | Optional | Defaults to "consultation-form" |
| `status` | `"pending"` | Optional | Defaults to "pending" |
| `webhookSent` | `false` | Optional | Defaults to false |
| `createdAt` | `{{1.0}}` | Optional | Defaults to now() |

---

## 🔧 Fix Services Array in Make.com

### Option 1: Verify Split Function Works

In Make.com Supabase module, the `services` field should be:
```
{{split(1.7; ",")}}
```

**Test:** When you run the scenario, check the data bundle. The `services` field should show as an array like:
```json
["VAT", "Accounting", "PRO Services"]
```

**NOT** as a string like:
```json
"VAT, Accounting, PRO Services"
```

### Option 2: Use Set Variables to Ensure Array

If `split()` doesn't create a proper array:

1. **Add "Set variables" module** between Google Sheets and Supabase
2. **Variable name:** `servicesArray`
3. **Value:** `{{split(1.7; ",")}}`
4. In Supabase module, use: `{{2.servicesArray}}`

### Option 3: Use Text Parser Module

1. **Add "Text parser" module** between Google Sheets and Supabase
2. **Text:** `{{1.7}}` (Services Full List)
3. **Delimiter:** `,`
4. In Supabase module, use: `{{2.parsed}}` (this creates an array)

---

## ⚠️ Common Issues with Your Schema

### Issue 1: Services Must Be Array

**Error you might see:**
```
column "services" is of type text[] but expression is of type text
```

**Fix:** Ensure Make.com sends an array, not a string.

### Issue 2: Required Fields Missing

**Error you might see:**
```
null value in column "services" violates not-null constraint
```

**Fix:** Ensure all required fields are mapped:
- `submissionId` ✅
- `name` ✅
- `email` ✅
- `services` ✅ (must be array, not empty)
- `primaryService` ✅

---

## ✅ Complete Verified Make.com Mapper

Here's the complete mapper that matches your schema:

```json
{
  "table": "consultation_submissions",
  "submissionId": "sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}",
  "name": "{{1.1}}",
  "email": "{{1.2}}",
  "phone": "{{1.3}}",
  "location": "{{1.12}}",
  "company": "{{1.4}}",
  "businessType": "{{1.5}}",
  "services": "{{split(1.7; \",\")}}",
  "primaryService": "{{1.6}}",
  "budget": "{{1.8}}",
  "timeline": "{{1.9}}",
  "preferredContact": "{{1.10}}",
  "preferredTime": "{{1.11}}",
  "message": "{{1.13}}",
  "notes": "{{1.14}}",
  "language": "{{if(1.15; 1.15; \"en\")}}",
  "source": "{{if(1.16; 1.16; \"google_sheets\")}}",
  "status": "pending",
  "webhookSent": false,
  "createdAt": "{{1.0}}"
}
```

---

## 🧪 Test Services Array

### Step 1: Check Data Bundle
1. **Run scenario** in Make.com
2. **Click** on Supabase module
3. **Click** on the execution
4. **Check** the input data bundle
5. **Look** at `services` field:
   - ✅ Should be: `["VAT", "Accounting"]` (array)
   - ❌ Should NOT be: `"VAT, Accounting"` (string)

### Step 2: If Services is String
If `services` shows as a string, use Text Parser module (Option 3 above).

---

## 🎯 Most Important: Services Array

**Your schema requires `services` to be an array (`text[]`).**

**Make.com must send:**
```json
"services": ["VAT", "Accounting", "PRO Services"]
```

**NOT:**
```json
"services": "VAT, Accounting, PRO Services"
```

---

## ✅ Verification Checklist

- [ ] `submissionId` is mapped and unique
- [ ] `name` is mapped (required)
- [ ] `email` is mapped (required)
- [ ] `services` is an **ARRAY** (required) - **CRITICAL!**
- [ ] `primaryService` is mapped (required)
- [ ] Using `service_role` API key (not `anon`)
- [ ] All optional fields mapped correctly

---

## 🔧 If Services Array Still Doesn't Work

### Use Text Parser Module:

1. **Add "Text parser"** between Google Sheets and Supabase
2. **Text:** `{{1.7}}`
3. **Delimiter:** `,`
4. In Supabase, use: `{{2.parsed}}` (this is guaranteed to be an array)

---

**The key issue is ensuring `services` is sent as an array, not a string!** 🎯

