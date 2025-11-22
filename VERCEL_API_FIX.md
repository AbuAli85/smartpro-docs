# Vercel API 405 Error Fix

**Issue:** `POST https://smartpro-docs.vercel.app/api/consultation` returns 405 (Method Not Allowed)

**Root Cause:** Backend API exists but wasn't configured as Vercel serverless functions.

---

## ✅ Fixes Applied

### 1. Created Vercel Serverless Function Handlers

**Files Created:**
- `api/consultation.ts` - Specific handler for `/api/consultation`
- `api/health.ts` - Health check endpoint
- `api/[...path].ts` - Catch-all for other API routes

### 2. Updated Configuration

**`vercel.json`:**
- Added `functions` configuration for Node.js 20.x runtime
- Removed unnecessary rewrite rule (Vercel handles `/api/*` automatically)

**`server/index.ts`:**
- Updated to skip `app.listen()` when running on Vercel (serverless mode)

### 3. Installed Dependencies

- Added `@vercel/node` package for Vercel serverless function types

---

## 🚀 Deployment Steps

### 1. Commit and Push Changes

```bash
git add .
git commit -m "Configure backend API as Vercel serverless functions"
git push
```

### 2. Vercel Will Auto-Deploy

Vercel will automatically:
- Detect the `api/` directory
- Build and deploy serverless functions
- Route `/api/*` requests to the functions

### 3. Set Environment Variables

Go to Vercel Dashboard → Settings → Environment Variables:

```env
# Backend Configuration
NODE_ENV=production
FRONTEND_URL=https://smartpro-docs.vercel.app
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8

# Frontend API URL (relative or full URL)
VITE_API_URL=https://smartpro-docs.vercel.app/api
# OR use relative path:
# VITE_API_URL=/api
```

### 4. Redeploy (if needed)

If environment variables were added, trigger a redeploy:
- Go to Vercel Dashboard → Deployments
- Click "Redeploy" on the latest deployment

---

## 🧪 Testing

### Test Health Endpoint

```bash
curl https://smartpro-docs.vercel.app/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "production"
}
```

### Test Consultation Endpoint

```bash
curl -X POST https://smartpro-docs.vercel.app/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "services": ["accounting"],
    "language": "en"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Consultation request submitted successfully",
  "submissionId": "..."
}
```

### Test in Browser

1. Visit: https://smartpro-docs.vercel.app/consultation
2. Fill out the form
3. Submit
4. Check browser console (F12) - should see success, no 405 error

---

## 📋 File Structure

```
smartpro-docs/
├── api/
│   ├── consultation.ts      # /api/consultation handler
│   ├── health.ts            # /api/health handler
│   └── [...path].ts         # Catch-all for other API routes
├── server/
│   ├── index.ts             # Express app (updated for serverless)
│   └── routes/
│       └── consultationRoutes.ts
├── vercel.json              # Updated configuration
└── package.json             # Added @vercel/node
```

---

## 🔍 How It Works

1. **Request comes in:** `POST /api/consultation`
2. **Vercel routes to:** `api/consultation.ts` serverless function
3. **Handler forwards to:** Express app with path set to `/api/consultation`
4. **Express routes to:** `server/routes/consultationRoutes.ts`
5. **Response sent back:** Through Vercel serverless function

---

## ⚠️ Important Notes

### Environment Variables

Make sure all required environment variables are set in Vercel:
- `MAKE_WEBHOOK_URL` - Required for webhook integration
- `FRONTEND_URL` - For CORS configuration
- `VITE_API_URL` - Frontend needs to know API URL

### Cold Starts

Vercel serverless functions may have cold starts (first request after inactivity). This is normal and subsequent requests will be faster.

### Function Timeout

Vercel serverless functions have a timeout limit (10 seconds on free tier, 60 seconds on Pro). If your webhook calls take longer, consider:
- Using background jobs
- Optimizing webhook response time
- Upgrading to Pro plan

---

## 🐛 Troubleshooting

### Still Getting 405 Error?

1. **Check deployment logs:**
   - Vercel Dashboard → Deployments → Latest → Functions tab
   - Look for build errors

2. **Verify function exists:**
   - Vercel Dashboard → Settings → Functions
   - Should see `api/consultation.ts` listed

3. **Check environment variables:**
   - Make sure all required vars are set
   - Redeploy after adding new vars

4. **Test locally with Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel dev
   ```

### Function Not Found (404)?

- Check `vercel.json` configuration
- Ensure `api/` directory is in project root
- Verify file names match route paths

### CORS Errors?

- Check `FRONTEND_URL` environment variable
- Ensure it matches your frontend domain exactly
- Check CORS middleware in `server/index.ts`

---

## ✅ Success Criteria

- [ ] Health endpoint returns 200 OK
- [ ] Consultation endpoint accepts POST requests
- [ ] Form submission works without 405 error
- [ ] Make.com receives webhook payloads
- [ ] Google Sheets gets new rows

---

**Status:** ✅ Code changes complete, ready for deployment

