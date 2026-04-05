import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts on technology, homelab, and things I build.",
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-[var(--color-text)]">Blog</h1>
      <p className="mt-3 text-[var(--color-text-muted)]">
        Longer writing migrated from the Hugo site; new posts will live here too.
      </p>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <time
                dateTime={post.date}
                className="text-sm text-[var(--color-text-muted)]"
              >
                {formatDate(post.date)}
              </time>
              <h2 className="mt-1 font-heading text-xl font-semibold">
                <Link
                  href={`/p/${post.slug}/`}
                  className="text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
                >
                  {post.title}
                </Link>
              </h2>
              {post.description ? (
                <p className="mt-2 text-[var(--color-text-muted)]">{post.description}</p>
              ) : null}
              {(post.tags?.length ?? 0) > 0 ? (
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                  {post.tags?.join(" · ")}
                </p>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
