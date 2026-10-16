import type { Metadata } from "next";
import { ExplorerBoard } from "@/components/explorer-board";

export const metadata: Metadata = {
  title: "Data explorer",
  description: "Search, filter, sort and export the entire Tripwire corpus in one powerful table.",
  alternates: { canonical: "/explorer" },
};

export default function ExplorerPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Open data explorer</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Explore every <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">entry</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-ink-500">
          Filter by domain, band, trend, or search across titles, tags, affected systems and summaries. Sort by exposure, priority, likelihood, severity or speed — then copy or export the filtered view.
        </p>
      </header>

      <div className="mt-14 pb-24">
        <ExplorerBoard />
      </div>
    </div>
  );
}
