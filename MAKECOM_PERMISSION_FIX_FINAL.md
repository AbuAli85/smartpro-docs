# 🚨 CRITICAL: Fix Permission Error - Final Instructions

## ❌ You're Still Getting Permission Error

This means Make.com is **STILL using the wrong API key**.

---

## ✅ MUST DO: Replace API Key in Make.com

### Step-by-Step (Follow Exactly):

#### Part 1: Get Service Role Key from Supabase

1. **Open:** https://supabase.com/dashboard
2. **Click** on your project (should show `reootcngcptfogfozlmz` or similar)
3. **Click** the **Settings** icon (⚙️ gear icon, usually bottom left)
4. **Click** **"API"** in the left sidebar menu
5. **Scroll down** to **"Project API keys"** section
6. You'll see TWO keys:
   - **"anon"** key = Public (DO NOT USE THIS)
   - **"service_role"** key = Secret (USE THIS ONE!)
7. **Find** the **"service_role"** row
8. **Click** the **"Reveal"** button (eye icon) or **"Copy"** button
9. **Copy the ENTIRE key** (it's very long, starts with `eyJ...`)
10. **Save it somewhere** (notepad, etc.)

---

#### Part 2: Update Make.com Connection

1. **Open:** https://www.make.com
2. **Go to** your scenario: **"Google Sheets to Supabase Sync"**
3. **Click** on the **Supabase module** (the second module, "Create a Row")
4. **Look for** the connection field (shows "extra contracts" or similar)
5. **Click** on the connection name/link
6. **Click** **"Edit"** or **"Change"** button
7. **Find** the field labeled **"API Key"** or **"Service Role Key"**
8. **SELECT ALL** the text in that field (Ctrl+A or Cmd+A)
9. **DELETE** it (Backspace or Delete)
10. **PASTE** the `service_role` key you copied from Supabase
11. **Click** **"Save"** or **"OK"**
12. **Click** **"Save"** on your scenario (top right)

---

#### Part 3: Verify It's Fixed

1. **Click** **"Run once"** (play button, top right)
2. **Wait** for execution to complete
3. **Check** **"Operations"** tab:
   - ✅ **Green checkmark** = SUCCESS! ✅
   - ❌ **Red X** = Still wrong key

4. **If green:**
   - Go to Supabase Dashboard
   - **Table Editor** → `consultation_submissions`
   - You should see a new row! 🎉

---

## 🔍 How to Verify You're Using the Right Key

### In Supabase Dashboard:
- **"anon"** key = Usually shorter, marked as "public"
- **"service_role"** key = Usually longer, marked as "secret" or "service_role"

### In Make.com Connection:
- If you see "anon" anywhere = ❌ WRONG
- If you see "service_role" = ✅ CORRECT

---

## ⚠️ Common Mistakes

### Mistake 1: Using anon key
- ❌ **Wrong:** Using the `anon` key
- ✅ **Right:** Must use `service_role` key

### Mistake 2: Not saving
- ❌ **Wrong:** Changed key but didn't save connection
- ✅ **Right:** Must click "Save" on connection AND scenario

### Mistake 3: Partial key
- ❌ **Wrong:** Copied only part of the key
- ✅ **Right:** Copy the ENTIRE key (it's very long)

### Mistake 4: Wrong project
- ❌ **Wrong:** Using key from different Supabase project
- ✅ **Right:** Use key from project `reootcngcptfogfozlmz`

---

## 🎯 Quick Verification Checklist

Before testing, verify:

- [ ] I opened Supabase Dashboard
- [ ] I went to Settings → API
- [ ] I found "service_role" key (not "anon")
- [ ] I copied the ENTIRE key
- [ ] I opened Make.com scenario
- [ ] I clicked Supabase module
- [ ] I clicked connection → Edit
- [ ] I DELETED the old key completely
- [ ] I PASTED the service_role key
- [ ] I clicked "Save" on connection
- [ ] I clicked "Save" on scenario
- [ ] I tested with "Run once"

---

## 🆘 Still Not Working?

If you're STILL getting permission error after using service_role key:

### Option 1: Disable RLS Temporarily

1. **Supabase Dashboard** → **Table Editor**
2. **Click** on `consultation_submissions` table
3. **Click** **"..."** menu (three dots)
4. **Click** **"Edit table"**
5. **Find** **"Row Level Security"** section
6. **Toggle OFF** (disable RLS)
7. **Click** **"Save"**
8. **Test** in Make.com again

### Option 2: Create RLS Policy

If you want to keep RLS enabled, create a policy:

1. **Supabase Dashboard** → **Table Editor** → `consultation_submissions`
2. **Click** **"Policies"** tab
3. **Click** **"New Policy"**
4. **Policy name:** `Allow service_role all operations`
5. **Allowed operation:** `ALL` or `INSERT`
6. **Policy definition:** `true`
7. **Save**

---

## 📞 Need More Help?

If you're still stuck:

1. **Check** which key you're using:
   - Go to Make.com → Supabase module → Connection
   - What does it say? "anon" or "service_role"?

2. **Verify** Supabase project:
   - Is it the right project? (`reootcngcptfogfozlmz`)
   - Is the project paused? (Check Dashboard)

3. **Try** disabling RLS temporarily to test

---

## ✅ Once Fixed

After you fix the API key:

- ✅ Permission error will disappear
- ✅ Rows will be created successfully
- ✅ All your field mappings will work
- ✅ `submissionId` will be unique (already working!)

---

## 🎯 The Fix is Simple

**Just replace the API key in Make.com with the `service_role` key from Supabase!**

**That's it!** Once you do this, everything will work. 🚀

---

**Follow the steps above EXACTLY and the permission error will be fixed!** ✅

