// Canvas3D.tsx
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PresentationControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const meshRef = useRef<THREE.Group>(null);

  // Rotating the model frame by frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Load GLB model with animations
  const { scene, animations } = useGLTF("/models/obot.glb");
  const { actions } = useAnimations(animations, scene);

  // Play all animations when available
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.reset();                 // reset to start
          action.play();                  // start animation
          action.setLoop(THREE.LoopRepeat, Infinity); // loop forever
          action.timeScale = 1;           // optional speed control
        }
      });
    }
  }, [actions]);

  // Enable shadows on all meshes
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={6}              // Smaller size
      position={[0, -1, 0]}  // Center locally
      rotation={[0, Math.PI / 4, 0]} // Initial rotation
    />
  );
}

// Preload the GLB globally for faster loading
useGLTF.preload("/models/obot.glb");


export default function Canvas3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Centered on mobile, shifted right on desktop
  const modelPosition: [number, number, number] = isMobile ? [0, 0, 0] : [4, 0, 0];

  return (
    <Canvas
      shadows
      camera={{ fov: 45, position: [9, -3, 10] }}
      className="rounded-xl w-full h-full"
    >
      <Suspense fallback={null}>
        {/* HDRI Lighting */}
        {/*<Environment files="/environment/citrus_orchard_puresky_1k.hdr" background />*/}

        {/* User controls for model only */}
        <group position={modelPosition}>
          <PresentationControls
            global
            config={{ mass: 1, tension: 170, friction: 26 }} // Default-ish spring settings for responsiveness
            rotation={[0, 0, 0]}
          >
            <Model />
          </PresentationControls>
        </group>

        {/* Scene Lighting */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <ambientLight intensity={0.4} />
      </Suspense>
    </Canvas>
  );
}
