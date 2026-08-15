"use client";

import StaticModel from "./StaticModel";

const SERVER_URL = "/server.glb";

// The character (hoornain.glb) is authored small and scaled by 100, so its
// final height is ~2.0 world units. The server model (server.glb) is a tall
// tower rack (~13.92 tall raw, ~4.0 x ~4.0 footprint), so to render it at about
// half the character's height (~1.0 units) the scale must be ~1.0 / 13.92 ≈
// 0.072 — NOT the laptop's scale (the server is a different mesh, authored at a
// different size).
const SERVER_SCALE = 0.27;

// Place it right beside the character, flush on the floor (`Center bottom`
// handles the ground alignment). Character half-width is ~0.77 and the server
// half-width is ~0.15 at this scale, so x = -1.05 keeps them side-by-side with
// a small gap.
const SERVER_POSITION: [number, number, number] = [-2.3, 0, -0.5];
const SERVER_ROTATION: [number, number, number] = [0,-Math.PI/4,0,];

export default function Server() {
  return (
    <StaticModel
      url={SERVER_URL}
      scale={SERVER_SCALE}
      position={SERVER_POSITION}
      rotation={SERVER_ROTATION}
    />
  );
}