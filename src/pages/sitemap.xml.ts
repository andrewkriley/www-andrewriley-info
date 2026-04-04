import type { APIRoute } from "astro";
import { getPublishedPosts, uniqueSorted } from "@/utils/posts";

export const prerender = true;

const site = "https://www.andrewriley.info";

function loc(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${site}${p.endsWith("/") ? p : `${p}/`}`;
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const tags = uniqueSorted(posts.flatMap((p) => p.data.tags));
  const cats = new Set<string>();
  for (const p of posts) {
    for (const c of p.data.categories) cats.add(c.toLowerCase());
  }

  const urls: string[] = [
    "/",
    "/archives/",
    "/search/",
    "/djriles/",
    "/letscollaborate/",
    "/rss.xml",
  ];

  for (const post of posts) urls.push(`/p/${post.slug}/`);
  for (const tag of tags) urls.push(`/tags/${encodeURIComponent(tag)}/`);
  for (const c of cats) urls.push(`/categories/${c}/`);

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    [...new Set(urls)]
      .map((u) => `<url><loc>${loc(u)}</loc></url>`)
      .join("") +
    `</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
