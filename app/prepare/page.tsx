import type { Metadata } from "next";
import { PrepareBoard } from "@/components/prepare-board";
import { risks } from "@/data";
import { toPlanItems } from "@/lib/views";

export const metadata: Metadata = {
  title: "Preparedness",
  description:
    "Every precaution in the atlas that a person can actually act on, pulled into one checklist with a readiness score and an export. Runs entirely in your browser.",
};

export default function PreparePage() {
  const items = toPlanItems(risks);
  const cadenced = items.filter((i) => i.precaution.cadence).length;
  const highImpact = items.filter((i) => i.precaution.impact === "high").length;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-low" />
          {items.length} actions · {highImpact} high-impact · {cadenced} recurring
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          The part that is <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-low">yours</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-ink-500">
          Every entry in the atlas carries precautions for individuals, organisations and
          policymakers. This page is the individual column, pulled out and sorted by what actually
          reduces damage. Tick as you go — the score, the cadence reminders and the export are all
          yours.
        </p>
      </header>

      <div className="mt-14 pb-24">
        <PrepareBoard items={items} />
      </div>
    </div>
  );
}