# Consultation Form → Webhook Submission Flow

This document explains how the consultation form submission flows from the frontend to the Make.com webhook.

## Complete Flow Diagram

```
┌─────────────────┐
│  User fills     │
│  form & clicks  │
│  "Submit"       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Frontend: ConsultationForm.tsx    │
│  - Validates form data              │
│  - Builds payload via buildApiPayload()│
│  - Calls consultationApi.submit()    │
└────────┬────────────────────────────┘
         │
         │ POST /api/consultation
         │ {
         │   name, email, phone, services,
         │   company, businessType, budget,
         │   timeline, message, language...
         │ }
         ▼
┌─────────────────────────────────────┐
│  Backend API: backendApi.ts         │
│  - Makes HTTP POST request          │
│  - URL: /api/consultation           │
│  - Sends JSON payload               │
└────────┬────────────────────────────┘
         │
         │ HTTP Request
         ▼
┌─────────────────────────────────────┐
│  Backend Route: consultationRoutes.ts│
│  POST /api/consultation             │
│  - Validates request body           │
│  - Checks for duplicates            │
│  - Saves to database (Prisma)       │
│  - Maps services to Make.com format │
│  - Builds webhook payload           │
│  - Calls webhookClient.send()       │
└────────┬────────────────────────────┘
         │
         │ webhookPayload object
         ▼
┌─────────────────────────────────────┐
│  Webhook Client: webhookClient.ts   │
│  - Sends POST to Make.com webhook   │
│  - URL: MAKE_WEBHOOK_URL env var   │
│  - Timeout: 30 seconds              │
│  - Returns success/error response   │
└────────┬────────────────────────────┘
         │
         │ HTTP POST
         ▼
┌─────────────────────────────────────┐
│  Make.com Webhook                   │
│  - Receives payload                 │
│  - Triggers automation scenario     │
│  - Saves to Google Sheets           │
│  - Sends confirmation emails        │
└─────────────────────────────────────┘
```

## Step-by-Step Breakdown

### Step 1: Frontend Form Submission

**File**: `client/src/components/ConsultationForm.tsx`

