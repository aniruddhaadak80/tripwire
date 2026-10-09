"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Copy, Download, RotateCcw, ShieldCheck } from "lucide-react";
import { Gauge, Meter } from "@/components/charts";
import { DomainGlyph } from "@/components/domain-icon";
import { getDomain } from "@/data/domains";
import { planKey, usePlan } from "@/lib/plan";
import type { DomainId, Horizon } from "@/lib/types";
import type { PlanItem } from "@/lib/views";

const HORIZONS: { id: Horizon | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "today", label: "Today" },
  { id: "quarter", label: "This quarter" },
  { id: "year", label: "This year" },
];

const impactColor: Record<string, string> = { high: "#f43f5e", medium: "#fbbf24", low: "#34d399" };
const impactWeight = { high: 3, medium: 2, low: 1 } as const;

export function PrepareBoard({ items }: { items: PlanItem[] }) {
  const { isDone, toggle, reset, plan } = usePlan();
  const [horizon, setHorizon] = useState<Horizon | "all">("all");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(
    () => items.filter((i) => (horizon === "all" ? true : i.precaution.horizon === horizon)),
    [items, horizon],
  );

  const grouped = useMemo(() => {
    const map = new Map<DomainId, PlanItem[]>();
    for (const item of filtered) {
      const list = map.get(item.domain) ?? [];
      list.push(item);
      map.set(item.domain, list);
    }
    return [...map.entries()].sort((a, b) => {
      const da = a[1].reduce(
        (s, i) => s + impactWeight[i.precaution.impact] * (isDone(planKey(i.slug, i.precaution.title)) ? 0 : 1),
        0,
      );
      const db = b[1].reduce(
        (s, i) => s + impactWeight[i.precaution.impact] * (isDone(planKey(i.slug, i.precaution.title)) ? 0 : 1),
        0,
      );
      return db - da;
    });
  }, [filtered, isDone]);

  const total = items.length;
  const done = items.filter((i) => isDone(planKey(i.slug, i.precaution.title))).length;
  const readiness = total ? Math.round((done / total) * 100) : 0;

  const exportPlan = () => {
    const lines: string[] = ["# My Tripwire plan", "", `Readiness: ${done}/${total} (${readiness}%)`, ""];
    for (const [domain, list] of grouped) {
      lines.push(`## ${getDomain(domain).name}`, "");
      for (const { slug, precaution } of list) {
        const mark = isDone(planKey(slug, precaution.title)) ? "[x]" : "[ ]";
        lines.push(`- ${mark} **${precaution.title}** — ${precaution.detail}`);
        lines.push(`  _${precaution.effort} effort · ${precaution.impact} impact${precaution.cadence ? ` · every ${precaution.cadence.toLowerCase()}` : ""}_ · /risk/${slug}`);
      }
      lines.push("");
    }
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tripwire-plan.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySummary = async () => {
    const text = `Tripwire readiness: ${done}/${total} (${readiness}%). Remaining: ${
      items.filter((i) => !isDone(planKey(i.slug, i.precaution.title)))
        .slice(0, 5)
        .map((i) => i.precaution.title)
        .join(", ") || "nothing — plan complete"
    }`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div>
      {/* Score */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="plate lg:col-span-5">
          <div className="plate-core relative flex items-center gap-6 p-6">
            <div
              className="pointer-events-none absolute -left-16 -top-20 size-56 rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.16),transparent_65%)] blur-3xl"
              aria-hidden
            />
            <Gauge
              value={readiness}
              color={readiness > 70 ? "#34d399" : readiness > 35 ? "#fbbf24" : "#f43f5e"}
              label="readiness"
              sub={`${done} of ${total}`}
            />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
                Your quarter
              </p>
              <p className="mt-3 max-w-[15rem] text-[14px] leading-relaxed text-ink-500">
                {readiness === 0
                  ? "Nothing ticked yet. Start with the highest-impact items below — most take under an hour."
                  : readiness < 40
                    ? "Good start. The expensive failures are the ones nobody rehearses, so put a date on the drills."
                    : readiness < 80
                      ? "Solid. Close the gaps, then set calendar reminders for anything with a cadence."
                      : "Strong. Re-check quarterly — dependencies drift even when you do not."}
              </p>
            </div>
          </div>
        </div>

        <div className="plate lg:col-span-7">
          <div className="plate-core flex h-full flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
                Local by design
              </p>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-500">
                Your plan lives in this browser&apos;s local storage. No account, no sync, no
                telemetry. Export it whenever you want a copy you control.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                onClick={exportPlan}
                className="group inline-flex items-center gap-2 rounded-full border border-hairline py-2 pl-4 pr-3 text-[13px] text-ink-300 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong hover:text-ink-100"
              >
                <Download className="size-3.5" strokeWidth={1.5} />
                Export .md
              </button>
              <button
                onClick={copySummary}
                className="group inline-flex items-center gap-2 rounded-full border border-hairline py-2 pl-4 pr-3 text-[13px] text-ink-300 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong hover:text-ink-100"
              >
                <Copy className="size-3.5" strokeWidth={1.5} />
                {copied ? "Copied" : "Copy summary"}
              </button>
              <button
                onClick={reset}
                className="group inline-flex items-center gap-2 rounded-full border border-hairline py-2 pl-4 pr-3 text-[13px] text-ink-500 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong hover:text-ink-300"
              >
                <RotateCcw className="size-3.5" strokeWidth={1.5} />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizon filter */}
      <div className="mt-12 flex flex-wrap items-center gap-2">
        {HORIZONS.map((h) => (
          <button
            key={h.id}
            onClick={() => setHorizon(h.id)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              horizon === h.id
                ? "border-hairline-strong bg-ink-100 text-void"
                : "border-hairline text-ink-500 hover:border-hairline-strong hover:text-ink-300"
            }`}
          >
            {h.label}
          </button>
        ))}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
          {Object.keys(plan).length} tracked
        </span>
      </div>

      {/* Groups */}
      <div className="mt-10 space-y-14">
        {grouped.map(([domainId, list], gi) => {
          const domain = getDomain(domainId);
          const d = list.filter((i) => isDone(planKey(i.slug, i.precaution.title))).length;
          return (
            <motion.section
              key={domainId}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: Math.min(gi, 4) * 0.05, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-9 items-center justify-center rounded-xl border border-hairline"
                    style={{ color: domain.accent, background: `${domain.accent}12` }}
                  >
                    <DomainGlyph id={domainId} className="size-4" />
                  </span>
                  <div>
                    <h2 className="text-lg font-light tracking-tight text-ink-100">{domain.name}</h2>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                      {d}/{list.length} done
                    </p>
                  </div>
                </div>
                <div className="w-full max-w-[180px]">
                  <Meter
                    value={list.length ? (d / list.length) * 100 : 0}
                    color={domain.accent}
                    height={3}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {list.map(({ slug, precaution }) => {
                  const key = planKey(slug, precaution.title);
                  const checked = isDone(key);
                  return (
                    <div
                      key={key}
                      className={`plate transition-opacity duration-500 ${checked ? "opacity-55" : ""}`}
                    >
                      <div
                        className={`plate-core flex items-start gap-4 p-5 transition-colors duration-500 ${
                          checked ? "bg-signal-low/[0.04]" : ""
                        }`}
                      >
                        <button
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggle(key)}
                          className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-90 ${
                            checked
                              ? "border-signal-low bg-signal-low/15 text-signal-low"
                              : "border-hairline-strong text-transparent hover:border-ink-500"
                          }`}
                        >
                          <Check className="size-3.5" strokeWidth={2} />
                        </button>

                        <div className="min-w-0 flex-1">
                          <h3
                            className={`text-[15px] leading-snug ${
                              checked ? "text-ink-500 line-through decoration-ink-700" : "text-ink-100"
                            }`}
                          >
                            {precaution.title}
                          </h3>
                          <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                            {precaution.detail}
                          </p>
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span
                              className="chip"
                              style={{
                                color: impactColor[precaution.impact],
                                borderColor: `${impactColor[precaution.impact]}33`,
                              }}
                            >
                              {precaution.impact} impact
                            </span>
                            <span className="chip">{precaution.effort} effort</span>
                            {precaution.cadence ? (
                              <span className="chip">every {precaution.cadence.toLowerCase()}</span>
                            ) : null}
                            <Link
                              href={`/risk/${slug}`}
                              className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 transition-colors duration-500 hover:text-ink-300"
                            >
                              context ↗
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </div>

      <div className="mt-20 flex items-start gap-4 rounded-[1.75rem] border border-hairline bg-white/[0.02] p-6">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-ink-700" strokeWidth={1.25} />
        <p className="text-[13.5px] leading-relaxed text-ink-500">
          This is a prioritisation tool, not professional advice. For health, legal, financial or
          structural work, talk to someone qualified — the point of the checklist is that you know
          exactly which questions to ask them.
        </p>
      </div>
    </div>
  );
}