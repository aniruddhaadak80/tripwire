/**
 * Build-time export of the corpus into public/ — a public JSON API and an
 * RSS feed with no backend. Run with: bun run export:data
 *
 * Outputs:
 *   public/data/risks.json      — the full corpus, typed shape
 *   public/data/signals.json    — flattened signals with parent risk
 *   public/data/precautions.json— flattened precautions with parent risk
 *   public/data/summary.json    — counts + domain stats for embeddables
 *   public/feed.xml             — RSS 2.0 of the loudest signals
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { allSignals, personalPrecautions, risks } from "../data";
import { domains } from "../data/domains";
import { actionPriority, exposure } from "../lib/scoring";
import { toSignalRows } from "../lib/views";

const ROOT = fileURLToPath(new URL("../public/", import.meta.url));
const DATA_DIR = `${ROOT}data/`;
mkdirSync(DATA_DIR, { recursive: true });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripwire-atlas.vercel.app";
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---- risks.json -------------------------------------------------------------
const risksJson = risks.map((r) => ({
  slug: r.slug,
  title: r.title,
  domain: r.domain,
  tag: r.tag,
  summary: r.summary,
  analysis: r.analysis,
  scores: {
    likelihood: r.likelihood,
    severity: r.severity,
    speed: r.speed,
    defence: r.defence,
  },
  exposure: exposure(r),
  actionPriority: actionPriority(r),
  onset: r.onset,
  horizon: r.horizon,
  trend: r.trend,
  affected: r.affected,
  related: r.related,
  signals: r.signals.map((s) => ({
    id: s.id,
    label: s.label,
    indicator: s.indicator,
    reading: s.reading,
    status: s.status,
    trend: s.trend,
    history: s.history,
    cadence: s.cadence,
    source: s.source,
    sourceUrl: s.sourceUrl,
  })),
  precautions: r.precautions.map((p) => ({
    title: p.title,
    detail: p.detail,
    audience: p.audience,
    effort: p.effort,
    impact: p.impact,
    horizon: p.horizon,
    cadence: p.cadence,
  })),
  advancements: r.advancements.map((a) => ({
    title: a.title,
    detail: a.detail,
    status: a.status,
    progress: a.progress,
    date: a.date,
    actor: a.actor,
    link: a.link,
  })),
  timeline: r.timeline,
  sources: r.sources,
  updated: r.updated,
}));
writeFileSync(`${DATA_DIR}risks.json`, JSON.stringify(risksJson, null, 2));

// ---- signals.json -----------------------------------------------------------
writeFileSync(
  `${DATA_DIR}signals.json`,
  JSON.stringify(
    toSignalRows(risks).map((r) => ({
      risk: r.slug,
      riskTitle: r.title,
      domain: r.domain,
      exposure: r.exposure,
      ...r.signal,
    })),
    null,
    2,
  ),
);

// ---- precautions.json -------------------------------------------------------
writeFileSync(
  `${DATA_DIR}precautions.json`,
  JSON.stringify(
    personalPrecautions.map(({ risk, precaution }) => ({
      risk: risk.slug,
      riskTitle: risk.title,
      domain: risk.domain,
      ...precaution,
    })),
    null,
    2,
  ),
);

// ---- summary.json -----------------------------------------------------------
const domainStats = domains.map((d) => {
  const items = risks.filter((r) => r.domain === d.id);
  return {
    id: d.id,
    name: d.name,
    entries: items.length,
    meanExposure: items.length
      ? Math.round(items.reduce((s, r) => s + exposure(r), 0) / items.length)
      : 0,
    topRisk: items.length
      ? items.reduce((a, b) => (exposure(b) > exposure(a) ? b : a)).slug
      : null,
  };
});
writeFileSync(
  `${DATA_DIR}summary.json`,
  JSON.stringify(
    {
      site: SITE,
      generatedAt: new Date().toISOString(),
      counts: {
        risks: risks.length,
        signals: allSignals.length,
        precautions: risks.reduce((n, r) => n + r.precautions.length, 0),
        individualPrecautions: personalPrecautions.length,
        advancements: risks.reduce((n, r) => n + r.advancements.length, 0),
        sources: risks.reduce((n, r) => n + r.sources.length, 0),
      },
      domains: domainStats,
    },
    null,
    2,
  ),
);

// ---- feed.xml ---------------------------------------------------------------
const loudest = [...allSignals]
  .sort((a, b) => b.signal.status.localeCompare(a.signal.status) || b.risk.severity - a.risk.severity)
  .slice(0, 20);

const items = loudest
  .map(({ risk, signal }) => {
    const link = `${SITE}/risk/${risk.slug}`;
    return `    <item>
      <title>${esc(signal.label)} — ${esc(risk.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${risk.slug}:${signal.id}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description>${esc(signal.reading)} · ${esc(signal.why)}</description>
    </item>`;
  })
  .join("\n");

writeFileSync(
  `${ROOT}feed.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Tripwire — loudest signals</title>
    <link>${SITE}</link>
    <description>The twenty loudest early-warning indicators across the atlas, refreshed on every deploy.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`,
);

console.log("Exported:");
for (const f of ["risks.json", "signals.json", "precautions.json", "summary.json", "feed.xml"]) {
  console.log(`  public/${f.startsWith("feed") ? "" : "data/"}${f}`);
}
console.log(`  ${risksJson.length} risks · ${allSignals.length} signals · ${personalPrecautions.length} precautions`);