# Fix: Supabase Permission Denied Error

## ❌ Error Message
```
[403] permission denied for table consultation_submissions
```

## 🔍 Root Cause

This error means Make.com doesn't have permission to write to your Supabase table. Common causes:

1. **Using `anon` key instead of `service_role` key** (most common)
2. **Row Level Security (RLS) is enabled** and blocking writes
3. **API key doesn't have proper permissions**

---

## ✅ Solution 1: Use Service Role Key (Recommended)

### Step 1: Get Service Role Key
1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project: `reootcngcptfogfozlmz`
3. Go to **Settings** → **API**
4. Find **"service_role"** key (NOT `anon` key)
5. **Copy the key** (it's secret - starts with `eyJ...`)

### Step 2: Update Make.com Connection
1. Open your Make.com scenario
2. Click on **Supabase module**
3. Click on the **connection** (currently "extra contracts")
4. Click **"Edit"** or **"Change"**
5. **Paste the `service_role` key** (not `anon` key)
6. **Save** the connection
7. **Save** the scenario

### Step 3: Test Again
1. **Run once** with a test row
2. Should work now! ✅

---

## ✅ Solution 2: Disable RLS (If Solution 1 Doesn't Work)

If you're already using `service_role` key and still getting errors, RLS might be blocking writes.

### Option A: Disable RLS Temporarily (For Testing)
1. Go to Supabase Dashboard
2. **Table Editor** → `consultation_submissions`
3. Click **"..."** menu → **"Edit table"**
4. Find **"Row Level Security"** section
5. **Disable RLS** (toggle off)
6. **Save**
7. Test in Make.com again

### Option B: Create RLS Policy (Recommended for Production)
If you want to keep RLS enabled, create a policy:

1. Go to Supabase Dashboard
2. **Table Editor** → `consultation_submissions`
3. Click **"Policies"** tab
4. Click **"New Policy"**
5. **Policy name:** `Allow service_role inserts`
6. **Allowed operation:** `INSERT`
7. **Policy definition:**
   ```sql
   true
   ```
8. **Save**

**Or use SQL Editor:**
```sql
-- Allow service_role to insert
CREATE POLICY "Allow service_role inserts" 
ON consultation_submissions 
FOR INSERT 
TO service_role 
WITH CHECK (true);

-- Allow service_role to read
CREATE POLICY "Allow service_role reads" 
ON consultation_submissions 
FOR SELECT 
TO service_role 
USING (true);
```

---

## 🔑 How to Identify Which Key You're Using

### Check in Make.com:
1. Open Supabase module
2. Click on connection
3. Look at the key:
   - **`anon` key** = Public key (starts with `eyJ...` but shorter)
   - **`service_role` key** = Secret key (starts with `eyJ...` but longer, marked as "secret")

### In Supabase Dashboard:
- **Settings** → **API**
- **`anon` key** = Public, can be exposed in frontend
- **`service_role` key** = Secret, bypasses RLS (use this for Make.com)

---

## ⚠️ Important Security Notes

### Service Role Key:
- ✅ **Bypasses Row Level Security**
- ✅ **Full database access**
- ✅ **Perfect for Make.com/backend services**
- ❌ **NEVER expose in frontend/client code**
- ❌ **Keep it secret**

### Anon Key:
- ✅ **Safe for frontend**
- ❌ **Respects RLS policies**
- ❌ **Limited permissions**
- ❌ **Not suitable for Make.com**

---

## 🧪 Quick Test

After updating to `service_role` key:

1. **Save** scenario in Make.com
2. **Run once** with a test row
3. **Check Operations** tab:
   - ✅ **Green** = Success!
   - ❌ **Red** = Check error message

4. **Verify in Supabase:**
   - Go to **Table Editor** → `consultation_submissions`
   - Should see new row! ✅

---

## 📋 Troubleshooting Checklist

- [ ] Using `service_role` key (not `anon` key)
- [ ] Key is correct (copied from Supabase Dashboard)
- [ ] Connection saved in Make.com
- [ ] Scenario saved
- [ ] RLS disabled OR policy created (if needed)
- [ ] Tested with one row

---

## 🎯 Most Likely Fix

**99% of the time, this is because you're using the `anon` key instead of `service_role` key.**

**Quick fix:**
1. Get `service_role` key from Supabase Dashboard → Settings → API
2. Update Make.com Supabase connection with this key
3. Save and test

---

## ✅ After Fix

Once you fix the permission issue, your scenario will:
- ✅ Successfully create rows in Supabase
- ✅ Map all fields correctly
- ✅ Generate unique submissionId
- ✅ Convert services to array

**That's it!** 🚀

---

## 📞 Still Having Issues?

If you're still getting permission errors after using `service_role` key:

1. **Check Supabase project status** - Make sure it's not paused
2. **Verify table exists** - Go to Table Editor and confirm `consultation_submissions` table exists
3. **Check API key** - Make sure you copied the full `service_role` key
4. **Try disabling RLS** temporarily to test
5. **Check Supabase logs** - Go to Logs → API to see detailed error messages

---

**Fix the API key first - that's almost certainly the issue!** 🎯

