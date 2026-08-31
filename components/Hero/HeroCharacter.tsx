/**
 * HeroCharacter — reserved character-stage space in the Hero.
 *
 * The Hero no longer mounts its own Canvas / character clone. The single
 * persistent Hoornain character is rendered by the fixed `JourneyScene`
 * overlay, which is capable of covering this region (and the whole page).
 *
 * The container is kept EXACTLY as-before (same size/class) so the Hero layout
 * does not shift now that the duplicated model has been removed.
 */
export default function HeroCharacter() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[420px] w-full overflow-hidden rounded-3xl sm:h-[520px] lg:h-full lg:min-h-[560px]"
    />
  );
}