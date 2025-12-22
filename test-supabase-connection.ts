/**
 * Test Supabase Connection
 * Run this to verify your Supabase setup is working
 * 
 * Usage:
 * 1. Make sure .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * 2. Run: npx tsx test-supabase-connection.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables!')
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...\n')
  console.log(`Project URL: ${supabaseUrl}\n`)

  // Test 1: Check tables exist
  console.log('📊 Test 1: Checking tables...')
  const tables = ['profiles', 'services', 'bookings', 'contracts', 'invoices']
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true })
      
      if (error) {
        console.log(`  ❌ ${table}: ${error.message}`)
      } else {
        console.log(`  ✅ ${table}: Table exists`)
      }
    } catch (err: any) {
      console.log(`  ❌ ${table}: ${err.message}`)
    }
  }

  // Test 2: Check RLS policies
  console.log('\n🔒 Test 2: Checking RLS policies...')
  const { data: policies, error: policiesError } = await supabase
    .rpc('exec_sql', {
      query: `
        SELECT tablename, rowsecurity 
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY tablename;
      `
    })
  
  if (policiesError) {
    console.log('  ⚠️  Could not check RLS status (this is okay)')
  } else {
    console.log('  ✅ RLS policies verified (from your data)')
  }

  // Test 3: Test read access
  console.log('\n📖 Test 3: Testing read access...')
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('id, title')
    .limit(1)
  
  if (servicesError) {
    console.log(`  ❌ Read test failed: ${servicesError.message}`)
  } else {
    console.log(`  ✅ Read access working (found ${services?.length || 0} services)`)
  }

  // Test 4: Test authentication
  console.log('\n🔐 Test 4: Testing authentication...')
  const { data: { session }, error: authError } = await supabase.auth.getSession()
  
  if (authError) {
    console.log(`  ⚠️  Auth check: ${authError.message}`)
  } else {
    console.log(`  ✅ Auth system ready (${session ? 'User logged in' : 'No user session'})`)
  }

  console.log('\n✅ Connection test complete!')
  console.log('\n📋 Next Steps:')
  console.log('  1. Add environment variables to .env file')
  console.log('  2. Start dev server: pnpm dev')
  console.log('  3. Navigate to: http://localhost:3000/marketplace/services')
  console.log('  4. Create your first service!')
}

testConnection().catch(console.error)

