# Unify Supabase Projects - Step by Step Guide

**Date:** 2025-01-17  
**Goal:** Make BusinessHub use same Supabase project as other platforms for Single Sign-On

---

## 🎯 Current Situation

**You have:**
- ✅ Contract-Management-System: Supabase Project A
- ✅ business-services-hub: Supabase Project A (same)
- ❌ BusinessHub: Supabase Project B (different)

**Goal:**
- ✅ BusinessHub: Supabase Project A (same as others)
- ✅ Single Sign-On works automatically

---

## 📋 Step-by-Step Process

### Step 1: Identify Project A (Used by Other Platforms)

**Option A: Check Contract-Management-System**
1. Open Contract-Management-System repository
2. Check `.env.local` or environment variables
3. Look for: `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the URL (this is Project A)

**Option B: Check business-services-hub**
1. Open business-services-hub repository
2. Check `.env.local` or environment variables
3. Look for: `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the URL (this is Project A)

**Option C: Check Supabase Dashboard**
1. Go to https://supabase.com/dashboard
2. List your projects
3. Identify which project is used by Contract-Management-System
4. That's Project A

**Expected format:**
```
https://xxxxx.supabase.co
```

---

### Step 2: Get Project A Credentials

**From Supabase Dashboard:**

1. **Go to Project A Dashboard**
   - URL: `https://supabase.com/dashboard/project/[PROJECT-ID]`

2. **Get API Keys**
   - Go to: **Settings** → **API**
   - Copy:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon public key**: `eyJhbGc...` (for frontend)
     - **service_role key**: `eyJhbGc...` (for backend - keep secret!)

---

### Step 3: Check BusinessHub Current Project

**Check BusinessHub `.env` file:**

**Look for:**
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
```

**This is Project B (current).**

**Questions:**
- Does BusinessHub have important data in Project B?
- User accounts?
- Consultation submissions?
- Service data?
- Other data?

**If NO data:** Just update environment variables ✅  
**If YES data:** Need to migrate data first ⚠️

---

### Step 4: Update BusinessHub Environment Variables

**Create or update `.env` file in BusinessHub root:**

**Current (Project B):**
```env
VITE_SUPABASE_URL=https://project-b.supabase.co
VITE_SUPABASE_ANON_KEY=project-b-key
```

**New (Project A - Same as other platforms):**
```env
# Supabase Configuration (Project A - Same as Contract-Management-System & business-services-hub)
VITE_SUPABASE_URL=https://project-a.supabase.co
VITE_SUPABASE_ANON_KEY=project-a-anon-key

# Backend (if needed)
SUPABASE_URL=https://project-a.supabase.co
SUPABASE_SERVICE_ROLE_KEY=project-a-service-role-key
```

**Replace:**
- `project-a.supabase.co` → Actual Project A URL
- `project-a-anon-key` → Actual Project A anon key
- `project-a-service-role-key` → Actual Project A service role key

---

### Step 5: Migrate Data (If BusinessHub Has Data)

**If BusinessHub has NO important data:**
- ✅ Skip this step
- ✅ Just update environment variables
- ✅ Done!

**If BusinessHub HAS data:**

#### 5.1 Export Data from Project B

**Option A: Using Supabase Dashboard**
1. Go to Project B dashboard
2. **Table Editor** → Select tables
3. **Export** → Download as CSV/SQL

**Option B: Using SQL**
```sql
-- Export users (if any)
SELECT * FROM auth.users;

-- Export consultations
SELECT * FROM consultation_submissions;

-- Export services
SELECT * FROM services;

