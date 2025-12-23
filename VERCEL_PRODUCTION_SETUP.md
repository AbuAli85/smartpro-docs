# Vercel Production Setup - Quick Guide

## 🎯 Current Issue

The production site at `https://smartpro-docs.vercel.app` is trying to connect to `localhost:3001` for API calls, which won't work in production.

## ✅ Fix Applied

Code has been updated to use relative paths in production. Now you need to configure Vercel.

---

## 🚀 Quick Fix (2 Options)

### Option 1: Backend on Same Domain (Easiest)

If your backend is deployed as Vercel serverless functions:

1. **No configuration needed!** ✅
2. The relative path `/api` will work automatically
3. Just redeploy:
   ```bash
   git add .
   git commit -m "Fix production API URLs"
   git push
   ```
   Vercel will auto-deploy

### Option 2: Backend on Separate Domain (Railway/Render)

If your backend is on a separate domain (e.g., `https://your-backend.railway.app`):

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project: `smartpro-docs`

2. **Add Environment Variable:**
   - Go to: **Settings** → **Environment Variables**
   - Click **Add New**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app/api`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click **⋯** (three dots) on latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger deployment

---

## 🔍 How to Check Your Backend URL

### If Using Railway:
1. Go to https://railway.app
2. Select your project
3. Click on your backend service
4. Copy the **Public URL** (e.g., `https://your-app.railway.app`)

### If Using Render:
1. Go to https://render.com
2. Select your service
3. Copy the **URL** shown at the top

### If Using Fly.io:
1. Run: `fly status`
2. Or check dashboard for your app URL

---

## ✅ Verification Steps

After setting up:

1. **Wait for deployment to complete** (usually 1-2 minutes)

2. **Test the page:**
   - Visit: `https://smartpro-docs.vercel.app/consultation/thanks?id=sub_1766506210570&email=test@example.com`

3. **Check browser console:**
   - Press F12
   - Go to **Console** tab
   - Should see: `✅ Consultation data fetched from database:`
   - **No errors** about `localhost` or `CORS`

4. **Check Network tab:**
   - Press F12 → **Network** tab
   - Refresh page
   - Look for API calls
   - Should see calls to `/api/consultation/...` or your backend URL
   - Status should be **200** (success)

---

## 🐛 Troubleshooting

### Still seeing localhost errors?

1. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Hard refresh: Ctrl+F5

2. **Verify environment variable:**
   - Go to Vercel → Settings → Environment Variables
   - Check `VITE_API_URL` is set
   - **Important:** Must start with `VITE_` prefix!

3. **Redeploy:**
   - Go to Deployments
   - Redeploy latest deployment

### CORS errors?

1. **Check backend CORS settings:**
   - Backend should allow: `https://smartpro-docs.vercel.app`
   - Set `FRONTEND_URL` in backend environment variables

2. **Verify backend is running:**
   - Test: `https://your-backend.com/health`
   - Should return: `{"status":"ok",...}`

### 404 on API routes?

1. **Check backend URL:**
   - Verify backend is accessible
   - Test health endpoint

2. **Check API route:**
   - Backend should have route: `/api/consultation/:id`
   - Test: `https://your-backend.com/api/consultation/test-id`

---

## 📋 Checklist

- [ ] Code changes pushed to Git
- [ ] Vercel auto-deployed (or manually redeployed)
- [ ] Environment variable set (if backend on separate domain)
- [ ] Tested thank you page
- [ ] No console errors
- [ ] API calls successful (200 status)
- [ ] Consultation data displays correctly

---

## 🎯 Summary

**What was fixed:**
- ✅ API URLs now use relative paths in production
- ✅ No more hardcoded `localhost` fallbacks
- ✅ Works with or without `VITE_API_URL` set

**What you need to do:**
1. If backend on separate domain: Set `VITE_API_URL` in Vercel
2. Redeploy (or wait for auto-deploy)
3. Test the page

**That's it!** 🚀

