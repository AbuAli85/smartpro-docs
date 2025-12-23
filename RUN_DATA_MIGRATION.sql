-- ============================================================
-- MASTER DATA MIGRATION SCRIPT
-- ============================================================
-- This is the main script to run the complete data migration
-- from old databases to the unified SmartPro schema.
--
-- IMPORTANT: Run scripts in this order:
-- 1. Import profiles (IMPORT_PROFILES.sql)
-- 2. Import companies (IMPORT_COMPANIES.sql)
-- 3. Import services (IMPORT_SERVICES.sql)
-- 4. Import bookings (IMPORT_BOOKINGS.sql) - if you create this
-- 5. Import RBAC data (IMPORT_RBAC_DATA.sql) - if you create this
-- 6. Verify migration (VERIFY_MIGRATION.sql)
-- 7. Assign roles (SETUP_ROLES_FROM_SUPABASE.sql)
-- ============================================================

-- ============================================================
-- PRE-MIGRATION CHECKS
-- ============================================================

SELECT 
    '=== PRE-MIGRATION CHECKS ===' AS section;

-- Check if unified schema exists
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') 
        THEN '✅ Profiles table exists'
        ELSE '❌ Profiles table missing - Run UNIFIED_SCHEMA_MIGRATION.sql first!'
    END AS schema_check;

-- Check if RBAC is set up
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'roles') 
        THEN '✅ RBAC tables exist'
        ELSE '❌ RBAC tables missing - Run SEED_ROLES_AND_PERMISSIONS.sql first!'
    END AS rbac_check;

-- Check current data counts
SELECT 
    'Current data in unified database' AS info,
    (SELECT COUNT(*) FROM profiles) AS profiles,
    (SELECT COUNT(*) FROM companies) AS companies,
    (SELECT COUNT(*) FROM services) AS services,
    (SELECT COUNT(*) FROM bookings) AS bookings;

-- ============================================================
-- MIGRATION STEPS
-- ============================================================

SELECT 
    '=== MIGRATION STEPS ===' AS section,
    'Follow these steps in order:' AS instructions;

-- Step 1: Import profiles
SELECT 
    'STEP 1' AS step,
    'Import Profiles' AS action,
    'Run IMPORT_PROFILES.sql' AS script,
    'This imports users from both old databases' AS description;

-- Step 2: Import companies
SELECT 
    'STEP 2' AS step,
    'Import Companies' AS action,
    'Run IMPORT_COMPANIES.sql' AS script,
    'This imports companies from both old databases' AS description;

-- Step 3: Import services
SELECT 
    'STEP 3' AS step,
    'Import Services' AS action,
    'Run IMPORT_SERVICES.sql' AS script,
    'This imports services from both old databases' AS description;

-- Step 4: Import other data
SELECT 
    'STEP 4' AS step,
    'Import Other Tables' AS action,
    'Create and run import scripts for: bookings, contracts, messages, reviews, invoices, etc.' AS script,
    'Import remaining tables as needed' AS description;

-- Step 5: Verify migration
SELECT 
    'STEP 5' AS step,
    'Verify Migration' AS action,
    'Run VERIFY_MIGRATION.sql' AS script,
    'Check for data integrity issues' AS description;

-- Step 6: Assign roles
SELECT 
    'STEP 6' AS step,
    'Assign RBAC Roles' AS action,
    'Run SETUP_ROLES_FROM_SUPABASE.sql' AS script,
    'Assign roles to users based on their data' AS description;

-- ============================================================
-- NOTES
-- ============================================================

SELECT 
    '=== IMPORTANT NOTES ===' AS section;

SELECT 
    '⚠️ Before importing:' AS note,
    '1. Export data from old databases as CSV files' AS instruction
UNION ALL
SELECT 
    '⚠️',
    '2. Upload CSV files to Supabase Storage or modify SQL scripts to load from your data source'
UNION ALL
SELECT 
    '⚠️',
    '3. Update the COPY or INSERT statements in import scripts with your actual data paths'
UNION ALL
SELECT 
    '⚠️',
    '4. Ensure auth.users exist before importing profiles (profiles reference auth.users)'
UNION ALL
SELECT 
    '✅ After importing:',
    '1. Run VERIFY_MIGRATION.sql to check for issues'
UNION ALL
SELECT 
    '✅',
    '2. Fix any foreign key or data integrity issues'
UNION ALL
SELECT 
    '✅',
    '3. Run SETUP_ROLES_FROM_SUPABASE.sql to assign RBAC roles'
UNION ALL
SELECT 
    '✅',
    '4. Test your application with the migrated data';

-- ============================================================
-- QUICK REFERENCE: Data Export Commands
-- ============================================================

SELECT 
    '=== EXPORT COMMANDS (Run in old databases) ===' AS section;

-- Example export commands (uncomment and modify for your old databases)
/*
-- Export from Contract-Management-System:
\copy (SELECT * FROM profiles) TO '/tmp/contract-profiles.csv' WITH CSV HEADER;
\copy (SELECT * FROM companies) TO '/tmp/contract-companies.csv' WITH CSV HEADER;
\copy (SELECT * FROM services) TO '/tmp/contract-services.csv' WITH CSV HEADER;

-- Export from business-services-hub:
\copy (SELECT * FROM profiles) TO '/tmp/services-profiles.csv' WITH CSV HEADER;
\copy (SELECT * FROM companies) TO '/tmp/services-companies.csv' WITH CSV HEADER;
\copy (SELECT * FROM services) TO '/tmp/services-services.csv' WITH CSV HEADER;
*/

