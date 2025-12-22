# Verify & Fix Supabase Connection in Make.com

## 🔍 Current Status

✅ **Data mapping is working** - All fields are correct!  
❌ **Permission error persists** - Still using wrong API key

---

## 🚨 The Problem

Even though data shows correctly in Make.com, the **actual insert to Supabase is failing** because the connection is still using the wrong API key.

---

## ✅ Step-by-Step: Verify & Fix Connection

### Step 1: Check Current Connection

1. **Open Make.com** → Your scenario
2. **Click** on **Supabase module** (module 2)
3. **Look at** the connection field - what does it say?
4. **Click** on the connection name
5. **Check** what API key is being used

---

### Step 2: Get Service Role Key from Supabase

1. **Open:** https://supabase.com/dashboard
2. **Select** your project
3. **Settings** → **API**
4. **Find** **"service_role"** key (marked as "secret")
5. **Click** **"Reveal"** or **"Copy"**
6. **Copy the ENTIRE key** (very long, starts with `eyJ...`)

**Important:** Make sure it's the **"service_role"** key, NOT the **"anon"** key!

---

### Step 3: Create NEW Connection (Recommended)

Sometimes editing an existing connection doesn't work. Create a fresh one:

1. **In Make.com**, click on **Supabase module**
2. **Click** on the connection dropdown
3. **Click** **"Add"** or **"Create new connection"**
4. **Connection name:** `Supabase Service Role` (or any name)
5. **Project URL:** `https://reootcngcptfogfozlmz.supabase.co`
6. **API Key:** **Paste the `service_role` key** you copied
7. **Click** **"Save"** or **"OK"**
8. **Select** this new connection in the Supabase module
9. **Save** your scenario

---

### Step 4: Verify Connection is Using Service Role

1. **Click** on Supabase module
2. **Click** on connection
3. **Verify** it shows the connection you just created
4. **If you can see the key**, verify it's the long `service_role` key (not the shorter `anon` key)

---

### Step 5: Test Again

1. **Save** scenario
2. **Click** **"Run once"**
3. **Check Operations:**
   - ✅ **Green** = Success!
   - ❌ **Red** = Still wrong key

---

## 🔍 How to Tell Which Key You're Using

### Service Role Key (CORRECT):
- ✅ Very long (hundreds of characters)
- ✅ Starts with `eyJ...`
- ✅ Marked as "secret" in Supabase
- ✅ Bypasses RLS

### Anon Key (WRONG):
- ❌ Shorter
- ❌ Also starts with `eyJ...` but shorter
- ❌ Marked as "public" in Supabase
- ❌ Respects RLS (causes permission errors)

---

## ⚠️ Common Mistakes

### Mistake 1: Using Wrong Key
- ❌ Using `anon` key
- ✅ Must use `service_role` key

### Mistake 2: Not Saving
- ❌ Changed key but didn't save connection
- ✅ Must save connection AND scenario

### Mistake 3: Using Old Connection
- ❌ Still using old connection with wrong key
- ✅ Create NEW connection with service_role key

### Mistake 4: Partial Key
- ❌ Copied only part of the key
- ✅ Copy ENTIRE key (it's very long)

---

## 🎯 Alternative: Check Connection via API

If you want to verify which key is being used, you can test it:

1. **Copy** the API key from Make.com connection
2. **Test** in Supabase Dashboard → **API** → **Try it out**
3. **Or** use curl:
```bash
curl -H "apikey: YOUR_KEY_HERE" \
     -H "Authorization: Bearer YOUR_KEY_HERE" \
     https://reootcngcptfogfozlmz.supabase.co/rest/v1/consultation_submissions
```

If you get permission error = wrong key  
If you get data or empty array = correct key

---

## ✅ Quick Fix: Delete & Recreate Connection

If editing doesn't work:

1. **Delete** the current Supabase connection in Make.com
2. **Create** a brand new connection
3. **Use** `service_role` key
4. **Save**
5. **Test**

---

## 📋 Verification Checklist

Before testing:

- [ ] Got `service_role` key from Supabase (not `anon`)
- [ ] Copied ENTIRE key (very long)
- [ ] Created NEW connection in Make.com
- [ ] Pasted `service_role` key in new connection
- [ ] Saved the connection
- [ ] Selected new connection in Supabase module
- [ ] Saved the scenario
- [ ] Tested with "Run once"

---

## 🧪 Test After Fix

1. **Save** scenario
2. **Run once**
3. **Check Operations:**
   - ✅ **Green** = SUCCESS! 🎉
   - ❌ **Red** = Check which key you're using

4. **Verify in Supabase:**
   - **Table Editor** → `consultation_submissions`
   - Should see new row! ✅

---

## 🎯 Most Likely Solution

**Create a BRAND NEW connection** with the `service_role` key:

1. Delete old connection
2. Create new connection
3. Use `service_role` key
4. Save everything
5. Test

---

## ✅ Once Fixed

After using the correct `service_role` key:

- ✅ Permission error will disappear
- ✅ Rows will be created in Supabase
- ✅ All your field mappings will work
- ✅ `submissionId` will be unique
- ✅ Everything will sync! 🎉

---

**Create a NEW connection with the `service_role` key - that will definitely fix it!** 🚀

