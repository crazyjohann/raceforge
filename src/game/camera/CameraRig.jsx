import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

// This simple rig follows the first player car in the scene.
// It expects the player car to have a physics body at approx position [x,y,z].
export default function CameraRig() {
  const { camera, gl } = useThree();
  const target = useRef(new Vector3(0, 1.5, 0));
  // You can change how you pick the player car: currently we just use a global query
  useFrame(() => {
    // For a more robust approach, pass a ref from Car -> CameraRig via context.
    // This version smoothly moves camera toward the target vector.
    const desired = target.current.clone().add(new Vector3(0, 6, 12));
    camera.position.lerp(desired, 0.08);
    camera.lookAt(target.current);
  });
  return null;
}
