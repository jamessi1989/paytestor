import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://crewqa.com";

// Allow mainstream search crawlers plus LLM / generative-engine crawlers.
// Deny internal routes (authed dashboards + API surface) for both.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app", "/app/", "/t", "/t/", "/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
