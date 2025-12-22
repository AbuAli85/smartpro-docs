# Component Extraction Plan

## 📋 **Executive Summary**

This document outlines the specific components, features, and code to extract from both existing systems for integration into SmartPro.

**Last Updated:** Based on analysis of both repositories

---

## 🎯 **Extraction Strategy**

### **From business-services-hub → Marketplace Platform**

### **From Contract-Management-System → Enterprise Platform**

### **Shared Components → Both Platforms**

---

## 📦 **1. BUSINESS-SERVICES-HUB EXTRACTION**

### **1.1 Service Management Components** 🔴 **CRITICAL**

#### **Components to Extract:**
```
business-services-hub/
├── components/
│   └── services/
│       └── EnhancedServiceTable.tsx          → Marketplace Service Management
│
├── app/
│   ├── dashboard/
│   │   └── services/
│   │       ├── page.tsx                      → Service Listing Page
│   │       ├── create/page.tsx               → Create Service Page
│   │       ├── [id]/page.tsx                 → Service Details Page
│   │       └── manage/page.tsx               → Manage Services Page
│   │
│   └── services/
│       ├── page.tsx                          → Public Service Catalog
│       └── [id]/page.tsx                      → Public Service Details
│
└── app/api/
    └── services/
        ├── route.ts                          → Service API (GET, POST)
        └── [id]/route.ts                     → Service API (GET, PUT, DELETE)
```

#### **Key Features:**
- ✅ Service creation with categories
- ✅ Service editing and management
- ✅ Service search and filtering
- ✅ Service status management
- ✅ Service pricing and packages
- ✅ Service image upload
- ✅ Service description and details

#### **Dependencies:**
- `@supabase/supabase-js` - Database operations
- `react-hook-form` - Form handling
- `zod` - Validation
- `@radix-ui/react-*` - UI components

---

### **1.2 Booking System Components** 🔴 **CRITICAL**

#### **Components to Extract:**
```
business-services-hub/
├── components/
│   └── booking/
│       └── SmartStatusOverview.tsx            → Booking Status Component
│
├── app/
│   └── dashboard/
│       └── bookings/
│           ├── page.tsx                      → Booking List Page
│           ├── create/page.tsx               → Create Booking Page
│           └── [id]/page.tsx                 → Booking Details Page
│
└── app/api/
    └── bookings/
        ├── route.ts                          → Booking API
        ├── [id]/route.ts                     → Booking Details API
        ├── summary/route.ts                  → Booking Summary API
        └── export/route.ts                   → Booking Export API
```

#### **Key Features:**
- ✅ 5 View Modes (Card, Table, Calendar, Professional, Enhanced)
- ✅ Real-time updates via Supabase Realtime
- ✅ Advanced filtering (status, search, date)
- ✅ Bulk actions (multi-select operations)
- ✅ Progress tracking with milestones
- ✅ Export options (CSV/PDF)
- ✅ Responsive design

#### **Database Views to Extract:**
- `v_booking_status` - Main booking status view
- `bookings_full_view` - Complete booking information

---

### **1.3 Dashboard Analytics Components** 🟡 **IMPORTANT**

#### **Components to Extract:**
```
business-services-hub/
├── components/
│   └── dashboard/
│       ├── (various analytics components)     → Dashboard Widgets
│
├── app/
│   └── dashboard/
│       ├── analytics/page.tsx                → Analytics Dashboard
│       └── overview/page.tsx                  → Overview Dashboard
│
└── app/api/
    └── analytics/
        ├── kpis/route.ts                     → KPI Analytics API
        ├── revenue/route.ts                   → Revenue Analytics API
        ├── booking-trends/route.ts            → Booking Trends API
        └── completion/route.ts              → Completion Analytics API
```

#### **Key Features:**
- ✅ KPI metrics (revenue, bookings, completion rates)
- ✅ Revenue forecasting
- ✅ Booking trends analysis
- ✅ Completion analytics
- ✅ Interactive charts (Recharts)
- ✅ Real-time data updates

---

### **1.4 Invoice Management Components** 🟡 **IMPORTANT**

