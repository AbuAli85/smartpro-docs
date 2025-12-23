# Migration Guide for Your Data

Based on your current data:
- ✅ **10 clients**
- ✅ **9 providers** 
- ✅ **5 admins**
- ✅ **1 promoter** (needs to be mapped to "provider")

## 🚀 **Quick Migration Steps**

### **Step 1: Map "Promoter" Role**

The "promoter" role from Contract-Management-System should be mapped to "provider". Run:

```sql
-- In QUICK_MIGRATION_FOR_YOUR_DATA.sql
UPDATE profiles
SET role = 'provider'
WHERE role = 'promoter';
```

This will give you:
- 10 clients
- **10 providers** (9 + 1 promoter)
- 5 admins

### **Step 2: Ensure Unified Schema Exists**

Make sure you've run `UNIFIED_SCHEMA_MIGRATION.sql` to create the unified schema tables.

### **Step 3: Run Migration (if needed)**

If your current `profiles` table IS the unified table, you can skip this step.

If you need to migrate from old tables to new unified tables, run:
- `MIGRATE_YOUR_DATABASE.sql`

### **Step 4: Assign RBAC Roles**

Run `SETUP_ROLES_FROM_SUPABASE.sql` to:
- Assign RBAC roles based on your existing `profiles.role` values
- Set up permissions for each role

This will automatically:
- Map `admin` → RBAC `admin` role
- Map `provider` → RBAC `provider` role  
- Map `client` → RBAC `client` role
- Assign roles based on data patterns (services, bookings, etc.)

### **Step 5: Verify**

Run `VERIFY_MIGRATION.sql` to check:
- All profiles have roles
- RBAC assignments are correct
- Data integrity is good

## 📊 **Expected Results After Migration**

After running `SETUP_ROLES_FROM_SUPABASE.sql`, you should have:

| Role | Count | RBAC Assignment |
|------|-------|----------------|
| admin | 5 | ✅ admin role |
| provider | 10 | ✅ provider role |
| client | 10 | ✅ client role |

## ⚠️ **Important Notes**

### **If Your Current Tables ARE the Unified Tables**

If your `profiles`, `companies`, `bookings` tables are already the unified schema:
1. ✅ Just map "promoter" → "provider" (Step 1)
2. ✅ Run `SETUP_ROLES_FROM_SUPABASE.sql` to assign RBAC roles
3. ✅ Done!

### **If You Need to Migrate to New Tables**

If you have separate old tables and need to migrate to unified tables:
1. ✅ Run `UNIFIED_SCHEMA_MIGRATION.sql` first
2. ✅ Run `MIGRATE_YOUR_DATABASE.sql` to migrate data
3. ✅ Map "promoter" → "provider"
4. ✅ Run `SETUP_ROLES_FROM_SUPABASE.sql`

## 🎯 **Recommended Order**

1. **Run:** `QUICK_MIGRATION_FOR_YOUR_DATA.sql` (map promoter role)
2. **Run:** `SETUP_ROLES_FROM_SUPABASE.sql` (assign RBAC roles)
3. **Run:** `VERIFY_MIGRATION.sql` (verify everything)
4. **Test:** Your application

## ✅ **What Gets Migrated**

### **Already Have:**
- ✅ 25 profiles (10 clients, 9 providers, 5 admins, 1 promoter)
- ✅ Companies (need to check count)
- ✅ Bookings (need to check count)
- ✅ Services (need to check if exists)

### **After Migration:**
- ✅ All profiles mapped to correct roles
- ✅ RBAC roles assigned
- ✅ Permissions set up
- ✅ Ready for application use

## 🆘 **Troubleshooting**

### **"promoter" role still exists after migration**

**Solution:** Run the UPDATE statement again:
```sql
UPDATE profiles SET role = 'provider' WHERE role = 'promoter';
```

### **RBAC roles not assigned**

**Solution:** 
1. Check that `SEED_ROLES_AND_PERMISSIONS.sql` was run first
2. Run `SETUP_ROLES_FROM_SUPABASE.sql` again
3. Check `VERIFY_MIGRATION.sql` output

### **Missing permissions**

**Solution:** 
1. Verify `user_permissions` materialized view is refreshed
2. Check role assignments: `SELECT * FROM user_role_assignments;`

## 📋 **Quick Checklist**

- [ ] Map "promoter" → "provider" 
- [ ] Ensure unified schema exists
- [ ] Run migration (if needed)
- [ ] Assign RBAC roles
- [ ] Verify migration
- [ ] Test application

You're almost done! 🎉

