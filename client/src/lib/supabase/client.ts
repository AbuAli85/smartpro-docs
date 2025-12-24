import { createClient } from '@supabase/supabase-js'

// Unified Supabase project (same as Contract-Management-System & business-services-hub)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://reootcngcptfogfozlmz.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb290Y25nY3B0Zm9nZm96bG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NDQzODIsImV4cCI6MjA2OTAyMDM4Mn0.WQwDpYX2M4pyPaliUqTinwy1xWWFKm4OntN2HUfP6n0'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Using fallback Supabase credentials. Create .env file in root directory with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  console.warn('Current values:', { 
    url: supabaseUrl, 
    hasAnonKey: !!supabaseAnonKey,
    envUrl: import.meta.env.VITE_SUPABASE_URL || 'NOT SET',
    envKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
  })
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

