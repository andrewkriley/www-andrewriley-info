import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { MdxBody } from "@/components/MdxBody";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: post.image ? { images: [post.image] } : undefined,
  };
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "long",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog/"
        className="text-sm text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
      >
        ← Blog
      </Link>
      <header className="mt-6">
        <time
          dateTime={post.date}
          className="text-sm text-[var(--color-text-muted)]"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="font-heading mt-2 text-4xl font-semibold text-[var(--color-text)]">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">{post.description}</p>
        ) : null}
        {(post.categories?.length ?? 0) > 0 || (post.tags?.length ?? 0) > 0 ? (
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            {[...(post.categories ?? []), ...(post.tags ?? [])].join(" · ")}
          </p>
        ) : null}
      </header>
      {post.image ? (
        <figure className="mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt=""
            className="w-full rounded-lg border border-[var(--color-border)]"
          />
        </figure>
      ) : null}
      <div className="prose-mdx mt-10">
        <MdxBody source={post.content} />
      </div>
    </article>
  );
}
