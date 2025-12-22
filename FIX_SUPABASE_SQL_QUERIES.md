# Fix: Supabase SQL Query Column Name Error

## Issue
PostgreSQL/Supabase is case-sensitive. Column names need to be quoted if they use camelCase, or use snake_case.

## Error
```
ERROR: column "submissionid" does not exist
HINT: Perhaps you meant to reference the column "consultation_submissions.submissionId".
```

## Solution

### Option 1: Use Quoted Column Names (camelCase)

PostgreSQL requires **double quotes** around camelCase column names:

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

### Option 2: Use Snake_Case (Recommended)

If columns are stored as snake_case in database, use lowercase with underscores:

```sql
SELECT 
  submission_id,
  name,
  email,
  status,
  webhook_sent,
  webhook_sent_at,
  created_at
FROM consultation_submissions
ORDER BY created_at DESC
LIMIT 10;
```

---

## Correct SQL Queries for Supabase

### 1. Check Latest Submission

**With Quoted Names (camelCase)**:
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
LIMIT 1;
```

**With Snake_Case**:
```sql
SELECT 
  submission_id,
  name,
  email,
  status,
  webhook_sent,
  webhook_sent_at,
  created_at
FROM consultation_submissions
ORDER BY created_at DESC
LIMIT 1;
```

### 2. Check Specific Submission

**With Quoted Names**:
```sql
SELECT 
  "submissionId",
  "name",
  "email",
  "status",
  "webhookSent",
  "webhookSentAt"
FROM consultation_submissions
WHERE "submissionId" = 'sub_1766411774397';
```

**With Snake_Case**:
```sql
SELECT 
  submission_id,
  name,
  email,
  status,
  webhook_sent,
  webhook_sent_at
FROM consultation_submissions
WHERE submission_id = 'sub_1766411774397';
```

### 3. Check Webhook Status

**With Quoted Names**:
```sql
SELECT 
  "submissionId",
  "status",
  "webhookSent",
  "webhookSentAt"
FROM consultation_submissions
WHERE "webhookSent" = true
ORDER BY "webhookSentAt" DESC;
```

**With Snake_Case**:
```sql
SELECT 
  submission_id,
  status,
  webhook_sent,
  webhook_sent_at
FROM consultation_submissions
WHERE webhook_sent = true
ORDER BY webhook_sent_at DESC;
```

### 4. Check Failed Webhooks

**With Quoted Names**:
```sql
SELECT 
  "submissionId",
  "name",
  "email",
  "status",
  "webhookSent",
  "createdAt"
FROM consultation_submissions
WHERE "webhookSent" = false
  AND "createdAt" > NOW() - INTERVAL '24 hours'
ORDER BY "createdAt" DESC;
```

**With Snake_Case**:
```sql
SELECT 
  submission_id,
  name,
  email,
  status,
  webhook_sent,
  created_at
FROM consultation_submissions
WHERE webhook_sent = false
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### 5. Check Leads Table

**With Quoted Names**:
```sql
SELECT 
  "submissionId",
  "email",
  "currentStage",
  "stages",
  "createdAt"
FROM leads
WHERE "submissionId" = 'sub_1766411774397';
```

**With Snake_Case**:
```sql
SELECT 
  submission_id,
  email,
  current_stage,
  stages,
  created_at
FROM leads
WHERE submission_id = 'sub_1766411774397';
```

---

## How to Check Column Names in Supabase

### Method 1: Use Supabase Table Editor
1. Go to **Table Editor** in Supabase Dashboard
2. Click on `consultation_submissions` table
3. Look at the column headers - they show the exact names

### Method 2: Query Information Schema

```sql
SELECT 
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'consultation_submissions'
ORDER BY ordinal_position;
```

This will show you the **exact column names** as stored in the database.

---

## Quick Fix: Try Both Formats

If you're not sure which format your database uses, try this query that works with both:

```sql
SELECT *
FROM consultation_submissions
ORDER BY id DESC
LIMIT 1;
```

This will show all columns and you can see the exact names.

---

## Updated Documentation

All SQL queries in the documentation have been updated to use **quoted camelCase** format, which matches Prisma's default behavior.

**Remember**: Always use **double quotes** around camelCase column names in PostgreSQL! ✅

