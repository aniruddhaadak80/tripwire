"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Check, CircleDot, Clock, Gauge, Users } from "lucide-react";
import { planKey, usePlan } from "@/lib/plan";
import type { Audience, Precaution, Risk } from "@/lib/types";

const TABS: { id: Audience; label: string; hint: string }[] = [
  { id: "you", label: "For you", hint: "Individual, this quarter" },
  { id: "org", label: "For organisations", hint: "Teams, companies, operators" },
  { id: "policy", label: "For policy", hint: "Regulators, states, standards" },
];

const impactColor: Record<string, string> = { high: "#f43f5e", medium: "#fbbf24", low: "#34d399" };
const horizonLabel: Record<string, string> = {
  today: "Do today",
  quarter: "This quarter",
  year: "This year",
};

function Checkbox({ done, onToggle }: { done: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      role="checkbox"
      aria-checked={done}
      className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-90 ${
        done
          ? "border-signal-low bg-signal-low/15 text-signal-low"
          : "border-hairline-strong text-transparent hover:border-ink-500"
      }`}
    >
      <Check className="size-3.5" strokeWidth={2} />
    </button>
  );
}

export function PrecautionPanel({ risk }: { risk: Risk }) {
  const [tab, setTab] = useState<Audience>("you");
  const { isDone, toggle, count } = usePlan();

  const grouped = useMemo(() => {
    const map: Record<Audience, Precaution[]> = { you: [], org: [], policy: [] };
    for (const p of risk.precautions) map[p.audience].push(p);
    return map;
  }, [risk.precautions]);

  const youDone = grouped.you.filter((p) => isDone(planKey(risk.slug, p.title))).length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((t) => {
          const on = tab === t.id;
          const n = grouped[t.id].length;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded-full border px-4 py-2 text-[13px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                on
                  ? "border-hairline-strong bg-white/[0.07] text-ink-100"
                  : "border-hairline text-ink-500 hover:border-hairline-strong hover:text-ink-300"
              }`}
            >
              {t.label}
              <span className="ml-2 font-mono text-[10px] text-ink-700">{n}</span>
            </button>
          );
        })}

        {tab === "you" && grouped.you.length > 0 ? (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
            {youDone}/{grouped.you.length} in your plan{count > youDone ? ` · ${count} total` : ""}
          </span>
        ) : null}
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
        {TABS.find((t) => t.id === tab)?.hint}
      </p>

      <div className="mt-6 space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="space-y-3"
          >
            {grouped[tab].map((p) => {
              const key = planKey(risk.slug, p.title);
              const done = tab === "you" && isDone(key);
              return (
                <div
                  key={p.title}
                  className={`plate transition-opacity duration-500 ${done ? "opacity-55" : ""}`}
                >
                  <div
                    className={`plate-core flex items-start gap-4 p-5 transition-colors duration-500 ${done ? "bg-signal-low/[0.04]" : ""}`}
                  >
                    {tab === "you" ? (
                      <Checkbox done={done} onToggle={() => toggle(key)} />
                    ) : (
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border border-hairline text-ink-700">
                        {p.audience === "org" ? (
                          <Users className="size-3.5" strokeWidth={1.5} />
                        ) : (
                          <CircleDot className="size-3.5" strokeWidth={1.5} />
                        )}
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4
                          className={`text-[15.5px] font-normal leading-snug ${
                            done ? "text-ink-500 line-through decoration-ink-700" : "text-ink-100"
                          }`}
                        >
                          {p.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">{p.detail}</p>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span
                          className="chip"
                          style={{
                            color: impactColor[p.impact],
                            borderColor: `${impactColor[p.impact]}33`,
                          }}
                        >
                          {p.impact} impact
                        </span>
                        <span className="chip">
                          <Gauge className="size-3" strokeWidth={1.5} />
                          {p.effort} effort
                        </span>
                        <span className="chip">
                          <Clock className="size-3" strokeWidth={1.5} />
                          {horizonLabel[p.horizon]}
                        </span>
                        {p.cadence ? (
                          <span className="chip">
                            <Clock className="size-3" strokeWidth={1.5} />
                            every {p.cadence.toLowerCase()}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {grouped[tab].length === 0 ? (
              <p className="py-10 text-center text-sm text-ink-500">
                No precautions recorded for this audience yet.
              </p>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}