-- ============================================================
-- MIGRATE FROM SINGLE DATABASE
-- ============================================================
-- Both Contract-Management-System and business-services-hub
-- are in the same Supabase database account.
-- 
-- This script migrates data from both systems to the unified schema
-- all within the same database.
-- ============================================================

-- ============================================================
-- STEP 1: IMPORT PROFILES FROM BOTH SYSTEMS
-- ============================================================

-- Import from Contract-Management-System profiles
INSERT INTO profiles (id, email, full_name, name, phone, address, preferences, role, status, created_at, updated_at)
SELECT 
    COALESCE(p.user_id, p.id) as id,
    p.email,
    p.full_name,
    p.full_name as name,
    p.phone,
    p.address,
    COALESCE(p.preferences, '{}'::jsonb) as preferences,
    'client' as role, -- Default, will be updated by RBAC later
    'active' as status,
    COALESCE(p.created_at, NOW()) as created_at,
    COALESCE(p.updated_at, NOW()) as updated_at
FROM profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM profiles up 
    WHERE up.id = COALESCE(p.user_id, p.id)
)
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
    phone = COALESCE(profiles.phone, EXCLUDED.phone),
    address = COALESCE(profiles.address, EXCLUDED.address),
    preferences = COALESCE(profiles.preferences, '{}'::jsonb) || EXCLUDED.preferences,
    updated_at = GREATEST(profiles.updated_at, EXCLUDED.updated_at);

-- Import from business-services-hub profiles (if table structure differs, adjust query)
-- Note: If both systems use the same 'profiles' table, the above query handles both
-- If they're in different schemas or have different names, uncomment and adjust:

/*
-- If business-services-hub profiles are in a different schema:
INSERT INTO profiles (id, email, full_name, name, phone, country, company_id, is_verified, role, status, created_at, updated_at)
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.full_name as name,
    p.phone,
    p.country,
    p.company_id,
    COALESCE(p.is_verified, false) as is_verified,
    COALESCE(p.role, 'client') as role,
    'active' as status,
    COALESCE(p.created_at, NOW()) as created_at,
    COALESCE(p.updated_at, NOW()) as updated_at
FROM business_schema.profiles p  -- Adjust schema/table name as needed
WHERE NOT EXISTS (
    SELECT 1 FROM profiles up 
    WHERE up.id = p.id
)
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
    phone = COALESCE(profiles.phone, EXCLUDED.phone),
    country = COALESCE(profiles.country, EXCLUDED.country),
    company_id = COALESCE(profiles.company_id, EXCLUDED.company_id),
    is_verified = COALESCE(profiles.is_verified, EXCLUDED.is_verified),
    role = COALESCE(profiles.role, EXCLUDED.role),
    updated_at = GREATEST(profiles.updated_at, EXCLUDED.updated_at);
*/

-- ============================================================
-- STEP 2: IMPORT COMPANIES FROM BOTH SYSTEMS
-- ============================================================

-- Import from Contract-Management-System companies
INSERT INTO companies (id, name, slug, description, logo_url, website, email, phone, address, status, created_at, updated_at)
SELECT 
    c.id,
    c.name,
    c.slug,
    c.description,
    c.logo_url,
    c.website,
    c.email,
    c.phone,
    c.address,
    CASE WHEN COALESCE(c.is_active, true) THEN 'active' ELSE 'inactive' END as status,
    COALESCE(c.created_at, NOW()) as created_at,
    COALESCE(c.updated_at, NOW()) as updated_at
FROM companies c
WHERE NOT EXISTS (
    SELECT 1 FROM companies uc 
    WHERE uc.slug = c.slug OR uc.name = c.name
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = COALESCE(companies.description, EXCLUDED.description),
    logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url),
    website = COALESCE(companies.website, EXCLUDED.website),
    email = COALESCE(companies.email, EXCLUDED.email),
    phone = COALESCE(companies.phone, EXCLUDED.phone),
    address = COALESCE(companies.address, EXCLUDED.address);

-- Import from business-services-hub companies (if they exist separately)
-- Note: If both use same companies table, adjust query or uncomment if separate:

/*
-- If business-services-hub companies are separate:
INSERT INTO companies (id, name, slug, logo_url, cr_number, vat_number, status, created_at)
SELECT 
    c.id,
    c.name,
    LOWER(REGEXP_REPLACE(c.name, '[^a-zA-Z0-9]+', '-', 'g')) as slug,
    c.logo_url,
    c.cr_number,
    c.vat_number,
    'active' as status,
    COALESCE(c.created_at, NOW()) as created_at
FROM business_schema.companies c  -- Adjust schema/table name as needed
WHERE NOT EXISTS (
    SELECT 1 FROM companies uc 
    WHERE uc.slug = LOWER(REGEXP_REPLACE(c.name, '[^a-zA-Z0-9]+', '-', 'g'))
       OR uc.name = c.name
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url),
    cr_number = COALESCE(companies.cr_number, EXCLUDED.cr_number),
    vat_number = COALESCE(companies.vat_number, EXCLUDED.vat_number);
*/

-- ============================================================
-- STEP 3: UPDATE COMPANY REFERENCES IN PROFILES
-- ============================================================

-- Update profiles.company_id to point to unified companies table
-- (if company_id needs to be mapped)

