import type { AdvancementStatus, SignalStatus, Trend } from "./types";

/** Anything with the four score axes can be ranked — full `Risk` or a summary. */
export interface Scored {
  likelihood: number;
  severity: number;
  speed: number;
  defence: number;
}

/**
 * Exposure = likelihood weighted by severity, with a nudge for how fast the
 * thing can hit once it starts. Cheap to compute, hard to game, and it is the
 * number the atlas sorts by default.
 */
export function exposure(r: Scored): number {
  const base = r.likelihood * (0.62 + 0.38 * (r.severity / 100));
  const speedBump = 1 + (r.speed / 100) * 0.12;
  return Math.round(Math.min(100, base * speedBump));
}

/**
 * Action priority = exposure, discounted by how well we are already defended.
 * A catastrophic risk we have genuinely solved stops dominating the queue; an
 * overlooked moderate risk climbs. This is the number that decides what to do
 * first.
 */
export function actionPriority(r: Scored): number {
  return Math.round(exposure(r) * (1 - (r.defence / 100) * 0.7));
}

export type Band = "critical" | "elevated" | "watch" | "monitor";

export function band(score: number): Band {
  if (score >= 72) return "critical";
  if (score >= 56) return "elevated";
  if (score >= 40) return "watch";
  return "monitor";
}

export const bandLabel: Record<Band, string> = {
  critical: "Critical",
  elevated: "Elevated",
  watch: "Watch",
  monitor: "Monitor",
};

export const bandColor: Record<Band, string> = {
  critical: "#f43f5e",
  elevated: "#fb923c",
  watch: "#fbbf24",
  monitor: "#34d399",
};

export const statusColor: Record<SignalStatus, string> = {
  quiet: "#34d399",
  elevated: "#fbbf24",
  high: "#fb923c",
  critical: "#f43f5e",
};

export const statusLabel: Record<SignalStatus, string> = {
  quiet: "Quiet",
  elevated: "Elevated",
  high: "High",
  critical: "Critical",
};

export const trendColor: Record<Trend, string> = {
  rising: "#f43f5e",
  flat: "#8b8b98",
  falling: "#34d399",
};

export const trendGlyph: Record<Trend, string> = {
  rising: "Rising",
  flat: "Flat",
  falling: "Easing",
};

export const advancementColor: Record<AdvancementStatus, string> = {
  scaling: "#34d399",
  promising: "#38bdf8",
  stalled: "#fbbf24",
  regressed: "#f43f5e",
};

export const advancementLabel: Record<AdvancementStatus, string> = {
  scaling: "Scaling",
  promising: "Promising",
  stalled: "Stalled",
  regressed: "Regressed",
};

export const signalWeight: Record<SignalStatus, number> = {
  quiet: 1,
  elevated: 2,
  high: 3,
  critical: 4,
};

/** Mean of a numeric field across the atlas, rounded. */
export function average(risks: Scored[], key: "likelihood" | "severity" | "defence" | "speed"): number {
  if (!risks.length) return 0;
  return Math.round(risks.reduce((sum, r) => sum + r[key], 0) / risks.length);
}

export function pct(n: number): string {
  return `${Math.round(n)}%`;
}

/** Sort risks into a stable, meaningful order. */
export function rank<T extends Scored>(risks: T[], key: "exposure" | "priority" | "likelihood" | "severity" | "speed"): T[] {
  const fn: (r: T) => number = {
    exposure,
    priority: actionPriority,
    likelihood: (r: T) => r.likelihood,
    severity: (r: T) => r.severity,
    speed: (r: T) => r.speed,
  }[key];
  return [...risks].sort((a, b) => fn(b) - fn(a));
}