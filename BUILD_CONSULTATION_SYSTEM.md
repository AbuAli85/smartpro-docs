# Building the Complete Consultation System

## 🎯 **What We Need to Build**

Based on the workflow, here's what needs to be implemented:

---

## 📋 **Implementation Checklist**

### **Phase 1: Core Consultation System** ✅ (Mostly Done)

- [x] Consultation form (frontend)
- [x] API endpoint (`POST /api/consultation`)
- [x] Database schema (`consultation_submissions`, `leads`)
- [x] Webhook integration (Make.com)
- [x] Thank you page
- [x] Lead tracking system

**Status:** ✅ **COMPLETE** - Consultation submission works!

---

### **Phase 2: Consultation Management Dashboard** ⏳ (To Build)

**What to Build:**

1. **Admin Dashboard - View Consultations**
   ```typescript
   // Page: /admin/consultations
   - List all consultations
   - Filter by: status, service, date
   - Search by: name, email, submission_id
   - Sort by: date, status
   - Pagination
   ```

2. **Consultation Detail View**
   ```typescript
   // Page: /admin/consultations/[id]
   - Full consultation details
   - Client information
   - Services requested
   - Budget and timeline
   - Message/notes
   - Status management
   - Add internal notes
   - Update status
   - Assign to provider
   - Convert to booking button
   ```

3. **Provider Dashboard - My Consultations**
   ```typescript
   // Page: /provider/consultations
   - Consultations assigned to me
   - Filter by status
   - Quick actions (contact, create booking)
   ```

**Database Queries Needed:**
```sql
-- Get all consultations
SELECT * FROM consultation_submissions 
ORDER BY created_at DESC;

-- Get consultation by ID
SELECT * FROM consultation_submissions 
WHERE submission_id = $1;

-- Update consultation status
UPDATE consultation_submissions 
SET status = $1, notes = $2 
WHERE submission_id = $3;
```

---

### **Phase 3: Convert Consultation to Booking** ⏳ (To Build)

**What to Build:**

1. **"Create Booking" Button**
   - In consultation detail view
   - Pre-fills booking form with consultation data
   - Links booking to consultation

2. **Booking Creation Form**
   ```typescript
   // Pre-filled from consultation:
   - client_id (from consultation.user_id)
   - service_id (from consultation.primary_service)
   - notes (from consultation.message)
   - scheduled_at (from consultation.timeline)
   - provider_id (assigned provider)
   - provider_company_id (provider's company)
   ```

3. **Backend API**
   ```typescript
   // POST /api/bookings/create-from-consultation
   {
     consultation_id: "sub_1234567890",
     provider_id: "provider_uuid",
     service_id: "service_uuid",
     price: 1000,
     scheduled_at: "2025-02-01T10:00:00Z"
   }
   ```

4. **Update Consultation Status**
   ```sql
   UPDATE consultation_submissions 
   SET status = 'completed',
       notes = CONCAT(notes, '\nConverted to booking: ', $1)
   WHERE submission_id = $2;
   ```

**Implementation:**
```typescript
// server/routes/bookings.ts
router.post('/create-from-consultation', async (req, res) => {
  const { consultation_id, provider_id, service_id, price, scheduled_at } = req.body;
  
  // Get consultation data
  const consultation = await prisma.consultationSubmission.findUnique({
    where: { submissionId: consultation_id }
  });
  
  // Create booking
  const booking = await prisma.booking.create({
    data: {
      client_id: consultation.user_id,
      provider_id,
      service_id,
      provider_company_id: /* get from provider */,
      price,
      scheduled_at,
      status: 'pending',
      notes: consultation.message
    }
  });
  
  // Update consultation
  await prisma.consultationSubmission.update({
    where: { submissionId: consultation_id },
    data: {
      status: 'completed',
      notes: `Converted to booking: ${booking.id}`
    }
  });
  
  // Update lead
  await prisma.lead.update({
    where: { submissionId: consultation_id },
    data: {
      current_stage: 'first_service_booked',
      stages: { push: 'first_service_booked' }
    }
  });
  
  res.json({ success: true, booking });
});
```

---

### **Phase 4: Client Registration Integration** ⏳ (To Build)

**What to Build:**

1. **Pre-fill Registration Form**
   ```typescript
   // When user clicks "Register" from thank you page
   // URL: /auth/sign-up?submissionId=sub_123&email=user@example.com
   
   // In sign-up form:
   const params = new URLSearchParams(window.location.search);
   const submissionId = params.get('submissionId');
   const email = params.get('email');
   
   // Pre-fill email field
   if (email) {
     setFormData({ ...formData, email });
   }
   ```

2. **Link Consultation After Registration**
   ```typescript
   // After successful registration
   await fetch('/api/consultations/link', {
     method: 'POST',
     body: JSON.stringify({
       submission_id: submissionId,
       user_id: newUser.id
     })
   });
   ```

3. **Backend API**
   ```typescript
   // POST /api/consultations/link
   router.post('/link', async (req, res) => {
     const { submission_id, user_id } = req.body;
     
     // Link consultation to user
     await prisma.consultationSubmission.update({
       where: { submissionId: submission_id },
       data: { user_id }
     });
     
     // Update profile
     await prisma.profile.update({
       where: { id: user_id },
       data: { consultation_submission_id: submission_id }
     });
     
     // Update lead
     await prisma.lead.update({
       where: { submissionId: submission_id },
       data: {
         current_stage: 'registration_completed',
         stages: { push: 'registration_completed' }
       }
     });
     
     res.json({ success: true });
   });
   ```

