// Simple API test script
// Run this with: node test-apis.js

const baseUrl = 'http://localhost:3000/api';

async function testAPI(endpoint, name) {
  try {
    console.log(`Testing ${name}...`);
    const response = await fetch(`${baseUrl}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data)) {
      console.log(`✅ ${name}: ${data.length} items loaded`);
    } else if (data.error) {
      console.log(`❌ ${name}: ${data.error}`);
    } else {
      console.log(`✅ ${name}: Working correctly`);
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
}

async function testAllAPIs() {
  console.log('🧪 Testing Megisha Estate APIs...\n');
  
  await testAPI('/test-connection', 'Database Connection');
  await testAPI('/plots', 'Plots API');
  await testAPI('/residentials', 'Residentials API');
  await testAPI('/villas', 'Villas API');
  await testAPI('/commercial', 'Commercial API');
  await testAPI('/apartments', 'Apartments API');
  
  console.log('\n🎯 Test complete!');
  console.log('If any APIs show mock data, the database connection needs to be set up.');
  console.log('If APIs work, the pages should load correctly now.');
}

testAllAPIs().catch(console.error);
