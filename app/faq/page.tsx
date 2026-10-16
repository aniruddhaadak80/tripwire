import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Tripwire.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  { q: "Is this predictive?", a: "No. It's a structured atlas of plausible failure modes with leading signals, not a forecast." },
  { q: "How are scores calculated?", a: "Exposure and action priority use transparent formulas documented on the Method page." },
  { q: "Is the data open?", a: "Yes. All data is exportable as JSON/CSV via /data and /export-all." },
  { q: "Does it track live incidents?", a: "It tracks leading signals and timelines, not a live incident feed." },
  { q: "Can I contribute?", a: "Yes — see CONTRIBUTING.md in the repository." },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">FAQ</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">Questions & answers</h1>
      </header>
      <div className="mt-14 pb-24 space-y-4">
        {faqs.map((f, i) => (
          <details key={i} className="plate group">
            <summary className="plate-core cursor-pointer list-none p-5 text-ink-100">{f.q}</summary>
            <div className="px-5 pb-5 text-[14px] leading-relaxed text-ink-500">{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
