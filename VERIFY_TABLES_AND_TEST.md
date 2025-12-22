# Verify Tables and Test - Quick Checklist

## ✅ Tables Created Successfully!

Your Supabase database now has:
- ✅ `consultation_submissions` (27 columns)
- ✅ `leads` (9 columns)
- ✅ `analytics_events` (6 columns)
- ✅ `email_digests` (11 columns)

## Next Steps

### 1. Verify Users Table Has consultationSubmissionId Column

**Run in Supabase SQL Editor**:
```sql
-- Check if column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name = 'consultationSubmissionId';

-- If doesn't exist, add it:
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "consultationSubmissionId" TEXT UNIQUE;

CREATE INDEX IF NOT EXISTS idx_users_consultation_submission 
ON users("consultationSubmissionId");
```

### 2. Test Consultation Form

1. **Go to**: https://smartpro-docs.vercel.app/consultation
2. **Fill out form** and submit
3. **Check Supabase**:
   - Table Editor → `consultation_submissions` → Should see your submission
   - Table Editor → `leads` → Should see lead entry with `currentStage: "consultation_submitted"`

### 3. Verify Data Flow

**Expected Results**:

1. **Form Submission**:
   - ✅ Saves to `consultation_submissions`
   - ✅ Creates entry in `leads` table
   - ✅ Returns `submissionId` to frontend

2. **Thank You Page**:
   - ✅ Shows submission ID
   - ✅ Shows tracking status
   - ✅ Shows lead progress (17%)

3. **Status Page**:
   - ✅ Displays consultation details
   - ✅ Shows lead progress
   - ✅ Shows tracking information

### 4. Test API Endpoints

**Get Consultation**:
```bash
GET /api/consultation/[SUBMISSION_ID]
```

**Get Lead Status**:
```bash
GET /api/leads/[SUBMISSION_ID]
```

## Quick Test Checklist

- [ ] Submit consultation form
- [ ] Check `consultation_submissions` table has data
- [ ] Check `leads` table has entry
- [ ] Verify `submissionId` is displayed on thank you page
- [ ] Test consultation status page
- [ ] Verify API endpoints return data

## Summary

**Status**: ✅ All tables created!  
**Ready**: Marketing website can now save consultations and track leads  
**Next**: Test the form and verify data appears in Supabase

Your system is ready to track consultations from form submission → platform registration! 🚀

