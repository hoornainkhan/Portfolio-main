import type { JourneyAnimationName } from "./JourneyCharacter";

/**
 * Journey waypoints — the single source of truth for the character journey.
 *
 * WAYPOINTS ARE DATA. Coordinates are intentionally NOT scattered through the
 * controller; they live here so they can be tuned independently per breakpoint
 * and so future segments (backend -> AI -> HooriGPT -> Footer) are just more
 * entries in `JOURNEY_WAYPOINTS` + more rows in `JOURNEY_LEGS`.
 *
 * Units are world-space units in the persistent Journey Canvas (camera at
 * [0, 1.6, 5.2], FOV 35). `y` is the outer group's world offset (positive = up).
 *
 * Orientation is split into TWO concepts:
 *   - `restingRotationY` — the yaw while the character is at rest here. All
 *     checkpoints face the viewer/screen (0 = facing the camera, the way the
 *     glTF is authored).
 *   - `travelYaw` — the yaw the character faces while actively running TOWARD
 *     this waypoint (faces the direction of travel). Reverse travel uses
 *     `travelYaw + PI` so the character always turns around instead of running
 *     backwards. Values are signed radians: negative = turning left, positive =
 *     turning right.
 */

export type BreakpointKey = "desktop" | "tablet" | "mobile";

/** A single named position/facing the character can occupy or travel to. */
export interface Waypoint {
  name: string;
  position: { x: number; y: number; z: number };
  /** Y-rotation while resting at this waypoint (front-facing; 0 = toward camera). */
  restingRotationY: number;
  /** Y-rotation while actively running TOWARD this waypoint. */
  travelYaw: number;
  /** Clip shown while the character rests at this waypoint. */
  restingAnimation: JourneyAnimationName;
  /** Clip played while travelling INTO this waypoint (defaults to running). */
  approachAnimation?: JourneyAnimationName;
}

/** A scroll-driven leg: from one waypoint to another, anchored on a section. */
export interface JourneyLeg {
  from: string;
  to: string;
  /** CSS selector of the destination section used as the ScrollTrigger anchor. */
  triggerSelector: string;
  start: string;
  end: string;
}

export type WaypointMap = Record<string, Waypoint>;

export type JourneyConfig = Record<BreakpointKey, WaypointMap>;

