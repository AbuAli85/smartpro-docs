# Final Configuration Fixes

## ✅ Good Progress!

You've added a Set Variable module for `submissionId` - great! But there are a few syntax issues to fix.

---

## ❌ Issues Found

### Issue 1: submissionId Formula in Set Variable (Module 3)

**Current (WRONG):**
```
sub_{{replace(replace(replace(replace(replace(1; "-"; ); "T"; ); ":"; ); "."; ); "Z"; )}}_{{substring(md5(1.2); 0; 8)}}
```

**Problems:**
- `1` should be `1.0` (Timestamp column)
- Empty replacement strings might cause issues

**Fix to:**
```
sub_{{replace(replace(replace(replace(replace(1.0; "-"; ""); "T"; ""); ":"; ""); "."; ""); "Z"; "")}}_{{substring(md5(1.2); 0; 8)}}
```

**Or simpler:**
```
sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}
```

---

### Issue 2: Services Array Syntax

**Current (WRONG):**
```
"{{split(1.7; \\ + \",\\\")}}"
```

**Fix to:**
```
{{split(1.7; ",")}}
```

---

### Issue 3: Language Field Escaping

**Current:**
```
{{if(1.15; 1.15; \\ + \"en\\\")}}
```

**Fix to:**
```
{{if(1.15; 1.15; "en")}}
```

---

### Issue 4: Source Field Escaping

**Current:**
```
{{if(1.16; 1.16; \\ + \"google_sheets\\\")}}
```

**Fix to:**
```
{{if(1.16; 1.16; "google_sheets")}}
```

---

## ✅ Complete Corrected Configuration

### Module 3: Set Variable (submissionId)

**Variable name:** `submissionId`  
**Value:**
```
sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}
```

**Or if you want to use Timestamp:**
```
sub_{{replace(replace(replace(replace(replace(1.0; "-"; ""); "T"; ""); ":"; ""); "."; ""); "Z"; "")}}_{{substring(md5(1.2); 0; 8)}}
```

---

### Module 2: Supabase (Create Row)

**Complete corrected mapper:**

```json
{
  "table": "consultation_submissions",
  "submissionId": "{{3.submissionId}}",
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
  "language": "{{if(1.15; 1.15; \"en\")}}",
  "source": "{{if(1.16; 1.16; \"google_sheets\")}}",
  "status": "pending",
  "webhookSent": false,
  "notes": "{{1.14}}",
  "createdAt": "{{1.0}}"
}
```

---

## 🔧 Step-by-Step Fixes

### Fix 1: Set Variable Module (Module 3)

1. **Open** Set Variable module
2. **Find** "Variable value" field
3. **Replace with:**
   ```
   sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}
   ```
4. **Save**

---

### Fix 2: Supabase Module (Module 2)

1. **Open** Supabase module
2. **Fix `services` field:**
   - Current: `{{split(1.7; \\ + \",\\\")}}`
   - Change to: `{{split(1.7; ",")}}`

3. **Fix `language` field:**
   - Current: `{{if(1.15; 1.15; \\ + \"en\\\")}}`
   - Change to: `{{if(1.15; 1.15; "en")}}`

4. **Fix `source` field:**
   - Current: `{{if(1.16; 1.16; \\ + \"google_sheets\\\")}}`
   - Change to: `{{if(1.16; 1.16; "google_sheets")}}`

5. **Save**

---

## ✅ Verify Connection

I see you have a new connection: `"Google Sheets to Supabase Sync"` (ID: 13374210)

**Make sure this connection is using `service_role` key:**
1. Click on Supabase module
2. Click on connection
3. Verify it's using `service_role` key (not `anon` key)
4. If not, update it with `service_role` key

---

## 📋 Final Checklist

- [ ] Set Variable `submissionId` formula fixed
- [ ] Supabase `services` field: `{{split(1.7; ",")}}`
- [ ] Supabase `language` field: `{{if(1.15; 1.15; "en")}}`
- [ ] Supabase `source` field: `{{if(1.16; 1.16; "google_sheets")}}`
- [ ] Connection using `service_role` key
- [ ] All modules saved
- [ ] Scenario saved
- [ ] Tested with "Run once"

---

## 🧪 Test After Fixes

1. **Save** scenario
2. **Run once**
3. **Check Operations:**
   - ✅ **Green** = Success!
   - ❌ **Red** = Check error message

4. **Verify in Supabase:**
   - **Table Editor** → `consultation_submissions`
   - Should see new row! ✅
   - `services` should be an array
   - `submissionId` should be unique

---

## 🎯 Quick Fix Summary

**3 things to fix:**

1. **Set Variable value:** `sub_{{1.__ROW_NUMBER__}}_{{substring(md5(1.2); 0; 8)}}`
2. **Services field:** `{{split(1.7; ",")}}`
3. **Language/Source fields:** Remove the `\\ +` escaping

**Plus:** Verify connection uses `service_role` key!

---

**Fix these 3 syntax issues and verify the API key - then it should work!** 🚀

