import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeScene from './ThreeScene';
import HUD from '../components/HUD';
import { saveLeaderboardEntry } from './tracks';
import { 
  CountdownTimer, 
  Minimap, 
  BoostIndicator, 
  PauseMenu, 
  LapNotification,
  BoostEffect,
  BestLapNotification,
  CollisionWarning,
  FPSCounter
} from './GameFeatures';
import styles from '../styles/main.module.css';

const GameCanvas = ({ selectedCar, selectedTrack, onRaceEnd }) => {
  const [gameState, setGameState] = useState({
    speed: 0,
    currentLap: 1,
    totalLaps: 3,
    lapTime: 0,
    bestLap: null,
    position: 1,
    isRacing: false, // Start false for countdown
    lapTimes: [],
    cameraView: 'chase',
    boost: 100,
    isBoosting: false,
    carPosition: { x: 0, y: 0, z: 0 }
  });

  const [showResults, setShowResults] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [lastLapTime, setLastLapTime] = useState(null);
  const [showLapNotification, setShowLapNotification] = useState(false);
  const [showBestLap, setShowBestLap] = useState(false);
  const [showCollision, setShowCollision] = useState(false);
  const gameStartTime = useRef(Date.now());
  const currentLapStartTime = useRef(Date.now());

  // Update lap time
  useEffect(() => {
    if (!gameState.isRacing || isPaused) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - currentLapStartTime.current;
      setGameState(prev => ({ ...prev, lapTime: elapsed }));
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.isRacing, isPaused]);

  // Handle lap completion
  const handleLapComplete = () => {
    const lapTime = Date.now() - currentLapStartTime.current;
    
    // Show lap notification
    setLastLapTime(lapTime);
    setShowLapNotification(true);
    setTimeout(() => setShowLapNotification(false), 3000);
    
    setGameState(prev => {
      const newLapTimes = [...prev.lapTimes, lapTime];
      const newBestLap = prev.bestLap ? Math.min(prev.bestLap, lapTime) : lapTime;
      const newLap = prev.currentLap + 1;
      
      // Check if new best lap
      if (!prev.bestLap || lapTime < prev.bestLap) {
        setShowBestLap(true);
        setTimeout(() => setShowBestLap(false), 4000);
      }

      // Check if race is finished
      if (newLap > prev.totalLaps) {
        // Save best lap to leaderboard
        saveLeaderboardEntry(selectedTrack.id, newBestLap, selectedCar.name);
        
        setTimeout(() => {
          setShowResults(true);
        }, 2000);

        return {
          ...prev,
          isRacing: false,
          lapTimes: newLapTimes,
          bestLap: newBestLap
        };
      }

      // Continue to next lap
      currentLapStartTime.current = Date.now();
      return {
        ...prev,
        currentLap: newLap,
        lapTime: 0,
        lapTimes: newLapTimes,
        bestLap: newBestLap
      };
    });
  };

  // Handle speed update from Three.js scene
  const handleSpeedUpdate = (newSpeed) => {
    setGameState(prev => ({ ...prev, speed: newSpeed }));
  };

  // Handle camera view update
  const handleCameraViewUpdate = (newView) => {
    setGameState(prev => ({ ...prev, cameraView: newView }));
  };

  // Handle countdown complete
  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setGameState(prev => ({ ...prev, isRacing: true }));
    currentLapStartTime.current = Date.now();
  };

  // Handle boost update
  const handleBoostUpdate = (boost, isBoosting) => {
    setGameState(prev => ({ ...prev, boost, isBoosting }));
  };

  // Handle collision
  const handleCollision = () => {
    setShowCollision(true);
    setTimeout(() => setShowCollision(false), 500);
  };

  // Handle ESC key to pause/exit
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        if (!showCountdown && !showResults) {
          setIsPaused(!isPaused);
          setGameState(prev => ({ ...prev, isRacing: !isPaused }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPaused, showCountdown, showResults]);

  // Handle pause menu actions
  const handleResume = () => {
    setIsPaused(false);
    setGameState(prev => ({ ...prev, isRacing: true }));
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleExit = () => {
    onRaceEnd();
  };

  if (showResults) {
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.resultsContent}>
          <h2 className={styles.resultsTitle}>RACE COMPLETE!</h2>
          
          <div className={styles.resultsStats}>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Best Lap:</span>
              <span className={styles.resultValue}>
                {gameState.bestLap ? formatTime(gameState.bestLap) : 'N/A'}
              </span>
            </div>
            
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Total Time:</span>
              <span className={styles.resultValue}>
                {formatTime(gameState.lapTimes.reduce((a, b) => a + b, 0))}
              </span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Car:</span>
              <span className={styles.resultValue}>{selectedCar.name}</span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Track:</span>
              <span className={styles.resultValue}>{selectedTrack.name}</span>
            </div>
          </div>

          <div className={styles.lapTimesContainer}>
            <h3>Lap Times</h3>
            {gameState.lapTimes.map((time, index) => (
              <div key={index} className={styles.lapTimeItem}>
                <span>Lap {index + 1}:</span>
                <span>{formatTime(time)}</span>
              </div>
            ))}
          </div>

          <div className={styles.resultsButtons}>
            <button 
              className={styles.resultButton}
              onClick={onRaceEnd}
            >
              BACK TO MENU
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gameContainer}>
      <Canvas shadows>
        <ThreeScene 
          selectedCar={selectedCar}
          selectedTrack={selectedTrack}
          onLapComplete={handleLapComplete}
          onSpeedUpdate={handleSpeedUpdate}
          onCameraViewUpdate={handleCameraViewUpdate}
          onBoostUpdate={handleBoostUpdate}
          onCollision={handleCollision}
          isRacing={gameState.isRacing && !isPaused}
        />
      </Canvas>
      
      <HUD 
        speed={gameState.speed}
        currentLap={gameState.currentLap}
        totalLaps={gameState.totalLaps}
        lapTime={gameState.lapTime}
        bestLap={gameState.bestLap}
        position={gameState.position}
        cameraView={gameState.cameraView}
      />
      
      {/* New Game Features */}
      {showCountdown && <CountdownTimer onComplete={handleCountdownComplete} />}
      {isPaused && <PauseMenu onResume={handleResume} onRestart={handleRestart} onExit={handleExit} />}
      <Minimap carPosition={gameState.carPosition} trackBounds={100} />
      <BoostIndicator boostAmount={gameState.boost} maxBoost={100} />
      {showLapNotification && <LapNotification lapNumber={gameState.currentLap - 1} lapTime={lastLapTime} />}
      {gameState.isBoosting && <BoostEffect isActive={true} />}
      {showBestLap && <BestLapNotification show={true} />}
      {showCollision && <CollisionWarning show={true} />}
      <FPSCounter />
    </div>
  );
};

// Helper function to format time
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
};

export default GameCanvas;
