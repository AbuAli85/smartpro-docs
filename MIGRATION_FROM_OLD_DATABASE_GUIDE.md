# Migration Guide: From Old Database to Unified Database

This guide helps you migrate data from your **OLD database** to the **NEW unified database** within the same Supabase account.

## 📋 **Understanding Your Setup**

- **OLD Database:** Your current database with the schema you showed (profiles, companies, services, bookings, etc.)
- **NEW Unified Database:** The unified schema from `UNIFIED_SCHEMA_MIGRATION.sql`

Both are in the **same Supabase account**, so we can migrate directly using SQL.

## 🚀 **Migration Steps**

### **Step 1: Prepare the New Unified Database**

1. **Run `UNIFIED_SCHEMA_MIGRATION.sql`** in your Supabase SQL Editor
   - This creates the unified schema structure
   - Safe to run multiple times (idempotent)

2. **Run `SEED_ROLES_AND_PERMISSIONS.sql`**
   - This creates RBAC roles and permissions
   - Required before assigning roles

### **Step 2: Run the Migration**

Run `MIGRATE_FROM_OLD_TO_UNIFIED.sql` which will:

1. ✅ **Migrate Profiles**
   - Maps old schema columns to new unified schema
   - Maps "promoter" → "provider"
   - Maps "user" → "client"
   - Handles status mapping

2. ✅ **Migrate Companies**
   - Migrates all companies
   - Generates slugs if missing
   - Merges duplicates

3. ✅ **Update Company References**
   - Updates `profiles.company_id` to point to migrated companies

4. ✅ **Migrate Services**
   - Maps old service columns to new unified schema
   - Handles different column name variations
   - Maps status to unified enum

5. ✅ **Migrate Bookings**
   - Migrates all bookings
   - Maps status to unified enum
   - Handles different column names

6. ✅ **Assign RBAC Roles**
   - Assigns roles based on `profiles.role` values
   - Maps admin → admin, provider → provider, client → client

7. ✅ **Refresh Materialized View**
   - Updates `user_permissions` view

8. ✅ **Show Verification Summary**

## 📊 **What Gets Migrated**

### **Profiles Mapping**

| Old Column | New Column | Notes |
|-----------|-----------|-------|
| `id` | `id` | Same |
| `email` | `email` | Same |
| `full_name` OR `first_name + last_name` | `full_name` | Merged |
| `phone` | `phone` | Same |
| `avatar_url` OR `profile_image_url` | `avatar_url` | Merged |
| `company_name` OR `company` | `company_name` | Merged |
| `role` (promoter→provider) | `role` | Mapped |
| `status` (pending→active) | `status` | Mapped to enum |

### **Companies Mapping**

| Old Column | New Column | Notes |
|-----------|-----------|-------|
| `id` | `id` | Same |
| `name` | `name` | Same |
| `slug` OR generated | `slug` | Generated if missing |
| `cr_number` | `cr_number` | Same |
| `vat_number` | `vat_number` | Same |
| `is_active` | `status` | Mapped |

### **Services Mapping**

| Old Column | New Column | Notes |
|-----------|-----------|-------|
| `id` | `id` | Same |
| `provider_id` | `provider_id` | Same |
| `company_id` | `provider_company_id` | Mapped |
| `title` OR `name` | `title` | Merged |
| `base_price` OR `price_base` OR `price` | `price` | Standardized |
| `currency` OR `price_currency` | `currency` | Standardized |
| `status` + `approval_status` | `status` | Mapped to enum |

### **Bookings Mapping**

| Old Column | New Column | Notes |
|-----------|-----------|-------|
| `id` | `id` | Same |
| `client_id` OR `user_id` | `client_id` | Merged |
| `provider_id` | `provider_id` | Same |
| `service_id` | `service_id` | Same |
| `status` | `status` | Mapped to enum |
| `scheduled_at` OR `scheduled_start` OR `start_time` | `scheduled_at` | Merged |

## ⚠️ **Important Notes**

### **Table Name Conflicts**

If your old tables have the **same names** as the unified tables (e.g., both have `profiles`), you have two options:

**Option 1: Rename Old Tables First (Recommended)**
```sql
-- Rename old tables
ALTER TABLE profiles RENAME TO profiles_old;
ALTER TABLE companies RENAME TO companies_old;
ALTER TABLE services RENAME TO services_old;
ALTER TABLE bookings RENAME TO bookings_old;

-- Then run MIGRATE_FROM_OLD_TO_UNIFIED.sql
-- (Update the script to use profiles_old, companies_old, etc.)
```

**Option 2: Use Different Schema**
```sql
-- Move old tables to a different schema
CREATE SCHEMA IF NOT EXISTS old_data;
ALTER TABLE profiles SET SCHEMA old_data;
-- Then update migration script to use old_data.profiles
```

### **Data Safety**

- ✅ Script uses `ON CONFLICT DO UPDATE` - safe to run multiple times
- ✅ Uses `NOT EXISTS` checks - won't duplicate data
- ⚠️ **Backup your database first!**

### **Column Name Variations**

The script handles common column name variations:
- `first_name + last_name` → `full_name`
- `profile_image_url` → `avatar_url`
- `company` → `company_name`
- `price_base` / `base_price` → `price`
- `user_id` → `client_id` (for bookings)

## 🔍 **Verification**

After migration, run `VERIFY_MIGRATION.sql` to check:
- Data counts
- Foreign key integrity
- Missing data
- RBAC assignments

## 📋 **Migration Checklist**

- [ ] Run `UNIFIED_SCHEMA_MIGRATION.sql` (create unified schema)
- [ ] Run `SEED_ROLES_AND_PERMISSIONS.sql` (create RBAC)
- [ ] Backup database
- [ ] Rename old tables if needed (to avoid conflicts)
- [ ] Run `MIGRATE_FROM_OLD_TO_UNIFIED.sql`
- [ ] Run `VERIFY_MIGRATION.sql`
- [ ] Test application
- [ ] Archive/remove old tables (optional)

## 🆘 **Troubleshooting**

### **"relation does not exist"**

**Solution:** 
- Check if unified schema exists (run `UNIFIED_SCHEMA_MIGRATION.sql`)
- Check if old tables exist
- Verify table names match

### **"duplicate key violation"**

**Solution:**
- Script uses `ON CONFLICT DO UPDATE` - should handle this
- If still errors, check for actual duplicates in source data

### **"column does not exist"**

**Solution:**
- Check which columns exist in old tables
- Adjust migration script to match your actual column names
- Use `COALESCE` for optional columns

### **"No data migrated"**

**Solution:**
- Check if old tables have data: `SELECT COUNT(*) FROM profiles;`
- Verify `NOT EXISTS` conditions aren't too restrictive
- Check for errors in DO blocks (check Supabase logs)

## 🎯 **Expected Results**

After migration, you should have:
- ✅ **25 profiles** migrated (10 clients, 10 providers, 5 admins)
- ✅ **All companies** migrated
- ✅ **All services** migrated
- ✅ **All bookings** migrated
- ✅ **RBAC roles assigned** to all users

## ✅ **You're Done!**

After running the migration script, your data will be in the unified database with RBAC roles assigned! 🎉

