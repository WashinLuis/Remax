import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllProperties } from "@/lib/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/imoveis`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...getAllProperties().map((p) => ({
      url: `${SITE.url}/imovel/${p.id}`,
      lastModified: new Date(p.listedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
