import { risks, signals, precautions, summary } from "@/data";
import { allEvents } from "@/data/events";

export async function GET() {
  const payload = {
    meta: {
      site: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripwire-atlas.vercel.app",
      generatedAt: new Date().toISOString(),
      counts: summary.counts,
    },
    risks,
    signals,
    precautions,
    events: allEvents,
    summary,
  };
  return Response.json(payload, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
