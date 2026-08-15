"use client";

import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiThreedotjs,
  SiGreensock,
  SiVite,
  SiStreamlit,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiLangchain,
} from "react-icons/si";

// Maps the icon-name strings stored in `hoorigpt.json` (`technologyGroups`) to
// real brand icons from react-icons/simple-icons. Everything renders in gray
// (currentColor) so the HooriGPT interface stays calm and grayscale.
const ICON_MAP: Record<string, IconType> = {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiThreedotjs,
  SiGreensock,
  SiVite,
  SiStreamlit,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiLangchain,
};

/** Renders a brand icon by name, or nothing when the icon is unknown/null. */
export default function TechIcon({
  name,
  size = 14,
}: {
  name: string | null;
  size?: number;
}) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} aria-hidden />;
}