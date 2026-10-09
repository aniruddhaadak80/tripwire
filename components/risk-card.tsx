import Link from "next/link";
import { ArrowUpRight, CircleCheck, Radar as RadarIcon, TriangleAlert } from "lucide-react";
import { getDomain } from "@/data/domains";
import { band, bandColor, bandLabel, exposure, statusColor, trendColor, trendGlyph } from "@/lib/scoring";
import type { RiskSummary } from "@/lib/views";
import { Meter } from "./charts";
import { DomainGlyph } from "./domain-icon";

function MiniMeter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[62px] shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-700">
        {label}
      </span>
      <span className="w-6 shrink-0 text-right font-mono text-[10px] text-ink-500">{value}</span>
      <span className="w-full max-w-[70px]">
        <Meter value={value} color={color} height={3} />
      </span>
    </div>
  );
}

export function RiskCard({ risk, size = "md" }: { risk: RiskSummary; size?: "md" | "lg" | "sm" }) {
  const domain = getDomain(risk.domain);
  const score = exposure(risk);
  const b = band(score);
  const color = bandColor[b];
  const worst = risk.leadSignal;

  return (
    <Link
      href={`/risk/${risk.slug}`}
      className="plate group block h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong active:scale-[0.995]"
    >
      <div
        className="plate-core relative flex h-full flex-col p-5 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.035] md:p-6"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100"
          style={{ background: domain.glow }}
        />

        <div className="relative flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline"
              style={{ color: domain.accent, background: `${domain.accent}12` }}
            >
              <DomainGlyph id={risk.domain} className="size-3.5" />
            </span>
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
              {domain.name}
            </span>
          </div>
          <span
            className="chip shrink-0"
            style={{ color, borderColor: `${color}33`, background: `${color}10` }}
          >
            {risk.tag}
          </span>
        </div>

        <h3
          className={`relative mt-5 font-light tracking-tight text-ink-100 text-balance ${
            size === "lg" ? "text-2xl md:text-[28px]" : size === "sm" ? "text-[17px]" : "text-xl"
          }`}
        >
          {risk.title}
        </h3>

        <p
          className={`relative mt-3 text-[13.5px] leading-relaxed text-ink-500 ${
            size === "lg" ? "line-clamp-4" : "line-clamp-3"
          }`}
        >
          {risk.summary}
        </p>

        <div className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <MiniMeter label="Likely" value={risk.likelihood} color="#f43f5e" />
          <MiniMeter label="Severe" value={risk.severity} color="#fb923c" />
          <MiniMeter label="Speed" value={risk.speed} color="#fbbf24" />
          <MiniMeter label="Defence" value={risk.defence} color="#34d399" />
        </div>

        {size !== "sm" && worst ? (
          <div className="relative mt-6 rounded-2xl border border-hairline bg-black/25 p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                <RadarIcon className="size-3" strokeWidth={1.5} />
                Lead signal
              </span>
              <span
                className="chip"
                style={{
                  color: statusColor[worst.status],
                  borderColor: `${statusColor[worst.status]}33`,
                }}
              >
                {worst.status}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-[12.5px] leading-snug text-ink-300">{worst.label}</p>
            <p className="mt-1.5 font-mono text-[10px] text-ink-700">{worst.reading}</p>
          </div>
        ) : null}

        <div className="relative mt-auto flex items-end justify-between gap-3 pt-6">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
            <span className="inline-flex items-center gap-1">
              <TriangleAlert className="size-3" strokeWidth={1.5} />
              {risk.signalCount} signals
            </span>
            <span className="inline-flex items-center gap-1">
              <CircleCheck className="size-3" strokeWidth={1.5} />
              {risk.youCount} for you
            </span>
            <span style={{ color: trendColor[risk.trend] }}>{trendGlyph[risk.trend]}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-mono text-2xl leading-none" style={{ color }}>
                {score}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                {bandLabel[b]}
              </div>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-hairline transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.09]">
              <ArrowUpRight
                className="size-3.5 text-ink-300 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Dense row used in sidebars and "watch now" lists. */
export function RiskRow({ risk, note }: { risk: RiskSummary; note?: string }) {
  const domain = getDomain(risk.domain);
  const score = exposure(risk);
  const color = bandColor[band(score)];

  return (
    <Link
      href={`/risk/${risk.slug}`}
      className="group flex items-center gap-4 border-b border-hairline py-4 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-b-0 hover:bg-white/[0.025]"
    >
      <span
        className="size-1.5 shrink-0 rounded-full"
        style={{ background: domain.accent, boxShadow: `0 0 10px ${domain.accent}80` }}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.5px] text-ink-100 transition-colors duration-500 group-hover:text-white">
          {risk.title}
        </span>
        <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
          {domain.name}
          {note ? ` · ${note}` : ""}
        </span>
      </span>
      <span className="shrink-0 font-mono text-sm" style={{ color }}>
        {score}
      </span>
      <ArrowUpRight
        className="size-3.5 shrink-0 text-ink-700 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-300"
        strokeWidth={1.5}
      />
    </Link>
  );
}