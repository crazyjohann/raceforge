import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import ThreeScene from './ThreeScene';
import GameFeatures from './GameFeatures';

export default function GameCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas shadows camera={{ position: [0, 6, 12], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[10, 20, 10]}
          intensity={1.0}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <fog attach="fog" args={['#0a0a0a', 20, 120]} />
        <Physics gravity={[0, -9.81, 0]} allowSleep={true}>
          <ThreeScene />
        </Physics>
      </Canvas>
      <GameFeatures />
    </div>
  );
}
