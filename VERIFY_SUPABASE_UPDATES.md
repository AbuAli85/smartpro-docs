# Quick Guide: Verify Supabase Table Updates

## Quick Check Commands

### 1. Check Latest Submission

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

**Note**: Use double quotes around camelCase column names in PostgreSQL.

### 2. Check Webhook Status

```sql
SELECT 
  "submissionId",
  "status",
  "webhookSent",
  "webhookSentAt"
FROM consultation_submissions
WHERE "submissionId" = 'sub_1766411774397';
```

**Expected**:
- `webhookSent`: `true` ✅
- `status`: `'contacted'` ✅
- `webhookSentAt`: timestamp ✅

### 3. Check Lead Entry

```sql
SELECT 
  "submissionId",
  "email",
  "currentStage",
  "stages"
FROM leads
WHERE "submissionId" = 'sub_1766411774397';
```

### 4. Check All Recent Updates

```sql
SELECT 
  "submissionId",
  "name",
  "email",
  "status",
  "webhookSent",
  "webhookSentAt",
  "updatedAt"
FROM consultation_submissions
WHERE "updatedAt" > NOW() - INTERVAL '1 hour'
ORDER BY "updatedAt" DESC;
```

---

## What Gets Updated Automatically

### On Form Submission:
1. ✅ Creates `consultation_submissions` record
2. ✅ Creates `leads` record
3. ✅ Sends webhook to Make.com
4. ✅ Updates `webhookSent`, `webhookSentAt`, `status` after webhook

### Fields That Auto-Update:
- `updatedAt` - Updates on every change
- `webhookSent` - Updates after webhook response
- `webhookSentAt` - Updates when webhook sent
- `status` - Updates based on webhook success

---

## In Supabase Dashboard

1. **Go to**: Supabase Dashboard → Table Editor
2. **Select**: `consultation_submissions` table
3. **Check**:
   - Latest row has your submission
   - `webhookSent` = `true`
   - `status` = `'contacted'`
   - `webhookSentAt` has timestamp

4. **Select**: `leads` table
5. **Check**:
   - Row with matching `submissionId`
   - `currentStage` = `'consultation_submitted'`

---

## Troubleshooting

### If `webhookSent` is `false`:
- Check server logs for webhook errors
- Verify `MAKE_WEBHOOK_URL` is set
- Check Make.com scenario is active

### If data not in database:
- Check `DATABASE_URL` is correct
- Verify tables exist: `consultation_submissions`, `leads`
- Check server logs for database errors

---

**All updates happen automatically - no manual steps needed!** ✅