#### **Components to Extract:**
```
business-services-hub/
├── components/
│   └── invoice/
│       ├── Invoice.tsx                        → Invoice Component
│       ├── InvoiceTemplate.tsx                → Invoice Template
│       └── InvoiceExample.tsx                 → Invoice Example
│
├── app/
│   └── dashboard/
│       └── invoices/
│           ├── page.tsx                      → Invoice List Page
│           └── template/page.tsx             → Invoice Template Page
│
└── app/api/
    └── invoices/
        ├── route.ts                          → Invoice API
        ├── generate-pdf/route.ts             → PDF Generation API
        └── generate-automated/route.ts      → Automated Invoice API
```

#### **Key Features:**
- ✅ Invoice generation
- ✅ PDF generation
- ✅ Invoice templates
- ✅ Automated invoice creation
- ✅ Invoice status tracking

---

### **1.5 Client & Provider Dashboards** 🔴 **CRITICAL**

#### **Components to Extract:**
```
business-services-hub/
├── app/
│   └── dashboard/
│       ├── client/
│       │   ├── page.tsx                      → Client Dashboard
│       │   └── layout.tsx                     → Client Layout
│       │
│       └── provider/
│           ├── page.tsx                      → Provider Dashboard
│           ├── earnings/page.tsx             → Earnings Dashboard
│           ├── clients/page.tsx              → Client Management
│           └── layout.tsx                     → Provider Layout
```

#### **Key Features:**
- ✅ Role-based dashboards
- ✅ KPI metrics
- ✅ Recent activity feeds
- ✅ Quick actions
- ✅ Real-time updates
- ✅ Error boundaries with retry

---

### **1.6 Authentication Components** 🟡 **IMPORTANT**

#### **Components to Extract:**
```
business-services-hub/
├── components/
│   └── auth/
│       └── ErrorBoundary.tsx                 → Auth Error Handling
│
├── app/
│   └── auth/
│       ├── sign-in/page.tsx                   → Sign In Page
│       ├── sign-up/page.tsx                   → Sign Up Page
│       ├── forgot-password/page.tsx           → Forgot Password
│       └── reset-password/page.tsx            → Reset Password
│
└── app/api/
    └── auth/
        ├── sign-in/route.ts                  → Sign In API
        ├── session/route.ts                   → Session API
        └── profile-creation/route.ts         → Profile Creation API
```

---

### **1.7 Notification System** 🟢 **RECOMMENDED**

#### **Components to Extract:**
```
business-services-hub/
├── components/
│   └── notifications/
│       ├── notification-bell.tsx              → Notification Bell
│       ├── notification-center.tsx            → Notification Center
│       └── notification-settings.tsx         → Notification Settings
│
├── app/
│   └── dashboard/
│       └── notifications/
│           └── page.tsx                      → Notifications Page
│
└── app/api/
    └── notifications/
        └── email/route.ts                     → Email Notifications API
```

---

### **1.8 Shared UI Components** 🟡 **IMPORTANT**

#### **Components to Extract:**
```
business-services-hub/
├── components/
│   └── ui/
│       ├── StatusBadge.tsx                    → Status Badge Component
│       ├── StatusPill.tsx                     → Status Pill Component
│       ├── EmptyState.tsx                     → Empty State Component
│       ├── PaginationFooter.tsx               → Pagination Component
│       └── (all other ui components)          → Reusable UI Library
```

---

## 📦 **2. CONTRACT-MANAGEMENT-SYSTEM EXTRACTION**

### **2.1 Contract Management Components** 🔴 **CRITICAL**

#### **Components to Extract:**
```
Contract-Management-System/
├── components/
│   └── contracts/
│       ├── contract-list-page.tsx            → Contract List
│       ├── contract-detail-page.tsx           → Contract Details
│       ├── contract-form-wrapper.tsx          → Contract Form
│       ├── contract-actions.tsx                → Contract Actions
│       └── contract-status-indicator.tsx      → Status Indicator
│
├── app/
│   └── [locale]/
│       └── contracts/
│           ├── page.tsx                      → Contract List Page
│           ├── [id]/page.tsx                  → Contract Details Page
│           ├── new/page.tsx                   → Create Contract Page
│           └── layout.tsx                     → Contract Layout
│
└── app/api/
    └── contracts/
        ├── route.ts                          → Contract API
        └── [id]/route.ts                     → Contract Details API
```

