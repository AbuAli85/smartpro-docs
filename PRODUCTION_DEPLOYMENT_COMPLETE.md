# Complete Production Deployment Guide

## 🎯 Overview

This guide covers everything needed to deploy your application to production with proper configuration, environment variables, and optimizations.

---

## 📋 Prerequisites

- ✅ Node.js 20.x installed
- ✅ All dependencies installed (`pnpm install`)
- ✅ Database configured (Supabase)
- ✅ Environment variables ready

---

## 🏗️ Step 1: Build for Production

### 1.1 Build Frontend

```bash
# Build the frontend (creates optimized production bundle)
pnpm build
```

**What this does:**
- Compiles TypeScript
- Bundles React code
- Minifies JavaScript/CSS
- Optimizes assets
- Outputs to `dist/` directory

### 1.2 Verify Build Output

```bash
# Check dist folder was created
ls -la dist/

# Should see:
# - index.html
# - assets/ (JS, CSS files)
# - Other static assets
```

### 1.3 Test Production Build Locally

```bash
# Preview production build
pnpm preview

# Or serve with a static server
npx serve dist
```

**Visit:** `http://localhost:4173` (or port shown)

---

## 🔧 Step 2: Environment Variables Setup

### 2.1 Create Production Environment File

Create `.env.production` in project root:

```env
# ============================================
# PRODUCTION ENVIRONMENT VARIABLES
# ============================================

# Server Configuration
NODE_ENV=production
PORT=3001

# Frontend URL (where your frontend is deployed)
FRONTEND_URL=https://your-domain.com

# Supabase Configuration
SUPABASE_URL=https://xavocdikwiimrjgybiai.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database (if using direct connection)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# API Configuration
VITE_API_URL=https://api.your-domain.com
# OR if backend is on same domain:
# VITE_API_URL=https://your-domain.com/api

# Make.com Webhook
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-webhook-url

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRY=24h
REFRESH_TOKEN_EXPIRY=7d

# Logging
LOG_LEVEL=info
LOG_REQUESTS_TO_DB=false

# Google Analytics (if using)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# CORS (comma-separated if multiple)
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

### 2.2 Frontend Environment Variables (Vite)

**Important:** Vite requires `VITE_` prefix for frontend variables.

```env
# Frontend can access these:
VITE_API_URL=https://api.your-domain.com
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true
```

### 2.3 Backend Environment Variables

Backend can access all variables (no prefix needed):

```env
# Backend can access these:
SUPABASE_URL=https://xavocdikwiimrjgybiai.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_key_here
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

---

## 🚀 Step 3: Backend Deployment

### Option A: Railway (Recommended - Easiest)

#### 3.1 Setup Railway

1. **Sign up:** https://railway.app
2. **Create new project**
3. **Deploy from GitHub:**
   - Connect your repository
   - Railway auto-detects Node.js

#### 3.2 Configure Railway

1. **Set Build Command:**
   ```
   pnpm install
   ```

2. **Set Start Command:**
   ```
   pnpm run server
   ```

3. **Set Root Directory:**
   ```
   ./
   ```

#### 3.3 Add Environment Variables in Railway

Go to **Variables** tab and add:

```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=https://xavocdikwiimrjgybiai.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=https://your-domain.com
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-webhook
JWT_SECRET=your-jwt-secret
LOG_LEVEL=info
```

#### 3.4 Deploy

Railway will automatically:
- Install dependencies
- Build the project
- Start the server
- Provide a URL like: `https://your-app.railway.app`

#### 3.5 Get Your Backend URL

After deployment, Railway provides:
- **Public URL:** `https://your-app.railway.app`
- Use this as your `VITE_API_URL` in frontend

---

### Option B: Render

#### 3.1 Setup Render

1. **Sign up:** https://render.com
2. **Create new Web Service**
3. **Connect GitHub repository**

#### 3.2 Configure Render

- **Build Command:** `pnpm install`
- **Start Command:** `pnpm run server`
- **Environment:** `Node`
- **Root Directory:** `./`

