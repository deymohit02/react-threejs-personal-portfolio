import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

function Model() {
  const ref = useRef<THREE.Group>(null);

  // Load full GLTF: scene + animations
  const gltf = useGLTF("/models/my-bot.glb");
  const { scene, animations } = gltf;

  // Bind animations to the model
  const { actions } = useAnimations(animations, ref);

  /** 
   * Play the FIRST animation automatically.
   * If your GLB has multiple clips, pick the one you want.
   */
  useEffect(() => {
    if (actions && animations.length > 0) {
      // Play default animation
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  // Optional: slow idle rotation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y -= 0.0000;
    }
  });

  return <primitive ref={ref} object={scene} scale={3.5} />;
}

export default function AboutModel() {
  return (
    <Canvas
      camera={{ position: [0, 1, 3], fov: 45 }}
      className="w-full h-full"
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <Suspense fallback={null}>
        <Model />
        <OrbitControls enableZoom={false} />
      </Suspense>
    </Canvas>
  );
}
