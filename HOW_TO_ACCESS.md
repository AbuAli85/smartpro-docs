# How to Access the System

## 🌐 **Frontend Dashboard**

### **Production (Deployed):**
- **URL:** https://smartpro-docs.vercel.app/replies
- **Status:** ✅ Live and deployed
- **Features:**
  - View all email replies
  - Filter by status and email
  - View conversation details
  - Send provider replies
  - Analytics dashboard

### **Local Development:**
```bash
cd frontend
npm install
npm run dev
```
- **URL:** http://localhost:3000/replies
- **Note:** Requires backend API to be running

---

## 🔧 **Backend API**

### **Local Development:**
```bash
cd backend
npm install
# Create .env file with Supabase credentials
npm run dev
```
- **URL:** http://localhost:5000
- **Health Check:** http://localhost:5000/health
- **API Base:** http://localhost:5000/api

### **Production (Needs Deployment):**
- **Deploy to:** Railway, Render, or Vercel
- **After deployment:** Update `NEXT_PUBLIC_API_URL` in Vercel

---

## 📊 **Supabase Database**

### **Access Dashboard:**
1. **Go to:** https://reootcngcptfogfozlmz.supabase.co
2. **Login** with your Supabase account
3. **Navigate to:**
   - **Table Editor** - View/edit data
   - **SQL Editor** - Run queries
   - **API Settings** - Get credentials

### **View Data:**
- **Submissions:** `submissions` table
- **Client Replies:** `client_replies` table
- **Provider Replies:** `provider_replies` table

---

## 🔗 **API Endpoints**

### **Webhooks (For Make.com):**
```
POST /api/webhooks/client-reply
POST /api/webhooks/provider-reply
```

### **Replies API:**
```
GET  /api/replies                    - Get all replies
GET  /api/replies/conversation/:id   - Get conversation
GET  /api/replies/client/:email      - Get replies by email
```

### **Analytics:**
```
GET  /api/analytics                  - Get statistics
```

### **Health Check:**
```
GET  /health                         - Check API status
```

---

## 🧪 **Testing Access**

### **1. Test Frontend:**
```bash
# Open in browser
https://smartpro-docs.vercel.app/replies
```

### **2. Test Backend (Local):**
```bash
# Start backend
cd backend
npm run dev

# Test health endpoint
curl http://localhost:5000/health

# Test analytics
curl http://localhost:5000/api/analytics
```

### **3. Test Webhook:**
```bash
curl -X POST http://localhost:5000/api/webhooks/client-reply \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "from": "test@example.com",
    "message": "Test reply",
    "subject": "Re: Test",
    "timestamp": "2025-11-23T20:00:00Z"
  }'
```

---

## 📱 **Access Points Summary**

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend (Production)** | https://smartpro-docs.vercel.app/replies | ✅ Live |
| **Frontend (Local)** | http://localhost:3000/replies | ⚙️ Dev |
| **Backend (Local)** | http://localhost:5000/api | ⚙️ Dev |
| **Backend (Production)** | TBD (needs deployment) | ⏳ Pending |
| **Supabase Dashboard** | https://reootcngcptfogfozlmz.supabase.co | ✅ Live |
| **Make.com Webhooks** | Configured in Make.com | ✅ Active |

---

## 🔐 **Credentials Needed**

### **For Backend (.env):**
```env
SUPABASE_URL=https://reootcngcptfogfozlmz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=5000
FRONTEND_URL=https://smartpro-docs.vercel.app
```

### **For Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Or production URL after backend deployment
```

### **Get Supabase Keys:**
1. Go to: https://reootcngcptfogfozlmz.supabase.co
2. Settings → API
3. Copy:
   - Project URL
   - service_role key (for backend)
   - anon key (for frontend if needed)

---

## 🚀 **Quick Start**

### **Option 1: Use Production Frontend**
1. **Open:** https://smartpro-docs.vercel.app/replies
2. **Note:** Backend needs to be deployed first

### **Option 2: Run Locally**
```bash
# Terminal 1: Backend
cd backend
npm install
# Create .env with Supabase credentials
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
# Create .env.local with API URL
npm run dev

# Open browser
http://localhost:3000/replies
```

---

## 📋 **Troubleshooting**

### **Frontend shows "API Error":**
- ✅ Check backend is running
- ✅ Verify `NEXT_PUBLIC_API_URL` is correct
- ✅ Check CORS settings in backend

### **Backend won't start:**
- ✅ Check `.env` file exists
- ✅ Verify Supabase credentials
- ✅ Check database tables are created

### **No data showing:**
- ✅ Check Supabase tables have data
- ✅ Verify webhook endpoints are working
- ✅ Check browser console for errors

---

## 🎯 **Next Steps**

1. **Deploy Backend** to Railway/Render
2. **Update Vercel** environment variable with backend URL
3. **Test Complete Flow:**
   - Send test webhook
   - Check frontend updates
   - Verify Supabase data

---

**Your frontend is accessible at: https://smartpro-docs.vercel.app/replies** 🚀

