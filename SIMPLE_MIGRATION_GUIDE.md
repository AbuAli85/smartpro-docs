# Simple SQL Migration Guide (No Python Required!)

The easiest way to migrate data without installing anything. Just use Supabase's SQL Editor!

## 🎯 **How It Works**

1. **Export** data from old databases (copy SQL results)
2. **Import** data into new database (paste and run)
3. **Done!** ✅

---

## 📋 **Step-by-Step Instructions**

### **Step 1: Export Profiles from Contract-Management-System**

1. Open **Contract-Management-System** Supabase project
2. Go to **SQL Editor**
3. Run this query:

```sql
SELECT 
    id::text,
    COALESCE(user_id, id)::text as user_id,
    email,
    full_name,
    phone,
    COALESCE(address::text, '{}') as address,
    COALESCE(preferences::text, '{}') as preferences,
    created_at::text,
    updated_at::text
FROM profiles
ORDER BY created_at;
```

4. **Copy all the results** (right-click → Copy)
5. Save to a text file: `contract-profiles.txt`

### **Step 2: Export Profiles from business-services-hub**

1. Open **business-services-hub** Supabase project
2. Go to **SQL Editor**
3. Run this query:

```sql
SELECT 
    id::text,
    email,
    full_name,
    phone,
    country,
    company_id::text,
    is_verified,
    role,
    created_at::text,
    updated_at::text
FROM profiles
ORDER BY created_at;
```

4. **Copy all the results**
5. Save to: `services-profiles.txt`

### **Step 3: Export Companies**

Repeat for companies from both databases:

**Contract-Management-System:**
```sql
SELECT 
    id::text,
    name,
    slug,
    description,
    logo_url,
    website,
    email,
    phone,
    COALESCE(address::text, '{}') as address,
    is_active,
    created_at::text,
    updated_at::text
FROM companies
ORDER BY created_at;
```

**business-services-hub:**
```sql
SELECT 
    id::text,
    owner_id::text,
    name,
    cr_number,
    vat_number,
    logo_url,
    created_at::text
FROM companies
ORDER BY created_at;
```

### **Step 4: Export Services**

**Contract-Management-System:**
```sql
SELECT 
    id::text,
    company_id::text,
    name as title,
    description,
    category,
    price_base as price,
    price_currency as currency,
    duration_minutes,
    status,
    created_by::text,
    created_at::text,
    updated_at::text
FROM services
ORDER BY created_at;
```

**business-services-hub:**
```sql
SELECT 
    id::text,
    provider_id::text,
    title,
    description,
    category,
    base_price as price,
    currency,
    location,
    status,
    created_at::text,
    updated_at::text
FROM services
ORDER BY created_at;
```

### **Step 5: Import into Unified Database**

1. Open your **unified SmartPro** Supabase project
2. Go to **SQL Editor**
3. Open `SIMPLE_MIGRATION.sql`
4. **Replace the VALUES** with your exported data
5. Run each INSERT statement

---

## 🔧 **Converting SQL Results to INSERT Statements**

### **Option 1: Manual Conversion**

If you have 5-10 rows, you can manually convert:

**From:**
```
id          | email           | full_name
------------|-----------------|------------
uuid-123    | user@test.com  | John Doe
```

**To:**
```sql
INSERT INTO profiles (id, email, full_name, ...)
VALUES 
    ('uuid-123', 'user@test.com', 'John Doe', ...),
    -- Add more rows
ON CONFLICT (id) DO UPDATE SET ...;
```

### **Option 2: Use Supabase Table Editor**

1. Export data as CSV from old database
2. In new database, go to **Table Editor**
3. Click **Import** → Upload CSV
4. Map columns manually

### **Option 3: Use Online Converter**

1. Export data as CSV
2. Use an online SQL INSERT generator:
   - https://www.convertcsv.com/csv-to-sql.htm
   - https://sqlizer.io/
3. Generate INSERT statements
4. Copy to Supabase SQL Editor

---

## ⚡ **Quick Example**

### **Export (from old database):**
```sql
SELECT id, email, full_name FROM profiles LIMIT 3;
```

**Results:**
```
id: abc-123 | email: user1@test.com | full_name: User One
id: def-456 | email: user2@test.com | full_name: User Two
id: ghi-789 | email: user3@test.com | full_name: User Three
```

### **Import (to new database):**
```sql
INSERT INTO profiles (id, email, full_name, name, role, status, created_at, updated_at)
VALUES 
    ('abc-123', 'user1@test.com', 'User One', 'User One', 'client', 'active', NOW(), NOW()),
    ('def-456', 'user2@test.com', 'User Two', 'User Two', 'client', 'active', NOW(), NOW()),
    ('ghi-789', 'user3@test.com', 'User Three', 'User Three', 'client', 'active', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name;
```

---

## 💡 **Tips**

1. **Start small:** Test with 5-10 rows first
2. **Use ON CONFLICT:** Prevents errors if data already exists
3. **Check foreign keys:** Make sure referenced IDs exist
4. **Backup first:** Always backup before migration
5. **Verify after:** Run `VERIFY_MIGRATION.sql` when done

---

## 🎯 **Recommended Order**

1. ✅ Import **Profiles** first
2. ✅ Import **Companies** second
3. ✅ Import **Services** third (needs profiles/companies)
4. ✅ Import **Bookings** fourth (needs profiles/services)
5. ✅ Run **VERIFY_MIGRATION.sql**
6. ✅ Run **SETUP_ROLES_FROM_SUPABASE.sql**

---

## 🆘 **Troubleshooting**

### **"Foreign key constraint violation"**

**Solution:** Import tables in dependency order (profiles → companies → services)

### **"Duplicate key violation"**

**Solution:** Use `ON CONFLICT DO UPDATE` (already in the script)

### **"Invalid UUID format"**

**Solution:** Make sure UUIDs are in correct format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

## ✅ **After Migration**

1. Run `VERIFY_MIGRATION.sql` to check everything
2. Run `SETUP_ROLES_FROM_SUPABASE.sql` to assign roles
3. Test your application

---

## 📊 **Which Method to Use?**

| Method | Best For |
|--------|----------|
| **Simple SQL** | ✅ Small datasets (< 100 rows)<br>✅ No Python installation<br>✅ Quick migration |
| **Python Script** | ✅ Large datasets<br>✅ Automated migration<br>✅ Complex ID mapping |

**For most cases, Simple SQL is easier!** 🎉

