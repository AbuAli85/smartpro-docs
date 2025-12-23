-- ============================================================
-- SmartPro Unified Database Schema Migration
-- ============================================================
-- This migration creates a unified schema combining:
-- - smartpro-docs (current)
-- - Contract-Management-System (enterprise features)
-- - business-services-hub (marketplace features)
--
-- Date: 2025-01-17
-- Run this in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- STEP 1: ENABLE EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For full-text search
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- For cryptographic functions

-- ============================================================
-- STEP 2: CREATE ENUMS (Unified from all systems)
-- ============================================================

-- User roles enum (from RBAC system - will be enhanced with RBAC tables)
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('client', 'provider', 'admin', 'staff', 'manager', 'enterprise_admin', 'enterprise_employee');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Booking status enum (unified from all systems)
DO $$ BEGIN
    CREATE TYPE booking_status_type AS ENUM (
        'draft', 
        'pending', 
        'pending_payment', 
        'paid', 
        'confirmed', 
        'in_progress', 
        'delivered', 
        'completed', 
        'cancelled', 
        'refunded', 
        'disputed'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Service status enum
DO $$ BEGIN
    CREATE TYPE service_status_type AS ENUM ('active', 'inactive', 'draft', 'archived', 'pending', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Invoice status enum
DO $$ BEGIN
    CREATE TYPE invoice_status_type AS ENUM ('draft', 'issued', 'pending', 'paid', 'overdue', 'void', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Contract status enum (enterprise)
DO $$ BEGIN
    CREATE TYPE contract_status_type AS ENUM ('draft', 'pending', 'active', 'completed', 'terminated', 'expired', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Contract type enum (enterprise)
DO $$ BEGIN
    CREATE TYPE contract_type_type AS ENUM ('employment', 'service', 'consultancy', 'partnership');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Notification type enum
DO $$ BEGIN
    CREATE TYPE notification_type_type AS ENUM ('booking', 'payment', 'system', 'marketing', 'booking_update', 'chat', 'review');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Audit action enum
DO $$ BEGIN
    CREATE TYPE audit_action_type AS ENUM ('create', 'update', 'delete', 'login', 'logout', 'INSERT', 'UPDATE', 'DELETE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Party type enum (enterprise CRM)
DO $$ BEGIN
    CREATE TYPE party_type_type AS ENUM ('Employer', 'Client', 'Generic');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- User status enum
DO $$ BEGIN
    CREATE TYPE user_status_type AS ENUM ('active', 'inactive', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================
-- STEP 3: CORE TABLES
-- ============================================================

-- ============================================================
-- PROFILES TABLE (Unified from all three systems)
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    name TEXT, -- For compatibility with smartpro-docs
    phone TEXT,
    avatar_url TEXT,
    company_name TEXT, -- From smartpro-docs
    -- company_id will be added after companies table is created (see below)
    address JSONB, -- From Contract-Management-System
    preferences JSONB DEFAULT '{}', -- From Contract-Management-System
    country TEXT, -- From business-services-hub
    is_verified BOOLEAN DEFAULT false, -- From business-services-hub
    role TEXT DEFAULT 'client' CHECK (role IN ('client', 'provider', 'admin', 'staff', 'manager', 'enterprise_admin', 'enterprise_employee')), -- Temporary until RBAC is set up
    status user_status_type DEFAULT 'active',
    email_verified BOOLEAN DEFAULT false, -- From smartpro-docs
    -- consultation_submission_id will be added after consultation_submissions table is created (see below)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT profiles_email_unique UNIQUE (email)
);

-- Indexes for profiles (basic indexes - company_id and consultation_submission_id indexes will be created after columns are ensured)
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);

-- ============================================================
-- COMPANIES TABLE (Merged from Contract-Management-System + business-services-hub)
-- ============================================================

CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- From business-services-hub
    name TEXT NOT NULL,
    slug TEXT, -- From Contract-Management-System
    description TEXT, -- From Contract-Management-System
    cr_number TEXT, -- From business-services-hub (Oman CR)
    vat_number TEXT, -- From business-services-hub
    logo_url TEXT,
    website TEXT, -- From Contract-Management-System
    email TEXT, -- From Contract-Management-System
    phone TEXT, -- From Contract-Management-System
    address JSONB, -- From Contract-Management-System
    settings JSONB DEFAULT '{}', -- From Contract-Management-System
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for companies
CREATE INDEX IF NOT EXISTS idx_companies_owner_id ON companies(owner_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_companies_slug_unique ON companies(slug) WHERE slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_is_active ON companies(is_active);
CREATE INDEX IF NOT EXISTS idx_companies_cr_number ON companies(cr_number);

-- ============================================================
-- SERVICES TABLE (Merged from all three systems)
-- ============================================================

CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE, -- Individual provider
    company_id UUID, -- Optional company (foreign key will be added after companies table exists)
    title TEXT NOT NULL, -- Unified name field
    name TEXT, -- Alias for compatibility
    description TEXT,
    category TEXT NOT NULL,
    base_price NUMERIC(12,3) NOT NULL DEFAULT 0, -- Using NUMERIC for precision
    price_base NUMERIC(12,3), -- Alias for compatibility
    currency TEXT DEFAULT 'OMR' CHECK (currency IN ('OMR', 'USD', 'EUR', 'GBP', 'AED')),
    duration_minutes INTEGER, -- From Contract-Management-System
    estimated_duration TEXT, -- From smartpro-docs (alternative format)
    max_participants INTEGER DEFAULT 1, -- From Contract-Management-System
    location TEXT, -- From smartpro-docs
    tags TEXT[], -- From smartpro-docs
    requirements TEXT, -- From smartpro-docs
    cover_image_url TEXT,
    status service_status_type DEFAULT 'pending',
    approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')), -- From smartpro-docs
    featured BOOLEAN DEFAULT false, -- From smartpro-docs
    rating NUMERIC(3,2) DEFAULT 0, -- From smartpro-docs
    review_count INTEGER DEFAULT 0, -- From smartpro-docs
    booking_count INTEGER DEFAULT 0, -- From smartpro-docs
    metadata JSONB DEFAULT '{}', -- From Contract-Management-System
    created_by UUID REFERENCES profiles(id), -- From Contract-Management-System
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraint for services.company_id (after companies table exists)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'companies'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'services' 
        AND column_name = 'company_id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_schema = 'public'
        AND constraint_name = 'services_company_id_fkey'
    ) THEN
        EXECUTE 'ALTER TABLE public.services ADD CONSTRAINT services_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE SET NULL';
    END IF;
END $$;

-- Indexes for services (all created conditionally)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'provider_id') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_services_provider_id ON public.services(provider_id)';
    END IF;
END $$;
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'services' 
        AND column_name = 'company_id'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_services_company_id ON public.services(company_id)';
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_approval_status ON services(approval_status);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);
CREATE INDEX IF NOT EXISTS idx_services_title_trgm ON services USING gin(title gin_trgm_ops); -- Full-text search

-- ============================================================
-- SERVICE PACKAGES TABLE (From business-services-hub)
-- ============================================================

CREATE TABLE IF NOT EXISTS service_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- Basic/Pro/Enterprise
    price NUMERIC(12,3) NOT NULL,
    delivery_days INTEGER NOT NULL,
    revisions INTEGER NOT NULL DEFAULT 1,
    features TEXT[], -- Array of bullet points
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for service_packages
CREATE INDEX IF NOT EXISTS idx_service_packages_service_id ON service_packages(service_id);

-- ============================================================
-- BOOKINGS TABLE (Merged from all three systems)
-- ============================================================
-- NOTE: If you get "column provider_id does not exist" error and your bookings table
-- already exists with provider_id, you can safely run this migration - it will only
-- add missing columns conditionally. All DDL uses conditional checks.

-- NOTE: If bookings table already exists with provider_id column, CREATE TABLE IF NOT EXISTS will skip.
-- All subsequent DDL (columns, constraints, indexes, policies) use conditional checks and EXECUTE,
-- so they will safely skip if the structure already exists.

-- Ensure provider_company_id exists if bookings table already has provider_id
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'bookings'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'provider_id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'provider_company_id'
    ) THEN
        EXECUTE 'ALTER TABLE public.bookings ADD COLUMN provider_company_id UUID';
    END IF;
END $$;

-- CREATE TABLE IF NOT EXISTS bookings (...) -- COMMENTED OUT: Table already exists with provider_id
-- Only add missing columns conditionally below

-- Ensure bookings table has required columns (add missing ones only)
DO $$
BEGIN
    -- Add provider_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'provider_id') THEN
        BEGIN
            EXECUTE 'ALTER TABLE public.bookings ADD COLUMN provider_id UUID';
        EXCEPTION
            WHEN duplicate_column THEN NULL;
            WHEN OTHERS THEN RAISE NOTICE 'Could not add provider_id: %', SQLERRM;
        END;
    END IF;
    
    -- Add provider_company_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'provider_company_id') THEN
        BEGIN
            EXECUTE 'ALTER TABLE public.bookings ADD COLUMN provider_company_id UUID';
        EXCEPTION
            WHEN duplicate_column THEN NULL;
            WHEN OTHERS THEN RAISE NOTICE 'Could not add provider_company_id: %', SQLERRM;
        END;
    END IF;
