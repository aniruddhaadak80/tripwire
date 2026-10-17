import type { Metadata } from "next";
import { GraphBoard } from "@/components/graph-board";

export const metadata: Metadata = {
  title: "Risk graph",
  description: "An interactive node-link view of how risks connect by shared affected systems and tags.",
  alternates: { canonical: "/graph" },
};

export default function GraphPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Network view</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          How risks <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">connect</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-ink-500">
          Nodes are risks, edges connect risks that share affected systems. Thicker edges = stronger overlap. Use the domain filter to untangle clusters.
        </p>
      </header>
      <div className="mt-14 pb-24 h-[70vh]">
        <GraphBoard />
      </div>
    </div>
  );
}
