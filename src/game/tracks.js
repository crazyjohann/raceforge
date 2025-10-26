import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useTrimesh, usePlane } from '@react-three/cannon';

const TRACKS = ['/assets/tracks/track1.glb', '/assets/tracks/track2.glb'];

export default function Tracks() {
  return (
    <>
      {TRACKS.map((p, i) => (
        <Track key={i} modelPath={p} position={[0, 0, i * 220]} scale={1.0} />
      ))}
      {/* fallback ground plane for areas without mesh colliders */}
      <GroundPlane />
    </>
  );
}

function Track({ modelPath, position=[0,0,0], scale=1 }) {
  const { scene, nodes } = useGLTF(modelPath);
  // Try to find a geometry in the gltf to build trimesh
  // Use the first mesh found
  let mesh = null;
  scene.traverse((c) => {
    if (!mesh && c.isMesh && c.geometry) mesh = c;
  });

  // setup trimesh collision if mesh found
  if (mesh && mesh.geometry) {
    const geom = mesh.geometry;
    const posAttr = geom.attributes.position.array;
    const indexArr = geom.index ? geom.index.array : null;
    // useTrimesh expects plain arrays
    useTrimesh(() => ({
      args: indexArr ? [posAttr, indexArr] : [posAttr, new Array(posAttr.length/3).fill(0).map((_,i)=>i)],
      type: 'Static',
      position
    }));
  } else {
    // fallback: static plane
    usePlane(() => ({ position, rotation: [-Math.PI / 2, 0, 0] }));
  }

  return (
    <primitive object={scene} position={position} scale={[scale, scale, scale]} receiveShadow />
  );
}
