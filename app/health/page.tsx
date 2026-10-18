import type { Metadata } from "next";
import Link from "next/link";
import { risks, signalCount, precautionCount, advancementCount, sourceCount } from "@/data";
import { allEvents } from "@/data/events";
import { exposure } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Data health",
  description: "Corpus counts, coverage, and integrity checks for the Tripwire atlas.",
  alternates: { canonical: "/health" },
};

export default function HealthPage() {
  const exposures = risks.map((r) => exposure(r));
  const meanExp = Math.round(exposures.reduce((a, b) => a + b, 0) / risks.length);
  const minExp = Math.min(...exposures);
  const maxExp = Math.max(...exposures);

  const checks = [
    { label: "Every risk has at least one signal", ok: risks.every((r) => r.signals.length > 0) },
    { label: "Every risk has at least one precaution", ok: risks.every((r) => r.precautions.length > 0) },
    { label: "Every risk cites at least one source", ok: risks.every((r) => r.sources.length > 0) },
    { label: "Every risk has a timeline", ok: risks.every((r) => r.timeline.length > 0) },
    { label: "Every risk links a related failure mode", ok: risks.every((r) => r.related.length > 0) },
    { label: "No orphaned related links", ok: risks.every((r) => r.related.every((s) => risks.some((x) => x.slug === s))) },
    { label: "Exposure model in range", ok: exposures.every((e) => e >= 0 && e <= 100) },
  ];
  const passing = checks.filter((c) => c.ok).length;

  const stats = [
    { label: "risks", value: risks.length },
    { label: "signals", value: signalCount },
    { label: "precautions", value: precautionCount },
    { label: "advancements", value: advancementCount },
    { label: "sources", value: sourceCount },
    { label: "timeline events", value: allEvents.length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-low" />
          Data health · {passing}/{checks.length} checks passing
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Corpus <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-low">integrity</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-ink-500">
          The atlas publishes its own quality report: coverage proportions, sanity checks over the entire corpus, and the exposure distribution that the scoring model produces. If any of these checks flips, something in the data has broken before anything else can.
        </p>
      </header>

      {/* Corpus stats */}
      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="plate">
            <div className="plate-core p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-700">{s.label}</p>
              <p className="mt-3 font-mono text-3xl text-ink-100">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Integrity checks */}
      <section className="mt-10">
        <div className="plate">
          <div className="plate-core p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">sanity checks</p>
            <ul className="mt-5 divide-y divide-hairline">
              {checks.map((c) => (
                <li key={c.label} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-[14px] text-ink-300">{c.label}</span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: c.ok ? "var(--color-signal-low)" : "var(--color-signal-critical)" }}
                  >
                    {c.ok ? "pass" : "fail"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Exposure distribution */}
      <section className="mt-10">
        <div className="plate">
          <div className="plate-core p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">exposure distribution</p>
            <div className="mt-6 flex items-end gap-1" aria-hidden>
              {exposures
                .slice()
                .sort((a, b) => a - b)
                .map((e, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-t-sm bg-white/10"
                    style={{ height: `${6 + e * 0.42}px` }}
                  />
                ))}
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
              <span>min {minExp}</span>
              <span>mean {meanExp}</span>
              <span>max {maxExp}</span>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
        Validate locally with <Link href="/method" className="underline decoration-hairline underline-offset-4 transition-colors hover:text-ink-300">bun run validate</Link> · regenerate data with <span className="underline decoration-hairline underline-offset-4">bun run export:data</span>
      </p>

      <div className="pb-24" />
    </div>
  );
}
