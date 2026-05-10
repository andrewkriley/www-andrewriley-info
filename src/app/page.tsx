import Link from "next/link";
import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { WorkCard } from "@/components/work-card";
import { featuredWork, heroImages, nowBuilding, principles } from "@/data/site";
import { getFeaturedPosts } from "@/lib/content";

export default function HomePage() {
  const posts = getFeaturedPosts(4);

  return (
    <>
      <section className="relative isolate min-h-[calc(100vh-81px)] overflow-hidden bg-surface-inverse text-text-on-image">
        <div className="absolute inset-0 -z-20 grid grid-rows-3 md:grid-cols-3 md:grid-rows-1">
          {heroImages.map((image) => (
            <div key={image.label} className="relative overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover opacity-90 brightness-105 contrast-95"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/68 via-black/36 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/62 to-transparent" />

        <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl flex-col justify-end px-5 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              Impact Build Play
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              From breadboards to boardrooms.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              I&apos;m Andrew Riley, you can call me Riles. I&apos;m a tech
              evangelist and tech leader creating impact, building useful
              things, keeping play alive through music, and treating health as
              the foundation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="#featured-builds">
                See what I&apos;m building
              </LinkButton>
              <LinkButton
                href="/about"
                variant="secondary"
                className="border-text-on-image/35 !text-text-on-image hover:border-text-on-image hover:!text-text-on-image"
              >
                About Riles
              </LinkButton>
            </div>
          </div>

          <div className="mt-14">
            <div className="max-w-xl rounded-card border border-text-on-image/15 bg-slate-950/35 p-5 text-text-on-image backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">
              Current thesis
            </p>
              <p className="mt-5 text-2xl font-bold leading-tight">
              Resumes tell people where you&apos;ve been. Proof-of-work shows
              how you think, learn, and move.
            </p>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-builds" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Featured proof"
          title="Impact, build, play, and health in motion."
          description="The themes overlap on purpose. Professional leadership, technical systems, hands-on projects, music, and wellbeing all come from the same mix of curiosity, craft, energy, and momentum."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredWork.map((work) => (
            <WorkCard key={work.title} {...work} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-card bg-surface-inverse p-8 text-text-inverse md:p-10">
          <SectionHeading
            eyebrow="Now building"
            title="Active work, not a frozen CV."
            description="The site is designed around proof, progress, and learning in public across impact, build, and play."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {nowBuilding.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-7 opacity-80">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the workbench."
          description="Posts are part of the portfolio: technical notes, experiments, and decisions captured while the work is still close."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-8">
          <LinkButton href="/writing" variant="secondary">
            Browse all writing
          </LinkButton>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="grid gap-8 rounded-card border border-border-subtle bg-surface-card p-8 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <SectionHeading
            eyebrow="People and process"
            title="Impact is part of the work."
            description="The work matters, but so does how people learn, decide, and grow while doing it."
          />
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
      </section>
    </>
  );
}
