# Test Database Connection via API

## 🧪 **Test Your Database Connection**

Your code has a test endpoint you can use to verify the database connection.

### **Test Endpoint:**

**URL:** `https://your-website.vercel.app/api/consultation/test-db`

**Or locally:** `http://localhost:3000/api/consultation/test-db`

### **What It Checks:**

1. ✅ Is Prisma client available?
2. ✅ Is `DATABASE_URL` set?
3. ✅ Can connect to database?
4. ✅ Do tables exist?
5. ✅ How many records?

### **Expected Response (Success):**

```json
{
  "success": true,
  "message": "Database connection successful",
  "tableExists": true,
  "recordCount": 0,
  "DATABASE_URL": "SET"
}
```

### **Expected Response (Error):**

```json
{
  "error": "Database not available",
  "prismaError": "Prisma not initialized",
  "DATABASE_URL": "NOT SET"
}
```

---

## 🔍 **How to Use**

### **Step 1: Open Test URL**

Open in browser or use curl:
```bash
curl https://your-website.vercel.app/api/consultation/test-db
```

### **Step 2: Check Response**

**If `DATABASE_URL: "NOT SET"`**
- Set `DATABASE_URL` in Vercel environment variables
- Redeploy

**If `success: true`**
- Database connection is working!
- Submit a consultation form to test saving

---

## 📋 **Quick Test Steps**

1. **Test connection:**
   - Visit: `https://your-website.vercel.app/api/consultation/test-db`
   - Check response

2. **If DATABASE_URL not set:**
   - Go to Vercel → Settings → Environment Variables
   - Add `DATABASE_URL` with your connection string
   - Redeploy

3. **Test again:**
   - Visit test endpoint again
   - Should show `success: true`

4. **Submit consultation:**
   - Fill and submit consultation form
   - Check database for saved record

---

## ✅ **This Will Tell You**

- ✅ Is database connection working?
- ✅ Is `DATABASE_URL` set in production?
- ✅ Can Prisma connect?
- ✅ Do tables exist?

Use this to diagnose why consultations aren't saving! 🔍

