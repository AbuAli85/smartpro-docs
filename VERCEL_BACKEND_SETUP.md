# Deploying Backend API on Vercel

**Status:** ✅ Backend API exists in `server/` directory  
**Current Issue:** Not configured for Vercel serverless functions  
**Solution:** Configure Vercel to deploy Express server as serverless functions

---

## 🎯 Two Deployment Options

### Option 1: Deploy Backend on Vercel (Same Project) ✅ Recommended

Deploy the Express server as Vercel serverless functions. This keeps everything in one place.

### Option 2: Deploy Backend Separately (Railway/Render)

Deploy the Express server as a standalone service (as described in PRODUCTION_DEPLOYMENT_GUIDE.md).

---

## 🚀 Option 1: Vercel Serverless Functions Setup

### Step 1: Create API Directory Structure

Vercel expects serverless functions in an `api/` directory. We need to create a wrapper that uses your Express app.

Create `api/index.ts`:

```typescript
/**
 * Vercel Serverless Function Entry Point
 * Wraps the Express app for Vercel deployment
 */

import app from '../server/index';

// Export the Express app as a serverless function
export default app;
```

### Step 2: Update vercel.json

Update `vercel.json` to handle both frontend and API routes:

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x"
    }
  }
}
```

### Step 3: Create API Route Handlers

For Vercel, we need individual route handlers. Create `api/consultation.ts`:

```typescript
/**
 * Vercel Serverless Function for Consultation Endpoint
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server/index';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Use the Express app to handle the request
  return app(req, res);
}
```

**OR** use a simpler approach with `api/[...path].ts` to catch all API routes:

```typescript
/**
 * Vercel Serverless Function - Catch-all for API routes
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../server/index';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Forward all requests to Express app
  return app(req, res);
}
```

### Step 4: Install Vercel Types

```bash
pnpm add -D @vercel/node
```

### Step 5: Update Environment Variables in Vercel

Go to Vercel Dashboard → Settings → Environment Variables and add:

```env
# Backend
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://smartpro-docs.vercel.app
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8

# Frontend
VITE_API_URL=https://smartpro-docs.vercel.app/api
```

**Note:** Since backend and frontend are on the same domain, `VITE_API_URL` should be `/api` (relative) or the full Vercel URL.

### Step 6: Deploy

```bash
vercel --prod
```

Or push to GitHub (if auto-deploy is enabled).

---

## ⚠️ Important Considerations

### Express App Compatibility

Your Express app (`server/index.ts`) uses:
- `app.listen()` - This won't work in serverless
- `require.main === module` - This check needs adjustment

**Fix:** Update `server/index.ts`:

```typescript
// At the end of server/index.ts, replace:
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`, {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
    });
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// With:
// Only start server if not in serverless environment
if (require.main === module && !process.env.VERCEL) {
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`, {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
    });
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}
```

---

## 🔄 Alternative: Simpler Vercel Setup

If the above seems complex, you can create individual serverless functions for each route:

### Create `api/consultation.ts`:

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import consultationRoutes from '../server/routes/consultationRoutes';
import express from 'express';

const app = express();
app.use(express.json());
app.use('/api/consultation', consultationRoutes);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  return app(req, res);
}
```

But this requires duplicating middleware setup for each route.

---

## ✅ Recommended: Use Option 2 (Separate Deployment)

**Why?**
- ✅ Simpler setup (no code changes needed)
- ✅ Better for Express apps (designed for long-running processes)
- ✅ Easier debugging and monitoring
- ✅ No cold start issues
- ✅ Can use WebSockets if needed later

**Steps:**
1. Deploy backend to Railway/Render (see PRODUCTION_DEPLOYMENT_GUIDE.md)
2. Set `VITE_API_URL` in Vercel to point to backend URL
3. Done!

---

## 🧪 Testing

### Test Backend on Vercel:

```bash
# Health check
curl https://smartpro-docs.vercel.app/api/health

# Consultation endpoint
curl -X POST https://smartpro-docs.vercel.app/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "services": ["accounting"],
    "language": "en"
  }'
```

---

## 📋 Checklist

- [ ] Create `api/index.ts` or `api/[...path].ts`
- [ ] Install `@vercel/node`
- [ ] Update `vercel.json` with API rewrites
- [ ] Fix `server/index.ts` to skip `app.listen()` in serverless
- [ ] Set environment variables in Vercel
- [ ] Deploy and test
- [ ] Verify `/api/health` works
- [ ] Test form submission

---

**Current Status:** Backend exists but needs Vercel configuration OR separate deployment

