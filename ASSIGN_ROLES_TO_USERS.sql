-- ============================================================
-- ASSIGN ROLES TO USERS - Example Scripts
-- ============================================================
-- This script provides examples for assigning roles to users
-- Customize the UUIDs and role names as needed
-- ============================================================

-- ============================================================
-- EXAMPLE 1: Assign a single role to a user
-- ============================================================

-- Assign 'provider' role to a user
-- Replace 'USER_UUID_HERE' with actual user UUID from auth.users or profiles
INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    'USER_UUID_HERE'::UUID,  -- Replace with actual user UUID
    r.id,
    'ADMIN_UUID_HERE'::UUID  -- Replace with admin user UUID (or NULL if system-assigned)
FROM roles r
WHERE r.name = 'provider'
ON CONFLICT DO NOTHING;

-- ============================================================
-- EXAMPLE 2: Assign role by email (if you know the email)
-- ============================================================

-- Assign 'client' role to user by email
INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    p.id AS user_id,
    r.id AS role_id,
    (SELECT id FROM profiles WHERE email = 'admin@example.com' LIMIT 1) AS assigned_by
FROM profiles p
CROSS JOIN roles r
WHERE p.email = 'user@example.com'  -- Replace with actual email
  AND r.name = 'client'
ON CONFLICT DO NOTHING;

-- ============================================================
-- EXAMPLE 3: Assign multiple roles to a user
-- ============================================================

-- Assign both 'provider' and 'enterprise_employee' roles
DO $$
DECLARE
    v_user_id UUID := 'USER_UUID_HERE'::UUID;  -- Replace with actual user UUID
    v_assigned_by UUID := 'ADMIN_UUID_HERE'::UUID;  -- Replace with admin UUID
BEGIN
    -- Assign provider role
    INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
    SELECT v_user_id, r.id, v_assigned_by
    FROM roles r
    WHERE r.name = 'provider'
    ON CONFLICT DO NOTHING;
    
    -- Assign enterprise_employee role
    INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
    SELECT v_user_id, r.id, v_assigned_by
    FROM roles r
    WHERE r.name = 'enterprise_employee'
    ON CONFLICT DO NOTHING;
END $$;

-- ============================================================
-- EXAMPLE 4: Bulk assign role to multiple users
-- ============================================================

-- Assign 'client' role to all users who don't have any role yet
INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    p.id AS user_id,
    r.id AS role_id,
    NULL AS assigned_by  -- System-assigned
FROM profiles p
CROSS JOIN roles r
WHERE r.name = 'client'
  AND NOT EXISTS (
      SELECT 1 FROM user_role_assignments ura
      WHERE ura.user_id = p.id
      AND ura.is_active = TRUE
  )
ON CONFLICT DO NOTHING;

-- ============================================================
-- EXAMPLE 5: Assign role with expiration date
-- ============================================================

-- Assign temporary 'staff' role that expires in 30 days
INSERT INTO user_role_assignments (user_id, role_id, assigned_by, valid_until)
SELECT 
    'USER_UUID_HERE'::UUID,
    r.id,
    'ADMIN_UUID_HERE'::UUID,
    NOW() + INTERVAL '30 days'  -- Expires in 30 days
FROM roles r
WHERE r.name = 'staff'
ON CONFLICT DO NOTHING;

-- ============================================================
-- EXAMPLE 6: Assign role with context (e.g., for specific company)
-- ============================================================

-- Assign 'enterprise_employee' role with company context
INSERT INTO user_role_assignments (user_id, role_id, assigned_by, context)
SELECT 
    'USER_UUID_HERE'::UUID,
    r.id,
    'ADMIN_UUID_HERE'::UUID,
    jsonb_build_object(
        'company_id', 'COMPANY_UUID_HERE'::UUID,
        'department', 'Sales',
        'notes', 'Assigned for Q1 project'
    ) AS context
FROM roles r
WHERE r.name = 'enterprise_employee'
ON CONFLICT DO NOTHING;

-- ============================================================
-- EXAMPLE 7: Update existing role assignment
-- ============================================================

-- Extend expiration date for an existing role assignment
UPDATE user_role_assignments
SET 
    valid_until = NOW() + INTERVAL '90 days',
    updated_at = NOW()
WHERE user_id = 'USER_UUID_HERE'::UUID
  AND role_id = (SELECT id FROM roles WHERE name = 'staff')
  AND is_active = TRUE;

-- ============================================================
-- EXAMPLE 8: Deactivate (revoke) a role
-- ============================================================