END $$;

-- Add foreign key constraints for bookings (after referenced tables exist)
DO $$
BEGIN
    -- Add provider_id foreign key (if column exists)
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'profiles'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'bookings' 
        AND column_name = 'provider_id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_schema = 'public'
        AND constraint_name = 'bookings_provider_id_fkey'
    ) THEN
        EXECUTE 'ALTER TABLE public.bookings ADD CONSTRAINT bookings_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.profiles(id) ON DELETE SET NULL';
    END IF;
    
    -- Add package_id foreign key
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'service_packages'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'bookings' 
        AND column_name = 'package_id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_schema = 'public'
        AND constraint_name = 'bookings_package_id_fkey'
    ) THEN
        EXECUTE 'ALTER TABLE public.bookings ADD CONSTRAINT bookings_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.service_packages(id) ON DELETE SET NULL';
    END IF;
    
    -- Add provider_company_id foreign key
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'companies'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'bookings' 
        AND column_name = 'provider_company_id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_schema = 'public'
        AND constraint_name = 'bookings_provider_company_id_fkey'
    ) THEN
        EXECUTE 'ALTER TABLE public.bookings ADD CONSTRAINT bookings_provider_company_id_fkey FOREIGN KEY (provider_company_id) REFERENCES public.companies(id) ON DELETE SET NULL';
    END IF;
