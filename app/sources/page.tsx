import type { Metadata } from "next";
import Link from "next/link";
import { risks } from "@/data";

export const metadata: Metadata = {
  title: "Sources bibliography",
  description: "Every cited source across the atlas with its parent risks.",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  const items = risks.flatMap((r) =>
    r.sources.map((s) => ({ risk: r, ...s })),
  ).sort((a,b) => a.year - b.year || a.title.localeCompare(b.title));

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Bibliography</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Cited <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">sources</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-ink-500">{items.length} citations spanning {new Set(items.map(i=>i.year)).size} years.</p>
      </header>

      <div className="mt-14 pb-24 space-y-4">
        {items.map((s, i) => (
          <div key={i} className="plate">
            <div className="plate-core flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[14px] text-ink-200">{s.title}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">{s.org} · {s.year}</p>
              </div>
              <div className="flex items-center gap-2">
                {s.url && (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-hairline px-3 py-1.5 text-[11px] text-ink-300 hover:text-ink-100">Open</a>
                )}
                <Link href={`/risk/${s.risk.slug}`} className="rounded-full border border-hairline px-3 py-1.5 text-[11px] text-ink-300 hover:text-ink-100">{s.risk.title.slice(0,30)}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
