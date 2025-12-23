# Quick Start: Migrate Between Separate Supabase Projects

Since your old and new databases are in **separate Supabase projects**, here's the fastest way to migrate.

## 🚀 **Easiest Method: Python Script (5 Minutes)**

### **Step 1: Install Python (if needed)**

If you don't have Python:
- Windows: Download from https://www.python.org/downloads/
- Or use Microsoft Store: Search "Python 3.12"

### **Step 2: Install Dependencies**

```bash
pip install psycopg2-binary python-dotenv
```

### **Step 3: Get Connection Strings**

**For OLD Project:**
1. Go to OLD Supabase project dashboard
2. Settings → Database
3. Copy "Connection string" → "URI"
4. Replace `[YOUR-PASSWORD]` with your password

**For NEW Project:**
1. Go to NEW unified Supabase project dashboard
2. Settings → Database
3. Copy "Connection string" → "URI"
4. Replace `[YOUR-PASSWORD]` with your password

### **Step 4: Create .env File**

Create a file named `.env` in this directory:

```env
OLD_PROJECT_DB_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
NEW_PROJECT_DB_URL=postgresql://postgres:password@db.yyyyy.supabase.co:5432/postgres
```

### **Step 5: Prepare New Project**

In your **NEW unified Supabase project**, run:
1. `UNIFIED_SCHEMA_MIGRATION.sql` (create unified schema)
2. `SEED_ROLES_AND_PERMISSIONS.sql` (create RBAC)

### **Step 6: Run Migration**

```bash
python migrate_between_projects.py
```

**Done!** ✅

The script will:
- ✅ Migrate all 25 profiles (promoter → provider)
- ✅ Migrate all companies
- ✅ Migrate all services
- ✅ Migrate all bookings
- ✅ Assign RBAC roles automatically
- ✅ Show you a summary

---

## 📋 **Alternative: CSV Export/Import (No Python)**

If you don't want to install Python:

### **Step 1: Export from Old Project**

1. Open **OLD Supabase project** dashboard
2. Go to **Table Editor**
3. Export each table as CSV:
   - `profiles` → `profiles.csv`
   - `companies` → `companies.csv`
   - `services` → `services.csv`
   - `bookings` → `bookings.csv`

### **Step 2: Prepare New Project**

1. Open **NEW unified Supabase project**
2. Run `UNIFIED_SCHEMA_MIGRATION.sql`
3. Run `SEED_ROLES_AND_PERMISSIONS.sql`

### **Step 3: Import CSV Files**

1. Go to **Table Editor** in NEW project
2. For each table, click **Import** → Upload CSV
3. Map columns manually

### **Step 4: Assign RBAC Roles**

Run `SETUP_ROLES_FROM_SUPABASE.sql` in NEW project

---

## ✅ **Which Method to Use?**

| Method | Time | Difficulty | Best For |
|--------|------|------------|----------|
| **Python Script** | 5 min | Easy | ✅ Recommended - Automated |
| **CSV Export/Import** | 30 min | Medium | If no Python |

---

## 🎯 **Expected Results**

After migration:
- ✅ **25 profiles** in new project
- ✅ **All companies** migrated
- ✅ **All services** migrated
- ✅ **All bookings** migrated
- ✅ **RBAC roles** assigned (5 admins, 10 providers, 10 clients)

---

## 🆘 **Need Help?**

See `SEPARATE_PROJECTS_MIGRATION_GUIDE.md` for detailed instructions.

