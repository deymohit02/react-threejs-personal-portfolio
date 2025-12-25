"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface ServiceIslandProps {
  file: string;
  scale?: number;
  rotationSpeed?: number;
}

function IslandModel({
  file,
  scale = 1.5,
  rotationSpeed = 0.002,
}: ServiceIslandProps) {
  const ref = useRef<THREE.Group>(null);
  const gltf = useGLTF(file);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, ref);

  // ---- RANDOMIZED FLOATING PARAMETERS ----
  const floatSpeed = useRef(1 + Math.random() * 0.2);              // 1 → 2.2
  const floatHeight = useRef(0.0 + Math.random() * 0.0);          // 0.1 → 0.35
  const swaySpeedX = useRef(0.4 + Math.random() * 0.6);            // 0.4 → 1
  const swaySpeedZ = useRef(0.4 + Math.random() * 0.6);
  const swayAmount = useRef(0.02 + Math.random() * 0.03);          // 0.02 → 0.05
  const phase = useRef(Math.random() * Math.PI * 2);               // random start offset

  // Play default animation if present
  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    if (firstAction) firstAction.play();
  }, [actions]);

  // FLOATING + SWAY + CLOCKWISE ROTATION
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (ref.current) {
      // Unique floating for each island
      ref.current.position.y =
        Math.sin(t * floatSpeed.current + phase.current) * floatHeight.current;

      // Unique sway for each island
      {/*
      ref.current.rotation.x =
        Math.sin(t * swaySpeedX.current + phase.current) * swayAmount.current;

      ref.current.rotation.z =
        Math.cos(t * swaySpeedZ.current + phase.current) * swayAmount.current;
        */}

      // Your existing clockwise rotation
      ref.current.rotation.y -= rotationSpeed;
    }
  });

  return <primitive ref={ref} object={scene} scale={scale} />;
}

export default function ServiceIsland(props: ServiceIslandProps) {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 45 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1} />

      <Suspense fallback={null}>
        <IslandModel {...props} />
      </Suspense>
    </Canvas>
  );
}
