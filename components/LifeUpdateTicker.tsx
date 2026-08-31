/**
 * LifeUpdateTicker — a permanent, sticky status ticker shown at the very top of
 * the homepage. It is intentionally small and understated (a news/status ticker,
 * not a nav bar): solid `bg-cream` background matching the document/footer,
 * existing fonts/neutral ink colors, and a barely-there bottom border.
 *
 * Content is driven by a single constant so the status can be changed in one
 * place later. The marquee is a pure CSS animation (right → left, seamless):
 * the row contains many identical copies of the text and animates `translateX`
 * from 0 to -50% of its own width, so a copy always enters from the right just
 * as one exits on the left — no gaps, no one-time entrance.
 *
 * Rendered only from `app/page.tsx` (homepage `/`), NOT from `app/projects`.
 */
const LIFE_UPDATE_TEXT =
  " : Currently looking for full-time remote opportunities";

// How many identical copies of the text are placed side by side. The animation
// shifts the row by half its width, so the two halves must each be wider than
// any common viewport to guarantee no empty gap appears mid-loop.
const MARQUEE_COPIES = 20;

export default function LifeUpdateTicker() {
  return (
    <div className="sticky top-0 z-40 h-8 w-full overflow-hidden border-b border-ink/10 bg-cream">
      <div className="life-update-marquee flex h-full w-max items-center">
        {Array.from({ length: MARQUEE_COPIES }, (_, i) => (
          <span
            key={i}
            aria-hidden={i > 0}
            className="flex items-center whitespace-nowrap"
          >
            <span className="px-4 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-ink/60">
             <span className ="text-red-300">LIFE UPDATE</span> {LIFE_UPDATE_TEXT}
            </span>
            <span aria-hidden className="pr-4 text-[9px] text-ink/25">
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}