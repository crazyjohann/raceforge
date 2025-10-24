# 🏁 RaceForge - Quick Start Guide

## 🚀 Get Racing in 3 Steps

### Step 1: Install Dependencies
```bash
cd raceforge
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to: **http://localhost:3000**

---

## 🎮 First Time Playing?

1. **Main Menu** → Click "START RACE"
2. **Car Selection** → Browse 10 cars, select one
3. **Track Selection** → Choose your track
4. **Race!** → Use WASD or Arrow keys to drive

---

## ⌨️ Controls

| Key | Action |
|-----|--------|
| W / ↑ | Accelerate |
| S / ↓ | Brake/Reverse |
| A / ← | Steer Left |
| D / → | Steer Right |
| ESC | Exit to Menu |

---

## 📦 What's Included

✅ **10 Authentic Cars** - From classic to modern racing machines
✅ **3D Racing Track** - Drift circuit with elevation changes
✅ **Real-time Physics** - Realistic car handling and movement
✅ **Leaderboard System** - Track your best lap times
✅ **Modern UI** - Sleek racing-themed interface
✅ **Production Ready** - Deploy to Vercel, Netlify, or Render

---

## 🏗️ Build for Production

```bash
npm run build
```

Output folder: `dist/`

---

## 🌐 Deploy Now

### Render (Recommended)
```bash
# Push to GitHub, then:
# 1. Go to render.com
# 2. New Static Site
# 3. Connect repo
# 4. Build: npm run build
# 5. Publish: dist
```

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🎯 Game Features

### Car Stats Matter!
- **Speed**: Maximum velocity
- **Acceleration**: How fast you reach top speed
- **Handling**: Turn responsiveness
- **Weight**: Affects momentum and control

### Leaderboard
- Best lap times saved locally
- Top 10 times per track
- Compare your performance

### Race Format
- 3 laps per race
- Lap time tracking
- Personal best records

---

## 🔧 Customization

### Add Your Own Cars
1. Place `.glb` file in `src/assets/cars/`
2. Edit `src/game/cars.js`
3. Add car data with stats

### Add Your Own Tracks
1. Place `.glb` file in `src/assets/tracks/`
2. Edit `src/game/tracks.js`
3. Add track configuration

---

## 📱 Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

---

## 🐛 Common Issues

### Models not loading?
- Check browser console (F12)
- Verify `.glb` files are in correct folders
- Clear cache and reload

### Performance slow?
- Close other browser tabs
- Update graphics drivers
- Try Chrome for best performance

### Controls not working?
- Click on the game canvas
- Check keyboard isn't captured by other app
- Refresh the page

---

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Project Structure**: All files organized in `src/`

---

## 🎊 You're Ready!

Start your engines and enjoy RaceForge! 🏎️💨

**Pro Tip**: Try different cars on the same track to find your favorite!
