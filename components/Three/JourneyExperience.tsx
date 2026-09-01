"use client";

import { useRef } from "react";
import JourneyScene from "./JourneyScene";
import JourneyController from "./JourneyController";
import type { JourneyCharacterHandle } from "./JourneyCharacter";

/**
 * JourneyExperience — owns the ONE character ref for the whole homepage and
 * mounts the persistent Journey canvas together with the GSAP + ScrollTrigger
 * controller. Keeping them in a single client component means the controller
 * and the scene always share the same stable ref.
 */
export default function JourneyExperience() {
  const characterRef = useRef<JourneyCharacterHandle>(null);

  return (
    <>
      <JourneyScene characterRef={characterRef} />
      <JourneyController characterRef={characterRef} />
    </>
  );
}