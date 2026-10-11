"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { FlaskConical } from "lucide-react";
import { Meter, Radar } from "./charts";
import {
  actionPriority,
  band,
  bandColor,
  bandLabel,
  exposure,
  type Scored,
} from "@/lib/scoring";
import type { Risk } from "@/lib/types";

const AXES: { key: keyof Scored; label: string; hint: string }[] = [
  { key: "likelihood", label: "Likelihood", hint: "chance it bites in ~10 yrs" },
  { key: "severity", label: "Severity", hint: "worst-case damage" },
  { key: "speed", label: "Speed", hint: "how fast it hits" },
  { key: "defence", label: "Defence", hint: "how well we are doing" },
];

function Delta({ from, to }: { from: number; to: number }) {
  const diff = to - from;
  if (diff === 0) return <span className="font-mono text-[10px] text-ink-700">±0</span>;
  const up = diff > 0;
  return (
    <span
      className="font-mono text-[10px]"
      style={{ color: up ? "#f43f5e" : "#34d399" }}
    >
      {up ? "▲" : "▼"} {Math.abs(diff)}
    </span>
  );
}

/**
 * Counterfactual editor: drag any of the four editorial scores and watch
 * exposure, action priority, band and the radar shape update live.
 */
export function ScoreLab({ risk }: { risk: Risk }) {
  const [scores, setScores] = useState<Scored>({
    likelihood: risk.likelihood,
    severity: risk.severity,
    speed: risk.speed,
    defence: risk.defence,
  });

  const changed = AXES.some((a) => scores[a.key] !== risk[a.key]);
  const currentExposure = exposure(risk);
  const currentPriority = actionPriority(risk);
  const nextExposure = exposure(scores);
  const nextPriority = actionPriority(scores);
  const nextBand = band(nextExposure);
  const nextColor = bandColor[nextBand];

  return (
    <div className="plate">
      <div className="plate-core p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl border border-hairline text-signal-guard">
              <FlaskConical className="size-4" strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="text-[16px] font-normal text-ink-100">What would change this score</h3>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
                counterfactual editor · drag the axes
              </p>
            </div>
          </div>
          {changed ? (
            <button
              onClick={() =>
                setScores({
                  likelihood: risk.likelihood,
                  severity: risk.severity,
                  speed: risk.speed,
                  defence: risk.defence,
                })
              }
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700 transition-colors duration-500 hover:text-ink-300"
            >
              reset
            </button>
          ) : null}
        </div>

        <div className="mt-7 grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div className="space-y-6">
              {AXES.map((a) => {
                const v = scores[a.key];
                const orig = risk[a.key];
                return (
                  <div key={a.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[13.5px] text-ink-100">{a.label}</span>
                        <span className="font-mono text-[10px] text-ink-700">{a.hint}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Delta from={orig} to={v} />
                        <span className="w-8 text-right font-mono text-sm text-ink-100">{v}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={v}
                        onChange={(e) =>
                          setScores((s) => ({ ...s, [a.key]: Number(e.target.value) }))
                        }
                        className="score-range w-full"
                        aria-label={a.label}
                      />
                      <span className="hidden w-10 text-right font-mono text-[10px] text-ink-700 sm:block">
                        now {orig}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="flex justify-center">
              <Radar
                size={220}
                color={nextColor}
                showValues={false}
                axes={AXES.map((a) => ({ label: a.label, value: scores[a.key] }))}
              />
            </div>

            <div className="mt-5 space-y-3 border-t border-hairline pt-5">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                    exposure
                  </span>
                  <div className="flex items-center gap-2">
                    <Delta from={currentExposure} to={nextExposure} />
                    <span className="font-mono text-lg" style={{ color: nextColor }}>
                      {nextExposure}
                    </span>
                  </div>
                </div>
                <div className="mt-1.5">
                  <Meter value={nextExposure} color={nextColor} height={3} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                    action priority
                  </span>
                  <div className="flex items-center gap-2">
                    <Delta from={currentPriority} to={nextPriority} />
                    <span className="font-mono text-lg" style={{ color: "#fbbf24" }}>
                      {nextPriority}
                    </span>
                  </div>
                </div>
                <div className="mt-1.5">
                  <Meter value={nextPriority} color="#fbbf24" height={3} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                  band
                </span>
                <motion.span
                  key={nextBand}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chip"
                  style={{
                    color: nextColor,
                    borderColor: `${nextColor}44`,
                    background: `${nextColor}12`,
                  }}
                >
                  {bandLabel[nextBand]}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-7 border-t border-hairline pt-5 text-[12.5px] leading-relaxed text-ink-700">
          Scores are editorial judgements, not measurements — this tool exists to make the judgement
          inspectable. If you can defend a different number, that is a content correction.
        </p>
      </div>
    </div>
  );
}