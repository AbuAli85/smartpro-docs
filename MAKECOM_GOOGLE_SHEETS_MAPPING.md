# Make.com: Google Sheets → Supabase Field Mapping

**Your Google Sheet:** `smartpro leads /leads`  
**Supabase Table:** `consultation_submissions`

---

## 📋 Complete Field Mapping

### ✅ Direct Mappings (Match Column Names)

| Google Sheets Column | Supabase Field | Notes |
|---------------------|----------------|-------|
| `Timestamp` | `createdAt` | Convert to DateTime format |
| `Client Name` | `name` | Direct mapping |
| `Email` | `email` | Direct mapping |
| `Phone` | `phone` | Direct mapping |
| `Business Name` | `company` | Direct mapping |
| `Business Type` | `businessType` | Direct mapping |
| `Service Interested` | `primaryService` | Direct mapping |
| `Services (Full List)` | `services` | **Array** - See special handling below |
| `Budget` | `budget` | Direct mapping |
| `Timeline` | `timeline` | Direct mapping |
| `Preferred Contact` | `preferredContact` | Direct mapping |
| `Preferred Time` | `preferredTime` | Direct mapping |
| `Location` | `location` | Direct mapping |
| `Primary Message` | `message` | Direct mapping |
| `Notes / Extra Info` | `notes` | Direct mapping |
| `Language` | `language` | Direct mapping (en/ar) |
| `Source` | `source` | Direct mapping |

---

## 🔧 Special Handling Required

### 1. **Services Array** (`Services (Full List)` → `services`)

**Problem:** Supabase expects an array `["service1", "service2"]`, but Google Sheets might have:
- Comma-separated: `"VAT, Accounting, PRO Services"`
- Semicolon-separated: `"VAT; Accounting; PRO Services"`
- Or already formatted as array

**Solution in Make.com:**

**Option A: Use Text Parser Module**
1. Add **"Text parser"** module between Google Sheets and Supabase
2. **Parse:** `{{1.Services (Full List)}}`
3. **Delimiter:** `,` (or `;` if that's what you use)
4. In Supabase `services` field, use: `{{2.parsed}}` (this creates an array)

**Option B: Use Split Function**
- In Supabase `services` field, use: `{{split(1.Services (Full List); ",")}}`
- Or: `{{split(1.Services (Full List); ";")}}`

**Option C: Manual Array**
- If services are in separate columns, use **"Set multiple values"**:
  - Value 1: `{{1.Service1}}`
  - Value 2: `{{1.Service2}}`
  - Value 3: `{{1.Service3}}`
  - etc.

---

### 2. **Timestamp** (`Timestamp` → `createdAt`)

**Problem:** Google Sheets timestamp might be in different format

**Solution:**
- Use **"Parse date"** module if needed
- Or use: `{{1.Timestamp}}` directly (Make.com usually handles this)

---

### 3. **Submission ID** (Required but not in Google Sheets)

**Problem:** Supabase requires `submissionId` but Google Sheets doesn't have it

**Solution:**
- **Generate unique ID** in Make.com:
  - Use **"Set variables"** module
  - Variable: `submissionId`
  - Value: `sub_{{formatDate(now(); "yyyyMMddHHmmss")}}_{random()}}`
- Or use: `sub_{{1.Timestamp}}_{{1.Email}}` (if unique)

---

## 📊 Fields NOT in Supabase Table

These Google Sheets columns don't have direct Supabase fields. Options:

### Option 1: Store in `notes` field (combine multiple)
- `Email Status`
- `Last Email Preview`
- `Service Type Normalised`
- `Response Status`
- `Response Date`
- `Follow-up Count`
- `Idempotency Key`
- `Last Follow-up Date`
- `Call Scheduled Date`
- `Lead Score`
- `client_email_sent`
- `internal_email_sent`
- `client_replied`
- `client_replied_at`
- `provider_replied`
- `provider_replied_at`
- `provider_reply_message`

**Solution:** Combine into `notes` field:
```
Email Status: {{1.Email Status}}
Response Status: {{1.Response Status}}
Follow-up Count: {{1.Follow-up Count}}
...
```

### Option 2: Create separate `leads` table
These fields might belong in a `leads` table instead. Check if you have a `leads` table in Supabase.

---

## 🎯 Step-by-Step Make.com Setup

### Step 1: Google Sheets Module
- **Spreadsheet:** `smartpro leads`
- **Worksheet:** `leads`
- **Trigger:** `New row`

### Step 2: Set Variables (Generate submissionId)
1. Add **"Set variables"** module
2. Variable name: `submissionId`
3. Value: `sub_{{formatDate(1.Timestamp; "yyyyMMddHHmmss")}}_{substring(md5(1.Email); 0; 8)}}`

### Step 3: Text Parser (For Services Array)
1. Add **"Text parser"** module
2. **Text:** `{{1.Services (Full List)}}`
3. **Delimiter:** `,` (or `;` based on your data)
4. This creates an array

### Step 4: Supabase Module
1. **Table:** `consultation_submissions`
2. **Action:** `Create a row`
3. **Map fields:**

```
submissionId: {{2.submissionId}}
name: {{1.Client Name}}
email: {{1.Email}}
phone: {{1.Phone}}
location: {{1.Location}}
company: {{1.Business Name}}
businessType: {{1.Business Type}}
services: {{3.parsed}}  (from Text Parser)
primaryService: {{1.Service Interested}}
budget: {{1.Budget}}
timeline: {{1.Timeline}}
preferredContact: {{1.Preferred Contact}}
preferredTime: {{1.Preferred Time}}
message: {{1.Primary Message}}
notes: {{1.Notes / Extra Info}}
language: {{1.Language}}
source: {{1.Source}}
createdAt: {{1.Timestamp}}
```

---

## ✅ Complete Make.com Scenario Flow

```
1. Google Sheets (Watch rows)
   ↓
2. Set Variables (Generate submissionId)
   ↓
3. Text Parser (Parse Services array)
   ↓
4. Supabase (Create row)
```

---

## 🐛 Common Issues & Fixes

### Issue: "Services must be an array"
**Fix:** Use Text Parser module to convert comma-separated string to array

### Issue: "submissionId is required"
**Fix:** Add "Set variables" module to generate unique submissionId

### Issue: "Timestamp format invalid"
**Fix:** Use "Parse date" module before Supabase

### Issue: "Duplicate submissionId"
**Fix:** Check if row already exists in Supabase before creating (use Filter module)

---

## 💡 Pro Tips

1. **Test with 1 row first** - Add a test row in Google Sheets and verify it syncs correctly
2. **Check for duplicates** - Add Filter module to skip rows that already exist
3. **Handle empty fields** - Use `{{if(1.Phone; 1.Phone; "")}}` for optional fields
4. **Monitor Operations** - Check Make.com Operations tab for errors
5. **Backup data** - Keep Google Sheets as backup even after syncing to Supabase

---

## 📞 Need Help?

- **Services not syncing?** Check Text Parser delimiter matches your data format
- **Timestamp errors?** Use Parse date module
- **Missing submissionId?** Add Set Variables module
- **Duplicate rows?** Add Filter module to check if email already exists

---

## 🎉 That's It!

Once set up, every new row in your Google Sheets will automatically:
1. ✅ Generate unique submissionId
2. ✅ Parse services into array
3. ✅ Create row in Supabase `consultation_submissions` table

**Simple and works!** 🚀

