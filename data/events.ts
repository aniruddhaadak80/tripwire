import { domains } from "./domains";
import { risks } from "./index";

export interface TimelineEvent {
  year: number;
  month: number;
  day: number;
  date: string;
  title: string;
  detail?: string;
  riskSlug: string;
  riskTitle: string;
  domain: string;
  domainName: string;
  accent: string;
}

/** Every dated event in the atlas, flattened with its parent risk, newest first. */
export const allEvents: TimelineEvent[] = risks
  .flatMap((risk) => {
    const domain = domains.find((d) => d.id === risk.domain);
    return risk.timeline.map((event) => {
      const [y, m = 1, d = 1] = event.date.split("-").map(Number);
      return {
        year: y,
        month: m,
        day: d,
        date: event.date,
        title: event.title,
        detail: event.detail,
        riskSlug: risk.slug,
        riskTitle: risk.title,
        domain: risk.domain,
        domainName: domain?.name ?? risk.domain,
        accent: domain?.accent ?? "#8b8b98",
      };
    });
  })
  .sort((a, b) => b.year - a.year || b.month - a.month || b.day - a.day);