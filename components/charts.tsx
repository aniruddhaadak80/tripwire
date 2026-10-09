"use client";

import { motion } from "motion/react";
import { useId } from "react";

/* ------------------------------------------------------------------ */
/* Sparkline — the shape of a signal's recent history                 */
/* ------------------------------------------------------------------ */

export function Sparkline({
  data,
  color = "#8b8b98",
  width = 120,
  height = 34,
  strokeWidth = 1.25,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}) {
  const gid = useId().replace(/:/g, "");
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = width / Math.max(1, data.length - 1);
  const pad = 3;

  const pts = data.map((v, i) => {
    const x = i * step;
    const y = pad + (1 - (v - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });

  const path = pts
    .map(([x, y], i) => {
      if (i === 0) return `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      return `C ${cx.toFixed(2)} ${py.toFixed(2)}, ${cx.toFixed(2)} ${y.toFixed(2)}, ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const area = `${path} L ${width} ${height} L 0 ${height} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden>
      <defs>
        <linearGradient id={`sp-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp-${gid})`} />
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
      />
      <circle cx={last[0]} cy={last[1]} r="2" fill={color} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Meter bar — a single scalar read at a glance                        */
/* ------------------------------------------------------------------ */

export function Meter({
  value,
  color = "#f43f5e",
  height = 4,
  delay = 0,
  track = "rgba(255,255,255,0.07)",
}: {
  value: number;
  color?: string;
  height?: number;
  delay?: number;
  track?: string;
}) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ height, background: track }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color, boxShadow: `0 0 12px ${color}66`, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: Math.max(0, Math.min(100, value)) / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.32, 0.72, 0, 1] }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Radar — the four-axis risk shape                                    */
/* ------------------------------------------------------------------ */

export function Radar({
  axes,
  color = "#f43f5e",
  size = 260,
  showValues = true,
}: {
  axes: { label: string; value: number }[];
  color?: string;
  size?: number;
  showValues?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 34;
  const n = axes.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, v: number): [number, number] => {
    const rad = (v / 100) * r;
    return [cx + Math.cos(angle(i)) * rad, cy + Math.sin(angle(i)) * rad];
  };

  const rings = [25, 50, 75, 100];
  const polygon = axes.map((a, i) => point(i, a.value).join(",")).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={axes.map((_, i) => point(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={1}
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />;
      })}
      <motion.polygon
        points={polygon}
        fill={`${color}2e`}
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        style={{ transformOrigin: "center" }}
      />
      {axes.map((a, i) => {
        const [x, y] = point(i, a.value);
        return <circle key={a.label} cx={x} cy={y} r={2.5} fill={color} />;
      })}
      {axes.map((a, i) => {
        const [x, y] = point(i, 122);
        return (
          <text
            key={a.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#8b8b98] font-mono"
            style={{ fontSize: 9, letterSpacing: "0.14em" }}
          >
            {a.label.toUpperCase()}
            {showValues ? ` ${a.value}` : ""}
          </text>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Gauge — the ring used for the atlas index and readiness score       */
/* ------------------------------------------------------------------ */

export function Gauge({
  value,
  size = 200,
  color = "#f43f5e",
  label,
  sub,
}: {
  value: number;
  size?: number;
  color?: string;
  label?: string;
  sub?: string;
}) {
  const stroke = size * 0.045;
  const r = (size - stroke) / 2 - 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  const gid = useId().replace(/:/g, "");

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`gg-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.55" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#gg-${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl tracking-tight" style={{ color }}>
          {Math.round(value)}
        </span>
        {label ? <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-500">{label}</span> : null}
        {sub ? <span className="mt-1 text-[11px] text-ink-500">{sub}</span> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat — big number + caption                                          */
/* ------------------------------------------------------------------ */

export function Stat({ value, unit, caption }: { value: string | number; unit?: string; caption: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-light tracking-tight text-ink-100 md:text-4xl">{value}</span>
        {unit ? <span className="font-mono text-xs text-ink-700">{unit}</span> : null}
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700">{caption}</p>
    </div>
  );
}