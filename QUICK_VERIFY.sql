-- Quick verification - check if key tables and columns exist
-- Run this first for a quick check

-- Check bookings table structure
SELECT 
    'bookings' AS table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'bookings'
ORDER BY ordinal_position;

-- Check if provider_id exists in bookings
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' 
              AND table_name = 'bookings' 
              AND column_name = 'provider_id'
        ) THEN '✅ provider_id EXISTS in bookings'
        ELSE '❌ provider_id MISSING in bookings'
    END AS provider_id_check;

-- Check if provider_company_id exists in bookings
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_schema = 'public' 
              AND table_name = 'bookings' 
              AND column_name = 'provider_company_id'
        ) THEN '✅ provider_company_id EXISTS in bookings'
        ELSE '❌ provider_company_id MISSING in bookings'
    END AS provider_company_id_check;

-- Count all tables
SELECT 
    'Total Tables' AS metric,
    COUNT(*) AS count
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE';

-- List all table names
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

