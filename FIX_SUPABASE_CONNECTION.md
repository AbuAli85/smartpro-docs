# Fix: Data Not Saving to Supabase

## Problem
Consultation form submissions are reaching Google Sheets (via Make.com) but **NOT being saved to Supabase tables**.

## Root Cause Analysis

### Most Likely Issues:

1. **❌ DATABASE_URL Not Set**
   - Prisma needs `DATABASE_URL` environment variable
   - Without it, Prisma can't connect to Supabase
   - Code silently fails and continues in "mock mode"

2. **❌ Prisma Client Not Generated**
   - Prisma client might not be generated
   - Run `npx prisma generate` to create client

3. **❌ Database Connection Failed**
   - Supabase connection string might be incorrect
   - SSL/TLS settings might be wrong
   - Network/firewall blocking connection

4. **❌ Tables Don't Exist**
   - Tables might not be created in Supabase
   - Need to run `npx prisma db push` or migrations

---

## Step-by-Step Fix

### Step 1: Check DATABASE_URL Environment Variable

**In Local Development (.env file)**:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

**In Production (Vercel)**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add/Check `DATABASE_URL`:
   - Key: `DATABASE_URL`
   - Value: Your Supabase connection string
   - Environment: Production, Preview, Development (all)

**Get Supabase Connection String**:
1. Go to Supabase Dashboard → Your Project → Settings → Database
2. Under "Connection string", select "URI"
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your database password

---

### Step 2: Test Database Connection

**New Endpoint Added**: `GET /api/consultation/test-db`

**Test it**:
```bash
# Local
curl http://localhost:3001/api/consultation/test-db

# Production
curl https://your-api-url.vercel.app/api/consultation/test-db
```

**Expected Response** (Success):
```json
{
  "success": true,
  "message": "Database connection successful",
  "tableExists": true,
  "recordCount": 0,
  "DATABASE_URL": "SET"
}
```

**Expected Response** (Failure):
```json
{
  "success": false,
  "error": "Connection error message",
  "code": "P1001",
  "DATABASE_URL": "NOT SET"
}
```

---

### Step 3: Generate Prisma Client

```bash
# In project root
npx prisma generate
```

This creates the Prisma client that the code uses to connect to the database.

---

### Step 4: Push Schema to Database

```bash
# Push schema to Supabase (creates tables if they don't exist)
npx prisma db push

# OR use migrations (recommended for production)
npx prisma migrate dev --name init
```

---

### Step 5: Verify Tables Exist

**In Supabase Dashboard**:
1. Go to **Table Editor**
2. Check if these tables exist:
   - ✅ `consultation_submissions`
   - ✅ `leads`
   - ✅ `analytics_events`
   - ✅ `email_digests`
   - ✅ `api_request_logs`

**Or use SQL**:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'consultation_submissions',
    'leads',
    'analytics_events',
    'email_digests',
    'api_request_logs'
  );
```

---

### Step 6: Check Server Logs

**After submitting a form**, check server logs for:

**✅ Success**:
```
✅ Prisma connected to database successfully
💾 Attempting to save consultation to database
✅ Consultation submission saved to database successfully
```

**❌ Failure**:
```
❌ Prisma failed to connect to database
❌ Prisma client not available - cannot save to database
DATABASE_URL: NOT SET - This is the problem!
```

---

## Quick Diagnostic Checklist

- [ ] `DATABASE_URL` is set in `.env` (local) or Vercel (production)
- [ ] `DATABASE_URL` format is correct (starts with `postgresql://`)
- [ ] Prisma client is generated (`npx prisma generate`)
- [ ] Tables exist in Supabase (`npx prisma db push`)
- [ ] Test endpoint returns success (`/api/consultation/test-db`)
- [ ] Server logs show "Prisma connected to database successfully"

---

## Common Error Codes

### P1001: Can't reach database server
- **Fix**: Check Supabase connection string, network, firewall

### P1000: Authentication failed
- **Fix**: Check database password in connection string

### P1017: Server has closed the connection
- **Fix**: Add `?pgbouncer=true&connection_limit=1` to connection string

### P2002: Unique constraint failed
- **Fix**: This is OK - means duplicate detection is working

---

## Enhanced Error Logging

The code now includes:
- ✅ Detailed error messages with error codes
- ✅ DATABASE_URL status (SET/NOT SET)
- ✅ Connection test endpoint
- ✅ Better logging for database operations

---

## Next Steps After Fix

1. **Test Connection**: Use `/api/consultation/test-db` endpoint
2. **Submit Test Form**: Submit a consultation form
3. **Check Logs**: Verify "saved to database successfully" message
4. **Verify in Supabase**: Check `consultation_submissions` table
5. **Check Leads**: Verify `leads` table has corresponding entry

---

## Still Not Working?

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for Prisma connection errors

2. **Check Supabase Logs**:
   - Go to Supabase Dashboard → Logs
   - Check for connection attempts

3. **Test Connection Manually**:
   ```bash
   # Using psql (if installed)
   psql "postgresql://postgres:[PASSWORD]@[PROJECT].supabase.co:5432/postgres"
   ```

4. **Verify Environment Variables**:
   - Make sure `DATABASE_URL` is set in **all environments** (Production, Preview, Development)

---

## Summary

The most common issue is **DATABASE_URL not being set**. 

1. ✅ Set `DATABASE_URL` in Vercel environment variables
2. ✅ Test connection with `/api/consultation/test-db`
3. ✅ Check server logs for connection status
4. ✅ Verify tables exist in Supabase
5. ✅ Submit test form and verify data appears

