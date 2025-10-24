import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import { getAllTracks } from '../game/tracks';
import styles from '../styles/carselector.module.css';

// 3D Track Preview Component
const TrackModel = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene.clone()} scale={0.5} position={[0, 0, 0]} />;
};

const TrackMap = ({ onSelectTrack, onBack, selectedCar }) => {
  const tracks = getAllTracks();
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const selectedTrack = tracks[selectedTrackIndex];

  const handleNext = () => {
    setSelectedTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevious = () => {
    setSelectedTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleSelect = () => {
    onSelectTrack(selectedTrack);
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← BACK
        </button>
        <h2 className={styles.title}>SELECT TRACK</h2>
        <div className={styles.counter}>
          {selectedTrackIndex + 1} / {tracks.length}
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* 3D Track Preview */}
        <div className={styles.carPreview}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[20, 15, 20]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={1} />
            <directionalLight position={[-10, 10, -10]} intensity={0.5} />
            
            <Suspense fallback={null}>
              <TrackModel modelPath={selectedTrack.model} />
              <Environment preset="sunset" />
            </Suspense>
            
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              minDistance={10}
              maxDistance={50}
            />
          </Canvas>
        </div>

        {/* Track Info Panel */}
        <div className={styles.carInfo}>
          <div className={styles.carHeader}>
            <h3 className={styles.carName}>{selectedTrack.name}</h3>
          </div>
          
          <p className={styles.carDescription}>{selectedTrack.description}</p>

          {/* Track Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Length</div>
              <div className={styles.statValue}>{selectedTrack.length} km</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statLabel}>Corners</div>
              <div className={styles.statValue}>{selectedTrack.corners}</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statLabel}>Difficulty</div>
              <div className={styles.statValue}>{selectedTrack.difficulty}</div>
            </div>
          </div>

          {/* Selected Car Info */}
          {selectedCar && (
            <div className={styles.selectedCarInfo}>
              <h4>Selected Car</h4>
              <p>{selectedCar.name}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.navigation}>
            <button 
              className={styles.navButton} 
              onClick={handlePrevious}
              disabled={tracks.length === 1}
            >
              ← PREVIOUS
            </button>
            
            <button 
              className={`${styles.navButton} ${styles.selectButton}`}
              onClick={handleSelect}
            >
              START RACE
            </button>
            
            <button 
              className={styles.navButton} 
              onClick={handleNext}
              disabled={tracks.length === 1}
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackMap;
