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
dotenv.config({ path: resolve(__dirname, '../../.env') });

// Verify critical environment variables are loaded
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
}

export {};

