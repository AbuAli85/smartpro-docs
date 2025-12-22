# Quick Fix: Your Connection String

## ⚠️ CRITICAL ISSUE: Wrong Hostname!

You have:
```
postgres://postgres:[YOUR-PASSWORD]@db.reootcngcptfogfozlmz.supabase.co:6543/postgres
```

## ❌ What's Wrong:
- ❌ **Hostname is wrong!** You're using the direct connection hostname (`db.xxxxx.supabase.co`) with port 6543
- ❌ Connection pooling requires a **DIFFERENT hostname** that contains `pooler` or `pool`

## ✅ What Should Be:
- ✅ Hostname should contain `pooler` or `pool` (e.g., `aws-0-us-east-1.pooler.supabase.com`)
- ✅ Port **6543** (connection pooling - correct!)
- ✅ Database name `postgres` is correct

## ⚠️ What to Fix:

### 1. Get the CORRECT Connection Pooling URL from Supabase

**DO NOT use the direct connection hostname!**

1. Go to **Supabase Dashboard** → Your Project
2. **Settings** (gear icon) → **Database**
3. Scroll to **Connection string** section
4. **Click "Connection pooling" tab** (NOT "URI" tab)
5. Copy the **ENTIRE connection string** - it will look like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
   Notice the hostname contains `pooler` or `pool`!

### 2. Replace `[YOUR-PASSWORD]` with Your Actual Password

**Where to find your password:**
- Supabase Dashboard → Settings → Database → Database password
- If you don't remember it, click "Reset database password"

**Final connection string should look like:**
```
postgresql://postgres.xxxxx:MyActualPassword123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## Final Steps:

1. **Replace `[YOUR-PASSWORD]`** with your actual password
2. **Copy the complete string** (with your password)
3. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
4. **Edit `DATABASE_URL`** → Paste the complete string → Save
5. **Redeploy** your project

---

## Test After Redeploy:

```
https://smartpro-docs.vercel.app/api/consultation/test-db
```

Should return: `{"success": true, ...}`

---

**That's it!** 🎉

