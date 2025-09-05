# EnerPrice API Documentation - Deployment Guide

This guide provides step-by-step instructions for deploying the EnerPrice API Documentation UI to various hosting platforms.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git
- GitHub account (for GitHub Pages)

## 🏗️ Build Configuration

### 1. Update Package.json for Deployment

Add the following to your `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 2. Install GitHub Pages Deployment Package

```bash
npm install --save-dev gh-pages
```

## 🚀 Deployment Options

---

## Option 1: GitHub Pages (Free & Easy)

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EnerPrice API Documentation"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. **Update homepage in package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/enerPrice-api-docs"
   }
   ```

### Step 2: Configure Router for GitHub Pages

Update your `App.js` to handle GitHub Pages routing:

```javascript
// In App.js, update BrowserRouter
function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/your-repo-name">
        {/* Rest of your app */}
      </BrowserRouter>
    </div>
  );
}
```

### Step 3: Deploy to GitHub Pages

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

### Step 4: Configure GitHub Repository Settings

1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Select **Source**: Deploy from a branch
5. Select **Branch**: `gh-pages`
6. Click **Save**

Your site will be available at: `https://yourusername.github.io/your-repo-name`

---

## Option 2: Netlify (Recommended for Production)

### Method A: Git-based Deployment

1. **Push code to GitHub** (same as Step 1 above)

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

3. **Configure Build Settings:**
   ```
   Build command: npm run build
   Publish directory: build
   ```

4. **Deploy:** Netlify will automatically build and deploy

### Method B: Manual Deployment

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### Custom Domain on Netlify

1. Go to **Site settings** → **Domain management**
2. Add your custom domain
3. Configure DNS records as instructed

---

## Option 3: Vercel (Excellent Performance)

### Method A: Git Integration

1. **Push to GitHub** (same as above)

2. **Deploy with Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure:
     ```
     Framework Preset: Create React App
     Build Command: npm run build
     Output Directory: build
     ```

### Method B: CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

---

## Option 4: AWS S3 + CloudFront

### Step 1: Build the Project

```bash
npm run build
```

### Step 2: Create S3 Bucket

```bash
# Install AWS CLI and configure
aws configure

# Create bucket
aws s3 mb s3://your-api-docs-bucket

# Upload build files
aws s3 sync build/ s3://your-api-docs-bucket --delete
```

### Step 3: Configure S3 for Static Hosting

```bash
# Enable static website hosting
aws s3 website s3://your-api-docs-bucket --index-document index.html --error-document error.html
```

### Step 4: Set Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-api-docs-bucket/*"
    }
  ]
}
```

---

## Option 5: Firebase Hosting

### Step 1: Setup Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting
```

### Step 2: Configure Firebase

Select these options:
- **Public directory:** `build`
- **Single-page app:** `Yes`
- **Automatic builds:** `No`

### Step 3: Deploy

```bash
# Build and deploy
npm run build
firebase deploy
```

---

## 🔧 Configuration Files

### Create `.env.production` file:

```env
# Production environment variables
REACT_APP_API_BASE_URL=https://api.enerpricedata.com
REACT_APP_ENVIRONMENT=production
```

### Create `public/_redirects` (for Netlify):

```
/*    /index.html   200
```

### Create `public/404.html` (for GitHub Pages):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>EnerPrice API Docs</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

---

## 🎨 Customization Guide

### 1. Update Branding

Replace placeholder content in `/src/mockData.js`:

```javascript
// Update API base URL
const API_BASE_URL = 'https://your-api-domain.com';

// Update company information
const COMPANY_INFO = {
  name: 'Your Company',
  supportEmail: 'support@yourcompany.com',
  salesEmail: 'sales@yourcompany.com'
};
```

### 2. Update Logo

Replace the logo section in `App.js`:

```javascript
// Replace the gradient logo with your actual logo
<img src="/path-to-your-logo.png" alt="Your Company" className="w-10 h-10" />
```

### 3. Customize Colors

Update color scheme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#your-primary-color',
          foreground: '#your-text-color',
        },
        // Add more custom colors
      }
    }
  }
}
```

### 4. Add Your API Endpoints

Update `/src/mockData.js` with your actual API documentation:

```javascript
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
          // Your parameters
        ],
        examples: {
          python: `# Your Python example`,
          javascript: `// Your JavaScript example`,
          // etc.
        }
      }
    ]
  }
};
```

---

## 🔒 Environment Variables

### Development (.env.development)

```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
```

### Production (.env.production)

```env
REACT_APP_API_BASE_URL=https://your-production-api.com
REACT_APP_ENVIRONMENT=production
```

---

## 📱 Mobile Optimization

The UI is already responsive, but you can enhance mobile experience:

### Add PWA Support

1. **Install workbox:**
   ```bash
   npm install --save-dev workbox-webpack-plugin
   ```

2. **Update public/manifest.json:**
   ```json
   {
     "short_name": "API Docs",
     "name": "Your API Documentation",
     "icons": [
       {
         "src": "favicon.ico",
         "sizes": "64x64 32x32 24x24 16x16",
         "type": "image/x-icon"
       }
     ],
     "start_url": ".",
     "display": "standalone",
     "theme_color": "#000000",
     "background_color": "#ffffff"
   }
   ```

---

## 🚨 Troubleshooting

### Common Issues:

1. **Blank page after deployment:**
   - Check homepage in package.json
   - Verify build files are uploaded correctly

2. **Routing issues:**
   - Add basename to BrowserRouter
   - Configure server redirects for SPA

3. **HTTPS mixed content:**
   - Ensure all resources use HTTPS in production

4. **Build fails:**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall

### Debug Commands:

```bash
# Check build locally
npm run build
npx serve -s build

# Check for broken links
npm install -g broken-link-checker
blc http://localhost:3000

# Bundle analyzer
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

---

## 📊 Analytics Integration

### Google Analytics 4

Add to `public/index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

---

## 📋 Final Checklist

Before deployment:

- [ ] Update all placeholder content
- [ ] Replace logo and branding
- [ ] Configure environment variables
- [ ] Test responsive design
- [ ] Verify all links work
- [ ] Test theme switching
- [ ] Check code copy functionality
- [ ] Optimize images and assets
- [ ] Set up analytics (optional)
- [ ] Configure custom domain (optional)

---

## 🎯 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npx webpack-bundle-analyzer build/static/js/*.js

# Pre-gzip assets
npm install -g gzipper
gzipper compress --verbose ./build
```

### Lighthouse Score Improvements

1. **Image optimization:** Use WebP format
2. **Font loading:** Preload critical fonts
3. **CSS critical path:** Inline critical CSS
4. **JavaScript splitting:** Code splitting with React.lazy

---

Your API documentation is now ready for deployment! Choose the platform that best fits your needs and follow the corresponding steps above.