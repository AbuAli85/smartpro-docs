# Setup Database Connection

## 🔗 **Your Supabase Connection String**

```
postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres
```

## ✅ **Connection String Format**

Your connection string looks correct! Just need to:

1. **Replace `YOUR_PASSWORD`** with your actual Supabase database password
2. **Use `postgresql://`** (more standard, but `postgres://` also works)

**Corrected format:**
```
postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres
```

---

## 🚀 **How to Set It Up**

### **Step 1: Get Your Database Password**

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project: `xavocdikwiimrjgybiai`
3. Go to: **Settings → Database**
4. Find **Database password** section
5. If you don't remember it:
   - Click **Reset database password**
   - Copy the new password (save it securely!)

### **Step 2: Create `.env` File**

**Location:** `C:\Users\HP\Documents\GitHub\smartpro-docs\.env`

**Create the file** (if it doesn't exist) and add:

```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:6543/postgres"
```

**Replace `YOUR_ACTUAL_PASSWORD`** with your actual password.

**Example:**
```env
DATABASE_URL="postgresql://postgres:MySecurePassword123@db.reootcngcptfogfozlmz.supabase.co:6543/postgres"
```

### **Step 3: Set in Vercel (For Production)**

If your site is deployed on Vercel:

1. Go to **Vercel Dashboard**
2. Select your project
3. Go to: **Settings → Environment Variables**
4. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:YOUR_PASSWORD@db.reootcngcptfogfozlmz.supabase.co:6543/postgres`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your application

---

## ✅ **Verify Connection**

### **Test 1: Using Prisma**

```bash
# Generate Prisma client
npx prisma generate

# Test connection
npx prisma db pull
```

If successful, you'll see your database schema.

### **Test 2: Check Tables**

```bash
# Open Prisma Studio (visual database browser)
npx prisma studio
```

Opens at `http://localhost:5555` - you can see all tables.

### **Test 3: Submit Consultation Form**

1. Submit a consultation form
2. Check server logs for:
   ```
   ✅ Consultation submission saved to database successfully
   ```
3. Check database:
   ```sql
   SELECT * FROM consultation_submissions ORDER BY created_at DESC LIMIT 1;
   ```

---

## 🔍 **Alternative Connection Strings**

### **Option 1: Direct Connection (Not Pooled)**

```
postgresql://postgres:YOUR_PASSWORD@db.reootcngcptfogfozlmz.supabase.co:5432/postgres
```

**Note:** Port `5432` instead of `6543` (direct connection, not pooled)

### **Option 2: Connection Pooling (Recommended for Serverless)**

```
postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Note:** Uses pooler URL (better for Vercel/serverless)

**To get this:**
1. Supabase Dashboard → Settings → Database
2. Scroll to **Connection string**
3. Select **Connection pooling**
4. Copy the connection string

---

## 🆘 **Troubleshooting**

### **Error: "password authentication failed"**

**Solution:**
- Check password is correct
- Reset database password in Supabase
- Update `.env` file with new password

### **Error: "could not connect to server"**

**Solution:**
- Check internet connection
- Verify Supabase project is active
- Check if IP is whitelisted (if required)

### **Error: "Prisma client not available"**

**Solution:**
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

### **Error: "Table does not exist"**

**Solution:**
- Run `UNIFIED_SCHEMA_MIGRATION.sql` in Supabase SQL Editor
- Or run: `npx prisma db push`

---

## 📋 **Quick Checklist**

- [ ] Get Supabase database password
- [ ] Create `.env` file with `DATABASE_URL`
- [ ] Replace `[YOUR-PASSWORD]` with actual password
- [ ] Run `npx prisma generate`
- [ ] Test connection: `npx prisma db pull`
- [ ] Set `DATABASE_URL` in Vercel (if deployed)
- [ ] Test by submitting consultation form
- [ ] Verify data appears in database

---

## ✅ **Once Setup Complete**

After setting `DATABASE_URL`, the consultation system will automatically:
- ✅ Save consultations to `consultation_submissions` table
- ✅ Create leads in `leads` table
- ✅ Track all submissions

**No additional code needed!** 🎉

