# Make.com Scenario: Google Sheets → Supabase

Simple guide to sync data from Google Sheets to Supabase table.

---

## Step 1: Create New Scenario in Make.com

1. Go to [Make.com](https://www.make.com)
2. Click **"Create a new scenario"**
3. Name it: `Google Sheets to Supabase Sync`

---

## Step 2: Add Google Sheets Module (Trigger)

1. Click **"Add a module"**
2. Search for **"Google Sheets"**
3. Select **"Watch rows"** (triggers when new row is added)
4. **Connect your Google account** (if not already connected)
5. **Select your spreadsheet:**
   - Choose the Google Sheet with consultation data
6. **Select worksheet:**
   - Choose the sheet/tab name
7. **Set trigger:**
   - **"Trigger on"**: `New row`
   - **"Limit"**: `1` (process one row at a time)

---

## Step 3: Add Filter (Optional - Skip Duplicates)

1. Click **"Add a module"** after Google Sheets
2. Search for **"Filter"**
3. **Set condition:**
   - **"Condition"**: `submission_id` (or email) **does not exist** in Supabase
   - This prevents duplicates

**OR skip this step** if you want all rows to sync.

---

## Step 4: Add Supabase Module (Action)

1. Click **"Add a module"** after Filter (or Google Sheets)
2. Search for **"Supabase"**
3. Select **"Create a row"**
4. **Connect Supabase:**
   - **Project URL**: `https://reootcngcptfogfozlmz.supabase.co`
   - **API Key**: Get from Supabase Dashboard → Settings → API → `service_role` key (secret)
5. **Select table:**
   - Table: `consultation_submissions`
6. **Map fields from Google Sheets to Supabase:**

   Map each column from Google Sheets to Supabase column:

   | Google Sheets Column | Supabase Column |
   |---------------------|-----------------|
   | `submission_id` | `submissionId` |
   | `name` | `name` |
   | `email` | `email` |
   | `phone` | `phone` |
   | `location` | `location` |
   | `company` | `company` |
   | `business_type` | `businessType` |
   | `services` | `services` (array) |
   | `budget` | `budget` |
   | `timeline` | `timeline` |
   | `message` | `message` |
   | `language` | `language` |
   | `submitted_at` | `createdAt` |

   **Important:**
   - For `services` (array): Use **"Set multiple values"** and map each service
   - For dates: Use **"Parse date"** module if needed
   - Leave fields empty if they don't exist in Google Sheets

---

## Step 5: Save and Activate

1. Click **"Save"** (top right)
2. Click **"Run once"** to test
3. Add a test row in Google Sheets
4. Check if it appears in Supabase
5. If working, click **"Turn on scenario"** (toggle switch)

---

## Alternative: Webhook → Supabase (If you prefer)

If you want to send data directly from your website to Supabase via Make.com:

### Step 1: Add Webhook Module (Trigger)
1. Add **"Webhook"** module
2. Select **"Custom webhook"**
3. Click **"Save"** to get webhook URL
4. Copy the webhook URL

### Step 2: Use Webhook URL in Your Code
Update your webhook URL in Vercel environment variables:
```
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-webhook-id
```

### Step 3: Add Supabase Module (Same as above)
Map webhook data to Supabase columns.

---

## Field Mapping Reference

### Google Sheets → Supabase Mapping:

```javascript
{
  "submissionId": "{{1.submission_id}}",  // Column A
  "name": "{{1.name}}",                    // Column B
  "email": "{{1.email}}",                  // Column C
  "phone": "{{1.phone}}",                  // Column D
  "location": "{{1.location}}",            // Column E
  "company": "{{1.company}}",              // Column F
  "businessType": "{{1.business_type}}",   // Column G
  "services": ["{{1.service1}}", "{{1.service2}}"], // Array
  "budget": "{{1.budget}}",
  "timeline": "{{1.timeline}}",
  "message": "{{1.message}}",
  "language": "{{1.language}}",
  "source": "google_sheets",
  "createdAt": "{{1.submitted_at}}"
}
```

---

## Troubleshooting

### Issue: Data not syncing
- Check if scenario is **"On"** (green toggle)
- Check **"Operations"** tab in Make.com for errors
- Verify Supabase API key is correct (use `service_role` key, not `anon`)

### Issue: Duplicate rows
- Add **Filter** module to check if row exists
- Or use **"Update row"** instead of **"Create row"**

### Issue: Wrong data format
- Use **"Set variables"** module to format data
- For arrays: Use **"Set multiple values"**
- For dates: Use **"Parse date"** module

---

## That's It! 🎉

Your Make.com scenario will now:
1. ✅ Watch Google Sheets for new rows
2. ✅ Create rows in Supabase `consultation_submissions` table
3. ✅ Run automatically when new data is added

**Simple and works!** 🚀

