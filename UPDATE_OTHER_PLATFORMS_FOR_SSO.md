# 🔧 Update Other Platforms for Single Sign-On

**Current Status:** ✅ Contract-Management-System and business-services-hub already work with the same user credentials (shared Supabase database)

**Issue:** ⚠️ You still need to **log in separately** on each platform - sessions are not shared automatically

**Solution:** Add `storageKey: 'sb-auth-token'` to enable automatic single sign-on (login once, access all platforms)

---

## 🎯 What Needs to Change

Both platforms need to update their Supabase client configuration to use:
```typescript
storageKey: 'sb-auth-token'
```

**Why?** This ensures all platforms share the same session storage key, so when you log in on one platform, you're automatically logged in on all platforms.

**Current Behavior:**
- ✅ Same user account works on all platforms
- ❌ Need to log in separately on each platform

**After Update:**
- ✅ Same user account works on all platforms
- ✅ Login once → automatically logged in everywhere!

---

## 📋 Step-by-Step Update Guide

### For Contract-Management-System

**1. Find the Supabase Client File**

Look for files like:
- `lib/supabase/client.ts`
- `utils/supabase/client.ts`
- `src/lib/supabase.ts`
- `supabase/client.ts`

**2. Update the Configuration**

**Current (probably):**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Update to:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // CRITICAL: Must match BusinessHub for SSO
    storageKey: 'sb-auth-token',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
})
```

---

### For business-services-hub

**Follow the same steps as above:**
1. Find the Supabase client file
2. Add the `auth` configuration with `storageKey: 'sb-auth-token'`

---

## 🔍 How to Find the File

**Search for these patterns in the repository:**

```bash
# Search for Supabase client creation
grep -r "createClient" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"

# Search for Supabase imports
grep -r "@supabase/supabase-js" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"

# Search for NEXT_PUBLIC_SUPABASE
grep -r "NEXT_PUBLIC_SUPABASE" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
```

**Common locations:**
- `lib/supabase/client.ts`
- `lib/supabase.ts`
- `utils/supabase.ts`
- `src/lib/supabase/client.ts`
- `supabase/client.ts`

---

## ✅ Verification Checklist

After updating both platforms:

- [ ] Contract-Management-System uses `storageKey: 'sb-auth-token'`
- [ ] business-services-hub uses `storageKey: 'sb-auth-token'`
- [ ] BusinessHub uses `storageKey: 'sb-auth-token'` (already done ✅)
- [ ] All platforms use same Supabase project (`reootcngcptfogfozlmz`)
- [ ] All platforms use same anon key

---

## 🧪 Test Single Sign-On

**After updating all platforms:**

1. **Clear browser cache** (important!)
2. **Login** on Contract-Management-System
3. **Open** business-services-hub → Should be logged in ✅
4. **Open** BusinessHub → Should be logged in ✅

**If it doesn't work:**
- Check browser console for errors
- Verify all platforms have the same `storageKey`
- Verify all platforms use the same Supabase project URL
- Try clearing localStorage: `localStorage.clear()` in browser console

---

## 📝 Example: Complete Supabase Client File

**Here's a complete example for Next.js:**

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

/**
 * Supabase Client Configuration
 * 
 * IMPORTANT for Single Sign-On:
 * - storageKey must match other platforms (BusinessHub, Contract-Management-System, business-services-hub)
 * - All platforms must use same Supabase project (same URL and anon key)
 * - This allows one login to work across all platforms
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // CRITICAL: This storage key must match all other platforms for SSO
    storageKey: 'sb-auth-token',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
})
```

---

## 🚨 Important Notes

1. **Restart Required:** After updating, restart the development server
2. **Clear Cache:** Users may need to clear browser cache or log out/in
3. **Production:** Update production deployments with the same configuration
4. **Testing:** Test in the same browser session across all platforms

---

## 🐛 Troubleshooting

### Issue: Still requires separate logins
**Solutions:**
- Verify all platforms use `storageKey: 'sb-auth-token'`
- Verify all platforms use same Supabase project URL
- Clear browser localStorage: `localStorage.clear()`
- Check browser console for errors

### Issue: Session not persisting
**Solutions:**
- Verify `persistSession: true` is set
- Verify `storage` is set to `window.localStorage`
- Check if browser blocks localStorage

### Issue: OAuth redirects not working
**Solutions:**
- Verify `detectSessionInUrl: true` is set
- Check OAuth redirect URLs in Supabase dashboard
- Verify all platforms are in allowed redirect URLs

---

**Once all platforms are updated, single sign-on will work!** 🚀

