import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import linkedInPosts from "@/content/linkedin-posts.json";
import { readTopics, type JournalTopic } from "@/lib/journal-topics";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  topics: JournalTopic[];
  categories: string[];
  image?: string;
  imageCreditUrl?: string;
  imageCreditText?: string;
  content: string;
  sourceUrl?: string;
  sourceUrn?: string;
  plainText?: boolean;
  images?: { src: string; alt: string; width: number; height: number }[];
};

type FrontMatter = {
  title?: string;
  description?: string;
  date?: string | Date;
  tags?: string[];
  topics?: string[];
  categories?: string[];
  image?: string;
  imageCreditUrl?: string;
  imageCreditText?: string;
  slug?: string;
};

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normaliseDate(value: FrontMatter["date"]): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return typeof value === "string" ? value : new Date().toISOString();
}

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const frontMatter = data as FrontMatter;

  return {
    slug: frontMatter.slug ?? slug,
    title: frontMatter.title ?? slug,
    description: frontMatter.description ?? "",
    date: normaliseDate(frontMatter.date),
    tags: asStringArray(frontMatter.tags),
    topics: readTopics(frontMatter.topics, slug),
    categories: asStringArray(frontMatter.categories),
    image: frontMatter.image,
    imageCreditUrl: frontMatter.imageCreditUrl,
    imageCreditText: frontMatter.imageCreditText,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const journalPosts = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readPostFile);
  const importedPosts: Post[] = linkedInPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: ["linkedin"],
    topics: readTopics(post.topics, post.slug),
    categories: ["LinkedIn"],
    image: post.images[0]?.src,
    content: post.text,
    sourceUrl: post.sourceUrl,
    sourceUrn: post.sourceUrn,
    plainText: true,
    images: post.images,
  }));
  return [...journalPosts, ...importedPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts(limit = 4): Post[] {
  const preferredSlugs = [
    "splunk-mcp-claude-desktop",
    "claude-new-post-skill",
    "homelab-platform-homeaiops",
    "ha-ryde-waste-collection",
  ];
  const posts = getAllPosts();
  const preferred = preferredSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is Post => Boolean(post));
  const rest = posts.filter((post) => !preferredSlugs.includes(post.slug));

  return [...preferred, ...rest].slice(0, limit);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) =>
    post.categories.some((item) => item.toLowerCase() === category),
  );
}
