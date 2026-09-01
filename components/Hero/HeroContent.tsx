export default function HeroContent() {
  return (
    <div className="flex flex-col items-start gap-6 ">
      <p className="font-body text-sm font-medium uppercase tracking-[0.35em] text-accent">
        Hey, I&apos;m
      </p>

      <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
        Hoornain
        <span className="block">Khan</span>
      </h1>

      <div
        aria-hidden="true"
        className="h-px w-24 bg-accent"
      />

      <p className="font-body text-xl font-medium text-ink/80 sm:text-2xl">
        Full Stack Engineer
      </p>

      <p className="max-w-md font-body text-base leading-relaxed text-ink/70 pb-6">
       I build intelligent systems, craft delightful experiences and turn ideas into reality with code.
      </p>
    </div>
  );
}