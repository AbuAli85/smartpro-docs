# Your Database Connection Setup

## 🔗 **Your Supabase Project**

**Project ID:** `xavocdikwiimrjgybiai`  
**Connection String:**
```
postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres
```

---

## ⚡ **Quick Setup (3 Steps)**

### **Step 1: Get Your Database Password**

1. Go to: **https://supabase.com/dashboard/project/xavocdikwiimrjgybiai**
2. Click: **Settings → Database**
3. Find: **Database password**
4. If you don't remember it: Click **Reset database password**
5. **Copy the password** (save it securely!)

### **Step 2: Create `.env` File**

**File location:** `C:\Users\HP\Documents\GitHub\smartpro-docs\.env`

**Create the file** and add this line (replace `YOUR_PASSWORD` with your actual password):

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres"
```

**Example:**
```env
DATABASE_URL="postgresql://postgres:MySecurePassword123@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres"
```

### **Step 3: Initialize Prisma**

Open terminal in your project folder and run:

```bash
npx prisma generate
```

**That's it!** ✅

---

## ✅ **Verify It Works**

### **Test 1: Check Connection**

```bash
npx prisma db pull
```

If successful, you'll see your database schema.

### **Test 2: Submit Consultation Form**

1. Submit a consultation form on your website
2. Check database:
   ```sql
   SELECT * FROM consultation_submissions ORDER BY created_at DESC LIMIT 1;
   ```
3. Should see your submission! 🎉

---

## 🆘 **Troubleshooting**

### **Error: "password authentication failed"**
- Check password is correct
- Reset password in Supabase Dashboard
- Update `.env` file

### **Error: "could not connect to server"**
- Check internet connection
- Verify Supabase project is active
- Check connection string format

### **Error: "Table does not exist"**
- Run `UNIFIED_SCHEMA_MIGRATION.sql` in Supabase SQL Editor
- Or run: `npx prisma db push`

---

## 📋 **For Vercel Deployment**

If your site is on Vercel:

1. Go to **Vercel Dashboard**
2. Select your project
3. **Settings → Environment Variables**
4. Add:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres`
   - **Environment**: All (Production, Preview, Development)
5. **Save** and **Redeploy**

---

## ✅ **Once Setup Complete**

After setting `DATABASE_URL`, the system will automatically:
- ✅ Save consultations to database
- ✅ Create leads automatically
- ✅ Track all submissions

**No code changes needed!** 🎉

