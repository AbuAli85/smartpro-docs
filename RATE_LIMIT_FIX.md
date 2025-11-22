# Rate Limit Fix - 429 Too Many Requests

## 🔍 Problem

**Error:** `[429] Too many requests. You can only make 2 requests per second.`

**Root Cause:**
- Make.com/Resend API has a rate limit of **2 requests per second**
- Multiple webhook calls happening too quickly
- No rate limiting on our side

## ✅ Fixes Applied

### 1. Added Rate Limiting

**Implementation:**
```typescript
const RATE_LIMIT_REQUESTS = 2; // Max 2 requests per second
const RATE_LIMIT_WINDOW_MS = 1000; // 1 second window

function checkRateLimit(): { allowed: boolean; retryAfter?: number } {
  // Count requests in the last second
  // If >= 2, block and return retry time
}
```

**Benefits:**
- ✅ Prevents exceeding 2 requests/second limit
- ✅ Returns 429 with retry time if limit exceeded
- ✅ Tracks requests in sliding 1-second window

### 2. Rate Limit Tracking

**Global Rate Limit Cache:**
- Tracks all webhook requests (not per-user)
- Maintains sliding window of last second
- Automatically cleans up old entries

### 3. Error Response

**When Rate Limited:**
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please wait X second(s) before trying again.",
  "retryAfter": 1
}
```

**HTTP Status:** `429 Too Many Requests`

## 📊 Rate Limiting Flow

```
1. Request Received
   ↓
2. Check Rate Limit (last 1 second)
   ↓
3. If >= 2 requests in last second:
   → Return 429 with retry time
   ↓
4. If < 2 requests:
   → Record request timestamp
   → Continue with webhook call
```

## 🎯 Combined Protection Layers

### Layer 1: Duplicate Prevention
- ✅ Idempotency key (email + name + services)
- ✅ 10-minute webhook call cache
- ✅ Prevents duplicate submissions

### Layer 2: Rate Limiting
- ✅ 2 requests per second limit
- ✅ Global rate limit tracking
- ✅ Returns 429 if exceeded

### Layer 3: Make.com Configuration
- ⚠️ Language-based routing (still needed)
- ⚠️ Idempotency key checking (optional)

## 🧪 Testing

### Test Rate Limiting:

1. **Single Request:**
   - Submit form once
   - Should succeed (if under rate limit)

2. **Rapid Requests:**
   - Submit form 3 times in < 1 second
   - First 2 should succeed
   - Third should return 429 with retry time

3. **After Retry Time:**
   - Wait for retry time
   - Submit again
   - Should succeed

## ⚠️ Important Notes

1. **Rate Limit is Global:**
   - Applies to ALL requests (not per user)
   - Prevents system-wide rate limit violations

2. **Make.com Still Needs Configuration:**
   - Language routing to prevent both languages
   - May need to add delays between email sends in Make.com

3. **Retry Logic:**
   - Frontend should handle 429 errors
   - Show user-friendly message
   - Optionally auto-retry after retry time

## 📝 Frontend Handling (Recommended)

Add retry logic in frontend:

```typescript
try {
  const response = await consultationApi.submit(payload);
} catch (error) {
  if (error.status === 429) {
    const retryAfter = error.retryAfter || 1;
    // Show message: "Please wait X seconds and try again"
    // Optionally auto-retry after delay
  }
}
```

## 🔧 Make.com Configuration

### Option 1: Add Delays Between Email Sends

In Make.com scenario, add delays between email modules:
- Add "Sleep" module between email sends
- Delay: 500ms - 1 second

### Option 2: Use Make.com's Rate Limiting

- Configure Make.com to respect rate limits
- Use Make.com's built-in retry logic

## ✅ Summary

**Backend Fixes:**
- ✅ Rate limiting added (2 req/sec)
- ✅ 429 error response with retry time
- ✅ Global rate limit tracking

**Still Needed:**
- ⚠️ Frontend retry logic for 429 errors
- ⚠️ Make.com language routing
- ⚠️ Make.com email send delays (optional)

---

**Last Updated:** 2025-01-22  
**Status:** Rate limiting implemented, Make.com configuration still needed

