-- ============================================================
-- PRACTICAL ROLE ASSIGNMENT - Ready to Use
-- ============================================================
-- Step 1: Run FIND_USER_UUIDS.sql to get actual UUIDs
-- Step 2: Replace the UUIDs in the examples below
-- ============================================================

-- ============================================================
-- EXAMPLE 1: Assign role by email (EASIEST - No UUID needed)
-- ============================================================

-- Assign 'client' role to a user by email
INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    p.id AS user_id,
    r.id AS role_id,
    (SELECT id FROM profiles WHERE email = 'admin@example.com' LIMIT 1) AS assigned_by
FROM profiles p
CROSS JOIN roles r
WHERE p.email = 'user@example.com'  -- ⬅️ CHANGE THIS EMAIL
  AND r.name = 'client'  -- ⬅️ CHANGE ROLE: client, provider, admin, etc.
ON CONFLICT DO NOTHING;

-- ============================================================
-- EXAMPLE 2: Assign default 'client' role to users without roles
-- ============================================================

-- This is safe to run - assigns 'client' role to users who don't have any role
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
-- EXAMPLE 3: Assign role using actual UUID (after running FIND_USER_UUIDS.sql)
-- ============================================================

-- First, get the UUIDs by running:
-- SELECT id, email FROM profiles WHERE email = 'user@example.com';

-- Then use the UUID here:
DO $$
DECLARE
    v_user_id UUID;  -- Get this from FIND_USER_UUIDS.sql
    v_admin_id UUID;  -- Get this from FIND_USER_UUIDS.sql (admin user)
    v_role_name TEXT := 'provider';  -- Change role name here
BEGIN
    -- Get user UUID by email (or use direct UUID)
    SELECT id INTO v_user_id 
    FROM profiles 
    WHERE email = 'user@example.com'  -- ⬅️ CHANGE THIS
    LIMIT 1;
    
    -- Get admin UUID (or use NULL for system-assigned)
    SELECT id INTO v_admin_id 
    FROM profiles 
    WHERE email = 'admin@example.com'  -- ⬅️ CHANGE THIS or use NULL
    LIMIT 1;
    
    -- Assign role
    INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
    SELECT 
        v_user_id,
        r.id,
        v_admin_id
    FROM roles r
    WHERE r.name = v_role_name
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Role % assigned to user %', v_role_name, v_user_id;
END $$;

-- ============================================================
-- EXAMPLE 4: Assign role to user by email (simplified)
-- ============================================================

-- Assign 'provider' role - just change email and role name
DO $$
DECLARE
    v_user_email TEXT := 'user@example.com';  -- ⬅️ CHANGE THIS
    v_role_name TEXT := 'provider';  -- ⬅️ CHANGE THIS
BEGIN
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT 
        p.id,
        r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.email = v_user_email
      AND r.name = v_role_name
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Role % assigned to %', v_role_name, v_user_email;
END $$;

-- ============================================================
-- VERIFICATION: Check what you just did
-- ============================================================

-- Check role assignments by email
SELECT 
    p.email,
    r.name AS role_name,
    r.category,
    ura.is_active,
    ura.valid_until,
    ura.created_at
FROM user_role_assignments ura
JOIN profiles p ON ura.user_id = p.id
JOIN roles r ON ura.role_id = r.id
WHERE p.email = 'user@example.com'  -- ⬅️ CHANGE THIS
ORDER BY ura.created_at DESC;

-- Check user's permissions
SELECT 
    p.email,
    up.permission_name,
    up.resource,
    up.action,
    up.scope,
    up.role_name
FROM user_permissions up
JOIN profiles p ON up.user_id = p.id
WHERE p.email = 'user@example.com'  -- ⬅️ CHANGE THIS
ORDER BY up.resource, up.action;

-- List all users and their roles
SELECT 
    p.email,
    p.full_name,
    string_agg(DISTINCT r.name, ', ' ORDER BY r.name) AS roles,
    COUNT(DISTINCT r.id) AS role_count
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id 
    AND ura.is_active = TRUE
    AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.id, p.email, p.full_name
ORDER BY p.email;

