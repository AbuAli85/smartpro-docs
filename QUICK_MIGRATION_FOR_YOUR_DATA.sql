-- ============================================================
-- QUICK MIGRATION FOR YOUR EXISTING DATA
-- ============================================================
-- You have: 10 clients, 9 providers, 5 admins, 1 promoter
-- This script ensures your data is ready for RBAC
-- ============================================================

-- ============================================================
-- STEP 1: Map "promoter" role to "provider"
-- ============================================================
-- The "promoter" role from Contract-Management-System
-- should be mapped to "provider" in the unified system

UPDATE profiles
SET role = 'provider'
WHERE role = 'promoter';

-- ============================================================
-- STEP 2: Verify all profiles have valid roles
-- ============================================================

SELECT 
    'Current Roles After Mapping' AS info,
    COALESCE(role, 'NULL') AS role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

-- ============================================================
-- STEP 3: Ensure all profiles are in unified format
-- ============================================================
-- This ensures all required fields are set

UPDATE profiles
SET 
    name = COALESCE(name, full_name, split_part(email, '@', 1)),
    status = COALESCE(status::text, 'active')::user_status_type,
    role = COALESCE(role, 'client')
WHERE name IS NULL 
   OR status IS NULL 
   OR role IS NULL;

-- ============================================================
-- STEP 4: Check for any missing data
-- ============================================================

SELECT 
    'Data Completeness Check' AS check_type,
    COUNT(*) FILTER (WHERE email IS NULL) AS missing_emails,
    COUNT(*) FILTER (WHERE full_name IS NULL AND name IS NULL) AS missing_names,
    COUNT(*) FILTER (WHERE role IS NULL) AS missing_roles,
    COUNT(*) FILTER (WHERE status IS NULL) AS missing_status
FROM profiles;

-- ============================================================
-- STEP 5: Summary
-- ============================================================

SELECT 
    '=== MIGRATION READY ===' AS section;

SELECT 
    'Total Profiles' AS metric,
    COUNT(*) AS count
FROM profiles
UNION ALL
SELECT 
    'Profiles by Role',
    COUNT(*)
FROM profiles
GROUP BY role;

SELECT 
    '=== NEXT STEP ===' AS section,
    'Run SETUP_ROLES_FROM_SUPABASE.sql to assign RBAC roles' AS next_action;

