"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { JourneyCharacterHandle } from "./JourneyCharacter";
import type {
  BreakpointKey,
  JourneyConfig,
  JourneyLeg,
  Waypoint,
} from "./journeyWaypoints";
import { JOURNEY_LEGS, JOURNEY_WAYPOINTS } from "./journeyWaypoints";

gsap.registerPlugin(ScrollTrigger);

interface JourneyControllerProps {
  characterRef: RefObject<JourneyCharacterHandle | null>;
  /** Swap the waypoint table (tests can pass a custom one; default is the real config). */
  waypoints?: JourneyConfig;
  /** Swap the legs table (tests can pass a custom one; default is the real config). */
  legs?: JourneyLeg[];
}

// Tunable feel.
const SCRUB = 0.8; // smoothing lag between scroll and the animation
const FACE_TURN_DURATION = 0.45; // rotation catch-up when direction/checkpoint changes
const STOP_MS = 260; // no scroll update for this long => treat as "stopped"
const DIRECTION_THRESHOLD_PX = 10; // committed scroll before a direction flip is accepted
// Bands, relative to a leg, where the character is considered "resting" at one
// of that leg's endpoints rather than actively travelling.
const LEG_START_REST = 0.08;
const LEG_END_REST = 0.92;

const BREAKPOINT_CONDITIONS = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  mobile: "(max-width: 767px)",
} as const;

/** Wrap an angle to (-PI, PI] so GSAP always turns the shortest way. */
function wrapAngle(a: number): number {
  return Math.atan2(Math.sin(a), Math.cos(a));
}

interface LegState {
  scrolling: boolean;
  lastDir: 1 | -1;
  prevScroll?: number;
  netDelta: number;
  facingTarget: number;
  stopTimer?: ReturnType<typeof setTimeout>;
}

interface LegEntry {
  leg: JourneyLeg;
  from: Waypoint;
  to: Waypoint;
  state: LegState;
  applyState: (self: ScrollTrigger) => void;
}

/**
 * JourneyController - the GSAP + ScrollTrigger orchestrator for the character
 * journey (Hero -> Frontend -> Backend -> AI -> HooriGPT -> Footer).
 *
 * THREE SEPARATE CONCERNS kept independent:
 *   1. POSITION  - each leg owns a scrubbed timeline that moves the character
 *                  from its `from` waypoint to its `to` waypoint. Because
 *                  consecutive waypoints are shared, the path is continuous and
 *                  a single leg is the active writer at any scroll position;
 *                  reverse scrolling runs the timeline backwards over the same
 *                  path. One authoritative `syncFromScroll()` call after every
 *                  `refresh` guarantees the correct starting pose (the per-leg
 *                  timelines otherwise each stamp their own `from` on refresh,
 *                  which used to leave the character stranded at the last
 *                  checkpoint on first paint or after a resize).
 *   2. FACING    - a small direction state carried per leg. While actively
 *                  travelling toward a waypoint the character faces its
 *                  `travelYaw`; when scrolling back it faces `travelYaw + PI`
 *                  (turns around, never runs backward). At rest it eases back
 *                  to the waypoint's front-facing `restingRotationY`.
 *   3. ANIMATION - `waving` at Hero, `running` only while actively travelling,
 *                  `idle` when travel stops or a mid-checkpoint is reached,
 *                  `thinking` at the HooriGPT checkpoint, `waving` at the Footer.
 *
 * Scroll activity comes from ScrollTrigger's `onUpdate` (fires only while the
 * scrubbed animation is actually updating) plus a small scoped stop-timer; a
 * direction flip is only committed after DIRECTION_THRESHOLD_PX of net travel,
 * so brief micro-reversals can't cause spin flicker.
 *
 * Cleanup: everything is created inside `gsap.context()` + `matchMedia`, so
 * reverting kills all tweens/triggers/timers created here - Fast Refresh safe.
 */
