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
- No GSAP, no Framer Motion, no Bootstrap/MUI/Chakra

## What Has Been Implemented

### Module 3.1 — Hero Section (COMPLETE)

The Hero section is fully built with a scenic fixed background, three-column desktop layout, and responsive stacking.

**Files created/modified:**

| File | Responsibility |
|---|---|
| `app/globals.css` | Tailwind v4 `@theme inline` design tokens: fonts (`--font-display`, `--font-body`) and colors (`cream`, `sand`, `ink`, `accent`, `accent-soft`) |
| `app/layout.tsx` | Registers **Josefin Sans** (display) and **Ubuntu** (body) via `next/font/google` as CSS variables; updated metadata title/description |
| `components/UI/Button.tsx` | Reusable button with `primary` / `outline` variants, TypeScript props, keyboard-accessible focus states |
| `components/ContactRail/ContactRail.tsx` | Fixed vertical contact rail (right side) with GitHub / LinkedIn / Email / Resume placeholder links; collapses to horizontal pill on mobile |
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
| `components/Three/Server.tsx` | Static `server.glb` prop (scale 0.072 → ~1.0 world units, ~½ character height) via StaticModel, grounded with `<Center bottom>`, beside the character |
| `components/Three/BackendScene.tsx` | Canvas composing Lights + FrontendCharacter + Server (mirrors FrontendScene) |
| `components/Three/Bot.tsx` | Static `bot.glb` companion prop (scale 0.13 → ~0.68 world units, ~⅓ character height) via StaticModel, grounded with `<Center bottom>` |
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

- The `hoornain.glb` contains a **"waving"** animation.
- `Three/HeroCharacter.tsx` logs available animation names to console (`console.log("Available animations:", names)`), then plays `actions["waving"]` with a 0.5s fade-in.
- Cleanup on unmount fades out and stops the action.
- No manual animation creation; no GSAP; no scroll-based movement yet.

## Current Problems / Issues

1. **Browser verification pending**: `tsc --noEmit` and `eslint` pass on the current state, but visual checks in the browser (3D framing, prop placement, alignment, overflow) are still pending.
2. **`tsc-check.txt` / `lint-check.txt`** exist at project root as leftover verification artifacts — could be cleaned up.
3. **HeroContent lint issue**: The apostrophe in "I'm" was flagged earlier by `react/no-unescaped-entities`. (HooriGPT avoids this by using the curly quote `’`.)
4. **Model scale / camera framing**: `MODEL_SCALE = 100` and the camera may need tuning — the character could be too large or cropped. Needs visual verification in the browser.
5. **`app/page.tsx`**: Frontend/Backend/AI alters and HooriGPT are fully implemented; only `Ending` (the footer) remains a stub.

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
- **Ending / Footer section** — currently a stub.
- **Module 3.2 — Hero Polish** — refine Hero further (animations, polish) — not yet started.
- **Future modules** (discussed but not started): Loading Screen, Projects page content, routing, scroll animations.

## Next Steps

1. Run the dev server (`npm run dev`) and visually verify each section: Hero character framing, all 3 alters (character + laptop/server/bot scale & placement, no overlap), and the HooriGPT interface (chat + character, topic-row scrolling, placeholder/ending states).
2. Tune `MODEL_SCALE` / prop scales / camera constants if any model is cropped, too large, or misplaced.
3. Implement the **Ending / Footer** section.
4. Implement the **scroll-driven 3D animation system** (running + idle).
