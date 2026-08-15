'use client'

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import Camera from "./Camera";
import Lights from "./Lights";
import HeroCharacter from "./HeroCharacter";

const DPR: [number, number] = [1, 2];

export default function Scene() {
  return (
    <Canvas
      dpr={DPR}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 35, near: 0.1, far: 100, position: [0, 1.6, 5.2] }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Camera />
        <Lights />
        <HeroCharacter />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}