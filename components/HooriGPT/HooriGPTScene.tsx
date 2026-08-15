"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Lights from "../Three/Lights";
import FrontendCharacter from "../Three/FrontendCharacter";

const DPR: [number, number] = [1, 2];

/**
 * The 3D Hoornain character for the HooriGPT section — shown on the right,
 * standing beside the interface like the person behind HooriGPT. Static T-pose,
 * full body, grounded, no prop, no animation.
 */
export default function HooriGPTScene() {
  return (
    <Canvas
      dpr={DPR}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 35, near: 0.1, far: 100, position: [0, 1.6, 5.2] }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Lights />
        <FrontendCharacter />
      </Suspense>
    </Canvas>
  );
}