import type { Metadata } from "next";
import { TimelineBoard } from "@/components/timeline-board";
import { allEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Global timeline",
  description:
    "Every dated event across the atlas — 267 moments from 2015 to today, from the first AMOC fingerprints to the newest capability jumps — in one chronological stream.",
  alternates: { canonical: "/timeline" },
};

export default function TimelinePage() {
  const years = [...new Set(allEvents.map((e) => e.year))].sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-guard" />
          {allEvents.length} events · {years.length} years
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Everything that got us <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-guard">here</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-ink-500">
          Risk is a story told in events. This is the whole atlas&apos;s story in one chronological
          stream — every dated moment from the cited timelines, colour-coded by domain, newest
          first.
        </p>
      </header>

      <div className="mt-14 pb-24">
        <TimelineBoard />
      </div>
    </div>
  );
}