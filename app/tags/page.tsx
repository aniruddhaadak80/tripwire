import type { Metadata } from "next";
import Link from "next/link";
import { risks } from "@/data";

export const metadata: Metadata = {
  title: "Tags index",
  description: "All tags used across risks with counts.",
  alternates: { canonical: "/tags" },
};

export default function TagsPage() {
  const map = new Map<string, number>();
  for (const r of risks) {
    for (const t of r.tags ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  const tags = [...map.entries()].sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0]));
  return (
    <div className="mx-auto max-w-5xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Index</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Tags
        </h1>
      </header>
      <div className="mt-12 flex flex-wrap gap-2">
        {tags.map(([t,c]) => (
          <Link key={t} href={`/explorer?q=${encodeURIComponent(t)}`} className="rounded-full border border-hairline px-3 py-1.5 text-[12px] text-ink-300 hover:text-ink-100">
            {t} · {c}
          </Link>
        ))}
      </div>
    </div>
  );
}
