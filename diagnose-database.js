/**
 * Comprehensive Database Connection Diagnostic Tool
 * Tests connection directly without Prisma to identify exact issue
 */

import dotenv from 'dotenv';
import pg from 'pg';
const { Client } = pg;

dotenv.config();

console.log('🔍 Database Connection Diagnostic Tool\n');
console.log('=' .repeat(60));

// Step 1: Check if DATABASE_URL is set
console.log('\n1️⃣ Checking DATABASE_URL...');
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is NOT set in .env file');
  console.log('\n💡 Solution: Add DATABASE_URL to your .env file');
  process.exit(1);
}

const dbUrl = process.env.DATABASE_URL;
console.log('✅ DATABASE_URL is set');

// Step 2: Parse connection string
console.log('\n2️⃣ Parsing connection string...');
const urlMatch = dbUrl.match(/postgres(ql)?:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
if (!urlMatch) {
  console.error('❌ Invalid connection string format');
  console.log('Expected format: postgresql://user:password@host:port/database');
  process.exit(1);
}

const [, , username, password, host, port, database] = urlMatch;
const connectionInfo = {
  username: username,
  password: password ? '***' : 'MISSING',
  host: host,
  port: port,
  database: database.split('?')[0], // Remove query params
  usingPooling: port === '6543',
  isPoolerHostname: host.includes('pooler') || host.includes('pool'),
  hasQueryParams: dbUrl.includes('?'),
};

console.log('Connection Details:');
console.log(`  Host: ${connectionInfo.host}`);
console.log(`  Port: ${connectionInfo.port}`);
console.log(`  Database: ${connectionInfo.database}`);
console.log(`  Username: ${connectionInfo.username}`);
console.log(`  Using Pooling: ${connectionInfo.usingPooling ? '✅ Yes' : '❌ No'}`);
console.log(`  Pooler Hostname: ${connectionInfo.isPoolerHostname ? '✅ Yes' : '❌ No'}`);

// Step 3: Test connection with different methods
console.log('\n3️⃣ Testing connection...\n');

async function testConnection(connectionString, label) {
  console.log(`Testing: ${label}`);
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
    connect_timeout: 10,
  });

  try {
    await client.connect();
    console.log(`  ✅ Connection successful!`);
    
    const result = await client.query('SELECT current_database(), current_user, version()');
    console.log(`  Database: ${result.rows[0].current_database}`);
    console.log(`  User: ${result.rows[0].current_user}`);
    console.log(`  PostgreSQL: ${result.rows[0].version.split(',')[0]}`);
    
    await client.end();
    return true;
  } catch (error) {
    console.log(`  ❌ Connection failed`);
    console.log(`  Error Code: ${error.code || 'N/A'}`);
    console.log(`  Error Message: ${error.message}`);
    
    // Provide specific recommendations
    if (error.code === '28P01' || error.message.includes('password authentication')) {
      console.log(`  💡 Issue: Wrong password`);
      console.log(`  Solution: Reset password in Supabase Dashboard → Settings → Database`);
    } else if (error.code === 'ENOTFOUND' || error.message.includes('getaddrinfo')) {
      console.log(`  💡 Issue: Cannot resolve hostname`);
      console.log(`  Solution: Check if Supabase project is active (not paused)`);
    } else if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
      console.log(`  💡 Issue: Connection timeout`);
      console.log(`  Solution: Check network/firewall settings`);
    } else if (error.code === 'ECONNREFUSED') {
      console.log(`  💡 Issue: Connection refused`);
      console.log(`  Solution: Check if port is correct and project is active`);
    }
    
    return false;
  }
}

// Test current connection string
const currentWorks = await testConnection(dbUrl, 'Current Connection String');

// If pooling fails, try direct connection
if (!currentWorks && connectionInfo.usingPooling) {
  console.log('\n4️⃣ Pooling failed, trying direct connection...\n');
  
  // Extract project ref from hostname
  const projectRefMatch = connectionInfo.host.match(/\.([^.]+)\.(pooler\.)?supabase\./);
  if (projectRefMatch) {
    const projectRef = projectRefMatch[1];
    const directUrl = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
    await testConnection(directUrl, 'Direct Connection (Port 5432)');
  }
}

// Step 4: Recommendations
console.log('\n' + '='.repeat(60));
console.log('\n📋 Recommendations:\n');

if (!currentWorks) {
  console.log('1. ✅ Reset Database Password');
  console.log('   - Go to: https://supabase.com/dashboard');
  console.log('   - Settings → Database → Reset database password');
  console.log('   - Use a SIMPLE password (no special characters) for testing');
  console.log('   - Example: TestPassword123');
  
  console.log('\n2. ✅ Get Correct Connection String');
  console.log('   - Supabase Dashboard → Settings → Database');
  console.log('   - Connection string → Session mode tab');
  console.log('   - Copy EXACTLY (don\'t type manually)');
  
  console.log('\n3. ✅ Check Project Status');
  console.log('   - Verify project is "Active" (not paused)');
  console.log('   - Free tier projects can pause after 7 days');
  
  console.log('\n4. ✅ Try Direct Connection');
  if (connectionInfo.usingPooling) {
    console.log('   - If pooling fails, try direct connection:');
    console.log('   - Connection string → URI tab (not Session mode)');
    console.log('   - Port should be 5432 (not 6543)');
  }
  
  console.log('\n5. ✅ URL-Encode Password');
  console.log('   - If password has special characters (@, #, %, etc.)');
  console.log('   - Go to: https://www.urlencoder.org/');
  console.log('   - Encode ONLY the password');
  console.log('   - Replace in connection string');
}

console.log('\n' + '='.repeat(60));
console.log('\n✅ Diagnostic complete!\n');

