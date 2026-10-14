import type { MetadataRoute } from "next";
import { domains } from "@/data/domains";
import { risks } from "@/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripwire-atlas.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/atlas`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/matrix`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/timeline`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/signals`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/prepare`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/data`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/method`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const riskRoutes: MetadataRoute.Sitemap = risks.map((r) => ({
    url: `${BASE}/risk/${r.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const domainRoutes: MetadataRoute.Sitemap = domains.map((d) => ({
    url: `${BASE}/domain/${d.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...riskRoutes, ...domainRoutes];
}