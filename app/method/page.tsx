import type { Metadata } from "next";
import { allSignals, personalPrecautions, risks } from "@/data";
import { domains } from "@/data/domains";
import { PillLink } from "@/components/section";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Scoring method",
  description:
    "Exactly how Tripwire scores exposure, action priority, signal status and mitigation maturity — plus the editorial rules every entry has to pass.",
};

const RULES = [
  {
    title: "Estimates, never predictions",
    body: "Scores are structured judgements from the cited sources, not forecasts. Every entry carries an onset character and a horizon so you can tell a slow grind from a fast shock.",
  },
  {
    title: "No invented precision",
    body: "Where a number is contested we write a range or use ≈ rather than a confident figure attached to a named institution. False precision is worse than an honest gap.",
  },
  {
    title: "Optimism is recorded, not hidden",
    body: "Mitigations that have stalled or gone backwards are listed with the same prominence as the ones that scaled. A risk board that only shows progress is marketing.",
  },
  {
    title: "Every claim links out",
    body: "Signals, advancements and entries all point to primary sources — agencies, standards bodies, peer-reviewed work — so you can check us and check them.",
  },
  {
    title: "Personal means personal",
    body: "Anything in the individual column has to be actionable by one person without a budget approval, an engineering team, or a policy change.",
  },
];

const SCORES = [
  {
    name: "Exposure",
    formula: "likelihood × (0.62 + 0.38 × severity) × speed bump",
    body: "Likelihood is the chance it bites within about ten years. Severity is worst-case damage. A small speed bump rewards risks that hit fast once triggered, because those are the ones that outrun your response.",
  },
  {
    name: "Action priority",
    formula: "exposure × (1 − 0.7 × defence)",
    body: "Exposure alone builds a bad queue: it buries risks we have genuinely mitigated and promotes ones already handled. Discounting by current defence surfaces the gaps — the things that are both dangerous and ignored.",
  },
  {
    name: "Signal status",
    formula: "quiet → elevated → high → critical",
    body: "Assigned from how far a measured indicator has moved against its own historical baseline, not from a global threshold. An indicator 6% off its own norm matters more than one 3% off a global one.",
  },
  {
    name: "Mitigation maturity",
    formula: "0–100, with a status",
    body: "How far a mitigation has moved from concept to deployed at scale, judged on evidence of use rather than announcements. Status is recorded separately so a stalled 90% cannot masquerade as a working one.",
  },
];

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-guard" />
          Methodology · v1
        </span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          How the numbers <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-guard">work</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16.5px] leading-relaxed text-ink-500">
          A risk atlas is only useful if you know how it decided what to say. Here is the entire
          scoring model, the editorial rules behind it, and the limits you should hold it to.
        </p>
      </header>

      <section className="mt-20 grid gap-4 md:grid-cols-2">
        {SCORES.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.05}>
            <div className="plate h-full">
              <div className="plate-core h-full p-6">
                <h2 className="text-lg font-light tracking-tight text-ink-100">{s.name}</h2>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-signal-guard">{s.formula}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-500">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mt-24 border-t border-hairline pt-16">
        <span className="eyebrow">Editorial rules</span>
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {RULES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.04}>
              <div className="border-l border-hairline pl-6">
                <h3 className="text-[16px] font-normal text-ink-100">{r.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-500">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-hairline pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">What this is not</span>
            <h2 className="mt-6 text-3xl font-light leading-tight tracking-tight text-ink-100">
              Known limits, stated plainly
            </h2>
            <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-ink-500">
              <p>
                Tail risks dominate this atlas by construction. Rare, civilisation-scale events
                score high on severity and low on likelihood, and no amount of arithmetic makes
                that trade-off disappear.
              </p>
              <p>
                Correlations are not modelled. Several entries here interact — an AI-assisted
                pandemic and a weakened health system are one story, not two — but the scores are
                independent, so the total is not a system risk.
              </p>
              <p>
                It is a snapshot. Entries carry a revision date and move as evidence changes.
                Anything here can be wrong, including the confidence.
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <span className="eyebrow">The corpus</span>
            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { v: risks.length, l: "failure modes" },
                { v: domains.length, l: "watch domains" },
                { v: allSignals.length, l: "warning indicators" },
                { v: personalPrecautions.length, l: "individual precautions" },
                { v: risks.reduce((n, r) => n + r.advancements.length, 0), l: "tracked mitigations" },
                { v: risks.reduce((n, r) => n + r.sources.length, 0), l: "primary sources" },
              ].map((s) => (
                <div key={s.l} className="bg-void px-5 py-6">
                  <div className="text-2xl font-light text-ink-100">{s.v}</div>
                  <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-700">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href="/atlas" muted>
                Browse the atlas
              </PillLink>
              <PillLink href="/signals" muted>
                Open the signals board
              </PillLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}