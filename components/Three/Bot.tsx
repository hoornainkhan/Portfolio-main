"use client";

import StaticModel from "./StaticModel";

const BOT_URL = "/bot.glb";

// The character (hoornain.glb) is authored small and scaled by 100, so its
// final height is ~2.0 world units. The bot (bot.glb) is a small companion
// (~5.27 tall raw, ~4.0 x ~4.4 footprint), so to render it at about one third
// of the character's height (~0.68 units) the scale must be ~0.68 / 5.27 ≈
// 0.13 — measured independently from the server/laptop because each GLB has its
// own native dimensions.
const BOT_SCALE = 0.13;

// Place it right beside the character, flush on the floor (`Center bottom`
// handles the ground alignment). Character half-width is ~0.77 and the bot
// half-width is ~0.26 at this scale, so x = -1.1 keeps them side-by-side with
// a small gap.
const BOT_POSITION: [number, number, number] = [-1, 0, 0.6];
const BOT_ROTATION:  [number, number, number] = [0,Math.PI/1.2,0,];

export default function Bot() {
  return (
    <StaticModel
      url={BOT_URL}
      scale={BOT_SCALE}
      position={BOT_POSITION}
      rotation={BOT_ROTATION}
    />
  );
}