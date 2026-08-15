"use client";

import StaticModel from "./StaticModel";

const CHARACTER_URL = "/hoornain.glb";
const CHARACTER_SCALE = 100;
const CHARACTER_POSITION: [number, number, number] = [0, 3.5, 0];

export default function FrontendCharacter() {
  return (
    <StaticModel
      url={CHARACTER_URL}
      scale={CHARACTER_SCALE}
      position={CHARACTER_POSITION}
    />
  );
}