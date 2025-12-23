-- Add company_id and consultation_submission_id columns to profiles table
-- Run this AFTER running UNIFIED_SCHEMA_MIGRATION.sql

-- Add company_id column to profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'company_id'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN company_id UUID;
        RAISE NOTICE 'Added company_id column to profiles table';
    ELSE
        RAISE NOTICE 'company_id column already exists in profiles table';
    END IF;
END $$;

-- Add foreign key constraint for company_id
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'companies'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'company_id'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_schema = 'public'
        AND constraint_name = 'profiles_company_id_fkey'
    ) THEN
        ALTER TABLE public.profiles 
            ADD CONSTRAINT profiles_company_id_fkey 
            FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE SET NULL;
        RAISE NOTICE 'Added foreign key constraint for company_id';
    END IF;
END $$;

-- Create index on company_id
CREATE INDEX IF NOT EXISTS idx_profiles_company_id ON public.profiles(company_id);

-- Add consultation_submission_id column to profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'consultation_submission_id'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN consultation_submission_id TEXT;
        RAISE NOTICE 'Added consultation_submission_id column to profiles table';
    ELSE
        RAISE NOTICE 'consultation_submission_id column already exists in profiles table';
    END IF;
END $$;

