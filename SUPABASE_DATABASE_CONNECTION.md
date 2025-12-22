# Supabase Database Connection - Marketing Website & Platform

## Overview

**Database**: Supabase PostgreSQL  
**Project URL**: `https://reootcngcptfogfozlmz.supabase.co`  
**Used By**: 
- ✅ Marketing Website (smartpro-docs.vercel.app) - **Already Configured**
- Platform (marketing.thedigitalmorph.com) - Needs connection
- Other systems

**Connection**: Both systems connect to the **same Supabase database**

## Database Architecture

```
┌─────────────────────────────────────────────────────────┐
│              SUPABASE DATABASE                          │
│         (PostgreSQL - Cloud Hosted)                     │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Shared Tables                                    │  │
│  │                                                   │  │
│  │  • consultation_submissions                       │  │
│  │  • users                                          │  │
│  │  • leads                                          │  │
│  │  • notifications                                  │  │
│  │  • notification_preferences                      │  │
│  │  • analytics_events                              │  │
│  │  • email_digests                                  │  │
│  │  • api_request_logs                               │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
         ▲                          ▲
         │                          │
         │                          │
    ┌────┴─────┐            ┌──────┴──────┐
    │           │            │             │
    │           │            │             │
┌───┴──────────┴───┐  ┌──────┴──────────────┴──────┐
│  MARKETING SITE  │  │      PLATFORM              │
│                  │  │                            │
│  smartpro-docs   │  │  marketing.thedigitalmorph │
│  .vercel.app     │  │  .com                       │
│                  │  │                            │
│  Uses:           │  │  Uses:                     │
│  - Consultation  │  │  - User accounts            │
│    submissions   │  │  - Service bookings         │
│  - Lead tracking │  │  - Provider profiles       │
│  - Analytics     │  │  - Client profiles          │
└──────────────────┘  └────────────────────────────┘
```

## Connection Configuration

### Marketing Website Connection ✅ (Already Configured)

**Environment Variable** (Vercel):
```env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Project Reference**: `reootcngcptfogfozlmz`  
**Status**: ✅ Already connected and working

**Prisma Configuration**:
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // ← Supabase connection string
}
```

**Connection Code**:
```typescript
// server/routes/consultationRoutes.ts
let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient({
    // Uses DATABASE_URL from environment (Supabase)
  });
} catch (error) {
  logger.warn('Prisma client not available');
}
```

### Platform Connection (To Be Configured)

**Platform should use same Supabase database**:

**Environment Variable** (Platform):
```env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Or use Supabase Client** (if platform uses Supabase SDK):
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://reootcngcptfogfozlmz.supabase.co',
  '[ANON-KEY]'  // Get from Supabase Dashboard → Settings → API
);
```

**To Get Connection Details**:
1. Go to: https://reootcngcptfogfozlmz.supabase.co
2. Settings → Database → Connection string
3. Or Settings → API → Project URL and API keys

**Or use Supabase Client** (if platform uses Supabase SDK):
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://[PROJECT-REF].supabase.co',
  '[ANON-KEY]'
);
```

## Shared Database Tables

### Tables Used by Marketing Website

1. **consultation_submissions**
   - Stores consultation form submissions
   - Created by marketing website
   - Read by platform

2. **leads**
   - Tracks lead progression
   - Updated by both systems
   - Marketing: consultation_submitted, consultation_viewed
   - Platform: registration_completed, profile_completed, first_service_booked

3. **analytics_events**
   - Tracks user behavior
   - Created by marketing website

4. **api_request_logs**
   - Logs API requests
   - Created by marketing website

### Tables Used by Platform

1. **users**
   - User accounts (clients, providers, admins)
   - Created by platform
   - Linked to consultations via `consultationSubmissionId`

2. **notifications**
   - In-app notifications
   - Created by both systems

3. **notification_preferences**
   - User notification settings
   - Created by platform

### Tables Used by Both

1. **users** (with `consultationSubmissionId`)
   - Platform creates user
   - Marketing website links consultation
   - Both can read/write

2. **leads**
   - Marketing website: Creates and tracks early stages
   - Platform: Updates later stages
   - Both read progress

3. **consultation_submissions**
   - Marketing website: Creates
   - Platform: Reads and links to users

## How They Share Data

### 1. Consultation Submission Flow

```
Marketing Website:
  ↓
User submits consultation form
  ↓
POST /api/consultation
  ↓
Prisma → Supabase Database
  ↓
INSERT INTO consultation_submissions
  ↓
Returns submissionId
  ↓
Platform:
  ↓
User registers with submissionId
  ↓
Platform queries Supabase
  ↓
SELECT * FROM consultation_submissions 
WHERE submissionId = 'sub_123'
  ↓
Links to user account
  ↓
UPDATE users 
SET consultationSubmissionId = 'sub_123'
WHERE id = 'user_123'
```

### 2. Lead Tracking Flow

```
Marketing Website:
  ↓
Tracks: consultation_submitted (17%)
  ↓
INSERT INTO leads (submissionId, stage, progress)
  ↓
Platform:
  ↓
Tracks: registration_completed (67%)
  ↓
UPDATE leads 
SET currentStage = 'registration_completed', 
    progress = 67
WHERE submissionId = 'sub_123'
  ↓
Both can read:
  ↓
SELECT * FROM leads WHERE submissionId = 'sub_123'
```

### 3. User-Consultation Linking

```
Platform:
  ↓
User registers
  ↓
INSERT INTO users (id, email, consultationSubmissionId)
  ↓
Marketing Website:
  ↓
Can query linked consultation:
  ↓
