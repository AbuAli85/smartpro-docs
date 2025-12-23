-- ============================================================
-- EXPORT PROFILES ONLY
-- ============================================================
-- Run this query separately in your OLD Supabase project
-- ============================================================

SELECT 
    id::text,
    email,
    COALESCE(full_name, CONCAT(first_name, ' ', last_name), split_part(email, '@', 1)) AS full_name,
    phone,
    COALESCE(avatar_url, profile_image_url) AS avatar_url,
    COALESCE(company_name, company) AS company_name,
    country,
    COALESCE(is_verified, false) AS is_verified,
    CASE 
        WHEN role = 'promoter' THEN 'provider'
        WHEN role = 'user' THEN 'client'
        ELSE COALESCE(role, 'client')
    END AS role,
    CASE 
        WHEN status = 'pending' THEN 'active'
        WHEN status = 'approved' THEN 'active'
        WHEN status = 'suspended' THEN 'suspended'
        WHEN status = 'deleted' THEN 'inactive'
        ELSE 'active'
    END AS status,
    created_at::text,
    updated_at::text
FROM profiles
ORDER BY created_at;

