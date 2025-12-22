# Missing Tables Analysis - Supabase Database

## Current Database Status

Your Supabase database already has **many tables** (300+ tables) for the platform system. However, the **marketing website** needs specific tables that are **missing**.

## Tables That Exist ✅

From your database, these tables already exist:
- ✅ `users` - User accounts
- ✅ `notifications` - Notifications system
- ✅ `notification_preferences` - Notification settings
- ✅ `api_request_logs` - API logging
- ✅ `submissions` - (May be different from consultation_submissions)

## Tables Missing for Marketing Website ❌

These tables need to be created:

1. ❌ **`consultation_submissions`** - Consultation form submissions
2. ❌ **`leads`** - Lead progression tracking
3. ❌ **`analytics_events`** - Analytics tracking
4. ❌ **`email_digests`** - Email digest records

## Solution: Create Only Missing Tables

We need to create these 4 tables without affecting your existing 300+ tables.

### Option 1: Use Prisma (Recommended)

Prisma will only create tables that don't exist, so it's safe to run:

```bash
# 1. Set DATABASE_URL in .env file
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# 2. Generate Prisma Client
npx prisma generate

# 3. Push only missing tables
npx prisma db push
```

**Prisma will**:
- ✅ Create `consultation_submissions` (if doesn't exist)
- ✅ Create `leads` (if doesn't exist)
- ✅ Create `analytics_events` (if doesn't exist)
- ✅ Create `email_digests` (if doesn't exist)
- ✅ Skip all existing tables (won't touch them)

### Option 2: Create Tables Manually via SQL

If you prefer to create them manually, run this SQL in Supabase SQL Editor:

```sql
-- 1. Consultation Submissions Table
CREATE TABLE IF NOT EXISTS consultation_submissions (
  id TEXT PRIMARY KEY,
  "submissionId" TEXT UNIQUE NOT NULL,
  "userId" TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  company TEXT,
  "businessType" TEXT,
  services TEXT[] NOT NULL,
  "primaryService" TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  "preferredContact" TEXT,
  "preferredTime" TEXT,
  message TEXT,
  language TEXT DEFAULT 'en',
  source TEXT DEFAULT 'consultation-form',
  status TEXT DEFAULT 'pending',
  "webhookSent" BOOLEAN DEFAULT false,
  "webhookSentAt" TIMESTAMP,
  notes TEXT,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  referrer TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultation_submission_id ON consultation_submissions("submissionId");
CREATE INDEX IF NOT EXISTS idx_consultation_email ON consultation_submissions(email);
CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_submissions(status);
CREATE INDEX IF NOT EXISTS idx_consultation_created ON consultation_submissions("createdAt");
CREATE INDEX IF NOT EXISTS idx_consultation_webhook ON consultation_submissions("webhookSent");

-- 2. Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  "submissionId" TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  "currentStage" TEXT NOT NULL,
  stages TEXT[] NOT NULL,
  metadata JSONB,
  source TEXT DEFAULT 'consultation_form',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads("currentStage");
CREATE INDEX IF NOT EXISTS idx_leads_submission ON leads("submissionId");
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads("createdAt");

-- 3. Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  "notificationId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_analytics_notification ON analytics_events("notificationId");
CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events("userId");
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events("eventType");
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_events(timestamp);

-- 4. Email Digests Table
CREATE TABLE IF NOT EXISTS email_digests (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  frequency TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  "sentAt" TIMESTAMP,
  "scheduledFor" TIMESTAMP NOT NULL,
  "emailAddress" TEXT NOT NULL,
  subject TEXT,
  "htmlContent" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_digests_user ON email_digests("userId");
CREATE INDEX IF NOT EXISTS idx_email_digests_status ON email_digests(status);
CREATE INDEX IF NOT EXISTS idx_email_digests_scheduled ON email_digests("scheduledFor");
```

## Verify Tables Created

After creating tables, verify in Supabase:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'consultation_submissions',
  'leads',
  'analytics_events',
  'email_digests'
)
ORDER BY table_name;
```

## Important Notes

### Existing Tables Won't Be Affected

- Prisma `db push` only creates **new tables**
- It won't modify or delete existing tables
- Your 300+ platform tables are safe

### Table Name Conflicts

- Your database has `submissions` table
- Marketing website needs `consultation_submissions` (different table)
- Both can coexist

### Users Table

- Your database already has `users` table
- Marketing website schema expects `users` table with `consultationSubmissionId` column
- We may need to add this column to existing `users` table

## Next Steps

1. **Check if `users` table has `consultationSubmissionId` column**
   ```sql
   SELECT column_name 
   FROM information_schema.columns 
   WHERE table_name = 'users' 
   AND column_name = 'consultationSubmissionId';
   ```

2. **If column doesn't exist, add it**:
   ```sql
   ALTER TABLE users 
   ADD COLUMN IF NOT EXISTS "consultationSubmissionId" TEXT UNIQUE;
   
   CREATE INDEX IF NOT EXISTS idx_users_consultation_submission 
   ON users("consultationSubmissionId");
   ```

3. **Create missing tables** (use Prisma or SQL above)

4. **Test consultation form** - should save to database

## Summary

**Existing**: 300+ platform tables ✅  
**Missing**: 4 marketing website tables ❌

**Action**: Create only the 4 missing tables using Prisma or SQL  
**Safe**: Won't affect existing tables

Run `npx prisma db push` - it will only create what's missing! 🚀

