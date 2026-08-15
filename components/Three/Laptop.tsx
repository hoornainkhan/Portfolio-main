"use client";

import StaticModel from "./StaticModel";

const LAPTOP_URL = "/laptop.glb";

// The character (hoornain.glb) is authored small and scaled by 100, so its
// final height is ~2.0 world units. The laptop model is authored much larger
// (~2.74 tall raw), so to render it at 1/4 of the character's height
// (0.5 units) the laptop scale must be ~0.5 / 2.74 ≈ 0.18 — NOT 50 (that old
// value made the laptop ~68x the character height and blow out the frame).
const LAPTOP_SCALE = 0.18;

// Place it right beside the character, flush on the floor (`Center bottom`
// handles the ground alignment). Character half-width is ~0.77 and the laptop
// half-width is ~0.28, so x = -1.2 keeps them side-by-side with a small gap.
const LAPTOP_POSITION: [number, number, number] = [-1, -2, 0.3];
const LAPTOP_ROTATION:  [number, number, number] = [0,-Math.PI/1.5,0,];

export default function Laptop() {
  return (
    <StaticModel
      url={LAPTOP_URL}
      scale={LAPTOP_SCALE}
      position={LAPTOP_POSITION}
      rotation={LAPTOP_ROTATION}
    />
  );
}