END $$;

-- Add CHECK constraint for bookings (after columns exist)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'provider_id'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'provider_company_id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_schema = 'public'
        AND constraint_name = 'bookings_provider_check'
    ) THEN
        EXECUTE 'ALTER TABLE public.bookings ADD CONSTRAINT bookings_provider_check CHECK ((provider_id IS NOT NULL) OR (provider_company_id IS NOT NULL))';
    END IF;
END $$;

-- Indexes for bookings (all created conditionally to handle existing tables)
DO $$
BEGIN
    -- service_id index
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'service_id'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON public.bookings(service_id)';
    END IF;
    
    -- package_id index
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'package_id'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_package_id ON public.bookings(package_id)';
    END IF;
    
    -- client_id index
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'client_id'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON public.bookings(client_id)';
    END IF;
    
    -- provider_id index
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'provider_id'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_provider_id ON public.bookings(provider_id)';
    END IF;
    
    -- provider_company_id index
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'provider_company_id'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_provider_company_id ON public.bookings(provider_company_id)';
    END IF;
    
    -- status index
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'status'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status)';
    END IF;
    
    -- scheduled_at index
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'scheduled_at'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_at ON public.bookings(scheduled_at)';
    END IF;
    
    -- created_at index
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'created_at'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at)';
    END IF;
END $$;

-- ============================================================
-- BOOKING EVENTS TABLE (Audit trail from Contract-Management-System)
-- ============================================================

CREATE TABLE IF NOT EXISTS booking_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'status_change', 'reschedule', 'note_added', etc.
    old_value JSONB,
    new_value JSONB,
    description TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for booking_events
CREATE INDEX IF NOT EXISTS idx_booking_events_booking_id ON booking_events(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_events_created_at ON booking_events(created_at);

-- ============================================================
-- STEP 4: RBAC SYSTEM (From Contract-Management-System)
-- ============================================================

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('client', 'provider', 'admin', 'system')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource TEXT NOT NULL,
    action TEXT NOT NULL,
    scope TEXT NOT NULL CHECK (scope IN ('own', 'provider', 'organization', 'booking', 'public', 'all')),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role-permission mapping table
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(role_id, permission_id)
);

