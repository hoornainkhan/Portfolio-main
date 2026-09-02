# Hoornain Khan — Portfolio

Live site: [www.hoornainkhan.com](https://www.hoornainkhan.com)

An immersive, story-driven developer portfolio for **Hoornain Khan** — a full-stack engineer exploring applied AI. Instead of a traditional scroll-through résumé, this site is built as an adventure-game-inspired experience: a single 3D character travels alongside you as you scroll through the developer's "alters" (Frontend, Backend, AI Engineer), a ChatGPT-style storytelling interface, and a project wall.


## Highlights

- **One persistent 3D character** (`hoornain.glb`) on a fixed, transparent full-screen canvas that follows scroll across the whole homepage — waving at the Hero, running between sections, idling at checkpoints, and thinking in HooriGPT.
- **Scroll-driven journey** built with GSAP + ScrollTrigger: data-defined waypoints, per-breakpoint coordinate tables, direction-aware facing (the character turns around on reverse scroll instead of running backwards), and HMR-safe cleanup.
- **HooriGPT** — a chat interface with branching topics, snapshot-based back navigation and a "continue exploring" fallback, driven entirely by `public/hoorigpt.json` (no LLM, no external API).
- **Project wall** at `/projects` — filterable, image-first grid with an accessible detail modal, fully data-driven from `public/projects.json`.
- **Cinematic loading screen** (pixelation-to-clarity boot sequence), sticky life-update marquee, and a persistent contact rail that collapses to a toggle circle on phones.
- Responsive (desktop / tablet / mobile waypoint tables), keyboard-accessible, `prefers-reduced-motion` aware.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` design tokens via `@tailwindcss/postcss`) |
| 3D | three.js, React Three Fiber, @react-three/drei |
| Animation | GSAP 3 + ScrollTrigger (character journey), CSS keyframes (marquee, modal, loading) |
| Icons | react-icons (Simple Icons), inline SVG |
| Fonts | Josefin Sans (display), Ubuntu (body) — via `next/font/google` |
| Data | Static JSON in `public/` — no backend, no environment variables |

## The Experience

### Home (`/`)

1. **Loading screen** — a roughly 10-second "boot sequence" with a pixel-grid overlay that dissolves into clarity.
2. **Life update ticker** — sticky, seamless right-to-left marquee: "LIFE UPDATE: Currently looking for full-time remote opportunities."
3. **Contact rail** — fixed vertical rail (GitHub, LinkedIn, Email via Gmail compose, Resume PDF). On phones it becomes a single toggle circle with a dropdown.
4. **Hero** — "Hey, I'm Hoornain Khan" plus a View Projects CTA; the 3D character waves in the reserved center stage.
5. **Alter 01 — The Pixel Crafter (Frontend)** — laptop prop scene with tech chips (JS, TS, React, Next.js, Tailwind, Three.js, R3F, GSAP, Vite).
6. **Alter 02 — The Logic Builder (Backend)** — server-rack prop scene with tech chips (Node, Express, Python, FastAPI, MongoDB, PostgreSQL, Prisma, GraphQL, Docker, Bun, and more).
7. **Alter 03 — The Model Mind (AI Engineer)** — bot prop scene with tech chips (Python, LLM Integration, RAG, NVIDIA NIM).
8. **HooriGPT** — a branching chat story about the person behind the code, with grayscale technology chips per answer.
9. **Ending** — a calm closing screen with a "Let's build something together" CTA.

Throughout, the journey character moves over the page on a fixed canvas (`z-30`, `pointer-events: none`) while page content scrolls beneath.

### Projects (`/projects`)

- Data-driven grid sorted by `id` ascending; filter pills are generated from the labels present in the data ("All" plus every unique label).
- Cards open an accessible modal (`role="dialog"`, closes on Escape, backdrop click, or the X button, with body scroll lock) showing the full description, complete tech stack, category tags, live link, and repository links.
- Screenshots live in `public/projects/` and render with `object-contain` so they are never cropped; missing images degrade gracefully.

## Project Structure

```text
app/
  layout.tsx              Root layout: fonts (Josefin Sans + Ubuntu), metadata, GlobalBackground
  page.tsx                Homepage: section composition + <JourneyExperience /> overlay
  globals.css              Tailwind v4 @theme tokens, loading-screen & marquee & modal CSS
  projects/page.tsx        /projects route -> <ProjectsPage />
components/
  GlobalBackground.tsx      Fixed landscape image behind the entire site (-z-10)
  LoadingScreen.tsx         Boot-sequence intro (rAF progress, pixelation, scanlines)
  LifeUpdateTicker.tsx      Sticky seamless marquee (CSS keyframes)
  Hero/                     HeroContent, HeroButtons, HeroCharacter (reserved stage), ScrollIndicator
  Alters/                   FrontendAlter, BackendAlter, AIAlter (info card + 3D prop stage each)
  HooriGPT/                 HooriGPT (fetch + layout), ChatInterface (branching state machine),
                             HooriGPTScene (stage canvas), icons (react-icons bridge), types
  Projects/                 ProjectsPage (data, filters, modal state), ProjectGrid, ProjectCard,
                             ProjectModal, ProjectFilters, types
  ContactRail/               Fixed contact rail; mobile dropdown variant
  Footer/                    Ending: closing scene with IntersectionObserver reveal
  UI/                        Button (primary/outline), TechStack (brand-colored chips)
  Three/                     The whole 3D system (see below)
public/
  hoornain.glb              The character (clips: idle, running, t-pose, thinking, waving)
  laptop.glb, server.glb, bot.glb   Static props for the three alters
  background.png            Global fixed landscape
  projects.json              Projects wall data (single source of truth)
  hoorigpt.json              HooriGPT branching story (single source of truth)
  Resume.pdf                 Contact-rail download
  projects/*.png             Project screenshots
```

## The 3D Journey System

Everything lives in `components/Three/` and is mounted once from `app/page.tsx` via `<JourneyExperience />`:

```text
JourneyExperience (client)
├── JourneyScene          Fixed, transparent <Canvas> overlay (z-30, pointer-events: none)
│   ├── Camera            PerspectiveCamera at [0, 1.6, 5.2], FOV 35, lookAt [0, 1.4, 0]
│   ├── Lights            Ambient 0.6 + Directional 1.2 (shadows) + Hemisphere 0.5
│   └── JourneyCharacter  One hoornain.glb instance behind an imperative handle
└── JourneyController     GSAP + ScrollTrigger orchestrator (renders nothing)
```

Three concerns are kept independent so reverse-scrolling just works:

| Concern | Controlled by |
|---|---|
| Position | Per-leg scrubbed ScrollTrigger timelines interpolating between named waypoints |
| Facing | Scroll direction state — `travelYaw` going forward, `travelYaw + π` when returning; eases to front-facing `restingRotationY` at rest |
| Animation | Activity and progress — `waving` at Hero/Footer, `running` while travelling, `idle` at alter checkpoints, `thinking` at HooriGPT |

The route data is the single source of truth:

- **`components/Three/journeyWaypoints.ts`** — `JOURNEY_WAYPOINTS` (per-breakpoint `{position, restingRotationY, travelYaw, restingAnimation}` for each checkpoint: hero, frontend, backend, ai, hoorigpt, footer) and `JOURNEY_LEGS` (which DOM section anchors each leg, e.g. `start: "top bottom"`, `end: "top 30%"`).
- **`JourneyController`** polls for the character handle (200 ms), builds all triggers inside `gsap.context()` + `gsap.matchMedia()` (breakpoints: 1024px and up, 768–1023px, 767px and below), re-syncs the pose from scroll after every ScrollTrigger `refresh`, and tears down cleanly on unmount and Fast Refresh.

`hoornain.glb` ships exactly five clips — `idle`, `running`, `t-pose`, `thinking`, `waving` — there is no walking clip, which is why reverse travel turns the character around.

For a deeper dive on coordinate space, a file-by-file walkthrough, how to add checkpoints, and troubleshooting an invisible character, see `3d.md`.

## Editing Content (no code required)

**Add or edit a project** — append or edit an object in `public/projects.json`:

```jsonc
{
  "id": 11,                              // ascending id = display order
  "title": "My Project",
  "onlineDescription": "One-line card description.",
  "description": "Full paragraph shown in the modal.",
  "labels": ["fullstack"],               // becomes filter pills automatically
  "repoLinks": ["https://github.com/..."],
  "liveLink": "https://...",             // or null
  "image": "/projects/my-project.png",   // drop the screenshot in public/projects/
  "techStack": ["React", "Node.js"]
}
```

New tech names get a neutral monogram chip for free; to give one a real brand logo and color, add an entry to `TECH_MARKS` in `components/UI/TechStack.tsx`.

**Edit the HooriGPT story** — `public/hoorigpt.json` is the single source of truth (mirrored by the types in `components/HooriGPT/types.ts`). Each topic has `id`, `label`, `question`, `response`, `followUpTopics`, plus optional `action` (a link button) and `technologyGroup` (renders chips from `technologyGroups`). Visited topics are hidden for the session, and a "Continue exploring" row guarantees every topic is reachable before the ending message.

**Change the ticker** — edit `LIFE_UPDATE_TEXT` in `components/LifeUpdateTicker.tsx`.

**Retune the character route** — edit coordinates and animations in `components/Three/journeyWaypoints.ts`; add checkpoints by adding a waypoint plus one `JOURNEY_LEGS` row.

## Design Tokens

Defined in `app/globals.css` (`@theme inline`) — usable directly as Tailwind utilities (`bg-cream`, `text-ink`, `border-accent`, `font-display`, and so on):

| Token | Value | Used for |
|---|---|---|
| `--color-cream` | `#f7f6f3` | Page base / light surfaces |
| `--color-sand` | `#f2ece6` | Warm secondary surface |
| `--color-ink` | `#2b2926` | Text / dark fills |
| `--color-accent` | `#c08552` | Primary accent (buttons, eyebrows) |
| `--color-accent-soft` | `#d9a97c` | Hover accent |
| `--font-display` | Josefin Sans | Headings |
| `--font-body` | Ubuntu | Body copy |

Z-index stack (keep new layers consistent): global background `-z-10` → page sections `z-0`/`z-10` → journey canvas `z-30` → ticker + contact rail `z-40` → project modal `z-[60]`.

## Getting Started

Prerequisites: Node.js 20.9+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# then open http://localhost:3000

# 3. Production build & serve
npm run build
npm run start
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (eslint-config-next core-web-vitals + TypeScript) |

Validation commands used during development (all should pass before committing):

```bash
npx tsc --noEmit   # typecheck
npx eslint         # lint
npx next build     # production build
```

## Deployment

A standard Next.js App Router app with no backend or environment variables — deploy anywhere Next.js runs. Currently live at [www.hoornainkhan.com](https://www.hoornainkhan.com), deployed on Vercel: push to GitHub, import the repo, accept the defaults (`next build` + `next start`).

## Further Reading

- `3d.md` — a from-scratch walkthrough of the 3D character journey: coordinate space, file-by-file breakdown, waypoint tuning, responsive breakpoints, and troubleshooting.
- `progress.md` — internal build log, module history, and known issues.

---

Built with curiosity, caffeine, and an unreasonable amount of debugging. © 2026 Hoornain Khan