# ✅ Migration Ready - Your Table Structure Confirmed

Based on your diagnostic check, your table structure is:

## 📊 **Your Table Structure**

| Table | Column | Status |
|-------|--------|--------|
| `services` | `provider_company_id` | ❌ MISSING |
| `services` | `company_id` | ✅ EXISTS |
| `bookings` | `provider_company_id` | ✅ EXISTS |
| `bookings` | `package_id` | ✅ EXISTS |

## ✅ **Ready to Export**

I've created **`EXPORT_FROM_OLD_PROJECT_FINAL.sql`** which uses the correct columns:

- ✅ Uses `services.company_id` (maps to `provider_company_id` in unified schema)
- ✅ Uses `bookings.provider_company_id` (already correct)
- ✅ Uses `bookings.package_id` (already correct)

## 🚀 **Next Steps**

### **Step 1: Export from OLD Project**

Run **`EXPORT_FROM_OLD_PROJECT_FINAL.sql`** in your **OLD Supabase project**:

1. Open OLD Supabase project SQL Editor
2. Run the script
3. Copy results for each table:
   - Profiles export
   - Companies export
   - Services export (uses `company_id` ✅)
   - Bookings export (uses `provider_company_id` ✅)
4. Save as CSV files or copy the data

### **Step 2: Prepare NEW Unified Project**

In your **NEW unified Supabase project**, run:

1. `UNIFIED_SCHEMA_MIGRATION.sql` (create unified schema)
2. `SEED_ROLES_AND_PERMISSIONS.sql` (create RBAC)

### **Step 3: Import to NEW Project**

**Option A: Using Python Script (Easiest)**

1. Create `.env` file:
   ```env
   OLD_PROJECT_DB_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
   NEW_PROJECT_DB_URL=postgresql://postgres:password@db.yyyyy.supabase.co:5432/postgres
   ```

2. Run:
   ```bash
   python migrate_between_projects.py
   ```

**Option B: Using SQL Import**

1. Modify `IMPORT_TO_NEW_PROJECT.sql` with your exported data
2. Run in NEW unified project

**Option C: Using Supabase Dashboard**

1. Export CSV from OLD project (Table Editor → Export)
2. Import CSV to NEW project (Table Editor → Import)

## ✅ **What Will Be Migrated**

- ✅ **25 Profiles** (promoter → provider mapping)
- ✅ **All Companies**
- ✅ **All Services** (using `company_id` → `provider_company_id`)
- ✅ **All Bookings** (using existing `provider_company_id` and `package_id`)
- ✅ **RBAC Roles** assigned automatically

## 🎯 **You're All Set!**

The export script is now configured correctly for your table structure. Run `EXPORT_FROM_OLD_PROJECT_FINAL.sql` and you're good to go! 🚀

