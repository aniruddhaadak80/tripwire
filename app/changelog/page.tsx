import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What changed, when — a public log of corpus and site updates.",
  alternates: { canonical: "/changelog" },
};

const entries = [
  { date: "2026-10-16", title: "Ultra-advanced expansion", notes: ["Explorer, graph, sources, changelog, tags, export-all, API playground, risk quality", "CSV/JSON feeds expanded"] },
  { date: "2026-10-14", title: "Advanced wave", notes: ["Matrix, timeline, domain pages, compare, ICS, JSON-LD, manifest", "Related risks, open-data CSV, JSON Feed"] },
  { date: "2026-10-13", title: "Initial public release", notes: ["45 risks, signals, precautions, RSS, OG, data API"] },
];

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Changelog</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          What&apos;s <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">new</span>
        </h1>
      </header>
      <div className="mt-14 pb-24 space-y-10">
        {entries.map((e) => (
          <section key={e.date}>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xl text-ink-100">{e.date}</span>
              <span className="hairline flex-1" />
            </div>
            <h2 className="mt-4 text-2xl text-ink-100">{e.title}</h2>
            <ul className="mt-3 space-y-2 pl-5">
              {e.notes.map((n) => (
                <li key={n} className="list-disc text-[14px] text-ink-500">{n}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
