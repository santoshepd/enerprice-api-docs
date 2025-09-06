import apiImage from './assets/api.png';



export const mockApiData = {
  home: {
    title: "EnerPrice API Documentation",
    description: "Welcome to the comprehensive EnerPrice API documentation, your gateway to accessing futures energy market data, ancillary and uplift charges, REC credits and portfolio standards, utility pricing data, and detailed rate structures through our powerful FAST API.",
    content: `
      <div class="space-y-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Getting Started</h3>
          <p class="text-blue-800 dark:text-blue-200">
          Begin by obtaining your API key through
          <a
            href="https://app.enerpricedata.com"
            target="_blank"
            rel="noopener noreferrer"
            class="underline text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
          >
            app.enerpricedata.com
          </a>
        </p>
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
    content: `
    <div class="space-y-6">
      <p class="text-gray-800 dark:text-gray-300">
        Secure your API access with API key authentication. Each user can maintain one active API key.
      </p>
      <div class="flex justify-center">
        <img src="${apiImage}" alt="API Key Screenshot" class="w-full max-w-3xl h-auto rounded-md border shadow-md"/>
      </div>
      <ol class="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-2">
        <li>Login to your account at <a href="https://app.enerpricedata.com" class="text-blue-600 dark:text-blue-400 underline">app.enerpricedata.com</a></li>
        <li>Click on your profile icon at the top right corner.</li>
        <li>Click on <strong>Create new API Key</strong>, give it a name, and click <strong>Create</strong>.</li>
        <li><em>(Optional)</em> Click <strong>Regenerate API Key</strong> if you lost the previous one.</li>
      </ol>
    </div>
  `
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
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO, MISO)" },
          { name: "block_types", type: "string", required: false, description: "Block types, comma-separated (7x8,2x16,5x16)" },
          { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `
import requests

# Download Energy Futures Data
url = "https://api.enerpricedata.com/datasets/download/energy-futures"

headers = {
    "X-API-Key": "YOUR_API_KEY"
}

params = {
    "start_operating_date": "2024-01-15",
    "end_operating_date": "2024-01-15",
    "control_area": "ERCOT",
    "block_types": "7x8,2x16",
    "start_date":"",
    "end_date":"",
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_EnergyFutures_{control_area}_{end_op_date}.xlsx"


if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    # If an error occurs, print status and response text
    print(f"Error {response.status_code}: {response.text}")
    
print("Energy futures data downloaded successfully!")`,
          javascript: `// Download Energy Futures Data
const params = new URLSearchParams({
  start_operating_date: '2024-01-15',
  end_operating_date: '2024-01-15',
  control_area: 'ERCOT',
  block_types: '7x8,2x16',
  start_date: '',
  end_date: ''
});

const controlArea = params.get("control_area");
const endDate = params.get("end_operating_date") || params.get("start_operating_date");
const filename = \`EPD_EnergyFutures_\${controlArea}_\${endDate}.xlsx\`;

const response = await fetch(\`https://api.enerpricedata.com/datasets/download/energy-futures?\${params}\`, {
  headers: {
    'X-API-Key': 'YOUR_API_KEY'
  }
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = filename;
a.click();`,
          ruby: `require 'net/http'

uri = URI('https://api.enerpricedata.com/datasets/download/energy-futures')
params = {
  start_operating_date: "2024-01-15",
  end_operating_date: "2024-01-15",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  start_date: "",
  end_date: ""
}
uri.query = URI.encode_www_form(params)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.code.to_i == 200
  filename = "EPD_EnergyFutures_#{params[:control_area]}_#{params[:end_operating_date]}.xlsx"
  File.open(filename, 'wb') { |file| file.write(res.body) }
  puts "File downloaded successfully and saved as '#{filename}'"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures?start_operating_date=2024-01-15&end_operating_date=2024-01-15&control_area=ERCOT&block_types=7x8,2x16&start_date=&end_date=" \
  -H "X-API-Key: YOUR_API_KEY" \
  --output "EPD_EnergyFutures_ERCOT_2024-01-15.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/energy-futures/csv",
        title: "Download Energy Futures (CSV)",
        description: "Download energy futures data in CSV format. Supports single date or date range downloads.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
          { name: "end_operating_date", type: "date", required: false, description: "End date for bulk download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO, MISO)" },
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
    "end_operating_date": "2024-01-15",
    "control_area": "ERCOT",
    "block_types": "7x8,2x16",
    "start_date":"",
    "end_date":"",
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_EnergyFutures_{control_area}_{end_op_date}.csv"


if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    # status and response text
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `// Download Energy Futures Data
const params = new URLSearchParams({
  start_operating_date: "2024-01-15",
  end_operating_date: "2024-01-15",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  start_date: "",
  end_date: ""
});

const controlArea = params.get("control_area");
const endOpDate = params.get("end_operating_date") || params.get("start_operating_date");
const filename = \`EPD_EnergyFutures_\${controlArea}_\${endOpDate}.csv\`;

fetch(\`https://api.enerpricedata.com/datasets/download/energy-futures?\${params.toString()}\`, {
  method: "GET",
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
  .then(response => {
    if (!response.ok) throw new Error(\`Error \${response.status}: \${response.statusText}\`);
    return response.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    console.log(\`Downloaded: \${filename}\`);
  })
  .catch(err => console.error("Download failed:", err));`,
          ruby: `require 'net/http'

uri = URI('https://api.enerpricedata.com/datasets/download/energy-futures')
params = {
  start_operating_date: "2024-01-15",
  end_operating_date: "2024-01-15",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  start_date: "",
  end_date: ""
}

url.query = URI.encode_www_form(params)
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["X-API-Key"] = "YOUR_API_KEY"

response = http.request(request)

if response.code == "200"
  filename = "EPD_EnergyFutures_#{params[:control_area]}_#{params[:end_operating_date]}.csv"
  File.open(filename, "wb") { |file| file.write(response.body) }
  puts "File downloaded successfully and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures" \
  -H "X-API-Key: YOUR_API_KEY" \
  -G \
  --data-urlencode "start_operating_date=2024-01-15" \
  --data-urlencode "end_operating_date=2024-01-15" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "block_types=7x8,2x16" \
  --data-urlencode "start_date=" \
  --data-urlencode "end_date=" \
  -o "EPD_EnergyFutures_ERCOT_2024-01-15.csv"`
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
    "end_operating_date": "2024-01-15",
    "control_area": "ERCOT",
    "block_types": "7x8,2x16",
    "start_date":"",
    "end_date":"",
}

response = requests.get(url, headers=headers, params=params)
control_area = params["control_area"]
end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_EnergyFutures_{control_area}_{end_op_date}.json"


if response.status_code == 200:
    data = response.json()
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
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

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/energy-futures/json"

params = {
  start_operating_date: "2025-08-25",
  end_operating_date: "2025-08-25",
  control_area: "ERCOT",
  block_types: "",
  start_date: "2025-08-01",
  end_date: "2030-09-01"
}

uri = URI("#{base_url}#{endpoint}")
uri.query = URI.encode_www_form(params)

request = Net::HTTP::Get.new(uri)
request["X-API-Key"] = "YOUR_API_KEY"

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

if response.is_a?(Net::HTTPSuccess)
  data = JSON.parse(response.body)
  filename = "EPD_EnergyFutures_ERCOT_2025-08-25.json"
  File.write(filename, JSON.pretty_generate(data))
  puts "File downloaded and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures/json?start_operating_date=2025-08-25&end_operating_date=2025-08-25&control_area=ERCOT&block_types=&start_date=2025-08-01&end_date=2030-09-01" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o "EPD_EnergyFutures_ERCOT_2025-08-25.json"`
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
          { name: "start_operating_date", type: "date", required: true, description: "Operating date for download" },
          { name: "end_operating_date", type: "date", required: false, description: "Operating End date for download" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/utility-price"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {"start_operating_date": "2024-01-15"}

response = requests.get(url, headers=headers, params=params)
end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_UtilityPrice_{end_op_date}.xlsx"


if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    # If an error occurs, print status and response text
    print(f"Error {response.status_code}: {response.text}")`,
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
    title: "Example",
    description: "Interactive Jupyter notebook with comprehensive API usage examples using Python.",
    content: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Interactive Examples</h3>
          <p class="text-blue-800 dark:text-blue-200 mb-4">Explore our comprehensive Jupyter notebook with examples and best practices.</p>
          <a href="https://colab.research.google.com/github/santoshepd/enerprice-api-docs/blob/main/frontend/notebooks/demo.ipynb
" target="_blank" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
    description: "Get help with API integration, troubleshooting, and technical queries.",
    content: `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Support</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Get help with API integration and technical issues.</p>
            <a href="mailto:info@enerpricedata.com" class="text-blue-600 dark:text-blue-400 hover:underline">info@enerpricedata.com</a>
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