# Quick Reference: Viewing Consultation Features

## 🚀 Quick Start

### 1. See Form Analytics (30 seconds)

**In Browser Console:**
1. Open consultation page: `https://smartpro-docs.vercel.app/consultation/`
2. Press `F12` → Go to **Console** tab
3. Fill out and submit form
4. Look for: `GA4: Event tracked`

**In Google Analytics:**
1. Go to: https://analytics.google.com/
2. Click **Reports** → **Realtime**
3. Submit form → See events appear instantly

---

### 2. Test Retry Button (1 minute)

1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Click dropdown → Select **Offline**
4. Try to submit form
5. See error message with **"Retry"** button
6. Click retry → Set network back to **Online**

**Location**: Error message box above submit button

---

### 3. See Success Animation (10 seconds)

1. Fill out form (name, email, at least 1 service)
2. Click "Get My Free Consultation"
3. Watch:
   - ✅ Success icon zooms in
   - Thank you message fades in
   - Auto-redirects after 2 seconds
4. See thank you page with animated checkmark

**Location**: Form → Success state → `/consultation/thanks`

---

### 4. View Google Analytics Data

**Real-Time (Instant):**
- Reports → Realtime → See events as they happen

**Event Reports (Historical):**
- Reports → Engagement → Events
- Search for: `consultation_`, `generate_lead`

**DebugView (Best for Testing):**
- Admin → DebugView
- Install GA Debugger extension
- See all events with parameters

---

## 📊 Events to Look For

| Event Name | When It Fires | Where to See |
|------------|---------------|--------------|
| `consultation_page_view` | Page loads | GA4 Realtime |
| `consultation_form_submit_attempt` | User clicks submit | GA4 Events |
| `consultation_field_completed` | User fills a field | GA4 Events |
| `generate_lead` | Form submitted successfully | GA4 Conversions |
| `consultation_form_error` | Submission fails | GA4 Events |
| `consultation_thank_you_view` | Thank you page loads | GA4 Realtime |

---

## 🔑 Required Setup

**Environment Variable:**
```env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Check if Working:**
```javascript
// In browser console:
console.log(import.meta.env.VITE_GA4_MEASUREMENT_ID);
console.log(window.gtag); // Should be a function
```

---

## 🎯 Key Metrics

**Form Completion Rate:**
- `generate_lead` events ÷ `consultation_page_view` events

**Average Completion Time:**
- Average of `form_completion_time_seconds` parameter

**Error Rate:**
- `consultation_form_error` ÷ `consultation_form_submit_attempt`

---

## 📍 File Locations

- **Form Component**: `client/src/components/ConsultationForm.tsx`
- **Analytics Code**: `client/src/lib/googleAnalytics.ts`
- **Page Component**: `client/src/pages/Consultation.tsx`
- **Thank You Page**: `client/src/pages/ConsultationThankYou.tsx`

---

## ⚡ Quick Test Commands

**Test Analytics in Console:**
```javascript
// Manually trigger event
window.gtag('event', 'test_event', { test: 'value' });

// Check if GA4 is loaded
console.log(window.gtag);
console.log(window.dataLayer);
```

**Check Form Data:**
```javascript
// In browser console on consultation page:
// Check localStorage for draft
console.log(localStorage.getItem('consultation_form_draft'));
```

---

*For detailed instructions, see: `HOW_TO_VIEW_CONSULTATION_FEATURES.md`*

