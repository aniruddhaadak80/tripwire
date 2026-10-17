import { personalPrecautions, risks } from "@/data";
import { allEvents } from "@/data/events";
import { advancementCount, precautionCount, signalCount, sourceCount } from "@/data";

export async function GET() {
  const signalsOut = risks.flatMap((risk) =>
    risk.signals.map((signal) => ({ risk: risk.slug, ...signal })),
  );

  const precautionsOut = risks.flatMap((risk) =>
    risk.precautions.map((precaution) => ({ risk: risk.slug, ...precaution })),
  );

  const personalOut = personalPrecautions.map((p) => ({
    risk: p.risk.slug,
    title: p.precaution.title,
    impact: p.precaution.impact,
    effort: p.precaution.effort,
    cadence: p.precaution.cadence ?? null,
  }));

  const payload = {
    meta: {
      site: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripwire-atlas.vercel.app",
      generatedAt: new Date().toISOString(),
      counts: {
        risks: risks.length,
        signals: signalCount,
        precautions: precautionCount,
        advancements: advancementCount,
        sources: sourceCount,
        events: allEvents.length,
      },
    },
    risks,
    signals: signalsOut,
    precautions: precautionsOut,
    personalPrecautions: personalOut,
    events: allEvents,
  };

  return Response.json(payload, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
