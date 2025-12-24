# Supabase Single Sign-On Setup Guide

**Date:** 2025-01-17  
**Status:** Configure BusinessHub to match other platforms  
**Goal:** One login works across all three platforms

---

## ✅ Current Status

**Good News:**
- ✅ BusinessHub already has Supabase configured
- ✅ Contract-Management-System has Supabase configured
- ✅ business-services-hub has Supabase configured

**What We Fixed:**
- ✅ Added `storageKey: 'sb-auth-token'` to BusinessHub
- ✅ This matches the storage key used by other platforms

---

## 🔧 Configuration Steps

### Step 1: Verify Environment Variables

**BusinessHub needs these environment variables:**

Create or update `.env` file in project root:
```env
# Supabase Configuration (MUST match other platforms)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:**
- ✅ Must be **SAME** Supabase project as other platforms
- ✅ Must be **SAME** URL
- ✅ Must be **SAME** anon key

---

### Step 2: Verify Storage Key (Already Fixed)

**BusinessHub:** ✅ Updated to use `storageKey: 'sb-auth-token'`

**Other Platforms:** Should also use `storageKey: 'sb-auth-token'`

**Check Contract-Management-System:**
```typescript
// lib/supabase/client.ts
export const supabase = createClient(url, key, {
  auth: {
    storageKey: 'sb-auth-token', // ← Should be this
  }
})
```

**Check business-services-hub:**
```typescript
// lib/supabase/client.ts
export const supabase = createClient(url, key, {
  auth: {
    storageKey: 'sb-auth-token', // ← Should be this
  }
})
```

---

### Step 3: Verify Domain Setup

**For localStorage to work, all platforms should be on same domain:**

**Option A: Same Domain (Recommended)**
```
businesshub.thesmartpro.io
contracts.thesmartpro.io (or subdomain)
services.thesmartpro.io (or subdomain)
```

**Option B: Same Parent Domain**
```
*.thesmartpro.io
```

**If different domains, we need cookies (see advanced setup below).**

---

## 🧪 Testing Single Sign-On

### Test Flow:

1. **Login on Contract-Management-System**
   - Go to Contract-Management-System
   - Login with your credentials
   - Session stored in localStorage with key `sb-auth-token`

2. **Open BusinessHub in new tab**
   - Go to businesshub.thesmartpro.io
   - Should automatically detect session
   - Should be logged in ✅

3. **Open business-services-hub in new tab**
   - Go to services platform
   - Should automatically detect session
   - Should be logged in ✅

4. **Test Logout**
   - Logout from any platform
   - Should logout from all platforms ✅

---

## 📋 Verification Checklist

### BusinessHub:
- [x] Supabase client configured ✅
- [x] Storage key set to `sb-auth-token` ✅
- [ ] Environment variables set (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Same Supabase project as other platforms
- [ ] Test login works

### Contract-Management-System:
- [ ] Verify storage key is `sb-auth-token`
- [ ] Verify using same Supabase project
- [ ] Test login works

### business-services-hub:
- [ ] Verify storage key is `sb-auth-token`
- [ ] Verify using same Supabase project
- [ ] Test login works

### Cross-Platform Test:
- [ ] Login on Platform 1
- [ ] Open Platform 2 → Should be logged in
- [ ] Open Platform 3 → Should be logged in
- [ ] Logout from any → Should logout from all

---

## 🔍 How to Check Storage Key in Other Platforms

### Contract-Management-System:
**File:** `lib/supabase/client.ts` or similar

**Look for:**
```typescript
storageKey: 'sb-auth-token' // ← Should be this
```

**If different, update to:**
```typescript
storageKey: 'sb-auth-token'
```

### business-services-hub:
**File:** `lib/supabase/client.ts` or similar

**Look for:**
```typescript
storageKey: 'sb-auth-token' // ← Should be this
```

**If different, update to:**
```typescript
storageKey: 'sb-auth-token'
```

---

## 🚨 Troubleshooting

### Problem: Login doesn't work across platforms

**Check 1: Same Supabase Project?**
```bash
# Check environment variables in all platforms
# Should be SAME URL and SAME anon key
```

**Check 2: Same Storage Key?**
```bash
# All platforms should use: storageKey: 'sb-auth-token'
```

**Check 3: Same Domain?**
```bash
# All platforms should be on same domain or subdomain
# Or use cookies for cross-domain
```

### Problem: Session not persisting

**Solution:**
- Check `persistSession: true` in all platforms
- Check `autoRefreshToken: true` in all platforms
- Verify localStorage is accessible

### Problem: Different domains

**Solution:**
- Use cookies instead of localStorage
- Set cookie for parent domain: `.thesmartpro.io`
- All subdomains can read it

---

## 🔧 Advanced: Cross-Domain Setup (If Needed)

**If platforms are on different domains:**

### Update BusinessHub Supabase Client:
```typescript
// client/src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

// Custom storage that uses cookies for cross-domain
const crossDomainStorage = {
  getItem: (key: string) => {
    // Try localStorage first
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(key)
      if (local) return local
    }
    // Try cookie
    return getCookie(key)
  },
  setItem: (key: string, value: string) => {
    // Set in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value)
    }
    // Set in cookie for cross-domain
    setCookie(key, value, {
      domain: '.thesmartpro.io',
      path: '/',
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
    deleteCookie(key, { domain: '.thesmartpro.io' })
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'sb-auth-token',
    storage: typeof window !== 'undefined' ? crossDomainStorage : undefined,
  },
})
```

---

## ✅ What We've Done

1. ✅ **Updated BusinessHub Supabase client** - Added `storageKey: 'sb-auth-token'`
2. ✅ **Added comments** - Explaining SSO configuration
3. ✅ **Created setup guide** - This document

---

## 🎯 Next Steps

### 1. Set Environment Variables

**In BusinessHub `.env` file:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Must match the Supabase project used by other platforms!

### 2. Verify Other Platforms

**Check Contract-Management-System:**
- Storage key is `sb-auth-token`
- Using same Supabase project

**Check business-services-hub:**
- Storage key is `sb-auth-token`
- Using same Supabase project

### 3. Test Single Sign-On

1. Login on one platform
2. Open other platforms
3. Should be logged in automatically ✅

---

## 📞 Need Help?

**If single sign-on doesn't work:**

1. **Check environment variables** - Same Supabase project?
2. **Check storage keys** - All using `sb-auth-token`?
3. **Check domains** - Same domain or subdomain?
4. **Check browser console** - Any errors?

**Tell me what you find and I'll help fix it!** 🚀

