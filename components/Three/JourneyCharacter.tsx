"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";
import type { AnimationAction } from "three";
import SoftGroundShadow from "./SoftGroundShadow";

/**
 * The ONE canonical Hoornain character used for the homepage journey.
 *
 * Unlike the old per-section static clones, this component loads a single GLB
 * and exposes an imperative handle so a future GSAP + ScrollTrigger controller
 * can drive it without React re-renders. It is deliberately NOT wired to any
 * particular section — the initial state is temporary and owned by a prop so
 * the controller can later own every animation decision.
 *
 * Verified animation clips in `/hoornain.glb` (do not invent others):
 *   - idle     → alter checkpoints (future)
 *   - running  → travel between sections (future; there is NO walking clip)
 *   - t-pose   → neutral bind pose
 *   - thinking → HooriGPT (future)
 *   - waving   → Hero + Footer (future)
 */

export type JourneyAnimationName =
  | "idle"
  | "running"
  | "t-pose"
  | "thinking"
  | "waving";

export interface JourneyCharacterHandle {
  /** Controllable wrapper group — the future controller sets position/rotation/scale on this. */
  outer: Group | null;
  /** Inner animated group (useAnimations root). */
  inner: Group | null;
  /** Clip names available on the loaded model. */
  names: string[];
  /** Raw actions record for advanced control (start/stop/crossfade). */
  getActions: () => Record<string, AnimationAction | null>;
  /** Switch clip with a short crossfade; same-clip requests are ignored (`currentAction` ref). */
  setAnimation: (name: JourneyAnimationName, fadeDuration?: number) => void;
  /** Convenience positioner on the outer (controllable) group. */
  setPosition: (x: number, y: number, z: number) => void;
  /** Convenience rotation setter on the outer (controllable) group. */
  setRotation: (x: number, y: number, z: number) => void;
  /** Convenience scale setter on the outer (controllable) group. */
  setScale: (x: number, y: number, z: number) => void;
}

const MODEL_URL = "/hoornain.glb";
// Slightly smaller than the Hero-era scale of 100 so the journey character is
// more proportional to the fixed overlay's framing (roughly a 12% reduction).
const MODEL_SCALE = 88;

// Grounding shadow values (same look as the original Hero shadow).
const SHADOW_RADIUS = 1.0;
const SHADOW_OPACITY = 0.16;
const SHADOW_SINK = 0.005;
const FADE_DURATION = 0.35;

interface JourneyCharacterProps {
  /** Which verified clip plays once on first mount (temporary until the scroll controller owns state). */
  initialAnimation?: JourneyAnimationName;
  /** Render the soft grounding shadow disc under the character. */
  shadow?: boolean;
}

const JourneyCharacter = forwardRef<
  JourneyCharacterHandle,
  JourneyCharacterProps
>(function JourneyCharacter(
  { initialAnimation = "waving", shadow = true },
  ref,
) {
  const outerRef = useRef<Group>(null);
  const innerRef = useRef<Group>(null);

  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, innerRef);
  const currentActionRef = useRef<AnimationAction | null>(null);
  const initializedRef = useRef(false);

  // `<Center>` (no `bottom`) centers the model's bounding box at the origin, so
  // the base height is -(bbox height) / 2 in world units after MODEL_SCALE.
  const baseOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    return ((box.min.y - box.max.y) / 2) * MODEL_SCALE;
  }, [scene]);

  const play = useCallback(
    (name: JourneyAnimationName, fade = FADE_DURATION) => {
      const next = actions[name];
      if (!next) return;
      // Repeatedly requesting the current clip must not restart it.
      if (currentActionRef.current === next) return;
      next.reset();
      if (currentActionRef.current) currentActionRef.current.fadeOut(fade);
      next.fadeIn(fade).play();
      currentActionRef.current = next;
    },
    [actions],
  );

  // Temporary initial clip (waving keeps the Hero visually sensible until the
  // GSAP controller owns animation state in the next phase).
  useEffect(() => {
    if (initializedRef.current) return;
    if (!actions[initialAnimation]) return;
    initializedRef.current = true;
    play(initialAnimation);
  }, [actions, initialAnimation, play]);

  // HMR/unmount hygiene: fade out + stop everything so no actions leak.
  useEffect(() => {
    return () => {
      for (const action of Object.values(actions)) {
        action?.fadeOut(0.2).stop();
      }
    };
  }, [actions]);

  useImperativeHandle(
    ref,
    () => ({
      outer: outerRef.current,
      inner: innerRef.current,
      names,
      getActions: () => actions,
      setAnimation: (name, fade = FADE_DURATION) => play(name, fade),
      setPosition: (x, y, z) => outerRef.current?.position.set(x, y, z),
      setRotation: (x, y, z) => outerRef.current?.rotation.set(x, y, z),
      setScale: (x, y, z) => outerRef.current?.scale.set(x, y, z),
    }),
    [actions, names, play],
  );

  return (
    <group ref={outerRef}>
      <Center>
        <group ref={innerRef} scale={MODEL_SCALE}>
          <primitive object={scene} />
        </group>
      </Center>

      {shadow ? (
        <SoftGroundShadow
          position={[0, baseOffset - SHADOW_SINK, 0]}
          radius={SHADOW_RADIUS}
          opacity={SHADOW_OPACITY}
        />
      ) : null}
    </group>
  );
});

useGLTF.preload(MODEL_URL);

export default JourneyCharacter;