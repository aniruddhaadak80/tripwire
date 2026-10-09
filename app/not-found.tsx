import Link from "next/link";
import { PillLink } from "@/components/section";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 pt-32 text-center md:px-8">
      <span className="eyebrow">
        <span className="size-1 rounded-full bg-signal-critical" />
        404 · no such risk
      </span>
      <h1 className="mt-8 text-balance text-4xl font-light leading-[1.02] tracking-[-0.03em] md:text-6xl">
        This one isn&apos;t on the board
      </h1>
      <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-500">
        Either the entry does not exist, or it has been retired because the evidence changed. Both
        are outcomes the atlas should occasionally produce.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <PillLink href="/atlas">Back to the atlas</PillLink>
        <Link
          href="/signals"
          className="inline-flex items-center gap-3 rounded-full border border-hairline py-2 pl-6 pr-5 text-[13.5px] text-ink-300 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-hairline-strong hover:text-ink-100"
        >
          Signals board
        </Link>
      </div>
    </div>
  );
}