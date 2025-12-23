-- ============================================================
-- CREATE TEST DATA - SIMPLE VERSION
-- ============================================================
-- This script creates profiles for existing auth.users
-- OR creates sample data assuming users will be created via Supabase Auth
-- ============================================================

-- ============================================================
-- OPTION 1: Create profiles for existing auth.users
-- ============================================================
-- If you have users in auth.users (created via Supabase Auth),
-- this will create their profiles automatically.

INSERT INTO profiles (id, email, full_name, name, role, status, is_verified)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)) AS full_name,
    COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)) AS name,
    COALESCE(au.raw_user_meta_data->>'role', 'client') AS role,
    'active' AS status,
    (au.email_confirmed_at IS NOT NULL) AS is_verified
FROM auth.users au
WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = au.id)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- OPTION 2: Create sample companies
-- ============================================================

INSERT INTO companies (name, slug, description, website, email, phone, address, status)
VALUES 
    ('Acme Corporation', 'acme-corporation', 'A leading enterprise company', 'https://acme.example.com', 'contact@acme.example.com', '+1-555-0100', '{"street": "123 Business St", "city": "New York", "state": "NY", "zip": "10001", "country": "USA"}'::jsonb, 'active'),
    ('Tech Solutions Inc', 'tech-solutions', 'Technology consulting firm', 'https://tech.example.com', 'info@tech.example.com', '+1-555-0200', '{"street": "456 Tech Ave", "city": "San Francisco", "state": "CA", "zip": "94102", "country": "USA"}'::jsonb, 'active'),
    ('Global Services Ltd', 'global-services', 'International business services', 'https://global.example.com', 'hello@global.example.com', '+1-555-0300', '{"street": "789 World Blvd", "city": "London", "state": "", "zip": "SW1A 1AA", "country": "UK"}'::jsonb, 'active')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- OPTION 3: Create sample services (for existing providers)
-- ============================================================

INSERT INTO services (provider_id, title, description, category, price, currency, status)
SELECT 
    p.id AS provider_id,
    'Web Development Service' AS title,
    'Professional web development for your business' AS description,
    'technology' AS category,
    5000.00 AS price,
    'USD' AS currency,
    'active' AS status
FROM profiles p
WHERE p.role = 'provider'
  AND NOT EXISTS (
      SELECT 1 FROM services s WHERE s.provider_id = p.id
  )
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO services (provider_id, title, description, category, price, currency, status)
SELECT 
    p.id AS provider_id,
    'Business Consulting' AS title,
    'Strategic business consulting services' AS description,
    'consulting' AS category,
    3000.00 AS price,
    'USD' AS currency,
    'active' AS status
FROM profiles p
WHERE p.role = 'provider'
  AND NOT EXISTS (
      SELECT 1 FROM services s WHERE s.provider_id = p.id AND s.title = 'Business Consulting'
  )
LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================================
-- OPTION 4: Create sample bookings (for existing clients and providers)
-- ============================================================

INSERT INTO bookings (client_id, provider_id, service_id, status, scheduled_at)
SELECT 
    c.id AS client_id,
    p.id AS provider_id,
    s.id AS service_id,
    'confirmed' AS status,
    NOW() + INTERVAL '7 days' AS scheduled_at
FROM profiles c
CROSS JOIN profiles p
CROSS JOIN services s
WHERE c.role = 'client'
  AND p.role = 'provider'
  AND s.provider_id = p.id
  AND NOT EXISTS (
      SELECT 1 FROM bookings b 
      WHERE b.client_id = c.id 
      AND b.provider_id = p.id
  )
LIMIT 2
ON CONFLICT DO NOTHING;

-- ============================================================
-- VERIFICATION
-- ============================================================

SELECT '=== DATA SUMMARY ===' AS section;

SELECT 
    'Profiles' AS data_type,
    COUNT(*) AS count
FROM profiles
UNION ALL
SELECT 
    'Companies' AS data_type,
    COUNT(*) AS count
FROM companies
UNION ALL
SELECT 
    'Services' AS data_type,
    COUNT(*) AS count
FROM services
UNION ALL
SELECT 
    'Bookings' AS data_type,
    COUNT(*) AS count
FROM bookings;

-- Show profiles by role
SELECT 
    '=== PROFILES BY ROLE ===' AS section,
    COALESCE(role, 'NULL') AS role,
    COUNT(*) AS user_count
FROM profiles
GROUP BY role
ORDER BY user_count DESC;

-- Show users with their data
SELECT 
    '=== USERS WITH DATA ===' AS section,
    p.email,
    p.full_name,
    p.role,
    CASE WHEN EXISTS (SELECT 1 FROM services s WHERE s.provider_id = p.id) THEN '✅ Has Services' ELSE '❌ No Services' END AS has_services,
    CASE WHEN EXISTS (SELECT 1 FROM bookings b WHERE b.client_id = p.id) THEN '✅ Has Bookings' ELSE '❌ No Bookings' END AS has_bookings,
    CASE WHEN p.company_id IS NOT NULL THEN '✅ Has Company' ELSE '❌ No Company' END AS has_company
FROM profiles p
ORDER BY p.email;

