-- ============================================================
-- CREATE TEST DATA FOR SMARTPRO PLATFORM
-- ============================================================
-- This script creates sample users, companies, services, bookings, etc.
-- for testing and development purposes.
--
-- IMPORTANT: This creates test data only. For production, users
-- should be created through Supabase Auth (sign up flow).
-- ============================================================

-- ============================================================
-- STEP 1: CREATE TEST USERS IN AUTH.USERS
-- ============================================================
-- Note: In production, users are created through Supabase Auth.
-- This is for testing only.

DO $$
DECLARE
    v_admin_id UUID;
    v_provider1_id UUID;
    v_provider2_id UUID;
    v_client1_id UUID;
    v_client2_id UUID;
    v_staff_id UUID;
    v_manager_id UUID;
    v_company_id UUID;
    v_service1_id UUID;
    v_service2_id UUID;
    v_booking_id UUID;
BEGIN
    -- Create test users in auth.users (using Supabase's auth.users structure)
    -- Note: In real scenarios, these would be created via Supabase Auth API
    
    -- Admin user
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin
    ) VALUES (
        gen_random_uuid(),
        '00000000-0000-0000-0000-000000000000',
        'admin@smartpro.test',
        crypt('password123', gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"full_name": "Admin User"}'::jsonb,
        false
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_admin_id;
    
    -- Provider 1
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin
    ) VALUES (
        gen_random_uuid(),
        '00000000-0000-0000-0000-000000000000',
        'provider1@smartpro.test',
        crypt('password123', gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"full_name": "John Provider"}'::jsonb,
        false
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_provider1_id;
    
    -- Provider 2
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin
    ) VALUES (
        gen_random_uuid(),
        '00000000-0000-0000-0000-000000000000',
        'provider2@smartpro.test',
        crypt('password123', gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"full_name": "Jane Provider"}'::jsonb,
        false
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_provider2_id;
    
    -- Client 1
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin
    ) VALUES (
        gen_random_uuid(),
        '00000000-0000-0000-0000-000000000000',
        'client1@smartpro.test',
        crypt('password123', gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"full_name": "Alice Client"}'::jsonb,
        false
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_client1_id;
    
    -- Client 2
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin
    ) VALUES (
        gen_random_uuid(),
        '00000000-0000-0000-0000-000000000000',
        'client2@smartpro.test',
        crypt('password123', gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"full_name": "Bob Client"}'::jsonb,
        false
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_client2_id;
    
    -- Staff user
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin
    ) VALUES (
        gen_random_uuid(),
        '00000000-0000-0000-0000-000000000000',
        'staff@smartpro.test',
        crypt('password123', gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"full_name": "Staff Member"}'::jsonb,
        false
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_staff_id;
    
    -- Manager user
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin
    ) VALUES (
        gen_random_uuid(),
        '00000000-0000-0000-0000-000000000000',
        'manager@smartpro.test',
        crypt('password123', gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"full_name": "Manager User"}'::jsonb,
        false
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id INTO v_manager_id;
    
    -- Get IDs if they already exist
    IF v_admin_id IS NULL THEN
        SELECT id INTO v_admin_id FROM auth.users WHERE email = 'admin@smartpro.test';
    END IF;
    IF v_provider1_id IS NULL THEN
        SELECT id INTO v_provider1_id FROM auth.users WHERE email = 'provider1@smartpro.test';
    END IF;
    IF v_provider2_id IS NULL THEN
        SELECT id INTO v_provider2_id FROM auth.users WHERE email = 'provider2@smartpro.test';
    END IF;
    IF v_client1_id IS NULL THEN
        SELECT id INTO v_client1_id FROM auth.users WHERE email = 'client1@smartpro.test';
    END IF;
    IF v_client2_id IS NULL THEN
        SELECT id INTO v_client2_id FROM auth.users WHERE email = 'client2@smartpro.test';
    END IF;
    IF v_staff_id IS NULL THEN
        SELECT id INTO v_staff_id FROM auth.users WHERE email = 'staff@smartpro.test';
    END IF;
    IF v_manager_id IS NULL THEN
        SELECT id INTO v_manager_id FROM auth.users WHERE email = 'manager@smartpro.test';
    END IF;
    
    -- ============================================================
    -- STEP 2: CREATE PROFILES FOR TEST USERS
    -- ============================================================
    
    INSERT INTO profiles (id, email, full_name, name, role, status, is_verified, phone, company_name)
    VALUES 
        (v_admin_id, 'admin@smartpro.test', 'Admin User', 'Admin User', 'admin', 'active', true, '+1234567890', 'SmartPro Admin'),
        (v_provider1_id, 'provider1@smartpro.test', 'John Provider', 'John Provider', 'provider', 'active', true, '+1234567891', 'Provider Services Inc'),
        (v_provider2_id, 'provider2@smartpro.test', 'Jane Provider', 'Jane Provider', 'provider', 'active', true, '+1234567892', 'Jane Consulting'),
        (v_client1_id, 'client1@smartpro.test', 'Alice Client', 'Alice Client', 'client', 'active', true, '+1234567893', NULL),
        (v_client2_id, 'client2@smartpro.test', 'Bob Client', 'Bob Client', 'client', 'active', true, '+1234567894', NULL),
        (v_staff_id, 'staff@smartpro.test', 'Staff Member', 'Staff Member', 'staff', 'active', true, '+1234567895', 'SmartPro'),
        (v_manager_id, 'manager@smartpro.test', 'Manager User', 'Manager User', 'manager', 'active', true, '+1234567896', 'SmartPro')
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        status = EXCLUDED.status;
    
    -- ============================================================
    -- STEP 3: CREATE TEST COMPANY
    -- ============================================================
    
    INSERT INTO companies (name, slug, description, website, email, phone, address, status, created_at)
    VALUES (
        'Acme Corporation',
        'acme-corporation',
        'A leading enterprise company',
        'https://acme.example.com',
        'contact@acme.example.com',
        '+1-555-0100',
        '{"street": "123 Business St", "city": "New York", "state": "NY", "zip": "10001", "country": "USA"}'::jsonb,
        'active',
        NOW()
    )
    ON CONFLICT (slug) DO NOTHING
    RETURNING id INTO v_company_id;
    
    IF v_company_id IS NULL THEN
        SELECT id INTO v_company_id FROM companies WHERE slug = 'acme-corporation';
    END IF;
    
    -- Assign company to manager
    UPDATE profiles SET company_id = v_company_id WHERE id = v_manager_id;
    
    -- ============================================================
    -- STEP 4: CREATE TEST SERVICES
    -- ============================================================
    
    INSERT INTO services (provider_id, title, description, category, price, currency, status, created_at)
    VALUES 
        (v_provider1_id, 'Web Development Service', 'Professional web development for your business', 'technology', 5000.00, 'USD', 'active', NOW()),
        (v_provider1_id, 'Mobile App Development', 'iOS and Android app development', 'technology', 8000.00, 'USD', 'active', NOW()),
        (v_provider2_id, 'Business Consulting', 'Strategic business consulting services', 'consulting', 3000.00, 'USD', 'active', NOW()),
        (v_provider2_id, 'Marketing Strategy', 'Digital marketing and brand strategy', 'marketing', 2500.00, 'USD', 'active', NOW())
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_service1_id;
    
    SELECT id INTO v_service1_id FROM services WHERE provider_id = v_provider1_id LIMIT 1;
    SELECT id INTO v_service2_id FROM services WHERE provider_id = v_provider2_id LIMIT 1;
    
    -- ============================================================
    -- STEP 5: CREATE TEST BOOKINGS
    -- ============================================================
    
    INSERT INTO bookings (client_id, provider_id, service_id, status, scheduled_at, created_at)
    VALUES 
        (v_client1_id, v_provider1_id, v_service1_id, 'confirmed', NOW() + INTERVAL '7 days', NOW()),
        (v_client2_id, v_provider2_id, v_service2_id, 'pending', NOW() + INTERVAL '14 days', NOW())
    ON CONFLICT DO NOTHING
    RETURNING id INTO v_booking_id;
    
    -- ============================================================
    -- STEP 6: CREATE TEST CONTRACTS
    -- ============================================================
    
    INSERT INTO contracts (title, type, status, created_at)
    VALUES 
        ('Service Agreement - Web Development', 'service', 'draft', NOW()),
        ('Consulting Contract', 'consultancy', 'active', NOW())
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE '✅ Test data created successfully!';
    RAISE NOTICE '   Admin: admin@smartpro.test (password: password123)';
    RAISE NOTICE '   Provider 1: provider1@smartpro.test (password: password123)';
    RAISE NOTICE '   Provider 2: provider2@smartpro.test (password: password123)';
    RAISE NOTICE '   Client 1: client1@smartpro.test (password: password123)';
    RAISE NOTICE '   Client 2: client2@smartpro.test (password: password123)';
    RAISE NOTICE '   Staff: staff@smartpro.test (password: password123)';
    RAISE NOTICE '   Manager: manager@smartpro.test (password: password123)';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating test data: %', SQLERRM;
        -- Note: Direct inserts into auth.users may not work in all Supabase setups
        -- Users should be created through Supabase Auth API instead
END $$;

-- ============================================================
-- ALTERNATIVE: CREATE PROFILES ONLY (if users exist in auth.users)
-- ============================================================
-- If you already have users in auth.users, run this instead:

/*
INSERT INTO profiles (id, email, full_name, name, role, status, is_verified)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)) AS full_name,
    COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)) AS name,
    'client' AS role,
    'active' AS status,
    email_confirmed_at IS NOT NULL AS is_verified
FROM auth.users
WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.users.id)
ON CONFLICT (id) DO NOTHING;
*/

-- ============================================================
-- VERIFICATION: Check what was created
-- ============================================================

SELECT '=== TEST DATA SUMMARY ===' AS section;

SELECT 
    'Users' AS data_type,
    COUNT(*) AS count
FROM profiles
UNION ALL
SELECT 
    'Companies' AS data_type,
    COUNT(*) AS count
FROM companies
UNION ALL
SELECT 
    'Services' AS data_type,
    COUNT(*) AS count
FROM services
UNION ALL
SELECT 
    'Bookings' AS data_type,
    COUNT(*) AS count
FROM bookings;

-- Show created users
SELECT 
    '=== CREATED USERS ===' AS section,
    p.email,
    p.full_name,
    p.role,
    p.status,
    CASE WHEN au.id IS NOT NULL THEN '✅ Auth User Exists' ELSE '❌ No Auth User' END AS auth_status
FROM profiles p
LEFT JOIN auth.users au ON p.id = au.id
ORDER BY p.email;

