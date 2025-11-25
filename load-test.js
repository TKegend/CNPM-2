import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_URL = process.env.DOMAIN;

async function sendRequests() {
  console.log(`🚀 Sending requests to ${API_URL}...\n`);

  const requests = [
    // GET requests only
    axios.get(`${API_URL}/api/food/list`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/api/order/list`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/api/restaurant/list`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/metrics`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/api/food/list`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/api/order/list`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/api/restaurant/list`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/metrics`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/api/food/list`).catch(err => ({ error: err.message })),
    axios.get(`${API_URL}/api/order/list`).catch(err => ({ error: err.message })),
  ];

  console.log(`📊 Sending ${requests.length} requests...\n`);
  
  const startTime = Date.now();
  const results = await Promise.allSettled(requests);
  const endTime = Date.now();
  
  console.log(`✅ Completed in ${endTime - startTime}ms\n`);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const response = result.value;
      if (response.error) {
        console.log(`${index + 1}. ❌ Error: ${response.error}`);
      } else {
        console.log(`${index + 1}. ✅ ${response.config?.method?.toUpperCase()} ${response.config?.url} - Status: ${response.status}`);
      }
    } else {
      console.log(`${index + 1}. ❌ Failed: ${result.reason?.message}`);
    }
  });
}

// Run multiple times
async function runLoadTest(iterations = 10) {
  console.log(`🔄 Running ${iterations} iterations...\n`);
  
  for (let i = 1; i <= iterations; i++) {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Iteration ${i}/${iterations}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    
    await sendRequests();
    
    // Wait 1 second between iterations
    if (i < iterations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(`\n🎉 Load test complete!`);
}

// Run the load test
runLoadTest(1);