export default function JourneyController({
  characterRef,
  waypoints = JOURNEY_WAYPOINTS,
  legs = JOURNEY_LEGS,
}: JourneyControllerProps) {
  useEffect(() => {
    let disposed = false;
    let activeContext: gsap.Context | null = null;
    let lastHandle: JourneyCharacterHandle | null = null;
    let pollTimer: number | undefined;

    const teardown = () => {
      activeContext?.revert();
      activeContext = null;
      lastHandle = null;
    };

    const buildContext = (handle: JourneyCharacterHandle): gsap.Context => {
      return gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(BREAKPOINT_CONDITIONS, () => {
          // The active breakpoint, derived from the same media queries that
          // drive matchMedia (kept explicit so the waypoint table is correct
          // even before ScrollTrigger has measured anything).
          const breakpoint: BreakpointKey = window.matchMedia(
            BREAKPOINT_CONDITIONS.desktop,
          ).matches
            ? "desktop"
            : window.matchMedia(BREAKPOINT_CONDITIONS.tablet).matches
              ? "tablet"
              : "mobile";
          const wps = waypoints[breakpoint];
          const target = handle.outer!;
          const legStates: LegState[] = [];
          const triggers: ScrollTrigger[] = [];
          const entries: LegEntry[] = [];

          for (const leg of legs) {
            const from = wps[leg.from];
            const to = wps[leg.to];
            if (!from || !to || !target) continue;

            const state: LegState = {
              scrolling: false,
              lastDir: 1,
              netDelta: 0,
              facingTarget: from.restingRotationY,
            };
            legStates.push(state);

            // Smoothly rotate to a new target yaw only when it actually changes,
            // so direction flips turn once and checkpoints ease to front-facing.
            const applyFacing = (yaw: number) => {
              const normalized = wrapAngle(yaw);
              if (state.facingTarget !== normalized) {
                gsap.to(target.rotation, {
                  y: normalized,
                  duration: FACE_TURN_DURATION,
                  ease: "power2.out",
                  overwrite: "auto",
                });
                state.facingTarget = normalized;
              }
            };

            // Resolve which clip + facing the current moment demands. Checkpoint
            // states are handled before the generic mid-leg travel state so the
            // character settles naturally when it reaches a landmark.
            const applyState = (self: ScrollTrigger) => {
              const p = self.progress;
              const isAtFrom = p <= LEG_START_REST;
              const isAtTo = p >= LEG_END_REST;

              if (isAtFrom) {
                handle.setAnimation(from.restingAnimation);
                applyFacing(from.restingRotationY);
              } else if (isAtTo) {
                handle.setAnimation(to.restingAnimation);
                applyFacing(to.restingRotationY);
              } else if (state.scrolling) {
                handle.setAnimation(to.approachAnimation ?? "running");
                applyFacing(
                  state.lastDir > 0 ? to.travelYaw : to.travelYaw + Math.PI,
                );
              } else {
                // Scrolling stopped mid-travel: never freeze in a running pose.
                handle.setAnimation("idle");
              }
            };

            // (1) POSITION - single scrubbed timeline for the whole leg.
            // `immediateRender: false` avoids an instant `from` stamp that would
            // fight other legs; each leg only writes while its own range is
            // active (inactive scrubbed timelines don't re-render at progress 0).
            const timeline = gsap.timeline({ defaults: { ease: "none" } });
            timeline.fromTo(
              target.position,
              {
                x: from.position.x,
                y: from.position.y,
                z: from.position.z,
                immediateRender: false,
              },
              {
                x: to.position.x,
                y: to.position.y,
                z: to.position.z,
                duration: 1,
              },
              0,
            );

            const trigger = ScrollTrigger.create({
              trigger: leg.triggerSelector,
              start: leg.start,
              end: leg.end,
              scrub: SCRUB,
              animation: timeline,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Scrolling is happening (or the scrub is still settling).
                state.scrolling = true;
                clearTimeout(state.stopTimer);
                state.stopTimer = setTimeout(() => {
                  state.scrolling = false;
                  applyState(self);
                }, STOP_MS);

                // (2) FACING - commit a direction change only after enough net
                // scroll, so tiny reversals don't cause visual oscillation.
                const current = self.scroll();
                if (state.prevScroll !== undefined) {
                  const delta = current - state.prevScroll;
                  state.netDelta += delta;
                  if (Math.abs(state.netDelta) >= DIRECTION_THRESHOLD_PX) {
                    state.lastDir = state.netDelta > 0 ? 1 : -1;
                    state.netDelta = 0;
                  }
                }
                state.prevScroll = current;

                // (3) ANIMATION + facing for the current progress/direction.
                applyState(self);
              },
            });

            triggers.push(trigger);
            entries.push({ leg, from, to, state, applyState });
          }

          /**
           * After every `refresh`, every scrubbed timeline has rendered to its
           * clamped progress (each stamping its own `from`). Adopt the leg that
           * actually owns the current scroll position and re-assert its pose,
           * so the last-created leg can't leave the character stranded at the
           * wrong checkpoint on first paint or after a resize.
           */
          const syncFromScroll = () => {
            if (triggers.length === 0) return;
            let active = -1;
            for (let i = 0; i < triggers.length; i++) {
              const p = triggers[i].progress;
              if (p > LEG_START_REST && p < LEG_END_REST) {
                active = i;
                break;
              }
            }
            if (active === -1) {
              // No leg is mid-travel: rest at the first checkpoint (top of the
              // page) or the last checkpoint (bottom of the story).
              active = triggers[0].progress <= 0.5 ? 0 : triggers.length - 1;
            }

            const entry = entries[active];
            const t = triggers[active];
            const { state, from, to } = entry;
            const p = t.progress;
            // Authoritative single-writer position (overrides any stale tween).
            target.position.set(
              from.position.x + (to.position.x - from.position.x) * p,
              from.position.y + (to.position.y - from.position.y) * p,
              from.position.z + (to.position.z - from.position.z) * p,
            );
            state.scrolling = false;
            state.lastDir = 1;
            entry.applyState(t);
          };

          ScrollTrigger.addEventListener("refresh", syncFromScroll);
          ScrollTrigger.refresh();
          syncFromScroll();

          return () => {
            for (const s of legStates) clearTimeout(s.stopTimer);
            ScrollTrigger.removeEventListener("refresh", syncFromScroll);
          };
        });
      });
    };

    const poll = () => {
      if (disposed) return;
      const handle = characterRef.current;
      if (handle !== lastHandle) {
        teardown();
        if (handle?.outer) activeContext = buildContext(handle);
        lastHandle = handle;
      }
      pollTimer = window.setTimeout(poll, 200);
    };

    poll();

    return () => {
      disposed = true;
      clearTimeout(pollTimer);
      teardown();
    };
  }, [characterRef, waypoints, legs]);

  return null;
}