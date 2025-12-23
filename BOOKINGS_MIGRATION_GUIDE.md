# Bookings Table Migration Guide

## Current Status

Based on your diagnostic query, the `bookings` table already exists with:
- ✅ `provider_id` column
- ✅ `provider_id` foreign key constraint to `profiles(id)`
- ✅ Other required columns

## Migration Strategy

The `UNIFIED_SCHEMA_MIGRATION.sql` script has been updated to handle this situation:

1. **CREATE TABLE IF NOT EXISTS** - Will skip if table exists
2. **Column additions** - All wrapped in conditional checks with EXECUTE
3. **Constraints/Indexes** - All check for column existence before creation
4. **RLS Policies** - Created conditionally using EXECUTE

## If You Get "column provider_id does not exist" Error

### Option 1: Skip Bookings Section (Recommended if table is correct)

If your bookings table already has the correct structure, you can comment out the bookings section:

**Lines to comment out:** Approximately lines 265-520 in `UNIFIED_SCHEMA_MIGRATION.sql`

Look for:
```sql
-- ============================================================
-- BOOKINGS TABLE (Merged from all three systems)
-- ============================================================
```

And comment everything until:
```sql
-- ============================================================
-- BOOKING EVENTS TABLE
-- ============================================================
```

### Option 2: Run Migration in Chunks

Run the migration section by section:

1. **First chunk:** Run up to but not including the bookings section
2. **Second chunk:** Skip bookings section entirely (since table exists)
3. **Third chunk:** Run everything after bookings section

### Option 3: Verify Table Structure First

Run this to verify your bookings table structure:

```sql
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'bookings'
ORDER BY ordinal_position;
```

If it has all required columns (`provider_id`, `provider_company_id`, `package_id`, etc.), you can safely skip the bookings section.

## Required Columns Checklist

The unified bookings table should have:
- ✅ `id` (UUID, PRIMARY KEY)
- ✅ `service_id` (UUID, FK to services)
- ✅ `client_id` (UUID, FK to profiles)
- ✅ `provider_id` (UUID, FK to profiles) - **YOU HAVE THIS**
- ⚠️ `provider_company_id` (UUID, FK to companies) - Check if you have this
- ⚠️ `package_id` (UUID, FK to service_packages) - Check if you have this
- ✅ `status` (booking_status_type enum)
- ✅ Other standard columns (scheduled_at, subtotal, etc.)

## Next Steps

1. **Verify structure** using the query above
2. **If structure is complete:** Comment out bookings section and continue with migration
3. **If structure is incomplete:** Run the full migration (it will add missing columns conditionally)

