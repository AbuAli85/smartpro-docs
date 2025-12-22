# Make.com Scenario Fixes

## Issues Found in Your Current Configuration

### ❌ Issue 1: Services Array Syntax is Wrong
**Current (WRONG):**
```
{{split(1.Services + (Full + List); ",")}}
```

**Should be:**
```
{{split(1.7; ",")}}
```
Where `7` is the column index for "Services (Full List)" (column H)

---

### ❌ Issue 2: Missing `submissionId`
**Problem:** Supabase requires `submissionId` but you're only setting `id` (which Supabase auto-generates)

**Solution:** Add `submissionId` field with unique value:
```
sub_{{formatDate(1.0; "yyyyMMddHHmmss")}}_{substring(md5(1.2); 0; 8)}}
```
- `1.0` = Timestamp column
- `1.2` = Email column

---

### ❌ Issue 3: Wrong Field Mappings
**Current mappings need correction:**

| Supabase Field | Current Mapping | Should Be |
|---------------|----------------|-----------|
| `budget` | `{{1.8}}` | ✅ Correct (Column I) |
| `timeline` | `{{1.9}}` | ✅ Correct (Column J) |
| `preferredContact` | `{{1.10}}` | ✅ Correct (Column K) |
| `preferredTime` | `{{1.11}}` | ✅ Correct (Column L) |
| `location` | `{{1.12}}` | ✅ Correct (Column M) |
| `message` | `{{1.13}}` | ✅ Correct (Column N) |
| `notes` | Missing | Should be `{{1.14}}` (Column O) |
| `createdAt` | Missing | Should be `{{1.0}}` (Column A - Timestamp) |

---

### ❌ Issue 4: Status Field
**Current:** `{{1.20}}` (Response Status from Google Sheets)

**Problem:** This maps to "Response Status" which might be "No Response", "Pending", etc. But Supabase `status` expects: `pending`, `contacted`, `completed`, `cancelled`

**Solution:** Either:
1. Map to `{{1.20}}` and transform it, OR
2. Set default: `pending` (since these are new rows from Google Sheets)

---

## ✅ Corrected Field Mappings

Here's the complete corrected mapper for Supabase module:

```json
{
  "table": "consultation_submissions",
  "submissionId": "sub_{{formatDate(1.0; \"yyyyMMddHHmmss\")}}_{substring(md5(1.2); 0; 8)}}",
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
  "language": "{{1.15}}",
  "source": "{{if(1.16; 1.16; \"google_sheets\")}}",
  "status": "pending",
  "createdAt": "{{1.0}}",
  "webhookSent": false
}
```

---

## 📋 Column Index Reference

Based on your Make.com interface:

| Column | Index | Field Name | Supabase Field |
|--------|-------|------------|----------------|
| A | `0` | Timestamp | `createdAt` |
| B | `1` | Client Name | `name` |
| C | `2` | Email | `email` |
| D | `3` | Phone | `phone` |
| E | `4` | Business Name | `company` |
| F | `5` | Business Type | `businessType` |
| G | `6` | Service Interested | `primaryService` |
| H | `7` | Services (Full List) | `services` (array) |
| I | `8` | Budget | `budget` |
| J | `9` | Timeline | `timeline` |
| K | `10` | Preferred Contact | `preferredContact` |
| L | `11` | Preferred Time | `preferredTime` |
| M | `12` | Location | `location` |
| N | `13` | Primary Message | `message` |
| O | `14` | Notes / Extra Info | `notes` |
| P | `15` | Language | `language` |
| Q | `16` | Source | `source` |

---

## 🔧 Step-by-Step Fix Instructions

### 1. Fix Services Array
1. Open Supabase module
2. Find `services` field
3. Replace with: `{{split(1.7; ",")}}`
4. If your data uses semicolons, use: `{{split(1.7; ";")}}`

### 2. Add submissionId
1. In Supabase module, find `submissionId` field
2. Add: `sub_{{formatDate(1.0; "yyyyMMddHHmmss")}}_{substring(md5(1.2); 0; 8)}}`
3. This creates unique ID like: `sub_20241116123456_a1b2c3d4`

### 3. Add Missing Fields
1. Add `notes` field: `{{1.14}}`
2. Add `createdAt` field: `{{1.0}}`
3. Set `status` to: `pending` (or map from `{{1.20}}` if you want)
4. Set `webhookSent` to: `false`

### 4. Fix Source Field
1. Update `source` to: `{{if(1.16; 1.16; "google_sheets")}}`
2. This uses Google Sheets value if exists, otherwise defaults to "google_sheets"

---

## ⚠️ Important Notes

### Services Array Format
- If your Google Sheets has: `"VAT, Accounting, PRO Services"`
- The split function will create: `["VAT", " Accounting", " PRO Services"]`
- Note: There might be spaces after commas - you may need to trim them

**Better solution (with trim):**
Use a "Set variables" module to clean the services first:
```
{{replace(replace(1.7; " "; ""); ", "; ",")}}
```

### Timestamp Format
- Make.com should handle the timestamp conversion automatically
- If you get errors, use "Parse date" module before Supabase

### Duplicate Prevention
- Consider adding a Filter module to check if email already exists in Supabase
- Or use "Update row" instead of "Create row" if you want to update existing records

---

## ✅ Final Checklist

- [ ] Fixed `services` field syntax: `{{split(1.7; ",")}}`
- [ ] Added `submissionId` with unique value
- [ ] Added `notes` field: `{{1.14}}`
- [ ] Added `createdAt` field: `{{1.0}}`
- [ ] Set `status` to `pending` or map from Response Status
- [ ] Set `webhookSent` to `false`
- [ ] Fixed `source` field with fallback
- [ ] Removed incorrect `id` mapping (Supabase auto-generates this)

---

## 🧪 Test Your Scenario

1. **Save** the scenario
2. **Run once** with a test row
3. **Check Operations** tab for errors
4. **Verify in Supabase** that:
   - Row was created
   - `submissionId` is unique
   - `services` is an array (not a string)
   - All fields are mapped correctly

---

## 🎉 That's It!

After these fixes, your scenario should work correctly! 🚀
