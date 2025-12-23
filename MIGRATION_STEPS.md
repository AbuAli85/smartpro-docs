# Migration Steps for Your Database

Based on your database structure, here's the step-by-step migration process.

## 📋 **Your Database Structure**

From your table list, I can see you have:
- ✅ `profiles` table
- ✅ `companies` table  
- ✅ `bookings` table
- ❓ `services` table (need to check)
- Plus many enterprise features (contracts, documents, etc.)

## 🚀 **Migration Steps**

### **Step 1: Check Your Tables**

Run `CHECK_TABLES.sql` first to see:
- Which core tables exist
- Their column structure
- Record counts
- Any duplicates

This helps us understand what needs to be migrated.

### **Step 2: Ensure Unified Schema Exists**

Make sure you've run `UNIFIED_SCHEMA_MIGRATION.sql` first to create the unified schema tables.

If you haven't:
1. Run `UNIFIED_SCHEMA_MIGRATION.sql` in your Supabase SQL Editor
2. This creates the unified schema structure

### **Step 3: Run Migration**

Run `MIGRATE_YOUR_DATABASE.sql` which will:
1. ✅ Check if unified tables exist
2. ✅ Migrate profiles (users)
3. ✅ Migrate companies
4. ✅ Migrate services (if exists)
5. ✅ Migrate bookings
6. ✅ Update foreign key references
7. ✅ Show migration summary

### **Step 4: Verify Migration**

Run `VERIFY_MIGRATION.sql` to check:
- Data counts
- Foreign key integrity
- Duplicate detection
- Missing data

### **Step 5: Assign RBAC Roles**

Run `SETUP_ROLES_FROM_SUPABASE.sql` to:
- Assign roles based on existing data
- Set up RBAC permissions

## ⚠️ **Important Notes**

### **If Tables Share the Same Name**

If your current `profiles`, `companies`, etc. tables ARE the unified tables:
- The migration script uses `NOT EXISTS` checks
- It won't duplicate data
- Safe to run multiple times

### **If You Need to Keep Old Tables**

If you want to keep the original tables:
1. **Option A:** Rename old tables first:
   ```sql
   ALTER TABLE profiles RENAME TO profiles_old;
   ALTER TABLE companies RENAME TO companies_old;
   ```
2. **Option B:** Migrate to new tables with different names

### **Column Name Differences**

The migration script handles common column name variations:
- `user_id` vs `id` in profiles
- `name` vs `title` in services
- `price_base` vs `price` vs `base_price`
- `is_active` vs `status`

If your columns have different names, adjust the script accordingly.

## 🔍 **What Gets Migrated**

### **Core Tables:**
- ✅ **Profiles** - All users from both systems
- ✅ **Companies** - All companies
- ✅ **Services** - If service table exists
- ✅ **Bookings** - All bookings

### **Enterprise Features (Future):**
- ⏳ Contracts (if needed)
- ⏳ Documents (if needed)
- ⏳ Other enterprise tables (as needed)

## 📊 **Migration Order**

1. **Profiles** (users) - First, everything depends on this
2. **Companies** - Second, profiles may reference companies
3. **Services** - Third, needs profiles/companies
4. **Bookings** - Fourth, needs profiles/services

## ✅ **After Migration**

1. ✅ Verify data with `VERIFY_MIGRATION.sql`
2. ✅ Assign roles with `SETUP_ROLES_FROM_SUPABASE.sql`
3. ✅ Test your application
4. ✅ Update application code if needed

## 🆘 **Troubleshooting**

### **"Table does not exist"**

**Solution:** Run `UNIFIED_SCHEMA_MIGRATION.sql` first

### **"Column does not exist"**

**Solution:** 
1. Run `CHECK_TABLES.sql` to see actual column names
2. Adjust `MIGRATE_YOUR_DATABASE.sql` with correct column names

### **"Duplicate key violation"**

**Solution:** 
- Script uses `ON CONFLICT` - should handle this
- If still errors, check if you're migrating from/to the same table

### **"No data migrated"**

**Solution:**
- Check if source tables have data
- Verify `NOT EXISTS` conditions aren't too restrictive
- Check column names match

## 🎯 **Quick Start**

1. **Run:** `CHECK_TABLES.sql` (see what you have)
2. **Run:** `MIGRATE_YOUR_DATABASE.sql` (migrate data)
3. **Run:** `VERIFY_MIGRATION.sql` (verify everything)
4. **Run:** `SETUP_ROLES_FROM_SUPABASE.sql` (assign roles)

That's it! 🎉

