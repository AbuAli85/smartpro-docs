-- ============================================================
-- SEED ROLES AND PERMISSIONS
-- ============================================================
-- This script seeds the RBAC system with default roles and permissions
-- Safe to run multiple times (idempotent)
-- Run this in Supabase SQL Editor after the unified schema migration
-- ============================================================

-- ============================================================
-- STEP 1: SEED ROLES
-- ============================================================

-- Insert roles (using ON CONFLICT to make it idempotent)
INSERT INTO roles (name, category, description) VALUES
    ('admin', 'admin', 'System administrator with full access to all resources'),
    ('provider', 'provider', 'Service provider who can create and manage services and bookings'),
    ('client', 'client', 'Client who can book services and manage their bookings'),
    ('staff', 'admin', 'Staff member with limited administrative access'),
    ('manager', 'admin', 'Manager with elevated permissions for managing teams and resources'),
    ('enterprise_admin', 'admin', 'Enterprise administrator with full access to company resources'),
    ('enterprise_employee', 'provider', 'Enterprise employee with access to company services and contracts')
ON CONFLICT (name) DO UPDATE SET
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    updated_at = NOW();

-- ============================================================
-- STEP 2: SEED PERMISSIONS
-- ============================================================

-- Permissions for Profiles
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('profiles', 'read', 'own', 'profiles.read.own', 'View own profile'),
    ('profiles', 'read', 'public', 'profiles.read.public', 'View public profiles'),
    ('profiles', 'read', 'all', 'profiles.read.all', 'View all profiles'),
    ('profiles', 'update', 'own', 'profiles.update.own', 'Update own profile'),
    ('profiles', 'update', 'all', 'profiles.update.all', 'Update any profile'),
    ('profiles', 'create', 'all', 'profiles.create.all', 'Create new profiles'),
    ('profiles', 'delete', 'all', 'profiles.delete.all', 'Delete profiles')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- Permissions for Services
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('services', 'read', 'public', 'services.read.public', 'View public services'),
    ('services', 'read', 'provider', 'services.read.provider', 'View provider services'),
    ('services', 'read', 'all', 'services.read.all', 'View all services'),
    ('services', 'create', 'provider', 'services.create.provider', 'Create services as provider'),
    ('services', 'create', 'all', 'services.create.all', 'Create any service'),
    ('services', 'update', 'provider', 'services.update.provider', 'Update own services'),
    ('services', 'update', 'all', 'services.update.all', 'Update any service'),
    ('services', 'delete', 'provider', 'services.delete.provider', 'Delete own services'),
    ('services', 'delete', 'all', 'services.delete.all', 'Delete any service'),
    ('services', 'approve', 'all', 'services.approve.all', 'Approve services')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- Permissions for Bookings
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('bookings', 'read', 'own', 'bookings.read.own', 'View own bookings'),
    ('bookings', 'read', 'booking', 'bookings.read.booking', 'View bookings where user is client or provider'),
    ('bookings', 'read', 'all', 'bookings.read.all', 'View all bookings'),
    ('bookings', 'create', 'own', 'bookings.create.own', 'Create bookings'),
    ('bookings', 'create', 'all', 'bookings.create.all', 'Create bookings for any user'),
    ('bookings', 'update', 'booking', 'bookings.update.booking', 'Update bookings where user is client or provider'),
    ('bookings', 'update', 'all', 'bookings.update.all', 'Update any booking'),
    ('bookings', 'delete', 'booking', 'bookings.delete.booking', 'Delete bookings where user is client or provider'),
    ('bookings', 'delete', 'all', 'bookings.delete.all', 'Delete any booking'),
    ('bookings', 'cancel', 'booking', 'bookings.cancel.booking', 'Cancel bookings where user is client or provider'),
    ('bookings', 'cancel', 'all', 'bookings.cancel.all', 'Cancel any booking')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- Permissions for Contracts (Enterprise)
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('contracts', 'read', 'organization', 'contracts.read.organization', 'View contracts in organization'),
    ('contracts', 'read', 'all', 'contracts.read.all', 'View all contracts'),
    ('contracts', 'create', 'organization', 'contracts.create.organization', 'Create contracts in organization'),
    ('contracts', 'create', 'all', 'contracts.create.all', 'Create any contract'),
    ('contracts', 'update', 'organization', 'contracts.update.organization', 'Update contracts in organization'),
    ('contracts', 'update', 'all', 'contracts.update.all', 'Update any contract'),
    ('contracts', 'delete', 'organization', 'contracts.delete.organization', 'Delete contracts in organization'),
    ('contracts', 'delete', 'all', 'contracts.delete.all', 'Delete any contract'),
    ('contracts', 'sign', 'organization', 'contracts.sign.organization', 'Sign contracts in organization')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- Permissions for Invoices
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('invoices', 'read', 'own', 'invoices.read.own', 'View own invoices'),
    ('invoices', 'read', 'organization', 'invoices.read.organization', 'View invoices in organization'),
    ('invoices', 'read', 'all', 'invoices.read.all', 'View all invoices'),
    ('invoices', 'create', 'organization', 'invoices.create.organization', 'Create invoices in organization'),
    ('invoices', 'create', 'all', 'invoices.create.all', 'Create any invoice'),
    ('invoices', 'update', 'organization', 'invoices.update.organization', 'Update invoices in organization'),
    ('invoices', 'update', 'all', 'invoices.update.all', 'Update any invoice'),
    ('invoices', 'delete', 'organization', 'invoices.delete.organization', 'Delete invoices in organization'),
    ('invoices', 'delete', 'all', 'invoices.delete.all', 'Delete any invoice'),
    ('invoices', 'mark_paid', 'organization', 'invoices.mark_paid.organization', 'Mark invoices as paid in organization')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- Permissions for Companies
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('companies', 'read', 'public', 'companies.read.public', 'View public company information'),
    ('companies', 'read', 'organization', 'companies.read.organization', 'View own company'),
    ('companies', 'read', 'all', 'companies.read.all', 'View all companies'),
    ('companies', 'create', 'all', 'companies.create.all', 'Create companies'),
    ('companies', 'update', 'organization', 'companies.update.organization', 'Update own company'),
    ('companies', 'update', 'all', 'companies.update.all', 'Update any company'),
    ('companies', 'delete', 'all', 'companies.delete.all', 'Delete companies')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- Permissions for Reviews
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('reviews', 'read', 'public', 'reviews.read.public', 'View public reviews'),
    ('reviews', 'read', 'all', 'reviews.read.all', 'View all reviews'),
    ('reviews', 'create', 'own', 'reviews.create.own', 'Create reviews'),
    ('reviews', 'create', 'all', 'reviews.create.all', 'Create reviews for any booking'),
    ('reviews', 'update', 'own', 'reviews.update.own', 'Update own reviews'),
    ('reviews', 'update', 'all', 'reviews.update.all', 'Update any review'),
    ('reviews', 'delete', 'own', 'reviews.delete.own', 'Delete own reviews'),
    ('reviews', 'delete', 'all', 'reviews.delete.all', 'Delete any review')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- Permissions for Notifications
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('notifications', 'read', 'own', 'notifications.read.own', 'View own notifications'),
    ('notifications', 'read', 'all', 'notifications.read.all', 'View all notifications'),
    ('notifications', 'create', 'all', 'notifications.create.all', 'Create notifications'),
    ('notifications', 'update', 'own', 'notifications.update.own', 'Update own notifications'),
    ('notifications', 'update', 'all', 'notifications.update.all', 'Update any notification'),
    ('notifications', 'delete', 'own', 'notifications.delete.own', 'Delete own notifications'),
    ('notifications', 'delete', 'all', 'notifications.delete.all', 'Delete any notification')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- Permissions for Roles & Permissions (System)
