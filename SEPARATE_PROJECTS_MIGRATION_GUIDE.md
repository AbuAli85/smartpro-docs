# Migration Guide: Separate Supabase Projects

Since your **old database** and **new unified database** are in **separate Supabase projects**, you have several options for migration.

## 🎯 **Your Situation**

- **OLD Project:** Has your current data (25 users, companies, services, bookings)
- **NEW Project:** Should have the unified schema (from `UNIFIED_SCHEMA_MIGRATION.sql`)
- **Separate project IDs** - Can't use simple SQL migration

## 🚀 **Migration Options**

### **Option 1: Python Script (Easiest - Recommended)**

Automated migration between projects.

#### **Step 1: Install Python Dependencies**

```bash
pip install psycopg2-binary python-dotenv
```

#### **Step 2: Configure Database Connections**

Create a `.env` file:

```env
# Old Supabase project connection string
OLD_PROJECT_DB_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres

# New unified Supabase project connection string
NEW_PROJECT_DB_URL=postgresql://postgres:password@db.yyyyy.supabase.co:5432/postgres
```

**How to get connection strings:**
1. Go to each Supabase project dashboard
2. Go to **Settings** → **Database**
3. Find **Connection string** → **URI**
4. Replace `[YOUR-PASSWORD]` with your database password

#### **Step 3: Run Migration**

```bash
python migrate_between_projects.py
```

**That's it!** The script will:
- ✅ Connect to both projects
- ✅ Migrate profiles, companies, services, bookings
- ✅ Map "promoter" → "provider"
- ✅ Assign RBAC roles
- ✅ Show summary

---

### **Option 2: Export/Import via CSV (No Python Required)**

Manual export/import using Supabase Dashboard.

#### **Step 1: Export from Old Project**

1. Open **OLD Supabase project** dashboard
2. Go to **Table Editor**
3. For each table, click **Export** → **CSV**:
   - Export `profiles` → `profiles_export.csv`
   - Export `companies` → `companies_export.csv`
   - Export `services` → `services_export.csv`
   - Export `bookings` → `bookings_export.csv`

#### **Step 2: Prepare Unified Schema**

1. Open **NEW unified Supabase project**
2. Run `UNIFIED_SCHEMA_MIGRATION.sql`
3. Run `SEED_ROLES_AND_PERMISSIONS.sql`

#### **Step 3: Import to New Project**

**Option A: Using Supabase Dashboard**

1. Go to **Table Editor** in NEW project
2. For each table, click **Import** → Upload CSV
3. Map columns manually

**Option B: Using SQL Import Script**

1. Modify `IMPORT_TO_NEW_PROJECT.sql` with your CSV data
2. Or use Supabase's CSV import feature

---

### **Option 3: SQL Export/Import Scripts**

Use the provided SQL scripts.

#### **Step 1: Export from Old Project**

1. Open **OLD Supabase project** SQL Editor
2. Run `EXPORT_FROM_OLD_PROJECT.sql`
3. Copy the results for each table
4. Save to CSV files or text files

#### **Step 2: Import to New Project**

1. Open **NEW unified Supabase project** SQL Editor
2. Ensure unified schema exists (run `UNIFIED_SCHEMA_MIGRATION.sql`)
3. Ensure RBAC exists (run `SEED_ROLES_AND_PERMISSIONS.sql`)
4. Modify `IMPORT_TO_NEW_PROJECT.sql` with your exported data
5. Run the import script

---

## 📋 **Recommended Approach**

**For most users: Use Option 1 (Python Script)**

✅ **Fully automated**  
✅ **Handles all mapping automatically**  
✅ **No manual CSV work**  
✅ **One command**

**If you don't have Python: Use Option 2 (CSV Export/Import)**

✅ **No installation needed**  
✅ **Uses Supabase Dashboard**  
⚠️ **More manual work**

---

## 🔧 **Python Script Details**

The `migrate_between_projects.py` script:

1. **Connects** to both Supabase projects
2. **Reads** data from old project
3. **Transforms** data (maps columns, roles, statuses)
4. **Inserts** into new unified project
5. **Maps IDs** for foreign keys
6. **Assigns RBAC roles**
7. **Shows summary**

### **What It Handles**

- ✅ Column name variations (`first_name + last_name` → `full_name`)
- ✅ Role mapping (`promoter` → `provider`)
- ✅ Status mapping (`pending` → `active`)
- ✅ Foreign key mapping (profiles → companies, services, bookings)
- ✅ Duplicate detection
- ✅ Safe to run multiple times

---

## 📊 **Migration Checklist**

- [ ] Get connection strings from both Supabase projects
- [ ] Create `.env` file with both URLs
- [ ] Install Python dependencies (if using Python script)
- [ ] Run `UNIFIED_SCHEMA_MIGRATION.sql` in NEW project
- [ ] Run `SEED_ROLES_AND_PERMISSIONS.sql` in NEW project
- [ ] Run migration (Python script OR CSV import)
- [ ] Run `VERIFY_MIGRATION.sql` in NEW project
- [ ] Test application

---

## 🆘 **Troubleshooting**

### **"could not connect to server"**

**Solution:**
- Check connection strings in `.env`
- Verify database passwords are correct
- Check if IP is whitelisted in Supabase (Settings → Database → Connection pooling)

### **"relation does not exist"**

**Solution:**
- Make sure unified schema exists in NEW project
- Run `UNIFIED_SCHEMA_MIGRATION.sql` first

### **"duplicate key violation"**

**Solution:**
- Script uses `ON CONFLICT DO UPDATE` - safe to re-run
- If still errors, check for actual duplicates

### **"No data migrated"**

**Solution:**
- Check if old project has data
- Verify connection strings point to correct projects
- Check for errors in script output

---

## 📚 **Files**

- `migrate_between_projects.py` - Python script (automated)
- `EXPORT_FROM_OLD_PROJECT.sql` - SQL export script
- `IMPORT_TO_NEW_PROJECT.sql` - SQL import script
- `SEPARATE_PROJECTS_MIGRATION_GUIDE.md` - This file

---

## ✅ **After Migration**

1. ✅ Run `VERIFY_MIGRATION.sql` in NEW project
2. ✅ Test your application
3. ✅ Update application code to use new project
4. ✅ Archive old project (optional)

---

## 🎯 **Quick Start**

**If you have Python:**
1. Create `.env` with both database URLs
2. Run: `python migrate_between_projects.py`
3. Done! ✅

**If you don't have Python:**
1. Export CSV files from old project
2. Import CSV files to new project
3. Run `SETUP_ROLES_FROM_SUPABASE.sql` in new project
4. Done! ✅

Good luck with your migration! 🚀

