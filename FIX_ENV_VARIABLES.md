# 🔧 Fix: Environment Variables Not Loading

**Error:** Client is trying to connect to old Supabase project (`xavocdikwiimrjgybiai`) instead of unified project (`reootcngcptfogfozlmz`)

**Cause:** Environment variables not being loaded by Vite

---

## 🎯 Quick Fix

### Option 1: Create `.env` in Client Directory (Recommended)

**Vite reads `.env` from the project root where `vite.config` is located.**

1. **Create `.env` file in `client/` directory:**

```bash
# Navigate to client directory
cd client

# Create .env file
```

**Content of `client/.env`:**
```env
VITE_SUPABASE_URL=https://reootcngcptfogfozlmz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb290Y25nY3B0Zm9nZm96bG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NDQzODIsImV4cCI6MjA2OTAyMDM4Mn0.WQwDpYX2M4pyPaliUqTinwy1xWWFKm4OntN2HUfP6n0
```

2. **Restart the dev server:**
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

---

### Option 2: Create `.env` in Root Directory

**If you prefer to keep it in root:**

1. **Create `.env` file in root directory** (same level as `client/` folder)

2. **Make sure it has:**
```env
VITE_SUPABASE_URL=https://reootcngcptfogfozlmz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb290Y25nY3B0Zm9nZm96bG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NDQzODIsImV4cCI6MjA2OTAyMDM4Mn0.WQwDpYX2M4pyPaliUqTinwy1xWWFKm4OntN2HUfP6n0
```

3. **Restart the dev server**

---

## ✅ Verify It's Working

**After creating `.env` and restarting:**

1. **Check browser console:**
   - Should NOT see "Missing Supabase environment variables" warning
   - Should see connection to `reootcngcptfogfozlmz.supabase.co` (not `xavocdikwiimrjgybiai`)

2. **Try logging in:**
   - Should connect to correct Supabase project
   - Should work with credentials from other platforms

3. **Check network tab:**
   - Login request should go to: `https://reootcngcptfogfozlmz.supabase.co/auth/v1/token`
   - NOT: `https://xavocdikwiimrjgybiai.supabase.co/auth/v1/token`

---

## 🐛 Troubleshooting

### Still seeing old project URL?

1. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache completely

2. **Verify `.env` file location:**
   - Should be in `client/` directory (where `vite.config.ts` is)
   - Or in root directory (same level as `client/`)

3. **Check file name:**
   - Must be exactly `.env` (not `.env.local`, `.env.example`, etc.)
   - No file extension

4. **Restart dev server:**
   - Vite only reads `.env` on startup
   - Must restart after creating/editing `.env`

5. **Check for typos:**
   - Variable names must be exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Must start with `VITE_` for Vite to expose them

---

## 📋 Quick Checklist

- [ ] `.env` file created in `client/` directory (or root)
- [ ] File contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Values point to `reootcngcptfogfozlmz.supabase.co`
- [ ] Dev server restarted after creating `.env`
- [ ] Browser cache cleared
- [ ] No console warnings about missing variables
- [ ] Login requests go to correct Supabase project

---

## 🎯 Expected Result

**Before:**
```
POST https://xavocdikwiimrjgybiai.supabase.co/auth/v1/token 400 (Bad Request)
```

**After:**
```
POST https://reootcngcptfogfozlmz.supabase.co/auth/v1/token 200 (OK)
```

---

**Once `.env` is created and server restarted, login should work!** 🚀

