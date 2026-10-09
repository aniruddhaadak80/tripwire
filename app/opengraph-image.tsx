import { ImageResponse } from "next/og";
import { allSignals, personalPrecautions, risks } from "@/data";

export const alt = "Tripwire — an atlas of everything that could go wrong";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const stats = [
    { n: risks.length, l: "failure modes" },
    { n: allSignals.length, l: "warning indicators" },
    { n: personalPrecautions.length, l: "actions for you" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050506",
          backgroundImage:
            "radial-gradient(900px 500px at 12% -10%, rgba(244,63,94,0.28), transparent 60%), radial-gradient(800px 500px at 95% 110%, rgba(139,92,246,0.22), transparent 62%)",
          padding: 72,
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#f43f5e" }} />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 12,
              textTransform: "uppercase",
              color: "#c9c9d1",
            }}
          >
            Tripwire
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 100,
              lineHeight: 1.04,
              letterSpacing: -3,
              maxWidth: 1000,
            }}
          >
            Everything that could go wrong, tracked in public.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#8b8b98", maxWidth: 900 }}>
            Warning signs. Precautions. The mitigations actually working.
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 16 }}>
          {stats.map((s) => (
            <div
              key={s.l}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 22,
                padding: "14px 26px",
              }}
            >
              <div style={{ display: "flex", fontSize: 40 }}>{s.n}</div>
              <div style={{ display: "flex", fontSize: 22, color: "#8b8b98", letterSpacing: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}