#### 3.3 Add Environment Variables

Same as Railway (see above)

#### 3.4 Deploy

Render will build and deploy automatically.

---

### Option C: Fly.io

#### 3.1 Install Fly CLI

```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# Mac/Linux
curl -L https://fly.io/install.sh | sh
```

#### 3.2 Login

```bash
fly auth login
```

#### 3.3 Initialize

```bash
fly launch
```

#### 3.4 Set Secrets

```bash
fly secrets set NODE_ENV=production
fly secrets set PORT=3001
fly secrets set SUPABASE_URL=https://xavocdikwiimrjgybiai.supabase.co
fly secrets set SUPABASE_SERVICE_ROLE_KEY=your_key
fly secrets set FRONTEND_URL=https://your-domain.com
# ... add all other variables
```

#### 3.5 Deploy

```bash
fly deploy
```

---

## 🌐 Step 4: Frontend Deployment

### Option A: Vercel (Recommended)

#### 4.1 Install Vercel CLI

```bash
npm i -g vercel
```

#### 4.2 Login

```bash
vercel login
```

#### 4.3 Configure Vercel

Create `vercel.json` in project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "https://your-backend.railway.app"
  }
}
```

#### 4.4 Add Environment Variables in Vercel Dashboard

Go to **Settings** → **Environment Variables**:

```env
VITE_API_URL=https://your-backend.railway.app
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true
```

#### 4.5 Deploy

```bash
# Deploy to production
vercel --prod

# Or connect GitHub for auto-deploy
```

---

### Option B: Netlify

#### 4.1 Install Netlify CLI

```bash
npm i -g netlify-cli
```

#### 4.2 Create `netlify.toml`

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 4.3 Deploy

```bash
netlify deploy --prod
```

#### 4.4 Add Environment Variables

In Netlify dashboard → **Site settings** → **Environment variables**

---

## 🔍 Step 5: Update Frontend API URL

### 5.1 Update API Configuration

Check where your frontend makes API calls. Update to use production API URL:

**Example:** If you have an API client file:

```typescript
// client/src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_URL,
});
```

### 5.2 Update Vite Config (if needed)

```typescript
// vite.config.ts
export default defineConfig({
  // ... existing config
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:3001'
    ),
  },
});
```

---

## ✅ Step 6: Production Checklist

### 6.1 Pre-Deployment Checks

- [ ] **Build succeeds:** `pnpm build` completes without errors
- [ ] **Type checking:** `pnpm check` passes
- [ ] **Environment variables:** All required vars set
- [ ] **Database connection:** Tested and working
- [ ] **API endpoints:** All routes tested
- [ ] **CORS configured:** Frontend URL whitelisted
- [ ] **Error handling:** Proper error messages (no stack traces in prod)

### 6.2 Security Checks

- [ ] **Secrets:** No secrets in code or git
- [ ] **HTTPS:** All connections use HTTPS
- [ ] **CORS:** Properly configured (not `*`)
- [ ] **Rate limiting:** Enabled on API
- [ ] **Input validation:** All inputs validated
- [ ] **Error messages:** Don't expose sensitive info

### 6.3 Performance Checks

- [ ] **Build size:** Check bundle size (`dist/assets/`)
- [ ] **Image optimization:** Images compressed
- [ ] **Code splitting:** Large chunks split
- [ ] **Caching:** Proper cache headers
- [ ] **CDN:** Static assets on CDN (if applicable)

### 6.4 Testing

- [ ] **Test production build locally:** `pnpm preview`
- [ ] **Test all pages:** Navigate through entire app
- [ ] **Test API calls:** Verify backend connection
- [ ] **Test forms:** Submit test data
- [ ] **Test on mobile:** Responsive design works
- [ ] **Test in different browsers:** Chrome, Firefox, Safari, Edge

---

## 🧪 Step 7: Test Production Build Locally

### 7.1 Build and Preview

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

### 7.2 Test with Production API

```bash
# Set production API URL
export VITE_API_URL=https://your-backend.railway.app