INSERT INTO permissions (resource, action, scope, name, description) VALUES
    ('roles', 'read', 'all', 'roles.read.all', 'View all roles'),
    ('roles', 'create', 'all', 'roles.create.all', 'Create roles'),
    ('roles', 'update', 'all', 'roles.update.all', 'Update roles'),
    ('roles', 'delete', 'all', 'roles.delete.all', 'Delete roles'),
    ('permissions', 'read', 'all', 'permissions.read.all', 'View all permissions'),
    ('permissions', 'create', 'all', 'permissions.create.all', 'Create permissions'),
    ('permissions', 'update', 'all', 'permissions.update.all', 'Update permissions'),
    ('permissions', 'delete', 'all', 'permissions.delete.all', 'Delete permissions'),
    ('user_roles', 'read', 'all', 'user_roles.read.all', 'View user role assignments'),
    ('user_roles', 'assign', 'all', 'user_roles.assign.all', 'Assign roles to users'),
    ('user_roles', 'revoke', 'all', 'user_roles.revoke.all', 'Revoke roles from users')
ON CONFLICT (name) DO UPDATE SET
    resource = EXCLUDED.resource,
    action = EXCLUDED.action,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description;

-- ============================================================
-- STEP 3: MAP ROLES TO PERMISSIONS
-- ============================================================

