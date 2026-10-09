import type { Metadata } from "next";
import { SignalsBoard } from "@/components/signals-board";
import { risks } from "@/data";
import { toSignalRows } from "@/lib/views";

const rows = toSignalRows(risks);

export const metadata: Metadata = {
  title: "Signals board",
  description:
    "Every early-warning indicator Tripwire tracks, ordered by how loud they are: measurement, current reading, trend history and why it matters.",
  alternates: { canonical: "/signals" },
};

export default function SignalsPage() {
  const counts = { critical: 0, high: 0, elevated: 0, quiet: 0 };
  for (const { signal } of rows) counts[signal.status] += 1;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-high" />
          {rows.length} indicators · {counts.critical} critical · {counts.high} high
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Signals board
        </h1>
        <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-ink-500">
          Every failure mode in the atlas carries the indicators that move before it does. This is
          the whole board in one place, loudest first — each with its measurement method, current
          reading, and history so you can see the slope rather than guess at it.
        </p>
      </header>

      <div className="mt-14 pb-24">
        <SignalsBoard rows={rows} />
      </div>
    </div>
  );
}