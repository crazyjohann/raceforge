# 🎮 RaceForge - Testing Guide

## ✅ Latest Updates Applied

### Camera System Improvements
- ✅ **4 Camera Views**: Chase, Close, Far, and Cockpit
- ✅ **Press C** to cycle through camera views during race
- ✅ **Improved Tracking**: Camera now smoothly follows car and looks ahead
- ✅ **Better FOV**: Each view has optimized field of view
- ✅ **Camera Indicator**: Shows current camera view at top center of HUD

### UI/UX Improvements
- ✅ **Professional Fonts**: 
  - Orbitron for titles and headings
  - Rajdhani for body text and UI elements
- ✅ **Organized HUD Layout**:
  - Top Left: Lap info, time, best lap
  - Top Center: Camera view indicator (NEW!)
  - Top Right: Position
  - Bottom Center: Speedometer
  - Bottom Left: Controls help (updated with C key)

---

## 🎮 How to Test the Game

### 1. Access the Game
- **URL**: http://localhost:3000
- The dev server is already running!

### 2. Main Menu
- Click **START RACE** button
- Or click **LEADERBOARD** to view lap times

### 3. Car Selection
- **Browse Cars**: Use PREVIOUS/NEXT buttons
- **3D Preview**: Rotate view with mouse drag
- **View Stats**: Speed, Acceleration, Handling, Weight
- **Select**: Click SELECT CAR button

### 4. Track Selection
- **View Track**: 3D preview of the circuit
- **Track Info**: Length, corners, difficulty
- **Start Race**: Click START RACE button

### 5. Racing Controls

#### Movement
- **W or ↑**: Accelerate
- **S or ↓**: Brake/Reverse
- **A or ←**: Steer Left
- **D or →**: Steer Right

#### Camera Views (NEW!)
- **C Key**: Cycle through 4 camera views
  1. **CHASE**: Default view (10 units back, 5 up)
  2. **CLOSE**: Closer follow (6 units back, 3 up)
  3. **FAR**: Wide view (15 units back, 8 up)
  4. **COCKPIT**: First-person view (inside car)

#### Other
- **ESC**: Exit to menu

### 6. HUD Elements

**Top Left:**
- LAP: Current lap / Total laps
- TIME: Current lap time
- BEST: Best lap time (if available)

**Top Center (NEW!):**
- CAMERA: Current camera view name

**Top Right:**
- Position indicator (1ST, 2ND, etc.)

**Bottom Center:**
- Speedometer (KM/H)

**Bottom Left:**
- Controls reference

### 7. Race Completion
- Complete 3 laps
- View results screen with:
  - Best lap time
  - Total time
  - Individual lap times
- Return to menu

---

## 🧪 Testing Checklist

### Main Menu
- [ ] Title displays with Orbitron font
- [ ] START RACE button works
- [ ] LEADERBOARD button works
- [ ] Animations smooth

### Car Selection
- [ ] All 10 cars load and display
- [ ] 3D models rotate smoothly
- [ ] Stats display correctly
- [ ] Navigation buttons work
- [ ] SELECT CAR proceeds to track selection

### Track Selection
- [ ] Track 3D model loads
- [ ] Track info displays
- [ ] Selected car shown
- [ ] START RACE begins game

### Racing Gameplay
- [ ] Car loads on track
- [ ] WASD/Arrow controls work
- [ ] Car accelerates and brakes
- [ ] Steering responsive
- [ ] Car stays visible (doesn't go off-screen)

### Camera System (IMPORTANT!)
- [ ] **Press C** - Camera view changes
- [ ] **CHASE view** - Car visible from behind
- [ ] **CLOSE view** - Tighter follow
- [ ] **FAR view** - Wider perspective
- [ ] **COCKPIT view** - First-person
- [ ] Camera indicator updates at top center
- [ ] Camera follows car smoothly
- [ ] Car always in view
- [ ] No camera clipping

### HUD
- [ ] Lap counter updates
- [ ] Timer runs
- [ ] Speed updates in real-time
- [ ] Camera view indicator shows current view
- [ ] All fonts render correctly (Rajdhani/Orbitron)
- [ ] HUD elements don't overlap
- [ ] Text is readable

### Lap System
- [ ] Lap detection works
- [ ] Lap counter increments
- [ ] Best lap recorded
- [ ] Race ends after 3 laps

### Results Screen
- [ ] Shows all lap times
- [ ] Displays best lap
- [ ] BACK TO MENU works
- [ ] Leaderboard updated

---

## 🐛 Known Issues to Test

### Camera
- [ ] Does camera ever lose track of car?
- [ ] Does camera clip through track?
- [ ] Is cockpit view positioned correctly?
- [ ] Does camera switch smoothly between views?

### Performance
- [ ] FPS stable (should be 60fps)
- [ ] No lag when driving
- [ ] Models load quickly
- [ ] HUD updates smoothly

### UI
- [ ] Fonts load correctly (not default fonts)
- [ ] All text readable
- [ ] No overlapping elements
- [ ] Buttons clickable

---

## 📊 Expected Behavior

### Camera Views Comparison

| View | Distance | Height | FOV | Best For |
|------|----------|--------|-----|----------|
| CHASE | 10 units | 5 units | 75° | General racing |
| CLOSE | 6 units | 3 units | 80° | Tight corners |
| FAR | 15 units | 8 units | 70° | Track overview |
| COCKPIT | 0 units | 1.2 units | 90° | Immersion |

### Font Usage

| Element | Font | Weight |
|---------|------|--------|
| Game Title | Orbitron | 900 |
| Headings | Orbitron | 700 |
| Body Text | Rajdhani | 500-700 |
| HUD Values | Rajdhani | 700 |
| Camera Indicator | Orbitron | 700 |

---

## 🎯 Test Scenarios

### Scenario 1: Quick Race
1. Start game
2. Select any car
3. Start race
4. Drive 1 lap
5. Press C to test all camera views
6. Complete race

### Scenario 2: Camera Testing
1. Start race
2. Accelerate to full speed
3. Press C repeatedly to cycle views
4. Test each view:
   - Drive straight
   - Turn left
   - Turn right
   - Brake hard
5. Verify car always visible

### Scenario 3: UI Testing
1. Check main menu fonts
2. Browse all cars
3. Start race
4. Check HUD readability
5. Verify camera indicator updates
6. Complete race and check results

---

## 📝 Feedback Areas

### Camera System
- Is the chase camera distance good?
- Is the cockpit view positioned well?
- Do you prefer any specific view?
- Should we add more views?

### UI/Fonts
- Are fonts readable?
- Is HUD layout clear?
- Any overlapping elements?
- Colors good?

### Gameplay
- Car handling feel good?
- Speed appropriate?
- Track boundaries work?
- Lap detection accurate?

---

## 🚀 Current Status

**Server**: ✅ Running on http://localhost:3000  
**Hot Reload**: ✅ Active (changes update automatically)  
**Camera Views**: ✅ 4 views implemented  
**Fonts**: ✅ Google Fonts loaded  
**HUD**: ✅ Organized and updated  

**Ready to test!** 🏎️💨

---

*Last Updated: October 22, 2025*
