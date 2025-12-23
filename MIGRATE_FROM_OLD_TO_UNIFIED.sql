-- ============================================================
-- MIGRATE DATA FROM OLD DATABASE TO UNIFIED DATABASE
-- ============================================================
-- This script migrates data from your OLD database schema
-- to the NEW unified database schema.
--
-- IMPORTANT: 
-- 1. Ensure UNIFIED_SCHEMA_MIGRATION.sql has been run first
-- 2. Ensure SEED_ROLES_AND_PERMISSIONS.sql has been run
-- 3. Both old and new tables are in the same database
-- ============================================================

-- ============================================================
-- STEP 1: MIGRATE PROFILES
-- ============================================================
-- Map old profiles to new unified profiles schema
-- Old schema has: id, email, first_name, last_name, role, status, etc.
-- New schema has: id, email, full_name, name, phone, avatar_url, etc.

DO $$
DECLARE
    v_migrated_count INTEGER := 0;
BEGIN
    -- Migrate profiles from old schema to new unified schema
    INSERT INTO profiles (
        id,
        email,
        full_name,
        name,
        phone,
        avatar_url,
        company_name,
        country,
        is_verified,
        role,
        status,
        created_at,
        updated_at
    )
    SELECT 
        p.id,
        p.email,
        COALESCE(p.full_name, CONCAT(p.first_name, ' ', p.last_name), split_part(p.email, '@', 1)) AS full_name,
        COALESCE(p.full_name, CONCAT(p.first_name, ' ', p.last_name), split_part(p.email, '@', 1)) AS name,
        p.phone,
        COALESCE(p.avatar_url, p.profile_image_url) AS avatar_url,
        COALESCE(p.company_name, p.company) AS company_name,
        p.country,
        COALESCE(p.is_verified, false) AS is_verified,
        CASE 
            WHEN p.role = 'promoter' THEN 'provider'  -- Map promoter to provider
            WHEN p.role = 'user' THEN 'client'        -- Map user to client
            ELSE COALESCE(p.role, 'client')
        END AS role,
        CASE 
            WHEN p.status = 'pending' THEN 'active'::user_status_type
            WHEN p.status = 'approved' THEN 'active'::user_status_type
            WHEN p.status = 'suspended' THEN 'suspended'::user_status_type
            WHEN p.status = 'deleted' THEN 'inactive'::user_status_type
            ELSE 'active'::user_status_type
        END AS status,
        COALESCE(p.created_at, NOW()) AS created_at,
        COALESCE(p.updated_at, NOW()) AS updated_at
    FROM profiles p
    WHERE NOT EXISTS (
        -- Only migrate if not already in unified table
        SELECT 1 FROM profiles up 
        WHERE up.id = p.id
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
        name = COALESCE(profiles.name, EXCLUDED.name),
        phone = COALESCE(profiles.phone, EXCLUDED.phone),
        avatar_url = COALESCE(profiles.avatar_url, EXCLUDED.avatar_url),
        company_name = COALESCE(profiles.company_name, EXCLUDED.company_name),
        country = COALESCE(profiles.country, EXCLUDED.country),
        is_verified = COALESCE(profiles.is_verified, EXCLUDED.is_verified),
        role = EXCLUDED.role,
        status = EXCLUDED.status,
        updated_at = GREATEST(profiles.updated_at, EXCLUDED.updated_at);
    
    GET DIAGNOSTICS v_migrated_count = ROW_COUNT;
    RAISE NOTICE '✅ Migrated % profiles', v_migrated_count;
END $$;

-- ============================================================
-- STEP 2: MIGRATE COMPANIES
-- ============================================================

DO $$
DECLARE
    v_migrated_count INTEGER := 0;
BEGIN
    INSERT INTO companies (
        id,
        name,
        slug,
        description,
        logo_url,
        website,
        email,
        phone,
        address,
        cr_number,
        vat_number,
        owner_id,
        status,
        created_at,
        updated_at
    )
    SELECT 
        c.id,
        c.name,
        COALESCE(c.slug, LOWER(REGEXP_REPLACE(c.name, '[^a-zA-Z0-9]+', '-', 'g'))) AS slug,
        c.description,
        c.logo_url,
        c.website,
        c.email,
        c.phone,
        c.address,
        c.cr_number,
        c.vat_number,
        c.owner_id,
        CASE 
            WHEN COALESCE(c.is_active, true) THEN 'active'::text
            ELSE 'inactive'::text
        END AS status,
        COALESCE(c.created_at, NOW()) AS created_at,
        COALESCE(c.updated_at, NOW()) AS updated_at
    FROM companies c
    WHERE NOT EXISTS (
        SELECT 1 FROM companies uc 
        WHERE uc.id = c.id OR uc.slug = COALESCE(c.slug, LOWER(REGEXP_REPLACE(c.name, '[^a-zA-Z0-9]+', '-', 'g')))
    )
    ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = COALESCE(companies.description, EXCLUDED.description),
        logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url),
        website = COALESCE(companies.website, EXCLUDED.website),
        email = COALESCE(companies.email, EXCLUDED.email),
        phone = COALESCE(companies.phone, EXCLUDED.phone),
        address = COALESCE(companies.address, EXCLUDED.address),
        cr_number = COALESCE(companies.cr_number, EXCLUDED.cr_number),
        vat_number = COALESCE(companies.vat_number, EXCLUDED.vat_number),
        status = EXCLUDED.status;
    
    GET DIAGNOSTICS v_migrated_count = ROW_COUNT;
    RAISE NOTICE '✅ Migrated % companies', v_migrated_count;
