-- ============================================================
-- EXPORT COMPANIES ONLY
-- ============================================================
-- Run this query separately in your OLD Supabase project
-- ============================================================

SELECT 
    id::text,
    name,
    COALESCE(slug, LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))) AS slug,
    description,
    logo_url,
    website,
    email,
    phone,
    address::text AS address_json,
    cr_number,
    vat_number,
    owner_id::text,
    CASE 
        WHEN COALESCE(is_active, true) THEN 'active'
        ELSE 'inactive'
    END AS status,
    created_at::text,
    updated_at::text
FROM companies
ORDER BY created_at;

