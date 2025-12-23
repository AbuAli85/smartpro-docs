# Setup Roles from Existing Supabase Data

This script automatically assigns roles to all users in your Supabase account based on their existing data.

## What It Does

The `SETUP_ROLES_FROM_SUPABASE.sql` script:

1. **Shows you what data exists** - Preview all users and their current information
2. **Assigns roles automatically** based on:
   - Existing `profiles.role` column (legacy roles)
   - Data patterns (users with services → provider, users with bookings → client, etc.)
   - Company associations (users with `company_id` → enterprise_employee)
3. **Assigns default 'client' role** to users without any role
4. **Shows you the results** - Complete verification and summary

## How to Use

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor

2. **Run the script**
   - Copy and paste the entire `SETUP_ROLES_FROM_SUPABASE.sql` file
   - Click "Run" or press `Ctrl+Enter`

3. **Review the results**
   - The script will show you:
     - All existing users and their data
     - Role assignment summary
     - Users with their assigned roles
     - Any users without roles (should be none after default assignment)

## Role Assignment Logic

### From Legacy Roles (`profiles.role` column)
- `admin` → RBAC `admin`
- `provider` → RBAC `provider`
- `client` → RBAC `client`
- `staff` → RBAC `staff`
- `manager` → RBAC `manager`
- `enterprise_admin` → RBAC `enterprise_admin`
- `enterprise_employee` → RBAC `enterprise_employee`

### From Data Patterns
- **Provider Role**: Users who have created services (`services.provider_id`)
- **Client Role**: Users who have bookings (`bookings.client_id`)
- **Enterprise Employee Role**: Users with `company_id` in profiles

### Default Assignment
- Users without any role → Default `client` role

## Safety Features

- ✅ **Idempotent**: Safe to run multiple times
- ✅ **No duplicates**: Uses `ON CONFLICT DO NOTHING` to prevent duplicate assignments
- ✅ **Non-destructive**: Only adds role assignments, doesn't remove existing ones
- ✅ **Preserves context**: Stores company_id in role assignment context when applicable

## Example Output

After running, you'll see:

```
=== EXISTING USER DATA ===
user_uuid | email | full_name | legacy_role | has_services | has_bookings | has_rbac_roles
...

=== ROLE ASSIGNMENT SUMMARY ===
role_name | category | total_assignments | active_assignments | unique_users
admin | system | 2 | 2 | 2
provider | business | 15 | 15 | 15
client | business | 45 | 45 | 45
...

=== USERS WITH THEIR ROLES ===
email | full_name | legacy_role | assigned_rbac_roles | active_role_count
user@example.com | John Doe | provider | provider | 1
...
```

## Verification

After running the script, verify the results:

```sql
-- Check role assignments
SELECT 
    p.email,
    string_agg(r.name, ', ') AS roles
FROM profiles p
JOIN user_role_assignments ura ON p.id = ura.user_id
JOIN roles r ON ura.role_id = r.id
WHERE ura.is_active = TRUE
GROUP BY p.email;

-- Check permissions
SELECT * FROM user_permissions WHERE user_id = 'YOUR_USER_UUID';
```

## Troubleshooting

### No roles assigned?
- Check that the `roles` table has been seeded (run `SEED_ROLES_AND_PERMISSIONS.sql` first)
- Verify that users exist in the `profiles` table

### Wrong roles assigned?
- Review the role assignment logic in the script
- Manually adjust using `QUICK_ROLE_ASSIGNMENT.sql` or `ASSIGN_ROLES_PRACTICAL.sql`

### Users missing roles?
- The script assigns default 'client' role to all users without roles
- If some users still don't have roles, check for data integrity issues

## Related Scripts

- `SEED_ROLES_AND_PERMISSIONS.sql` - Must run this first to create roles and permissions
- `QUICK_ROLE_ASSIGNMENT.sql` - Quick templates for manual role assignment
- `ASSIGN_ROLES_PRACTICAL.sql` - More examples for role assignment
- `GET_REAL_USER_DATA.sql` - Query existing user data
- `MIGRATE_EXISTING_ROLES.sql` - Alternative migration script

## Next Steps

After running this script:

1. ✅ Verify all users have appropriate roles
2. ✅ Test permissions using the `user_permissions` materialized view
3. ✅ Update your application to use the RBAC system
4. ✅ Consider creating test data if needed (see `CREATE_TEST_DATA.sql` - if created)

