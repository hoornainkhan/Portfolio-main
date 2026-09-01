"use client";

import { useEffect, useState } from "react";

const MIN_LOADING_TIME = 10000;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();

    let frame: number;

    const animate = (now: number) => {
      const elapsed = now - start;
      const percentage = Math.min(elapsed / MIN_LOADING_TIME, 1);

      setProgress(percentage * 100);

      if (percentage < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setExiting(true);

        setTimeout(() => {
          document.body.classList.remove("loading-active");
        }, 1000);
      }
    };

    document.body.classList.add("loading-active");

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("loading-active");
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#F7F6F3] ${
        exiting ? "loading-screen-exit" : ""
      }`}
      aria-label="Loading Hoornain's world"
    >
      {/* Pixelated background */}
      <div className="absolute inset-0">
        <img
          src="/background.png"
          alt=""
          className="loading-pixel-background"
        />

        {/* Gradually removes the harshness of the pixelated layer */}
        <div
          className="absolute inset-0 bg-[#F7F6F3]/35"
          style={{
            opacity: Math.max(0, 1 - progress / 100),
          }}
        />
      </div>

      {/* Soft neutral overlay */}
      <div className="absolute inset-0 bg-[#F7F6F3]/25 backdrop-blur-[1px]" />

      {/* Loading content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-ink/50">
            Entering
          </p>

          <h1 className="mt-3 font-display text-3xl font-semibold tracking-[0.12em] text-ink sm:text-4xl">
            HOORNAIN'S WORLD
          </h1>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:300ms]" />
          </div>

          {/* Progress bar */}
          <div className="mt-7 h-px w-48 overflow-hidden bg-ink/10 sm:w-64">
            <div
              className="h-full bg-ink/50 transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex w-48 justify-between font-body text-[10px] uppercase tracking-[0.25em] text-ink/40 sm:w-64">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Bottom game-like status */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-ink/35">
            Preparing your journey
          </p>
        </div>
      </div>
    </div>
  );
}