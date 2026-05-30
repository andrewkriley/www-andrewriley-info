import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/content";
import { getPostImageSrc } from "@/lib/post-image";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: Post }) {
  const imageSrc = getPostImageSrc(post);

  return (
    <article className="overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      {imageSrc ? (
        <Link href={`/p/${post.slug}`} className="relative block aspect-[16/9] bg-surface-muted">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </Link>
      ) : null}
      <div className="p-6">
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
      </div>
    </article>
  );
}
