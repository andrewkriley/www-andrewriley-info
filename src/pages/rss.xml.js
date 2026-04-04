import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "Andrew Riley — Riles",
    description: "Building, creating, leading: tech, home, and music.",
    site: context.site ?? "https://www.andrewriley.info",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/p/${post.slug}/`,
    })),
    customData: `<language>en-au</language>`,
  });
}
