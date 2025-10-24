import React from 'react';
import { formatTime } from '../game/tracks';
import styles from '../styles/main.module.css';

const HUD = ({ speed, currentLap, totalLaps, lapTime, bestLap, position, cameraView }) => {
  return (
    <div className={styles.hud}>
      {/* Top Left - Lap Info */}
      <div className={styles.hudTopLeft}>
        <div className={styles.hudLap}>
          <span className={styles.hudLabel}>LAP</span>
          <span className={styles.hudValue}>{currentLap} / {totalLaps}</span>
        </div>
        <div className={styles.hudTime}>
          <span className={styles.hudLabel}>TIME</span>
          <span className={styles.hudValue}>{formatTime(lapTime)}</span>
        </div>
        {bestLap && (
          <div className={styles.hudBest}>
            <span className={styles.hudLabel}>BEST</span>
            <span className={styles.hudValue}>{formatTime(bestLap)}</span>
          </div>
        )}
      </div>

      {/* Top Right - Position */}
      <div className={styles.hudTopRight}>
        <div className={styles.hudPosition}>
          <span className={styles.positionNumber}>{position}</span>
          <span className={styles.positionSuffix}>
            {position === 1 ? 'ST' : position === 2 ? 'ND' : position === 3 ? 'RD' : 'TH'}
          </span>
        </div>
      </div>

      {/* Bottom Center - Speedometer */}
      <div className={styles.hudBottomCenter}>
        <div className={styles.speedometer}>
          <div className={styles.speedValue}>{Math.round(speed)}</div>
          <div className={styles.speedUnit}>KM/H</div>
        </div>
      </div>

      {/* Controls Help */}
      <div className={styles.hudBottomLeft}>
        <div className={styles.controlsHelp}>
          <div>W/↑ Accelerate</div>
          <div>S/↓ Brake</div>
          <div>A/← D/→ Steer</div>
          <div>SHIFT Boost</div>
          <div>C Camera</div>
          <div>ESC Pause</div>
        </div>
      </div>

      {/* Camera View Indicator */}
      <div className={styles.hudTopCenter}>
        <div className={styles.cameraView}>
          <span className={styles.cameraLabel}>CAMERA</span>
          <span className={styles.cameraValue}>{cameraView?.toUpperCase() || 'CHASE'}</span>
        </div>
      </div>
    </div>
  );
};

export default HUD;
