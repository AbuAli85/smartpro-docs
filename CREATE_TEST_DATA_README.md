# Create Test Data for SmartPro Platform

This guide explains how to create test data for your SmartPro platform.

## Important Note

**In Supabase, users are created through Supabase Auth (sign up/login flow), not directly in SQL.** The `profiles` table references `auth.users(id)`, so you need to create users through your application's authentication system first.

## Two Approaches

### Approach 1: Create Users Through Your Application (Recommended)

1. **Use your application's sign-up flow** to create users
   - Go to your sign-up page
   - Create test accounts with different roles
   - The application should automatically create profiles

2. **Then run `CREATE_TEST_DATA_SIMPLE.sql`** to:
   - Create profiles for any existing auth.users
   - Create sample companies, services, and bookings

### Approach 2: Create Test Data Manually

If you want to create test data directly in SQL:

1. **First, ensure you have users in `auth.users`**
   - These are typically created via Supabase Auth API
   - You can check with: `SELECT * FROM auth.users;`

2. **Run `CREATE_TEST_DATA_SIMPLE.sql`**
   - This creates profiles for existing auth.users
   - Creates sample companies, services, and bookings

## Scripts Available

### `CREATE_TEST_DATA_SIMPLE.sql` (Recommended)
- ✅ Creates profiles for existing `auth.users`
- ✅ Creates sample companies
- ✅ Creates sample services (for providers)
- ✅ Creates sample bookings (for clients)
- ✅ Safe to run multiple times (idempotent)

### `CREATE_TEST_DATA.sql` (Advanced)
- ⚠️ Attempts to create users directly in `auth.users`
- ⚠️ May not work in all Supabase setups
- ⚠️ Use only if you understand Supabase's auth system

## Step-by-Step Guide

### Step 1: Check if you have users

```sql
-- Check auth.users
SELECT id, email, created_at FROM auth.users;

-- Check profiles
SELECT id, email, role FROM profiles;
```

### Step 2: Create users through your app (if none exist)

1. Open your application
2. Go to sign-up page
3. Create test accounts:
   - `admin@test.com` (admin role)
   - `provider@test.com` (provider role)
   - `client@test.com` (client role)

### Step 3: Run the test data script

```sql
-- Run CREATE_TEST_DATA_SIMPLE.sql
-- This will:
-- 1. Create profiles for any users in auth.users
-- 2. Create sample companies
-- 3. Create sample services
-- 4. Create sample bookings
```

### Step 4: Verify the data

```sql
-- Check what was created
SELECT 
    'Profiles' AS type, COUNT(*) AS count FROM profiles
UNION ALL
SELECT 'Companies', COUNT(*) FROM companies
UNION ALL
SELECT 'Services', COUNT(*) FROM services
UNION ALL
SELECT 'Bookings', COUNT(*) FROM bookings;
```

### Step 5: Assign roles using RBAC

After creating test data, run the role assignment script:

```sql
-- Run SETUP_ROLES_FROM_SUPABASE.sql
-- This will assign RBAC roles based on:
-- - profiles.role column
-- - Data patterns (services → provider, bookings → client)
```

## Test User Accounts

After creating users through your app, you can use these test accounts:

| Email | Role | Password |
|-------|------|----------|
| admin@test.com | admin | (your password) |
| provider@test.com | provider | (your password) |
| client@test.com | client | (your password) |

## Troubleshooting

### "No users found"
- **Solution**: Create users through your application's sign-up flow first
- Users must exist in `auth.users` before profiles can be created

### "Foreign key constraint violation"
- **Solution**: Ensure users exist in `auth.users` before creating profiles
- Profiles reference `auth.users(id)`, so users must exist first

### "Duplicate key violation"
- **Solution**: The scripts use `ON CONFLICT DO NOTHING`, so this is safe
- It means the data already exists, which is fine

### "Cannot insert into auth.users"
- **Solution**: This is expected - users should be created through Supabase Auth API
- Use your application's sign-up flow instead

## Next Steps

After creating test data:

1. ✅ Run `SETUP_ROLES_FROM_SUPABASE.sql` to assign RBAC roles
2. ✅ Verify roles with `GET_REAL_USER_DATA.sql`
3. ✅ Test your application with the test accounts
4. ✅ Create additional test data as needed

## Related Scripts

- `SETUP_ROLES_FROM_SUPABASE.sql` - Assign roles to users
- `GET_REAL_USER_DATA.sql` - View existing user data
- `QUICK_SETUP_ROLES.sql` - Quick role assignment

