import React, { useEffect } from 'react';
import { Sky } from '@react-three/drei';
import { Car } from './cars';
import { Track, GroundPlane } from './tracks';
import CameraRig from './camera/CameraRig';
import useInput from './input/useInput';

export default function ThreeScene({
  selectedCar,
  selectedTrack,
  onCarRef,
  carApi,
  raceStarted,
  cameraView,
  setCameraView,
  carRef
}) {
  const input = useInput();

  useEffect(() => {
    if (!carApi || !raceStarted) return;

    const maxForce = 2000 * (selectedCar.acceleration / 100);
    const maxTorque = 1.5 * (selectedCar.handling / 100);

    if (input.forward) {
      carApi.applyLocalForce([0, 0, -maxForce], [0, 0, 0]);
    }
    if (input.back) {
      carApi.applyLocalForce([0, 0, maxForce * 0.6], [0, 0, 0]);
    }
    if (input.left) {
      carApi.applyLocalTorque([0, maxTorque, 0]);
    }
    if (input.right) {
      carApi.applyLocalTorque([0, -maxTorque, 0]);
    }
    if (input.boost) {
      carApi.applyLocalForce([0, 0, -maxForce * 1.5], [0, 0, 0]);
    }
  }, [input, carApi, raceStarted, selectedCar]);

  useEffect(() => {
    if (input.camera) {
      const views = ['chase', 'hood', 'cockpit', 'cinematic'];
      const currentIndex = views.indexOf(cameraView);
      const nextIndex = (currentIndex + 1) % views.length;
      setCameraView(views[nextIndex]);
    }
  }, [input.camera, cameraView, setCameraView]);

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      
      <Track trackData={selectedTrack} />
      <GroundPlane />
      
      <Car
        carData={selectedCar}
        position={[0, 1, 0]}
        isPlayer
        onCarRef={onCarRef}
      />
      
      {carRef && <CameraRig target={carRef} cameraView={cameraView} />}
    </>
  );
}
