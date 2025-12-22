# 🚀 Quick Setup: Google Analytics Measurement ID

## Your Measurement ID
**`G-YJV4TWVVBS`**

---

## ⚡ Quick Setup (2 minutes)

### Step 1: Create `.env` File

**In your project root** (same folder as `package.json`):

1. Create a new file named `.env`
2. Add this content:
   ```env
   VITE_GA4_MEASUREMENT_ID=G-YJV4TWVVBS
   ```

### Step 2: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
# or
pnpm dev
```

### Step 3: Verify

1. Open your website
2. Press **F12** → **Console** tab
3. Look for: `📊 Analytics: Enabled`
4. Type: `console.log(import.meta.env.VITE_GA4_MEASUREMENT_ID)`
5. Should show: `"G-YJV4TWVVBS"`

---

## 🌐 For Production (Vercel)

1. **Go to Vercel Dashboard**
2. **Your Project** → **Settings** → **Environment Variables**
3. **Add:**
   - Name: `VITE_GA4_MEASUREMENT_ID`
   - Value: `G-YJV4TWVVBS`
   - Environments: All (Production, Preview, Development)
4. **Redeploy** your site

---

## ✅ Test It Works

1. Visit: https://smartpro-docs.vercel.app/consultation/
2. Go to [Google Analytics](https://analytics.google.com/)
3. Click **Reports** → **Realtime**
4. Should see your visit within 30 seconds

---

## 🎯 Next: Set Up Form Tracking

1. In GA4: **Admin** → **Events**
2. Click **"Create event"**
3. Event name: `generate_lead`
4. Mark as **Key event** ✅
5. Save

**Done!** Your form submissions will now be tracked as conversions.

---

*See `GA4_MEASUREMENT_ID_SETUP.md` for detailed instructions.*

