import Link from "next/link";
import Button from "@/components/UI/Button";
import TechStack from "@/components/UI/TechStack";
import BackendScene from "@/components/Three/BackendScene";

const BACKEND_TECHNOLOGIES = [
  "Node.js",
  "Express.js",
  "Python",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "SQL",
  "SQLAlchemy",
  "Mongoose",
  "Prisma",
  "GraphQL",
  "GraphQL Yoga",
  "Docker",
  "Git",
  "Bun",
  "REST APIs",
];

export default function BackendAlter() {
  return (
    <section
      id="backend"
      aria-label="Backend Developer Alter"
      className="relative flex min-h-screen items-center overflow-hidden py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-16">
        {/* Left — Alter information */}
        <div
          className="order-1 flex flex-col items-start gap-6 backdrop-blur-md
border border-white/30
rounded-3xl
shadow-xl p-4 lg:order-1"
        >
          <p className="font-body text-sm font-medium uppercase tracking-[0.35em] text-accent">
            Alter 02
          </p>

          <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            The Logic
            <span className="block">Builder</span>
          </h2>

          <p className="font-body text-xl font-medium text-ink/80 sm:text-2xl">
            Backend Developer
          </p>

          <p className="max-w-md font-body text-base leading-relaxed text-ink/70">
            Where systems come to life. I architect APIs, design databases, and
            build the reliable logic that powers products behind the scenes.
          </p>

          <TechStack technologies={BACKEND_TECHNOLOGIES} />

          <Link href="/projects" className="mt-2">
            <Button variant="outline">View Projects</Button>
          </Link>
        </div>

        {/* Right — Character + Server prop stage */}
        <div className="relative order-2 lg:order-2">
          <div className="character-stage relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[520px] lg:h-[640px]">
            <BackendScene />
          </div>
        </div>
      </div>
    </section>
  );
}
