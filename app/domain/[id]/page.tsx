import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Meter } from "@/components/charts";
import { DomainGlyph } from "@/components/domain-icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { RiskRow } from "@/components/risk-card";
import { domains } from "@/data/domains";
import { allSignals, risks } from "@/data";
import { actionPriority, average, exposure, rank } from "@/lib/scoring";
import { toSummary } from "@/lib/views";

export function generateStaticParams() {
  return domains.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const domain = domains.find((d) => d.id === id);
  if (!domain) return { title: "Not found" };
  return {
    title: domain.name,
    description: domain.blurb,
    alternates: { canonical: `/domain/${domain.id}` },
    openGraph: { title: `${domain.name} · Tripwire`, description: domain.blurb },
  };
}

export default async function DomainPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const domain = domains.find((d) => d.id === id);
  if (!domain) notFound();

  const items = risks.filter((r) => r.domain === id);
  const ranked = rank(items, "exposure");
  const mean = Math.round(items.reduce((s, r) => s + exposure(r), 0) / Math.max(1, items.length));
  const loudSignals = allSignals
    .filter((s) => s.risk.domain === id)
    .sort((a, b) => ({ quiet: 0, elevated: 1, high: 2, critical: 3 })[b.signal.status] - ({ quiet: 0, elevated: 1, high: 2, critical: 3 })[a.signal.status])
    .slice(0, 4);
  const advancing = items
    .flatMap((r) => r.advancements)
    .filter((a) => a.status === "scaling" || a.status === "promising")
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <Link
        href="/atlas"
        className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700 transition-colors duration-500 hover:text-ink-300"
      >
        <ArrowLeft className="size-3 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.5} />
        back to the atlas
      </Link>

      {/* Header */}
      <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: domain.accent, borderColor: `${domain.accent}33`, background: `${domain.accent}12` }}
          >
            <DomainGlyph id={domain.id} className="size-3.5" />
            {items.length} entries
          </span>
          <h1 className="mt-6 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
            {domain.name}
          </h1>
          <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.2em] text-ink-500">
            {domain.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-ink-300">{domain.blurb}</p>
        </div>

        <div className="plate md:col-span-4">
          <div className="plate-core p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">Domain exposure</p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-mono text-5xl" style={{ color: domain.accent }}>
                {mean}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
                mean of {items.length}
              </span>
            </div>
            <div className="mt-4">
              <Meter value={mean} color={domain.accent} height={4} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-hairline pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700">
              <span>likelihood {average(items, "likelihood")}</span>
              <span>severity {average(items, "severity")}</span>
              <span>defence {average(items, "defence")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Entries */}
      <section className="mt-20 border-t border-hairline pt-16">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-light tracking-tight text-ink-100">Entries</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
              ranked by exposure
            </span>
          </div>
        </Reveal>
        <div className="mt-8">
          {ranked.map((r, i) => (
            <RevealItem key={r.slug} delay={i * 0.03}>
              <RiskRow risk={toSummary(r)} note={`priority ${actionPriority(r)}`} />
            </RevealItem>
          ))}
        </div>
      </section>

      {/* Loudest signals + advances */}
      <div className="mt-20 grid gap-12 border-t border-hairline pt-16 md:grid-cols-12">
        <section className="md:col-span-7">
          <span className="eyebrow">
            <span className="size-1 rounded-full bg-signal-high" />
            Loudest signals in this domain
          </span>
          <div className="mt-8">
            {loudSignals.map(({ risk, signal }) => (
              <Link
                key={signal.id}
                href={`/risk/${risk.slug}`}
                className="group flex items-start gap-4 border-b border-hairline py-5 transition-colors duration-500 last:border-b-0 hover:bg-white/[0.025]"
              >
                <span
                  className="mt-1.5 size-2 shrink-0 rounded-full"
                  style={{
                    background: { quiet: "#34d399", elevated: "#fbbf24", high: "#fb923c", critical: "#f43f5e" }[signal.status],
                    boxShadow: `0 0 10px ${{ quiet: "#34d399", elevated: "#fbbf24", high: "#fb923c", critical: "#f43f5e" }[signal.status]}`,
                  }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] leading-snug text-ink-100">{signal.label}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                    {signal.cadence} · {signal.reading}
                  </span>
                </span>
                <ArrowUpRight className="mt-1 size-3.5 shrink-0 text-ink-700 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-300" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </section>

        <section className="md:col-span-5">
          <span className="eyebrow">
            <span className="size-1 rounded-full bg-signal-low" />
            What is improving
          </span>
          <ul className="mt-8 space-y-5">
            {advancing.map((a) => (
              <li key={a.title} className="border-l border-hairline pl-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[14.5px] leading-snug text-ink-100">{a.title}</h3>
                  <span className="shrink-0 font-mono text-[11px] text-ink-500">{a.progress}%</span>
                </div>
                <div className="mt-2">
                  <Meter value={a.progress} color="#34d399" height={3} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/atlas"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 transition-colors duration-500 hover:text-ink-100"
            >
              see the full board
              <ArrowUpRight className="size-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      </div>

      {/* Other domains */}
      <section className="mt-20 border-t border-hairline pt-16">
        <span className="eyebrow">Other domains</span>
        <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {domains
            .filter((d) => d.id !== id)
            .map((d) => (
              <RevealItem key={d.id}>
                <Link
                  href={`/domain/${d.id}`}
                  className="plate group block transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
                >
                  <div className="plate-core p-4">
                    <DomainGlyph id={d.id} className="size-4" />
                    <p className="mt-3 text-[13px] leading-snug text-ink-300">{d.name}</p>
                    <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-700">
                      {risks.filter((r) => r.domain === d.id).length} entries
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
        </RevealGroup>
      </section>
    </div>
  );
}