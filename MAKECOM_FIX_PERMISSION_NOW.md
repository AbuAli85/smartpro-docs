# Fix Permission Error - Step by Step

## ✅ Good News!
Your `submissionId` is working perfectly! `sub_1_56765472` ✅

## ❌ Still Need to Fix: Permission Error

**Error:** `[403] permission denied for table consultation_submissions`

**This means:** You're using the wrong API key in Make.com.

---

## 🔧 Fix: Use Service Role Key

### Step 1: Get Service Role Key from Supabase

1. Go to: **https://supabase.com/dashboard**
2. Select your project: `reootcngcptfogfozlmz`
3. Click **"Settings"** (gear icon, bottom left)
4. Click **"API"** (in left sidebar)
5. Scroll down to **"Project API keys"**
6. Find **"service_role"** key (it says "secret" next to it)
7. Click **"Reveal"** or **"Copy"** button
8. **Copy the entire key** (it's long, starts with `eyJ...`)

**Important:** 
- ✅ Use **"service_role"** key (the SECRET one)
- ❌ NOT the **"anon"** key (the public one)

---

### Step 2: Update Make.com Connection

1. Go to **Make.com**
2. Open your scenario: **"Google Sheets to Supabase Sync"**
3. Click on the **Supabase module** (module 2)
4. Click on the **connection** (currently shows "extra contracts")
5. Click **"Edit"** or **"Change connection"**
6. Find the **"API Key"** field
7. **Delete** the current key
8. **Paste** the `service_role` key you copied from Supabase
9. Click **"Save"** or **"OK"**
10. **Save** your scenario

---

### Step 3: Test

1. Click **"Run once"** (play button)
2. Check **"Operations"** tab:
   - ✅ **Green** = Success!
   - ❌ **Red** = Still using wrong key

3. **Verify in Supabase:**
   - Go to Supabase Dashboard
   - **Table Editor** → `consultation_submissions`
   - Should see new row! ✅

---

## 🔍 How to Tell Which Key You're Using

### In Supabase Dashboard:
- **"anon" key** = Public key, safe for frontend, shorter
- **"service_role" key** = Secret key, bypasses RLS, longer, marked as "secret"

### In Make.com:
- If you see "anon" anywhere = Wrong key ❌
- If you see "service_role" = Correct key ✅

---

## ⚠️ Why This Happens

- **`anon` key** = Public key, respects Row Level Security (RLS), limited permissions
- **`service_role` key** = Secret key, bypasses RLS, full database access

**Make.com needs `service_role` key** because it needs to write to your database without RLS restrictions.

---

## 🎯 Quick Checklist

- [ ] Opened Supabase Dashboard
- [ ] Went to Settings → API
- [ ] Found "service_role" key (secret)
- [ ] Copied the full key
- [ ] Opened Make.com scenario
- [ ] Clicked Supabase module
- [ ] Clicked connection → Edit
- [ ] Replaced API key with service_role key
- [ ] Saved connection
- [ ] Saved scenario
- [ ] Tested with "Run once"
- [ ] Checked Operations (should be green)
- [ ] Verified row in Supabase

---

## 🧪 After Fixing

Once you use the `service_role` key:

1. ✅ Permission error will disappear
2. ✅ Rows will be created in Supabase
3. ✅ All fields will be mapped correctly
4. ✅ `submissionId` will be unique (already working!)

---

## 📞 Still Getting Permission Error?

If you're still getting the error after using `service_role` key:

1. **Double-check** you copied the FULL key (it's very long)
2. **Verify** it's the `service_role` key, not `anon` key
3. **Check** Supabase project is not paused
4. **Try** disabling RLS temporarily:
   - Supabase Dashboard → Table Editor → `consultation_submissions`
   - Click "..." → "Edit table"
   - Find "Row Level Security"
   - Toggle OFF
   - Save
   - Test again

---

## ✅ You're Almost There!

Your configuration is perfect:
- ✅ Field mappings correct
- ✅ `submissionId` working
- ✅ All fields mapped

**Just fix the API key and you're done!** 🎉

---

**The fix is simple: Replace the API key in Make.com with the `service_role` key from Supabase!** 🚀