-- User role assignments table
CREATE TABLE IF NOT EXISTS user_role_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES profiles(id),
    context JSONB DEFAULT '{}',
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for RBAC tables
CREATE INDEX IF NOT EXISTS idx_roles_category ON roles(category);
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);
CREATE INDEX IF NOT EXISTS idx_permissions_resource_action ON permissions(resource, action);
CREATE INDEX IF NOT EXISTS idx_permissions_scope ON permissions(scope);
CREATE INDEX IF NOT EXISTS idx_permissions_name ON permissions(name);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_user_role_assignments_user_id ON user_role_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_role_assignments_role_id ON user_role_assignments(role_id);
CREATE INDEX IF NOT EXISTS idx_user_role_assignments_user_active ON user_role_assignments(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_user_role_assignments_valid_until ON user_role_assignments(valid_until) WHERE valid_until IS NOT NULL;

-- Materialized view for optimized permission lookups
CREATE MATERIALIZED VIEW IF NOT EXISTS user_permissions AS
SELECT 
    ura.user_id,
    p.resource,
    p.action,
    p.scope,
    p.name AS permission_name,
    r.name AS role_name,
    r.category AS role_category,
    ura.valid_from,
    ura.valid_until,
    ura.is_active
FROM user_role_assignments ura
JOIN roles r ON ura.role_id = r.id
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
WHERE ura.is_active = TRUE
AND (ura.valid_until IS NULL OR ura.valid_until > CURRENT_TIMESTAMP);

CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_permissions_resource_action ON user_permissions(resource, action);
CREATE INDEX IF NOT EXISTS idx_user_permissions_scope ON user_permissions(scope);
CREATE INDEX IF NOT EXISTS idx_user_permissions_role_category ON user_permissions(role_category);

-- ============================================================
-- STEP 5: ENTERPRISE TABLES (From Contract-Management-System)
-- ============================================================

-- PARTIES TABLE (CRM)
CREATE TABLE IF NOT EXISTS parties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_ar TEXT,
    crn TEXT,
    type party_type_type, -- 'Employer', 'Client', 'Generic'
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
    logo_url TEXT, -- Added for consistency
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT
);

-- Indexes for parties
CREATE INDEX IF NOT EXISTS idx_parties_name_en ON parties(name_en);
CREATE INDEX IF NOT EXISTS idx_parties_crn ON parties(crn);
CREATE INDEX IF NOT EXISTS idx_parties_type ON parties(type);
CREATE INDEX IF NOT EXISTS idx_parties_status ON parties(overall_status);

-- PROVIDERS TABLE (Adapted from Contract-Management-System promoters)
CREATE TABLE IF NOT EXISTS providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- Link to user profile
    employer_id UUID REFERENCES parties(id) ON DELETE SET NULL, -- Employer party
    name_en TEXT,
    name_ar TEXT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    mobile_number TEXT,
    profile_picture_url TEXT,
    -- Documents
    id_card_number TEXT UNIQUE,
    id_card_expiry_date DATE,
    passport_number TEXT,
    passport_expiry_date DATE,
    visa_number TEXT,
    visa_expiry_date DATE,
    work_permit_number TEXT,
    work_permit_expiry_date DATE,
    -- Personal info
    nationality TEXT,
    date_of_birth DATE,
    gender TEXT,
    marital_status TEXT,
    -- Address
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    -- Professional
    job_title TEXT,
    company TEXT,
    department TEXT,
    specialization TEXT,
    experience_years INTEGER,
    education_level TEXT,
    university TEXT,
    graduation_year INTEGER,
    skills TEXT,
    certifications TEXT,
    -- Financial
    bank_name TEXT,
    account_number TEXT,
    iban TEXT,
    swift_code TEXT,
    tax_id TEXT,
    -- Status
    status TEXT,
    overall_status TEXT,
    rating NUMERIC,
    availability TEXT,
    preferred_language TEXT,
    timezone TEXT,
    special_requirements TEXT,
    notes TEXT,
    -- Notifications
    notify_days_before_id_expiry INTEGER DEFAULT 100,
    notify_days_before_passport_expiry INTEGER DEFAULT 210,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for providers
CREATE INDEX IF NOT EXISTS idx_providers_profile_id ON providers(profile_id);
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'providers' AND column_name = 'employer_id') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_providers_employer_id ON public.providers(employer_id)';
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_providers_status ON providers(overall_status);

