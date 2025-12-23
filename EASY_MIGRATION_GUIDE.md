# Easy Data Migration Guide 🚀

The simplest way to migrate data from your old databases to the unified SmartPro database.

## ✨ **What Makes This Easy?**

✅ **No CSV exports needed** - Connects directly to databases  
✅ **Automatic ID mapping** - Handles foreign keys automatically  
✅ **Duplicate detection** - Merges profiles by email, companies by slug  
✅ **One command** - Just run `python migrate_data.py`  
✅ **Progress tracking** - See what's happening in real-time  

---

## 🚀 **Quick Start (3 Steps)**

### **Step 1: Install Python Dependencies**

```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install psycopg2-binary python-dotenv
```

### **Step 2: Configure Database Connections**

1. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Get your Supabase connection strings:**
   - Go to each Supabase project dashboard
   - Go to **Settings** → **Database**
   - Find **Connection string** → **URI**
   - Copy the connection string

3. **Edit `.env` file:**
   ```env
   # Contract-Management-System database
   CONTRACT_DB_URL=postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres
   
   # business-services-hub database
   SERVICES_DB_URL=postgresql://postgres:your_password@db.yyyyy.supabase.co:5432/postgres
   
   # Unified SmartPro database (target)
   UNIFIED_DB_URL=postgresql://postgres:your_password@db.zzzzz.supabase.co:5432/postgres
   ```

   **⚠️ Important:** Replace `[YOUR-PASSWORD]` with your actual database password!

### **Step 3: Run Migration**

```bash
python migrate_data.py
```

That's it! 🎉

---

## 📋 **What Gets Migrated**

The script automatically migrates:

1. **✅ Profiles (Users)**
   - From both Contract-Management-System and business-services-hub
   - Merges duplicates by email
   - Preserves all fields

2. **✅ Companies**
   - From both systems
   - Merges duplicates by name/slug
   - Handles Oman-specific fields (CR number, VAT number)

3. **✅ Services**
   - From both systems
   - Maps provider and company IDs correctly
   - Preserves pricing, categories, status

---

## 🔧 **How It Works**

1. **Connects** to all three databases
2. **Reads** data from old databases
3. **Maps** old IDs to new IDs (handles foreign keys)
4. **Inserts/Updates** data in unified database
5. **Handles conflicts** (merges duplicates)
6. **Shows summary** of what was migrated

---

## ⚙️ **Advanced Options**

### **Migrate Only Specific Tables**

Edit `migrate_data.py` and comment out what you don't need:

```python
# In main() function:
migrator.migrate_profiles()
migrator.migrate_companies()
# migrator.migrate_services()  # Comment out if not needed
```

### **Add More Tables**

You can extend the script to migrate other tables:

```python
def migrate_bookings(self):
    """Migrate bookings"""
    # Add your migration logic here
    pass
```

---

## 🔍 **Troubleshooting**

### **Error: "could not connect to server"**

**Solution:**
- Check your connection strings in `.env`
- Verify database passwords are correct
- Check if IP is whitelisted in Supabase (Settings → Database → Connection pooling)

### **Error: "relation does not exist"**

**Solution:**
- Make sure you've run `UNIFIED_SCHEMA_MIGRATION.sql` first
- The unified database schema must exist before migrating data

### **Error: "duplicate key value violates unique constraint"**

**Solution:**
- The script handles this automatically with `ON CONFLICT`
- If you see this, the data might already be migrated
- Check the summary to see what was migrated

### **"No profiles found"**

**Solution:**
- Check if the source databases have data
- Verify connection strings point to correct databases
- Check table names match (should be `profiles`)

---

## 📊 **After Migration**

After running the script, you should:

1. **✅ Assign RBAC roles:**
   ```sql
   -- Run in Supabase SQL Editor
   -- Run SETUP_ROLES_FROM_SUPABASE.sql
   ```

2. **✅ Verify data:**
   ```sql
   -- Run VERIFY_MIGRATION.sql to check data integrity
   ```

3. **✅ Test your application:**
   - Log in with migrated users
   - Check if services are visible
   - Verify bookings work

---

## 🆚 **Comparison: Easy vs Manual Method**

| Feature | Easy Method (Python) | Manual Method (SQL) |
|---------|---------------------|---------------------|
| CSV Export Required | ❌ No | ✅ Yes |
| ID Mapping | ✅ Automatic | ⚠️ Manual |
| Foreign Keys | ✅ Automatic | ⚠️ Manual |
| Duplicate Handling | ✅ Automatic | ⚠️ Manual |
| Time Required | ⏱️ 5 minutes | ⏱️ 30+ minutes |
| Error Handling | ✅ Better | ⚠️ Manual check |

---

## 🎯 **What's Next?**

After migration:

1. ✅ Run `SETUP_ROLES_FROM_SUPABASE.sql` to assign RBAC roles
2. ✅ Run `VERIFY_MIGRATION.sql` to verify everything
3. ✅ Test your application with migrated data
4. ✅ Update application code if needed

---

## 💡 **Tips**

- **Backup first:** Always backup your unified database before migration
- **Test in dev:** Test the migration on a development database first
- **Check logs:** The script shows progress and any errors
- **Run verification:** Always run `VERIFY_MIGRATION.sql` after migration

---

## 🆘 **Need Help?**

If you encounter issues:

1. Check the error message carefully
2. Verify connection strings in `.env`
3. Make sure unified schema exists (`UNIFIED_SCHEMA_MIGRATION.sql`)
4. Check Supabase logs for detailed errors

---

## 📚 **Files**

- `migrate_data.py` - Main migration script
- `.env.example` - Template for configuration
- `requirements.txt` - Python dependencies
- `EASY_MIGRATION_GUIDE.md` - This file

