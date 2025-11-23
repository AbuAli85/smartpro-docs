# Vercel Deployment Guide

## 🚀 Deploy Frontend to Vercel

Your frontend is already deployed at: **https://smartpro-docs.vercel.app/replies**

## 🔧 Configuration

### 1. Environment Variables

In your Vercel project settings, add:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

**For local development:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. Backend Deployment

You need to deploy your backend API. Options:

#### Option A: Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Connect your GitHub repo
4. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PORT=5000`
   - `FRONTEND_URL=https://smartpro-docs.vercel.app`
5. Deploy

#### Option B: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Add environment variables
5. Deploy

#### Option C: Deploy to Vercel (Serverless Functions)
Convert backend to Vercel serverless functions

### 3. Update Frontend API URL

Once backend is deployed, update Vercel environment variable:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
```

## 📋 Checklist

- [ ] Backend deployed and running
- [ ] Environment variables configured in Vercel
- [ ] API URL updated in frontend
- [ ] CORS configured in backend (allow Vercel domain)
- [ ] Test webhook endpoints
- [ ] Test frontend API calls

## 🔗 Current Setup

- **Frontend:** https://smartpro-docs.vercel.app/replies ✅
- **Backend:** Needs deployment
- **Database:** Supabase (configured)

## 🎯 Next Steps

1. Deploy backend to Railway/Render
2. Update `NEXT_PUBLIC_API_URL` in Vercel
3. Test the complete flow
4. Monitor for errors

---

**Your frontend is live! Now deploy the backend and connect them!** 🚀

