import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getRisk, riskBySlug, risks } from "@/data";
import { band, bandColor, exposure } from "@/lib/scoring";

export function RelatedRisks({ slug }: { slug: string }) {
  const risk = getRisk(slug);
  if (!risk || !risk.related.length) return null;

  const connected = risk.related
    .map((s) => riskBySlug.get(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  // Fallback: nearest same-domain neighbours when `related` is sparse.
  if (connected.length < 2) {
    const extras = risks
      .filter((r) => r.slug !== risk.slug && !risk.related.includes(r.slug))
      .sort((a, b) => {
        const oa = a.affected.filter((x) => risk.affected.includes(x)).length;
        const ob = b.affected.filter((x) => risk.affected.includes(x)).length;
        return ob - oa || exposure(b) - exposure(a);
      })
      .slice(0, 3 - connected.length);
    connected.push(...extras);
  }

  return (
    <section className="border-t border-hairline py-16">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl font-light tracking-tight text-ink-100">Connected risks</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
          failure modes rarely come alone
        </span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {connected.slice(0, 3).map((r) => {
          const b = band(exposure(r));
          return (
            <Link
              key={r.slug}
              href={`/risk/${r.slug}`}
              className="plate group block transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
            >
              <div className="plate-core flex h-full flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
                    {r.domain} · exposure {exposure(r)}
                  </span>
                  <span
                    className="size-2 rounded-full"
                    style={{ background: bandColor[b], boxShadow: `0 0 8px ${bandColor[b]}` }}
                  />
                </div>
                <p className="mt-4 text-[16px] leading-snug text-ink-100">{r.title}</p>
                <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-500">{r.summary}</p>
                <span className="mt-auto flex items-center justify-end pt-4">
                  <ArrowUpRight className="size-4 text-ink-700 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-300" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
