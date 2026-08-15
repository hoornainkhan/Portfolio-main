/**
 * GlobalBackground — the portfolio's single, persistent landscape world.
 * One fixed layer sits behind the entire page (Hero, Alters, HooriGPT, Footer)
 * and stays visually continuous while the user scrolls. Sections layer their
 * own subtle atmospheric overlays on top of it; nothing duplicates the image.
 */
export default function GlobalBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* The landscape */}
      <div
        className="h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/background.png)" }}
      />
      {/* Soft base veil (keeps the historical Hero/Alter tint) */}
      <div className="absolute inset-0 bg-cream/20" />
    </div>
  );
}