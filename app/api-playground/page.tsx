import type { Metadata } from "next";
import { ApiPlayground } from "@/components/api-playground";

export const metadata: Metadata = {
  title: "API playground",
  description: "Live try-it for the Tripwire public JSON endpoints.",
  alternates: { canonical: "/api-playground" },
};

export default function ApiPlaygroundPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Public API</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
          API <span className="font-[family-name:var(--font-instrument-serif)] italic text-signal-high">playground</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-ink-500">Fetch live data from /data/*.json and inspect responses instantly.</p>
      </header>
      <div className="mt-14 pb-24">
        <ApiPlayground />
      </div>
    </div>
  );
}
