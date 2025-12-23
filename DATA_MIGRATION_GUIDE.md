# Data Migration Guide: Importing from Old Databases

This guide helps you migrate data from your existing databases (Contract-Management-System and business-services-hub) into the unified SmartPro Supabase schema.

## 📋 **Overview**

You have data in two existing systems:
1. **Contract-Management-System** - Supabase database with contracts, parties, RBAC, etc.
2. **business-services-hub** - Supabase database with services, bookings, reviews, etc.

**Goal:** Import all this data into your new unified SmartPro Supabase database.

---

## 🎯 **Migration Strategy**

### **Step 1: Export Data from Old Databases**
Export data from each system as CSV or SQL dumps.

### **Step 2: Transform and Map Data**
Map old schema fields to new unified schema fields.

### **Step 3: Import into Unified Database**
Import data using SQL scripts or Supabase import tools.

### **Step 4: Verify and Fix**
Verify data integrity and fix any issues.

---

## 📊 **Migration Steps**

### **Phase 1: Prepare Data Export**

#### **Option A: Export from Supabase (Recommended)**

1. **For Contract-Management-System:**
   ```sql
   -- Run in Contract-Management-System Supabase SQL Editor
   -- Export each table to CSV
   COPY (SELECT * FROM profiles) TO '/tmp/profiles.csv' WITH CSV HEADER;
   COPY (SELECT * FROM companies) TO '/tmp/companies.csv' WITH CSV HEADER;
   COPY (SELECT * FROM services) TO '/tmp/services.csv' WITH CSV HEADER;
   -- ... etc for each table
   ```

2. **For business-services-hub:**
   ```sql
   -- Run in business-services-hub Supabase SQL Editor
   COPY (SELECT * FROM profiles) TO '/tmp/profiles.csv' WITH CSV HEADER;
   COPY (SELECT * FROM services) TO '/tmp/services.csv' WITH CSV HEADER;
   -- ... etc for each table
   ```

#### **Option B: Use Supabase Dashboard**

1. Go to each Supabase project
2. Navigate to **Table Editor**
3. Export each table as CSV
4. Save files with descriptive names: `contract-system-profiles.csv`, `services-hub-profiles.csv`, etc.

#### **Option C: Use pg_dump (PostgreSQL)**

```bash
# Export Contract-Management-System
pg_dump -h [host] -U [user] -d [database] -t profiles -F csv -f contract-profiles.csv

# Export business-services-hub
pg_dump -h [host] -U [user] -d [database] -t profiles -F csv -f services-profiles.csv
```

---

### **Phase 2: Data Mapping**

Map fields from old schemas to new unified schema.

#### **Profiles Mapping**

| Old Field (Contract) | Old Field (Services) | New Unified Field | Notes |
|---------------------|---------------------|-------------------|-------|
| `id` | `id` | `id` | Use UUID, ensure no conflicts |
| `user_id` | (none) | `id` | Contract uses separate user_id |
| `email` | `email` | `email` | Must be unique |
| `full_name` | `full_name` | `full_name` | Merge both |
| `phone` | `phone` | `phone` | Merge both |
| `address` | (none) | `address` | JSONB from Contract |
| `preferences` | (none) | `preferences` | JSONB from Contract |
| (none) | `country` | `country` | From Services |
| (none) | `company_id` | `company_id` | From Services |
| (none) | `is_verified` | `is_verified` | From Services |
| (none) | `role` | `role` | Temporary until RBAC migration |

#### **Services Mapping**

| Old Field (Contract) | Old Field (Services) | New Unified Field | Notes |
|---------------------|---------------------|-------------------|-------|
| `id` | `id` | `id` | UUID |
| `company_id` | (none) | `provider_company_id` | Contract uses company |
| `name` | `title` | `title` | Rename name → title |
| `description` | `description` | `description` | Merge both |
| `category` | `category` | `category` | Merge both |
| `price_base` | `base_price` | `price` | Standardize |
| `price_currency` | `currency` | `currency` | Standardize |
| `status` | `status` | `status` | Map to unified enum |

#### **Companies Mapping**

| Old Field (Contract) | Old Field (Services) | New Unified Field | Notes |
|---------------------|---------------------|-------------------|-------|
| `id` | `id` | `id` | UUID |
| `name` | `name` | `name` | Merge |
| `slug` | (none) | `slug` | From Contract |
| `description` | (none) | `description` | From Contract |
| `website` | (none) | `website` | From Contract |
| (none) | `owner_id` | (track separately) | Note for later |
| (none) | `cr_number` | `cr_number` | From Services (Oman) |
| (none) | `vat_number` | `vat_number` | From Services (Oman) |

