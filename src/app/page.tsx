import Link from "next/link";
import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { WorkCard } from "@/components/work-card";
import {
  featuredWork,
  heroImages,
  nowBuilding,
  operatingLoop,
  principles,
  site,
} from "@/data/site";
import { getFeaturedPosts } from "@/lib/content";

export default function HomePage() {
  const posts = getFeaturedPosts(4);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white text-text-on-image">
        <Image
          src="/images/hero/andrew_main.jpg?v=20260512"
          alt="Andrew Riley"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-[42rem]">
            <p className="text-hero-shadow text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              About Riles
            </p>
            <h1 className="text-hero-shadow mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Systems, people, creativity, and sustainable momentum.
            </h1>
            <p className="text-hero-shadow mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              I build useful systems, make the work understandable, keep
              creativity in the loop, and protect the health that makes all of
              it sustainable.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="#now-building">
                What I&apos;m building
              </LinkButton>
              <LinkButton href="#featured-builds" variant="secondary">
                Explore the pillars
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section id="now-building" className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-card bg-surface-inverse p-8 text-text-inverse md:p-10">
          <SectionHeading
            eyebrow="Now building"
            title="Active work, not a frozen CV."
            description="Three active domains feed the same operating loop: family and wellbeing, professional leadership, and product-shaped technology experiments."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {nowBuilding.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">
                  {item.label}
                </p>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-7 opacity-80">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-builds" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Primary pillars"
          title="One loop, four ways of working."
          description="Build, Lead, Play, and Health are not separate personas. They are a loop for turning ideas into systems, sharing the work, keeping energy alive, and sustaining the foundation underneath it."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredWork.map((work) => (
            <WorkCard key={work.title} {...work} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-card bg-surface-inverse p-8 text-text-inverse md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">
              Operating loop
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              The same method shows up everywhere.
            </h2>
            <p className="mt-4 text-lg leading-8 opacity-80">
              A homelab service, a product idea, a leadership conversation, a
              DJ set, and a health routine all have the same shape: make the
              system visible, tune the feedback, and keep it humane.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {operatingLoop.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">
                  {item.pillar}
                </p>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-7 opacity-80">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Pillar hero images" className="grid md:grid-cols-4">
        {heroImages.map((image) => (
          <figure
            key={image.label}
            className="relative min-h-72 overflow-hidden md:min-h-[28rem]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover object-center"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-text-on-image">
              <p className="text-hero-shadow text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">
                {image.label}
              </p>
              <p className="text-hero-shadow mt-2 text-xl font-bold">
                {image.title}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-3xl rounded-card border border-border-subtle bg-surface-card p-8 shadow-sm md:p-10">
          <SectionHeading
            eyebrow="How I work"
            title="Proof beats pedigree."
            description="The work matters, but so does the method: how people learn, decide, recover, and keep energy for the next challenge."
          />
          <p className="mt-6 text-2xl font-bold leading-tight text-text-primary">
            Resumes tell people where you&apos;ve been. Proof-of-work shows how
            you think, learn, and move.
          </p>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
          <div className="rounded-card border border-border-subtle bg-surface-card p-8 shadow-sm">
            <SectionHeading
              eyebrow="About"
              title="How I show up in the work."
              description="I like to discover many ways to approach a challenge, then learn as much as possible from the process. I care about the technical build, but I care just as much about whether the people around it can understand, contribute, and see new possibilities."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/build#build-writing">See the archive</LinkButton>
              <LinkButton
                href="https://www.linkedin.com/in/andrewriley"
                variant="secondary"
              >
                Connect on LinkedIn
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

        <div className="mt-12 rounded-card bg-surface-inverse p-8 text-text-inverse md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">
            Find me
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="rounded-full border border-text-inverse/25 px-4 py-2 text-sm font-semibold text-text-inverse transition hover:bg-surface-card hover:text-brand-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the workbench."
          description="Technical notes, experiments, and decisions—the proof-of-work archive lives on Build."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-8">
          <LinkButton href="/build#build-writing">
            All posts on Build
          </LinkButton>
        </div>
      </section>
    </>
  );
}
