-- ============================================================
-- GET REAL USER DATA FROM YOUR SUPABASE ACCOUNT
-- ============================================================
-- Run this to see your actual users and their data
-- ============================================================

-- 1. List all users from profiles table
SELECT 
    id AS user_uuid,
    email,
    full_name,
    name,
    role AS current_role,  -- Legacy role from profiles.role column
    company_name,
    is_verified,
    status,
    created_at
FROM profiles
ORDER BY created_at DESC;

-- 2. List users from auth.users (Supabase Auth)
SELECT 
    id AS user_uuid,
    email,
    raw_user_meta_data->>'full_name' AS full_name,
    created_at,
    email_confirmed_at
FROM auth.users
ORDER BY created_at DESC;

-- 3. Match profiles with auth.users
SELECT 
    p.id AS profile_uuid,
    p.email,
    p.full_name,
    p.role AS legacy_role,
    au.id AS auth_uuid,
    CASE 
        WHEN p.id = au.id THEN '✅ Matched'
        ELSE '❌ Mismatch'
    END AS match_status
FROM profiles p
FULL OUTER JOIN auth.users au ON p.id = au.id
ORDER BY p.email;

-- 4. Get users with their current role assignments
SELECT 
    p.id AS user_uuid,
    p.email,
    p.full_name,
    p.role AS legacy_role,
    string_agg(r.name, ', ' ORDER BY r.name) AS assigned_roles,
    COUNT(ura.id) FILTER (WHERE ura.is_active = TRUE) AS active_role_count
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.id, p.email, p.full_name, p.role
ORDER BY p.email;

-- 5. Find users without any role assignments (candidates for default role)
SELECT 
    p.id AS user_uuid,
    p.email,
    p.full_name,
    p.role AS legacy_role,
    'No RBAC role assigned' AS status
FROM profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM user_role_assignments ura
    WHERE ura.user_id = p.id
    AND ura.is_active = TRUE
    AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
)
ORDER BY p.email;

-- 6. Find admin users (for assigning roles to others)
SELECT 
    p.id AS admin_uuid,
    p.email,
    p.full_name,
    p.role AS legacy_role
FROM profiles p
WHERE p.role = 'admin'  -- Or check user_role_assignments
   OR EXISTS (
       SELECT 1 FROM user_role_assignments ura
       JOIN roles r ON ura.role_id = r.id
       WHERE ura.user_id = p.id
       AND r.name = 'admin'
       AND ura.is_active = TRUE
   )
ORDER BY p.email
LIMIT 5;

-- 7. Count users by legacy role
SELECT 
    role AS legacy_role,
    COUNT(*) AS user_count
FROM profiles
GROUP BY role
ORDER BY user_count DESC;

