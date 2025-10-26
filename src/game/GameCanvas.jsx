import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import ThreeScene from './ThreeScene';
import GameFeatures from './GameFeatures';
import HUD from '../components/HUD';
import { formatTime, saveLeaderboardEntry } from './tracks';

export default function GameCanvas({ selectedCar, selectedTrack, onRaceEnd }) {
  const [carRef, setCarRef] = useState(null);
  const [carApi, setCarApi] = useState(null);
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [speed, setSpeed] = useState(0);
  const [currentLap, setCurrentLap] = useState(1);
  const [lapTime, setLapTime] = useState(0);
  const [bestLap, setBestLap] = useState(null);
  const [cameraView, setCameraView] = useState('chase');
  const [raceStarted, setRaceStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const lapStartTime = useRef(Date.now());

  const handleCarRef = (ref, api, vel) => {
    setCarRef(ref);
    setCarApi(api);
    setVelocity(vel);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !raceStarted) {
      setRaceStarted(true);
      lapStartTime.current = Date.now();
    }
  }, [countdown, raceStarted]);

  useEffect(() => {
    if (velocity) {
      const speedKmh = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2) * 3.6;
      setSpeed(speedKmh);
    }
  }, [velocity]);

  useEffect(() => {
    if (!raceStarted) return;
    const interval = setInterval(() => {
      setLapTime(Date.now() - lapStartTime.current);
    }, 10);
    return () => clearInterval(interval);
  }, [raceStarted]);

  useEffect(() => {
    if (currentLap > 3) {
      if (bestLap) {
        saveLeaderboardEntry(selectedTrack.id, {
          time: bestLap,
          carName: selectedCar.name,
          trackId: selectedTrack.id
        });
      }
      setTimeout(() => onRaceEnd(), 3000);
    }
  }, [currentLap, bestLap, selectedTrack, selectedCar, onRaceEnd]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      {countdown > 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          fontSize: '10rem',
          fontWeight: 900,
          color: '#ff6b00',
          textShadow: '0 0 30px rgba(255, 107, 0, 0.8)',
          fontFamily: 'Orbitron, sans-serif'
        }}>
          {countdown}
        </div>
      )}

      <Canvas shadows camera={{ position: [0, 6, 12], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 20, 10]}
          intensity={1.2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <fog attach="fog" args={['#0a0a0a', 20, 120]} />

        <Physics gravity={[0, -9.81, 0]} allowSleep={false}>
          <ThreeScene
            selectedCar={selectedCar}
            selectedTrack={selectedTrack}
            onCarRef={handleCarRef}
            carApi={carApi}
            raceStarted={raceStarted}
            cameraView={cameraView}
            setCameraView={setCameraView}
            carRef={carRef}
          />
        </Physics>
      </Canvas>

      <GameFeatures
        speed={speed}
        currentLap={currentLap}
        lapTime={lapTime}
        bestLap={bestLap}
      />

      {raceStarted && (
        <HUD
          speed={speed}
          currentLap={currentLap}
          totalLaps={3}
          lapTime={lapTime}
          bestLap={bestLap}
          position={1}
          cameraView={cameraView}
        />
      )}
    </div>
  );
}