4. **Show Consultation in Client Dashboard**
   ```typescript
   // Page: /client/dashboard
   // Show linked consultation
   const consultation = await prisma.consultationSubmission.findFirst({
     where: { user_id: currentUser.id }
   });
   ```

---

### **Phase 5: Provider Assignment** ⏳ (To Build)

**What to Build:**

1. **Assign Consultation to Provider**
   ```typescript
   // In admin consultation detail view
   // Dropdown: Select provider
   // Button: "Assign to Provider"
   
   // API: POST /api/consultations/assign
   {
     consultation_id: "sub_123",
     provider_id: "provider_uuid"
   }
   ```

2. **Provider Notification**
   ```typescript
   // When consultation assigned:
   - Create notification
   - Send email (via Make.com)
   - Show in provider dashboard
   ```

3. **Provider Dashboard**
   ```typescript
   // Page: /provider/consultations
   // Show assigned consultations
   SELECT * FROM consultation_submissions 
   WHERE assigned_provider_id = $1;
   ```

---

## 🗂️ **File Structure to Create**

```
smartpro-docs/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── admin/
│       │   │   └── consultations/
│       │   │       ├── index.tsx          # List consultations
│       │   │       └── [id].tsx           # Consultation detail
│       │   ├── provider/
│       │   │   └── consultations/
│       │   │       └── index.tsx          # Provider consultations
│       │   └── client/
│       │       └── dashboard.tsx          # Show linked consultation
│       └── components/
│           ├── ConsultationList.tsx
│           ├── ConsultationDetail.tsx
│           └── CreateBookingFromConsultation.tsx
│
└── server/
    └── routes/
        ├── consultations.ts              # Consultation management API
        └── bookings.ts                   # Booking creation API
```

---

## 🔧 **API Endpoints to Create**

### **Consultation Management**

```typescript
// GET /api/consultations
// List all consultations (admin)
// Query params: status, service, page, limit

// GET /api/consultations/:id
// Get consultation details

// PUT /api/consultations/:id
// Update consultation (status, notes, assign provider)

// POST /api/consultations/:id/assign
// Assign consultation to provider

// POST /api/consultations/:id/convert-to-booking
// Convert consultation to booking
```

### **Booking Creation**

```typescript
// POST /api/bookings/create-from-consultation
// Create booking from consultation

// GET /api/bookings
// List bookings

// GET /api/bookings/:id
// Get booking details
```

### **Client Integration**

```typescript
// POST /api/consultations/link
// Link consultation to user account

// GET /api/consultations/my-consultation
// Get current user's consultation (client)
```

---

## 📊 **Database Schema (Already Created)**

✅ All tables exist in `UNIFIED_SCHEMA_MIGRATION.sql`:
- `consultation_submissions` ✅
- `leads` ✅
- `profiles` ✅
- `bookings` ✅
- `services` ✅
- `companies` ✅

---

## 🚀 **Priority Order**

### **Priority 1: Consultation Management Dashboard** (Most Important)
- Admin can view all consultations
- Admin can see consultation details
- Admin can update status
- **Time:** 2-3 days

### **Priority 2: Convert to Booking** (High Value)
- One-click booking creation
- Pre-fill from consultation
- Link booking to consultation
- **Time:** 1-2 days

### **Priority 3: Client Registration Link** (User Experience)
- Pre-fill registration form
- Link consultation to account
- Show in dashboard
- **Time:** 1 day

### **Priority 4: Provider Assignment** (Nice to Have)
- Assign consultations
- Provider dashboard
- Notifications
- **Time:** 2 days

---

## ✅ **Quick Start: Build Consultation Dashboard**

**Step 1: Create API Route**
```typescript
// server/routes/consultations.ts
import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/consultations
router.get('/', async (req, res) => {
  const consultations = await prisma.consultationSubmission.findMany({
    orderBy: { created_at: 'desc' },
    take: 50
  });
  res.json({ consultations });
});

// GET /api/consultations/:id
router.get('/:id', async (req, res) => {
  const consultation = await prisma.consultationSubmission.findUnique({
    where: { submission_id: req.params.id }
  });
  res.json({ consultation });
});

export default router;
```

**Step 2: Create Frontend Page**
```typescript
// client/src/pages/admin/consultations/index.tsx
export default function ConsultationsPage() {
  const { data } = useQuery('/api/consultations');
  
  return (
    <div>
      <h1>Consultations</h1>
      <ConsultationList consultations={data.consultations} />
    </div>
  );
}
```

**Step 3: Add to Navigation**
- Add "Consultations" link to admin menu
- Link to `/admin/consultations`

---

## 🎯 **Summary**

**What's Done:**
- ✅ Consultation form submission
- ✅ Database storage
- ✅ Webhook integration
- ✅ Lead tracking

**What to Build Next:**
1. **Consultation Management Dashboard** (Priority 1)
2. **Convert to Booking** (Priority 2)
3. **Client Registration Link** (Priority 3)
4. **Provider Assignment** (Priority 4)

**Start with Priority 1** - it's the foundation for everything else! 🚀

