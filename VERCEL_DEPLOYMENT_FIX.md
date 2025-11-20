# Vercel Deployment Fix

## Issue Fixed
- **Error**: `Function Runtimes must have a valid version, for example 'now-php@1.0.0'`
- **Cause**: Invalid `functions` configuration in `vercel.json`
- **Solution**: Removed `functions` section (frontend-only deployment)

## Deployment Architecture

### Frontend (Vercel) ✅
- **Location**: Vercel (static hosting)
- **Build**: `pnpm run build`
- **Output**: `dist/` directory
- **Configuration**: `vercel.json` (SPA rewrites only)

### Backend (Separate Deployment) ✅
- **Location**: Railway, Render, VPS, or Docker
- **Type**: Express.js server
- **Port**: 3001 (configurable)
- **Configuration**: See `server/DEPLOYMENT.md`

## Updated vercel.json

The file now only contains frontend deployment configuration:

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Why Separate Deployment?

1. **Vercel**: Optimized for static frontends and serverless functions
2. **Express Backend**: Needs persistent connection, database, WebSocket support
3. **Better Performance**: Backend can run on dedicated server
4. **Scalability**: Independent scaling of frontend and backend
5. **Cost**: Frontend is free on Vercel, backend can use cheaper options

## Alternative: Vercel Serverless Functions (Optional)

If you want to deploy backend on Vercel as serverless functions:

1. Create `api/` directory structure
2. Convert Express routes to individual serverless functions
3. Update `vercel.json` with proper function configuration

**Recommended**: Keep backend separate for better performance and features (WebSocket, persistent connections).

## Next Steps

1. ✅ Fixed `vercel.json` - should deploy now
2. Deploy backend separately (see `server/DEPLOYMENT.md`)
3. Update `VITE_API_URL` in frontend environment variables
4. Test full integration

---

**Status**: ✅ Frontend deployment should work now!
