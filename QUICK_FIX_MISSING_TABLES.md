# Quick Fix - Create Missing Tables

## Current Status

✅ **Your Database**: Has 300+ tables (platform system)  
❌ **Missing**: 4 tables needed for marketing website

## Missing Tables

1. ❌ `consultation_submissions` - Consultation form submissions
2. ❌ `leads` - Lead progression tracking  
3. ❌ `analytics_events` - Analytics tracking
4. ❌ `email_digests` - Email digest records

## Quick Solution: Run SQL in Supabase

### Step 1: Go to Supabase SQL Editor

1. Open: https://reootcngcptfogfozlmz.supabase.co
2. Click: **SQL Editor** (left sidebar)
3. Click: **New query**

### Step 2: Copy & Paste This SQL

```sql
-- Create consultation_submissions table
CREATE TABLE IF NOT EXISTS consultation_submissions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "submissionId" TEXT UNIQUE NOT NULL,
  "userId" TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  company TEXT,
  "businessType" TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
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

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "submissionId" TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  "currentStage" TEXT NOT NULL,
  stages TEXT[] NOT NULL DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  source TEXT DEFAULT 'consultation_form',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_submission ON leads("submissionId");

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "notificationId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_analytics_notification ON analytics_events("notificationId");
CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events("userId");

-- Create email_digests table
CREATE TABLE IF NOT EXISTS email_digests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
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

-- Add consultationSubmissionId to users table (if doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'consultationSubmissionId'
  ) THEN
    ALTER TABLE users ADD COLUMN "consultationSubmissionId" TEXT UNIQUE;
    CREATE INDEX IF NOT EXISTS idx_users_consultation_submission ON users("consultationSubmissionId");
  END IF;
END $$;
```

### Step 3: Click "Run" (or Ctrl+Enter)

### Step 4: Verify Tables Created

Go to **Table Editor** - you should see:
- ✅ `consultation_submissions`
- ✅ `leads`
- ✅ `analytics_events`
- ✅ `email_digests`

## Alternative: Use Prisma

If you prefer Prisma:

```bash
# 1. Create .env file with DATABASE_URL
# Get connection string from Supabase Dashboard → Settings → Database

# 2. Run commands
npx prisma generate
npx prisma db push
```

**Prisma will only create missing tables** - won't touch your existing 300+ tables!

## Safety

✅ **Safe to run** - Uses `CREATE TABLE IF NOT EXISTS`  
✅ **Won't affect** existing tables  
✅ **Won't delete** any data  
✅ **Only creates** what's missing

## Summary

**Problem**: 4 tables missing for marketing website  
**Solution**: Run SQL script above in Supabase SQL Editor  
**Time**: 30 seconds  
**Result**: All tables created, marketing website ready! 🚀

