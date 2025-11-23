# Webhook Data Flow - Consultation Form to Make.com

## Overview

This document explains how data flows from the consultation form at [https://smartpro-docs.vercel.app/consultation](https://smartpro-docs.vercel.app/consultation) to the Make.com webhook.

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend: Consultation Form                                │
│  URL: https://smartpro-docs.vercel.app/consultation        │
│  Component: client/src/components/ConsultationForm.tsx      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ POST /api/consultation
                     │ (JSON payload)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend API Endpoint                                       │
│  - Vercel Serverless: api/consultation.ts                  │
│  - OR Express Server: server/routes/consultationRoutes.ts  │
│  - Validates, translates, and formats data                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ POST to Make.com Webhook
                     │ (Formatted webhook payload)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Make.com Webhook                                           │
│  URL: https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8 │
│  Module 3: Custom Webhook (gateway:CustomWebHook)          │
└─────────────────────────────────────────────────────────────┘
```

## Step-by-Step Data Flow

### 1. User Submits Form

**Location:** `client/src/components/ConsultationForm.tsx`

**Form Submission Handler:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  // ... validation ...
  const payload = buildApiPayload();
  const response = await consultationApi.submit(payload);
}
```

**API Call:**
```typescript
// client/src/lib/backendApi.ts
export const consultationApi = {
  submit: async (formData: ConsultationFormData): Promise<ConsultationResponse> => {
    return apiRequest<ConsultationResponse>('/consultation', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};
```

**API Base URL:**
- Development: `http://localhost:3001/api`
- Production: Set via `VITE_API_URL` environment variable
- Default endpoint: `/api/consultation`

### 2. Backend Processes Request

**Two Possible Backend Implementations:**

#### Option A: Vercel Serverless Function
**File:** `api/consultation.ts`

**Webhook URL:**
```typescript
const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 
  'https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8';
```

#### Option B: Express Server Route
**File:** `server/routes/consultationRoutes.ts`

**Webhook Client:**
```typescript
import { webhookClient } from '../lib/webhookClient';
// Uses same webhook URL from server/lib/webhookClient.ts
```

### 3. Data Transformation

The backend performs several transformations before sending to Make.com:

1. **Translation** - Translates form values based on language (`en` or `ar`)
2. **Service Mapping** - Maps service keys to Make.com format
3. **Field Mapping** - Maps form fields to webhook payload structure

**Key Transformations:**
- `name` → `client_name`
- `company` → `business_name`
- `services[]` → `service_interested` (primary) + `services_summary` (all)
- `language` → `language` (must be 'en' or 'ar')
- All optional fields are included if provided

### 4. Webhook Payload Structure

**Final Payload Sent to Make.com:**
```json
{
  "form_type": "consultation",
  "client_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "business_name": "Acme Corp",
  "business_type": "Limited Liability Company (LLC)",
  "service_interested": "Company Formation",
  "service_interested_translated": "تأسيس الشركات", // Arabic if language='ar'
  "services_summary": "Company Formation, PRO Services",
  "budget": "$5,000 - $10,000",
  "timeline": "1-3 Months",
  "preferred_contact": "Email",
  "preferred_time": "Morning (9 AM - 12 PM)",
  "location": "Dubai, UAE",
  "primary_message": "I need help with company formation...",
  "notes": "Services Selected: Company Formation, PRO Services\nPrimary Message: I need help...",
  "language": "en", // or "ar"
  "source": "smartpro-consultation-form",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "request_id": "req_1234567890_abc123",
  "idempotency_key": "email:name:services"
}
```

### 5. Make.com Receives Webhook

**Make.com Webhook Configuration:**
- **Module ID:** 3
- **Module Type:** `gateway:CustomWebHook`
- **Webhook URL:** `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`
- **Hook ID:** 3621184

**Data Access in Make.com:**
All fields are accessible as `{{3.field_name}}`:
- `{{3.client_name}}` - Client's name
- `{{3.email}}` - Email address
- `{{3.language}}` - Language ('en' or 'ar')
- `{{3.service_interested}}` - Primary service (English)
- `{{3.service_interested_translated}}` - Primary service (translated)
- `{{3.services_summary}}` - All services (comma-separated)
- etc.

## Environment Variables

### Frontend (Vite)
```env
VITE_API_URL=https://your-api-domain.com/api
```

### Backend
```env
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
```

## Key Files

1. **Frontend Form Component:**
   - `client/src/components/ConsultationForm.tsx` - Form UI and submission logic

2. **Frontend API Client:**
   - `client/src/lib/backendApi.ts` - API client that calls `/api/consultation`

3. **Backend API Endpoints:**
   - `api/consultation.ts` - Vercel serverless function (production)
   - `server/routes/consultationRoutes.ts` - Express route (development/server)

4. **Webhook Client:**
   - `server/lib/webhookClient.ts` - Webhook client that sends to Make.com

5. **Translation Utilities:**
   - `server/lib/translations.ts` - Translation functions for form fields

## Data Validation

The backend validates all incoming data using Zod schema:

```typescript
const consultationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  services: z.array(z.string()).min(1),
  language: z.enum(['en', 'ar']).default('en'),
  // ... other fields
});
```

## Duplicate Prevention

The backend implements duplicate prevention:
- **Submission Cache:** Prevents same email+name within 5 minutes
- **Idempotency Key:** Prevents duplicate webhook calls within 10 minutes
- **Rate Limiting:** Max 2 requests per second

## Language Handling

The form sends `language: 'en'` or `language: 'ar'` in the payload. The backend:
1. Translates all form fields based on language
2. Sends both original keys and translated values
3. Make.com uses `{{3.language}}` to route to correct email template

## Testing the Flow

1. **Submit Form:** Go to https://smartpro-docs.vercel.app/consultation
2. **Check Network Tab:** See POST to `/api/consultation`
3. **Check Backend Logs:** See webhook payload being sent
4. **Check Make.com:** See webhook execution in Make.com dashboard

## Troubleshooting

### Webhook Not Receiving Data
1. Check `MAKE_WEBHOOK_URL` environment variable
2. Verify webhook URL is correct: `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`
3. Check Make.com webhook is active and receiving requests

### Data Missing in Make.com
1. Check backend logs for webhook payload
2. Verify all required fields are in payload
3. Check Make.com webhook module output to see received data

### Language Not Working
1. Verify `language` field is 'en' or 'ar' (not 'English' or 'Arabic')
2. Check backend translation functions are working
3. Verify Make.com filters use correct language value

## Summary

The consultation form at `https://smartpro-docs.vercel.app/consultation` submits data to `/api/consultation`, which:
1. Validates the data
2. Translates fields based on language
3. Formats the payload for Make.com
4. Sends to Make.com webhook: `https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8`
5. Make.com receives it in Module 3 (Custom Webhook) and processes it through the scenario

