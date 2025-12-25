import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

type ShapeType = "box" | "torus" | "sphere" | "tetrahedron";

interface Primitive {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  speed: number;
  scale: number;
  shape: ShapeType;
  color: string;
  createdAt: number;
  id: number;
}

interface RainingPrimitivesProps {
  className?: string; // allow passing a className
}

const COLORS = ["#00d4ff", "#ffff00", "#ff00ff"]; // cyan, yellow, magenta
const SHAPES: ShapeType[] = ["box", "torus", "sphere", "tetrahedron"];

export default function RainingPrimitives({ className }: RainingPrimitivesProps) {
  const [primitives, setPrimitives] = useState<Primitive[]>([]);

  useEffect(() => {
    const temp: Primitive[] = [];
    const count = 40; // number of falling primitives
    const now = Date.now();
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          Math.random() * 20 + 5,
          (Math.random() - 0.5) * 40
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        speed: Math.random() * 0.1 + 0.02,
        scale: Math.random() * 1.5 + 0.3,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        createdAt: now,
        id: i,
      });
    }
    setPrimitives(temp);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 10, 25], fov: 50 }}
      className={className} // forward the className here
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} />

      {primitives.map((prim) => (
        <PrimitiveMesh key={prim.id} primitive={prim} />
      ))}
    </Canvas>
  );
}

function PrimitiveMesh({ primitive }: { primitive: Primitive }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    let frame: number;
    const LIFETIME = 30000;
    const FADE_START = 25000;

    const animate = () => {
      if (meshRef.current) {
        meshRef.current.position.y -= primitive.speed;
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;

        const age = Date.now() - primitive.createdAt;
        if (age >= FADE_START) {
          const fadeProgress = (age - FADE_START) / (LIFETIME - FADE_START);
          setOpacity(Math.max(0, 0.3 * (1 - fadeProgress)));
        }

        if (meshRef.current.position.y < -5 && age < LIFETIME) {
          meshRef.current.position.y = Math.random() * 20 + 10;
        }
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [primitive]);

  const renderGeometry = () => {
    switch (primitive.shape) {
      case "box":
        return <boxGeometry args={[primitive.scale, primitive.scale, primitive.scale]} />;
      case "torus":
        return <torusGeometry args={[primitive.scale, primitive.scale * 0.4, 8, 8]} />;
      case "sphere":
        return <sphereGeometry args={[primitive.scale * 0.7, 16, 16]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[primitive.scale]} />;
      default:
        return <boxGeometry args={[primitive.scale, primitive.scale, primitive.scale]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={primitive.position} rotation={primitive.rotation}>
      {renderGeometry()}
      <meshStandardMaterial color={primitive.color} opacity={opacity} transparent />
    </mesh>
  );
}
