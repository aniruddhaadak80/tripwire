"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { domains, getDomain } from "@/data/domains";
import { signalWeight, statusColor, statusLabel } from "@/lib/scoring";
import type { SignalStatus } from "@/lib/types";
import type { SignalRow } from "@/lib/views";
import { Sparkline } from "./charts";

const ORDER: SignalStatus[] = ["critical", "high", "elevated", "quiet"];

export function SignalsBoard({ rows }: { rows: SignalRow[] }) {
  const [domain, setDomain] = useState<string | null>(null);
  const [status, setStatus] = useState<SignalStatus[]>([]);
  // Quiet signals are the long tail — rendered on demand, not on first paint.
  const [collapsed, setCollapsed] = useState<Record<SignalStatus, boolean>>({
    critical: false,
    high: false,
    elevated: false,
    quiet: true,
  });

  const filtered = useMemo(
    () =>
      rows
        .filter(({ domain: rowDomain }) => (domain ? rowDomain === domain : true))
        .filter(({ signal }) => (status.length ? status.includes(signal.status) : true))
        .sort((a, b) => {
          const w = signalWeight[b.signal.status] - signalWeight[a.signal.status];
          return w !== 0 ? w : b.exposure - a.exposure;
        }),
    [rows, domain, status],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { critical: 0, high: 0, elevated: 0, quiet: 0 };
    rows.forEach(({ signal }) => (c[signal.status] += 1));
    return c;
  }, [rows]);

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setDomain(null)}
            className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-500 ${
              domain === null
                ? "border-hairline-strong bg-ink-100 text-void"
                : "border-hairline text-ink-500 hover:text-ink-300"
            }`}
          >
            All domains
          </button>
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setDomain(domain === d.id ? null : d.id)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                borderColor: domain === d.id ? `${d.accent}55` : "rgba(255,255,255,0.09)",
                background: domain === d.id ? `${d.accent}14` : "transparent",
                color: domain === d.id ? d.accent : "var(--color-ink-500)",
              }}
            >
              <span className="size-1.5 rounded-full" style={{ background: d.accent, opacity: 0.5 }} />
              {d.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {ORDER.map((s) => (
            <button
              key={s}
              onClick={() => setStatus((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))}
              className="chip transition-all duration-500 hover:border-hairline-strong"
              style={{
                color: status.includes(s) ? statusColor[s] : undefined,
                borderColor: status.includes(s) ? `${statusColor[s]}55` : undefined,
                background: status.includes(s) ? `${statusColor[s]}12` : undefined,
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: statusColor[s], opacity: status.includes(s) ? 1 : 0.4 }}
              />
              {statusLabel[s]} {counts[s] ?? 0}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        {ORDER.map((s) => {
          const group = filtered.filter((r) => r.signal.status === s);
          if (!group.length) return null;
          return (
            <section key={s}>
              <div className="flex items-center gap-3 pb-4">
                <span
                  className="size-2 rounded-full"
                  style={{ background: statusColor[s], boxShadow: `0 0 12px ${statusColor[s]}` }}
                />
                <h2 className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: statusColor[s] }}>
                  {statusLabel[s]}
                </h2>
                <span className="font-mono text-[10px] text-ink-700">{group.length}</span>
                {collapsed[s] ? (
                  <button
                    onClick={() => setCollapsed((c) => ({ ...c, [s]: false }))}
                    className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 transition-colors duration-500 hover:text-ink-100"
                  >
                    show {group.length}
                  </button>
                ) : null}
              </div>

              {collapsed[s] ? null : (
                <div className="grid gap-3 lg:grid-cols-2">
                {group.map((row, i) => {
                  const { signal } = row;
                  const d = getDomain(row.domain);
                  return (
                    <motion.div
                      key={`${row.slug}-${signal.id}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.04, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <Link
                        href={`/risk/${row.slug}`}
                        className="plate group block h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
                      >
                        <div className="plate-core flex h-full flex-col p-5 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.035]">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                                {d.name} · {signal.cadence}
                              </p>
                              <h3 className="mt-2.5 text-[15.5px] leading-snug text-ink-100">{signal.label}</h3>
                            </div>
                            <Sparkline
                              data={signal.history}
                              color={statusColor[s]}
                              width={92}
                              height={34}
                            />
                          </div>

                          <p className="mt-3 font-mono text-[11px]" style={{ color: statusColor[signal.status] }}>
                            {signal.reading}
                          </p>
                          <p className="mt-4 flex-1 text-[13px] leading-relaxed text-ink-500">{signal.why}</p>

                          <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                            <span className="min-w-0 truncate font-mono text-[10px] text-ink-700">
                              {signal.indicator}
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 transition-colors duration-500 group-hover:text-ink-300">
                              {row.title}
                              <ArrowUpRight className="size-3" strokeWidth={1.5} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-sm text-ink-500">
          No signals match that filter.
        </p>
      ) : null}
    </div>
  );
}