import type { Metadata } from "next";
import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import { principles, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Andrew Riley, also known as Riles.",
};

export default function AboutPage() {
  return (
    <section>
      <div className="relative isolate overflow-hidden bg-surface-inverse text-text-on-image">
        <Image
          src="/images/hero/andrew1.png?v=20260510"
          alt="Andrew Riley"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/72 via-slate-950/22 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/45 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              About Riles
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              A builder with a bias for curiosity, leadership, and useful
              momentum.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              I love being exposed to new paradigms and inspiring others to
              experiment alongside me. The best ideas often come at the
              intersection of different experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-card border border-border-subtle bg-surface-card p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary">
            How I work
          </h2>
          <p className="mt-5 leading-8 text-text-secondary">
            I like to discover many ways to approach a challenge, then learn as
            much as possible from the process. I care about the technical build,
            but I care just as much about whether the people around it are
            learning, contributing, and seeing new possibilities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/build">See the work</LinkButton>
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
              className="rounded-2xl border border-border-subtle bg-surface-card p-5 font-semibold text-text-primary shadow-sm"
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
      </div>
    </section>
  );
}
