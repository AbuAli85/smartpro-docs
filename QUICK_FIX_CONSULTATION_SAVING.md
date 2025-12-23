# Quick Fix: Consultations Not Saving

## 🎯 **The Problem**

- ✅ Database connection: **Working**
- ✅ Tables exist: **Yes**
- ✅ Code implemented: **Yes**
- ❌ Consultations saved: **0**

**Most likely cause:** `DATABASE_URL` not set in **Vercel** (production environment)

---

## ⚡ **Quick Fix (2 Minutes)**

### **Step 1: Test Database Connection**

Visit this URL in your browser:
```
https://your-website.vercel.app/api/consultation/test-db
```

**Check the response:**

**If you see:**
```json
{
  "DATABASE_URL": "NOT SET"
}
```

**Then:** `DATABASE_URL` is not set in Vercel → Go to Step 2

**If you see:**
```json
{
  "success": true,
  "DATABASE_URL": "SET"
}
```

**Then:** Connection is working → Go to Step 3

### **Step 2: Set DATABASE_URL in Vercel**

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Your Project**
   - Find `smartpro-docs` project

3. **Settings → Environment Variables**

4. **Add New Variable:**
   - **Name:** `DATABASE_URL`
   - **Value:** 
     ```
     postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
     ```
     (Get password from Supabase Dashboard → Settings → Database)
   - **Environment:** All (Production, Preview, Development)
   - **Save**

5. **Redeploy:**
   - Go to **Deployments**
   - Click **...** on latest deployment
   - Click **Redeploy**

### **Step 3: Test Again**

1. **Test connection:**
   ```
   https://your-website.vercel.app/api/consultation/test-db
   ```
   Should show `"success": true`

2. **Submit consultation form:**
   - Fill and submit
   - Check database:
     ```sql
     SELECT * FROM consultation_submissions ORDER BY created_at DESC LIMIT 1;
     ```

3. **Should see your submission!** 🎉

---

## 🆘 **Still Not Working?**

### **Check Server Logs**

**In Vercel:**
1. Deployments → Latest deployment → **Functions** tab
2. Look for API route logs
3. Check for errors when submitting consultation

**Look for:**
- `❌ Prisma client not available`
- `DATABASE_URL: NOT SET`
- `❌ Failed to save consultation to database`

### **Common Fixes**

**Error: "DATABASE_URL: NOT SET"**
- Set in Vercel environment variables
- Redeploy

**Error: "Prisma client not available"**
- Run `npx prisma generate` locally
- Make sure it runs in build process

**Error: "Table does not exist"**
- Run `UNIFIED_SCHEMA_MIGRATION.sql` in Supabase

---

## ✅ **Summary**

**Most likely:** `DATABASE_URL` not set in Vercel

**Quick fix:**
1. Set `DATABASE_URL` in Vercel
2. Redeploy
3. Test consultation form
4. Check database

**The code is ready - just needs environment variable!** 🚀

