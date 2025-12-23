# Production Quick Start Guide

## 🚀 Fast Track to Production

### Step 1: Build Frontend (2 minutes)

```bash
# Build optimized production bundle
pnpm build
```

**Output:** Creates `dist/` folder with optimized files

---

### Step 2: Test Production Build Locally (1 minute)

```bash
# Preview production build
pnpm preview
```

**Visit:** `http://localhost:4173`

**Check:**
- ✅ Page loads
- ✅ No console errors
- ✅ API calls work (if backend running)
- ✅ All pages accessible

---

### Step 3: Set Environment Variables

#### For Frontend (Vercel/Netlify):

```env
VITE_API_URL=https://your-backend-url.com
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### For Backend (Railway/Render/Fly.io):

```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=https://xavocdikwiimrjgybiai.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=https://your-frontend-url.com
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-webhook
JWT_SECRET=your-secret-key
```

---

### Step 4: Deploy Backend

#### Railway (Easiest):

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repo
4. Add environment variables (see Step 3)
5. Deploy → Get URL: `https://your-app.railway.app`

#### Render:

1. Go to https://render.com
2. New Web Service
3. Connect GitHub
4. Build: `pnpm install`
5. Start: `pnpm run server`
6. Add environment variables
7. Deploy

---

### Step 5: Deploy Frontend

#### Vercel (Easiest):

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Or use Vercel Dashboard:**
1. Connect GitHub repo
2. Set build command: `pnpm build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy

---

### Step 6: Update Frontend API URL

After backend is deployed, update frontend environment variable:

```env
VITE_API_URL=https://your-backend.railway.app
```

Then redeploy frontend.

---

### Step 7: Verify Everything Works

1. **Visit your frontend URL**
2. **Test form submission**
3. **Check browser console** (no errors)
4. **Check backend logs** (requests coming through)
5. **Test all pages**

---

## ✅ Production Checklist

- [ ] Frontend builds successfully (`pnpm build`)
- [ ] Production preview works (`pnpm preview`)
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] API connection works
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] Mobile responsive
- [ ] HTTPS enabled

---

## 🐛 Common Issues

### "Cannot connect to API"

**Fix:** Set `VITE_API_URL` in frontend environment variables

### "CORS error"

**Fix:** Set `FRONTEND_URL` in backend environment variables

### "Environment variable undefined"

**Fix:** 
- Frontend: Must use `VITE_` prefix
- Rebuild after changing env vars

---

## 📞 Need Help?

See full guide: `PRODUCTION_DEPLOYMENT_COMPLETE.md`

---

**You're ready for production! 🎉**

