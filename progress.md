# Project Progress — Hoornain Khan Portfolio

## What This Project Is

A story-driven, interactive portfolio for **Hoornain Khan** ("Applied AI Engineer"). It is NOT a traditional portfolio — it is designed as an immersive, adventure-game-inspired experience where visitors scroll through different "alters" (versions of the developer: Frontend, Backend, AI). The design language is premium, peaceful, spacious, and handcrafted — explicitly avoiding AI-startup, SaaS, dashboard, or cyberpunk aesthetics.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- React Three Fiber + Three.js + @react-three/drei (for 3D character)
- react-icons (Simple Icons collection) for technology brand logos
- GSAP is **installed** (`^3.15.0`) but **not yet imported/used** — it appears only as a technology name in `TechStack` / `hoorigpt.json`. No Framer Motion, no Bootstrap/MUI/Chakra

## What Has Been Implemented

### Module 3.1 — Hero Section (COMPLETE)

The Hero section is fully built with a scenic fixed background, three-column desktop layout, and responsive stacking.

**Files created/modified:**

| File | Responsibility |
|---|---|
| `app/globals.css` | Tailwind v4 `@theme inline` design tokens: fonts (`--font-display`, `--font-body`) and colors (`cream`, `sand`, `ink`, `accent`, `accent-soft`) |
| `app/layout.tsx` | Registers **Josefin Sans** (display) and **Ubuntu** (body) via `next/font/google` as CSS variables; updated metadata title/description |
| `components/UI/Button.tsx` | Reusable button with `primary` / `outline` variants, TypeScript props, keyboard-accessible focus states |
| `components/ContactRail/ContactRail.tsx` | Fixed vertical contact rail (right side) with real links — GitHub (`github.com/hoornainkhan`), LinkedIn, Email (opens Gmail compose) and Resume (`/Resume.pdf`); all open in a new tab. On **phones** it collapses to a single **toggle circle** (top-right, phone icon + downward chevron) that expands a dropdown; stays vertical on tablets/desktop |
| `components/Hero/Hero.tsx` | Orchestrator: fixed scenic background (`/background.png`) + subtle cream overlay, full-viewport three-column grid (`45fr_40fr_15fr`), composes all sub-components |
| `components/Hero/HeroContent.tsx` | Left column: greeting ("Hey, I'm"), large name (Hoornain Khan), accent underline, subtitle, description |
| `components/Hero/HeroCharacter.tsx` | Center column container that now mounts the 3D `<Scene />` (was a dashed placeholder in Module 3.1) |
| `components/Hero/HeroButtons.tsx` | Composes the two reusable buttons: "Explore My World" (primary) + "View Projects" (outline) |
| `components/Hero/HeroScrollIndicator.tsx` | Static bottom-left "↓ Scroll to meet my alters" indicator |

### Module 4 — 3D Character Integration (COMPLETE)

The 3D character (`hoornain.glb`) is loaded and displayed inside the Hero's center column.

**Files created:**

| File | Responsibility |
|---|---|
| `components/Three/Camera.tsx` | `PerspectiveCamera` with framing constants (position `[0, 1.6, 5.2]`, FOV 35, lookAt `[0, 1.4, 0]`) so the whole character stays visible with headroom |
| `components/Three/Lights.tsx` | Soft daylight: `AmbientLight` (0.6) + `DirectionalLight` (1.2) + `HemisphereLight` (0.5, warm ground) to blend with the bright landscape |
| `components/Three/HeroCharacter.tsx` | Loads `/hoornain.glb` via `useGLTF`, wraps in `<Center>` + scaled `<group>`, plays the **"waving"** animation if present |
| `components/Three/Scene.tsx` | `<Canvas>` wrapper: transparent background, DPR `[1, 2]`, antialias, `Suspense`, `Preload all`; composes Camera + Lights + HeroCharacter |

### Module 5 — Frontend Developer Alter (COMPLETE — STATIC UI)

The Frontend Alter section ("The Pixel Crafter") is fully implemented as a static UI scene.

**Files created:**

| File | Responsibility |
|---|---|
| `components/Three/StaticModel.tsx` | Reusable static GLB loader (no animation) with `url`, `scale`, `position` props — used for both character and laptop |
| `components/Three/FrontendCharacter.tsx` | Static T-pose character using StaticModel with `/hoornain.glb`, scale 100 |
| `components/Three/Laptop.tsx` | Static laptop prop using StaticModel with `/laptop.glb`, scaled to ~1/4 of the character's height (scale 0.18), positioned beside the character |
| `components/Three/FrontendScene.tsx` | Canvas wrapper (transparent, DPR `[1,2]`, Suspense, Preload) composing Lights + FrontendCharacter + Laptop |

