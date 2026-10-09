import type { Metadata } from "next";
import { Suspense } from "react";
import { AtlasBoard } from "@/components/atlas-board";
import { risks } from "@/data";
import { average, exposure } from "@/lib/scoring";
import { toSummary } from "@/lib/views";

export const metadata: Metadata = {
  title: "The atlas",
  description:
    "Every failure mode Tripwire tracks, ranked and filterable: AI loss of control, climate tipping points, ransomware, sovereign debt, pandemics, grid cascades and personal exposure.",
};

export default function AtlasPage() {
  const mean = Math.round(risks.reduce((s, r) => s + exposure(r), 0) / Math.max(1, risks.length));

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-critical" />
          {risks.length} entries · mean exposure {mean}
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          The atlas of <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">things that could go wrong</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-ink-500">
          Every entry carries the same four things: a failure mode worth tracking, measurable
          warning signs, precautions split by who has to act, and the mitigations that are actually
          moving. Default ordering is exposure — switch to action priority to find the gaps.
        </p>
        <div className="mt-9 flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
          <span>mean likelihood {average(risks, "likelihood")}</span>
          <span>mean severity {average(risks, "severity")}</span>
          <span>mean defence {average(risks, "defence")}</span>
        </div>
      </header>

      <div className="mt-14 pb-24">
        <Suspense fallback={<div className="h-[60vh]" />}>
          <AtlasBoard risks={risks.map(toSummary)} />
        </Suspense>
      </div>
    </div>
  );
}