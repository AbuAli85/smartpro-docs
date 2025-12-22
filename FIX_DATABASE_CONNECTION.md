# Fix Database Connection Error

## The Problem
```
Can't reach database server at `db.xxxxx.supabase.co:5432`
```

This happens because **Vercel serverless functions should use connection pooling**, not direct database connections.

---

## Quick Fix (2 Steps)

### Step 1: Get Connection Pooling URL

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Settings** (gear icon) → **Database**
4. Scroll to **Connection string** section
5. Click the **Connection pooling** tab (NOT the "URI" tab)
6. Copy the connection string - it will use port **6543** instead of 5432

**Example:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Important:** Replace `[YOUR-PASSWORD]` with your actual database password.

---

### Step 2: Update Vercel Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Find `DATABASE_URL` and click **Edit**
5. Replace the value with your **connection pooling URL** (port 6543)
6. Click **Save**
7. **Redeploy** your project

---

## Why Connection Pooling?

- ✅ **Better for serverless**: Handles connection limits efficiently
- ✅ **More reliable**: Designed for short-lived serverless functions
- ✅ **Faster**: Reuses connections instead of creating new ones
- ✅ **Required for Vercel**: Direct connections (port 5432) often timeout or fail

---

## Verify It Works

After redeploying, test:
```
https://smartpro-docs.vercel.app/api/consultation/test-db
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "tableExists": true,
  "recordCount": 0,
  "DATABASE_URL": "SET"
}
```

---

## Still Not Working?

1. **Check password**: Make sure you replaced `[YOUR-PASSWORD]` with your actual password
2. **Check hostname**: Verify the hostname in the connection string matches your Supabase project
3. **Check IP restrictions**: In Supabase Dashboard → Settings → Database → Connection pooling, ensure "Restrict connections to specific IP addresses" is disabled (or add Vercel's IP ranges)
4. **Check project status**: Ensure your Supabase project is active and not paused

---

## Difference Between Direct and Pooling

| Feature | Direct (5432) | Pooling (6543) |
|---------|---------------|----------------|
| Use case | Long-lived connections | Short-lived (serverless) |
| Connection limit | Lower | Higher |
| Best for | Traditional servers | Vercel, serverless |
| Recommended | ❌ For Vercel | ✅ For Vercel |

---

That's it! 🎉

