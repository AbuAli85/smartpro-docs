-- ============================================================
-- MIGRATE EXISTING ROLES FROM PROFILES.ROLE TO RBAC SYSTEM
-- ============================================================
-- This script migrates your existing role data to the RBAC system
-- Safe to run multiple times (idempotent)
-- ============================================================

-- Step 1: See what roles exist in your profiles table
SELECT 
    'Current Roles in Profiles' AS info,
    role AS legacy_role,
    COUNT(*) AS user_count
FROM profiles
GROUP BY role
ORDER BY user_count DESC;

-- Step 2: Map existing roles to RBAC roles
-- This creates role assignments based on profiles.role column

DO $$
DECLARE
    v_assigned_count INTEGER := 0;
BEGIN
    -- Map admin
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'admin' AND r.name = 'admin'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    RAISE NOTICE 'Assigned admin role to % users', v_assigned_count;
    
    -- Map provider
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'provider' AND r.name = 'provider'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    RAISE NOTICE 'Assigned provider role to % users', v_assigned_count;
    
    -- Map client (and default for unrecognized roles)
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE r.name = 'client'
      AND (p.role = 'client' 
           OR p.role IS NULL 
           OR p.role NOT IN ('admin', 'provider', 'staff', 'manager', 'enterprise_admin', 'enterprise_employee'))
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    RAISE NOTICE 'Assigned client role to % users', v_assigned_count;
    
    -- Map staff
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'staff' AND r.name = 'staff'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    RAISE NOTICE 'Assigned staff role to % users', v_assigned_count;
    
    -- Map manager
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'manager' AND r.name = 'manager'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    RAISE NOTICE 'Assigned manager role to % users', v_assigned_count;
    
    -- Map enterprise_admin
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'enterprise_admin' AND r.name = 'enterprise_admin'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    RAISE NOTICE 'Assigned enterprise_admin role to % users', v_assigned_count;
    
    -- Map enterprise_employee
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'enterprise_employee' AND r.name = 'enterprise_employee'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    RAISE NOTICE 'Assigned enterprise_employee role to % users', v_assigned_count;
    
    RAISE NOTICE 'Role migration completed!';
END $$;

-- Step 3: Assign roles based on data patterns
-- Assign provider role to users who have created services
INSERT INTO user_role_assignments (user_id, role_id)
SELECT DISTINCT
    s.provider_id,
    r.id
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

-- Assign client role to users who have bookings
INSERT INTO user_role_assignments (user_id, role_id)
SELECT DISTINCT
    b.client_id,
    r.id
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

-- Assign enterprise_employee to users with company_id
INSERT INTO user_role_assignments (user_id, role_id, context)
SELECT 
    p.id,
    r.id,
    jsonb_build_object('company_id', p.company_id, 'migrated_from', 'company_id')
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

-- Step 4: Refresh materialized view
REFRESH MATERIALIZED VIEW user_permissions;

-- Step 5: Verification - Compare old vs new
SELECT 
    'Migration Summary' AS check_type,
    (SELECT COUNT(DISTINCT role) FROM profiles WHERE role IS NOT NULL) AS legacy_roles_count,
    (SELECT COUNT(*) FROM roles) AS rbac_roles_count,
    (SELECT COUNT(*) FROM user_role_assignments WHERE is_active = TRUE) AS active_assignments,
    (SELECT COUNT(*) FROM profiles) AS total_users;

-- Show role mapping results
SELECT 
    p.role AS legacy_role,
    COUNT(DISTINCT p.id) AS users_with_legacy_role,
    string_agg(DISTINCT r.name, ', ' ORDER BY r.name) AS mapped_to_rbac_roles,
    COUNT(DISTINCT ura.id) FILTER (WHERE ura.is_active = TRUE) AS users_with_rbac_role
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.role
ORDER BY COUNT(DISTINCT p.id) DESC;

