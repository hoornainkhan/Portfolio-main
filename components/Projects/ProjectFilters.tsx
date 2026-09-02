import type { ProjectFilterKey } from "./types";

interface ProjectFiltersProps {
  /** All unique filter keys ("All" + every label present in the data). */
  filters: ProjectFilterKey[];
  selected: ProjectFilterKey;
  onSelect: (key: ProjectFilterKey) => void;
}

/**
 * Category filter bar for the project wall. Rendered as outlined pills that
 * match the portfolio's sketched/outlined aesthetic — not a generic select or
 * SaaS-style colored badges.
 */
export default function ProjectFilters({
  filters,
  selected,
  onSelect,
}: ProjectFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-2"
    >
      {filters.map((key) => {
        const isActive = key === selected;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            aria-pressed={isActive}
            className={`inline-flex items-center rounded-full border px-4 py-1.5 font-body text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 bg-white/40 text-ink/70 hover:border-ink/50 hover:text-ink"
            }`}
          >
            {key === "All" ? "All" : `#${key}`}
          </button>
        );
      })}
    </div>
  );
}