-- CONTRACTS TABLE
CREATE TABLE IF NOT EXISTS contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE, -- Changed from promoter_id
    employer_id UUID REFERENCES parties(id) ON DELETE SET NULL,
    client_id UUID REFERENCES parties(id) ON DELETE SET NULL,
    contract_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    contract_type contract_type_type NOT NULL,
    status contract_status_type DEFAULT 'draft',
    start_date DATE,
    end_date DATE,
    value NUMERIC(15,2),
    currency TEXT DEFAULT 'USD',
    terms TEXT,
    notify_days_before_contract_expiry INTEGER DEFAULT 30,
    is_current BOOLEAN DEFAULT TRUE,
    pdf_url TEXT, -- For storing generated PDFs
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for contracts (all created conditionally to handle existing tables)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'contracts' AND column_name = 'provider_id') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_contracts_provider_id ON public.contracts(provider_id)';
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_contracts_is_current ON public.contracts(provider_id, is_current DESC)';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'contracts' AND column_name = 'employer_id') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_contracts_employer_id ON public.contracts(employer_id)';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'contracts' AND column_name = 'client_id') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_contracts_client_id ON public.contracts(client_id)';
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);

-- ============================================================
-- STEP 6: MARKETPLACE TABLES (From business-services-hub)
-- ============================================================

-- MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT,
    attachments TEXT[], -- Storage URLs
    read_at TIMESTAMPTZ, -- When message was read
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_booking_id ON messages(booking_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for reviews (provider_id index created conditionally)
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'reviews' AND column_name = 'provider_id') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_reviews_provider_id ON public.reviews(provider_id)';
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_reviews_client_id ON reviews(client_id);

-- INVOICES TABLE (Merged from all systems)
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    contract_id UUID REFERENCES contracts(id) ON DELETE SET NULL, -- From smartpro-docs/Contract-Management-System
    provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    invoice_number TEXT UNIQUE,
    amount NUMERIC(12,3) NOT NULL,
    currency TEXT DEFAULT 'OMR',
    status invoice_status_type DEFAULT 'draft',
    pdf_url TEXT, -- From business-services-hub
    due_date DATE, -- From smartpro-docs
    paid_at TIMESTAMPTZ, -- From smartpro-docs
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for invoices (provider_id index created conditionally)
CREATE INDEX IF NOT EXISTS idx_invoices_booking_id ON invoices(booking_id);
CREATE INDEX IF NOT EXISTS idx_invoices_contract_id ON invoices(contract_id);
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'invoices' AND column_name = 'provider_id') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_invoices_provider_id ON public.invoices(provider_id)';
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);

-- PAYMENTS TABLE (From business-services-hub)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    amount NUMERIC(12,3) NOT NULL,
    currency TEXT DEFAULT 'OMR',
    payment_method TEXT, -- stripe, bank_transfer, etc.
    payment_intent_id TEXT, -- Stripe payment intent ID
    status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for payments
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- ============================================================
-- STEP 7: TRACKING & MARKETING TABLES (From smartpro-docs)
-- ============================================================

-- CONSULTATION SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS consultation_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id TEXT UNIQUE NOT NULL, -- Unique submission identifier
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    -- Contact Information
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    -- Business Information
    company TEXT,
    business_type TEXT,
    -- Service Details
    services TEXT[], -- Array of selected services
    primary_service TEXT, -- Primary service for routing
    budget TEXT,
    timeline TEXT,
    -- Preferences
    preferred_contact TEXT,
    preferred_time TEXT,
    -- Message
    message TEXT,
    -- Metadata
    language TEXT DEFAULT 'en', -- en, ar
    source TEXT DEFAULT 'consultation-form',
    status TEXT DEFAULT 'pending', -- pending, contacted, completed, cancelled
    webhook_sent BOOLEAN DEFAULT false,
    webhook_sent_at TIMESTAMPTZ,
    notes TEXT, -- Internal notes
    -- Tracking
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for consultation_submissions
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_submission_id ON consultation_submissions(submission_id);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_email ON consultation_submissions(email);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_status ON consultation_submissions(status);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_created_at ON consultation_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_consultation_submissions_webhook_sent ON consultation_submissions(webhook_sent);

-- LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id TEXT UNIQUE REFERENCES consultation_submissions(submission_id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    current_stage TEXT, -- Current stage in the funnel
    stages TEXT[], -- Array of completed stages
    metadata JSONB, -- Additional tracking data
    source TEXT DEFAULT 'consultation_form',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for leads
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_current_stage ON leads(current_stage);
CREATE INDEX IF NOT EXISTS idx_leads_submission_id ON leads(submission_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Update profiles to reference consultation_submissions (add column if it doesn't exist)
DO $$ 
BEGIN
    -- Add consultation_submission_id column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'profiles' 
        AND column_name = 'consultation_submission_id'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN consultation_submission_id TEXT;
    END IF;
    
    -- Add foreign key constraint if it doesn't exist (only if consultation_submissions table exists)
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'consultation_submissions'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_schema = 'public'
        AND constraint_name = 'profiles_consultation_submission_id_fkey'
    ) THEN
        ALTER TABLE public.profiles 
            ADD CONSTRAINT profiles_consultation_submission_id_fkey 
            FOREIGN KEY (consultation_submission_id) REFERENCES public.consultation_submissions(submission_id) ON DELETE SET NULL;
    END IF;
END $$;

-- ============================================================
-- NOTE: profiles.company_id column addition moved to separate migration
-- Run FIX_PROFILES_COMPANY_ID.sql after this migration completes
-- This avoids parse-time validation issues with company_id references
-- ============================================================

-- ============================================================
-- STEP 8: NOTIFICATIONS TABLE (From smartpro-docs - most comprehensive)
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type_type NOT NULL,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('critical', 'high', 'normal', 'low')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    action_url TEXT,
    action_label TEXT,
    is_read BOOLEAN DEFAULT false,
    archived BOOLEAN DEFAULT false,
    delivery_status TEXT DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'delivered', 'failed')),
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ, -- From Contract-Management-System
    related_id UUID, -- Reference to related entity (booking, message, etc.)
    data JSONB DEFAULT '{}', -- Additional metadata
    payload JSONB, -- Alias for compatibility with business-services-hub
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_expires_at ON notifications(expires_at) WHERE expires_at IS NOT NULL;

