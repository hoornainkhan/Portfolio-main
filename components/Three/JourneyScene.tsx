"use client";

import { Suspense, useRef } from "react";
import type { RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Camera from "./Camera";
import Lights from "./Lights";
import JourneyCharacter, {
  type JourneyCharacterHandle,
} from "./JourneyCharacter";

const DPR: [number, number] = [1, 2];

interface JourneySceneProps {
  /**
   * Optional external ref so a future GSAP controller (mounted in a client
   * component) can drive the character. When omitted, an internal ref keeps
   * the plumbing wired internally instead.
   */
  characterRef?: RefObject<JourneyCharacterHandle | null>;
}

/**
 * JourneyScene — the single persistent R3F Canvas for the homepage character.
 *
 * Stacking (uses the existing z-index system — no invented values):
 *   Global Background (-z-10) → page sections (z-0/z-10) → Journey Canvas
 *   (z-30) → Contact Rail + Life Update ticker (z-40).
 *
 * It is a transparent, fixed, full-viewport overlay:
 *   - covers the viewport and stays fixed while the page scrolls
 *   - pointer-events: none so buttons/links/topic cells keep working
 *   - aria-hidden because it is purely decorative
 *   - overflow is confined to the viewport, so no page-level scrollbars
 *
 * The character is mounted ONCE here for the whole homepage — it is never
 * destroyed/recreated per section, and it is never a per-Alter GLB clone.
 */
export default function JourneyScene({ characterRef }: JourneySceneProps) {
  const internalRef = useRef<JourneyCharacterHandle>(null);
  const resolvedRef = characterRef ?? internalRef;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    >
      <Canvas
        dpr={DPR}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 35, near: 0.1, far: 100, position: [0, 1.6, 5.2] }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Camera />
          <Lights />
          <JourneyCharacter ref={resolvedRef} initialAnimation="waving" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}