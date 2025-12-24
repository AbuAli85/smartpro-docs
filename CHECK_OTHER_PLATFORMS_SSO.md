# 🔍 How to Check if Other Platforms Have SSO Configured

**Issue:** Login works in BusinessHub but not persisting in other platforms

**Quick Check:** Verify if Contract-Management-System and business-services-hub have the correct SSO configuration

---

## 🔍 **Quick Check Method**

### **Step 1: Check Browser Console**

1. **Open BusinessHub** and login
2. **Open browser console** (F12)
3. **Run this command:**
   ```javascript
   localStorage.getItem('sb-auth-token')
   ```
4. **Expected:** Should return a JSON string with session data ✅

### **Step 2: Check Other Platforms**

1. **Open Contract-Management-System** (or business-services-hub)
2. **Open browser console** (F12)
3. **Run this command:**
   ```javascript
   localStorage.getItem('sb-auth-token')
   ```
4. **Expected:** Should return the SAME JSON string ✅

**If it returns `null` or different data:**
- ❌ The platform is NOT using `storageKey: 'sb-auth-token'`
- ❌ SSO won't work until it's fixed

---

## 📋 **What to Look For in Other Platforms**

### **File to Find:**
Look for Supabase client configuration file:
- `lib/supabase/client.ts`
- `utils/supabase/client.ts`
- `src/lib/supabase.ts`
- `supabase/client.ts`

### **Should Have:**
```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'sb-auth-token',  // ← THIS IS CRITICAL
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
})
```

### **If Missing:**
The platform needs to be updated. See `UPDATE_OTHER_PLATFORMS_FOR_SSO.md`

---

## 🧪 **Test SSO**

### **Test 1: Same Browser, Different Tabs**
1. Login in BusinessHub (Tab 1)
2. Open Contract-Management-System (Tab 2)
3. **Expected:** Should be logged in ✅

### **Test 2: After Refresh**
1. Login in BusinessHub
2. Open Contract-Management-System
3. Refresh the page
4. **Expected:** Should still be logged in ✅

### **Test 3: Cross-Platform**
1. Login in BusinessHub
2. Open business-services-hub
3. **Expected:** Should be logged in ✅

---

## 🐛 **If Still Not Working**

### **Check 1: Storage Key**
```javascript
// In browser console on each platform
console.log('Storage key:', localStorage.getItem('sb-auth-token'))
```
**All platforms should return the same value**

### **Check 2: Supabase Project**
```javascript
// In browser console
console.log('Supabase URL:', window.location.origin)
```
**All platforms should use same Supabase project**

### **Check 3: Session Check**
```javascript
// In browser console (after login in BusinessHub)
// Run on Contract-Management-System or business-services-hub
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://reootcngcptfogfozlmz.supabase.co', 'YOUR_ANON_KEY', {
  auth: { storageKey: 'sb-auth-token' }
})
supabase.auth.getSession().then(({ data }) => console.log('Session:', data.session))
```
**Should return the session**

---

## ✅ **BusinessHub is Fixed**

BusinessHub now has:
- ✅ Enhanced session detection with retry
- ✅ Cross-tab/cross-platform sync
- ✅ Periodic session check (every 2 seconds)
- ✅ Event-based session updates

**The issue is likely that other platforms need the same configuration!**

