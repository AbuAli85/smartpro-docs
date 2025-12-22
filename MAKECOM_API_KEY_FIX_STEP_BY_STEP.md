# 🚨 CRITICAL: Fix API Key - Step by Step (No More Errors!)

## ❌ You're STILL Getting Permission Error

This means Make.com is **DEFINITELY using the wrong API key**.

---

## ✅ THE FIX (Follow Exactly)

### Step 1: Get Service Role Key from Supabase

1. **Open browser** → Go to: **https://supabase.com/dashboard**
2. **Sign in** if needed
3. **Click** on your project (should be `reootcngcptfogfozlmz` or similar)
4. **Click** the **⚙️ Settings** icon (bottom left, gear icon)
5. **Click** **"API"** in the left sidebar
6. **Scroll down** to **"Project API keys"** section
7. You'll see **TWO keys**:
   - **"anon"** key = Public (SHORT, starts with `eyJ...`)
   - **"service_role"** key = Secret (LONG, starts with `eyJ...`, marked as "secret")
8. **Find** the **"service_role"** row
9. **Click** the **"Reveal"** button (eye icon) or **"Copy"** button
10. **Copy the ENTIRE key** (it's VERY long - hundreds of characters)
11. **Paste it in Notepad** or somewhere safe

**IMPORTANT:** 
- ✅ Use the **"service_role"** key (the LONG one, marked "secret")
- ❌ NOT the **"anon"** key (the SHORT one, marked "public")

---

### Step 2: Update Make.com Connection

1. **Open Make.com** → Go to: **https://www.make.com**
2. **Go to** your scenario: **"Google Sheets to Supabase Sync"**
3. **Click** on the **Supabase module** (module 2, "Create a Row")
4. **Look at** the connection field - it shows: **"Google Sheets to Supabase Sync"**
5. **Click** on that connection name/link
6. **Click** **"Edit"** or **"Change"** button
7. **You'll see fields:**
   - **Project URL:** Should be `https://reootcngcptfogfozlmz.supabase.co`
   - **API Key:** This is what we need to fix!
8. **Click** in the **"API Key"** field
9. **SELECT ALL** the text (Ctrl+A or Cmd+A)
10. **DELETE** it completely (Backspace or Delete)
11. **PASTE** the `service_role` key you copied from Supabase
12. **Verify** the key is pasted (should be very long)
13. **Click** **"Save"** or **"OK"**
14. **Click** **"Save"** on your scenario (top right button)

---

### Step 3: Verify Connection

1. **Click** on Supabase module again
2. **Click** on connection
3. **Check** the API Key field:
   - ✅ Should be VERY long (hundreds of characters)
   - ✅ Should be the same as what you copied from Supabase
   - ❌ Should NOT be short (that's the anon key)

---

### Step 4: Test

1. **Click** **"Run once"** (play button, top right)
2. **Wait** for execution
3. **Check** **"Operations"** tab:
   - ✅ **Green checkmark** = SUCCESS! 🎉
   - ❌ **Red X** = Still wrong key

4. **If green:**
   - Go to **Supabase Dashboard**
   - **Table Editor** → `consultation_submissions`
   - You should see a new row! ✅

---

## 🔍 How to Tell Which Key You're Using

### Service Role Key (CORRECT - Use This!):
- ✅ **VERY LONG** (hundreds of characters)
- ✅ Starts with `eyJ...` (but continues for a long time)
- ✅ Marked as **"secret"** in Supabase Dashboard
- ✅ **Bypasses RLS** (Row Level Security)
- ✅ **Full database access**

### Anon Key (WRONG - Don't Use This!):
- ❌ **SHORTER** (much shorter than service_role)
- ❌ Also starts with `eyJ...` but shorter
- ❌ Marked as **"public"** in Supabase Dashboard
- ❌ **Respects RLS** (causes permission errors)
- ❌ **Limited permissions**

---

## ⚠️ If You're STILL Getting Permission Error

### Option 1: Disable RLS Temporarily

Even with `service_role` key, if RLS is enabled with restrictive policies, it might block access.

1. **Supabase Dashboard** → **Table Editor**
2. **Click** on `consultation_submissions` table
3. **Click** **"..."** menu (three dots)
4. **Click** **"Edit table"**
5. **Find** **"Row Level Security"** section
6. **Toggle OFF** (disable RLS)
7. **Click** **"Save"**
8. **Test** in Make.com again

### Option 2: Check RLS Policies

1. **Supabase Dashboard** → **Table Editor** → `consultation_submissions`
2. **Click** **"Policies"** tab
3. **See** if there are any policies
4. **Delete** or **disable** restrictive policies
5. **Test** again

---

## 🎯 Quick Verification Test

### Test Your API Key:

1. **Copy** the API key from Make.com connection
2. **Go to** Supabase Dashboard → **API** → **Try it out**
3. **Or** use this curl command:
```bash
curl -H "apikey: YOUR_KEY_HERE" \
     -H "Authorization: Bearer YOUR_KEY_HERE" \
     https://reootcngcptfogfozlmz.supabase.co/rest/v1/consultation_submissions
```

**If you get:**
- ✅ **Empty array `[]`** or data = Correct key (service_role)
- ❌ **Permission error** = Wrong key (anon)

---

## 📋 Final Checklist

Before testing, verify EVERYTHING:

- [ ] Opened Supabase Dashboard
- [ ] Went to Settings → API
- [ ] Found **"service_role"** key (not "anon")
- [ ] Copied the **ENTIRE** key (very long)
- [ ] Opened Make.com scenario
- [ ] Clicked Supabase module
- [ ] Clicked connection → Edit
- [ ] **DELETED** the old key completely
- [ ] **PASTED** the service_role key
- [ ] **SAVED** the connection
- [ ] **SAVED** the scenario
- [ ] Verified key is long (not short)
- [ ] Tested with "Run once"

---

## 🆘 Still Not Working?

If you've done ALL the above and STILL get permission error:

1. **Double-check** you copied the FULL key (it's very long)
2. **Verify** it's the `service_role` key, not `anon` key
3. **Try** disabling RLS temporarily (see Option 1 above)
4. **Check** Supabase project is not paused
5. **Create** a BRAND NEW connection in Make.com (don't edit the old one)

---

## ✅ Once Fixed

After you use the correct `service_role` key:

- ✅ Permission error will **DISAPPEAR**
- ✅ Rows will be **created successfully**
- ✅ All field mappings will work
- ✅ `submissionId` will be unique
- ✅ `services` will be an array
- ✅ Everything will sync! 🎉

---

## 🎯 The Bottom Line

**You MUST use the `service_role` key (the LONG secret key), NOT the `anon` key (the SHORT public key).**

**That's the ONLY thing blocking you right now!**

---

**Follow these steps EXACTLY and the permission error will be fixed!** 🚀