#### **Key Features:**
- ✅ Full contract lifecycle management
- ✅ Contract generation from templates
- ✅ Approval workflows
- ✅ Version control
- ✅ Document generation (PDF)
- ✅ Status tracking
- ✅ Contract analytics

---

### **2.2 RBAC System** 🔴 **CRITICAL**

#### **Components to Extract:**
```
Contract-Management-System/
├── lib/
│   └── rbac/
│       ├── (RBAC implementation files)         → RBAC Core Logic
│
├── components/
│   ├── auth-guard.tsx                        → Auth Guard Component
│   ├── permission-aware-header.tsx           → Permission Header
│   └── permission-aware-sidebar.tsx          → Permission Sidebar
│
└── app/api/
    └── permissions/
        └── route.ts                          → Permissions API
```

#### **Key Features:**
- ✅ Role-based access control
- ✅ Permission checking
- ✅ Route guards
- ✅ Component-level permissions
- ✅ Admin permission management

---

### **2.3 CRM (Party Management)** 🔴 **CRITICAL**

#### **Components to Extract:**
```
Contract-Management-System/
├── components/
│   └── parties/
│       ├── party-list.tsx                     → Party List Component
│       ├── party-detail.tsx                   → Party Details Component
│       └── party-form.tsx                     → Party Form Component
│
├── app/
│   └── [locale]/
│       └── parties/
│           ├── page.tsx                      → Party List Page
│           └── [id]/page.tsx                  → Party Details Page
│
└── app/api/
    └── parties/
        ├── route.ts                          → Party API
        └── [id]/route.ts                     → Party Details API
```

#### **Key Features:**
- ✅ Client/Party management
- ✅ Contact information
- ✅ Relationship tracking
- ✅ Party analytics
- ✅ Search and filtering

---

### **2.4 Promoter Management (Service Providers)** 🔴 **CRITICAL**

#### **Components to Extract:**
```
Contract-Management-System/
├── components/
│   └── promoters/
│       ├── promoters-table.tsx               → Promoter Table
│       ├── promoter-form.tsx                 → Promoter Form
│       └── promoter-profile-form.tsx          → Profile Form
│
├── app/
│   └── [locale]/
│       └── manage-promoters/
│           ├── page.tsx                      → Promoter List Page
│           └── [id]/page.tsx                 → Promoter Details Page
│
└── app/api/
    └── promoters/
        ├── route.ts                          → Promoter API
        └── [id]/route.ts                     → Promoter Details API
```

#### **Key Features:**
- ✅ Service provider management
- ✅ Provider profiles
- ✅ Document management
- ✅ Status tracking
- ✅ Analytics and reporting

---

### **2.5 Invoice Management** 🟡 **IMPORTANT**

#### **Components to Extract:**
```
Contract-Management-System/
├── components/
│   └── invoices/
│       └── (invoice components)               → Invoice Components
│
├── app/
│   └── [locale]/
│       └── invoices/
│           └── page.tsx                      → Invoice List Page
│
└── app/api/
    └── invoices/
        └── route.ts                          → Invoice API
```

#### **Key Features:**
- ✅ Invoice generation
- ✅ Invoice templates
- ✅ PDF generation
- ✅ Invoice tracking
- ✅ Payment status

---

### **2.6 Approval Workflows** 🟡 **IMPORTANT**

#### **Components to Extract:**
```
Contract-Management-System/
├── components/
│   └── approval/
│       ├── (approval components)              → Approval Components
│
├── app/
│   └── [locale]/
│       └── dashboard/
│           └── approvals/
│               └── page.tsx                  → Approvals Page
│
└── app/api/
    └── approvals/
        └── route.ts                          → Approvals API
```

#### **Key Features:**
- ✅ Multi-step approval process
- ✅ Approval notifications
- ✅ Approval history
- ✅ Workflow configuration

---

### **2.7 Multi-language Support** 🟢 **RECOMMENDED**

#### **Components to Extract:**
```
Contract-Management-System/
├── components/
│   └── language-switcher.tsx                 → Language Switcher
│
├── i18n/
│   └── (translation files)                   → Translation Files
│
└── app/
    └── [locale]/
        └── (localized routes)                 → Localized Routes
```

