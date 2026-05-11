import type { Metadata } from "next";
import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { principles } from "@/data/site";
import { getFeaturedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lead",
  description:
    "Professional leadership, people, process, and growth from Andrew Riley.",
};

export default function LeadPage() {
  const posts = getFeaturedPosts(3);

  return (
    <section>
      <div className="relative isolate overflow-hidden bg-white text-text-on-image">
        <Image
          src="/images/hero/riles_presenting3.jpg"
          alt="Andrew Riley presenting to an audience"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-hero-shadow text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              Lead
            </p>
            <h1 className="text-hero-shadow mt-5 text-5xl font-black tracking-tight md:text-7xl">
              From breadboards to boardrooms.
            </h1>
            <p className="text-hero-shadow mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              Tech evangelist. Tech leader. Lead is the professional thread:
              how ideas become useful, how teams learn together, and how
              leadership helps people grow beyond the work directly in front of
              them.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-card border border-border-subtle bg-surface-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-text-primary">
              How I think about leadership
            </h2>
            <p className="mt-5 leading-8 text-text-secondary">
              I like to discover many ways to approach a challenge, then make
              the work understandable enough that others can contribute. The
              outcome matters, but so does the capability a team builds along
              the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/about">About Riles</LinkButton>
              <LinkButton href="/build" variant="secondary">
                See the builds
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-3">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-2xl border border-border-subtle bg-surface-muted p-5 font-semibold text-text-primary"
              >
                {principle}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading
            eyebrow="Proof"
            title="Leadership through the work."
            description="Selected writing that shows how I reason through tools, systems, and decisions."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
