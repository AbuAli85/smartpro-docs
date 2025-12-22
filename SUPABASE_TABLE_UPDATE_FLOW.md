# How Supabase Tables Are Updated After Submission

## Complete Flow: Form Submission → Database Update

### Step 1: Form Submission (Initial Create)

When a user submits the consultation form:

**Table**: `consultation_submissions`

**Action**: `CREATE` new record

**Fields Created**:
```typescript
{
  submissionId: "sub_1766411774397",  // Unique ID
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  location: "Dubai, UAE",
  company: "Example Corp",
  businessType: "LLC",
  services: ["company-setup", "accounting"],
  primaryService: "company-setup",
  budget: "5000-10000",
  timeline: "1-3 months",
  preferredContact: "email",
  preferredTime: "morning",
  message: "Looking for business setup services",
  language: "en",
  source: "consultation-form",
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  referrer: "https://smartpro-docs.vercel.app",
  status: "pending",           // Default status
  webhookSent: false,          // Default: not sent yet
  webhookSentAt: null,         // Will be updated after webhook
  createdAt: "2025-01-22T10:30:00Z",
  updatedAt: "2025-01-22T10:30:00Z"
}
```

**Code Location**: `server/routes/consultationRoutes.ts` (lines 120-142)

---

### Step 2: Lead Entry Created (Automatic)

**Table**: `leads`

**Action**: `CREATE` new record

**Fields Created**:
```typescript
{
  submissionId: "sub_1766411774397",
  email: "john@example.com",
  currentStage: "consultation_submitted",
  stages: ["consultation_submitted"],
  metadata: {
    name: "John Doe",
    services: ["company-setup", "accounting"],
    language: "en",
    submittedAt: "2025-01-22T10:30:00Z"
  },
  source: "consultation_form",
  createdAt: "2025-01-22T10:30:00Z",
  updatedAt: "2025-01-22T10:30:00Z"
}
```

**Code Location**: `server/routes/consultationRoutes.ts` (lines 148-162)

---

### Step 3: Webhook Sent to Make.com

**Action**: POST request to Make.com webhook URL

**Payload Sent**:
```json
{
  "form_type": "consultation",
  "client_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "business_name": "Example Corp",
  "services": ["Company Setup", "Accounting"],
  "submission_id": "sub_1766411774397",
  "is_duplicate": false,
  ...
}
```

**Code Location**: `server/routes/consultationRoutes.ts` (line 353)

---

### Step 4: Database Update After Webhook

**Table**: `consultation_submissions`

**Action**: `UPDATE` existing record

**Fields Updated**:
```typescript
{
  webhookSent: true,                    // ✅ Updated: true if webhook succeeded
  webhookSentAt: "2025-01-22T10:30:05Z", // ✅ Updated: timestamp when webhook sent
  status: "contacted",                  // ✅ Updated: "contacted" if success, "pending" if failed
  updatedAt: "2025-01-22T10:30:05Z"     // ✅ Auto-updated: current timestamp
}
```

**Code Location**: `server/routes/consultationRoutes.ts` (lines 366-373)

---

## Complete Update Flow Diagram

```
Form Submission
    ↓
[1] CREATE consultation_submissions
    ├─ submissionId
    ├─ name, email, phone, etc.
    ├─ status: "pending"
    └─ webhookSent: false
    ↓
[2] CREATE leads
    ├─ submissionId
    ├─ currentStage: "consultation_submitted"
    └─ stages: ["consultation_submitted"]
    ↓
[3] SEND webhook to Make.com
    ├─ POST to Make.com webhook URL
    └─ Wait for response
    ↓
[4] UPDATE consultation_submissions
    ├─ webhookSent: true/false
    ├─ webhookSentAt: timestamp
    └─ status: "contacted" or "pending"
```

---

## How to Verify Updates in Supabase

### 1. Check Consultation Submission

**SQL Query** (with quoted column names for PostgreSQL):
```sql
SELECT 
  "submissionId",
  "name",
  "email",
  "status",
  "webhookSent",
  "webhookSentAt",
  "createdAt",
  "updatedAt"
FROM consultation_submissions
WHERE "submissionId" = 'sub_1766411774397';
```

**Note**: PostgreSQL requires double quotes around camelCase column names. If your columns use snake_case, use: `submission_id`, `webhook_sent`, `webhook_sent_at`, `created_at`, `updated_at`

**Expected Result**:
```
submissionId          | name      | email            | status   | webhookSent | webhookSentAt          | createdAt              | updatedAt
---------------------|-----------|------------------|----------|-------------|------------------------|------------------------|------------------------
sub_1766411774397    | John Doe  | john@example.com | contacted| true        | 2025-01-22 10:30:05    | 2025-01-22 10:30:00    | 2025-01-22 10:30:05
```

