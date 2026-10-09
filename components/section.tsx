import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        align === "center" ? "text-center md:flex-col md:items-center" : ""
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        <span className="eyebrow">
          <span className="size-1 rounded-full bg-signal-critical" />
          {eyebrow}
        </span>
        <h2 className="mt-6 text-balance text-3xl font-light leading-[1.08] tracking-tight text-ink-100 md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-500">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** Pill CTA with the trailing icon nested inside its own circular plate. */
export function PillLink({
  href,
  children,
  external,
  muted,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  muted?: boolean;
}) {
  const content = (
    <span
      className={`group inline-flex items-center gap-3 rounded-full border py-2 pl-6 pr-2 text-[13.5px] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
        muted
          ? "border-hairline text-ink-300 hover:border-hairline-strong hover:text-ink-100"
          : "border-hairline-strong bg-ink-100 text-void hover:bg-white"
      }`}
    >
      {children}
      <span
        className={`flex size-8 items-center justify-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          muted
            ? "bg-white/[0.05] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:bg-white/[0.1]"
            : "bg-black/10 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:bg-black/20"
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path
            d="M3 10L10 3M10 3H4.5M10 3V8.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {content}
    </a>
  ) : (
    <a href={href}>{content}</a>
  );
}