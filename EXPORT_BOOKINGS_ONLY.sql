-- ============================================================
-- EXPORT BOOKINGS ONLY
-- ============================================================
-- Run this query separately in your OLD Supabase project
-- ============================================================

SELECT 
    id::text,
    COALESCE(client_id, user_id)::text AS client_id,
    provider_id::text,
    provider_company_id::text,
    service_id::text,
    package_id::text,
    CASE 
        WHEN status = 'approved' THEN 'confirmed'
        WHEN status = 'pending' THEN 'pending'
        WHEN status = 'in_progress' THEN 'in_progress'
        WHEN status = 'completed' THEN 'completed'
        WHEN status = 'cancelled' THEN 'cancelled'
        WHEN status = 'declined' THEN 'cancelled'
        WHEN status = 'confirmed' THEN 'confirmed'
        WHEN status = 'draft' THEN 'draft'
        ELSE 'pending'
    END AS status,
    COALESCE(scheduled_at, scheduled_start, start_time)::text AS scheduled_at,
    created_at::text,
    updated_at::text
FROM bookings
ORDER BY created_at;