**Files modified:**

| File | Change |
|---|---|
| `components/Alters/FrontendAlter.tsx` | Replaced stub with full section: two-column layout, left character stage (FrontendScene), right info panel (Alter 01 / The Pixel Crafter / Frontend Developer / description / View Projects button) |

**Key decisions:**
- **No new background** — section is transparent, global fixed background remains visible.
- **No duplicate Contact Rail** — global ContactRail persists; section leaves horizontal breathing room.
- **View Projects** uses Next.js `Link` to `/projects` (route exists) wrapping the existing `Button` (outline variant).
- **Character stage** (`character-stage` class) is a stable, reusable container — the future animated character will occupy the same position.
- **Character + laptop are separate components** (`FrontendCharacter`, `Laptop`) so they can be manipulated independently later.
- **No animations** — StaticModel does not play any GLB animations; no GSAP; no scroll logic.
- **Responsive**: two-column on desktop, stacks on mobile (info first, character second via `order-*`).

### Module 5.1 — Backend & AI Developer Alters (COMPLETE — STATIC UI)

The Backend ("The Logic Builder") and AI ("The Model Mind") alters continue the
same system established by Frontend, composing the same static T-pose character
with a per-alter 3D prop. The chapter layout alternates: Alter 01 (3D left) →
Alter 02 (info left) → Alter 03 (3D left).

| File | Responsibility |
|---|---|
| `components/Three/Server.tsx` | Static `server.glb` prop, **`SERVER_SCALE = 0.27`** (its inline comment still reads the old `≈ 0.072` value), rotated `[0,-Math.PI/4,0]`, via StaticModel, beside the character |
| `components/Three/BackendScene.tsx` | Canvas composing Lights + FrontendCharacter + Server (mirrors FrontendScene) |
| `components/Three/Bot.tsx` | Static `bot.glb` companion prop (scale 0.13), rotation `[0,Math.PI/1.2,0]`, via StaticModel with **`center={false}`** (its base is the raw GLB origin — NOT `<Center bottom>`), overriding the old doc |
| `components/Three/AIScene.tsx` | Canvas composing Lights + FrontendCharacter + Bot (mirrors FrontendScene) |
| `components/Alters/BackendAlter.tsx` | Full section: Alter 02 / The Logic Builder / Backend Developer — info-left / 3D-right layout, tech row, View Projects → `/projects` |
| `components/Alters/AIAlter.tsx` | Full section: Alter 03 / The Model Mind / AI Engineer — 3D-left / info-right layout, tech row, View Projects → `/projects` |

All props are scaled independently from their raw GLB bounding boxes
(character ≈ 2.0 world units at scale 100). No new character component, no
animation, no scroll logic, no new background, no duplicate Contact Rail.

### Module 5.2 — Reusable Technology Stack Row (COMPLETE)

A single reusable `TechStack` component renders each alter's technology list as
a compact, horizontally-scrollable `[logo] Name` row (`overflow-x: auto`, no
wrap, hidden scrollbar, no page-level horizontal scroll).

| File | Responsibility |
|---|---|
| `components/UI/TechStack.tsx` | Accepts `technologies: string[]`; renders official brand logos via `react-icons` (Simple Icons) with a brand-tinted monogram fallback for technologies that have no official logo |

- **Icon source**: `react-icons` (Simple Icons collection) is the only new
  dependency. Logos are used where available; technologies without an official
  icon (LLM Integration, RAG, Embeddings, Vector Databases, FAISS, GSAP, React
  Three Fiber, SQL, REST APIs) fall back to a subtle brand-colored monogram badge.
- Integrated into all three alters — Frontend, Backend, and AI technology lists
  are passed as data to the same component.
- **Backend list extended** (later task): `BackendAlter`'s `BACKEND_TECHNOLOGIES`
  now also includes **SQLAlchemy, Mongoose, Prisma, GraphQL, GraphQL Yoga and Bun**
  (SQL/DB/API/runtime additions). `TechStack`'s `TECH_MARKS` registers real brand
  icons for GraphQL/Prisma/SQLAlchemy/Mongoose/Bun and a `GY` monogram badge for
  GraphQL Yoga (no Simple Icon exists). LangGraph and NVIDIA NIM also use real
  `SiLanggraph` / `SiNvidia` icons.

