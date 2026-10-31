import type { Metadata } from "next";
import Image from "next/image";

import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { playPractices } from "@/data/site";
import { getPostsByCategory } from "@/lib/content";
import { getPopularYouTubeVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Play",
  description: "Music, DJ Riles, and creative play from Andrew Riley.",
};

export const revalidate = 3600;

export default async function PlayPage() {
  const posts = getPostsByCategory("music");
  const videos = await getPopularYouTubeVideos(4);

  return (
    <section>
      <div className="relative isolate overflow-hidden bg-white text-text-on-image">
        <Image
          src="/images/play/djriles-side.jpg"
          alt="DJ Riles performing in Las Vegas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-hero-shadow text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              Play
            </p>
            <h1 className="text-hero-shadow mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Creativity keeps the system human.
            </h1>
            <p className="text-hero-shadow mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              Play is not a side quest. DJ Riles, mixes, and creative energy
              are how I practice improvisation, pattern recognition, and the
              kind of connection that keeps technical work from becoming cold.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Creative method"
          title="Play is rehearsal for adaptive work."
          description="The same instincts that help a set land with a room also help a system land with people: listen, sense the transition, and keep the energy moving."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {playPractices.map((practice) => (
            <article
              key={practice.title}
              className="rounded-card border border-border-subtle bg-surface-card p-7 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-text-primary">
                {practice.title}
              </h2>
              <p className="mt-4 leading-8 text-text-secondary">
                {practice.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16">
        <SectionHeading
          eyebrow="Most popular"
          title="Sets, energy, and moments."
          description="The four most popular videos from DJ Riles on YouTube — mixes and moments that people keep coming back to."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {videos.map((video) => (
            <iframe
              key={video.id}
              className="aspect-video w-full rounded-[1.5rem] border border-border-subtle bg-surface-muted shadow-sm"
              src={video.embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ))}
        </div>
        </div>

        {posts.length > 0 ? (
          <div className="mt-14">
            <SectionHeading
              eyebrow="Related writing"
              title="Play in the archive."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
