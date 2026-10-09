/**
 * Data integrity gate. Run with: bun run validate
 * Fails loudly on dangling cross-links, out-of-range scores, or thin entries —
 * the three ways a curated dataset rots.
 */
import { risks } from "../data";
import { domains } from "../data/domains";
import type { DomainId } from "../lib/types";

const problems: string[] = [];
const warn: string[] = [];

const slugs = new Set(risks.map((r) => r.slug));
const domainIds = new Set<DomainId>(domains.map((d) => d.id));

if (slugs.size !== risks.length) problems.push("duplicate slugs detected");

for (const r of risks) {
  const at = `risk "${r.slug}"`;

  if (!domainIds.has(r.domain)) problems.push(`${at}: unknown domain "${r.domain}"`);

  for (const key of ["likelihood", "severity", "speed", "defence"] as const) {
    const v = r[key];
    if (!Number.isInteger(v) || v < 0 || v > 100) problems.push(`${at}: ${key} out of range (${v})`);
  }

  for (const rel of r.related) {
    if (!slugs.has(rel)) problems.push(`${at}: dangling related slug "${rel}"`);
  }

  if (r.signals.length < 3) problems.push(`${at}: only ${r.signals.length} signals`);
  if (r.advancements.length < 3) problems.push(`${at}: only ${r.advancements.length} advancements`);
  if (r.sources.length < 3) problems.push(`${at}: only ${r.sources.length} sources`);
  if (r.precautions.filter((p) => p.audience === "you").length === 0)
    problems.push(`${at}: no precautions for an individual`);
  if (r.timeline.length < 3) problems.push(`${at}: only ${r.timeline.length} timeline events`);

  for (const s of r.signals) {
    if (s.history.length < 8) problems.push(`${at}: signal "${s.id}" history too short`);
    if (!/^https?:\/\//.test(s.sourceUrl)) problems.push(`${at}: signal "${s.id}" bad sourceUrl`);
  }

  for (const s of r.sources) {
    if (!/^https?:\/\//.test(s.url)) problems.push(`${at}: bad source url "${s.url}"`);
  }

  for (const a of r.advancements) {
    if (a.progress < 0 || a.progress > 100) problems.push(`${at}: advancement "${a.title}" progress out of range`);
  }

  if (!r.analysis.length) problems.push(`${at}: no analysis`);
  if (r.summary.length < 60) warn.push(`${at}: very short summary`);
}

const domainsWithNoRisks = domains.filter((d) => !risks.some((r) => r.domain === d.id));
for (const d of domainsWithNoRisks) warn.push(`domain "${d.id}" has no entries`);

const totals = {
  risks: risks.length,
  signals: risks.reduce((n, r) => n + r.signals.length, 0),
  precautions: risks.reduce((n, r) => n + r.precautions.length, 0),
  youPrecautions: risks.reduce(
    (n, r) => n + r.precautions.filter((p) => p.audience === "you").length,
    0,
  ),
  advancements: risks.reduce((n, r) => n + r.advancements.length, 0),
  timeline: risks.reduce((n, r) => n + r.timeline.length, 0),
  sources: risks.reduce((n, r) => n + r.sources.length, 0),
};

console.log("Tripwire corpus");
console.table(totals);
console.log(
  `domains: ${domains.length - domainsWithNoRisks.length}/${domains.length} populated`,
);

if (warn.length) {
  console.warn(`\n${warn.length} warning(s):`);
  for (const w of warn) console.warn(`  - ${w}`);
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log("\nAll integrity checks passed.");