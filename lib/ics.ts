"use client";

import type { PlanItem } from "./views";

/**
 * Generate an .ics calendar file from the preparedness plan.
 * Cadenced items become recurring yearly events (quarterly for "quarterly" cadence);
 * one-off items become single events.
 */
export function buildIcs(items: PlanItem[], done: Record<string, boolean>): string {
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const events = items
    .filter((i) => !done[i.slug + "::" + i.precaution.title])
    .map((item) => {
      const start = new Date(now.getTime() + 24 * 60 * 60 * 1000); // tomorrow
      const dtstart = start.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      const uid = `${item.slug}-${item.precaution.title.replace(/\W+/g, "-").toLowerCase()}@tripwire`;
      const cadence = item.precaution.cadence?.toLowerCase() ?? "";
      const rrule = cadence.includes("quarter")
        ? "RRULE:FREQ=YEARLY;INTERVAL=3"
        : cadence
          ? "RRULE:FREQ=YEARLY"
          : "";

      return [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${dtstart}`,
        `SUMMARY:${escapeIcs(item.precaution.title)}`,
        `DESCRIPTION:${escapeIcs(`${item.precaution.detail} — ${item.riskTitle} (tripwire)`)}`,
        ...(rrule ? [rrule] : []),
        "END:VEVENT",
      ].join("\r\n");
    });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tripwire//Preparedness Plan//EN",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

function escapeIcs(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Trigger a browser download of the plan as an .ics file. */
export function downloadIcs(items: PlanItem[], done: Record<string, boolean>) {
  const ics = buildIcs(items, done);
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tripwire-plan.ics";
  a.click();
  URL.revokeObjectURL(url);
}