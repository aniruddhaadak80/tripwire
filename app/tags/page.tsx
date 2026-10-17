import type { Metadata } from "next";
import Link from "next/link";
import { risks } from "@/data";

export const metadata: Metadata = {
  title: "Affected systems index",
  description: "Every system, sector and population the atlas tracks as affected — with entry counts.",
  alternates: { canonical: "/tags" },
};

export default function TagsPage() {
  const map = new Map<string, number>();
  for (const r of risks) {
    for (const t of r.affected) {
      const key = t.toLowerCase();
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }
  const tags = [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const max = tags[0]?.[1] ?? 1;

  return (
    <div className="mx-auto max-w-5xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Index</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          What&apos;s at <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">risk</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-ink-500">
          Every affected system, sector, and population named across {risks.length} entries — sized by how many failure modes touch it. Tap one to explore the entries that involve it.
        </p>
      </header>

      <div className="mt-14 flex flex-wrap items-baseline gap-x-7 gap-y-5 pb-24">
        {tags.map(([t, c]) => (
          <Link
            key={t}
            href={`/explorer?q=${encodeURIComponent(t)}`}
            className="inline-flex items-baseline gap-2 text-ink-300 transition-colors duration-500 hover:text-ink-100"
          >
            <span className="font-medium tracking-tight" style={{ fontSize: `${16 + (c / max) * 22}px` }}>
              {t}
            </span>
            <span className="font-mono text-[10px] text-ink-700">{c}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
