-- ============================================================
-- QUICK ROLE SETUP FROM EXISTING SUPABASE DATA
-- ============================================================
-- Simplified version - Just assigns roles, minimal output
-- Run this if you want a quick setup without detailed previews
-- ============================================================

-- Assign roles from legacy profiles.role column
INSERT INTO user_role_assignments (user_id, role_id)
SELECT p.id, r.id
FROM profiles p
CROSS JOIN roles r
WHERE 
    (p.role = 'admin' AND r.name = 'admin')
    OR (p.role = 'provider' AND r.name = 'provider')
    OR (p.role = 'client' AND r.name = 'client')
    OR (p.role = 'staff' AND r.name = 'staff')
    OR (p.role = 'manager' AND r.name = 'manager')
    OR (p.role = 'enterprise_admin' AND r.name = 'enterprise_admin')
    OR (p.role = 'enterprise_employee' AND r.name = 'enterprise_employee')
ON CONFLICT DO NOTHING;

-- Assign provider role to users with services
INSERT INTO user_role_assignments (user_id, role_id)
SELECT DISTINCT s.provider_id, r.id
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

-- Assign client role to users with bookings
INSERT INTO user_role_assignments (user_id, role_id)
SELECT DISTINCT b.client_id, r.id
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

-- Assign enterprise_employee to users with company_id
INSERT INTO user_role_assignments (user_id, role_id, context)
SELECT p.id, r.id, jsonb_build_object('company_id', p.company_id)
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

-- Assign default client role to users without any role
INSERT INTO user_role_assignments (user_id, role_id)
SELECT p.id, r.id
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

-- Refresh materialized view
REFRESH MATERIALIZED VIEW user_permissions;

-- Quick summary
SELECT 
    r.name AS role,
    COUNT(*) AS user_count
FROM user_role_assignments ura
JOIN roles r ON ura.role_id = r.id
WHERE ura.is_active = TRUE
GROUP BY r.name
ORDER BY user_count DESC;

