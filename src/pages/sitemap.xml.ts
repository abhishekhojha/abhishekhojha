import type { APIRoute } from "astro";
import { getPostsCollection } from "../lib/db";

export const prerender = false;

const SITE = "https://abhishekhojha.com";

const staticRoutes = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/blog", priority: "0.9", changefreq: "daily" },
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

export const GET: APIRoute = async ({ locals }) => {
  const uri = (locals.runtime?.env?.MONGODB_URI ?? import.meta.env.MONGODB_URI) as string;

  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: string }[] =
    staticRoutes.map(({ url, priority, changefreq }) => ({
      loc: `${SITE}${url}`,
      changefreq,
      priority,
    }));

  if (uri) {
    try {
      const posts = getPostsCollection(uri);
      const publishedPosts = await posts
        .find({ draft: false }, { projection: { slug: 1, updatedAt: 1, pubDate: 1 } })
        .toArray();

      for (const post of publishedPosts) {
        const date = post.updatedAt ?? post.pubDate;
        urls.push({
          loc: `${SITE}/blog/${post.slug}`,
          lastmod: date ? new Date(date).toISOString().split("T")[0] : undefined,
          changefreq: "monthly",
          priority: "0.7",
        });
      }
    } catch {
      // If DB is unavailable, still return static routes
    }
  }

  return new Response(toXml(urls), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
