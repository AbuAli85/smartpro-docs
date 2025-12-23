# Data Migration Quick Start Guide

A step-by-step guide to migrate data from your old databases to the unified SmartPro schema.

## 🚀 **Quick Start (5 Steps)**

### **Step 1: Export Data from Old Databases**

Export your data from both systems as CSV files.

#### **Option A: Using Supabase Dashboard**

1. Open **Contract-Management-System** Supabase project
2. Go to **Table Editor**
3. For each table, click **Export** → **CSV**
4. Save files: `contract-profiles.csv`, `contract-companies.csv`, etc.

5. Repeat for **business-services-hub** project
6. Save files: `services-profiles.csv`, `services-companies.csv`, etc.

#### **Option B: Using SQL (Recommended for Large Datasets)**

```sql
-- Run in Contract-Management-System Supabase SQL Editor
COPY (SELECT * FROM profiles) TO STDOUT WITH CSV HEADER;

-- Copy output to file: contract-profiles.csv
```

### **Step 2: Prepare CSV Files**

1. **Organize files:**
   ```
   migrations/
   ├── contract-profiles.csv
   ├── contract-companies.csv
   ├── contract-services.csv
   ├── services-profiles.csv
   ├── services-companies.csv
   └── services-services.csv
   ```

2. **Upload to Supabase Storage (Optional):**
   - Go to **Storage** → **Create bucket** → `migration-data`
   - Upload CSV files
   - Note the file paths

### **Step 3: Modify Import Scripts**

Open each import script and update the data loading section:

#### **For IMPORT_PROFILES.sql:**

```sql
-- Option A: Load from CSV file path
COPY temp_contract_profiles FROM '/path/to/contract-profiles.csv' WITH CSV HEADER;

-- Option B: Load from Supabase Storage
-- (Use Supabase Storage API or download first)

-- Option C: Direct INSERT (for small datasets)
INSERT INTO temp_contract_profiles VALUES
    ('uuid1', 'uuid1', 'user1@example.com', 'User One', ...),
    -- ... more rows
;
```

### **Step 4: Run Import Scripts in Order**

Open your **unified SmartPro Supabase SQL Editor** and run:

1. ✅ **`IMPORT_PROFILES.sql`**
   - Imports users from both systems
   - Creates ID mappings for foreign keys

2. ✅ **`IMPORT_COMPANIES.sql`**
   - Imports companies from both systems
   - Merges duplicates by name/slug

3. ✅ **`IMPORT_SERVICES.sql`**
   - Imports services
   - Maps old foreign keys to new IDs

4. ✅ **`VERIFY_MIGRATION.sql`**
   - Checks for data integrity issues
   - Shows migration statistics

5. ✅ **`SETUP_ROLES_FROM_SUPABASE.sql`**
   - Assigns RBAC roles to users

### **Step 5: Verify and Fix**

After running `VERIFY_MIGRATION.sql`, check for:

- ❌ **Foreign key violations** - Fix ID mappings
- ❌ **Duplicate emails** - Merge duplicate profiles
- ❌ **Missing required fields** - Add defaults or fix data
- ❌ **Profiles without auth users** - Create auth users first

## 📋 **Detailed Workflow**

### **Phase 1: Preparation**

1. **Review data mapping tables** in `DATA_MIGRATION_GUIDE.md`
2. **Export data** from both old databases
3. **Review CSV files** for data quality
4. **Backup your unified database** (important!)

### **Phase 2: Import Core Data**

1. **Import Profiles** (`IMPORT_PROFILES.sql`)
   - Creates user profiles
   - Handles email duplicates
   - Creates ID mapping table

2. **Import Companies** (`IMPORT_COMPANIES.sql`)
   - Creates companies
   - Merges duplicates
   - Creates ID mapping table

3. **Import Services** (`IMPORT_SERVICES.sql`)
   - Uses ID mappings from previous imports
   - Maps old foreign keys to new IDs

### **Phase 3: Import Related Data**

Create additional import scripts for:
- Bookings
- Contracts
- Messages
- Reviews
- Invoices
- Payments
- RBAC data (roles, permissions, assignments)

### **Phase 4: Verification**

1. **Run `VERIFY_MIGRATION.sql`**
2. **Review all checks:**
   - Data counts
   - Foreign key integrity
   - Duplicate detection
   - Data completeness
   - Role assignments

3. **Fix issues** found in verification

### **Phase 5: Final Setup**

1. **Assign RBAC roles** (`SETUP_ROLES_FROM_SUPABASE.sql`)
2. **Test application** with migrated data
3. **Update application code** if needed

## 🔧 **Troubleshooting**

### **Error: "column does not exist"**

**Solution:** Check CSV column names match temporary table columns exactly.

### **Error: "foreign key constraint violation"**

**Solution:** 
1. Import tables in dependency order (profiles → companies → services)
2. Check ID mapping tables
3. Verify foreign keys exist in target tables

### **Error: "duplicate key violation"**

**Solution:**
- Scripts use `ON CONFLICT DO NOTHING/UPDATE` - safe to re-run
- Check for actual duplicates in source data

### **Error: "invalid UUID format"**

**Solution:**
- Verify UUID format in CSV files
- Use `gen_random_uuid()` for new UUIDs if needed

### **"No users found" after import**

**Solution:**
- Check CSV file loaded correctly
- Verify data in temp tables: `SELECT * FROM temp_contract_profiles;`
- Check for errors in DO blocks (check Supabase logs)

## 📊 **Migration Checklist**

Use this checklist to track your progress:

- [ ] Exported data from Contract-Management-System
- [ ] Exported data from business-services-hub
- [ ] Reviewed CSV files for data quality
- [ ] Backed up unified database
- [ ] Modified import scripts with actual data paths
- [ ] Ran `IMPORT_PROFILES.sql`
- [ ] Ran `IMPORT_COMPANIES.sql`
- [ ] Ran `IMPORT_SERVICES.sql`
- [ ] Created/ran additional import scripts (bookings, etc.)
- [ ] Ran `VERIFY_MIGRATION.sql`
- [ ] Fixed all verification issues
- [ ] Ran `SETUP_ROLES_FROM_SUPABASE.sql`
- [ ] Tested application with migrated data
- [ ] Updated application code if needed

## 🎯 **Next Steps**

After migration:

1. ✅ Test all application features
2. ✅ Verify user authentication works
3. ✅ Check RBAC permissions
4. ✅ Test booking/service creation
5. ✅ Monitor for any data-related errors

## 📚 **Related Files**

- `DATA_MIGRATION_GUIDE.md` - Comprehensive migration guide
- `IMPORT_PROFILES.sql` - Import user profiles
- `IMPORT_COMPANIES.sql` - Import companies
- `IMPORT_SERVICES.sql` - Import services
- `VERIFY_MIGRATION.sql` - Verify migrated data
- `RUN_DATA_MIGRATION.sql` - Master migration script

## 🆘 **Need Help?**

If you encounter issues:
1. Check error messages carefully
2. Review `VERIFY_MIGRATION.sql` output
3. Check Supabase logs for detailed errors
4. Review data mapping tables in `DATA_MIGRATION_GUIDE.md`

