import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

/**
 * Supabase Client Configuration
 * 
 * IMPORTANT for Single Sign-On:
 * - storageKey must match other platforms (Contract-Management-System & business-services-hub)
 * - All platforms must use same Supabase project (same URL and anon key)
 * - This allows one login to work across all platforms
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // CRITICAL: This storage key must match the other platforms for SSO
    // Contract-Management-System and business-services-hub should use: 'sb-auth-token'
    storageKey: 'sb-auth-token',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
})

