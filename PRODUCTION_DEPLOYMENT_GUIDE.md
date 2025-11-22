# Production Deployment Guide

**Issue:** Frontend on Vercel is trying to connect to `localhost:3001`, which won't work in production.

---

## 🎯 Problem Summary

The consultation form on `https://smartpro-docs.vercel.app/consultation` is failing because:

1. **Frontend** is deployed on Vercel ✅
2. **Backend** needs to be deployed separately ❌
3. **API URL** environment variable not set in Vercel ❌

---

## 📋 Solution: Two-Step Deployment

### Step 1: Deploy Backend Server

The backend (`server/` directory) is an Express.js server that needs to run continuously. You have several options:

#### Option A: Railway (Recommended - Easy Setup)

1. **Sign up:** https://railway.app
2. **Create new project:** Click "New Project"
3. **Deploy from GitHub:**
   - Select your repository
   - Railway will auto-detect it's a Node.js app
4. **Set environment variables:**
   ```env
   PORT=3001
   NODE_ENV=production
   DATABASE_URL=your_database_url
   FRONTEND_URL=https://smartpro-docs.vercel.app
   MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
   ```
5. **Deploy:** Railway will build and deploy automatically
6. **Get your backend URL:** Railway provides a URL like `https://your-app.railway.app`

#### Option B: Render

1. **Sign up:** https://render.com
2. **Create new Web Service**
3. **Connect GitHub repository**
4. **Configure:**
   - **Build Command:** `npm install && npm run build:server` (or `pnpm install && pnpm run build:server`)
   - **Start Command:** `npm run server` (or `pnpm run server`)
   - **Environment:** `Node`
5. **Set environment variables** (same as Railway)
6. **Deploy**

#### Option C: Fly.io

1. **Install Fly CLI:** `curl -L https://fly.io/install.sh | sh`
2. **Login:** `fly auth login`
3. **Initialize:** `fly launch` (in your project root)
4. **Deploy:** `fly deploy`
5. **Set secrets:** `fly secrets set KEY=value`

#### Option D: DigitalOcean App Platform

1. **Create App** from GitHub repository
2. **Configure as Web Service**
3. **Set environment variables**
4. **Deploy**

---

### Step 2: Configure Frontend API URL

Once your backend is deployed, you need to tell the frontend where to find it.

#### In Vercel Dashboard:

1. Go to your project: https://vercel.com/dashboard
2. Click **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.com/api` (replace with your actual backend URL)
   - **Environment:** Production, Preview, Development (select all)
4. **Redeploy** your frontend (Vercel will automatically redeploy when you add env vars)

#### Example:

If your backend is deployed at `https://smartpro-api.railway.app`, set:
```
VITE_API_URL=https://smartpro-api.railway.app/api
```

---

## ✅ Verification Steps

### 1. Test Backend Health Endpoint

```bash
curl https://your-backend-url.com/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 123.456
}
```

### 2. Test Consultation Endpoint

```bash
curl -X POST https://your-backend-url.com/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "services": ["accounting"],
    "language": "en"
  }'
```

### 3. Test Frontend Form

1. Visit: `https://smartpro-docs.vercel.app/consultation`
2. Fill out the form
3. Submit
4. Check browser console (F12) for errors
5. Verify submission succeeds

---

## 🔧 Backend Deployment Checklist

### Before Deploying:

- [ ] **Database:** Set up production database (PostgreSQL recommended)
- [ ] **Environment Variables:** Prepare all required env vars
- [ ] **Make.com Webhook:** Verify webhook URL is correct
- [ ] **CORS:** Ensure `FRONTEND_URL` is set correctly
- [ ] **Build:** Test `npm run build:server` locally
- [ ] **Start:** Test `npm run server` locally

### Required Environment Variables:

```env
# Server
PORT=3001
NODE_ENV=production

# Database (if using Prisma)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# CORS
FRONTEND_URL=https://smartpro-docs.vercel.app

# Make.com
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8

# Optional: Logging
LOG_LEVEL=info
```

---

## 🚨 Common Issues & Fixes

### Issue 1: "Connection Refused" Error

**Symptom:** `ERR_CONNECTION_REFUSED` in browser console

**Cause:** Backend not deployed or `VITE_API_URL` not set

**Fix:**
1. Deploy backend to Railway/Render/Fly.io
2. Set `VITE_API_URL` in Vercel
3. Redeploy frontend

---

### Issue 2: CORS Error

**Symptom:** `Access to fetch at '...' has been blocked by CORS policy`

**Cause:** Backend `FRONTEND_URL` doesn't match frontend domain

**Fix:**
1. Set `FRONTEND_URL=https://smartpro-docs.vercel.app` in backend env vars
2. Restart backend server

---

### Issue 3: 404 on API Routes

**Symptom:** `404 Not Found` when calling `/api/consultation`

**Cause:** Backend routes not properly configured

**Fix:**
1. Check `server/index.ts` has routes mounted
2. Verify Express app is listening on correct port
3. Check deployment logs for errors

---

### Issue 4: Environment Variables Not Working

**Symptom:** Frontend still uses `localhost:3001`

**Cause:** Vercel needs rebuild after env var changes

**Fix:**
1. Go to Vercel dashboard
2. Click **Deployments**
3. Click **Redeploy** on latest deployment
4. Or trigger new deployment via Git push

---

## 📊 Monitoring & Debugging

### Backend Logs

**Railway:**
- Go to your service → **Logs** tab

**Render:**
- Go to your service → **Logs** tab

**Fly.io:**
```bash
fly logs
```

### Frontend Logs

**Vercel:**
- Go to deployment → **Functions** tab → View logs

### Test Backend Locally

```bash
# Terminal 1: Start backend
cd server
npm run dev:server

# Terminal 2: Test endpoint
curl http://localhost:3001/health
curl -X POST http://localhost:3001/api/consultation \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","services":["accounting"],"language":"en"}'
```

---

## 🎯 Quick Start (Railway Example)

### 1. Deploy Backend (5 minutes)

```bash
# Install Railway CLI (optional)
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project or create new
railway link

# Set environment variables
railway variables set PORT=3001
railway variables set NODE_ENV=production
railway variables set FRONTEND_URL=https://smartpro-docs.vercel.app
railway variables set MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8

# Deploy
railway up
```

### 2. Configure Frontend (2 minutes)

1. Get backend URL from Railway dashboard
2. Go to Vercel → Settings → Environment Variables
3. Add: `VITE_API_URL=https://your-app.railway.app/api`
4. Redeploy frontend

### 3. Test (1 minute)

1. Visit: `https://smartpro-docs.vercel.app/consultation`
2. Submit test form
3. Check browser console for errors
4. Verify submission in Make.com/Google Sheets

---

## 📝 Next Steps

1. ✅ Deploy backend to Railway/Render/Fly.io
2. ✅ Set `VITE_API_URL` in Vercel
3. ✅ Test form submission
4. ✅ Verify Make.com receives data
5. ✅ Check Google Sheets for new row
6. ✅ Monitor logs for errors

---

## 🔗 Useful Links

- **Railway:** https://railway.app
- **Render:** https://render.com
- **Fly.io:** https://fly.io
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Make.com Scenario:** https://eu2.make.com/public/shared-scenario/svWuhzmQvAy/smartpro-website-consultation-v2

---

**Status:** ⚠️ Backend needs deployment before production form will work

