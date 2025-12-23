-- ============================================================
-- SIMPLE DATA MIGRATION - NO PYTHON REQUIRED!
-- ============================================================
-- This script uses Supabase's built-in features to migrate data
-- directly from one database to another using SQL.
--
-- HOW TO USE:
-- 1. Connect to your OLD database (Contract-Management-System)
-- 2. Run the EXPORT sections to get data
-- 3. Connect to your NEW unified database
-- 4. Run the IMPORT sections
-- ============================================================

-- ============================================================
-- PART 1: EXPORT DATA FROM OLD DATABASES
-- ============================================================
-- Run these in your OLD databases to prepare data for migration
-- ============================================================

-- ============================================================
-- EXPORT FROM Contract-Management-System
-- ============================================================
-- Run this in Contract-Management-System Supabase SQL Editor
-- Copy the results and save them

/*
-- Export profiles
SELECT 
    id::text,
    COALESCE(user_id, id)::text as user_id,
    email,
    full_name,
    phone,
    COALESCE(address::text, '{}') as address,
    COALESCE(preferences::text, '{}') as preferences,
    created_at::text,
    updated_at::text
FROM profiles
ORDER BY created_at;

-- Export companies
SELECT 
    id::text,
    name,
    slug,
    description,
    logo_url,
    website,
    email,
    phone,
    COALESCE(address::text, '{}') as address,
    is_active,
    created_at::text,
    updated_at::text
FROM companies
ORDER BY created_at;

-- Export services
SELECT 
    id::text,
    company_id::text,
    name as title,
    description,
    category,
    price_base as price,
    price_currency as currency,
    duration_minutes,
    status,
    created_by::text,
    created_at::text,
    updated_at::text
FROM services
ORDER BY created_at;
*/

-- ============================================================
-- EXPORT FROM business-services-hub
-- ============================================================
-- Run this in business-services-hub Supabase SQL Editor
-- Copy the results and save them

/*
-- Export profiles
SELECT 
    id::text,
    email,
    full_name,
    phone,
    country,
    company_id::text,
    is_verified,
    role,
    created_at::text,
    updated_at::text
FROM profiles
ORDER BY created_at;

-- Export companies
SELECT 
    id::text,
    owner_id::text,
    name,
    cr_number,
    vat_number,
    logo_url,
    created_at::text
FROM companies
ORDER BY created_at;

-- Export services
SELECT 
    id::text,
    provider_id::text,
    title,
    description,
    category,
    base_price as price,
    currency,
    location,
    status,
    created_at::text,
    updated_at::text
FROM services
ORDER BY created_at;
*/

-- ============================================================
-- PART 2: IMPORT INTO UNIFIED DATABASE
-- ============================================================
-- Run these in your NEW unified Supabase SQL Editor
-- Replace the VALUES with your exported data
-- ============================================================

-- ============================================================
-- STEP 1: Import Profiles from Contract-Management-System
-- ============================================================

-- Replace the VALUES below with your exported data
INSERT INTO profiles (id, email, full_name, name, phone, address, preferences, role, status, created_at, updated_at)
VALUES 
    -- Example: Replace with your actual data
    -- ('uuid-here', 'user@example.com', 'Full Name', 'Full Name', '+1234567890', '{}'::jsonb, '{}'::jsonb, 'client', 'active', NOW(), NOW()),
    -- Add more rows here...
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
    phone = COALESCE(profiles.phone, EXCLUDED.phone),
    address = COALESCE(profiles.address, EXCLUDED.address),
    preferences = COALESCE(profiles.preferences, '{}'::jsonb) || EXCLUDED.preferences,
    updated_at = GREATEST(profiles.updated_at, EXCLUDED.updated_at);

-- ============================================================
-- STEP 2: Import Profiles from business-services-hub
-- ============================================================

INSERT INTO profiles (id, email, full_name, name, phone, country, company_id, is_verified, role, status, created_at, updated_at)
VALUES 
    -- Example: Replace with your actual data
    -- ('uuid-here', 'user@example.com', 'Full Name', 'Full Name', '+1234567890', 'US', NULL, false, 'client', 'active', NOW(), NOW()),
    -- Add more rows here...
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
    phone = COALESCE(profiles.phone, EXCLUDED.phone),
    country = COALESCE(profiles.country, EXCLUDED.country),
    company_id = COALESCE(profiles.company_id, EXCLUDED.company_id),
    is_verified = COALESCE(profiles.is_verified, EXCLUDED.is_verified),
    role = COALESCE(profiles.role, EXCLUDED.role),
    updated_at = GREATEST(profiles.updated_at, EXCLUDED.updated_at);

-- ============================================================
-- STEP 3: Import Companies from Contract-Management-System
-- ============================================================

INSERT INTO companies (id, name, slug, description, logo_url, website, email, phone, address, status, created_at, updated_at)
VALUES 
    -- Example: Replace with your actual data
    -- ('uuid-here', 'Company Name', 'company-slug', 'Description', NULL, 'https://example.com', 'email@example.com', '+1234567890', '{}'::jsonb, 'active', NOW(), NOW()),
    -- Add more rows here...
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = COALESCE(companies.description, EXCLUDED.description),
    logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url),
    website = COALESCE(companies.website, EXCLUDED.website),
    email = COALESCE(companies.email, EXCLUDED.email),
    phone = COALESCE(companies.phone, EXCLUDED.phone),
    address = COALESCE(companies.address, EXCLUDED.address);

-- ============================================================
-- STEP 4: Import Companies from business-services-hub
-- ============================================================

INSERT INTO companies (id, name, slug, logo_url, cr_number, vat_number, status, created_at)
VALUES 
    -- Example: Replace with your actual data
    -- ('uuid-here', 'Company Name', 'company-name', NULL, 'CR123', 'VAT456', 'active', NOW()),
    -- Add more rows here...
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url),
    cr_number = COALESCE(companies.cr_number, EXCLUDED.cr_number),
    vat_number = COALESCE(companies.vat_number, EXCLUDED.vat_number);

-- ============================================================
-- STEP 5: Import Services
-- ============================================================

INSERT INTO services (id, provider_id, provider_company_id, title, description, category, price, currency, duration_minutes, status, created_at, updated_at)
VALUES 
    -- Example: Replace with your actual data
    -- ('uuid-here', 'provider-uuid', 'company-uuid', 'Service Title', 'Description', 'category', 100.00, 'USD', 60, 'active', NOW(), NOW()),
    -- Add more rows here...
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    status = EXCLUDED.status;

-- ============================================================
-- VERIFICATION
-- ============================================================

SELECT 
    'Migration Summary' AS info,
    (SELECT COUNT(*) FROM profiles) AS total_profiles,
    (SELECT COUNT(*) FROM companies) AS total_companies,
    (SELECT COUNT(*) FROM services) AS total_services;

