"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export interface SceneProps {
  color: string;
  metalness: number;
  roughness: number;
  distort: number;
  speed: number;
  wireframe: boolean;
}

function InteractiveMesh({ color, metalness, roughness, distort, speed, wireframe }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.pointer;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.5, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.05);
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshDistortMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          distort={distort}
          speed={speed}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D({
  color,
  metalness,
  roughness,
  distort,
  speed,
  wireframe,
}: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="h-full w-full touch-none"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, -5, -2]} intensity={0.5} color="#38bdf8" />
      
      <InteractiveMesh
        color={color}
        metalness={metalness}
        roughness={roughness}
        distort={distort}
        speed={speed}
        wireframe={wireframe}
      />

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
      />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} />
    </Canvas>
  );
}