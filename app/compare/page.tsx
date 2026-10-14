import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowUpRight, Plus, X } from "lucide-react";
import { Meter } from "@/components/charts";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { RiskCard } from "@/components/risk-card";
import { band, bandColor, bandLabel, exposure, rank } from "@/lib/scoring";
import { getDomain } from "@/data/domains";
import { getRisk, risks } from "@/data";
import { toSummary } from "@/lib/views";

export const metadata: Metadata = {
  title: "Compare risks",
  description:
    "Put up to three failure modes side by side: overlaid radar, score table, and the precautions that matter most for each.",
  alternates: { canonical: "/compare" },
};

const COMPARE_COLORS = ["#f43f5e", "#38bdf8", "#fbbf24"];

function CompareRadar({
  entries,
}: {
  entries: { slug: string; title: string; domain: string; likelihood: number; severity: number; speed: number; defence: number }[];
}) {
  const W = 460;
  const H = 460;
  const cx = W / 2;
  const cy = H / 2;
  const r = W / 2 - 60;
  const axes = [
    { label: "Likelihood", key: "likelihood" },
    { label: "Severity", key: "severity" },
    { label: "Speed", key: "speed" },
    { label: "Defence", key: "defence" },
  ] as const;

  const angle = (i: number) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const point = (i: number, v: number) => {
    const rad = (v / 100) * r;
    return [cx + Math.cos(angle(i)) * rad, cy + Math.sin(angle(i)) * rad] as const;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-[460px]">
      {[25, 50, 75, 100].map((ring) => (
        <polygon
          key={ring}
          points={axes.map((_, i) => point(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" />;
      })}
      {entries.map((e, ei) => {
        const color = COMPARE_COLORS[ei % COMPARE_COLORS.length];
        const pts = axes.map((a, i) => point(i, e[a.key]).join(",")).join(" ");
        return (
          <g key={e.slug}>
            <polygon points={pts} fill={`${color}22`} stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
            {axes.map((a, i) => {
              const [x, y] = point(i, e[a.key]);
              return <circle key={a.key} cx={x} cy={y} r={3} fill={color} />;
            })}
          </g>
        );
      })}
      {axes.map((a, i) => {
        const [x, y] = point(i, 128);
        return (
          <text key={a.key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" letterSpacing="1.5" className="fill-[#8b8b98] font-mono">
            {a.label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

export default function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ slugs?: string }>;
}) {
  return (
    <Suspense fallback={<div className="h-[60vh]" />}>
      <CompareContent searchParams={searchParams} />
    </Suspense>
  );
}

async function CompareContent({
  searchParams,
}: {
  searchParams: Promise<{ slugs?: string }>;
}) {
  const { slugs } = await searchParams;
  const wanted = (slugs ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
  const entries = wanted.map((s) => getRisk(s)).filter((r): r is NonNullable<typeof r> => Boolean(r));

  if (entries.length < 2) notFound();

  const pool = entries.length < 3 ? rank(risks.filter((r) => !entries.some((e) => e.slug === r.slug)), "exposure").slice(0, 6) : [];

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <Link
        href="/atlas"
        className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700 transition-colors duration-500 hover:text-ink-300"
      >
        <ArrowLeft className="size-3 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.5} />
        back to the atlas
      </Link>

      <header className="mt-10 max-w-3xl">
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-high" />
          {entries.length} of 3 selected
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Compare <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">risks</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-ink-500">
          Put up to three failure modes side by side — overlaid radar, the four scores that drive everything, and the precautions that matter most for each. Add entries with the controls below.
        </p>
      </header>

      {/* Entry picker */}
      <div className="mt-12 flex flex-wrap gap-3">
        {entries.map((e) => (
          <span key={e.slug} className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] py-1.5 pl-4 pr-2 text-[13px] text-ink-100">
            {e.title}
            <Link href={`/compare?slugs=${entries.filter((x) => x.slug !== e.slug).map((x) => x.slug).join(",")}`} className="flex size-6 items-center justify-center rounded-full text-ink-700 transition-colors duration-500 hover:bg-white/[0.06] hover:text-ink-300" aria-label={`Remove ${e.title}`}>
              <X className="size-3.5" strokeWidth={1.5} />
            </Link>
          </span>
        ))}
        {entries.length < 3 ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-hairline px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
            <Plus className="size-3.5" strokeWidth={1.5} />
            add from suggestions
          </span>
        ) : null}
      </div>

      {pool.length ? (
        <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pool.map((r) => (
            <RevealItem key={r.slug}>
              <Link
                href={`/compare?slugs=${[...entries.map((e) => e.slug), r.slug].join(",")}`}
                className="plate group block transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
              >
                <div className="plate-core flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] text-ink-100">{r.title}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                      {getDomain(r.domain).name} · exposure {exposure(r)}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-ink-700 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-300" strokeWidth={1.5} />
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      ) : null}

      {/* Radar */}
      <Reveal className="mt-12">
        <div className="plate">
          <div className="plate-core p-6 md:p-8">
            <CompareRadar entries={entries} />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
              {entries.map((e, i) => (
                <span key={e.slug} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
                  <span className="size-2 rounded-full" style={{ background: COMPARE_COLORS[i % COMPARE_COLORS.length] }} />
                  {e.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Score table */}
      <Reveal className="mt-8">
        <div className="plate">
          <div className="plate-core overflow-x-auto p-2 md:p-4">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-hairline font-mono text-[9px] uppercase tracking-[0.2em] text-ink-700">
                  <th className="px-4 py-3 text-left font-medium">Axis</th>
                  {entries.map((e, i) => (
                    <th key={e.slug} className="px-4 py-3 text-left font-medium">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full" style={{ background: COMPARE_COLORS[i % COMPARE_COLORS.length] }} />
                        <span className="line-clamp-1">{e.title}</span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Likelihood", "likelihood"],
                    ["Severity", "severity"],
                    ["Speed", "speed"],
                    ["Defence", "defence"],
                  ] as const
                ).map(([label, key]) => {
                  const max = Math.max(...entries.map((e) => e[key]));
                  return (
                    <tr key={key} className="border-b border-hairline last:border-b-0">
                      <td className="px-4 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-700">{label}</td>
                      {entries.map((e, i) => (
                        <td key={e.slug} className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 font-mono text-sm" style={{ color: e[key] === max ? COMPARE_COLORS[i % COMPARE_COLORS.length] : undefined }}>
                              {e[key]}
                            </span>
                            <span className="w-full max-w-[120px]">
                              <Meter value={e[key]} color={e[key] === max ? COMPARE_COLORS[i % COMPARE_COLORS.length] : "#3f3f46"} height={3} />
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr className="border-b border-hairline">
                  <td className="px-4 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-700">Exposure</td>
                  {entries.map((e) => (
                    <td key={e.slug} className="px-4 py-4">
                      <span className="font-mono text-xl" style={{ color: bandColor[band(exposure(e))] }}>
                        {exposure(e)}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-700">Band</td>
                  {entries.map((e) => (
                    <td key={e.slug} className="px-4 py-4">
                      <span className="chip" style={{ color: bandColor[band(exposure(e))], borderColor: `${bandColor[band(exposure(e))]}33` }}>
                        {bandLabel[band(exposure(e))]}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Precautions */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {entries.map((e) => {
          const top = [...e.precautions]
            .filter((p) => p.audience === "you")
            .sort((a, b) => ({ high: 3, medium: 2, low: 1 })[b.impact] - ({ high: 3, medium: 2, low: 1 })[a.impact])
            .slice(0, 4);
          return (
            <Reveal key={e.slug}>
              <div className="plate h-full">
                <div className="plate-core flex h-full flex-col p-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-700">highest-yield actions</span>
                  <h3 className="mt-3 text-[17px] leading-snug text-ink-100">{e.title}</h3>
                  <ul className="mt-5 flex-1 space-y-4">
                    {top.map((p) => (
                      <li key={p.title} className="flex items-start gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal-low" />
                        <span>
                          <Link href={`/risk/${e.slug}`} className="text-[14px] leading-snug text-ink-100 transition-colors duration-500 hover:text-white">
                            {p.title}
                          </Link>
                          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                            {p.impact} impact · {p.effort} effort
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/risk/${e.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 transition-colors duration-500 hover:text-ink-100"
                  >
                    open the entry
                    <ArrowUpRight className="size-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* More entries */}
      <section className="mt-20 border-t border-hairline pt-16">
        <span className="eyebrow">Or start from the board</span>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rank(risks.filter((r) => !entries.some((e) => e.slug === r.slug)), "exposure")
            .slice(0, 6)
            .map((r) => (
              <RiskCard key={r.slug} risk={toSummary(r)} size="sm" />
            ))}
        </div>
      </section>
    </div>
  );
}
