import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx-components";
import { getAllPosts, getPost } from "@/lib/content";
import { formatDate } from "@/lib/format";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <Link
        href="/writing"
        className="text-sm font-semibold text-brand-primary hover:text-brand-secondary"
      >
        Back to writing
      </Link>
      <header className="mt-8">
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
        <h1 className="mt-5 text-4xl font-black tracking-tight text-text-primary md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-text-muted">{formatDate(post.date)}</p>
        {post.description ? (
          <p className="mt-6 text-xl leading-9 text-text-secondary">
            {post.description}
          </p>
        ) : null}
      </header>

      <div className="prose-content mt-12">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </article>
  );
}