### Module 6 — HooriGPT Interactive Section (COMPLETE)

HooriGPT is a standalone ChatGPT-style storytelling interface — intentionally
**not** an Alter (no frosted-glass cards, no prop scene, its own neutral
`#eef0f2` background). `public/hoorigpt.json` is the single source of truth:
the UI/navigation is built around the JSON and its content is never hardcoded
or rewritten.

| File | Responsibility |
|---|---|
| `public/hoorigpt.json` | Finalized data: assistant info, `initialTopics`, branched topic graph (question / response / `followUpTopics` / optional `action` / optional `technologyGroup`), and technology groups |
| `components/HooriGPT/types.ts` | TS types mirroring the JSON |
| `components/HooriGPT/icons.tsx` | Maps JSON `SiXxx` icon-name strings → `react-icons/si` logos (rendered grayscale) |
| `components/HooriGPT/HooriGPTScene.tsx` | Right-side 3D character: Canvas + Lights + the existing static `FrontendCharacter` (T-pose, full body, grounded, no prop, no animation) |
| `components/HooriGPT/ChatInterface.tsx` | ChatGPT-style UI: header + top-right back (`›`) chevron, vertically scrollable conversation, fixed single-line horizontal topic row |
| `components/HooriGPT/HooriGPT.tsx` | Section: fetches the JSON, lays out chat-left / character-right, mounts a stable shell while loading |

**Behavior:**
- Initial state: empty conversation + a horizontal topic row from `initialTopics`. No auto-select, no welcome message. Empty-state placeholder text above the row.
- Topic cells: one horizontal line, `overflow-x: auto`, hidden scrollbar, subtle desaturated pastel accents, touch-scrollable.
- Branching navigation: a history stack of snapshots (messages + available topics). Back restores the previous conversation *and* choices; choosing a different path after going back discards the old forward branch (only one active branch).
- Visited topics are hidden so the story flows without repeats. When a branch runs out but topics remain, a "Continue exploring" row surfaces every unvisited topic; **"Thanks for getting to know me"** shows only once every topic has been visited (nothing gets missed).
- Special actions are data-driven: `action.type === "link"` renders the JSON's label + href (e.g. View Projects → `/projects`); `action.type === "contactRail"` relies on the existing global Contact Rail.
- Technology-group chips are rendered from the JSON + icon system.
- Responsive: chat left / character right on desktop, stacks on mobile, no page-level horizontal scroll.
- Placeholder: *"Curious about the person behind the code? Choose a chapter below and let's start there."*

### Module 7 — Ending, Global Background & Grounding Shadows (COMPLETE — previously undocumented)

The Ending / footer is no longer a stub, and three supporting pieces that existed
in code were missing from this log: the global background manager, a reusable
soft grounding shadow, and grounding shadows on every 3D model.

**Files / changes not previously documented:**

| File | Change |
|---|---|
| `components/GlobalBackground.tsx` | NEW — a single persistent fixed `/background.png` layer + `bg-cream/20` veil, mounted once in `app/layout.tsx`. The scenic background moved **out of the Hero** into a global layer that stays continuous behind every section. |
| `app/layout.tsx` | Now renders `<GlobalBackground />` once at the root (before `<main>`). |
| `components/Three/SoftGroundShadow.tsx` | NEW — a soft radial-gradient contact shadow (no shadow map, no drei ContactShadows, no floor). It is a flat transparent disc rendered just under a model's base; aligned per-model because models rest at different heights. |
| `components/Footer/Ending.tsx` | **Fully implemented (no longer a stub).** Client component with an `IntersectionObserver`-driven fade+slide on viewport entry, copy ("The End", "You've reached the edge of my world", "But there's always something new to build."), a "Let's build something together →" CTA, and a personality line + "© 2026 Hoornain Khan" copyright. A secondary Explore/Project info grid is present but commented out. |

**Grounding shadows:** `SoftGroundShadow` was originally added to the Hero and
to every prop, but the alter scenes no longer use it — the soft shadow was
**removed from `FrontendCharacter`, Laptop, Server and Bot** (their `StaticModel`
calls no longer pass `shadowRadius`/`shadowOpacity`). Only the **Hero** character
(`Three/HeroCharacter.tsx`) still renders its `SoftGroundShadow` disc directly
(radius `1.15`, opacity `0.16`). `StaticModel` retains `shadowRadius`,
`shadowOpacity` and `rotation` props (unused by the alters, kept for future use).

