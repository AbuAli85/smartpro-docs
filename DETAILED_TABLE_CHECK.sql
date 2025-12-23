-- Detailed check of critical tables and their key columns
-- Run this to verify specific table structures

-- 1. Profiles table structure
SELECT 
    'profiles' AS table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 2. Bookings table structure (critical for the migration)
SELECT 
    'bookings' AS table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'bookings'
ORDER BY ordinal_position;

-- 3. Services table structure
SELECT 
    'services' AS table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'services'
ORDER BY ordinal_position;

-- 4. Companies table structure
SELECT 
    'companies' AS table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'companies'
ORDER BY ordinal_position;

-- 5. Check critical foreign keys
SELECT 
    'Foreign Keys' AS check_type,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS references_table,
    tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND (
    (tc.table_name = 'bookings' AND kcu.column_name IN ('provider_id', 'provider_company_id', 'client_id', 'service_id'))
    OR (tc.table_name = 'profiles' AND kcu.column_name = 'company_id')
    OR (tc.table_name = 'services' AND kcu.column_name IN ('provider_id', 'company_id'))
  )
ORDER BY tc.table_name, kcu.column_name;

-- 6. Verify provider_id column exists in all expected tables
SELECT 
    'provider_id Check' AS check_type,
    table_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' 
              AND table_name = t.table_name 
              AND column_name = 'provider_id'
        ) THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END AS status
FROM (
    SELECT 'bookings' AS table_name
    UNION SELECT 'services'
    UNION SELECT 'contracts'
    UNION SELECT 'reviews'
    UNION SELECT 'invoices'
) t
ORDER BY table_name;

-- 7. Check if critical indexes exist
SELECT 
    'Critical Indexes' AS check_type,
    tablename,
    indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND (
    indexname LIKE '%provider_id%'
    OR indexname LIKE '%company_id%'
    OR indexname LIKE '%client_id%'
    OR indexname LIKE '%service_id%'
  )
ORDER BY tablename, indexname;

-- 8. Verify triggers are working
SELECT 
    'Triggers' AS check_type,
    event_object_table AS table_name,
    trigger_name,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name LIKE '%updated_at%'
ORDER BY event_object_table;

-- 9. Check enums are created
SELECT 
    'Enums' AS check_type,
    t.typname AS enum_name,
    COUNT(e.enumlabel) AS value_count
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname IN (
    'booking_status_type',
    'service_status_type',
    'invoice_status_type',
    'contract_status_type'
)
GROUP BY t.typname
ORDER BY t.typname;

