// TypeScript mirror of `public/hoorigpt.json` — the single source of truth for
// the HooriGPT experience. Do not hardcode story content elsewhere.

export interface AssistantInfo {
  name: string;
  tagline: string;
  mode: string;
  usesLLM: boolean;
  usesExternalAPI: boolean;
}

export interface Technology {
  name: string;
  icon: string | null;
}

export type TechnologyGroups = Record<string, Technology[]>;

export interface TopicAction {
  type: "link" | "contactRail";
  label?: string;
  href?: string;
  target?: string;
}

export interface Topic {
  id: string;
  label: string;
  question: string;
  response: string;
  followUpTopics: string[];
  action?: TopicAction;
  technologyGroup?: string;
}

export interface HooriGPTData {
  assistant: AssistantInfo;
  initialTopics: string[];
  topics: Record<string, Topic>;
  technologyGroups: TechnologyGroups;
}

export interface Message {
  kind: "user" | "assistant";
  text: string;
  action?: TopicAction;
  technologyGroup?: string;
}

/** A snapshot of one point in the branching story. */
export interface Snapshot {
  messages: Message[];
  availableTopics: string[];
}