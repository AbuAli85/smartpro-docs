-- ============================================================
-- AUTOMATIC ROLE ASSIGNMENT FROM EXISTING SUPABASE DATA
-- ============================================================
-- This script automatically assigns roles to all users in your
-- Supabase account based on their existing data patterns.
-- 
-- It will:
-- 1. Show you what data exists
-- 2. Assign roles based on profiles.role column
-- 3. Assign roles based on data patterns (services, bookings, companies)
-- 4. Show you the results
-- 
-- Safe to run multiple times (idempotent)
-- ============================================================

-- ============================================================
-- STEP 1: PREVIEW YOUR EXISTING DATA
-- ============================================================

SELECT '=== EXISTING USER DATA ===' AS section;

-- Show all users with their current information
SELECT 
    p.id AS user_uuid,
    p.email,
    p.full_name,
    p.role AS legacy_role,
    p.company_id,
    CASE 
        WHEN EXISTS (SELECT 1 FROM services s WHERE s.provider_id = p.id) THEN '✅ Has Services'
        ELSE '❌ No Services'
    END AS has_services,
    CASE 
        WHEN EXISTS (SELECT 1 FROM bookings b WHERE b.client_id = p.id) THEN '✅ Has Bookings'
        ELSE '❌ No Bookings'
    END AS has_bookings,
    CASE 
        WHEN EXISTS (SELECT 1 FROM user_role_assignments ura WHERE ura.user_id = p.id AND ura.is_active = TRUE) THEN '✅ Has RBAC Roles'
        ELSE '❌ No RBAC Roles'
    END AS has_rbac_roles
FROM profiles p
ORDER BY p.created_at DESC;

-- Count users by legacy role
SELECT 
    '=== USER COUNT BY LEGACY ROLE ===' AS section,
    COALESCE(role, 'NULL/Empty') AS legacy_role,
    COUNT(*) AS user_count
FROM profiles
GROUP BY role
ORDER BY user_count DESC;

-- ============================================================
-- STEP 2: AUTOMATIC ROLE ASSIGNMENT
-- ============================================================

DO $$
DECLARE
    v_assigned_count INTEGER := 0;
    v_total_assigned INTEGER := 0;
BEGIN
    RAISE NOTICE 'Starting automatic role assignment...';
    
    -- ============================================================
    -- 2.1: Map existing profiles.role to RBAC roles
    -- ============================================================
    
    -- Admin role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'admin' AND r.name = 'admin'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned admin role to % users', v_assigned_count;
    
    -- Provider role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'provider' AND r.name = 'provider'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned provider role to % users', v_assigned_count;
    
    -- Client role (from legacy role)
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'client' AND r.name = 'client'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned client role to % users (from legacy role)', v_assigned_count;
    
    -- Staff role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'staff' AND r.name = 'staff'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned staff role to % users', v_assigned_count;
    
    -- Manager role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'manager' AND r.name = 'manager'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned manager role to % users', v_assigned_count;
    
    -- Enterprise Admin role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'enterprise_admin' AND r.name = 'enterprise_admin'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned enterprise_admin role to % users', v_assigned_count;
    
    -- Enterprise Employee role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'enterprise_employee' AND r.name = 'enterprise_employee'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned enterprise_employee role to % users', v_assigned_count;
    
    -- ============================================================
    -- 2.2: Assign roles based on data patterns
    -- ============================================================
    
    -- Provider role: Users who have created services
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT DISTINCT s.provider_id, r.id
    FROM services s
    CROSS JOIN roles r
    WHERE s.provider_id IS NOT NULL
      AND r.name = 'provider'
      AND NOT EXISTS (
          SELECT 1 FROM user_role_assignments ura
          WHERE ura.user_id = s.provider_id
          AND ura.role_id = r.id
          AND ura.is_active = TRUE
      )
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned provider role to % users (from services)', v_assigned_count;
    
    -- Client role: Users who have bookings
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT DISTINCT b.client_id, r.id
    FROM bookings b
    CROSS JOIN roles r
    WHERE b.client_id IS NOT NULL
      AND r.name = 'client'
      AND NOT EXISTS (
          SELECT 1 FROM user_role_assignments ura
          WHERE ura.user_id = b.client_id
          AND ura.role_id = r.id
          AND ura.is_active = TRUE
      )
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned client role to % users (from bookings)', v_assigned_count;
    
    -- Enterprise Employee role: Users with company_id
    INSERT INTO user_role_assignments (user_id, role_id, context)
    SELECT p.id, r.id, jsonb_build_object('company_id', p.company_id, 'source', 'company_association')
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.company_id IS NOT NULL
      AND r.name = 'enterprise_employee'
      AND NOT EXISTS (
          SELECT 1 FROM user_role_assignments ura
          WHERE ura.user_id = p.id
          AND ura.role_id = r.id
          AND ura.is_active = TRUE
      )
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned enterprise_employee role to % users (from company_id)', v_assigned_count;
    
    -- ============================================================
    -- 2.3: Assign default 'client' role to users without any role
    -- ============================================================
    
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE r.name = 'client'
      AND NOT EXISTS (
          SELECT 1 FROM user_role_assignments ura
          WHERE ura.user_id = p.id
          AND ura.is_active = TRUE
          AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
      )
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned default client role to % users (no existing role)', v_assigned_count;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ Role assignment completed! Total assignments: %', v_total_assigned;
    RAISE NOTICE '';
