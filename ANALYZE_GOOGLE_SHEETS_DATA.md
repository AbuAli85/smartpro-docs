# Analysis: Google Sheets Consultation Data

## Overview
This document analyzes the consultation submission data from Google Sheets and compares it with the expected Supabase database structure.

## Key Observations

### 1. **Duplicate Submissions Issue** ⚠️

**Problem**: Many duplicate submissions from the same email addresses, especially:
- `chairman@falconeyegroup.net` - **Multiple submissions** (appears many times)
- `Luxsess2001@gmail.com` / `luxsess2001@hotmail.com` - Multiple submissions
- `test@verification.smartpro.io` - Test submissions

**Example**: 
- `chairman@falconeyegroup.net` submitted on:
  - 2025-11-16 (multiple times)
  - 2025-11-17 (multiple times)
  - 2025-11-18 (multiple times)
  - 2025-11-22 (multiple times)
  - 2025-11-23 (multiple times)
  - 2025-12-22 (multiple times)

### 2. **Data Completeness**

**Good**: Most submissions have:
- ✅ Timestamp
- ✅ Client Name
- ✅ Email
- ✅ Business Name
- ✅ Service Interested
- ✅ Language
- ✅ Source (`smartpro-consultation-form`)

**Missing/Incomplete**:
- ⚠️ Some rows missing phone numbers
- ⚠️ Some rows missing location
- ⚠️ Some rows missing message/notes

### 3. **Email Status**

**Status Distribution**:
- `Sent` - Most submissions have emails sent
- `Pending` - Some submissions still pending
- Empty - Some rows have no status

### 4. **Response Tracking**

**Good**: Some rows show:
- `client_replied` = TRUE
- `client_replied_at` = Timestamp
- `provider_replied` = TRUE
- `provider_replied_at` = Timestamp
- `provider_reply_message` = Content

### 5. **Test Data**

**Test Submissions**:
- `test@verification.smartpro.io` - Multiple test submissions
- `YOUR_EMAIL@example.com` - Test submissions
- Some rows with empty client names but phone numbers

---

## Comparison with Supabase Structure

### Expected Supabase Tables:

#### 1. `consultation_submissions`
**Columns in Google Sheets** → **Supabase Columns**:
- `Timestamp` → `createdAt`
- `Client Name` → `name`
- `Email` → `email`
- `Phone` → `phone`
- `Business Name` → `company`
- `Business Type` → `businessType`
- `Service Interested` → `primaryService`
- `Services (Full List)` → `services` (array)
- `Budget` → `budget`
- `Timeline` → `timeline`
- `Preferred Contact` → `preferredContact`
- `Preferred Time` → `preferredTime`
- `Location` → `location`
- `Primary Message` → `message`
- `Language` → `language`
- `Source` → `source`
- `Email Status` → `status` (pending/contacted)
- `Last Email Preview` → Not stored in Supabase (Make.com only)

**Missing in Supabase** (Make.com/Google Sheets only):
- `Notes / Extra Info`
- `Service Type Normalised`
- `Response Status`
- `Response Date`
- `Follow-up Count`
- `Idempotency Key`
- `Last Follow-up Date`
- `Call Scheduled Date`
- `Lead Score`
- `client_email_sent`
- `internal_email_sent`
- `client_replied`
- `client_replied_at`
- `notes`
- `provider_replied`
- `provider_replied_at`
- `provider_reply_message`

#### 2. `leads`
**Should be created for each submission**:
- `submissionId` - Links to consultation submission
- `email` - Client email
- `currentStage` - Should be `consultation_submitted`
- `stages` - Array with `['consultation_submitted']`
- `source` - `consultation_form`

---

## Issues to Address

### 1. **Duplicate Detection Not Working Properly**

**Current Behavior**: 
- Many duplicate submissions are being saved to Google Sheets
- This suggests the duplicate detection in the backend might not be working correctly, OR
- The Make.com workflow is not filtering duplicates properly

