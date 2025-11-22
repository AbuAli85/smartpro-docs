# Webhook Payload Verification

## Current Payload (What You're Receiving)

```json
{
  "services": ["Project Management", "Business Consulting", ...],  // ❌ English (should be Arabic)
  "services_translated": ["إدارة المشاريع", "الاستشارات التجارية", ...],  // ✅ Arabic (but we don't send this)
  "services_summary": "Project Management, Business Consulting, ...",  // ❌ English (should be Arabic)
  "services_summary_translated": "إدارة المشاريع, الاستشارات التجارية, ...",  // ✅ Arabic (but we don't send this)
  "service_interested": "Project Management",  // ✅ English (correct, for routing)
  // ❌ Missing: "service_interested_translated"
}
```

## Expected Payload (What Should Be Sent)

```json
{
  "services": ["إدارة المشاريع", "الاستشارات التجارية", "أتمتة سير العمل", "إدارة العقود"],  // ✅ Arabic array
  "services_english": ["Project Management", "Business Consulting", "Workflow Automation", "Contract Management"],  // ✅ English (for reference)
  "services_summary": "إدارة المشاريع، الاستشارات التجارية، أتمتة سير العمل، إدارة العقود",  // ✅ Arabic string
  "services_summary_english": "Project Management, Business Consulting, Workflow Automation, Contract Management",  // ✅ English (for reference)
  "service_interested": "Project Management",  // ✅ English (for routing)
  "service_interested_translated": "إدارة المشاريع",  // ✅ Arabic (for email display)
  "language": "ar"
}
```

## Issue Analysis

### Problem 1: `services_summary` is in English
**Expected**: Arabic when `language='ar'`  
**Actual**: English  
**Cause**: Code might not be deployed, or Make.com is transforming the data

### Problem 2: Missing `service_interested_translated`
**Expected**: Should be present with Arabic value  
**Actual**: Missing from payload  
**Cause**: Code might not be deployed

### Problem 3: Extra fields (`services_translated`, `services_summary_translated`)
**Expected**: We don't send these  
**Actual**: Present in payload  
**Cause**: Either Make.com is adding them, or old code is still running

## Solution Steps

### Step 1: Verify Code is Deployed

Check if the latest code is deployed:

1. **For Express Backend** (`server/routes/consultationRoutes.ts`):
   - Verify the server is running the latest code
   - Check line 220: `services_summary: servicesSummary` (should use translated when 'ar')
   - Check line 223: `service_interested_translated` should be present

2. **For Vercel Serverless** (`api/consultation.ts`):
   - Verify Vercel has the latest deployment
   - Check line 489: `services_summary: servicesSummary` (should use translated when 'ar')
   - Check line 492: `service_interested_translated` should be present

### Step 2: Test the Endpoint

Send a test request and check the response:

```bash
curl -X POST https://your-api.com/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "services": ["projectManagement", "businessConsulting"],
    "language": "ar"
  }'
```

Verify the response includes:
- `services_summary` in Arabic
- `service_interested_translated` present

### Step 3: Check Make.com Transformation

If Make.com is transforming the data:

1. Check if Make.com has any "Set variable" or "Replace" modules
2. Look for modules that might be adding `services_translated` or `services_summary_translated`
3. Verify the webhook module is receiving the raw payload

### Step 4: Update Make.com Email Template

Even if the payload is correct, ensure Make.com email template uses:
- `{{1.service_interested_translated}}` (not `{{1.service_interested}}`)
- `{{1.services_summary}}` (not `{{1.services}}`)

## Code Verification Checklist

- [ ] `server/routes/consultationRoutes.ts` line 162: `servicesForDisplay` uses `translatedServices` when `language === 'ar'`
- [ ] `server/routes/consultationRoutes.ts` line 220: `services_summary: servicesSummary` (uses `servicesForDisplay`)
- [ ] `server/routes/consultationRoutes.ts` line 223: `service_interested_translated` is present
- [ ] `api/consultation.ts` line 474: `servicesForDisplay` uses `translatedServices` when `language === 'ar'`
- [ ] `api/consultation.ts` line 489: `services_summary: servicesSummary` (uses `servicesForDisplay`)
- [ ] `api/consultation.ts` line 492: `service_interested_translated` is present

## Expected Behavior

When `language='ar'`:
1. ✅ `services` array should contain Arabic service names
2. ✅ `services_summary` should be Arabic comma-separated string
3. ✅ `service_interested_translated` should be Arabic primary service
4. ✅ `services_english` should contain English versions (for reference)
5. ✅ `services_summary_english` should be English summary (for reference)

## Next Steps

1. **Deploy latest code** if not already deployed
2. **Test the endpoint** to verify payload structure
3. **Check Make.com** for any data transformations
4. **Update email template** to use correct fields
5. **Test end-to-end** with Arabic form submission

