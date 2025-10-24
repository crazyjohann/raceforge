# 🚀 RaceForge Deployment Guide

## Quick Start

### Local Development
```bash
cd raceforge
npm install
npm run dev
```
Visit `http://localhost:3000`

### Production Build
```bash
npm run build
```
Output: `dist/` folder

---

## Deploy to Render (Recommended for Static Sites)

### Method 1: Via Render Dashboard

1. **Create Account**: Go to [render.com](https://render.com) and sign up
2. **New Static Site**: Click "New +" → "Static Site"
3. **Connect Repository**: 
   - Connect your GitHub/GitLab account
   - Or use "Public Git repository" and paste your repo URL
4. **Configure Build**:
   - **Name**: `raceforge`
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. **Deploy**: Click "Create Static Site"

### Method 2: Via Render CLI

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
render deploy
```

### Render Configuration File (render.yaml)
Create this file in your project root:

```yaml
services:
  - type: web
    name: raceforge
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

## Deploy to Vercel

### Method 1: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Vercel auto-detects Vite settings
5. Click "Deploy"

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

---

## Deploy to Netlify

### Method 1: Drag & Drop

1. Build locally: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to the deploy zone

### Method 2: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Method 3: Git Integration

1. Push code to GitHub/GitLab
2. Connect repository in Netlify dashboard
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

---

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/raceforge"
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/raceforge/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

---

## Environment Variables

If you need environment variables, create `.env` file:

```env
VITE_MAX_LAPS=3
VITE_DEBUG_MODE=false
```

For production, set these in your hosting platform's dashboard.

---

## Performance Checklist

✅ All assets are optimized
✅ Code splitting enabled
✅ Lazy loading for 3D models
✅ CSS modules for scoped styles
✅ Production build minified
✅ Source maps disabled in production

---

## Post-Deployment Testing

1. **Load Time**: Should load in < 5 seconds
2. **3D Models**: All cars and tracks render correctly
3. **Controls**: WASD/Arrow keys work
4. **Leaderboard**: LocalStorage persists data
5. **Mobile**: Test on mobile devices (if responsive)

---

## Troubleshooting

### Assets Not Loading
- Check asset paths are relative: `/src/assets/...`
- Verify all `.glb` files are committed to repo
- Check browser console for 404 errors

### Build Fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`
- Check Node version: `node -v` (should be 18+)

### Performance Issues
- Enable compression on hosting platform
- Use CDN for static assets
- Check browser console for errors

---

## Custom Domain Setup

### Render
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

### Vercel
1. Go to Project Settings → Domains
2. Add domain and follow DNS instructions

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

---

## Monitoring & Analytics

Consider adding:
- Google Analytics
- Sentry for error tracking
- Performance monitoring tools

---

## Support

For deployment issues:
- Check hosting platform documentation
- Review build logs
- Test locally first with `npm run preview`

**Your game is ready to deploy! 🎮🚀**
