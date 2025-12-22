# ⚠️ CRITICAL: Wrong Hostname for Connection Pooling

## The Problem

You're using:
```
postgres://postgres:password@db.reootcngcptfogfozlmz.supabase.co:6543/postgres
```

**This is WRONG!** ❌

You're using the **direct connection hostname** (`db.xxxxx.supabase.co`) with port 6543. Connection pooling requires a **DIFFERENT hostname** that contains `pooler` or `pool`.

---

## The Solution

### Connection Pooling Uses a DIFFERENT Hostname

**Direct Connection (port 5432):**
```
postgresql://postgres:password@db.reootcngcptfogfozlmz.supabase.co:5432/postgres
```

**Connection Pooling (port 6543) - CORRECT:**
```
postgresql://postgres.xxxxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

Notice:
- ✅ Different hostname (contains `pooler` or `pool`)
- ✅ Port 6543
- ✅ Username format might be different (`postgres.xxxxx` instead of just `postgres`)

---

## How to Get the CORRECT Connection Pooling URL

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Settings** (gear icon) → **Database**
4. Scroll to **Connection string** section
5. **Click the "Connection pooling" tab** (NOT "URI" tab)
6. **Copy the ENTIRE connection string** - it will have:
   - A hostname with `pooler` or `pool` in it
   - Port 6543
   - May have a different username format

**Example of what you should see:**
```
postgresql://postgres.reootcngcptfogfozlmz:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**NOT:**
```
postgresql://postgres:password@db.reootcngcptfogfozlmz.supabase.co:6543/postgres
```

---

## Update Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Edit `DATABASE_URL`
3. Paste the **COMPLETE connection pooling URL** from Supabase (with the pooler hostname)
4. **Replace `[YOUR-PASSWORD]`** with your actual password
5. Click **Save**
6. **Redeploy**

---

## Verify

After redeploy, test:
```
https://smartpro-docs.vercel.app/api/consultation/test-db
```

Should return: `{"success": true, ...}`

---

## Key Points

- ❌ **Wrong**: Using `db.xxxxx.supabase.co:6543` (direct hostname with pooling port)
- ✅ **Correct**: Using `xxxxx.pooler.supabase.com:6543` (pooler hostname with pooling port)
- The hostname MUST contain `pooler` or `pool` for connection pooling to work
- Get it from Supabase Dashboard → Settings → Database → **Connection pooling** tab

---

That's it! 🎉