**Expected Behavior**:
- Backend should detect duplicates (same email within 5 minutes)
- Make.com should filter `is_duplicate = true`
- Only unique submissions should reach Google Sheets

**Action Required**:
1. Check backend duplicate detection logic
2. Verify Make.com filter condition
3. Review if `is_duplicate` flag is being sent correctly

### 2. **Missing Data in Supabase**

**Problem**: Some fields in Google Sheets are not stored in Supabase:
- Response tracking (`client_replied`, `provider_replied`)
- Follow-up information
- Lead scoring

**Recommendation**: 
- These fields are Make.com/Google Sheets specific
- Consider if they need to be in Supabase for reporting
- If yes, add to Prisma schema

### 3. **Test Data Cleanup**

**Issue**: Test submissions are mixed with real data:
- `test@verification.smartpro.io`
- `YOUR_EMAIL@example.com`

**Recommendation**:
- Filter test emails in Make.com
- Or mark them clearly in Supabase with `source = 'test'`

---

## Verification Queries

### Check Supabase for Duplicates

```sql
-- Find duplicate emails within 5 minutes
SELECT 
  "email",
  COUNT(*) as submission_count,
  ARRAY_AGG("submissionId" ORDER BY "createdAt") as submission_ids,
  ARRAY_AGG("createdAt" ORDER BY "createdAt") as timestamps
FROM consultation_submissions
GROUP BY "email"
HAVING COUNT(*) > 1
ORDER BY submission_count DESC;
```

### Compare Google Sheets Count vs Supabase Count

```sql
-- Count total submissions in Supabase
SELECT COUNT(*) as total_submissions
FROM consultation_submissions;

-- Count by date
SELECT 
  DATE("createdAt") as submission_date,
  COUNT(*) as count
FROM consultation_submissions
GROUP BY DATE("createdAt")
ORDER BY submission_date DESC;
```

### Check Lead Creation

```sql
-- Verify leads were created for submissions
SELECT 
  cs."submissionId",
  cs."email",
  cs."createdAt" as submission_created,
  l."currentStage",
  l."createdAt" as lead_created
FROM consultation_submissions cs
LEFT JOIN leads l ON cs."submissionId" = l."submissionId"
ORDER BY cs."createdAt" DESC
LIMIT 20;
```

---

## Recommendations

### 1. **Immediate Actions**

1. **Review Duplicate Detection**:
   - Check backend logs for duplicate detection
   - Verify Make.com filter is working
   - Test with a new submission

2. **Data Cleanup**:
   - Identify and mark/remove duplicate submissions
   - Filter test data

3. **Verification**:
   - Run SQL queries above to compare Google Sheets vs Supabase
   - Check if all submissions have corresponding leads

### 2. **Long-term Improvements**

1. **Enhanced Duplicate Detection**:
   - Add IP address checking
   - Add browser fingerprinting
   - Improve time window logic

2. **Data Synchronization**:
   - Consider syncing response tracking to Supabase
   - Add webhook to update Supabase when responses come in

3. **Monitoring**:
   - Set up alerts for duplicate submissions
   - Track submission quality metrics

---

## Next Steps

1. ✅ Review this analysis
2. 🔍 Run verification queries in Supabase
3. 🔧 Fix duplicate detection if needed
4. 📊 Compare Google Sheets vs Supabase counts
5. 🧹 Clean up test data
6. 📈 Set up monitoring

---

## Questions to Answer

1. **Are duplicates being saved to Supabase?**
   - Run the duplicate detection query above

2. **Is the `is_duplicate` flag working in Make.com?**
   - Check Make.com scenario logs
   - Verify filter condition

3. **Are leads being created for all submissions?**
   - Run the lead verification query above

4. **Should response tracking be in Supabase?**
   - Decide if this data needs to be in database
   - If yes, update Prisma schema

