import type { Metadata } from "next";
import { risks } from "@/data";
import { exposure, band } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Risk quality",
  description: "Data completeness and confidence per risk.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  const rows = risks.map((r) => {
    const fields = [r.summary, r.affected.length, r.precautions.length, r.signals.length, r.timeline.length, r.sources.length];
    const complete = fields.filter((f) => (typeof f==="number"?f>0:Boolean(f))).length / fields.length * 100;
    const conf = Math.min(98, 55 + r.sources*9 + r.timeline*1.5);
    const b = band(exposure(r));
    return { r, complete: Math.round(complete), conf: Math.round(conf), band: b };
  }).sort((a,b)=>b.conf-a.conf);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Quality & confidence</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Data <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">quality</span>
        </h1>
      </header>
      <div className="mt-14 pb-24 plate">
        <div className="plate-core overflow-x-auto">
          <table className="w-full min-w-[900px] text-[13px]">
            <thead>
              <tr className="border-b border-hairline font-mono text-[9px] uppercase tracking-[0.2em] text-ink-700">
                <th className="px-4 py-3 text-left">Risk</th>
                <th className="px-4 py-3 text-left">Completeness</th>
                <th className="px-4 py-3 text-left">Confidence</th>
                <th className="px-4 py-3 text-left">Band</th>
                <th className="px-4 py-3 text-left">Signals</th>
                <th className="px-4 py-3 text-left">Precs</th>
                <th className="px-4 py-3 text-left">Timeline</th>
                <th className="px-4 py-3 text-left">Sources</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((x)=>(
                <tr key={x.r.slug} className="border-b border-hairline hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-ink-200">{x.r.title}</td>
                  <td className="px-4 py-3 font-mono">{x.complete}%</td>
                  <td className="px-4 py-3 font-mono">{x.conf}%</td>
                  <td className="px-4 py-3 font-mono uppercase">{x.band}</td>
                  <td className="px-4 py-3 font-mono">{x.r.signals.length}</td>
                  <td className="px-4 py-3 font-mono">{x.r.precautions.length}</td>
                  <td className="px-4 py-3 font-mono">{x.r.timeline.length}</td>
                  <td className="px-4 py-3 font-mono">{x.r.sources.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