### 2. Check Lead Entry

**SQL Query** (with quoted column names for PostgreSQL):
```sql
SELECT 
  "submissionId",
  "email",
  "currentStage",
  "stages",
  "createdAt",
  "updatedAt"
FROM leads
WHERE "submissionId" = 'sub_1766411774397';
```

**Note**: PostgreSQL requires double quotes around camelCase column names. If your columns use snake_case, use: `submission_id`, `current_stage`, `created_at`, `updated_at`

**Expected Result**:
```
submissionId          | email            | currentStage            | stages                          | createdAt              | updatedAt
---------------------|------------------|-------------------------|---------------------------------|------------------------|------------------------
sub_1766411774397    | john@example.com | consultation_submitted  | ["consultation_submitted"]      | 2025-01-22 10:30:00    | 2025-01-22 10:30:00
```

### 3. Check All Recent Submissions

**SQL Query** (with quoted column names for PostgreSQL):
```sql
SELECT 
  "submissionId",
  "name",
  "email",
  "status",
  "webhookSent",
  "webhookSentAt",
  "createdAt"
FROM consultation_submissions
ORDER BY "createdAt" DESC
LIMIT 10;
```

**Note**: PostgreSQL requires double quotes around camelCase column names.

### 4. Check Failed Webhooks

**SQL Query** (with quoted column names for PostgreSQL):
```sql
SELECT 
  "submissionId",
  "name",
  "email",
  "status",
  "webhookSent",
  "webhookSentAt",
  "createdAt"
FROM consultation_submissions
WHERE "webhookSent" = false
  AND "createdAt" > NOW() - INTERVAL '24 hours'
ORDER BY "createdAt" DESC;
```

**Note**: PostgreSQL requires double quotes around camelCase column names.

---

## Update Status Values

### `status` Field Values:
- `"pending"` - Initial status, webhook not sent yet or failed
- `"contacted"` - Webhook sent successfully to Make.com
- `"completed"` - (Future: when consultation is completed)
- `"cancelled"` - (Future: if consultation is cancelled)

### `webhookSent` Field:
- `true` - Webhook was sent successfully
- `false` - Webhook not sent or failed

### `webhookSentAt` Field:
- `null` - Webhook not sent yet
- `timestamp` - When webhook was successfully sent

---

## Troubleshooting

### Issue: `webhookSent` is `false`

**Possible Causes**:
1. Webhook URL not configured (`MAKE_WEBHOOK_URL` missing)
2. Make.com webhook failed
3. Network error
4. Timeout (30 seconds)

**Check** (with quoted column names):
```sql
SELECT "submissionId", "status", "webhookSent", "webhookSentAt"
FROM consultation_submissions
WHERE "webhookSent" = false
ORDER BY "createdAt" DESC;
```

**Fix**:
- Check server logs for webhook errors
- Verify `MAKE_WEBHOOK_URL` environment variable
- Check Make.com scenario is active

### Issue: Data not in database

**Possible Causes**:
1. Database connection failed
2. Prisma client not initialized
3. Table doesn't exist

**Check**:
```sql
-- Verify table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'consultation_submissions';

-- Check if any data exists
SELECT COUNT(*) FROM consultation_submissions;
```

**Fix**:
- Verify `DATABASE_URL` is set correctly
- Run Prisma migrations: `npx prisma db push`
- Check server logs for database errors

### Issue: Lead not created

**Possible Causes**:
1. Duplicate submission (lead already exists)
2. Database error

**Check** (with quoted column names):
```sql
SELECT * FROM leads 
WHERE "submissionId" = 'sub_1766411774397';
```

**Fix**:
- Check server logs for lead creation errors
- Verify `leads` table exists
- Check for unique constraint violations

---

## Manual Update (If Needed)

### Update Webhook Status Manually

```sql
UPDATE consultation_submissions
SET 
  "webhookSent" = true,
  "webhookSentAt" = NOW(),
  "status" = 'contacted',
  "updatedAt" = NOW()
WHERE "submissionId" = 'sub_1766411774397';
```

### Update Lead Stage

```sql
UPDATE leads
SET 
  "currentStage" = 'consultation_viewed',
  "stages" = array_append("stages", 'consultation_viewed'),
  "updatedAt" = NOW()
WHERE "submissionId" = 'sub_1766411774397';
```

---

## Summary

**After Form Submission**:

1. ✅ **consultation_submissions** table:
   - Creates new record with all form data
   - Updates `webhookSent`, `webhookSentAt`, `status` after webhook

2. ✅ **leads** table:
   - Creates new record with lead tracking data
   - Tracks progression stages

3. ✅ **Automatic Updates**:
   - `updatedAt` is auto-updated on every change
   - `webhookSent` and `status` updated after webhook response

**All updates happen automatically** - no manual intervention needed! 🎉

