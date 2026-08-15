import Link from "next/link";
import Button from "@/components/UI/Button";
import TechStack from "@/components/UI/TechStack";
import AIScene from "@/components/Three/AIScene";

const AI_TECHNOLOGIES = [
  "Python",
  "LLM Integration",
  "RAG",
  "Embeddings",
  "Vector Databases",
  "FAISS",
  "LangChain",
  "LangGraph",
  "NVIDIA NIM",
];

export default function AIAlter() {
  return (
    <section
      aria-label="AI Engineer Alter"
      className="relative flex min-h-screen items-center overflow-hidden py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-16">
        {/* Left — Character + Bot prop stage */}
        <div className="relative order-2 lg:order-1">
          <div className="character-stage relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[520px] lg:h-[640px]">
            <AIScene />
          </div>
        </div>

        {/* Right — Alter information */}
        <div className="order-1 flex flex-col items-start gap-6 lg:order-2 backdrop-blur-md
border border-white/30
rounded-3xl
shadow-xl p-4">
          <p className="font-body text-sm font-medium uppercase tracking-[0.35em] text-accent">
            Alter 03
          </p>

          <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            The Model
            <span className="block">Mind</span>
          </h2>

          <p className="font-body text-xl font-medium text-ink/80 sm:text-2xl">
            AI Engineer
          </p>

          <p className="max-w-md font-body text-base leading-relaxed text-ink/70">
            Where machine intelligence meets real products. I build AI-powered
            applications — wiring LLMs, RAG pipelines, and vector search into
            experiences that solve real problems.
          </p>

          <TechStack technologies={AI_TECHNOLOGIES} />

          <Link href="/projects" className="mt-2">
            <Button variant="outline">View Projects</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}