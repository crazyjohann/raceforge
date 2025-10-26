import React, { useState, useEffect } from 'react';

export default function GameFeatures() {
  const [speed, setSpeed] = useState(0);

  // Placeholder speed updater (you can hook to physics for real speed)
  useEffect(() => {
    const t = setInterval(() => setSpeed(s => Math.max(0, s - 0.5)), 200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      left: 14,
      top: 14,
      padding: '10px 14px',
      background: 'rgba(0,0,0,0.5)',
      color: '#fff',
      borderRadius: 8,
      fontFamily: 'sans-serif'
    }}>
      <div>🏁 RaceForge</div>
      <div>Speed: {Math.round(speed)} km/h</div>
      <div>Controls: W / A / S / D</div>
    </div>
  );
}
