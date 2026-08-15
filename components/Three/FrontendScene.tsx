"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import Lights from "./Lights";
import FrontendCharacter from "./FrontendCharacter";
import Laptop from "./Laptop";

const DPR: [number, number] = [1, 2];

export default function FrontendScene() {
  return (
    <Canvas
      dpr={DPR}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 35, near: 0.1, far: 100, position: [0, 2, 5.2] }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Lights />
        <FrontendCharacter />
        <Laptop />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}