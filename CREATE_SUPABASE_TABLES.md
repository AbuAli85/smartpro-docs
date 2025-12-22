# Create Supabase Tables - Step by Step Guide

## Problem

The tables (`consultation_submissions`, `leads`, `analytics_events`, etc.) don't exist in your Supabase database yet. They need to be created.

## Solution: Run Prisma Migrations

### Step 1: Check Prisma Schema

The schema is already defined in `prisma/schema.prisma`. It includes:
- `User` model
- `ConsultationSubmission` model
- `Lead` model
- `Notification` model
- `AnalyticsEvent` model
- And more...

### Step 2: Verify Database Connection

**Check your `DATABASE_URL` is set correctly**:

```bash
# Check if DATABASE_URL is set
echo $DATABASE_URL

# Or in Windows PowerShell
$env:DATABASE_URL
```

**Format should be**:
```
postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

This generates the Prisma Client based on your schema.

### Step 4: Push Schema to Database

**Option A: Using `db push` (Recommended for development)**

```bash
npx prisma db push
```

This will:
- Create all tables defined in schema
- Create indexes
- Set up relationships
- **Does NOT create migration files** (good for quick setup)

**Option B: Using Migrations (Recommended for production)**

```bash
# Create migration
npx prisma migrate dev --name init

# Or apply existing migrations
npx prisma migrate deploy
```

This will:
- Create migration files
- Apply migrations to database
- Track migration history

### Step 5: Verify Tables Created

**Option A: Using Prisma Studio**

```bash
npx prisma studio
```

Opens browser at `http://localhost:5555` - you can see all tables.

**Option B: Using Supabase Dashboard**

1. Go to: https://reootcngcptfogfozlmz.supabase.co
2. Click: **Table Editor**
3. You should see all tables:
   - `users`
   - `consultation_submissions`
   - `leads`
   - `notifications`
   - `analytics_events`
   - etc.

**Option C: Using SQL Query**

In Supabase Dashboard → SQL Editor:

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

## Troubleshooting

### Error: "Can't reach database server"

**Check**:
1. `DATABASE_URL` is correct
2. Supabase project is active
3. Password in connection string is correct
4. Network/firewall allows connection

**Fix**: Get fresh connection string from Supabase Dashboard → Settings → Database

### Error: "Authentication failed"

**Check**:
1. Password in `DATABASE_URL` is correct
2. Database user has permissions

**Fix**: 
1. Go to Supabase Dashboard → Settings → Database
2. Reset database password if needed
3. Update `DATABASE_URL` with new password

### Error: "Table already exists"

**If tables partially exist**:
```bash
# Reset database (WARNING: Deletes all data!)
npx prisma migrate reset

# Or drop specific table in Supabase SQL Editor
DROP TABLE IF EXISTS consultation_submissions CASCADE;
```

### Error: "Connection pooling not available"

**Use direct connection** (port 5432 instead of 6543):

```env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@db.reootcngcptfogfozlmz.supabase.co:5432/postgres"
```

## Quick Commands Reference

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Push schema to database (creates tables)
npx prisma db push

# 3. View database in browser
npx prisma studio

# 4. Check connection
npx prisma db pull

# 5. Create migration (alternative to db push)
npx prisma migrate dev --name init
```

## Expected Tables After Migration

After running `npx prisma db push`, you should have:

1. ✅ `users` - User accounts
2. ✅ `consultation_submissions` - Consultation form submissions
3. ✅ `leads` - Lead progression tracking
4. ✅ `notifications` - In-app notifications
5. ✅ `notification_preferences` - User notification settings
6. ✅ `analytics_events` - Analytics tracking
7. ✅ `email_digests` - Email digest records
8. ✅ `api_request_logs` - API request logging

## Verify Tables Are Created

### Check in Supabase Dashboard

1. Go to: https://reootcngcptfogfozlmz.supabase.co
2. Click: **Table Editor** (left sidebar)
3. You should see all tables listed
4. Click on a table to see its structure

### Check via SQL

In Supabase Dashboard → SQL Editor:

```sql
-- Count tables
SELECT COUNT(*) as table_count
FROM information_schema.tables 
WHERE table_schema = 'public';

-- List all tables
SELECT table_name, 
       (SELECT COUNT(*) 
        FROM information_schema.columns 
        WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_name;
```

## Next Steps After Tables Are Created

1. ✅ Test consultation form submission
2. ✅ Verify data is saved in `consultation_submissions`
3. ✅ Test lead tracking
4. ✅ Verify `leads` table updates
5. ✅ Test platform connection
6. ✅ Verify platform can read consultations

## Summary

**Problem**: Tables don't exist in Supabase  
**Solution**: Run `npx prisma db push`  
**Result**: All tables created from `prisma/schema.prisma`

**Quick Fix**:
```bash
npx prisma generate
npx prisma db push
npx prisma studio  # Verify tables exist
```

That's it! Your tables will be created. 🚀

