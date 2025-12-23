// Quick connection test
const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  console.log('Testing database connection...\n');
  
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in .env file');
    return;
  }
  
  console.log('DATABASE_URL format:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
  console.log('');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log('✅ Connection successful!');
    
    const result = await client.query('SELECT current_database(), current_user, version()');
    console.log('Database:', result.rows[0].current_database);
    console.log('User:', result.rows[0].current_user);
    console.log('PostgreSQL version:', result.rows[0].version.split(',')[0]);
    
    await client.end();
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'P1000' || error.message.includes('authentication')) {
      console.error('\n💡 This is an authentication error - password is wrong');
    } else if (error.code === 'P1001' || error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
      console.error('\n💡 This is a connection error - cannot reach server');
      console.error('   Try:');
      console.error('   1. Check if Supabase project is paused');
      console.error('   2. Use connection pooling (port 6543)');
      console.error('   3. Check firewall/network settings');
    }
  }
}

testConnection();

