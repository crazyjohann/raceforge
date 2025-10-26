import React from 'react';
import { OrbitControls } from '@react-three/drei';
import Cars from './cars';
import Tracks from './tracks';
import CameraRig from './camera/CameraRig';

export default function ThreeScene() {
  return (
    <>
      {/* Optional orbit controls for debugging */}
      <OrbitControls enabled={false} />
      <ambientLight intensity={0.4} />
      <Tracks />
      <Cars />
      <CameraRig />
    </>
  );
}
