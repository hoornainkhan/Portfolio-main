import type { Project } from "./types";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  onOpen: (project: Project) => void;
}

/**
 * The "project wall" — a clean, image-first responsive grid. Desktop uses the
 * horizontal space, tablet narrows to two columns, mobile becomes a single
 * column. Cards are compact and never crop their screenshots.
 */
export default function ProjectGrid({ projects, onOpen }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <p className="font-display text-2xl font-semibold text-ink/60">
          No projects here yet.
        </p>
        <p className="font-body text-sm text-ink/50">Try a different filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={onOpen} />
      ))}
    </div>
  );
}