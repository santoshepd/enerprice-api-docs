<<<<<<< HEAD
# EnerPrice API Documentation

## Tech Stack

- **Frontend**: React 19, TypeScript (optional)
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build**: Create React App with Craco
- **Deployment**: GitHub Pages, Netlify, Vercel, Firebase

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Git

##  Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/enerPrice-api-docs.git
cd enerPrice-api-docs
```

### 2. Install Dependencies

```bash
cd frontend
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm start
# or
yarn start
```

Visit `http://localhost:3000` to see the documentation in action!

## Customization

### Update Your API Information

1. **Edit API Data**: Modify `/src/mockData.js` to include your API endpoints
2. **Update Branding**: Replace logo and company information in `/src/App.js`
3. **Customize Colors**: Modify the theme in `tailwind.config.js`

### Example: Adding a New API Endpoint

```javascript
// In /src/mockData.js
export const mockApiData = {
  "your-endpoint": {
    title: "Your API Endpoint",
    description: "Description of your endpoint",
    endpoints: [
      {
        method: "GET",
        url: "/your/api/endpoint",
        title: "Your Endpoint Title",
        description: "Endpoint description",
        parameters: [
          { name: "param1", type: "string", required: true, description: "Parameter description" }
        ],
        examples: {
          python: `import requests\nresponse = requests.get("https://api.yourservice.com/endpoint")`,
          javascript: `fetch('https://api.yourservice.com/endpoint')`,
          ruby: `require 'net/http'\nuri = URI('https://api.yourservice.com/endpoint')`,
          curl: `curl -X GET "https://api.yourservice.com/endpoint"`
        }
      }
    ]
  }
};
```

## Available Scripts

In the `frontend` directory:

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm run deploy:netlify` - Build for Netlify
- `npm run deploy:vercel` - Deploy to Vercel
- `npm run deploy:firebase` - Deploy to Firebase
- `npm run analyze` - Analyze bundle size
- `npm run serve` - Serve production build locally

##  Theme Customization

### Dark/Light Theme

The app supports both dark and light themes. Default is dark theme (black background). Users can toggle between themes using the theme switcher in the navigation.

### Custom Colors

Modify `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#your-primary-color',
          foreground: '#your-text-color',
        },
      }
    }
  }
}
```
EnerPrice Data - API Documentation Guide
>>>>>>> 401601471aacad65b4b6f82bb0b8426d4077a1d6
