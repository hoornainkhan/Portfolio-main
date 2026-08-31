"use client";

import StaticModel from "./StaticModel";

const BOT_URL = "/bot.glb";

const BOT_SCALE = 0.13;

const BOT_POSITION: [number, number, number] = [1, -1.2, 0];

const BOT_ROTATION: [number, number, number] = [0,Math.PI/1.2, 0];

export default function Bot() {
  return (
    <StaticModel
      url={BOT_URL}
      scale={BOT_SCALE}
      position={BOT_POSITION}
      rotation={BOT_ROTATION}
      center={false}
    />
  );
}