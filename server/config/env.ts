/**
 * Environment Configuration
 * Loads .env file before any other modules
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from project root (server/config/../.env)
// override: true means system environment variables will be overridden by .env file
const envPath = resolve(__dirname, '../../.env');
const result = dotenv.config({ path: envPath, override: true });

if (result.error) {
  console.error('❌ Failed to load .env file:', result.error);
} else {
  console.log('✅ Loaded .env file from:', envPath);
}

// Debug: Log what was loaded
console.log('🔍 Environment variables loaded:', {
  SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
  SUPABASE_URL_VALUE: process.env.SUPABASE_URL || 'NOT SET',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
  SERVICE_KEY_PREVIEW: process.env.SUPABASE_SERVICE_ROLE_KEY 
    ? `${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 30)}...` 
    : 'NOT SET',
});

// Verify critical environment variables are loaded
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
}

export {};

