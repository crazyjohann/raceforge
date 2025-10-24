# 🏁 RaceForge

A production-grade, fully deployable 3D racing game built with React, Three.js, and Vite. Experience high-octane racing with 10 authentic car models and realistic 3D tracks.

![RaceForge](https://img.shields.io/badge/version-1.0.0-orange) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Three.js](https://img.shields.io/badge/Three.js-0.160.0-green)

## ✨ Features

- **10 Authentic Racing Cars**: From classic 1962 Corvette Grand Sport to modern BMW M4 GT4
- **3D Racing Experience**: Fully interactive 3D environment with realistic car physics
- **2 Racing Tracks**: Drift Circuit and Paris Street Circuit with unique challenges
- **Multiple Camera Views**: 4 camera angles (Chase, Close, Far, Cockpit) - Press C to switch
- **Real-time HUD**: Speed, lap times, position, and controls display
- **Leaderboard System**: Track and compare your best lap times
- **Responsive Controls**: WASD or Arrow keys for intuitive gameplay
- **Modern UI**: Sleek, racing-themed interface with smooth animations
- **Production Ready**: Optimized for deployment on Vercel, Netlify, or Render

## 🎮 Gameplay

### Controls
- **W / ↑**: Accelerate
- **S / ↓**: Brake/Reverse
- **A / ←**: Steer Left
- **D / →**: Steer Right
- **C**: Switch Camera View (Chase/Close/Far/Cockpit)
- **ESC**: Pause/Exit to Menu

### Game Flow
1. **Main Menu**: Start a race or view leaderboards
2. **Car Selection**: Choose from 10 unique cars with different stats
3. **Track Selection**: Select your racing circuit
4. **Race**: Complete 3 laps and set your best time
5. **Results**: View your lap times and leaderboard position

## 📁 Project Structure

```
raceforge/
├── public/
│   └── index.html              # Main HTML entry point
├── src/
│   ├── assets/
│   │   ├── cars/               # 10 car models (car1.glb - car10.glb)
│   │   │   ├── car1.glb        # 1962 Chevrolet Corvette Grand Sport
│   │   │   ├── car2.glb        # 1965 Shelby Cobra Daytona Coupe
│   │   │   ├── car3.glb        # 1970 Porsche 917K
│   │   │   ├── car4.glb        # 1975 BMW 3.0 CSL E9
│   │   │   ├── car5.glb        # 1998 Mercedes-Benz CLK LM
│   │   │   ├── car6.glb        # 2009 Audi R15 TDI
│   │   │   ├── car7.glb        # 2010 BMW Z4 GT3
│   │   │   ├── car8.glb        # 2010 Chevrolet Corvette C6.R
│   │   │   ├── car9.glb        # 2018 BMW M2 Competition
│   │   │   └── car10.glb       # 2018 BMW M4 GT4
│   │   └── tracks/
│   │       └── track1.glb      # Drift Race Track
│   ├── components/
│   │   ├── CarSelector.jsx     # Car selection screen with 3D preview
│   │   ├── Leaderboard.jsx     # Leaderboard display
│   │   ├── Menu.jsx            # Main menu
│   │   ├── HUD.jsx             # In-game heads-up display
│   │   └── TrackMap.jsx        # Track selection screen
│   ├── game/
│   │   ├── GameCanvas.jsx      # Main game container
│   │   ├── ThreeScene.jsx      # Three.js 3D scene with physics
│   │   ├── cars.js             # Car data and configurations
│   │   └── tracks.js           # Track data and leaderboard logic
│   ├── styles/
│   │   ├── main.module.css     # Game and HUD styles
│   │   ├── menu.module.css     # Menu styles
│   │   ├── carselector.module.css  # Car/Track selector styles
│   │   └── leaderboard.module.css  # Leaderboard styles
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # React entry point
├── .env.example                # Environment variables template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd raceforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The game should load automatically

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Car Statistics

Each car has unique performance characteristics:

| Car | Year | Speed | Acceleration | Handling | Weight |
|-----|------|-------|--------------|----------|--------|
| Corvette Grand Sport | 1962 | 85 | 78 | 82 | 1100kg |
| Shelby Cobra Daytona | 1965 | 92 | 85 | 88 | 1050kg |
| Porsche 917K | 1970 | 95 | 90 | 92 | 800kg |
| BMW 3.0 CSL | 1975 | 80 | 75 | 85 | 1150kg |
| Mercedes CLK LM | 1998 | 94 | 88 | 90 | 900kg |
| Audi R15 TDI | 2009 | 96 | 92 | 94 | 900kg |
| BMW Z4 GT3 | 2010 | 88 | 82 | 90 | 1200kg |
| Corvette C6.R | 2010 | 90 | 85 | 87 | 1100kg |
| BMW M2 Competition | 2018 | 82 | 80 | 88 | 1550kg |
| BMW M4 GT4 | 2018 | 86 | 83 | 91 | 1400kg |

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to Netlify
3. Or use Netlify CLI: `netlify deploy --prod --dir=dist`

### Deploy to Render

1. Create a new Static Site on Render
2. Connect your repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

## 🔧 Adding Custom Assets

### Adding New Cars

1. Place your `.glb` car model in `src/assets/cars/`
2. Edit `src/game/cars.js`:
   ```javascript
   {
     id: 11,
     name: "Your Car Name",
     model: "/src/assets/cars/your-car.glb",
     speed: 90,
     acceleration: 85,
     handling: 88,
     weight: 1200,
     description: "Your car description",
     year: 2024
   }
   ```

### Adding New Tracks

1. Place your `.glb` track model in `src/assets/tracks/`
2. Edit `src/game/tracks.js`:
   ```javascript
   {
     id: 2,
     name: "Your Track Name",
     model: "/src/assets/tracks/your-track.glb",
     length: 3.5,
     corners: 15,
     difficulty: "Hard",
     description: "Your track description"
   }
   ```

## 🎯 Technical Details

### Technologies Used
- **React 18.2**: UI framework
- **Three.js 0.160**: 3D rendering engine
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for R3F
- **Vite 5**: Build tool and dev server
- **CSS Modules**: Scoped styling

### Performance Optimizations
- Code splitting for Three.js libraries
- Lazy loading of 3D models
- Optimized asset loading
- Efficient render loops
- Minimal re-renders

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🐛 Troubleshooting

### Models not loading
- Ensure all `.glb` files are in the correct directories
- Check browser console for 404 errors
- Verify file paths in `cars.js` and `tracks.js`

### Performance issues
- Reduce graphics quality in browser settings
- Close other tabs/applications
- Update graphics drivers
- Try a different browser

### Controls not working
- Click on the game canvas to focus
- Check if another application is capturing keyboard input
- Try refreshing the page

## 📝 License

This project is open source and available for educational and personal use.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new cars or tracks
- Improve physics and gameplay
- Enhance UI/UX
- Fix bugs
- Optimize performance

## 🎮 Credits

- Car models: Various sources (see individual model credits)
- Track model: Drift Race Track Free
- Built with ❤️ using React and Three.js

## 📞 Support

For issues, questions, or suggestions, please open an issue on the project repository.

---

**Ready to race? Start your engines! 🏎️💨**
