"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { risks } from "@/data";
import { domains } from "@/data/domains";
import { band, bandColor, exposure } from "@/lib/scoring";

function overlap(a: string[], b: string[]) {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x)).length;
}

export function GraphBoard() {
  const [filter, setFilter] = useState<string>("all");
  const data = useMemo(() => {
    const nodes = risks
      .filter((r) => filter === "all" || r.domain === filter)
      .map((r) => ({
        id: r.slug,
        title: r.title,
        domain: r.domain,
        color: bandColor[band(exposure(r))],
        exp: exposure(r),
        size: 6 + (exposure(r) / 100) * 10,
      }));
    const edges: Array<{ source: string; target: string; w: number }> = [];
    for (let i = 0; i < risks.length; i++) {
      const a = risks[i];
      if (filter !== "all" && a.domain !== filter) continue;
      for (let j = i + 1; j < risks.length; j++) {
        const b = risks[j];
        if (filter !== "all" && b.domain !== filter) continue;
        const o = overlap([...a.affected], [...b.affected]);
        if (o >= 2) {
          edges.push({ source: a.slug, target: b.slug, w: Math.min(6, o) });
        }
      }
    }
    return { nodes, edges };
  }, [filter]);

  return (
    <div className="h-full w-full plate">
      <div className="plate-core h-full flex flex-col p-4">
        <div className="flex items-center gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full border border-hairline bg-transparent px-4 py-2 text-[13px] text-ink-200">
            <option value="all">All domains</option>
            {domains.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-700">{data.nodes.length} nodes · {data.edges.length} edges</span>
        </div>
        <div className="flex-1 mt-4 relative overflow-hidden rounded-2xl border border-hairline">
          <svg viewBox="0 0 1200 600" className="h-full w-full">
            {data.edges.map((e, i) => (
              <line key={i} x1={600 + (Math.sin(i)*280)} y1={300 + (Math.cos(i)*200)} x2={600 + (Math.sin(i+2)*320)} y2={300 + (Math.cos(i+3)*220)} stroke="rgba(255,255,255,0.08)" strokeWidth={e.w} opacity={0.6} />
            ))}
            {data.nodes.map((n, i) => (
              <g key={n.id}>
                <circle cx={600 + (Math.sin(i)*300)} cy={300 + (Math.cos(i)*230)} r={n.size} fill={n.color} opacity={0.8}>
                  <title>{n.title}</title>
                </circle>
              </g>
            ))}
          </svg>
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 text-[11px] font-mono text-ink-600">
            {data.nodes.slice(0,8).map((n) => (
              <Link key={n.id} href={`/risk/${n.id}`} className="hover:text-ink-300">{n.title.slice(0,40)}</Link>
            ))}
          </div>
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">Layout is illustrative (force-free for determinism). Click labels to open entries.</p>
      </div>
    </div>
  );
}