END $$;

-- ============================================================
-- STEP 3: UPDATE PROFILES.COMPANY_ID
-- ============================================================

-- Update company_id in profiles after companies are migrated
UPDATE profiles p
SET company_id = c.id
FROM companies c
WHERE p.company_name = c.name
  AND p.company_id IS NULL
  AND c.id IS NOT NULL;

-- Also try matching by company_id if it exists in old schema
UPDATE profiles p
SET company_id = c.id
FROM companies c
WHERE EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'company_id'
)
AND p.company_id = c.id
AND p.company_id IS NOT NULL;

-- ============================================================
-- STEP 4: MIGRATE SERVICES
-- ============================================================

DO $$
DECLARE
    v_migrated_count INTEGER := 0;
    v_table_exists BOOLEAN;
BEGIN
    -- Check if services table exists in old schema
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'services'
    ) INTO v_table_exists;
    
    IF v_table_exists THEN
        -- Migrate services - handle both old schema variations
        EXECUTE format('
            INSERT INTO services (
                id,
                provider_id,
                provider_company_id,
                title,
                description,
                category,
                price,
                currency,
                location,
                tags,
                requirements,
                cover_image_url,
                featured,
                rating,
                review_count,
                booking_count,
                status,
                created_at,
                updated_at
            )
            SELECT 
                s.id,
                s.provider_id,
                COALESCE(s.company_id, s.provider_company_id) AS provider_company_id,
                COALESCE(s.title, s.name) AS title,
                s.description,
                s.category,
                COALESCE(s.price, s.base_price, s.price_base, 0) AS price,
                COALESCE(s.currency, s.price_currency, ''USD'') AS currency,
                s.location,
                s.tags,
                s.requirements,
                s.cover_image_url,
                COALESCE(s.featured, s.is_featured, false) AS featured,
                COALESCE(s.rating, 0) AS rating,
                COALESCE(s.review_count, 0) AS review_count,
                COALESCE(s.booking_count, 0) AS booking_count,
                CASE 
                    WHEN s.status = ''active'' AND COALESCE(s.approval_status, ''approved'') = ''approved'' THEN ''active''::service_status_type
                    WHEN s.status = ''pending'' OR s.approval_status = ''pending'' THEN ''pending''::service_status_type
                    WHEN s.status = ''inactive'' OR s.status = ''archived'' THEN ''inactive''::service_status_type
                    WHEN s.status = ''draft'' THEN ''draft''::service_status_type
                    ELSE ''active''::service_status_type
                END AS status,
                COALESCE(s.created_at, NOW()) AS created_at,
                COALESCE(s.updated_at, NOW()) AS updated_at
            FROM services s
            WHERE NOT EXISTS (
                SELECT 1 FROM services us WHERE us.id = s.id
            )
            ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                category = EXCLUDED.category,
                price = EXCLUDED.price,
                currency = EXCLUDED.currency,
                status = EXCLUDED.status
        ');
        
        GET DIAGNOSTICS v_migrated_count = ROW_COUNT;
        RAISE NOTICE '✅ Migrated % services', v_migrated_count;
    ELSE
        RAISE NOTICE '⚠️  Services table does not exist in old schema, skipping...';
    END IF;
END $$;

-- ============================================================
-- STEP 5: MIGRATE BOOKINGS
-- ============================================================

DO $$
DECLARE
    v_migrated_count INTEGER := 0;
BEGIN
    INSERT INTO bookings (
        id,
        client_id,
        provider_id,
        provider_company_id,
        service_id,
        package_id,
        status,
        scheduled_at,
        created_at,
        updated_at
    )
    SELECT 
        b.id,
        COALESCE(b.client_id, b.user_id) AS client_id,
        b.provider_id,
        b.provider_company_id,
        b.service_id,
        b.package_id,
        CASE 
            WHEN b.status = 'approved' THEN 'confirmed'::booking_status_type
            WHEN b.status = 'pending' THEN 'pending'::booking_status_type
            WHEN b.status = 'in_progress' THEN 'in_progress'::booking_status_type
            WHEN b.status = 'completed' THEN 'completed'::booking_status_type
            WHEN b.status = 'cancelled' THEN 'cancelled'::booking_status_type
            WHEN b.status = 'declined' THEN 'cancelled'::booking_status_type
            WHEN b.status = 'confirmed' THEN 'confirmed'::booking_status_type
            WHEN b.status = 'draft' THEN 'draft'::booking_status_type
            ELSE 'pending'::booking_status_type
        END AS status,
        COALESCE(b.scheduled_at, b.scheduled_start, b.start_time) AS scheduled_at,
        COALESCE(b.created_at, NOW()) AS created_at,
        COALESCE(b.updated_at, NOW()) AS updated_at
    FROM bookings b
    WHERE NOT EXISTS (
        SELECT 1 FROM bookings ub WHERE ub.id = b.id
    )
    ON CONFLICT (id) DO UPDATE SET
        client_id = EXCLUDED.client_id,
        provider_id = EXCLUDED.provider_id,
        service_id = EXCLUDED.service_id,
        status = EXCLUDED.status;
    
    GET DIAGNOSTICS v_migrated_count = ROW_COUNT;
    RAISE NOTICE '✅ Migrated % bookings', v_migrated_count;
END $$;

-- ============================================================
-- STEP 6: ASSIGN RBAC ROLES
-- ============================================================

DO $$
DECLARE
    v_assigned_count INTEGER := 0;
    v_total_assigned INTEGER := 0;
BEGIN
    RAISE NOTICE 'Assigning RBAC roles...';
    
    -- Assign admin role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'admin' AND r.name = 'admin'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned admin role to % users', v_assigned_count;
    
    -- Assign provider role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'provider' AND r.name = 'provider'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned provider role to % users', v_assigned_count;
    
    -- Assign client role
    INSERT INTO user_role_assignments (user_id, role_id)
    SELECT p.id, r.id
    FROM profiles p
    CROSS JOIN roles r
    WHERE p.role = 'client' AND r.name = 'client'
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    RAISE NOTICE '  ✓ Assigned client role to % users', v_assigned_count;
    
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
    GET DIAGNOSTICS v_assigned_count = ROW_COUNT;
    v_total_assigned := v_total_assigned + v_assigned_count;
    IF v_assigned_count > 0 THEN
        RAISE NOTICE '  ✓ Assigned default client role to % users', v_assigned_count;
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ RBAC role assignment completed! Total: %', v_total_assigned;
END $$;

-- ============================================================
-- STEP 7: REFRESH MATERIALIZED VIEW
-- ============================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'user_permissions'
        AND table_type = 'BASE TABLE'
    ) THEN
        EXECUTE 'REFRESH MATERIALIZED VIEW user_permissions';
        RAISE NOTICE '✅ Refreshed user_permissions materialized view';
    END IF;