SELECT cs.* 
FROM consultation_submissions cs
JOIN users u ON u.consultationSubmissionId = cs.submissionId
WHERE u.id = 'user_123'
```

## Supabase Connection Details

### Getting Connection String

1. **Go to Supabase Dashboard**
   - https://reootcngcptfogfozlmz.supabase.co
   - Or https://supabase.com/dashboard → Select project `reootcngcptfogfozlmz`

2. **Settings → Database**
   - Copy "Connection string" (use connection pooling)
   - Format: `postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true`
   - **Note**: Marketing website already has this configured

3. **Settings → API** (For Supabase SDK)
   - Project URL: `https://reootcngcptfogfozlmz.supabase.co`
   - Copy `anon` key (for client-side)
   - Copy `service_role` key (for server-side - keep secret!)

### Environment Variables Setup

**Marketing Website (Vercel)** ✅ Already Configured:
```env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```
- ✅ Already set in Vercel environment variables
- ✅ Marketing website is connected and working

**Platform** (if using Prisma):
```env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```
- ⚠️ **Needs to be set** in platform environment variables
- Use same connection string as marketing website
- Get password from Supabase Dashboard → Settings → Database

**Platform** (if using Supabase SDK):
```env
SUPABASE_URL="https://reootcngcptfogfozlmz.supabase.co"
SUPABASE_ANON_KEY="[ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[SERVICE-ROLE-KEY]"
```
- Get keys from: Supabase Dashboard → Settings → API

## Database Schema (Shared)

### Key Relationships

```sql
-- Users can have linked consultations
users.consultationSubmissionId → consultation_submissions.submissionId

-- Leads track progression
leads.submissionId → consultation_submissions.submissionId

-- Notifications for users
notifications.userId → users.id

-- Analytics events
analytics_events.userId → users.id
analytics_events.notificationId → notifications.id
```

### Important Indexes

```sql
-- For fast consultation lookups
CREATE INDEX idx_consultation_submission_id 
ON consultation_submissions(submissionId);

-- For user-consultation linking
CREATE INDEX idx_users_consultation_submission 
ON users(consultationSubmissionId);

-- For lead tracking
CREATE INDEX idx_leads_submission_id 
ON leads(submissionId);

-- For email lookups
CREATE INDEX idx_consultation_email 
ON consultation_submissions(email);
```

## Security & Access Control

### Row Level Security (RLS)

Supabase supports Row Level Security for fine-grained access:

```sql
-- Example: Users can only see their own consultations
CREATE POLICY "Users can view own consultations"
ON consultation_submissions
FOR SELECT
USING (
  submissionId IN (
    SELECT consultationSubmissionId 
    FROM users 
    WHERE id = auth.uid()
  )
);
```

### API Keys

**Marketing Website**:
- Uses `DATABASE_URL` (direct connection)
- Or Supabase service role key for admin operations

**Platform**:
- Uses Supabase anon key for client-side
- Uses service role key for server-side
- Or `DATABASE_URL` for Prisma

## Benefits of Shared Supabase Database

### 1. **Single Source of Truth**
- All data in one place
- No data synchronization needed
- Consistent data across systems

### 2. **Real-time Updates**
- Supabase Realtime for live updates
- Both systems see changes immediately
- WebSocket support for notifications

### 3. **Easy Linking**
- Direct database relationships
- Foreign keys work across systems
- Simple JOIN queries

### 4. **Unified Analytics**
- All events in one database
- Cross-system reporting
- Complete user journey tracking

### 5. **Cost Effective**
- One database instead of multiple
- Shared connection pooling
- Better resource utilization

## Migration & Setup

### Initial Setup

1. **Create Supabase Project**
   ```bash
   # Already done - you have Supabase project
   ```

2. **Run Prisma Migrations**
   ```bash
   # From marketing website project
   npx prisma migrate dev
   # or
   npx prisma db push
   ```

3. **Set Environment Variables**
   ```env
   # Marketing Website (Vercel)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   
   # Platform (if using Prisma)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

### Platform Integration

**If Platform Uses Prisma**:
- Use same `DATABASE_URL`
- Share same Prisma schema
- Or import schema from marketing website

**If Platform Uses Supabase SDK**:
- Use Supabase client
- Can still access same tables
- Use SQL queries or Supabase client methods

## Monitoring & Management

### Supabase Dashboard

- **Table Editor**: View/edit data
- **SQL Editor**: Run queries
- **Database**: View schema, indexes
- **Logs**: Monitor queries
- **API**: View API usage

### Prisma Studio

```bash
# View database in browser
npx prisma studio

# Opens at http://localhost:5555
# View all tables, edit data
```

## Summary

**Database**: Supabase PostgreSQL (shared)  
**Project URL**: `https://reootcngcptfogfozlmz.supabase.co`

**Marketing Website**: ✅ **Already Configured**
- Connects via Prisma using `DATABASE_URL`
- Creates consultations, tracks leads
- Links consultations to users
- **Status**: Working and connected

**Platform**: ⚠️ **Needs Configuration**
- Should connect to same Supabase database
- Use same `DATABASE_URL` or Supabase SDK
- Creates users, tracks registration
- Links users to consultations
- **See**: `PLATFORM_SUPABASE_CONNECTION_SETUP.md` for setup instructions

**Connection**: Both use same Supabase project (`reootcngcptfogfozlmz`)

**Benefits**: Single source of truth, real-time updates, easy linking, unified analytics

The Supabase database at `reootcngcptfogfozlmz.supabase.co` is the **central hub** that connects both systems! 🗄️

