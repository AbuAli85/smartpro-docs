# 🔧 Fix Production Supabase Configuration

**Issue:** Production site (`businesshub.thesmartpro.io`) is still using old Supabase project

**Solution:** Update Vercel environment variables and redeploy

---

## 🎯 Quick Fix (2 Steps)

### Step 1: Update Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project: `smartpro-docs` (or `businesshub`)

2. **Go to Settings → Environment Variables**

3. **Add/Update these variables:**

   ```env
   VITE_SUPABASE_URL=https://reootcngcptfogfozlmz.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb290Y25nY3B0Zm9nZm96bG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NDQzODIsImV4cCI6MjA2OTAyMDM4Mn0.WQwDpYX2M4pyPaliUqTinwy1xWWFKm4OntN2HUfP6n0
   ```

4. **Make sure:**
   - ✅ Environment: **Production** (and Preview if needed)
   - ✅ Click **Save** after each variable

---

### Step 2: Redeploy

**Option A: Automatic Redeploy (Recommended)**
1. After updating environment variables, Vercel will ask to redeploy
2. Click **Redeploy** button
3. Wait for deployment to complete (~2-3 minutes)

**Option B: Manual Redeploy**
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for completion

**Option C: Trigger via Git**
```bash
# Make a small change and push (triggers auto-deploy)
git commit --allow-empty -m "Trigger redeploy for Supabase config"
git push
```

---

## ✅ Verify It's Working

**After redeployment completes:**

1. **Visit:** https://businesshub.thesmartpro.io/marketplace/auth/sign-in

2. **Open browser console** (F12)

3. **Check for:**
   - ✅ Should see: `⚠️ Using fallback Supabase credentials...` (if env vars not set)
   - ✅ Should connect to: `reootcngcptfogfozlmz.supabase.co`
   - ❌ Should NOT see: `xavocdikwiimrjgybiai.supabase.co`

4. **Try logging in:**
   - Should work with credentials from other platforms
   - Network tab should show: `POST https://reootcngcptfogfozlmz.supabase.co/auth/v1/token`

---

## 🔍 Alternative: Check Current Environment Variables

**If you want to see what's currently set:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Look for:
   - `VITE_SUPABASE_URL` - Should be `https://reootcngcptfogfozlmz.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` - Should be set

**If they're missing or wrong:**
- Delete old ones (if pointing to `xavocdikwiimrjgybiai`)
- Add new ones with correct values
- Redeploy

---

## 📋 Checklist

- [ ] Opened Vercel Dashboard
- [ ] Found project settings
- [ ] Updated `VITE_SUPABASE_URL` to `https://reootcngcptfogfozlmz.supabase.co`
- [ ] Updated `VITE_SUPABASE_ANON_KEY` with correct key
- [ ] Set environment to **Production**
- [ ] Saved changes
- [ ] Triggered redeploy
- [ ] Waited for deployment to complete
- [ ] Tested login on production site
- [ ] Verified correct Supabase URL in network tab

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

## 🐛 Troubleshooting

### Still seeing old URL after redeploy?

1. **Clear browser cache:**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or use incognito window

2. **Check deployment logs:**
   - Vercel Dashboard → Deployments → Click latest deployment
   - Check build logs for errors

3. **Verify environment variables:**
   - Make sure they're set for **Production** environment
   - Not just Preview or Development

4. **Check build output:**
   - Look for `VITE_SUPABASE_URL` in build logs
   - Should show the correct URL

---

**After updating Vercel environment variables and redeploying, production login should work!** 🚀

