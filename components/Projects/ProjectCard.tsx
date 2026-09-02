import type { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

/**
 * A compact, image-first project tile.
 *
 * The card is a <button> so it is keyboard accessible (Tab + Enter/Space open
 * the modal). The project screenshot is the visual focus and is ALWAYS fully
 * visible (object-contain — never cropped). Only the title and a one-line
 * truncated description sit beneath it; everything else lives in the modal.
 */
export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/25 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {/* Image — full screenshot, never cropped */}
      <div className="relative w-full overflow-hidden bg-ink/[0.04]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          onError={(e) => {
            // Graceful fallback if the image is missing — never crash the page.
            e.currentTarget.style.visibility = "hidden";
          }}
        />
      </div>

      {/* Title + one-line description */}
      <div className="flex flex-col gap-1 px-4 py-3">
        <h3 className="font-display text-base font-semibold leading-tight text-ink">
          {project.title}
        </h3>
        <p className="truncate font-body text-sm text-ink/60">
          {project.onlineDescription}
        </p>
      </div>
    </button>
  );
}