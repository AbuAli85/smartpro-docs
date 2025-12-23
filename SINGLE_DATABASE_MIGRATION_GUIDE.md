# Single Database Migration Guide

Since both **Contract-Management-System** and **business-services-hub** are in the same Supabase database account, migration is much simpler! 🎉

## ✅ **Why This is Easier**

- ✅ **One database connection** - No need to connect to multiple databases
- ✅ **No data export/import** - Everything is already in the same database
- ✅ **Simpler queries** - Just SELECT from one database, INSERT into unified tables
- ✅ **Faster** - No network transfer between databases

---

## 🚀 **Quick Start**

### **Step 1: Check Your Current Tables**

First, let's see what tables you have in your database:

```sql
-- Check all tables in your database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

### **Step 2: Understand Your Table Structure**

Determine if:
- Both systems use the **same table names** (e.g., both have `profiles` table)
- Or they use **different table names** (e.g., `contract_profiles` vs `services_profiles`)
- Or they're in **different schemas**

Run this to check:

```sql
-- Check profiles table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;
```

### **Step 3: Run the Migration Script**

1. **Open your Supabase SQL Editor**
2. **Open `MIGRATE_FROM_SINGLE_DATABASE.sql`**
3. **Adjust the queries** based on your table structure:
   - If both systems use the same table: The script already handles this
   - If tables have different names: Uncomment and adjust the alternative queries
   - If in different schemas: Change `public.` to your schema name (e.g., `contract_schema.profiles`)

4. **Run the script**

---

## 📋 **Migration Steps**

### **Step 1: Migrate Profiles**

The script migrates profiles from both systems, merging duplicates by email.

**If both systems share the same `profiles` table:**
- The first INSERT statement handles everything
- It uses `ON CONFLICT` to merge duplicates

**If they're separate tables:**
- Uncomment the second INSERT statement
- Adjust table/schema names

### **Step 2: Migrate Companies**

Same approach - merges companies by slug or name.

### **Step 3: Update References**

Updates `profiles.company_id` to point to unified companies.

### **Step 4: Migrate Services**

Migrates services from both systems, preserving all fields.

### **Step 5: Migrate Bookings**

If you have bookings, they'll be migrated automatically.

---

## 🔧 **Customizing for Your Setup**

### **If Tables Have Different Names**

If Contract-Management-System uses `contract_profiles` and business-services-hub uses `services_profiles`:

```sql
-- Merge both profile tables
INSERT INTO profiles (id, email, full_name, ...)
SELECT id, email, full_name, ...
FROM contract_profiles
UNION ALL
SELECT id, email, full_name, ...
FROM services_profiles
ON CONFLICT (id) DO UPDATE SET ...;
```

### **If Tables Are in Different Schemas**

If Contract-Management-System is in `contract_schema` and business-services-hub is in `services_schema`:

```sql
-- From Contract-Management-System schema
INSERT INTO profiles (...)
SELECT ... FROM contract_schema.profiles
ON CONFLICT ...;

-- From business-services-hub schema  
INSERT INTO profiles (...)
SELECT ... FROM services_schema.profiles
ON CONFLICT ...;
```

### **If Tables Have Different Structures**

Check which columns exist in each table:

```sql
-- Check Contract-Management-System profiles
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
  AND table_schema = 'contract_schema'  -- Adjust if different
ORDER BY ordinal_position;

-- Check business-services-hub profiles (if separate)
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'services_schema'  -- Adjust if different
  AND table_name = 'profiles'
ORDER BY ordinal_position;
```

Then adjust the SELECT statements to only include columns that exist.

---

## ⚠️ **Important Considerations**

### **1. Table Names**

If both systems use the **same table names** (e.g., both have `profiles`), you might need to:
- Rename old tables first
- Or use a staging approach
- Or migrate to a new unified table directly

### **2. Data Conflicts**

The script uses `ON CONFLICT` to handle duplicates, but you should:
- **Review conflicts** - Check what data is being merged
- **Test first** - Run on a small subset first
- **Backup** - Always backup before migration

### **3. Foreign Keys**

After migration, verify foreign keys are correct:
- Profiles → Companies (company_id)
- Services → Profiles (provider_id)
- Services → Companies (provider_company_id)
- Bookings → Profiles, Services

---

## 🧪 **Testing Before Full Migration**

Test with a small subset first:

```sql
-- Test with 10 profiles
INSERT INTO profiles (...)
SELECT ... FROM profiles
LIMIT 10
ON CONFLICT (id) DO UPDATE SET ...;

-- Verify the result
SELECT * FROM profiles ORDER BY created_at DESC LIMIT 10;
```

---

## ✅ **After Migration**

1. **Verify Data:**
   ```sql
   -- Run VERIFY_MIGRATION.sql
   ```

2. **Assign RBAC Roles:**
   ```sql
   -- Run SETUP_ROLES_FROM_SUPABASE.sql
   ```

3. **Test Application:**
   - Log in with migrated users
   - Check services are visible
   - Verify bookings work

---

## 🆘 **Troubleshooting**

### **Error: "relation does not exist"**

**Solution:** 
- Check table names match exactly
- Verify schema name (default is `public`)
- Use `SELECT * FROM information_schema.tables` to list all tables

### **Error: "column does not exist"**

**Solution:**
- Check which columns exist in source tables
- Adjust SELECT statements to only include existing columns
- Use `COALESCE` or defaults for missing columns

### **Error: "duplicate key violation"**

**Solution:**
- The script uses `ON CONFLICT` - this should handle it
- If still errors, check if you're inserting into the same table you're selecting from
- Consider renaming old tables first

### **"No data migrated"**

**Solution:**
- Check if source tables have data: `SELECT COUNT(*) FROM profiles;`
- Verify WHERE clauses aren't filtering everything out
- Check if `NOT EXISTS` conditions are too restrictive

---

## 📊 **Migration Checklist**

- [ ] Checked current table structure
- [ ] Identified table names/schemas
- [ ] Backed up database
- [ ] Adjusted migration script for your setup
- [ ] Tested with small subset
- [ ] Ran full migration
- [ ] Verified data counts
- [ ] Checked foreign keys
- [ ] Ran VERIFY_MIGRATION.sql
- [ ] Ran SETUP_ROLES_FROM_SUPABASE.sql
- [ ] Tested application

---

## 🎯 **Next Steps**

After migration is complete:

1. ✅ Run `SETUP_ROLES_FROM_SUPABASE.sql` - Assign RBAC roles
2. ✅ Run `VERIFY_MIGRATION.sql` - Verify data integrity
3. ✅ Test your application
4. ✅ Archive or rename old tables (optional)

---

## 💡 **Tips**

- **Start small:** Test with 10-20 records first
- **Backup first:** Always backup before migration
- **One step at a time:** Run each section separately and verify
- **Document changes:** Note any customizations you made

Good luck with your migration! 🚀

