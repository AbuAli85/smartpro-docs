# Database Setup - Simple Guide

## ✅ **What You Need**

1. Connection string from Supabase
2. Database password
3. Update `.env` file

---

## 🚀 **3 Steps**

### **Step 1: Get Connection String**

1. Go to: https://supabase.com/dashboard/project/xavocdikwiimrjgybiai
2. **Settings → Database**
3. **Connection string** → **Connection pooling** → **Transaction**
4. **Copy the string**

### **Step 2: Reset Password**

1. Same page: **Database password**
2. **Reset database password**
3. **Copy the new password**

### **Step 3: Update `.env`**

1. Open: `.env` file
2. Replace `[YOUR-PASSWORD]` in connection string with new password
3. Save

### **Test:**
```bash
npx prisma db pull
```

**Done!** ✅

---

## 📝 **That's It!**

No complicated steps. Just:
1. Get connection string
2. Reset password  
3. Update `.env`
4. Test

See `SIMPLE_FIX.md` for the same thing in even fewer words.

