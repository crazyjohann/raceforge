// Enhanced game features for RaceForge
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/features.module.css';

// Countdown Timer Component (3, 2, 1, GO!)
export const CountdownTimer = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setShow(false);
        onComplete();
      }, 1000);
    }
  }, [count, onComplete]);

  if (!show) return null;

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownNumber}>
        {count === 0 ? 'GO!' : count}
      </div>
    </div>
  );
};

// Minimap Component
export const Minimap = ({ carPosition, trackBounds }) => {
  const scale = 0.1; // Scale factor for minimap
  
  return (
    <div className={styles.minimap}>
      <div className={styles.minimapTitle}>MAP</div>
      <div className={styles.minimapCanvas}>
        {/* Track outline */}
        <div className={styles.trackOutline}></div>
        
        {/* Car position */}
        <div 
          className={styles.carDot}
          style={{
            left: `${50 + carPosition.x * scale}%`,
            top: `${50 + carPosition.z * scale}%`
          }}
        ></div>
        
        {/* Start/Finish line */}
        <div className={styles.startLine}></div>
      </div>
    </div>
  );
};

// Boost/Nitro Component
export const BoostIndicator = ({ boostAmount, maxBoost }) => {
  const percentage = (boostAmount / maxBoost) * 100;
  
  return (
    <div className={styles.boostContainer}>
      <div className={styles.boostLabel}>NITRO</div>
      <div className={styles.boostBar}>
        <div 
          className={styles.boostFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className={styles.boostText}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

// Pause Menu Component
export const PauseMenu = ({ onResume, onRestart, onExit }) => {
  return (
    <div className={styles.pauseOverlay}>
      <div className={styles.pauseMenu}>
        <h2 className={styles.pauseTitle}>PAUSED</h2>
        <div className={styles.pauseButtons}>
          <button className={styles.pauseButton} onClick={onResume}>
            RESUME
          </button>
          <button className={styles.pauseButton} onClick={onRestart}>
            RESTART RACE
          </button>
          <button className={styles.pauseButton} onClick={onExit}>
            EXIT TO MENU
          </button>
        </div>
        <div className={styles.pauseControls}>
          <p>Press ESC to resume</p>
        </div>
      </div>
    </div>
  );
};

// Lap Notification Component
export const LapNotification = ({ lapNumber, lapTime }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className={styles.lapNotification}>
      <div className={styles.lapNotificationTitle}>
        LAP {lapNumber} COMPLETE!
      </div>
      <div className={styles.lapNotificationTime}>
        {formatTime(lapTime)}
      </div>
    </div>
  );
};

// Speed Boost Effect Component
export const BoostEffect = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className={styles.boostEffect}>
      <div className={styles.boostLines}></div>
    </div>
  );
};

// Wrong Way Indicator
export const WrongWayIndicator = ({ show }) => {
  if (!show) return null;

  return (
    <div className={styles.wrongWay}>
      <div className={styles.wrongWayText}>WRONG WAY!</div>
      <div className={styles.wrongWayArrow}>↓ TURN AROUND ↓</div>
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

// Collision Warning Component
export const CollisionWarning = ({ show }) => {
  if (!show) return null;

  return (
    <div className={styles.collisionWarning}>
      <div className={styles.collisionText}>⚠️ COLLISION ⚠️</div>
    </div>
  );
};

// Best Lap Notification
export const BestLapNotification = ({ show }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className={styles.bestLapNotification}>
      <div className={styles.bestLapIcon}>🏆</div>
      <div className={styles.bestLapText}>NEW BEST LAP!</div>
    </div>
  );
};

// FPS Counter (for debugging)
export const FPSCounter = () => {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTime.current;
      const currentFps = Math.round((frameCount.current / delta) * 1000);
      setFps(currentFps);
      frameCount.current = 0;
      lastTime.current = now;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countFrame = () => {
      frameCount.current++;
      requestAnimationFrame(countFrame);
    };
    requestAnimationFrame(countFrame);
  }, []);

  return (
    <div className={styles.fpsCounter}>
      FPS: {fps}
    </div>
  );
};
