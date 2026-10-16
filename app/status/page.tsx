import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status",
  description: "Status of the Tripwire atlas.",
  alternates: { canonical: "/status" },
};

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 md:px-8 md:pt-40">
      <header className="max-w-3xl">
        <span className="eyebrow">Status</span>
        <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">System status</h1>
        <p className="mt-7 text-[16px] text-ink-500">Site: operational. Data: static, versioned. Build: automated via Vercel on push.</p>
      </header>
      <div className="mt-10 pb-24">
        <div className="plate"><div className="plate-core p-5 flex items-center justify-between"><span className="text-ink-100">All systems</span><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-low">OK</span></div></div>
      </div>
    </div>
  );
}
