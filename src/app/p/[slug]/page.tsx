import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx-components";
import { LinkedInPostBody } from "@/components/linkedin-post-body";
import { getAllPosts, getPost } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getPostImageSrc } from "@/lib/post-image";
import { site } from "@/data/site";
import { TopicTags } from "@/components/topic-tags";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

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

  const imageSrc = getPostImageSrc(post);

  return {
    title: post.title,
    description: post.description,
    ...(imageSrc
      ? {
          openGraph: {
            images: [{ url: new URL(imageSrc, site.url).toString() }],
          },
        }
      : {}),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const imageSrc = getPostImageSrc(post);

  return (
    <>
      {imageSrc && !post.plainText ? (
        <div className="relative isolate min-h-[42vh] overflow-hidden bg-surface-muted md:min-h-[50vh]">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
        </div>
      ) : null}

      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        {post.imageCreditUrl ? <p className="mb-8 text-sm text-text-muted">{post.imageCreditText} <a href={post.imageCreditUrl} target="_blank" rel="noreferrer" className="text-brand-primary hover:underline">View original image on LinkedIn ↗</a></p> : null}
        <Link
          href="/journal"
          className="text-sm font-semibold text-brand-primary hover:text-brand-secondary"
        >
          Back to journal
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
          <TopicTags topics={post.topics} />
          {post.sourceUrl ? <p className="mt-4 text-sm text-text-secondary">Originally published on <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-brand-primary hover:underline">LinkedIn ↗</a></p> : null}
          {post.description && !post.plainText ? (
            <p className="mt-6 text-xl leading-9 text-text-secondary">
              {post.description}
            </p>
          ) : null}
        </header>

        <div className="prose-content mt-12">
          {post.plainText ? <LinkedInPostBody post={post} /> : <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />}
        </div>
      </article>
    </>
  );
}
