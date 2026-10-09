import {
  BrainCircuit,
  ChartNoAxesCombined,
  Dna,
  Factory,
  Radar,
  RadioTower,
  Satellite,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import type { DomainId } from "@/lib/types";

const map: Record<string, LucideIcon> = {
  BrainCircuit,
  ChartNoAxesCombined,
  Dna,
  Factory,
  Radar,
  RadioTower,
  Satellite,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
};

export function DomainIcon({
  name,
  className,
  strokeWidth = 1.25,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = map[name] ?? ShieldAlert;
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function DomainGlyph({ id, className }: { id: DomainId; className?: string }) {
  const names: Record<DomainId, string> = {
    ai: "BrainCircuit",
    climate: "Thermometer",
    bio: "Dna",
    nuclear: "Radar",
    cyber: "ShieldAlert",
    finance: "ChartNoAxesCombined",
    info: "RadioTower",
    infrastructure: "Factory",
    space: "Satellite",
    self: "ShieldCheck",
  };
  return <DomainIcon name={names[id] ?? "ShieldAlert"} className={className} />;
}