UPDATE profiles p
SET company_id = c.id
FROM companies c
WHERE p.company_id IS NOT NULL
  AND EXISTS (
      SELECT 1 FROM companies oc 
      WHERE oc.id = p.company_id
  )
  AND NOT EXISTS (
      SELECT 1 FROM companies nc 
      WHERE nc.id = p.company_id
  )
  AND c.name = (
      -- Find matching company by name or other identifier
      SELECT name FROM companies oc WHERE oc.id = p.company_id LIMIT 1
  );

-- ============================================================
-- STEP 4: IMPORT SERVICES FROM BOTH SYSTEMS
-- ============================================================

-- Import from Contract-Management-System services
INSERT INTO services (
    id, provider_id, provider_company_id, title, description, category,
    price, currency, duration_minutes, max_participants, status,
    metadata, created_at, updated_at
)
SELECT 
    s.id,
    s.created_by as provider_id,
    s.company_id as provider_company_id,
    s.name as title,
    s.description,
    s.category,
    s.price_base as price,
    COALESCE(s.price_currency, 'USD') as currency,
    s.duration_minutes,
    s.max_participants,
    CASE 
        WHEN s.status = 'active' THEN 'active'::service_status_type
        WHEN s.status = 'inactive' THEN 'inactive'::service_status_type
        WHEN s.status = 'draft' THEN 'draft'::service_status_type
        ELSE 'active'::service_status_type
    END as status,
    COALESCE(s.metadata, '{}'::jsonb) as metadata,
    COALESCE(s.created_at, NOW()) as created_at,
    COALESCE(s.updated_at, NOW()) as updated_at
FROM services s
WHERE NOT EXISTS (
    SELECT 1 FROM services us WHERE us.id = s.id
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    currency = EXCLUDED.currency,
    status = EXCLUDED.status;

-- Import from business-services-hub services (if they exist separately)
-- Note: Adjust query based on your actual table structure:

/*
-- If business-services-hub services are separate or have different structure:
INSERT INTO services (
    id, provider_id, title, description, category, price, currency,
    location, tags, requirements, cover_image_url, featured,
    rating, review_count, booking_count, status, created_at, updated_at
)
SELECT 
    s.id,
    s.provider_id,
    s.title,
    s.description,
    s.category,
    s.base_price as price,
    COALESCE(s.currency, 'USD') as currency,
    s.location,
    s.tags,
    s.requirements,
    s.cover_image_url,
    COALESCE(s.featured, false) as featured,
    COALESCE(s.rating, 0) as rating,
    COALESCE(s.review_count, 0) as review_count,
    COALESCE(s.booking_count, 0) as booking_count,
    CASE 
        WHEN s.status = 'active' AND COALESCE(s.approval_status, 'approved') = 'approved' 
        THEN 'active'::service_status_type
        WHEN s.status = 'pending' OR s.approval_status = 'pending' 
        THEN 'pending'::service_status_type
        ELSE 'active'::service_status_type
    END as status,
    COALESCE(s.created_at, NOW()) as created_at,
    COALESCE(s.updated_at, NOW()) as updated_at
FROM business_schema.services s  -- Adjust schema/table name as needed
WHERE NOT EXISTS (
    SELECT 1 FROM services us WHERE us.id = s.id
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    status = EXCLUDED.status;
*/

-- ============================================================
-- STEP 5: IMPORT BOOKINGS (if they exist)
-- ============================================================

-- Note: Adjust based on your actual bookings table structure
INSERT INTO bookings (
    id, client_id, provider_id, provider_company_id, service_id,
    status, scheduled_at, created_at, updated_at
)
SELECT 
    b.id,
    b.client_id,
    b.provider_id,
    b.provider_company_id,
    b.service_id,
    COALESCE(b.status::booking_status_type, 'pending'::booking_status_type) as status,
    b.scheduled_at,
    COALESCE(b.created_at, NOW()) as created_at,
    COALESCE(b.updated_at, NOW()) as updated_at
FROM bookings b
WHERE NOT EXISTS (
    SELECT 1 FROM bookings ub WHERE ub.id = b.id
)
ON CONFLICT (id) DO UPDATE SET
    client_id = EXCLUDED.client_id,
    provider_id = EXCLUDED.provider_id,
    service_id = EXCLUDED.service_id,
    status = EXCLUDED.status;

-- ============================================================
-- STEP 6: VERIFICATION
-- ============================================================

SELECT 
    '=== MIGRATION SUMMARY ===' AS section;

SELECT 
    'Total Profiles' AS metric,
    COUNT(*) AS count
FROM profiles
UNION ALL
SELECT 
    'Total Companies',
    COUNT(*)
FROM companies
UNION ALL
SELECT 
    'Total Services',
    COUNT(*)
FROM services
UNION ALL
SELECT 
    'Total Bookings',
    COUNT(*)
FROM bookings;

-- Check for profiles without auth users (informational)
SELECT 
    'Profiles without auth users' AS check_type,
    COUNT(*) AS count
FROM profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM auth.users au WHERE au.id = p.id
);

-- Show profiles by role
SELECT 
    'Profiles by Role' AS metric,
    COALESCE(role, 'NULL') AS role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

-- ============================================================
-- NEXT STEPS
-- ============================================================

SELECT 
    '=== NEXT STEPS ===' AS section,
    '1. Run SETUP_ROLES_FROM_SUPABASE.sql to assign RBAC roles' AS step_1,
    '2. Run VERIFY_MIGRATION.sql to verify data integrity' AS step_2,
    '3. Test your application with migrated data' AS step_3;

