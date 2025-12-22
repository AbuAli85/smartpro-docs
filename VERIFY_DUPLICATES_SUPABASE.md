# Verify Duplicates in Supabase

## Quick SQL Queries to Check for Duplicates

### 1. Find All Duplicate Emails

```sql
-- Find emails with multiple submissions
SELECT 
  "email",
  COUNT(*) as submission_count,
  ARRAY_AGG("submissionId" ORDER BY "createdAt") as submission_ids,
  ARRAY_AGG("createdAt" ORDER BY "createdAt") as timestamps,
  ARRAY_AGG("webhookSent" ORDER BY "createdAt") as webhook_statuses
FROM consultation_submissions
GROUP BY "email"
HAVING COUNT(*) > 1
ORDER BY submission_count DESC;
```

### 2. Find Duplicates Within 5 Minutes (Should Be Filtered)

```sql
-- Find submissions from same email within 5 minutes
WITH ranked_submissions AS (
  SELECT 
    "submissionId",
    "email",
    "createdAt",
    "webhookSent",
    LAG("createdAt") OVER (PARTITION BY "email" ORDER BY "createdAt") as prev_created_at
  FROM consultation_submissions
)
SELECT 
  "submissionId",
  "email",
  "createdAt",
  "webhookSent",
  prev_created_at,
  EXTRACT(EPOCH FROM ("createdAt" - prev_created_at)) / 60 as minutes_apart
FROM ranked_submissions
WHERE prev_created_at IS NOT NULL
  AND EXTRACT(EPOCH FROM ("createdAt" - prev_created_at)) / 60 < 5
ORDER BY "email", "createdAt";
```

### 3. Check Specific Email (chairman@falconeyegroup.net)

```sql
-- Check all submissions from this email
SELECT 
  "submissionId",
  "name",
  "email",
  "createdAt",
  "webhookSent",
  "webhookSentAt",
  "status"
FROM consultation_submissions
WHERE "email" = 'chairman@falconeyegroup.net'
ORDER BY "createdAt" DESC;
```

### 4. Compare Google Sheets Count vs Supabase

```sql
-- Total submissions in Supabase
SELECT COUNT(*) as total_submissions FROM consultation_submissions;

-- Count by date (compare with Google Sheets)
SELECT 
  DATE("createdAt") as submission_date,
  COUNT(*) as count
FROM consultation_submissions
GROUP BY DATE("createdAt")
ORDER BY submission_date DESC;

-- Count by email (top duplicates)
SELECT 
  "email",
  COUNT(*) as count
FROM consultation_submissions
GROUP BY "email"
ORDER BY count DESC
LIMIT 20;
```

### 5. Check if Leads Were Created for All Submissions

```sql
-- Find submissions without corresponding leads
SELECT 
  cs."submissionId",
  cs."email",
  cs."createdAt" as submission_created,
  l."id" as lead_id,
  l."currentStage"
FROM consultation_submissions cs
LEFT JOIN leads l ON cs."submissionId" = l."submissionId"
WHERE l."id" IS NULL
ORDER BY cs."createdAt" DESC;
```

### 6. Check Webhook Status for Duplicates

```sql
-- Find duplicates where webhook was sent multiple times
SELECT 
  "email",
  COUNT(*) as total_submissions,
  COUNT(CASE WHEN "webhookSent" = true THEN 1 END) as webhooks_sent,
  COUNT(CASE WHEN "webhookSent" = false THEN 1 END) as webhooks_not_sent
FROM consultation_submissions
GROUP BY "email"
HAVING COUNT(*) > 1
ORDER BY total_submissions DESC;
```

---

## Expected Results

### If Duplicate Detection is Working:
- ✅ Duplicates within 5 minutes should have `webhookSent = false` for the duplicate
- ✅ Only the first submission should have `webhookSent = true`
- ✅ All submissions should have corresponding leads

### If Duplicate Detection is NOT Working:
- ❌ Multiple submissions with `webhookSent = true` for same email
- ❌ Duplicates within 5 minutes all have webhooks sent
- ❌ Multiple leads created for same email

---

## Action Items

1. **Run Query #1** - See how many duplicates exist
2. **Run Query #2** - Check if 5-minute window is being respected
3. **Run Query #3** - Check specific problematic email
4. **Run Query #5** - Verify leads are created correctly
5. **Compare counts** - Google Sheets vs Supabase

---

## Fix Recommendations

### If Duplicates Are in Supabase:

1. **Backend Issue**: Duplicate detection might not be working
   - Check backend logs
   - Verify the 5-minute window logic
   - Check if `isDuplicate` flag is being set correctly

2. **Make.com Issue**: Filter might not be working
   - Verify filter condition: `is_duplicate Not equal to true`
   - Check Make.com scenario logs
   - Verify webhook payload includes `is_duplicate` field

3. **Data Cleanup**:
   - Mark duplicate submissions in Supabase
   - Update `status` to 'duplicate' for duplicates
   - Keep only the first submission as active

