import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { useGLTF } from "@react-three/drei";

// Preload 3D model immediately on app startup
useGLTF.preload("/models/obot.glb");

createRoot(document.getElementById("root")!).render(<App />);