-- Export other tables
```

#### 5.2 Import Data to Project A

**Option A: Using Supabase Dashboard**
1. Go to Project A dashboard
2. **Table Editor** → Import data
3. Upload CSV files

**Option B: Using SQL**
```sql
-- Import to Project A
-- Run INSERT statements
-- Handle conflicts (duplicate emails, etc.)
```

**Important:**
- Check for duplicate users (same email)
- Merge data if needed
- Test after import

---

### Step 6: Update Supabase Client (Already Done ✅)

**File:** `client/src/lib/supabase/client.ts`

**Status:** ✅ Already updated with:
- `storageKey: 'sb-auth-token'` (matches other platforms)
- Proper configuration for SSO

**No changes needed here!**

---

### Step 7: Test Single Sign-On

**After updating environment variables:**

1. **Restart BusinessHub**
   ```bash
   npm run dev
   ```

2. **Test Login Flow:**
   - Login on Contract-Management-System
   - Open BusinessHub in new tab
   - Should be automatically logged in ✅
   - Open business-services-hub in new tab
   - Should be automatically logged in ✅

3. **Test Logout:**
   - Logout from any platform
   - Should logout from all platforms ✅

---

## 🔍 How to Find Project A Credentials

### Method 1: From Contract-Management-System

**Check files:**
- `.env.local`
- `.env.example`
- `lib/supabase/client.ts`
- Environment variables in deployment (Vercel, etc.)

**Look for:**
```typescript
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
```

### Method 2: From business-services-hub

**Same process:**
- Check `.env.local`
- Check environment variables
- Look for Supabase configuration

### Method 3: From Supabase Dashboard

1. **List all projects:**
   - https://supabase.com/dashboard
   - See all your projects

2. **Identify Project A:**
   - Which one is used by Contract-Management-System?
   - Which one is used by business-services-hub?
   - That's Project A

3. **Get credentials:**
   - Click on Project A
   - Settings → API
   - Copy URL and keys

---

## 📝 Quick Checklist

### Before Migration:
- [ ] Identify Project A (used by other platforms)
- [ ] Get Project A credentials (URL + anon key)
- [ ] Check BusinessHub current project (Project B)
- [ ] Check if BusinessHub has data to migrate
- [ ] Backup Project B data (if needed)

### During Migration:
- [ ] Update BusinessHub `.env` file with Project A credentials
- [ ] Export data from Project B (if needed)
- [ ] Import data to Project A (if needed)
- [ ] Restart BusinessHub

### After Migration:
- [ ] Test login on BusinessHub
- [ ] Test single sign-on (login on one, check others)
- [ ] Test logout (logout from one, check others)
- [ ] Verify data is accessible
- [ ] Test all BusinessHub features

---

## 🚨 Important Notes

### 1. Same Domain Required

**For localStorage to work:**
- All platforms should be on same domain/subdomain
- Example: `*.thesmartpro.io`

**If different domains:**
- Need to use cookies instead
- More complex setup

### 2. Storage Key Must Match

**All platforms must use:**
```typescript
storageKey: 'sb-auth-token'
```

**BusinessHub:** ✅ Already set  
**Other platforms:** Need to verify

### 3. Same Supabase Project

**All platforms must use:**
- Same Supabase URL
- Same Supabase anon key
- Same Supabase project

**This is what we're fixing now!**

---

## 🎯 What I Need From You

**To proceed, please provide:**

1. **Project A Supabase URL:**
   - From Contract-Management-System or business-services-hub
   - Format: `https://xxxxx.supabase.co`

2. **Project A Anon Key:**
   - From Supabase Dashboard → Settings → API
   - Format: `eyJhbGc...`

3. **Does BusinessHub have data?**
   - Yes/No
   - If yes, what data? (users, consultations, services, etc.)

**Once you provide these, I'll:**
- ✅ Update BusinessHub environment variables
- ✅ Help migrate data (if needed)
- ✅ Test single sign-on
- ✅ Verify everything works

---

## 🚀 Quick Start (If You Have Credentials)

**If you already have Project A credentials:**

1. **Update `.env` file:**
   ```env
   VITE_SUPABASE_URL=https://project-a.supabase.co
   VITE_SUPABASE_ANON_KEY=project-a-anon-key
   ```

2. **Restart BusinessHub:**
   ```bash
   npm run dev
   ```

3. **Test:**
   - Login on other platform
   - Open BusinessHub
   - Should be logged in ✅

**That's it!** Simple if no data migration needed.

---

## ❓ Ready to Proceed?

**Tell me:**

1. **Project A Supabase URL:** `?`
2. **Project A Anon Key:** `?`
3. **BusinessHub has data?** (Yes/No)

**Or if you need help finding credentials, I can guide you!** 🚀

