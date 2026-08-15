import Scene from "@/components/Three/Scene";

export default function HeroCharacter() {
  return (
    <div
      aria-label="3D character"
      className="relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[520px] lg:h-full lg:min-h-[560px]"
    >
      <Scene />
    </div>
  );
}