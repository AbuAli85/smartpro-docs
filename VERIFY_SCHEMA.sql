-- ============================================================
-- SCHEMA VERIFICATION SCRIPT
-- Run this in Supabase SQL Editor to verify the migration
-- ============================================================

-- 1. Check all expected tables exist
SELECT 
    'Tables Check' AS check_type,
    CASE 
        WHEN COUNT(*) >= 30 THEN 'PASS: ' || COUNT(*) || ' tables found'
        ELSE 'FAIL: Only ' || COUNT(*) || ' tables found (expected ~30+)'
    END AS result
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN (
    'profiles', 'companies', 'services', 'service_packages', 'bookings',
    'booking_events', 'providers', 'parties', 'contracts', 'reviews',
    'invoices', 'payments', 'consultation_submissions', 'leads',
    'analytics_events', 'email_digests', 'notifications', 'notification_preferences',
    'messages', 'milestones', 'tasks', 'time_entries', 'roles', 'permissions',
    'role_permissions', 'user_role_assignments', 'audit_logs'
  );

-- 2. List all tables with column counts
SELECT 
    'Table Structure' AS check_type,
    table_name,
    COUNT(*) AS column_count
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name
ORDER BY table_name;

-- 3. Check key columns in critical tables
SELECT 
    'Key Columns Check' AS check_type,
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND (
    (table_name = 'profiles' AND column_name IN ('id', 'email', 'role', 'company_id'))
    OR (table_name = 'bookings' AND column_name IN ('id', 'service_id', 'client_id', 'provider_id', 'provider_company_id', 'status'))
    OR (table_name = 'services' AND column_name IN ('id', 'provider_id', 'company_id', 'title', 'status'))
    OR (table_name = 'companies' AND column_name IN ('id', 'name', 'slug'))
    OR (table_name = 'contracts' AND column_name IN ('id', 'provider_id', 'employer_id', 'client_id', 'status'))
    OR (table_name = 'invoices' AND column_name IN ('id', 'provider_id', 'client_id', 'status'))
    OR (table_name = 'reviews' AND column_name IN ('id', 'provider_id', 'client_id', 'rating'))
  )
ORDER BY table_name, column_name;

-- 4. Check foreign key constraints
SELECT 
    'Foreign Keys' AS check_type,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name IN ('bookings', 'services', 'profiles', 'contracts', 'invoices', 'reviews')
ORDER BY tc.table_name, kcu.column_name;

-- 5. Check indexes on key columns
SELECT 
    'Indexes Check' AS check_type,
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('bookings', 'services', 'profiles', 'contracts', 'invoices', 'reviews')
  AND (
    indexname LIKE '%provider_id%'
    OR indexname LIKE '%client_id%'
    OR indexname LIKE '%company_id%'
    OR indexname LIKE '%service_id%'
    OR indexname LIKE '%employer_id%'
  )
ORDER BY tablename, indexname;

-- 6. Check triggers exist
SELECT 
    'Triggers Check' AS check_type,
    trigger_name,
    event_object_table AS table_name,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name LIKE '%updated_at%'
ORDER BY event_object_table, trigger_name;

-- 7. Check functions exist
SELECT 
    'Functions Check' AS check_type,
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN (
    'update_updated_at_column',
    'refresh_user_permissions',
    'refresh_user_permissions_on_change',
    'get_user_permissions'
  )
ORDER BY routine_name;

-- 8. Check enums exist
SELECT 
    'Enums Check' AS check_type,
    t.typname AS enum_name,
    array_agg(e.enumlabel ORDER BY e.enumsortorder) AS enum_values
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname IN (
    'booking_status_type',
    'service_status_type',
    'invoice_status_type',
    'contract_status_type',
    'contract_type_type',
    'notification_type_type',
    'audit_action_type',
    'party_type_type',
    'user_status_type'
)
GROUP BY t.typname
ORDER BY t.typname;

-- 9. Check RLS is enabled on key tables
SELECT 
    'RLS Check' AS check_type,
    schemaname,
    tablename,
    rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'bookings', 'services', 'companies', 'contracts', 'invoices')
ORDER BY tablename;

-- 10. Check materialized views
SELECT 
    'Materialized Views' AS check_type,
    schemaname,
    matviewname,
    hasindexes
FROM pg_matviews
WHERE schemaname = 'public'
ORDER BY matviewname;

-- 11. Summary statistics
SELECT 
    'Summary' AS check_type,
    'Total Tables' AS metric,
    COUNT(*)::TEXT AS value
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
UNION ALL
SELECT 
    'Summary',
    'Total Foreign Keys',
    COUNT(*)::TEXT
FROM information_schema.table_constraints
WHERE constraint_type = 'FOREIGN KEY' AND table_schema = 'public'
UNION ALL
SELECT 
    'Summary',
    'Total Indexes',
    COUNT(*)::TEXT
FROM pg_indexes
WHERE schemaname = 'public'
UNION ALL
SELECT 
    'Summary',
    'Total Triggers',
    COUNT(*)::TEXT
FROM information_schema.triggers
WHERE trigger_schema = 'public'
UNION ALL
SELECT 
    'Summary',
    'Total Functions',
    COUNT(*)::TEXT
FROM information_schema.routines
WHERE routine_schema = 'public';

