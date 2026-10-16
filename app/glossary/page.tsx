import type { Metadata } from "next";
import { risks } from "@/data";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Key terms used across the Tripwire atlas.",
  alternates: { canonical: "/glossary" },
};

const terms = [
  { term: "Exposure", def: "Composite measure combining likelihood, severity, speed (exposure = L*(0.62 + 0.38*S)*(1+V/500), capped)." },
  { term: "Action Priority", def: "Exposure weighted by defence (priority = exposure*(1 - 0.7*defence)). Higher = act sooner." },
  { term: "Defence", def: "0–100 how well mitigations currently contain the failure mode (higher = better)." },
  { term: "Speed", def: "0–100 how fast consequences could escalate once triggered." },
  { term: "Leading Signal", def: "Observable, measurable early warning that can be tracked over time." },
  { term: "Precaution", def: "Concrete, actionable step with audience, impact, effort and cadence." },
  { term: "Counterfactual", def: "Hypothetical shifts in L/S/V/D used to see what moves the score most." },
];

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Glossary</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">Definitions</h1>
      </header>
      <div className="mt-14 pb-24 space-y-6">
        {terms.map((t) => (
          <div key={t.term} className="plate">
            <div className="plate-core p-5">
              <h3 className="text-lg text-ink-100">{t.term}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{t.def}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
