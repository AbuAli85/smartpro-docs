/**
 * Supabase Client for Server-Side Operations
 * Uses service_role key for full database access (bypasses RLS)
 */

// Ensure environment variables are loaded
import '../config/env.js';

import { createClient } from '@supabase/supabase-js';
import { logger } from '../services/logger.js';

// Get URL from environment, but ensure it matches the JWT token's project reference
let supabaseUrl = process.env.SUPABASE_URL || 'https://xavocdikwiimrjgybiai.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Safety check: If service key exists, extract project reference from JWT and use it
if (supabaseServiceKey) {
  try {
    const jwtParts = supabaseServiceKey.split('.');
    if (jwtParts.length === 3) {
      const payload = JSON.parse(Buffer.from(jwtParts[1], 'base64url').toString());
      const projectRef = payload.ref;
      if (projectRef) {
        const correctUrl = `https://${projectRef}.supabase.co`;
        if (supabaseUrl !== correctUrl) {
          logger.warn('⚠️ SUPABASE_URL mismatch detected!', {
            current: supabaseUrl,
            expected: correctUrl,
            fixing: 'Using URL from JWT token',
          });
          supabaseUrl = correctUrl;
        }
      }
    }
  } catch (error) {
    logger.warn('Could not decode JWT to verify project reference', error);
  }
}

// Debug logging to verify environment variables
logger.info('🔍 Supabase Client Configuration', {
  supabaseUrl,
  hasServiceKey: !!supabaseServiceKey,
  serviceKeyLength: supabaseServiceKey?.length || 0,
  serviceKeyPreview: supabaseServiceKey ? `${supabaseServiceKey.substring(0, 20)}...` : 'NOT SET',
  envSUPABASE_URL: process.env.SUPABASE_URL || 'NOT SET',
});

if (!supabaseServiceKey) {
  logger.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not set - database operations will fail');
  logger.warn('Get it from: https://supabase.com/dashboard/project/xavocdikwiimrjgybiai/settings/api');
}

// Verify the URL matches the expected project
if (!supabaseUrl.includes('xavocdikwiimrjgybiai')) {
  logger.error('❌ WARNING: Supabase URL does not match expected project!', {
    expected: 'xavocdikwiimrjgybiai',
    actual: supabaseUrl,
  });
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

