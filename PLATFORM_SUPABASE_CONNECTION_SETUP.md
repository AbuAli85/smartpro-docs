# Platform Supabase Connection Setup

## Current Status

✅ **Marketing Website**: Already connected to Supabase  
🔗 **Supabase Project**: `https://reootcngcptfogfozlmz.supabase.co`  
⚠️ **Platform**: Needs to connect to same Supabase database

## Quick Setup for Platform

### Step 1: Get Supabase Credentials

1. **Go to Supabase Dashboard**
   - URL: https://reootcngcptfogfozlmz.supabase.co
   - Or: https://supabase.com/dashboard → Select project

2. **Get Connection String**
   - Go to: **Settings → Database**
   - Copy **Connection string** (use connection pooling)
   - Format: `postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true`

3. **Get API Keys** (if using Supabase SDK)
   - Go to: **Settings → API**
   - Copy:
     - **Project URL**: `https://reootcngcptfogfozlmz.supabase.co`
     - **anon key**: (for client-side)
     - **service_role key**: (for server-side - keep secret!)

### Step 2: Configure Platform

#### Option A: Using Prisma (Same as Marketing Website)

**Set Environment Variable**:
```env
DATABASE_URL="postgresql://postgres.reootcngcptfogfozlmz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Initialize Prisma**:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // Uses DATABASE_URL from environment
});
```

**Use Same Schema**:
- Copy `prisma/schema.prisma` from marketing website
- Or import schema to share tables

#### Option B: Using Supabase SDK

**Set Environment Variables**:
```env
SUPABASE_URL="https://reootcngcptfogfozlmz.supabase.co"
SUPABASE_ANON_KEY="[ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[SERVICE-ROLE-KEY]"
```

**Initialize Supabase Client**:
```typescript
import { createClient } from '@supabase/supabase-js';

// Client-side (uses anon key)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Server-side (uses service_role key)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

### Step 3: Test Connection

**Test Prisma Connection**:
```typescript
// Test query
const consultations = await prisma.consultationSubmission.findMany({
  take: 5
});
console.log('Connected! Found', consultations.length, 'consultations');
```

**Test Supabase Connection**:
```typescript
// Test query
const { data, error } = await supabase
  .from('consultation_submissions')
  .select('*')
  .limit(5);

if (error) {
  console.error('Connection error:', error);
} else {
  console.log('Connected! Found', data.length, 'consultations');
}
```

## Shared Tables Available

Once connected, platform can access:

### Tables Created by Marketing Website

1. **consultation_submissions**
   - All consultation form submissions
   - Fields: id, submissionId, name, email, services, etc.

2. **leads**
   - Lead progression tracking
   - Fields: id, submissionId, email, currentStage, progress, etc.

3. **analytics_events**
   - User behavior tracking
   - Fields: id, userId, eventType, timestamp, etc.

4. **api_request_logs**
   - API request logging
   - Fields: id, method, path, timestamp, etc.

### Tables Platform Should Create/Use

1. **users**
   - User accounts (if not exists)
   - Link via `consultationSubmissionId`

2. **notifications**
   - In-app notifications
   - Already exists (shared)

3. **notification_preferences**
   - User notification settings
   - Already exists (shared)

## Linking Consultations to Users

### When User Registers on Platform

```typescript
// After successful registration
async function linkConsultationToUser(userId: string, submissionId: string) {
  // Option 1: Using Prisma
  await prisma.user.update({
    where: { id: userId },
    data: { consultationSubmissionId: submissionId }
  });

  // Option 2: Using Supabase
  await supabaseAdmin
    .from('users')
    .update({ consultationSubmissionId: submissionId })
    .eq('id', userId);
}
```

### Query Linked Consultation

```typescript
// Get user's consultation
async function getUserConsultation(userId: string) {
  // Option 1: Using Prisma
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      linkedConsultation: true  // If relation exists
    }
  });

  // Option 2: Using Supabase
  const { data: user } = await supabase
    .from('users')
    .select(`
      *,
      consultation:consultation_submissions!inner(
        *
      )
    `)
    .eq('id', userId)
    .eq('consultation_submissions.submissionId', 'consultationSubmissionId')
    .single();
}
```

## Security Considerations

### Row Level Security (RLS)

Supabase supports RLS for fine-grained access control:

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

- **anon key**: Safe for client-side, respects RLS
- **service_role key**: Bypasses RLS, use only server-side
- **Never expose service_role key** in client code

## Verification Checklist

- [ ] Platform has `DATABASE_URL` or Supabase credentials set
- [ ] Can query `consultation_submissions` table
- [ ] Can query `leads` table
- [ ] Can update `users` table with `consultationSubmissionId`
- [ ] Can read linked consultations for users
- [ ] Connection pooling enabled (port 6543)
- [ ] RLS policies configured (if needed)

## Troubleshooting

### Connection Issues

**Error**: "Can't reach database server"
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Verify network/firewall settings

**Error**: "Authentication failed"
- Check password in connection string
- Verify database user permissions
- Regenerate password if needed

**Error**: "Table does not exist"
- Run Prisma migrations: `npx prisma migrate dev`
- Or verify tables exist in Supabase Dashboard → Table Editor

### Check Connection

**Using Prisma Studio**:
```bash
npx prisma studio
# Opens at http://localhost:5555
```

**Using Supabase Dashboard**:
- Go to: https://reootcngcptfogfozlmz.supabase.co
- Table Editor → View all tables
- SQL Editor → Run test queries

## Summary

**Marketing Website**: ✅ Already connected to Supabase  
**Platform**: ⚠️ Needs to connect using same credentials

**To Connect Platform**:
1. Get connection string from Supabase Dashboard
2. Set `DATABASE_URL` in platform environment
3. Use Prisma (same as marketing) or Supabase SDK
4. Test connection
5. Start linking consultations to users!

**Same Database = Seamless Integration!** 🔗

