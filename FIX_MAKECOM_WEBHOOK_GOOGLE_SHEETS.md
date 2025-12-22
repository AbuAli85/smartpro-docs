# Fix: Make.com Webhook Not Sending Data to Google Sheets

## Issue
Data is not being sent to Google Sheets through Make.com webhook integration.

## Root Causes Identified

### 1. Database Update Using Wrong Field
The code was trying to update the database using `id` instead of `submissionId`:
```typescript
// ❌ WRONG
where: { id: submissionId }

// ✅ CORRECT
where: { submissionId: uniqueSubmissionId }
```

### 2. Missing Error Logging
Webhook errors were not being logged clearly, making debugging difficult.

## Fixes Applied

### 1. Fixed Database Update
- Changed `where: { id: submissionId }` to `where: { submissionId: uniqueSubmissionId }`
- Now correctly updates the `webhookSent` status in database

### 2. Enhanced Logging
Added comprehensive logging to track:
- ✅ Webhook URL being used
- ✅ Payload being sent
- ✅ Response status and data
- ✅ Success/failure with details
- ✅ Error messages with context

### 3. Better Error Handling
- Clear error messages for missing webhook URL
- Timeout handling (30 seconds)
- Network error detection
- Response status validation

## How to Verify

### 1. Check Server Logs
Look for these log messages:
```
📤 Sending webhook to Make.com: { url, payloadKeys, submissionId, email }
📥 Webhook response status: 200 OK
✅ Webhook success: { message, executionId }
```

### 2. Check Database
Query the `consultation_submissions` table:
```sql
SELECT submissionId, webhookSent, webhookSentAt, status 
FROM consultation_submissions 
WHERE submissionId = 'sub_1766411774397';
```

**Expected**:
- `webhookSent`: `true`
- `webhookSentAt`: timestamp
- `status`: `'contacted'`

### 3. Check Make.com Scenario
1. Go to Make.com dashboard
2. Check scenario execution history
3. Look for webhook triggers
4. Verify data flows to Google Sheets

### 4. Check Environment Variable
Ensure `MAKE_WEBHOOK_URL` is set:
```bash
# In .env file or Vercel environment variables
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-webhook-url
```

## Troubleshooting

### Webhook URL Not Configured
**Error**: `❌ Make.com webhook URL not configured`

**Fix**: Set `MAKE_WEBHOOK_URL` environment variable in:
- Local: `.env` file
- Production: Vercel Environment Variables

### Webhook Timeout
**Error**: `❌ Webhook timeout after 30 seconds`

**Possible Causes**:
- Make.com scenario is paused
- Network connectivity issues
- Make.com webhook URL is incorrect

**Fix**:
1. Check Make.com scenario is active
2. Verify webhook URL is correct
3. Test webhook URL manually with Postman/curl

### Webhook Returns Error
**Error**: `❌ Webhook request failed: [error message]`

**Possible Causes**:
- Make.com scenario has errors
- Filter module blocking the request
- Invalid payload format

**Fix**:
1. Check Make.com scenario logs
2. Verify filter conditions (should be `is_duplicate Not equal to true`)
3. Check payload format matches Make.com expectations

### Data Not Reaching Google Sheets
**Possible Causes**:
1. Make.com scenario not connected to Google Sheets
2. Google Sheets module has errors
3. Filter module blocking data

**Fix**:
1. Check Make.com scenario flow
2. Verify Google Sheets connection
3. Check filter conditions
4. Review Make.com execution logs

## Testing

### Test Webhook Manually
```bash
curl -X POST https://hook.eu2.make.com/your-webhook-url \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "consultation",
    "client_name": "Test User",
    "email": "test@example.com",
    "submission_id": "test_123",
    "is_duplicate": false
  }'
```

### Test Full Flow
1. Submit consultation form
2. Check server logs for webhook logs
3. Check database for `webhookSent = true`
4. Check Make.com for scenario execution
5. Check Google Sheets for new row

## Summary

**Fixed**:
- ✅ Database update using correct field (`submissionId`)
- ✅ Enhanced error logging
- ✅ Better debugging information

**Next Steps**:
1. Check server logs after form submission
2. Verify `MAKE_WEBHOOK_URL` is set
3. Check Make.com scenario is active
4. Verify Google Sheets connection in Make.com

The webhook should now properly send data to Make.com and then to Google Sheets! 🎉

