export const mockApiData = {
  home: {
    title: "EnerPrice API Documentation",
    description: "Welcome to the comprehensive EnerPrice API documentation. Access energy market data, futures pricing, and utility information through our powerful REST API.",
    content: `
      <div class="space-y-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Getting Started</h3>
          <p class="text-blue-800 dark:text-blue-200">Begin by obtaining your API key through authentication, then explore our comprehensive energy data endpoints.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Base URL</h4>
            <code class="text-sm bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded">https://api.enerpricedata.com</code>
          </div>
          
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Rate Limits</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">1000 requests per hour</p>
          </div>
        </div>
      </div>
    `
  },
  
  auth: {
    title: "Authentication & API Keys",
    description: "Secure your API access with API key authentication. Each user can maintain one active API key for accessing energy data endpoints.",
    endpoints: [
      {
        method: "POST",
        url: "/auth/api-key",
        title: "Generate API Key",
        description: "Create a new API key for authentication. Requires JWT authentication.",
        parameters: [
          { name: "name", type: "string", required: true, description: "Descriptive name for the API key" }
        ],
        examples: {
          python: `import requests

# Generate API Key
url = "https://api.enerpricedata.com/auth/api-key"
headers = {
    "Authorization": "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "name": "My Energy Data Key"
}

response = requests.post(url, headers=headers, json=data)
api_key = response.json()["api_key"]
print(f"Your API Key: {api_key}")`,
          javascript: `// Generate API Key
const response = await fetch('https://api.enerpricedata.com/auth/api-key', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'My Energy Data Key'
    })
});

const data = await response.json();
console.log('Your API Key:', data.api_key);`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.enerpricedata.com/auth/api-key')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer YOUR_JWT_TOKEN'
request['Content-Type'] = 'application/json'
request.body = { name: 'My Energy Data Key' }.to_json

response = http.request(request)
data = JSON.parse(response.body)
puts "Your API Key: #{data['api_key']}"`,
          curl: `curl -X POST "https://api.enerpricedata.com/auth/api-key" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Energy Data Key"
  }'`
        }
      }
    ]
  },

  "energy-futures": {
    title: "Energy Futures Data",
    description: "Access comprehensive energy futures pricing data across multiple control areas and block types. Download data in Excel, CSV, or JSON formats.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/energy-futures",
        title: "Download Energy Futures (Excel)",
        description: "Download energy futures data in Excel format. Supports single date or date range downloads.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
          { name: "end_operating_date", type: "date", required: false, description: "End date for bulk download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: false, description: "Control area (ERCOT, ISONE, PJM, NYISO, MISO)" },
          { name: "block_types", type: "string", required: false, description: "Block types, comma-separated (7x8,2x16,5x16)" },
          { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

# Download Energy Futures Data
url = "https://api.enerpricedata.com/datasets/download/energy-futures"
headers = {
    "X-API-Key": "YOUR_API_KEY"
}
params = {
    "start_operating_date": "2024-01-15",
    "control_area": "ERCOT",
    "block_types": "7x8,2x16"
}

response = requests.get(url, headers=headers, params=params)

# Save Excel file
with open("energy_futures.xlsx", "wb") as f:
    f.write(response.content)
    
print("Energy futures data downloaded successfully!")`,
          javascript: `// Download Energy Futures Data
const params = new URLSearchParams({
    start_operating_date: '2024-01-15',
    control_area: 'ERCOT',
    block_types: '7x8,2x16'
});

const response = await fetch(\`https://api.enerpricedata.com/datasets/download/energy-futures?\${params}\`, {
    headers: {
        'X-API-Key': 'YOUR_API_KEY'
    }
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'energy_futures.xlsx';
a.click();`,
          ruby: `require 'net/http'

uri = URI('https://api.enerpricedata.com/datasets/download/energy-futures')
params = {
  start_operating_date: '2024-01-15',
  control_area: 'ERCOT',
  block_types: '7x8,2x16'
}
uri.query = URI.encode_www_form(params)

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'

response = http.request(request)
File.write('energy_futures.xlsx', response.body)
puts 'Energy futures data downloaded!'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures?start_operating_date=2024-01-15&control_area=ERCOT&block_types=7x8,2x16" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -o energy_futures.xlsx`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/energy-futures/json",
        title: "Download Energy Futures (JSON)",
        description: "Download energy futures data as JSON with pagination support.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Date for data download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: false, description: "Control area filter" },
          { name: "block_types", type: "string", required: false, description: "Block types filter" },
          { name: "raw", type: "boolean", required: false, description: "Return JSON directly instead of file download" }
        ],
        examples: {
          python: `import requests

# Get Energy Futures JSON Data
url = "https://api.enerpricedata.com/datasets/download/energy-futures/json"
headers = {
    "X-API-Key": "YOUR_API_KEY"
}
params = {
    "start_operating_date": "2024-01-15",
    "control_area": "ERCOT",
    "raw": True
}

response = requests.get(url, headers=headers, params=params)
data = response.json()

print("Retrieved energy futures records")
print("Sample data structure available")`,
          javascript: `// Get Energy Futures JSON Data
const params = new URLSearchParams({
    start_operating_date: '2024-01-15',
    control_area: 'ERCOT',
    raw: 'true'
});

const response = await fetch(\`https://api.enerpricedata.com/datasets/download/energy-futures/json?\${params}\`, {
    headers: {
        'X-API-Key': 'YOUR_API_KEY'
    }
});

const data = await response.json();
console.log('Retrieved energy futures records');
console.log('Sample data structure available');`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.enerpricedata.com/datasets/download/energy-futures/json')
params = {
  start_operating_date: '2024-01-15',
  control_area: 'ERCOT',
  raw: 'true'
}
uri.query = URI.encode_www_form(params)

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'

response = http.request(request)
data = JSON.parse(response.body)

puts "Retrieved energy futures records"
puts "Sample data structure available"`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures/json?start_operating_date=2024-01-15&control_area=ERCOT&raw=true" \\
  -H "X-API-Key: YOUR_API_KEY"`
        }
      }
    ]
  },

  ancillary: {
    title: "Ancillary Uplift Data",
    description: "Access ancillary services uplift data across different control areas. Download in Excel, CSV, or JSON formats with comprehensive filtering options.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/ancillary-uplift",
        title: "Download Ancillary Uplift (Excel)",
        description: "Download ancillary uplift data in Excel format.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
          { name: "end_operating_date", type: "date", required: false, description: "End date for bulk download" },
          { name: "control_area", type: "string", required: false, description: "Control area (ERCOT, ISONE, PJM)" }
        ],
        examples: {
          python: `import requests

# Download Ancillary Uplift Data
url = "https://api.enerpricedata.com/datasets/download/ancillary-uplift"
headers = {
    "X-API-Key": "YOUR_API_KEY"
}
params = {
    "start_operating_date": "2024-01-15",
    "control_area": "ERCOT"
}

response = requests.get(url, headers=headers, params=params)
with open("ancillary_uplift.xlsx", "wb") as f:
    f.write(response.content)`,
          javascript: `const params = new URLSearchParams({
    start_operating_date: '2024-01-15',
    control_area: 'ERCOT'
});

const response = await fetch(\`https://api.enerpricedata.com/datasets/download/ancillary-uplift?\${params}\`, {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const blob = await response.blob();
// Handle file download...`,
          ruby: `require 'net/http'

uri = URI('https://api.enerpricedata.com/datasets/download/ancillary-uplift')
params = { start_operating_date: '2024-01-15', control_area: 'ERCOT' }
uri.query = URI.encode_www_form(params)

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/ancillary-uplift?start_operating_date=2024-01-15&control_area=ERCOT" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -o ancillary_uplift.xlsx`
        }
      }
    ]
  },

  "rec-rps": {
    title: "REC/RPS Data",
    description: "Access Renewable Energy Certificate (REC) and Renewable Portfolio Standard (RPS) data across control areas.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/rec-rps",
        title: "Download REC/RPS Data (Excel)",
        description: "Download REC/RPS data in Excel format.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download" },
          { name: "control_area", type: "string", required: false, description: "Control area filter" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/rec-rps"
headers = {"X-API-Key": "YOUR_API_KEY"}
params = {"start_operating_date": "2024-01-15"}

response = requests.get(url, headers=headers, params=params)`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/datasets/download/rec-rps?start_operating_date=2024-01-15', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});`,
          ruby: `uri = URI('https://api.enerpricedata.com/datasets/download/rec-rps')
request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/rec-rps?start_operating_date=2024-01-15" \\
  -H "X-API-Key: YOUR_API_KEY"`
        }
      }
    ]
  },

  "utility-price": {
    title: "Utility Price Data",
    description: "Access comprehensive utility pricing data including summary and detailed information.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/utility-price",
        title: "Download Utility Price (Excel)",
        description: "Download utility price data in Excel format.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Operating date for download" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/utility-price"
headers = {"X-API-Key": "YOUR_API_KEY"}
params = {"start_operating_date": "2024-01-15"}

response = requests.get(url, headers=headers, params=params)`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/datasets/download/utility-price?start_operating_date=2024-01-15', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});`,
          ruby: `uri = URI('https://api.enerpricedata.com/datasets/download/utility-price')
request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/utility-price?start_operating_date=2024-01-15" \\
  -H "X-API-Key: YOUR_API_KEY"`
        }
      }
    ]
  },

  errors: {
    title: "Error Codes",
    description: "Complete reference of API error codes and their meanings.",
    content: `
      <div class="space-y-6">
        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead class="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Error Code</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Meaning</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">400</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Bad Request — Your request is invalid or missing required parameters.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">401</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Unauthorized — Your API credentials are incorrect or missing.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">403</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Forbidden — You do not have permission to access this resource.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">404</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Not Found — The requested data or endpoint could not be found.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">429</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Too Many Requests — You've hit the rate limit. Please wait and try again.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">500</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Internal Server Error — Something went wrong on our end.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },

  notebook: {
    title: "Example Notebook",
    description: "Interactive Jupyter notebook with comprehensive API usage examples.",
    content: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Interactive Examples</h3>
          <p class="text-blue-800 dark:text-blue-200 mb-4">Explore our comprehensive Jupyter notebook with real-world examples and best practices.</p>
          <a href="https://colab.research.google.com/notebook" target="_blank" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Open in Google Colab
            <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    `
  },

  support: {
    title: "Support & Contact",
    description: "Get help with API integration, troubleshooting, and technical questions.",
    content: `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Support</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Get help with API integration and technical issues.</p>
            <a href="mailto:support@enerpricedata.com" class="text-blue-600 dark:text-blue-400 hover:underline">support@enerpricedata.com</a>
          </div>
          
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sales & Partnerships</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Discuss enterprise solutions and partnerships.</p>
            <a href="mailto:sales@enerpricedata.com" class="text-blue-600 dark:text-blue-400 hover:underline">sales@enerpricedata.com</a>
          </div>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Documentation Feedback</h3>
          <p class="text-gray-600 dark:text-gray-300">Found an issue with our documentation? Help us improve by reporting it.</p>
        </div>
      </div>
    `
  }
};