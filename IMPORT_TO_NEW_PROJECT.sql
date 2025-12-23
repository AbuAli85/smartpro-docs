-- ============================================================
-- IMPORT DATA TO NEW UNIFIED SUPABASE PROJECT
-- ============================================================
-- Run this in your NEW unified Supabase project SQL Editor
-- Replace the VALUES with your exported data
-- ============================================================

-- ============================================================
-- STEP 1: IMPORT PROFILES
-- ============================================================
-- Replace the VALUES below with your exported profiles data

INSERT INTO profiles (
    id, email, full_name, name, phone, avatar_url, 
    company_name, country, is_verified, role, status, 
    created_at, updated_at
)
VALUES 
    -- Example format - replace with your actual exported data:
    -- ('uuid-here', 'user@example.com', 'Full Name', 'Full Name', '+1234567890', NULL, 'Company Name', 'US', false, 'client', 'active', NOW(), NOW()),
    -- Add all your exported profile rows here...
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
    name = COALESCE(profiles.name, EXCLUDED.name),
    phone = COALESCE(profiles.phone, EXCLUDED.phone),
    avatar_url = COALESCE(profiles.avatar_url, EXCLUDED.avatar_url),
    company_name = COALESCE(profiles.company_name, EXCLUDED.company_name),
    country = COALESCE(profiles.country, EXCLUDED.country),
    is_verified = COALESCE(profiles.is_verified, EXCLUDED.is_verified),
    role = EXCLUDED.role,
    status = EXCLUDED.status,
    updated_at = GREATEST(profiles.updated_at, EXCLUDED.updated_at);

-- ============================================================
-- STEP 2: IMPORT COMPANIES
-- ============================================================

INSERT INTO companies (
    id, name, slug, description, logo_url, website, 
    email, phone, address, cr_number, vat_number, 
    owner_id, status, created_at, updated_at
)
VALUES 
    -- Example format - replace with your actual exported data:
    -- ('uuid-here', 'Company Name', 'company-slug', 'Description', NULL, 'https://example.com', 'email@example.com', '+1234567890', '{}'::jsonb, NULL, NULL, NULL, 'active', NOW(), NOW()),
    -- Add all your exported company rows here...
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = COALESCE(companies.description, EXCLUDED.description),
    logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url),
    website = COALESCE(companies.website, EXCLUDED.website),
    email = COALESCE(companies.email, EXCLUDED.email),
    phone = COALESCE(companies.phone, EXCLUDED.phone),
    address = COALESCE(companies.address, EXCLUDED.address),
    cr_number = COALESCE(companies.cr_number, EXCLUDED.cr_number),
    vat_number = COALESCE(companies.vat_number, EXCLUDED.vat_number),
    status = EXCLUDED.status;

-- ============================================================
-- STEP 3: UPDATE COMPANY REFERENCES IN PROFILES
-- ============================================================

UPDATE profiles p
SET company_id = c.id
FROM companies c
WHERE p.company_name = c.name
  AND p.company_id IS NULL
  AND c.id IS NOT NULL;

-- ============================================================
-- STEP 4: IMPORT SERVICES
-- ============================================================

INSERT INTO services (
    id, provider_id, provider_company_id, title, description, 
    category, price, currency, location, tags, requirements,
    cover_image_url, featured, rating, review_count, booking_count,
    status, created_at, updated_at
)
VALUES 
    -- Example format - replace with your actual exported data:
    -- ('uuid-here', 'provider-uuid', 'company-uuid', 'Service Title', 'Description', 'category', 100.00, 'USD', NULL, ARRAY[]::text[], NULL, NULL, false, 0, 0, 0, 'active', NOW(), NOW()),
    -- Add all your exported service rows here...
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    currency = EXCLUDED.currency,
    status = EXCLUDED.status;

-- ============================================================
-- STEP 5: IMPORT BOOKINGS
-- ============================================================

INSERT INTO bookings (
    id, client_id, provider_id, provider_company_id, 
    service_id, package_id, status, scheduled_at,
    created_at, updated_at
)
VALUES 
    -- Example format - replace with your actual exported data:
    -- ('uuid-here', 'client-uuid', 'provider-uuid', 'company-uuid', 'service-uuid', NULL, 'pending', NOW(), NOW(), NOW()),
    -- Add all your exported booking rows here...
ON CONFLICT (id) DO UPDATE SET
    client_id = EXCLUDED.client_id,
    provider_id = EXCLUDED.provider_id,
    service_id = EXCLUDED.service_id,
    status = EXCLUDED.status;

-- ============================================================
-- STEP 6: ASSIGN RBAC ROLES
-- ============================================================

-- Assign roles based on profiles.role
INSERT INTO user_role_assignments (user_id, role_id)
SELECT p.id, r.id
FROM profiles p
CROSS JOIN roles r
WHERE p.role = 'admin' AND r.name = 'admin'
ON CONFLICT DO NOTHING;

INSERT INTO user_role_assignments (user_id, role_id)
SELECT p.id, r.id
FROM profiles p
CROSS JOIN roles r
WHERE p.role = 'provider' AND r.name = 'provider'
ON CONFLICT DO NOTHING;

INSERT INTO user_role_assignments (user_id, role_id)
SELECT p.id, r.id
FROM profiles p
CROSS JOIN roles r
WHERE p.role = 'client' AND r.name = 'client'
ON CONFLICT DO NOTHING;

-- ============================================================
-- STEP 7: REFRESH MATERIALIZED VIEW
-- ============================================================

REFRESH MATERIALIZED VIEW user_permissions;

-- ============================================================
-- VERIFICATION
-- ============================================================

SELECT 
    '=== IMPORT SUMMARY ===' AS section,
    (SELECT COUNT(*) FROM profiles) AS total_profiles,
    (SELECT COUNT(*) FROM companies) AS total_companies,
    (SELECT COUNT(*) FROM services) AS total_services,
    (SELECT COUNT(*) FROM bookings) AS total_bookings;

