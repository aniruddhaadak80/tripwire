import type { DomainId, Risk, Signal } from "@/lib/types";
import { aiRisks } from "./risks/ai";
import { bioRisks } from "./risks/bio";
import { nuclearRisks } from "./risks/nuclear";
import { climateRisks } from "./risks/climate";
import { cyberRisks } from "./risks/cyber";
import { financeRisks } from "./risks/finance";
import { infraRisks } from "./risks/infrastructure";
import { infoRisks } from "./risks/info";
import { selfRisks } from "./risks/self";
import { spaceRisks } from "./risks/space";

/** Every risk in the atlas, in domain order. */
export const risks: Risk[] = [
  ...aiRisks,
  ...climateRisks,
  ...bioRisks,
  ...nuclearRisks,
  ...cyberRisks,
  ...financeRisks,
  ...infoRisks,
  ...infraRisks,
  ...spaceRisks,
  ...selfRisks,
];

export const riskBySlug = new Map<string, Risk>(risks.map((r) => [r.slug, r]));

export const getRisk = (slug: string): Risk | undefined => riskBySlug.get(slug);

export const risksInDomain = (domain: DomainId): Risk[] =>
  risks.filter((r) => r.domain === domain);

/** Every warning indicator in the atlas, flattened with its parent risk. */
export const allSignals: { risk: Risk; signal: Signal }[] = risks.flatMap((risk) =>
  risk.signals.map((signal) => ({ risk, signal })),
);

/** Every precaution an individual can act on — the raw material for /prepare. */
export const personalPrecautions = risks.flatMap((risk) =>
  risk.precautions
    .filter((p) => p.audience === "you")
    .map((precaution) => ({ risk, precaution })),
);

export const signalCount = allSignals.length;
export const precautionCount = risks.reduce((n, r) => n + r.precautions.length, 0);
export const advancementCount = risks.reduce((n, r) => n + r.advancements.length, 0);
export const sourceCount = risks.reduce((n, r) => n + r.sources.length, 0);