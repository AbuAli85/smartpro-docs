-- Diagnostic script to find where provider_id error occurs
-- Run this in Supabase SQL Editor section by section to find the failing statement

-- Section 1: Check if bookings table exists with provider_id
SELECT 
    'bookings table exists' AS check_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'bookings')
        THEN 'YES'
        ELSE 'NO'
    END AS result;

SELECT 
    'provider_id column exists' AS check_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'provider_id')
        THEN 'YES'
        ELSE 'NO'
    END AS result;

-- Section 2: Try the CREATE TABLE statement (should skip if table exists)
-- Uncomment and run this to test:
/*
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL,
    package_id UUID,
    client_id UUID NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
*/

-- Section 3: Try adding provider_id column conditionally
-- Uncomment and run this to test:
/*
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'provider_id') THEN
        EXECUTE 'ALTER TABLE public.bookings ADD COLUMN provider_id UUID';
    END IF;
END $$;
*/

-- Section 4: Try creating index conditionally
-- Uncomment and run this to test:
/*
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'bookings' AND column_name = 'provider_id') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_bookings_provider_id ON public.bookings(provider_id)';
    END IF;
END $$;
*/

