# Make.com: Google Sheets → Supabase (Simple Setup)

**Goal:** Automatically sync new rows from Google Sheets to Supabase table.

---

## ✅ What You Need (5 minutes)

1. Make.com account (free plan works)
2. Google Sheets with your data
3. Supabase API key

---

## 📋 Step-by-Step Setup

### Step 1: Open Make.com
1. Go to [https://www.make.com](https://www.make.com)
2. Sign in
3. Click **"Create a new scenario"** (top right)

---

### Step 2: Add Google Sheets (Trigger)
1. Click **"Add a module"**
2. Search: `Google Sheets`
3. Select: **"Watch rows"**
4. **Connect Google account** (if first time):
   - Click "Add" → Sign in with Google
   - Allow permissions
5. **Select your spreadsheet:**
   - Choose: `smartpro leads` (your Google Sheet)
6. **Select worksheet:**
   - Choose: `leads` (the sheet/tab name)
7. **Trigger settings:**
   - **"Trigger on"**: `New row`
   - **"Limit"**: `1`
8. Click **"OK"**

---

### Step 3: Add Supabase (Action)
1. Click **"Add a module"** (after Google Sheets)
2. Search: `Supabase`
3. Select: **"Create a row"**
4. **Connect Supabase:**
   - Click **"Add"** to create new connection
   - **Project URL**: `https://reootcngcptfogfozlmz.supabase.co`
   - **API Key**: 
     - Go to Supabase Dashboard → Settings → API
     - Copy **`service_role`** key (secret key, not `anon` key)
     - Paste it here
   - Click **"Save"**
5. **Select table:**
   - Table: `consultation_submissions`
6. **Map fields** (click each field and select from Google Sheets):

   | Supabase Field | Google Sheets Column |
   |---------------|---------------------|
   | `submissionId` | Generate unique ID (see below) |
   | `name` | `Client Name` |
   | `email` | `Email` |
   | `phone` | `Phone` |
   | `location` | `Location` |
   | `company` | `Business Name` |
   | `businessType` | `Business Type` |
   | `primaryService` | `Service Interested` |
   | `services` | `Services (Full List)` - **See note below** |
   | `budget` | `Budget` |
   | `timeline` | `Timeline` |
   | `preferredContact` | `Preferred Contact` |
   | `preferredTime` | `Preferred Time` |
   | `message` | `Primary Message` |
   | `notes` | `Notes / Extra Info` |
   | `language` | `Language` |
   | `source` | `Source` (or type: `google_sheets`) |
   | `createdAt` | `Timestamp` |

   **Important:**
   - **`submissionId`**: Generate unique ID using "Set variables" module: `sub_{{formatDate(1.Timestamp; "yyyyMMddHHmmss")}}_{substring(md5(1.Email); 0; 8)}}`
   - **`services` (array)**: Use **"Text parser"** module to convert `Services (Full List)` (comma-separated) into array
   - See **`MAKECOM_GOOGLE_SHEETS_MAPPING.md`** for complete detailed mapping

7. Click **"OK"**

---

### Step 4: Test It
1. Click **"Save"** (top right)
2. Click **"Run once"** (top right, play button)
3. **Add a test row** in your Google Sheets
4. Wait 10-20 seconds
5. Check **"Operations"** tab in Make.com:
   - ✅ Green = Success
   - ❌ Red = Error (check the error message)
6. Check Supabase:
   - Go to Supabase Dashboard → Table Editor → `consultation_submissions`
   - You should see the new row!

---

### Step 5: Activate (Turn On)
1. If test worked, click **"Turn on scenario"** (green toggle, top right)
2. ✅ **Done!** Now every new row in Google Sheets will automatically sync to Supabase

---

## 🔧 Field Mapping Help

### If Google Sheets columns don't match:
- Click the field in Supabase module
- Click **"Map"** tab
- Select from Google Sheets dropdown
- Or type: `{{1.column_name}}` (replace `column_name` with your actual column name)

### For arrays (services field):
If Google Sheets has: `"web-design,seo,social-media"`

**Option 1:** Use "Text parser" module:
1. Add **"Text parser"** module between Google Sheets and Supabase
2. Parse: `{{1.services}}` with delimiter: `,`
3. In Supabase, use: `{{2.parsed}}` (array)

**Option 2:** Simple split in Supabase:
- Use: `{{split(1.services; ",")}}`

---

## 🐛 Troubleshooting

### ❌ Error: "Table not found"
- Check table name: `consultation_submissions` (exact spelling)
- Go to Supabase → Table Editor → verify table exists

### ❌ Error: "Invalid API key"
- Use **`service_role`** key, not `anon` key
- Get it from: Supabase Dashboard → Settings → API → Service role key

### ❌ Error: "Column not found"
- Check column names match exactly (case-sensitive)
- In Supabase: `submissionId` (camelCase)
- In Google Sheets: `submission_id` (snake_case) is fine - Make.com will map it

### ❌ Data not syncing
- Check scenario is **"On"** (green toggle)
- Check **"Operations"** tab for errors
- Verify Google Sheets has new rows (trigger only fires on NEW rows)

### ❌ Duplicate rows
- Add **"Filter"** module between Google Sheets and Supabase
- Filter: Check if `submission_id` already exists in Supabase
- Or use **"Update row"** instead of **"Create row"**

---

## 📊 Current Flow

```
User submits form
    ↓
Vercel backend saves to database (if working)
    ↓
Vercel sends to Make.com webhook
    ↓
Make.com saves to Google Sheets ✅ (already working)
    ↓
Make.com watches Google Sheets (this scenario)
    ↓
Make.com creates row in Supabase ✅ (what you're setting up now)
```

---

## ✅ Success Checklist

- [ ] Google Sheets module connected
- [ ] Supabase module connected with `service_role` key
- [ ] Fields mapped correctly
- [ ] Test run successful (green in Operations)
- [ ] New row appears in Supabase
- [ ] Scenario is **"On"** (green toggle)

---

## 🎉 That's It!

Your Make.com scenario will now:
1. ✅ Watch Google Sheets for new rows
2. ✅ Automatically create rows in Supabase
3. ✅ Run every time new data is added

**Simple and works!** 🚀

---

## 💡 Pro Tips

1. **Test with 1 row first** before activating
2. **Check Operations tab** regularly for errors
3. **Use Filter module** to prevent duplicates
4. **Monitor Supabase** to verify data is syncing
5. **Keep Make.com scenario "On"** for automatic syncing

---

## 📞 Need Help?

- Check Make.com **"Operations"** tab for detailed error messages
- Verify Supabase table structure matches your mapping
- Test with a simple row first (just name and email)

