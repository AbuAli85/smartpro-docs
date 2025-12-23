# Simple Fix - 3 Steps

## 🎯 **Just Do This:**

### **1. Go to Supabase**
https://supabase.com/dashboard/project/xavocdikwiimrjgybiai
→ Settings → Database

### **2. Copy Connection String**
- Scroll to **Connection string**
- Click **Connection pooling** → **Transaction**
- **Copy the string** (has `[YOUR-PASSWORD]` in it)

### **3. Reset Password & Update**
- Click **Reset database password**
- **Copy the new password**
- Replace `[YOUR-PASSWORD]` in the connection string
- Paste into `.env` file

### **4. Test**
```bash
npx prisma db pull
```

**Done!** ✅

---

That's it. No more steps needed.
