import Link from "next/link";
import Button from "@/components/UI/Button";
import TechStack from "@/components/UI/TechStack";
import FrontendScene from "@/components/Three/FrontendScene";

const FRONTEND_TECHNOLOGIES = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Three.js",
  "React Three Fiber",
  "GSAP",
  "Vite",
];

export default function FrontendAlter() {
  return (
    <section
      id="frontend"
      aria-label="Frontend Developer Alter"
      className="relative flex min-h-screen items-center overflow-hidden py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-16">
        {/* Left — Character + Laptop stage */}
        <div className="relative order-2 lg:order-1">
          <div className="character-stage relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[520px] lg:h-[640px]">
            <FrontendScene />
          </div>
        </div>

        {/* Right — Alter information */}
        <div className="order-1 flex flex-col items-start gap-6 lg:order-2 backdrop-blur-md
border border-white/30
rounded-3xl
shadow-xl p-4">
          <p className="font-body text-sm font-medium uppercase tracking-[0.35em] text-accent">
            Alter 01
          </p>

          <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            The Pixel
            <span className="block">Crafter</span>
          </h2>

          <p className="font-body text-xl font-medium text-ink/80 sm:text-2xl">
            Frontend Developer
          </p>

          <p className="max-w-md font-body text-base leading-relaxed text-ink/70">
            Where design meets interaction. I build responsive, thoughtful
            interfaces that turn ideas into experiences people actually enjoy
            using.
          </p>

          <TechStack technologies={FRONTEND_TECHNOLOGIES} />

          <Link href="/projects" className="mt-2">
            <Button variant="outline">View Projects</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}