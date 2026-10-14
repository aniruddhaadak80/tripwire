"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { domains } from "@/data/domains";
import { allEvents } from "@/data/events";
import type { DomainId } from "@/lib/types";

type Event = (typeof allEvents)[number];

export function TimelineBoard() {
  const [active, setActive] = useState<DomainId[]>([]);

  const filtered = useMemo(
    () => (active.length ? allEvents.filter((e) => active.includes(e.domain as DomainId)) : allEvents),
    [active],
  );

  const groups = useMemo(() => {
    const map = new Map<number, Event[]>();
    for (const e of filtered) {
      const list = map.get(e.year) ?? [];
      list.push(e);
      map.set(e.year, list);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActive([])}
          className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-500 ${
            active.length === 0
              ? "border-hairline-strong bg-ink-100 text-void"
              : "border-hairline text-ink-500 hover:text-ink-300"
          }`}
        >
          All domains
        </button>
        {domains.map((d) => {
          const on = active.includes(d.id);
          return (
            <button
              key={d.id}
              onClick={() =>
                setActive((cur) =>
                  cur.includes(d.id) ? cur.filter((x) => x !== d.id) : [...cur, d.id],
                )
              }
              className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                borderColor: on ? `${d.accent}55` : "rgba(255,255,255,0.09)",
                background: on ? `${d.accent}14` : "transparent",
                color: on ? d.accent : "var(--color-ink-500)",
              }}
            >
              <span className="size-1.5 rounded-full" style={{ background: d.accent, opacity: on ? 1 : 0.45 }} />
              {d.name}
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">
          {filtered.length} events
        </span>
      </div>

      <div className="mt-12 space-y-16">
        {groups.map(([year, events]) => (
          <section key={year}>
            <div className="flex items-center gap-4">
              <span className="font-mono text-2xl text-ink-100">{year}</span>
              <span className="hairline flex-1" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
                {events.length} {events.length === 1 ? "event" : "events"}
              </span>
            </div>

            <ol className="relative mt-8 space-y-0 border-l border-hairline pl-8">
              {events.map((e, i) => (
                <li key={`${e.riskSlug}-${e.date}-${i}`} className="relative pb-8 last:pb-0">
                  <span
                    className="absolute -left-[38px] top-1.5 flex size-2.5 items-center justify-center rounded-full ring-4 ring-void"
                    style={{ background: e.accent, boxShadow: `0 0 10px ${e.accent}66` }}
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">
                      {e.date}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: e.accent }}>
                      {e.domainName}
                    </span>
                  </div>
                  <Link
                    href={`/risk/${e.riskSlug}`}
                    className="group mt-2 inline-block text-[16px] leading-snug text-ink-100 transition-colors duration-500 hover:text-white"
                  >
                    {e.title}
                  </Link>
                  {e.detail ? (
                    <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
                      {e.detail}
                    </p>
                  ) : null}
                  <p className="mt-2 font-mono text-[10px] text-ink-700">
                    from: {e.riskTitle}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}