export const JOURNEY_WAYPOINTS: JourneyConfig = {
  /**
   * Desktop (min-width: 1024px)
   * The character traces a deliberate horizontal zig-zag across the wide
   * landscape: Frontend (left, beside the laptop), Backend (right, beside the
   * server), AI (left, beside the bot), HooriGPT (right, thinking hard), and
   * finally a relaxed wave slightly right of center in the Footer. The vertical
   * travel is supplied by the page scroll flowing under the fixed canvas — the
   * small `y` deltas here just keep the feet planted on the ground plane.
   */
  desktop: {
    hero: {
      name: "hero",
      position: { x: 1, y: 1, z: 0 },
      restingRotationY: 0,
      travelYaw: 0,
      restingAnimation: "waving",
    },
    frontend: {
      name: "frontend",
      position: { x: -1.5, y: 0.5, z: 0.55 },
      restingRotationY: 0,
      travelYaw: -1.25,
      restingAnimation: "idle",
    },
    backend: {
      name: "backend",
      position: { x: 1.5, y: 1.25, z: 1.1 },
      restingRotationY: 0,
      travelYaw: 1.25,
      restingAnimation: "idle",
    },
    ai: {
      name: "ai",
      position: { x: -1.5, y: 1, z: 1.0 },
      restingRotationY: 0,
      travelYaw: -1.25,
      restingAnimation: "idle",
    },
    hoorigpt: {
      name: "hoorigpt",
      position: { x: 1.6, y: 1, z: 0.25 },
      restingRotationY: 0,
      travelYaw: 1.1,
      restingAnimation: "thinking",
    },
    footer: {
      name: "footer",
      position: { x: 1.6, y: 1, z: -0.1 },
      restingRotationY: 0,
      travelYaw: 0.4,
      restingAnimation: "waving",
    },
  },

  /**
   * Tablet (min-width: 768px) and (max-width: 1023px)
   * The alters collapse to a single stacked column, so the horizontal reach is
   * halved while keeping the same left/right zig-zag intent.
   */
  tablet: {
    hero: {
      name: "hero",
      position: { x: 0, y: 0, z: 0 },
      restingRotationY: 0,
      travelYaw: 0,
      restingAnimation: "waving",
    },
    frontend: {
      name: "frontend",
      position: { x: -0.9, y: -0.25, z: 0.45 },
      restingRotationY: 0,
      travelYaw: -0.9,
      restingAnimation: "idle",
    },
    backend: {
      name: "backend",
      position: { x: 0.9, y: 0.2, z: 0.85 },
      restingRotationY: 0,
      travelYaw: 0.9,
      restingAnimation: "idle",
    },
    ai: {
      name: "ai",
      position: { x: -0.9, y: -0.15, z: 0.7 },
      restingRotationY: 0,
      travelYaw: -0.9,
      restingAnimation: "idle",
    },
    hoorigpt: {
      name: "hoorigpt",
      position: { x: 1.0, y: -0.08, z: 0.2 },
      restingRotationY: 0,
      travelYaw: 0.8,
      restingAnimation: "thinking",
    },
    footer: {
      name: "footer",
      position: { x: 0.4, y: 0.12, z: -0.05 },
      restingRotationY: 0,
      travelYaw: 0.3,
      restingAnimation: "waving",
    },
  },

  /**
   * Mobile (max-width: 767px)
   * The route compresses vertically and stays within a narrow viewport, so the
   * cross-screen swing is small but still alternates side to side.
   */
  mobile: {
    hero: {
      name: "hero",
      position: { x: 0, y: 0, z: 0 },
      restingRotationY: 0,
      travelYaw: 0,
      restingAnimation: "waving",
    },
    frontend: {
      name: "frontend",
      position: { x: -0.35, y: -0.3, z: 0.25 },
      restingRotationY: 0,
      travelYaw: -0.4,
      restingAnimation: "idle",
    },
    backend: {
      name: "backend",
      position: { x: 0.3, y: 0.1, z: 0.5 },
      restingRotationY: 0,
      travelYaw: 0.4,
      restingAnimation: "idle",
    },
    ai: {
      name: "ai",
      position: { x: -0.3, y: -0.1, z: 0.45 },
      restingRotationY: 0,
      travelYaw: -0.4,
      restingAnimation: "idle",
    },
    hoorigpt: {
      name: "hoorigpt",
      position: { x: 0.5, y: -0.08, z: 0.1 },
      restingRotationY: 0,
      travelYaw: 0.4,
      restingAnimation: "thinking",
    },
    footer: {
      name: "footer",
      position: { x: 0.3, y: 0.1, z: -0.05 },
      restingRotationY: 0,
      travelYaw: 0.3,
      restingAnimation: "waving",
    },
  },
};

/**
 * Journey legs — each destination section acts as a scroll anchor for the next
 * leg of the character's route. The persistent character remains mounted across
 * the whole homepage while its world coordinates move along this continuous
 * zig-zag path. The first leg starts as the section enters the viewport
 * (`top bottom`) and the character arrives as it becomes the active section
 * (`top 30%`); the final Footer leg ends when the closing screen clears the
 * viewport (`bottom top`).
 */
export const JOURNEY_LEGS: JourneyLeg[] = [
  {
    from: "hero",
    to: "frontend",
    triggerSelector: "#frontend",
    start: "top bottom",
    end: "top 30%",
  },
  {
    from: "frontend",
    to: "backend",
    triggerSelector: "#backend",
    start: "top bottom",
    end: "top 30%",
  },
  {
    from: "backend",
    to: "ai",
    triggerSelector: "#ai",
    start: "top bottom",
    end: "top 30%",
  },
  {
    from: "ai",
    to: "hoorigpt",
    triggerSelector: "#hoorigpt",
    start: "top bottom",
    end: "top 30%",
  },
  {
    from: "hoorigpt",
    to: "footer",
    triggerSelector: "#ending",
    start: "top bottom",
    end: "bottom top",
  },
];