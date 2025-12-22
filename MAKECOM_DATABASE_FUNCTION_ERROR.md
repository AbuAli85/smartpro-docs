# Fix: Database Function Error

## ✅ Good News!
The permission error is **FIXED**! You're now using the correct API key. 🎉

## ❌ New Error
```
ERROR: 42883: function get_teams_for_user(uuid) does not exist
```

This means Supabase is trying to call a database function that doesn't exist.

---

## 🔍 What's Happening

This error usually occurs when:
1. **A database trigger** is trying to call a function that doesn't exist
2. **An RLS policy** is using a function that wasn't created
3. **A database function** was deleted or never created

---

## ✅ Solution 1: Check for Triggers (Most Likely)

### Step 1: Check Table Triggers
1. Go to **Supabase Dashboard**
2. **Table Editor** → `consultation_submissions`
3. Click **"..."** menu → **"View triggers"** or **"Edit table"**
4. Look for any **triggers** that might call `get_teams_for_user`
5. **Disable** or **delete** any triggers related to this function

### Step 2: Check via SQL Editor
1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run this query to see all triggers:
```sql
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'consultation_submissions';
```

3. If you see any triggers calling `get_teams_for_user`, **disable them**:
```sql
-- Disable trigger (replace 'trigger_name' with actual name)
ALTER TABLE consultation_submissions DISABLE TRIGGER trigger_name;
```

---

## ✅ Solution 2: Check RLS Policies

### Step 1: Check Policies
1. **Supabase Dashboard** → **Table Editor** → `consultation_submissions`
2. Click **"Policies"** tab
3. Look for any policies that might use `get_teams_for_user`
4. **Delete** or **disable** those policies

### Step 2: Check via SQL
```sql
-- See all policies on consultation_submissions
SELECT * FROM pg_policies 
WHERE tablename = 'consultation_submissions';
```

---

## ✅ Solution 3: Create the Missing Function (If Needed)

If this function is actually needed, create it:

```sql
-- Create the function (if it's needed)
CREATE OR REPLACE FUNCTION get_teams_for_user(user_id UUID)
RETURNS TABLE(team_id UUID) AS $$
BEGIN
    -- Return empty result set (or implement actual logic)
    RETURN QUERY SELECT NULL::UUID WHERE FALSE;
END;
$$ LANGUAGE plpgsql;
```

**But this is probably NOT needed** - it's likely a leftover from another project.

---

## ✅ Solution 4: Disable All Triggers Temporarily (Quick Fix)

If you just want to get it working quickly:

```sql
-- Disable ALL triggers on consultation_submissions
ALTER TABLE consultation_submissions DISABLE TRIGGER ALL;
```

**Then test in Make.com again.**

---

## 🎯 Recommended: Check What's Calling This Function

### Step 1: Find What's Using It
Run this in Supabase SQL Editor:

```sql
-- Find all database objects using this function
SELECT 
    n.nspname as schema,
    p.proname as function_name,
    pg_get_functiondef(p.oid) as definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE pg_get_functiondef(p.oid) LIKE '%get_teams_for_user%';
```

### Step 2: Check Triggers
```sql
-- Find triggers that might call this
SELECT 
    trigger_name,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE action_statement LIKE '%get_teams_for_user%';
```

---

## 🔧 Quick Fix: Disable Problematic Triggers

### Option 1: Via SQL Editor
1. **Supabase Dashboard** → **SQL Editor**
2. **Run this:**
```sql
-- List all triggers on consultation_submissions
SELECT trigger_name 
FROM information_schema.triggers 
WHERE event_object_table = 'consultation_submissions';

-- Disable all triggers (replace with actual trigger names)
ALTER TABLE consultation_submissions DISABLE TRIGGER ALL;
```

3. **Test** in Make.com

### Option 2: Via Table Editor
1. **Table Editor** → `consultation_submissions`
2. **"..."** menu → **"Edit table"**
3. Look for **"Triggers"** section
4. **Disable** or **delete** any triggers

---

## 🧪 Test After Fix

1. **Save** scenario in Make.com
2. **Run once** with a test row
3. **Check Operations:**
   - ✅ **Green** = Success!
   - ❌ **Red** = Check error message

4. **Verify in Supabase:**
   - **Table Editor** → `consultation_submissions`
   - Should see new row! ✅

---

## 📋 Troubleshooting Checklist

- [ ] Checked for triggers on `consultation_submissions` table
- [ ] Disabled problematic triggers
- [ ] Checked RLS policies
- [ ] Tested in Make.com
- [ ] Verified row created in Supabase

---

## 💡 Most Likely Cause

This function `get_teams_for_user` is probably:
- A leftover from another project/template
- Part of a trigger that's not needed for your use case
- An old function that was deleted

**Solution:** Disable or remove the trigger/policy that's calling it.

---

## ✅ After Fixing

Once you disable the problematic trigger:

- ✅ Error will disappear
- ✅ Rows will be created successfully
- ✅ All your field mappings will work
- ✅ `submissionId` will be unique
- ✅ Everything will sync from Google Sheets to Supabase! 🎉

---

## 🎯 Quick Action

**Most likely fix:**
1. Go to Supabase SQL Editor
2. Run: `ALTER TABLE consultation_submissions DISABLE TRIGGER ALL;`
3. Test in Make.com
4. Should work! ✅

---

**Disable the triggers and test again!** 🚀

