import type { Domain, DomainId } from "@/lib/types";

/**
 * The ten watch domains. Order is intentional: it is the order the atlas
 * escalates in, from slow-moving physical systems to fast, irreversible ones.
 */
export const domains: Domain[] = [
  {
    id: "ai",
    name: "Machine Intelligence",
    tagline: "Capability is outrunning containment",
    blurb:
      "Frontier systems can now write exploit code, design molecules, and act autonomously for days at a time. The failure modes are new because the actor is non-human, fast, and improving on its own footing.",
    accent: "#a78bfa",
    icon: "BrainCircuit",
    glow: "rgba(139, 92, 246, 0.28)",
  },
  {
    id: "climate",
    name: "Climate & Earth Systems",
    tagline: "Slow pressure, sudden thresholds",
    blurb:
      "Average temperature is the least alarming part of the story. The dangerous parts are thresholds — ice sheets, the Atlantic overturning, monsoon structure, permafrost — where a small nudge produces a permanent state change.",
    accent: "#fb7185",
    icon: "Thermometer",
    glow: "rgba(244, 63, 94, 0.22)",
  },
  {
    id: "bio",
    name: "Biology & Pandemics",
    tagline: "The oldest failure mode, newly weaponisable",
    blurb:
      "Natural pandemics still outrun our defences, while synthesis capability shrinks the gap between a genome sequence and a live pathogen. Antibiotic supply is the quiet structural weakness underneath both.",
    accent: "#34d399",
    icon: "Dna",
    glow: "rgba(16, 185, 129, 0.22)",
  },
  {
    id: "cyber",
    name: "Cyber & Infrastructure",
    tagline: "Everything is a computer, nothing is isolated",
    blurb:
      "Power, water, ports, hospitals, satellites and payments all run on software nobody fully audits. The risk is not one dramatic hack; it is saturation attacks on the dependencies we stopped mapping.",
    accent: "#38bdf8",
    icon: "ShieldAlert",
    glow: "rgba(56, 189, 248, 0.24)",
  },
  {
    id: "nuclear",
    name: "Nuclear & Material Risk",
    tagline: "Low-probability, civilisation-scale consequences",
    blurb:
      "Warheads, reactor sites, plutonium circles and launch authority all exist in a world with more flashpoints, more launchers, and machine-speed decision loops than during the last controlled era.",
    accent: "#fbbf24",
    icon: "Radar",
    glow: "rgba(245, 158, 11, 0.2)",
  },
  {
    id: "finance",
    name: "Financial System",
    tagline: "Contagion travels faster than regulation",
    blurb:
      "Leverage, opacity and speed have all grown while the deposit and lender-of-last-resort backstops have stayed 2008-sized. Markets can now fail in minutes against backstops designed for months.",
    accent: "#22d3ee",
    icon: "ChartNoAxesCombined",
    glow: "rgba(34, 211, 238, 0.2)",
  },
  {
    id: "info",
    name: "Information & Society",
    tagline: "When reality becomes negotiable",
    blurb:
      "Synthetic media, algorithmic amplification and institutional erosion do not only mislead — they erode the shared substrate that every other response depends on: trust, coordination, and the ability to verify anything at all.",
    accent: "#f472b6",
    icon: "RadioTower",
    glow: "rgba(244, 114, 182, 0.22)",
  },
  {
    id: "infrastructure",
    name: "Physical Infrastructure",
    tagline: "Decades to build, minutes to lose",
    blurb:
      "Grids, water, subsea cables, semiconductors and transit systems are being asked to do far more than they were engineered for, at the same time, with no slack in the system.",
    accent: "#94a3b8",
    icon: "Factory",
    glow: "rgba(148, 163, 184, 0.2)",
  },
  {
    id: "space",
    name: "Orbit & Space Weather",
    tagline: "The commons nobody polices",
    blurb:
      "Orbit is a shared utility now — navigation, communications, climate monitoring, precision agriculture. Congestion, debris cascades and solar storms are governance problems with engineering deadlines.",
    accent: "#818cf8",
    icon: "Satellite",
    glow: "rgba(129, 140, 248, 0.24)",
  },
  {
    id: "self",
    name: "Personal Exposure",
    tagline: "Your own unmonitored dependencies",
    blurb:
      "The risks you can actually change this quarter: single points of failure in your income, identity, documents, health, housing and data. Small, boring, high-return work.",
    accent: "#4ade80",
    icon: "ShieldCheck",
    glow: "rgba(74, 222, 128, 0.18)",
  },
];

export const domainById = domains.reduce(
  (acc, d) => {
    acc[d.id] = d;
    return acc;
  },
  {} as Record<DomainId, Domain>,
);

export const getDomain = (id: DomainId): Domain =>
  domainById[id] ?? domains[0];