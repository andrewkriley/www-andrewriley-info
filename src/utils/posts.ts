import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<Post[]> {
  const all = await getCollection("posts", ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function postUrl(slug: string) {
  return `/p/${slug}/`;
}

export function uniqueSorted(values: string[]) {
  return [...new Set(values.map((t) => t.toLowerCase()))].sort();
}
