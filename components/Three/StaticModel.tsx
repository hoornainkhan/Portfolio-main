"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import SoftGroundShadow from "./SoftGroundShadow";

interface StaticModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  center?: boolean;
  /** World-units radius of a soft grounding shadow beneath the model (0 = none). */
  shadowRadius?: number;
  /** Peak opacity of the soft grounding shadow. */
  shadowOpacity?: number;
}

// How far below the model's base the shadow plane sits, in world units.
const SHADOW_SINK = 0.005;

export default function StaticModel({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  center = true,
  shadowRadius = 0,
  shadowOpacity = 0.18,
}: StaticModelProps) {
  const { scene } = useGLTF(url);

  // Raw (pre-transform) bounds of the loaded GLB, used to place the shadow
  // at the true base even when the model is not `<Center bottom>` aligned
  // (e.g. `center={false}` models like the bot whose base is its raw origin).
  const rawBounds = useMemo(() => {
    if (!shadowRadius) return null;
    return new THREE.Box3().setFromObject(scene);
  }, [scene, shadowRadius]);

// scene.traverse((object) => {
//     if (object instanceof THREE.Mesh) {
//       object.castShadow = true;
//       object.receiveShadow = true;
//     }
//   });

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {center ? (
        <Center bottom>
          <primitive object={scene} />
        </Center>
      ) : (
        <primitive object={scene} />
      )}

      {shadowRadius ? (
        <SoftGroundShadow
          position={[
            0,
            (center ? 0 : rawBounds ? rawBounds.min.y : 0) - SHADOW_SINK / scale,
            0,
          ]}
          radius={shadowRadius / scale}
          opacity={shadowOpacity}
        />
      ) : null}
    </group>
  );
}