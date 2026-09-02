/**
 * Project — shape of each object in /public/projects.json.
 * This is the SINGLE SOURCE OF TRUTH for the /projects page. Do not hardcode
 * project data inside components.
 */
export interface Project {
  id: number;
  title: string;
  onlineDescription: string;
  description: string;
  labels: string[];
  repoLinks: string[];
  liveLink: string | null;
  image: string;
  techStack: string[];
}

/** A filter key: the reserved "All" or any project label. */
export type ProjectFilterKey = "All" | string;