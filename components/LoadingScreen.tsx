"use client";

import { useEffect, useState } from "react";

const LOADING_DURATION = 10000;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const start = performance.now();

    let frame: number;

    const update = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / LOADING_DURATION, 1);

      setProgress(nextProgress);

      if (nextProgress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        setIsExiting(true);

        window.setTimeout(() => {
          setIsDone(true);
        }, 900);
      }
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  if (isDone) return null;

  const percentage = Math.floor(progress * 100);

  /*
   * Pixelation starts strong and gradually disappears.
   *
   * 18px → 0px
   */
  const pixelSize = Math.max(0, 18 * (1 - progress));

  return (
    <div
      className={`loading-screen ${
        isExiting ? "loading-screen--exit" : ""
      }`}
      aria-label="Loading Hoornain's world"
      role="status"
    >
      {/* Background */}
      <div
        className="loading-screen__background"
        style={{
          filter: `blur(${pixelSize * 0.12}px)`,
        }}
      />

      {/* Pixelation overlay */}
      <div
        className="loading-screen__pixelation"
        style={{
          opacity: 1 - progress,
          backgroundSize: `${Math.max(pixelSize, 1)}px ${Math.max(
            pixelSize,
            1
          )}px`,
        }}
      />

      {/* Subtle scanlines */}
      <div className="loading-screen__scanlines" />

      {/* Main loading content */}
      <div className="loading-screen__content">
        <div className="loading-screen__eyebrow">
          INITIALIZING WORLD
        </div>

        <h1 className="loading-screen__title">
          HOORNAIN
          <span>'S WORLD</span>
        </h1>

        <div className="loading-screen__status">
          <span className="loading-screen__status-dot" />
          <span>
            {percentage < 30
              ? "Loading environment..."
              : percentage < 65
                ? "Building the world..."
                : percentage < 90
                  ? "Preparing your journey..."
                  : "Almost ready..."}
          </span>
        </div>

        {/* Progress bar */}
        <div className="loading-screen__progress-wrapper">
          <div className="loading-screen__progress-track">
            <div
              className="loading-screen__progress-fill"
              style={{
                transform: `scaleX(${progress})`,
              }}
            />
          </div>

          <div className="loading-screen__progress-info">
            <span>LOADING</span>
            <span>{String(percentage).padStart(3, "0")}%</span>
          </div>
        </div>

        {/* Decorative loading blocks */}
        <div className="loading-screen__blocks" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className={
                index / 12 <= progress
                  ? "loading-screen__block loading-screen__block--active"
                  : "loading-screen__block"
              }
            />
          ))}
        </div>
      </div>

      {/* Corner information */}
      <div className="loading-screen__corner loading-screen__corner--top-left">
        <span>WORLD_01</span>
        <span>BOOT_SEQUENCE</span>
      </div>

      <div className="loading-screen__corner loading-screen__corner--top-right">
        <span>3D_ENV</span>
        <span>ONLINE</span>
      </div>

      <div className="loading-screen__corner loading-screen__corner--bottom-left">
        <span>PLEASE WAIT</span>
      </div>

      <div className="loading-screen__corner loading-screen__corner--bottom-right">
        <span>v1.0</span>
      </div>
    </div>
  );
}