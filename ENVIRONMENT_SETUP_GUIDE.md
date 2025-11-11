# Environment Setup Guide

This guide explains how to configure environment variables for all the new features.

---

## 📋 Required Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Google Analytics 4 (Required for analytics)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# API Configuration
VITE_API_URL=https://api.thesmartpro.io

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_ENABLE_WEB_VITALS_MONITOR=false

# Environment
VITE_ENV=production
```

---

## 🔑 Getting Your Google Analytics 4 Measurement ID

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (bottom left)
3. Click "Create Property"
4. Fill in property details
5. Click "Create"

### Step 2: Get Measurement ID
1. In Admin, click "Data Streams"
2. Click your web stream
3. Copy the "Measurement ID" (format: G-XXXXXXXXXX)

### Step 3: Add to Environment
```env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🛠️ Feature Flag Configuration

### Analytics
```env
VITE_ENABLE_ANALYTICS=true  # Enable GA4 tracking
```

When `true`:
- ✅ Page views are tracked
- ✅ Events are sent to GA4
- ✅ User properties are set
- ✅ Conversions are tracked

### Performance Monitoring
```env
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

When `true`:
- ✅ Core Web Vitals are measured
- ✅ Long tasks are monitored
- ✅ Memory usage is tracked
- ✅ Page load times are recorded

### Web Vitals Monitor (Development)
```env
VITE_ENABLE_WEB_VITALS_MONITOR=false
```

When `true`:
- ✅ Visual dashboard appears in bottom-right
- ✅ Real-time Web Vitals display
- ✅ Color-coded performance ratings

**Note:** In development, the monitor can be toggled via localStorage:
```javascript
localStorage.setItem('debug_webvitals', 'true');  // Enable
localStorage.removeItem('debug_webvitals');        // Disable
```

---

## 🌐 Environment-Specific Configurations

### Development (.env.development)
```env
VITE_GA4_MEASUREMENT_ID=G-DEV-XXXXXXX
VITE_API_URL=http://localhost:3000
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_ENABLE_WEB_VITALS_MONITOR=true
VITE_ENV=development
```

### Production (.env.production)
```env
VITE_GA4_MEASUREMENT_ID=G-PROD-XXXXXXX
VITE_API_URL=https://api.thesmartpro.io
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_ENABLE_WEB_VITALS_MONITOR=false
VITE_ENV=production
```

### Staging (.env.staging)
```env
VITE_GA4_MEASUREMENT_ID=G-STAGING-XXXXXXX
VITE_API_URL=https://api-staging.thesmartpro.io
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_ENABLE_WEB_VITALS_MONITOR=true
VITE_ENV=staging
```

---

## 🔒 Security Best Practices

### 1. Never Commit .env Files
Add to `.gitignore`:
```
.env
.env.local
.env.*.local
```

### 2. Use Different Keys Per Environment
- Development: `G-DEV-XXXXXXX`
- Staging: `G-STAGING-XXXXXXX`
- Production: `G-PROD-XXXXXXX`

### 3. Rotate Keys Regularly
- Review access logs monthly
- Rotate keys if compromised
- Update all environments

---

## 📊 Verifying Setup

### Check GA4 is Working:
1. Open your website
2. Open browser console (F12)
3. Look for: `✅ SmartPro App Initialized`
4. Look for: `📊 Analytics: Enabled`

### Check Real-Time Reports:
1. Go to Google Analytics
2. Click "Reports" > "Realtime"
3. Navigate your website
4. Verify events appear in real-time

### Test Events:
```typescript
// In browser console:
window.gtag('event', 'test_event', {
  test_parameter: 'test_value'
});

// Should appear in GA4 Real-Time report
```

---

## 🐛 Troubleshooting

### Analytics Not Tracking

**Problem:** Events not appearing in GA4

**Solutions:**
1. Check `VITE_GA4_MEASUREMENT_ID` is correct
2. Verify `VITE_ENABLE_ANALYTICS=true`
3. Check browser console for errors
4. Disable ad blockers
5. Wait 1-2 minutes for real-time data

### Environment Variables Not Loading

**Problem:** `import.meta.env.VITE_GA4_MEASUREMENT_ID` is undefined

**Solutions:**
1. Restart dev server after adding .env
2. Verify variable starts with `VITE_`
3. Check .env file is in project root
4. Clear build cache: `npm run build --force`

### Web Vitals Monitor Not Showing

**Problem:** Dashboard not visible

**Solutions:**
1. Enable in localStorage:
   ```javascript
   localStorage.setItem('debug_webvitals', 'true');
   ```
2. Reload the page
3. Check browser console for errors
4. Verify `CoreWebVitalsMonitor` is imported in App.tsx

---

## 🚀 Deployment Checklist

### Before Deploying:

- [ ] Set production GA4 Measurement ID
- [ ] Set `VITE_ENABLE_ANALYTICS=true`
- [ ] Set `VITE_ENABLE_WEB_VITALS_MONITOR=false`
- [ ] Set correct `VITE_API_URL`
- [ ] Test analytics in staging first
- [ ] Verify events in GA4 Real-Time
- [ ] Check Core Web Vitals in production
- [ ] Monitor error logs

---

## 📈 Monitoring After Deployment

### First Hour:
- [ ] Check GA4 Real-Time reports
- [ ] Verify page views are tracked
- [ ] Test key conversion events
- [ ] Monitor error rates

### First Day:
- [ ] Review all tracked events
- [ ] Check conversion funnel
- [ ] Verify ecommerce events
- [ ] Review Core Web Vitals

### First Week:
- [ ] Analyze user behavior
- [ ] Review top pages
- [ ] Check bounce rates
- [ ] Optimize based on data

---

## 🔗 Useful Links

### Google Analytics 4:
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 Best Practices](https://support.google.com/analytics/answer/9267735)

### Core Web Vitals:
- [Web Vitals Overview](https://web.dev/vitals/)
- [Measuring Web Vitals](https://web.dev/vitals-measurement-getting-started/)
- [Optimizing Web Vitals](https://web.dev/optimize-vitals/)

---

## 💡 Pro Tips

### 1. Use Data Layer for Complex Events
```typescript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'custom_event',
  eventCategory: 'Category',
  eventAction: 'Action',
  eventLabel: 'Label'
});
```

### 2. Set Up Custom Dimensions
```typescript
import { setCustomDimension } from '@/lib/googleAnalytics';

setCustomDimension('user_type', 'premium');
setCustomDimension('plan_tier', 'professional');
```

### 3. Track User ID for Cross-Device
```typescript
import { setUserId } from '@/lib/googleAnalytics';

setUserId('user-12345');
```

### 4. Enable Debug Mode in Development
```typescript
if (import.meta.env.DEV) {
  window.gtag('config', measurementId, {
    debug_mode: true
  });
}
```

---

## 📞 Support

### Need Help?
- Check documentation: `/docs`
- Review implementation guide: `IMPLEMENTATION_GUIDE.md`
- Check phase 2 summary: `PHASE_2_IMPROVEMENTS_SUMMARY.md`

---

**Last Updated:** November 11, 2025  
**Version:** 2.0.0

