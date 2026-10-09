/**
 * Fixed atmosphere layers: colour wash, hairline grid, film grain.
 * Fixed + pointer-events-none only — never attached to scrolling content.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="rule-grid absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_72%)]" />
      <div className="absolute -top-40 left-[8%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.20),transparent_62%)] blur-3xl" />
      <div className="absolute top-[42rem] right-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_62%)] blur-3xl" />
      <div className="absolute bottom-[-8rem] left-[30%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_64%)] blur-3xl" />
      <div className="scanlines absolute inset-0 opacity-[0.18] mix-blend-overlay" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}