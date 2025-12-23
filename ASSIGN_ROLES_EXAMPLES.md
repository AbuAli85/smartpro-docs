# Assign Roles to Users - Examples and Guide

## Quick Start

### Basic Role Assignment

```sql
-- Assign 'provider' role to a user
INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    'USER_UUID_HERE'::UUID,
    r.id,
    'ADMIN_UUID_HERE'::UUID
FROM roles r
WHERE r.name = 'provider';
```

## Common Scenarios

### 1. Assign Role by Email

If you know the user's email but not their UUID:

```sql
INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    p.id,
    r.id,
    (SELECT id FROM profiles WHERE email = 'admin@example.com' LIMIT 1)
FROM profiles p
CROSS JOIN roles r
WHERE p.email = 'user@example.com'
  AND r.name = 'client';
```

### 2. Assign Default Role to New Users

Automatically assign 'client' role to users who don't have any role:

```sql
INSERT INTO user_role_assignments (user_id, role_id)
SELECT 
    p.id,
    r.id
FROM profiles p
CROSS JOIN roles r
WHERE r.name = 'client'
  AND NOT EXISTS (
      SELECT 1 FROM user_role_assignments ura
      WHERE ura.user_id = p.id AND ura.is_active = TRUE
  );
```

### 3. Temporary Role Assignment

Assign a role that expires after a certain period:

```sql
INSERT INTO user_role_assignments (user_id, role_id, assigned_by, valid_until)
SELECT 
    'USER_UUID'::UUID,
    r.id,
    'ADMIN_UUID'::UUID,
    NOW() + INTERVAL '30 days'  -- Expires in 30 days
FROM roles r
WHERE r.name = 'staff';
```

### 4. Role with Context

Assign a role with additional context (e.g., company, department):

```sql
INSERT INTO user_role_assignments (user_id, role_id, assigned_by, context)
SELECT 
    'USER_UUID'::UUID,
    r.id,
    'ADMIN_UUID'::UUID,
    jsonb_build_object(
        'company_id', 'COMPANY_UUID'::UUID,
        'department', 'Sales'
    )
FROM roles r
WHERE r.name = 'enterprise_employee';
```

### 5. Revoke a Role

Deactivate a role assignment (soft delete):

```sql
UPDATE user_role_assignments
SET 
    is_active = FALSE,
    valid_until = NOW(),
    updated_at = NOW()
WHERE user_id = 'USER_UUID'::UUID
  AND role_id = (SELECT id FROM roles WHERE name = 'staff')
  AND is_active = TRUE;
```

### 6. Replace a Role

Replace one role with another:

```sql
-- Deactivate old role
UPDATE user_role_assignments
SET is_active = FALSE, updated_at = NOW()
WHERE user_id = 'USER_UUID'::UUID
  AND role_id = (SELECT id FROM roles WHERE name = 'client')
  AND is_active = TRUE;

-- Assign new role
INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
SELECT 
    'USER_UUID'::UUID,
    r.id,
    'ADMIN_UUID'::UUID
FROM roles r
WHERE r.name = 'provider';
```

## Verification Queries

### Check User's Roles

```sql
SELECT 
    r.name AS role_name,
    r.category,
    ura.is_active,
    ura.valid_until,
    ura.context
FROM user_role_assignments ura
JOIN roles r ON ura.role_id = r.id
WHERE ura.user_id = 'USER_UUID'::UUID
  AND ura.is_active = TRUE
  AND (ura.valid_until IS NULL OR ura.valid_until > NOW());
```

### Check User's Permissions

```sql
SELECT 
    permission_name,
    resource,
    action,
    scope,
    role_name
FROM user_permissions
WHERE user_id = 'USER_UUID'::UUID
ORDER BY resource, action;
```

### List All Users with Roles

```sql
SELECT 
    p.email,
    p.full_name,
    string_agg(r.name, ', ') AS roles
FROM profiles p
LEFT JOIN user_role_assignments ura ON p.id = ura.user_id 
    AND ura.is_active = TRUE
    AND (ura.valid_until IS NULL OR ura.valid_until > NOW())
LEFT JOIN roles r ON ura.role_id = r.id
GROUP BY p.id, p.email, p.full_name
ORDER BY p.email;
```

## Available Roles

- **admin** - Full system access
- **provider** - Service provider access
- **client** - Client/customer access
- **staff** - Limited admin access
- **manager** - Elevated management permissions
- **enterprise_admin** - Full company resource access
- **enterprise_employee** - Company employee access

## Best Practices

1. **Always set `assigned_by`** - Track who assigned the role
2. **Use context for organization-scoped roles** - Store company_id, department, etc.
3. **Set expiration dates for temporary roles** - Better than manual cleanup
4. **Deactivate instead of delete** - Keep audit trail with `is_active = FALSE`
5. **Verify before assigning** - Check if user already has the role
6. **Refresh materialized view** - After bulk assignments, refresh `user_permissions`

## Integration with Application

### Check Permission in Code

```javascript
// Example: Check if user can update a booking
const hasPermission = await supabase
  .from('user_permissions')
  .select('permission_name')
  .eq('user_id', userId)
  .eq('permission_name', 'bookings.update.booking')
  .single();

if (hasPermission) {
  // Allow update
}
```

### Get All User Permissions

```javascript
const { data: permissions } = await supabase
  .from('user_permissions')
  .select('*')
  .eq('user_id', userId);
```

## Troubleshooting

### User doesn't have expected permissions?

1. Check if role is assigned:
```sql
SELECT * FROM user_role_assignments WHERE user_id = 'USER_UUID'::UUID;
```

2. Check if role has the permission:
```sql
SELECT p.name FROM permissions p
JOIN role_permissions rp ON p.id = rp.permission_id
JOIN roles r ON rp.role_id = r.id
WHERE r.name = 'provider' AND p.name = 'services.create.provider';
```

3. Refresh materialized view:
```sql
REFRESH MATERIALIZED VIEW user_permissions;
```

