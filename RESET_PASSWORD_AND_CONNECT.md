# Reset Password & Fix Connection

## ✅ **The Problem**

Your Supabase database is **working fine** (I can connect via MCP), but the password in your `.env` file is **wrong**.

---

## 🔧 **Fix (3 Steps)**

### **Step 1: Reset Password in Supabase**

1. Go to: **https://supabase.com/dashboard/project/xavocdikwiimrjgybiai/settings/database**
2. Scroll to **Database password**
3. Click **Reset database password**
4. **Copy the NEW password immediately** (you won't see it again!)

### **Step 2: Get Connection String**

**Same page:**
1. Scroll to **Connection string**
2. Click **URI** tab (NOT Session mode or Transaction mode)
3. **Copy the connection string**
   - It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.xavocdikwiimrjgybiai.supabase.co:5432/postgres`

### **Step 3: Update `.env` File**

1. Open `.env` file in your project
2. Find the `DATABASE_URL` line
3. **Replace `[YOUR-PASSWORD]`** with the password from Step 1
4. **Save the file**

**Example:**
```env
DATABASE_URL="postgresql://postgres:YourNewPassword123@db.xavocdikwiimrjgybiai.supabase.co:5432/postgres"
```

### **Step 4: Test**

```bash
npx prisma db pull
```

**Should work now!** ✅

---

## ⚠️ **Important Notes**

- **Password is case-sensitive** - copy it exactly
- **No spaces** in password
- Use **direct connection** (port 5432, `db.xavocdikwiimrjgybiai.supabase.co`)
- **NOT pooling** (port 6543, `pooler.supabase.com`)

---

## 🆘 **Still Not Working?**

1. **Double-check password** - copy it again from Supabase
2. **Check connection string format** - must be exact from Supabase
3. **Try in Supabase SQL Editor** - if that works, it's a Prisma connection string issue

**The password is definitely the issue - reset it and update `.env`!** 🔐

