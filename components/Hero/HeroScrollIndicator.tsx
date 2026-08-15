export default function HeroScrollIndicator() {
  return (
    <div className="flex items-center gap-3 text-ink/60">
      <span aria-hidden="true" className="text-lg leading-none">
        ↓
      </span>
      <p className="font-body text-sm font-medium uppercase tracking-[0.25em]">
        Scroll to meet my alters
      </p>
    </div>
  );
}