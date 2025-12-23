-- ============================================================
-- IMPORT PROFILES FROM OLD DATABASES
-- ============================================================
-- This script imports profiles from Contract-Management-System
-- and business-services-hub into the unified schema.
--
-- IMPORTANT: Users must exist in auth.users first!
-- Create auth users via Supabase Auth API or manually.
-- ============================================================

-- ============================================================
-- STEP 1: Create temporary tables for imported data
-- ============================================================

-- Table for Contract-Management-System profiles
CREATE TEMP TABLE IF NOT EXISTS temp_contract_profiles (
    id UUID,
    user_id UUID,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    address JSONB,
    preferences JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

-- Table for business-services-hub profiles
CREATE TEMP TABLE IF NOT EXISTS temp_services_profiles (
    id UUID,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    country TEXT,
    company_id UUID,
    is_verified BOOLEAN,
    role TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

-- Table for mapping old IDs to new IDs (if UUIDs conflict)
CREATE TEMP TABLE IF NOT EXISTS temp_profile_id_mapping (
    old_id UUID,
    new_id UUID,
    source TEXT -- 'contract' or 'services'
);

-- ============================================================
-- STEP 2: Load data into temporary tables
-- ============================================================
-- NOTE: Replace with your actual data source
-- Option A: Copy from CSV file uploaded to Supabase Storage
-- Option B: Insert directly if you have the data

-- Example: Load from CSV (uncomment and modify path)
/*
COPY temp_contract_profiles FROM '/path/to/contract-profiles.csv' WITH CSV HEADER;
COPY temp_services_profiles FROM '/path/to/services-profiles.csv' WITH CSV HEADER;
*/

-- Example: Direct INSERT (replace with your actual data)
/*
INSERT INTO temp_contract_profiles VALUES
    ('uuid1', 'uuid1', 'user1@example.com', 'User One', NULL, '+1234567890', NULL, '{}', NOW(), NOW()),
    -- ... more rows
;

INSERT INTO temp_services_profiles VALUES
    ('uuid2', 'user2@example.com', 'User Two', '+1234567891', 'US', NULL, false, 'client', NOW(), NOW()),
    -- ... more rows
;
*/

-- ============================================================
-- STEP 3: Import Contract-Management-System profiles
-- ============================================================

DO $$
DECLARE
    v_profile_record RECORD;
    v_new_id UUID;
    v_existing_id UUID;
BEGIN
    FOR v_profile_record IN 
        SELECT * FROM temp_contract_profiles
    LOOP
        -- Check if profile already exists (by email)
        SELECT id INTO v_existing_id
        FROM profiles
        WHERE email = v_profile_record.email;
        
        IF v_existing_id IS NULL THEN
            -- Check if auth user exists
            IF EXISTS (SELECT 1 FROM auth.users WHERE id = COALESCE(v_profile_record.user_id, v_profile_record.id)) THEN
                -- Use existing auth user ID
                v_new_id := COALESCE(v_profile_record.user_id, v_profile_record.id);
            ELSE
                -- Generate new UUID (will need to create auth user later)
                v_new_id := gen_random_uuid();
            END IF;
            
            -- Insert profile
            INSERT INTO profiles (
                id,
                email,
                full_name,
                name,
                phone,
                address,
                preferences,
                role,
                status,
                created_at,
                updated_at
            ) VALUES (
                v_new_id,
                v_profile_record.email,
                v_profile_record.full_name,
                v_profile_record.full_name,
                v_profile_record.phone,
                v_profile_record.address,
                COALESCE(v_profile_record.preferences, '{}'::jsonb),
                'client', -- Default, will be updated by RBAC later
                'active',
                COALESCE(v_profile_record.created_at, NOW()),
                COALESCE(v_profile_record.updated_at, NOW())
            )
            ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                full_name = EXCLUDED.full_name,
                phone = EXCLUDED.phone,
                address = EXCLUDED.address,
                preferences = EXCLUDED.preferences;
            
            -- Store ID mapping
            INSERT INTO temp_profile_id_mapping (old_id, new_id, source)
            VALUES (v_profile_record.id, v_new_id, 'contract')
            ON CONFLICT DO NOTHING;
        ELSE
            -- Update existing profile with contract system data
            UPDATE profiles SET
                full_name = COALESCE(profiles.full_name, v_profile_record.full_name),
                phone = COALESCE(profiles.phone, v_profile_record.phone),
                address = COALESCE(profiles.address, v_profile_record.address),
                preferences = COALESCE(profiles.preferences, '{}'::jsonb) || COALESCE(v_profile_record.preferences, '{}'::jsonb),
                updated_at = GREATEST(profiles.updated_at, COALESCE(v_profile_record.updated_at, NOW()))
            WHERE id = v_existing_id;
            
            -- Store ID mapping
            INSERT INTO temp_profile_id_mapping (old_id, new_id, source)
            VALUES (v_profile_record.id, v_existing_id, 'contract')
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Imported % profiles from Contract-Management-System', (SELECT COUNT(*) FROM temp_profile_id_mapping WHERE source = 'contract');
END $$;

-- ============================================================
-- STEP 4: Import business-services-hub profiles
-- ============================================================

DO $$
DECLARE
    v_profile_record RECORD;
    v_new_id UUID;
    v_existing_id UUID;
    v_mapped_company_id UUID;
BEGIN
    FOR v_profile_record IN 
        SELECT * FROM temp_services_profiles
    LOOP
        -- Check if profile already exists (by email)
        SELECT id INTO v_existing_id
        FROM profiles
        WHERE email = v_profile_record.email;
        
        -- Map company_id if exists (assumes companies imported first)
        IF v_profile_record.company_id IS NOT NULL THEN
            -- Check if company was imported (you may need a company mapping table)
            SELECT id INTO v_mapped_company_id
            FROM companies
            WHERE id = v_profile_record.company_id;
            -- If not found, you may need to look up by name or other identifier
        END IF;
        
        IF v_existing_id IS NULL THEN
            -- Check if auth user exists
            IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_profile_record.id) THEN
                v_new_id := v_profile_record.id;
            ELSE
                -- Generate new UUID
                v_new_id := gen_random_uuid();
            END IF;
            
            -- Insert profile
            INSERT INTO profiles (
                id,
                email,
                full_name,
                name,
                phone,
                country,
                company_id,
                is_verified,
                role,
                status,
                created_at,
                updated_at
            ) VALUES (
                v_new_id,
                v_profile_record.email,
                v_profile_record.full_name,
                v_profile_record.full_name,
                v_profile_record.phone,
                v_profile_record.country,
                v_mapped_company_id,
                COALESCE(v_profile_record.is_verified, false),
                COALESCE(v_profile_record.role, 'client'),
                'active',
                COALESCE(v_profile_record.created_at, NOW()),
                COALESCE(v_profile_record.updated_at, NOW())
            )
            ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
                phone = COALESCE(profiles.phone, EXCLUDED.phone),
                country = COALESCE(profiles.country, EXCLUDED.country),
                company_id = COALESCE(profiles.company_id, EXCLUDED.company_id),
                is_verified = COALESCE(profiles.is_verified, EXCLUDED.is_verified),
                role = COALESCE(profiles.role, EXCLUDED.role);
            
            -- Store ID mapping
            INSERT INTO temp_profile_id_mapping (old_id, new_id, source)
            VALUES (v_profile_record.id, v_new_id, 'services')
            ON CONFLICT DO NOTHING;
        ELSE
            -- Update existing profile with services hub data
            UPDATE profiles SET
                full_name = COALESCE(profiles.full_name, v_profile_record.full_name),
                phone = COALESCE(profiles.phone, v_profile_record.phone),
                country = COALESCE(profiles.country, v_profile_record.country),
                company_id = COALESCE(profiles.company_id, v_mapped_company_id),
                is_verified = COALESCE(profiles.is_verified, v_profile_record.is_verified),
                role = COALESCE(profiles.role, v_profile_record.role),
                updated_at = GREATEST(profiles.updated_at, COALESCE(v_profile_record.updated_at, NOW()))
            WHERE id = v_existing_id;
            
            -- Store ID mapping
            INSERT INTO temp_profile_id_mapping (old_id, new_id, source)
            VALUES (v_profile_record.id, v_existing_id, 'services')
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Imported % profiles from business-services-hub', (SELECT COUNT(*) FROM temp_profile_id_mapping WHERE source = 'services');
END $$;

-- ============================================================
-- STEP 5: Show import summary
-- ============================================================

SELECT 
    '=== IMPORT SUMMARY ===' AS section;

SELECT 
    'Total Profiles Imported' AS metric,
    COUNT(*) AS count
FROM profiles;

SELECT 
    'Profiles by Source' AS metric,
    source AS source_system,
    COUNT(*) AS count
FROM temp_profile_id_mapping
GROUP BY source;

SELECT 
    'Profiles by Role' AS metric,
    COALESCE(role, 'NULL') AS role,
    COUNT(*) AS count
FROM profiles
GROUP BY role
ORDER BY count DESC;

-- Show ID mapping (for use in other imports)
SELECT 
    '=== ID MAPPING (for reference) ===' AS section,
    old_id,
    new_id,
    source
FROM temp_profile_id_mapping
ORDER BY source, old_id;

-- ============================================================
-- NOTES:
-- ============================================================
-- 1. The temp_profile_id_mapping table can be used in other
--    import scripts to map old foreign keys to new IDs
-- 2. If you need to persist the mapping, create a permanent table:
--    CREATE TABLE profile_id_mapping AS SELECT * FROM temp_profile_id_mapping;
-- 3. Remember to create auth.users before importing profiles
-- 4. Run SETUP_ROLES_FROM_SUPABASE.sql after importing to assign RBAC roles

