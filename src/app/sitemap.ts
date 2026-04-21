import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://crewqa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { url: "/", priority: 1.0 },
    { url: "/how-it-works", priority: 0.9 },
    { url: "/pricing", priority: 0.9 },
    { url: "/for-testers", priority: 0.8 },
    { url: "/login", priority: 0.4 },
    { url: "/legal/terms", priority: 0.3 },
    { url: "/legal/privacy", priority: 0.3 },
  ];
  return routes.map(({ url, priority }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