**Other scene/prop facts now in the code (undocumented before):**
- Camera Y differs: `Scene`/`BackendScene`/`AIScene`/`HooriGPTScene` use `[0, 1.6, 5.2]`, but `FrontendScene` uses `[0, 2, 5.2]`.
- Props carry explicit rotation: Laptop `[0, -Math.PI/1.5, 0]`, Server `[0, -Math.PI/4, 0]`, Bot `[0, Math.PI/1.2, 0]`.
- The Hero glassmorphism (`backdrop-blur-md`, `border-white/30`, `rounded-3xl`, `shadow-xl`) now also wraps all three alter info panels (`FrontendAlter`, `BackendAlter`, `AIAlter`).
- GSAP is installed (`^3.15.0`) but not yet used in code (only named in `TechStack` + JSON).
- `app/projects/page.tsx` exists but is only a placeholder ("Projects Page") — content has not been built yet.

### Module 8 — Life Update Ticker (COMPLETE)

A permanent, sticky status/news ticker shown **only on the homepage `/`** (not on `/projects`).

**Files:**

| File | Responsibility |
|---|---|
| `components/LifeUpdateTicker.tsx` | Sticky ticker rendered as the first child of `app/page.tsx`. 32px (`h-8`) tall, solid `bg-cream` (matches the footer/document), subtle `border-b border-ink/10` divider — no glassmorphism/gradients/icons. Uses existing `font-body`/neutral-ink styling. Content is easy to change later. |
| `app/page.tsx` | Renders `<LifeUpdateTicker />` at the top of the homepage only; sits in normal document flow above the Hero (no overlap), then sticks to the top while scrolling. |
| `app/globals.css` | `@keyframes life-update-marquee` + `.life-update-marquee` class — a pure-CSS infinite right → left marquee (linear, translateX `0` → `-50%`). |

**Details:**
- The ticker's **`LIFE UPDATE` label renders in pastel red** (`text-red-300`, existing palette) — only the label is colored; the status message
  (` : Currently looking for full-time opportunities`) stays neutral `text-ink/60`.
- Seamless loop: the status text tiles in many identical copies inside one `w-max` row; animating to `-50%` of the row's width loops back to an identical half, so there are no gaps, no jumps, and no one-time entrance. `overflow-hidden` prevents any horizontal scrollbar.
- No GSAP here — GSAP stays reserved for the portfolio's future scroll/3D animations. Works the same on mobile/tablet/desktop.
- Does **not** modify the Hero, Alters, HooriGPT, Footer, Three.js scenes, or the ContactRail positioning.
### Phase 2 — One Persistent Journey Character (COMPLETE)

Architecture refactor to prepare for the upcoming GSAP + ScrollTrigger character
journey. **No scroll animation, no GSAP/ScrollTrigger, no path/waypoints were
implemented yet** — this phase only changes the 3D architecture so there is ONE
Hoornain character for the whole homepage.

**Files created:**
| File | Responsibility |
|---|---|
| `components/Three/JourneyCharacter.tsx` | The single canonical animated character. `useGLTF` + `useAnimations` (replacing the Hero-only logic), imperative handle via `forwardRef`/`useImperativeHandle`. Loads `/hoornain.glb` once. |
| `components/Three/JourneyScene.tsx` | Persistent fixed full-viewport R3F Canvas (`fixed inset-0`, `z-30`, `pointer-events-none`, `aria-hidden`). Transparent, covers the page while scrolling; mounts Camera + Lights + `<JourneyCharacter initialAnimation="waving" />` + Preload. |

**Files modified:**
| File | Change |
|---|---|
| `app/page.tsx` | Mounts `<JourneyScene />` last (after Ending). Normal document flow preserved. |
| `components/Hero/HeroCharacter.tsx` | Now only a **reserved character-stage container** — no Canvas, no `Scene`, no model. Keeps the exact size/class so the Hero layout doesn't shift. |
| `components/Three/FrontendScene.tsx` | Removed `FrontendCharacter` → now **Lights + Laptop only**. Camera/`shadows` untouched. |
| `components/Three/BackendScene.tsx` | Removed `FrontendCharacter` → now **Lights + Server only**. |
| `components/Three/AIScene.tsx` | Removed `FrontendCharacter` → now **Lights + Bot only**. |
| `components/HooriGPT/HooriGPTScene.tsx` | Removed `FrontendCharacter` → now **Lights only** (empty transparent canvas keeps stage space among the duplicated model removal). Chat UI untouched. |

