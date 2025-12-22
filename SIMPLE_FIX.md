# Simple Fix: Supabase Database Connection

**⚠️ CRITICAL: For Vercel, you MUST use Connection Pooling (port 6543), NOT direct connection (port 5432)**

---

## Quick Fix (3 Steps)

### Step 1: Get Connection Pooling URL

1. Go to [Supabase Dashboard](https://app.supabase.com/) → Your Project
2. **Settings** (gear icon) → **Database**
3. Scroll to **Connection string** section
4. **Click "Connection pooling" tab** (NOT "URI" tab)
5. Copy the connection string (uses port **6543**)

**Example:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Replace `[YOUR-PASSWORD]` with your actual password!**

---

### Step 2: Update Vercel Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project
2. **Settings** → **Environment Variables**
3. Find `DATABASE_URL` → Click **Edit**
4. Paste your **connection pooling URL** (port 6543)
5. Click **Save**

---

### Step 3: Redeploy

- Click **Redeploy** in Vercel, or push a new commit

---

## Verify

Test: `https://smartpro-docs.vercel.app/api/consultation/test-db`

**Expected:**
```json
{
  "success": true,
  "message": "Database connection successful"
}
```

---

## Why Connection Pooling?

- ✅ **Required for Vercel**: Direct connections (5432) fail in serverless
- ✅ **Better performance**: Reuses connections efficiently
- ✅ **More reliable**: Handles connection lifecycle automatically

**Direct connection (port 5432) will NOT work with Vercel!**

---

That's it! 🎉
