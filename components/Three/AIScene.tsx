"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import Lights from "./Lights";
import Bot from "./Bot";

const DPR: [number, number] = [1, 2];

export default function AIScene() {
  return (
    <Canvas
      dpr={DPR}
      shadows
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 35, near: 0.1, far: 100, position: [0, 1.6, 5.2] }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Bot />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}