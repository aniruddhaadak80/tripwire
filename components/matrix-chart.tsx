"use client";

import { useMemo, useState } from "react";
import { domains, getDomain } from "@/data/domains";
import { band, bandColor, type Band } from "@/lib/scoring";
import { exposure } from "@/lib/scoring";
import type { DomainId } from "@/lib/types";
import type { RiskSummary } from "@/lib/views";

export interface MatrixPoint extends RiskSummary {
  x: number;
  y: number;
}

const W = 1000;
const H = 600;
const PAD = { l: 64, r: 24, t: 24, b: 56 };
const IW = W - PAD.l - PAD.r;
const IH = H - PAD.t - PAD.b;

const px = (v: number) => PAD.l + (v / 100) * IW;
const py = (v: number) => PAD.t + (1 - v / 100) * IH;

const BANDS: Band[] = ["critical", "elevated", "watch", "monitor"];
const bandHint: Record<Band, string> = {
  critical: "Critical — high likelihood, high severity",
  elevated: "Elevated — one axis is high",
  watch: "Watch — moderate on both",
  monitor: "Monitor — low on both",
};

export function MatrixChart({ points }: { points: MatrixPoint[] }) {
  const [active, setActive] = useState<DomainId[]>([]);
  const [hover, setHover] = useState<MatrixPoint | null>(null);

  const shown = useMemo(
    () => (active.length ? points.filter((p) => active.includes(p.domain)) : points),
    [points, active],
  );

  const counts = useMemo(() => {
    const c: Record<Band, number> = { critical: 0, elevated: 0, watch: 0, monitor: 0 };
    for (const p of points) c[band(exposure(p))] += 1;
    return c;
  }, [points]);

  return (
    <div>
      {/* Controls + legend */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActive([])}
          className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-500 ${
            active.length === 0
              ? "border-hairline-strong bg-ink-100 text-void"
              : "border-hairline text-ink-500 hover:text-ink-300"
          }`}
        >
          All domains
        </button>
        {domains.map((d) => {
          const on = active.includes(d.id);
          return (
            <button
              key={d.id}
              onClick={() =>
                setActive((cur) =>
                  cur.includes(d.id) ? cur.filter((x) => x !== d.id) : [...cur, d.id],
                )
              }
              className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                borderColor: on ? `${d.accent}55` : "rgba(255,255,255,0.09)",
                background: on ? `${d.accent}14` : "transparent",
                color: on ? d.accent : "var(--color-ink-500)",
              }}
            >
              <span className="size-1.5 rounded-full" style={{ background: d.accent, opacity: on ? 1 : 0.45 }} />
              {d.name}
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
          {shown.length} of {points.length} entries
        </span>
      </div>

      {/* Chart */}
      <div className="plate mt-6">
        <div className="plate-core p-2 md:p-4">
          <div className="relative">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              role="img"
              aria-label="Risk matrix: likelihood against severity for all 45 entries"
            >
              {/* quadrant tints */}
              <rect x={px(50)} y={py(100)} width={px(100) - px(50)} height={py(50) - py(100)} fill="rgba(244,63,94,0.07)" />
              <rect x={px(0)} y={py(100)} width={px(50) - px(0)} height={py(50) - py(100)} fill="rgba(251,146,60,0.05)" />
              <rect x={px(50)} y={py(50)} width={px(100) - px(50)} height={py(0) - py(50)} fill="rgba(251,191,36,0.045)" />
              <rect x={px(0)} y={py(50)} width={px(50) - px(0)} height={py(0) - py(50)} fill="rgba(52,211,153,0.05)" />

              {/* gridlines */}
              {[25, 50, 75].map((v) => (
                <g key={v}>
                  <line x1={px(v)} y1={py(100)} x2={px(v)} y2={py(0)} stroke="rgba(255,255,255,0.07)" strokeDasharray="3 5" />
                  <line x1={px(0)} y1={py(v)} x2={px(100)} y2={py(v)} stroke="rgba(255,255,255,0.07)" strokeDasharray="3 5" />
                </g>
              ))}

              {/* axes */}
              <line x1={px(0)} y1={py(0)} x2={px(100)} y2={py(0)} stroke="rgba(255,255,255,0.18)" />
              <line x1={px(0)} y1={py(100)} x2={px(0)} y2={py(0)} stroke="rgba(255,255,255,0.18)" />

              {/* axis labels */}
              {[0, 25, 50, 75, 100].map((v) => (
                <text key={v} x={px(v)} y={py(0) + 24} textAnchor="middle" className="fill-[#55555f] font-mono" fontSize="11">
                  {v}
                </text>
              ))}
              {[0, 25, 50, 75, 100].map((v) => (
                <text key={v} x={px(0) - 12} y={py(v) + 4} textAnchor="end" className="fill-[#55555f] font-mono" fontSize="11">
                  {v}
                </text>
              ))}
              <text x={px(50)} y={H - 8} textAnchor="middle" className="fill-[#8b8b98] font-mono" fontSize="12" letterSpacing="3">
                LIKELIHOOD →
              </text>
              <text x={16} y={py(50)} textAnchor="middle" className="fill-[#8b8b98] font-mono" fontSize="12" letterSpacing="3" transform={`rotate(-90 16 ${py(50)})`}>
                SEVERITY →
              </text>

              {/* quadrant labels */}
              <text x={px(75)} y={py(96)} textAnchor="middle" fontSize="11" letterSpacing="2" className="fill-[#f43f5e]/70 font-mono">CRITICAL</text>
              <text x={px(25)} y={py(96)} textAnchor="middle" fontSize="11" letterSpacing="2" className="fill-[#fb923c]/60 font-mono">SEVERE</text>
              <text x={px(75)} y={py(14)} textAnchor="middle" fontSize="11" letterSpacing="2" className="fill-[#fbbf24]/60 font-mono">LIKELY</text>
              <text x={px(25)} y={py(14)} textAnchor="middle" fontSize="11" letterSpacing="2" className="fill-[#34d399]/60 font-mono">MONITOR</text>

              {/* points */}
              {shown.map((p) => {
                const r = 6 + (p.speed / 100) * 9;
                const c = bandColor[band(exposure(p))];
                const isHover = hover?.slug === p.slug;
                return (
                  <g key={p.slug}>
                    <circle
                      cx={px(p.x)}
                      cy={py(p.y)}
                      r={isHover ? r + 4 : r}
                      fill={c}
                      fillOpacity={isHover ? 0.9 : 0.55}
                      stroke={c}
                      strokeWidth={isHover ? 2 : 1}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHover(p)}
                      onMouseLeave={() => setHover(null)}
                    >
                      <title>{`${p.title} — L${p.x} S${p.y} · ${band(exposure(p))}`}</title>
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* tooltip */}
            {hover ? (
              <div
                className="pointer-events-none absolute z-10 w-64 rounded-2xl border border-hairline bg-black/85 p-4 backdrop-blur-xl"
                style={{
                  left: `${(px(hover.x) / W) * 100}%`,
                  top: `${(py(hover.y) / H) * 100}%`,
                  transform: `translate(${hover.x > 60 ? "-110%" : "10%"}, ${hover.y > 60 ? "-110%" : "10%"})`,
                }}
              >
                <p className="text-[13px] leading-snug text-ink-100">{hover.title}</p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                  {getDomain(hover.domain).name}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="chip" style={{ color: bandColor[band(exposure(hover))] }}>
                    {band(exposure(hover))}
                  </span>
                  <span className="font-mono text-[11px] text-ink-500">
                    L{hover.likelihood} · S{hover.severity} · V{hover.speed} · D{hover.defence}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BANDS.map((b) => (
          <div key={b} className="rounded-2xl border border-hairline bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: bandColor[b], boxShadow: `0 0 10px ${bandColor[b]}` }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: bandColor[b] }}>
                {b}
              </span>
              <span className="ml-auto font-mono text-[11px] text-ink-500">{counts[b]}</span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-ink-500">{bandHint[b]}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink-700">
        bubble size = speed · hover for the four scores · click a bubble to open the entry
      </p>
    </div>
  );
}