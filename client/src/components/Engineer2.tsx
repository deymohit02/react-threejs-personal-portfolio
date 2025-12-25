import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Model() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/engineer2.glb");

  // Optional: slow automatic rotation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.000; // clockwise rotation
    }
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
}

// Preload the GLB globally for faster loading
useGLTF.preload("/models/engineer2.glb");

export default function Engineer2() {
  return (
    <Canvas camera={{ position: [6, 1, 8], fov: 45 }}>
      {/* Lighting */}
      <ambientLight intensity={3} />
      <directionalLight position={[4, 4, 4]} intensity={1.1} />

      <Suspense fallback={null}>
        {/* 3D Model */}
        <Model />

        {/* Environment preset 
        <Environment preset="city" />*/}

        {/* Interactive controls */}
        <OrbitControls
          enableZoom={false}       // allow zoom
          enablePan={true}        // allow panning
          enableRotate={false}     // allow rotation
          maxPolarAngle={Math.PI} // vertical rotation limit
          minPolarAngle={0}
        />
      </Suspense>
    </Canvas>
  );
}
