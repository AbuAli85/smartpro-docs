-- ============================================================
-- QUICK ROLE ASSIGNMENT - Copy and Customize
-- ============================================================
-- Quick templates for common role assignment scenarios
-- IMPORTANT: Run FIND_USER_UUIDS.sql first to get actual UUIDs
-- Or use the email-based examples below (easier!)
-- ============================================================

-- ============================================================
-- TEMPLATE 1: Assign role by EMAIL (EASIEST - Recommended)
-- ============================================================
-- Just change the email and role name - no UUIDs needed!

INSERT INTO user_role_assignments (user_id, role_id)
SELECT 
    p.id,
    r.id
FROM profiles p
CROSS JOIN roles r
WHERE p.email = 'user@example.com'  -- ⬅️ CHANGE THIS EMAIL
  AND r.name = 'provider'  -- ⬅️ CHANGE ROLE: admin, provider, client, staff, manager, enterprise_admin, enterprise_employee
ON CONFLICT DO NOTHING;

-- ============================================================
-- TEMPLATE 2: Assign role by email WITH admin tracking
-- ============================================================
-- Same as Template 1, but also tracks who assigned it

INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    p.id,
    r.id,
    (SELECT id FROM profiles WHERE email = 'admin@example.com' LIMIT 1)  -- ⬅️ CHANGE ADMIN EMAIL
FROM profiles p
CROSS JOIN roles r
WHERE p.email = 'user@example.com'  -- ⬅️ CHANGE USER EMAIL
  AND r.name = 'provider'  -- ⬅️ CHANGE ROLE NAME
ON CONFLICT DO NOTHING;

-- ============================================================
-- TEMPLATE 3: Assign default 'client' role to user without roles
-- ============================================================
-- This assigns 'client' role to any user who doesn't have an active role

INSERT INTO user_role_assignments (user_id, role_id)
SELECT 
    p.id,
    r.id
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
-- TEMPLATE 4: Check user's current roles (by email - easier!)
-- ============================================================
-- Replace 'user@example.com' with actual user email

SELECT 
    p.email,
    r.name AS role_name,
    r.category,
    ura.is_active,
    ura.valid_from,
    ura.valid_until,
    CASE 
        WHEN ura.valid_until IS NULL THEN 'No expiration'
        WHEN ura.valid_until > NOW() THEN 'Active'
        ELSE 'Expired'
    END AS status
FROM user_role_assignments ura
JOIN profiles p ON ura.user_id = p.id
JOIN roles r ON ura.role_id = r.id
WHERE p.email = 'user@example.com'  -- ⬅️ CHANGE THIS EMAIL
ORDER BY ura.created_at DESC;

-- ============================================================
-- TEMPLATE 5: Check user's permissions (by email - easier!)
-- ============================================================
-- Replace 'user@example.com' with actual user email

SELECT 
    p.email,
    up.permission_name,
    up.resource,
    up.action,
    up.scope,
    up.role_name
FROM user_permissions up
JOIN profiles p ON up.user_id = p.id
WHERE p.email = 'user@example.com'  -- ⬅️ CHANGE THIS EMAIL
ORDER BY up.resource, up.action;

-- ============================================================
-- TEMPLATE 6: Revoke a role (by email - easier!)
-- ============================================================
-- Replace 'user@example.com' with actual user email
-- Replace 'provider' with role name to revoke

UPDATE user_role_assignments
SET 
    is_active = FALSE,
    valid_until = NOW(),
    updated_at = NOW()
WHERE user_id = (SELECT id FROM profiles WHERE email = 'user@example.com' LIMIT 1)  -- ⬅️ CHANGE EMAIL
  AND role_id = (SELECT id FROM roles WHERE name = 'provider')  -- ⬅️ CHANGE ROLE NAME
  AND is_active = TRUE;