**Files deleted (superseded by the Journey architecture):**
| File | Why |
|---|---|
| `components/Three/Scene.tsx` | Old per-Hero Canvas wrapper (was only used by Hero). |
| `components/Three/HeroCharacter.tsx` | Old animated Hero character module (autoplay + `console.log`). |
| `components/Three/FrontendCharacter.tsx` | Static duplicate character loader (was used by all four alter/HooriGPT scenes). |

**How the single character is exposed for future GSAP control** — `JourneyCharacter`
exposes a typed `JourneyCharacterHandle`:
- `outer` (controllable wrapper Group → position/rotation/scale) and `inner` (animation root).
- `names` + `getActions()` for raw action access.
- `setAnimation(name, fade?)` — crossfade clip switch with a `currentAction` ref
  (same-clip requests are ignored). Verified clips only: `idle`, `running`,
  `t-pose`, `thinking`, `waving`.
- `setPosition` / `setRotation` / `setScale` convenience setters on the outer group.
`JourneyScene` accepts an optional `characterRef` prop so a client controller can
drive the character in the next phase.

**Props preserved exactly (not touched):** Laptop `0.18 / [1,-1,0] / rot -π/1.5`,
Server `0.27 / [-1,0,-0.3] / rot -π/4`, Bot `0.13 / [1,-1.2,0] / rot π/1.2,
center=false`. Their scenes/cameras are unchanged.

**Z-index / stacking (existing system, no invented values):** Global Background
`-z-10` → page sections `z-0/z-10` → **Journey Canvas `z-30`** → Contact Rail +
Life Update ticker `z-40`. Canvas is `pointer-events-none` so it never blocks
clicks; it is `aria-hidden` (decorative).

**Temporary initial state:** the journey character plays `waving` on mount so the
Hero stays visually sensible until the scroll controller owns animation state.

## Important Design Decisions

## Important Design Decisions
- **Design tokens** live in `globals.css` via Tailwind v4 `@theme inline` — no hardcoded colors/fonts in components.
- **Josefin Sans** for the large display name; **Ubuntu** for body/subtitle text.
- **Color palette**: cream (`#f7f6f3`), sand (`#f2ece6`), ink (`#2b2926`), accent (`#c08552`), accent-soft (`#d9a97c`).
- **Background**: `background.png` is fixed, cover, centered, with a subtle `bg-cream/20` overlay — not blurred, not excessively darkened.
- **Three-column desktop layout** (`45fr / 40fr / 15fr`): content left, character center, contact rail right. Stacks vertically on tablet/mobile.
- **User-added styling** (not from my original implementation): the left content column and scroll indicator now have `backdrop-blur-md`, `border-white/30`, `rounded-3xl`, `shadow-xl` glassmorphism treatments.
- **HeroContent description** was customized by the user to: *"I build intelligent systems, craft delightful experiences and turn ideas into reality with code."*

## Important Technical Decisions

- **`'use client'`** directives added to `Scene.tsx` and `Three/HeroCharacter.tsx` (required for R3F/Canvas).
- **MODEL_SCALE = 100** — the GLB model is small in native units, so it's scaled up significantly to fill the viewport.
- **Animation**: The model has a **"waving"** animation. The code targets `actions["waving"]` specifically (not just the first animation), with `reset().fadeIn(0.5).play()` and cleanup via `fadeOut(0.5).stop()`.
- **Camera framing**: FOV 35, position `[0, 1.6, 5.2]`, lookAt `[0, 1.4, 0]` — frames the character with headroom, feet not cropped.
- **Lighting**: Ambient + directional (key) + hemisphere (warm ground `#d9c9a3`) for soft daylight that blends with the bright landscape.
- **DPR optimization**: `[1, 2]` capped for performance.
- **Transparent canvas**: `gl={{ alpha: true }}` + `style={{ background: "transparent" }}` so only the model appears over the scenic background.

## Assets

