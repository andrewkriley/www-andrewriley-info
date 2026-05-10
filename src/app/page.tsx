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
      <section className="relative isolate overflow-hidden bg-white text-text-on-image">
        <Image
          src="/images/hero/andrew1.png?v=20260510-2152"
          alt="Andrew Riley"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-[46rem]">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              About Riles
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              A builder with a bias for curiosity, leadership, and action.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              I love being exposed to new paradigms and inspiring others to
              experiment alongside me. The best ideas often come at the
              intersection of different experiences.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="#featured-builds">
                Explore my values
              </LinkButton>
              <LinkButton href="#now-building">
                What I&apos;m building
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-builds" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Primary pillars"
          title="Health, build, play, and lead in motion."
          description="The themes overlap on purpose. Professional leadership, technical systems, hands-on projects, music, and wellbeing all come from the same mix of curiosity, craft, energy, and momentum."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredWork.map((work) => (
            <WorkCard key={work.title} {...work} />
          ))}
        </div>
      </section>

      <section aria-label="Pillar hero images" className="grid md:grid-cols-4">
        {heroImages.map((image, index) => (
          <figure
            key={image.label}
            className="relative min-h-72 overflow-hidden md:min-h-[28rem]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover opacity-90 brightness-105 contrast-95"
            />
            {index > 0 ? (
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-8 -translate-x-1/2 bg-gradient-to-r from-white/0 via-white/35 to-white/0 blur-md md:block" />
            ) : null}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent p-6 text-text-on-image">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">
                {image.label}
              </p>
              <p className="mt-2 text-xl font-bold">{image.title}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <section id="now-building" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 rounded-card border border-border-subtle bg-surface-card p-8 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div>
            <SectionHeading
              eyebrow="How I work"
              title="Health, build, play, and lead."
              description="The work matters, but so does how people learn, decide, grow, recover, and keep energy for the next challenge."
            />
            <div className="mt-8 max-w-xl rounded-card border border-border-subtle bg-surface-muted p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-primary">
                Current thesis
              </p>
              <p className="mt-5 text-2xl font-bold leading-tight text-text-primary">
                Resumes tell people where you&apos;ve been. Proof-of-work shows
                how you think, learn, and move.
              </p>
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

      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-card bg-surface-inverse p-8 text-text-inverse md:p-10">
          <SectionHeading
            eyebrow="Now building"
            title="Active work, not a frozen CV."
            description="The site is designed around proof, progress, and learning in public across health, build, play, and lead."
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

    </>
  );
}
