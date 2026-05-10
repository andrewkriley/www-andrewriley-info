import type { Metadata } from "next";
import Image from "next/image";

import { PostCard } from "@/components/post-card";
import { getPostsByCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build",
  description:
    "Technology, AI tooling, homelab, automation, DIY, and hands-on making.",
};

export default function BuildPage() {
  const posts = Array.from(
    new Map(
      [...getPostsByCategory("technology"), ...getPostsByCategory("home")].map(
        (post) => [post.slug, post],
      ),
    ).values(),
  );

  return (
    <section>
      <div className="relative isolate overflow-hidden bg-white text-text-on-image">
        <Image
          src="/images/hero/riles_building.jpeg"
          alt="Andrew Riley working on a hands-on build project"
          fill
          priority
          sizes="100vw"
          className="scale-x-[-1] object-cover object-top opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/42 to-slate-950/12" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/75 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              Build
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Systems, tools, and hands-on making.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              Build brings together the technical and physical work: AI tooling,
              homelab infrastructure, automation, home projects, and DIY
              experiments.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mt-10 rounded-card border border-dashed border-brand-growth bg-brand-accent-soft p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-primary">
          DIY build logs
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary">
          The physical build archive is next.
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-text-secondary">
          This section will also hold workshop notes, materials, constraints,
          mistakes, and finished project photos as they are gathered.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      </div>
    </section>
  );
}
