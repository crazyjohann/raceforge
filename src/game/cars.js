import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import useInput from './input/useInput';

// list all 10 car models (adjust filenames to your actual files)
const ALL_CARS = Array.from({length:10}).map((_,i)=>`/assets/cars/car${i+1}.glb`);

export default function Cars() {
  // spawn a few cars - main player car is index 0
  return (
    <>
      <Car modelPath={ALL_CARS[0]} isPlayer position={[0, 0.8, 0]} />
      {/* spawn NPCs as examples */}
      <Car modelPath={ALL_CARS[1]} position={[2, 0.8, -6]} />
      <Car modelPath={ALL_CARS[2]} position={[-2, 0.8, -12]} />
    </>
  );
}

function Car({ modelPath, position=[0,0.8,0], isPlayer=false }) {
  const gltf = useGLTF(modelPath);
  const ref = useRef();
  // physics body (box) roughly matching car footprint
  const [bodyRef, api] = useBox(() => ({
    mass: isPlayer ? 1200 : 900,
    position,
    args: [1.2, 0.5, 2.5],
    linearDamping: 0.5,
    angularDamping: 0.9,
    allowSleep: false
  }));

  // orient model correctly: flip if backwards
  useEffect(() => {
    if (gltf && gltf.scene) {
      // ensure scene pivot is centered
      gltf.scene.rotation.set(0, Math.PI, 0); // faces forward
      // if model origin is not centered vertically, offset it slightly
      gltf.scene.position.set(0, -0.5, 0);
    }
  }, [gltf]);

  // simple player control applying forward force & steering
  const input = useInput();
  useFrame(() => {
    if (!isPlayer) return;
    // small forward push
    if (input.forward) {
      api.applyLocalForce([0, 0, -500], [0, 0, 0]);
    }
    // reverse
    if (input.back) api.applyLocalForce([0, 0, 300], [0, 0, 0]);
    // steering: apply torque for yaw
    if (input.left) api.applyLocalTorque([0, 0.8, 0]);
    if (input.right) api.applyLocalTorque([0, -0.8, 0]);
  });

  // sync three object with physics body
  useFrame(() => {
    if (!ref.current || !bodyRef.current) return;
    // physics body position
    const pos = bodyRef.current.position;
    const rot = bodyRef.current.quaternion;
    ref.current.position.set(pos.x, pos.y, pos.z);
    ref.current.quaternion.set(rot.x, rot.y, rot.z, rot.w);
  });

  return (
    <group ref={ref}>
      <mesh ref={bodyRef} visible={false} />
      <primitive
        object={gltf.scene.clone()}
        scale={[1.0,1.0,1.0]}
        castShadow
        receiveShadow
      />
    </group>
  );
}
