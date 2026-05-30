import type { Metadata } from "next";
import Image from "next/image";

import { GrowingSectionsNote } from "@/components/growing-sections-note";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build",
  description:
    "Technology, AI tooling, homelab, automation, DIY, and hands-on making.",
};

export default function BuildPage() {
  const posts = getAllPosts();

  return (
    <section>
      <div className="relative isolate overflow-hidden bg-white text-text-on-image">
        <Image
          src="/images/hero/riles_building.jpeg"
          alt="Andrew Riley working on a hands-on build project"
          fill
          priority
          sizes="100vw"
          className="scale-x-[-1] object-cover object-top"
        />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-hero-shadow text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              Build
            </p>
            <h1 className="text-hero-shadow mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Systems, tools, and hands-on making.
            </h1>
            <p className="text-hero-shadow mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              Build brings together the technical and physical work: AI tooling,
              homelab infrastructure, automation, home projects, and DIY
              experiments.
            </p>
          </div>
        </div>
      </div>

      <div id="build-writing" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the workbench."
          description="Technical notes, experiments, and decisions from the blog archive—the proof-of-work layer for build."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16">
        <GrowingSectionsNote />
      </div>
    </section>
  );
}
