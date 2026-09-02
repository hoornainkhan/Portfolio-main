"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Project, ProjectFilterKey } from "./types";
import ProjectFilters from "./ProjectFilters";
import ProjectGrid from "./ProjectGrid";
import ProjectModal from "./ProjectModal";
import ContactRail from "../ContactRail/ContactRail";

/**
 * ProjectsPage — the /projects route.
 *
 * Data is fetched from /public/projects.json (single source of truth). The
 * page owns:
 *  - loading / error / data states
 *  - id-ascending sort
 *  - the active filter (All or a label)
 *  - the currently-open project modal
 *  - body scroll lock + Escape handling while the modal is open
 *
 * No project data is hardcoded here.
 */

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; projects: Project[] };

export default function ProjectsPage() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [filter, setFilter] = useState<ProjectFilterKey>("All");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json() as Promise<Project[]>;
      })
      .then((projects) => {
        if (active) setState({ status: "ready", projects });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });
    return () => {
      active = false;
    };
  }, []);

  // Sort by id ascending — reordering project ids in the JSON reorders the page.
  const sortedProjects = useMemo(() => {
    if (state.status !== "ready") return [];
    return [...state.projects].sort((a, b) => a.id - b.id);
  }, [state]);

  // Filter keys: "All" + every unique label present in the data.
  const filters = useMemo<ProjectFilterKey[]>(() => {
    if (state.status !== "ready") return ["All"];
    const labels = new Set<string>();
    state.projects.forEach((p) => p.labels.forEach((l) => labels.add(l)));
    return ["All", ...Array.from(labels).sort()];
  }, [state]);

  const visibleProjects = useMemo(() => {
    if (filter === "All") return sortedProjects;
    return sortedProjects.filter((p) => p.labels.includes(filter));
  }, [filter, sortedProjects]);

  // Body scroll lock + Escape while modal is open.
  useEffect(() => {
    if (!openProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openProject]);

  const handleFilterChange = useCallback((key: ProjectFilterKey) => {
    setFilter(key);
  }, []);

  const handleOpen = useCallback((project: Project) => {
    setOpenProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setOpenProject(null);
  }, []);

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] w-full">
      <ContactRail />
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:px-10 lg:px-16">
        {/* Filter bar — the project wall is the primary focus immediately */}
        <div>
          {state.status === "ready" ? (
            <ProjectFilters
              filters={filters}
              selected={filter}
              onSelect={handleFilterChange}
            />
          ) : null}
        </div>

        {/* Content */}
        <div className="mt-8">
          {state.status === "loading" ? (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <p className="font-body text-sm uppercase tracking-[0.2em] text-ink/40">
                loading projects...
              </p>
            </div>
          ) : state.status === "error" ? (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <p className="font-display text-2xl font-semibold text-ink/60">
                Couldn&rsquo;t load the projects right now.
              </p>
              <p className="font-body text-sm text-ink/50">
                Please try again shortly.
              </p>
            </div>
          ) : (
            <ProjectGrid projects={visibleProjects} onOpen={handleOpen} />
          )}
        </div>
      </div>

      {/* Modal */}
      {openProject ? (
        <ProjectModal project={openProject} onClose={handleClose} />
      ) : null}
    </div>
  );
}