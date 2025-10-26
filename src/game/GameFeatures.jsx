import React from 'react';
import { formatTime } from './tracks';

export default function GameFeatures({ speed, currentLap, lapTime, bestLap }) {
  return (
    <div style={{
      position: 'absolute',
      left: 14,
      top: 14,
      padding: '10px 14px',
      background: 'rgba(0,0,0,0.7)',
      color: '#fff',
      borderRadius: 8,
      fontFamily: 'Rajdhani, sans-serif',
      fontSize: '0.9rem',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 107, 0, 0.3)'
    }}>
      <div style={{ marginBottom: '5px', fontSize: '1.1rem', fontWeight: 700, color: '#ff6b00' }}>
        🏁 RaceForge
      </div>
      <div style={{ marginBottom: '3px' }}>
        Speed: <span style={{ fontWeight: 700, color: '#00d4ff' }}>{Math.round(speed)}</span> km/h
      </div>
      <div style={{ marginBottom: '3px' }}>
        Lap: <span style={{ fontWeight: 700 }}>{currentLap}/3</span>
      </div>
      <div style={{ marginBottom: '3px' }}>
        Time: <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{formatTime(lapTime)}</span>
      </div>
      {bestLap && (
        <div>
          Best: <span style={{ fontWeight: 700, color: '#00ff00', fontFamily: 'monospace' }}>{formatTime(bestLap)}</span>
        </div>
      )}
    </div>
  );
}
