# ✅ Single Sign-On Setup Checklist

**Complete this checklist to enable SSO across all platforms.**

---

## 📋 Setup Steps

### ✅ Step 1: BusinessHub (This Repository)

- [x] **Environment variables configured** (`.env` file created)
- [x] **Client uses `storageKey: 'sb-auth-token'`** (already done)
- [x] **Server updated** (removed hardcoded project reference)
- [ ] **`.env` file created** (copy from `.env.example`)

**Status:** ✅ Ready (just need to create `.env` file)

---

### ⚠️ Step 2: Contract-Management-System

- [ ] **Found Supabase client file** (use `FIND_SUPABASE_CLIENT_FILES.md`)
- [ ] **Updated with `storageKey: 'sb-auth-token'`**
- [ ] **Verified same Supabase project** (`reootcngcptfogfozlmz`)
- [ ] **Restarted development server**

**Status:** ❌ **NOT CONFIGURED YET** - **REQUIRED**

**See:** `UPDATE_OTHER_PLATFORMS_FOR_SSO.md`

---

### ⚠️ Step 3: business-services-hub

- [ ] **Found Supabase client file** (use `FIND_SUPABASE_CLIENT_FILES.md`)
- [ ] **Updated with `storageKey: 'sb-auth-token'`**
- [ ] **Verified same Supabase project** (`reootcngcptfogfozlmz`)
- [ ] **Restarted development server**

**Status:** ❌ **NOT CONFIGURED YET** - **REQUIRED**

**See:** `UPDATE_OTHER_PLATFORMS_FOR_SSO.md`

---

## 🧪 Testing

**After completing all steps:**

- [ ] **Clear browser cache** (important!)
- [ ] **Login** on Contract-Management-System
- [ ] **Open** business-services-hub → Should be logged in ✅
- [ ] **Open** BusinessHub → Should be logged in ✅
- [ ] **Logout** from one platform → Should logout from all ✅

---

## 📚 Reference Documents

- **`UPDATE_OTHER_PLATFORMS_FOR_SSO.md`** - How to update other platforms
- **`FIND_SUPABASE_CLIENT_FILES.md`** - How to find Supabase client files
- **`SUPABASE_UNIFICATION_COMPLETE.md`** - Full technical details
- **`QUICK_START_SSO.md`** - Quick reference guide

---

## 🎯 Current Status

**BusinessHub:** ✅ Ready  
**Contract-Management-System:** ✅ Same user works, but needs SSO update  
**business-services-hub:** ✅ Same user works, but needs SSO update  

**Current:** Same credentials work, but need to log in separately  
**After Update:** Login once, automatically logged in everywhere! 🚀

**Next Action:** Update Contract-Management-System and business-services-hub with `storageKey: 'sb-auth-token'`

---

**Once all platforms are updated, single sign-on will work!** 🚀

