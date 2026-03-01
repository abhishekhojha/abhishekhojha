import type { APIRoute } from "astro";
import apiClient from "../lib/axios";

const SITE = "https://abhishekhojha.com";

const staticRoutes = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/learnings", priority: "0.9", changefreq: "daily" },
  { url: "/projects", priority: "0.8", changefreq: "monthly" },
  { url: "/uses", priority: "0.6", changefreq: "monthly" },
];

function toXml(urls: { loc: string; lastmod?: string; changefreq?: string; priority?: string }[]) {
  const items = urls
    .map(
      ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
    ${priority ? `<priority>${priority}</priority>` : ""}
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

export const GET: APIRoute = async () => {
  const beUrl = import.meta.env.BE_URL ?? "";

  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: string }[] =
    staticRoutes.map(({ url, priority, changefreq }) => ({
      loc: `${SITE}${url}`,
      changefreq,
      priority,
    }));

  if (beUrl) {
    try {
      const res = await apiClient.get(`${beUrl}/posts?limit=100`, { validateStatus: () => true });
      if (res.status === 200) {
        const posts: { slug: string; updatedAt?: string; pubDate?: string }[] = res.data;
        for (const post of posts) {
          const date = post.updatedAt ?? post.pubDate;
          urls.push({
            loc: `${SITE}/learnings/${post.slug}`,
            lastmod: date ? new Date(date).toISOString().split("T")[0] : undefined,
            changefreq: "monthly",
            priority: "0.7",
          });
        }
      }
    } catch {
      // If BE is unavailable, still return static routes
    }
  }

  return new Response(toXml(urls), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};

