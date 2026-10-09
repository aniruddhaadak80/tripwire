import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { Meter, Radar, Sparkline } from "@/components/charts";
import { DomainGlyph } from "@/components/domain-icon";
import { PrecautionPanel } from "@/components/precaution-panel";
import { Reveal } from "@/components/reveal";
import { RiskRow } from "@/components/risk-card";
import { getDomain } from "@/data/domains";
import { getRisk, risks } from "@/data";
import {
  actionPriority,
  advancementColor,
  advancementLabel,
  band,
  bandColor,
  bandLabel,
  exposure,
  statusColor,
  trendColor,
  trendGlyph,
} from "@/lib/scoring";
import { toSummary } from "@/lib/views";

export function generateStaticParams() {
  return risks.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const risk = getRisk(slug);
  if (!risk) return { title: "Not found" };
  return {
    title: risk.title,
    description: risk.summary,
    alternates: { canonical: `/risk/${risk.slug}` },
    openGraph: { title: `${risk.title} · Tripwire`, description: risk.summary, url: `/risk/${risk.slug}` },
  };
}

export default async function RiskPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const risk = getRisk(slug);
  if (!risk) notFound();

  const domain = getDomain(risk.domain);
  const score = exposure(risk);
  const color = bandColor[band(score)];
  const related = risk.related
    .map((s) => risks.find((r) => r.slug === s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .slice(0, 4);

  return (
    <article className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      {/* ------------------------------------------------------- Header */}
      <Link
        href="/atlas"
        className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700 transition-colors duration-500 hover:text-ink-300"
      >
        <ArrowLeft
          className="size-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-1"
          strokeWidth={1.5}
        />
        back to the atlas
      </Link>

      <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{
                color: domain.accent,
                borderColor: `${domain.accent}33`,
                background: `${domain.accent}12`,
              }}
            >
              <DomainGlyph id={risk.domain} className="size-3.5" />
              {domain.name}
            </span>
            <span className="chip">{risk.tag}</span>
            <span className="chip">onset: {risk.onset}</span>
            <span className="chip">horizon: {risk.horizon}</span>
            <span className="chip" style={{ color: trendColor[risk.trend] }}>
              {trendGlyph[risk.trend]}
            </span>
          </div>

          <h1 className="mt-7 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] text-ink-100 md:text-[3.4rem]">
            {risk.title}
          </h1>

          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-ink-300">{risk.summary}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {risk.affected.map((a) => (
              <span key={a} className="chip">
                {a}
              </span>
            ))}
          </div>
        </div>

        <Reveal className="md:col-span-5">
          <div className="plate">
            <div className="plate-core relative p-6">
              <div
                className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full blur-3xl"
                style={{ background: domain.glow }}
              />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
                  Risk shape
                </span>
                <span className="chip" style={{ color, borderColor: `${color}33` }}>
                  {bandLabel[band(score)]}
                </span>
              </div>

              <div className="relative mt-6 flex justify-center">
                <Radar
                  size={248}
                  color={color}
                  axes={[
                    { label: "Likelihood", value: risk.likelihood },
                    { label: "Severity", value: risk.severity },
                    { label: "Speed", value: risk.speed },
                    { label: "Defence", value: risk.defence },
                  ]}
                />
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-hairline pt-5">
                {[
                  { label: "Exposure", value: score, color },
                  { label: "Action priority", value: actionPriority(risk), color: "#fbbf24" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-700">
                        {s.label}
                      </span>
                      <span className="font-mono text-sm" style={{ color: s.color }}>
                        {s.value}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <Meter value={s.value} color={s.color} height={3} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="relative mt-5 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-ink-700">
                Last revised {risk.updated} · defence score is how well we are doing today, higher
                is better
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ----------------------------------------------------- Analysis */}
      <section className="mt-24 border-t border-hairline pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">Why it matters</span>
          </div>
          <div className="space-y-6 md:col-span-8">
            {risk.analysis.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-[16px] leading-relaxed text-ink-300 md:text-[17px]">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Signals */}
      <section className="mt-24 border-t border-hairline pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">
              <span className="size-1 rounded-full bg-signal-high" />
              Warning signs
            </span>
            <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight text-ink-100">
              What moves first
            </h2>
            <p className="mt-5 text-[14px] leading-relaxed text-ink-500">
              These are the measurable signals. Track them before they matter, because afterwards
              they are just news.
            </p>
          </div>

          <div className="space-y-4 md:col-span-8">
            {risk.signals.map((signal, i) => (
              <Reveal key={signal.id} delay={i * 0.05}>
                <div className="plate">
                  <div className="plate-core p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="chip"
                            style={{
                              color: statusColor[signal.status],
                              borderColor: `${statusColor[signal.status]}33`,
                              background: `${statusColor[signal.status]}0f`,
                            }}
                          >
                            <span
                              className="size-1.5 rounded-full"
                              style={{ background: statusColor[signal.status] }}
                            />
                            {signal.status}
                          </span>
                          <span className="chip">{signal.cadence}</span>
                        </div>
                        <h3 className="mt-4 text-[16.5px] leading-snug text-ink-100">{signal.label}</h3>
                      </div>
                      <Sparkline
                        data={signal.history}
                        color={statusColor[signal.status]}
                        width={140}
                        height={44}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="mt-5 rounded-2xl border border-hairline bg-black/30 px-4 py-3">
                      <p
                        className="font-mono text-[13px]"
                        style={{ color: statusColor[signal.status] }}
                      >
                        {signal.reading}
                      </p>
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700">
                        measured by: {signal.indicator}
                      </p>
                    </div>

                    <p className="mt-4 text-[14px] leading-relaxed text-ink-500">{signal.why}</p>

                    <a
                      href={signal.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700 transition-colors duration-500 hover:text-ink-300"
                    >
                      {signal.source}
                      <ExternalLink
                        className="size-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Precautions */}
      <section className="mt-24 border-t border-hairline pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">
              <span className="size-1 rounded-full bg-signal-low" />
              Precautions
            </span>
            <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight text-ink-100">
              What actually reduces it
            </h2>
            <p className="mt-5 text-[14px] leading-relaxed text-ink-500">
              Split by who has to act. Individual items can be ticked straight into your plan — it
              stays in this browser.
            </p>
          </div>
          <div className="md:col-span-8">
            <PrecautionPanel risk={risk} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Advancements */}
      <section className="mt-24 border-t border-hairline pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">
              <Sparkles className="size-3" strokeWidth={1.5} />
              Advancements
            </span>
            <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight text-ink-100">
              What is getting better
            </h2>
            <p className="mt-5 text-[14px] leading-relaxed text-ink-500">
              Mitigations scored honestly. Stalled and regressed entries are in here on purpose —
              optimism that ignores its own evidence is just marketing.
            </p>
          </div>

          <div className="space-y-4 md:col-span-8">
            {risk.advancements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
                <div className="plate">
                  <div className="plate-core p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="chip"
                            style={{
                              color: advancementColor[a.status],
                              borderColor: `${advancementColor[a.status]}33`,
                              background: `${advancementColor[a.status]}0f`,
                            }}
                          >
                            {advancementLabel[a.status]}
                          </span>
                          <span className="chip">{a.date}</span>
                          {a.actor ? <span className="chip">{a.actor}</span> : null}
                        </div>
                        <h3 className="mt-4 text-[16.5px] leading-snug text-ink-100">{a.title}</h3>
                      </div>
                      <div className="text-right">
                        <div
                          className="font-mono text-2xl leading-none"
                          style={{ color: advancementColor[a.status] }}
                        >
                          {a.progress}
                        </div>
                        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                          maturity
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-[14px] leading-relaxed text-ink-500">{a.detail}</p>

                    <div className="mt-5">
                      <Meter value={a.progress} color={advancementColor[a.status]} height={3} />
                    </div>

                    {a.link ? (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700 transition-colors duration-500 hover:text-ink-300"
                      >
                        source
                        <ExternalLink
                          className="size-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                        />
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Timeline */}
      <section className="mt-24 border-t border-hairline pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">Timeline</span>
            <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight text-ink-100">
              How we got here
            </h2>
          </div>
          <div className="md:col-span-8">
            <ol className="relative space-y-0 border-l border-hairline pl-8">
              {risk.timeline.map((event, i) => (
                <Reveal key={`${event.date}-${i}`} delay={i * 0.04}>
                  <li className="relative pb-10 last:pb-0">
                    <span
                      className="absolute -left-[38px] top-1.5 flex size-2.5 items-center justify-center rounded-full ring-4 ring-void"
                      style={{ background: i === risk.timeline.length - 1 ? color : "#3f3f46" }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
                      {event.date}
                    </span>
                    <h4 className="mt-2 text-[16px] leading-snug text-ink-100">{event.title}</h4>
                    {event.detail ? (
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{event.detail}</p>
                    ) : null}
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Related + sources */}
      <div className="mt-24 grid gap-12 border-t border-hairline pt-16 md:grid-cols-12">
        {related.length ? (
          <div className="md:col-span-7">
            <span className="eyebrow">Connected risks</span>
            <div className="mt-6">
              {related.map((r) => (
                <RiskRow key={r.slug} risk={toSummary(r)} note={getDomain(r.domain).name} />
              ))}
            </div>
          </div>
        ) : (
          <div className="md:col-span-7" />
        )}

        <div className="md:col-span-5">
          <span className="eyebrow">Sources</span>
          <ul className="mt-6 space-y-3">
            {risk.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start justify-between gap-4 border-b border-hairline pb-3 text-[14px] text-ink-300 transition-colors duration-500 hover:text-ink-100"
                >
                  <span>
                    {s.label}
                    {s.year ? <span className="ml-2 font-mono text-[10px] text-ink-700">{s.year}</span> : null}
                  </span>
                  <ExternalLink
                    className="mt-1 size-3 shrink-0 text-ink-700 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-hairline py-10">
        <p className="max-w-xl text-[13.5px] leading-relaxed text-ink-700">
          Estimates are revised as evidence changes. If you work on this failure mode and can add a
          better indicator, the whole atlas gets sharper.
        </p>
        <Link
          href="/method"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 transition-colors duration-500 hover:text-ink-100"
        >
          how these scores are built
          <ArrowLeft className="size-3 rotate-180 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}