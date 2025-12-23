-- Create unique index on user_permissions materialized view
-- This enables CONCURRENT refresh (non-blocking)
-- Run this AFTER seeding roles/permissions and creating some user_role_assignments

-- First, ensure the materialized view has been refreshed at least once
REFRESH MATERIALIZED VIEW user_permissions;

-- Create unique index (required for CONCURRENT refresh)
-- This index ensures each user-permission combination is unique
CREATE UNIQUE INDEX IF NOT EXISTS user_permissions_unique_idx 
ON user_permissions (user_id, permission_name);

-- After creating the unique index, you can use CONCURRENT refresh:
-- REFRESH MATERIALIZED VIEW CONCURRENTLY user_permissions;

-- Note: The unique index may fail if there are duplicate user_id + permission_name combinations
-- This shouldn't happen in normal operation, but if it does, you'll need to investigate
-- why a user has the same permission multiple times