---

### **Phase 3: Import Scripts**

Use the provided SQL import scripts:

1. **`IMPORT_PROFILES.sql`** - Import profiles from both systems
2. **`IMPORT_COMPANIES.sql`** - Import companies
3. **`IMPORT_SERVICES.sql`** - Import services
4. **`IMPORT_BOOKINGS.sql`** - Import bookings
5. **`IMPORT_RBAC_DATA.sql`** - Import RBAC roles and permissions
6. **`IMPORT_OTHER_TABLES.sql`** - Import other tables

---

### **Phase 4: Data Deduplication**

After importing, identify and merge duplicates:

1. **Duplicate Users:** Same email from both systems
2. **Duplicate Companies:** Same name or slug
3. **Duplicate Services:** Similar titles from same provider

---

## 🔧 **Import Methods**

### **Method 1: CSV Import via SQL (Recommended)**

1. Upload CSV files to Supabase Storage
2. Use `IMPORT_FROM_CSV.sql` scripts
3. Run in Supabase SQL Editor

### **Method 2: Direct SQL INSERT**

1. Export data as SQL INSERT statements
2. Modify to match unified schema
3. Run in Supabase SQL Editor

### **Method 3: Supabase Import Tool**

1. Use Supabase Dashboard → Table Editor → Import
2. Upload CSV files
3. Map columns manually

### **Method 4: Python/Node.js Script**

1. Use provided migration scripts
2. Connect to both old and new databases
3. Transform and import data programmatically

---

## ⚠️ **Important Considerations**

### **1. UUID Conflicts**
- Old databases may have UUID conflicts
- Solution: Generate new UUIDs and maintain mapping table

### **2. Foreign Key References**
- Old IDs won't match new IDs after UUID regeneration
- Solution: Create ID mapping tables

### **3. Auth Users**
- Supabase Auth users must be created first
- Profiles reference `auth.users(id)`
- Solution: Create auth users, then profiles

### **4. Timestamps**
- Preserve original `created_at` and `updated_at`
- Use `created_at` from old data when importing

### **5. Data Validation**
- Validate data before import
- Check for required fields
- Handle NULL values appropriately

---

## 📝 **Migration Checklist**

- [ ] Export data from Contract-Management-System
- [ ] Export data from business-services-hub
- [ ] Review data mapping tables
- [ ] Create ID mapping tables (if needed)
- [ ] Import profiles (merge duplicates)
- [ ] Import companies (merge duplicates)
- [ ] Import services
- [ ] Import bookings
- [ ] Import RBAC data
- [ ] Import other tables (contracts, messages, reviews, etc.)
- [ ] Update foreign key references
- [ ] Verify data integrity
- [ ] Run role assignment script
- [ ] Test application with migrated data

---

## 🚀 **Quick Start**

1. **Export your data** (see Phase 1)
2. **Run import scripts** (see `IMPORT_*.sql` files)
3. **Verify migration** (see `VERIFY_MIGRATION.sql`)
4. **Assign roles** (run `SETUP_ROLES_FROM_SUPABASE.sql`)

---

## 📚 **Related Scripts**

- `IMPORT_PROFILES.sql` - Import profiles from both systems
- `IMPORT_COMPANIES.sql` - Import companies
- `IMPORT_SERVICES.sql` - Import services
- `IMPORT_BOOKINGS.sql` - Import bookings
- `VERIFY_MIGRATION.sql` - Verify migrated data
- `MERGE_DUPLICATES.sql` - Merge duplicate records

---

## 🆘 **Troubleshooting**

### **Error: Foreign key constraint violation**
- **Solution:** Import tables in dependency order (profiles → companies → services → bookings)

### **Error: Duplicate key violation**
- **Solution:** Use `ON CONFLICT DO UPDATE` or merge duplicates first

### **Error: Invalid UUID format**
- **Solution:** Check CSV format, ensure UUIDs are valid

### **Missing required fields**
- **Solution:** Add default values or NULL handling in import script

---

## 📞 **Need Help?**

If you encounter issues:
1. Check the error message
2. Review the data mapping table
3. Verify CSV format
4. Check foreign key relationships
5. Review the troubleshooting section

