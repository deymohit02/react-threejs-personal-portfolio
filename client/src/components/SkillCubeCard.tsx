"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

type CubeCardProps = {
  color?: string; // CSS color string
  size?: number; // scale multiplier
  rotationSpeed?: number | [number, number, number]; // rotation speed per axis
  floatAmplitude?: number; // vertical float amplitude
  floatSpeed?: number; // float frequency
  active?: boolean; // active state for scaling
  onClick?: (e?: React.MouseEvent | React.KeyboardEvent) => void; // click/keyboard handler
  ariaLabel?: string; // accessibility label
  className?: string; // optional wrapper classes
};

/**
 * CubeMesh: individual animated cube
 */
function CubeMesh({
  color = "#00FFFF",
  size = 1,
  rotationSpeed = 0.06,
  floatAmplitude = 0.3,
  floatSpeed = 0.2,
  active = false,
}: Omit<CubeCardProps, "className" | "ariaLabel" | "onClick">) {
  const meshRef = useRef<THREE.Mesh>(null);
  const hoverRef = useRef(false);

  // useFrame for animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;

    const [rx, ry, rz] =
      typeof rotationSpeed === "number" ? [0, rotationSpeed, 0] : rotationSpeed;

    meshRef.current.rotation.x += rx;
    meshRef.current.rotation.y += ry;
    meshRef.current.rotation.z += rz;

    meshRef.current.position.y = Math.sin(t * floatSpeed) * floatAmplitude;

    const targetScale = (active ? 1.15 : 1.0) * (hoverRef.current ? 1.1 : 1.0) * size;
    const current = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(current, targetScale, 0.12));

    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    const targetEmissive = hoverRef.current
      ? new THREE.Color(color).multiplyScalar(0.3)
      : new THREE.Color(0x000000);
    material.emissive.lerp(targetEmissive, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => (hoverRef.current = true)}
      onPointerOut={() => (hoverRef.current = false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        envMapIntensity={0.8}
        emissive={new THREE.Color(0x000000)}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/**
 * SkillCubeCard wrapper: Canvas + lighting + cube
 * Handles accessibility (role, aria-label, keyboard)
 */
export default function SkillCubeCard({
  color = "#00FFFF",
  size = 1,
  rotationSpeed = 0.006,
  floatAmplitude = 0.03,
  floatSpeed = 1.1,
  active = true,
  onClick,
  ariaLabel = "3D skill cube",
  className,
}: CubeCardProps) {
  // keyboard handler for Enter/Space
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <div
      className={className ?? "w-full h-full"}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{ width: "100%", height: "100%", touchAction: "manipulation", cursor: "pointer" }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 3], fov: 45 }}
        shadows={false}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.8} position={[5, 5, 5]} />
        <directionalLight intensity={0.3} position={[-5, -3, -5]} />

        <Suspense fallback={null}>
          <CubeMesh
            color={color}
            size={size}
            rotationSpeed={rotationSpeed}
            floatAmplitude={floatAmplitude}
            floatSpeed={floatSpeed}
            active={active}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
