-- ============================================================
-- MIGRATE YOUR EXISTING DATA TO RBAC SYSTEM
-- ============================================================
-- Based on your current database schema
-- Maps "promoter" role and assigns RBAC roles
-- ============================================================

-- ============================================================
-- STEP 1: Map "promoter" role to "provider"
-- ============================================================

UPDATE profiles
SET role = 'provider'
WHERE role = 'promoter';

-- Verify the mapping
SELECT 
    'Roles after promoter mapping' AS info,
    role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

-- ============================================================
-- STEP 2: Assign RBAC roles based on profiles.role column
-- ============================================================

DO $$
DECLARE
    v_assigned_count INTEGER := 0;
    v_total_assigned INTEGER := 0;
BEGIN
    RAISE NOTICE 'Starting RBAC role assignment...';
    
    -- Assign admin role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'admin' AND r.name = 'admin'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned admin role to % users', v_assigned_count;
    
    -- Assign provider role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'provider' AND r.name = 'provider'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned provider role to % users', v_assigned_count;
    
    -- Assign client role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'client' AND r.name = 'client'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned client role to % users', v_assigned_count;
    
    -- Assign manager role (if exists in roles table)
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'manager' AND r.name = 'manager'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    IF v_assigned_count > 0 THEN
        RAISE NOTICE '  ✓ Assigned manager role to % users', v_assigned_count;
    END IF;
    
    -- Assign default client role to users without any role assignment
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
    IF v_assigned_count > 0 THEN
        RAISE NOTICE '  ✓ Assigned default client role to % users', v_assigned_count;
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ RBAC role assignment completed! Total assignments: %', v_total_assigned;
    RAISE NOTICE '';
END $$;

-- ============================================================
-- STEP 3: Assign roles based on data patterns (optional)
-- ============================================================

-- Assign provider role to users who have services
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

-- Assign client role to users who have bookings as clients
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

-- ============================================================
-- STEP 4: Refresh materialized view (if it exists)
-- ============================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'user_permissions'
        AND table_type = 'BASE TABLE'
    ) THEN
        -- It's a materialized view
        EXECUTE 'REFRESH MATERIALIZED VIEW user_permissions';
        RAISE NOTICE '✅ Refreshed user_permissions materialized view';
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.views 
        WHERE table_schema = 'public' 
        AND table_name = 'user_permissions'
    ) THEN
        -- It's a regular view, no refresh needed
        RAISE NOTICE '✅ user_permissions is a view (no refresh needed)';
    ELSE
        RAISE NOTICE '⚠️  user_permissions view/materialized view does not exist';
    END IF;
END $$;

-- ============================================================
-- STEP 5: Verification Summary
-- ============================================================

SELECT 
    '=== MIGRATION SUMMARY ===' AS section;

-- Show profiles by role
SELECT 
    'Profiles by Legacy Role' AS metric,
    COALESCE(role, 'NULL') AS role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

-- Show RBAC role assignments
SELECT 
    'RBAC Role Assignments' AS metric,
    r.name AS role_name,
    r.category,
    COUNT(*) AS assignment_count,
    COUNT(DISTINCT ura.user_id) AS unique_users
FROM roles r
LEFT JOIN user_role_assignments ura ON r.id = ura.role_id
WHERE ura.is_active = TRUE
  AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
GROUP BY r.id, r.name, r.category
ORDER BY assignment_count DESC;

-- Show users with their roles
SELECT 
    'Sample Users with Roles' AS metric,
    p.email,
    p.role AS legacy_role,
    string_agg(r.name, ', ' ORDER BY r.name) AS rbac_roles
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id
    AND ura.is_active = TRUE
    AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.id, p.email, p.role
ORDER BY p.email
LIMIT 10;

-- Check for users without RBAC roles
SELECT 
    'Users without RBAC roles' AS check_type,
    COUNT(*) AS count
FROM profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM user_role_assignments ura
    WHERE ura.user_id = p.id
    AND ura.is_active = TRUE
    AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
);

SELECT 
    '=== NEXT STEPS ===' AS section,
    '1. Review the migration summary above' AS step_1,
    '2. Test your application with RBAC roles' AS step_2,
    '3. Update application code to use RBAC instead of profiles.role' AS step_3;

