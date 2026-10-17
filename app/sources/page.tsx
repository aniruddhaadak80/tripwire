import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { risks } from "@/data";

export const metadata: Metadata = {
  title: "Sources bibliography",
  description: "Every cited source across the atlas, with links to its parent entries.",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  const items = risks
    .flatMap((risk) => risk.sources.map((s) => ({ risk, ...s })))
    .sort((a, b) => (a.year ?? 0) - (b.year ?? 0) || a.label.localeCompare(b.label));

  const years = [...new Set(items.map((i) => i.year).filter(Boolean))] as number[];

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Bibliography</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Cited <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">sources</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-ink-500">
          Every citation behind the atlas. {items.length} references from {years.length} distinct years — each links straight to the original publication and to the entry that rests on it.
        </p>
      </header>

      <div className="mt-14 pb-24 space-y-3">
        {items.map((s, i) => (
          <div key={`${s.url}-${i}`} className="plate">
            <div className="plate-core flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 text-[14.5px] leading-snug text-ink-200 transition-colors duration-500 hover:text-white"
                >
                  <span className="min-w-0">{s.label}</span>
                  <ArrowUpRight className="mt-1 size-3.5 shrink-0 text-ink-700 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-300" strokeWidth={1.5} />
                </a>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                  {s.year ?? "s.f."} · {new URL(s.url).hostname.replace(/^www\./, "")}
                </p>
              </div>
              <Link
                href={`/risk/${s.risk.slug}`}
                className="shrink-0 rounded-full border border-hairline px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 transition-colors duration-500 hover:border-hairline-strong hover:text-ink-200"
              >
                {s.risk.title.slice(0, 34)}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
