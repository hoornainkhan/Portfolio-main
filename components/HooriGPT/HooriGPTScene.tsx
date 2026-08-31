"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Lights from "../Three/Lights";

const DPR: [number, number] = [1, 2];

/**
 * HooriGPT scene — the duplicated static character has been removed. The single
 * persistent journey character (fixed `JourneyScene` overlay) will eventually
 * reach this region and use its `thinking` clip. Keeping the Canvas + Lights
 * here preserves the section's stage space so the layout stays stable.
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
      </Suspense>
    </Canvas>
  );
}