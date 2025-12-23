-- ============================================================
-- ASSIGN ROLES BASED ON EXISTING SUPABASE DATA
-- ============================================================
-- This script uses your actual user data to assign roles
-- ============================================================

-- ============================================================
-- OPTION 1: Assign roles based on existing profiles.role column
-- ============================================================
-- Maps legacy roles from profiles.role to RBAC roles

INSERT INTO user_role_assignments (user_id, role_id)
SELECT 
    p.id AS user_id,
    r.id AS role_id
FROM profiles p
CROSS JOIN roles r
WHERE 
    -- Map legacy 'admin' to RBAC 'admin'
    (p.role = 'admin' AND r.name = 'admin')
    -- Map legacy 'provider' to RBAC 'provider'
    OR (p.role = 'provider' AND r.name = 'provider')
    -- Map legacy 'client' to RBAC 'client'
    OR (p.role = 'client' AND r.name = 'client')
    -- Map legacy 'staff' to RBAC 'staff'
    OR (p.role = 'staff' AND r.name = 'staff')
    -- Map legacy 'manager' to RBAC 'manager'
    OR (p.role = 'manager' AND r.name = 'manager')
    -- Map legacy 'enterprise_admin' to RBAC 'enterprise_admin'
    OR (p.role = 'enterprise_admin' AND r.name = 'enterprise_admin')
    -- Map legacy 'enterprise_employee' to RBAC 'enterprise_employee'
    OR (p.role = 'enterprise_employee' AND r.name = 'enterprise_employee')
    -- Default: assign 'client' role to users without a recognized role
    OR (p.role NOT IN ('admin', 'provider', 'client', 'staff', 'manager', 'enterprise_admin', 'enterprise_employee') 
        AND r.name = 'client')
ON CONFLICT DO NOTHING;

-- ============================================================
-- OPTION 2: Assign default 'client' role to users without any role
-- ============================================================

INSERT INTO user_role_assignments (user_id, role_id)
SELECT 
    p.id AS user_id,
    r.id AS role_id
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

-- ============================================================
-- OPTION 3: Assign roles based on company association
-- ============================================================

-- Assign 'enterprise_employee' to users who have a company_id
INSERT INTO user_role_assignments (user_id, role_id, context)
SELECT 
    p.id AS user_id,
    r.id AS role_id,
    jsonb_build_object('company_id', p.company_id) AS context
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

-- ============================================================
-- OPTION 4: Assign 'provider' role to users who have services
-- ============================================================

INSERT INTO user_role_assignments (user_id, role_id)
SELECT DISTINCT
    s.provider_id AS user_id,
    r.id AS role_id
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

-- ============================================================
-- OPTION 5: Assign 'client' role to users who have bookings
-- ============================================================

INSERT INTO user_role_assignments (user_id, role_id)
SELECT DISTINCT
    b.client_id AS user_id,
    r.id AS role_id
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
-- VERIFICATION: Check what was assigned
-- ============================================================

-- Summary of role assignments
SELECT 
    r.name AS role_name,
    r.category,
    COUNT(*) AS user_count,
    COUNT(*) FILTER (WHERE ura.is_active = TRUE 
                     AND (ura.valid_until IS NULL OR ura.valid_until > NOW())) AS active_count
FROM roles r
LEFT JOIN user_role_assignments ura ON r.id = ura.role_id
GROUP BY r.id, r.name, r.category
ORDER BY r.category, r.name;

-- Users with their assigned roles
SELECT 
    p.email,
    p.full_name,
    p.role AS legacy_role,
    string_agg(r.name, ', ' ORDER BY r.name) AS assigned_roles
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id 
    AND ura.is_active = TRUE
    AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.id, p.email, p.full_name, p.role
ORDER BY p.email;

-- Refresh materialized view to update permissions
REFRESH MATERIALIZED VIEW user_permissions;

