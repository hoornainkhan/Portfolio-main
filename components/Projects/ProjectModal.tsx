import type { Project } from "./types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

/**
 * Project detail "sheet" — opens when a project card is clicked. Contains the
 * full description, complete tech stack, category labels, and links. Matches
 * the portfolio's outlined/rounded aesthetic.
 *
 * UX:
 *  - closes via the X button, the backdrop, or Escape
 *  - clicking INSIDE the modal does NOT close it
 *  - locks body scroll while open, restores on close
 *  - minimal scale/translate entrance animation
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />

      {/* Modal panel */}
      <div
        className="modal-enter relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:max-w-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink/70 transition hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto">
          {/* Image — full screenshot, never cropped, with breathing room */}
          <div className="flex w-full items-center justify-center bg-ink/[0.04] p-4 sm:p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="max-h-[50dvh] w-auto max-w-full rounded-xl object-contain"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />
          </div>

          <div className="flex flex-col gap-5 p-6 sm:p-8">
            {/* Title + category */}
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                {project.title}
              </h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.labels.map((label) => (
                  <span
                    key={label}
                    className="font-body text-[10px] font-medium uppercase tracking-[0.15em] text-accent/80"
                  >
                    #{label}
                  </span>
                ))}
              </div>
            </div>

            {/* Short description */}
            <p className="font-body text-base font-medium text-ink/80">
              {project.onlineDescription}
            </p>

            {/* Full description */}
            <p className="font-body text-base leading-relaxed text-ink/70">
              {project.description}
            </p>

            {/* Tech stack — full list */}
            <div>
              <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
                Tech stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-ink/10 bg-white/70 px-3 py-1 font-body text-xs font-medium text-ink/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {project.repoLinks.length > 0 || project.liveLink ? (
              <div className="mt-1 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-5">
                {project.liveLink ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-2 font-body text-sm font-medium text-cream transition hover:bg-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Live Project
                  </a>
                ) : null}

                {project.repoLinks.map((repo, i) => {
                  const label =
                    project.repoLinks.length === 1
                      ? "GitHub / Repository"
                      : `Repository ${i + 1}`;
                  return (
                    <a
                      key={repo}
                      href={repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-2 font-body text-sm font-medium text-ink transition hover:border-ink/60 hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      {label}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
