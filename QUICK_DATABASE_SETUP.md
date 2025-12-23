# Quick Database Setup Guide

## 🎯 **Your Connection String**

```
postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres
```

---

## ⚡ **3-Minute Setup**

### **Step 1: Get Your Password**

1. Go to: https://supabase.com/dashboard/project/xavocdikwiimrjgybiai
2. **Settings → Database**
3. Find **Database password**
4. If forgotten: Click **Reset database password**
5. Copy the password

### **Step 2: Create `.env` File**

**File location:** `C:\Users\HP\Documents\GitHub\smartpro-docs\.env`

**Content:**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD_HERE@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres"
```

**Replace `YOUR_PASSWORD_HERE`** with your actual password.

### **Step 3: Initialize Prisma**

Open terminal in project folder and run:

```bash
npx prisma generate
```

### **Step 4: Verify Connection**

```bash
npx prisma db pull
```

If successful, you're connected! ✅

---

## ✅ **Test It Works**

1. **Submit consultation form** on your website
2. **Check database:**
   ```sql
   SELECT * FROM consultation_submissions ORDER BY created_at DESC LIMIT 1;
   ```
3. **Should see your submission!** 🎉

---

## 🆘 **If It Doesn't Work**

### **Check 1: Password Correct?**
- Verify password in Supabase Dashboard
- Make sure no extra spaces in `.env` file

### **Check 2: Tables Exist?**
- Run `TEST_DATABASE_CONNECTION.sql` in Supabase SQL Editor
- If tables missing, run `UNIFIED_SCHEMA_MIGRATION.sql`

### **Check 3: Prisma Generated?**
```bash
npx prisma generate
```

---

## 📋 **That's It!**

Once `DATABASE_URL` is set, everything works automatically:
- ✅ Consultations save to database
- ✅ Leads created automatically
- ✅ No code changes needed!

