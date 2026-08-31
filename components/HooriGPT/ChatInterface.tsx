"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { HooriGPTData, Snapshot, Message } from "./types";
import TechIcon from "./icons";

interface ChatInterfaceProps {
  data: HooriGPTData;
}

// Subtle, desaturated pastel accents for the topic cells (cycled by index).
const PASTELS = [
  "border-sky-200 bg-sky-50/80 text-gray-700",
  "border-emerald-200 bg-emerald-50/80 text-gray-700",
  "border-amber-200 bg-amber-50/80 text-gray-700",
  "border-rose-200 bg-rose-50/80 text-gray-700",
];

export default function ChatInterface({ data }: ChatInterfaceProps) {
  // Navigation history: only ONE active branch exists at a time. Going back
  // restores the previous snapshot (messages + available topics); choosing a
  // different branch after going back discards the old forward path.
  const [history, setHistory] = useState<Snapshot[]>(() => [
    { messages: [], availableTopics: data.initialTopics },
  ]);
  const [cursor, setCursor] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Topics the user has already explored this session (resets on refresh).
  // Hidden from the topic row so the story flows forward without repeats.
  const [visited, setVisited] = useState<Set<string>>(() => new Set());

  const snapshot = history[cursor];
  const messages = snapshot.messages;
  const available = snapshot.availableTopics;
  const visibleTopics = available.filter((id) => !visited.has(id));
  // All topics not yet explored, so nothing is missed before the ending.
  const allUnvisited = Object.keys(data.topics).filter((id) => !visited.has(id));

  // Keep the conversation pinned to the latest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  function selectTopic(id: string) {
    const topic = data.topics[id];
    if (!topic) return;
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    const current = history[cursor];
    const nextMessages: Message[] = [
      ...current.messages,
      { kind: "user", text: topic.question },
      {
        kind: "assistant",
        text: topic.response,
        action: topic.action,
        technologyGroup: topic.technologyGroup,
      },
    ];
    const nextSnapshot: Snapshot = {
      messages: nextMessages,
      availableTopics: topic.followUpTopics ?? [],
    };
    const truncated = history.slice(0, cursor + 1);
    const nextHistory = [...truncated, nextSnapshot];
    setHistory(nextHistory);
    setCursor(nextHistory.length - 1);
  }

  function goBack() {
    if (cursor > 0) setCursor(cursor - 1);
  }

  function topicCell(id: string, idx: number) {
    const topic = data.topics[id];
    if (!topic) return null;
    return (
      <button
        key={id}
        type="button"
        onClick={() => selectTopic(id)}
        className={`inline-flex shrink-0 items-center rounded-full border px-4 py-2 font-body text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 ${
          PASTELS[idx % PASTELS.length]
        }`}
      >
        {topic.label}
      </button>
    );
  }

  return (
    <div className="flex h-[380px] w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white
     shadow-sm lg:h-[420px]">
      {/* Header — centered title, back chevron top-right */}
      <div className="relative flex items-center border-b border-gray-200 px-4 py-3.5">
        <h2 className="w-full text-center font-display text-xl font-semibold tracking-tight text-gray-900">
          HooriGPT
        </h2>
        <button
          type="button"
          onClick={goBack}
          disabled={cursor === 0}
          aria-label="Go back"
          className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full  text-xl leading-none text-gray-900 transition hover:border-gray-300 hover:text-gray-500 disabled:pointer-events-none disabled:opacity-30"
        >
          ›
        </button>
      </div>

      {/* Conversation — vertically scrollable, independent region */}
      <div
        ref={scrollRef}
        className={
          messages.length === 0
            ? "flex flex-1 items-center justify-center overflow-y-auto px-5 py-6"
            : "flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6"
        }
      >
        {messages.length === 0 ? (
          <p className="max-w-md text-center font-body text-base leading-relaxed text-gray-500">
            Curious about the person behind the code? Choose a chapter below and
            let&rsquo;s start there.
          </p>
        ) : (
          messages.map((message, i) => (
            <MessageBubble key={i} message={message} data={data} />
          ))
        )}
      </div>

      {/* Topic row — fixed, one horizontal line, horizontally scrollable.
          1) Continue the current branch with its (unvisited) follow-up topics.
          2) If the branch is spent but topics remain, surface every unvisited
             topic so nothing is missed.
          3) Only when every topic has been visited do we show the ending. */}
      <div className="border-t border-gray-200 px-4 py-3.5">
        {visibleTopics.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {visibleTopics.map((id, idx) => topicCell(id, idx))}
          </div>
        ) : allUnvisited.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 font-body text-xs font-medium uppercase tracking-wide text-gray-400">
              Continue exploring
            </span>
            {allUnvisited.map((id, idx) => topicCell(id, idx))}
          </div>
        ) : (
          <p className="text-center font-body text-sm font-medium text-gray-500">
            Thanks for getting to know me. Come back anytime.
          </p>
        )}
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  data,
}: {
  message: Message;
  data: HooriGPTData;
}) {
  if (message.kind === "user") {
    return (
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs font-medium text-gray-400">You</span>
        <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-md bg-gray-900 px-4 py-2.5 text-sm leading-relaxed text-white">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-xs font-medium text-gray-400">HooriGPT</span>
      <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-gray-200 bg-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-800">
        <p className="whitespace-pre-line">{message.text}</p>

        {/* Data-driven link action (e.g. View Projects → /projects) */}
        {message.action?.type === "link" && message.action.href && (
          <Link
            href={message.action.href}
            className="mt-3 inline-flex items-center gap-1 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
          >
            {message.action.label ?? "View Projects →"}
          </Link>
        )}

        {/* Data-driven technology group chips */}
        {message.technologyGroup &&
        data.technologyGroups[message.technologyGroup] ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.technologyGroups[message.technologyGroup].map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600"
              >
                <span className="text-gray-400">
                  <TechIcon name={tech.icon} />
                </span>
                {tech.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}