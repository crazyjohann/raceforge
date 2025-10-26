import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useTrimesh, usePlane } from '@react-three/cannon';

export const TRACK_DATABASE = [
  {
    id: 1,
    name: "Sunset Valley Circuit",
    model: "/assets/tracks/track1.glb",
    description: "A technical circuit with sweeping corners and elevation changes. Perfect for testing your car's handling through fast corners and tight chicanes.",
    length: 4.8,
    corners: 14,
    difficulty: "Medium",
    lapRecord: 94500
  },
  {
    id: 2,
    name: "Neon City Sprint",
    model: "/assets/tracks/track2.glb",
    description: "An urban street circuit with tight corners and long straights. Navigate through the neon-lit city streets at night.",
    length: 3.2,
    corners: 18,
    difficulty: "Hard",
    lapRecord: 87200
  }
];

export function getAllTracks() {
  return TRACK_DATABASE;
}

export function formatTime(milliseconds) {
  if (!milliseconds) return "0:00.000";
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const ms = milliseconds % 1000;
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

const STORAGE_KEY = 'raceforge_leaderboard';

export function getLeaderboard(trackId) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const allData = JSON.parse(stored);
    const trackData = allData[trackId] || [];
    return trackData.sort((a, b) => a.time - b.time).slice(0, 10);
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    return [];
  }
}

export function saveLeaderboardEntry(trackId, entry) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allData = stored ? JSON.parse(stored) : {};
    if (!allData[trackId]) {
      allData[trackId] = [];
    }
    allData[trackId].push({
      ...entry,
      date: new Date().toISOString()
    });
    allData[trackId] = allData[trackId].sort((a, b) => a.time - b.time).slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
    return true;
  } catch (error) {
    console.error('Error saving leaderboard:', error);
    return false;
  }
}

export function Track({ trackData, position = [0, 0, 0], scale = 1 }) {
  const { scene, nodes } = useGLTF(trackData.model);
  const ref = useRef();
  let mesh = null;
  if (scene) {
    scene.traverse((child) => {
      if (!mesh && child.isMesh && child.geometry) {
        mesh = child;
      }
    });
  }
  useEffect(() => {
    if (mesh && mesh.geometry) {
      const geom = mesh.geometry;
      const posAttr = geom.attributes.position.array;
      const indexArr = geom.index ? geom.index.array : null;
      useTrimesh(() => ({
        args: indexArr ? [posAttr, indexArr] : [posAttr, new Array(posAttr.length / 3).fill(0).map((_, i) => i)],
        type: 'Static',
        position
      }));
    }
  }, [mesh, position]);
  return <primitive ref={ref} object={scene} position={position} scale={[scale, scale, scale]} receiveShadow />;
}

export function GroundPlane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static',
    material: {
      friction: 0.3,
      restitution: 0.1
    }
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial color="#1a1a1a" />
    </mesh>
  );
}
