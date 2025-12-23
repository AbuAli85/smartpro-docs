# Database Schema Comparison & Integration Plan

**Date:** 2025-01-17  
**Purpose:** Compare database schemas from all three systems and create unified integration plan

---

## 📊 **Schema Overview**

### **1. smartpro-docs (Current)**
- **Database:** PostgreSQL (via Prisma)
- **ORM:** Prisma
- **Status:** Basic schema for marketing site
- **Tables:** 7 tables (User, Notification, ConsultationSubmission, AnalyticsEvent, EmailDigest, ApiRequestLog, Lead)

### **2. Contract-Management-System**
- **Database:** Supabase (PostgreSQL)
- **ORM:** Direct SQL + Supabase Client
- **Status:** Production-ready enterprise schema
- **Tables:** 50+ tables including contracts, parties, promoters, bookings, RBAC, HR, etc.

### **3. business-services-hub**
- **Database:** Supabase (PostgreSQL)
- **ORM:** Direct SQL + Supabase Client
- **Status:** Production-ready marketplace schema
- **Tables:** 20+ tables including services, bookings, invoices, messages, reviews, etc.

---

## 🔍 **Detailed Table Comparison**

### **PROFILES / USERS**

#### **smartpro-docs (Prisma)**
```prisma
model User {
  id                      String   @id @default(cuid())
  email                   String   @unique
  password                String
  name                    String
  role                    String   @default("provider") // provider, client, admin
  emailVerified           Boolean  @default(false)
  consultationSubmissionId String?  @unique
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}
```

#### **Contract-Management-System**
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    address JSONB,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT profiles_user_id_unique UNIQUE (user_id),
    CONSTRAINT profiles_email_unique UNIQUE (email)
);
```

#### **business-services-hub**
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'client', -- ENUM: admin, provider, client, staff
  full_name TEXT,
  phone TEXT,
  country TEXT,
  company_id UUID NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**🔴 CONFLICTS:**
1. **ID Type:** smartpro-docs uses `String (cuid())`, others use `UUID`
2. **Auth Integration:** smartpro-docs has custom password, others use Supabase Auth
3. **Role Type:** smartpro-docs uses `String`, others use `ENUM` or structured role system
4. **Fields:** Different field sets (address, preferences, company_id, etc.)

**✅ RESOLUTION:**
- Migrate to Supabase Auth (remove password field)
- Use UUID for all IDs
- Use RBAC system from Contract-Management-System (not simple role string)
- Merge all fields from all three systems

---

### **SERVICES**

#### **smartpro-docs**
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'OMR',
  estimated_duration TEXT,
  location TEXT,
  tags TEXT[],
  requirements TEXT,
  cover_image_url TEXT,
  status TEXT DEFAULT 'pending',
  approval_status TEXT DEFAULT 'pending',
  featured BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  booking_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **Contract-Management-System**
```sql
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    price_base DECIMAL(10,2),
    price_currency TEXT DEFAULT 'USD',
    duration_minutes INTEGER,
    max_participants INTEGER DEFAULT 1,
    status service_status DEFAULT 'active', -- ENUM: active, inactive, draft
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **business-services-hub**
```sql
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- e.g., "Digital Marketing"
  status TEXT NOT NULL DEFAULT 'active', -- active | draft | archived
  base_price NUMERIC(12,3) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'OMR',
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**🔴 CONFLICTS:**
1. **Company vs Provider:** Contract-Management-System uses `company_id`, others use `provider_id`
2. **Name vs Title:** Different column names
3. **Price Type:** DECIMAL(10,2) vs NUMERIC(12,3)
4. **Status:** ENUM vs TEXT
5. **Additional Fields:** business-services-hub has service_packages table (not in others)

**✅ RESOLUTION:**
- Use `provider_id` (individual provider) + optional `company_id` (if provider has company)
- Use `title` (more descriptive)
- Use NUMERIC(12,3) for better precision
- Add `service_packages` table from business-services-hub
- Merge all fields (rating, review_count, booking_count, etc.)

---

### **BOOKINGS**

#### **smartpro-docs**
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  scheduled_date TIMESTAMPTZ,
  total_amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'OMR',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **Contract-Management-System**
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    provider_company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
    status booking_status DEFAULT 'pending', -- ENUM: pending, confirmed, in_progress, completed, cancelled, refunded
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER NOT NULL,
    participant_count INTEGER DEFAULT 1,
    total_price DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    notes TEXT,
    client_notes TEXT,
    provider_notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT bookings_future_schedule CHECK (scheduled_at > created_at)
);
```

