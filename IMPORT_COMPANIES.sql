-- ============================================================
-- IMPORT COMPANIES FROM OLD DATABASES
-- ============================================================
-- This script imports companies from Contract-Management-System
-- and business-services-hub into the unified schema.
-- ============================================================

-- ============================================================
-- STEP 1: Create temporary tables
-- ============================================================

CREATE TEMP TABLE IF NOT EXISTS temp_contract_companies (
    id UUID,
    name TEXT,
    slug TEXT,
    description TEXT,
    logo_url TEXT,
    website TEXT,
    email TEXT,
    phone TEXT,
    address JSONB,
    settings JSONB,
    is_active BOOLEAN,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

CREATE TEMP TABLE IF NOT EXISTS temp_services_companies (
    id UUID,
    owner_id UUID,
    name TEXT,
    cr_number TEXT,
    vat_number TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ
);

CREATE TEMP TABLE IF NOT EXISTS temp_company_id_mapping (
    old_id UUID,
    new_id UUID,
    source TEXT
);

-- ============================================================
-- STEP 2: Load data (replace with your actual data source)
-- ============================================================

-- Example: Load from CSV
/*
COPY temp_contract_companies FROM '/path/to/contract-companies.csv' WITH CSV HEADER;
COPY temp_services_companies FROM '/path/to/services-companies.csv' WITH CSV HEADER;
*/

-- ============================================================
-- STEP 3: Import Contract-Management-System companies
-- ============================================================

DO $$
DECLARE
    v_company_record RECORD;
    v_new_id UUID;
    v_existing_id UUID;
BEGIN
    FOR v_company_record IN 
        SELECT * FROM temp_contract_companies
    LOOP
        -- Check if company exists (by slug or name)
        SELECT id INTO v_existing_id
        FROM companies
        WHERE slug = v_company_record.slug
           OR name = v_company_record.name;
        
        IF v_existing_id IS NULL THEN
            v_new_id := v_company_record.id;
            
            -- Insert company
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
                status,
                created_at,
                updated_at
            ) VALUES (
                v_new_id,
                v_company_record.name,
                v_company_record.slug,
                v_company_record.description,
                v_company_record.logo_url,
                v_company_record.website,
                v_company_record.email,
                v_company_record.phone,
                v_company_record.address,
                CASE WHEN COALESCE(v_company_record.is_active, true) THEN 'active' ELSE 'inactive' END,
                COALESCE(v_company_record.created_at, NOW()),
                COALESCE(v_company_record.updated_at, NOW())
            )
            ON CONFLICT (slug) DO UPDATE SET
                name = EXCLUDED.name,
                description = EXCLUDED.description,
                logo_url = EXCLUDED.logo_url,
                website = EXCLUDED.website,
                email = EXCLUDED.email,
                phone = EXCLUDED.phone,
                address = EXCLUDED.address;
            
            -- Store ID mapping
            INSERT INTO temp_company_id_mapping (old_id, new_id, source)
            VALUES (v_company_record.id, v_new_id, 'contract')
            ON CONFLICT DO NOTHING;
        ELSE
            -- Update existing company
            UPDATE companies SET
                description = COALESCE(companies.description, v_company_record.description),
                logo_url = COALESCE(companies.logo_url, v_company_record.logo_url),
                website = COALESCE(companies.website, v_company_record.website),
                email = COALESCE(companies.email, v_company_record.email),
                phone = COALESCE(companies.phone, v_company_record.phone),
                address = COALESCE(companies.address, v_company_record.address),
                updated_at = GREATEST(companies.updated_at, COALESCE(v_company_record.updated_at, NOW()))
            WHERE id = v_existing_id;
            
            -- Store ID mapping
            INSERT INTO temp_company_id_mapping (old_id, new_id, source)
            VALUES (v_company_record.id, v_existing_id, 'contract')
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Imported % companies from Contract-Management-System', (SELECT COUNT(*) FROM temp_company_id_mapping WHERE source = 'contract');
END $$;

-- ============================================================
-- STEP 4: Import business-services-hub companies
-- ============================================================

DO $$
DECLARE
    v_company_record RECORD;
    v_new_id UUID;
    v_existing_id UUID;
    v_slug TEXT;
BEGIN
    FOR v_company_record IN 
        SELECT * FROM temp_services_companies
    LOOP
        -- Generate slug from name
        v_slug := LOWER(REGEXP_REPLACE(v_company_record.name, '[^a-zA-Z0-9]+', '-', 'g'));
        
        -- Check if company exists
        SELECT id INTO v_existing_id
        FROM companies
        WHERE slug = v_slug
           OR name = v_company_record.name;
        
        IF v_existing_id IS NULL THEN
            v_new_id := v_company_record.id;
            
            -- Insert company
            INSERT INTO companies (
                id,
                name,
                slug,
                logo_url,
                cr_number,
                vat_number,
                status,
                created_at
            ) VALUES (
                v_new_id,
                v_company_record.name,
                v_slug,
                v_company_record.logo_url,
                v_company_record.cr_number,
                v_company_record.vat_number,
                'active',
                COALESCE(v_company_record.created_at, NOW())
            )
            ON CONFLICT (slug) DO UPDATE SET
                name = EXCLUDED.name,
                logo_url = COALESCE(companies.logo_url, EXCLUDED.logo_url),
                cr_number = COALESCE(companies.cr_number, EXCLUDED.cr_number),
                vat_number = COALESCE(companies.vat_number, EXCLUDED.vat_number);
            
            -- Store ID mapping
            INSERT INTO temp_company_id_mapping (old_id, new_id, source)
            VALUES (v_company_record.id, v_new_id, 'services')
            ON CONFLICT DO NOTHING;
        ELSE
            -- Update existing company
            UPDATE companies SET
                logo_url = COALESCE(companies.logo_url, v_company_record.logo_url),
                cr_number = COALESCE(companies.cr_number, v_company_record.cr_number),
                vat_number = COALESCE(companies.vat_number, v_company_record.vat_number)
            WHERE id = v_existing_id;
            
            -- Store ID mapping
            INSERT INTO temp_company_id_mapping (old_id, new_id, source)
            VALUES (v_company_record.id, v_existing_id, 'services')
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Imported % companies from business-services-hub', (SELECT COUNT(*) FROM temp_company_id_mapping WHERE source = 'services');
END $$;

-- ============================================================
-- STEP 5: Show import summary
-- ============================================================

SELECT 
    '=== COMPANIES IMPORT SUMMARY ===' AS section;

SELECT 
    'Total Companies' AS metric,
    COUNT(*) AS count
FROM companies;

SELECT 
    'Companies by Source' AS metric,
    source AS source_system,
    COUNT(*) AS count
FROM temp_company_id_mapping
GROUP BY source;

-- Show ID mapping
SELECT 
    '=== COMPANY ID MAPPING ===' AS section,
    old_id,
    new_id,
    source
FROM temp_company_id_mapping
ORDER BY source, old_id;

