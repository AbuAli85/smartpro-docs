-- ============================================================
-- QUICK CONNECTION TEST
-- ============================================================
-- Run this in Supabase SQL Editor to verify your connection works
-- ============================================================

-- Test 1: Basic connection test
SELECT 
    '✅ Connection successful!' AS status,
    current_database() AS database_name,
    current_user AS user_name,
    version() AS postgres_version;

-- Test 2: Check if consultation_submissions table exists
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'consultation_submissions'
        ) THEN '✅ consultation_submissions table EXISTS'
        ELSE '❌ consultation_submissions table MISSING - Run UNIFIED_SCHEMA_MIGRATION.sql'
    END AS table_status;

-- Test 3: Check if leads table exists
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'leads'
        ) THEN '✅ leads table EXISTS'
        ELSE '❌ leads table MISSING - Run UNIFIED_SCHEMA_MIGRATION.sql'
    END AS table_status;

-- Test 4: Count existing records
SELECT 
    'Data Count' AS check_type,
    (SELECT COUNT(*) FROM consultation_submissions) AS consultations,
    (SELECT COUNT(*) FROM leads) AS leads;

