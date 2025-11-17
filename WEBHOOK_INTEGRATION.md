# Webhook Integration Documentation

## Overview

This document describes the professional integration between the frontend consultation form and the Make.com webhook backend.

## Architecture

```
┌─────────────────┐
│ ConsultationForm│
│   (Frontend)    │
└────────┬────────┘
         │
         │ buildWebhookPayload()
         ▼
┌─────────────────┐
│  WebhookClient  │
│  (Integration)  │
└────────┬────────┘
         │
         │ POST /webhook
         │ + Retry Logic
         │ + Error Handling
         ▼
┌─────────────────┐
│  Make.com Flow  │
│   (Backend)     │
└────────┬────────┘
         │
         ├─► Google Sheets
         ├─► AI Email Generation
         └─► Resend Email Service
```

## Type Safety

### Frontend Types (`client/src/types/webhook.ts`)

```typescript
interface MakeWebhookPayload {
  // Required fields
  client_name: string;
  email: string;
  business_name: string;
  service_interested: string;
  notes: string;
  
  // Optional fields
  phone?: string;
  business_type?: string;
  // ... more fields
}
```

### Service Mapping

Services are automatically mapped from frontend keys to Make.com expected format:

| Frontend Key | Make.com Format | Email Template |
|-------------|-----------------|----------------|
| `accounting` | `Accounting` | Accounting flow |
| `proServices` | `PRO Services` | PRO Services flow |
| `companyFormation` | `Company Formation` | Company Formation flow |
| `vat` | `VAT` | Default flow |
| `businessConsulting` | `Business Consulting` | Default flow |
| Others | Various | Default flow |

## Webhook Client Features

### 1. **Automatic Retry Logic**
- Retries failed requests up to 2 times
- Exponential backoff between retries
- No retry on client errors (4xx)

### 2. **Request Timeout**
- 30-second timeout per request
- Prevents hanging requests

### 3. **Payload Validation**
- Validates required fields before sending
- Email format validation
- Prevents invalid data from reaching backend

### 4. **Error Handling**
- Custom `WebhookError` class
- Status code tracking
- Detailed error messages

### 5. **Metadata Enrichment**
- Automatic timestamp
- User agent tracking
- Referrer tracking

## Data Flow

### 1. Form Submission
```typescript
// User fills form and submits
const payload = buildWebhookPayload();
// Payload is validated and formatted
```

### 2. Webhook Request
```typescript
// WebhookClient sends with retry logic
const response = await webhookClient.send(payload);
```

### 3. Make.com Processing
- Receives webhook payload
- Routes based on `service_interested`
- Generates AI email content
- Saves to Google Sheets
- Sends email via Resend

### 4. Response Handling
```typescript
if (response.success) {
  // Track analytics
  // Reset form
  // Show success message
}
```

## Payload Structure

### Required Fields (for Make.com routing)

```json
{
  "client_name": "John Doe",
  "email": "john@example.com",
  "business_name": "Acme Corp",
  "service_interested": "Accounting, VAT",
  "notes": "Primary message\nPhone: +1234567890\nLocation: New York\n..."
}
```

### Notes Field Format

The `notes` field contains structured information:

```
[Primary Message]

Phone: +1234567890
Location: New York, USA
Business Type: Limited Liability Company (LLC)
Budget: $10,000 - $25,000
Timeline: 3-6 Months
Preferred Contact: Both
Preferred Time: Afternoon (12 PM - 5 PM)
Language: English
```

## Error Handling

### Error Types

1. **Validation Errors** (400)
   - Invalid email format
   - Missing required fields
   - No retry attempted

2. **Network Errors** (Timeout/Connection)
   - Automatic retry with backoff
   - User-friendly error messages

3. **Server Errors** (500+)
   - Automatic retry
   - Logged for monitoring

### Error Response Format

```typescript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR" | "NETWORK_ERROR" | "SERVER_ERROR",
    message: "Human-readable error message",
    details: [...]
  }
}
```

## Testing

### Manual Testing

1. **Test Valid Submission**
   ```typescript
   // Fill form with valid data
   // Submit and verify success
   // Check Make.com execution history
   // Verify Google Sheets entry
   // Confirm email sent
   ```

2. **Test Error Handling**
   ```typescript
   // Test with invalid email
   // Test with missing required fields
   // Test network timeout (disable network)
   ```

### Integration Testing

```typescript
import { webhookClient } from '@/lib/webhookClient';
import { MakeWebhookPayload } from '@/types/webhook';

const testPayload: MakeWebhookPayload = {
  client_name: "Test User",
  email: "test@example.com",
  business_name: "Test Company",
  service_interested: "Accounting",
  notes: "Test submission",
};

const response = await webhookClient.send(testPayload);
console.log(response);
```

## Configuration

### Environment Variables

```env
# .env file
VITE_MAKE_WEBHOOK_URL=https://hook.eu2.make.com/YOUR_WEBHOOK_ID
```

### Webhook Client Options

```typescript
const client = new WebhookClient(url, {
  timeout: 30000,    // 30 seconds
  retries: 2,        // 2 retries
  retryDelay: 1000,  // 1 second base delay
});
```

## Monitoring & Analytics

### Tracked Events

1. **Successful Submissions**
   - Services count
   - Budget/timeline presence
   - Language preference
   - Execution ID (if available)

2. **Errors**
   - Error type
   - Error code
   - Error message

### Google Analytics Integration

```typescript
trackFormSubmit("consultation_form", {
  services_count: 2,
  has_budget: true,
  has_timeline: true,
  language: "en",
  execution_id: "exec-123",
});
```

## Best Practices

1. **Always validate before sending**
   - Use `validateWebhookPayload()` before submission

2. **Handle errors gracefully**
   - Show user-friendly messages
   - Log detailed errors for debugging

3. **Rate limiting**
   - Client-side rate limiting prevents abuse
   - 3 submissions per minute limit

4. **Data sanitization**
   - Trim whitespace from inputs
   - Validate email format
   - Sanitize user input

5. **Type safety**
   - Use TypeScript types throughout
   - No `any` types in payload

## Troubleshooting

### Common Issues

1. **Webhook not receiving data**
   - Check webhook URL in config
   - Verify Make.com scenario is active
   - Check browser console for errors

2. **Email not sending**
   - Verify Make.com flow execution
   - Check Resend API configuration
   - Review Make.com execution logs

3. **Data not in Google Sheets**
   - Verify Google Sheets connection
   - Check sheet name matches ("leads")
   - Verify column structure

## Future Enhancements

1. **Webhook Response Parsing**
   - Parse execution ID from response
   - Track webhook execution status

2. **Enhanced Retry Logic**
   - Configurable retry strategies
   - Circuit breaker pattern

3. **Payload Compression**
   - Compress large payloads
   - Reduce bandwidth usage

4. **Webhook Signing**
   - Add HMAC signature verification
   - Enhanced security

## Support

For issues or questions:
- Check Make.com execution history
- Review browser console logs
- Check Google Sheets for data
- Verify webhook URL configuration