| Asset | Location | Usage |
|---|---|---|
| `background.png` | `public/` | Fixed scenic background for the Hero section |
| `hoornain.glb` | `public/` | The main 3D character — used in Hero (waving) and all alter scenes (static T-pose) |
| `laptop.glb` | `public/` | Static laptop prop in the Frontend Alter scene |
| `server.glb` | `public/` | Static server prop in the Backend Alter scene |
| `bot.glb` | `public/` | Static bot companion prop in the AI Alter scene |
| `hoorigpt.json` | `public/` | Single source of truth for the HooriGPT storytelling interface (topics, branches, actions, technology groups) |

## Current Animation Setup

- `/hoornain.glb` contains **exactly 5 verified clips**: `idle`, `running`,
  **`t-pose`**, `thinking`, `waving`. **There is NO `walking` clip** (do not
  invent one).
- After Phase 2, the **single** animated character is `Three/JourneyCharacter.tsx`
  inside the persistent `Three/JourneyScene.tsx` overlay — it temporarily plays
  `waving` on mount so the Hero looks sensible.
- Animation is now controlled through the imperative `JourneyCharacterHandle`
  (`setAnimation`/`getActions`/`outer` group). The GSAP controller owns switching
  next phase; no scroll logic present yet.
- Cleanup on unmount fades out and stops all actions (HMR-safe).
- No manual animation creation; no GSAP; no scroll-based movement yet.

## Current Problems / Issues

1. **Browser verification pending**: `tsc --noEmit` and `eslint` pass on the current state, but visual checks in the browser (3D framing, prop placement, alignment, overflow) are still pending.
2. **`tsc-check.txt` / `lint-check.txt` are gone** (previously leftover verification artifacts at project root) — resolved. `tsconfig.tsbuildinfo` remains.
3. **HeroContent lint issue**: The apostrophe in "I'm" was flagged earlier by `react/no-unescaped-entities`. (HooriGPT avoids this by using the curly quote `’`.)
4. **Model scale / camera framing**: `MODEL_SCALE = 100` and the camera may need tuning — the character could be too large or cropped. Needs visual verification in the browser.
5. **`Server.tsx` scale inconsistency**: `SERVER_SCALE = 0.27` but the file's inline comment still derives `≈ 0.072` — one of them is wrong; verify visually.
6. **`app/page.tsx`**: all sections (Hero, 3 alters, HooriGPT, Ending) are implemented; `Ending` is done. `app/projects/page.tsx` is still a content placeholder.

## What We Were Working On Most Recently

**Module 6 — HooriGPT.** Built the standalone ChatGPT-style storytelling section
driven entirely by `public/hoorigpt.json` (single source of truth — content not
hardcoded). Added the chat interface with branching navigation (back chevron +
branch discard, hidden visited topics, a "Continue exploring" fallback so no
topic is missed, and a "Thanks for getting to know me" ending once everything is
covered), a right-side static 3D character (no prop / no animation), and
grayscale technology chips. Validated with `tsc --noEmit` + `eslint`.

## What Remains To Be Done (based on actual discussion)

- **Visually verify in the browser**: Hero + all 3 alters + HooriGPT — 3D framing, prop scale/placement, no text overlap, no horizontal overflow.
- **Scroll-driven 3D animation system** — character enters from the previous section, runs to the alter position, then idles: Frontend → running → Backend → running → AI → idle. The alters stay static T-pose for now; HooriGPT will eventually use the character's `idle` animation, and the `thinking` animation is reserved for HooriGPT. NOT yet started.
- **View Projects route content**: `app/projects/page.tsx` is currently a placeholder ("Projects Page") — needs real content.
- **Module 3.2 — Hero Polish** — refine Hero further (animations, polish) — not yet started.
- **Future modules** (discussed but not started): Loading Screen, Projects page content, routing, scroll animations.

## Next Steps

1. Run the dev server (`npm run dev`) and visually verify each section: Hero character framing, all 3 alters (character + laptop/server/bot scale & placement, no overlap), and the HooriGPT interface (chat + character, topic-row scrolling, placeholder/ending states).
2. Tune `MODEL_SCALE` / prop scales / camera constants if any model is cropped, too large, or misplaced. **(Verify `SERVER_SCALE = 0.27` vs. its stale `≈ 0.072` comment — one is wrong.)**
3. Build out the **/projects** page (currently just "Projects Page").
4. Implement the **scroll-driven 3D animation system** (running + idle) — this is where the installed GSAP dependency would be used.
