"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Download } from "lucide-react";
import { risks } from "@/data";
import { band, bandColor, bandLabel, exposure, actionPriority, rank } from "@/lib/scoring";
import { domains } from "@/data/domains";

const DOMAINS = ["all", ...domains.map((d) => d.id)];
const BANDS = ["all", "critical", "elevated", "watch", "monitor"] as const;
const TRENDS = ["all", "rising", "stable", "declining"] as const;
const SORTS = ["exposure-desc", "exposure-asc", "priority-desc", "likelihood-desc", "severity-desc", "speed-desc"] as const;

export function ExplorerBoard() {
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState<(typeof DOMAINS)[number]>("all");
  const [bandf, setBandf] = useState<(typeof BANDS)[number]>("all");
  const [trend, setTrend] = useState<(typeof TRENDS)[number]>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("exposure-desc");
  const [page, setPage] = useState(0);
  const per = 25;

  const items = useMemo(() => {
    let list = [...risks];
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(s) ||
          r.slug.toLowerCase().includes(s) ||
          r.tag.toLowerCase().includes(s) ||
          r.summary.toLowerCase().includes(s) ||
          r.affected.some((a) => a.toLowerCase().includes(s)),
      );
    }
    if (domain !== "all") list = list.filter((r) => r.domain === domain);
    if (bandf !== "all") list = list.filter((r) => bandLabel[band(exposure(r))].toLowerCase() === bandf);
    if (trend !== "all") list = list.filter((r) => r.trend === trend);

    switch (sort) {
      case "exposure-asc":
        list = [...list].sort((a, b) => exposure(a) - exposure(b));
        break;
      case "priority-desc":
        list = [...list].sort((a, b) => actionPriority(b) - actionPriority(a));
        break;
      case "likelihood-desc":
        list = [...list].sort((a, b) => b.likelihood - a.likelihood);
        break;
      case "severity-desc":
        list = [...list].sort((a, b) => b.severity - a.severity);
        break;
      case "speed-desc":
        list = [...list].sort((a, b) => b.speed - a.speed);
        break;
      default:
        list = rank(list, "exposure");
    }
    return list;
  }, [q, domain, bandf, trend, sort]);

  const pageItems = useMemo(() => items.slice(page * per, (page + 1) * per), [items, page]);

  const copyCsv = () => {
    const header = "slug,title,domain,likelihood,severity,speed,defence,exposure,priority,trend";
    const rows = items.map((r) =>
      [
        r.slug,
        JSON.stringify(r.title),
        r.domain,
        r.likelihood,
        r.severity,
        r.speed,
        r.defence,
        exposure(r),
        actionPriority(r),
        r.trend,
      ].join(","),
    );
    navigator.clipboard.writeText([header, ...rows].join("\n"));
  };

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-6">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(0); }}
          placeholder="Search title, slug, tags, affected..."
          className="md:col-span-2 rounded-full border border-hairline bg-transparent px-4 py-2 text-[13px] text-ink-200 outline-none placeholder:text-ink-700"
        />
        <select value={domain} onChange={(e) => { setDomain(e.target.value as typeof domain); setPage(0); }} className="rounded-full border border-hairline bg-transparent px-4 py-2 text-[13px] text-ink-200">
          {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={bandf} onChange={(e) => { setBandf(e.target.value as typeof bandf); setPage(0); }} className="rounded-full border border-hairline bg-transparent px-4 py-2 text-[13px] text-ink-200">
          {BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={trend} onChange={(e) => { setTrend(e.target.value as typeof trend); setPage(0); }} className="rounded-full border border-hairline bg-transparent px-4 py-2 text-[13px] text-ink-200">
          {TRENDS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={sort} onChange={(e) => { setSort(e.target.value as typeof sort); setPage(0); }} className="rounded-full border border-hairline bg-transparent px-4 py-2 text-[13px] text-ink-200">
          {SORTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button onClick={copyCsv} className="group inline-flex items-center gap-2 rounded-full border border-hairline py-2 pl-4 pr-3 text-[12px] text-ink-300 hover:text-ink-100">
          <Copy className="size-3.5" strokeWidth={1.5} /> Copy filtered CSV
        </button>
        <a href="/data/risks.csv" className="group inline-flex items-center gap-2 rounded-full border border-hairline py-2 pl-4 pr-3 text-[12px] text-ink-300 hover:text-ink-100">
          <Download className="size-3.5" strokeWidth={1.5} /> All CSVs
        </a>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">{items.length} results</span>
      </div>

      <div className="mt-6 plate">
        <div className="plate-core overflow-x-auto">
          <table className="w-full min-w-[1100px] text-[13px]">
            <thead>
              <tr className="border-b border-hairline text-left font-mono text-[9px] uppercase tracking-[0.2em] text-ink-700">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Domain</th>
                <th className="px-4 py-3">Band</th>
                <th className="px-4 py-3">Exp</th>
                <th className="px-4 py-3">Pri</th>
                <th className="px-4 py-3">L</th>
                <th className="px-4 py-3">S</th>
                <th className="px-4 py-3">V</th>
                <th className="px-4 py-3">D</th>
                <th className="px-4 py-3">Trend</th>
                <th className="px-4 py-3">Signals</th>
                <th className="px-4 py-3">Precs</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((x) => {
                const b = band(exposure(x));
                return (
                <tr key={x.slug} className="border-b border-hairline hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <Link href={`/risk/${x.slug}`} className="group inline-flex items-center gap-2 text-ink-200 hover:text-white">
                      <span className="truncate max-w-[420px]">{x.title}</span>
                      <ArrowUpRight className="size-3.5 text-ink-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] uppercase text-ink-600">{x.domain}</td>
                  <td className="px-4 py-3">
                    <span className="chip" style={{ color: bandColor[b] }}>{bandLabel[b]}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-ink-300">{exposure(x)}</td>
                  <td className="px-4 py-3 font-mono text-ink-400">{actionPriority(x)}</td>
                  <td className="px-4 py-3 font-mono text-ink-500">{x.likelihood}</td>
                  <td className="px-4 py-3 font-mono text-ink-500">{x.severity}</td>
                  <td className="px-4 py-3 font-mono text-ink-500">{x.speed}</td>
                  <td className="px-4 py-3 font-mono text-ink-500">{x.defence}</td>
                  <td className="px-4 py-3 font-mono text-[10px] uppercase text-ink-600">{x.trend}</td>
                  <td className="px-4 py-3 font-mono text-ink-500">{x.signals.length}</td>
                  <td className="px-4 py-3 font-mono text-ink-500">{x.precautions.length}</td>
                  <td className="px-4 py-3 font-mono text-[10px] text-ink-700">{x.updated}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button disabled={page===0} onClick={()=>setPage(p=>Math.max(0,p-1))} className="rounded-full border border-hairline px-4 py-2 text-[12px] text-ink-300 disabled:opacity-40">Prev</button>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">Page {page+1} / {Math.max(1,Math.ceil(items.length/per))}</span>
        <button disabled={(page+1)*per>=items.length} onClick={()=>setPage(p=>p+1)} className="rounded-full border border-hairline px-4 py-2 text-[12px] text-ink-300 disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}
