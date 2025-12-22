# Connection Between Marketing Site & Platform - Explained

## Overview

Two separate websites work together to create a seamless user journey:

1. **Marketing Site**: `smartpro-docs.vercel.app` (Consultation form, tracking)
2. **Platform**: `marketing.thedigitalmorph.com` (User registration, dashboard)

## How They're Connected

### 1. **URL Parameters** (Primary Connection)

When user clicks "Register" on marketing site, they're redirected to platform with tracking data:

```
Marketing Site → Platform
https://smartpro-docs.vercel.app/consultation/thanks
  ↓ (User clicks "Register as Client")
  ↓
https://marketing.thedigitalmorph.com/auth/sign-up?submissionId=sub_123&email=user@example.com&type=client&ref=consultation
```

**Connection Method**: URL Query Parameters
- `submissionId`: Links consultation to registration
- `email`: Pre-fills form
- `type`: User type (provider/client)
- `ref`: Source tracking (consultation)

### 2. **API Calls** (Data Connection)

Platform calls Marketing Site APIs to:
- Track lead progression
- Fetch consultation details
- Link consultation to user account

```
Platform → Marketing Site APIs
POST https://smartpro-docs.vercel.app/api/leads/track
POST https://smartpro-docs.vercel.app/api/users/link-consultation
GET  https://smartpro-docs.vercel.app/api/consultation/:submissionId
GET  https://smartpro-docs.vercel.app/api/leads/:submissionId
```

### 3. **Shared Database** (Optional - If Same Database)

If both sites use the same database:
- Consultation submissions stored in `consultation_submissions` table
- Users stored in `users` table
- Link via `consultationSubmissionId` column in `users` table

### 4. **Shared Submission ID** (Unique Identifier)

The `submissionId` is the **unique key** that connects everything:

```
Consultation Form Submission
  ↓
Generates: submissionId = "sub_abc123xyz"
  ↓
Stored in: consultation_submissions table
  ↓
Passed to Platform via URL
  ↓
Stored in: users.consultationSubmissionId
  ↓
Links: Consultation ↔ User Account
```

## Complete Data Flow

```
┌─────────────────────────────────┐
│   MARKETING SITE                │
│   (smartpro-docs.vercel.app)    │
│                                 │
│   1. User submits consultation  │
│   2. Creates submissionId       │
│   3. Stores in database         │
│   4. Shows thank you page       │
│   5. User clicks "Register"     │
└──────────────┬──────────────────┘
               │
               │ URL Redirect with Parameters
               │ submissionId, email, type
               │
               ▼
┌─────────────────────────────────┐
│   PLATFORM                      │
│   (marketing.thedigitalmorph.com)│
│                                 │
│   1. Reads submissionId from URL│
│   2. User completes registration│
│   3. Calls Marketing Site API   │
│      - Track registration       │
│      - Link consultation        │
│   4. Stores link in database     │
│   5. Shows welcome page         │
└──────────────┬──────────────────┘
               │
               │ API Calls (HTTP)
               │
               ▼
┌─────────────────────────────────┐
│   MARKETING SITE API            │
│   (smartpro-docs.vercel.app/api)│
│                                 │
│   - Updates lead tracking       │
│   - Links consultation to user │
│   - Returns consultation data  │
└─────────────────────────────────┘
```

## Technical Connection Details

### Connection Type 1: URL Parameters (One-Way)

**Direction**: Marketing Site → Platform
**Method**: HTTP Redirect with query string
**Data**: submissionId, email, type, ref
**When**: User clicks registration button

```javascript
// Marketing Site (ConsultationThankYou.tsx)
window.open(
  `https://marketing.thedigitalmorph.com/auth/sign-up?submissionId=${submissionId}&email=${email}&type=client`,
  '_blank'
);
```

### Connection Type 2: API Calls (Two-Way)

**Direction**: Platform → Marketing Site
**Method**: HTTP POST/GET requests
**Data**: JSON payloads
**When**: After registration, profile completion, service booking

```javascript
// Platform calls Marketing Site API
await fetch('https://smartpro-docs.vercel.app/api/leads/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    submissionId: 'sub_123',
    email: 'user@example.com',
    stage: 'registration_completed',
  }),
});
```

### Connection Type 3: Database Link (If Shared)

**Direction**: Both sites access same database
**Method**: Direct database queries
**Data**: User records, consultation records
**Link Field**: `users.consultationSubmissionId`

```sql
-- Platform queries database
SELECT * FROM users 
WHERE consultationSubmissionId = 'sub_123';

