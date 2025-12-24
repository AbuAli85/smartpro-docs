# 🔄 Clear Cache & Restart - Fix Cached Bundle Issue

**Problem:** Browser is using old cached JavaScript bundle with old Supabase URL

**Solution:** Clear cache and restart dev server

---

## 🚨 Immediate Steps

### Step 1: Stop Dev Server

**Press `Ctrl+C` in the terminal where the dev server is running**

---

### Step 2: Clear Browser Cache

**Option A: Hard Refresh (Quick)**
- **Windows/Linux:** `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`

**Option B: Clear Cache Completely**
1. Open browser DevTools (`F12`)
2. Right-click the refresh button
3. Select **"Empty Cache and Hard Reload"**

**Option C: Clear All Site Data**
1. Open browser DevTools (`F12`)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **"Clear site data"** or **"Clear storage"**
4. Check all boxes
5. Click **"Clear site data"**

---

### Step 3: Restart Dev Server

```bash
# Make sure you're in the project root
npm run dev
```

**Wait for the server to fully start** (you'll see "Local: http://localhost:3000" or similar)

---

### Step 4: Hard Refresh Page Again

**After server restarts:**
- Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or close and reopen the browser tab

---

## ✅ Verify It's Working

**Check browser console:**
1. Open DevTools (`F12`)
2. Go to **Console** tab
3. Look for:
   - ✅ Should see: `⚠️ Using fallback Supabase credentials...` (if no .env file)
   - ✅ Should see connection to: `reootcngcptfogfozlmz.supabase.co`
   - ❌ Should NOT see: `xavocdikwiimrjgybiai.supabase.co`

**Check Network tab:**
1. Go to **Network** tab in DevTools
2. Try logging in
3. Look for login request:
   - ✅ Should go to: `https://reootcngcptfogfozlmz.supabase.co/auth/v1/token`
   - ❌ Should NOT go to: `https://xavocdikwiimrjgybiai.supabase.co/auth/v1/token`

---

## 🐛 If Still Not Working

### Option 1: Clear Vite Cache

```bash
# Stop dev server
# Then run:
rm -rf node_modules/.vite
# Or on Windows:
rmdir /s node_modules\.vite

# Restart dev server
npm run dev
```

### Option 2: Clear All Build Cache

```bash
# Stop dev server
# Then run:
rm -rf dist
rm -rf node_modules/.vite
rm -rf .vite

# Restart dev server
npm run dev
```

### Option 3: Use Incognito/Private Window

**Test in a fresh browser session:**
1. Open incognito/private window
2. Go to: `http://localhost:3000/marketplace/auth/sign-in`
3. Try logging in

**If it works in incognito:** Browser cache is the issue - clear it completely

---

## 📋 Quick Checklist

- [ ] Dev server stopped
- [ ] Browser cache cleared (hard refresh)
- [ ] Dev server restarted
- [ ] Page hard refreshed again
- [ ] Console shows correct Supabase URL
- [ ] Network tab shows correct Supabase URL
- [ ] Login works

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

**After clearing cache and restarting, login should work!** 🚀

