# Fix Database Authentication Error

## ❌ **Current Error**

```
Authentication failed against database server at `aws-1-ap-southeast-2.pooler.supabase.com`, 
the provided database credentials for `postgres` are not valid.
```

**This means:** Your `DATABASE_URL` has the wrong password or incorrect format.

---

## ✅ **Step-by-Step Fix**

### **Step 1: Get Correct Connection String from Supabase**

1. **Go to Supabase Dashboard**
   - URL: https://supabase.com/dashboard
   - Select your project (looks like: `xavocdikwiimrjgybiai` or similar)

2. **Navigate to Database Settings**
   - Click **Settings** (gear icon) in left sidebar
   - Click **Database** in settings menu

3. **Reset Database Password** (Important!)
   - Scroll to **Database password** section
   - Click **Reset database password** button
   - **Copy the NEW password immediately** (you won't see it again!)
   - **Save it somewhere safe** (password manager, notes, etc.)

4. **Get Connection String**
   - On the same page, scroll to **Connection string** section
   - Click **Session mode** tab (NOT URI, NOT Transaction mode)
   - **Copy the ENTIRE connection string**
   - It should look like:
     ```
     postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
     ```

**Important Details:**
- ✅ Use **Session mode** tab
- ✅ Port should be **6543** (not 5432)
- ✅ Host should be **pooler.supabase.com** (not db.supabase.co)
- ✅ Should have `?pgbouncer=true` at the end
- ✅ Replace `[PASSWORD]` with the password you just reset

---

### **Step 2: Update .env File (Local Development)**

1. **Open `.env` file** in project root:
   ```
   C:\Users\HP\Documents\GitHub\smartpro-docs\.env
   ```

2. **Find or add `DATABASE_URL` line**

3. **Replace with the connection string from Step 1**

**Example:**
```env
DATABASE_URL="postgresql://postgres.xavocdikwiimrjgybiai:YourNewPassword123@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Important:**
- ✅ Use **double quotes** around the URL
- ✅ **No spaces** before/after `=`
- ✅ Replace `[PASSWORD]` with actual password from Step 1
- ✅ **Copy exactly** from Supabase (don't type manually)

---

### **Step 3: Handle Special Characters in Password**

If your password contains special characters like `@`, `#`, `%`, `&`, `+`, etc.:

1. **URL-encode the password:**
   - Go to: https://www.urlencoder.org/
   - Paste **ONLY the password** (not the whole connection string)
   - Click **Encode**
   - Copy the encoded version
   - Replace `[PASSWORD]` in connection string with encoded version

**Example:**
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`
- Use in connection string: `postgresql://postgres.xavocdikwiimrjgybiai:MyP%40ss%23123@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true`

---

### **Step 4: Update Vercel Environment Variables (Production)**

**If you're deploying to Vercel, you also need to update there:**

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your project (`smartpro-docs`)

2. **Settings → Environment Variables**

3. **Find `DATABASE_URL`** or **Add New Variable:**
   - **Name:** `DATABASE_URL`
   - **Value:** The same connection string from Step 1 (with correct password)
   - **Environment:** All (Production, Preview, Development)
   - **Save**

4. **Redeploy:**
   - Go to **Deployments**
   - Click **...** on latest deployment
   - Click **Redeploy**

---

### **Step 5: Test Connection**

**Option A: Test with Prisma**
```bash
cd C:\Users\HP\Documents\GitHub\smartpro-docs
pnpm exec prisma db pull
```

**Should see:** ✅ Success message

**Option B: Test with Prisma Studio**
```bash
pnpm exec prisma studio
```

**Should open:** Browser at `http://localhost:5555` showing your tables

**Option C: Test API Endpoint**
```bash
# If you have a test endpoint
curl http://localhost:3001/api/consultation/test-db
```

---

## 🔍 **Verify Connection String Format**

Your connection string should have:

✅ **Correct Format:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
```

✅ **Check These:**
- `postgres.[PROJECT-REF]` (with dot, not colon)
- Port `6543` (not 5432)
- `pooler.supabase.com` (not db.supabase.co)
- `?pgbouncer=true` at the end
- Password is correct (from reset in Step 1)

❌ **Wrong Formats:**
```
postgresql://postgres:[PASSWORD]@...  # Missing project ref
postgresql://postgres@...             # Missing password
postgresql://...:5432/...             # Wrong port
postgresql://...db.supabase.co...     # Wrong host
```

---

## 🆘 **If Still Fails**

### **Try Direct Connection (Alternative)**

If pooling still fails, try direct connection:

1. **In Supabase Dashboard:**
   - **Connection string** → **URI** tab
   - Copy connection string
   - Should be: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

2. **Update `.env`:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:5432/postgres"
   ```

3. **Test again**

---

## ✅ **Quick Checklist**

- [ ] Reset password in Supabase Dashboard
- [ ] Copied NEW password
- [ ] Got connection string from **Session mode** tab
- [ ] Connection string has port **6543**
- [ ] Connection string has `pooler.supabase.com`
- [ ] Connection string has `?pgbouncer=true`
- [ ] Replaced `[PASSWORD]` in connection string
- [ ] URL-encoded password if it has special characters
- [ ] Updated `.env` file (local)
- [ ] Updated Vercel Environment Variables (production)
- [ ] Saved all files
- [ ] Tested: `pnpm exec prisma db pull`
- [ ] Tested: `pnpm exec prisma studio`

---

## 🎯 **Summary**

**The Problem:** Wrong password or incorrect connection string format

**The Solution:**
1. Reset password in Supabase
2. Get connection string from Session mode tab
3. Update `.env` file with correct connection string
4. Update Vercel environment variables
5. Test connection

**Most Common Issues:**
- ❌ Using old password
- ❌ Wrong connection string format
- ❌ Special characters in password not URL-encoded
- ❌ Using wrong port (5432 instead of 6543)
- ❌ Using direct connection instead of pooler

---

**After fixing, your database connection should work!** 🎉

