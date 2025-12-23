# Get Exact Connection String from Supabase

## ✅ **Progress!**

- ✅ pnpm is working
- ✅ Dependencies installed
- ✅ Prisma client generated
- ❌ Connection string/password issue

---

## 🔧 **Get EXACT Connection String**

### **Step 1: Go to Supabase Dashboard**

1. Open: **https://supabase.com/dashboard/project/xavocdikwiimrjgybiai/settings/database**

### **Step 2: Reset Password (Important!)**

1. Scroll to **Database password**
2. Click **Reset database password**
3. **Copy the NEW password immediately** (you won't see it again!)
4. **Save it somewhere safe**

### **Step 3: Get Connection String**

**Same page, scroll to Connection string:**

1. Click **Session mode** tab (NOT URI, NOT Transaction mode)
2. **Copy the ENTIRE connection string**
3. It should look like:
   ```
   postgresql://postgres.xavocdikwiimrjgybiai:[YOUR-PASSWORD]@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

**Important:**
- ✅ Use **Session mode** tab
- ✅ Port should be **6543** (not 5432)
- ✅ Host should be **pooler.supabase.com** (not db.supabase.co)
- ✅ Should have `?pgbouncer=true` at the end

### **Step 4: Update .env File**

1. Open `.env` file in project root
2. Find the `DATABASE_URL` line
3. **Replace the ENTIRE line** with the connection string from Step 3
4. **Replace `[YOUR-PASSWORD]`** with the password from Step 2

**Example:**
```env
DATABASE_URL="postgresql://postgres.xavocdikwiimrjgybiai:YourNewPassword123@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Important:**
- ✅ Use **double quotes** around the URL
- ✅ **No spaces** before/after `=`
- ✅ Replace `[YOUR-PASSWORD]` with actual password
- ✅ **Copy exactly** from Supabase (don't type manually)

### **Step 5: If Password Has Special Characters**

If your password contains `@`, `#`, `%`, `&`, `+`, etc.:

1. **URL-encode the password:**
   - Go to: https://www.urlencoder.org/
   - Paste ONLY the password (not the whole connection string)
   - Click "Encode"
   - Copy the encoded version
   - Replace `[YOUR-PASSWORD]` in connection string with encoded version

**Example:**
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`
- Use: `postgresql://postgres.xavocdikwiimrjgybiai:MyP%40ss%23123@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true`

### **Step 6: Test**

```bash
pnpm exec prisma db pull
```

**Should work now!** ✅

---

## 🆘 **If Still Fails**

### **Check Connection String Format**

Your connection string should have:
- ✅ `postgres.xavocdikwiimrjgybiai` (with dot, not colon)
- ✅ Port `6543` (not 5432)
- ✅ `pooler.supabase.com` (not db.supabase.co)
- ✅ `?pgbouncer=true` at the end

### **Verify .env File**

1. **Location:** Must be in project root: `C:\Users\HP\Documents\GitHub\smartpro-docs\.env`
2. **Format:** `DATABASE_URL="..."` (with quotes)
3. **No extra spaces:** No spaces around `=`

### **Try Direct Connection (Alternative)**

If pooling still fails, try direct connection:

1. **Connection string** → **URI** tab
2. Copy connection string
3. Should be: `postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:5432/postgres`
4. Update `.env` with this

---

## ✅ **Quick Checklist**

- [ ] Reset password in Supabase
- [ ] Copied NEW password
- [ ] Got connection string from **Session mode** tab
- [ ] Connection string has port **6543**
- [ ] Connection string has `pooler.supabase.com`
- [ ] Connection string has `?pgbouncer=true`
- [ ] Replaced `[YOUR-PASSWORD]` in connection string
- [ ] URL-encoded password if it has special characters
- [ ] Updated `.env` file
- [ ] Saved `.env` file
- [ ] Tested: `pnpm exec prisma db pull`

---

## 🚀 **That's It!**

Get the **exact connection string** from Supabase (Session mode), update `.env`, and it should work! 🔐

