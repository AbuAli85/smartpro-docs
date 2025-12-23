-- ============================================================
-- CHECK YOUR TABLE STRUCTURE
-- ============================================================
-- Run this to see what tables you have and their structure
-- ============================================================

-- 1. Check if core tables exist
SELECT 
    'Core Tables Check' AS check_type,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') 
         THEN '✅ EXISTS' ELSE '❌ MISSING' END AS profiles,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'companies') 
         THEN '✅ EXISTS' ELSE '❌ MISSING' END AS companies,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'services') 
         THEN '✅ EXISTS' ELSE '❌ MISSING' END AS services,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'bookings') 
         THEN '✅ EXISTS' ELSE '❌ MISSING' END AS bookings;

-- 2. Check profiles table structure
SELECT 
    'Profiles Table Columns' AS info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 3. Check companies table structure
SELECT 
    'Companies Table Columns' AS info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'companies'
ORDER BY ordinal_position;

-- 4. Check if services table exists and its structure
SELECT 
    'Services Table Columns' AS info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'services'
ORDER BY ordinal_position;

-- 5. Check bookings table structure
SELECT 
    'Bookings Table Columns' AS info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'bookings'
ORDER BY ordinal_position;

-- 6. Count records in each table
SELECT 
    'Table Record Counts' AS info,
    'profiles' AS table_name,
    COUNT(*) AS record_count
FROM profiles
UNION ALL
SELECT 
    'Table Record Counts',
    'companies',
    COUNT(*)
FROM companies
UNION ALL
SELECT 
    'Table Record Counts',
    'services',
    COUNT(*)
FROM services
UNION ALL
SELECT 
    'Table Record Counts',
    'bookings',
    COUNT(*)
FROM bookings;

-- 7. Check for any duplicate emails in profiles
SELECT 
    'Duplicate Emails Check' AS info,
    email,
    COUNT(*) AS count
FROM profiles
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY count DESC
LIMIT 10;

-- 8. Check profiles by role (if role column exists)
SELECT 
    'Profiles by Role' AS info,
    COALESCE(role::text, 'NULL') AS role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

