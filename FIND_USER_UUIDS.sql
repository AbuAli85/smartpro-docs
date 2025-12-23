-- ============================================================
-- FIND USER UUIDs - Helper Script
-- ============================================================
-- Run this first to get actual UUIDs for role assignment
-- ============================================================

-- List all users with their UUIDs and current roles
SELECT 
    p.id AS user_uuid,
    p.email,
    p.full_name,
    p.role AS legacy_role,  -- From profiles.role column
    string_agg(r.name, ', ' ORDER BY r.name) AS assigned_roles,
    COUNT(ura.id) FILTER (WHERE ura.is_active = TRUE) AS active_role_count
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.id, p.email, p.full_name, p.role
ORDER BY p.email;

-- Find user by email
SELECT 
    id AS user_uuid,
    email,
    full_name,
    role AS legacy_role
FROM profiles
WHERE email = 'user@example.com';  -- Replace with actual email

-- Find users without any role assignments
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
)
ORDER BY p.email;

-- Find admin users (for assigning roles)
SELECT 
    id AS admin_uuid,
    email,
    full_name
FROM profiles
WHERE role = 'admin'  -- Or check user_role_assignments for admin role
ORDER BY email
LIMIT 1;

