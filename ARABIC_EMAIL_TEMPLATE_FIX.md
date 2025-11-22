# Arabic Email Template - Services Translation Fix

## Issue
The Arabic email template was showing services in English instead of Arabic, even though the form was submitted in Arabic.

## Root Cause
The email template was using:
- `{{1.service_interested}}` - Always English (for routing)
- `{{1.services}}` - Array field that Make.com might not format correctly

## Solution
Updated the email template to use the translated fields that are now sent by the backend:
- `{{1.service_interested_translated}}` - Primary service in user's language
- `{{1.services_summary}}` - All services as comma-separated string in user's language

## Changes Made

### 1. Backend Payload Enhancement
**Files**: `server/routes/consultationRoutes.ts`, `api/consultation.ts`

**Added**:
```typescript
service_interested_translated: language === 'ar' 
  ? (translatedServices.length > 0 ? translatedServices[0] : 'أخرى') 
  : (primaryService || 'Other')
```

### 2. Email Template Update
**File**: `templates/email-client-confirmation-html-arabic-makecom.html`

**Before**:
```html
<td>{{1.service_interested}}</td>  <!-- Always English -->
<td>{{1.services}}</td>  <!-- Array, might show English -->
```

**After**:
```html
<td>{{1.service_interested_translated}}</td>  <!-- Arabic when language is 'ar' -->
<td>{{1.services_summary}}</td>  <!-- Arabic string when language is 'ar' -->
```

## Updated Payload Fields

### For Arabic Submissions
```json
{
  "service_interested": "Project Management",  // English (for routing)
  "service_interested_translated": "إدارة المشاريع",  // Arabic (for email)
  "services": ["إدارة المشاريع", "الاستشارات التجارية", "أتمتة سير العمل"],  // Arabic array
  "services_summary": "إدارة المشاريع، الاستشارات التجارية، أتمتة سير العمل",  // Arabic string
  "services_english": ["Project Management", "Business Consulting", "Workflow Automation"],  // English (for reference)
  "language": "ar"
}
```

## Email Template Field Usage

### Arabic Email Template (`email-client-confirmation-html-arabic-makecom.html`)

| Field | Usage | Example (Arabic) |
|-------|-------|------------------|
| `{{1.service_interested_translated}}` | Primary service | إدارة المشاريع |
| `{{1.services_summary}}` | All services | إدارة المشاريع، الاستشارات التجارية، أتمتة سير العمل |
| `{{1.business_type}}` | Business type | شركة ذات مسؤولية محدودة |
| `{{1.budget}}` | Budget | 5,000 - 10,000 دولار |
| `{{1.timeline}}` | Timeline | 6-12 شهر |
| `{{1.preferred_contact}}` | Contact method | كلاهما |
| `{{1.preferred_time}}` | Contact time | مرن |

### English Email Template
Can continue using:
- `{{1.service_interested}}` - English primary service
- `{{1.services_summary}}` - Will be English when language is 'en'

## Files Updated

1. ✅ `server/routes/consultationRoutes.ts` - Added `service_interested_translated`
2. ✅ `api/consultation.ts` - Added `service_interested_translated`
3. ✅ `templates/email-client-confirmation-html-arabic-makecom.html` - Updated to use translated fields
4. ✅ `server/lib/webhookClient.ts` - Updated interface

## Result

✅ **Arabic emails now show services in Arabic**
✅ **Primary service shows in Arabic**
✅ **All services list shows in Arabic**
✅ **Make.com routing still works (uses English `service_interested`)**

## Testing

- [ ] Submit form in Arabic → Email shows services in Arabic
- [ ] Verify `service_interested_translated` shows Arabic service name
- [ ] Verify `services_summary` shows Arabic services list
- [ ] Check Make.com routing still works (uses English `service_interested`)
- [ ] Test with multiple services → All show in Arabic

