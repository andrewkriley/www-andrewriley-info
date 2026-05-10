import type { Metadata } from "next";
import Image from "next/image";

import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getPostsByCategory } from "@/lib/content";
import { getLatestYouTubeVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Play",
  description: "Music, DJ Riles, and creative play from Andrew Riley.",
};

export const revalidate = 3600;

export default async function PlayPage() {
  const posts = getPostsByCategory("music");
  const videos = await getLatestYouTubeVideos(4);

  return (
    <section>
      <div className="relative isolate overflow-hidden bg-surface-inverse text-text-on-image">
        <Image
          src="/images/play/djriles-side.jpg"
          alt="DJ Riles performing in Las Vegas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_33%] opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/75 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              Play
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Music is the creative current.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              Play is the music category: DJ Riles, mixes, creative energy, and
              the almost spiritual connection I have with sound.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Mixes"
          title="Sets, energy, and moments."
          description="A few places where the play side of the site comes through in sound."
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
