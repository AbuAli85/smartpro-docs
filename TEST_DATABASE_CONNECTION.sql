-- ============================================================
-- TEST DATABASE CONNECTION
-- ============================================================
-- Run this in Supabase SQL Editor to verify your connection
-- ============================================================

-- Test 1: Check if consultation_submissions table exists
SELECT 
    '=== TABLE CHECK ===' AS test,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'consultation_submissions'
        ) THEN '✅ consultation_submissions table EXISTS'
        ELSE '❌ consultation_submissions table MISSING'
    END AS result;

-- Test 2: Check if leads table exists
SELECT 
    '=== TABLE CHECK ===' AS test,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'leads'
        ) THEN '✅ leads table EXISTS'
        ELSE '❌ leads table MISSING'
    END AS result;

-- Test 3: Check consultation_submissions structure
SELECT 
    '=== COLUMN CHECK ===' AS test,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'consultation_submissions'
ORDER BY ordinal_position;

-- Test 4: Check leads structure
SELECT 
    '=== COLUMN CHECK ===' AS test,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'leads'
ORDER BY ordinal_position;

-- Test 5: Count existing records
SELECT 
    '=== DATA CHECK ===' AS test,
    (SELECT COUNT(*) FROM consultation_submissions) AS consultation_count,
    (SELECT COUNT(*) FROM leads) AS leads_count;

-- Test 6: Check recent submissions (if any)
SELECT 
    '=== RECENT SUBMISSIONS ===' AS test,
    submission_id,
    name,
    email,
    status,
    created_at
FROM consultation_submissions
ORDER BY created_at DESC
LIMIT 5;

-- Test 7: Check recent leads (if any)
SELECT 
    '=== RECENT LEADS ===' AS test,
    submission_id,
    email,
    current_stage,
    created_at
FROM leads
ORDER BY created_at DESC
LIMIT 5;