#### **business-services-hub**
```sql
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  package_id UUID REFERENCES public.service_packages(id),
  requirements JSONB, -- client brief
  status booking_status NOT NULL DEFAULT 'draft', -- ENUM: draft, pending_payment, paid, in_progress, delivered, completed, cancelled, disputed
  subtotal NUMERIC(12,3) NOT NULL DEFAULT 0,
  vat_percent NUMERIC(5,2) NOT NULL DEFAULT 5.00,
  vat_amount NUMERIC(12,3) GENERATED ALWAYS AS (ROUND(subtotal * vat_percent/100.0, 3)) STORED,
  total_amount NUMERIC(12,3) GENERATED ALWAYS AS (ROUND(subtotal + (subtotal * vat_percent/100.0), 3)) STORED,
  currency TEXT NOT NULL DEFAULT 'OMR',
  due_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**🔴 CONFLICTS:**
1. **Status ENUMs:** Different status values across systems
2. **Provider Reference:** provider_id vs provider_company_id
3. **Pricing:** Simple total_amount vs subtotal + VAT calculation
4. **Package Support:** business-services-hub has package_id, others don't
5. **Additional Fields:** requirements, client_notes, provider_notes, metadata

**✅ RESOLUTION:**
- Use unified status ENUM (merge all statuses)
- Support both provider_id (individual) and provider_company_id (company)
- Use VAT calculation from business-services-hub
- Add package_id support
- Merge all fields (requirements, notes, metadata, etc.)

---

### **COMPANIES**

#### **Contract-Management-System**
```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    website TEXT,
    email TEXT,
    phone TEXT,
    address JSONB,
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT companies_slug_unique UNIQUE (slug)
);
```

#### **business-services-hub**
```sql
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cr_number TEXT, -- Oman CR support
  vat_number TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**🔴 CONFLICTS:**
1. **Fields:** Contract-Management-System has more fields (slug, description, website, etc.)
2. **Owner:** business-services-hub has owner_id, Contract-Management-System doesn't
3. **Oman-specific:** business-services-hub has cr_number, vat_number

**✅ RESOLUTION:**
- Merge all fields
- Add owner_id to track company owner
- Keep Oman-specific fields (cr_number, vat_number)

---

### **CONTRACTS** (Enterprise Feature - Only in Contract-Management-System)

#### **Contract-Management-System**
```sql
CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promoter_id UUID REFERENCES promoters(id) ON DELETE CASCADE NOT NULL,
    employer_id UUID REFERENCES parties(id) ON DELETE SET NULL,
    client_id UUID REFERENCES parties(id) ON DELETE SET NULL,
    contract_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    contract_type TEXT NOT NULL CHECK (contract_type IN ('employment', 'service', 'consultancy', 'partnership')),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'active', 'completed', 'terminated', 'expired')),
    start_date DATE,
    end_date DATE,
    value DECIMAL(15,2),
    currency TEXT DEFAULT 'USD',
    terms TEXT,
    notify_days_before_contract_expiry INTEGER DEFAULT 30,
    is_current BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**✅ RESOLUTION:**
- Extract as-is (only Contract-Management-System has this)
- Adapt "promoter" terminology to "provider"
- Keep all enterprise features

---

### **PARTIES** (CRM - Only in Contract-Management-System)

#### **Contract-Management-System**
```sql
CREATE TABLE parties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_ar TEXT,
    crn TEXT,
    type TEXT CHECK (type IN ('Employer', 'Client', 'Generic', NULL)),
    role TEXT,
    status TEXT,
    cr_status TEXT,
    cr_expiry TEXT,
    license_status TEXT,
    license_expiry TEXT,
    contact_person TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    address_en TEXT,
    tax_number TEXT,
    license_number TEXT,
    active_contracts INTEGER DEFAULT 0,
    overall_status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT
);
```

**✅ RESOLUTION:**
- Extract as-is (only Contract-Management-System has this)
- This is the CRM system for enterprise platform

---

### **PROMOTERS** (Provider Management - Only in Contract-Management-System)

**Note:** Contract-Management-System uses "Promoter" terminology, but this is essentially "Provider" management.

**✅ RESOLUTION:**
- Extract and adapt terminology to "Provider"
- Merge with provider management from business-services-hub

---

### **INVOICES**

#### **smartpro-docs**
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  contract_id UUID REFERENCES contracts(id) ON DELETE SET NULL,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'OMR',
  status TEXT DEFAULT 'pending',
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **business-services-hub**
```sql
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC(12,3) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'OMR',
  status invoice_status NOT NULL DEFAULT 'draft', -- ENUM: draft, issued, paid, void
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**🔴 CONFLICTS:**
1. **Status:** TEXT vs ENUM
2. **Contract Support:** smartpro-docs has contract_id, business-services-hub doesn't
3. **Fields:** pdf_url, invoice_number, due_date, paid_at

