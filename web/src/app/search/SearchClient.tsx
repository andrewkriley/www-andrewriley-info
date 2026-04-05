"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";

export type SearchDoc = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  excerpt: string;
};

export function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const [q, setQ] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: "title", weight: 0.45 },
          { name: "description", weight: 0.25 },
          { name: "tags", weight: 0.15 },
          { name: "categories", weight: 0.1 },
          { name: "excerpt", weight: 0.05 },
        ],
        threshold: 0.32,
        ignoreLocation: true,
      }),
    [docs],
  );

  const results = useMemo(() => {
    const trimmed = q.trim();
    if (!trimmed) return docs.map((d) => ({ item: d }));
    return fuse.search(trimmed).slice(0, 50);
  }, [fuse, q, docs]);

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search posts
      </label>
      <input
        id="search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by title, tags, or content…"
        className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-text)] shadow-sm focus:border-[var(--color-brand-primary-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary-muted)]/25"
        autoComplete="off"
      />
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        {q.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : `${docs.length} posts indexed`}
      </p>
      <ul className="mt-8 space-y-6">
        {results.map(({ item: post }) => (
          <li key={post.slug}>
            <Link
              href={`/p/${post.slug}/`}
              className="group block rounded-lg border border-transparent px-0 py-1 hover:border-[var(--color-border)]"
            >
              <span className="font-heading text-lg font-semibold text-[var(--color-link)] group-hover:text-[var(--color-link-hover)]">
                {post.title}
              </span>
              {post.description ? (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{post.description}</p>
              ) : null}
              <p className="mt-2 line-clamp-2 text-sm text-[var(--color-text-muted)]">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
