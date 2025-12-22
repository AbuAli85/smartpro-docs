# Simple Make.com Setup: Google Sheets → Supabase

## What You Need:
1. Make.com account
2. Google Sheets with your data
3. Supabase connection details

---

## Quick Setup (5 Minutes):

### 1. Create Scenario
- Make.com → **"Create scenario"**
- Name: `Sync Sheets to Supabase`

### 2. Add Google Sheets (Trigger)
- Module: **"Google Sheets"** → **"Watch rows"**
- Select your spreadsheet
- Trigger: **"New row"**

### 3. Add Supabase (Action)
- Module: **"Supabase"** → **"Create a row"**
- Connect Supabase:
  - **URL**: `https://reootcngcptfogfozlmz.supabase.co`
  - **API Key**: Get from Supabase → Settings → API → `service_role` key
- Table: `consultation_submissions`
- Map columns from Google Sheets to Supabase

### 4. Map Fields
Map Google Sheets columns to Supabase:
- `submission_id` → `submissionId`
- `name` → `name`
- `email` → `email`
- `phone` → `phone`
- `services` → `services` (array)
- etc.

### 5. Activate
- Click **"Save"**
- Click **"Turn on"** (green toggle)

---

## Done! ✅

Now every new row in Google Sheets will automatically create a row in Supabase.

**That's it!** Simple and works! 🎉