-- Deactivate a role assignment (soft delete)
UPDATE user_role_assignments
SET 
    is_active = FALSE,
    valid_until = NOW(),  -- Set expiration to now
    updated_at = NOW()
WHERE user_id = 'USER_UUID_HERE'::UUID
  AND role_id = (SELECT id FROM roles WHERE name = 'staff')
  AND is_active = TRUE;

-- ============================================================
-- EXAMPLE 9: Replace one role with another
-- ============================================================

-- Replace 'client' role with 'provider' role
DO $$
DECLARE
    v_user_id UUID := 'USER_UUID_HERE'::UUID;
    v_assigned_by UUID := 'ADMIN_UUID_HERE'::UUID;
BEGIN
    -- Deactivate old role
    UPDATE user_role_assignments
    SET is_active = FALSE, updated_at = NOW()
    WHERE user_id = v_user_id
      AND role_id = (SELECT id FROM roles WHERE name = 'client')
      AND is_active = TRUE;
    
    -- Assign new role
    INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
    SELECT v_user_id, r.id, v_assigned_by
    FROM roles r
    WHERE r.name = 'provider'
    ON CONFLICT DO NOTHING;
END $$;

-- ============================================================
-- EXAMPLE 10: Assign role to all users in a company
-- ============================================================

-- Assign 'enterprise_employee' role to all users in a specific company
INSERT INTO user_role_assignments (user_id, role_id, assigned_by, context)
SELECT 
    p.id AS user_id,
    r.id AS role_id,
    'ADMIN_UUID_HERE'::UUID AS assigned_by,
    jsonb_build_object('company_id', 'COMPANY_UUID_HERE'::UUID) AS context
FROM profiles p
CROSS JOIN roles r
WHERE p.company_id = 'COMPANY_UUID_HERE'::UUID  -- Replace with actual company UUID
  AND r.name = 'enterprise_employee'
  AND NOT EXISTS (
      SELECT 1 FROM user_role_assignments ura
      WHERE ura.user_id = p.id
      AND ura.role_id = r.id
      AND ura.is_active = TRUE
  )
ON CONFLICT DO NOTHING;

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Check all role assignments for a user
SELECT 
    ura.id,
    p.email,
    r.name AS role_name,
    r.category AS role_category,
    ura.is_active,
    ura.valid_from,
    ura.valid_until,
    ura.context,
    ura.created_at
FROM user_role_assignments ura
JOIN profiles p ON ura.user_id = p.id
JOIN roles r ON ura.role_id = r.id
WHERE ura.user_id = 'USER_UUID_HERE'::UUID  -- Replace with actual user UUID
ORDER BY ura.created_at DESC;

-- Check active role assignments for a user
SELECT 
    p.email,
    r.name AS role_name,
    r.category,
    ura.valid_until,
    CASE 
        WHEN ura.valid_until IS NULL THEN 'No expiration'
        WHEN ura.valid_until > NOW() THEN 'Active'
        ELSE 'Expired'
    END AS status
FROM user_role_assignments ura
JOIN profiles p ON ura.user_id = p.id
JOIN roles r ON ura.role_id = r.id
WHERE ura.user_id = 'USER_UUID_HERE'::UUID  -- Replace with actual user UUID
  AND ura.is_active = TRUE
  AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
ORDER BY r.name;

-- List all users with their roles
SELECT 
    p.email,
    p.full_name,
    string_agg(r.name, ', ' ORDER BY r.name) AS roles,
    COUNT(*) AS role_count
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id AND ura.is_active = TRUE
LEFT JOIN roles r ON ura.role_id = r.id
WHERE ura.valid_until IS NULL OR ura.valid_until > NOW()
GROUP BY p.id, p.email, p.full_name
ORDER BY p.email;

-- Check user permissions (using the materialized view)
SELECT 
    up.user_id,
    p.email,
    up.permission_name,
    up.resource,
    up.action,
    up.scope,
    up.role_name
FROM user_permissions up
JOIN profiles p ON up.user_id = p.id
WHERE up.user_id = 'USER_UUID_HERE'::UUID  -- Replace with actual user UUID
ORDER BY up.resource, up.action;

-- Count role assignments by role
SELECT 
    r.name AS role_name,
    r.category,
    COUNT(*) AS user_count,
    COUNT(*) FILTER (WHERE ura.is_active = TRUE AND (ura.valid_until IS NULL OR ura.valid_until > NOW())) AS active_count
FROM roles r
LEFT JOIN user_role_assignments ura ON r.id = ura.role_id
GROUP BY r.id, r.name, r.category
ORDER BY r.category, r.name;

