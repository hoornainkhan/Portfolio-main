"use client";

import { useState } from "react";

type ContactItem = {
  label: string;
  href: string;
  newTab?: boolean;
  icon: React.ReactNode;
};

// Email opens a pre-filled Gmail compose window in a new tab — more reliable
// than a native `mailto:` (which silently does nothing when no mail client is
// registered), and it works from any browser/device with a Google account.
const contactItems: ContactItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/hoornainkhan",
    newTab: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hoornain-khan-664632246/",
    newTab: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=hooriking2004@gmail.com",
    newTab: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Resume",
    href: "/Resume.pdf",
    newTab: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

/** Shared icon-link used by both the mobile menu and the desktop rail. */
function RailLink({ item }: { item: ContactItem }) {
  return (
    <a
      href={item.href}
      {...(item.newTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={item.label}
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {item.icon}
    </a>
  );
}

export default function ContactRail() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Contact links"
      // Mobile: pin to the top-right corner. Desktop/tablet: keep the existing
      // vertically-centered rail on the right side.
      className="fixed right-4 top-4 z-40 md:right-6 md:top-1/2 md:-translate-y-1/2 lg:right-8"
    >
      {/* ==== Phone: collapsible circle (a single tapped circle) ==== */}
      <div className="relative flex flex-col items-end md:hidden">
        {/* Expanded menu drops down from the toggle circle */}
        <div
          className={`absolute right-0 top-full mt-2 origin-top-right transition duration-200 ${
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-50 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-1 rounded-2xl border border-accent/20 bg-cream/80 p-2 shadow-lg backdrop-blur-sm">
            {contactItems.map((item) => (
              <li key={item.label}>
                <RailLink item={item} />
              </li>
            ))}
          </ul>
        </div>

        {/* The single circular toggle — occupies the space of one icon */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close contact links" : "Open contact links"}
          aria-expanded={open}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-cream/80 text-ink/70 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {/* Small downward chevron: hints this opens a dropdown */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-cream p-0.5 shadow-sm"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* ==== Desktop / tablet: vertical rail (unchanged) ==== */}
      <ul className="hidden flex-col items-center gap-1 rounded-full border border-accent/20 bg-cream/80 p-1.5 shadow-sm backdrop-blur-sm md:flex md:gap-2 md:rounded-2xl md:p-2.5">
        {contactItems.map((item) => (
          <li key={item.label}>
            <RailLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}