**Function**: `handleSubmit()` (line 429)

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Validate form
  if (!validateForm()) return;
  
  // 2. Build API payload
  const payload = buildApiPayload();
  // Returns:
  // {
  //   name: "John Doe",
  //   email: "john@example.com",
  //   phone: "+1234567890",
  //   services: ["companyFormation", "accounting"],
  //   company: "Acme Corp",
  //   businessType: "llc",
  //   budget: "10k-25k",
  //   timeline: "1-3months",
  //   message: "Need help with setup",
  //   language: "en"
  // }
  
  // 3. Submit to backend API
  const response = await consultationApi.submit(payload);
}
```

**Payload Builder** (`buildApiPayload()`, line 411):
```typescript
const buildApiPayload = () => {
  return {
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone?.trim() || undefined,
    company: formData.company?.trim() || undefined,
    businessType: formData.businessType || undefined,
    services: formData.services,  // Array of service keys
    budget: formData.budget || undefined,
    timeline: formData.timeline || undefined,
    preferredContact: formData.preferredContact || undefined,
    preferredTime: formData.preferredTime || undefined,
    location: formData.location?.trim() || undefined,
    message: formData.message?.trim() || undefined,
    language: language as 'en' | 'ar',
  };
};
```

### Step 2: Backend API Call

**File**: `client/src/lib/backendApi.ts`

**Function**: `consultationApi.submit()` (line 302)

```typescript
export const consultationApi = {
  submit: async (formData: ConsultationFormData): Promise<ConsultationResponse> => {
    return apiRequest<ConsultationResponse>('/consultation', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};
```

**API Base URL**: 
- Development: `http://localhost:3001/api`
- Production: Set via `VITE_API_URL` environment variable

**Request**:
```
POST /api/consultation
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "services": ["companyFormation", "accounting"],
  ...
}
```

### Step 3: Backend Route Processing

**File**: `server/routes/consultationRoutes.ts`

**Route**: `POST /api/consultation` (line 48)

**Process**:

1. **Validation** (line 50):
   ```typescript
   validate({ body: consultationSchema })
   ```
   - Validates name (2-100 chars)
   - Validates email format
   - Validates services array (min 1 service)
   - Validates message (max 5000 chars)

2. **Duplicate Check** (line 64-99):
   - Checks if same email submitted within 5 minutes
   - Returns existing submission if duplicate found

3. **Database Save** (line 101-134):
   ```typescript
   const submission = await prisma.consultationSubmission.create({
     data: {
       name, email, phone, services,
       primaryService: services[0],
       ...
     }
   });
   ```

4. **Service Mapping** (line 138-141):
   ```typescript
   const { getPrimaryServiceForRouting, formatAllServicesForMake } = require('../types/webhook');
   
   const primaryService = getPrimaryServiceForRouting(formData.services);
   // Input: ["companyFormation", "accounting"]
   // Output: "Company Formation" (first service)
   
   const allServicesFormatted = formatAllServicesForMake(formData.services);
   // Input: ["companyFormation", "accounting"]
   // Output: ["Company Formation", "Accounting"]
   ```

5. **Build Webhook Payload** (line 172-191):
   ```typescript
   const webhookPayload = {
     form_type: 'consultation',
     client_name: formData.name.trim(),
     email: formData.email.trim(),
     phone: formData.phone?.trim() || undefined,
     business_name: formData.company?.trim() || undefined,
     business_type: formData.businessType || undefined,
     services: allServicesFormatted,  // ["Company Formation", "Accounting"]
     service_interested: primaryService,  // "Company Formation"
     budget: formData.budget || undefined,
     timeline: formData.timeline || undefined,
     preferred_contact: formData.preferredContact || undefined,
     preferred_time: formData.preferredTime || undefined,
     location: formData.location?.trim() || undefined,
     primary_message: formData.message?.trim() || undefined,
     notes: notes,  // Comprehensive notes field
     language: formData.language,  // "en" or "ar"
     source: 'smartpro-consultation-form',
     timestamp: new Date().toISOString(),
   };
   ```

6. **Send to Webhook** (line 193):
   ```typescript
   const webhookResponse = await webhookClient.send(webhookPayload);
   ```

### Step 4: Webhook Client

**File**: `server/lib/webhookClient.ts`

**Function**: `webhookClient.send()` (line 53)

```typescript
async send(payload: WebhookPayload): Promise<WebhookResponse> {
  // Webhook URL from environment or default
  const url = process.env.MAKE_WEBHOOK_URL || 
    'https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8';
  
  // Send POST request
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: controller.signal,  // 30 second timeout
  });
  
  return {
    success: response.ok,
    data: await response.json(),
  };
}
```

**Request to Make.com**:
```
POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8
Content-Type: application/json

{
  "form_type": "consultation",
  "client_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "business_name": "Acme Corp",
  "business_type": "llc",
  "services": ["Company Formation", "Accounting"],
  "service_interested": "Company Formation",
  "budget": "10k-25k",
  "timeline": "1-3months",
  "preferred_contact": "email",
  "preferred_time": "morning",
  "location": "New York, USA",
  "primary_message": "Need help with setup",
  "notes": "Primary Message: Need help with setup\nPhone: +1234567890\n...",
  "language": "en",
  "source": "smartpro-consultation-form",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Key Components

### Service Mapping

Services are transformed from frontend keys to Make.com format:

| Frontend Key | Make.com Name |
|-------------|---------------|
| `companyFormation` | `Company Formation` |
| `proServices` | `PRO Services` |
| `accounting` | `Accounting` |
| `vat` | `VAT` |
| `businessConsulting` | `Business Consulting` |
| ... | ... |

**Functions**:
- `getPrimaryServiceForRouting()`: Gets first service for email routing
- `formatAllServicesForMake()`: Formats all services to array of readable names

### Notes Field

The `notes` field combines all optional information:
```
Primary Message: Need help with setup
Phone: +1234567890
Location: New York, USA
Business Type: llc
Budget: 10k-25k
Timeline: 1-3months
Preferred Contact: email
Preferred Time: morning
Language: en
```

### Error Handling

1. **Frontend**: Catches network errors, rate limits, validation errors
2. **Backend**: 
   - Returns success even if webhook fails (saves to DB for retry)
   - Logs all errors
   - Updates database with webhook status

### Response Flow

```
Backend → Frontend Response:
{
  "success": true,
  "message": "Consultation request submitted successfully",
  "submissionId": "sub_123456",
  "executionId": "exec_789012"  // From Make.com
}
```

## Environment Variables

**Required**:
- `MAKE_WEBHOOK_URL`: Make.com webhook URL (optional, has default)

**Optional**:
- `VITE_API_URL`: Frontend API base URL
- `DATABASE_URL`: Database connection (for Prisma)

## Testing the Flow

### 1. Test Frontend Submission
```bash
# Open browser console
# Fill form and submit
# Check Network tab for POST /api/consultation
```

### 2. Test Backend Route
```bash
curl -X POST http://localhost:3001/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "services": ["companyFormation"],
    "language": "en"
  }'
```

### 3. Test Webhook Directly
```bash
curl -X POST https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8 \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "consultation",
    "client_name": "Test User",
    "email": "test@example.com",
    "service_interested": "Company Formation",
    "services": ["Company Formation"],
    "language": "en",
    "source": "smartpro-consultation-form"
  }'
```

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify API URL is correct
- Check network tab for failed requests

### Webhook not receiving data
- Check backend logs for webhook errors
- Verify `MAKE_WEBHOOK_URL` is set correctly
- Check Make.com scenario is active

### Services not mapping correctly
- Verify `server/types/webhook.ts` has all service mappings
- Check service keys match between frontend and backend
- Verify `formatAllServicesForMake()` is working

