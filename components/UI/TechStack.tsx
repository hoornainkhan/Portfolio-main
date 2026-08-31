import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiThreedotjs,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGraphql,
  SiPrisma,
  SiSqlalchemy,
  SiMongoose,
  SiBun,
  SiLangchain,
  SiLanggraph,
  SiNvidia,
} from "react-icons/si";

type TechMark = {
  /** Brand signature color used to tint the logo (or monogram). */
  color: string;
  /** Official brand icon from react-icons/simple-icons, when one exists. */
  Icon?: IconType;
  /** Monogram fallback for technologies that have no brand icon. */
  code?: string;
};

// Real brand logos come from react-icons (Simple Icons collection). For the few
// technologies with no official icon (React Three Fiber, GSAP, SQL, REST APIs)
// we fall back to a small brand-tinted monogram badge.
const TECH_MARKS: Record<string, TechMark> = {
  JavaScript: { color: "#fecb04", Icon: SiJavascript },
  TypeScript: { color: "#3178C6", Icon: SiTypescript },
  React: { color: "#2b5bfb", Icon: SiReact },
  "Next.js": { color: "#000000", Icon: SiNextdotjs },
  "Tailwind CSS": { color: "#0EA5E9", Icon: SiTailwindcss },
  "Three.js": { color: "#000000", Icon: SiThreedotjs },
  "React Three Fiber": { color: "#2b5bfb", code: "R3" },
  GSAP: { color: "#88CE02", code: "G" },
  Vite: { color: "#646CFF", Icon: SiVite },
  "Node.js": { color: "#339933", Icon: SiNodedotjs },
  "Express.js": { color: "#000000", Icon: SiExpress },
  Python: { color: "#3776AB", Icon: SiPython },
  FastAPI: { color: "#009688", Icon: SiFastapi },
  MongoDB: { color: "#47A248", Icon: SiMongodb },
  PostgreSQL: { color: "#4169E1", Icon: SiPostgresql },
  SQL: { color: "#2B2926", code: "SQL" },
  Docker: { color: "#2496ED", Icon: SiDocker },
  Git: { color: "#F05032", Icon: SiGit },
  "REST APIs": { color: "#C08552", code: "REST" },
  // Additional backend APIs / databases / runtimes
  GraphQL: { color: "#E10098", Icon: SiGraphql },
  "GraphQL Yoga": { color: "#6B21A8", code: "GY" },
  Prisma: { color: "#2D3748", Icon: SiPrisma },
  SQLAlchemy: { color: "#D71F00", Icon: SiSqlalchemy },
  Mongoose: { color: "#A62100", Icon: SiMongoose },
  Bun: { color: "#B45309", Icon: SiBun },
  // AI Engineer alter
  "LLM Integration": { color: "#6B21A8", code: "LLM" },
  RAG: { color: "#16A34A", code: "RAG" },
  Embeddings: { color: "#0D9488", code: "EMB" },
  "Vector Databases": { color: "#2563EB", code: "VEC" },
  FAISS: { color: "#1877F2", code: "FA" },
  LangChain: { color: "#1F6F3A", Icon: SiLangchain },
  LangGraph: { color: "#1C6FB3", Icon: SiLanggraph },
  "NVIDIA NIM": { color: "#76B900", Icon: SiNvidia },
};

const FALLBACK_MARK: TechMark = { color: "#2B2926", code: "•" };

interface TechStackProps {
  technologies: string[];
}

/**
 * A compact, horizontally-scrollable row of technologies, each shown as
 * `[icon] Name`. Reused by every alter section so the list is passed in as
 * data rather than hardcoded in each section.
 */
export default function TechStack({ technologies }: TechStackProps) {
  return (
    <div className="w-full">
      <ul
        aria-label="Technology stack"
        className="flex w-full items-center gap-3 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {technologies.map((name) => {
          const mark = TECH_MARKS[name] ?? FALLBACK_MARK;
          return (
            <li
              key={name}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-1.5"
            >
              <span
                aria-hidden
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full "
                style={{ color: mark.color }}
              >
                {mark.Icon ? (
                  <mark.Icon size={15} />
                ) : (
                  <span className="text-[10px] font-bold leading-none">
                    {mark.code}
                  </span>
                )}
              </span>
              <span className="font-body text-sm font-medium text-ink/70">
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}