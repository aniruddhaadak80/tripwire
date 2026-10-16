import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press",
  description: "Press kit for Tripwire atlas.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Press kit</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">Press</h1>
        <p className="mt-7 text-[16px] text-ink-500">Name: Tripwire — an atlas of everything that could go wrong. URL: https://tripwire-atlas.vercel.app. License: MIT. Logos: /icon.svg, /banner.svg.</p>
      </header>
      <div className="mt-10 pb-24 grid gap-4 md:grid-cols-2">
        <div className="plate"><div className="plate-core p-5"><p className="text-ink-100">Brand</p><p className="mt-2 text-[13px] text-ink-500">Minimal, high-contrast, data-forward.</p></div></div>
        <div className="plate"><div className="plate-core p-5"><p className="text-ink-100">Images</p><p className="mt-2 text-[13px] text-ink-500">Use public/screenshots or SVG assets with attribution.</p></div></div>
      </div>
    </div>
  );
}
