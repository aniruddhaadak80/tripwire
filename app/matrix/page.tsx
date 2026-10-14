import type { Metadata } from "next";
import { MatrixChart } from "@/components/matrix-chart";
import { Reveal } from "@/components/reveal";
import { risks } from "@/data";
import { toSummary } from "@/lib/views";

export const metadata: Metadata = {
  title: "Risk matrix",
  description:
    "Every failure mode plotted on the classic likelihood–severity matrix. Bubble size is speed, colour is the exposure band, and every bubble links to its full entry.",
  alternates: { canonical: "/matrix" },
};

export default function MatrixPage() {
  const points = risks.map((r) => {
    const s = toSummary(r);
    return { ...s, x: r.likelihood, y: r.severity };
  });

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-critical" />
          The classic view · {points.length} entries
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          The risk <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">matrix</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-ink-500">
          Every failure mode on one chart. Likelihood against severity, bubble size for speed,
          colour for the band. The top-right quadrant is where the atlas concentrates its attention —
          and where the action-priority queue comes from.
        </p>
      </header>

      <div className="mt-14 pb-24">
        <Reveal>
          <MatrixChart points={points} />
        </Reveal>
      </div>
    </div>
  );
}