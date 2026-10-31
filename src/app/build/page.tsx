import type { Metadata } from "next";
import Image from "next/image";

import { GrowingSectionsNote } from "@/components/growing-sections-note";
import { LinkButton } from "@/components/link-button";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { buildCaseStudies, buildEvidence, builderMethods } from "@/data/site";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build",
  description:
    "Systems, methods, and proof-of-work across AI tooling, homelab infrastructure, automation, and hands-on making.",
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
              Building useful systems, not just interesting demos.
            </h1>
            <p className="text-hero-shadow mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              Build is where ideas become repeatable, observable, and safe to
              operate: AI tooling, homelab infrastructure, automation, web
              delivery, and hands-on experiments.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="#builder-method">The method</LinkButton>
              <LinkButton href="#build-evidence" variant="secondary">
                See the evidence
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      <div id="builder-method" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Builder operating system"
          title="The method is the build."
          description="The best builds are not just the thing that launches. They are the constraints, release paths, evidence, and learning loops that make the next change easier."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {builderMethods.map((method) => (
            <article
              key={method.step}
              className="rounded-card border border-border-subtle bg-surface-card p-7 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-secondary">
                {method.step}
              </p>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-text-primary">
                {method.title}
              </h2>
              <p className="mt-4 leading-7 text-text-secondary">
                {method.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div id="build-evidence" className="bg-surface-muted py-16">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Evidence"
            title="Current proof from the house harness."
            description="Public-safe examples from the systems I am actively building: enough detail to show the method, without exposing private hostnames, secret paths, tokens, or operational access."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {buildEvidence.map((item) => (
              <article
                key={item.title}
                className="flex min-h-72 flex-col justify-between rounded-card border border-border-subtle bg-surface-card p-7 shadow-sm"
              >
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                    {item.title}
                  </h2>
                  <p className="mt-4 leading-7 text-text-secondary">
                    {item.description}
                  </p>
                </div>
                <p className="mt-8 text-sm font-semibold text-text-muted">
                  {item.proof}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-card bg-surface-inverse p-8 text-text-inverse md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">
              Case studies
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              The next layer is deeper proof.
            </h2>
            <p className="mt-4 text-lg leading-8 opacity-80">
              The archive below shows older notes from the workbench. These are
              the active build stories that deserve fuller write-ups next.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {buildCaseStudies.map((study) => (
              <article
                key={study.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent">
                  {study.status}
                </p>
                <h3 className="mt-3 text-xl font-bold">{study.title}</h3>
                <p className="mt-4 leading-7 opacity-80">
                  {study.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div id="build-writing" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the workbench."
          description="Technical notes, experiments, and decisions from the blog archive: the long-form proof behind the builder narrative."
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