END $$;

-- ============================================================
-- STEP 3: REFRESH MATERIALIZED VIEW
-- ============================================================

REFRESH MATERIALIZED VIEW user_permissions;

-- ============================================================
-- STEP 4: VERIFICATION - SHOW RESULTS
-- ============================================================

SELECT '=== ROLE ASSIGNMENT SUMMARY ===' AS section;

-- Summary by role
SELECT 
    r.name AS role_name,
    r.category,
    COUNT(*) AS total_assignments,
    COUNT(*) FILTER (WHERE ura.is_active = TRUE 
                     AND (ura.valid_until IS NULL OR ura.valid_until > NOW())) AS active_assignments,
    COUNT(DISTINCT ura.user_id) AS unique_users
FROM roles r
LEFT JOIN user_role_assignments ura ON r.id = ura.role_id
GROUP BY r.id, r.name, r.category
ORDER BY r.category, r.name;

-- Users with their assigned roles
SELECT 
    '=== USERS WITH THEIR ROLES ===' AS section;

SELECT 
    p.email,
    p.full_name,
    COALESCE(p.role, 'NULL') AS legacy_role,
    string_agg(DISTINCT r.name, ', ' ORDER BY r.name) AS assigned_rbac_roles,
    COUNT(DISTINCT ura.id) FILTER (WHERE ura.is_active = TRUE) AS active_role_count
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id
    AND ura.is_active = TRUE
    AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.id, p.email, p.full_name, p.role
ORDER BY p.email;

-- Users without any role assignments (should be none after default assignment)
SELECT 
    '=== USERS WITHOUT ROLES (if any) ===' AS section;

SELECT 
    p.id AS user_uuid,
    p.email,
    p.full_name,
    p.role AS legacy_role
FROM profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM user_role_assignments ura
    WHERE ura.user_id = p.id
    AND ura.is_active = TRUE
    AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
)
ORDER BY p.email;

-- Migration comparison: Legacy roles vs RBAC roles
SELECT 
    '=== LEGACY ROLE vs RBAC ROLE MAPPING ===' AS section;

SELECT 
    COALESCE(p.role, 'NULL/Empty') AS legacy_role,
    COUNT(DISTINCT p.id) AS users_with_legacy_role,
    string_agg(DISTINCT r.name, ', ' ORDER BY r.name) AS mapped_to_rbac_roles,
    COUNT(DISTINCT ura.id) FILTER (WHERE ura.is_active = TRUE) AS users_with_rbac_roles
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.role
ORDER BY COUNT(DISTINCT p.id) DESC;

-- Final statistics
SELECT 
    '=== FINAL STATISTICS ===' AS section,
    (SELECT COUNT(*) FROM profiles) AS total_users,
    (SELECT COUNT(*) FROM user_role_assignments WHERE is_active = TRUE) AS total_active_role_assignments,
    (SELECT COUNT(DISTINCT user_id) FROM user_role_assignments WHERE is_active = TRUE) AS users_with_roles,
    (SELECT COUNT(*) FROM profiles) - (SELECT COUNT(DISTINCT user_id) FROM user_role_assignments WHERE is_active = TRUE) AS users_without_roles;

