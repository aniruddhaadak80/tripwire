import type { DomainId, Risk } from "./types";

/** Compact index handed to the client so search never ships the whole corpus. */
export interface SearchDoc {
  slug: string;
  title: string;
  summary: string;
  domain: DomainId;
  domainName: string;
  tag: string;
  keywords: string;
  band: string;
}

export function buildSearchIndex(risks: Risk[], domainName: (id: DomainId) => string): SearchDoc[] {
  return risks.map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    domain: r.domain,
    domainName: domainName(r.domain),
    tag: r.tag,
    keywords: [
      ...r.signals.map((s) => s.label),
      ...r.precautions.map((p) => p.title),
      ...r.advancements.map((a) => a.title),
      r.affected.join(" "),
    ].join(" · "),
    band: r.trend,
  }));
}

/**
 * Naive but fast ranked search. Title hits outrank summary hits outrank
 * keyword hits; prefix matches outrank substring matches.
 */
export function search(docs: SearchDoc[], query: string, limit = 12): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = docs.map((doc) => {
    const title = doc.title.toLowerCase();
    const summary = doc.summary.toLowerCase();
    const keywords = doc.keywords.toLowerCase();
    const domain = doc.domainName.toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (title.startsWith(term)) score += 60;
      else if (title.includes(term)) score += 40;
      if (summary.includes(term)) score += 14;
      if (domain.includes(term)) score += 10;
      if (keywords.includes(term)) score += 6;
      if (doc.tag.toLowerCase().includes(term)) score += 8;
    }
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.doc);
}