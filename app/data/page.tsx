import type { Metadata } from "next";
import Link from "next/link";
import { Braces, Rss } from "lucide-react";
import { PillLink, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { allSignals, personalPrecautions, precautionCount, risks, sourceCount } from "@/data";

export const metadata: Metadata = {
  title: "Public data API",
  description:
    "The entire Tripwire corpus as JSON — risks, signals, precautions and summary stats — plus an RSS feed of the loudest signals. No backend, no keys, no rate limits.",
};

const endpoints = [
  {
    file: "/data/risks.json",
    size: "661 KB",
    desc: "The full corpus: all 45 entries with scores, signals, precautions, advancements, timeline and sources. The same shape the UI renders.",
  },
  {
    file: "/data/signals.json",
    size: "150 KB",
    desc: "All 180 indicators flattened with their parent risk, exposure score and history arrays. Sorted by loudness.",
  },
  {
    file: "/data/precautions.json",
    size: "106 KB",
    desc: "All 189 individual-level precautions — the raw material behind the /prepare checklist — with effort, impact and cadence.",
  },
  {
    file: "/data/summary.json",
    size: "2 KB",
    desc: "Counts and per-domain mean exposure. The lightest way to embed the board elsewhere.",
  },
  {
    file: "/feed.xml",
    size: "13 KB",
    desc: "RSS 2.0 of the 20 loudest signals, regenerated on every deploy.",
  },
];

const schema = `{
  "slug": "amoc-collapse",
  "domain": "climate",
  "scores": { "likelihood": 38, "severity": 96, "speed": 42, "defence": 35 },
  "exposure": 55,
  "actionPriority": 49,
  "signals": [{ "id": "amoc-fingerprint", "status": "high", "history": [...] }],
  "precautions": [{ "title": "...", "audience": "policy", "impact": "high" }],
  "advancements": [{ "title": "...", "status": "promising", "progress": 64 }],
  "timeline": [{ "date": "2024", "title": "..." }],
  "sources": [{ "label": "...", "url": "https://..." }]
}`;

export default function DataPage() {
  const counts = {
    risks: risks.length,
    signals: allSignals.length,
    precautions: precautionCount,
    individual: personalPrecautions.length,
    sources: sourceCount,
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">
          <Braces className="size-3" strokeWidth={1.5} />
          Public data API · no backend
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          Take the corpus with you
        </h1>
        <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-ink-500">
          The whole atlas is exported to static JSON at build time. Read it, remix it, embed it —
          no API key, no rate limit, no tracking. If you build something with it, tell us and
          we will link it here.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <PillLink href="/data/risks.json">Download risks.json</PillLink>
          <PillLink href="/feed.xml" muted>
            <Rss className="size-3.5" strokeWidth={1.5} />
            RSS feed
          </PillLink>
        </div>
      </header>

      <section className="mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Endpoints"
            title="Five files, zero servers"
            description="Regenerated on every deploy alongside the site itself, so the data can never drift from what the UI shows."
          />
        </Reveal>
        <div className="mt-12 space-y-4">
          {endpoints.map((e, i) => (
            <Reveal key={e.file} delay={i * 0.04}>
              <a
                href={e.file}
                className="plate group block transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong"
              >
                <div className="plate-core flex items-start gap-5 p-5 md:items-center md:p-6">
                  <span className="mt-0.5 font-mono text-[10px] text-ink-700 md:mt-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[14px] text-ink-100">{e.file}</span>
                    <span className="mt-1.5 block text-[13px] leading-relaxed text-ink-500">
                      {e.desc}
                    </span>
                  </span>
                  <span className="chip shrink-0">{e.size}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-hairline pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">Shape</span>
            <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight text-ink-100">
              One schema, mirrored in TypeScript
            </h2>
            <p className="mt-5 text-[14px] leading-relaxed text-ink-500">
              Every JSON file is generated from the same typed objects the UI renders, so the field
              names match <code className="font-mono text-[13px] text-ink-300">lib/types.ts</code>{" "}
              exactly. The summary file is small enough to hot-link anywhere.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="plate">
              <div className="plate-core overflow-x-auto p-5 md:p-6">
                <pre className="font-mono text-[12px] leading-relaxed text-ink-300">{schema}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 border-t border-hairline pt-16">
        <span className="eyebrow">Ground rules</span>
        <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-3">
          {[
            {
              title: "Credit the corpus",
              body: "Generated from curated, cited research. A link back to the atlas is enough for most uses; for commercial embedding, ask first.",
            },
            {
              title: "Scores are editorial",
              body: "They are structured judgements, not measurements. Republish them as estimates, not facts.",
            },
            {
              title: "No personal data",
              body: "The corpus contains no user data and never will — the preparedness plan lives in your browser only.",
            },
          ].map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="border-l border-hairline pl-6">
                <h3 className="text-[16px] font-normal text-ink-100">{r.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-500">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-hairline py-10">
        <p className="text-[13.5px] text-ink-700">
          {counts.risks} risks · {counts.signals} signals · {counts.precautions} precautions ·{" "}
          {counts.individual} for you · {counts.sources} sources
        </p>
        <Link
          href="/method"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 transition-colors duration-500 hover:text-ink-100"
        >
          how the scores are built
        </Link>
      </div>
    </div>
  );
}