END $$;

-- ============================================================
-- STEP 8: VERIFICATION SUMMARY
-- ============================================================

SELECT 
    '=== MIGRATION SUMMARY ===' AS section;

SELECT 
    'Total Profiles Migrated' AS metric,
    COUNT(*) AS count
FROM profiles
UNION ALL
SELECT 
    'Total Companies Migrated',
    COUNT(*)
FROM companies
UNION ALL
SELECT 
    'Total Services Migrated',
    COUNT(*)
FROM services
UNION ALL
SELECT 
    'Total Bookings Migrated',
    COUNT(*)
FROM bookings;

-- Show profiles by role
SELECT 
    'Profiles by Role' AS metric,
    COALESCE(role, 'NULL') AS role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

-- Show RBAC assignments
SELECT 
    'RBAC Role Assignments' AS metric,
    r.name AS role_name,
    COUNT(*) AS assignment_count,
    COUNT(DISTINCT ura.user_id) AS unique_users
FROM roles r
LEFT JOIN user_role_assignments ura ON r.id = ura.role_id
WHERE ura.is_active = TRUE
GROUP BY r.id, r.name
ORDER BY assignment_count DESC;

-- Check for any issues
SELECT 
    'Profiles without auth users' AS check_type,
    COUNT(*) AS count
FROM profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM auth.users au WHERE au.id = p.id
);

SELECT 
    '=== NEXT STEPS ===' AS section,
    '1. Verify migration summary above' AS step_1,
    '2. Run VERIFY_MIGRATION.sql to check data integrity' AS step_2,
    '3. Test your application with migrated data' AS step_3;

