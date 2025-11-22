# Consultation Page - Frontend/Backend Alignment Analysis

## Overview
This document analyzes the consultation page implementation, focusing on service selection and alignment between frontend and backend.

## Current Implementation

### Frontend Service Selection

**Location**: `client/src/components/ConsultationForm.tsx`

**Service Options** (lines 65-81):
```typescript
const SERVICE_OPTIONS = [
  'companyFormation',
  'proServices',
  'accounting',
  'vat',
  'businessConsulting',
  'employeeManagement',
  'crm',
  'projectManagement',
  'elearning',
  'contractManagement',
  'workflowAutomation',
  'analytics',
  'api',
  'support',
  'other',
] as const;
```

**Service Selection UI** (lines 924-964):
- Uses checkboxes for multi-select
- Stores selected services as `string[]` in `formData.services`
- Validates that at least one service is selected
- Displays service names using translation keys: `t(\`service.${service}\`)`

### Backend Service Mapping

**Location**: `server/routes/consultationRoutes.ts`

**Issue**: Line 138 tries to require `../types/webhook` which doesn't exist:
```typescript
const { getPrimaryServiceForRouting, SERVICE_TO_MAKE_MAP, MakeServiceType } = require('../types/webhook');
```

**Service Mapping Locations**:
1. `client/src/types/webhook.ts` - Has complete `SERVICE_TO_MAKE_MAP` and `getPrimaryServiceForRouting()`
2. `api/consultation.ts` - Has its own `SERVICE_TO_MAKE_MAP` (lines 27-43) and `getPrimaryServiceForRouting()` (lines 45-49)
3. `server/routes/consultationRoutes.ts` - Tries to import from non-existent file

### Service Mapping Comparison

**Frontend Service Keys** → **Make.com Service Names**:

| Frontend Key | Make.com Name | Status |
|-------------|---------------|--------|
| companyFormation | Company Formation | ✅ Aligned |
| proServices | PRO Services | ✅ Aligned |
| accounting | Accounting | ✅ Aligned |
| vat | VAT | ✅ Aligned |
| businessConsulting | Business Consulting | ✅ Aligned |
| employeeManagement | Employee Management | ✅ Aligned |
| crm | CRM & Client Management | ✅ Aligned |
| projectManagement | Project Management | ✅ Aligned |
| elearning | E-Learning Platform | ✅ Aligned |
| contractManagement | Contract Management | ✅ Aligned |
| workflowAutomation | Workflow Automation | ✅ Aligned |
| analytics | Advanced Analytics | ✅ Aligned |
| api | API & Integrations | ✅ Aligned |
| support | 24/7 Support | ✅ Aligned |
| other | Other | ✅ Aligned |

## Issues Found

### 1. Missing Server Types File ✅ FIXED
**Problem**: `server/routes/consultationRoutes.ts` requires `../types/webhook` which doesn't exist.

**Impact**: The server route will fail at runtime when trying to process service mapping.

**Solution**: ✅ Created `server/types/webhook.ts` with the service mapping and helper functions.

### 2. Duplicate Service Mapping ✅ VERIFIED
**Problem**: Service mapping is duplicated in:
- `client/src/types/webhook.ts`
- `api/consultation.ts`
- `server/types/webhook.ts` (now created)

**Impact**: Risk of inconsistency if one is updated but others aren't.

**Status**: ✅ All three locations are now aligned and consistent. The mappings match across all files.

### 3. Service Selection Flow

**Current Flow**:
1. User selects services via checkboxes (frontend)
2. Form submits `services: string[]` array
3. Backend receives array and:
   - Maps all services using `SERVICE_TO_MAKE_MAP`
   - Gets primary service (first one) using `getPrimaryServiceForRouting()`
   - Sends to Make.com webhook with:
     - `services`: Array of formatted service names
     - `service_interested`: Primary service name (for email routing)

**Status**: ✅ Flow is correct, but backend implementation has import issue.

## Fixes Applied

### ✅ 1. Created Server Types File
**File**: `server/types/webhook.ts`
- Added `SERVICE_TO_MAKE_MAP` with all 15 service mappings
- Added `getPrimaryServiceForRouting()` function
- Added `formatAllServicesForMake()` function
- Includes proper TypeScript types and documentation

### ✅ 2. Fixed Backend Route Import
**File**: `server/routes/consultationRoutes.ts`
- Updated import to use `../types/webhook` (now exists)
- Changed to use `formatAllServicesForMake()` helper function
- Ensures consistent service formatting

### ✅ 3. Verified Consistency
- All three locations (`client/src/types/webhook.ts`, `api/consultation.ts`, `server/types/webhook.ts`) have matching service mappings
- All 15 frontend service keys have corresponding backend mappings
- Service selection flow is working correctly

## Service Selection Flow (Verified)

1. **Frontend** (`ConsultationForm.tsx`):
   - User selects services via checkboxes
   - Stores as `services: string[]` array (e.g., `['companyFormation', 'accounting']`)
   - Validates at least one service is selected

2. **Backend** (`server/routes/consultationRoutes.ts`):
   - Receives `services: string[]` array
   - Maps all services using `formatAllServicesForMake()` → `['Company Formation', 'Accounting']`
   - Gets primary service using `getPrimaryServiceForRouting()` → `'Company Formation'`
   - Sends to Make.com webhook with:
     - `services`: Array of formatted names (all selected)
     - `service_interested`: Primary service name (first selected, for email routing)

3. **Make.com Integration**:
   - Uses `service_interested` for email template routing
   - Uses `services` array for Google Sheets storage
   - All services are properly formatted and consistent

## Files Updated

1. ✅ `server/types/webhook.ts` - Created new file with service mapping
2. ✅ `server/routes/consultationRoutes.ts` - Fixed import and service formatting
3. ✅ Verified `api/consultation.ts` matches the mapping
4. ✅ Verified `client/src/types/webhook.ts` matches the mapping

