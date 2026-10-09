"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { domains, getDomain } from "@/data/domains";
import { band, bandColor, bandLabel, exposure, rank, type Band } from "@/lib/scoring";
import type { DomainId } from "@/lib/types";
import type { RiskSummary } from "@/lib/views";
import { RiskCard } from "./risk-card";

type SortKey = "exposure" | "priority" | "likelihood" | "severity" | "speed";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "exposure", label: "Exposure" },
  { key: "priority", label: "Action priority" },
  { key: "likelihood", label: "Likelihood" },
  { key: "severity", label: "Severity" },
  { key: "speed", label: "Speed" },
];

const BANDS: Band[] = ["critical", "elevated", "watch", "monitor"];

export function AtlasBoard({ risks }: { risks: RiskSummary[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("domain") as DomainId | null;

  const [query, setQuery] = useState("");
  const [active, setActive] = useState<DomainId[]>(initial && domains.some((d) => d.id === initial) ? [initial] : []);
  const [sort, setSort] = useState<SortKey>("exposure");
  const [bandFilter, setBandFilter] = useState<Band[]>([]);

  const toggleDomain = (id: DomainId) => {
    setActive((cur) => {
      const next = cur.includes(id) ? cur.filter((d) => d !== id) : [...cur, id];
      const url = next.length === 1 ? `?domain=${next[0]}` : "";
      router.replace(url ? `/atlas${url}` : "/atlas", { scroll: false });
      return next;
    });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = risks.filter((r) => {
      if (active.length && !active.includes(r.domain)) return false;
      if (bandFilter.length && !bandFilter.includes(band(exposure(r)))) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q) ||
        r.leadSignal?.label.toLowerCase().includes(q)
      );
    });
    return rank(filtered, sort);
  }, [risks, query, active, sort, bandFilter]);

  const dirty = query.length > 0 || active.length > 0 || bandFilter.length > 0;

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-20 z-20 -mx-5 bg-void/80 px-5 py-4 backdrop-blur-xl md:-mx-8 md:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-hairline bg-white/[0.03] px-4 py-2.5 transition-colors duration-500 focus-within:border-hairline-strong">
              <Search className="size-3.5 shrink-0 text-ink-700" strokeWidth={1.5} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by risk, indicator, mitigation or affected group…"
                className="w-full bg-transparent text-[14px] text-ink-100 placeholder:text-ink-700 focus:outline-none"
              />
              {query ? (
                <button onClick={() => setQuery("")} className="text-ink-700 hover:text-ink-300">
                  <X className="size-3.5" strokeWidth={1.5} />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-700">
                Sort
              </span>
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSort(s.key)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    sort === s.key
                      ? "border-hairline-strong bg-ink-100 text-void"
                      : "border-hairline text-ink-500 hover:border-hairline-strong hover:text-ink-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {domains.map((d) => {
                const on = active.includes(d.id);
                return (
                  <button
                    key={d.id}
                    onClick={() => toggleDomain(d.id)}
                    className="group inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{
                      borderColor: on ? `${d.accent}55` : "rgba(255,255,255,0.09)",
                      background: on ? `${d.accent}14` : "transparent",
                      color: on ? d.accent : "var(--color-ink-500)",
                    }}
                  >
                    <span
                      className="size-1.5 rounded-full transition-opacity duration-500"
                      style={{ background: d.accent, opacity: on ? 1 : 0.45 }}
                    />
                    {d.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {BANDS.map((b) => {
                const on = bandFilter.includes(b);
                return (
                  <button
                    key={b}
                    onClick={() =>
                      setBandFilter((cur) => (cur.includes(b) ? cur.filter((x) => x !== b) : [...cur, b]))
                    }
                    className="chip transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
                    style={{
                      color: on ? bandColor[b] : undefined,
                      borderColor: on ? `${bandColor[b]}55` : undefined,
                      background: on ? `${bandColor[b]}12` : undefined,
                    }}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: bandColor[b], opacity: on ? 1 : 0.4 }}
                    />
                    {bandLabel[b]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-4 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
          {results.length} of {risks.length} entries
          {active.length ? ` · ${active.map((d) => getDomain(d).name).join(", ")}` : ""}
        </p>
        {dirty ? (
          <button
            onClick={() => {
              setQuery("");
              setActive([]);
              setBandFilter([]);
            }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700 transition-colors duration-500 hover:text-ink-300"
          >
            clear
          </button>
        ) : null}
      </div>

      <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((r, i) => (
            <motion.div
              key={r.slug}
              layout
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.55, delay: Math.min(i, 8) * 0.035, ease: [0.32, 0.72, 0, 1] }}
            >
              <RiskCard risk={r} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 ? (
        <div className="plate mt-10">
          <div className="plate-core px-6 py-20 text-center">
            <p className="text-lg font-light text-ink-300">No entries match those filters.</p>
            <p className="mt-3 text-sm text-ink-500">
              Try a broader domain, or clear the filter and start from the exposure ranking.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActive([]);
                setBandFilter([]);
              }}
              className="mt-8 rounded-full border border-hairline px-5 py-2 text-[13px] text-ink-300 transition-colors duration-500 hover:border-hairline-strong hover:text-ink-100"
            >
              Reset filters
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}