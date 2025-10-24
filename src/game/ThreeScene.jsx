import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, Sky } from '@react-three/drei';
import * as THREE from 'three';

// Car Component with physics and controls
const Car = ({ modelPath, onSpeedUpdate, onLapComplete, isRacing, carStats, onBoostUpdate, onCollision }) => {
  const { scene } = useGLTF(modelPath);
  const carRef = useRef();
  
  // Start position on track (adjust based on track)
  const startPosition = new THREE.Vector3(0, 0.3, -5);
  
  const [carState, setCarState] = useState({
    position: startPosition.clone(),
    rotation: 0,
    velocity: new THREE.Vector3(0, 0, 0),
    speed: 0,
    acceleration: 0,
    steering: 0,
    boost: 100,
    isBoosting: false
  });

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    boost: false
  });

  const lapCheckpoint = useRef({ passed: false, position: new THREE.Vector3(0, 0, 0) });
  const lapCount = useRef(0);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          keys.current.forward = true;
          break;
        case 's':
        case 'arrowdown':
          keys.current.backward = true;
          break;
        case 'a':
        case 'arrowleft':
          keys.current.left = true;
          break;
        case 'd':
        case 'arrowright':
          keys.current.right = true;
          break;
        case 'shift':
          keys.current.boost = true;
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          keys.current.forward = false;
          break;
        case 's':
        case 'arrowdown':
          keys.current.backward = false;
          break;
        case 'a':
        case 'arrowleft':
          keys.current.left = false;
          break;
        case 'd':
        case 'arrowright':
          keys.current.right = false;
          break;
        case 'shift':
          keys.current.boost = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Physics and movement update
  useFrame((state, delta) => {
    if (!carRef.current || !isRacing) return;

    // Car physics parameters (adjusted by car stats)
    const maxSpeed = (carStats.speed / 100) * 200; // Max speed in units/s
    const boostMultiplier = carState.isBoosting ? 1.5 : 1;
    const accelerationRate = (carStats.acceleration / 100) * 50 * boostMultiplier;
    const brakeRate = 80;
    const turnSpeed = (carStats.handling / 100) * 2.5;
    const friction = 0.95;

    let newAcceleration = carState.acceleration;
    let newSteering = carState.steering;
    let newBoost = carState.boost;
    let isBoosting = false;

    // Handle boost
    if (keys.current.boost && newBoost > 0 && keys.current.forward) {
      isBoosting = true;
      newBoost = Math.max(0, newBoost - 30 * delta);
    } else if (!keys.current.boost && newBoost < 100) {
      newBoost = Math.min(100, newBoost + 10 * delta);
    }

    // Handle acceleration
    if (keys.current.forward) {
      newAcceleration = Math.min(newAcceleration + accelerationRate * delta, maxSpeed * boostMultiplier);
    } else if (keys.current.backward) {
      newAcceleration = Math.max(newAcceleration - brakeRate * delta, -maxSpeed * 0.5);
    } else {
      // Apply friction when no input
      newAcceleration *= friction;
      if (Math.abs(newAcceleration) < 0.1) newAcceleration = 0;
    }

    // Handle steering (only when moving)
    if (Math.abs(newAcceleration) > 0.5) {
      if (keys.current.left) {
        newSteering = turnSpeed;
      } else if (keys.current.right) {
        newSteering = -turnSpeed;
      } else {
        newSteering = 0;
      }
    } else {
      newSteering = 0;
    }

    // Update rotation
    const newRotation = carState.rotation + newSteering * delta;

    // Calculate new position
    const direction = new THREE.Vector3(
      Math.sin(newRotation),
      0,
      Math.cos(newRotation)
    );
    
    const newVelocity = direction.multiplyScalar(newAcceleration * delta);
    const newPosition = carState.position.clone().add(newVelocity);

    // Keep car on ground with better collision
    newPosition.y = 0.3; // Lower to ground level

    // Boundary check (track bounds)
    const maxDistance = 100; // Increased for larger tracks
    const distanceFromCenter = Math.sqrt(newPosition.x * newPosition.x + newPosition.z * newPosition.z);
    
    if (distanceFromCenter > maxDistance) {
      // Collision with boundary
      const angle = Math.atan2(newPosition.z, newPosition.x);
      newPosition.x = Math.cos(angle) * maxDistance;
      newPosition.z = Math.sin(angle) * maxDistance;
      newAcceleration *= 0.3; // Slow down significantly
      
      if (onCollision) {
        onCollision();
      }
    }

    // Update car mesh
    carRef.current.position.copy(newPosition);
    carRef.current.rotation.y = newRotation;

    // Calculate speed in km/h for display
    const speedKmh = Math.abs(newAcceleration) * 3.6;
    onSpeedUpdate(speedKmh);

    // Lap detection (simple: cross start line)
    const distanceFromStart = newPosition.distanceTo(lapCheckpoint.current.position);
    if (distanceFromStart < 5 && !lapCheckpoint.current.passed) {
      lapCheckpoint.current.passed = true;
      if (lapCount.current > 0) {
        onLapComplete();
      }
      lapCount.current++;
    } else if (distanceFromStart > 10) {
      lapCheckpoint.current.passed = false;
    }

    // Update boost indicator
    if (onBoostUpdate) {
      onBoostUpdate(newBoost, isBoosting);
    }

    // Update state
    setCarState({
      position: newPosition,
      rotation: newRotation,
      velocity: newVelocity,
      speed: speedKmh,
      acceleration: newAcceleration,
      steering: newSteering,
      boost: newBoost,
      isBoosting: isBoosting
    });
  });

  // Clone scene safely to avoid memory leaks
  const carModel = React.useMemo(() => scene.clone(), [scene]);

  return (
    <group ref={carRef} position={startPosition.toArray()}>
      <primitive object={carModel} scale={1} rotation={[0, Math.PI, 0]} />
      {/* Add headlights */}
      <pointLight position={[0, 0.5, 1]} intensity={0.5} distance={10} color="#ffffff" />
      <pointLight position={[0, 0.5, -1]} intensity={0.3} distance={5} color="#ff0000" />
    </group>
  );
};

