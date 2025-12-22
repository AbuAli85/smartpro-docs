# Setup DATABASE_URL and Create Tables in Supabase

## Problem

1. ❌ `DATABASE_URL` environment variable is not set
2. ❌ Tables don't exist in Supabase database

## Solution: Step by Step

### Step 1: Get Supabase Connection String

1. **Go to Supabase Dashboard**
   - URL: https://reootcngcptfogfozlmz.supabase.co
   - Or: https://supabase.com/dashboard → Select your project

2. **Get Connection String**
   - Go to: **Settings → Database**
   - Scroll to **Connection string**
   - Select **Connection pooling** (recommended for serverless)
   - Copy the connection string
   - Format: `postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true`

### Step 2: Set DATABASE_URL

**Option A: Create `.env` file (Local Development)**

1. Create `.env` file in project root:
   ```
   C:\Users\HP\Documents\GitHub\smartpro-docs\.env
   ```

2. Add this line:
   ```env
   DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
   
   **Replace**:
   - `[YOUR-PASSWORD]` with your actual Supabase database password
   - `[REGION]` with your region (e.g., `us-east-1`)

**Option B: Set in Vercel (Production)**

1. Go to Vercel Dashboard
2. Select your project
3. Go to: **Settings → Environment Variables**
4. Add:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Supabase connection string
   - **Environment**: Production, Preview, Development (select all)

### Step 3: Run Prisma Commands

**Open terminal in project root**:
```bash
cd C:\Users\HP\Documents\GitHub\smartpro-docs
```

**Run these commands**:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Create tables in Supabase
npx prisma db push
```

### Step 4: Verify Tables Created

**Option A: Using Prisma Studio**
```bash
npx prisma studio
```
Opens browser at `http://localhost:5555` - you can see all tables.

**Option B: Using Supabase Dashboard**
1. Go to: https://reootcngcptfogfozlmz.supabase.co
2. Click: **Table Editor** (left sidebar)
3. You should see all tables:
   - ✅ `users`
   - ✅ `consultation_submissions`
   - ✅ `leads`
   - ✅ `notifications`
   - ✅ `analytics_events`
   - ✅ `email_digests`
   - ✅ `api_request_logs`
   - ✅ `notification_preferences`

## Quick Setup (Copy & Paste)

### 1. Get Connection String from Supabase

Go to: https://reootcngcptfogfozlmz.supabase.co → Settings → Database → Copy connection string

### 2. Create `.env` file

Create file: `.env` in project root

Add:
```env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### 3. Run Commands

```bash
npx prisma generate
npx prisma db push
```

### 4. Verify

```bash
npx prisma studio
```

## Expected Output

When `npx prisma db push` succeeds, you'll see:

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

### Error: "Environment variable not found: DATABASE_URL"

**Solution**: 
- Create `.env` file in project root
- Add `DATABASE_URL="..."` with your Supabase connection string
- Make sure `.env` is in the same directory as `prisma/schema.prisma`

### Error: "Can't reach database server"

**Check**:
- Connection string is correct
- Password is correct
- Supabase project is active
- Network/firewall allows connection

**Fix**: Get fresh connection string from Supabase Dashboard

### Error: "Authentication failed"

**Check**:
- Password in connection string is correct
- Database user has permissions

**Fix**: 
- Reset database password in Supabase Dashboard
- Update `DATABASE_URL` with new password

### Error: "Table already exists"

**If some tables exist**:
- Prisma will skip existing tables
- Only new tables will be created

**If you want to recreate**:
```bash
# WARNING: This deletes all data!
npx prisma migrate reset
npx prisma db push
```

## After Tables Are Created

1. ✅ Test consultation form submission
2. ✅ Check data appears in Supabase Table Editor
3. ✅ Verify lead tracking works
4. ✅ Test platform connection

## Summary

**Steps**:
1. Get Supabase connection string
2. Create `.env` file with `DATABASE_URL`
3. Run: `npx prisma generate`
4. Run: `npx prisma db push`
5. Verify tables in Supabase Dashboard

**That's it!** Your tables will be created. 🚀