#### **Key Features:**
- ✅ English/Arabic support
- ✅ next-intl integration
- ✅ Language switching
- ✅ Localized content

---

### **2.8 MFA (Multi-Factor Authentication)** 🟢 **RECOMMENDED**

#### **Components to Extract:**
```
Contract-Management-System/
├── components/
│   └── auth/
│       └── (MFA components)                  → MFA Components
│
└── app/api/
    └── auth/
        └── mfa/route.ts                      → MFA API
```

#### **Key Features:**
- ✅ TOTP-based MFA
- ✅ QR code generation
- ✅ Backup codes
- ✅ MFA enforcement

---

## 📋 **3. EXTRACTION CHECKLIST**

### **Phase 1: Service Management (Week 1)**
- [ ] Extract service management components from business-services-hub
- [ ] Extract service API routes
- [ ] Extract service database schema
- [ ] Adapt for Marketplace platform
- [ ] Test service creation/editing

### **Phase 2: Booking System (Week 2)**
- [ ] Extract booking UI from business-services-hub
- [ ] Extract booking logic from Contract-Management-System
- [ ] Merge booking systems
- [ ] Extract booking API routes
- [ ] Extract booking database views
- [ ] Test booking flow

### **Phase 3: Contract Management (Week 3)**
- [ ] Extract contract management components
- [ ] Extract contract API routes
- [ ] Extract contract database schema
- [ ] Adapt for Enterprise platform
- [ ] Test contract creation/management

### **Phase 4: RBAC & Auth (Week 3)**
- [ ] Extract RBAC system from Contract-Management-System
- [ ] Extract authentication components
- [ ] Extract permission management
- [ ] Integrate with Supabase Auth
- [ ] Test role-based access

### **Phase 5: CRM & Providers (Week 4)**
- [ ] Extract party management (CRM) from Contract-Management-System
- [ ] Extract promoter management from Contract-Management-System
- [ ] Adapt for Enterprise CRM
- [ ] Adapt for Marketplace providers
- [ ] Test management features

### **Phase 6: Analytics & Dashboards (Week 4)**
- [ ] Extract dashboard analytics from business-services-hub
- [ ] Extract dashboard components
- [ ] Extract analytics API routes
- [ ] Adapt for both platforms
- [ ] Test analytics features

### **Phase 7: Invoices & Payments (Week 5)**
- [ ] Extract invoice components from both systems
- [ ] Merge invoice features
- [ ] Extract invoice API routes
- [ ] Integrate payment processing
- [ ] Test invoice generation

### **Phase 8: Additional Features (Week 5)**
- [ ] Extract notification system
- [ ] Extract approval workflows
- [ ] Extract multi-language support
- [ ] Extract MFA
- [ ] Test all features

---

## 🔧 **4. TECHNICAL CONSIDERATIONS**

### **4.1 Dependencies to Install**

#### **From business-services-hub:**
```json
{
  "@supabase/supabase-js": "^2.38.5",
  "@tanstack/react-query": "^5.90.2",
  "recharts": "^2.15.4",
  "react-hook-form": "^7.48.2",
  "zod": "^3.22.4",
  "@radix-ui/react-*": "(various versions)"
}
```

#### **From Contract-Management-System:**
```json
{
  "@supabase/ssr": "^0.8.0",
  "@supabase/supabase-js": "^2.89.0",
  "next-intl": "^3.4.1",
  "otplib": "^12.0.1",
  "jspdf": "^3.0.1",
  "@tanstack/react-query": "^5.8.4"
}
```

### **4.2 Database Schema Migration**

#### **Tables to Extract from business-services-hub:**
- `services` - Service catalog
- `bookings` - Booking records
- `milestones` - Booking milestones
- `tasks` - Booking tasks
- `invoices` - Invoice records
- `profiles` - User profiles

#### **Tables to Extract from Contract-Management-System:**
- `contracts` - Contract records
- `parties` - CRM parties/clients
- `promoters` - Service providers
- `permissions` - RBAC permissions
- `roles` - User roles
- `approvals` - Approval records

### **4.3 API Routes to Extract**

