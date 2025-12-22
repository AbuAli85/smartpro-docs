# Temporary Workaround: Use Direct Connection

Since connection pooling isn't working, let's use **direct connection** as a temporary workaround to get your database working **right now**.

## ⚠️ Important Notes:
- **Direct connection (port 5432) works** but has limitations
- **Not ideal for production** but will work for now
- **Connection pooling is better** - we'll fix it later

---

## Quick Fix (2 Steps):

### Step 1: Get Direct Connection String

1. Go to **Supabase Dashboard** → Your Project
2. **Settings** → **Database**
3. Scroll to **Connection string** section
4. Click **"URI" tab** (NOT "Connection pooling")
5. Copy the connection string:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.reootcngcptfogfozlmz.supabase.co:5432/postgres
   ```
6. **Replace `[YOUR-PASSWORD]`** with your actual password
   - If password has special characters, URL encode them

### Step 2: Update Vercel

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Edit `DATABASE_URL`
3. Paste the **direct connection string** (port 5432)
4. **Save**
5. **Redeploy**

---

## Test:

```
https://smartpro-docs.vercel.app/api/consultation/test-db
```

Should now work! ✅

---

## Why This Works:

- Direct connection doesn't require connection pooling configuration
- No IP restrictions (usually)
- Simpler authentication
- Works immediately

---

## Limitations (Why We Want Pooling Later):

- ❌ Lower connection limits
- ❌ Can timeout under load
- ❌ Not optimized for serverless
- ❌ May hit connection limits with many requests

---

## After It Works:

Once direct connection is working, we know:
1. ✅ Password is correct
2. ✅ Database is accessible
3. ✅ Vercel can connect

Then we can troubleshoot connection pooling specifically (IP restrictions, pooling configuration, etc.)

---

**This will get you up and running NOW!** 🚀

