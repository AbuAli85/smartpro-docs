-- ============================================================
-- VERIFY DATA MIGRATION
-- ============================================================
-- This script verifies that data was migrated correctly
-- Run this after importing data from old databases
-- ============================================================

-- ============================================================
-- 1. Check data counts
-- ============================================================

SELECT 
    '=== DATA COUNTS ===' AS section;

SELECT 
    'Profiles' AS table_name,
    COUNT(*) AS record_count
FROM profiles
UNION ALL
SELECT 
    'Companies',
    COUNT(*)
FROM companies
UNION ALL
SELECT 
    'Services',
    COUNT(*)
FROM services
UNION ALL
SELECT 
    'Bookings',
    COUNT(*)
FROM bookings
UNION ALL
SELECT 
    'Contracts',
    COUNT(*)
FROM contracts
UNION ALL
SELECT 
    'Reviews',
    COUNT(*)
FROM reviews
UNION ALL
SELECT 
    'Messages',
    COUNT(*)
FROM messages
UNION ALL
SELECT 
    'Invoices',
    COUNT(*)
FROM invoices;

-- ============================================================
-- 2. Check for missing foreign keys
-- ============================================================

SELECT 
    '=== FOREIGN KEY INTEGRITY ===' AS section;

-- Services without valid providers
SELECT 
    'Services without valid providers' AS issue,
    COUNT(*) AS count
FROM services s
WHERE s.provider_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = s.provider_id);

-- Services without valid companies (if provider_company_id is set)
SELECT 
    'Services without valid companies' AS issue,
    COUNT(*) AS count
FROM services s
WHERE s.provider_company_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM companies c WHERE c.id = s.provider_company_id);

-- Bookings without valid clients
SELECT 
    'Bookings without valid clients' AS issue,
    COUNT(*) AS count
FROM bookings b
WHERE b.client_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = b.client_id);

-- Bookings without valid providers
SELECT 
    'Bookings without valid providers' AS issue,
    COUNT(*) AS count
FROM bookings b
WHERE b.provider_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = b.provider_id);

-- Bookings without valid services
SELECT 
    'Bookings without valid services' AS issue,
    COUNT(*) AS count
FROM bookings b
WHERE b.service_id IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM services s WHERE s.id = b.service_id);

-- Profiles without auth users
SELECT 
    'Profiles without auth users' AS issue,
    COUNT(*) AS count
FROM profiles p
WHERE NOT EXISTS (SELECT 1 FROM auth.users au WHERE au.id = p.id);

-- ============================================================
-- 3. Check for duplicate emails
-- ============================================================

SELECT 
    '=== DUPLICATE CHECK ===' AS section;

SELECT 
    'Duplicate emails' AS issue,
    email,
    COUNT(*) AS count
FROM profiles
GROUP BY email
HAVING COUNT(*) > 1;

-- ============================================================
-- 4. Check data completeness
-- ============================================================

SELECT 
    '=== DATA COMPLETENESS ===' AS section;

-- Profiles missing required fields
SELECT 
    'Profiles missing email' AS issue,
    COUNT(*) AS count
FROM profiles
WHERE email IS NULL OR email = '';

-- Services missing required fields
SELECT 
    'Services missing title' AS issue,
    COUNT(*) AS count
FROM services
WHERE title IS NULL OR title = '';

SELECT 
    'Services missing provider' AS issue,
    COUNT(*) AS count
FROM services
WHERE provider_id IS NULL AND provider_company_id IS NULL;

-- Companies missing required fields
SELECT 
    'Companies missing name' AS issue,
    COUNT(*) AS count
FROM companies
WHERE name IS NULL OR name = '';

SELECT 
    'Companies missing slug' AS issue,
    COUNT(*) AS count
FROM companies
WHERE slug IS NULL OR slug = '';

-- ============================================================
-- 5. Check role assignments
-- ============================================================

SELECT 
    '=== ROLE ASSIGNMENTS ===' AS section;

SELECT 
    'Profiles with legacy roles' AS metric,
    COALESCE(role, 'NULL') AS legacy_role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

SELECT 
    'RBAC role assignments' AS metric,
    r.name AS role_name,
    COUNT(*) AS assignment_count,
    COUNT(DISTINCT ura.user_id) AS unique_users
FROM roles r
LEFT JOIN user_role_assignments ura ON r.id = ura.role_id
WHERE ura.is_active = TRUE
GROUP BY r.id, r.name
ORDER BY assignment_count DESC;

SELECT 
    'Profiles without RBAC roles' AS issue,
    COUNT(*) AS count
FROM profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM user_role_assignments ura
    WHERE ura.user_id = p.id
    AND ura.is_active = TRUE
);

-- ============================================================
-- 6. Check data relationships
-- ============================================================

SELECT 
    '=== DATA RELATIONSHIPS ===' AS section;

-- Providers with services
SELECT 
    'Providers with services' AS metric,
    COUNT(DISTINCT s.provider_id) AS provider_count
FROM services s
WHERE s.provider_id IS NOT NULL;

-- Clients with bookings
SELECT 
    'Clients with bookings' AS metric,
    COUNT(DISTINCT b.client_id) AS client_count
FROM bookings b
WHERE b.client_id IS NOT NULL;

-- Companies with employees
SELECT 
    'Companies with employees' AS metric,
    COUNT(DISTINCT p.company_id) AS company_count
FROM profiles p
WHERE p.company_id IS NOT NULL;

-- Services with bookings
SELECT 
    'Services with bookings' AS metric,
    COUNT(DISTINCT b.service_id) AS service_count
FROM bookings b
WHERE b.service_id IS NOT NULL;

-- ============================================================
-- 7. Sample data verification
-- ============================================================

SELECT 
    '=== SAMPLE DATA ===' AS section;

-- Sample profiles
SELECT 
    'Sample Profiles' AS data_type,
    id,
    email,
    full_name,
    role,
    created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 5;

-- Sample services
SELECT 
    'Sample Services' AS data_type,
    id,
    title,
    category,
    price,
    status,
    created_at
FROM services
ORDER BY created_at DESC
LIMIT 5;

-- Sample companies
SELECT 
    'Sample Companies' AS data_type,
    id,
    name,
    slug,
    status,
    created_at
FROM companies
ORDER BY created_at DESC
LIMIT 5;

-- ============================================================
-- 8. Summary report
-- ============================================================

SELECT 
    '=== MIGRATION SUMMARY ===' AS section;

SELECT 
    (SELECT COUNT(*) FROM profiles) AS total_profiles,
    (SELECT COUNT(*) FROM companies) AS total_companies,
    (SELECT COUNT(*) FROM services) AS total_services,
    (SELECT COUNT(*) FROM bookings) AS total_bookings,
    (SELECT COUNT(*) FROM profiles WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = profiles.id)) AS profiles_without_auth_users,
    (SELECT COUNT(*) FROM profiles WHERE NOT EXISTS (SELECT 1 FROM user_role_assignments WHERE user_role_assignments.user_id = profiles.id AND user_role_assignments.is_active = TRUE)) AS profiles_without_rbac_roles;

