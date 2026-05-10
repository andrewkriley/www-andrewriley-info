import Link from "next/link";

import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-3xl border border-border-subtle bg-surface-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex flex-wrap gap-2">
        {post.categories.map((category) => (
          <span
            key={category}
            className="rounded-full bg-brand-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary"
          >
            {category}
          </span>
        ))}
      </div>
      <h3 className="mt-5 text-xl font-bold text-text-primary">
        <Link href={`/p/${post.slug}`} className="hover:text-brand-primary">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm text-text-muted">{formatDate(post.date)}</p>
      {post.description ? (
        <p className="mt-4 leading-7 text-text-secondary">
          {post.description}
        </p>
      ) : null}
    </article>
  );
}
