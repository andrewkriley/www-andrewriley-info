import type { Metadata } from "next";
import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import { healthPillars } from "@/data/site";

export const metadata: Metadata = {
  title: "Health",
  description:
    "Wellbeing, physical and mental health, diet, and exercise as a foundation for lead, build, and play.",
};

export default function HealthPage() {
  return (
    <section>
      <div className="relative isolate overflow-hidden bg-white text-text-on-image">
        <Image
          src="/images/hero/andrew_running2.jpg"
          alt="Andrew Riley running during an event"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/38 to-slate-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/75 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-5 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-accent">
              Health
            </p>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              The foundation underneath lead, build, and play.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-text-on-image/85">
              Health is the sustainability pillar: wellbeing, physical and
              mental health, diet, and exercise. It is not separate from the
              work; it is what keeps the work possible.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-card border border-border-subtle bg-surface-inverse p-8 text-text-inverse shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text-inverse/80">
            Operating principle
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            Sustainable output starts with a cared-for system.
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-text-inverse/80">
            This section can become the home for notes, routines, experiments,
            and practices around energy, movement, recovery, food, and mindset.
          </p>
        </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {healthPillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-card border border-border-subtle bg-surface-card p-7 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-text-primary">
              {pillar.title}
            </h2>
            <p className="mt-4 leading-8 text-text-secondary">
              {pillar.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-card border border-dashed border-brand-growth bg-brand-accent-soft p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-primary">
          Future notes
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary">
          Health logs and practices can grow here.
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-text-secondary">
          This is ready for future posts or lightweight logs around habits,
          training, food, stress, sleep, and the experiments that actually stick.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/lead">Lead</LinkButton>
          <LinkButton href="/build" variant="secondary">
            Build
          </LinkButton>
          <LinkButton href="/play" variant="secondary">
            Play
          </LinkButton>
        </div>
      </div>
      </div>
    </section>
  );
}
