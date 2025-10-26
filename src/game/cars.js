import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

export const CAR_DATABASE = [
  {
    id: 1,
    name: "Porsche 911 Turbo S",
    year: "2024",
    model: "/assets/cars/car1.glb",
    description: "The ultimate sports car. Twin-turbo flat-six engine delivering incredible performance with legendary handling.",
    speed: 95,
    acceleration: 92,
    handling: 88,
    weight: 1640,
    topSpeed: 330
  },
  {
    id: 2,
    name: "Ferrari F8 Tributo",
    year: "2023",
    model: "/assets/cars/car2.glb",
    description: "Italian excellence. Mid-engine supercar with a screaming V8 and razor-sharp handling.",
    speed: 97,
    acceleration: 94,
    handling: 90,
    weight: 1435,
    topSpeed: 340
  },
  {
    id: 3,
    name: "Lamborghini Huracán EVO",
    year: "2024",
    model: "/assets/cars/car3.glb",
    description: "Raw Italian power. Naturally aspirated V10 with all-wheel drive traction and aggressive styling.",
    speed: 96,
    acceleration: 93,
    handling: 87,
    weight: 1422,
    topSpeed: 325
  },
  {
    id: 4,
    name: "McLaren 720S",
    year: "2023",
    model: "/assets/cars/car4.glb",
    description: "British engineering perfection. Carbon fiber monocoque with twin-turbo V8 and active aerodynamics.",
    speed: 98,
    acceleration: 96,
    handling: 92,
    weight: 1283,
    topSpeed: 341
  },
  {
    id: 5,
    name: "Audi R8 V10 Performance",
    year: "2024",
    model: "/assets/cars/car5.glb",
    description: "German precision. Mid-mounted V10 engine with Quattro all-wheel drive for ultimate grip.",
    speed: 94,
    acceleration: 90,
    handling: 89,
    weight: 1595,
    topSpeed: 331
  },
  {
    id: 6,
    name: "Chevrolet Corvette Z06",
    year: "2024",
    model: "/assets/cars/car6.glb",
    description: "American muscle evolved. Mid-engine supercar with a naturally aspirated flat-plane V8.",
    speed: 93,
    acceleration: 91,
    handling: 86,
    weight: 1560,
    topSpeed: 320
  },
  {
    id: 7,
    name: "Nissan GT-R NISMO",
    year: "2024",
    model: "/assets/cars/car7.glb",
    description: "Japanese legend. Twin-turbo V6 with advanced all-wheel drive system and track-focused tuning.",
    speed: 92,
    acceleration: 95,
    handling: 85,
    weight: 1725,
    topSpeed: 315
  },
  {
    id: 8,
    name: "Mercedes-AMG GT Black Series",
    year: "2023",
    model: "/assets/cars/car8.glb",
    description: "German beast. Hand-built twin-turbo V8 with extreme aerodynamics and track technology.",
    speed: 97,
    acceleration: 94,
    handling: 88,
    weight: 1520,
    topSpeed: 325
  },
  {
    id: 9,
    name: "BMW M4 Competition",
    year: "2024",
    model: "/assets/cars/car9.glb",
    description: "Ultimate driving machine. Twin-turbo inline-six with perfect weight distribution.",
    speed: 89,
    acceleration: 88,
    handling: 91,
    weight: 1725,
    topSpeed: 290
  },
  {
    id: 10,
    name: "Aston Martin Vantage",
    year: "2024",
    model: "/assets/cars/car10.glb",
    description: "British elegance meets performance. Twin-turbo V8 with stunning design and balanced handling.",
    speed: 91,
    acceleration: 89,
    handling: 90,
    weight: 1530,
    topSpeed: 314
  }
];

export function getAllCars() {
  return CAR_DATABASE;
}

export function Car({ carData, position = [0, 0.8, 0], isPlayer = false, onCarRef }) {
  const gltf = useGLTF(carData.model);
  const ref = useRef();
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });

  const [bodyRef, api] = useBox(() => ({
    mass: isPlayer ? carData.weight : carData.weight * 0.8,
    position,
    args: [1.8, 0.8, 4.2],
    linearDamping: 0.5,
    angularDamping: 0.9,
    allowSleep: false,
    material: {
      friction: 0.3,
      restitution: 0.1
    }
  }));

  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.rotation.set(0, Math.PI, 0);
      gltf.scene.position.set(0, -0.4, 0);
    }
  }, [gltf]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => {
      setVelocity({ x: v[0], y: v[1], z: v[2] });
    });
    return unsubscribe;
  }, [api]);

  useEffect(() => {
    if (onCarRef && bodyRef.current) {
      onCarRef(bodyRef.current, api, velocity);
    }
  }, [onCarRef, bodyRef, api, velocity]);

  useFrame(() => {
    if (!ref.current || !bodyRef.current) return;
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
        scale={[1.0, 1.0, 1.0]}
        castShadow
        receiveShadow
      />
    </group>
  );
}
