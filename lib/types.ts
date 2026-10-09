/**
 * Tripwire data model.
 *
 * Every entry in the atlas is a `Risk`: a failure mode that could plausibly go
 * wrong, described with the three things that actually matter —
 *   1. the warning signs we can measure today (`Signal`)
 *   2. what actually reduces the damage (`Precaution`)
 *   3. what is genuinely getting better (`Advancement`)
 */

export type DomainId =
  | "ai"
  | "climate"
  | "cyber"
  | "bio"
  | "nuclear"
  | "finance"
  | "info"
  | "infrastructure"
  | "space"
  | "self";

/** Direction of travel over the observation window. */
export type Trend = "rising" | "flat" | "falling";

/** Health of a single monitored indicator. */
export type SignalStatus = "quiet" | "elevated" | "high" | "critical";

/** Who a precaution is written for. */
export type Audience = "you" | "org" | "policy";

/** Cost to implement, and how much risk it actually removes. */
export type Effort = "low" | "medium" | "high";
export type Impact = "low" | "medium" | "high";

/** How urgent the precaution is. */
export type Horizon = "today" | "quarter" | "year";

/** Maturity of a mitigation / scientific advance. */
export type AdvancementStatus = "scaling" | "promising" | "stalled" | "regressed";

/** How much warning time we would get before impact. */
export type Onset = "sudden" | "gradual" | "slow";

export interface Signal {
  /** Stable id, unique within a risk. */
  id: string;
  /** What is being watched, in plain language. */
  label: string;
  /** How it is actually measured. */
  indicator: string;
  /** Current reading, with units. */
  reading: string;
  status: SignalStatus;
  trend: Trend;
  /** Recent readings, oldest → newest. Drives the sparkline. */
  history: number[];
  /** How often it updates. */
  cadence:
    | "Real-time"
    | "Daily"
    | "Weekly"
    | "Monthly"
    | "Quarterly"
    | "Seasonal"
    | "Annual";
  /** Why a normal person should care that this moved. */
  why: string;
  source: string;
  sourceUrl: string;
}

export interface Precaution {
  title: string;
  /** Concrete steps, not slogans. */
  detail: string;
  audience: Audience;
  effort: Effort;
  impact: Impact;
  horizon: Horizon;
  /** Repeat cadence for drills/reviews, e.g. "Quarterly". */
  cadence?: string;
}

export interface Advancement {
  title: string;
  detail: string;
  status: AdvancementStatus;
  /** 0–100 maturity of this mitigation. */
  progress: number;
  /** When it landed or is expected to, ISO-ish ("2026-04", "2026"). */
  date: string;
  actor?: string;
  link?: string;
}

export interface TimelineEvent {
  /** ISO-ish date. */
  date: string;
  title: string;
  detail?: string;
}

export interface Source {
  label: string;
  url: string;
  year?: number;
}

export interface Risk {
  slug: string;
  title: string;
  domain: DomainId;
  /** Short badge, e.g. "Systemic", "Fast-onset", "Under-monitored". */
  tag: string;
  /** One sentence a stranger understands. */
  summary: string;
  /** 2–4 paragraphs of substance. */
  analysis: string[];
  /** 0–100: chance this starts biting within ~10 years. */
  likelihood: number;
  /** 0–100: worst-case magnitude of damage. */
  severity: number;
  /** 0–100: how fast it can hit once it starts. */
  speed: number;
  /** 0–100: how good our current defences are (higher = better). */
  defence: number;
  /** Human-readable onset character. */
  onset: Onset;
  /** "Now" | "< 5 yrs" | "5–20 yrs" | "20+ yrs" */
  horizon: string;
  trend: Trend;
  /** Who or what gets hit first. */
  affected: string[];
  /** Track slugs of related risks. */
  related: string[];
  signals: Signal[];
  precautions: Precaution[];
  advancements: Advancement[];
  timeline: TimelineEvent[];
  sources: Source[];
  /** ISO date the entry was last revised. */
  updated: string;
}

export interface Domain {
  id: DomainId;
  name: string;
  /** One-line positioning. */
  tagline: string;
  /** 2–3 sentence description. */
  blurb: string;
  /** Accent hue used across charts and cards. */
  accent: string;
  /** Lucide icon name (imported in components/domain-icon.tsx). */
  icon: string;
  /** Background orb colour for hero washes. */
  glow: string;
}