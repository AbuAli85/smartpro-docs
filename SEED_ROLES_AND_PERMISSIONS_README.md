# Seed Roles and Permissions Script

## Overview

This script seeds the RBAC (Role-Based Access Control) system with default roles and permissions for the unified SmartPro platform.

## What It Does

### 1. Creates Default Roles
- **admin** - Full system access
- **provider** - Service provider access
- **client** - Client/customer access
- **staff** - Limited administrative access
- **manager** - Elevated management permissions
- **enterprise_admin** - Full company resource access
- **enterprise_employee** - Company employee access

### 2. Creates Permissions
Permissions are organized by resource:
- **profiles** - User profile management
- **services** - Service listing management
- **bookings** - Booking/appointment management
- **contracts** - Enterprise contract management
- **invoices** - Invoice management
- **companies** - Company management
- **reviews** - Review management
- **notifications** - Notification management
- **roles** - Role management (system)
- **permissions** - Permission management (system)
- **user_roles** - User role assignment (system)

Each permission has:
- **resource** - What it applies to (e.g., 'bookings', 'services')
- **action** - What can be done (e.g., 'read', 'create', 'update', 'delete')
- **scope** - Who it applies to:
  - `own` - Only own resources
  - `provider` - Provider's resources
  - `organization` - Organization/company resources
  - `booking` - Resources related to a booking (client or provider)
  - `public` - Public resources
  - `all` - All resources

### 3. Maps Roles to Permissions
- **Admin**: All permissions
- **Provider**: Own services, bookings, profile
- **Client**: Book services, manage own bookings, create reviews
- **Staff**: Read/update most resources, approve services
- **Manager**: Elevated read/update/delete permissions
- **Enterprise Admin**: All organization-scoped permissions
- **Enterprise Employee**: Company contracts, invoices, services

## How to Run

1. **Open Supabase SQL Editor**
2. **Copy and paste** the contents of `SEED_ROLES_AND_PERMISSIONS.sql`
3. **Run the script**
4. **Verify** the output shows:
   - Roles Created: 7 roles
   - Permissions Created: ~80+ permissions
   - Role-Permission Mappings: Various counts per role

## Idempotency

The script is **idempotent** - it can be run multiple times safely:
- Uses `ON CONFLICT` clauses to update existing records
- Won't create duplicates
- Updates descriptions if they change

## Verification

After running, you can verify with:

```sql
-- Check all roles
SELECT * FROM roles ORDER BY category, name;

-- Check permissions by resource
SELECT resource, COUNT(*) as permission_count
FROM permissions
GROUP BY resource
ORDER BY resource;

-- Check role permissions
SELECT 
    r.name AS role,
    COUNT(rp.permission_id) AS permission_count
FROM roles r
LEFT JOIN role_permissions rp ON r.id = rp.role_id
GROUP BY r.id, r.name
ORDER BY r.name;
```

## Next Steps

After seeding:
1. **Assign roles to users** using `user_role_assignments` table
2. **Test permissions** using the `get_user_permissions()` function
3. **Customize permissions** as needed for your use case
4. **Implement RLS policies** that use the RBAC system

## Example: Assign Role to User

```sql
-- Assign 'provider' role to a user
INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    'user-uuid-here'::UUID,
    r.id,
    'admin-uuid-here'::UUID
FROM roles r
WHERE r.name = 'provider';
```

## Example: Check User Permissions

```sql
-- Get all permissions for a user
SELECT * FROM get_user_permissions('user-uuid-here'::UUID);

-- Or use the materialized view
SELECT * FROM user_permissions WHERE user_id = 'user-uuid-here'::UUID;
```

