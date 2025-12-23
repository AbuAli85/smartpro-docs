# How to Check Server Logs for Consultation Errors

## 🔍 **Where to Find Logs**

### **If Deployed on Vercel:**

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Your Project**
   - Find `smartpro-docs` project

3. **View Logs**
   - Go to **Deployments** tab
   - Click on latest deployment
   - Click **Functions** tab
   - Or click **View Function Logs**

4. **Look for:**
   - `💾 Attempting to save consultation to database`
   - `✅ Consultation submission saved to database successfully`
   - `❌ Prisma client not available`
   - `DATABASE_URL: NOT SET`

### **If Running Locally:**

**Check terminal where you ran:**
```bash
npm run dev
```

**Look for same messages.**

---

## 🎯 **What to Look For**

### **✅ Success Messages:**
```
💾 Attempting to save consultation to database
✅ Consultation submission saved to database successfully
Lead entry created automatically
```

### **❌ Error Messages:**
```
❌ Prisma client not available - cannot save to database
DATABASE_URL: NOT SET - This is the problem!
```

**Fix:** Set `DATABASE_URL` in Vercel environment variables

```
❌ Failed to save consultation to database
Error: ...
```

**Fix:** Check error details, verify database connection

---

## 📋 **Quick Checklist**

- [ ] Check Vercel logs after submitting consultation
- [ ] Look for success or error messages
- [ ] If errors, fix based on error message
- [ ] Test again after fixing

