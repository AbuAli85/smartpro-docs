# 🚀 Quick Start: Single Sign-On Setup

**Status:** ✅ Configuration Complete - Ready to Use

---

## ⚡ Quick Setup (2 Steps)

### Step 1: Create `.env` File

**Copy the example:**
```bash
# Windows PowerShell
Copy-Item .env.example .env
```

**Or manually create `.env` in root directory with:**
```env
VITE_SUPABASE_URL=https://reootcngcptfogfozlmz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb290Y25nY3B0Zm9nZm96bG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NDQzODIsImV4cCI6MjA2OTAyMDM4Mn0.WQwDpYX2M4pyPaliUqTinwy1xWWFKm4OntN2HUfP6n0

SUPABASE_URL=https://reootcngcptfogfozlmz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb290Y25nY3B0Zm9nZm96bG16Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ0NDM4MiwiZXhwIjoyMDY5MDIwMzgyfQ.BTLA-2wwXJgjW6MKoaw2ERbCr_fXF9w4zgLb70_5DAE
```

### Step 2: Restart Services

```bash
# Stop current services (Ctrl+C)
# Then restart:

# Client
cd client
npm run dev

# Server (if running)
cd server
npm run dev
```

---

## ✅ Test Single Sign-On

**⚠️ IMPORTANT: Update other platforms first! (See above)**

1. **Update** Contract-Management-System and business-services-hub with `storageKey: 'sb-auth-token'`
2. **Restart** all platforms
3. **Login** on Contract-Management-System (or business-services-hub)
4. **Open** BusinessHub in the same browser
5. **Expected:** You should be automatically logged in! 🎉

---

## 🔍 Verify It's Working

**Check browser console:**
- No Supabase connection errors
- Session token present in localStorage

**Check server logs:**
- "✅ Supabase client connected successfully"
- No connection errors

---

## ⚠️ CRITICAL: Update Other Platforms First!

**Current Status:** ✅ Same user credentials already work across platforms  
**Missing:** ⚠️ Automatic session sharing (need to log in separately)

**You MUST update them to enable automatic SSO:**

1. **Find Supabase client file** in each platform (see `FIND_SUPABASE_CLIENT_FILES.md`)
2. **Add this configuration:**
   ```typescript
   export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
     auth: {
       persistSession: true,
       autoRefreshToken: true,
       detectSessionInUrl: true,
       storageKey: 'sb-auth-token',  // ← CRITICAL for SSO
       storage: typeof window !== 'undefined' ? window.localStorage : undefined,
     },
   })
   ```
3. **See `UPDATE_OTHER_PLATFORMS_FOR_SSO.md` for detailed instructions**

---

## 🐛 Troubleshooting

**"Missing Supabase environment variables"**
→ Create `.env` file in root directory

**Single sign-on not working**
→ Verify all platforms use `storageKey: 'sb-auth-token'`

**Server can't connect**
→ Check `.env` file has `SUPABASE_SERVICE_ROLE_KEY`

---

**That's it!** 🚀 Single sign-on should now work across all platforms.