**✅ RESOLUTION:**
- Merge all fields
- Use ENUM for status
- Support both booking_id and contract_id

---

### **RBAC SYSTEM** (Only in Contract-Management-System)

#### **Contract-Management-System**
```sql
-- Comprehensive RBAC system with:
- roles table
- permissions table
- role_permissions table (junction)
- user_role_assignments table
- audit_logs table
- Materialized view: user_permissions
- Functions: has_permission(), get_user_permissions(), etc.
```

**✅ RESOLUTION:**
- Extract as-is (most comprehensive RBAC system)
- This is critical for enterprise features

---

### **NOTIFICATIONS**

#### **smartpro-docs (Prisma)**
```prisma
model Notification {
  id             String   @id @default(cuid())
  userId         String
  type           String
  priority       String   @default("normal")
  title          String
  message        String
  description    String?
  icon           String?
  actionUrl      String?
  actionLabel    String?
  read           Boolean  @default(false)
  archived       Boolean  @default(false)
  deliveryStatus String   @default("pending")
  sentAt         DateTime?
  deliveredAt    DateTime?
  readAt         DateTime?
  relatedId      String?
  data           Json?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

#### **Contract-Management-System**
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    type notification_type NOT NULL, -- ENUM: booking, payment, system, marketing
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **business-services-hub**
```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- booking_update, payment, chat, review
  payload JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**🔴 CONFLICTS:**
1. **Fields:** smartpro-docs has most comprehensive fields (priority, deliveryStatus, etc.)
2. **Type:** ENUM vs TEXT
3. **Data Structure:** data vs payload

**✅ RESOLUTION:**
- Use smartpro-docs structure (most comprehensive)
- Convert to UUID
- Use ENUM for type

---

### **AUDIT LOGS**

All three systems have audit_logs but with different structures.

**✅ RESOLUTION:**
- Use Contract-Management-System structure (most comprehensive)
- Merge any unique fields from others

---

## 📋 **Missing Tables Analysis**

### **Tables Only in Contract-Management-System:**
- ✅ `contracts` - Enterprise contract management
- ✅ `parties` - CRM system
- ✅ `promoters` - Provider management (rename to providers)
- ✅ `user_roles` - RBAC junction table
- ✅ `roles` - RBAC roles
- ✅ `permissions` - RBAC permissions
- ✅ `role_permissions` - RBAC mapping
- ✅ `user_role_assignments` - RBAC assignments
- ✅ `booking_events` - Booking audit trail
- ✅ HR tables (attendance, work_permits, etc.)
- ✅ Document management tables

### **Tables Only in business-services-hub:**
- ✅ `service_packages` - Service pricing tiers
- ✅ `messages` - Booking messaging system
- ✅ `reviews` - Service reviews and ratings
- ✅ `milestones` - Booking progress tracking
- ✅ `tasks` - Task management
- ✅ `time_entries` - Time tracking
- ✅ `payments` - Payment processing

### **Tables Only in smartpro-docs:**
- ✅ `consultation_submissions` - Consultation form submissions
- ✅ `leads` - Lead tracking
- ✅ `notification_preferences` - User notification settings
- ✅ `email_digests` - Email digest scheduling
- ✅ `analytics_events` - Notification analytics

---

## 🎯 **Unified Schema Strategy**

### **Phase 1: Core Tables (Week 1)**

1. **profiles** - Merge all three
2. **companies** - Merge Contract-Management-System + business-services-hub
3. **services** - Merge all three + add service_packages
4. **bookings** - Merge all three with unified status
5. **notifications** - Use smartpro-docs structure

