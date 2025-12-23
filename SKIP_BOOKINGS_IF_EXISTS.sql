-- Alternative approach: Skip bookings table DDL entirely if table already exists with provider_id
-- Run this BEFORE the main migration to check if we should skip bookings section

DO $$
DECLARE
    bookings_exists BOOLEAN;
    provider_id_exists BOOLEAN;
BEGIN
    -- Check if bookings table exists with provider_id
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'bookings'
    ) INTO bookings_exists;
    
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'bookings' 
        AND column_name = 'provider_id'
    ) INTO provider_id_exists;
    
    -- Store result in a temporary table for the main migration to check
    CREATE TEMP TABLE IF NOT EXISTS migration_state (
        key TEXT PRIMARY KEY,
        value BOOLEAN
    );
    
    INSERT INTO migration_state (key, value) 
    VALUES ('skip_bookings_ddl', bookings_exists AND provider_id_exists)
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
    
    -- Output result
    IF bookings_exists AND provider_id_exists THEN
        RAISE NOTICE 'Bookings table exists with provider_id - you can skip bookings DDL in main migration';
    ELSE
        RAISE NOTICE 'Bookings table needs to be created/modified - run full migration';
    END IF;
END $$;

-- Check the result
SELECT * FROM migration_state WHERE key = 'skip_bookings_ddl';

