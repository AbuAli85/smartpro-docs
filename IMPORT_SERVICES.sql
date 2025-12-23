-- ============================================================
-- IMPORT SERVICES FROM OLD DATABASES
-- ============================================================
-- This script imports services from Contract-Management-System
-- and business-services-hub into the unified schema.
--
-- IMPORTANT: Profiles and Companies must be imported first!
-- Use the ID mapping tables from previous imports.
-- ============================================================

-- ============================================================
-- STEP 1: Create temporary tables
-- ============================================================

CREATE TEMP TABLE IF NOT EXISTS temp_contract_services (
    id UUID,
    company_id UUID,
    name TEXT,
    description TEXT,
    category TEXT,
    price_base DECIMAL(10,2),
    price_currency TEXT,
    duration_minutes INTEGER,
    max_participants INTEGER,
    status TEXT,
    metadata JSONB,
    created_by UUID,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

CREATE TEMP TABLE IF NOT EXISTS temp_services_hub_services (
    id UUID,
    provider_id UUID,
    title TEXT,
    description TEXT,
    category TEXT,
    base_price DECIMAL(10,2),
    currency TEXT,
    estimated_duration TEXT,
    location TEXT,
    tags TEXT[],
    requirements TEXT,
    cover_image_url TEXT,
    status TEXT,
    approval_status TEXT,
    featured BOOLEAN,
    rating DECIMAL(3,2),
    review_count INTEGER,
    booking_count INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

-- Load ID mappings from previous imports (if using temp tables, they're session-specific)
-- You may need to create a permanent mapping table:
-- CREATE TABLE IF NOT EXISTS profile_id_mapping AS SELECT * FROM temp_profile_id_mapping;
-- CREATE TABLE IF NOT EXISTS company_id_mapping AS SELECT * FROM temp_company_id_mapping;

-- ============================================================
-- STEP 2: Load data (replace with your actual data source)
-- ============================================================

-- Example: Load from CSV
/*
COPY temp_contract_services FROM '/path/to/contract-services.csv' WITH CSV HEADER;
COPY temp_services_hub_services FROM '/path/to/services-hub-services.csv' WITH CSV HEADER;
*/

-- ============================================================
-- STEP 3: Import Contract-Management-System services
-- ============================================================

DO $$
DECLARE
    v_service_record RECORD;
    v_new_id UUID;
    v_mapped_company_id UUID;
    v_mapped_provider_id UUID;
    v_unified_status TEXT;
BEGIN
    FOR v_service_record IN 
        SELECT * FROM temp_contract_services
    LOOP
        v_new_id := v_service_record.id;
        
        -- Map company_id to new ID (if mapping exists)
        IF v_service_record.company_id IS NOT NULL THEN
            SELECT new_id INTO v_mapped_company_id
            FROM temp_company_id_mapping
            WHERE old_id = v_service_record.company_id;
            -- If not found, try direct lookup
            IF v_mapped_company_id IS NULL THEN
                SELECT id INTO v_mapped_company_id
                FROM companies
                WHERE id = v_service_record.company_id;
            END IF;
        END IF;
        
        -- Map created_by (provider) to new ID
        IF v_service_record.created_by IS NOT NULL THEN
            SELECT new_id INTO v_mapped_provider_id
            FROM temp_profile_id_mapping
            WHERE old_id = v_service_record.created_by;
            -- If not found, try direct lookup
            IF v_mapped_provider_id IS NULL THEN
                SELECT id INTO v_mapped_provider_id
                FROM profiles
                WHERE id = v_service_record.created_by;
            END IF;
        END IF;
        
        -- Map status to unified enum
        v_unified_status := CASE 
            WHEN v_service_record.status = 'active' THEN 'active'
            WHEN v_service_record.status = 'inactive' THEN 'inactive'
            WHEN v_service_record.status = 'draft' THEN 'draft'
            ELSE 'active'
        END;
        
        -- Insert service
        INSERT INTO services (
            id,
            provider_id,
            provider_company_id,
            title,
            description,
            category,
            price,
            currency,
            duration_minutes,
            max_participants,
            status,
            metadata,
            created_at,
            updated_at
        ) VALUES (
            v_new_id,
            v_mapped_provider_id,
            v_mapped_company_id,
            v_service_record.name, -- name → title
            v_service_record.description,
            v_service_record.category,
            v_service_record.price_base,
            COALESCE(v_service_record.price_currency, 'USD'),
            v_service_record.duration_minutes,
            v_service_record.max_participants,
            v_unified_status::service_status_type,
            COALESCE(v_service_record.metadata, '{}'::jsonb),
            COALESCE(v_service_record.created_at, NOW()),
            COALESCE(v_service_record.updated_at, NOW())
        )
        ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            category = EXCLUDED.category,
            price = EXCLUDED.price,
            currency = EXCLUDED.currency,
            status = EXCLUDED.status;
    END LOOP;
    
    RAISE NOTICE 'Imported % services from Contract-Management-System', (SELECT COUNT(*) FROM temp_contract_services);
END $$;

-- ============================================================
-- STEP 4: Import business-services-hub services
-- ============================================================

DO $$
DECLARE
    v_service_record RECORD;
    v_new_id UUID;
    v_mapped_provider_id UUID;
    v_unified_status TEXT;
    v_duration_minutes INTEGER;
BEGIN
    FOR v_service_record IN 
        SELECT * FROM temp_services_hub_services
    LOOP
        v_new_id := v_service_record.id;
        
        -- Map provider_id to new ID
        IF v_service_record.provider_id IS NOT NULL THEN
            SELECT new_id INTO v_mapped_provider_id
            FROM temp_profile_id_mapping
            WHERE old_id = v_service_record.provider_id;
            -- If not found, try direct lookup
            IF v_mapped_provider_id IS NULL THEN
                SELECT id INTO v_mapped_provider_id
                FROM profiles
                WHERE id = v_service_record.provider_id;
            END IF;
        END IF;
        
        -- Convert estimated_duration to minutes (if needed)
        -- Example: "2 hours" → 120, "30 minutes" → 30
        v_duration_minutes := NULL; -- Parse from estimated_duration if needed
        
        -- Map status to unified enum
        v_unified_status := CASE 
            WHEN v_service_record.status = 'active' AND COALESCE(v_service_record.approval_status, 'approved') = 'approved' THEN 'active'
            WHEN v_service_record.status = 'pending' OR v_service_record.approval_status = 'pending' THEN 'pending'
            WHEN v_service_record.status = 'inactive' THEN 'inactive'
            ELSE 'active'
        END;
        
        -- Insert service
        INSERT INTO services (
            id,
            provider_id,
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
        ) VALUES (
            v_new_id,
            v_mapped_provider_id,
            v_service_record.title,
            v_service_record.description,
            v_service_record.category,
            v_service_record.base_price,
            COALESCE(v_service_record.currency, 'USD'),
            v_service_record.location,
            v_service_record.tags,
            v_service_record.requirements,
            v_service_record.cover_image_url,
            COALESCE(v_service_record.featured, false),
            COALESCE(v_service_record.rating, 0),
            COALESCE(v_service_record.review_count, 0),
            COALESCE(v_service_record.booking_count, 0),
            v_unified_status::service_status_type,
            COALESCE(v_service_record.created_at, NOW()),
            COALESCE(v_service_record.updated_at, NOW())
        )
        ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            category = EXCLUDED.category,
            price = EXCLUDED.price,
            status = EXCLUDED.status;
    END LOOP;
    
    RAISE NOTICE 'Imported % services from business-services-hub', (SELECT COUNT(*) FROM temp_services_hub_services);
END $$;

-- ============================================================
-- STEP 5: Show import summary
-- ============================================================

SELECT 
    '=== SERVICES IMPORT SUMMARY ===' AS section;

SELECT 
    'Total Services' AS metric,
    COUNT(*) AS count
FROM services;

SELECT 
    'Services by Status' AS metric,
    status::TEXT AS status,
    COUNT(*) AS count
FROM services
GROUP BY status
ORDER BY count DESC;

SELECT 
    'Services by Category' AS metric,
    category,
    COUNT(*) AS count
FROM services
GROUP BY category
ORDER BY count DESC;

