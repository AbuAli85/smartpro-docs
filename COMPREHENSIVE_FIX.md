# Comprehensive Database Connection Fix

## 🔍 **Diagnostic Steps**

Since everything has been tried, let's diagnose systematically:

---

## **Step 1: Test Connection Directly (Bypass Prisma)**

### **Install pg package:**
```bash
npm install pg dotenv
```

### **Run test script:**
```bash
node test-connection.js
```

This will tell us:
- ✅ If connection string format is correct
- ✅ If password is correct
- ✅ If network can reach Supabase
- ✅ Exact error message

---

## **Step 2: Verify .env File**

### **Check if .env is in correct location:**
- Must be in project root: `C:\Users\HP\Documents\GitHub\smartpro-docs\.env`
- Not in subdirectories

### **Check .env format:**
```env
DATABASE_URL="postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Important:**
- ✅ Use **double quotes** around the URL
- ✅ No spaces before/after `=`
- ✅ Password should be URL-encoded if it has special characters
- ✅ Use **pooling URL** (port 6543, `pooler.supabase.com`)

---

## **Step 3: Try Different Connection Methods**

### **Method A: Direct Connection (Port 5432)**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xavocdikwiimrjgybiai.supabase.co:5432/postgres"
```

### **Method B: Pooling - Session Mode**
```env
DATABASE_URL="postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### **Method C: Pooling - Transaction Mode**
```env
DATABASE_URL="postgresql://postgres.xavocdikwiimrjgybiai:YOUR_PASSWORD@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&pgbouncer=true"
```

---

## **Step 4: Check Supabase Project Status**

1. Go to: **https://supabase.com/dashboard/project/xavocdikwiimrjgybiai**
2. Check if project shows **"Active"** (not paused)
3. If paused, **unpause it**

---

## **Step 5: Verify Password**

1. **Reset password** in Supabase Dashboard
2. **Copy password immediately**
3. **URL-encode if needed:**
   - Special characters like `@`, `#`, `%` need encoding
   - Use online URL encoder: https://www.urlencoder.org/
4. **Update .env** with encoded password

---

## **Step 6: Test with Supabase Client (Alternative)**

If Prisma keeps failing, use Supabase client directly:

```bash
npm install @supabase/supabase-js
```

```javascript
// test-supabase-client.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://xavocdikwiimrjgybiai.supabase.co';
const supabaseKey = 'your-anon-key'; // Get from Supabase Dashboard → Settings → API

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('profiles').select('count');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ Supabase client works!');
  }
}

test();
```

---

## **Step 7: Check Network/Firewall**

### **Test if you can reach Supabase:**
```bash
# Test DNS resolution
nslookup db.xavocdikwiimrjgybiai.supabase.co

# Test port 5432
Test-NetConnection -ComputerName db.xavocdikwiimrjgybiai.supabase.co -Port 5432

# Test port 6543
Test-NetConnection -ComputerName aws-1-ap-southeast-2.pooler.supabase.com -Port 6543
```

---

## **Step 8: Prisma-Specific Fixes**

### **Clear Prisma cache:**
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

### **Try with explicit connection:**
```bash
npx prisma db pull --schema=./prisma/schema.prisma
```

### **Check Prisma version:**
```bash
npx prisma --version
```

Update if needed:
```bash
npm install prisma@latest @prisma/client@latest
```

---

## **Step 9: Alternative: Use Supabase SQL Editor**

If Prisma won't work, you can:
1. Use **Supabase SQL Editor** for migrations
2. Use **Supabase Client** in your app (instead of Prisma)
3. Use **Supabase REST API** directly

---

## **Step 10: Get Help from Supabase**

If nothing works:
1. Check **Supabase Status**: https://status.supabase.com/
2. Check **Supabase Logs**: Dashboard → Logs
3. Contact **Supabase Support**

---

## **Quick Test Script**

Run this to test everything:

```bash
# 1. Install dependencies
npm install pg dotenv

# 2. Run test
node test-connection.js

# 3. Check output
# - If it works: Connection string is correct
# - If it fails: Check error message for specific issue
```

---

## **Most Likely Issues**

1. **Password has special characters** → URL-encode it
2. **Project is paused** → Unpause in Supabase
3. **Network/firewall blocking** → Check network settings
4. **Wrong connection string format** → Copy exact string from Supabase
5. **.env file not loading** → Check file location and format

---

## **Next Steps**

1. Run `node test-connection.js` first
2. Share the error output
3. We'll fix based on specific error

