-- Verify enum values match the unified schema requirements
-- This checks that all expected status values are present

-- 1. Booking Status Enum (should have values from all 3 systems)
SELECT 
    'booking_status_type' AS enum_name,
    enumlabel AS value,
    enumsortorder AS sort_order
FROM pg_enum
WHERE enumtypid = (
    SELECT oid FROM pg_type WHERE typname = 'booking_status_type'
)
ORDER BY enumsortorder;

-- Expected values (from unified schema):
-- pending, confirmed, in_progress, completed, cancelled, refunded,
-- draft, pending_payment, paid, delivered, disputed

-- 2. Service Status Enum
SELECT 
    'service_status_type' AS enum_name,
    enumlabel AS value,
    enumsortorder AS sort_order
FROM pg_enum
WHERE enumtypid = (
    SELECT oid FROM pg_type WHERE typname = 'service_status_type'
)
ORDER BY enumsortorder;

-- Expected values:
-- active, draft, archived, pending_approval, rejected, suspended

-- 3. Invoice Status Enum
SELECT 
    'invoice_status_type' AS enum_name,
    enumlabel AS value,
    enumsortorder AS sort_order
FROM pg_enum
WHERE enumtypid = (
    SELECT oid FROM pg_type WHERE typname = 'invoice_status_type'
)
ORDER BY enumsortorder;

-- Expected values:
-- draft, pending, paid, overdue, cancelled, refunded, disputed

-- 4. Contract Status Enum
SELECT 
    'contract_status_type' AS enum_name,
    enumlabel AS value,
    enumsortorder AS sort_order
FROM pg_enum
WHERE enumtypid = (
    SELECT oid FROM pg_type WHERE typname = 'contract_status_type'
)
ORDER BY enumsortorder;

-- Expected values:
-- draft, pending, active, expired, terminated, cancelled, archived

-- 5. Check all other enums
SELECT 
    t.typname AS enum_name,
    COUNT(e.enumlabel) AS value_count,
    array_agg(e.enumlabel ORDER BY e.enumsortorder) AS values
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname IN (
    'contract_type_type',
    'notification_type_type',
    'audit_action_type',
    'party_type_type',
    'user_status_type'
)
GROUP BY t.typname
ORDER BY t.typname;

