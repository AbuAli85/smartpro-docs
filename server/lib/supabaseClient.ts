/**
 * Supabase Client for Server-Side Operations
 * Uses service_role key for full database access (bypasses RLS)
 */

// Ensure environment variables are loaded
import '../config/env.js';

import { createClient } from '@supabase/supabase-js';
import { logger } from '../services/logger.js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://xavocdikwiimrjgybiai.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  logger.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not set - database operations will fail');
  logger.warn('Get it from: https://supabase.com/dashboard/project/xavocdikwiimrjgybiai/settings/api');
}

// Create Supabase client with service_role key (full access, bypasses RLS)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Test connection on import
supabase
  .from('consultation_submissions')
  .select('id')
  .limit(1)
  .then(() => {
    logger.info('✅ Supabase client connected successfully');
  })
  .catch((error) => {
    logger.error('❌ Supabase client connection failed', error, {
      supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
    });
  });

