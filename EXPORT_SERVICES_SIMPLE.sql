-- ============================================================
-- EXPORT SERVICES (Simple Version - Use company_id)
-- ============================================================
-- Run this in your OLD Supabase project
-- This version uses company_id instead of provider_company_id
-- ============================================================

SELECT 
    id::text,
    provider_id::text,
    company_id::text AS provider_company_id,  -- Maps company_id to provider_company_id
    COALESCE(title, name) AS title,
    description,
    category,
    COALESCE(price, base_price, price_base, 0) AS price,
    COALESCE(currency, price_currency, 'USD') AS currency,
    location,
    tags::text AS tags_array,
    requirements,
    cover_image_url,
    COALESCE(featured, is_featured, false) AS featured,
    COALESCE(rating, 0) AS rating,
    COALESCE(review_count, 0) AS review_count,
    COALESCE(booking_count, 0) AS booking_count,
    CASE 
        WHEN status = 'active' AND COALESCE(approval_status, 'approved') = 'approved' THEN 'active'
        WHEN status = 'pending' OR approval_status = 'pending' THEN 'pending'
        WHEN status = 'inactive' OR status = 'archived' THEN 'inactive'
        WHEN status = 'draft' THEN 'draft'
        ELSE 'active'
    END AS status,
    created_at::text,
    updated_at::text
FROM services
ORDER BY created_at;

