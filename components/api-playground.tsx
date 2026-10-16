"use client";

import { useState } from "react";

const endpoints = [
  { label: "risks.json", path: "/data/risks.json" },
  { label: "signals.json", path: "/data/signals.json" },
  { label: "precautions.json", path: "/data/precautions.json" },
  { label: "summary.json", path: "/data/summary.json" },
  { label: "feed.json", path: "/feed.json" },
  { label: "feed.xml", path: "/feed.xml" },
];

export function ApiPlayground() {
  const [path, setPath] = useState(endpoints[0].path);
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchIt = async () => {
    setLoading(true);
    setRes("");
    try {
      const r = await fetch(path);
      const text = await r.text();
      setRes(JSON.stringify({ status: r.status, ok: r.ok, len: text.length, preview: text.slice(0, 4000) }, null, 2));
    } catch (e: any) {
      setRes(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plate">
      <div className="plate-core flex flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {endpoints.map((e) => (
            <button key={e.path} onClick={() => setPath(e.path)} className={`rounded-full border px-3 py-1.5 text-[12px] ${path===e.path?"border-hairline-strong text-ink-200":"border-hairline text-ink-500"}`}>
              {e.label}
            </button>
          ))}
          <input value={path} onChange={(e)=>setPath(e.target.value)} className="flex-1 min-w-[240px] rounded-full border border-hairline bg-transparent px-4 py-2 text-[12px] text-ink-300" />
          <button onClick={fetchIt} disabled={loading} className="rounded-full border border-hairline px-4 py-2 text-[12px] text-ink-300 disabled:opacity-40">{loading?"Fetching...":"Fetch"}</button>
        </div>
        <pre className="max-h-[60vh] overflow-auto rounded-2xl border border-hairline bg-black/40 p-4 text-[11px] text-ink-400"><code>{res || "Click Fetch to see response."}</code></pre>
      </div>
    </div>
  );
}