-- Gets linked consultation
SELECT * FROM consultation_submissions 
WHERE submissionId = 'sub_123';
```

## What Gets Shared

### 1. **Submission ID** (sub_1234567890)
- Generated on marketing site
- Passed to platform via URL
- Used to link consultation to user
- Unique identifier for tracking

### 2. **Email Address**
- Collected on marketing site
- Passed to platform for pre-filling
- Used for user account creation
- Links consultation to user

### 3. **User Type** (provider/client)
- Selected on marketing site
- Passed to platform
- Used for account setup
- Determines dashboard view

### 4. **Lead Tracking Data**
- Consultation submitted (17%)
- Consultation viewed (33%)
- Registration started (50%)
- Registration completed (67%)
- Profile completed (83%)
- First service booked (100%)

### 5. **Consultation Details**
- Name, email, phone
- Company information
- Selected services
- Message/notes
- Submission timestamp

## Security & Privacy

### What's Secure:
- ✅ API calls use HTTPS
- ✅ Email is URL-encoded
- ✅ Submission ID is unique (not guessable)
- ✅ Database links are verified

### What's Not Shared:
- ❌ User passwords (never shared)
- ❌ Payment information (separate systems)
- ❌ Internal notes (marketing site only)
- ❌ Platform user data (not sent to marketing site)

## Connection Architecture

```
┌─────────────────────────────────────────────────────┐
│                 USER JOURNEY                        │
└─────────────────────────────────────────────────────┘

Step 1: Marketing Site
  ├─ User fills consultation form
  ├─ Submits → Creates submissionId
  ├─ Stores in database
  └─ Shows thank you page

Step 2: URL Redirect (Connection Point 1)
  ├─ User clicks "Register"
  ├─ Redirects to platform
  └─ Passes: submissionId, email, type

Step 3: Platform Registration
  ├─ Reads submissionId from URL
  ├─ User completes registration
  └─ Gets userId from platform

Step 4: API Call (Connection Point 2)
  ├─ Platform calls Marketing Site API
  ├─ POST /api/leads/track (registration_completed)
  ├─ POST /api/users/link-consultation
  └─ Links consultation to user account

Step 5: Database Link (Connection Point 3)
  ├─ Marketing Site: consultation_submissions table
  ├─ Platform: users table
  └─ Link: users.consultationSubmissionId = consultation_submissions.submissionId

Step 6: Dashboard Display
  ├─ Platform fetches consultation via API
  ├─ GET /api/consultation/:submissionId
  └─ Displays in user dashboard
```

## Why Two Separate Sites?

### Marketing Site (smartpro-docs.vercel.app)
- **Purpose**: Lead generation, marketing, information
- **Features**: Consultation form, blog, documentation
- **Users**: Anonymous visitors, potential clients
- **Database**: Consultation submissions, lead tracking

### Platform (marketing.thedigitalmorph.com)
- **Purpose**: User accounts, service management
- **Features**: Registration, dashboard, bookings
- **Users**: Registered clients and providers
- **Database**: User accounts, services, bookings

### Benefits of Separation:
- ✅ **Security**: Marketing site doesn't need user data
- ✅ **Performance**: Each site optimized for its purpose
- ✅ **Scalability**: Can scale independently
- ✅ **Maintenance**: Easier to update separately
- ✅ **Compliance**: Different data handling requirements

## Connection Summary

**The Link**: `submissionId` is the **bridge** between both sites

1. **Marketing Site** creates it → Stores consultation
2. **URL Parameters** pass it → Platform receives it
3. **API Calls** use it → Track and link data
4. **Database** stores it → Permanent connection
5. **Dashboard** displays it → User sees their consultation

**Result**: Seamless experience from consultation → registration → active user, with full tracking across both sites!

## Quick Reference

| Connection Type | Direction | Method | Data |
|----------------|-----------|--------|------|
| URL Parameters | Marketing → Platform | HTTP Redirect | submissionId, email, type |
| API Calls | Platform → Marketing | HTTP POST/GET | Lead tracking, consultation data |
| Database Link | Both → Database | SQL Queries | User records, consultation records |

**The submissionId is the key that connects everything!** 🔑

