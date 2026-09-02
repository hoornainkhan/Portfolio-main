"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Ending — the final scene of the portfolio. A calm, minimal closing that
 * contrasts with the more interactive sections above. The global Contact Rail
 * remains the primary contact surface (not duplicated here).
 */
export default function Ending() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Subtle fade/slide when the closing composition enters the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ending" aria-label="Ending" className="bg-cream">
      <div
        ref={ref}
        className={`mx-auto w-full max-w-7xl pt-6 py-24 sm:pb-1 lg:pb-2 sm:pt-10 lg:pt-16 lg:py-32 ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} transition-all duration-700 ease-out`}
      >
        {/* Closing message */}
        <div className="flex flex-col items-center text-center">
          <p className="font-body text-xs font-medium uppercase tracking-[0.4em] text-accent">
            The End
          </p>

          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            You&rsquo;ve reached the edge
            <span className="block">of my world.</span>
          </h2>

          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-ink/70">
            But there&rsquo;s always something new to build.
          </p>

          <Link
            href="#"
            className="group mt-12 inline-flex items-center gap-2 rounded-full border border-ink/25 px-8 py-3.5 font-body text-sm font-medium tracking-wide text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Let&rsquo;s build something together
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Divider */}
        {/* <hr className="mt-20 border-ink/10 lg:mt-24" /> */}

        {/* Lower footer information */}
        {/* <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2">
          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-ink/50">
              Hoornain
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-ink/70">
              Full Stack Developer
            </p>
            <p className="font-body text-sm leading-relaxed text-ink/70">
              Exploring AI Engineering
            </p>
          </div>

          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-ink/50">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/#frontend"
                  className="font-body text-sm text-ink/70 underline-offset-4 transition hover:text-ink hover:underline"
                >
                  Alters
                </Link>
              </li>
              <li>
                <Link
                  href="/#hoorigpt"
                  className="font-body text-sm text-ink/70 underline-offset-4 transition hover:text-ink hover:underline"
                >
                  HooriGPT
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="font-body text-sm text-ink/70 underline-offset-4 transition hover:text-ink hover:underline"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>
        </div> */}

        {/* Personality line + copyright */}
        <div className="mt-20 border-t border-ink/10 pt-5 text-center">
        <p className="font-body text-sm text-ink/60">
            This was built with Next.js · TypeScript · Three.js · React Three Fiber · Drei · GSAP · ScrollTrigger · Tailwind CSS 
          </p>
          <p className="font-body text-sm text-ink/60">
            Built with curiosity, caffeine &amp; an unreasonable amount of
            debugging.
          </p>
          <p className="mt-3 font-body text-xs text-ink/40">
            © 2026 Hoornain Khan
          </p>
        </div>
      </div>
    </section>
  );
}
