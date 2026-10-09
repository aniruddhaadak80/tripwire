import Link from "next/link";

export function Footer({
  counts,
}: {
  counts: { risks: number; signals: number; precautions: number; sources: number };
}) {
  return (
    <footer className="relative z-10 mt-32 border-t border-hairline">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.6fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-signal-critical shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.34em]">Tripwire</span>
          </div>
          <p className="mt-6 max-w-sm text-balance text-sm leading-relaxed text-ink-500">
            An atlas of things that could go wrong — the warning signs we can actually measure, the
            precautions that actually help, and the advances that are genuinely working.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink-700">
            {counts.risks} failure modes · {counts.signals} indicators · {counts.precautions} precautions ·{" "}
            {counts.sources} sources
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-700">Explore</p>
          <ul className="mt-5 space-y-3">
            {[
              { href: "/atlas", label: "The atlas" },
              { href: "/signals", label: "Signals board" },
              { href: "/prepare", label: "Preparedness" },
              { href: "/method", label: "Scoring method" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-ink-300 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-ink-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-700">Ground rules</p>
          <ul className="mt-5 space-y-3 text-sm text-ink-500">
            <li>Estimates, not predictions.</li>
            <li>Every entry carries its sources.</li>
            <li>Optimism is recorded, not hidden.</li>
            <li>Personal precautions are yours to run.</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-hairline px-5 py-8 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700 md:flex-row md:items-center md:justify-between md:px-8">
        <span>Open source · MIT licensed · built as a public-good reference</span>
        <span>Not medical, legal, or financial advice</span>
      </div>
    </footer>
  );
}