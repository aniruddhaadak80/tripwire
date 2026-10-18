import { allEvents } from "@/data/events";
import { allSignals, risks } from "@/data";
import { signalWeight } from "@/lib/scoring";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripwire-atlas.vercel.app";

export async function GET() {
  const signalItems = [...allSignals]
    .sort((a, b) => signalWeight[b.signal.status] - signalWeight[a.signal.status])
    .slice(0, 15)
    .map(({ risk, signal }) => ({
      id: signal.id,
      url: `${BASE}/risk/${risk.slug}`,
      title: signal.label,
      content_text: `${signal.status.toUpperCase()} · ${signal.reading} · tracked via ${signal.cadence} — ${risk.title}`,
      tags: [signal.status, risk.domain],
    }));

  const eventItems = allEvents.slice(0, 15).map((e) => ({
    id: `${e.riskSlug}-${e.date}-${e.day}`,
    url: `${BASE}/risk/${e.riskSlug}`,
    title: e.title,
    content_text: `${e.date} · ${e.domainName} — from the timeline of ${e.riskTitle}${e.detail ? `: ${e.detail}` : ""}`,
    date_published: new Date(Date.UTC(e.year, e.month - 1, e.day)).toISOString(),
    tags: [e.domain],
  }));

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Tripwire — loudest signals",
    home_page_url: BASE,
    feed_url: `${BASE}/feed.json`,
    description: `Warning signs and defining moments across ${risks.length} tracked failure modes.`,
    icon: `${BASE}/icon.svg`,
    favicon: `${BASE}/icon.svg`,
    language: "en",
    authors: [{ name: "Tripwire" }],
    items: [...signalItems, ...eventItems],
  };

  return Response.json(feed, {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