-- Admin: Full access to everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Provider: Manage own services and bookings
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'provider'
  AND (
    -- Own profile
    p.name IN ('profiles.read.own', 'profiles.update.own')
    -- Services
    OR p.name IN ('services.read.public', 'services.read.provider', 'services.create.provider', 'services.update.provider', 'services.delete.provider')
    -- Bookings
    OR p.name IN ('bookings.read.booking', 'bookings.update.booking', 'bookings.cancel.booking')
    -- Reviews
    OR p.name IN ('reviews.read.public', 'reviews.read.all')
    -- Companies (view own)
    OR p.name IN ('companies.read.organization')
    -- Invoices (view own)
    OR p.name IN ('invoices.read.own')
    -- Notifications
    OR p.name IN ('notifications.read.own', 'notifications.update.own', 'notifications.delete.own')
  )
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Client: Book services and manage own bookings
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'client'
  AND (
    -- Own profile
    p.name IN ('profiles.read.own', 'profiles.update.own')
    -- Services (view only)
    OR p.name IN ('services.read.public')
    -- Bookings
    OR p.name IN ('bookings.read.own', 'bookings.create.own', 'bookings.update.booking', 'bookings.cancel.booking')
    -- Reviews
    OR p.name IN ('reviews.read.public', 'reviews.create.own', 'reviews.update.own', 'reviews.delete.own')
    -- Invoices (view own)
    OR p.name IN ('invoices.read.own')
    -- Companies (view public)
    OR p.name IN ('companies.read.public')
    -- Notifications
    OR p.name IN ('notifications.read.own', 'notifications.update.own', 'notifications.delete.own')
  )
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Staff: Limited admin access
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'staff'
  AND (
    -- Profiles
    p.name IN ('profiles.read.all', 'profiles.update.all')
    -- Services
    OR p.name IN ('services.read.all', 'services.update.all', 'services.approve.all')
    -- Bookings
    OR p.name IN ('bookings.read.all', 'bookings.update.all')
    -- Reviews
    OR p.name IN ('reviews.read.all', 'reviews.update.all', 'reviews.delete.all')
    -- Notifications
    OR p.name IN ('notifications.read.all', 'notifications.create.all', 'notifications.update.all')
  )
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Manager: Elevated permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'manager'
  AND (
    -- All read permissions
    p.action = 'read' AND p.scope IN ('all', 'organization', 'public')
    -- Update permissions for most resources
    OR (p.resource IN ('profiles', 'services', 'bookings', 'invoices', 'reviews', 'notifications') AND p.action = 'update' AND p.scope IN ('all', 'organization'))
    -- Delete permissions for most resources
    OR (p.resource IN ('services', 'bookings', 'reviews', 'notifications') AND p.action = 'delete' AND p.scope IN ('all', 'organization'))
    -- Service approval
    OR p.name = 'services.approve.all'
  )
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Enterprise Admin: Full access to company resources
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'enterprise_admin'
  AND (
    -- All organization-scoped permissions
    p.scope IN ('organization', 'all', 'public', 'own')
    -- Exclude system permissions (roles/permissions management)
    AND p.resource NOT IN ('roles', 'permissions', 'user_roles')
  )
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Enterprise Employee: Access to company services and contracts
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'enterprise_employee'
  AND (
    -- Own profile
    p.name IN ('profiles.read.own', 'profiles.update.own')
    -- Services (view organization)
    OR p.name IN ('services.read.public', 'services.read.provider')
    -- Contracts
    OR p.name IN ('contracts.read.organization', 'contracts.create.organization', 'contracts.update.organization', 'contracts.sign.organization')
    -- Invoices
    OR p.name IN ('invoices.read.organization', 'invoices.create.organization', 'invoices.update.organization')
    -- Companies
    OR p.name IN ('companies.read.organization')
    -- Notifications
    OR p.name IN ('notifications.read.own', 'notifications.update.own')
  )
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- ============================================================
-- STEP 4: REFRESH MATERIALIZED VIEW
-- ============================================================

-- Refresh the user_permissions materialized view
-- Note: Using regular refresh since CONCURRENTLY requires a unique index
-- and we may not have user_role_assignments yet
REFRESH MATERIALIZED VIEW user_permissions;

-- ============================================================
-- VERIFICATION
-- ============================================================

-- Check roles were created
SELECT 
    'Roles Created' AS check_type,
    COUNT(*) AS count,
    string_agg(name, ', ' ORDER BY name) AS role_names
FROM roles;

-- Check permissions were created
SELECT 
    'Permissions Created' AS check_type,
    COUNT(*) AS total_permissions,
    COUNT(DISTINCT resource) AS unique_resources
FROM permissions;

-- Check role-permission mappings
SELECT 
    'Role-Permission Mappings' AS check_type,
    r.name AS role_name,
    COUNT(rp.permission_id) AS permission_count
FROM roles r
LEFT JOIN role_permissions rp ON r.id = rp.role_id
GROUP BY r.id, r.name
ORDER BY r.name;

-- Summary
SELECT 
    'Summary' AS check_type,
    (SELECT COUNT(*) FROM roles) AS total_roles,
    (SELECT COUNT(*) FROM permissions) AS total_permissions,
    (SELECT COUNT(*) FROM role_permissions) AS total_mappings;

