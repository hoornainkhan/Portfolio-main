"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface SoftGroundShadowProps {
  /** World-space position of the shadow plane (should sit just under the model's base). */
  position?: [number, number, number];
  /** World-space radius of the soft shadow disc. */
  radius?: number;
  /** Peak opacity at the center of the shadow (falls off to 0 at the edge). */
  opacity?: number;
}

/**
 * A soft, ambient contact shadow: a flat radial-gradient disc rendered under a
 * model's base. Unlike depth-based shadow systems (e.g. drei ContactShadows)
 * it needs no shadow map, no directional light and no visible floor — it works
 * on the transparent canvases and can be aligned to each model's own base
 * (models here stand at different heights: character 0.3, laptop -1, etc.).
 *
 * The gradient makes the shadow read as a gentle grounding glow rather than a
 * hard blob: it peaks at the center, softens through the middle, and fades to
 * fully transparent at the circumference.
 */
export default function SoftGroundShadow({
  position = [0, 0, 0],
  radius = 1,
  opacity = 0.18,
}: SoftGroundShadowProps) {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const center = size / 2;
    const gradient = ctx.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      center
    );
    gradient.addColorStop(0, `rgba(15, 13, 10, ${opacity})`);
    gradient.addColorStop(0.35, `rgba(15, 13, 10, ${opacity * 0.62})`);
    gradient.addColorStop(0.62, `rgba(15, 13, 10, ${opacity * 0.3})`);
    gradient.addColorStop(0.82, `rgba(15, 13, 10, ${opacity * 0.12})`);
    gradient.addColorStop(1, "rgba(15, 13, 10, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [opacity]);

  if (!texture) return null;

  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={2}
      frustumCulled={false}
    >
      <circleGeometry args={[radius, 48]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}