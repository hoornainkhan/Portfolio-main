import HeroContent from "./HeroContent";
import HeroCharacter from "./HeroCharacter";
import HeroButtons from "./HeroButtons";
import HeroScrollIndicator from "./HeroScrollIndicator";

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-16 sm:px-10 lg:px-16">
        {/* Three-column layout */}
        <div className="grid flex-1 grid-cols-1 items-center gap-20 lg:grid-cols-[45fr_40fr_15fr] lg:gap-8">
          {/* Left — Hero content */}
          <div className="flex flex-col 
backdrop-blur-md
border border-white/30
rounded-3xl
shadow-xl p-4">
            <HeroContent />
            <HeroButtons />
          </div>

          {/* Center — Reserved character area */}
          <HeroCharacter />

          {/* Right — spacer for contact rail on desktop */}
          <div aria-hidden="true" className="hidden lg:block" />
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 lg:mt-0 backdrop-blur-md
border border-white/30
rounded-3xl
shadow-xl w-fit p-3">
          <HeroScrollIndicator />
        </div>
      </div>
    </section>
  );
}