-- NOTIFICATION PREFERENCES TABLE (From smartpro-docs)
CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    -- Channels
    in_app_enabled BOOLEAN DEFAULT true,
    email_enabled BOOLEAN DEFAULT true,
    browser_push_enabled BOOLEAN DEFAULT true,
    sms_enabled BOOLEAN DEFAULT false,
    -- Notification Types
    new_message_enabled BOOLEAN DEFAULT true,
    booking_request_enabled BOOLEAN DEFAULT true,
    booking_confirmed_enabled BOOLEAN DEFAULT true,
    payment_received_enabled BOOLEAN DEFAULT true,
    platform_update_enabled BOOLEAN DEFAULT true,
    security_alert_enabled BOOLEAN DEFAULT true,
    -- Quiet Hours
    quiet_hours_enabled BOOLEAN DEFAULT false,
    quiet_hours_start TEXT, -- HH:mm format
    quiet_hours_end TEXT, -- HH:mm format
    -- Frequency
    frequency TEXT DEFAULT 'immediate' CHECK (frequency IN ('immediate', 'hourly', 'daily_digest')),
    -- Sound & Desktop
    sound_enabled BOOLEAN DEFAULT true,
    sound_volume INTEGER DEFAULT 70 CHECK (sound_volume >= 0 AND sound_volume <= 100),
    desktop_notifications BOOLEAN DEFAULT true,
    -- Email Digest
    email_digest_enabled BOOLEAN DEFAULT true,
    email_digest_frequency TEXT DEFAULT 'daily' CHECK (email_digest_frequency IN ('hourly', 'daily', 'weekly')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- EMAIL DIGESTS TABLE (From smartpro-docs)
CREATE TABLE IF NOT EXISTS email_digests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    frequency TEXT CHECK (frequency IN ('hourly', 'daily', 'weekly')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    sent_at TIMESTAMPTZ,
    scheduled_for TIMESTAMPTZ NOT NULL,
    email_address TEXT NOT NULL,
    subject TEXT,
    html_content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for email_digests
CREATE INDEX IF NOT EXISTS idx_email_digests_user_id ON email_digests(user_id);
CREATE INDEX IF NOT EXISTS idx_email_digests_status ON email_digests(status);
CREATE INDEX IF NOT EXISTS idx_email_digests_scheduled_for ON email_digests(scheduled_for);

-- ============================================================
-- STEP 9: AUDIT LOGS TABLE (From Contract-Management-System)
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action audit_action_type NOT NULL,
    table_name TEXT,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    event_type TEXT, -- Additional field from Contract-Management-System
    permission TEXT, -- From RBAC system
    resource TEXT, -- From RBAC system
    result TEXT CHECK (result IN ('ALLOW', 'DENY', 'WOULD_BLOCK')), -- From RBAC system
    ip_address INET,
    user_agent TEXT,
    changed_by UUID REFERENCES profiles(id), -- From RBAC system
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW() -- Alias for compatibility
);

-- Indexes for audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_event_type ON audit_logs(event_type);

-- ============================================================
-- STEP 10: ADDITIONAL MARKETPLACE TABLES (From business-services-hub)
-- ============================================================

-- MILESTONES TABLE (Booking progress tracking)
CREATE TABLE IF NOT EXISTS milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, in_progress, completed
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for milestones
CREATE INDEX IF NOT EXISTS idx_milestones_booking_id ON milestones(booking_id);
CREATE INDEX IF NOT EXISTS idx_milestones_service_id ON milestones(service_id);
CREATE INDEX IF NOT EXISTS idx_milestones_status ON milestones(status);

-- TASKS TABLE
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for tasks
CREATE INDEX IF NOT EXISTS idx_tasks_milestone_id ON tasks(milestone_id);
CREATE INDEX IF NOT EXISTS idx_tasks_booking_id ON tasks(booking_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- TIME ENTRIES TABLE
CREATE TABLE IF NOT EXISTS time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    description TEXT,
    hours NUMERIC(5,2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for time_entries
CREATE INDEX IF NOT EXISTS idx_time_entries_booking_id ON time_entries(booking_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_task_id ON time_entries(task_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(date);

-- ============================================================
-- STEP 11: FUNCTIONS & TRIGGERS
-- ============================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all tables
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_packages_updated_at ON service_packages;
CREATE TRIGGER update_service_packages_updated_at BEFORE UPDATE ON service_packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_providers_updated_at ON providers;
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_parties_updated_at ON parties;
CREATE TRIGGER update_parties_updated_at BEFORE UPDATE ON parties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contracts_updated_at ON contracts;
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_consultation_submissions_updated_at ON consultation_submissions;
CREATE TRIGGER update_consultation_submissions_updated_at BEFORE UPDATE ON consultation_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_notifications_updated_at ON notifications;
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_notification_preferences_updated_at ON notification_preferences;
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_email_digests_updated_at ON email_digests;
CREATE TRIGGER update_email_digests_updated_at BEFORE UPDATE ON email_digests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_milestones_updated_at ON milestones;
CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON milestones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_time_entries_updated_at ON time_entries;
CREATE TRIGGER update_time_entries_updated_at BEFORE UPDATE ON time_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_roles_updated_at ON roles;
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_role_assignments_updated_at ON user_role_assignments;
CREATE TRIGGER update_user_role_assignments_updated_at BEFORE UPDATE ON user_role_assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile for new user (Supabase Auth integration)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- RBAC Helper Functions (From Contract-Management-System)
CREATE OR REPLACE FUNCTION has_permission(
    p_user_id UUID,
    p_resource TEXT,
    p_action TEXT,
    p_scope TEXT DEFAULT 'own'
)
RETURNS BOOLEAN AS $$
DECLARE
    has_perm BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM user_permissions up
        WHERE up.user_id = p_user_id
        AND up.resource = p_resource
        AND up.action = p_action
        AND (up.scope = p_scope OR up.scope = 'all')
    ) INTO has_perm;
    
    RETURN COALESCE(has_perm, FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_permissions(p_user_id UUID)
RETURNS TABLE(
    resource TEXT,
    action TEXT,
    scope TEXT,
    permission_name TEXT,
    role_name TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        up.resource,
        up.action,
        up.scope,
        up.permission_name,
        up.role_name
    FROM user_permissions up
    WHERE up.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION refresh_user_permissions()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_permissions;
END;
$$ LANGUAGE plpgsql;

-- Trigger to refresh materialized view when role assignments change
CREATE OR REPLACE FUNCTION refresh_user_permissions_on_change()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('refresh_user_permissions', '');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_refresh_user_permissions ON user_role_assignments;
CREATE TRIGGER trigger_refresh_user_permissions
    AFTER INSERT OR UPDATE OR DELETE ON user_role_assignments
    FOR EACH ROW
    EXECUTE FUNCTION refresh_user_permissions_on_change();

-- ============================================================
-- STEP 12: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_digests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_role_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 13: BASIC RLS POLICIES
-- ============================================================
-- Note: Full RBAC-based policies should be implemented after seeding roles/permissions
-- These are basic policies to get started

-- Profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Public can view provider profiles" ON profiles;
CREATE POLICY "Public can view provider profiles" ON profiles
    FOR SELECT USING (role = 'provider' OR role = 'admin');

-- Services policies
DROP POLICY IF EXISTS "Public can view active services" ON services;
CREATE POLICY "Public can view active services" ON services
    FOR SELECT USING (status = 'active' AND approval_status = 'approved');

DROP POLICY IF EXISTS "Providers can manage their own services" ON services;
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'provider_id') THEN
        EXECUTE 'CREATE POLICY "Providers can manage their own services" ON public.services FOR ALL USING (auth.uid() = provider_id)';
    END IF;
END $$;

-- Bookings policies
DROP POLICY IF EXISTS "Clients can insert their own bookings" ON bookings;
CREATE POLICY "Clients can insert their own bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = client_id);

DROP POLICY IF EXISTS "Related users can view bookings" ON bookings;
-- Create basic policy conditionally (only if provider_id column exists)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'bookings' 
        AND column_name = 'provider_id'
    ) THEN
        EXECUTE 'CREATE POLICY "Related users can view bookings" ON public.bookings FOR SELECT USING (auth.uid() = client_id OR auth.uid() = provider_id)';
    ELSE
        -- Fallback: only check client_id if provider_id doesn't exist yet
        EXECUTE 'CREATE POLICY "Related users can view bookings" ON public.bookings FOR SELECT USING (auth.uid() = client_id)';
    END IF;
END $$;

-- Notifications policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT SELECT ON user_permissions TO authenticated;
GRANT EXECUTE ON FUNCTION has_permission(UUID, TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_permissions(UUID) TO authenticated;

-- ============================================================
-- STEP 14: COMMENTS FOR DOCUMENTATION
-- ============================================================

COMMENT ON TABLE profiles IS 'User profiles linked to Supabase auth.users - unified from all three systems';
COMMENT ON TABLE companies IS 'Companies that provide services - merged from Contract-Management-System and business-services-hub';
COMMENT ON TABLE services IS 'Services offered by providers/companies - merged from all three systems';
COMMENT ON TABLE service_packages IS 'Service pricing tiers/packages - from business-services-hub';
COMMENT ON TABLE bookings IS 'Service bookings - merged from all three systems with unified status';
COMMENT ON TABLE booking_events IS 'Audit trail for booking changes - from Contract-Management-System';
COMMENT ON TABLE roles IS 'RBAC roles - from Contract-Management-System';
COMMENT ON TABLE permissions IS 'RBAC permissions - from Contract-Management-System';
COMMENT ON TABLE user_role_assignments IS 'User role assignments with temporal validity - from Contract-Management-System';
COMMENT ON TABLE parties IS 'CRM parties (clients/employers) - from Contract-Management-System';
COMMENT ON TABLE providers IS 'Provider management (adapted from promoters) - from Contract-Management-System';
COMMENT ON TABLE contracts IS 'Enterprise contracts - from Contract-Management-System';
COMMENT ON TABLE invoices IS 'Invoices for bookings/contracts - merged from all systems';
COMMENT ON TABLE notifications IS 'User notifications - comprehensive structure from smartpro-docs';
COMMENT ON TABLE consultation_submissions IS 'Consultation form submissions - from smartpro-docs';
COMMENT ON TABLE leads IS 'Lead tracking - from smartpro-docs';
COMMENT ON TABLE audit_logs IS 'System-wide audit logs - from Contract-Management-System';

-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================
-- Next Steps:
-- 1. Seed default roles and permissions
-- 2. Implement full RBAC-based RLS policies
-- 3. Create additional indexes as needed based on query patterns
-- 4. Set up database functions for business logic
-- 5. Configure storage buckets for file uploads
-- ============================================================