// Track Component
const Track = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  
  return (
    <group>
      <primitive object={scene.clone()} scale={1} position={[0, 0, 0]} />
    </group>
  );
};

// Camera that follows the car with multiple views
const FollowCamera = ({ target, cameraView }) => {
  const cameraRef = useRef();

  useFrame((state) => {
    if (!target.current) return;

    const carPosition = target.current.position;
    const carRotation = target.current.rotation.y;

    // Different camera views
    let offset, lookAtOffset, fov;
    
    switch(cameraView) {
      case 'chase': // Default chase camera
        offset = new THREE.Vector3(
          Math.sin(carRotation) * -10,
          5,
          Math.cos(carRotation) * -10
        );
        lookAtOffset = 2;
        fov = 75;
        break;
      
      case 'close': // Close follow
        offset = new THREE.Vector3(
          Math.sin(carRotation) * -6,
          3,
          Math.cos(carRotation) * -6
        );
        lookAtOffset = 1.5;
        fov = 80;
        break;
      
      case 'far': // Far view
        offset = new THREE.Vector3(
          Math.sin(carRotation) * -15,
          8,
          Math.cos(carRotation) * -15
        );
        lookAtOffset = 2.5;
        fov = 70;
        break;
      
      case 'cockpit': // Cockpit view
        offset = new THREE.Vector3(
          Math.sin(carRotation) * 0,
          1.2,
          Math.cos(carRotation) * 2
        );
        lookAtOffset = 5;
        fov = 90;
        break;
      
      default:
        offset = new THREE.Vector3(
          Math.sin(carRotation) * -10,
          5,
          Math.cos(carRotation) * -10
        );
        lookAtOffset = 2;
        fov = 75;
    }

    const cameraPosition = new THREE.Vector3().copy(carPosition).add(offset);
    
    // Smooth camera movement with better interpolation
    if (cameraRef.current) {
      cameraRef.current.position.lerp(cameraPosition, 0.15);
      
      // Look ahead of the car for better view
      const lookAtPoint = new THREE.Vector3(
        carPosition.x + Math.sin(carRotation) * lookAtOffset,
        carPosition.y + 1,
        carPosition.z + Math.cos(carRotation) * lookAtOffset
      );
      
      cameraRef.current.lookAt(lookAtPoint);
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 5, -10]} fov={75} />;
};

// Main Scene Component
const ThreeScene = ({ selectedCar, selectedTrack, onLapComplete, onSpeedUpdate, onCameraViewUpdate, isRacing }) => {
  const carRef = useRef();
  const [cameraView, setCameraView] = useState('chase');

  // Camera view switching with C key
  useEffect(() => {
    const handleCameraSwitch = (e) => {
      if (e.key.toLowerCase() === 'c') {
        setCameraView(prev => {
          const views = ['chase', 'close', 'far', 'cockpit'];
          const currentIndex = views.indexOf(prev);
          const nextIndex = (currentIndex + 1) % views.length;
          const newView = views[nextIndex];
          if (onCameraViewUpdate) {
            onCameraViewUpdate(newView);
          }
          return newView;
        });
      }
    };

    window.addEventListener('keydown', handleCameraSwitch);
    return () => window.removeEventListener('keydown', handleCameraSwitch);
  }, [onCameraViewUpdate]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[50, 50, 25]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-50, 30, -25]} intensity={0.5} />
      <hemisphereLight args={['#87CEEB', '#545454', 0.6]} />

      {/* Environment */}
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="sunset" />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Track */}
      <Track modelPath={selectedTrack.model} />

      {/* Car */}
      <group ref={carRef}>
        <Car 
          modelPath={selectedCar.model}
          onSpeedUpdate={onSpeedUpdate}
          onLapComplete={onLapComplete}
          onBoostUpdate={(boost, isBoosting) => {
            // Boost updates handled in GameCanvas
          }}
          onCollision={() => {
            // Collision handled in GameCanvas
          }}
          isRacing={isRacing}
          carStats={{
            speed: selectedCar.speed,
            acceleration: selectedCar.acceleration,
            handling: selectedCar.handling
          }}
        />
      </group>

      {/* Camera */}
      <FollowCamera target={carRef} cameraView={cameraView} />

      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#87CEEB', 50, 200]} />
    </>
  );
};

export default ThreeScene;
