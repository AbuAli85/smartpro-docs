-- ============================================================
-- CHECK COLUMNS IN OLD DATABASE TABLES
-- ============================================================
-- Run this in your OLD Supabase project to see what columns exist
-- This helps you adjust the export scripts
-- ============================================================

-- Check profiles table columns
SELECT 
    '=== PROFILES TABLE COLUMNS ===' AS table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Check companies table columns
SELECT 
    '=== COMPANIES TABLE COLUMNS ===' AS table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'companies'
ORDER BY ordinal_position;

-- Check services table columns
SELECT 
    '=== SERVICES TABLE COLUMNS ===' AS table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'services'
ORDER BY ordinal_position;

-- Check bookings table columns
SELECT 
    '=== BOOKINGS TABLE COLUMNS ===' AS table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'bookings'
ORDER BY ordinal_position;

-- Summary: Which columns exist for company/provider references
SELECT 
    '=== COMPANY/PROVIDER COLUMN CHECK ===' AS check_type,
    'services.provider_company_id' AS column_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'services' 
        AND column_name = 'provider_company_id'
    ) THEN '✅ EXISTS' ELSE '❌ MISSING' END AS status
UNION ALL
SELECT 
    '=== COMPANY/PROVIDER COLUMN CHECK ===',
    'services.company_id',
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'services' 
        AND column_name = 'company_id'
    ) THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 
    '=== COMPANY/PROVIDER COLUMN CHECK ===',
    'bookings.provider_company_id',
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'bookings' 
        AND column_name = 'provider_company_id'
    ) THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 
    '=== COMPANY/PROVIDER COLUMN CHECK ===',
    'bookings.package_id',
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'bookings' 
        AND column_name = 'package_id'
    ) THEN '✅ EXISTS' ELSE '❌ MISSING' END;

