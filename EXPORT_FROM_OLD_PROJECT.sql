-- ============================================================
-- EXPORT DATA FROM OLD SUPABASE PROJECT
-- ============================================================
-- Run this in your OLD Supabase project SQL Editor
-- This exports data in a format ready for import
-- ============================================================

-- ============================================================
-- EXPORT PROFILES
-- ============================================================

SELECT 
    id::text,
    email,
    COALESCE(full_name, CONCAT(first_name, ' ', last_name), split_part(email, '@', 1)) AS full_name,
    phone,
    COALESCE(avatar_url, profile_image_url) AS avatar_url,
    COALESCE(company_name, company) AS company_name,
    country,
    COALESCE(is_verified, false) AS is_verified,
    CASE 
        WHEN role = 'promoter' THEN 'provider'
        WHEN role = 'user' THEN 'client'
        ELSE COALESCE(role, 'client')
    END AS role,
    CASE 
        WHEN status = 'pending' THEN 'active'
        WHEN status = 'approved' THEN 'active'
        WHEN status = 'suspended' THEN 'suspended'
        WHEN status = 'deleted' THEN 'inactive'
        ELSE 'active'
    END AS status,
    created_at::text,
    updated_at::text
FROM profiles
ORDER BY created_at;

-- ============================================================
-- EXPORT COMPANIES
-- ============================================================

SELECT 
    id::text,
    name,
    COALESCE(slug, LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))) AS slug,
    description,
    logo_url,
    website,
    email,
    phone,
    address::text AS address_json,
    cr_number,
    vat_number,
    owner_id::text,
    CASE 
        WHEN COALESCE(is_active, true) THEN 'active'
        ELSE 'inactive'
    END AS status,
    created_at::text,
    updated_at::text
FROM companies
ORDER BY created_at;

-- ============================================================
-- EXPORT SERVICES
-- ============================================================
-- Based on your table structure: services.company_id ✅ EXISTS
-- Maps company_id → provider_company_id for unified schema

SELECT 
    id::text,
    provider_id::text,
    company_id::text AS provider_company_id,  -- Maps company_id → provider_company_id
    COALESCE(title, name) AS title,
    description,
    category,
    COALESCE(price, base_price, price_base, 0) AS price,
    COALESCE(currency, price_currency, 'USD') AS currency,
    location,
    tags::text AS tags_array,
    requirements,
    cover_image_url,
    COALESCE(featured, is_featured, false) AS featured,
    COALESCE(rating, 0) AS rating,
    COALESCE(review_count, 0) AS review_count,
    COALESCE(booking_count, 0) AS booking_count,
    CASE 
        WHEN status = 'active' AND COALESCE(approval_status, 'approved') = 'approved' THEN 'active'
        WHEN status = 'pending' OR approval_status = 'pending' THEN 'pending'
        WHEN status = 'inactive' OR status = 'archived' THEN 'inactive'
        WHEN status = 'draft' THEN 'draft'
        ELSE 'active'
    END AS status,
    created_at::text,
    updated_at::text
FROM services
ORDER BY created_at;
    COALESCE(title, name) AS title,
    description,
    category,
    COALESCE(price, base_price, price_base, 0) AS price,
    COALESCE(currency, price_currency, 'USD') AS currency,
    location,
    tags::text AS tags_array,
    requirements,
    cover_image_url,
    COALESCE(featured, is_featured, false) AS featured,
    COALESCE(rating, 0) AS rating,
    COALESCE(review_count, 0) AS review_count,
    COALESCE(booking_count, 0) AS booking_count,
    CASE 
        WHEN status = 'active' AND COALESCE(approval_status, 'approved') = 'approved' THEN 'active'
        WHEN status = 'pending' OR approval_status = 'pending' THEN 'pending'
        WHEN status = 'inactive' OR status = 'archived' THEN 'inactive'
        WHEN status = 'draft' THEN 'draft'
        ELSE 'active'
    END AS status,
    created_at::text,
    updated_at::text
FROM services
ORDER BY created_at;

-- ============================================================
-- EXPORT BOOKINGS
-- ============================================================
-- Based on your table structure: 
-- - bookings.provider_company_id ✅ EXISTS
-- - bookings.package_id ✅ EXISTS

SELECT 
    id::text,
    COALESCE(client_id, user_id)::text AS client_id,
    provider_id::text,
    provider_company_id::text,  -- This exists ✅
    service_id::text,
    package_id::text,  -- This exists ✅
    CASE 
        WHEN status = 'approved' THEN 'confirmed'
        WHEN status = 'pending' THEN 'pending'
        WHEN status = 'in_progress' THEN 'in_progress'
        WHEN status = 'completed' THEN 'completed'
        WHEN status = 'cancelled' THEN 'cancelled'
        WHEN status = 'declined' THEN 'cancelled'
        WHEN status = 'confirmed' THEN 'confirmed'
        WHEN status = 'draft' THEN 'draft'
        ELSE 'pending'
    END AS status,
    COALESCE(scheduled_at, scheduled_start, start_time)::text AS scheduled_at,
    created_at::text,
    updated_at::text
FROM bookings
ORDER BY created_at;

-- ============================================================
-- EXPORT SUMMARY
-- ============================================================

SELECT 
    '=== EXPORT SUMMARY ===' AS section,
    (SELECT COUNT(*) FROM profiles) AS total_profiles,
    (SELECT COUNT(*) FROM companies) AS total_companies,
    (SELECT COUNT(*) FROM services) AS total_services,
    (SELECT COUNT(*) FROM bookings) AS total_bookings;

-- ============================================================
-- INSTRUCTIONS
-- ============================================================
-- 1. Run each SELECT statement above
-- 2. Copy the results (right-click → Copy)
-- 3. Save to CSV files or text files:
--    - profiles_export.csv
--    - companies_export.csv
--    - services_export.csv
--    - bookings_export.csv
-- 4. Or use Supabase Dashboard → Table Editor → Export
-- ============================================================

