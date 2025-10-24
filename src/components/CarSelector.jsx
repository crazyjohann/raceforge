import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import { getAllCars } from '../game/cars';
import styles from '../styles/carselector.module.css';

// 3D Car Preview Component
const CarModel = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene.clone()} scale={1.5} position={[0, -1, 0]} />;
};

const CarSelector = ({ onSelectCar, onBack }) => {
  const cars = getAllCars();
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const selectedCar = cars[selectedCarIndex];

  const handleNext = () => {
    setSelectedCarIndex((prev) => (prev + 1) % cars.length);
  };

  const handlePrevious = () => {
    setSelectedCarIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const handleSelect = () => {
    onSelectCar(selectedCar);
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← BACK
        </button>
        <h2 className={styles.title}>SELECT YOUR CAR</h2>
        <div className={styles.counter}>
          {selectedCarIndex + 1} / {cars.length}
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* 3D Car Preview */}
        <div className={styles.carPreview}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[5, 2, 5]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, 5, -5]} intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={0.8} />
            
            <Suspense fallback={null}>
              <CarModel modelPath={selectedCar.model} />
              <Environment preset="sunset" />
            </Suspense>
            
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
          
          <div className={styles.loadingText}>
            {/* Loading indicator if needed */}
          </div>
        </div>

        {/* Car Info Panel */}
        <div className={styles.carInfo}>
          <div className={styles.carHeader}>
            <h3 className={styles.carName}>{selectedCar.name}</h3>
            <span className={styles.carYear}>{selectedCar.year}</span>
          </div>
          
          <p className={styles.carDescription}>{selectedCar.description}</p>

          {/* Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Speed</div>
              <div className={styles.statBar}>
                <div 
                  className={styles.statFill} 
                  style={{ width: `${selectedCar.speed}%` }}
                ></div>
              </div>
              <div className={styles.statValue}>{selectedCar.speed}</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statLabel}>Acceleration</div>
              <div className={styles.statBar}>
                <div 
                  className={styles.statFill} 
                  style={{ width: `${selectedCar.acceleration}%` }}
                ></div>
              </div>
              <div className={styles.statValue}>{selectedCar.acceleration}</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statLabel}>Handling</div>
              <div className={styles.statBar}>
                <div 
                  className={styles.statFill} 
                  style={{ width: `${selectedCar.handling}%` }}
                ></div>
              </div>
              <div className={styles.statValue}>{selectedCar.handling}</div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statLabel}>Weight</div>
              <div className={styles.statBar}>
                <div 
                  className={styles.statFill} 
                  style={{ width: `${Math.min(100, (selectedCar.weight / 20))}%` }}
                ></div>
              </div>
              <div className={styles.statValue}>{selectedCar.weight} kg</div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className={styles.navigation}>
            <button 
              className={styles.navButton} 
              onClick={handlePrevious}
            >
              ← PREVIOUS
            </button>
            
            <button 
              className={`${styles.navButton} ${styles.selectButton}`}
              onClick={handleSelect}
            >
              SELECT CAR
            </button>
            
            <button 
              className={styles.navButton} 
              onClick={handleNext}
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSelector;
