"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export interface SceneProps {
  geometryType: "torusKnot" | "icosahedron" | "sphere" | "torus";
  color: string;
  metalness: number;
  roughness: number;
  distort: number;
  speed: number;
  wireframe: boolean;
  materialType: "distort" | "wobble";
}

function InteractiveMesh({
  geometryType,
  color,
  metalness,
  roughness,
  distort,
  speed,
  wireframe,
  materialType,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.pointer;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.4, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.4, 0.05);
  });

  const renderGeometry = () => {
    switch (geometryType) {
      case "icosahedron":
        return <icosahedronGeometry args={[1.3, 0]} />;
      case "sphere":
        return <sphereGeometry args={[1.2, 64, 64]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 32, 100]} />;
      case "torusKnot":
      default:
        return <torusKnotGeometry args={[0.9, 0.32, 128, 32]} />;
    }
  };

  return (
    <Float speed={speed * 1.2} rotationIntensity={1.2} floatIntensity={1.4}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {renderGeometry()}
        {materialType === "wobble" ? (
          <MeshWobbleMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            factor={distort * 2}
            speed={speed}
            wireframe={wireframe}
          />
        ) : (
          <MeshDistortMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            distort={distort}
            speed={speed}
            wireframe={wireframe}
          />
        )}
      </mesh>
    </Float>
  );
}

export default function Scene3D(props: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="h-full w-full touch-none"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} castShadow />
      <pointLight position={[-6, -4, -2]} intensity={0.8} color="#6366f1" />
      <pointLight position={[6, -4, -2]} intensity={0.8} color="#ec4899" />
      
      <InteractiveMesh {...props} />

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.6}
        scale={10}
        blur={2.2}
        far={4}
      />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} />
    </Canvas>
  );
}