import Link from "next/link";
import { ArrowUpRight, CircleCheck, Radar as RadarIcon, Sparkles } from "lucide-react";
import { Gauge, Meter, Sparkline, Stat } from "@/components/charts";
import { SearchTrigger } from "@/components/command";
import { DomainGlyph } from "@/components/domain-icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { RiskRow } from "@/components/risk-card";
import { PillLink, SectionHeading } from "@/components/section";
import { allSignals, personalPrecautions, risks } from "@/data";
import { domains, getDomain } from "@/data/domains";
import {
  actionPriority,
  advancementColor,
  advancementLabel,
  average,
  band,
  bandColor,
  bandLabel,
  exposure,
  rank,
  signalWeight,
  statusColor,
} from "@/lib/scoring";
import { toSummary } from "@/lib/views";

const statusRank = { quiet: 0, elevated: 1, high: 2, critical: 3 } as const;

export default function HomePage() {
  const ranked = rank(risks, "exposure");
  const priority = rank(risks, "priority");
  const meanExposure = Math.round(
    risks.reduce((sum, r) => sum + exposure(r), 0) / Math.max(1, risks.length),
  );

  const domainStats = domains
    .map((d) => {
      const items = risks.filter((r) => r.domain === d.id);
      const worst = rank(items, "exposure")[0];
      const worstSignal = allSignals
        .filter((s) => s.risk.domain === d.id)
        .sort((a, b) => statusRank[b.signal.status] - statusRank[a.signal.status])[0];
      return {
        domain: d,
        items,
        mean: items.length ? Math.round(items.reduce((s, r) => s + exposure(r), 0) / items.length) : 0,
        worst,
        worstSignal,
      };
    })
    .filter((d) => d.items.length > 0)
    .sort((a, b) => b.mean - a.mean);

  const hotSignals = [...allSignals]
    .sort((a, b) => {
      const w = signalWeight[b.signal.status] - signalWeight[a.signal.status];
      return w !== 0 ? w : b.risk.severity - a.risk.severity;
    })
    .slice(0, 6);

  const advances = risks
    .flatMap((r) => r.advancements.map((a) => ({ ...a, risk: r })))
    .filter((a) => a.status === "scaling" || a.status === "promising")
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 6);

  const stalled = risks
    .flatMap((r) => r.advancements)
    .filter((a) => a.status === "stalled" || a.status === "regressed").length;

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-32 md:px-8 md:pb-32 md:pt-44">
        <div className="grid items-end gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">
                <span className="size-1 rounded-full bg-signal-critical" />
                Global risk atlas · revised 9 Oct 2026
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-8 text-balance text-[2.75rem] font-light leading-[0.98] tracking-[-0.03em] text-ink-100 sm:text-6xl lg:text-[5.25rem]">
                Everything that
                <br />
                <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">
                  could go wrong
                </span>
                , tracked in public.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-xl text-[16.5px] leading-relaxed text-ink-500">
                {risks.length} failure modes across {domains.length} domains. For each one: the
                indicators that move <em className="text-ink-300 not-italic">before</em> the damage
                does, the precautions that measurably reduce it, and the mitigations that are
                genuinely working. No doom, no complacency — just the state of the board.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <PillLink href="/atlas">Open the atlas</PillLink>
                <div className="flex items-center gap-3">
                  <Link
                    href="/prepare"
                    className="group inline-flex items-center gap-3 rounded-full border border-hairline py-2 pl-6 pr-5 text-[13.5px] text-ink-300 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong hover:text-ink-100"
                  >
                    What can I do today
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </Link>
                  <SearchTrigger />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Index cluster */}
          <Reveal delay={0.24} className="md:col-span-5">
            <div className="plate">
              <div className="plate-core p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-700">
                    Atlas exposure index
                  </span>
                  <span className="chip">mean of all entries</span>
                </div>

                <div className="mt-7 flex items-center gap-6">
                  <Gauge value={meanExposure} color={bandColor[band(meanExposure)]} label="exposure" />
                  <div className="flex-1 space-y-4">
                    {[
                      { label: "Likelihood", value: average(risks, "likelihood"), color: "#f43f5e" },
                      { label: "Severity", value: average(risks, "severity"), color: "#fb923c" },
                      { label: "Speed", value: average(risks, "speed"), color: "#fbbf24" },
                      { label: "Defence", value: average(risks, "defence"), color: "#34d399" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="flex items-baseline justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                            {m.label}
                          </span>
                          <span className="font-mono text-[11px]" style={{ color: m.color }}>
                            {m.value}
                          </span>
                        </div>
                        <div className="mt-1.5">
                          <Meter value={m.value} color={m.color} height={3} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 border-t border-hairline pt-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-700">
                    Highest exposure right now
                  </p>
                  <div className="mt-1">
                    {ranked.slice(0, 3).map((r, i) => (
                      <RiskRow key={r.slug} risk={toSummary(r)} note={`#${i + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- Stat strip */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-hairline bg-hairline md:grid-cols-4">
          {[
            { value: risks.length, caption: "Failure modes tracked" },
            { value: allSignals.length, caption: "Live warning indicators" },
            { value: personalPrecautions.length, caption: "Actions for you" },
            { value: stalled, caption: "Mitigations that have stalled" },
          ].map((s) => (
            <RevealItem key={s.caption} className="bg-void">
              <div className="px-6 py-8 md:px-8 md:py-10">
                <Stat value={s.value} caption={s.caption} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* -------------------------------------------------------- Domains */}
      <section className="mx-auto max-w-6xl px-5 py-32 md:px-8 md:py-40">
        <Reveal>
          <SectionHeading
            eyebrow="The board"
            title={
              <>
                Ten domains, ranked by how exposed we are <span className="text-ink-700">right now</span>
              </>
            }
            description="Domains are not equally urgent. This is the exposure profile across the whole atlas — click any domain to walk its entries."
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-4 md:grid-cols-6">
          {domainStats.map((d, i) => {
            const isLead = i === 0;
            return (
              <RevealItem
                key={d.domain.id}
                className={isLead ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}
              >
                <Link
                  href={`/atlas?domain=${d.domain.id}`}
                  className="plate group block h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
                >
                  <div className="plate-core relative flex h-full flex-col p-6 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.035]">
                    <div
                      className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full opacity-60 blur-3xl"
                      style={{ background: d.domain.glow }}
                    />
                    <div className="relative flex items-start justify-between">
                      <span
                        className="flex size-10 items-center justify-center rounded-2xl border border-hairline"
                        style={{ color: d.domain.accent, background: `${d.domain.accent}12` }}
                      >
                        <DomainGlyph id={d.domain.id} className="size-4.5" />
                      </span>
                      <div className="text-right">
                        <div
                          className="font-mono text-2xl leading-none"
                          style={{ color: bandColor[band(d.mean)] }}
                        >
                          {d.mean}
                        </div>
                        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                          exposure
                        </div>
                      </div>
                    </div>

                    <h3
                      className={`relative mt-7 font-light tracking-tight text-ink-100 ${
                        isLead ? "text-3xl" : "text-lg"
                      }`}
                    >
                      {d.domain.name}
                    </h3>
                    <p
                      className={`relative mt-2 text-ink-500 ${isLead ? "max-w-md text-[15px]" : "text-[13px]"}`}
                    >
                      {d.domain.tagline}
                    </p>

                    {isLead ? (
                      <p className="relative mt-5 max-w-lg text-[14.5px] leading-relaxed text-ink-300">
                        {d.domain.blurb}
                      </p>
                    ) : null}

                    {d.worstSignal ? (
                      <div className="relative mt-6 rounded-2xl border border-hairline bg-black/30 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                            <RadarIcon className="size-3" strokeWidth={1.5} />
                            lead signal
                          </span>
                          <span
                            className="chip"
                            style={{
                              color: statusColor[d.worstSignal.signal.status],
                              borderColor: `${statusColor[d.worstSignal.signal.status]}33`,
                            }}
                          >
                            {d.worstSignal.signal.status}
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-ink-300">
                          {d.worstSignal.signal.label}
                        </p>
                        <div className="mt-3 flex items-end justify-between gap-4">
                          <span className="font-mono text-[10px] text-ink-700">
                            {d.worstSignal.signal.cadence}
                          </span>
                          <Sparkline
                            data={d.worstSignal.signal.history}
                            color={statusColor[d.worstSignal.signal.status]}
                            width={110}
                            height={30}
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="relative mt-auto flex items-end justify-between pt-7">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
                        {d.items.length} {d.items.length === 1 ? "entry" : "entries"}
                        {d.worst ? ` · top: ${d.worst.title}` : ""}
                      </span>
                      <span className="flex size-8 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-hairline transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.09]">
                        <ArrowUpRight
                          className="size-3.5 text-ink-300 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* --------------------------------------------------------- Signals */}
      <section className="mx-auto max-w-6xl px-5 py-32 md:px-8 md:py-40">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <SectionHeading
              eyebrow="Watch now"
              title={
                <>
                  The indicators that are <span className="text-ink-700">already</span> moving
                </>
              }
              description="Early warnings are cheap. The expensive moment is when a signal has been red for two years and nobody wrote it down."
              action={<PillLink href="/signals" muted>Signals board</PillLink>}
            />
          </Reveal>

          <div className="md:col-span-7">
            <RevealGroup className="plate">
              <div className="plate-core divide-y divide-hairline">
                {hotSignals.map(({ risk, signal }, i) => (
                  <RevealItem key={`${risk.slug}-${signal.id}`} delay={i * 0.04}>
                    <Link
                      href={`/risk/${risk.slug}`}
                      className="group flex items-start gap-4 px-5 py-5 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.03] md:px-6"
                    >
                      <span
                        className="mt-1.5 size-2 shrink-0 rounded-full"
                        style={{
                          background: statusColor[signal.status],
                          boxShadow: `0 0 10px ${statusColor[signal.status]}`,
                        }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14.5px] leading-snug text-ink-100">{signal.label}</span>
                        <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                          {getDomain(risk.domain).name} · {signal.cadence} · {signal.reading}
                        </span>
                      </span>
                      <span className="hidden shrink-0 sm:block">
                        <Sparkline
                          data={signal.history}
                          color={statusColor[signal.status]}
                          width={96}
                          height={32}
                        />
                      </span>
                    </Link>
                  </RevealItem>
                ))}
              </div>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Priority */}
      <section className="mx-auto max-w-6xl px-5 py-32 md:px-8 md:py-40">
        <Reveal>
          <SectionHeading
            eyebrow="Start here"
            title={
              <>
                Where the leverage is <span className="text-ink-700">highest</span>
              </>
            }
            description="Exposure alone is a bad queue — it buries the risks we have already solved. Action priority discounts exposure by how well we are defended, which surfaces the gaps."
            action={<PillLink href="/method" muted>How scoring works</PillLink>}
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-4 md:grid-cols-3">
          {priority.slice(0, 3).map((r, i) => (
            <RevealItem key={r.slug} delay={i * 0.06}>
              <Link
                href={`/risk/${r.slug}`}
                className="plate group block h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
              >
                <div className="plate-core flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
                      Priority {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="chip"
                      style={{
                        color: bandColor[band(actionPriority(r))],
                        borderColor: `${bandColor[band(actionPriority(r))]}33`,
                      }}
                    >
                      {bandLabel[band(actionPriority(r))]}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-light tracking-tight text-ink-100">{r.title}</h3>
                  <p className="mt-3 line-clamp-4 text-[13.5px] leading-relaxed text-ink-500">
                    {r.summary}
                  </p>
                  <div className="mt-auto pt-7">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                        priority score
                      </span>
                      <span className="font-mono text-3xl text-ink-100">
                        {actionPriority(r)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Meter value={actionPriority(r)} color="#f43f5e" height={3} />
                    </div>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ------------------------------------------------------- Advances */}
      <section className="mx-auto max-w-6xl px-5 py-32 md:px-8 md:py-40">
        <Reveal>
          <SectionHeading
            eyebrow="Momentum"
            title={
              <>
                What is <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-low">actually improving</span>
              </>
            }
            description="Risk literacy collapses into doom-scrolling. Here is the counter-evidence: mitigations that scaled, and the ones that quietly stalled."
            action={<PillLink href="/method" muted>Scoring method</PillLink>}
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {advances.map((a, i) => (
            <RevealItem key={`${a.risk.slug}-${a.title}`} delay={(i % 3) * 0.06}>
              <Link
                href={`/risk/${a.risk.slug}`}
                className="plate group block h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
              >
                <div className="plate-core flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="chip"
                      style={{
                        color: advancementColor[a.status],
                        borderColor: `${advancementColor[a.status]}33`,
                        background: `${advancementColor[a.status]}0f`,
                      }}
                    >
                      <Sparkles className="size-3" strokeWidth={1.5} />
                      {advancementLabel[a.status]}
                    </span>
                    <span className="font-mono text-[10px] text-ink-700">{a.date}</span>
                  </div>
                  <h3 className="mt-5 text-[16px] leading-snug text-ink-100">{a.title}</h3>
                  <p className="mt-3 line-clamp-4 flex-1 text-[13px] leading-relaxed text-ink-500">
                    {a.detail}
                  </p>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                        maturity
                      </span>
                      <span className="font-mono text-[11px]" style={{ color: advancementColor[a.status] }}>
                        {a.progress}%
                      </span>
                    </div>
                    <div className="mt-2">
                      <Meter value={a.progress} color={advancementColor[a.status]} height={3} />
                    </div>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="mx-auto max-w-6xl px-5 py-32 md:px-8 md:py-40">
        <Reveal>
          <div className="plate">
            <div className="plate-core relative overflow-hidden p-8 md:p-14">
              <div className="pointer-events-none absolute -right-24 top-0 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.16),transparent_64%)] blur-3xl" />
              <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <span className="eyebrow">
                    <CircleCheck className="size-3" strokeWidth={1.5} />
                    Your quarter
                  </span>
                  <h2 className="mt-6 text-balance text-3xl font-light leading-[1.05] tracking-tight md:text-5xl">
                    Most of this atlas is out of your hands.
                    <span className="block text-ink-500">
                      {personalPrecautions.length} of the actions are not.
                    </span>
                  </h2>
                  <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-500">
                    Pull every precaution written for a person into one checklist. Tick them off,
                    keep a readiness score, export the plan. It stays in your browser — nothing is
                    uploaded, nothing is tracked.
                  </p>
                  <div className="mt-9">
                    <PillLink href="/prepare">Build my plan</PillLink>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="rounded-[1.25rem] border border-hairline bg-black/30 p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
                      Highest-yield actions
                    </p>
                    <ul className="mt-5 space-y-4">
                      {priority
                        .filter((r) => r.precautions.some((p) => p.audience === "you"))
                        .slice(0, 4)
                        .map((r) => {
                          const p = r.precautions.find((x) => x.audience === "you" && x.impact === "high");
                          if (!p) return null;
                          return (
                            <li key={r.slug} className="flex items-start gap-3">
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal-low" />
                              <span>
                                <Link
                                  href={`/risk/${r.slug}`}
                                  className="text-[14px] leading-snug text-ink-100 transition-colors duration-500 hover:text-white"
                                >
                                  {p.title}
                                </Link>
                                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                                  {getDomain(r.domain).name} · {p.effort} effort · {p.cadence ?? "one-off"}
                                </span>
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}