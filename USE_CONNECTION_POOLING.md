# Use Connection Pooling

## 🔍 **The Issue**

Error changed from `P1000` (authentication) to `P1001` (can't reach server).

This means Prisma **can't connect** to the direct database (port 5432).

**Solution: Use Connection Pooling instead!**

---

## ✅ **Fix: Switch to Connection Pooling**

### **Step 1: Get Pooling Connection String**

1. Go to: **https://supabase.com/dashboard/project/xavocdikwiimrjgybiai/settings/database**
2. Scroll to **Connection string**
3. Click **Session mode** tab (NOT URI)
4. **Copy the connection string**
   - It will look like: `postgresql://postgres.xavocdikwiimrjgybiai:[YOUR-PASSWORD]@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true`

### **Step 2: Update `.env`**

**Open `.env` and replace `DATABASE_URL`:**

```env
DATABASE_URL="postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Replace `YOUR_PASSWORD` with your database password.**

### **Step 3: Test**

```bash
npx prisma db pull
```

**Should work now!** ✅

---

## 🔑 **Why Pooling Works Better**

- **More reliable** for Prisma
- **Better for serverless** (Vercel, etc.)
- **Handles connections** better
- **Recommended by Supabase** for Prisma

---

## ⚠️ **If Still Fails**

1. **Reset database password** in Supabase
2. **Get fresh connection string** (Session mode)
3. **Copy ENTIRE string** from Supabase
4. **Paste into `.env`**

---

## 🎯 **Quick Test**

After updating to pooling URL:

```bash
npx prisma db pull
```

**Connection pooling is the recommended way for Prisma!** 🚀