### **Phase 2: Marketplace Tables (Week 2)**

6. **service_packages** - From business-services-hub
7. **messages** - From business-services-hub
8. **reviews** - From business-services-hub
9. **invoices** - Merge all three
10. **payments** - From business-services-hub

### **Phase 3: RBAC System (Week 2)**

11. **roles** - From Contract-Management-System
12. **permissions** - From Contract-Management-System
13. **role_permissions** - From Contract-Management-System
14. **user_role_assignments** - From Contract-Management-System
15. **audit_logs** - From Contract-Management-System

### **Phase 4: Enterprise Tables (Week 3)**

16. **contracts** - From Contract-Management-System
17. **parties** - From Contract-Management-System (CRM)
18. **providers** - Adapt from Contract-Management-System promoters
19. **booking_events** - From Contract-Management-System

### **Phase 5: Additional Features (Week 3-4)**

20. **milestones** - From business-services-hub
21. **tasks** - From business-services-hub
22. **time_entries** - From business-services-hub
23. **consultation_submissions** - From smartpro-docs
24. **leads** - From smartpro-docs
25. **notification_preferences** - From smartpro-docs

---

## 🔧 **Migration Strategy**

### **Step 1: Create Unified Supabase Project**
1. Set up new Supabase project
2. Enable required extensions (uuid-ossp, pg_trgm)
3. Create all ENUMs first

### **Step 2: Create Core Tables**
1. Start with `profiles` (foundation)
2. Create `companies`
3. Create `services` + `service_packages`
4. Create `bookings`
5. Create `notifications`

### **Step 3: Create RBAC System**
1. Create RBAC tables (roles, permissions, etc.)
2. Seed default roles and permissions
3. Create helper functions

### **Step 4: Create Enterprise Tables**
1. Create `contracts`
2. Create `parties`
3. Create `providers` (adapted from promoters)

### **Step 5: Create Additional Tables**
1. Create marketplace tables (messages, reviews, etc.)
2. Create tracking tables (consultation_submissions, leads, etc.)

### **Step 6: Create RLS Policies**
1. Apply RLS to all tables
2. Create policies based on RBAC system
3. Test all policies

### **Step 7: Create Functions & Triggers**
1. Create helper functions
2. Create audit triggers
3. Create updated_at triggers
4. Create profile creation triggers

### **Step 8: Create Indexes**
1. Create performance indexes
2. Create full-text search indexes
3. Create composite indexes

---

## ⚠️ **Critical Conflicts & Resolutions**

### **1. ID Type Mismatch**
- **Conflict:** smartpro-docs uses `String (cuid())`, others use `UUID`
- **Resolution:** Migrate all to UUID (Supabase standard)

### **2. Authentication System**
- **Conflict:** smartpro-docs has custom password auth, others use Supabase Auth
- **Resolution:** Migrate to Supabase Auth, remove password field

### **3. Role System**
- **Conflict:** smartpro-docs uses simple string, others use RBAC
- **Resolution:** Use comprehensive RBAC from Contract-Management-System

### **4. Status ENUMs**
- **Conflict:** Different status values across systems
- **Resolution:** Create unified ENUMs that include all statuses

### **5. Provider vs Company**
- **Conflict:** Some use provider_id, some use company_id
- **Resolution:** Support both (provider_id for individual, company_id optional)

### **6. Currency Defaults**
- **Conflict:** USD vs OMR
- **Resolution:** Default to OMR (Oman-based), support multiple currencies

---

## 📝 **Next Steps**

1. ✅ **Review schemas** - COMPLETED
2. ⏳ **Create unified migration files** - Create SQL files for unified schema
3. ⏳ **Test migrations** - Test in development Supabase project
4. ⏳ **Data migration plan** - Plan how to migrate existing data
5. ⏳ **Update Prisma schema** - If keeping Prisma for some parts
6. ⏳ **Document RLS policies** - Document all security policies

---

## 📚 **Reference Files**

- **Contract-Management-System:** `../Contract-Management-System/supabase/migrations/`
- **business-services-hub:** `../business-services-hub/supabase/migrations/`
- **smartpro-docs:** `prisma/schema.prisma`, `backend/src/database/schema.sql`

---

**Next Document:** ✅ `UNIFIED_SCHEMA_MIGRATION.sql` - Complete unified schema migration file created

