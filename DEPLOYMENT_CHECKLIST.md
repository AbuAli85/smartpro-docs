# Deployment Checklist - service_interested_translated Field

## Current Status

✅ **Code is correct** - Both backend files include `service_interested_translated`:
- `server/routes/consultationRoutes.ts` line 223
- `api/consultation.ts` line 492

❌ **Field is missing** - The webhook payload doesn't include `service_interested_translated`

## Deployment Steps

### For Express Backend (`server/routes/consultationRoutes.ts`)

1. **Verify the code is saved:**
   ```bash
   # Check line 223 exists
   grep -n "service_interested_translated" server/routes/consultationRoutes.ts
   ```

2. **Restart the server:**
   ```bash
   # Stop the current server
   # Start it again to load the new code
   npm start
   # or
   pnpm start
   # or
   node server/index.js
   ```

3. **Test the endpoint:**
   ```bash
   curl -X POST http://localhost:YOUR_PORT/api/consultation \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test",
       "email": "test@example.com",
       "services": ["businessConsulting"],
       "language": "ar"
     }'
   ```

4. **Verify the response includes `service_interested_translated`**

### For Vercel Serverless (`api/consultation.ts`)

1. **Verify the code is saved:**
   ```bash
   # Check line 492 exists
   grep -n "service_interested_translated" api/consultation.ts
   ```

2. **Deploy to Vercel:**
   ```bash
   # If using Vercel CLI
   vercel --prod
   
   # Or push to main branch if auto-deploy is enabled
   git add api/consultation.ts
   git commit -m "Add service_interested_translated field"
   git push origin main
   ```

3. **Wait for deployment to complete**

4. **Test the endpoint:**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/consultation \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test",
       "email": "test@example.com",
       "services": ["businessConsulting"],
       "language": "ar"
     }'
   ```

5. **Verify the response includes `service_interested_translated`**

## Verification

After deployment, the webhook payload should include:

```json
{
  "service_interested": "Business Consulting",  // English (for routing)
  "service_interested_translated": "الاستشارات التجارية",  // Arabic (for email)
  "services": ["الاستشارات التجارية", "إدارة المشاريع", ...],
  "services_summary": "الاستشارات التجارية, إدارة المشاريع, ...",
  "language": "ar"
}
```

## Which Endpoint is Being Used?

Check your form submission code to see which endpoint is called:

- **Frontend form** → Check `client/src/lib/backendApi.ts` or `client/src/components/ConsultationForm.tsx`
- Look for the API URL being used
- Verify it matches the endpoint you deployed

## Temporary Workaround

If you can't deploy immediately, you can use a workaround in Make.com:

**Instead of:**
```
{{1.service_interested_translated}}
```

**Use:**
```
{{1.services[0]}}
```

This will show the first service from the Arabic services array. However, this is a temporary solution - the proper fix is to deploy the code.

## Expected Value

Based on your payload, when `language='ar'` and `services` contains:
```json
["الاستشارات التجارية", "إدارة المشاريع", "إدارة العقود", "إدارة علاقات العملاء"]
```

The `service_interested_translated` should be:
```json
"الاستشارات التجارية"  // First service in the translated array
```

## Troubleshooting

### If field still missing after deployment:

1. **Check deployment logs** - Verify the deployment was successful
2. **Check server logs** - Look for any errors when processing requests
3. **Verify endpoint** - Make sure the form is calling the correct endpoint
4. **Clear cache** - If using any caching, clear it
5. **Test directly** - Use curl/Postman to test the endpoint directly

### If using a different endpoint:

- Check if there's a proxy or API gateway in between
- Verify the endpoint URL in your form submission code
- Make sure you deployed to the correct environment

## Summary

✅ Code is correct  
❌ Needs deployment  
✅ Template is ready  

**Action Required**: Deploy the latest backend code to include `service_interested_translated` in the webhook payload.
