# Test Consultation Form - Step by Step

## Prerequisites

✅ All tables created in Supabase:
- `consultation_submissions`
- `leads`
- `analytics_events`
- `email_digests`

## Test Steps

### Step 1: Submit Consultation Form

1. **Go to consultation page**
   - URL: https://smartpro-docs.vercel.app/consultation

2. **Fill out the form**
   - Name: Test User
   - Email: test@example.com
   - Phone: +1234567890
   - Company: Test Company
   - Services: Select at least one service
   - Message: Test consultation request

3. **Submit the form**

### Step 2: Verify Data in Supabase

**Check consultation_submissions table**:

1. Go to: https://reootcngcptfogfozlmz.supabase.co
2. Click: **Table Editor**
3. Select: `consultation_submissions`
4. You should see your test submission with:
   - ✅ `submissionId` (unique ID)
   - ✅ `name`: "Test User"
   - ✅ `email`: "test@example.com"
   - ✅ `services`: Array of selected services
   - ✅ `status`: "pending"
   - ✅ `createdAt`: Current timestamp

**Check leads table**:

1. Select: `leads` table
2. You should see entry with:
   - ✅ `submissionId`: Matches consultation submission
   - ✅ `email`: "test@example.com"
   - ✅ `currentStage`: "consultation_submitted"
   - ✅ `stages`: ["consultation_submitted"]
   - ✅ `progress`: ~17%

### Step 3: Test API Endpoints

**Get consultation by submissionId**:

```bash
# Replace SUBMISSION_ID with actual ID from database
GET https://smartpro-docs.vercel.app/api/consultation/SUBMISSION_ID
```

**Get lead status**:

```bash
GET https://smartpro-docs.vercel.app/api/leads/SUBMISSION_ID
```

### Step 4: Test Thank You Page

After submission, you should:
1. ✅ See thank you page
2. ✅ See submission ID displayed
3. ✅ See tracking status component
4. ✅ See lead progress (33%)
5. ✅ See "Register" buttons

### Step 5: Test Consultation Status Page

1. **Copy submission ID** from thank you page
2. **Go to**: `/consultation/status/SUBMISSION_ID`
3. **Verify**:
   - ✅ Consultation details displayed
   - ✅ Lead progress shown
   - ✅ Tracking status visible

## Expected Results

### Database Records Created

**consultation_submissions**:
- 1 new record with all form data

**leads**:
- 1 new record with:
  - `currentStage`: "consultation_submitted"
  - `progress`: 17%

### Frontend Behavior

- ✅ Form submits successfully
- ✅ Redirects to thank you page
- ✅ Shows submission ID
- ✅ Shows tracking status
- ✅ Shows lead progress

### API Responses

**POST /api/consultation**:
```json
{
  "success": true,
  "submissionId": "sub_abc123",
  "message": "Consultation request received..."
}
```

**GET /api/consultation/:submissionId**:
```json
{
  "id": "...",
  "submissionId": "sub_abc123",
  "name": "Test User",
  "email": "test@example.com",
  "services": [...],
  "status": "pending",
  ...
}
```

**GET /api/leads/:submissionId**:
```json
{
  "success": true,
  "lead": {
    "submissionId": "sub_abc123",
    "email": "test@example.com",
    "currentStage": "consultation_submitted",
    "stages": ["consultation_submitted"],
    "progress": 17
  }
}
```

## Troubleshooting

### No Data in Database

**Check**:
1. `DATABASE_URL` is set correctly
2. Prisma client is initialized
3. API route is working
4. Check server logs for errors

**Fix**:
- Verify connection string
- Check Supabase project is active
- Review server console for errors

### Lead Not Created

**Check**:
1. Lead tracking code runs after consultation creation
2. `leads` table exists
3. No errors in server logs

**Fix**:
- Check `server/routes/consultationRoutes.ts`
- Verify lead creation code executes
- Check for Prisma errors

### API Returns 404

**Check**:
1. Routes are registered in `server/index.ts`
2. API server is running
3. Endpoints are correct

**Fix**:
- Verify route registration
- Check server is running
- Test endpoints directly

## Success Criteria

✅ Consultation form submits  
✅ Data saved to `consultation_submissions`  
✅ Lead created in `leads` table  
✅ Thank you page shows submission ID  
✅ Status page displays consultation details  
✅ API endpoints return correct data  

## Summary

**Test the form** → **Check database** → **Verify API** → **Done!** 🎉

Your marketing website is now fully functional with database integration!

