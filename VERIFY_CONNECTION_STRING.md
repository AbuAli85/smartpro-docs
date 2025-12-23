# Verify Connection String - Step by Step

## 🔍 **Current Status**

- ✅ Using correct host: `aws-1-ap-southeast-2.pooler.supabase.com:6543`
- ✅ Using pnpm correctly
- ❌ Password/authentication still failing

---

## ✅ **Step-by-Step Verification**

### **Step 1: Check What's in Your .env File**

**Open `.env` file and check the `DATABASE_URL` line.**

**It should look like:**
```env
DATABASE_URL="postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Common mistakes:**
- ❌ Missing `postgres.xavocdikwiimrjgybiai` (should have dot, not colon)
- ❌ Wrong password
- ❌ Missing `?pgbouncer=true` at the end
- ❌ Wrong port (should be 6543, not 5432)
- ❌ Password has special characters that need encoding

---

### **Step 2: Get Fresh Connection String from Supabase**

1. **Go to:** https://supabase.com/dashboard/project/xavocdikwiimrjgybiai/settings/database

2. **Reset Password:**
   - Scroll to **Database password**
   - Click **Reset database password**
   - **Copy the NEW password** (save it!)
   - **Don't close the page yet!**

3. **Get Connection String:**
   - Scroll to **Connection string**
   - Click **Session mode** tab
   - **Copy the ENTIRE connection string**
   - It will have `[YOUR-PASSWORD]` in it

4. **Replace Password:**
   - In the copied connection string, find `[YOUR-PASSWORD]`
   - Replace it with the password from Step 2
   - **Copy the complete string with password replaced**

---

### **Step 3: Check Password for Special Characters**

**If your password contains any of these:**
- `@` → needs to be `%40`
- `#` → needs to be `%23`
- `%` → needs to be `%25`
- `&` → needs to be `%26`
- `+` → needs to be `%2B`
- `/` → needs to be `%2F`
- `=` → needs to be `%3D`
- `?` → needs to be `%3F`
- ` ` (space) → needs to be `%20`

**To URL-encode:**
1. Go to: https://www.urlencoder.org/
2. Paste ONLY the password (not the whole connection string)
3. Click "Encode"
4. Copy the encoded version
5. Use it in the connection string

**Example:**
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`
- Connection string: `postgresql://postgres.xavocdikwiimrjgybiai:MyP%40ss%23123@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true`

---

### **Step 4: Update .env File**

1. **Open `.env` file**
2. **Find `DATABASE_URL` line**
3. **Replace the ENTIRE line** with your connection string from Step 2/3
4. **Make sure:**
   - ✅ Has double quotes: `DATABASE_URL="..."`
   - ✅ No spaces around `=`
   - ✅ Password is correct (or URL-encoded if needed)
   - ✅ Ends with `?pgbouncer=true`

5. **Save the file**

---

### **Step 5: Test Connection**

```bash
pnpm exec prisma db pull
```

---

## 🆘 **If Still Fails**

### **Option 1: Try Direct Connection**

Instead of pooling, try direct connection:

1. **Supabase Dashboard** → **Settings** → **Database**
2. **Connection string** → **URI** tab
3. **Copy connection string**
4. Should be: `postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:5432/postgres`
5. **Update `.env`** with this
6. **Test:** `pnpm exec prisma db pull`

### **Option 2: Verify Password Manually**

1. **Go to Supabase SQL Editor:**
   - https://supabase.com/dashboard/project/xavocdikwiimrjgybiai/sql/new

2. **Try to run a query:**
   ```sql
   SELECT current_database(), current_user;
   ```

3. **If this works:** Database is fine, issue is with Prisma connection string
4. **If this fails:** Password is wrong, reset it again

### **Option 3: Check Connection String Format**

**Correct format for pooling:**
```
postgresql://postgres.xavocdikwiimrjgybiai:PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Correct format for direct:**
```
postgresql://postgres:PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:5432/postgres
```

**Key differences:**
- Pooling: `postgres.xavocdikwiimrjgybiai` (with dot), port `6543`, `pooler.supabase.com`, `?pgbouncer=true`
- Direct: `postgres` (no project ref), port `5432`, `db.supabase.co`, no query params

---

## ✅ **Quick Checklist**

- [ ] Reset password in Supabase
- [ ] Copied NEW password
- [ ] Got connection string from **Session mode** tab
- [ ] Replaced `[YOUR-PASSWORD]` in connection string
- [ ] URL-encoded password if it has special characters
- [ ] Connection string has correct format (see above)
- [ ] Updated `.env` file
- [ ] Saved `.env` file
- [ ] Tested: `pnpm exec prisma db pull`

---

## 🎯 **Most Likely Issue**

**Password is wrong or needs URL-encoding.**

**Solution:**
1. Reset password in Supabase
2. Get fresh connection string
3. URL-encode password if needed
4. Update `.env`
5. Test again

---

## 🚀 **Next Steps**

1. **Reset password** in Supabase (get fresh one)
2. **Get connection string** from Session mode
3. **Check if password needs encoding**
4. **Update `.env`** with correct connection string
5. **Test:** `pnpm exec prisma db pull`

**The password is definitely the issue - get a fresh one and make sure it's correct!** 🔐

