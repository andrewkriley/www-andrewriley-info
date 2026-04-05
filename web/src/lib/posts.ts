import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontMatter = {
  title: string;
  description?: string;
  date: string;
  image?: string;
  tags?: string[];
  categories?: string[];
};

export type PostMeta = PostFrontMatter & {
  slug: string;
};

export type Post = PostMeta & {
  content: string;
};

function listSlugFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPostSlugs(): string[] {
  return listSlugFiles();
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontMatter;
  return {
    slug,
    ...fm,
    content,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  const slugs = listSlugFiles();
  const posts: PostMeta[] = [];
  for (const slug of slugs) {
    const p = getPostBySlug(slug);
    if (p) {
      posts.push({
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date,
        image: p.image,
        tags: p.tags,
        categories: p.categories,
      });
    }
  }
  posts.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return db - da;
  });
  return posts;
}

export function getSearchIndex(): { slug: string; title: string; description: string; tags: string[]; categories: string[]; excerpt: string }[] {
  return getAllPostsMeta().map((m) => {
    const full = getPostBySlug(m.slug);
    const excerpt = full
      ? full.content.replace(/\s+/g, " ").trim().slice(0, 280)
      : "";
    return {
      slug: m.slug,
      title: m.title,
      description: m.description ?? "",
      tags: m.tags ?? [],
      categories: m.categories ?? [],
      excerpt,
    };
  });
}
