# Create Tables in Supabase - Run This Now!

## Problem

The tables (`consultation_submissions`, `leads`, `analytics_events`, etc.) don't exist in your Supabase database yet.

## Solution: Run Prisma Migration

### Step 1: Make Sure You're in Project Root

```bash
# You should be in: C:\Users\HP\Documents\GitHub\smartpro-docs
cd C:\Users\HP\Documents\GitHub\smartpro-docs
```

### Step 2: Verify DATABASE_URL is Set

**Check your `.env` file** or **Vercel Environment Variables**:

```env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**If not set**, get it from:
- Supabase Dashboard → Settings → Database → Connection string

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Push Schema to Database (Creates Tables)

```bash
npx prisma db push
```

This will:
- ✅ Create all tables from `prisma/schema.prisma`
- ✅ Create indexes
- ✅ Set up relationships
- ✅ Connect to your Supabase database

### Step 5: Verify Tables Created

**Option A: Using Prisma Studio**
```bash
npx prisma studio
```
Opens browser - you can see all tables.

**Option B: Using Supabase Dashboard**
1. Go to: https://reootcngcptfogfozlmz.supabase.co
2. Click: **Table Editor**
3. You should see:
   - `users`
   - `consultation_submissions`
   - `leads`
   - `notifications`
   - `analytics_events`
   - `email_digests`
   - `api_request_logs`
   - `notification_preferences`

## Quick Commands (Copy & Paste)

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Create tables in Supabase
npx prisma db push

# 3. View tables (optional)
npx prisma studio
```

## Expected Output

When you run `npx prisma db push`, you should see:

```
✔ Generated Prisma Client
✔ Pushed schema to database

The following changes have been applied:

  • Created table `users`
  • Created table `consultation_submissions`
  • Created table `leads`
  • Created table `notifications`
  • Created table `analytics_events`
  • Created table `email_digests`
  • Created table `api_request_logs`
  • Created table `notification_preferences`
```

## Troubleshooting

### Error: "Can't reach database server"
- Check `DATABASE_URL` is correct
- Verify Supabase project is active
- Get fresh connection string from Supabase Dashboard

### Error: "Authentication failed"
- Check password in `DATABASE_URL`
- Reset database password in Supabase if needed

### Error: "Table already exists"
- Some tables might already exist
- Prisma will skip existing tables
- Or drop and recreate: `npx prisma migrate reset` (⚠️ deletes data!)

## After Tables Are Created

1. ✅ Test consultation form - should save to database
2. ✅ Check Supabase Table Editor - see data
3. ✅ Test lead tracking - should create lead entries
4. ✅ Verify platform can connect - same database

## Summary

**Run these commands**:
```bash
npx prisma generate
npx prisma db push
```

**That's it!** Your tables will be created in Supabase. 🚀

