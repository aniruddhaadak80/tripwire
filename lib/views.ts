import type {
  DomainId,
  Horizon,
  Impact,
  Effort,
  Onset,
  Precaution,
  Risk,
  Signal,
  SignalStatus,
  Trend,
} from "./types";
import { exposure } from "./scoring";

/**
 * Client boundaries get slim projections, never whole `Risk` objects.
 * A 46-entry atlas serialised into the RSC payload is ~1 MB of JSON the
 * browser never needed — this keeps each page's payload proportional to what
 * it actually renders.
 */

export interface LeadSignal {
  label: string;
  status: SignalStatus;
  reading: string;
  cadence: string;
}

/** Everything a risk card needs — nothing more. */
export interface RiskSummary {
  slug: string;
  title: string;
  domain: DomainId;
  tag: string;
  summary: string;
  likelihood: number;
  severity: number;
  speed: number;
  defence: number;
  trend: Trend;
  onset: Onset;
  horizon: string;
  signalCount: number;
  youCount: number;
  leadSignal: LeadSignal | null;
}

/** One row on the signals board. */
export interface SignalRow {
  slug: string;
  title: string;
  domain: DomainId;
  /** Precomputed so the client never needs the full corpus to sort. */
  exposure: number;
  signal: Pick<
    Signal,
    "id" | "label" | "indicator" | "reading" | "status" | "history" | "cadence" | "why"
  >;
}

/** One row on the preparedness board. */
export interface PlanItem {
  slug: string;
  riskTitle: string;
  domain: DomainId;
  precaution: Pick<
    Precaution,
    "title" | "detail" | "impact" | "effort" | "horizon" | "cadence"
  >;
}

const STATUS_WEIGHT: Record<SignalStatus, number> = { quiet: 0, elevated: 1, high: 2, critical: 3 };

export function toSummary(r: Risk): RiskSummary {
  const lead = [...r.signals].sort((a, b) => STATUS_WEIGHT[b.status] - STATUS_WEIGHT[a.status])[0];
  return {
    slug: r.slug,
    title: r.title,
    domain: r.domain,
    tag: r.tag,
    summary: r.summary,
    likelihood: r.likelihood,
    severity: r.severity,
    speed: r.speed,
    defence: r.defence,
    trend: r.trend,
    onset: r.onset,
    horizon: r.horizon,
    signalCount: r.signals.length,
    youCount: r.precautions.filter((p) => p.audience === "you").length,
    leadSignal: lead
      ? { label: lead.label, status: lead.status, reading: lead.reading, cadence: lead.cadence }
      : null,
  };
}

export function toSignalRows(risks: Risk[]): SignalRow[] {
  return risks.flatMap((risk) =>
    risk.signals.map((signal) => ({
      slug: risk.slug,
      title: risk.title,
      domain: risk.domain,
      exposure: exposure(risk),
      signal: {
        id: signal.id,
        label: signal.label,
        indicator: signal.indicator,
        reading: signal.reading,
        status: signal.status,
        history: signal.history,
        cadence: signal.cadence,
        why: signal.why,
      },
    })),
  );
}

export function toPlanItems(risks: Risk[]): PlanItem[] {
  return risks.flatMap((risk) =>
    risk.precautions
      .filter((p) => p.audience === "you")
      .map((precaution) => ({
        slug: risk.slug,
        riskTitle: risk.title,
        domain: risk.domain,
        precaution: {
          title: precaution.title,
          detail: precaution.detail,
          impact: precaution.impact as Impact,
          effort: precaution.effort as Effort,
          horizon: precaution.horizon as Horizon,
          cadence: precaution.cadence,
        },
      })),
  );
}