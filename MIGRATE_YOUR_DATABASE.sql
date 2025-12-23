-- ============================================================
-- MIGRATION SCRIPT FOR YOUR DATABASE
-- ============================================================
-- Based on your actual table structure
-- This migrates data from existing tables to unified schema
-- ============================================================

-- ============================================================
-- STEP 1: PREPARE - Check if unified tables already exist
-- ============================================================

DO $$
BEGIN
    -- Check if we're migrating to new unified tables or updating existing ones
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        RAISE NOTICE '⚠️  Profiles table does not exist. Make sure you have run UNIFIED_SCHEMA_MIGRATION.sql first!';
    ELSE
        RAISE NOTICE '✅ Profiles table exists';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'companies') THEN
        RAISE NOTICE '⚠️  Companies table does not exist. Make sure you have run UNIFIED_SCHEMA_MIGRATION.sql first!';
    ELSE
        RAISE NOTICE '✅ Companies table exists';
    END IF;
END $$;

-- ============================================================
-- STEP 2: MIGRATE PROFILES
-- ============================================================
-- Note: Adjust column names based on your actual profiles table structure

DO $$
DECLARE
    v_migrated_count INTEGER := 0;
BEGIN
    -- Migrate profiles - handles both systems if they share the same table
    INSERT INTO profiles (
        id, email, full_name, name, phone, address, preferences,
        role, status, created_at, updated_at
    )
    SELECT 
        COALESCE(p.user_id, p.id) as id,  -- Use user_id if exists, otherwise id
        p.email,
        p.full_name,
        COALESCE(p.full_name, p.name, split_part(p.email, '@', 1)) as name,
        p.phone,
        p.address,
        COALESCE(p.preferences, '{}'::jsonb) as preferences,
        COALESCE(p.role, 'client') as role,  -- Default to 'client' if no role
        COALESCE(p.status::text, 'active')::user_status_type as status,
        COALESCE(p.created_at, NOW()) as created_at,
        COALESCE(p.updated_at, NOW()) as updated_at
    FROM profiles p
    WHERE NOT EXISTS (
        -- Only insert if doesn't already exist in unified schema
        -- This check prevents re-migrating if script runs twice
        SELECT 1 FROM profiles up 
        WHERE up.id = COALESCE(p.user_id, p.id)
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
        name = COALESCE(profiles.name, EXCLUDED.name),
        phone = COALESCE(profiles.phone, EXCLUDED.phone),
        address = COALESCE(profiles.address, EXCLUDED.address),
        preferences = COALESCE(profiles.preferences, '{}'::jsonb) || EXCLUDED.preferences,
        role = COALESCE(profiles.role, EXCLUDED.role),
        updated_at = GREATEST(profiles.updated_at, EXCLUDED.updated_at);
    
    GET DIAGNOSTICS v_migrated_count = ROW_COUNT;
    RAISE NOTICE '✅ Migrated % profiles', v_migrated_count;
END $$;

-- ============================================================
-- STEP 3: MIGRATE COMPANIES
-- ============================================================

DO $$
DECLARE
    v_migrated_count INTEGER := 0;
BEGIN
    INSERT INTO companies (
        id, name, slug, description, logo_url, website, 
        email, phone, address, status, created_at, updated_at
    )
    SELECT 
        c.id,
        c.name,
        COALESCE(c.slug, LOWER(REGEXP_REPLACE(c.name, '[^a-zA-Z0-9]+', '-', 'g'))) as slug,
        c.description,
        c.logo_url,
        c.website,
        c.email,
        c.phone,
        c.address,
        CASE 
            WHEN c.is_active IS FALSE THEN 'inactive'::text
            WHEN c.status IS NOT NULL THEN c.status::text
            ELSE 'active'::text
        END::text as status,
        COALESCE(c.created_at, NOW()) as created_at,
        COALESCE(c.updated_at, NOW()) as updated_at
    FROM companies c
    WHERE NOT EXISTS (
        SELECT 1 FROM companies uc 
        WHERE uc.slug = COALESCE(c.slug, LOWER(REGEXP_REPLACE(c.name, '[^a-zA-Z0-9]+', '-', 'g')))
           OR uc.id = c.id
    )
    ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = COALESCE(companies.description, EXCLUDED.description),
        logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url),
        website = COALESCE(companies.website, EXCLUDED.website),
        email = COALESCE(companies.email, EXCLUDED.email),
        phone = COALESCE(companies.phone, EXCLUDED.phone),
        address = COALESCE(companies.address, EXCLUDED.address),
        status = EXCLUDED.status;
    
    GET DIAGNOSTICS v_migrated_count = ROW_COUNT;
    RAISE NOTICE '✅ Migrated % companies', v_migrated_count;
