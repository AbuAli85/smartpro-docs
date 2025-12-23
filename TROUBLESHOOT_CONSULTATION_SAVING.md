# Troubleshoot: Why Consultations Aren't Saving

## 🔍 **Current Status**

- ✅ Database connection: **Working**
- ✅ Tables exist: **Yes**
- ❌ Consultations saved: **0** (not saving)

---

## 🎯 **Possible Causes**

### **1. DATABASE_URL Not Set in Production (Vercel)**

**Most Common Issue!**

If your site is deployed on Vercel, the `.env` file is **NOT used**. You need to set environment variables in Vercel.

**Check:**
1. Go to **Vercel Dashboard**
2. Select your project
3. **Settings → Environment Variables**
4. Look for `DATABASE_URL`
5. If missing, add it with your connection string

**Fix:**
1. Copy your connection string from `.env`:
   ```
   postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
2. Add to Vercel:
   - **Name:** `DATABASE_URL`
   - **Value:** Your connection string (with password)
   - **Environment:** All (Production, Preview, Development)
3. **Redeploy** your application

### **2. Prisma Client Not Generated**

**Check:**
```bash
# Generate Prisma client
npx prisma generate
```

**If deploying to Vercel:**
- Make sure `prisma generate` runs in build process
- Check `package.json` build script includes it

### **3. Server Logs Show Errors**

**Check your server logs when submitting consultation:**

**If you see:**
```
❌ Prisma client not available - cannot save to database
DATABASE_URL: NOT SET
```

**Then:**
- `DATABASE_URL` is not set in production environment
- Set it in Vercel environment variables

**If you see:**
```
❌ Failed to save consultation to database
```

**Then:**
- Check the error details
- Verify database connection
- Check table structure matches Prisma schema

---

## 🧪 **How to Test**

### **Test 1: Submit Consultation Form**

1. Go to your consultation form
2. Fill and submit
3. **Check server logs** (Vercel logs or local terminal)
4. Look for:
   - `💾 Attempting to save consultation to database`
   - `✅ Consultation submission saved to database successfully`
   - OR error messages

### **Test 2: Check Database After Submission**

**Run in Supabase SQL Editor:**
```sql
SELECT * FROM consultation_submissions ORDER BY created_at DESC LIMIT 1;
```

**If nothing appears:**
- Consultation didn't save
- Check server logs for errors

### **Test 3: Test Locally**

1. Make sure `.env` file has `DATABASE_URL`
2. Run development server:
   ```bash
   npm run dev
   ```
3. Submit consultation form
4. Check database:
   ```sql
   SELECT * FROM consultation_submissions ORDER BY created_at DESC LIMIT 1;
   ```

**If it works locally but not in production:**
- `DATABASE_URL` not set in Vercel
- Set it in Vercel environment variables

---

## ✅ **Quick Fix Checklist**

### **For Local Development:**
- [ ] `.env` file exists with `DATABASE_URL`
- [ ] Password is correct in `.env`
- [ ] Run `npx prisma generate`
- [ ] Test by submitting consultation form
- [ ] Check database for saved record

### **For Production (Vercel):**
- [ ] Go to Vercel Dashboard
- [ ] Settings → Environment Variables
- [ ] Add `DATABASE_URL` with connection string
- [ ] Include password in connection string
- [ ] Set for all environments (Production, Preview, Development)
- [ ] Redeploy application
- [ ] Test by submitting consultation form
- [ ] Check database for saved record

---

## 🔧 **Set DATABASE_URL in Vercel**

### **Step-by-Step:**

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Your Project**
   - Find your `smartpro-docs` project

3. **Go to Settings**
   - Click **Settings** tab

4. **Environment Variables**
   - Click **Environment Variables** in left sidebar

5. **Add New Variable**
   - Click **Add New**
   - **Name:** `DATABASE_URL`
   - **Value:** 
     ```
     postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
     ```
     (Replace `YOUR_PASSWORD` with actual password)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

6. **Redeploy**
   - Go to **Deployments** tab
   - Click **...** on latest deployment
   - Click **Redeploy**

7. **Test**
   - Submit consultation form
   - Check database

---

## 📊 **Verify It's Working**

After setting `DATABASE_URL` in Vercel and redeploying:

1. **Submit consultation form**
2. **Check database:**
   ```sql
   SELECT * FROM consultation_submissions ORDER BY created_at DESC LIMIT 1;
   ```
3. **Should see your submission!** 🎉

---

## 🆘 **Still Not Working?**

### **Check Server Logs**

**In Vercel:**
1. Go to **Deployments**
2. Click on latest deployment
3. Click **Functions** tab
4. Look for API route logs
5. Check for errors

**Common errors:**
- `DATABASE_URL: NOT SET` → Set in Vercel
- `Prisma client not available` → Run `npx prisma generate`
- `Table does not exist` → Run `UNIFIED_SCHEMA_MIGRATION.sql`
- `Authentication failed` → Check password in connection string

---

## ✅ **Summary**

**Most likely issue:** `DATABASE_URL` not set in Vercel environment variables.

**Quick fix:**
1. Set `DATABASE_URL` in Vercel
2. Redeploy
3. Test consultation form
4. Check database

**The code is ready - just needs environment variable configured!** 🚀