#### **From business-services-hub:**
- `/api/services/*` - Service management
- `/api/bookings/*` - Booking management
- `/api/analytics/*` - Analytics
- `/api/invoices/*` - Invoice management
- `/api/dashboard/*` - Dashboard data

#### **From Contract-Management-System:**
- `/api/contracts/*` - Contract management
- `/api/parties/*` - CRM management
- `/api/promoters/*` - Provider management
- `/api/permissions/*` - RBAC
- `/api/approvals/*` - Approval workflows

---

## 📝 **5. ADAPTATION NOTES**

### **5.1 Component Adaptation**

1. **Update Import Paths:**
   - Change relative imports to match new structure
   - Update Supabase client imports
   - Update API route imports

2. **Update Type Definitions:**
   - Merge type definitions
   - Update database types
   - Ensure type consistency

3. **Update Styling:**
   - Ensure Tailwind CSS compatibility
   - Update theme variables
   - Check responsive design

4. **Update Authentication:**
   - Integrate with unified Supabase Auth
   - Update session management
   - Update role checking

### **5.2 Database Schema Adaptation**

1. **Merge Schemas:**
   - Combine table definitions
   - Resolve naming conflicts
   - Update foreign keys

2. **Update RLS Policies:**
   - Adapt policies for new structure
   - Test security policies
   - Update user roles

3. **Update Views:**
   - Adapt database views
   - Update view permissions
   - Test view performance

---

## 🚀 **6. QUICK START EXTRACTION**

### **Step 1: Extract Service Management**
```bash
# Copy service components
cp -r ../business-services-hub/components/services ./components/marketplace/services
cp -r ../business-services-hub/app/dashboard/services ./app/marketplace/services
cp -r ../business-services-hub/app/api/services ./app/api/marketplace/services
```

### **Step 2: Extract Booking System**
```bash
# Copy booking components
cp -r ../business-services-hub/components/booking ./components/marketplace/booking
cp -r ../business-services-hub/app/dashboard/bookings ./app/marketplace/bookings
cp -r ../business-services-hub/app/api/bookings ./app/api/marketplace/bookings
```

### **Step 3: Extract Contract Management**
```bash
# Copy contract components
cp -r ../Contract-Management-System/components/contracts ./components/enterprise/contracts
cp -r ../Contract-Management-System/app/[locale]/contracts ./app/enterprise/contracts
cp -r ../Contract-Management-System/app/api/contracts ./app/api/enterprise/contracts
```

### **Step 4: Extract RBAC System**
```bash
# Copy RBAC system
cp -r ../Contract-Management-System/lib/rbac ./lib/rbac
cp -r ../Contract-Management-System/components/auth-guard.tsx ./components/shared/auth-guard.tsx
```

---

## 📊 **7. PRIORITY MATRIX**

| Component | Source | Priority | Complexity | Estimated Time |
|-----------|--------|----------|------------|----------------|
| Service Management | business-services-hub | 🔴 Critical | Medium | 2 days |
| Booking System | Both (merge) | 🔴 Critical | High | 3 days |
| Contract Management | Contract-Management-System | 🔴 Critical | Medium | 2 days |
| RBAC System | Contract-Management-System | 🔴 Critical | High | 2 days |
| CRM (Parties) | Contract-Management-System | 🔴 Critical | Medium | 2 days |
| Provider Management | Contract-Management-System | 🔴 Critical | Medium | 2 days |
| Dashboard Analytics | business-services-hub | 🟡 Important | Medium | 2 days |
| Invoice Management | Both (merge) | 🟡 Important | Medium | 2 days |
| Approval Workflows | Contract-Management-System | 🟡 Important | Medium | 1 day |
| Notification System | business-services-hub | 🟢 Recommended | Low | 1 day |
| Multi-language | Contract-Management-System | 🟢 Recommended | Medium | 1 day |
| MFA | Contract-Management-System | 🟢 Recommended | Low | 1 day |

---

## ✅ **8. NEXT STEPS**

1. **Start with Service Management** (easiest, most complete)
2. **Then Booking System** (core marketplace feature)
3. **Then Contract Management** (core enterprise feature)
4. **Then RBAC** (foundation for security)
5. **Then CRM & Providers** (complete the platforms)

---

**🎯 Ready to start extraction! Begin with Service Management from business-services-hub.**

