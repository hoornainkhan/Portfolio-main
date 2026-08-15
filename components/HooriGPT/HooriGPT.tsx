"use client";

import { useEffect, useState } from "react";
import type { HooriGPTData } from "./types";
import ChatInterface from "./ChatInterface";
import HooriGPTScene from "./HooriGPTScene";

/**
 * HooriGPT — a standalone ChatGPT-style storytelling interface, intentionally
 * separate from the Alter sections. Data comes from `/hoorigpt.json`.
 */
export default function HooriGPT() {
  const [data, setData] = useState<HooriGPTData | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/hoorigpt.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load hoorigpt.json");
        return res.json();
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch(() => {
        // Leave the section in its loading/empty state if the data fails.
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="hoorigpt"
      aria-label="HooriGPT"
      className="relative flex min-h-screen items-center overflow-hidden lg:h-screen"
    >
      {/* Quiet atmosphere over the global landscape (background only, not UI) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[#eef0f2]/45 backdrop-blur-[5px] backdrop-saturate-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_50%,rgba(43,41,38,0.14)_100%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:px-16">
        {data ? <ChatInterface data={data} /> : <ChatShell />}

        {/* 3D character standing beside the interface */}
        <div className="relative mx-auto h-[440px] w-full max-w-[360px] lg:mx-0 lg:h-[min(680px,calc(100dvh-3rem))] lg:w-[360px]">
          <HooriGPTScene />
        </div>
      </div>
    </section>
  );
}

/** Stable shell shown while `/hoorigpt.json` loads, so layout doesn't jump. */
function ChatShell() {
  return (
    <div className="flex h-[380px] w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:h-[420px]">
      <div className="relative flex items-center border-b border-gray-200 px-4 py-3.5">
        <h2 className="w-full text-center font-display text-xl font-semibold tracking-tight text-gray-900">
          HooriGPT
        </h2>
      </div>
      <div className="flex-1" />
    </div>
  );
}