END $$;

-- ============================================================
-- STEP 4: MIGRATE SERVICES (if table exists)
-- ============================================================

DO $$
DECLARE
    v_migrated_count INTEGER := 0;
    v_table_exists BOOLEAN;
BEGIN
    -- Check if services table exists
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'services'
    ) INTO v_table_exists;
    
    IF v_table_exists THEN
        -- Migrate services - adjust column mapping based on your structure
        EXECUTE format('
            INSERT INTO services (
                id, provider_id, provider_company_id, title, description, category,
                price, currency, duration_minutes, max_participants, status,
                metadata, created_at, updated_at
            )
            SELECT 
                s.id,
                s.created_by as provider_id,  -- Adjust if column name differs
                s.company_id as provider_company_id,
                COALESCE(s.title, s.name) as title,
                s.description,
                s.category,
                COALESCE(s.price, s.price_base, s.base_price, 0) as price,
                COALESCE(s.currency, s.price_currency, ''USD'') as currency,
                s.duration_minutes,
                s.max_participants,
                CASE 
                    WHEN s.status = ''active'' THEN ''active''::service_status_type
                    WHEN s.status = ''inactive'' THEN ''inactive''::service_status_type
                    WHEN s.status = ''draft'' THEN ''draft''::service_status_type
                    ELSE ''active''::service_status_type
                END as status,
                COALESCE(s.metadata, ''{}''::jsonb) as metadata,
                COALESCE(s.created_at, NOW()) as created_at,
                COALESCE(s.updated_at, NOW()) as updated_at
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
        RAISE NOTICE '⚠️  Services table does not exist, skipping...';
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
        id, client_id, provider_id, provider_company_id, service_id,
        status, scheduled_at, created_at, updated_at
    )
    SELECT 
        b.id,
        b.client_id,
        b.provider_id,
        b.provider_company_id,
        b.service_id,
        COALESCE(b.status::booking_status_type, 'pending'::booking_status_type) as status,
        b.scheduled_at,
        COALESCE(b.created_at, NOW()) as created_at,
        COALESCE(b.updated_at, NOW()) as updated_at
    FROM bookings b
    WHERE NOT EXISTS (
        SELECT 1 FROM bookings ub WHERE ub.id = b.id
    )
    ON CONFLICT (id) DO UPDATE SET
        client_id = EXCLUDED.client_id,
        provider_id = EXCLUDED.provider_id,
        provider_company_id = EXCLUDED.provider_company_id,
        service_id = EXCLUDED.service_id,
        status = EXCLUDED.status,
        scheduled_at = EXCLUDED.scheduled_at;
    
    GET DIAGNOSTICS v_migrated_count = ROW_COUNT;
    RAISE NOTICE '✅ Migrated % bookings', v_migrated_count;
END $$;

-- ============================================================
-- STEP 6: UPDATE FOREIGN KEY REFERENCES
-- ============================================================

-- Update profiles.company_id to point to migrated companies
UPDATE profiles p
SET company_id = c.id
FROM companies c
WHERE p.company_id IS NOT NULL
  AND EXISTS (
      SELECT 1 FROM companies oc 
      WHERE oc.id = p.company_id
  )
  AND p.company_id = c.id;

-- ============================================================
-- STEP 7: VERIFICATION
-- ============================================================

SELECT 
    '=== MIGRATION SUMMARY ===' AS section;

SELECT 
    'Total Profiles' AS metric,
    COUNT(*) AS count
FROM profiles
UNION ALL
SELECT 
    'Total Companies',
    COUNT(*)
FROM companies
UNION ALL
SELECT 
    'Total Services',
    COUNT(*)
FROM services
UNION ALL
SELECT 
    'Total Bookings',
    COUNT(*)
FROM bookings;

-- Check for any issues
SELECT 
    'Profiles without auth users' AS check_type,
    COUNT(*) AS count
FROM profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM auth.users au WHERE au.id = p.id
);

-- Show profiles by role
SELECT 
    'Profiles by Role' AS metric,
    COALESCE(role::text, 'NULL') AS role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

SELECT 
    '=== NEXT STEPS ===' AS section,
    '1. Run SETUP_ROLES_FROM_SUPABASE.sql to assign RBAC roles' AS step_1,
    '2. Run VERIFY_MIGRATION.sql to verify data integrity' AS step_2,
    '3. Test your application' AS step_3;

