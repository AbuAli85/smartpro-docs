# Create Missing Tables - SQL Script

## Quick SQL Script for Supabase

Copy and paste this SQL into **Supabase SQL Editor** to create the 4 missing tables:

```sql
-- ============================================
-- Create Missing Tables for Marketing Website
-- ============================================

-- 1. Consultation Submissions Table
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

-- Indexes for consultation_submissions
CREATE INDEX IF NOT EXISTS idx_consultation_submission_id ON consultation_submissions("submissionId");
CREATE INDEX IF NOT EXISTS idx_consultation_email ON consultation_submissions(email);
CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_submissions(status);
CREATE INDEX IF NOT EXISTS idx_consultation_created ON consultation_submissions("createdAt");
CREATE INDEX IF NOT EXISTS idx_consultation_webhook ON consultation_submissions("webhookSent");

-- 2. Leads Table
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

-- Indexes for leads
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads("currentStage");
CREATE INDEX IF NOT EXISTS idx_leads_submission ON leads("submissionId");
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads("createdAt");

-- 3. Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "notificationId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Indexes for analytics_events
CREATE INDEX IF NOT EXISTS idx_analytics_notification ON analytics_events("notificationId");
CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events("userId");
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events("eventType");
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_events(timestamp);

-- 4. Email Digests Table
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

-- Indexes for email_digests
CREATE INDEX IF NOT EXISTS idx_email_digests_user ON email_digests("userId");
CREATE INDEX IF NOT EXISTS idx_email_digests_status ON email_digests(status);
CREATE INDEX IF NOT EXISTS idx_email_digests_scheduled ON email_digests("scheduledFor");

-- 5. Add consultationSubmissionId to users table (if doesn't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'consultationSubmissionId'
  ) THEN
    ALTER TABLE users 
    ADD COLUMN "consultationSubmissionId" TEXT UNIQUE;
    
    CREATE INDEX IF NOT EXISTS idx_users_consultation_submission 
    ON users("consultationSubmissionId");
  END IF;
END $$;

-- ============================================
-- Verify Tables Created
-- ============================================
SELECT 
  table_name,
  (SELECT COUNT(*) 
   FROM information_schema.columns 
   WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN (
  'consultation_submissions',
  'leads',
  'analytics_events',
  'email_digests'
)
ORDER BY table_name;
```

## How to Run

1. **Go to Supabase Dashboard**
   - URL: https://reootcngcptfogfozlmz.supabase.co
   - Click: **SQL Editor** (left sidebar)

2. **Paste the SQL script above**

3. **Click "Run"** (or press Ctrl+Enter)

4. **Verify tables created**
   - Go to: **Table Editor**
   - You should see the 4 new tables

## Expected Result

After running, you should see:
- ✅ `consultation_submissions` table created
- ✅ `leads` table created
- ✅ `analytics_events` table created
- ✅ `email_digests` table created
- ✅ `users.consultationSubmissionId` column added (if didn't exist)

## Alternative: Use Prisma

If you prefer Prisma:

```bash
# 1. Set DATABASE_URL in .env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# 2. Generate and push
npx prisma generate
npx prisma db push
```

**Both methods are safe** - they won't affect your existing 300+ tables! ✅

