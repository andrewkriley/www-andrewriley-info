import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { getAllPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/lead",
    "/build",
    "/play",
    "/health",
    "/design-system",
    "/uses",
    "/about",
    "/writing",
  ];
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/p/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
    })),
    ...posts,
  ];
}