# Build
pnpm build

# Preview
pnpm preview
```

### 7.3 Test Backend Locally (Production Mode)

```bash
# Set production environment
export NODE_ENV=production
export SUPABASE_URL=https://xavocdikwiimrjgybiai.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=your_key

# Start server
pnpm run server
```

---

## 📊 Step 8: Monitoring & Logging

### 8.1 Backend Logging

Your server already has Winston logger configured. Check logs:

**Railway:**
- Go to service → **Logs** tab

**Render:**
- Go to service → **Logs** tab

**Fly.io:**
```bash
fly logs
```

### 8.2 Frontend Error Tracking

Consider adding Sentry (already in dependencies):

```typescript
// client/src/main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "your-sentry-dsn",
    environment: "production",
  });
}
```

### 8.3 Health Checks

Your backend has a health endpoint:

```bash
# Check backend health
curl https://your-backend.railway.app/health

# Should return:
# {
#   "status": "ok",
#   "timestamp": "2024-01-01T00:00:00.000Z",
#   "uptime": 12345
# }
```

---

## 🐛 Step 9: Troubleshooting

### Issue 1: Frontend Can't Connect to Backend

**Symptoms:**
- `ERR_CONNECTION_REFUSED`
- CORS errors
- 404 on API routes

**Solutions:**
1. Check `VITE_API_URL` is set correctly
2. Verify backend is running
3. Check CORS configuration in backend
4. Verify `FRONTEND_URL` in backend matches frontend domain

### Issue 2: Environment Variables Not Working

**Symptoms:**
- Variables show as `undefined`
- Still using `localhost`

**Solutions:**
1. **Vite:** Variables must start with `VITE_`
2. **Rebuild:** After changing env vars, rebuild frontend
3. **Check:** `console.log(import.meta.env)` to see available vars

### Issue 3: Build Fails

**Symptoms:**
- TypeScript errors
- Missing dependencies
- Build timeout

**Solutions:**
1. Run `pnpm install` to ensure dependencies installed
2. Check TypeScript errors: `pnpm check`
3. Clear cache: `rm -rf node_modules dist && pnpm install`

### Issue 4: Database Connection Fails

**Symptoms:**
- `Error: supabaseKey is required`
- Connection timeout

**Solutions:**
1. Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
2. Check Supabase dashboard for correct values
3. Verify network access (firewall, IP restrictions)

---

## 📝 Step 10: Production Scripts

Add these to `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "build:server": "tsc --project tsconfig.server.json",
    "preview": "vite preview",
    "start": "node dist/server/index.js",
    "start:server": "node --loader ts-node/esm server/index.ts",
    "deploy": "pnpm build && vercel --prod",
    "deploy:server": "fly deploy"
  }
}
```

---

## 🎯 Quick Start Commands

```bash
# 1. Install dependencies
pnpm install

# 2. Build frontend
pnpm build

# 3. Test production build locally
pnpm preview

# 4. Deploy frontend (Vercel)
vercel --prod

# 5. Deploy backend (Railway/Render/Fly.io)
# Follow platform-specific instructions above
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT secrets** (32+ characters, random)
3. **Enable HTTPS** everywhere
4. **Set proper CORS** (not `*`)
5. **Enable rate limiting**
6. **Validate all inputs**
7. **Sanitize user data**
8. **Use environment-specific keys**
9. **Rotate secrets regularly**
10. **Monitor for suspicious activity**

---

## 📚 Additional Resources

- **Vite Production Guide:** https://vitejs.dev/guide/build.html
- **Vercel Deployment:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs
- **Fly.io Docs:** https://fly.io/docs

---

## ✅ Final Checklist

Before going live:

- [ ] All environment variables set
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] API connection tested
- [ ] Database connection working
- [ ] Forms submit successfully
- [ ] Error handling tested
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Monitoring set up
- [ ] Backup strategy in place

---

**Your application is now ready for production! 🚀**

