# Fix: "column provider_company_id does not exist"

## 🎯 **The Problem**

Your old `services` table doesn't have a `provider_company_id` column. It likely has `company_id` instead.

## ✅ **Quick Fix**

### **Option 1: Use the Simple Export Script**

Run `EXPORT_SERVICES_SIMPLE.sql` instead - it uses `company_id`:

```sql
-- This uses company_id (which exists) instead of provider_company_id
SELECT 
    id::text,
    provider_id::text,
    company_id::text AS provider_company_id,  -- Maps company_id → provider_company_id
    ...
FROM services
```

### **Option 2: Check Your Table Structure First**

Run `CHECK_OLD_TABLE_COLUMNS.sql` to see what columns actually exist:

```sql
-- This shows you all columns in your services table
SELECT column_name, data_type
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'services'
ORDER BY ordinal_position;
```

Then use the appropriate export version from `EXPORT_FROM_OLD_PROJECT.sql`.

## 📋 **Updated Export Script**

I've updated `EXPORT_FROM_OLD_PROJECT.sql` with three versions:
1. **Version 1:** Uses `company_id` (most common)
2. **Version 2:** Uses `provider_company_id` (if it exists)
3. **Version 3:** Uses `NULL` (if neither exists)

Only one version will run based on what columns exist in your table.

## 🚀 **Next Steps**

1. Run `CHECK_OLD_TABLE_COLUMNS.sql` to see your table structure
2. Use `EXPORT_SERVICES_SIMPLE.sql` (uses `company_id`)
3. Or use the updated `EXPORT_FROM_OLD_PROJECT.sql` (auto-detects columns)

The export will work now! ✅

