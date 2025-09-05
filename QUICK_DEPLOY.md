# 🚀 Quick Deployment Reference

## 📋 Pre-deployment Checklist

Before deploying, make sure to:

```bash
# 1. Update package.json homepage (for GitHub Pages)
"homepage": "https://yourusername.github.io/your-repo-name"

# 2. Customize your API data in /src/mockData.js
# 3. Update branding and logo in /src/App.js
# 4. Test locally
npm start
```

## ⚡ 1-Minute Deployments

### GitHub Pages (Free)
```bash
# One-time setup
npm install -g gh-pages
git init
git remote add origin https://github.com/yourusername/your-repo.git
git add .
git commit -m "Initial commit"
git push -u origin main

# Deploy
cd frontend
npm run deploy
```
**✅ Live at**: `https://yourusername.github.io/your-repo`

### Netlify (Easiest)
```bash
# Build
cd frontend
npm run build

# Deploy: Drag & drop 'build' folder to netlify.com
# Or connect GitHub repo for auto-deploy
```
**✅ Live at**: `https://random-name.netlify.app`

### Vercel (Fastest)
```bash
# One-time setup
npm install -g vercel

# Deploy
cd frontend
npm run build
vercel --prod
```
**✅ Live at**: `https://your-project.vercel.app`

## 🔧 Essential Customizations

### 1. Replace Placeholder Content
```javascript
// In /src/mockData.js - Update with your actual API
const API_BASE_URL = 'https://your-api.com';
const COMPANY_NAME = 'Your Company';
```

### 2. Update Logo
```javascript
// In /src/App.js - Replace the gradient logo
<img src="/your-logo.png" alt="Your Company" className="w-10 h-10" />
```

### 3. Custom Domain (Netlify/Vercel)
- **Netlify**: Site Settings → Domain Management → Add Custom Domain
- **Vercel**: Project Settings → Domains → Add Domain

## 🚨 Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| Blank page after deploy | Check `homepage` in package.json and router basename |
| 404 on refresh | Add `_redirects` file for Netlify or configure server |
| Build fails | Update Node.js to v16+, clear node_modules, reinstall |
| Assets not loading | Ensure all paths are relative, check public folder |

## 📱 Mobile-First Testing

Before deploying, test on mobile:
```bash
# Test responsive design
npm start
# Open DevTools → Toggle device toolbar
# Test on iPhone, iPad, Android viewports
```

## 🎯 Production Optimization

```bash
# Analyze bundle size
cd frontend
npm run analyze

# Test production build locally
npm run build
npm run serve
```

## 📊 Quick Metrics Check

After deployment, verify:
- [ ] **Page Speed**: Use [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] **Mobile Friendly**: Use [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] **Accessibility**: Use [WAVE](https://wave.webaim.org/)

## 🔄 Update & Redeploy

```bash
# Make changes to your code
git add .
git commit -m "Update documentation"
git push

# Redeploy
npm run deploy  # GitHub Pages
# Or push to main branch for auto-deploy (Netlify/Vercel)
```

---

**🎉 You're ready to deploy! Choose your platform and follow the steps above.**