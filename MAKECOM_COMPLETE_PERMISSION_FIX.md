# Complete Permission Fix - API Key + RLS

## 🚨 You're Still Getting Permission Error

This needs **TWO fixes**:
1. **API Key** - Must use `service_role` key
2. **RLS Policies** - May need to disable or create policies

---

## ✅ Fix 1: API Key (MUST DO FIRST)

### Get Service Role Key:
1. **Supabase Dashboard** → **Settings** → **API**
2. **Find** **"service_role"** key (marked "secret", VERY LONG)
3. **Copy** the entire key

### Update Make.com:
1. **Make.com** → Supabase module → Connection → **Edit**
2. **Replace** API key with `service_role` key
3. **Save** connection
4. **Save** scenario

---

## ✅ Fix 2: Disable RLS (If API Key Doesn't Work)

Even with `service_role` key, RLS policies might block access.

### Option A: Disable RLS via SQL Editor (Recommended)

1. **Supabase Dashboard** → **SQL Editor**
2. **Run this command:**
```sql
ALTER TABLE consultation_submissions DISABLE ROW LEVEL SECURITY;
```
3. **Click** **"Run"**
4. **Test** in Make.com

### Option B: Disable RLS via Table Editor

1. **Supabase Dashboard** → **Table Editor**
2. **Click** on `consultation_submissions` table
3. **Click** **"..."** menu → **"Edit table"**
4. **Find** **"Row Level Security"** section
5. **Toggle OFF** (disable RLS)
6. **Click** **"Save"**
7. **Test** in Make.com

---

## ✅ Fix 3: Create RLS Policy (If You Want to Keep RLS Enabled)

If you want to keep RLS enabled but allow service_role access:

1. **Supabase Dashboard** → **SQL Editor**
2. **Run this:**
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

-- Allow service_role to update
CREATE POLICY "Allow service_role updates" 
ON consultation_submissions 
FOR UPDATE 
TO service_role 
USING (true);
```
3. **Click** **"Run"**
4. **Test** in Make.com

---

## 🧪 Test Your API Key

### Quick Test via Supabase Dashboard:

1. **Supabase Dashboard** → **API** → **Try it out**
2. **Use** the API key from Make.com connection
3. **Test** this endpoint:
   ```
   GET /rest/v1/consultation_submissions
   ```
4. **If you get:**
   - ✅ **Data or empty array** = Correct key (service_role)
   - ❌ **Permission error** = Wrong key (anon)

---

## 📋 Complete Fix Checklist

- [ ] Got `service_role` key from Supabase (not `anon`)
- [ ] Updated Make.com connection with `service_role` key
- [ ] Saved connection in Make.com
- [ ] Saved scenario in Make.com
- [ ] Disabled RLS OR created RLS policies
- [ ] Tested with "Run once"
- [ ] Checked Operations (should be green)
- [ ] Verified row in Supabase

---

## 🎯 Recommended: Do Both Fixes

1. **Fix API Key** (use `service_role` key)
2. **Disable RLS** (run SQL: `ALTER TABLE consultation_submissions DISABLE ROW LEVEL SECURITY;`)

**After both fixes, it WILL work!** ✅

---

## 🔍 Verify RLS Status

Check if RLS is enabled:

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'consultation_submissions';
```

If `rowsecurity` is `true`, RLS is enabled (disable it or create policies).

---

## ✅ After Both Fixes

Once you:
1. ✅ Use `service_role` key in Make.com
2. ✅ Disable RLS (or create policies)

**The permission error will disappear and rows will be created!** 🎉

---

**Do BOTH fixes: API key + Disable RLS. Then test!** 🚀

