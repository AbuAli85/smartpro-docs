# Google Analytics Setup - Measurement ID Configured

## ✅ Your Measurement ID

**Measurement ID**: `G-YJV4TWVVBS`

This has been added to your project configuration.

---

## 📝 Setup Instructions

### Option 1: Local Development (.env file)

1. **Create `.env` file** in project root (same level as `package.json`):
   ```env
   VITE_GA4_MEASUREMENT_ID=G-YJV4TWVVBS
   ```

2. **Restart your dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   # or
   pnpm dev
   ```

3. **Verify it's loaded:**
   - Open browser console (F12)
   - Look for: `📊 Analytics: Enabled`
   - Check: `console.log(import.meta.env.VITE_GA4_MEASUREMENT_ID)` should show `G-YJV4TWVVBS`

---

### Option 2: Production (Vercel)

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your project: `smartpro-docs`

2. **Add Environment Variable:**
   - Go to **Settings** → **Environment Variables**
   - Click **Add New**
   - **Name**: `VITE_GA4_MEASUREMENT_ID`
   - **Value**: `G-YJV4TWVVBS`
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click **...** (three dots) on latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger redeploy

4. **Verify:**
   - After redeploy, visit your site
   - Open browser console (F12)
   - Should see: `📊 Analytics: Enabled`

---

## ✅ Verification Steps

### Step 1: Check Environment Variable
```javascript
// In browser console on your website:
console.log(import.meta.env.VITE_GA4_MEASUREMENT_ID);
// Should output: "G-YJV4TWVVBS"
```

### Step 2: Check GA4 is Loaded
```javascript
// In browser console:
console.log(window.gtag);
// Should output: function gtag() { ... }
```

### Step 3: Check Real-Time Data
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Reports** → **Realtime**
3. Visit your website: https://smartpro-docs.vercel.app/
4. Wait 10-30 seconds
5. Should see **1 user online** in Realtime report

### Step 4: Test Form Submission
1. Go to: https://smartpro-docs.vercel.app/consultation/
2. Fill out and submit the form
3. Go to GA4 → **Reports** → **Engagement** → **Events**
4. Look for `generate_lead` event
5. Should see form submission data

---

## 🎯 Next Steps

### 1. Set Up Key Events (Form Tracking)

**In Google Analytics:**

1. Go to **Admin** → **Events** (under Property)
2. Click **"Create event"**
3. **Event name**: `generate_lead`
4. **Mark as key event**: ✅ (conversion)
5. **Description**: "Consultation form submissions"
6. Click **Save**

**This marks form submissions as conversions**

### 2. Verify Data Flow

**In Setup Assistant:**
- Go back to **Setup Assistant**
- "Start data collection" should show **"DATA FLOWING"** (green)
- This may take 5-10 minutes to update

### 3. Monitor Form Analytics

**Events to watch:**
- `consultation_page_view` - Page visits
- `consultation_form_submit_attempt` - Form attempts
- `generate_lead` - Successful submissions (conversion)
- `consultation_field_completed` - Field interactions
- `consultation_form_error` - Errors

**View in:**
- **Realtime**: Reports → Realtime
- **Events**: Reports → Engagement → Events
- **Conversions**: Reports → Engagement → Conversions

---

## 📊 Expected Analytics Data

Once working, you'll see:

### Form Metrics:
- **Completion Time**: Average seconds to complete form
- **Field Interactions**: Total interactions per submission
- **Fields Completed**: Number of fields filled
- **Services Selected**: Count of services chosen
- **Language**: English vs Arabic submissions

### Conversion Tracking:
- **Form Submissions**: Tracked as `generate_lead` conversions
- **Conversion Rate**: Submissions / Page views
- **Error Rate**: Errors / Attempts

---

## 🔍 Troubleshooting

### Still "DATA NOT FLOWING"?

1. **Wait 5-10 minutes** - GA4 can take time to update status
2. **Check environment variable is set:**
   ```javascript
   console.log(import.meta.env.VITE_GA4_MEASUREMENT_ID);
   ```
3. **Check GA4 script loaded:**
   ```javascript
   console.log(window.gtag);
   ```
4. **Disable ad blockers**
5. **Clear browser cache**
6. **Check Network tab** for requests to `google-analytics.com`

### Events Not Appearing?

1. **Wait 1-2 minutes** - Events have slight delay
2. **Check Realtime report** (not standard reports)
3. **Verify form is actually submitting**
4. **Check browser console for errors**
5. **Verify Measurement ID is correct** (no typos)

---

## ✅ Success Checklist

- [ ] `.env` file created with Measurement ID (local)
- [ ] Environment variable added to Vercel (production)
- [ ] Dev server restarted / Site redeployed
- [ ] Browser console shows "Analytics: Enabled"
- [ ] GA4 Realtime shows page views
- [ ] Form submissions appear as `generate_lead` events
- [ ] "DATA NOT FLOWING" changes to "DATA FLOWING"

---

## 📞 Quick Test

**Test in 30 seconds:**

1. Open: https://smartpro-docs.vercel.app/consultation/
2. Press F12 → Console
3. Should see: `📊 Analytics: Enabled`
4. Go to GA4 → Realtime
5. Refresh page → Should see activity

**If all checkmarks appear, you're good to go!** ✅

---

*Measurement ID: G-YJV4TWVVBS*
*Last Updated: December 22, 2024*

