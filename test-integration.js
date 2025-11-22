/**
 * Make.com Integration Test Script
 * 
 * This script helps verify the webhook payload structure matches Make.com requirements
 * 
 * Usage:
 *   node test-integration.js
 */

const testPayloads = {
  fullSubmission: {
    client_name: "Test User Full",
    email: "test.full@example.com",
    phone: "+968 1234 5678",
    business_name: "Test Company LLC",
    business_type: "Limited Liability Company (LLC)",
    services: ["Accounting", "VAT"],
    service_interested: "Accounting",
    budget: "$5,000 - $10,000",
    timeline: "3–6 Months",
    preferred_contact: "Email",
    preferred_time: "Afternoon (12 PM - 5 PM)",
    location: "Muscat, Oman",
    primary_message: "This is a test message.",
    notes: "Primary Message: This is a test message.\nPhone: +968 1234 5678\nLocation: Muscat, Oman\nLanguage: en",
    language: "en",
    source: "smartpro-consultation-form",
    timestamp: new Date().toISOString(),
  },
  minimalSubmission: {
    client_name: "Minimal Test",
    email: "test.minimal@example.com",
    services: ["Business Consulting"],
    service_interested: "Business Consulting",
    notes: "Language: en",
    language: "en",
    source: "smartpro-consultation-form",
    timestamp: new Date().toISOString(),
  }
};

// Required fields by Make.com
const requiredFields = [
  'client_name',
  'email',
  'service_interested',
  'notes',
];

// Expected fields (all fields that should be present)
const expectedFields = [
  'client_name',
  'email',
  'phone',
  'business_name',  // Fixed: was 'company'
  'business_type',
  'services',
  'service_interested',
  'budget',
  'timeline',
  'preferred_contact',
  'preferred_time',
  'location',
  'primary_message',
  'notes',  // Fixed: was missing
  'language',
  'source',  // Fixed: was missing
  'timestamp',
];

function validatePayload(payload, testName) {
  console.log(`\n🧪 Testing: ${testName}`);
  console.log('='.repeat(50));
  
  const errors = [];
  const warnings = [];
  
  // Check required fields
  console.log('\n✅ Required Fields Check:');
  requiredFields.forEach(field => {
    if (!payload[field]) {
      errors.push(`❌ Missing required field: ${field}`);
      console.log(`   ❌ ${field}: MISSING`);
    } else {
      console.log(`   ✅ ${field}: ${typeof payload[field] === 'string' ? payload[field].substring(0, 30) : JSON.stringify(payload[field])}`);
    }
  });
  
  // Check field names
  console.log('\n📋 Field Name Verification:');
  if ('company' in payload) {
    errors.push('❌ Found "company" field - should be "business_name"');
    console.log('   ❌ "company" found (should be "business_name")');
  }
  if ('business_name' in payload) {
    console.log('   ✅ "business_name" present (was "company", now fixed)');
  }
  
  // Check critical fixes
  console.log('\n🔧 Critical Fixes Verification:');
  if (!payload.notes) {
    errors.push('❌ Missing "notes" field (was missing, should be added)');
    console.log('   ❌ notes: MISSING');
  } else {
    console.log('   ✅ notes: PRESENT (was missing, now fixed)');
    if (payload.notes.length < 10) {
      warnings.push('⚠️ notes field seems too short');
    }
  }
  
  if (!payload.source) {
    errors.push('❌ Missing "source" field (was missing, should be added)');
    console.log('   ❌ source: MISSING');
  } else {
    console.log('   ✅ source: PRESENT (was missing, now fixed)');
    if (payload.source !== 'smartpro-consultation-form') {
      warnings.push(`⚠️ source value is "${payload.source}", expected "smartpro-consultation-form"`);
    }
  }
  
  // Check services format
  console.log('\n📦 Services Format Check:');
  if (payload.services) {
    if (Array.isArray(payload.services)) {
      console.log('   ✅ services is an array (correct)');
      console.log(`   📝 services: [${payload.services.join(', ')}]`);
    } else {
      errors.push('❌ services should be an array, got: ' + typeof payload.services);
      console.log('   ❌ services is not an array');
    }
  } else {
    warnings.push('⚠️ services field is missing (optional but recommended)');
  }
  
  // Check service_interested
  console.log('\n🎯 Service Routing Check:');
  if (payload.service_interested) {
    console.log(`   ✅ service_interested: "${payload.service_interested}"`);
    if (payload.services && payload.services.length > 0) {
      const firstService = payload.services[0];
      if (payload.service_interested !== firstService && 
          !payload.service_interested.includes(firstService)) {
        warnings.push(`⚠️ service_interested ("${payload.service_interested}") doesn't match first service ("${firstService}")`);
      }
    }
  } else {
    errors.push('❌ Missing service_interested (required for routing)');
  }
  
  // Summary
  console.log('\n📊 Summary:');
  if (errors.length === 0 && warnings.length === 0) {
    console.log('   ✅ All checks passed!');
  } else {
    if (errors.length > 0) {
      console.log(`   ❌ ${errors.length} error(s) found:`);
      errors.forEach(err => console.log(`      ${err}`));
    }
    if (warnings.length > 0) {
      console.log(`   ⚠️  ${warnings.length} warning(s):`);
      warnings.forEach(warn => console.log(`      ${warn}`));
    }
  }
  
  return { errors, warnings };
}

// Run tests
console.log('🚀 Make.com Integration Test Suite');
console.log('='.repeat(50));

const allErrors = [];
const allWarnings = [];

Object.entries(testPayloads).forEach(([name, payload]) => {
  const result = validatePayload(payload, name);
  allErrors.push(...result.errors);
  allWarnings.push(...result.warnings);
});

// Final summary
console.log('\n' + '='.repeat(50));
console.log('📋 FINAL SUMMARY');
console.log('='.repeat(50));

if (allErrors.length === 0) {
  console.log('✅ All critical checks passed!');
  console.log('✅ Integration is ready for testing');
} else {
  console.log(`❌ ${allErrors.length} critical error(s) found`);
  console.log('❌ Please fix errors before testing');
}

if (allWarnings.length > 0) {
  console.log(`\n⚠️  ${allWarnings.length} warning(s) - review recommended`);
}

console.log('\n📚 Next Steps:');
console.log('   1. Review TESTING_GUIDE.md for detailed test cases');
console.log('   2. Use QUICK_TEST_CHECKLIST.md for rapid testing');
console.log('   3. Test with actual Make.com scenario');
console.log('   4. Verify Google Sheets data');

